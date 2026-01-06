import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality } from '@google/genai';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY not found in environment variables!');
  process.exit(1);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Aura Affirm Server Running' });
});

// WebSocket connection for Gemini Live API
wss.on('connection', async (ws) => {
  console.log('Client connected to WebSocket');

  let geminiSession = null;

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message.toString());

      // Initialize session
      if (data.type === 'init') {
        console.log('Initializing Gemini session...');
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        geminiSession = await ai.live.connect({
          model: 'gemini-2.0-flash-exp',
          config: data.config,
          callbacks: {
            onopen: () => {
              console.log('Gemini session opened');
              ws.send(JSON.stringify({ type: 'session_ready' }));
            },
            onmessage: (msg) => {
              // Forward Gemini messages to client
              ws.send(JSON.stringify({ type: 'gemini_message', data: msg }));
            },
            onerror: (error) => {
              console.error('Gemini error:', error);
              ws.send(JSON.stringify({ type: 'error', message: error.message }));
            },
          }
        });
      }

      // Forward audio data to Gemini
      if (data.type === 'audio' && geminiSession) {
        geminiSession.sendRealtimeInput(data.payload);
      }

      // Forward client content to Gemini
      if (data.type === 'client_content' && geminiSession) {
        geminiSession.sendClientContent(data.payload);
      }

      // Forward tool response to Gemini
      if (data.type === 'tool_response' && geminiSession) {
        geminiSession.sendToolResponse(data.payload);
      }

    } catch (error) {
      console.error('WebSocket message error:', error);
      ws.send(JSON.stringify({ type: 'error', message: error.message }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    if (geminiSession) {
      // Clean up Gemini session if needed
      geminiSession = null;
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

server.listen(PORT, () => {
  console.log(`🌟 Aura Affirm Server running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  console.log(`   WebSocket: ws://localhost:${PORT}`);
});
