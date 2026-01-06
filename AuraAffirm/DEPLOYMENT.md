# Deployment Guide

## Overview

Aura Affirm consists of two parts that need to be deployed separately:
1. **Frontend** (React + Vite)
2. **Backend** (Node.js + Express)

## Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
```bash
brew install heroku/brew/heroku  # macOS
# or download from https://devcenter.heroku.com/articles/heroku-cli
```

2. **Login and create app**
```bash
cd server
heroku login
heroku create aura-affirm-api
```

3. **Set environment variables**
```bash
heroku config:set GEMINI_API_KEY=your_actual_api_key_here
```

4. **Deploy**
```bash
git init
git add .
git commit -m "Initial backend deployment"
heroku git:remote -a aura-affirm-api
git push heroku main
```

5. **Verify deployment**
```bash
heroku open /health
```

### Option 2: Railway

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login and deploy**
```bash
cd server
railway login
railway init
railway up
```

3. **Set environment variables**
```bash
railway variables set GEMINI_API_KEY=your_actual_api_key_here
```

### Option 3: Render

1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set root directory to `server`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variable: `GEMINI_API_KEY`

## Frontend Deployment

### Option 1: Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Set environment variables**
```bash
vercel env add VITE_API_URL
# Enter your backend URL: https://your-backend.herokuapp.com

vercel env add VITE_WS_URL
# Enter your backend WebSocket URL: wss://your-backend.herokuapp.com
```

4. **Deploy to production**
```bash
vercel --prod
```

### Option 2: Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build the app**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod --dir=dist
```

4. **Set environment variables** (in Netlify Dashboard)
   - Go to Site Settings → Environment Variables
   - Add:
     - `VITE_API_URL` = your backend URL
     - `VITE_WS_URL` = your backend WebSocket URL

### Option 3: GitHub Pages

Not recommended because GitHub Pages doesn't support environment variables at build time.

## Post-Deployment Checklist

- [ ] Backend health check working (`/health` endpoint)
- [ ] Frontend loads successfully
- [ ] API connection works (test a voice session)
- [ ] CORS is configured correctly
- [ ] HTTPS is enabled on both frontend and backend
- [ ] Environment variables are set correctly
- [ ] Service Worker registers (check browser console)
- [ ] PWA is installable
- [ ] Microphone permission works
- [ ] Voice selection works
- [ ] Sessions are saved to history
- [ ] Streak counter updates

## Troubleshooting

### CORS Issues
Add your frontend domain to the backend CORS configuration:
```javascript
// server/index.js
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true
}));
```

### WebSocket Connection Failed
Ensure your backend supports WebSockets and uses `wss://` protocol for HTTPS.

### API Key Not Working
- Verify the key is correctly set in backend environment variables
- Check it's not exposed in frontend code (security issue!)
- Ensure there are no extra spaces or newlines

### Service Worker Not Registering
- Service workers require HTTPS (except on localhost)
- Check browser console for errors
- Verify `sw.js` is accessible at root

## Monitoring

### Backend
- Use Heroku logs: `heroku logs --tail`
- Or Railway logs: `railway logs`
- Set up error monitoring with Sentry

### Frontend
- Use browser console for errors
- Set up analytics with your preferred provider
- Monitor PWA metrics in Lighthouse

## Scaling

### Backend
- Start with basic tier (1 dyno/service)
- Monitor response times and scale up if needed
- Consider adding Redis for session caching if traffic grows

### Frontend
- CDN is automatically handled by Vercel/Netlify
- Consider code splitting for larger bundles
- Monitor Core Web Vitals

## Cost Estimates

### Free Tier (Development)
- **Backend**: Heroku/Railway/Render free tier
- **Frontend**: Vercel/Netlify free tier
- **Total**: $0/month

### Production (Small Scale)
- **Backend**: ~$7-25/month (Heroku Hobby, Railway Pro, or Render Starter)
- **Frontend**: Free (within limits)
- **Gemini API**: Pay per use (~$0.001 per request)
- **Total**: ~$10-30/month + API costs

## Security Best Practices

1. **Never commit `.env` files**
2. **Use different API keys for dev/prod**
3. **Enable rate limiting on backend**
4. **Set up HTTPS on both services**
5. **Regularly update dependencies**
6. **Monitor API usage to prevent abuse**

## Next Steps After Deployment

1. Share the app URL with users
2. Monitor error rates
3. Collect user feedback
4. Set up analytics
5. Plan feature updates based on usage
