# Bee Smart Learning - Quiz Server & REST API Database
# Supports Smartphone LAN Access (Wi-Fi) + Cloudflare Quick Tunnel Online Link

$port = 5500
$workspaceDir    = Join-Path 'D:' 'Subordinating Conjuction'
$script:dbFile          = Join-Path $workspaceDir 'database.json'
$script:networkInfoFile = Join-Path $workspaceDir 'network_info.json'
$cloudflaredLog  = Join-Path $workspaceDir 'cloudflared.log'

# Discover Local IPv4 Address
$localIp = "127.0.0.1"
try {
    $ipObj = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
             Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' -and $_.InterfaceAlias -notlike '*Loopback*' } |
             Select-Object -First 1
    if ($ipObj) {
        $localIp = $ipObj.IPAddress
    }
} catch {
    # network discovery failed, fallback to 127.0.0.1
}

$localUrl = 'http://' + $localIp + ':' + $port
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " BEE SMART LEARNING - QUIZ SERVER & TEST DATABASE" -ForegroundColor Yellow
Write-Host " Local PC Access:    http://localhost:$port" -ForegroundColor Green
Write-Host " Smartphone Access:  $localUrl" -ForegroundColor Green

# Start or Check Cloudflare Tunnel for Online Public HTTPS Link
$script:tunnelUrl = ''  # populated below; also used in Process-Request /api/network-status
$cloudflaredExe   = Join-Path $workspaceDir 'cloudflared.exe'

if (Test-Path $cloudflaredExe) {
    $cfProc = Get-Process -Name 'cloudflared' -ErrorAction SilentlyContinue
    if (-not $cfProc) {
        Remove-Item $cloudflaredLog -Force -ErrorAction SilentlyContinue
        Write-Host " Starting Cloudflare Tunnel for Online Smartphone Access..." -ForegroundColor Yellow
        $cfArgs = 'tunnel --url http://localhost:' + $port + ' --http-host-header localhost:' + $port + ' --logfile ' + $cloudflaredLog
        Start-Process -FilePath $cloudflaredExe -ArgumentList $cfArgs -WindowStyle Hidden
        Start-Sleep -Seconds 4
    }
}

if (Test-Path $cloudflaredLog) {
    $logContent = Get-Content $cloudflaredLog -Raw -ErrorAction SilentlyContinue
    if ($logContent -match 'https://[a-zA-Z0-9-]+\.trycloudflare\.com') {
        $script:tunnelUrl = $Matches[0]
        Write-Host " Online Public Link: $script:tunnelUrl" -ForegroundColor Cyan
    }
}

# Save network info for frontend / mobile clients
$networkInfo = @{
    status = "online"
    port = $port
    localIp = $localIp
    localUrl = $localUrl
    tunnelUrl = $script:tunnelUrl
    timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
} | ConvertTo-Json
[System.IO.File]::WriteAllText($script:networkInfoFile, $networkInfo, [System.Text.Encoding]::UTF8)

# Initialize HttpListener with fallback
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

$started = $false
if ($localIp -ne "127.0.0.1") {
    try {
        $listener.Prefixes.Add("http://${localIp}:${port}/")
        $listener.Start()
        $started = $true
        Write-Host " Registered Prefix: http://${localIp}:${port}/" -ForegroundColor Green
    } catch {
        # Prefix requires elevated URL ACL; recreate listener with localhost only
        $listener.Close()
        $listener = New-Object System.Net.HttpListener
        $listener.Prefixes.Add("http://localhost:$port/")
        $listener.Prefixes.Add("http://127.0.0.1:$port/")
        Write-Host " Note: LAN IP requires admin URL ACL. Bound to localhost; smartphones connect via Cloudflare tunnel." -ForegroundColor DarkGray
    }
}

if (-not $started) {
    $listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Server is listening on port $port. Press Ctrl+C to stop." -ForegroundColor White

function Process-Request($context) {
    try {
        $req = $context.Request
        $res = $context.Response

        # Global CORS Headers
        $res.AddHeader("Access-Control-Allow-Origin", "*")
        $res.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE")
        $res.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

        # Handle CORS Preflight
        if ($req.HttpMethod -eq "OPTIONS") {
            $res.StatusCode = 204
            $res.OutputStream.Close()
            return
        }

        $rawPath = $req.Url.LocalPath.ToLower()

        # =========================================================
        # REST API: NETWORK STATUS
        # =========================================================
        if ($rawPath -eq "/api/network-status") {
            # Refresh tunnel URL from log (latest match)
            if (Test-Path $cloudflaredLog) {
                $logContent = Get-Content $cloudflaredLog -Raw -ErrorAction SilentlyContinue
                $allMatches = [regex]::Matches($logContent, "https://[a-zA-Z0-9\-]+\.trycloudflare\.com")
                if ($allMatches.Count -gt 0) {
                    $script:tunnelUrl = $allMatches[$allMatches.Count - 1].Value
                    try {
                        $upInfo = @{
                            status = "online"
                            port = $port
                            localIp = $localIp
                            localUrl = $localUrl
                            tunnelUrl = $script:tunnelUrl
                            timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
                        } | ConvertTo-Json
                        [System.IO.File]::WriteAllText($script:networkInfoFile, $upInfo, [System.Text.Encoding]::UTF8)
                    } catch {}
                }
            }

            $info = @{
                status = "online"
                port = $port
                localIp = $localIp
                localUrl = $localUrl
                tunnelUrl = $script:tunnelUrl
                timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
            } | ConvertTo-Json

            $bytes = [System.Text.Encoding]::UTF8.GetBytes($info)
            $res.ContentType = "application/json; charset=utf-8"
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
            $res.OutputStream.Close()
            return
        }

        # =========================================================
        # REST API: TEST DATA HISTORY (DATABASE)
        # =========================================================
        if ($rawPath -eq "/api/history") {
            if ($req.HttpMethod -eq "GET") {
                if (Test-Path $script:dbFile) {
                    $jsonText = [System.IO.File]::ReadAllText($script:dbFile, [System.Text.Encoding]::UTF8)
                } else {
                    $jsonText = '{"submissions":[], "customQuestions":{}}'
                }
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($jsonText)
                $res.ContentType = "application/json; charset=utf-8"
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
                $res.OutputStream.Close()
                return
            }

            if ($req.HttpMethod -eq "POST") {
                $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
                $bodyText = $reader.ReadToEnd()
                $newSubmission = $bodyText | ConvertFrom-Json

                # Read current DB
                if (Test-Path $script:dbFile) {
                    $dbText = [System.IO.File]::ReadAllText($script:dbFile, [System.Text.Encoding]::UTF8)
                    $db = $dbText | ConvertFrom-Json
                } else {
                    $db = [PSCustomObject]@{ submissions = @(); customQuestions = [PSCustomObject]@{} }
                }

                if (-not $db.submissions) {
                    $db | Add-Member -MemberType NoteProperty -Name "submissions" -Value @() -Force
                }

                # Generate ID if missing
                if (-not $newSubmission.id) {
                    $newSubmission | Add-Member -MemberType NoteProperty -Name "id" -Value ("sub-" + (Get-Random -Minimum 1000 -Maximum 9999)) -Force
                }
                if (-not $newSubmission.timestamp) {
                    $newSubmission | Add-Member -MemberType NoteProperty -Name "timestamp" -Value ((Get-Date).ToString("yyyy-MM-dd HH:mm:ss")) -Force
                }

                # Unshift / Prepend or Append
                $submissionList = [System.Collections.ArrayList]@($db.submissions)
                $submissionList.Insert(0, $newSubmission)
                $db.submissions = $submissionList
                $db.lastUpdated = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")

                $updatedJson = $db | ConvertTo-Json -Depth 10
                [System.IO.File]::WriteAllText($script:dbFile, $updatedJson, [System.Text.Encoding]::UTF8)

                $respObj = @{ success = $true; submission = $newSubmission; totalSubmissions = $submissionList.Count } | ConvertTo-Json
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($respObj)
                $res.ContentType = "application/json; charset=utf-8"
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
                $res.OutputStream.Close()
                return
            }
        }

        # Delete Single Test Record
        if ($rawPath -eq "/api/history/delete" -and $req.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
            $bodyText = $reader.ReadToEnd()
            $payload = $bodyText | ConvertFrom-Json
            $delId = $payload.id

            $dbText = [System.IO.File]::ReadAllText($script:dbFile, [System.Text.Encoding]::UTF8)
            $db = $dbText | ConvertFrom-Json
            
            $kept = @()
            if ($db.submissions) {
                foreach ($item in $db.submissions) {
                    if ($item.id -ne $delId) {
                        $kept += $item
                    }
                }
            }
            $db.submissions = $kept
            $db.lastUpdated = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
            $updatedJson = $db | ConvertTo-Json -Depth 10
            [System.IO.File]::WriteAllText($script:dbFile, $updatedJson, [System.Text.Encoding]::UTF8)

            $respObj = @{ success = $true; deletedId = $delId; remaining = $kept.Count } | ConvertTo-Json
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($respObj)
            $res.ContentType = "application/json; charset=utf-8"
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
            $res.OutputStream.Close()
            return
        }

        # Reset Test History to 4 Baseline Students
        if ($rawPath -eq "/api/history/reset" -and $req.HttpMethod -eq "POST") {
            $dbText = [System.IO.File]::ReadAllText($script:dbFile, [System.Text.Encoding]::UTF8)
            $db = $dbText | ConvertFrom-Json
            
            $baselineUsers = @(
                @{
                    id = "sub-101"
                    name = "Captain Jessica Miller"
                    device = "Desktop (Chrome / Windows)"
                    score = 88
                    totalQuestions = 40
                    accuracy = 90
                    timeSpentSeconds = 1280
                    timeSpentFormatted = "21m 20s"
                    isLate = $false
                    overtimeSeconds = 0
                    statusLabel = "On Time"
                    timestamp = (Get-Date).AddDays(-1).ToString("yyyy-MM-dd 14:32:10")
                    answers = @{
                        "1"="A"; "2"="D"; "3"="D"; "4"="A"; "5"="B"; "6"="C"; "7"="A"; "8"="D"; "9"="C"; "10"="D";
                        "11"="A"; "12"="C"; "13"="C"; "14"="B"; "15"="C"; "16"="A"; "17"="D"; "18"="C"; "19"="B"; "20"="D";
                        "21"="A"; "22"="A"; "23"="A"; "24"="A"; "25"="A"; "26"="A"; "27"="B"; "28"="A"; "29"="B"; "30"="A";
                        "31"="Military personnel regularly train and carefully maintain their equipment.";
                        "32"="The training was demanding, but the personnel completed it successfully.";
                        "33"="The soldiers will either attend the morning session or the afternoon session.";
                        "34"="The personnel were not informed about neither the commander nor the change.";
                        "35"="Not only the personnel, but also the officers successfully completed the exercise.";
                        "36"="The training schedule was changed, so the personnel had to adjust their plans.";
                        "37"="Military personnel need both, discipline and effective communication.";
                        "38"="The team will either conduct the exercise tomorrow or postpone it until next week.";
                        "39"="Were neither ready the facilities nor the equipment was.";
                        "40"="The task was challenging, but the personnel remained focused and completed it."
                    }
                },
                @{
                    id = "sub-102"
                    name = "Lieutenant Liam Chen"
                    device = "Smartphone (Safari / iOS)"
                    score = 88
                    totalQuestions = 40
                    accuracy = 85
                    timeSpentSeconds = 1490
                    timeSpentFormatted = "24m 50s"
                    isLate = $false
                    overtimeSeconds = 0
                    statusLabel = "On Time"
                    timestamp = (Get-Date).AddHours(-18).ToString("yyyy-MM-dd 16:15:45")
                    answers = @{
                        "1"="A"; "2"="D"; "3"="A"; "4"="A"; "5"="B"; "6"="C"; "7"="A"; "8"="D"; "9"="B"; "10"="D";
                        "11"="A"; "12"="C"; "13"="C"; "14"="B"; "15"="C"; "16"="A"; "17"="D"; "18"="C"; "19"="C"; "20"="D";
                        "21"="A"; "22"="B"; "23"="A"; "24"="A"; "25"="A"; "26"="A"; "27"="B"; "28"="A"; "29"="B"; "30"="A";
                        "31"="Military personnel regularly train and carefully maintain their equipment.";
                        "32"="The training was demanding, but the personnel completed it successfully.";
                        "33"="The soldiers will either attend the morning session or the afternoon session.";
                        "34"="Neither the commander nor the personnel were informed about the change.";
                        "35"="Not only the personnel, but also the officers successfully completed the exercise.";
                        "36"="The training schedule was changed, so the personnel had to adjust their plans.";
                        "37"="Military personnel need both, discipline and effective communication.";
                        "38"="The team will either conduct the exercise tomorrow or postpone it until next week.";
                        "39"="The facilities neither were ready nor the equipment was.";
                        "40"="The task was challenging, but the personnel remained focused and completed it."
                    }
                },
                @{
                    id = "sub-103"
                    name = "Officer Alex Taylor"
                    device = "Smartphone (Chrome / Android)"
                    score = 82
                    totalQuestions = 40
                    accuracy = 80
                    timeSpentSeconds = 1650
                    timeSpentFormatted = "27m 30s"
                    isLate = $false
                    overtimeSeconds = 0
                    statusLabel = "On Time"
                    timestamp = (Get-Date).AddHours(-8).ToString("yyyy-MM-dd 19:40:22")
                    answers = @{
                        "1"="A"; "2"="D"; "3"="D"; "4"="A"; "5"="A"; "6"="C"; "7"="A"; "8"="B"; "9"="C"; "10"="D";
                        "11"="A"; "12"="A"; "13"="C"; "14"="B"; "15"="C"; "16"="A"; "17"="D"; "18"="A"; "19"="A"; "20"="D";
                        "21"="A"; "22"="A"; "23"="A"; "24"="A"; "25"="A"; "26"="A"; "27"="B"; "28"="A"; "29"="B"; "30"="A";
                        "31"="Military personnel regularly train and carefully maintain their equipment.";
                        "32"="The training was demanding, but the personnel completed it successfully.";
                        "33"="The soldiers will either attend the morning session or the afternoon session.";
                        "34"="Neither were the personnel informed nor the commander about the change.";
                        "35"="Not only the personnel, but also the officers successfully completed the exercise.";
                        "36"="The training schedule was changed, so the personnel had to adjust their plans.";
                        "37"="Military personnel need both, discipline and effective communication.";
                        "38"="The team will either conduct the exercise tomorrow or postpone it until next week.";
                        "39"="Neither available the facilities were nor the equipment ready was.";
                        "40"="The task was challenging, but the personnel remained focused and completed it."
                    }
                },
                @{
                    id = "sub-104"
                    name = "Sergeant Sophia Rodriguez"
                    device = "Desktop (Edge / Windows)"
                    score = 72
                    totalQuestions = 40
                    accuracy = 70
                    timeSpentSeconds = 1910
                    timeSpentFormatted = "31m 50s"
                    isLate = $true
                    overtimeSeconds = 110
                    statusLabel = "Late (+1m 50s)"
                    timestamp = (Get-Date).AddHours(-2).ToString("yyyy-MM-dd 10:20:15")
                    answers = @{
                        "1"="A"; "2"="D"; "3"="C"; "4"="A"; "5"="B"; "6"="A"; "7"="A"; "8"="A"; "9"="A"; "10"="D";
                        "11"="A"; "12"="C"; "13"="C"; "14"="C"; "15"="C"; "16"="A"; "17"="A"; "18"="C"; "19"="D"; "20"="D";
                        "21"="A"; "22"="B"; "23"="A"; "24"="A"; "25"="A"; "26"="A"; "27"="B"; "28"="A"; "29"="A"; "30"="A";
                        "31"="Military personnel regularly train and carefully maintain their equipment.";
                        "32"="The training was demanding, but the personnel completed it successfully.";
                        "33"="The soldiers will either attend the morning session or the afternoon session.";
                        "34"="Neither the commander nor the personnel were informed about the change.";
                        "35"="Not only the personnel, but also the officers successfully completed the exercise.";
                        "36"="The training schedule changed was so adjust had to their plans the personnel.";
                        "37"="Military personnel need both, discipline and effective communication.";
                        "38"="The team will either conduct the exercise tomorrow or postpone it until next week.";
                        "39"="The equipment was neither nor the facilities ready were available.";
                        "40"="The task was challenging, but the personnel remained focused and completed it."
                    }
                }
            )

            $db.submissions = $baselineUsers
            $db.customQuestions = [PSCustomObject]@{}
            $db.lastUpdated = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
            $updatedJson = $db | ConvertTo-Json -Depth 10
            [System.IO.File]::WriteAllText($script:dbFile, $updatedJson, [System.Text.Encoding]::UTF8)

            $respObj = @{ success = $true; message = "Database reset to 4 baseline seeds" } | ConvertTo-Json
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($respObj)
            $res.ContentType = "application/json; charset=utf-8"
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
            $res.OutputStream.Close()
            return
        }

        # =========================================================
        # REST API: CUSTOM / REPLACED QUESTIONS
        # =========================================================
        if ($rawPath -eq "/api/questions") {
            $dbText = [System.IO.File]::ReadAllText($script:dbFile, [System.Text.Encoding]::UTF8)
            $db = $dbText | ConvertFrom-Json
            $customQ = if ($db.customQuestions) { $db.customQuestions } else { [PSCustomObject]@{} }

            $respObj = @{ success = $true; customQuestions = $customQ } | ConvertTo-Json -Depth 10
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($respObj)
            $res.ContentType = "application/json; charset=utf-8"
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
            $res.OutputStream.Close()
            return
        }

        if ($rawPath -eq "/api/questions/replace" -and $req.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
            $bodyText = $reader.ReadToEnd()
            $payload = $bodyText | ConvertFrom-Json

            $dbText = [System.IO.File]::ReadAllText($script:dbFile, [System.Text.Encoding]::UTF8)
            $db = $dbText | ConvertFrom-Json
            
            if (-not $db.customQuestions) {
                $db | Add-Member -MemberType NoteProperty -Name "customQuestions" -Value (New-Object PSObject) -Force
            }

            $qKey = $payload.questionId.ToString()
            $db.customQuestions | Add-Member -MemberType NoteProperty -Name $qKey -Value $payload.question -Force
            $db.lastUpdated = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")

            $updatedJson = $db | ConvertTo-Json -Depth 10
            [System.IO.File]::WriteAllText($script:dbFile, $updatedJson, [System.Text.Encoding]::UTF8)

            $respObj = @{ success = $true; questionId = $payload.questionId } | ConvertTo-Json
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($respObj)
            $res.ContentType = "application/json; charset=utf-8"
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
            $res.OutputStream.Close()
            return
        }

        if ($rawPath -eq "/api/questions/revert" -and $req.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
            $bodyText = $reader.ReadToEnd()
            $payload = $bodyText | ConvertFrom-Json

            $dbText = [System.IO.File]::ReadAllText($script:dbFile, [System.Text.Encoding]::UTF8)
            $db = $dbText | ConvertFrom-Json

            $qKey = $payload.questionId.ToString()
            if ($db.customQuestions -and $db.customQuestions.PSObject.Properties[$qKey]) {
                $db.customQuestions.PSObject.Properties.Remove($qKey)
            }

            $db.lastUpdated = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
            $updatedJson = $db | ConvertTo-Json -Depth 10
            [System.IO.File]::WriteAllText($script:dbFile, $updatedJson, [System.Text.Encoding]::UTF8)

            $respObj = @{ success = $true; questionId = $payload.questionId } | ConvertTo-Json
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($respObj)
            $res.ContentType = "application/json; charset=utf-8"
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
            $res.OutputStream.Close()
            return
        }

        # =========================================================
        # STATIC FILE SERVING
        # =========================================================
        $filePath = $req.Url.LocalPath
        if ($filePath -eq "/" -or $filePath -eq "") {
            $filePath = "/index.html"
        }

        $relPath = [System.Uri]::UnescapeDataString($filePath.TrimStart('/'))
        $localTarget = Join-Path $workspaceDir $relPath

        if (Test-Path $localTarget -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localTarget)
            $ext = [System.IO.Path]::GetExtension($localTarget).ToLower()
            switch ($ext) {
                ".html"  { $res.ContentType = "text/html; charset=utf-8"; break }
                ".css"   { $res.ContentType = "text/css; charset=utf-8"; break }
                ".js"    { $res.ContentType = "application/javascript; charset=utf-8"; break }
                ".json"  { $res.ContentType = "application/json; charset=utf-8"; break }
                ".jpg"   { $res.ContentType = "image/jpeg"; break }
                ".jpeg"  { $res.ContentType = "image/jpeg"; break }
                ".png"   { $res.ContentType = "image/png"; break }
                ".svg"   { $res.ContentType = "image/svg+xml"; break }
                ".ico"   { $res.ContentType = "image/x-icon"; break }
                ".woff2" { $res.ContentType = "font/woff2"; break }
                default  { $res.ContentType = "application/octet-stream"; break }
            }
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $res.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $res.OutputStream.Write($msg, 0, $msg.Length)
        }
        $res.OutputStream.Close()
    } catch {
        try {
            $context.Response.StatusCode = 500
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes($_.Exception.Message)
            $context.Response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            $context.Response.OutputStream.Close()
        } catch {}
    }
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        Process-Request $context
    }
} finally {
    if ($listener -and $listener.IsListening) {
        $listener.Stop()
    }
}
