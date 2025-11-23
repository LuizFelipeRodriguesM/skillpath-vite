import 'dotenv/config';
import http from 'http';
import url from 'url';
import { groqService } from './server-lib/services/groq.service.js';
import { userProfileSchema } from './server-lib/validators/learning-path.validator.js';

const PORT = process.env.PORT || 3001;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

// Parse JSON body helper
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  // Handle API routes
  if (pathname === '/api/generate-path' && req.method === 'POST') {
    try {
      // Parse request body
      const body = await parseJsonBody(req);

      // Validate input
      const validatedProfile = userProfileSchema.parse(body);

      // Generate learning path using GROQ
      const result = await groqService.generateLearningPath(validatedProfile);

      // Return success response
      res.writeHead(200, corsHeaders);
      res.end(JSON.stringify({
        success: true,
        data: result,
      }));
    } catch (error) {
      // Handle validation errors
      if (error.name === 'ZodError') {
        res.writeHead(400, corsHeaders);
        res.end(JSON.stringify({
          success: false,
          error: "Dados inválidos",
          details: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        }));
        return;
      }

      // Handle other errors (clean single-line log)
      console.error(
        "API /api/generate-path error:",
        error && error.message ? error.message : String(error)
      );
      res.writeHead(500, corsHeaders);
      res.end(JSON.stringify({
        success: false,
        error: error.message || "Erro interno do servidor",
      }));
    }
    return;
  }

  // Handle 404
  res.writeHead(404, corsHeaders);
  res.end(JSON.stringify({ error: 'Not found' }));
});

// Start server
server.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error && error.message ? error.message : String(error));
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});

export default server;
