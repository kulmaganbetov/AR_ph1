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
# Physics AR (MVP)

Kazakh language PWA physics learning app with:
- Ohm's law lab page
- Marker-based AR demo (hiro marker via AR.js)
- AI chat helper (OpenAI API with mock fallback)

## Tech stack
- Vite + React
- React Router
- vite-plugin-pwa
- AR.js + A-Frame (CDN scripts)
- Fetch API

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. (Optional) add OpenAI key to `.env`:
   ```env
   VITE_OPENAI_API_KEY=your_key_here
   ```
4. Run dev server:
   ```bash
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
## Vercel deployment
1. Push project to GitHub repository.
2. In Vercel, click **New Project** and import the repo.
3. Framework preset: **Vite** (auto-detected).
4. In **Environment Variables**, add:
   - `VITE_OPENAI_API_KEY` = your OpenAI API key
5. Deploy.

No backend server is required. This app is static and Vercel-ready.

## Notes
- If `VITE_OPENAI_API_KEY` is not provided, AI chat returns a mock response.
- AR page requires camera permission and a visible Hiro marker.

- PWA icons use SVG files only (no binary PNG assets), so Git/PR tooling that blocks binary diffs will work normally.
