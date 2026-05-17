/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_PROJECT_ID?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly VITE_SUPABASE_URL?: string;
  /** Optional contact-form POST endpoint. When unset, forms fall back to a mailto: draft. */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
  /** Recipient email used by the mailto fallback. Defaults to hello@morganblake.com. */
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
