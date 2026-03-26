# Physics AR (Upgraded MVP)

Kazakh physics learning PWA with labs, theory, tests, AI chat, and AR with fallback 3D viewer.

## New features
- 4 labs: Ohm's Law, Free Fall, Spring Oscillation, Lens/Optics
- Lab detail with formula + actions (Open AR, Start Test, Ask AI)
- Quiz/test flow with result page and correct answers
- AI chat with dynamic physics topic context
- AR.js marker mode + debug checks + Three.js fallback viewer

## Run locally
```bash
npm install
cp .env.example .env
npm run dev
```

## Build
```bash
npm run build
```

## Environment
```env
VITE_OPENAI_API_KEY=
```

If key is missing, app uses mock AI response.

## AR debug notes
App first tries AR.js (hiro marker). Common failure causes:
1. Non-HTTPS context (camera blocked)
2. Browser lacks `getUserMedia`
3. Camera permission denied
4. Marker not visible / bad lighting

If AR fails, app auto-switches to Three.js fallback viewer with touch drag rotation.

## Vercel
- Import GitHub repo in Vercel
- Framework: Vite
- Add `VITE_OPENAI_API_KEY` env var
- Deploy static build
