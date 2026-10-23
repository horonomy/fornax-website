import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { LATEST_RELEASE } from './src/config.js'

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

/**
 * Stamps the advertised release into the static HTML (FORNX-461) so the
 * deployed version is readable without executing the SPA: the scheduled
 * drift check compares this against src/config.ts and GitHub releases.
 */
function releaseMetaPlugin(): Plugin {
  return {
    name: 'inject-release-meta',
    transformIndexHtml() {
      return [
        {
          tag: 'meta',
          attrs: { name: 'fornax-release', content: LATEST_RELEASE },
          injectTo: 'head' as const,
        },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), gtagHtmlPlugin(), releaseMetaPlugin()],
})
