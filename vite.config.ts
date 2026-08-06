import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

/* `/api/*` is served by Vercel functions, which the plain Vite dev server does
 * not run. Left alone, a request for /api/quotes?symbols=6857.T falls through
 * to the static middleware, which resolves it to api/quotes.ts and asks esbuild
 * for a loader named after everything past the last dot — "T" — and throws a
 * full-screen error overlay over the app. Answering 501 here keeps dev quiet
 * and lets the callers take their normal offline fallback. */
function devApiStub(): Plugin {
  return {
    name: 'barek-dev-api-stub',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next()
        res.statusCode = 501
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'API routes only run on Vercel — use `vercel dev` to exercise them.' }))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), devApiStub()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
