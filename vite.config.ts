import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Injects the GA4 gtag.js snippet as static, parser-inserted <script> tags
 * in the built index.html -- not dynamically via document.createElement
 * (FORNX-329: a real-browser investigation found gtag.js never completed
 * tag registration when the script was inserted that way, while the exact
 * same Measurement ID worked immediately via docs.fornax.horonom.com's
 * static-HTML-injected script tags). No-op when the env var is unset, so
 * local dev/PR builds are unaffected.
 */
function gtagHtmlPlugin(): Plugin {
  return {
    name: 'inject-gtag-snippet',
    transformIndexHtml(html) {
      const id = process.env.VITE_GA_MEASUREMENT_ID
      if (!id) return html
      const tags = [
        {
          tag: 'script',
          attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${id}` },
          injectTo: 'head' as const,
        },
        {
          tag: 'script',
          children: `window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`,
          injectTo: 'head' as const,
        },
      ]
      return { html, tags }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), gtagHtmlPlugin()],
})
