/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 web stream Measurement ID (FORNX-327). Not a secret. Unset = analytics no-ops. */
  readonly VITE_GA_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
