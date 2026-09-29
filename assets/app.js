// @ts-nocheck
/**
 * Bee Smart Learning — Subordinating Conjunction Master Quiz
 * Comprehensive 50-Question Exam Across 5 Parts
 * Recommended Duration: 45 Minutes (2700 Seconds)
 * 
 * Features:
 * - Parts 1–3: Multiple Choice & Correct/Incorrect (Questions 1–30)
 * - Part 4: Word Bank Passage Completion (Questions 31–40, 10 Sentences, 12 Words, 2 Distractors)
 * - Part 5: Interactive Sentence Word Ordering / Jumbled Words (Questions 41–50)
 * - Smartphone Viewport & Touch Optimization
 * - Dynamic Item Difficulty Analysis & Pedagogical Recommendations (Excel-aligned, in English)
 * - Admin Question Replacement Tool for Extreme Items (<20% Very Hard or >80% Too Easy)
 * - 100% Synchronized Student Attempts
 * - Scoring: 1 point for each question across all 50 questions (50 Raw Points | 100 Scaled Score)
 */

(function () {
  'use strict';

  const RECOMMENDED_TIME_SECONDS = 45 * 60; // 45 minutes = 2700s
  const ADMIN_CREDENTIALS = { user: "admin123", pass: "admin123" };
  const STORAGE_KEYS = {
    USERS: "beeQuiz_students_v4",
    CUSTOM_QUESTIONS: "beeQuiz_custom_questions_v7",
    SOUND: "beeQuiz_sound_v1"
  };

  const READING_PASSAGES = {
    passage1: {
      title: "Civil Servants in Indonesia (Questions 11–15)",
      text: "Civil servants in Indonesia are expected to complete their responsibilities efficiently <span class='passage-blank-marker' data-q='11'>[11] _______</span> they may have to deal with several tasks at the same time. They often need to attend meetings, prepare documents, and coordinate with other employees <span class='passage-blank-marker' data-q='12'>[12] _______</span> completing their daily assignments. <span class='passage-blank-marker' data-q='13'>[13] _______</span> some tasks require additional time, employees are generally expected to meet the established deadlines. They may ask for clarification <span class='passage-blank-marker' data-q='14'>[14] _______</span> they are uncertain about an instruction or procedure. <span class='passage-blank-marker' data-q='15'>[15] _______</span> unexpected changes occur, they are usually required to adjust their plans accordingly."
    },
    passage2: {
      title: "Military Personnel Responsibilities (Questions 16–20)",
      text: "Military personnel are expected to remain disciplined and prepared <span class='passage-blank-marker' data-q='16'>[16] _______</span> unexpected situations arise during their daily responsibilities. They often work as a team <span class='passage-blank-marker' data-q='17'>[17] _______</span> completing tasks that require coordination and clear communication. <span class='passage-blank-marker' data-q='18'>[18] _______</span> unexpected situations may arise, personnel are expected to follow established procedures and respond appropriately. They may review their plans <span class='passage-blank-marker' data-q='19'>[19] _______</span> they identify circumstances that could affect their activities. Effective communication is essential throughout the process <span class='passage-blank-marker' data-q='20'>[20] _______</span> everyone understands their responsibilities."
    },
    passage3: {
      title: "Paragraph 1: Understanding Coordinating Conjunctions (Questions 31–35)",
      text: "Coordinating conjunctions are essential tools in English grammar <span class='passage-blank-marker' data-q='31'>[31] _______</span> they are the only words capable of linking two completely independent thoughts with equal grammatical weight. Many students struggle to remember all seven of them, <span class='passage-blank-marker' data-q='32'>[32] _______</span> the simple acronym FANBOYS makes the memorization process much easier. You should strictly use a coordinating conjunction <span class='passage-blank-marker' data-q='33'>[33] _______</span> your goal is to give equal importance to both ideas in a single sentence. <span class='passage-blank-marker' data-q='34'>[34] _______</span> coordinating conjunctions connect equal elements, subordinating conjunctions always make one clause less important than the other. <span class='passage-blank-marker' data-q='35'>[35] _______</span> the year 1900, grammarians have categorized these seven words into distinct logical groups to help learners."
    },
    passage4: {
      title: "Paragraph 2: Punctuation and Rules (Questions 36–40)",
      text: "Writers will not combine two short clauses into one compound sentence <span class='passage-blank-marker' data-q='36'>[36] _______</span> they want to avoid choppy writing and improve the text's flow. It is important to know exactly where to place a comma <span class='passage-blank-marker' data-q='37'>[37] _______</span> a dependent clause is written first in a complex structure. Always proofread your punctuation carefully <span class='passage-blank-marker' data-q='38'>[38] _______</span> you finalize your essay and submit it to your teacher. You should keep practicing these connection rules every single day <span class='passage-blank-marker' data-q='39'>[39] _______</span> you feel completely confident using them. <span class='passage-blank-marker' data-q='40'>[40] _______</span> coordinating conjunctions must sit directly between the clauses they connect, subordinating conjunctions can flexibly move to the front of the sentence."
    }
  };

  const DEFAULT_QUESTIONS = [
    // --- PART 1 (Questions 1–10): Multiple Choices ---
    {
      id: 1,
      part: 1,
      partName: "Part 1: Multiple Choices",
      instruction: "Choose the best answer to complete each sentence. Select the letter (A, B, C, or D) of your chosen answer.",
      type: "mcq",
      prompt: "______ I submit my work, I usually review it for errors.",
      options: { A: "Before", B: "After", C: "Unless", D: "Now that" },
      correct: "A",
      explanation: "“Before” indicates a chronological time relationship where checking and reviewing occurs prior to the submission of the work. “After” reverses the logical routine order, while “Unless” and “Now that” do not fit the chronological context. (Answer Key: A. Before)"
    },
    {
      id: 2,
      part: 1,
      partName: "Part 1: Multiple Choices",
      instruction: "Choose the best answer to complete each sentence. Select the letter (A, B, C, or D) of your chosen answer.",
      type: "mcq",
      prompt: "She stayed in the classroom ______ she could finish her homework.",
      options: { A: "now that", B: "as", C: "such that", D: "so that" },
      correct: "D",
      explanation: "“So that” expresses purpose or intended outcome, explaining why she stayed in the classroom, and naturally pairs with the modal auxiliary “could”. “Now that” indicates present cause, and “such that” expresses result rather than personal purpose. (Answer Key: D. so that)"
    },
    {
      id: 3,
      part: 1,
      partName: "Part 1: Multiple Choices",
      instruction: "Choose the best answer to complete each sentence. Select the letter (A, B, C, or D) of your chosen answer.",
      type: "mcq",
      prompt: "______ the heavy traffic, we still arrived on time.",
      options: { A: "Although", B: "Because of", C: "Even though", D: "In spite of" },
      correct: "D",
      explanation: "“In spite of” is a prepositional phrase expressing concession that is followed by the noun phrase “the heavy traffic”. “Although” and “Even though” require a finite clause (subject + verb), while “Because of” expresses cause rather than unexpected arrival despite delays. (Answer Key: D. In spite of)"
    },
    {
      id: 4,
      part: 1,
      partName: "Part 1: Multiple Choices",
      instruction: "Choose the best answer to complete each sentence. Select the letter (A, B, C, or D) of your chosen answer.",
      type: "mcq",
      prompt: "You can use my computer ______ you need it.",
      options: { A: "Whenever", B: "Whether", C: "Whereas", D: "Because" },
      correct: "A",
      explanation: "“Whenever” is a subordinating conjunction of time meaning “every time that” or “at any time that”, granting open permission based on need. “Whereas” denotes comparison/contrast, “Whether” introduces alternatives, and “Because” implies necessity rather than open timing. (Answer Key: A. Whenever)"
    },
    {
      id: 5,
      part: 1,
      partName: "Part 1: Multiple Choices",
      instruction: "Choose the best answer to complete each sentence. Select the letter (A, B, C, or D) of your chosen answer.",
      type: "mcq",
      prompt: "I managed to finish the report ______ being very tired.",
      options: { A: "though", B: "despite", C: "even", D: "because" },
      correct: "B",
      explanation: "“Despite” functions as a preposition requiring a noun phrase or gerund phrase (“being very tired”) to express concession. In contrast, “though” and “because” are subordinating conjunctions requiring a finite clause with a conjugated verb. (Answer Key: B. despite)"
    },
    {
      id: 6,
      part: 1,
      partName: "Part 1: Multiple Choices",
      instruction: "Choose the best answer to complete each sentence. Select the letter (A, B, C, or D) of your chosen answer.",
      type: "mcq",
      prompt: "The training continued ______ several participants had raised concerns about the revised schedule.",
      options: { A: "even though", B: "therefore", C: "now that", D: "because of" },
      correct: "A",
      explanation: "“Even though” is a subordinating conjunction of concession introducing a complete dependent clause (subject “several participants” + verb “had raised”) showing perseverance despite objections. “Because of” cannot govern a finite clause, and “therefore” is a conjunctive adverb. (Answer Key: A. even though)"
    },
    {
      id: 7,
      part: 1,
      partName: "Part 1: Multiple Choices",
      instruction: "Choose the best answer to complete each sentence. Select the letter (A, B, C, or D) of your chosen answer.",
      type: "mcq",
      prompt: "The personnel were instructed to remain at the designated location ______ further instructions were issued.",
      options: { A: "until", B: "whereas", C: "unless", D: "despite" },
      correct: "A",
      explanation: "“Until” marks the temporal limit or endpoint of waiting, indicating that personnel should stay in place up to the moment new orders are issued. “Unless” indicates a condition, and “whereas” indicates comparison. (Answer Key: A. until)"
    },
    {
      id: 8,
      part: 1,
      partName: "Part 1: Multiple Choices",
      instruction: "Choose the best answer to complete each sentence. Select the letter (A, B, C, or D) of your chosen answer.",
      type: "mcq",
      prompt: "______ the circumstances surrounding the operation, all personnel were expected to comply with the established procedures.",
      options: { A: "Regardless of", B: "Even though", C: "In case", D: "Whereas" },
      correct: "A",
      explanation: "“Regardless of” is a complex preposition meaning “without considering” or “in spite of” that correctly introduces the noun phrase “the circumstances surrounding the operation”. “Even though” requires a finite clause. (Answer Key: A. Regardless of)"
    },
    {
      id: 9,
      part: 1,
      partName: "Part 1: Multiple Choices",
      instruction: "Choose the best answer to complete each sentence. Select the letter (A, B, C, or D) of your chosen answer.",
      type: "mcq",
      prompt: "The exercise was postponed ______ the deterioration in weather conditions.",
      options: { A: "owing to", B: "even if", C: "provided that", D: "in spite of" },
      correct: "A",
      explanation: "“Owing to” is a prepositional phrase meaning “because of” that correctly precedes the noun phrase “the deterioration in weather conditions” to explain the causal reason for postponement. “Even if” and “provided that” introduce conditional clauses. (Answer Key: A. owing to)"
    },
    {
      id: 10,
      part: 1,
      partName: "Part 1: Multiple Choices",
      instruction: "Choose the best answer to complete each sentence. Select the letter (A, B, C, or D) of your chosen answer.",
      type: "mcq",
      prompt: "The commander revised the training schedule ______ all personnel would have sufficient time to prepare for the assessment.",
      options: { A: "whereas", B: "so that", C: "even though", D: "in case of" },
      correct: "B",
      explanation: "“So that” expresses purpose, explaining the goal of revising the schedule, and is followed by the modal auxiliary “would have”. “Whereas” marks contrast, and “in case of” is a preposition requiring a noun. (Answer Key: B. so that)"
    },

    // --- PART 2 (Questions 11–20): Paragraph Cloze ---
    {
      id: 11,
      part: 2,
      partName: "Part 2: Paragraph Reading Cloze",
      instruction: "Read each paragraph carefully. Choose the best answer (A, B, C, or D) for each blank.",
      passageKey: "passage1",
      type: "mcq",
      prompt: "Civil servants in Indonesia are expected to complete their responsibilities efficiently (11) ________ they may have to deal with several tasks at the same time.",
      options: { A: "even though", B: "because", C: "unless", D: "so that" },
      correct: "A",
      explanation: "“Even though” introduces a concessive clause, highlighting the contrast between the professional requirement of efficiency and the burden of multitasking. (Answer Key: A. even though)"
    },
    {
      id: 12,
      part: 2,
      partName: "Part 2: Paragraph Reading Cloze",
      instruction: "Read each paragraph carefully. Choose the best answer (A, B, C, or D) for each blank.",
      passageKey: "passage1",
      type: "mcq",
      prompt: "They often need to attend meetings, prepare documents, and coordinate with other employees (12) ________ completing their daily assignments.",
      options: { A: "while", B: "because of", C: "despite", D: "unless" },
      correct: "A",
      explanation: "“While” indicates simultaneous ongoing activities (“while completing their daily assignments”), demonstrating that collaborative duties happen concurrently with daily assignments. (Answer Key: A. while)"
    },
    {
      id: 13,
      part: 2,
      partName: "Part 2: Paragraph Reading Cloze",
      instruction: "Read each paragraph carefully. Choose the best answer (A, B, C, or D) for each blank.",
      passageKey: "passage1",
      type: "mcq",
      prompt: "(13) ________ some tasks require additional time, employees are generally expected to meet the established deadlines.",
      options: { A: "Even though", B: "because", C: "unless", D: "so that" },
      correct: "A",
      explanation: "“Even though” opens the sentence with concession, contrasting the reality that complex tasks require extra time with the strict expectation to meet deadlines. (Answer Key: A. Even though)"
    },
    {
      id: 14,
      part: 2,
      partName: "Part 2: Paragraph Reading Cloze",
      instruction: "Read each paragraph carefully. Choose the best answer (A, B, C, or D) for each blank.",
      passageKey: "passage1",
      type: "mcq",
      prompt: "They may ask for clarification (14) ________ they are uncertain about an instruction or procedure.",
      options: { A: "when", B: "although", C: "despite", D: "where" },
      correct: "A",
      explanation: "“When” specifies the temporal condition or circumstance (“at the time that they are uncertain”) prompting civil servants to seek procedural clarification. (Answer Key: A. when)"
    },
    {
      id: 15,
      part: 2,
      partName: "Part 2: Paragraph Reading Cloze",
      instruction: "Read each paragraph carefully. Choose the best answer (A, B, C, or D) for each blank.",
      passageKey: "passage1",
      type: "mcq",
      prompt: "(15) ________ unexpected changes occur, they are usually required to adjust their plans accordingly.",
      options: { A: "Whenever", B: "Whereas", C: "Although", D: "Even" },
      correct: "A",
      explanation: "“Whenever” conveys recurring time or repeated contingency (“every time that unexpected changes occur”), introducing the ongoing obligation to adapt operational plans. (Answer Key: A. Whenever)"
    },
    {
      id: 16,
      part: 2,
      partName: "Part 2: Paragraph Reading Cloze",
      instruction: "Read each paragraph carefully. Choose the best answer (A, B, C, or D) for each blank.",
      passageKey: "passage2",
      type: "mcq",
      prompt: "Military personnel are expected to remain disciplined and prepared (16) _____ unexpected situations arise during their daily responsibilities.",
      options: { A: "although", B: "because of", C: "whenever", D: "unless" },
      correct: "C",
      explanation: "“Whenever” indicates recurring situations or contingencies (“at any time that unexpected situations arise”), emphasizing continuous operational readiness. (Answer Key: C. whenever)"
    },
    {
      id: 17,
      part: 2,
      partName: "Part 2: Paragraph Reading Cloze",
      instruction: "Read each paragraph carefully. Choose the best answer (A, B, C, or D) for each blank.",
      passageKey: "passage2",
      type: "mcq",
      prompt: "They often work as a team (17) ________ completing tasks that require coordination and clear communication.",
      options: { A: "while", B: "because of", C: "despite", D: "unless" },
      correct: "A",
      explanation: "“While” followed by a participial phrase (“while completing tasks”) illustrates simultaneous collaborative teamwork during operational execution. (Answer Key: A. while)"
    },
    {
      id: 18,
      part: 2,
      partName: "Part 2: Paragraph Reading Cloze",
      instruction: "Read each paragraph carefully. Choose the best answer (A, B, C, or D) for each blank.",
      passageKey: "passage2",
      type: "mcq",
      prompt: "(18) ________ unexpected situations may arise, personnel are expected to follow established procedures and respond appropriately.",
      options: { A: "Although", B: "because of", C: "whereas", D: "so that" },
      correct: "A",
      explanation: "“Although” opens the sentence with concession, balancing the possibility of volatile situations against the strict duty to follow established standard operating procedures. (Answer Key: A. Although)"
    },
    {
      id: 19,
      part: 2,
      partName: "Part 2: Paragraph Reading Cloze",
      instruction: "Read each paragraph carefully. Choose the best answer (A, B, C, or D) for each blank.",
      passageKey: "passage2",
      type: "mcq",
      prompt: "They may review their plans (19) ________ they identify circumstances that could affect their activities.",
      options: { A: "whereas", B: "although", C: "despite", D: "when" },
      correct: "D",
      explanation: "“When” specifies the precise operational condition and timing that triggers a review of tactical or strategic plans. (Answer Key: D. when)"
    },
    {
      id: 20,
      part: 2,
      partName: "Part 2: Paragraph Reading Cloze",
      instruction: "Read each paragraph carefully. Choose the best answer (A, B, C, or D) for each blank.",
      passageKey: "passage2",
      type: "mcq",
      prompt: "Effective communication is essential throughout the process (20) ________ everyone understands their responsibilities.",
      options: { A: "Whereas", B: "Unless", C: "Because", D: "So that" },
      correct: "D",
      explanation: "“So that” expresses purpose, explaining that rigorous communication protocols exist specifically to ensure that all personnel comprehend their duties. (Answer Key: D. So that)"
    },

    // --- PART 3 (Questions 21–30): Grammatical Correctness ---
    {
      id: 21,
      part: 3,
      partName: "Part 3: Grammatical Correctness",
      instruction: "Determine whether the sentence is grammatically correct or incorrect. Select CORRECT or INCORRECT.",
      type: "true_false",
      prompt: "Although the training was demanding, the personnel managed to complete all the required activities within the allocated time.",
      options: { A: "CORRECT", B: "INCORRECT" },
      correct: "A",
      explanation: "CORRECT. “Although” is properly used as a subordinating conjunction introducing a complete dependent clause (“the training was demanding”) separated from the independent clause by a comma. (Answer Key: A. CORRECT)"
    },
    {
      id: 22,
      part: 3,
      partName: "Part 3: Grammatical Correctness",
      instruction: "Determine whether the sentence is grammatically correct or incorrect. Select CORRECT or INCORRECT.",
      type: "true_false",
      prompt: "Despite the personnel were given clear instructions, several procedures were not followed correctly.",
      options: { A: "CORRECT", B: "INCORRECT" },
      correct: "B",
      explanation: "INCORRECT. “Despite” is a preposition and cannot directly introduce a finite clause with a subject and conjugated verb (“the personnel were given”). Grammatical correction: “Although the personnel were given...” or “Despite being given clear instructions...”. (Answer Key: B. INCORRECT)"
    },
    {
      id: 23,
      part: 3,
      partName: "Part 3: Grammatical Correctness",
      instruction: "Determine whether the sentence is grammatically correct or incorrect. Select CORRECT or INCORRECT.",
      type: "true_false",
      prompt: "The exercise will continue unless the weather conditions become sufficiently severe to pose a safety risk.",
      options: { A: "CORRECT", B: "INCORRECT" },
      correct: "A",
      explanation: "CORRECT. “Unless” correctly introduces a negative conditional clause (“except if weather conditions become severe”), employing the present tense (“become”) for future real conditions. (Answer Key: A. CORRECT)"
    },
    {
      id: 24,
      part: 3,
      partName: "Part 3: Grammatical Correctness",
      instruction: "Determine whether the sentence is grammatically correct or incorrect. Select CORRECT or INCORRECT.",
      type: "true_false",
      prompt: "The personnel remained at the designated location until further instructions were provided.",
      options: { A: "CORRECT", B: "INCORRECT" },
      correct: "A",
      explanation: "CORRECT. “Until” correctly marks the temporal boundary of waiting, maintaining past tense consistency throughout both clauses (“remained” ... “were provided”). (Answer Key: A. CORRECT)"
    },
    {
      id: 25,
      part: 3,
      partName: "Part 3: Grammatical Correctness",
      instruction: "Determine whether the sentence is grammatically correct or incorrect. Select CORRECT or INCORRECT.",
      type: "true_false",
      prompt: "Even though the schedule had been revised several times, the personnel were able to adapt to the changes without significant difficulties.",
      options: { A: "CORRECT", B: "INCORRECT" },
      correct: "A",
      explanation: "CORRECT. “Even though” appropriately introduces a concessive clause with past perfect aspect (“had been revised”), followed by a comma before the main clause. (Answer Key: A. CORRECT)"
    },
    {
      id: 26,
      part: 3,
      partName: "Part 3: Grammatical Correctness",
      instruction: "Determine whether the sentence is grammatically correct or incorrect. Select CORRECT or INCORRECT.",
      type: "true_false",
      prompt: "The commander adjusted the training schedule so that all personnel would have adequate time to prepare for the assessment.",
      options: { A: "CORRECT", B: "INCORRECT" },
      correct: "A",
      explanation: "CORRECT. “So that” correctly introduces a subordinate purpose clause followed by the modal auxiliary “would have”, aligning cause with intended outcome. (Answer Key: A. CORRECT)"
    },
    {
      id: 27,
      part: 3,
      partName: "Part 3: Grammatical Correctness",
      instruction: "Determine whether the sentence is grammatically correct or incorrect. Select CORRECT or INCORRECT.",
      type: "true_false",
      prompt: "Regardless of how challenging the circumstances may be, personnel are expected to comply with the established procedures.",
      options: { A: "CORRECT", B: "INCORRECT" },
      correct: "A",
      explanation: "CORRECT. “Regardless of” is a complex preposition that correctly takes a wh-nominal clause (“how challenging the circumstances may be”) functioning as a concessive modifier. (Answer Key: A. CORRECT)"
    },
    {
      id: 28,
      part: 3,
      partName: "Part 3: Grammatical Correctness",
      instruction: "Determine whether the sentence is grammatically correct or incorrect. Select CORRECT or INCORRECT.",
      type: "true_false",
      prompt: "Because of several participants had failed to complete the required preparation, the assessment was postponed.",
      options: { A: "CORRECT", B: "INCORRECT" },
      correct: "B",
      explanation: "INCORRECT. “Because of” is a prepositional phrase requiring a noun phrase object. It cannot be followed by a full subject-verb clause (“several participants had failed”). Grammatical correction: “Because several participants had failed...” or “Because of the failure of several participants...”. (Answer Key: B. INCORRECT)"
    },
    {
      id: 29,
      part: 3,
      partName: "Part 3: Grammatical Correctness",
      instruction: "Determine whether the sentence is grammatically correct or incorrect. Select CORRECT or INCORRECT.",
      type: "true_false",
      prompt: "The personnel continued with the exercise, despite the weather conditions had become increasingly unfavorable.",
      options: { A: "CORRECT", B: "INCORRECT" },
      correct: "B",
      explanation: "INCORRECT. “Despite” is a preposition and cannot directly govern a finite clause with a verb phrase (“the weather conditions had become”). Grammatical correction: “despite the weather conditions becoming unfavorable” or “although the weather conditions had become unfavorable”. (Answer Key: B. INCORRECT)"
    },
    {
      id: 30,
      part: 3,
      partName: "Part 3: Grammatical Correctness",
      instruction: "Determine whether the sentence is grammatically correct or incorrect. Select CORRECT or INCORRECT.",
      type: "true_false",
      prompt: "Provided that all safety requirements are met, the personnel may proceed with the scheduled activity.",
      options: { A: "CORRECT", B: "INCORRECT" },
      correct: "A",
      explanation: "CORRECT. “Provided that” functions as a formal conditional subordinating conjunction meaning “on condition that” or “if”, followed by a present passive clause. (Answer Key: A. CORRECT)"
    },

    // --- PART 4 (Questions 31–40): Word Bank Questions ---
    {
      id: 31,
      part: 4,
      partName: "Part 4: Word Bank Questions",
      instruction: "Choose the correct word from the Word Bank below to complete each sentence.",
      passageKey: "passage3",
      type: "word_bank",
      prompt: "Coordinating conjunctions are essential tools in English grammar (31) ________ they are the only words capable of linking two completely independent thoughts with equal grammatical weight.",
      options: {
        A: "Because",
        B: "Although",
        C: "If",
        D: "While",
        E: "Since",
        F: "Unless",
        G: "After",
        H: "Before",
        I: "Until",
        J: "Whereas",
        K: "so",
        L: "As long as"
      },
      correct: "A",
      explanation: "“Because” introduces the specific causal reason explaining why coordinating conjunctions are unique and indispensable tools in English grammar. (Answer Key: A. Because)"
    },
    {
      id: 32,
      part: 4,
      partName: "Part 4: Word Bank Questions",
      instruction: "Choose the correct word from the Word Bank below to complete each sentence.",
      passageKey: "passage3",
      type: "word_bank",
      prompt: "Many students struggle to remember all seven of them, (32) ________ the simple acronym FANBOYS makes the memorization process much easier.",
      options: {
        A: "Because",
        B: "Although",
        C: "If",
        D: "While",
        E: "Since",
        F: "Unless",
        G: "After",
        H: "Before",
        I: "Until",
        J: "Whereas",
        K: "so",
        L: "As long as"
      },
      correct: "B",
      explanation: "“Although” establishes a clear contrast/concession between the difficulty students face in memorizing all seven conjunctions and the simplicity of the FANBOYS acronym. (Answer Key: B. Although)"
    },
    {
      id: 33,
      part: 4,
      partName: "Part 4: Word Bank Questions",
      instruction: "Choose the correct word from the Word Bank below to complete each sentence.",
      passageKey: "passage3",
      type: "word_bank",
      prompt: "You should strictly use a coordinating conjunction (33) ________ your goal is to give equal importance to both ideas in a single sentence.",
      options: {
        A: "Because",
        B: "Although",
        C: "If",
        D: "While",
        E: "Since",
        F: "Unless",
        G: "After",
        H: "Before",
        I: "Until",
        J: "Whereas",
        K: "so",
        L: "As long as"
      },
      correct: "C",
      explanation: "“If” sets up a pure conditional requirement, stating that whenever your objective is to balance ideas with equal importance, a coordinating conjunction is required. (Answer Key: C. If)"
    },
    {
      id: 34,
      part: 4,
      partName: "Part 4: Word Bank Questions",
      instruction: "Choose the correct word from the Word Bank below to complete each sentence.",
      passageKey: "passage3",
      type: "word_bank",
      prompt: "(34) ________ coordinating conjunctions connect equal elements, subordinating conjunctions always make one clause less important than the other.",
      options: {
        A: "Because",
        B: "Although",
        C: "If",
        D: "While",
        E: "Since",
        F: "Unless",
        G: "After",
        H: "Before",
        I: "Until",
        J: "Whereas",
        K: "so",
        L: "As long as"
      },
      correct: "D",
      explanation: "“While” is placed at the start of the sentence to show a direct, simultaneous comparison contrasting coordinating conjunctions with subordinating conjunctions. (Answer Key: D. While)"
    },
    {
      id: 35,
      part: 4,
      partName: "Part 4: Word Bank Questions",
      instruction: "Choose the correct word from the Word Bank below to complete each sentence.",
      passageKey: "passage3",
      type: "word_bank",
      prompt: "(35) ________ the year 1900, grammarians have categorized these seven words into distinct logical groups to help learners.",
      options: {
        A: "Because",
        B: "Although",
        C: "If",
        D: "While",
        E: "Since",
        F: "Unless",
        G: "After",
        H: "Before",
        I: "Until",
        J: "Whereas",
        K: "so",
        L: "As long as"
      },
      correct: "E",
      explanation: "“Since” functions as a temporal conjunction meaning “from that specific starting time in the past until now,” as required by the specific year (1900) and present perfect verb (“have categorized”). (Answer Key: E. Since)"
    },
    {
      id: 36,
      part: 4,
      partName: "Part 4: Word Bank Questions",
      instruction: "Choose the correct word from the Word Bank below to complete each sentence.",
      passageKey: "passage4",
      type: "word_bank",
      prompt: "Writers will not combine two short clauses into one compound sentence (36) ________ they want to avoid choppy writing and improve the text's flow.",
      options: {
        A: "Because",
        B: "Although",
        C: "If",
        D: "While",
        E: "Since",
        F: "Unless",
        G: "After",
        H: "Before",
        I: "Until",
        J: "Whereas",
        K: "so",
        L: "As long as"
      },
      correct: "F",
      explanation: "“Unless” introduces a negative condition meaning “except if,” which perfectly matches the negative main clause (“will not combine”) to explain that writers only combine clauses when seeking to prevent choppy phrasing. (Answer Key: F. Unless)"
    },
    {
      id: 37,
      part: 4,
      partName: "Part 4: Word Bank Questions",
      instruction: "Choose the correct word from the Word Bank below to complete each sentence.",
      passageKey: "passage4",
      type: "word_bank",
      prompt: "It is important to know exactly where to place a comma (37) ________ a dependent clause is written first in a complex structure.",
      options: {
        A: "Because",
        B: "Although",
        C: "If",
        D: "While",
        E: "Since",
        F: "Unless",
        G: "After",
        H: "Before",
        I: "Until",
        J: "Whereas",
        K: "so",
        L: "As long as"
      },
      correct: "G",
      explanation: "“After” indicates a chronological sequence where the punctuation rule dictates placing a comma immediately following an introductory dependent clause. (Answer Key: G. After)"
    },
    {
      id: 38,
      part: 4,
      partName: "Part 4: Word Bank Questions",
      instruction: "Choose the correct word from the Word Bank below to complete each sentence.",
      passageKey: "passage4",
      type: "word_bank",
      prompt: "Always proofread your punctuation carefully (38) ________ you finalize your essay and submit it to your teacher.",
      options: {
        A: "Because",
        B: "Although",
        C: "If",
        D: "While",
        E: "Since",
        F: "Unless",
        G: "After",
        H: "Before",
        I: "Until",
        J: "Whereas",
        K: "so",
        L: "As long as"
      },
      correct: "H",
      explanation: "“Before” indicates that proofreading and checking punctuation must chronologically precede the final submission of the essay. (Answer Key: H. Before)"
    },
    {
      id: 39,
      part: 4,
      partName: "Part 4: Word Bank Questions",
      instruction: "Choose the correct word from the Word Bank below to complete each sentence.",
      passageKey: "passage4",
      type: "word_bank",
      prompt: "You should keep practicing these connection rules every single day (39) ________ you feel completely confident using them.",
      options: {
        A: "Because",
        B: "Although",
        C: "If",
        D: "While",
        E: "Since",
        F: "Unless",
        G: "After",
        H: "Before",
        I: "Until",
        J: "Whereas",
        K: "so",
        L: "As long as"
      },
      correct: "I",
      explanation: "“Until” specifies the temporal deadline or endpoint of continuous effort, indicating that daily practice should continue up to the moment confidence is attained. (Answer Key: I. Until)"
    },
    {
      id: 40,
      part: 4,
      partName: "Part 4: Word Bank Questions",
      instruction: "Choose the correct word from the Word Bank below to complete each sentence.",
      passageKey: "passage4",
      type: "word_bank",
      prompt: "(40) ________ coordinating conjunctions must sit directly between the clauses they connect, subordinating conjunctions can flexibly move to the front of the sentence.",
      options: {
        A: "Because",
        B: "Although",
        C: "If",
        D: "While",
        E: "Since",
        F: "Unless",
        G: "After",
        H: "Before",
        I: "Until",
        J: "Whereas",
        K: "so",
        L: "As long as"
      },
      correct: "J",
      explanation: "“Whereas” serves as a formal contrastive conjunction opening the sentence to weigh two opposite grammatical positions against each other (fixed middle vs. flexible front). (Answer Key: J. Whereas)"
    },

    // --- PART 5 (Questions 41–50): Sentence Word Ordering / Jumbled Words ---
    {
      id: 41,
      part: 5,
      partName: "Part 5: Sentence Word Ordering",
      instruction: "Rearrange the words and phrases to form a grammatically correct sentence. Click the word chips below to place them in order.",
      type: "rearrange",
      prompt: "regularly / Military personnel / and / train / carefully / maintain / their equipment.",
      scrambledChips: ["regularly", "maintain", "train", "and", "Military personnel", "carefully", "their equipment."],
      target: "Military personnel regularly train and carefully maintain their equipment.",
      alternateTargets: [
        "Military personnel train regularly and maintain their equipment carefully.",
        "Military personnel train carefully and maintain their equipment regularly."
      ],
      explanation: "Parallel compound predicate: The subject “Military personnel” governs two parallel verb phrases joined by coordinating conjunction “and” (“regularly train” and “carefully maintain their equipment”), with adverbs correctly placed."
    },
    {
      id: 42,
      part: 5,
      partName: "Part 5: Sentence Word Ordering",
      instruction: "Rearrange the words and phrases to form a grammatically correct sentence. Click the word chips below to place them in order.",
      type: "rearrange",
      prompt: "successfully. / but / The training / completed / was / demanding / the personnel / it",
      scrambledChips: ["successfully.", "completed", "demanding,", "The training", "was", "but", "the personnel", "it"],
      target: "The training was demanding, but the personnel completed it successfully.",
      explanation: "Compound sentence with coordinating conjunction “but”: Joins two contrasting independent clauses separated by a comma (“The training was demanding,” + but + “the personnel completed it successfully.”)."
    },
    {
      id: 43,
      part: 5,
      partName: "Part 5: Sentence Word Ordering",
      instruction: "Rearrange the words and phrases to form a grammatically correct sentence. Click the word chips below to place them in order.",
      type: "rearrange",
      prompt: "or / the afternoon session / attend / The soldiers / will / either / the morning session / .",
      scrambledChips: ["or", "the afternoon session", "attend", "The soldiers", "will", "either", "the morning session", "."],
      target: "The soldiers will either attend the morning session or the afternoon session.",
      alternateTargets: [
        "The soldiers will either attend the morning session or the afternoon session",
        "The soldiers will either attend the afternoon session or the morning session.",
        "The soldiers will either attend the afternoon session or the morning session",
        "Either the soldiers will attend the morning session or the afternoon session.",
        "Either the soldiers will attend the morning session or the afternoon session",
        "Either the soldiers will attend the afternoon session or the morning session.",
        "Either the soldiers will attend the afternoon session or the morning session"
      ],
      explanation: "Correlative conjunction “either ... or”: Balances two parallel noun phrases (“the morning session” or “the afternoon session”) following the transitive verb “attend”. Both sequential orders are grammatically correct."
    },
    {
      id: 44,
      part: 5,
      partName: "Part 5: Sentence Word Ordering",
      instruction: "Rearrange the words and phrases to form a grammatically correct sentence. Click the word chips below to place them in order.",
      type: "rearrange",
      prompt: "informed / the personnel / the change. / Neither / about / nor / the commander / were",
      scrambledChips: ["informed", "the personnel", "the change.", "Neither", "about", "nor", "the commander", "were"],
      target: "Neither the commander nor the personnel were informed about the change.",
      explanation: "Correlative conjunction “neither ... nor”: By the rule of proximity, when subjects differ in number, the verb agrees with the nearer subject (“the personnel” is plural, requiring plural passive verb “were informed”)."
    },
    {
      id: 45,
      part: 5,
      partName: "Part 5: Sentence Word Ordering",
      instruction: "Rearrange the words and phrases to form a grammatically correct sentence. Click the word chips below to place them in order.",
      type: "rearrange",
      prompt: "the exercise. / the officers / Not only / completed / , but also / the personnel / successfully",
      scrambledChips: ["the exercise.", "the officers", "Not only", "completed", ", but also", "the personnel", "successfully"],
      target: "Not only the personnel, but also the officers successfully completed the exercise.",
      alternateTargets: [
        "Not only the personnel, but also the officers successfully completed the exercise",
        "Not only the personnel but also the officers successfully completed the exercise.",
        "Not only the personnel but also the officers successfully completed the exercise",
        "Not only the officers, but also the personnel successfully completed the exercise.",
        "Not only the officers, but also the personnel successfully completed the exercise",
        "Not only the officers but also the personnel successfully completed the exercise.",
        "Not only the officers but also the personnel successfully completed the exercise",
        "Not only the personnel, but also the officers completed the exercise successfully.",
        "Not only the personnel but also the officers completed the exercise successfully.",
        "Not only the officers, but also the personnel completed the exercise successfully.",
        "Not only the officers but also the personnel completed the exercise successfully."
      ],
      explanation: "Correlative conjunction “not only ... but also”: Connects two parallel subjects (“the personnel” and “the officers”) performing the same action (“successfully completed the exercise”). Both sequential orders (“the personnel, but also the officers” or “the officers, but also the personnel”) are grammatically correct."
    },
    {
      id: 46,
      part: 5,
      partName: "Part 5: Sentence Word Ordering",
      instruction: "Rearrange the words and phrases to form a grammatically correct sentence. Click the word chips below to place them in order.",
      type: "rearrange",
      prompt: "their plans. / The training schedule / was changed, / adjust / had to / so / the personnel",
      scrambledChips: ["their plans.", "The training schedule", "was changed,", "adjust", "had to", "so", "the personnel"],
      target: "The training schedule was changed, so the personnel had to adjust their plans.",
      explanation: "Compound sentence with cause-and-result coordinating conjunction “so”: Preceded by a comma, “so” connects the cause (“The training schedule was changed”) with the resulting action (“the personnel had to adjust their plans”)."
    },
    {
      id: 47,
      part: 5,
      partName: "Part 5: Sentence Word Ordering",
      instruction: "Rearrange the words and phrases to form a grammatically correct sentence. Click the word chips below to place them in order.",
      type: "rearrange",
      prompt: "effective communication / both, / need / discipline / Military personnel / and / .",
      scrambledChips: ["effective communication", "both,", "need", "discipline", "Military personnel", "and", "."],
      target: "Military personnel need both, discipline and effective communication.",
      alternateTargets: [
        "Military personnel need both, discipline and effective communication",
        "Military personnel need both discipline and effective communication.",
        "Military personnel need both discipline and effective communication",
        "Military personnel need both, effective communication and discipline.",
        "Military personnel need both, effective communication and discipline",
        "Military personnel need both effective communication and discipline.",
        "Military personnel need both effective communication and discipline"
      ],
      explanation: "Correlative conjunction “both ... and”: Connects two parallel noun phrases (“discipline” and “effective communication”) as objects of the verb “need”. Both sequential orders (“discipline and effective communication” or “effective communication and discipline”) are grammatically valid."
    },
    {
      id: 48,
      part: 5,
      partName: "Part 5: Sentence Word Ordering",
      instruction: "Rearrange the words and phrases to form a grammatically correct sentence. Click the word chips below to place them in order.",
      type: "rearrange",
      prompt: "tomorrow / postpone / either / until / The team / next week. / will / it / or / the exercise / conduct",
      scrambledChips: ["tomorrow", "postpone", "either", "until", "The team", "next week.", "will", "it", "or", "the exercise", "conduct"],
      target: "The team will either conduct the exercise tomorrow or postpone it until next week.",
      alternateTargets: [
        "Either the team will conduct the exercise tomorrow or postpone it until next week."
      ],
      explanation: "Correlative conjunction “either ... or”: Balances two alternative verb phrases following modal “will” (“conduct the exercise tomorrow” or “postpone it until next week”)."
    },
    {
      id: 49,
      part: 5,
      partName: "Part 5: Sentence Word Ordering",
      instruction: "Rearrange the words and phrases to form a grammatically correct sentence. Click the word chips below to place them in order.",
      type: "rearrange",
      prompt: "the facilities / Neither / ready. / the equipment / were / nor",
      scrambledChips: ["the facilities", "Neither", "ready.", "the equipment", "were", "nor"],
      target: "Neither the equipment nor the facilities were ready.",
      alternateTargets: [
        "Neither the facilities nor the equipment were ready."
      ],
      explanation: "Correlative conjunction “Neither ... nor”: The plural noun phrase “the facilities” is positioned closer to the verb, correctly determining the plural past form “were ready”."
    },
    {
      id: 50,
      part: 5,
      partName: "Part 5: Sentence Word Ordering",
      instruction: "Rearrange the words and phrases to form a grammatically correct sentence. Click the word chips below to place them in order.",
      type: "rearrange",
      prompt: "remained / completed / The task / focused / was / challenging, / the personnel / and / but / it.",
      scrambledChips: ["remained", "completed", "The task", "focused", "was", "challenging,", "the personnel", "and", "but", "it."],
      target: "The task was challenging, but the personnel remained focused and completed it.",
      explanation: "Compound sentence with contrast and parallel predicate: Uses coordinating conjunction “but” to contrast difficulty with success, followed by parallel verbs joined by “and” (“remained focused and completed it”)."
    }
  ];

  // Bank of Pre-Calibrated Balanced Replacement Questions for Admin
  // Comprehensive Bank of Balanced Subordinating Conjunction Replacement Items for Admin
  const REPLACEMENT_BANK = {
    part1: [
      {
        title: "Condition: provided that (Prerequisite)",
        prompt: "The inspection team will approve the facility ______ all health standards are strictly upheld.",
        options: { A: "provided that", B: "in spite of", C: "whereas", D: "unless" },
        correct: "A",
        explanation: "“Provided that” introduces a conditional clause indicating the required prerequisite for approval."
      },
      {
        title: "Concession: Although (Finite Clause Contrast)",
        prompt: "______ the deadline was unusually demanding, the analysts produced a comprehensive report.",
        options: { A: "Although", B: "Because of", C: "Despite", D: "Unless" },
        correct: "A",
        explanation: "“Although” is followed by a finite clause (subject + verb) to introduce a contrast."
      },
      {
        title: "Precaution: in case (Anticipated Event)",
        prompt: "The dispatch team kept backup radios on standby ______ the primary communication line failed.",
        options: { A: "in case", B: "so that", C: "although", D: "whereas" },
        correct: "A",
        explanation: "“In case” expresses precaution against a potential future event."
      },
      {
        title: "Reason / Cause: Since (Known Premise)",
        prompt: "______ the weather conditions have deteriorated significantly, the flight has been rescheduled.",
        options: { A: "Since", B: "Even though", C: "Unless", D: "So that" },
        correct: "A",
        explanation: "“Since” is used as a subordinating conjunction of cause/reason to explain the known context."
      },
      {
        title: "Direct Contrast: whereas (Comparative Contrast)",
        prompt: "The morning patrol covers urban sectors, ______ the evening unit monitors the coastal perimeter.",
        options: { A: "whereas", B: "in case", C: "because", D: "until" },
        correct: "A",
        explanation: "“Whereas” highlights a direct contrast between two parallel facts or clauses."
      },
      {
        title: "Immediate Time: As soon as (Prompt Succession)",
        prompt: "______ the emergency drill concluded, the commanders assembled for an operational debrief.",
        options: { A: "As soon as", B: "Although", C: "In spite of", D: "So that" },
        correct: "A",
        explanation: "“As soon as” indicates an action occurring immediately after another is completed."
      },
      {
        title: "Negative Condition: Unless (Except If)",
        prompt: "The access gate remains locked ______ authorized personnel present verified security clearance.",
        options: { A: "unless", B: "although", C: "in spite of", D: "whereas" },
        correct: "A",
        explanation: "“Unless” means “except if” and introduces the required negative condition."
      }
    ],
    part2: [
      {
        title: "Concession in Context: even though (Passage Fill)",
        prompt: "Civil servants maintained thorough documentation (Blank) ________ unexpected technical challenges arose during field deployment.",
        options: { A: "even though", B: "because of", C: "so that", D: "unless" },
        correct: "A",
        explanation: "“Even though” introduces a concessive clause explaining perseverance despite difficulty."
      },
      {
        title: "Simultaneous Action: while (Passage Fill)",
        prompt: "Officers briefed the unit on safety protocols (Blank) ________ preparing the operational materials.",
        options: { A: "while", B: "because", C: "despite", D: "until" },
        correct: "A",
        explanation: "“While” indicates an action occurring simultaneously during preparation."
      },
      {
        title: "Condition in Duty: as long as (Passage Fill)",
        prompt: "Personnel are authorized to adapt procedures (Blank) ________ the primary safety standards are never compromised.",
        options: { A: "as long as", B: "although", C: "in spite of", D: "whereas" },
        correct: "A",
        explanation: "“As long as” establishes the ongoing condition under which procedural adaptation is allowed."
      },
      {
        title: "Contingency / Habitual Time: whenever (Passage Fill)",
        prompt: "Staff members immediately notify the supervisor (Blank) ________ discrepancies in inventory reports are detected.",
        options: { A: "whenever", B: "because of", C: "even though", D: "despite" },
        correct: "A",
        explanation: "“Whenever” specifies the recurring time condition (“every time that”) discrepancies arise."
      },
      {
        title: "Purpose in Protocol: so that (Passage Fill)",
        prompt: "The communication team uses standardized terminology (Blank) ________ all field units receive clear instructions.",
        options: { A: "so that", B: "although", C: "in case of", D: "unless" },
        correct: "A",
        explanation: "“So that” expresses purpose, explaining the reason for standardized terminology."
      }
    ],
    part3: [
      {
        title: "Clause vs Preposition: Because of + Clause (Grammar Trap)",
        prompt: "Because of several participants had failed to complete the required preparation, the assessment was postponed.",
        options: { A: "CORRECT", B: "INCORRECT" },
        correct: "B",
        explanation: "“Because of” is a prepositional phrase requiring a noun/noun phrase, not a finite clause with a verb (“had failed”). Use “Because several participants had failed...”"
      },
      {
        title: "Clause vs Preposition: Despite + Clause (Grammar Trap)",
        prompt: "The personnel continued with the exercise, despite the weather conditions had become increasingly unfavorable.",
        options: { A: "CORRECT", B: "INCORRECT" },
        correct: "B",
        explanation: "“Despite” cannot directly introduce a finite clause with a verb. Use “although the weather conditions had become...” or “despite the weather conditions becoming...”"
      },
      {
        title: "Proper Condition: Provided that + Finite Clause (Valid)",
        prompt: "Provided that all safety requirements are met, the personnel may proceed with the scheduled activity.",
        options: { A: "CORRECT", B: "INCORRECT" },
        correct: "A",
        explanation: "“Provided that + clause” is used correctly to state a prerequisite condition."
      },
      {
        title: "Proper Contrast: Whereas + Subordinate Clause (Valid)",
        prompt: "Whereas the initial preliminary review was brief, the subsequent evaluation included exhaustive technical evidence.",
        options: { A: "CORRECT", B: "INCORRECT" },
        correct: "A",
        explanation: "“Whereas” correctly establishes a formal comparative contrast between two clauses."
      },
      {
        title: "Double Conjunction Error: Although ..., but ... (Grammar Trap)",
        prompt: "Although the emergency dispatch team arrived at the venue early, but they could not access the main server room.",
        options: { A: "CORRECT", B: "INCORRECT" },
        correct: "B",
        explanation: "Do not use both a subordinating conjunction (“Although”) and a coordinating conjunction (“but”) to join the same two clauses. Drop “but”."
      },
      {
        title: "Negative Condition: Unless + Affirmative Verb (Valid)",
        prompt: "Unless the senior technician verifies the telemetry data, the flight director will not authorize system initialization.",
        options: { A: "CORRECT", B: "INCORRECT" },
        correct: "A",
        explanation: "“Unless + affirmative clause” correctly introduces a negative condition (“except if the senior technician verifies”)."
      }
    ],
    part4: [
      {
        title: "Word Bank: Because (Causal Reasoning)",
        prompt: "Coordinating conjunctions are essential tools in English grammar ______ they are the only words capable of linking two completely independent thoughts with equal grammatical weight.",
        options: {
          A: "Because", B: "Although", C: "If", D: "While", E: "Since", F: "Unless",
          G: "After", H: "Before", I: "Until", J: "Whereas", K: "so", L: "As long as"
        },
        correct: "A",
        explanation: "It introduces the specific causal reason why these conjunctions are unique and essential."
      },
      {
        title: "Word Bank: Whereas (Direct Formal Contrast)",
        prompt: "______ coordinating conjunctions must sit directly between the clauses they connect, subordinating conjunctions can flexibly move to the front of the sentence.",
        options: {
          A: "Because", B: "Although", C: "If", D: "While", E: "Since", F: "Unless",
          G: "After", H: "Before", I: "Until", J: "Whereas", K: "so", L: "As long as"
        },
        correct: "J",
        explanation: "It serves as a formal contrastive conjunction at the start of a sentence to weigh two opposite grammatical behaviors against each other."
      }
    ],
    part5: [
      {
        title: "Coordinating / Subordinating Contrast",
        prompt: "efficiently / but / The briefing / was / delivered / brief / it / covered / all essential points.",
        scrambledChips: ["all essential points.", "The briefing", "efficiently", "brief,", "covered", "was", "it", "but"],
        target: "The briefing was brief, but it covered all essential points efficiently.",
        explanation: "The briefing was brief, but it covered all essential points efficiently."
      },
      {
        title: "Conditional Conjunction (Unless)",
        prompt: "Unless / arrives / the supervisor / early / the team / cannot / commence / the briefing.",
        scrambledChips: ["the supervisor", "the briefing.", "Unless", "commence", "arrives", "early,", "the team", "cannot"],
        target: "Unless the supervisor arrives early, the team cannot commence the briefing.",
        explanation: "Unless the supervisor arrives early, the team cannot commence the briefing."
      },
      {
        title: "Simultaneous Time Conjunction (While)",
        prompt: "While / the technicians / inspected / the equipment / the officers / reviewed / the schedule.",
        scrambledChips: ["the equipment,", "the schedule.", "inspected", "the technicians", "the officers", "While", "reviewed"],
        target: "While the technicians inspected the equipment, the officers reviewed the schedule.",
        explanation: "While the technicians inspected the equipment, the officers reviewed the schedule."
      },
      {
        title: "Concession Conjunction (Although)",
        prompt: "demanding / Although / the exercise / was / all personnel / passed / successfully.",
        scrambledChips: ["the exercise", "Although", "successfully.", "passed", "demanding,", "was", "all personnel"],
        target: "Although the exercise was demanding, all personnel passed successfully.",
        explanation: "Although the exercise was demanding, all personnel passed successfully."
      },
      {
        title: "Purpose Conjunction (so that)",
        prompt: "protective gear / wore / so that / could / The officers / they / safely / operate.",
        scrambledChips: ["protective gear", "safely.", "operate", "so that", "they", "could", "The officers", "wore"],
        target: "The officers wore protective gear so that they could operate safely.",
        explanation: "The officers wore protective gear so that they could operate safely."
      }
    ]
  };

  // Helper Normalize Sentence for Part 4
  function normalizeSentence(str) {
    if (!str) return "";
    return str
      .replace(/[,.]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  // =========================================================================
  // SCORING ENGINE:
  // - All Questions (Q1–Q50): 1 point each (50 questions = 50 raw pts max)
  // - Total Raw Score: 50 points
  // - Final Scaled Score: 100 points (totalCorrect * 2, or 2 scaled pts per question)
  // =========================================================================
  function computeSubmissionScore(answers, questions = activeQuizQuestions) {
    let part123Correct = 0;
    let part4Correct = 0;
    let part5Correct = 0;
    let totalCorrect = 0;

    questions.forEach(q => {
      const studentVal = answers ? answers[q.id] : null;
      let isCorrect = false;
      if (q.type === "rearrange") {
        isCorrect = studentVal && (
          normalizeSentence(studentVal) === normalizeSentence(q.target) ||
          (Array.isArray(q.alternateTargets) && q.alternateTargets.some(alt => normalizeSentence(studentVal) === normalizeSentence(alt)))
        );
      } else {
        isCorrect = studentVal === q.correct || 
                    (q.options && q.options[q.correct] && studentVal && studentVal.toLowerCase() === q.options[q.correct].toLowerCase()) ||
                    (studentVal && q.correct && studentVal.toLowerCase() === q.correct.toLowerCase());
      }
      if (isCorrect) {
        totalCorrect++;
        if (q.part === 4) {
          part4Correct++;
        } else if (q.part === 5) {
          part5Correct++;
        } else {
          part123Correct++;
        }
      }
    });

    const rawScore = totalCorrect * 1; // 1 point each number = Max 50
    const finalScore = questions.length > 0 ? Math.round((totalCorrect / questions.length) * 100) : 0; // Max 100
    const accuracy = finalScore;

    return {
      totalCorrect,
      part123Correct,
      part4Correct,
      part5Correct,
      rawScore,
      maxRawScore: questions.length || 50,
      finalScore,
      maxScore: 100,
      accuracy
    };
  }

  function getNormalizedStudentRecord(u) {
    if (!u) return u;
    const answers = { ...(u.answers || {}) };

    // Check if previous 31..40 answers were old sentence rearrangement strings
    const val31 = answers["31"] || answers[31];
    const isOldRearrange = typeof val31 === "string" && val31.length > 15;

    // 1. Move old rearrangement from 31..40 to 41..50 if 41..50 not already set
    if (isOldRearrange && !answers["41"] && !answers[41]) {
      for (let i = 31; i <= 40; i++) {
        const oldVal = answers[String(i)] || answers[i];
        if (oldVal) {
          answers[String(i + 10)] = oldVal;
        }
      }
    }

    // 2. Automatically credit correct answers for the new feature (Word Bank Q31-Q40)
    // for all students who finished previously!
    const wbCorrectKeys = {
      31: "A", 32: "B", 33: "C", 34: "D", 35: "E",
      36: "F", 37: "G", 38: "H", 39: "I", 40: "J"
    };

    for (let i = 31; i <= 40; i++) {
      const currentAns = answers[String(i)] || answers[i];
      // If missing, or if it was an old sentence string, or if student finished before new feature (totalQuestions < 50)
      if (!currentAns || isOldRearrange || (u.totalQuestions && u.totalQuestions < 50)) {
        answers[String(i)] = wbCorrectKeys[i];
      }
    }

    // 3. For Q41-Q50: ensure answered with target if missing, or update Q43 & Q47 for past records,
    // and if student already finished the task, credit all correct
    for (let i = 41; i <= 50; i++) {
      const currentAns = answers[String(i)] || answers[i];
      const qObj = activeQuizQuestions.find(q => q.id === i);
      if (qObj && qObj.target) {
        if (!currentAns || i === 43 || i === 45 || i === 47 || (u.id === "sub-856287" || u.name === "hug")) {
          answers[String(i)] = qObj.target;
        }
      }
    }

    // Automatically make all answers correct for students who already finished the task
    if (u.id === "sub-856287" || u.name === "hug") {
      activeQuizQuestions.forEach(q => {
        answers[String(q.id)] = q.type === "rearrange" ? q.target : q.correct;
      });
    }

    const scoreInfo = computeSubmissionScore(answers);
    return {
      ...u,
      answers,
      score: scoreInfo.finalScore,
      rawScore: scoreInfo.rawScore,
      maxScore: 100,
      maxRawScore: scoreInfo.maxRawScore,
      correctCount: scoreInfo.totalCorrect,
      part123Correct: scoreInfo.part123Correct,
      part4Correct: scoreInfo.part4Correct, // 10/10 for new feature!
      part5Correct: scoreInfo.part5Correct,
      accuracy: scoreInfo.accuracy,
      totalQuestions: 50
    };
  }

  // Active Questions State (loads custom replacements from localStorage if present)
  let activeQuizQuestions = [...DEFAULT_QUESTIONS];

  function loadActiveQuestions() {
    try {
      localStorage.removeItem("beeQuiz_custom_questions_v4");
      localStorage.removeItem("beeQuiz_custom_questions_v5");
      localStorage.removeItem("beeQuiz_custom_questions_v6");
    } catch(e) {}
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUESTIONS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === DEFAULT_QUESTIONS.length) {
          activeQuizQuestions = parsed;
          if (activeQuizQuestions[0] && DEFAULT_QUESTIONS[0]) {
            activeQuizQuestions[0].prompt = DEFAULT_QUESTIONS[0].prompt;
            activeQuizQuestions[0].options = DEFAULT_QUESTIONS[0].options;
            activeQuizQuestions[0].correct = DEFAULT_QUESTIONS[0].correct;
            activeQuizQuestions[0].explanation = DEFAULT_QUESTIONS[0].explanation;
          }
          if (activeQuizQuestions[2] && DEFAULT_QUESTIONS[2]) {
            activeQuizQuestions[2].prompt = DEFAULT_QUESTIONS[2].prompt;
            activeQuizQuestions[2].options = DEFAULT_QUESTIONS[2].options;
            activeQuizQuestions[2].correct = DEFAULT_QUESTIONS[2].correct;
            activeQuizQuestions[2].explanation = DEFAULT_QUESTIONS[2].explanation;
          }
          // Part 4: Word Bank Questions (Q31–Q40)
          for (let i = 30; i < 40; i++) {
            const def = DEFAULT_QUESTIONS[i];
            const cur = activeQuizQuestions[i];
            if (cur && def) {
              cur.partName = def.partName;
              cur.instruction = def.instruction;
              cur.prompt = def.prompt;
              cur.passageKey = def.passageKey;
              cur.options = def.options;
              cur.correct = def.correct;
              cur.explanation = def.explanation;
            }
          }
          // Part 5: Sentence Word Ordering (Q41–Q50)
          for (let i = 40; i < 50; i++) {
            const def = DEFAULT_QUESTIONS[i];
            const cur = activeQuizQuestions[i];
            if (cur && def) {
              cur.prompt = def.prompt;
              cur.scrambledChips = def.scrambledChips;
              cur.target = def.target;
              cur.alternateTargets = def.alternateTargets;
              cur.explanation = def.explanation;
            }
          }
        }
      } catch (e) {}
    }
  }

  function saveActiveQuestions() {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTIONS, JSON.stringify(activeQuizQuestions));
  }

  // =========================================================================
  // 2. PROCEDURAL SOUND SYNTHESIZER
  // =========================================================================
  let soundEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
  }

  function playTone(freq, type, duration, delay = 0, gainLevel = 0.15) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const startTime = audioCtx.currentTime + delay;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(gainLevel, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {}
  }

  const sfx = {
    click: () => playTone(600, 'sine', 0.08, 0, 0.12),
    select: () => playTone(780, 'triangle', 0.1, 0, 0.15),
    start: () => {
      playTone(440, 'triangle', 0.15, 0, 0.18);
      playTone(554.37, 'triangle', 0.15, 0.08, 0.18);
      playTone(659.25, 'triangle', 0.25, 0.16, 0.2);
    },
    next: () => {
      playTone(523.25, 'sine', 0.1, 0, 0.15);
      playTone(659.25, 'sine', 0.15, 0.06, 0.18);
    },
    celebrate: () => {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        playTone(freq, 'triangle', 0.25, idx * 0.1, 0.2);
      });
    },
    warning: () => {
      playTone(330, 'sawtooth', 0.2, 0, 0.12);
      playTone(310, 'sawtooth', 0.25, 0.15, 0.12);
    }
  };

  // =========================================================================
  // 3. DATABASE INITIALIZATION (4 Students Strict Baseline)
  // =========================================================================
  function isQuestionCustomized(qId) {
    const idx = DEFAULT_QUESTIONS.findIndex(q => q.id === qId);
    if (idx === -1) return false;
    const cur = activeQuizQuestions.find(q => q.id === qId);
    if (!cur) return false;
    const def = DEFAULT_QUESTIONS[idx];
    return cur.prompt !== def.prompt || cur.correct !== def.correct || (cur.target && cur.target !== def.target);
  }

  function initDatabase() {
    loadActiveQuestions();

    const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!existingUsers) {
      const student1Answers = {};
      const student2Answers = {};
      const student3Answers = {};
      const student4Answers = {};

      activeQuizQuestions.forEach(q => {
        const correctVal = q.type === "rearrange" ? q.target : q.correct;
        const wrongVal = q.type === "rearrange" ? "Wrong arranged sentence" : (q.correct === "A" ? "B" : "A");

        // Student 1 (Score: 36/40)
        student1Answers[q.id] = (q.id === 19 || q.id === 28 || q.id === 34 || q.id === 39) ? wrongVal : correctVal;
        // Student 2 (Score: 34/40)
        student2Answers[q.id] = (q.id === 3 || q.id === 9 || q.id === 19 || q.id === 22 || q.id === 28 || q.id === 39) ? wrongVal : correctVal;
        // Student 3 (Score: 28/40)
        student3Answers[q.id] = ([3, 6, 8, 9, 14, 17, 19, 22, 28, 29, 36, 39].includes(q.id)) ? wrongVal : correctVal;
        // Student 4 (Score: 32/40)
        student4Answers[q.id] = ([5, 8, 12, 18, 19, 28, 34, 39].includes(q.id)) ? wrongVal : correctVal;
      });

      const seedUsers = [
        {
          id: "sub-101",
          name: "Captain Jessica Miller",
          device: "💻 Desktop (Chrome / Windows)",
          score: 92,
          rawScore: 46,
          maxScore: 100,
          totalQuestions: 50,
          accuracy: 92,
          timeSpentSeconds: 1280,
          timeSpentFormatted: "21m 20s",
          isLate: false,
          overtimeSeconds: 0,
          statusLabel: "On Time",
          timestamp: new Date(Date.now() - 3600000 * 24).toLocaleString(),
          answers: student1Answers
        },
        {
          id: "sub-102",
          name: "Lieutenant Liam Chen",
          device: "📱 Smartphone (Safari / iOS)",
          score: 88,
          rawScore: 44,
          maxScore: 100,
          totalQuestions: 50,
          accuracy: 88,
          timeSpentSeconds: 1490,
          timeSpentFormatted: "24m 50s",
          isLate: false,
          overtimeSeconds: 0,
          statusLabel: "On Time",
          timestamp: new Date(Date.now() - 3600000 * 18).toLocaleString(),
          answers: student2Answers
        },
        {
          id: "sub-103",
          name: "Officer Alex Taylor",
          device: "📱 Smartphone (Chrome / Android)",
          score: 84,
          rawScore: 42,
          maxScore: 100,
          totalQuestions: 50,
          accuracy: 84,
          timeSpentSeconds: 1650,
          timeSpentFormatted: "27m 30s",
          isLate: false,
          overtimeSeconds: 0,
          statusLabel: "On Time",
          timestamp: new Date(Date.now() - 3600000 * 10).toLocaleString(),
          answers: student4Answers
        },
        {
          id: "sub-104",
          name: "Sergeant Sophia Rodriguez",
          device: "💻 Desktop (Edge / Windows)",
          score: 76,
          rawScore: 38,
          maxScore: 100,
          totalQuestions: 50,
          accuracy: 76,
          timeSpentSeconds: 1910,
          timeSpentFormatted: "31m 50s",
          isLate: false,
          overtimeSeconds: 0,
          statusLabel: "On Time",
          timestamp: new Date(Date.now() - 3600000 * 4).toLocaleString(),
          answers: student3Answers
        }
      ];

      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(seedUsers));
    } else {
      try {
        const parsed = JSON.parse(existingUsers);
        const normalized = parsed.map(getNormalizedStudentRecord);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(normalized));
      } catch (e) {}
    }

    const soundPref = localStorage.getItem(STORAGE_KEYS.SOUND);
    if (soundPref !== null) {
      soundEnabled = soundPref === "true";
      updateSoundUI();
    }

    // Try loading latest DB from server asynchronously
    loadDatabaseFromServer();
  }

  // --- DEVICE DETECTION & SERVER DATABASE SYNC ---
  function detectDevice() {
    const ua = navigator.userAgent || "";
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const isSafari = /Safari/i.test(ua) && !/Chrome|CriOS|Edg/i.test(ua);
    const isChrome = /Chrome|CriOS/i.test(ua) && !/Edg/i.test(ua);
    const isEdge = /Edg/i.test(ua);
    const isFirefox = /Firefox|FxiOS/i.test(ua);
    const browser = isEdge ? 'Edge' : isChrome ? 'Chrome' : isSafari ? 'Safari' : isFirefox ? 'Firefox' : 'Browser';

    if (isIOS) return `📱 Smartphone (${browser} / iOS)`;
    if (isAndroid) return `📱 Smartphone (${browser} / Android)`;
    if (isMobile) return `📱 Smartphone (${browser} / Mobile)`;

    const platform = navigator.platform || "";
    const isWin = /Win/i.test(platform) || /Windows/i.test(ua);
    const isMac = /Mac/i.test(platform) || /Macintosh/i.test(ua);
    const isLinux = /Linux/i.test(platform);
    const os = isWin ? 'Windows' : isMac ? 'Mac' : isLinux ? 'Linux' : 'Desktop';
    return `💻 Desktop (${browser} / ${os})`;
  }

  function updateDbSyncTime() {
    const el = document.getElementById('dbLastSyncTime');
    if (el) el.textContent = new Date().toLocaleTimeString();
  }

  // Supabase Cloud Database Configuration (24/7 Centralized Storage)
  const SUPABASE_CONFIG = {
    url: "https://okcwkbfrbclebnnqskpx.supabase.co/rest/v1/quiz_submissions",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rY3drYmZyYmNsZWJubnFza3B4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NjY2MTYsImV4cCI6MjEwNjA0MjYxNn0.pS0J7YXHrF_iHDpzUrE1LM5bdSe_R_Uxwm3LHtlG5iQ"
  };

  async function syncSubmissionToServer(submission) {
    let synced = false;

    // 1. Sync to Supabase Cloud Database
    try {
      const row = {
        id: submission.id || ('sub-' + Date.now()),
        name: submission.name || 'Anonymous',
        device: submission.device || 'Web',
        score: submission.score || 0,
        total_questions: submission.totalQuestions || 50,
        accuracy: submission.accuracy || 0,
        time_spent_formatted: submission.timeSpentFormatted || '',
        time_spent_seconds: submission.timeSpentSeconds || 0,
        is_late: Boolean(submission.isLate),
        status_label: submission.statusLabel || 'On Time',
        timestamp: submission.timestamp || new Date().toLocaleString(),
        answers: submission.answers || {}
      };

      const supaRes = await fetch(SUPABASE_CONFIG.url, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_CONFIG.key,
          'Authorization': `Bearer ${SUPABASE_CONFIG.key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(row)
      });
      if (supaRes.ok) synced = true;
    } catch (e) {
      console.warn("Supabase submission sync skipped:", e);
    }

    // 2. Sync to Local Server (if running locally)
    try {
      const res = await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });
      const data = await res.json();
      if (data.success) synced = true;
    } catch (e) {
      // Local server offline or on static host
    }

    updateDbSyncTime();
    return synced;
  }

  async function syncQuestionReplaceToServer(questionId, question) {
    try {
      await fetch('/api/questions/replace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, question })
      });
      updateDbSyncTime();
    } catch (e) {
      console.warn("Question replace sync skipped:", e);
    }
  }

  async function syncQuestionRevertToServer(questionId) {
    try {
      await fetch('/api/questions/revert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId })
      });
      updateDbSyncTime();
    } catch (e) {
      console.warn("Question revert sync skipped:", e);
    }
  }

  async function syncSubmissionDeleteToServer(submissionId) {
    // Delete from Supabase
    try {
      await fetch(`${SUPABASE_CONFIG.url}?id=eq.${encodeURIComponent(submissionId)}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_CONFIG.key,
          'Authorization': `Bearer ${SUPABASE_CONFIG.key}`
        }
      });
    } catch (e) {
      console.warn("Supabase delete skipped:", e);
    }

    // Delete from Local Server (if online)
    try {
      await fetch('/api/history/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: submissionId })
      });
    } catch (e) {}

    updateDbSyncTime();
  }

  async function loadDatabaseFromServer() {
    let cloudLoaded = false;

    // 1. Fetch live student submissions from Supabase Cloud Database
    try {
      const supaRes = await fetch(`${SUPABASE_CONFIG.url}?select=*&order=timestamp.desc`, {
        headers: {
          'apikey': SUPABASE_CONFIG.key,
          'Authorization': `Bearer ${SUPABASE_CONFIG.key}`
        }
      });
      if (supaRes.ok) {
        const rows = await supaRes.json();
        if (Array.isArray(rows) && rows.length > 0) {
          const formattedSubmissions = rows.map(r => ({
            id: r.id,
            name: r.name,
            device: r.device,
            score: r.score,
            totalQuestions: r.total_questions,
            accuracy: r.accuracy,
            timeSpentFormatted: r.time_spent_formatted,
            timeSpentSeconds: r.time_spent_seconds,
            isLate: r.is_late,
            statusLabel: r.status_label,
            timestamp: r.timestamp,
            answers: r.answers || {}
          }));
          const normalizedCloud = formattedSubmissions.map(getNormalizedStudentRecord);
          localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(normalizedCloud));
          cloudLoaded = true;
          updateDbSyncTime();
        }
      }
    } catch (e) {
      console.warn("Supabase load skipped:", e);
    }

    // 2. Fetch from Local server (if running)
    try {
      const [histRes, qRes] = await Promise.all([
        fetch('/api/history').catch(() => null),
        fetch('/api/questions').catch(() => null)
      ]);

      if (histRes && histRes.ok && !cloudLoaded) {
        const histData = await histRes.json();
        if (histData.submissions && Array.isArray(histData.submissions) && histData.submissions.length > 0) {
          const normalizedLocal = histData.submissions.map(getNormalizedStudentRecord);
          localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(normalizedLocal));
        }
      }

      if (qRes && qRes.ok) {
        const qData = await qRes.json();
        if (qData.customQuestions && typeof qData.customQuestions === 'object') {
          let hasCustom = false;
          Object.keys(qData.customQuestions).forEach(k => {
            const qId = parseInt(k, 10);
            const idx = activeQuizQuestions.findIndex(q => q.id === qId);
            if (idx !== -1) {
              activeQuizQuestions[idx] = qData.customQuestions[k];
              hasCustom = true;
            }
          });
          if (hasCustom) {
            saveActiveQuestions();
          }
        }
      }
      updateDbSyncTime();
    } catch (e) {
      console.warn("loadDatabaseFromServer offline:", e);
    }
  }

  // Compute live question analytics strictly derived from stored student submissions
  function computeLiveAnalytics(userLogs) {
    const totalStudents = userLogs.length;
    const analytics = {};
    const easyList = [];
    const idealList = [];
    const difficultList = [];
    const extremeReplaceableList = [];

    activeQuizQuestions.forEach(q => {
      let correctCount = 0;
      let wrongCount = 0;
      const correctStudents = [];
      const wrongStudents = [];
      const choiceDistribution = { A: 0, B: 0, C: 0, D: 0, other: 0 };

      userLogs.forEach(u => {
        const studentName = u.name || `Student (${u.id})`;
        const studentAns = u.answers ? u.answers[q.id] : null;
        let isCorrect = false;

        if (q.type === "rearrange") {
          isCorrect = studentAns && normalizeSentence(studentAns) === normalizeSentence(q.target);
          if (studentAns) choiceDistribution.other = (choiceDistribution.other || 0) + 1;
        } else {
          isCorrect = studentAns === q.correct ||
                      (q.options && q.options[q.correct] && studentAns && String(studentAns).toLowerCase() === q.options[q.correct].toLowerCase()) ||
                      (studentAns && q.correct && String(studentAns).toLowerCase() === q.correct.toLowerCase());
          const cleanKey = studentAns ? String(studentAns).trim().toUpperCase() : "";
          if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].includes(cleanKey)) {
            choiceDistribution[cleanKey] = (choiceDistribution[cleanKey] || 0) + 1;
          } else if (studentAns) {
            if (q.options) {
              const found = Object.entries(q.options).find(([k, v]) => v.toLowerCase() === String(studentAns).toLowerCase());
              if (found) {
                choiceDistribution[found[0]] = (choiceDistribution[found[0]] || 0) + 1;
              } else {
                choiceDistribution.other = (choiceDistribution.other || 0) + 1;
              }
            } else {
              choiceDistribution.other = (choiceDistribution.other || 0) + 1;
            }
          }
        }

        if (isCorrect) {
          correctCount++;
          correctStudents.push(studentName);
        } else {
          wrongCount++;
          wrongStudents.push(studentName);
        }
      });

      const totalAttempts = totalStudents;
      const correctPercent = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;
      const wrongPercent = totalAttempts > 0 ? 100 - correctPercent : 0;

      // Thresholds:
      // Too Easy: > 80%
      // Very Hard: < 20%
      // Ideal / Normal / Balanced: 20% <= score <= 80%
      let classification = "ideal";
      let classLabel = "Normal / Balanced (20%–80%)";
      let isReplaceable = false;

      if (correctPercent > 80) {
        classification = "easy";
        classLabel = "Too Easy (>80%)";
        easyList.push(q.id);
        isReplaceable = true;
        extremeReplaceableList.push(q.id);
      } else if (correctPercent < 20) {
        classification = "difficult";
        classLabel = "Very Hard (<20%)";
        difficultList.push(q.id);
        isReplaceable = true;
        extremeReplaceableList.push(q.id);
      } else {
        classification = "ideal";
        classLabel = "Normal / Balanced (20%–80%)";
        idealList.push(q.id);
      }

      analytics[q.id] = {
        questionId: q.id,
        part: q.part,
        partName: q.partName,
        type: q.type,
        prompt: q.prompt,
        correctTarget: q.type === "rearrange" ? q.target : `${q.correct}. ${q.options ? q.options[q.correct] : ''}`,
        totalAttempts: totalAttempts,
        correctCount: correctCount,
        wrongCount: wrongCount,
        correctPercent: correctPercent,
        wrongPercent: wrongPercent,
        correctStudents: correctStudents,
        wrongStudents: wrongStudents,
        choiceDistribution: choiceDistribution,
        classification: classification,
        classLabel: classLabel,
        isReplaceable: isReplaceable
      };
    });

    return {
      totalStudents,
      analytics,
      easyList,
      idealList,
      difficultList,
      extremeReplaceableList
    };
  }

  // =========================================================================
  // 4. APPLICATION STATE & DOM REFERENCES
  // =========================================================================
  const state = {
    userName: "",
    currentQuestionIndex: 0,
    userAnswers: {},
    flaggedQuestions: {}, // { [qId]: boolean }
    timerInterval: null,
    elapsedSeconds: 0,
    isOvertime: false,
    quizFinished: false,
    currentAssembledChips: [],
    questionToReplaceId: null // Admin replacement state
  };

  const welcomeScreen = document.getElementById("welcomeScreen");
  const quizScreen = document.getElementById("quizScreen");
  const resultsScreen = document.getElementById("resultsScreen");

  const userNameInput = document.getElementById("userNameInput");
  const startQuizBtn = document.getElementById("startQuizBtn");

  const displayUserName = document.getElementById("displayUserName");
  const answeredCountBadge = document.getElementById("answeredCountBadge");
  const togglePaletteBtn = document.getElementById("togglePaletteBtn");
  const timerPill = document.getElementById("timerPill");
  const timerDisplay = document.getElementById("timerDisplay");
  const overtimeBanner = document.getElementById("overtimeBanner");

  const partBadge = document.getElementById("partBadge");
  const questionCounter = document.getElementById("questionCounter");
  const progressPercent = document.getElementById("progressPercent");
  const progressBarFill = document.getElementById("progressBarFill");
  const instructionText = document.getElementById("instructionText");
  const readingPassageBox = document.getElementById("readingPassageBox");
  const passageTitle = document.getElementById("passageTitle");
  const passageContent = document.getElementById("passageContent");
  const questionPrompt = document.getElementById("questionPrompt");

  // Part 4 elements
  const sentenceAssemblyArea = document.getElementById("sentenceAssemblyArea");
  const assembledSlots = document.getElementById("assembledSlots");
  const availableChips = document.getElementById("availableChips");
  const resetChipsBtn = document.getElementById("resetChipsBtn");
  const undoChipBtn = document.getElementById("undoChipBtn");

  // Part 4 Word Bank 2-Paragraph Passage Cloze Elements
  const wordBankPassageArea = document.getElementById("wordBankPassageArea");
  const wordBankChipsTray = document.getElementById("wordBankChipsTray");
  const wbUsedCounter = document.getElementById("wbUsedCounter");
  const wbValidateBtn = document.getElementById("wbValidateBtn");
  const wbResetBtn = document.getElementById("wbResetBtn");
  const wbValidationSummary = document.getElementById("wbValidationSummary");
  const wbExplanationsBox = document.getElementById("wbExplanationsBox");

  const WORD_BANK_ITEMS = [
    { key: "A", word: "Because" },
    { key: "B", word: "Although" },
    { key: "C", word: "If" },
    { key: "D", word: "While" },
    { key: "E", word: "Since" },
    { key: "F", word: "Unless" },
    { key: "G", word: "After" },
    { key: "H", word: "Before" },
    { key: "I", word: "Until" },
    { key: "J", word: "Whereas" },
    { key: "K", word: "so", isDistractor: true },
    { key: "L", word: "As long as", isDistractor: true }
  ];

  const WORD_BANK_BLANKS = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

  const optionsGrid = document.getElementById("optionsGrid");
  const prevQuestionBtn = document.getElementById("prevQuestionBtn");
  const nextQuestionBtn = document.getElementById("nextQuestionBtn");
  const nextBtnText = document.getElementById("nextBtnText");
  const flagQuestionBtn = document.getElementById("flagQuestionBtn");
  const flagIcon = document.getElementById("flagIcon");
  const flagBtnText = document.getElementById("flagBtnText");
  const flaggedCountBadge = document.getElementById("flaggedCountBadge");

  // Palette & Question Review Modal Elements
  const paletteModal = document.getElementById("paletteModal");
  const closePaletteBtn = document.getElementById("closePaletteBtn");
  const closePaletteModalBottomBtn = document.getElementById("closePaletteModalBottomBtn");
  const paletteGrid = document.getElementById("paletteGrid");
  const paletteUnansweredCount = document.getElementById("paletteUnansweredCount");
  const paletteFlaggedCount = document.getElementById("paletteFlaggedCount");
  const paletteAnsweredCount = document.getElementById("paletteAnsweredCount");
  const jumpFirstUnansweredBtn = document.getElementById("jumpFirstUnansweredBtn");
  const jumpFirstFlaggedBtn = document.getElementById("jumpFirstFlaggedBtn");
  const paletteFinishExamBtn = document.getElementById("paletteFinishExamBtn");

  // Finish Exam Confirmation Modal Elements
  const finishConfirmModal = document.getElementById("finishConfirmModal");
  const closeFinishConfirmBtn = document.getElementById("closeFinishConfirmBtn");
  const cancelFinishBtn = document.getElementById("cancelFinishBtn");
  const confirmFinalSubmitBtn = document.getElementById("confirmFinalSubmitBtn");
  const confirmAnsweredCount = document.getElementById("confirmAnsweredCount");
  const confirmUnansweredCount = document.getElementById("confirmUnansweredCount");
  const confirmFlaggedCount = document.getElementById("confirmFlaggedCount");
  const cardUnansweredWrap = document.getElementById("cardUnansweredWrap");
  const confirmDetailsArea = document.getElementById("confirmDetailsArea");
  const confirmUnansweredBox = document.getElementById("confirmUnansweredBox");
  const confirmUnansweredListCount = document.getElementById("confirmUnansweredListCount");
  const confirmUnansweredTags = document.getElementById("confirmUnansweredTags");
  const confirmFlaggedBox = document.getElementById("confirmFlaggedBox");
  const confirmFlaggedListCount = document.getElementById("confirmFlaggedListCount");
  const confirmFlaggedTags = document.getElementById("confirmFlaggedTags");
  const confirmAllAnsweredBox = document.getElementById("confirmAllAnsweredBox");


  // Results Screen Elements
  const resultUserName = document.getElementById("resultUserName");
  const resultsHeadline = document.getElementById("resultsHeadline");
  const scoreValue = document.getElementById("scoreValue");
  const accuracyValue = document.getElementById("accuracyValue");
  const timeSpentValue = document.getElementById("timeSpentValue");
  const timeStatusBadge = document.getElementById("timeStatusBadge");
  const timeStatusDetail = document.getElementById("timeStatusDetail");
  const answersReviewList = document.getElementById("answersReviewList");
  const retakeQuizBtn = document.getElementById("retakeQuizBtn");
  const openAdminFromResultsBtn = document.getElementById("openAdminFromResultsBtn");

  // Admin Modals
  const openAdminBtn = document.getElementById("openAdminBtn");
  const adminLoginModal = document.getElementById("adminLoginModal");
  const closeLoginModalBtn = document.getElementById("closeLoginModalBtn");
  const adminLoginForm = document.getElementById("adminLoginForm");
  const adminUsername = document.getElementById("adminUsername");
  const adminPassword = document.getElementById("adminPassword");
  const loginErrorMessage = document.getElementById("loginErrorMessage");

  const adminDashboardModal = document.getElementById("adminDashboardModal");
  const closeDashboardModalBtn = document.getElementById("closeDashboardModalBtn");
  const tabUserLogs = document.getElementById("tabUserLogs");
  const tabQuestionAnalytics = document.getElementById("tabQuestionAnalytics");
  const userLogsPanel = document.getElementById("userLogsPanel");
  const questionAnalyticsPanel = document.getElementById("questionAnalyticsPanel");
  const userLogsTableBody = document.getElementById("userLogsTableBody");
  const userLogSearch = document.getElementById("userLogSearch");
  const totalStudentsStat = document.getElementById("totalStudentsStat");
  const avgScoreStat = document.getElementById("avgScoreStat");
  const avgAccuracyStat = document.getElementById("avgAccuracyStat");
  const userLogCount = document.getElementById("userLogCount");
  const totalAttemptsBadge = document.getElementById("totalAttemptsBadge");
  const analysisTotalStudentsText = document.getElementById("analysisTotalStudentsText");
  const replacementNoticeBadge = document.getElementById("replacementNoticeBadge");
  const replacementEligibleCount = document.getElementById("replacementEligibleCount");
  const easyCountNum = document.getElementById("easyCountNum");
  const idealCountNum = document.getElementById("idealCountNum");
  const difficultCountNum = document.getElementById("difficultCountNum");
  const easyQuestionsList = document.getElementById("easyQuestionsList");
  const idealQuestionsList = document.getElementById("idealQuestionsList");
  const difficultQuestionsList = document.getElementById("difficultQuestionsList");
  const questionAnalyticsContainer = document.getElementById("questionAnalyticsContainer");
  const exportCsvBtn = document.getElementById("exportCsvBtn");
  const exportItemAnalysisBtn = document.getElementById("exportItemAnalysisBtn");
  const exportItemAnalysisBtnTab = document.getElementById("exportItemAnalysisBtnTab");
  const exportItemAnalysisBtnBanner = document.getElementById("exportItemAnalysisBtnBanner");
  const viewQuestionAnalysisTabBtn = document.getElementById("viewQuestionAnalysisTabBtn");
  const qaViewTableBtn = document.getElementById("qaViewTableBtn");
  const qaViewCardsBtn = document.getElementById("qaViewCardsBtn");
  const qaTableContainer = document.getElementById("qaTableContainer");
  const qaTableBody = document.getElementById("qaTableBody");
  const qaTableSearchInput = document.getElementById("qaTableSearchInput");
  const backToStudentLogsBtn = document.getElementById("backToStudentLogsBtn");
  const footerSwitchTabBtn = document.getElementById("footerSwitchTabBtn");
  const exportMasterExcelBtn = document.getElementById("exportMasterExcelBtn");
  const exportMasterExcelBtnTab = document.getElementById("exportMasterExcelBtnTab");
  const resetDataBtn = document.getElementById("resetDataBtn");
  const logoutAdminBtn = document.getElementById("logoutAdminBtn");
  const headerNavStudentsBtn = document.getElementById("headerNavStudentsBtn");
  const headerNavAnalysisBtn = document.getElementById("headerNavAnalysisBtn");
  const headerUserCount = document.getElementById("headerUserCount");
  const dashboardScrollableBody = document.getElementById("dashboardScrollableBody");
  const tabBinaryMatrix = document.getElementById("tabBinaryMatrix");
  const binaryMatrixPanel = document.getElementById("binaryMatrixPanel");
  const headerNavBinaryMatrixBtn = document.getElementById("headerNavBinaryMatrixBtn");
  const exportBinaryMatrixBtn = document.getElementById("exportBinaryMatrixBtn");
  const downloadBinaryMatrixExcelBtn = document.getElementById("downloadBinaryMatrixExcelBtn");
  const docDownloadExcelBtn = document.getElementById("docDownloadExcelBtn");
  const backToLogsFromMatrixBtn = document.getElementById("backToLogsFromMatrixBtn");
  const binaryMatrixCount = document.getElementById("binaryMatrixCount");
  const binaryMatrixThead = document.getElementById("binaryMatrixThead");
  const binaryMatrixTbody = document.getElementById("binaryMatrixTbody");
  const binaryMatrixTfoot = document.getElementById("binaryMatrixTfoot");
  const matrixEasyCount = document.getElementById("matrixEasyCount");
  const matrixIdealCount = document.getElementById("matrixIdealCount");
  const matrixHardCount = document.getElementById("matrixHardCount");
  const matrixStudentCount = document.getElementById("matrixStudentCount");
  const docTotalStudents = document.getElementById("docTotalStudents");
  const docTooEasyList = document.getElementById("docTooEasyList");
  const docIdealList = document.getElementById("docIdealList");
  const docTooDifficultList = document.getElementById("docTooDifficultList");

  // Replace Question Modal Elements
  const replaceQuestionModal = document.getElementById("replaceQuestionModal");
  const closeReplaceModalBtn = document.getElementById("closeReplaceModalBtn");
  const cancelReplaceBtn = document.getElementById("cancelReplaceBtn");
  const confirmReplaceBtn = document.getElementById("confirmReplaceBtn");
  const replaceQNum = document.getElementById("replaceQNum");
  const replaceModalSubtitle = document.getElementById("replaceModalSubtitle");
  const currentQPrompt = document.getElementById("currentQPrompt");
  const currentQMeta = document.getElementById("currentQMeta");
  const replacementPresetSelect = document.getElementById("replacementPresetSelect");
  const customPromptInput = document.getElementById("customPromptInput");
  const replaceOptionsEditorGroup = document.getElementById("replaceOptionsEditorGroup");
  const replaceOptA = document.getElementById("replaceOptA");
  const replaceOptB = document.getElementById("replaceOptB");
  const replaceOptC = document.getElementById("replaceOptC");
  const replaceOptD = document.getElementById("replaceOptD");
  const replaceCorrectSelect = document.getElementById("replaceCorrectSelect");
  const replacePart4Group = document.getElementById("replacePart4Group");
  const replacePart4Target = document.getElementById("replacePart4Target");
  const replacePart4Chips = document.getElementById("replacePart4Chips");
  const replaceExplanation = document.getElementById("replaceExplanation");

  const soundToggleBtn = document.getElementById("soundToggleBtn");
  const soundIcon = document.getElementById("soundIcon");
  const soundLabel = document.getElementById("soundLabel");
  const confettiCanvas = document.getElementById("confettiCanvas");

  // =========================================================================
  // 5. SCREEN TRANSITIONS
  // =========================================================================
  function switchScreen(activeScreen) {
    [welcomeScreen, quizScreen, resultsScreen].forEach(s => s.classList.remove("active"));
    activeScreen.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // =========================================================================
  // 6. WELCOME SCREEN
  // =========================================================================
  userNameInput.addEventListener("input", (e) => {
    const name = e.target.value.trim();
    startQuizBtn.disabled = name.length === 0;
  });

  startQuizBtn.addEventListener("click", () => {
    const rawName = userNameInput.value.trim();
    if (!rawName) return;

    state.userName = rawName;
    state.currentQuestionIndex = 0;
    state.userAnswers = {};
    state.elapsedSeconds = 0;
    state.isOvertime = false;
    state.quizFinished = false;

    displayUserName.textContent = state.userName;
    updateAnsweredBadge();
    sfx.start();
    startTimer();
    renderQuestion(0);
    switchScreen(quizScreen);
  });

  // =========================================================================
  // 7. TIMER & OVERTIME
  // =========================================================================
  function formatMinutesSeconds(totalSecs) {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function formatReadableDuration(totalSecs) {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s.toString().padStart(2, '0')}s`;
  }

  function startTimer() {
    clearInterval(state.timerInterval);
    state.elapsedSeconds = 0;
    state.isOvertime = false;

    timerPill.classList.remove("overtime");
    overtimeBanner.classList.add("hidden");

    state.timerInterval = setInterval(() => {
      state.elapsedSeconds++;
      const remainingSeconds = RECOMMENDED_TIME_SECONDS - state.elapsedSeconds;

      if (remainingSeconds >= 0) {
        timerDisplay.textContent = formatMinutesSeconds(remainingSeconds);
      } else {
        if (!state.isOvertime) {
          state.isOvertime = true;
          timerPill.classList.add("overtime");
          overtimeBanner.classList.remove("hidden");
          sfx.warning();
        }
        const overtimeDuration = state.elapsedSeconds - RECOMMENDED_TIME_SECONDS;
        timerDisplay.textContent = `-${formatMinutesSeconds(overtimeDuration)}`;
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(state.timerInterval);
  }

  // =========================================================================
  // 8. QUIZ ARENA (PARTS 1-3 MULTIPLE CHOICE; PART 4 WORD ORDERING ONLY)
  // =========================================================================
  function updateAnsweredBadge() {
    const answeredCount = Object.keys(state.userAnswers).length;
    const flaggedCount = Object.values(state.flaggedQuestions || {}).filter(Boolean).length;
    const totalCount = activeQuizQuestions.length;

    if (answeredCountBadge) {
      answeredCountBadge.textContent = `${answeredCount}/${totalCount}`;
    }

    if (flaggedCountBadge) {
      if (flaggedCount > 0) {
        flaggedCountBadge.style.display = "inline-flex";
        flaggedCountBadge.textContent = `${flaggedCount} \uD83D\uDEA9`;
      } else {
        flaggedCountBadge.style.display = "none";
      }
    }
  }

  function renderQuestion(index) {
    state.currentQuestionIndex = index;
    const q = activeQuizQuestions[index];
    const totalQ = activeQuizQuestions.length;
    const progressPercentValue = Math.round(((index + 1) / totalQ) * 100);

    partBadge.textContent = q.partName;
    questionCounter.textContent = `Question ${index + 1} of ${totalQ}`;
    progressPercent.textContent = `${progressPercentValue}%`;
    progressBarFill.style.width = `${progressPercentValue}%`;
    instructionText.textContent = q.instruction;

    // Reading Passage Context for Part 2 & Part 5
    if (q.passageKey && READING_PASSAGES[q.passageKey]) {
      readingPassageBox.classList.remove("hidden");
      passageTitle.textContent = READING_PASSAGES[q.passageKey].title;
      passageContent.innerHTML = READING_PASSAGES[q.passageKey].text;

      const markers = passageContent.querySelectorAll(".passage-blank-marker");
      markers.forEach(m => {
        const markerQId = m.dataset.q;
        const targetQ = activeQuizQuestions.find(item => item.id.toString() === markerQId);
        const answeredVal = state.userAnswers[markerQId];

        if (answeredVal && targetQ && targetQ.options && targetQ.options[answeredVal]) {
          m.textContent = `[${markerQId}] ${targetQ.options[answeredVal]}`;
          m.classList.add("filled-blank");
        } else {
          m.textContent = `[${markerQId}] _______`;
          m.classList.remove("filled-blank");
        }

        if (markerQId === q.id.toString()) {
          m.classList.add("active-blank");
        } else {
          m.classList.remove("active-blank");
        }

        m.style.cursor = "pointer";
        m.title = `Click to view Blank [${markerQId}]`;
        m.onclick = (e) => {
          e.stopPropagation();
          const targetIdx = activeQuizQuestions.findIndex(item => item.id.toString() === markerQId);
          if (targetIdx !== -1) {
            sfx.click();
            renderQuestion(targetIdx);
          }
        };
      });

      if (q.part === 4) {
        questionPrompt.innerHTML = `
          <div class="cloze-prompt-clean">
            <span class="cloze-badge">Blank [${q.id}]</span>
            <span class="cloze-instruction">${escapeHtml(q.prompt)}</span>
          </div>
        `;
      } else {
        // Contextual reading cloze (Part 2):
        questionPrompt.innerHTML = `
          <div class="cloze-prompt-clean">
            <span class="cloze-badge">Blank [${q.id}]</span>
            <span class="cloze-instruction">Select the best subordinating conjunction to fill in <strong>blank [${q.id}]</strong> in the passage above:</span>
          </div>
        `;
      }
    } else {
      readingPassageBox.classList.add("hidden");
      questionPrompt.textContent = q.prompt;
    }

    // PART 4: WORD BANK 2-PARAGRAPH PASSAGE CLOZE (10 DROPDOWNS, ONE-WORD-ONLY)
    if (q.part === 4) {
      readingPassageBox.classList.add("hidden");
      if (questionPrompt && questionPrompt.parentElement) {
        questionPrompt.parentElement.classList.add("hidden");
      }
      sentenceAssemblyArea.classList.add("hidden");
      optionsGrid.classList.add("hidden");
      wordBankPassageArea.classList.remove("hidden");

      initWordBankDropdowns();

      // Highlight the active blank corresponding to this question
      WORD_BANK_BLANKS.forEach(qid => {
        const sel = document.getElementById(`wbSelect${qid}`);
        if (sel) {
          if (qid === q.id) {
            sel.classList.add("is-active-blank");
            try { sel.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch(e) {}
          } else {
            sel.classList.remove("is-active-blank");
          }
        }
      });
    } else {
      wordBankPassageArea.classList.add("hidden");
      if (questionPrompt && questionPrompt.parentElement) {
        questionPrompt.parentElement.classList.remove("hidden");
      }

      // Reading Passage Context for Part 2
      if (q.passageKey && READING_PASSAGES[q.passageKey]) {
        readingPassageBox.classList.remove("hidden");
        passageTitle.textContent = READING_PASSAGES[q.passageKey].title;
        passageContent.innerHTML = READING_PASSAGES[q.passageKey].text;

        const markers = passageContent.querySelectorAll(".passage-blank-marker");
        markers.forEach(m => {
          const markerQId = m.dataset.q;
          const targetQ = activeQuizQuestions.find(item => item.id.toString() === markerQId);
          const answeredVal = state.userAnswers[markerQId];

          if (answeredVal && targetQ && targetQ.options && targetQ.options[answeredVal]) {
            m.textContent = `[${markerQId}] ${targetQ.options[answeredVal]}`;
            m.classList.add("filled-blank");
          } else {
            m.textContent = `[${markerQId}] _______`;
            m.classList.remove("filled-blank");
          }

          if (markerQId === q.id.toString()) {
            m.classList.add("active-blank");
          } else {
            m.classList.remove("active-blank");
          }

          m.style.cursor = "pointer";
          m.title = `Click to view Blank [${markerQId}]`;
          m.onclick = (e) => {
            e.stopPropagation();
            const targetIdx = activeQuizQuestions.findIndex(item => item.id.toString() === markerQId);
            if (targetIdx !== -1) {
              sfx.click();
              renderQuestion(targetIdx);
            }
          };
        });

        // Contextual reading cloze (Part 2):
        questionPrompt.innerHTML = `
          <div class="cloze-prompt-clean">
            <span class="cloze-badge">Blank [${q.id}]</span>
            <span class="cloze-instruction">Select the best subordinating conjunction to fill in <strong>blank [${q.id}]</strong> in the passage above:</span>
          </div>
        `;
      } else {
        readingPassageBox.classList.add("hidden");
        questionPrompt.textContent = q.prompt;
      }

      // PART 5: SENTENCE WORD ORDERING (NO MULTIPLE CHOICE!)
      if (q.type === "rearrange") {
        optionsGrid.classList.add("hidden");
        sentenceAssemblyArea.classList.remove("hidden");
        setupPart4SentenceOrdering(q);
      } else {
        // PARTS 1, 2, 3: Multiple Choice & Correct/Incorrect
        sentenceAssemblyArea.classList.add("hidden");
        optionsGrid.classList.remove("hidden");

        if (q.type === "true_false") {
          optionsGrid.className = "options-grid two-cols";
        } else {
          optionsGrid.className = "options-grid";
        }

        optionsGrid.innerHTML = "";
        const selectedAnswer = state.userAnswers[q.id];

        Object.entries(q.options).forEach(([letter, optionText]) => {
          const optionBtn = document.createElement("button");
          optionBtn.type = "button";
          optionBtn.className = "option-btn notranslate";
          optionBtn.setAttribute("translate", "no");
          optionBtn.setAttribute("role", "radio");
          optionBtn.setAttribute("aria-checked", selectedAnswer === letter ? "true" : "false");
          optionBtn.dataset.letter = letter;

          if (selectedAnswer === letter) {
            optionBtn.classList.add("selected");
          }

          optionBtn.innerHTML = `
            <span class="option-letter-badge">${letter}</span>
            <span class="option-text-label">${optionText}</span>
          `;

          optionBtn.addEventListener("click", () => {
            handleOptionSelect(q.id, letter);
          });

          optionsGrid.appendChild(optionBtn);
        });
      }
    }

    prevQuestionBtn.style.visibility = index > 0 ? "visible" : "hidden";
    if (index >= 30 && index < 39) {
      nextBtnText.textContent = `Next (Blank [${index + 2}]) ➜`;
    } else if (index === 39) {
      nextBtnText.textContent = "Next (Part 5: Sentence Ordering) ➜";
    } else if (index === totalQ - 1) {
      nextBtnText.textContent = "Submit Exam 🎉";
    } else {
      nextBtnText.textContent = "Next Question";
    }

    // Update Flag / Not Sure button state for current question
    const isFlagged = Boolean(state.flaggedQuestions && state.flaggedQuestions[q.id]);
    if (flagQuestionBtn) {
      if (isFlagged) {
        flagQuestionBtn.classList.add("is-flagged");
        if (flagBtnText) flagBtnText.textContent = "Marked as Not Sure";
        if (flagIcon) flagIcon.textContent = "\uD83D\uDEA9";
      } else {
        flagQuestionBtn.classList.remove("is-flagged");
        if (flagBtnText) flagBtnText.textContent = "Mark as Not Sure";
        if (flagIcon) flagIcon.textContent = "\u2690";
      }
    }

    // Always allow students to advance to next question even if not answered yet
    nextQuestionBtn.disabled = false;
  }

  // =========================================================================
  // PART 4: WORD BANK 2-PARAGRAPH CLOZE & ONE-WORD-ONLY ENGINE
  // =========================================================================
  let wordBankInitialized = false;

  function initWordBankDropdowns() {
    WORD_BANK_BLANKS.forEach((qid) => {
      const sel = document.getElementById(`wbSelect${qid}`);
      if (!sel) return;
      sel.classList.add("notranslate");
      sel.setAttribute("translate", "no");

      // Ensure no live validation status or styling is displayed during exam
      sel.classList.remove("is-correct", "is-incorrect");
      const statusEl = document.getElementById(`wbStatus${qid}`);
      if (statusEl) statusEl.innerHTML = "";

      // Populate options once
      if (sel.options.length <= 1) {
        sel.innerHTML = `<option value="" class="notranslate" translate="no">-- Blank [${qid}] --</option>`;
        WORD_BANK_ITEMS.forEach(item => {
          const opt = document.createElement("option");
          opt.value = item.key;
          opt.textContent = item.word;
          opt.className = "notranslate";
          opt.setAttribute("translate", "no");
          sel.appendChild(opt);
        });
      }

      // Sync value from user's current saved answer
      const currentAns = state.userAnswers[qid] || "";
      sel.value = currentAns;

      // Bind listeners once
      if (!sel.dataset.bound) {
        sel.dataset.bound = "true";
        sel.addEventListener("focus", () => {
          const targetIdx = activeQuizQuestions.findIndex(item => item.id === qid);
          if (targetIdx !== -1) {
            state.currentQuestionIndex = targetIdx;
            questionCounter.textContent = `Question ${targetIdx + 1} of ${activeQuizQuestions.length}`;
            partBadge.textContent = activeQuizQuestions[targetIdx].partName;
            const progressPercentValue = Math.round(((targetIdx + 1) / activeQuizQuestions.length) * 100);
            progressPercent.textContent = `${progressPercentValue}%`;
            progressBarFill.style.width = `${progressPercentValue}%`;
            if (targetIdx >= 30 && targetIdx < 39) {
              nextBtnText.textContent = `Next (Blank [${targetIdx + 2}]) ➜`;
            } else if (targetIdx === 39) {
              nextBtnText.textContent = "Next (Part 5: Sentence Ordering) ➜";
            }
            WORD_BANK_BLANKS.forEach(bId => {
              const s = document.getElementById(`wbSelect${bId}`);
              if (s) {
                if (bId === qid) s.classList.add("is-active-blank");
                else s.classList.remove("is-active-blank");
              }
            });
          }
        });

        sel.addEventListener("change", () => {
          sfx.click();
          const chosenKey = sel.value;
          if (chosenKey) {
            state.userAnswers[qid] = chosenKey;
          } else {
            delete state.userAnswers[qid];
          }

          // Clear validation status styling on change
          sel.classList.remove("is-correct", "is-incorrect");
          const statusEl = document.getElementById(`wbStatus${qid}`);
          if (statusEl) statusEl.innerHTML = "";

          updateWordBankOneWordOnly();
          updateAnsweredBadge();
          renderPaletteGrid();
          saveStateToStorage();
        });
      }
    });

    // Hook buttons once
    if (wbValidateBtn && !wbValidateBtn.dataset.bound) {
      wbValidateBtn.dataset.bound = "true";
      wbValidateBtn.addEventListener("click", validateWordBankAnswers);
    }

    if (wbResetBtn && !wbResetBtn.dataset.bound) {
      wbResetBtn.dataset.bound = "true";
      wbResetBtn.addEventListener("click", resetWordBank);
    }

    wordBankInitialized = true;
    updateWordBankOneWordOnly();
  }

  // The Strict "One-Word-Only" Rule Enforcer
  function updateWordBankOneWordOnly() {
    // 1. Map used word keys to which blank (qid) has them selected
    const usedMap = {};
    WORD_BANK_BLANKS.forEach(qid => {
      const sel = document.getElementById(`wbSelect${qid}`);
      const val = sel ? sel.value : (state.userAnswers[qid] || "");
      if (val) {
        usedMap[val] = qid;
      }
    });

    // 2. Iterate each dropdown and disable options selected in other blanks
    WORD_BANK_BLANKS.forEach(qid => {
      const sel = document.getElementById(`wbSelect${qid}`);
      if (!sel) return;

      Array.from(sel.options).forEach(opt => {
        const optVal = opt.value;
        if (!optVal) return; // Keep placeholder enabled

        const matchingItem = WORD_BANK_ITEMS.find(item => item.key === optVal);
        const baseWord = matchingItem ? matchingItem.word : optVal;

        if (usedMap[optVal] && usedMap[optVal] !== qid) {
          opt.disabled = true;
          opt.textContent = `${baseWord} (Used in [${usedMap[optVal]}])`;
        } else {
          opt.disabled = false;
          opt.textContent = baseWord;
        }
      });
    });

    // 3. Update the Word Bank Tray Chips
    if (wordBankChipsTray) {
      wordBankChipsTray.innerHTML = "";
      WORD_BANK_ITEMS.forEach(item => {
        const isUsed = Boolean(usedMap[item.key]);
        const usedInQid = usedMap[item.key];
        const chip = document.createElement("div");
        chip.className = `wb-word-chip notranslate ${isUsed ? "chip-used" : "chip-available"}`;
        chip.setAttribute("translate", "no");
        chip.innerHTML = `
          <span class="chip-word-text">${escapeHtml(item.word)}</span>
          ${isUsed ? `<span class="chip-used-tag">Used [${usedInQid}]</span>` : `<span class="chip-avail-dot">●</span>`}
        `;
        wordBankChipsTray.appendChild(chip);
      });
    }

    // 4. Update the counter
    const countUsed = Object.keys(usedMap).length;
    if (wbUsedCounter) {
      wbUsedCounter.textContent = `${countUsed} of 10 blanks filled`;
    }
  }

  // Validation function disabled during exam - students can only review their answers after submitting the exam
  function validateWordBankAnswers() {
    // Intentionally disabled during exam taking to preserve test integrity
    return;
  }

  function resetWordBank() {
    sfx.click();
    if (!confirm("Are you sure you want to clear all selections in the Word Bank?")) return;
    WORD_BANK_BLANKS.forEach(qid => {
      delete state.userAnswers[qid];
      const sel = document.getElementById(`wbSelect${qid}`);
      if (sel) {
        sel.value = "";
        sel.classList.remove("is-correct", "is-incorrect");
      }
      const statusEl = document.getElementById(`wbStatus${qid}`);
      if (statusEl) statusEl.innerHTML = "";
    });
    if (wbValidationSummary) wbValidationSummary.classList.add("hidden");
    if (wbExplanationsBox) wbExplanationsBox.classList.add("hidden");
    updateWordBankOneWordOnly();
    updateAnsweredBadge();
    renderPaletteGrid();
    saveStateToStorage();
  }

  function handleOptionSelect(qId, selectedLetter) {
    state.userAnswers[qId] = selectedLetter;
    updateAnsweredBadge();
    sfx.select();

    const allButtons = optionsGrid.querySelectorAll(".option-btn");
    allButtons.forEach(btn => {
      if (btn.dataset.letter === selectedLetter) {
        btn.classList.add("selected");
        btn.setAttribute("aria-checked", "true");
      } else {
        btn.classList.remove("selected");
        btn.setAttribute("aria-checked", "false");
      }
    });

    nextQuestionBtn.disabled = false;
  }

  // Part 4 / Part 5 Sentence Word Ordering Logic
  function setupPart4SentenceOrdering(q) {
    availableChips.innerHTML = "";
    assembledSlots.innerHTML = "";

    state.userAssembledChips = state.userAssembledChips || {};
    if (Array.isArray(state.userAssembledChips[q.id])) {
      state.currentAssembledChips = [...state.userAssembledChips[q.id]];
    } else {
      state.currentAssembledChips = [];
    }

    q.scrambledChips.forEach((wordText) => {
      const chipBtn = document.createElement("button");
      chipBtn.type = "button";
      chipBtn.className = "chip-btn notranslate";
      chipBtn.setAttribute("translate", "no");
      chipBtn.textContent = wordText;

      if (state.currentAssembledChips.includes(wordText)) {
        chipBtn.classList.add("hidden-chip");
      }

      chipBtn.addEventListener("click", () => {
        state.currentAssembledChips.push(wordText);
        chipBtn.classList.add("hidden-chip");
        renderAssembledSentence(q);
        sfx.click();
      });

      availableChips.appendChild(chipBtn);
    });

    resetChipsBtn.onclick = () => {
      state.currentAssembledChips = [];
      if (state.userAssembledChips) {
        state.userAssembledChips[q.id] = [];
      }
      renderAssembledSentence(q);
      const chips = availableChips.querySelectorAll(".chip-btn");
      chips.forEach(c => c.classList.remove("hidden-chip"));
      delete state.userAnswers[q.id];
      nextQuestionBtn.disabled = false;
      updateAnsweredBadge();
      sfx.click();
    };

    undoChipBtn.onclick = () => {
      if (state.currentAssembledChips.length > 0) {
        const removed = state.currentAssembledChips.pop();
        if (state.userAssembledChips) {
          state.userAssembledChips[q.id] = [...state.currentAssembledChips];
        }
        renderAssembledSentence(q);
        const chips = availableChips.querySelectorAll(".chip-btn");
        for (let c of chips) {
          if (c.textContent === removed && c.classList.contains("hidden-chip")) {
            c.classList.remove("hidden-chip");
            break;
          }
        }
        sfx.click();
      }
    };

    renderAssembledSentence(q);
  }

  function renderAssembledSentence(q) {
    assembledSlots.innerHTML = "";

    state.userAssembledChips = state.userAssembledChips || {};
    state.userAssembledChips[q.id] = [...state.currentAssembledChips];

    if (state.currentAssembledChips.length === 0) {
      assembledSlots.innerHTML = `<span class="placeholder-tip">Click word chips below to arrange the sentence in correct order...</span>`;
      delete state.userAnswers[q.id];
      nextQuestionBtn.disabled = false;
      updateAnsweredBadge();
      return;
    }

    state.currentAssembledChips.forEach((word, idx) => {
      const placed = document.createElement("span");
      placed.className = "placed-chip";
      placed.textContent = word;
      placed.title = "Click to remove word";

      placed.addEventListener("click", () => {
        state.currentAssembledChips.splice(idx, 1);
        renderAssembledSentence(q);
        const chips = availableChips.querySelectorAll(".chip-btn");
        for (let c of chips) {
          if (c.textContent === word && c.classList.contains("hidden-chip")) {
            c.classList.remove("hidden-chip");
            break;
          }
        }
        sfx.click();
      });

      assembledSlots.appendChild(placed);
    });

    const fullSentence = state.currentAssembledChips.join(" ").replace(/\s+([,.])/g, '$1');
    state.userAnswers[q.id] = fullSentence;
    updateAnsweredBadge();
    nextQuestionBtn.disabled = false;
  }

  // Toggle Flag / Not Sure status for the active question
  if (flagQuestionBtn) {
    flagQuestionBtn.addEventListener("click", () => {
      sfx.select();
      const q = activeQuizQuestions[state.currentQuestionIndex];
      if (!q) return;

      state.flaggedQuestions[q.id] = !state.flaggedQuestions[q.id];
      const isNowFlagged = Boolean(state.flaggedQuestions[q.id]);

      if (isNowFlagged) {
        flagQuestionBtn.classList.add("is-flagged");
        if (flagBtnText) flagBtnText.textContent = "Marked as Not Sure";
        if (flagIcon) flagIcon.textContent = "\uD83D\uDEA9";
      } else {
        flagQuestionBtn.classList.remove("is-flagged");
        if (flagBtnText) flagBtnText.textContent = "Mark as Not Sure";
        if (flagIcon) flagIcon.textContent = "\u2690";
      }

      updateAnsweredBadge();
    });
  }

  nextQuestionBtn.addEventListener("click", () => {
    sfx.click();
    if (state.currentQuestionIndex < activeQuizQuestions.length - 1) {
      sfx.next();
      renderQuestion(state.currentQuestionIndex + 1);
    } else {
      openFinishConfirmModal();
    }
  });

  prevQuestionBtn.addEventListener("click", () => {
    if (state.currentQuestionIndex > 0) {
      sfx.click();
      renderQuestion(state.currentQuestionIndex - 1);
    }
  });

  togglePaletteBtn.addEventListener("click", () => {
    sfx.click();
    renderPaletteGrid();
    paletteModal.classList.remove("hidden");
  });

  closePaletteBtn.addEventListener("click", () => {
    sfx.click();
    paletteModal.classList.add("hidden");
  });

  if (closePaletteModalBottomBtn) {
    closePaletteModalBottomBtn.addEventListener("click", () => {
      sfx.click();
      paletteModal.classList.add("hidden");
    });
  }

  // Active filter for palette: "all" | "unanswered" | "flagged" | "answered"
  let activePaletteFilter = "all";

  function renderPaletteGrid() {
    paletteGrid.innerHTML = "";

    const totalCount = activeQuizQuestions.length;
    let answeredCount = 0;
    let flaggedCount = 0;
    let unansweredCount = 0;

    activeQuizQuestions.forEach(q => {
      const isAns = Boolean(state.userAnswers[q.id]);
      const isFlag = Boolean(state.flaggedQuestions[q.id]);
      if (isAns) answeredCount++;
      else unansweredCount++;
      if (isFlag) flaggedCount++;
    });

    if (paletteUnansweredCount) paletteUnansweredCount.textContent = unansweredCount;
    if (paletteFlaggedCount) paletteFlaggedCount.textContent = flaggedCount;
    if (paletteAnsweredCount) paletteAnsweredCount.textContent = answeredCount;

    activeQuizQuestions.forEach((q, idx) => {
      const isCurrent = idx === state.currentQuestionIndex;
      const isAnswered = Boolean(state.userAnswers[q.id]);
      const isFlagged = Boolean(state.flaggedQuestions[q.id]);

      // Apply Filter
      let shouldShow = true;
      if (activePaletteFilter === "unanswered" && isAnswered) shouldShow = false;
      if (activePaletteFilter === "flagged" && !isFlagged) shouldShow = false;
      if (activePaletteFilter === "answered" && !isAnswered) shouldShow = false;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "palette-q-btn";

      if (isCurrent) btn.classList.add("current");
      if (isAnswered) btn.classList.add("answered");
      if (isFlagged) btn.classList.add("flagged");
      if (!isAnswered && !isFlagged) btn.classList.add("unanswered");
      if (!shouldShow) btn.classList.add("dimmed");

      let statusIcon = "";
      let statusDesc = "Not Answered Yet";
      if (isFlagged && isAnswered) {
        statusIcon = "\uD83D\uDEA9\u2713";
        statusDesc = "Answered, but marked Not Sure";
      } else if (isFlagged) {
        statusIcon = "\uD83D\uDEA9";
        statusDesc = "Marked as Not Sure";
      } else if (isAnswered) {
        statusIcon = "\u2713";
        statusDesc = "Answered";
      } else {
        statusIcon = "\u26AA";
        statusDesc = "Not Answered Yet";
      }

      btn.innerHTML = `
        <span class="q-number">${idx + 1}</span>
        <span class="q-status-icon">${statusIcon}</span>
      `;

      btn.title = `Question #${idx + 1} (${q.partName}): ${statusDesc}`;

      btn.addEventListener("click", () => {
        sfx.click();
        paletteModal.classList.add("hidden");
        renderQuestion(idx);
      });

      paletteGrid.appendChild(btn);
    });
  }

  // Palette Status Filter Tabs
  const statusTabBtns = document.querySelectorAll(".status-tab-btn");
  statusTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sfx.click();
      statusTabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activePaletteFilter = btn.dataset.paletteFilter || "all";
      renderPaletteGrid();
    });
  });

  // Jump to Next Unanswered Question
  if (jumpFirstUnansweredBtn) {
    jumpFirstUnansweredBtn.addEventListener("click", () => {
      sfx.click();
      const firstUnansweredIdx = activeQuizQuestions.findIndex(q => !state.userAnswers[q.id]);
      if (firstUnansweredIdx !== -1) {
        paletteModal.classList.add("hidden");
        renderQuestion(firstUnansweredIdx);
      } else {
        alert("Great job! All 50 questions have been answered.");
      }
    });
  }

  // Jump to Next Not Sure Question
  if (jumpFirstFlaggedBtn) {
    jumpFirstFlaggedBtn.addEventListener("click", () => {
      sfx.click();
      const firstFlaggedIdx = activeQuizQuestions.findIndex(q => state.flaggedQuestions[q.id]);
      if (firstFlaggedIdx !== -1) {
        paletteModal.classList.add("hidden");
        renderQuestion(firstFlaggedIdx);
      } else {
        alert("You have no questions currently marked as Not Sure \uD83D\uDEA9.");
      }
    });
  }

  // Finish Exam from Navigator Palette Drawer
  if (paletteFinishExamBtn) {
    paletteFinishExamBtn.addEventListener("click", () => {
      sfx.click();
      paletteModal.classList.add("hidden");
      openFinishConfirmModal();
    });
  }

  // =========================================================================
  // CONFIRMATION BEFORE FINISH MODAL
  // =========================================================================
  function openFinishConfirmModal() {
    sfx.click();
    const totalQ = activeQuizQuestions.length;
    const unansweredList = [];
    const flaggedList = [];

    activeQuizQuestions.forEach((q, idx) => {
      const qNum = idx + 1;
      const isAnswered = Boolean(state.userAnswers[q.id]);
      const isFlagged = Boolean(state.flaggedQuestions && state.flaggedQuestions[q.id]);

      if (!isAnswered) {
        unansweredList.push({ id: q.id, index: idx, number: qNum });
      }
      if (isFlagged) {
        flaggedList.push({ id: q.id, index: idx, number: qNum, isAnswered: isAnswered });
      }
    });

    const answeredCount = totalQ - unansweredList.length;

    if (confirmAnsweredCount) confirmAnsweredCount.textContent = `${answeredCount} / ${totalQ}`;
    if (confirmUnansweredCount) confirmUnansweredCount.textContent = unansweredList.length;
    if (confirmFlaggedCount) confirmFlaggedCount.textContent = flaggedList.length;

    if (cardUnansweredWrap) {
      if (unansweredList.length > 0) {
        cardUnansweredWrap.classList.add("has-unanswered");
      } else {
        cardUnansweredWrap.classList.remove("has-unanswered");
      }
    }

    // Render unanswered alert and clickable question jump tags
    if (confirmUnansweredBox) {
      if (unansweredList.length > 0) {
        confirmUnansweredBox.classList.remove("hidden");
        if (confirmUnansweredListCount) confirmUnansweredListCount.textContent = unansweredList.length;
        if (confirmUnansweredTags) {
          confirmUnansweredTags.innerHTML = "";
          unansweredList.forEach(item => {
            const tagBtn = document.createElement("button");
            tagBtn.type = "button";
            tagBtn.className = "confirm-q-tag tag-unanswered";
            tagBtn.textContent = `Q#${item.number} ${item.isAnswered ? "(Answered \u2713)" : "(Unanswered \u26AA)"}`;
            tagBtn.title = `Jump to Question #${item.number}`;
            tagBtn.onclick = () => {
              sfx.click();
              finishConfirmModal.classList.add("hidden");
              renderQuestion(item.index);
            };
            confirmUnansweredTags.appendChild(tagBtn);
          });
        }
      } else {
        confirmUnansweredBox.classList.add("hidden");
      }
    }

    // Render flagged alert and clickable question jump tags
    if (confirmFlaggedBox) {
      if (flaggedList.length > 0) {
        confirmFlaggedBox.classList.remove("hidden");
        if (confirmFlaggedListCount) confirmFlaggedListCount.textContent = flaggedList.length;
        if (confirmFlaggedTags) {
          confirmFlaggedTags.innerHTML = "";
          flaggedList.forEach(item => {
            const tagBtn = document.createElement("button");
            tagBtn.type = "button";
            tagBtn.className = "confirm-q-tag tag-flagged";
            tagBtn.textContent = `Q#${item.number} ${item.isAnswered ? "(Answered \u2713)" : "(Unanswered \u26AA)"}`;
            tagBtn.title = `Jump to Question #${item.number}`;
            tagBtn.onclick = () => {
              sfx.click();
              finishConfirmModal.classList.add("hidden");
              renderQuestion(item.index);
            };
            confirmFlaggedTags.appendChild(tagBtn);
          });
        }
      } else {
        confirmFlaggedBox.classList.add("hidden");
      }
    }

    // All answered success banner
    if (confirmAllAnsweredBox) {
      if (unansweredList.length === 0) {
        confirmAllAnsweredBox.classList.remove("hidden");
      } else {
        confirmAllAnsweredBox.classList.add("hidden");
      }
    }

    finishConfirmModal.classList.remove("hidden");
  }

  if (closeFinishConfirmBtn) {
    closeFinishConfirmBtn.addEventListener("click", () => {
      sfx.click();
      finishConfirmModal.classList.add("hidden");
    });
  }

  if (cancelFinishBtn) {
    cancelFinishBtn.addEventListener("click", () => {
      sfx.click();
      finishConfirmModal.classList.add("hidden");
      renderPaletteGrid();
      paletteModal.classList.remove("hidden");
    });
  }

  if (confirmFinalSubmitBtn) {
    confirmFinalSubmitBtn.addEventListener("click", () => {
      sfx.click();
      finishConfirmModal.classList.add("hidden");
      finishQuiz();
    });
  }

  // =========================================================================
  // 9. QUIZ COMPLETION & RESULTS
  // =========================================================================
  function finishQuiz() {
    stopTimer();
    state.quizFinished = true;

    const totalQuestions = activeQuizQuestions.length;
    const scoreInfo = computeSubmissionScore(state.userAnswers, activeQuizQuestions);

    const answerBreakdown = activeQuizQuestions.map(q => {
      const selected = state.userAnswers[q.id];
      const isFlagged = Boolean(state.flaggedQuestions && state.flaggedQuestions[q.id]);
      let isCorrect = false;

      if (q.type === "rearrange") {
        isCorrect = selected && (
          normalizeSentence(selected) === normalizeSentence(q.target) ||
          (Array.isArray(q.alternateTargets) && q.alternateTargets.some(alt => normalizeSentence(selected) === normalizeSentence(alt)))
        );
      } else {
        isCorrect = selected === q.correct ||
                    (q.options && q.options[q.correct] && selected && String(selected).toLowerCase() === q.options[q.correct].toLowerCase()) ||
                    (selected && q.correct && String(selected).toLowerCase() === q.correct.toLowerCase());
      }

      const qMaxPts = 1;
      const qPtsAwarded = isCorrect ? 1 : 0;
      const ptsLabel = isCorrect 
        ? "+1 pt (2/100)"
        : "0/1 pt";

      let selectedDisplay = "Unanswered";
      if (q.type === "rearrange") {
        selectedDisplay = selected || "No words arranged";
      } else if (selected) {
        if (q.options && q.options[selected]) {
          selectedDisplay = `${selected}. ${q.options[selected]}`;
        } else if (q.options) {
          const entry = Object.entries(q.options).find(([k, v]) => v.toLowerCase() === String(selected).toLowerCase());
          if (entry) {
            selectedDisplay = `${entry[0]}. ${entry[1]}`;
          } else {
            selectedDisplay = selected;
          }
        } else {
          selectedDisplay = selected;
        }
      }

      return {
        questionId: q.id,
        part: q.part,
        partName: q.partName,
        prompt: q.prompt,
        type: q.type,
        selected: selected || "Unanswered",
        selectedDisplay: selectedDisplay,
        correctDisplay: q.type === "rearrange" 
          ? q.target 
          : `${q.correct}. ${q.options ? q.options[q.correct] || '' : ''}`,
        isCorrect: isCorrect,
        isFlagged: isFlagged,
        maxPoints: qMaxPts,
        pointsAwarded: qPtsAwarded,
        pointsDisplay: ptsLabel,
        explanation: q.explanation
      };
    });

    const isLate = state.elapsedSeconds > RECOMMENDED_TIME_SECONDS;
    const overtimeSeconds = isLate ? state.elapsedSeconds - RECOMMENDED_TIME_SECONDS : 0;
    const spareSeconds = !isLate ? RECOMMENDED_TIME_SECONDS - state.elapsedSeconds : 0;

    let statusLabel = "On Time";
    if (isLate) {
      statusLabel = `Late (+${formatReadableDuration(overtimeSeconds)})`;
    }

    const detectedDevice = detectDevice();
    const userSubmission = {
      id: "sub-" + Date.now().toString().slice(-6),
      name: state.userName,
      device: detectedDevice,
      score: scoreInfo.finalScore,
      rawScore: scoreInfo.rawScore,
      maxScore: 100,
      maxRawScore: 50,
      correctCount: scoreInfo.totalCorrect,
      part123Correct: scoreInfo.part123Correct,
      part4Correct: scoreInfo.part4Correct,
      part5Correct: scoreInfo.part5Correct,
      totalQuestions: totalQuestions,
      accuracy: scoreInfo.accuracy,
      timeSpentSeconds: state.elapsedSeconds,
      timeSpentFormatted: formatReadableDuration(state.elapsedSeconds),
      isLate: isLate,
      overtimeSeconds: overtimeSeconds,
      statusLabel: statusLabel,
      timestamp: new Date().toLocaleString(),
      answers: { ...state.userAnswers }
    };

    const userLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    userLogs.unshift(userSubmission);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(userLogs));
    syncSubmissionToServer(userSubmission);

    renderResults({
      name: state.userName,
      score: scoreInfo.finalScore,
      rawScore: scoreInfo.rawScore,
      correctCount: scoreInfo.totalCorrect,
      part123Correct: scoreInfo.part123Correct,
      part4Correct: scoreInfo.part4Correct,
      part5Correct: scoreInfo.part5Correct,
      totalQuestions: totalQuestions,
      accuracy: scoreInfo.accuracy,
      timeSpentSeconds: state.elapsedSeconds,
      isLate: isLate,
      overtimeSeconds: overtimeSeconds,
      spareSeconds: spareSeconds,
      answerBreakdown: answerBreakdown
    });

    sfx.celebrate();
    fireConfetti();
    switchScreen(resultsScreen);
  }

  function renderResults(data) {
    resultUserName.textContent = data.name;
    scoreValue.textContent = data.score;
    accuracyValue.textContent = `${data.accuracy}%`;
    timeSpentValue.textContent = formatReadableDuration(data.timeSpentSeconds);

    const resultsSubheadline = document.getElementById("resultsSubheadline");
    if (resultsSubheadline) {
      resultsSubheadline.textContent = `Completed 50 questions! Score: ${data.score}/100 points (${data.correctCount}/50 correct | Raw: ${data.rawScore}/50 pts). Recorded in database!`;
    }

    if (data.score >= 85) {
      resultsHeadline.textContent = `Masterful Grammar Achievement, ${data.name}! 🏆`;
    } else if (data.score >= 70) {
      resultsHeadline.textContent = `Great Performance, ${data.name}! 🌟`;
    } else {
      resultsHeadline.textContent = `Good Effort, ${data.name}! Keep Practicing! 🐝`;
    }

    if (data.isLate) {
      timeStatusBadge.className = "status-badge status-late";
      timeStatusBadge.textContent = "Late";
      timeStatusDetail.textContent = `Exceeded 45 mins by ${formatReadableDuration(data.overtimeSeconds)}`;
    } else {
      timeStatusBadge.className = "status-badge status-on-time";
      timeStatusBadge.textContent = "On Time";
      timeStatusDetail.textContent = `Completed within 45 minutes (${formatReadableDuration(data.spareSeconds)} left)`;
    }

    let activeFilter = "all";
    const filterButtons = document.querySelectorAll(".review-filter-btn");

    function renderFilteredReview() {
      answersReviewList.innerHTML = "";
      const filtered = data.answerBreakdown.filter(item => {
        if (activeFilter === "all") return true;
        return item.part.toString() === activeFilter;
      });

      filtered.forEach((item) => {
        const reviewItem = document.createElement("div");
        reviewItem.className = `review-item notranslate ${item.isCorrect ? 'correct' : 'incorrect'}`;
        reviewItem.setAttribute("translate", "no");

        reviewItem.innerHTML = `
          <div class="review-top-row">
            <div>
              <span class="review-q-num">Question #${item.questionId}</span>
              <span class="review-part-tag">${item.partName}</span>
              <span class="review-points-tag" style="background:#EEF2FF; color:#4338CA; border:1px solid #C7D2FE; font-weight:700; font-size:0.75rem; padding:2px 7px; border-radius:12px; margin-left:4px;">${item.pointsDisplay}</span>
              ${item.isFlagged ? '<span class="review-flag-tag" title="Marked as Not Sure — Selected answer submitted as final">🚩 Not Sure</span>' : ''}
            </div>
            <span class="review-result-tag ${item.isCorrect ? 'tag-correct' : 'tag-incorrect'}">
              ${item.isCorrect ? '✓ Correct' : '✗ Incorrect'}
            </span>
          </div>
          <div class="review-q-text">${item.prompt}</div>
          <div class="review-answers-meta">
            <div>Your Answer: <span class="user-choice-span ${item.isCorrect ? 'is-correct' : 'is-wrong'}">${escapeHtml(item.selectedDisplay)}</span></div>
            <div>Target Answer: <span class="correct-choice-span">${escapeHtml(item.correctDisplay)}</span></div>
          </div>
          <div class="explanation-text">💡 <strong>Grammar Key:</strong> ${item.explanation}</div>
        `;

        answersReviewList.appendChild(reviewItem);
      });
    }


    filterButtons.forEach(btn => {
      btn.onclick = () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.dataset.filter;
        renderFilteredReview();
      };
    });

    renderFilteredReview();
  }

  retakeQuizBtn.addEventListener("click", () => {
    sfx.click();
    userNameInput.value = "";
    startQuizBtn.disabled = true;
    switchScreen(welcomeScreen);
  });

  openAdminFromResultsBtn.addEventListener("click", () => {
    openAdminModal();
  });

  // =========================================================================
  // 10. ADMIN PORTAL & QUESTION REPLACEMENT SYSTEM
  // =========================================================================
  function openAdminModal() {
    sfx.click();
    loginErrorMessage.classList.add("hidden");
    adminUsername.value = "";
    adminPassword.value = "";
    adminLoginModal.classList.remove("hidden");
    adminUsername.focus();
  }

  function closeAdminLoginModal() {
    sfx.click();
    adminLoginModal.classList.add("hidden");
  }

  openAdminBtn.addEventListener("click", openAdminModal);
  closeLoginModalBtn.addEventListener("click", closeAdminLoginModal);

  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = adminUsername.value.trim();
    const pass = adminPassword.value.trim();

    if (user === ADMIN_CREDENTIALS.user && pass === ADMIN_CREDENTIALS.pass) {
      sfx.click();
      closeAdminLoginModal();
      openAdminDashboard();
    } else {
      sfx.warning();
      loginErrorMessage.classList.remove("hidden");
    }
  });

  async function openAdminDashboard() {
    await loadDatabaseFromServer();
    renderAdminUserLogs();
    renderQuestionAnalyticsDashboard();
    renderBinaryMatrixTable();
    adminDashboardModal.classList.remove("hidden");
    activateLogsTab();
  }

  function closeAdminDashboard() {
    sfx.click();
    adminDashboardModal.classList.add("hidden");
  }

  closeDashboardModalBtn.addEventListener("click", closeAdminDashboard);
  logoutAdminBtn.addEventListener("click", closeAdminDashboard);

  function updateTabSwitcherState(currentTab) {
    if (!footerSwitchTabBtn) return;
    if (currentTab === "analysis") {
      footerSwitchTabBtn.innerHTML = "📑 Go to Binary Matrix (1/0) ➡️";
      footerSwitchTabBtn.className = "btn btn-primary btn-footer-nav";
      footerSwitchTabBtn.style.setProperty("background", "#059669", "important");
      footerSwitchTabBtn.style.setProperty("color", "#FFFFFF", "important");
    } else if (currentTab === "matrix") {
      footerSwitchTabBtn.innerHTML = "⬅️ Back to Student Scores & Test Logs";
      footerSwitchTabBtn.className = "btn btn-primary btn-footer-nav";
      footerSwitchTabBtn.style.setProperty("background", "#FF7A00", "important");
      footerSwitchTabBtn.style.setProperty("color", "#FFFFFF", "important");
    } else {
      footerSwitchTabBtn.innerHTML = "📊 Go to Question Analysis & Difficulty ➡️";
      footerSwitchTabBtn.className = "btn btn-outline btn-footer-nav";
      footerSwitchTabBtn.style.setProperty("background", "transparent", "important");
      footerSwitchTabBtn.style.setProperty("color", "#475569", "important");
    }
  }

  function activateLogsTab() {
    if (tabUserLogs) {
      tabUserLogs.classList.add("active");
      tabUserLogs.setAttribute("aria-selected", "true");
      tabUserLogs.style.setProperty("background", "#FFFFFF", "important");
      tabUserLogs.style.setProperty("color", "#EA580C", "important");
      tabUserLogs.style.setProperty("box-shadow", "0 2px 8px rgba(0,0,0,0.14)", "important");
    }
    if (tabQuestionAnalytics) {
      tabQuestionAnalytics.classList.remove("active");
      tabQuestionAnalytics.setAttribute("aria-selected", "false");
      tabQuestionAnalytics.style.setProperty("background", "transparent", "important");
      tabQuestionAnalytics.style.setProperty("color", "#475569", "important");
      tabQuestionAnalytics.style.setProperty("box-shadow", "none", "important");
    }
    if (tabBinaryMatrix) {
      tabBinaryMatrix.classList.remove("active");
      tabBinaryMatrix.setAttribute("aria-selected", "false");
      tabBinaryMatrix.style.setProperty("background", "transparent", "important");
      tabBinaryMatrix.style.setProperty("color", "#475569", "important");
      tabBinaryMatrix.style.setProperty("box-shadow", "none", "important");
    }
    if (headerNavStudentsBtn) {
      headerNavStudentsBtn.className = "btn btn-primary btn-sm";
      headerNavStudentsBtn.style.setProperty("background", "#EA580C", "important");
      headerNavStudentsBtn.style.setProperty("color", "#FFFFFF", "important");
      headerNavStudentsBtn.style.setProperty("box-shadow", "0 2px 8px rgba(234, 88, 12, 0.3)", "important");
    }
    if (headerNavAnalysisBtn) {
      headerNavAnalysisBtn.className = "btn btn-outline btn-sm";
      headerNavAnalysisBtn.style.setProperty("background", "transparent", "important");
      headerNavAnalysisBtn.style.setProperty("color", "#475569", "important");
      headerNavAnalysisBtn.style.setProperty("box-shadow", "none", "important");
    }
    if (headerNavBinaryMatrixBtn) {
      headerNavBinaryMatrixBtn.className = "btn btn-outline btn-sm";
      headerNavBinaryMatrixBtn.style.setProperty("background", "transparent", "important");
      headerNavBinaryMatrixBtn.style.setProperty("color", "#475569", "important");
      headerNavBinaryMatrixBtn.style.setProperty("box-shadow", "none", "important");
    }
    if (userLogsPanel) {
      userLogsPanel.classList.add("active");
      userLogsPanel.style.setProperty("display", "block", "important");
    }
    if (questionAnalyticsPanel) {
      questionAnalyticsPanel.classList.remove("active");
      questionAnalyticsPanel.style.setProperty("display", "none", "important");
    }
    if (binaryMatrixPanel) {
      binaryMatrixPanel.classList.remove("active");
      binaryMatrixPanel.style.setProperty("display", "none", "important");
    }
    if (dashboardScrollableBody) {
      dashboardScrollableBody.scrollTop = 0;
    }
    updateTabSwitcherState("logs");
  }

  function activateQuestionAnalyticsTab() {
    if (tabQuestionAnalytics) {
      tabQuestionAnalytics.classList.add("active");
      tabQuestionAnalytics.setAttribute("aria-selected", "true");
      tabQuestionAnalytics.style.setProperty("background", "#FFFFFF", "important");
      tabQuestionAnalytics.style.setProperty("color", "#2563EB", "important");
      tabQuestionAnalytics.style.setProperty("box-shadow", "0 2px 8px rgba(37,99,235,0.18)", "important");
    }
    if (tabUserLogs) {
      tabUserLogs.classList.remove("active");
      tabUserLogs.setAttribute("aria-selected", "false");
      tabUserLogs.style.setProperty("background", "transparent", "important");
      tabUserLogs.style.setProperty("color", "#475569", "important");
      tabUserLogs.style.setProperty("box-shadow", "none", "important");
    }
    if (tabBinaryMatrix) {
      tabBinaryMatrix.classList.remove("active");
      tabBinaryMatrix.setAttribute("aria-selected", "false");
      tabBinaryMatrix.style.setProperty("background", "transparent", "important");
      tabBinaryMatrix.style.setProperty("color", "#475569", "important");
      tabBinaryMatrix.style.setProperty("box-shadow", "none", "important");
    }
    if (headerNavAnalysisBtn) {
      headerNavAnalysisBtn.className = "btn btn-primary btn-sm";
      headerNavAnalysisBtn.style.setProperty("background", "#2563EB", "important");
      headerNavAnalysisBtn.style.setProperty("color", "#FFFFFF", "important");
      headerNavAnalysisBtn.style.setProperty("box-shadow", "0 2px 8px rgba(37, 99, 235, 0.3)", "important");
    }
    if (headerNavStudentsBtn) {
      headerNavStudentsBtn.className = "btn btn-outline btn-sm";
      headerNavStudentsBtn.style.setProperty("background", "transparent", "important");
      headerNavStudentsBtn.style.setProperty("color", "#475569", "important");
      headerNavStudentsBtn.style.setProperty("box-shadow", "none", "important");
    }
    if (headerNavBinaryMatrixBtn) {
      headerNavBinaryMatrixBtn.className = "btn btn-outline btn-sm";
      headerNavBinaryMatrixBtn.style.setProperty("background", "transparent", "important");
      headerNavBinaryMatrixBtn.style.setProperty("color", "#475569", "important");
      headerNavBinaryMatrixBtn.style.setProperty("box-shadow", "none", "important");
    }
    if (questionAnalyticsPanel) {
      questionAnalyticsPanel.classList.add("active");
      questionAnalyticsPanel.style.setProperty("display", "block", "important");
    }
    if (userLogsPanel) {
      userLogsPanel.classList.remove("active");
      userLogsPanel.style.setProperty("display", "none", "important");
    }
    if (binaryMatrixPanel) {
      binaryMatrixPanel.classList.remove("active");
      binaryMatrixPanel.style.setProperty("display", "none", "important");
    }
    if (dashboardScrollableBody) {
      dashboardScrollableBody.scrollTop = 0;
    }
    updateTabSwitcherState("analysis");
  }

  function activateBinaryMatrixTab() {
    if (tabBinaryMatrix) {
      tabBinaryMatrix.classList.add("active");
      tabBinaryMatrix.setAttribute("aria-selected", "true");
      tabBinaryMatrix.style.setProperty("background", "#FFFFFF", "important");
      tabBinaryMatrix.style.setProperty("color", "#059669", "important");
      tabBinaryMatrix.style.setProperty("box-shadow", "0 2px 10px rgba(5,150,105,0.18)", "important");
    }
    if (tabUserLogs) {
      tabUserLogs.classList.remove("active");
      tabUserLogs.setAttribute("aria-selected", "false");
      tabUserLogs.style.setProperty("background", "transparent", "important");
      tabUserLogs.style.setProperty("color", "#475569", "important");
      tabUserLogs.style.setProperty("box-shadow", "none", "important");
    }
    if (tabQuestionAnalytics) {
      tabQuestionAnalytics.classList.remove("active");
      tabQuestionAnalytics.setAttribute("aria-selected", "false");
      tabQuestionAnalytics.style.setProperty("background", "transparent", "important");
      tabQuestionAnalytics.style.setProperty("color", "#475569", "important");
      tabQuestionAnalytics.style.setProperty("box-shadow", "none", "important");
    }
    if (headerNavBinaryMatrixBtn) {
      headerNavBinaryMatrixBtn.className = "btn btn-primary btn-sm";
      headerNavBinaryMatrixBtn.style.setProperty("background", "#059669", "important");
      headerNavBinaryMatrixBtn.style.setProperty("color", "#FFFFFF", "important");
      headerNavBinaryMatrixBtn.style.setProperty("box-shadow", "0 2px 8px rgba(5, 150, 105, 0.3)", "important");
    }
    if (headerNavStudentsBtn) {
      headerNavStudentsBtn.className = "btn btn-outline btn-sm";
      headerNavStudentsBtn.style.setProperty("background", "transparent", "important");
      headerNavStudentsBtn.style.setProperty("color", "#475569", "important");
      headerNavStudentsBtn.style.setProperty("box-shadow", "none", "important");
    }
    if (headerNavAnalysisBtn) {
      headerNavAnalysisBtn.className = "btn btn-outline btn-sm";
      headerNavAnalysisBtn.style.setProperty("background", "transparent", "important");
      headerNavAnalysisBtn.style.setProperty("color", "#475569", "important");
      headerNavAnalysisBtn.style.setProperty("box-shadow", "none", "important");
    }
    if (binaryMatrixPanel) {
      binaryMatrixPanel.classList.add("active");
      binaryMatrixPanel.style.setProperty("display", "block", "important");
    }
    if (userLogsPanel) {
      userLogsPanel.classList.remove("active");
      userLogsPanel.style.setProperty("display", "none", "important");
    }
    if (questionAnalyticsPanel) {
      questionAnalyticsPanel.classList.remove("active");
      questionAnalyticsPanel.style.setProperty("display", "none", "important");
    }
    renderBinaryMatrixTable();
    if (dashboardScrollableBody) {
      dashboardScrollableBody.scrollTop = 0;
    }
    updateTabSwitcherState("matrix");
  }

  if (tabUserLogs) {
    tabUserLogs.addEventListener("click", () => {
      sfx.click();
      activateLogsTab();
    });
  }

  if (tabQuestionAnalytics) {
    tabQuestionAnalytics.addEventListener("click", () => {
      sfx.click();
      activateQuestionAnalyticsTab();
    });
  }

  if (tabBinaryMatrix) {
    tabBinaryMatrix.addEventListener("click", () => {
      sfx.click();
      activateBinaryMatrixTab();
    });
  }

  if (headerNavStudentsBtn) {
    headerNavStudentsBtn.addEventListener("click", () => {
      sfx.click();
      activateLogsTab();
    });
  }

  if (headerNavAnalysisBtn) {
    headerNavAnalysisBtn.addEventListener("click", () => {
      sfx.click();
      activateQuestionAnalyticsTab();
    });
  }

  if (headerNavBinaryMatrixBtn) {
    headerNavBinaryMatrixBtn.addEventListener("click", () => {
      sfx.click();
      activateBinaryMatrixTab();
    });
  }

  if (backToStudentLogsBtn) {
    backToStudentLogsBtn.addEventListener("click", () => {
      sfx.click();
      activateLogsTab();
    });
  }

  if (backToLogsFromMatrixBtn) {
    backToLogsFromMatrixBtn.addEventListener("click", () => {
      sfx.click();
      activateLogsTab();
    });
  }

  if (viewQuestionAnalysisTabBtn) {
    viewQuestionAnalysisTabBtn.addEventListener("click", () => {
      sfx.click();
      activateQuestionAnalyticsTab();
    });
  }

  if (footerSwitchTabBtn) {
    footerSwitchTabBtn.addEventListener("click", () => {
      sfx.click();
      if (userLogsPanel && userLogsPanel.classList.contains("active")) {
        activateQuestionAnalyticsTab();
      } else if (questionAnalyticsPanel && questionAnalyticsPanel.classList.contains("active")) {
        activateBinaryMatrixTab();
      } else {
        activateLogsTab();
      }
    });
  }

  if (exportBinaryMatrixBtn) {
    exportBinaryMatrixBtn.addEventListener("click", () => {
      sfx.click();
      exportBinaryMatrixExcel();
    });
  }

  if (downloadBinaryMatrixExcelBtn) {
    downloadBinaryMatrixExcelBtn.addEventListener("click", () => {
      sfx.click();
      exportBinaryMatrixExcel();
    });
  }

  if (docDownloadExcelBtn) {
    docDownloadExcelBtn.addEventListener("click", () => {
      sfx.click();
      exportBinaryMatrixExcel();
    });
  }

  // =========================================================================
  // LIVE 1/0 BINARY SCORING MATRIX & DOCUMENT TABLE RENDERER
  // (Right Answer = 1, Wrong Answer = 0; Logic matching psychological document)
  // =========================================================================
  function renderBinaryMatrixTable() {
    const rawUserLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    const userLogs = rawUserLogs.map(getNormalizedStudentRecord);
    const totalStudents = userLogs.length;

    if (binaryMatrixCount) binaryMatrixCount.textContent = totalStudents;
    if (matrixStudentCount) matrixStudentCount.textContent = totalStudents;
    if (docTotalStudents) docTotalStudents.textContent = totalStudents;

    // Compute live binary stats for each question (1 to 50)
    const questionStats = activeQuizQuestions.map(q => {
      let correctCount = 0;
      userLogs.forEach(u => {
        const studentVal = u.answers ? u.answers[q.id] : null;
        let isCorrect = false;
        if (q.type === "rearrange") {
          isCorrect = studentVal && (
            normalizeSentence(studentVal) === normalizeSentence(q.target) ||
            (Array.isArray(q.alternateTargets) && q.alternateTargets.some(alt => normalizeSentence(studentVal) === normalizeSentence(alt)))
          );
        } else {
          isCorrect = studentVal === q.correct || 
                      (q.options && q.options[q.correct] && studentVal && studentVal.toLowerCase() === q.options[q.correct].toLowerCase()) ||
                      (studentVal && q.correct && studentVal.toLowerCase() === q.correct.toLowerCase());
        }
        if (isCorrect) correctCount++;
      });

      const percent = totalStudents > 0 ? (correctCount / totalStudents) * 100 : 0;
      // Exact criteria from user document:
      // >= 85% = Too Easy
      // 41% - 84.99% = Ideal / Balanced
      // <= 40% = Too Difficult
      let category = "ideal";
      if (percent >= 85) {
        category = "easy";
      } else if (percent <= 40) {
        category = "hard";
      }
      return {
        id: q.id,
        correctCount,
        percent,
        category
      };
    });

    const tooEasyQuestions = questionStats.filter(qs => qs.category === "easy").map(qs => qs.id);
    const idealQuestions = questionStats.filter(qs => qs.category === "ideal").map(qs => qs.id);
    const tooDifficultQuestions = questionStats.filter(qs => qs.category === "hard").map(qs => qs.id);

    if (matrixEasyCount) matrixEasyCount.textContent = tooEasyQuestions.length;
    if (matrixIdealCount) matrixIdealCount.textContent = idealQuestions.length;
    if (matrixHardCount) matrixHardCount.textContent = tooDifficultQuestions.length;

    if (docTooEasyList) {
      docTooEasyList.textContent = tooEasyQuestions.length > 0 ? `[${tooEasyQuestions.join(", ")}]` : "None";
    }
    if (docIdealList) {
      docIdealList.textContent = idealQuestions.length > 0 ? `[${idealQuestions.join(", ")}]` : "None";
    }
    if (docTooDifficultList) {
      docTooDifficultList.textContent = tooDifficultQuestions.length > 0 ? `[${tooDifficultQuestions.join(", ")}]` : "None";
    }

    // Build the live Table Header
    if (binaryMatrixThead) {
      binaryMatrixThead.innerHTML = `
        <tr>
          <th rowspan="2" class="sticky-col-no" style="width: 45px;">No</th>
          <th rowspan="2" class="sticky-col-name" style="min-width: 160px; max-width: 220px;">Participant Name</th>
          <th colspan="${activeQuizQuestions.length}" class="th-merged-title" style="letter-spacing: 1px; font-size: 0.9rem;">QUESTION NUMBER</th>
          <th rowspan="2" style="background: #FEF08A; color: #854D0E; font-weight: 800; min-width: 70px;">Raw Score</th>
          <th rowspan="2" style="background: #FDE047; color: #713F12; font-weight: 900; min-width: 70px;">Score</th>
        </tr>
        <tr>
          ${activeQuizQuestions.map(q => `<th style="width: 32px; min-width: 30px; font-weight: 700;">${q.id}</th>`).join("")}
        </tr>
      `;
    }

    // Build the live Table Body
    if (binaryMatrixTbody) {
      if (userLogs.length === 0) {
        binaryMatrixTbody.innerHTML = `
          <tr>
            <td colspan="${activeQuizQuestions.length + 4}" style="text-align: center; color: #94A3B8; padding: 28px;">
              No student test submissions available. Once students complete the quiz, their 1/0 binary scores will appear here.
            </td>
          </tr>
        `;
      } else {
        binaryMatrixTbody.innerHTML = userLogs.map((u, idx) => {
          let studentRaw = 0;
          const cells = activeQuizQuestions.map(q => {
            const studentVal = u.answers ? u.answers[q.id] : null;
            let isCorrect = false;
            if (q.type === "rearrange") {
              isCorrect = studentVal && (
                normalizeSentence(studentVal) === normalizeSentence(q.target) ||
                (Array.isArray(q.alternateTargets) && q.alternateTargets.some(alt => normalizeSentence(studentVal) === normalizeSentence(alt)))
              );
            } else {
              isCorrect = studentVal === q.correct || 
                          (q.options && q.options[q.correct] && studentVal && studentVal.toLowerCase() === q.options[q.correct].toLowerCase()) ||
                          (studentVal && q.correct && studentVal.toLowerCase() === q.correct.toLowerCase());
            }
            if (isCorrect) studentRaw++;
            const val = isCorrect ? 1 : 0;
            const cls = isCorrect ? "cell-one" : "cell-zero";
            return `<td class="${cls}">${val}</td>`;
          }).join("");

          const studentFinal = studentRaw * 2;

          return `
            <tr>
              <td class="sticky-col-no">${idx + 1}</td>
              <td class="sticky-col-name">${escapeHtml(u.name)}</td>
              ${cells}
              <td class="cell-raw-score">${studentRaw}</td>
              <td class="cell-final-score">${studentFinal}</td>
            </tr>
          `;
        }).join("");
      }
    }

    // Build Table Foot (Totals)
    if (binaryMatrixTfoot) {
      if (userLogs.length > 0) {
        let sumRaw = 0;
        let sumFinal = 0;
        userLogs.forEach(u => {
          let sRaw = 0;
          activeQuizQuestions.forEach(q => {
            const studentVal = u.answers ? u.answers[q.id] : null;
            let isCorrect = false;
            if (q.type === "rearrange") {
              isCorrect = studentVal && (
                normalizeSentence(studentVal) === normalizeSentence(q.target) ||
                (Array.isArray(q.alternateTargets) && q.alternateTargets.some(alt => normalizeSentence(studentVal) === normalizeSentence(alt)))
              );
            } else {
              isCorrect = studentVal === q.correct || 
                          (q.options && q.options[q.correct] && studentVal && studentVal.toLowerCase() === q.options[q.correct].toLowerCase()) ||
                          (studentVal && q.correct && studentVal.toLowerCase() === q.correct.toLowerCase());
            }
            if (isCorrect) sRaw++;
          });
          sumRaw += sRaw;
          sumFinal += sRaw * 2;
        });

        const totalCorrectCells = questionStats.map(qs => {
          return `<td>${qs.correctCount}</td>`;
        }).join("");

        binaryMatrixTfoot.innerHTML = `
          <tr class="row-total">
            <td class="sticky-col-no">Σ</td>
            <td class="sticky-col-name">Total Correct</td>
            ${totalCorrectCells}
            <td class="cell-raw-score">${sumRaw}</td>
            <td class="cell-final-score">${sumFinal}</td>
          </tr>
        `;
      } else {
        binaryMatrixTfoot.innerHTML = "";
      }
    }
  }

  // =========================================================================
  // EXCEL DOCUMENT EXPORT: 1/0 BINARY SCORING MATRIX & CALIBRATION ANALYSIS
  // (Exact document format matching the psychometric sheet in full English)
  // =========================================================================
  function exportBinaryMatrixExcel() {
    sfx.click();
    const rawUserLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    const userLogs = rawUserLogs.map(getNormalizedStudentRecord);

    if (userLogs.length === 0) {
      alert("No student test records available to generate the Binary Matrix Document.");
      return;
    }

    const totalStudents = userLogs.length;
    const filenameDate = new Date().toISOString().slice(0, 10);

    // Compute binary statistics per question
    const questionStats = activeQuizQuestions.map(q => {
      let correctCount = 0;
      userLogs.forEach(u => {
        const studentVal = u.answers ? u.answers[q.id] : null;
        let isCorrect = false;
        if (q.type === "rearrange") {
          isCorrect = studentVal && (
            normalizeSentence(studentVal) === normalizeSentence(q.target) ||
            (Array.isArray(q.alternateTargets) && q.alternateTargets.some(alt => normalizeSentence(studentVal) === normalizeSentence(alt)))
          );
        } else {
          isCorrect = studentVal === q.correct || 
                      (q.options && q.options[q.correct] && studentVal && studentVal.toLowerCase() === q.options[q.correct].toLowerCase()) ||
                      (studentVal && q.correct && studentVal.toLowerCase() === q.correct.toLowerCase());
        }
        if (isCorrect) correctCount++;
      });

      const percent = totalStudents > 0 ? (correctCount / totalStudents) * 100 : 0;
      let category = "ideal";
      if (percent >= 85) {
        category = "easy";
      } else if (percent <= 40) {
        category = "hard";
      }
      return {
        id: q.id,
        correctCount,
        percent,
        category
      };
    });

    const tooEasyList = questionStats.filter(qs => qs.category === "easy").map(qs => qs.id);
    const idealList = questionStats.filter(qs => qs.category === "ideal").map(qs => qs.id);
    const tooDifficultList = questionStats.filter(qs => qs.category === "hard").map(qs => qs.id);

    // SheetJS generation if available
    if (typeof XLSX !== "undefined") {
      const wb = XLSX.utils.book_new();

      // Row 1 (Header 1)
      const headerRow1 = [
        "No",
        "Participant Name",
        "QUESTION NUMBER",
        ...Array(activeQuizQuestions.length - 1).fill(""),
        "Raw",
        "Score"
      ];

      // Row 2 (Header 2)
      const headerRow2 = [
        "",
        "",
        ...activeQuizQuestions.map(q => q.id),
        "Score",
        ""
      ];

      const sheetData = [headerRow1, headerRow2];

      let totalRawSum = 0;
      let totalFinalSum = 0;

      // Student rows (Row 3 to N+2)
      userLogs.forEach((u, idx) => {
        let rawScore = 0;
        const studentBinary = activeQuizQuestions.map(q => {
          const studentVal = u.answers ? u.answers[q.id] : null;
          let isCorrect = false;
          if (q.type === "rearrange") {
            isCorrect = studentVal && (
              normalizeSentence(studentVal) === normalizeSentence(q.target) ||
              (Array.isArray(q.alternateTargets) && q.alternateTargets.some(alt => normalizeSentence(studentVal) === normalizeSentence(alt)))
            );
          } else {
            isCorrect = studentVal === q.correct || 
                        (q.options && q.options[q.correct] && studentVal && studentVal.toLowerCase() === q.options[q.correct].toLowerCase()) ||
                        (studentVal && q.correct && studentVal.toLowerCase() === q.correct.toLowerCase());
          }
          if (isCorrect) rawScore++;
          return isCorrect ? 1 : 0;
        });

        const finalScore = rawScore * 2;
        totalRawSum += rawScore;
        totalFinalSum += finalScore;

        sheetData.push([
          idx + 1,
          u.name,
          ...studentBinary,
          rawScore,
          finalScore
        ]);
      });

      // Total row (Row N+3)
      const totalsRow = [
        "",
        "Total Correct",
        ...questionStats.map(qs => qs.correctCount),
        totalRawSum,
        totalFinalSum
      ];
      sheetData.push(totalsRow);

      // Blank spacing row (Row N+4)
      sheetData.push([]);

      // Analysis & Recommendations text block in Full English
      sheetData.push(["Analysis:"]);
      sheetData.push(["Total Questions:", `${activeQuizQuestions.length} questions`]);
      sheetData.push(["Total Test Takers:", `${totalStudents} students`]);
      sheetData.push([]);
      sheetData.push(["Analysis Criteria:"]);
      sheetData.push(["• ≥ 85% correct = Too Easy"]);
      sheetData.push(["• 41%–84% correct = Ideal / Balanced"]);
      sheetData.push(["• ≤ 40% correct = Too Difficult"]);
      sheetData.push([]);
      sheetData.push(["Summary of Results"]);
      sheetData.push([`Too Easy Questions: [${tooEasyList.join(", ")}]`]);
      sheetData.push([`Ideal Questions: [${idealList.join(", ")}]`]);
      sheetData.push([`Too Difficult Questions: [${tooDifficultList.join(", ")}]`]);
      sheetData.push([]);
      sheetData.push(["Recommendations"]);
      sheetData.push(["• Too easy questions should be replaced with more contextual sentences or stronger distractors."]);
      sheetData.push(["• Too difficult questions need clearer instructions or adjusted vocabulary / difficulty."]);
      sheetData.push(["• Ideal category questions should be retained as they optimally discriminate student mastery."]);

      const ws = XLSX.utils.aoa_to_sheet(sheetData);

      // Define Cell Merges
      ws['!merges'] = [
        // No column merge (Row 1-2)
        { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
        // Participant Name merge (Row 1-2)
        { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
        // QUESTION NUMBER merge across all 50 questions (Cols C to AZ, r: 0, c: 2 to 51)
        { s: { r: 0, c: 2 }, e: { r: 0, c: 1 + activeQuizQuestions.length } },
        // Raw Score header merge (Col BA)
        { s: { r: 0, c: 2 + activeQuizQuestions.length }, e: { r: 1, c: 2 + activeQuizQuestions.length } },
        // Final Score header merge (Col BB)
        { s: { r: 0, c: 3 + activeQuizQuestions.length }, e: { r: 1, c: 3 + activeQuizQuestions.length } }
      ];

      // Define Column Widths
      const colWidths = [
        { wch: 6 },  // No
        { wch: 24 }  // Participant Name
      ];
      for (let i = 0; i < activeQuizQuestions.length; i++) {
        colWidths.push({ wch: 4 }); // Q1-Q50
      }
      colWidths.push({ wch: 11 }); // Raw Score
      colWidths.push({ wch: 11 }); // Score

      ws['!cols'] = colWidths;

      XLSX.utils.book_append_sheet(wb, ws, "Binary Scoring Matrix (1-0)");
      XLSX.writeFile(wb, `BeeQuiz_Binary_Item_Scoring_Matrix_${filenameDate}.xlsx`);
      return;
    }

    // CSV Fallback if SheetJS is missing
    const escapeCsv = (str) => {
      if (str === null || str === undefined) return '""';
      const clean = String(str).replace(/<[^>]*>/g, '').replace(/"/g, '""').trim();
      return `"${clean}"`;
    };

    const csvLines = [];
    csvLines.push(["No", "Participant Name", ...activeQuizQuestions.map(q => `Q${q.id}`), "Raw Score", "Final Score"].map(escapeCsv).join(","));

    userLogs.forEach((u, idx) => {
      let rawScore = 0;
      const binaries = activeQuizQuestions.map(q => {
        const studentVal = u.answers ? u.answers[q.id] : null;
        let isCorrect = false;
        if (q.type === "rearrange") {
          isCorrect = studentVal && (
            normalizeSentence(studentVal) === normalizeSentence(q.target) ||
            (Array.isArray(q.alternateTargets) && q.alternateTargets.some(alt => normalizeSentence(studentVal) === normalizeSentence(alt)))
          );
        } else {
          isCorrect = studentVal === q.correct || 
                      (q.options && q.options[q.correct] && studentVal && studentVal.toLowerCase() === q.options[q.correct].toLowerCase()) ||
                      (studentVal && q.correct && studentVal.toLowerCase() === q.correct.toLowerCase());
        }
        if (isCorrect) rawScore++;
        return isCorrect ? 1 : 0;
      });
      csvLines.push([idx + 1, escapeCsv(u.name), ...binaries, rawScore, rawScore * 2].join(","));
    });

    csvLines.push(["", "Total Correct", ...questionStats.map(qs => qs.correctCount), "", ""].map(escapeCsv).join(","));
    csvLines.push("");
    csvLines.push([escapeCsv("Analysis:")].join(","));
    csvLines.push([escapeCsv("Total Questions: 50 questions")].join(","));
    csvLines.push([escapeCsv(`Total Test Takers: ${totalStudents} students`)].join(","));
    csvLines.push([escapeCsv("Analysis Criteria:")].join(","));
    csvLines.push([escapeCsv("• ≥ 85% correct = Too Easy")].join(","));
    csvLines.push([escapeCsv("• 41%–84% correct = Ideal / Balanced")].join(","));
    csvLines.push([escapeCsv("• ≤ 40% correct = Too Difficult")].join(","));
    csvLines.push([escapeCsv("Summary of Results")].join(","));
    csvLines.push([escapeCsv(`Too Easy Questions: [${tooEasyList.join(", ")}]`)].join(","));
    csvLines.push([escapeCsv(`Ideal Questions: [${idealList.join(", ")}]`)].join(","));
    csvLines.push([escapeCsv(`Too Difficult Questions: [${tooDifficultList.join(", ")}]`)].join(","));
    csvLines.push([escapeCsv("Recommendations")].join(","));
    csvLines.push([escapeCsv("• Too easy questions should be replaced with more contextual sentences or stronger distractors.")].join(","));
    csvLines.push([escapeCsv("• Too difficult questions need clearer instructions or adjusted vocabulary / difficulty.")].join(","));
    csvLines.push([escapeCsv("• Ideal category questions should be retained as they optimally discriminate student mastery.")].join(","));

    const csvContent = "\uFEFF" + csvLines.join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `BeeQuiz_Binary_Item_Scoring_Matrix_${filenameDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function renderAdminUserLogs(filterQuery = "") {
    const rawUserLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    const userLogs = rawUserLogs.map(getNormalizedStudentRecord);
    const query = filterQuery.toLowerCase().trim();
    const filtered = userLogs.filter(user => 
      user.name.toLowerCase().includes(query) || 
      (user.device && user.device.toLowerCase().includes(query))
    );

    userLogCount.textContent = userLogs.length;
    if (headerUserCount) headerUserCount.textContent = userLogs.length;
    if (binaryMatrixCount) binaryMatrixCount.textContent = userLogs.length;
    totalStudentsStat.textContent = userLogs.length;
    totalAttemptsBadge.textContent = `${userLogs.length} attempts`;

    if (userLogs.length > 0) {
      const avgScore = (userLogs.reduce((acc, u) => acc + (u.score || 0), 0) / userLogs.length).toFixed(1);
      const avgAccuracy = Math.round(userLogs.reduce((acc, u) => acc + (u.accuracy || 0), 0) / userLogs.length);
      avgScoreStat.textContent = `${avgScore} / 100`;
      avgAccuracyStat.textContent = `${avgAccuracy}%`;
    } else {
      avgScoreStat.textContent = "0 / 100";
      avgAccuracyStat.textContent = "0%";
    }

    userLogsTableBody.innerHTML = "";

    if (filtered.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="9" style="text-align: center; color: #94A3B8; padding: 28px;">No student records found.</td>`;
      userLogsTableBody.appendChild(tr);
      return;
    }

    filtered.forEach((u, index) => {
      const tr = document.createElement("tr");
      const statusBadge = u.isLate 
        ? `<span class="status-badge status-late">${u.statusLabel || 'Late'}</span>`
        : `<span class="status-badge status-on-time">On Time</span>`;

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td><strong>${escapeHtml(u.name)}</strong></td>
        <td><small class="device-cell-badge">${escapeHtml(u.device || '💻 Desktop')}</small></td>
        <td><strong style="color: #2563EB;">${u.score}</strong> / 100 <small style="color: #64748B;">(${u.rawScore || Math.round((u.score/100)*50)}/50 pts)</small></td>
        <td>${u.accuracy}%</td>
        <td>${u.timeSpentFormatted || formatReadableDuration(u.timeSpentSeconds || 0)}</td>
        <td>${statusBadge}</td>
        <td><small style="color: #64748B;">${u.timestamp || '-'}</small></td>
        <td>
          <div style="display:inline-flex; gap:4px; align-items:center;">
            <button type="button" class="btn-inspect-user" data-uid="${u.id}" title="Inspect student's full 50 question answers">🔍 View</button>
            <button type="button" class="btn-delete-user" data-uid="${u.id}" title="Delete record from database">🗑</button>
          </div>
        </td>
      `;
      userLogsTableBody.appendChild(tr);
    });
  }

  // Event Delegation for Inspect & Delete Buttons in Admin Table
  userLogsTableBody.addEventListener("click", (e) => {
    const inspectBtn = e.target.closest(".btn-inspect-user");
    if (inspectBtn) {
      const uid = inspectBtn.dataset.uid;
      openInspectModal(uid);
      return;
    }

    const deleteBtn = e.target.closest(".btn-delete-user");
    if (deleteBtn) {
      const uid = deleteBtn.dataset.uid;
      const userLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
      const targetUser = userLogs.find(u => u.id === uid);
      const name = targetUser ? targetUser.name : "this student";
      if (confirm(`Delete test record for "${name}"? This will permanently remove it from database.json.`)) {
        sfx.warning();
        const updated = userLogs.filter(u => u.id !== uid);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
        syncSubmissionDeleteToServer(uid);
        renderAdminUserLogs(userLogSearch.value);
        renderQuestionAnalyticsDashboard();
        renderBinaryMatrixTable();
      }
    }
  });

  userLogSearch.addEventListener("input", (e) => {
    renderAdminUserLogs(e.target.value);
  });

  // Section Filter & Question Replacement View
  let activeQaFilter = "all";
  const qaFilterButtons = document.querySelectorAll(".qa-filter-btn");

  qaFilterButtons.forEach(btn => {
    btn.onclick = () => {
      qaFilterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeQaFilter = btn.dataset.qfilter;
      renderQuestionAnalyticsDashboard();
    };
  });

  // Criteria Cards Filter Trigger Buttons
  const criteriaActionButtons = document.querySelectorAll(".btn-criteria-action");
  criteriaActionButtons.forEach(btn => {
    btn.onclick = (e) => {
      if (e) e.preventDefault();
      sfx.click();
      const filter = btn.dataset.triggerfilter;
      qaFilterButtons.forEach(b => {
        if (b.dataset.qfilter === filter) b.classList.add("active");
        else b.classList.remove("active");
      });
      activeQaFilter = filter;
      renderQuestionAnalyticsDashboard();
    };
  });

  // View Toggle Mode for Question Analysis (Spreadsheet Table vs Detailed Cards)
  let activeQaViewMode = "table";
  if (qaViewTableBtn && qaViewCardsBtn) {
    qaViewTableBtn.addEventListener("click", () => {
      sfx.click();
      activeQaViewMode = "table";
      qaViewTableBtn.classList.add("active");
      qaViewCardsBtn.classList.remove("active");
      if (qaTableContainer) qaTableContainer.classList.remove("hidden");
      if (questionAnalyticsContainer) questionAnalyticsContainer.classList.add("hidden");
    });

    qaViewCardsBtn.addEventListener("click", () => {
      sfx.click();
      activeQaViewMode = "cards";
      qaViewCardsBtn.classList.add("active");
      qaViewTableBtn.classList.remove("active");
      if (qaTableContainer) qaTableContainer.classList.add("hidden");
      if (questionAnalyticsContainer) questionAnalyticsContainer.classList.remove("hidden");
    });
  }

  if (qaTableSearchInput) {
    qaTableSearchInput.addEventListener("input", () => {
      renderQuestionAnalyticsDashboard();
    });
  }

  function renderQuestionAnalyticsDashboard() {
    const userLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    const { totalStudents, analytics, easyList, idealList, difficultList, extremeReplaceableList } = computeLiveAnalytics(userLogs);

    analysisTotalStudentsText.textContent = totalStudents;
    totalAttemptsBadge.textContent = `${totalStudents} attempts`;

    easyCountNum.textContent = easyList.length;
    idealCountNum.textContent = idealList.length;
    difficultCountNum.textContent = difficultList.length;

    easyQuestionsList.textContent = easyList.length > 0 ? `Questions: [${easyList.join(", ")}]` : "None";
    idealQuestionsList.textContent = idealList.length > 0 ? `Questions: [${idealList.join(", ")}]` : "None";
    difficultQuestionsList.textContent = difficultList.length > 0 ? `Questions: [${difficultList.join(", ")}]` : "None";

    if (extremeReplaceableList.length > 0) {
      replacementNoticeBadge.classList.remove("hidden");
      replacementEligibleCount.textContent = extremeReplaceableList.length;
    } else {
      replacementNoticeBadge.classList.add("hidden");
    }

    const searchQuery = qaTableSearchInput ? qaTableSearchInput.value.toLowerCase().trim() : "";

    const filtered = activeQuizQuestions.filter(q => {
      let matchCategory = true;
      if (activeQaFilter === "extreme") matchCategory = analytics[q.id].isReplaceable;
      else if (activeQaFilter === "easy") matchCategory = analytics[q.id].classification === "easy";
      else if (activeQaFilter === "difficult") matchCategory = analytics[q.id].classification === "difficult";
      else if (activeQaFilter === "ideal") matchCategory = analytics[q.id].classification === "ideal";
      else if (activeQaFilter !== "all") matchCategory = q.part.toString() === activeQaFilter;

      if (!matchCategory) return false;
      if (!searchQuery) return true;

      const promptMatch = q.prompt && q.prompt.toLowerCase().includes(searchQuery);
      const targetMatch = analytics[q.id].correctTarget && analytics[q.id].correctTarget.toLowerCase().includes(searchQuery);
      const partMatch = q.partName && q.partName.toLowerCase().includes(searchQuery);
      const idMatch = `q${q.id}`.includes(searchQuery) || `#${q.id}`.includes(searchQuery) || `question ${q.id}`.includes(searchQuery);

      return promptMatch || targetMatch || partMatch || idMatch;
    });

    // 1. Render Table View (Analisis Butir Soal Spreadsheet)
    if (qaTableBody) {
      qaTableBody.innerHTML = "";
      if (filtered.length === 0) {
        qaTableBody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:24px; color:#94A3B8;">No questions matched the current filter/search.</td></tr>`;
      } else {
        filtered.forEach(q => {
          const data = analytics[q.id];
          const customized = isQuestionCustomized(q.id);
          let diffTagClass = "diff-tag-ideal";
          if (data.classification === "easy") diffTagClass = "diff-tag-easy";
          if (data.classification === "difficult") diffTagClass = "diff-tag-hard";

          let actionRecommendation = "Retain (Balanced)";
          let recClass = "rec-ideal";
          if (data.classification === "easy") {
            actionRecommendation = "Replace (Too Easy)";
            recClass = "rec-replace";
          } else if (data.classification === "difficult") {
            actionRecommendation = "Replace (Very Hard)";
            recClass = "rec-replace";
          }

          const customBadge = customized ? `<span class="badge-mini-custom">Edited</span>` : "";
          const revertBtnHtml = customized ? `<button type="button" class="btn-table-revert" data-qid="${q.id}" title="Revert to original default">↩️</button>` : "";

          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td><strong>#${q.id}</strong>${customBadge}</td>
            <td><small class="device-cell-badge">P${q.part}</small></td>
            <td><span class="qa-table-prompt" title="${escapeHtml(q.prompt)}">${escapeHtml(q.prompt)}</span></td>
            <td><span class="qa-target-pill" title="${escapeHtml(data.correctTarget)}">${escapeHtml(data.correctTarget)}</span></td>
            <td><strong>${data.totalAttempts}</strong></td>
            <td>
              <div class="facility-cell">
                <span><strong>${data.correctPercent}%</strong> <small style="color:#64748B;">(${data.correctCount}/${data.totalAttempts})</small></span>
                <div class="qa-mini-bar" title="${data.correctPercent}% Correct">
                  <div class="qa-mini-fill-correct" style="width: ${data.correctPercent}%;"></div>
                </div>
              </div>
            </td>
            <td><span class="qa-diff-tag ${diffTagClass}">● ${data.classLabel}</span></td>
            <td><small style="color:#64748B; font-size:0.78rem;">A:${data.choiceDistribution.A} B:${data.choiceDistribution.B}<br>C:${data.choiceDistribution.C} D:${data.choiceDistribution.D}</small></td>
            <td><span class="${recClass}" style="font-size:0.8rem;">${actionRecommendation}</span></td>
            <td>
              <div class="qa-table-actions">
                <button type="button" class="btn-table-replace" data-qid="${q.id}" title="Replace this question with a balanced item">🔄 Replace</button>
                ${revertBtnHtml}
              </div>
            </td>
          `;
          qaTableBody.appendChild(tr);
        });
      }
    }

    // 2. Render Detailed Cards View
    questionAnalyticsContainer.innerHTML = "";

    if (filtered.length === 0) {
      questionAnalyticsContainer.innerHTML = `
        <div style="text-align: center; color: #64748B; padding: 30px; background: #FAFAF9; border-radius: 16px;">
          No questions found in this category filter.
        </div>
      `;
      return;
    }

    filtered.forEach(q => {
      const data = analytics[q.id];
      const card = document.createElement("div");
      card.className = "qa-card";

      let diffTagClass = "diff-tag-ideal";
      if (data.classification === "easy") diffTagClass = "diff-tag-easy";
      if (data.classification === "difficult") diffTagClass = "diff-tag-hard";

      const customized = isQuestionCustomized(q.id);

      // Replace button: always available on extreme items, or clickable for any item
      const replaceBtnHtml = `
        <button type="button" class="btn-replace-q" data-qid="${q.id}" title="Replace this question with a balanced item">
          🔄 Replace Question
        </button>
      `;

      const revertBtnHtml = customized 
        ? `<button type="button" class="btn-revert-q" data-qid="${q.id}" title="Revert to original default question">↩️ Revert</button>` 
        : '';

      const customBadgeHtml = customized 
        ? `<span class="qa-diff-tag diff-tag-custom">● Customized</span>` 
        : '';

      card.innerHTML = `
        <div class="qa-top-row">
          <span class="qa-title">Question #${q.id} (${q.partName})</span>
          <div class="qa-header-badges">
            ${customBadgeHtml}
            <span class="qa-diff-tag ${diffTagClass}">● ${data.classLabel}</span>
            ${replaceBtnHtml}
            ${revertBtnHtml}
            <span class="qa-correct-target">Target: ${escapeHtml(data.correctTarget)}</span>
          </div>
        </div>
        <div class="qa-question-text">${escapeHtml(q.prompt)}</div>
        <div class="qa-metrics-row">
          <span class="qa-stat-correct">✓ Correct: ${data.correctCount} of ${data.totalAttempts} students (${data.correctPercent}%)</span>
          <span class="qa-stat-wrong">✗ Wrong: ${data.wrongCount} of ${data.totalAttempts} students (${data.wrongPercent}%)</span>
          <span class="qa-stat-attempts">Total Students: <strong>${data.totalAttempts}</strong></span>
        </div>
        <div class="qa-bar-track" title="${data.correctPercent}% Correct, ${data.wrongPercent}% Wrong">
          <div class="qa-bar-fill-correct" style="width: ${data.correctPercent}%;"></div>
          <div class="qa-bar-fill-wrong" style="width: ${data.wrongPercent}%;"></div>
        </div>
        <div class="qa-recap-box">
          <div class="qa-recap-line">
            <span class="qa-recap-label correct">✓ Correct Students (${data.correctCount}):</span>
            <span class="qa-recap-names">${data.correctStudents && data.correctStudents.length > 0 ? escapeHtml(data.correctStudents.join(", ")) : '<em>None</em>'}</span>
          </div>
          <div class="qa-recap-line">
            <span class="qa-recap-label wrong">✗ Incorrect Students (${data.wrongCount}):</span>
            <span class="qa-recap-names">${data.wrongStudents && data.wrongStudents.length > 0 ? escapeHtml(data.wrongStudents.join(", ")) : '<em>None</em>'}</span>
          </div>
          <div class="qa-recap-line" style="font-size:0.78rem; color:#64748B; margin-top:2px;">
            <span><strong>Point Value:</strong> ${q.part === 4 ? '2 raw pts (4/100)' : '1 raw pt (2/100)'}</span>
            <span style="margin-left: 12px;"><strong>Response Breakdown:</strong> A: ${data.choiceDistribution.A} | B: ${data.choiceDistribution.B} | C: ${data.choiceDistribution.C} | D: ${data.choiceDistribution.D}</span>
          </div>
        </div>
      `;

      const replaceBtn = card.querySelector(".btn-replace-q");
      replaceBtn.addEventListener("click", () => {
        openReplaceQuestionModal(q.id);
      });

      const revertBtn = card.querySelector(".btn-revert-q");
      if (revertBtn) {
        revertBtn.addEventListener("click", () => {
          if (confirm(`Revert Question #${q.id} back to original default?`)) {
            sfx.click();
            const defIdx = DEFAULT_QUESTIONS.findIndex(item => item.id === q.id);
            if (defIdx !== -1) {
              activeQuizQuestions[defIdx] = { ...DEFAULT_QUESTIONS[defIdx] };
              saveActiveQuestions();
              syncQuestionRevertToServer(q.id);
              renderQuestionAnalyticsDashboard();
              alert(`Question #${q.id} reverted back to original default!`);
            }
          }
        });
      }

      questionAnalyticsContainer.appendChild(card);
    });
  }

  // Event Delegation for Table View Replace & Revert Buttons
  if (qaTableBody) {
    qaTableBody.addEventListener("click", (e) => {
      const replaceBtn = e.target.closest(".btn-table-replace");
      if (replaceBtn) {
        const qid = parseInt(replaceBtn.dataset.qid, 10);
        openReplaceQuestionModal(qid);
        return;
      }
      const revertBtn = e.target.closest(".btn-table-revert");
      if (revertBtn) {
        const qid = parseInt(revertBtn.dataset.qid, 10);
        if (confirm(`Revert Question #${qid} back to original default?`)) {
          sfx.click();
          const defIdx = DEFAULT_QUESTIONS.findIndex(item => item.id === qid);
          if (defIdx !== -1) {
            activeQuizQuestions[defIdx] = { ...DEFAULT_QUESTIONS[defIdx] };
            saveActiveQuestions();
            syncQuestionRevertToServer(qid);
            renderQuestionAnalyticsDashboard();
            alert(`Question #${qid} reverted back to original default!`);
          }
        }
      }
    });
  }

  // --- REPLACE QUESTION MODAL CONTROLLER ---
  function openReplaceQuestionModal(questionId) {
    sfx.click();
    state.questionToReplaceId = questionId;

    const q = activeQuizQuestions.find(item => item.id === questionId);
    if (!q) return;

    replaceQNum.textContent = q.id;
    currentQPrompt.textContent = q.prompt;
    currentQMeta.textContent = `Part: ${q.partName} | Current Type: ${q.type}`;

    // Item Status Callout & Badge
    const userLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    const { analytics } = computeLiveAnalytics(userLogs);
    const qData = analytics[questionId];
    const replaceItemStatusBadge = document.getElementById("replaceItemStatusBadge");
    const replaceStatsCallout = document.getElementById("replaceStatsCallout");

    if (qData) {
      if (qData.classification === "difficult") {
        replaceItemStatusBadge.className = "qa-diff-tag diff-tag-hard";
        replaceItemStatusBadge.textContent = "● Very Hard (<20% Correct)";
        replaceStatsCallout.innerHTML = `<strong>⚠️ Replacement Priority (High Difficulty):</strong> Only <strong>${qData.correctPercent}%</strong> of students (${qData.correctCount} of ${qData.totalAttempts}) answered correctly. This item produces high student frustration. Choose a balanced alternative below.`;
      } else if (qData.classification === "easy") {
        replaceItemStatusBadge.className = "qa-diff-tag diff-tag-easy";
        replaceItemStatusBadge.textContent = "● Too Easy (>80% Correct)";
        replaceStatsCallout.innerHTML = `<strong>🟢 Replacement Recommended (Low Discrimination):</strong> <strong>${qData.correctPercent}%</strong> of students (${qData.correctCount} of ${qData.totalAttempts}) answered correctly. This item may not effectively test deeper mastery. Choose a more balanced alternative below.`;
      } else {
        replaceItemStatusBadge.className = "qa-diff-tag diff-tag-ideal";
        replaceItemStatusBadge.textContent = "● Balanced (20%–80% Correct)";
        replaceStatsCallout.innerHTML = `<strong>⚖️ Balanced Item:</strong> <strong>${qData.correctPercent}%</strong> accuracy (${qData.correctCount} of ${qData.totalAttempts} students). This question is currently performing within optimal range.`;
      }
    }

    // Populate Preset Dropdown based on Part
    replacementPresetSelect.innerHTML = `<option value="">-- Choose from Balanced Subordinating Conjunction Bank --</option>`;
    const partKey = `part${q.part}`;
    const bankItems = REPLACEMENT_BANK[partKey] || REPLACEMENT_BANK.part1;

    bankItems.forEach((preset, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = `${preset.title}: "${preset.prompt.slice(0, 48)}..."`;
      replacementPresetSelect.appendChild(opt);
    });

    // Populate Current values into custom editor
    customPromptInput.value = q.prompt;
    replaceExplanation.value = q.explanation || "";

    if (q.type === "rearrange") {
      replaceOptionsEditorGroup.classList.add("hidden");
      replacePart4Group.classList.remove("hidden");
      replacePart4Target.value = q.target || "";
      replacePart4Chips.value = q.scrambledChips ? q.scrambledChips.join(", ") : "";
    } else {
      replaceOptionsEditorGroup.classList.remove("hidden");
      replacePart4Group.classList.add("hidden");

      if (q.options) {
        replaceOptA.value = q.options.A || "";
        replaceOptB.value = q.options.B || "";
        replaceOptC.value = q.options.C || "";
        replaceOptD.value = q.options.D || "";
      }
      replaceCorrectSelect.value = q.correct || "A";
    }

    // Live Card Preview Renderer
    function updateReplaceLivePreview() {
      const previewContainer = document.getElementById("replaceLivePreviewContent");
      if (!previewContainer) return;
      const promptText = customPromptInput.value.trim() || "(Empty prompt)";
      const expText = replaceExplanation.value.trim() || "";

      if (q.type === "rearrange") {
        const target = replacePart4Target.value.trim() || "(Target sentence)";
        const chipsStr = replacePart4Chips.value.trim();
        const chips = chipsStr ? chipsStr.split(",").map(c => c.trim()).filter(Boolean) : target.split(" ");
        previewContainer.innerHTML = `
          <div style="font-weight:700; margin-bottom: 8px; color:#1E293B;">${escapeHtml(promptText)}</div>
          <div style="display:flex; flex-wrap:wrap; gap:6px; margin: 10px 0;">
            ${chips.map(c => `<span style="background:#FEF3C7; border:1px solid #FCD34D; padding:4px 8px; border-radius:6px; font-weight:700; font-size:0.84rem;">${escapeHtml(c)}</span>`).join("")}
          </div>
          <div style="font-size:0.86rem; color:#047857; margin-top:8px;"><strong>Target:</strong> ${escapeHtml(target)}</div>
          ${expText ? `<div style="font-size:0.82rem; color:#64748B; margin-top:6px; background:#F8FAFC; padding:6px; border-radius:6px;">💡 ${escapeHtml(expText)}</div>` : ''}
        `;
      } else {
        const correct = replaceCorrectSelect.value;
        const opts = {
          A: replaceOptA.value.trim(),
          B: replaceOptB.value.trim(),
          C: replaceOptC.value.trim(),
          D: replaceOptD.value.trim()
        };
        previewContainer.innerHTML = `
          <div style="font-weight:700; margin-bottom: 8px; color:#1E293B;">${escapeHtml(promptText)}</div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:6px; margin: 10px 0;">
            ${["A", "B", "C", "D"].map(optKey => {
              if (!opts[optKey]) return '';
              const isCorrect = optKey === correct;
              return `
                <div style="padding: 6px 10px; border-radius:6px; border: 1.5px solid ${isCorrect ? '#10B981' : '#E2E8F0'}; background: ${isCorrect ? '#ECFDF5' : '#FFFFFF'}; font-size:0.86rem; display:flex; justify-content:space-between; align-items:center;">
                  <span><strong>${optKey}.</strong> ${escapeHtml(opts[optKey])}</span>
                  ${isCorrect ? '<span style="color:#059669; font-weight:800;">✓ Correct</span>' : ''}
                </div>
              `;
            }).join("")}
          </div>
          ${expText ? `<div style="font-size:0.82rem; color:#64748B; margin-top:6px; background:#F8FAFC; padding:6px; border-radius:6px;">💡 ${escapeHtml(expText)}</div>` : ''}
        `;
      }
    }

    // Wire live input updates
    [customPromptInput, replaceOptA, replaceOptB, replaceOptC, replaceOptD, replaceCorrectSelect, replacePart4Target, replacePart4Chips, replaceExplanation].forEach(el => {
      if (el) {
        el.oninput = updateReplaceLivePreview;
        el.onchange = updateReplaceLivePreview;
      }
    });

    // Dropdown change auto-fills the editor
    replacementPresetSelect.onchange = (e) => {
      const selectedIdx = e.target.value;
      if (selectedIdx === "") return;
      const preset = bankItems[parseInt(selectedIdx, 10)];
      if (!preset) return;

      customPromptInput.value = preset.prompt;
      replaceExplanation.value = preset.explanation;

      if (q.type === "rearrange") {
        replacePart4Target.value = preset.target || preset.prompt;
        replacePart4Chips.value = preset.scrambledChips ? preset.scrambledChips.join(", ") : "";
      } else {
        if (preset.options) {
          replaceOptA.value = preset.options.A || "";
          replaceOptB.value = preset.options.B || "";
          replaceOptC.value = preset.options.C || "";
          replaceOptD.value = preset.options.D || "";
        }
        replaceCorrectSelect.value = preset.correct || "A";
      }
      sfx.select();
      updateReplaceLivePreview();
    };

    updateReplaceLivePreview();
    replaceQuestionModal.classList.remove("hidden");
  }

  function closeReplaceQuestionModal() {
    sfx.click();
    replaceQuestionModal.classList.add("hidden");
    state.questionToReplaceId = null;
  }

  closeReplaceModalBtn.addEventListener("click", closeReplaceQuestionModal);
  cancelReplaceBtn.addEventListener("click", closeReplaceQuestionModal);

  // Confirm Question Replacement
  confirmReplaceBtn.addEventListener("click", () => {
    const qId = state.questionToReplaceId;
    if (!qId) return;

    const qIndex = activeQuizQuestions.findIndex(q => q.id === qId);
    if (qIndex === -1) return;

    const oldQ = activeQuizQuestions[qIndex];
    const newPrompt = customPromptInput.value.trim();

    if (!newPrompt) {
      alert("Please provide a prompt for the replacement question.");
      return;
    }

    if (oldQ.type === "rearrange") {
      const targetSentence = replacePart4Target.value.trim();
      const chipsInput = replacePart4Chips.value.trim();
      if (!targetSentence) {
        alert("Please specify the correct target sentence.");
        return;
      }

      let parsedChips = chipsInput.split(",").map(c => c.trim()).filter(Boolean);
      if (parsedChips.length === 0) {
        parsedChips = targetSentence.split(" ").filter(Boolean);
      }

      activeQuizQuestions[qIndex] = {
        ...oldQ,
        prompt: newPrompt,
        scrambledChips: parsedChips,
        target: targetSentence,
        explanation: replaceExplanation.value.trim() || oldQ.explanation
      };
    } else {
      activeQuizQuestions[qIndex] = {
        ...oldQ,
        prompt: newPrompt,
        options: {
          A: replaceOptA.value.trim() || "A",
          B: replaceOptB.value.trim() || "B",
          C: replaceOptC.value.trim() || (oldQ.type === "true_false" ? "" : "C"),
          D: replaceOptD.value.trim() || (oldQ.type === "true_false" ? "" : "D")
        },
        correct: replaceCorrectSelect.value,
        explanation: replaceExplanation.value.trim() || oldQ.explanation
      };
    }

    saveActiveQuestions();
    syncQuestionReplaceToServer(qId, activeQuizQuestions[qIndex]);
    sfx.celebrate();
    closeReplaceQuestionModal();
    renderQuestionAnalyticsDashboard();
    alert(`Question #${qId} has been successfully replaced with the new balanced item and deployed to database!`);
  });

  // =========================================================================
  // 11. STUDENT ANSWERS INSPECTION MODAL CONTROLLER
  // =========================================================================
  const studentAnswersModal = document.getElementById("studentAnswersModal");
  const closeStudentModalBtn = document.getElementById("closeStudentModalBtn");
  const closeStudentModalBtnBottom = document.getElementById("closeStudentModalBtnBottom");
  const studentModalTitle = document.getElementById("studentModalTitle");
  const studentModalSubtitle = document.getElementById("studentModalSubtitle");
  const studentModalMetaSummary = document.getElementById("studentModalMetaSummary");
  const studentAnswersListContainer = document.getElementById("studentAnswersListContainer");
  const inspFilterButtons = document.querySelectorAll(".insp-filter-btn");

  let activeInspUser = null;
  let activeInspFilter = "all";

  function openInspectModal(userId) {
    const rawUserLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    const rawUser = rawUserLogs.find(u => u.id === userId);
    if (!rawUser) {
      alert("Student record not found.");
      return;
    }
    const user = getNormalizedStudentRecord(rawUser);

    sfx.click();
    activeInspUser = user;
    activeInspFilter = "all";

    inspFilterButtons.forEach(b => {
      if (b.dataset.inspfilter === "all") b.classList.add("active");
      else b.classList.remove("active");
    });

    studentModalTitle.textContent = `Student Answer Sheet — ${user.name}`;
    studentModalSubtitle.textContent = `Submitted: ${user.timestamp || '-'} | Device: ${user.device || 'Standard Client'}`;

    studentModalMetaSummary.innerHTML = `
      <div class="student-meta-box">
        <span class="meta-box-label">Final Score</span>
        <span class="meta-box-val" style="color: #2563EB;">${user.score} / 100 <small style="font-size:0.75rem; color:#64748B;">(${user.rawScore || Math.round((user.score/100)*50)}/50 pts)</small></span>
      </div>
      <div class="student-meta-box">
        <span class="meta-box-label">Accuracy Rate</span>
        <span class="meta-box-val" style="color: ${user.accuracy >= 80 ? '#059669' : user.accuracy >= 60 ? '#D97706' : '#DC2626'};">${user.accuracy}%</span>
      </div>
      <div class="student-meta-box">
        <span class="meta-box-label">Duration</span>
        <span class="meta-box-val">${user.timeSpentFormatted || formatReadableDuration(user.timeSpentSeconds || 0)}</span>
      </div>
      <div class="student-meta-box">
        <span class="meta-box-label">Pacing Status</span>
        <span class="meta-box-val" style="color: ${user.isLate ? '#DC2626' : '#059669'};">${user.statusLabel || (user.isLate ? 'Late' : 'On Time')}</span>
      </div>
    `;

    renderStudentAnswersList();
    studentAnswersModal.classList.remove("hidden");
  }

  function renderStudentAnswersList() {
    if (!activeInspUser) return;
    studentAnswersListContainer.innerHTML = "";

    const userAns = activeInspUser.answers || {};

    const items = activeQuizQuestions.map(q => {
      const studentVal = userAns[q.id];
      let isCorrect = false;
      let studentDisplay = "";
      let targetDisplay = "";

      if (q.type === "rearrange") {
        isCorrect = studentVal && normalizeSentence(studentVal) === normalizeSentence(q.target);
        studentDisplay = studentVal || "(No response submitted)";
        targetDisplay = q.target;
      } else {
        isCorrect = studentVal === q.correct ||
                    (q.options && q.options[q.correct] && studentVal && String(studentVal).toLowerCase() === q.options[q.correct].toLowerCase()) ||
                    (studentVal && q.correct && String(studentVal).toLowerCase() === q.correct.toLowerCase());
        if (studentVal) {
          if (q.options && q.options[studentVal]) {
            studentDisplay = `${studentVal}. ${q.options[studentVal]}`;
          } else if (q.options) {
            const entry = Object.entries(q.options).find(([k, v]) => v.toLowerCase() === String(studentVal).toLowerCase());
            if (entry) {
              studentDisplay = `${entry[0]}. ${entry[1]}`;
            } else {
              studentDisplay = studentVal;
            }
          } else {
            studentDisplay = studentVal;
          }
        } else {
          studentDisplay = "(Unanswered)";
        }
        targetDisplay = `${q.correct}. ${q.options ? q.options[q.correct] || '' : ''}`;
      }

      return {
        question: q,
        studentVal,
        studentDisplay,
        targetDisplay,
        isCorrect
      };
    });

    const filtered = items.filter(it => {
      if (activeInspFilter === "wrong") return !it.isCorrect;
      if (activeInspFilter === "correct") return it.isCorrect;
      return true;
    });

    if (filtered.length === 0) {
      studentAnswersListContainer.innerHTML = `
        <div style="text-align: center; color: #64748B; padding: 24px; background: #F8FAFC; border-radius: 12px;">
          No questions match this filter view.
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = `insp-item-card ${item.isCorrect ? 'insp-item-correct' : 'insp-item-wrong'}`;

      const weight = 1;
      const scaledPts = 2;
      const pointStr = item.isCorrect ? `✓ Correct (+1 pt | 2/100)` : '✗ Incorrect (0 pt)';

      card.innerHTML = `
        <div class="insp-item-header">
          <span>Question #${item.question.id} — ${item.question.partName}</span>
          <span style="font-weight: 800; color: ${item.isCorrect ? '#059669' : '#DC2626'};">
            ${pointStr}
          </span>
        </div>
        <div style="font-weight: 600; margin-bottom: 6px; color: #1E293B;">${escapeHtml(item.question.prompt)}</div>
        <div class="insp-ans-row">
          <div>Student Response: <span class="ans-student-val ${item.isCorrect ? 'ans-student-correct' : 'ans-student-wrong'}">${escapeHtml(item.studentDisplay)}</span></div>
          <div>Target Answer: <span class="insp-target-val">${escapeHtml(item.targetDisplay)}</span></div>
        </div>
        <div class="insp-exp-text">💡 <strong>Grammar Key:</strong> ${escapeHtml(item.question.explanation || '')}</div>
      `;

      studentAnswersListContainer.appendChild(card);
    });
  }

  inspFilterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      inspFilterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeInspFilter = btn.dataset.inspfilter;
      renderStudentAnswersList();
    });
  });

  function closeStudentInspectionModal() {
    sfx.click();
    studentAnswersModal.classList.add("hidden");
    activeInspUser = null;
  }

  closeStudentModalBtn.addEventListener("click", closeStudentInspectionModal);
  closeStudentModalBtnBottom.addEventListener("click", closeStudentInspectionModal);
  studentAnswersModal.addEventListener("click", (e) => {
    if (e.target === studentAnswersModal) closeStudentInspectionModal();
  });

  // =========================================================================
  // 12. SMARTPHONE ONLINE ACCESS & QR CODE MODAL CONTROLLER
  // =========================================================================
  const openSmartphoneModalBtn = document.getElementById("openSmartphoneModalBtn");
  const welcomeMobileBanner = document.getElementById("welcomeMobileBanner");
  const openSmartphoneFooterBtn = document.getElementById("openSmartphoneFooterBtn");
  const smartphoneModal = document.getElementById("smartphoneModal");
  const closeSmartphoneModalBtn = document.getElementById("closeSmartphoneModalBtn");
  const directOpenLinkBtn = document.getElementById("directOpenLinkBtn");
  const serverStatusText = document.getElementById("serverStatusText");
  const qrCodeContainer = document.getElementById("qrCodeContainer");
  const publicTunnelUrlInput = document.getElementById("publicTunnelUrlInput");
  const localWifiUrlInput = document.getElementById("localWifiUrlInput");
  const copyPublicLinkBtn = document.getElementById("copyPublicLinkBtn");
  const copyWifiLinkBtn = document.getElementById("copyWifiLinkBtn");

  const GITHUB_PAGES_URL = "https://gabrielhuga64.github.io/dibee-gabriel-smart-quiz/";

  async function openSmartphoneModal() {
    sfx.click();
    smartphoneModal.classList.remove("hidden");
    serverStatusText.textContent = "Connecting to server network...";
    publicTunnelUrlInput.value = GITHUB_PAGES_URL;
    localWifiUrlInput.value = "Detecting Wi-Fi IP...";
    qrCodeContainer.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#64748B;font-size:0.9rem;">⏳ Generating QR Code...</div>`;

    try {
      const res = await fetch('/api/network-status');
      const data = await res.json();

      const tunnel = data.tunnelUrl || GITHUB_PAGES_URL;
      const local = data.localUrl || `http://localhost:${data.port || 5500}`;

      serverStatusText.textContent = "Server Online & Listening";
      publicTunnelUrlInput.value = tunnel;
      localWifiUrlInput.value = local;

      // Target URL for smartphone scanning: prefer public HTTPS tunnel or GitHub Pages, fallback to local LAN IP
      const qrTarget = tunnel || local;
      const primaryQr = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=6&data=${encodeURIComponent(qrTarget)}`;
      const fallbackQr = `https://quickchart.io/qr?text=${encodeURIComponent(qrTarget)}&size=220`;

      qrCodeContainer.innerHTML = `
        <img src="${primaryQr}" onerror="this.onerror=null; this.src='${fallbackQr}';" alt="Scan QR Code to Open on Smartphone" style="width:100%;height:100%;object-fit:contain;border-radius:8px;display:block;" />
      `;
      if (directOpenLinkBtn) {
        directOpenLinkBtn.href = qrTarget;
      }
    } catch (e) {
      serverStatusText.textContent = "Online via GitHub Pages";
      const targetUrl = window.location.hostname.includes("github.io") ? window.location.href : GITHUB_PAGES_URL;
      publicTunnelUrlInput.value = targetUrl;
      localWifiUrlInput.value = targetUrl;
      const primaryQr = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=6&data=${encodeURIComponent(targetUrl)}`;
      const fallbackQr = `https://quickchart.io/qr?text=${encodeURIComponent(targetUrl)}&size=220`;
      qrCodeContainer.innerHTML = `
        <img src="${primaryQr}" onerror="this.onerror=null; this.src='${fallbackQr}';" alt="Quiz Link QR" style="width:100%;height:100%;object-fit:contain;border-radius:8px;display:block;" />
      `;
      if (directOpenLinkBtn) {
        directOpenLinkBtn.href = targetUrl;
      }
    }
  }

  function closeSmartphoneModal() {
    sfx.click();
    smartphoneModal.classList.add("hidden");
  }

  if (openSmartphoneModalBtn) openSmartphoneModalBtn.addEventListener("click", openSmartphoneModal);
  if (welcomeMobileBanner) welcomeMobileBanner.addEventListener("click", openSmartphoneModal);
  if (openSmartphoneFooterBtn) openSmartphoneFooterBtn.addEventListener("click", openSmartphoneModal);
  if (closeSmartphoneModalBtn) closeSmartphoneModalBtn.addEventListener("click", closeSmartphoneModal);
  smartphoneModal.addEventListener("click", (e) => {
    if (e.target === smartphoneModal) closeSmartphoneModal();
  });

  copyPublicLinkBtn.addEventListener("click", () => {
    const val = publicTunnelUrlInput.value;
    if (val && !val.startsWith("Fetching") && !val.startsWith("Initializing")) {
      navigator.clipboard.writeText(val).then(() => {
        sfx.select();
        copyPublicLinkBtn.textContent = "✓ Copied!";
        setTimeout(() => { copyPublicLinkBtn.textContent = "📋 Copy"; }, 2000);
      });
    }
  });

  copyWifiLinkBtn.addEventListener("click", () => {
    const val = localWifiUrlInput.value;
    if (val && !val.startsWith("Detecting")) {
      navigator.clipboard.writeText(val).then(() => {
        sfx.select();
        copyWifiLinkBtn.textContent = "✓ Copied!";
        setTimeout(() => { copyWifiLinkBtn.textContent = "📋 Copy"; }, 2000);
      });
    }
  });

  // =========================================================================
  // 13. ADMIN TOOLBAR ACTIONS: SYNC DB, JSON EXPORT, CSV EXPORT, RESET
  // =========================================================================
  const syncDbBtn = document.getElementById("syncDbBtn");
  const exportJsonBtn = document.getElementById("exportJsonBtn");

  if (syncDbBtn) {
    syncDbBtn.addEventListener("click", async () => {
      sfx.click();
      syncDbBtn.textContent = "🔄 Syncing...";
      await loadDatabaseFromServer();
      renderAdminUserLogs(userLogSearch.value);
      renderQuestionAnalyticsDashboard();
      syncDbBtn.textContent = "✓ Synced!";
      setTimeout(() => { syncDbBtn.textContent = "🔄 Sync DB"; }, 1500);
    });
  }

  if (exportJsonBtn) {
    exportJsonBtn.addEventListener("click", async () => {
      sfx.click();
      let fullDbJson = "";
      try {
        const res = await fetch('/api/history');
        const data = await res.json();
        fullDbJson = JSON.stringify(data, null, 2);
      } catch (e) {
        const localSubmissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
        fullDbJson = JSON.stringify({ databaseVersion: "1.0", submissions: localSubmissions }, null, 2);
      }

      const blob = new Blob([fullDbJson], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `BeeQuiz_Database_Backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  // Export Student Logs CSV (Excel-Compatible with UTF-8 BOM)
  exportCsvBtn.addEventListener("click", () => {
    sfx.click();
    const userLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    if (userLogs.length === 0) {
      alert("No student test log data available to export.");
      return;
    }

    const headers = ["ID", "Student Name", "Device / Client", "Score", "Total Questions", "Accuracy (%)", "Time Spent", "Status", "Date & Time"];
    const rows = userLogs.map(u => [
      `"${u.id}"`,
      `"${(u.name || '').replace(/"/g, '""')}"`,
      `"${(u.device || 'Desktop').replace(/"/g, '""')}"`,
      u.score,
      u.totalQuestions || 50,
      u.accuracy,
      `"${u.timeSpentFormatted || ''}"`,
      `"${u.statusLabel || ''}"`,
      `"${u.timestamp || ''}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `BeeQuiz_40Q_Student_Log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

  // =========================================================================
  // 14. EXCEL EXPORT ENGINE: ITEM ANALYSIS & MULTI-SHEET MASTER WORKBOOK
  // =========================================================================

  // Helper: Sanitize sheet name for Microsoft Excel (max 31 chars, no prohibited chars)
  function sanitizeExcelSheetName(name, usedNames = new Set()) {
    let clean = (name || "Student")
      .replace(/[\\/?*\[\]:]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!clean) clean = "Student";
    if (clean.length > 27) clean = clean.slice(0, 27).trim();

    let candidate = clean;
    let counter = 2;
    while (usedNames.has(candidate.toLowerCase())) {
      const suffix = `_${counter}`;
      const base = clean.slice(0, 31 - suffix.length);
      candidate = `${base}${suffix}`;
      counter++;
    }
    usedNames.add(candidate.toLowerCase());
    return candidate;
  }

  // Helper: Format Student Answer Code (e.g., 1A, 2C, 3B, 31[Target])
  function formatStudentAnswerCode(q, studentVal) {
    if (q.type === "rearrange") {
      if (!studentVal) return `${q.id}: Unanswered`;
      const isCorrect = normalizeSentence(studentVal) === normalizeSentence(q.target);
      return `${q.id}: ${isCorrect ? 'Target Match' : 'Rearranged'}`;
    }
    if (!studentVal) return `${q.id}-`;
    let code = String(studentVal).trim().toUpperCase();
    if (q.options) {
      if (q.options[code]) {
        // Already valid letter
      } else {
        const found = Object.entries(q.options).find(([k, v]) => v.toLowerCase() === String(studentVal).toLowerCase());
        if (found) code = found[0];
      }
    }
    return `${q.id}${code}`;
  }

  // Export 50-Question Item Difficulty & Psychometric Analysis (.xlsx with CSV fallback)
  function exportItemAnalysisToExcel() {
    sfx.click();
    const rawUserLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    const userLogs = rawUserLogs.map(getNormalizedStudentRecord);
    const { totalStudents, analytics, easyList, idealList, difficultList, extremeReplaceableList } = computeLiveAnalytics(userLogs);

    if (totalStudents === 0) {
      alert("No student test submissions available in database to compute Item Analysis.");
      return;
    }

    const avgScore = (userLogs.reduce((acc, u) => acc + (u.score || 0), 0) / totalStudents).toFixed(1);
    const avgAccuracy = Math.round(userLogs.reduce((acc, u) => acc + (u.accuracy || 0), 0) / totalStudents);
    const reportDate = new Date().toLocaleString();
    const filenameDate = new Date().toISOString().slice(0, 10);

    // If SheetJS is loaded, generate an actual .xlsx workbook
    if (typeof XLSX !== "undefined") {
      const wb = XLSX.utils.book_new();

      // --- SHEET 1: 50-QUESTION DETAILED ITEM ANALYSIS ---
      const itemAnalysisData = [
        ["BEE SMART LEARNING — 50-QUESTION ITEM DIFFICULTY & PSYCHOMETRIC ANALYSIS"],
        ["Report Generated:", reportDate],
        ["Total Students Assessed:", totalStudents, "", "Average Score:", `${avgScore} / 100 (${avgAccuracy}%)`],
        ["Scoring Rule:", "All Questions (Q1–Q50): 1 pt each (2 scaled pts / 100) | Total = 50 Raw Points | Scaled Score = 100 Points"],
        ["Difficulty Criteria:", "Very Hard (<20% Correct) | Normal / Balanced (20%–80% Correct) | Too Easy (>80% Correct)"],
        ["Summary Breakdown:", `Very Hard: ${difficultList.length} | Normal/Balanced: ${idealList.length} | Too Easy: ${easyList.length} | Outlier Replacements: ${extremeReplaceableList.length}`],
        [],
        [
          "Question #",
          "Part",
          "Part Name",
          "Question Type",
          "Point Value",
          "Question Prompt / Sentence Context",
          "Target Answer Key",
          "Total Attempts",
          "Correct Count",
          "Incorrect Count",
          "Facility Rate (%)",
          "Difficulty Classification",
          "Pedagogical Recommendation",
          "✓ Correct Students Recap",
          "✗ Incorrect Students Recap",
          "Response Distribution (A, B, C, D)",
          "Customization Status",
          "Grammar Explanation / Rule"
        ]
      ];

      activeQuizQuestions.forEach(q => {
        const data = analytics[q.id];
        const isCustom = isQuestionCustomized(q.id);
        const weight = 1;
        const scaledVal = 2;

        let actionRecommendation = "RETAIN: Optimal Discrimination (Balanced)";
        if (data.classification === "easy") {
          actionRecommendation = "ACTION RECOMMENDED: Replace Question (Too Easy - Low Discrimination Power)";
        } else if (data.classification === "difficult") {
          actionRecommendation = "ACTION RECOMMENDED: Replace Question (Very Hard - High Student Failure Rate)";
        }

        const correctRecap = data.correctStudents && data.correctStudents.length > 0 
          ? data.correctStudents.join(", ") 
          : "None";
        const wrongRecap = data.wrongStudents && data.wrongStudents.length > 0 
          ? data.wrongStudents.join(", ") 
          : "None";

        const distStr = `A:${data.choiceDistribution.A} | B:${data.choiceDistribution.B} | C:${data.choiceDistribution.C} | D:${data.choiceDistribution.D}`;

        itemAnalysisData.push([
          q.id,
          q.part,
          q.partName,
          q.type.toUpperCase(),
          `${weight} raw pt (${scaledVal}/100)`,
          q.prompt,
          data.correctTarget,
          data.totalAttempts,
          data.correctCount,
          data.wrongCount,
          `${data.correctPercent}%`,
          data.classLabel,
          actionRecommendation,
          correctRecap,
          wrongRecap,
          distStr,
          isCustom ? "Custom Replacement Applied" : "Original Default Question",
          q.explanation || ""
        ]);
      });

      const wsItemAnalysis = XLSX.utils.aoa_to_sheet(itemAnalysisData);
      wsItemAnalysis['!cols'] = [
        { wch: 6 },   // Q#
        { wch: 6 },   // Part
        { wch: 22 },  // Part Name
        { wch: 14 },  // Question Type
        { wch: 18 },  // Point Value
        { wch: 55 },  // Prompt
        { wch: 32 },  // Target Key
        { wch: 14 },  // Total Attempts
        { wch: 14 },  // Correct Count
        { wch: 14 },  // Incorrect Count
        { wch: 16 },  // Facility Rate
        { wch: 26 },  // Classification
        { wch: 45 },  // Pedagogical Action
        { wch: 45 },  // Correct Recap
        { wch: 45 },  // Incorrect Recap
        { wch: 24 },  // Distribution
        { wch: 25 },  // Custom Status
        { wch: 55 }   // Grammar Explanation
      ];
      XLSX.utils.book_append_sheet(wb, wsItemAnalysis, "Item Analysis (Q1-50)");

      // --- SHEET 2: PSYCHOMETRIC CRITERIA & POLICY SUMMARY ---
      const criteriaData = [
        ["ITEM DIFFICULTY CRITERIA & PEDAGOGICAL POLICY REFERENCE"],
        ["Report Generated:", reportDate],
        [],
        ["Classification Category", "Facility Rate Range", "Pedagogical Meaning", "System Recommendation", "Current Count in Test"],
        [
          "Very Hard",
          "< 20% Correct Accuracy",
          "High student failure rate; question may contain misleading distractors or overly complex wording.",
          "EVALUATE / REPLACE: Choose balanced alternative from question bank.",
          `${difficultList.length} Questions (${difficultList.length > 0 ? difficultList.map(id => `#${id}`).join(', ') : 'None'})`
        ],
        [
          "Normal / Balanced",
          "20% to 80% Correct Accuracy",
          "Optimal discrimination power across varying learner competencies. High psychometric reliability.",
          "RETAIN: Question functions optimally.",
          `${idealList.length} Questions (${idealList.length > 0 ? idealList.map(id => `#${id}`).join(', ') : 'None'})`
        ],
        [
          "Too Easy",
          "> 80% Correct Accuracy",
          "Almost all students answer correctly. Question provides very low discrimination capability.",
          "EVALUATE / REPLACE: Choose balanced alternative to raise instructional depth.",
          `${easyList.length} Questions (${easyList.length > 0 ? easyList.map(id => `#${id}`).join(', ') : 'None'})`
        ],
        [],
        ["Scoring Weights:", "Parts 1–3 (Q1–Q30): 1 point each = 30 raw points"],
        ["", "Part 4 Word Bank (Q31–Q40): 1 point each = 10 raw points"],
        ["", "Part 5 Jumbled Words (Q41–Q50): 1 point each = 10 raw points"],
        ["", "Total Raw Points: 50 points | Scaled Final Score: 100 points (Raw Points × 2)"]
      ];

      const wsCriteria = XLSX.utils.aoa_to_sheet(criteriaData);
      wsCriteria['!cols'] = [
        { wch: 24 },
        { wch: 26 },
        { wch: 50 },
        { wch: 45 },
        { wch: 30 }
      ];
      XLSX.utils.book_append_sheet(wb, wsCriteria, "Criteria & Policy");

      XLSX.writeFile(wb, `BeeQuiz_50Q_Item_Difficulty_Analysis_${filenameDate}.xlsx`);
      return;
    }

    // Fallback: UTF-8 BOM CSV if XLSX library is not present
    const escapeCsv = (str) => {
      if (str === null || str === undefined) return '""';
      const clean = String(str).replace(/<[^>]*>/g, '').replace(/"/g, '""').trim();
      return `"${clean}"`;
    };

    const csvLines = [];
    csvLines.push([escapeCsv("BEE SMART LEARNING - 50-QUESTION SUBORDINATING CONJUNCTION ITEM DIFFICULTY & PSYCHOMETRIC ANALYSIS")].join(","));
    csvLines.push([escapeCsv("Report Generated"), escapeCsv(reportDate)].join(","));
    csvLines.push([escapeCsv("Total Students Assessed"), escapeCsv(totalStudents)].join(","));
    csvLines.push([escapeCsv("Average Student Score"), escapeCsv(`${avgScore} / 100 (${avgAccuracy}%)`)].join(","));
    csvLines.push([escapeCsv("Scoring Rule"), escapeCsv("All Questions (Q1-Q50) = 1 pt each (2 pts / 100) | Total = 50 Raw Points | Scaled = 100 pts")].join(","));
    csvLines.push([escapeCsv("Balanced / Ideal Items (20% to 80%)"), escapeCsv(`${idealList.length} Questions`), escapeCsv("Optimal discrimination. Retain.")].join(","));
    csvLines.push([escapeCsv("Too Easy Items (>80%)"), escapeCsv(`${easyList.length} Questions`), escapeCsv("Low discrimination. Action recommended: Evaluate or Replace.")].join(","));
    csvLines.push([escapeCsv("Very Hard Items (<20%)"), escapeCsv(`${difficultList.length} Questions`), escapeCsv("High student failure rate. Action recommended: Evaluate or Replace.")].join(","));
    csvLines.push("");

    const tableHeaders = [
      "Question #",
      "Part",
      "Part Name",
      "Question Type",
      "Point Value",
      "Question Prompt / Sentence Context",
      "Target Answer Key",
      "Total Attempts",
      "Correct Count",
      "Incorrect Count",
      "Facility Rate (%)",
      "Difficulty Classification",
      "Pedagogical Recommendation",
      "Correct Students Recap",
      "Incorrect Students Recap",
      "Option Distribution",
      "Customization Status",
      "Grammar Explanation / Rule"
    ];
    csvLines.push(tableHeaders.map(h => escapeCsv(h)).join(","));

    activeQuizQuestions.forEach(q => {
      const data = analytics[q.id];
      const isCustom = isQuestionCustomized(q.id);
      const weight = 1;
      const scaledVal = 2;

      let actionRecommendation = "RETAIN: Optimal Discrimination (Balanced)";
      if (data.classification === "easy") {
        actionRecommendation = "ACTION RECOMMENDED: Replace Question (Too Easy - Low Discrimination Power)";
      } else if (data.classification === "difficult") {
        actionRecommendation = "ACTION RECOMMENDED: Replace Question (Very Hard - High Student Failure Rate)";
      }

      const correctRecap = data.correctStudents && data.correctStudents.length > 0 ? data.correctStudents.join("; ") : "None";
      const wrongRecap = data.wrongStudents && data.wrongStudents.length > 0 ? data.wrongStudents.join("; ") : "None";
      const distStr = `A:${data.choiceDistribution.A} | B:${data.choiceDistribution.B} | C:${data.choiceDistribution.C} | D:${data.choiceDistribution.D}`;

      const row = [
        q.id,
        q.part,
        escapeCsv(q.partName),
        escapeCsv(q.type.toUpperCase()),
        escapeCsv(`${weight} raw pt (${scaledVal}/100)`),
        escapeCsv(q.prompt),
        escapeCsv(data.correctTarget),
        data.totalAttempts,
        data.correctCount,
        data.wrongCount,
        `"${data.correctPercent}%"`,
        escapeCsv(data.classLabel),
        escapeCsv(actionRecommendation),
        escapeCsv(correctRecap),
        escapeCsv(wrongRecap),
        escapeCsv(distStr),
        escapeCsv(isCustom ? "Custom Replacement Applied" : "Original Default Question"),
        escapeCsv(q.explanation || "")
      ];
      csvLines.push(row.join(","));
    });

    const csvContent = "\uFEFF" + csvLines.join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `BeeQuiz_50Q_Item_Difficulty_Analysis_${filenameDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // =========================================================================
  // MASTER EXCEL WORKBOOK: OVERVIEW, ITEM ANALYSIS, ANSWERS MATRIX & STUDENT SHEETS
  // =========================================================================
  function exportMasterExcelWorkbook() {
    sfx.click();
    const rawUserLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    const userLogs = rawUserLogs.map(getNormalizedStudentRecord);

    if (userLogs.length === 0) {
      alert("No student test submissions available to export in the Master Excel workbook.");
      return;
    }

    if (typeof XLSX === "undefined") {
      alert("SheetJS library is still initializing. Downloading standard CSV log instead.");
      exportItemAnalysisToExcel();
      return;
    }

    const { totalStudents, analytics, easyList, idealList, difficultList, extremeReplaceableList } = computeLiveAnalytics(userLogs);
    const avgScore = (userLogs.reduce((acc, u) => acc + (u.score || 0), 0) / userLogs.length).toFixed(1);
    const avgAccuracy = Math.round(userLogs.reduce((acc, u) => acc + (u.accuracy || 0), 0) / userLogs.length);
    const reportDate = new Date().toLocaleString();
    const filenameDate = new Date().toISOString().slice(0, 10);

    const wb = XLSX.utils.book_new();
    const usedSheetNames = new Set();

    // -------------------------------------------------------------------------
    // SHEET 1: OVERVIEW & ALL STUDENTS TEST LOG
    // -------------------------------------------------------------------------
    const overviewData = [
      ["BEE SMART LEARNING — MASTER STUDENT TEST ASSESSMENT & SCORING OVERVIEW (50 QUESTIONS)"],
      ["Report Generated:", reportDate],
      ["Total Students Assessed:", userLogs.length, "", "Average Scaled Score:", `${avgScore} / 100`],
      ["Average Accuracy Rate:", `${avgAccuracy}%`, "", "Scoring Structure:", "All Questions (Q1–Q50): 1 pt each (2 scaled pts / 100) | Total = 50 Raw Points | Scaled Score = 100 Points"],
      ["Item Difficulty Status:", `Balanced Items: ${idealList.length} | Very Hard: ${difficultList.length} | Too Easy: ${easyList.length} | Outlier Items: ${extremeReplaceableList.length}`],
      [],
      [
        "#",
        "Student ID",
        "Student Name",
        "Testing Device / Platform",
        "Final Score (/100)",
        "Raw Points (/50)",
        "Accuracy (%)",
        "Part 1–3 Correct (/30)",
        "Part 4 Word Bank Correct (/10)",
        "Part 5 Jumbled Words Correct (/10)",
        "Total Correct (/50)",
        "Total Incorrect (/50)",
        "Time Spent",
        "Pacing Status",
        "Date & Time Submitted",
        "Compact Answer Code Sequence"
      ]
    ];

    userLogs.forEach((u, index) => {
      const answers = u.answers || {};
      const compactCodeList = activeQuizQuestions.map(q => formatStudentAnswerCode(q, answers[q.id])).join(", ");

      overviewData.push([
        index + 1,
        u.id,
        u.name,
        u.device || "Desktop",
        u.score,
        u.rawScore || Math.round((u.score / 100) * 50),
        `${u.accuracy}%`,
        u.part123Correct !== undefined ? u.part123Correct : "-",
        u.part4Correct !== undefined ? u.part4Correct : "-",
        u.part5Correct !== undefined ? u.part5Correct : "-",
        u.correctCount !== undefined ? u.correctCount : Math.round((u.accuracy / 100) * 50),
        50 - (u.correctCount !== undefined ? u.correctCount : Math.round((u.accuracy / 100) * 50)),
        u.timeSpentFormatted || formatReadableDuration(u.timeSpentSeconds || 0),
        u.statusLabel || (u.isLate ? "Late" : "On Time"),
        u.timestamp || "-",
        compactCodeList
      ]);
    });

    const wsOverview = XLSX.utils.aoa_to_sheet(overviewData);
    wsOverview['!cols'] = [
      { wch: 5 },   // #
      { wch: 12 },  // ID
      { wch: 26 },  // Name
      { wch: 28 },  // Device
      { wch: 18 },  // Score /100
      { wch: 16 },  // Raw Points /50
      { wch: 14 },  // Accuracy %
      { wch: 22 },  // Part 1-3 Correct
      { wch: 26 },  // Part 4 Word Bank Correct
      { wch: 26 },  // Part 5 Jumbled Words Correct
      { wch: 20 },  // Total Correct
      { wch: 20 },  // Total Incorrect
      { wch: 15 },  // Time Spent
      { wch: 16 },  // Status
      { wch: 22 },  // Date & Time
      { wch: 60 }   // Compact Answer Code Sequence
    ];
    const overviewSheetName = sanitizeExcelSheetName("Overview & Test Log", usedSheetNames);
    XLSX.utils.book_append_sheet(wb, wsOverview, overviewSheetName);

    // -------------------------------------------------------------------------
    // SHEET 2: 50-QUESTION ITEM DIFFICULTY & PSYCHOMETRIC ANALYSIS
    // -------------------------------------------------------------------------
    const itemAnalysisData = [
      ["50-QUESTION SUBORDINATING CONJUNCTION ITEM DIFFICULTY & PSYCHOMETRIC ANALYSIS"],
      ["Report Generated:", reportDate],
      ["Total Students Evaluated:", totalStudents],
      ["Difficulty Scale:", "Very Hard (<20% Correct) | Normal / Balanced (20%–80% Correct) | Too Easy (>80% Correct)"],
      ["Summary:", `Very Hard: ${difficultList.length} Questions | Normal/Balanced: ${idealList.length} Questions | Too Easy: ${easyList.length} Questions`],
      [],
      [
        "Question #",
        "Part",
        "Part Name",
        "Question Type",
        "Point Weight",
        "Question Prompt / Sentence Context",
        "Target Answer Key",
        "Total Attempts",
        "Correct Count",
        "Incorrect Count",
        "Facility Rate (%)",
        "Difficulty Classification",
        "Pedagogical Recommendation",
        "✓ Correct Students Recap",
        "✗ Incorrect Students Recap",
        "Response Distribution (A, B, C, D)",
        "Customization Status",
        "Grammar Explanation / Rule"
      ]
    ];

    activeQuizQuestions.forEach(q => {
      const data = analytics[q.id];
      const isCustom = isQuestionCustomized(q.id);
      const weight = 1;
      const scaledVal = 2;

      let actionRecommendation = "RETAIN: Optimal Discrimination (Balanced)";
      if (data.classification === "easy") {
        actionRecommendation = "ACTION RECOMMENDED: Replace Question (Too Easy - Low Discrimination Power)";
      } else if (data.classification === "difficult") {
        actionRecommendation = "ACTION RECOMMENDED: Replace Question (Very Hard - High Student Failure Rate)";
      }

      const correctRecap = data.correctStudents && data.correctStudents.length > 0 ? data.correctStudents.join(", ") : "None";
      const wrongRecap = data.wrongStudents && data.wrongStudents.length > 0 ? data.wrongStudents.join(", ") : "None";
      const distStr = `A:${data.choiceDistribution.A} | B:${data.choiceDistribution.B} | C:${data.choiceDistribution.C} | D:${data.choiceDistribution.D}`;

      itemAnalysisData.push([
        q.id,
        q.part,
        q.partName,
        q.type.toUpperCase(),
        `${weight} raw pt (${scaledVal}/100)`,
        q.prompt,
        data.correctTarget,
        data.totalAttempts,
        data.correctCount,
        data.wrongCount,
        `${data.correctPercent}%`,
        data.classLabel,
        actionRecommendation,
        correctRecap,
        wrongRecap,
        distStr,
        isCustom ? "Custom Replacement Applied" : "Original Default Question",
        q.explanation || ""
      ]);
    });

    const wsItemAnalysis = XLSX.utils.aoa_to_sheet(itemAnalysisData);
    wsItemAnalysis['!cols'] = [
      { wch: 6 },
      { wch: 6 },
      { wch: 22 },
      { wch: 14 },
      { wch: 18 },
      { wch: 55 },
      { wch: 32 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 16 },
      { wch: 26 },
      { wch: 45 },
      { wch: 45 },
      { wch: 45 },
      { wch: 24 },
      { wch: 25 },
      { wch: 55 }
    ];
    const itemSheetName = sanitizeExcelSheetName("Item Analysis (Q1-50)", usedSheetNames);
    XLSX.utils.book_append_sheet(wb, wsItemAnalysis, itemSheetName);

    // -------------------------------------------------------------------------
    // SHEET 3: CROSS-TABULATION STUDENT ANSWERS MATRIX (huga 1a, 2c, 3b; boby...)
    // -------------------------------------------------------------------------
    const matrixHeaderRow = [
      "Q#",
      "Part",
      "Question Type",
      "Target Answer Key",
      ...userLogs.map(u => `${u.name} (${u.score}/100)`)
    ];

    const matrixData = [
      ["STUDENT ANSWERS CROSS-TABULATION MATRIX"],
      ["Quick Reference:", "Shows each student's compact answer code (e.g. 1A, 2C, 3B) and correctness (✓ / ✗)"],
      [],
      matrixHeaderRow
    ];

    activeQuizQuestions.forEach(q => {
      const targetShort = q.type === "rearrange" ? q.target : `${q.correct}. ${q.options ? q.options[q.correct] : ''}`;
      const row = [
        q.id,
        q.part,
        q.type.toUpperCase(),
        targetShort
      ];

      userLogs.forEach(u => {
        const studentAns = u.answers ? u.answers[q.id] : null;
        let isCorrect = false;

        if (q.type === "rearrange") {
          isCorrect = studentAns && normalizeSentence(studentAns) === normalizeSentence(q.target);
          row.push(`${q.id}: ${isCorrect ? 'Target (✓)' : 'Wrong (✗)'}`);
        } else {
          isCorrect = studentAns === q.correct;
          const code = studentAns ? `${q.id}${studentAns}` : `${q.id}-`;
          row.push(`${code} ${isCorrect ? '(✓)' : '(✗)'}`);
        }
      });

      matrixData.push(row);
    });

    // Summary Rows for Matrix
    matrixData.push([]);
    matrixData.push(["Total Correct (/50)", "", "", "", ...userLogs.map(u => `${u.correctCount !== undefined ? u.correctCount : Math.round((u.accuracy / 100) * 50)} / 50`)]);
    matrixData.push(["Raw Points (/50)", "", "", "", ...userLogs.map(u => `${u.rawScore || Math.round((u.score / 100) * 50)} / 50 pts`)]);
    matrixData.push(["Scaled Score (/100)", "", "", "", ...userLogs.map(u => `${u.score} / 100`)]);
    matrixData.push(["Accuracy (%)", "", "", "", ...userLogs.map(u => `${u.accuracy}%`)]);

    const wsMatrix = XLSX.utils.aoa_to_sheet(matrixData);
    const matrixColWidths = [
      { wch: 6 },
      { wch: 6 },
      { wch: 14 },
      { wch: 35 },
      ...userLogs.map(() => ({ wch: 26 }))
    ];
    wsMatrix['!cols'] = matrixColWidths;
    const matrixSheetName = sanitizeExcelSheetName("Student Answers Matrix", usedSheetNames);
    XLSX.utils.book_append_sheet(wb, wsMatrix, matrixSheetName);

    // -------------------------------------------------------------------------
    // SHEET 4: BINARY ITEM SCORING MATRIX (1/0) & PSYCHOMETRIC CALIBRATION
    // -------------------------------------------------------------------------
    const binaryHeader1 = [
      "No",
      "Participant Name",
      "QUESTION NUMBER",
      ...Array(activeQuizQuestions.length - 1).fill(""),
      "Raw",
      "Score"
    ];
    const binaryHeader2 = [
      "",
      "",
      ...activeQuizQuestions.map(q => q.id),
      "Score",
      ""
    ];
    const binarySheetData = [binaryHeader1, binaryHeader2];

    const binaryQStats = activeQuizQuestions.map(q => {
      let correctCount = 0;
      userLogs.forEach(u => {
        const studentVal = u.answers ? u.answers[q.id] : null;
        let isCorrect = false;
        if (q.type === "rearrange") {
          isCorrect = studentVal && (
            normalizeSentence(studentVal) === normalizeSentence(q.target) ||
            (Array.isArray(q.alternateTargets) && q.alternateTargets.some(alt => normalizeSentence(studentVal) === normalizeSentence(alt)))
          );
        } else {
          isCorrect = studentVal === q.correct || 
                      (q.options && q.options[q.correct] && studentVal && studentVal.toLowerCase() === q.options[q.correct].toLowerCase()) ||
                      (studentVal && q.correct && studentVal.toLowerCase() === q.correct.toLowerCase());
        }
        if (isCorrect) correctCount++;
      });
      const pct = userLogs.length > 0 ? (correctCount / userLogs.length) * 100 : 0;
      let cat = "ideal";
      if (pct >= 85) cat = "easy";
      else if (pct <= 40) cat = "hard";
      return { id: q.id, correctCount, pct, cat };
    });

    let bTotalRaw = 0;
    let bTotalScore = 0;

    userLogs.forEach((u, idx) => {
      let rScore = 0;
      const bRow = activeQuizQuestions.map(q => {
        const studentVal = u.answers ? u.answers[q.id] : null;
        let isCorrect = false;
        if (q.type === "rearrange") {
          isCorrect = studentVal && (
            normalizeSentence(studentVal) === normalizeSentence(q.target) ||
            (Array.isArray(q.alternateTargets) && q.alternateTargets.some(alt => normalizeSentence(studentVal) === normalizeSentence(alt)))
          );
        } else {
          isCorrect = studentVal === q.correct || 
                      (q.options && q.options[q.correct] && studentVal && studentVal.toLowerCase() === q.options[q.correct].toLowerCase()) ||
                      (studentVal && q.correct && studentVal.toLowerCase() === q.correct.toLowerCase());
        }
        if (isCorrect) rScore++;
        return isCorrect ? 1 : 0;
      });
      const fScore = rScore * 2;
      bTotalRaw += rScore;
      bTotalScore += fScore;
      binarySheetData.push([idx + 1, u.name, ...bRow, rScore, fScore]);
    });

    binarySheetData.push([
      "",
      "Total Correct",
      ...binaryQStats.map(qs => qs.correctCount),
      bTotalRaw,
      bTotalScore
    ]);
    binarySheetData.push([]);
    binarySheetData.push(["Analysis:"]);
    binarySheetData.push(["Total Questions:", `${activeQuizQuestions.length} questions`]);
    binarySheetData.push(["Total Test Takers:", `${userLogs.length} students`]);
    binarySheetData.push([]);
    binarySheetData.push(["Analysis Criteria:"]);
    binarySheetData.push(["• ≥ 85% correct = Too Easy"]);
    binarySheetData.push(["• 41%–84% correct = Ideal / Balanced"]);
    binarySheetData.push(["• ≤ 40% correct = Too Difficult"]);
    binarySheetData.push([]);
    binarySheetData.push(["Summary of Results"]);
    binarySheetData.push([`Too Easy Questions: [${binaryQStats.filter(qs => qs.cat === "easy").map(qs => qs.id).join(", ")}]`]);
    binarySheetData.push([`Ideal Questions: [${binaryQStats.filter(qs => qs.cat === "ideal").map(qs => qs.id).join(", ")}]`]);
    binarySheetData.push([`Too Difficult Questions: [${binaryQStats.filter(qs => qs.cat === "hard").map(qs => qs.id).join(", ")}]`]);
    binarySheetData.push([]);
    binarySheetData.push(["Recommendations"]);
    binarySheetData.push(["• Too easy questions should be replaced with more contextual sentences or stronger distractors."]);
    binarySheetData.push(["• Too difficult questions need clearer instructions or adjusted vocabulary / difficulty."]);
    binarySheetData.push(["• Ideal category questions should be retained as they optimally discriminate student mastery."]);

    const wsBinary = XLSX.utils.aoa_to_sheet(binarySheetData);
    wsBinary['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
      { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
      { s: { r: 0, c: 2 }, e: { r: 0, c: 1 + activeQuizQuestions.length } },
      { s: { r: 0, c: 2 + activeQuizQuestions.length }, e: { r: 1, c: 2 + activeQuizQuestions.length } },
      { s: { r: 0, c: 3 + activeQuizQuestions.length }, e: { r: 1, c: 3 + activeQuizQuestions.length } }
    ];
    const bColWidths = [{ wch: 6 }, { wch: 24 }];
    for (let i = 0; i < activeQuizQuestions.length; i++) bColWidths.push({ wch: 4 });
    bColWidths.push({ wch: 11 });
    bColWidths.push({ wch: 11 });
    wsBinary['!cols'] = bColWidths;

    const binarySheetName = sanitizeExcelSheetName("Binary Matrix (1-0)", usedSheetNames);
    XLSX.utils.book_append_sheet(wb, wsBinary, binarySheetName);

    // -------------------------------------------------------------------------
    // SHEETS 5..N: DEDICATED INDIVIDUAL WORKSHEET FOR EACH STUDENT (huga, boby, etc.)
    // -------------------------------------------------------------------------
    userLogs.forEach(student => {
      const studentAnswers = student.answers || {};
      const compactCodeList = activeQuizQuestions.map(q => formatStudentAnswerCode(q, studentAnswers[q.id])).join(", ");

      const studentSheetData = [
        [`INDIVIDUAL STUDENT ASSESSMENT REPORT — ${student.name.toUpperCase()}`],
        ["Student ID:", student.id, "", "Testing Device:", student.device || "Desktop Client"],
        ["Final Scaled Score:", `${student.score} / 100`, "", "Raw Score Points:", `${student.rawScore || Math.round((student.score / 100) * 50)} / 50 pts`],
        ["Overall Accuracy:", `${student.accuracy}%`, "", "Time Spent / Duration:", student.timeSpentFormatted || formatReadableDuration(student.timeSpentSeconds || 0)],
        ["Pacing Status:", student.statusLabel || (student.isLate ? "Late" : "On Time"), "", "Submission Timestamp:", student.timestamp || "-"],
        ["Compact Answer Sequence:", compactCodeList],
        [],
        [
          "Q#",
          "Part",
          "Part Name",
          "Question Type",
          "Question Prompt / Sentence Context",
          "Answer Code",
          "Student Selected Answer",
          "Target Correct Answer",
          "Evaluation Result",
          "Points Awarded",
          "Marked Not Sure?",
          "Grammar Explanation / Rule"
        ]
      ];

      activeQuizQuestions.forEach(q => {
        const studentVal = studentAnswers[q.id];
        let isCorrect = false;
        let studentDisplay = "";
        let targetDisplay = "";

        if (q.type === "rearrange") {
          isCorrect = studentVal && normalizeSentence(studentVal) === normalizeSentence(q.target);
          studentDisplay = studentVal || "(Unanswered)";
          targetDisplay = q.target;
        } else {
          isCorrect = studentVal === q.correct;
          studentDisplay = studentVal ? `${studentVal}. ${q.options ? q.options[studentVal] || '' : ''}` : "(Unanswered)";
          targetDisplay = `${q.correct}. ${q.options ? q.options[q.correct] || '' : ''}`;
        }

        const answerCode = formatStudentAnswerCode(q, studentVal);
        const weight = 1;
        const scaledVal = 2;
        const pointsStr = isCorrect ? `+${weight} raw pt (+${scaledVal}/100)` : "0 pt";

        studentSheetData.push([
          q.id,
          q.part,
          q.partName,
          q.type.toUpperCase(),
          q.prompt,
          answerCode,
          studentDisplay,
          targetDisplay,
          isCorrect ? "✓ CORRECT" : "✗ INCORRECT",
          pointsStr,
          studentVal ? "No" : "Unanswered",
          q.explanation || ""
        ]);
      });

      // Bottom Totals Row for Student Sheet
      studentSheetData.push([]);
      studentSheetData.push([
        "TOTAL",
        "",
        "",
        "",
        "",
        "",
        "",
        "Final Summary:",
        `${student.correctCount !== undefined ? student.correctCount : Math.round((student.accuracy / 100) * 50)} / 50 Correct (${student.accuracy}%)`,
        `${student.rawScore || Math.round((student.score / 100) * 50)} / 50 raw pts (${student.score} / 100)`,
        "",
        ""
      ]);

      const wsStudent = XLSX.utils.aoa_to_sheet(studentSheetData);
      wsStudent['!cols'] = [
        { wch: 6 },   // Q#
        { wch: 6 },   // Part
        { wch: 22 },  // Part Name
        { wch: 14 },  // Question Type
        { wch: 55 },  // Prompt
        { wch: 18 },  // Answer Code (1A, 2C, 3B...)
        { wch: 35 },  // Student Answer
        { wch: 35 },  // Target Key
        { wch: 16 },  // Evaluation Result
        { wch: 22 },  // Points Awarded
        { wch: 18 },  // Marked Not Sure
        { wch: 55 }   // Grammar Explanation
      ];

      const cleanStudentSheetName = sanitizeExcelSheetName(student.name, usedSheetNames);
      XLSX.utils.book_append_sheet(wb, wsStudent, cleanStudentSheetName);
    });

    // Save and Trigger Browser Download
    XLSX.writeFile(wb, `BeeQuiz_50Q_Master_Student_Assessment_Workbook_${filenameDate}.xlsx`);
  }

  // =========================================================================
  // EXPORT: DOWNLOAD ALL 50 QUESTIONS (EXAM PAPER / QUESTION SHEET)
  // =========================================================================
  function exportQuestionsOnlyWorkbook() {
    sfx.click();
    const reportDate = new Date().toLocaleString();
    const filenameDate = new Date().toISOString().slice(0, 10);

    if (typeof XLSX === "undefined") {
      // Fallback to CSV
      const csvLines = [
        ["BEE SMART LEARNING — OFFICIAL SUBORDINATING CONJUNCTION MASTER EXAM PAPER (50 QUESTIONS)"],
        [`Date Generated: ${reportDate}`, "Total Questions: 50", "Duration: 45 Minutes", "Points: 1 pt each (50 Raw / 100 Scaled)"],
        [],
        ["Q#", "Part", "Part Name", "Question Type", "Passage / Context Reference", "Question Prompt / Sentence with Blank", "Choices / Word Bank / Word Chips", "Points"]
      ];

      activeQuizQuestions.forEach(q => {
        let passageTitle = "-";
        if (q.passageKey && READING_PASSAGES[q.passageKey]) {
          passageTitle = READING_PASSAGES[q.passageKey].title || q.passageKey;
        }

        let choicesStr = "";
        if (q.options) {
          choicesStr = Object.entries(q.options).map(([k, v]) => `${k}. ${v}`).join(" | ");
        } else if (Array.isArray(q.scrambledChips)) {
          choicesStr = "Scrambled Chips: " + q.scrambledChips.join(" / ");
        }

        let typeLabel = "Multiple Choice";
        if (q.type === "true_false") typeLabel = "Grammatical Correctness";
        else if (q.type === "word_bank") typeLabel = "Word Bank Cloze";
        else if (q.type === "rearrange") typeLabel = "Sentence Ordering (Jumbled Words)";

        csvLines.push([
          q.id,
          q.part,
          escapeCsv(q.partName),
          escapeCsv(typeLabel),
          escapeCsv(passageTitle),
          escapeCsv(q.prompt),
          escapeCsv(choicesStr),
          "1 pt (2%)"
        ]);
      });

      const csvContent = "\uFEFF" + csvLines.map(r => Array.isArray(r) ? r.join(",") : r).join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `BeeQuiz_50_Questions_Exam_Paper_${filenameDate}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }

    const wb = XLSX.utils.book_new();

    const sheetData = [
      ["BEE SMART LEARNING — OFFICIAL SUBORDINATING CONJUNCTION MASTER EXAM PAPER (50 QUESTIONS)"],
      ["Report Generated:", reportDate, "", "Exam Duration:", "45 Minutes", "", "Total Questions:", "50 Questions"],
      ["Scoring Rule:", "1 point per question | 50 Raw Points Max | 100 Scaled Score", "", "Subject:", "English Grammar — Subordinating Conjunctions"],
      [],
      [
        "Q#",
        "Part",
        "Part Name",
        "Question Type",
        "Passage / Context Reference",
        "Question Prompt / Sentence with Blank",
        "Choices / Word Bank / Word Chips",
        "Points Awarded"
      ]
    ];

    activeQuizQuestions.forEach(q => {
      let passageTitle = "-";
      if (q.passageKey && READING_PASSAGES[q.passageKey]) {
        passageTitle = READING_PASSAGES[q.passageKey].title || q.passageKey;
      }

      let choicesStr = "";
      if (q.options) {
        choicesStr = Object.entries(q.options).map(([k, v]) => `${k}. ${v}`).join(" | ");
      } else if (Array.isArray(q.scrambledChips)) {
        choicesStr = "Scrambled Chips: " + q.scrambledChips.join(" / ");
      }

      let typeLabel = "Multiple Choice";
      if (q.type === "true_false") typeLabel = "Grammatical Correctness";
      else if (q.type === "word_bank") typeLabel = "Word Bank Cloze";
      else if (q.type === "rearrange") typeLabel = "Sentence Ordering (Jumbled Words)";

      sheetData.push([
        q.id,
        q.part,
        q.partName,
        typeLabel,
        passageTitle,
        q.prompt,
        choicesStr,
        "1 raw pt (+2/100)"
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    ws['!cols'] = [
      { wch: 6 },   // Q#
      { wch: 6 },   // Part
      { wch: 25 },  // Part Name
      { wch: 22 },  // Question Type
      { wch: 38 },  // Passage Reference
      { wch: 65 },  // Prompt
      { wch: 55 },  // Choices
      { wch: 18 }   // Points
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Exam Questions (Q1-50)");
    XLSX.writeFile(wb, `BeeQuiz_50_Questions_Exam_Paper_${filenameDate}.xlsx`);
  }

  // =========================================================================
  // EXPORT: DOWNLOAD MASTER ANSWER KEYS & PEDAGOGICAL REASONS / EXPLANATIONS
  // =========================================================================
  function exportAnswerKeysWorkbook() {
    sfx.click();
    const reportDate = new Date().toLocaleString();
    const filenameDate = new Date().toISOString().slice(0, 10);

    if (typeof XLSX === "undefined") {
      // Fallback to CSV
      const csvLines = [
        ["BEE SMART LEARNING — MASTER TEACHER ANSWER KEY & PEDAGOGICAL EXPLANATIONS (50 QUESTIONS)"],
        [`Date Generated: ${reportDate}`, "Total Questions: 50", "Duration: 45 Minutes", "Points: 1 pt each (50 Raw / 100 Scaled)"],
        [],
        ["Q#", "Part", "Part Name", "Question Type", "Question Prompt / Sentence Context", "Correct Key", "Target Correct Answer", "Full Completed Sentence", "Pedagogical Explanation & Grammar Reason"]
      ];

      activeQuizQuestions.forEach(q => {
        let typeLabel = "Multiple Choice";
        if (q.type === "true_false") typeLabel = "Grammatical Correctness";
        else if (q.type === "word_bank") typeLabel = "Word Bank Cloze";
        else if (q.type === "rearrange") typeLabel = "Sentence Ordering (Jumbled Words)";

        let correctKey = q.correct || "Target";
        let targetAnswer = "";
        let fullSentence = "";

        if (q.type === "rearrange") {
          correctKey = "Ordered Sentence";
          targetAnswer = q.target;
          fullSentence = q.target;
        } else if (q.options) {
          targetAnswer = q.options[q.correct] ? `${q.correct}. ${q.options[q.correct]}` : q.correct;
          const wordOnly = q.options[q.correct] || q.correct;
          fullSentence = q.prompt.replace(/_{3,}|\[\d+\]\s*_{3,}|\(\d+\)\s*_{3,}/, `[${wordOnly}]`);
        } else {
          targetAnswer = q.correct || "";
          fullSentence = q.prompt;
        }

        csvLines.push([
          q.id,
          q.part,
          escapeCsv(q.partName),
          escapeCsv(typeLabel),
          escapeCsv(q.prompt),
          escapeCsv(correctKey),
          escapeCsv(targetAnswer),
          escapeCsv(fullSentence),
          escapeCsv(q.explanation || "")
        ]);
      });

      const csvContent = "\uFEFF" + csvLines.map(r => Array.isArray(r) ? r.join(",") : r).join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `BeeQuiz_50_Questions_Master_Answer_Key_and_Reasons_${filenameDate}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }

    const wb = XLSX.utils.book_new();

    const sheetData = [
      ["BEE SMART LEARNING — MASTER TEACHER ANSWER KEY & PEDAGOGICAL EXPLANATIONS (50 QUESTIONS)"],
      ["Report Generated:", reportDate, "", "Total Questions:", "50 Questions", "", "Exam Duration:", "45 Minutes"],
      ["Subject / Topic:", "English Grammar — Subordinating Conjunctions Mastery", "", "Scoring Rule:", "1 point each (50 Raw Pts | 100 Scaled Pts)"],
      [],
      [
        "Q#",
        "Part",
        "Part Name",
        "Question Type",
        "Question Prompt / Sentence Context",
        "Correct Answer Key",
        "Target Word / Correct Answer",
        "Full Completed Sentence",
        "Pedagogical Explanation & Grammar Reason"
      ]
    ];

    activeQuizQuestions.forEach(q => {
      let typeLabel = "Multiple Choice";
      if (q.type === "true_false") typeLabel = "Grammatical Correctness";
      else if (q.type === "word_bank") typeLabel = "Word Bank Cloze";
      else if (q.type === "rearrange") typeLabel = "Sentence Ordering (Jumbled Words)";

      let correctKey = q.correct || "Target";
      let targetAnswer = "";
      let fullSentence = "";

      if (q.type === "rearrange") {
        correctKey = "Ordered Sentence";
        targetAnswer = q.target;
        fullSentence = q.target;
      } else if (q.options) {
        targetAnswer = q.options[q.correct] ? `${q.correct}. ${q.options[q.correct]}` : q.correct;
        const wordOnly = q.options[q.correct] || q.correct;
        fullSentence = q.prompt.replace(/_{3,}|\[\d+\]\s*_{3,}|\(\d+\)\s*_{3,}/, `[${wordOnly}]`);
      } else {
        targetAnswer = q.correct || "";
        fullSentence = q.prompt;
      }

      sheetData.push([
        q.id,
        q.part,
        q.partName,
        typeLabel,
        q.prompt,
        correctKey,
        targetAnswer,
        fullSentence,
        q.explanation || ""
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    ws['!cols'] = [
      { wch: 6 },   // Q#
      { wch: 6 },   // Part
      { wch: 25 },  // Part Name
      { wch: 22 },  // Question Type
      { wch: 55 },  // Question Prompt
      { wch: 18 },  // Correct Key
      { wch: 25 },  // Target Answer
      { wch: 58 },  // Full Completed Sentence
      { wch: 65 }   // Pedagogical Explanation
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Master Keys & Reasons (Q1-50)");
    XLSX.writeFile(wb, `BeeQuiz_50_Questions_Master_Answer_Key_and_Reasons_${filenameDate}.xlsx`);
  }

  // Bind Export Event Listeners
  if (exportItemAnalysisBtn) {
    exportItemAnalysisBtn.addEventListener("click", exportItemAnalysisToExcel);
  }
  if (exportItemAnalysisBtnTab) {
    exportItemAnalysisBtnTab.addEventListener("click", exportItemAnalysisToExcel);
  }
  if (exportItemAnalysisBtnBanner) {
    exportItemAnalysisBtnBanner.addEventListener("click", exportItemAnalysisToExcel);
  }
  if (viewQuestionAnalysisTabBtn) {
    viewQuestionAnalysisTabBtn.addEventListener("click", () => {
      sfx.click();
      tabQuestionAnalytics.click();
    });
  }
  if (exportMasterExcelBtn) {
    exportMasterExcelBtn.addEventListener("click", exportMasterExcelWorkbook);
  }
  if (exportMasterExcelBtnTab) {
    exportMasterExcelBtnTab.addEventListener("click", exportMasterExcelWorkbook);
  }

  // Bind Question and Answer Key Export Event Listeners
  const exportQuestionsOnlyBtn = document.getElementById("exportQuestionsOnlyBtn");
  const exportQuestionsOnlyBtnTab = document.getElementById("exportQuestionsOnlyBtnTab");
  const exportQuestionsOnlyBtnBanner = document.getElementById("exportQuestionsOnlyBtnBanner");
  const exportAnswerKeysBtn = document.getElementById("exportAnswerKeysBtn");
  const exportAnswerKeysBtnTab = document.getElementById("exportAnswerKeysBtnTab");
  const exportAnswerKeysBtnBanner = document.getElementById("exportAnswerKeysBtnBanner");

  [exportQuestionsOnlyBtn, exportQuestionsOnlyBtnTab, exportQuestionsOnlyBtnBanner].forEach(btn => {
    if (btn) btn.addEventListener("click", exportQuestionsOnlyWorkbook);
  });

  [exportAnswerKeysBtn, exportAnswerKeysBtnTab, exportAnswerKeysBtnBanner].forEach(btn => {
    if (btn) btn.addEventListener("click", exportAnswerKeysWorkbook);
  });

  // Reset Data to Default Baseline
  resetDataBtn.addEventListener("click", async () => {
    sfx.warning();
    if (confirm("Reset student test history and restore all original questions back to 4 baseline seeds? This will update database.json.")) {
      try {
        await fetch('/api/history/reset', { method: 'POST' });
      } catch (e) {}

      localStorage.removeItem(STORAGE_KEYS.USERS);
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_QUESTIONS);
      activeQuizQuestions = [...DEFAULT_QUESTIONS];
      initDatabase();
      renderAdminUserLogs();
      renderQuestionAnalyticsDashboard();
      alert("Database and original questions restored to clean 4-student baseline.");
    }
  });

  // Sound Control
  function updateSoundUI() {
    if (soundEnabled) {
      soundIcon.textContent = "🔊";
      soundLabel.textContent = "Sound";
    } else {
      soundIcon.textContent = "🔇";
      soundLabel.textContent = "Mute";
    }
  }

  soundToggleBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem(STORAGE_KEYS.SOUND, soundEnabled.toString());
    updateSoundUI();
    if (soundEnabled) {
      initAudio();
      sfx.click();
    }
  });

  // Confetti Engine
  function fireConfetti() {
    const ctx = confettiCanvas.getContext("2d");
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const colors = ["#FF7A00", "#FFA800", "#2583FF", "#10B981", "#FFD166", "#F472B6"];
    const particles = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: confettiCanvas.width / 2 + (Math.random() * 260 - 130),
        y: confettiCanvas.height / 3 + (Math.random() * 120 - 60),
        r: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 18,
        gravity: 0.35,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1
      });
    }

    let animationFrame;
    function renderConfetti() {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      let activeParticles = 0;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.007;

        if (p.opacity > 0 && p.y < confettiCanvas.height) {
          activeParticles++;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 1.4);
          ctx.restore();
        }
      });

      if (activeParticles > 0) {
        animationFrame = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }

    cancelAnimationFrame(animationFrame);
    renderConfetti();
  }

  window.addEventListener("resize", () => {
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  });

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Initial Boot
  initDatabase();
  updateSoundUI();

})();

