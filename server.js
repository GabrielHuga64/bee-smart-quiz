// Bee Smart Learning Quiz Server - Node.js Cloud Edition
// Zero dependencies (uses native Node.js http, fs, and path modules)
// Compatible with Render.com, Glitch.com, Railway, Heroku, etc.

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5500;
const DB_FILE = path.join(__dirname, 'database.json');

// MIME types for static files
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function readDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading database:', err);
  }
  return { submissions: [], customQuestions: {} };
}

function writeDb(data) {
  try {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing database:', err);
    return false;
  }
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
  });
  res.end(JSON.stringify(data));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // Global CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname.toLowerCase();

  try {
    // API: Network Status
    if (pathname === '/api/network-status') {
      sendJson(res, 200, {
        status: 'online',
        port: PORT,
        host: req.headers.host || 'cloud',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // API: Quiz Submissions History
    if (pathname === '/api/history') {
      if (req.method === 'GET') {
        const db = readDb();
        sendJson(res, 200, db);
        return;
      }
      if (req.method === 'POST') {
        const newSub = await parseJsonBody(req);
        const db = readDb();
        if (!Array.isArray(db.submissions)) {
          db.submissions = [];
        }
        if (!newSub.id) {
          newSub.id = 'sub-' + Math.floor(100000 + Math.random() * 900000);
        }
        if (!newSub.timestamp) {
          newSub.timestamp = new Date().toLocaleString('en-GB');
        }
        db.submissions.unshift(newSub);
        writeDb(db);
        sendJson(res, 200, { success: true, submission: newSub, totalSubmissions: db.submissions.length });
        return;
      }
    }

    // API: Delete Single Submission
    if (pathname === '/api/history/delete' && req.method === 'POST') {
      const payload = await parseJsonBody(req);
      const db = readDb();
      if (Array.isArray(db.submissions)) {
        db.submissions = db.submissions.filter(s => s.id !== payload.id);
        writeDb(db);
      }
      sendJson(res, 200, { success: true, deletedId: payload.id, remaining: (db.submissions || []).length });
      return;
    }

    // API: Reset Submissions
    if (pathname === '/api/history/reset' && req.method === 'POST') {
      const db = readDb();
      db.submissions = [];
      db.customQuestions = {};
      writeDb(db);
      sendJson(res, 200, { success: true, message: 'Database reset successfully' });
      return;
    }

    // API: Custom Questions
    if (pathname === '/api/questions') {
      const db = readDb();
      sendJson(res, 200, { success: true, customQuestions: db.customQuestions || {} });
      return;
    }

    // API: Replace Question
    if (pathname === '/api/questions/replace' && req.method === 'POST') {
      const payload = await parseJsonBody(req);
      const db = readDb();
      if (!db.customQuestions) db.customQuestions = {};
      db.customQuestions[String(payload.questionId)] = payload.question;
      writeDb(db);
      sendJson(res, 200, { success: true, questionId: payload.questionId });
      return;
    }

    // API: Revert Question
    if (pathname === '/api/questions/revert' && req.method === 'POST') {
      const payload = await parseJsonBody(req);
      const db = readDb();
      if (db.customQuestions && db.customQuestions[String(payload.questionId)]) {
        delete db.customQuestions[String(payload.questionId)];
        writeDb(db);
      }
      sendJson(res, 200, { success: true, questionId: payload.questionId });
      return;
    }

    // Static File Serving
    let safePath = path.normalize(decodeURIComponent(urlObj.pathname));
    if (safePath === '/' || safePath === '\\') {
      safePath = '/index.html';
    }

    const fullFilePath = path.join(__dirname, safePath);
    if (!fullFilePath.startsWith(__dirname)) {
      res.writeHead(403);
      res.end('Access denied');
      return;
    }

    if (fs.existsSync(fullFilePath) && fs.statSync(fullFilePath).isFile()) {
      const ext = path.extname(fullFilePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(fullFilePath).pipe(res);
      return;
    }

    // 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');

  } catch (err) {
    console.error('Server error:', err);
    sendJson(res, 500, { error: 'Internal server error' });
  }
});

server.listen(PORT, () => {
  console.log(`Bee Smart Learning Quiz Server listening on port ${PORT}`);
});
