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
