const http = require('http');
const crypto = require('crypto');

const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET || 'self-sync-development-secret';
const users = new Map();
const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'SQL', 'Language agnostic'];

// Question bank with domain, difficulty, prompt, keywords
const questionSeeds = [
  ['Software Engineering', 'Beginner', 'Walk me through a project you are proud of and the role you played.', ['project', 'role', 'result']],
  ['Software Engineering', 'Beginner', 'How do you make code readable for the next engineer?', ['readable', 'naming', 'documentation']],
  ['Software Engineering', 'Beginner', 'Describe a bug you fixed and how you found its root cause.', ['bug', 'debug', 'root cause']],
  ['Software Engineering', 'Intermediate', 'Tell me about a time you improved the performance of a system.', ['performance', 'measure', 'improvement']],
  ['Software Engineering', 'Intermediate', 'How would you design an API for resource CRUD operations?', ['API', 'validation', 'status']],
  ['Software Engineering', 'Advanced', 'How would you design a resilient service for a sudden 10x traffic spike?', ['scale', 'resilience', 'cache']],
  ['Frontend Developer', 'Beginner', 'Describe your approach to building a responsive web page.', ['responsive', 'layout', 'mobile']],
  ['Frontend Developer', 'Intermediate', 'How do you optimize web application performance?', ['performance', 'bundle', 'render']],
  ['Frontend Developer', 'Advanced', 'Explain how you would architect a large-scale React application.', ['architecture', 'state', 'components']],
  ['Data Science & AI', 'Beginner', 'Explain a data or AI project to someone without a technical background.', ['project', 'explain', 'impact']],
  ['Data Science & AI', 'Intermediate', 'How would you evaluate whether a model is ready for production?', ['model', 'metric', 'production']],
  ['Data Science & AI', 'Advanced', 'How would you design an experimentation strategy when training data has hidden bias?', ['bias', 'experiment', 'fairness']],
  ['Full Stack Developer', 'Beginner', 'Explain the flow of a request from browser to server and back.', ['request', 'response', 'network']],
  ['Full Stack Developer', 'Intermediate', 'How would you implement authentication in a web application?', ['auth', 'jwt', 'security']],
  ['Full Stack Developer', 'Advanced', 'Design a scalable real-time chat application architecture.', ['real-time', 'scalable', 'websocket']],
  ['DevOps Engineer', 'Beginner', 'What is CI/CD and why is it important?', ['ci/cd', 'automation', 'deploy']],
  ['DevOps Engineer', 'Intermediate', 'How would you containerize a microservices application?', ['docker', 'container', 'orchestration']],
  ['DevOps Engineer', 'Advanced', 'Design a highly available cloud infrastructure on AWS.', ['aws', 'highly available', 'disaster recovery']],
  ['System Design', 'Beginner', 'Explain the difference between SQL and NoSQL databases.', ['sql', 'nosql', 'schema']],
  ['System Design', 'Intermediate', 'Design a URL shortening service like TinyURL.', ['design', 'scalable', 'shorten']],
  ['System Design', 'Advanced', 'Design a distributed caching system.', ['cache', 'distributed', 'consistency']],
];

// Build questions by language
const questionsByLanguage = Object.fromEntries(
  languages.map((language) => [
    language,
    questionSeeds.map((seed, index) => ({
      id: `${language.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
      domain: seed[0],
      difficulty: seed[1],
      prompt: seed[2],
      keywords: seed[3],
      language,
    })),
  ])
);

const usedQuestions = new Map();

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => (body += chunk));
    request.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (error) {
        reject(new Error('Request body must be valid JSON.'));
      }
    });
    request.on('error', reject);
  });
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}

function passwordsMatch(password, stored) {
  const candidate = Buffer.from(hashPassword(password, stored.salt).hash, 'hex');
  const expected = Buffer.from(stored.hash, 'hex');
  return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
}

function base64Url(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function createToken(user) {
  const header = base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64Url(
    JSON.stringify({
      sub: user.email,
      name: user.name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400,
    })
  );
  const signature = crypto.createHmac('sha256', jwtSecret).update(header + '.' + payload).digest('base64url');
  return header + '.' + payload + '.' + signature;
}

function authenticatedUser(request) {
  const authorization = request.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const signature = crypto.createHmac('sha256', jwtSecret).update(parts[0] + '.' + parts[1]).digest('base64url');
  if (signature !== parts[2]) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return users.get(payload.sub) || null;
  } catch (error) {
    return null;
  }
}

function chooseQuestion(user, domain, difficulty, language) {
  const pool = questionsByLanguage[language] || questionsByLanguage['Language agnostic'];
  const key = user.email + ':' + language;
  const used = usedQuestions.get(key) || new Set();
  let candidates = pool.filter(
    (item) => item.domain === domain && item.difficulty === difficulty && !used.has(item.id)
  );
  if (!candidates.length) candidates = pool.filter((item) => !used.has(item.id));
  if (!candidates.length) {
    used.clear();
    candidates = pool.filter((item) => item.domain === domain && item.difficulty === difficulty);
  }
  const question = candidates[Math.floor(Math.random() * candidates.length)];
  used.add(question.id);
  usedQuestions.set(key, used);
  return question;
}

function evaluateAnswer(input) {
  const answer = String(input.answer || '').trim();
  const words = answer.toLowerCase().split(/\s+/).filter(Boolean);
  const normalized = answer.toLowerCase();
  const keywords = Array.isArray(input.keywords) ? input.keywords : [];

  const covered = keywords.filter((keyword) => normalized.includes(String(keyword).toLowerCase()));
  const structureTerms = ['situation', 'task', 'action', 'result', 'because', 'therefore', 'first', 'then', 'finally'];
  const structureHits = structureTerms.filter((term) => normalized.includes(term));

  const wordScore = Math.min(30, Math.round(words.length * 0.75));
  const relevanceScore = keywords.length ? Math.round((covered.length / keywords.length) * 35) : 20;
  const structureScore = Math.min(20, structureHits.length * 5);
  const specificityScore = Math.min(
    15,
    (normalized.match(/\d+%?|\$\d+|ms|seconds|users|days|weeks/g) || []).length * 5
  );

  const score = Math.max(0, Math.min(100, wordScore + relevanceScore + structureScore + specificityScore));

  const strengths = [];
  if (covered.length) strengths.push('You addressed ' + covered.join(', ') + '.');
  if (structureHits.length >= 2) strengths.push('Your answer shows a clear sequence of thought.');
  if (specificityScore) strengths.push('Specific details make your example more credible.');

  const improvements = [];
  if (words.length < 45) improvements.push('Add more context and describe the steps you personally took.');
  if (covered.length < Math.max(1, Math.ceil(keywords.length / 2)))
    improvements.push('Connect your answer more directly to ' + keywords.slice(0, 2).join(' and ') + '.');
  if (structureHits.length < 2)
    improvements.push('Use a Situation, Action, Result structure to make the answer easier to follow.');
  if (!specificityScore) improvements.push('Include a measurable outcome, timeframe, or concrete example.');

  return {
    score,
    strengths: strengths.length
      ? strengths
      : ['You made a relevant start and gave the evaluator enough to work with.'],
    improvements: improvements.slice(0, 2),
    metrics: {
      words: words.length,
      coveredKeywords: covered.length,
      totalKeywords: keywords.length,
    },
    strengthsDetails: [
      { name: 'Relevance', score: Math.min(100, relevanceScore * 2.5 + 20) },
      { name: 'Structure', score: Math.min(100, structureScore * 4 + 20) },
      { name: 'Depth', score: Math.min(100, wordScore * 2.5 + 10) },
      { name: 'Specificity', score: Math.min(100, specificityScore * 5 + 25) },
    ],
  };
}

const server = http.createServer((request, response) => {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  // Parse URL
  const url = new URL(request.url, `http://${request.headers.host}`);
  const path = url.pathname;

  // GET requests (read-only data)
  if (request.method === 'GET') {
    // Dashboard stats
    if (path === '/api/dashboard') {
      const user = authenticatedUser(request);
      if (!user) {
        sendJson(response, 401, { error: 'A valid JWT is required.' });
        return;
      }
      sendJson(response, 200, {
        totalInterviews: user.interviewsCompleted || 0,
        averageScore: user.averageScore || 0,
        weakSkills: ['System Design', 'Algorithms', 'Data Structures'],
        recentActivity: [],
      });
      return;
    }

    // Profile
    if (path === '/api/profile') {
      const user = authenticatedUser(request);
      if (!user) {
        sendJson(response, 401, { error: 'A valid JWT is required.' });
        return;
      }
      sendJson(response, 200, {
        name: user.name,
        email: user.email,
        skills: user.skills || [],
        experience: user.experience || '',
        resumeUrl: user.resumeUrl || null,
      });
      return;
    }

    // History
    if (path === '/api/history') {
      const user = authenticatedUser(request);
      if (!user) {
        sendJson(response, 401, { error: 'A valid JWT is required.' });
        return;
      }
      sendJson(response, 200, user.interviewHistory || []);
      return;
    }

    // Practice question (GET - when in session)
    if (path === '/api/practice/question' || path === '/api/interview/question') {
      const user = authenticatedUser(request);
      if (!user) {
        sendJson(response, 401, { error: 'A valid JWT is required.' });
        return;
      }
      sendJson(response, 200, {
        question: 'Tell me about a challenging technical problem you solved recently.',
        questionId: 'q-' + Date.now(),
        keywords: ['challenge', 'technical', 'solved'],
        generatedBy: 'self-sync-api',
      });
      return;
    }

    // Interview result
    if (path.startsWith('/api/interview/result/')) {
      const user = authenticatedUser(request);
      if (!user) {
        sendJson(response, 401, { error: 'A valid JWT is required.' });
        return;
      }
      // Return mock result
      sendJson(response, 200, {
        sessionId: path.split('/').pop(),
        overallScore: 78,
        readiness: 'Almost Ready',
        skillScores: {
          'Technical Knowledge': 82,
          'Problem Solving': 75,
          'Communication': 80,
          'Experience': 72,
        },
        strengths: [
          'Good structural thinking in responses',
          'Clear communication style',
          'Relevant experience examples cited',
        ],
        improvements: [
          'Add more specific metrics to answers',
          'Deepen technical depth in responses',
        ],
      });
      return;
    }

    sendJson(response, 404, { error: 'Route not found' });
    return;
  }

  // POST requests
  if (request.method === 'POST') {
    readBody(request).then((input) => {
      // Auth routes
      if (path === '/api/auth/register') {
        const name = String(input.name || '').trim();
        const email = String(input.email || '').trim().toLowerCase();
        const password = String(input.password || '');
        if (!name || !email || password.length < 6) {
          sendJson(response, 400, {
            error: 'Name, email, and a password of at least 6 characters are required.',
          });
          return;
        }
        if (users.has(email)) {
          sendJson(response, 409, { error: 'An account already exists for this email.' });
          return;
        }
        const user = {
          name,
          email,
          password: hashPassword(password),
          createdAt: new Date().toISOString(),
          interviewsCompleted: 0,
          averageScore: 0,
          skills: [],
          experience: '',
          interviewHistory: [],
        };
        users.set(email, user);
        sendJson(response, 201, { token: createToken(user), user: { name, email } });
        return;
      }

      // Login
      if (path === '/api/auth/login') {
        const email = String(input.email || '').trim().toLowerCase();
        const user = users.get(email);
        if (!user || !passwordsMatch(String(input.password || ''), user.password)) {
          sendJson(response, 401, { error: 'Invalid email or password.' });
          return;
        }
        sendJson(response, 200, { token: createToken(user), user: { name: user.name, email: user.email } });
        return;
      }

      // Check authentication for other routes
      const user = authenticatedUser(request);
      if (!user) {
        sendJson(response, 401, { error: 'A valid JWT is required.' });
        return;
      }

      // Practice start
      if (path === '/api/practice/start') {
        const technologies = input.technologies || [];
        sendJson(response, 200, {
          sessionId: 'practice-' + Date.now(),
          technologies,
          totalQuestions: 5,
          message: 'Practice session started successfully.',
        });
        return;
      }

      // Practice answer
      if (path === '/api/practice/answer') {
        const evaluation = evaluateAnswer(input);
        sendJson(response, 200, {
          ...evaluation,
          evaluatedBy: 'self-sync-api',
        });
        return;
      }

      // Interview start
      if (path === '/api/interview/start') {
        const sessionId = 'int-' + Date.now();
        user.interviewsCompleted = (user.interviewsCompleted || 0) + 1;
        sendJson(response, 200, {
          sessionId,
          totalQuestions: 15,
          message: 'Interview session started successfully.',
        });
        return;
      }

      // Interview answer
      if (path === '/api/interview/answer') {
        const evaluation = evaluateAnswer(input);
        sendJson(response, 200, {
          ...evaluation,
          nextQuestion: 'How would you handle a situation where you disagree with a team member?',
          questionId: 'q-' + Date.now(),
          evaluatedBy: 'self-sync-api',
        });
        return;
      }

      // Interview end
      if (path === '/api/interview/end') {
        const interviewRecord = {
          date: new Date().toISOString(),
          role: input.jobRole || 'General',
          score: Math.floor(Math.random() * 25) + 70,
          duration: input.duration || '30 min',
          status: 'completed',
        };
        user.interviewHistory = user.interviewHistory || [];
        user.interviewHistory.unshift(interviewRecord);
        const scores = user.interviewHistory.map((i) => i.score).filter(Boolean);
        user.averageScore = scores.length
          ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
          : 0;
        sendJson(response, 200, {
          ...interviewRecord,
          message: 'Interview session ended. Results are ready.',
        });
        return;
      }

      // Profile update
      if (path === '/api/profile') {
        user.name = input.name || user.name;
        user.skills = input.skills || user.skills;
        user.experience = input.experience || user.experience;
        sendJson(response, 200, {
          name: user.name,
          email: user.email,
          skills: user.skills,
          experience: user.experience,
          message: 'Profile updated successfully.',
        });
        return;
      }

      sendJson(response, 404, { error: 'Route not found' });
    }).catch((error) => {
      sendJson(response, 400, { error: error.message });
    });
    return;
  }

  // PUT requests
  if (request.method === 'PUT') {
    readBody(request).then((input) => {
      if (path === '/api/profile') {
        const user = authenticatedUser(request);
        if (!user) {
          sendJson(response, 401, { error: 'A valid JWT is required.' });
          return;
        }
        user.name = input.name || user.name;
        user.skills = input.skills || user.skills;
        user.experience = input.experience || user.experience;
        sendJson(response, 200, {
          name: user.name,
          email: user.email,
          skills: user.skills,
          experience: user.experience,
          message: 'Profile updated successfully.',
        });
        return;
      }
      sendJson(response, 404, { error: 'Route not found' });
    }).catch((error) => {
      sendJson(response, 400, { error: error.message });
    });
    return;
  }

  sendJson(response, 404, { error: 'Method not allowed' });
});

server.listen(port, () => {
  console.log('Self Sync API server running on http://localhost:' + port);
  console.log('Endpoints:');
  console.log('  POST /api/auth/register  - Create account');
  console.log('  POST /api/auth/login     - Login');
  console.log('  GET  /api/dashboard      - Dashboard stats');
  console.log('  GET  /api/history        - Interview history');
  console.log('  GET  /api/profile        - Get profile');
  console.log('  PUT  /api/profile        - Update profile');
  console.log('  POST /api/practice/start  - Start practice');
  console.log('  POST /api/practice/answer - Submit practice answer');
  console.log('  POST /api/interview/start - Start interview');
  console.log('  POST /api/interview/answer- Submit answer');
  console.log('  POST /api/interview/end   - End interview');
  console.log('  GET  /api/interview/result/:id - Get result');
});

