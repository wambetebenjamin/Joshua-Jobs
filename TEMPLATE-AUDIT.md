# Joshua Jobs template and delivery audit

## ZIP structure

- The archive inventory is printed in `ZIP-STRUCTURE.md` under the heading **ZIP STRUCTURE (read-only reference)**.
- All 149 archive entries are present under `jobentry-1.0.0/` with their original names. The original stylesheets were compared byte-for-byte against the ZIP.
- The source files are retained as reference material and are not used to replace or rename the Next.js routes.

## Checklist

| Area | Result |
| --- | --- |
| CSS custom properties | The original `css/style.css` and Bootstrap stylesheet are retained verbatim. Template brand variables are `--primary: #00B074`, `--secondary: #2B9BFF`, `--light: #EFFDF5`, and `--dark: #2B3940`. |
| `@font-face` | None are present in the supplied CSS or SCSS. The supplied Heebo and Inter type pairing is retained using the template's Google Fonts references and fallbacks. |
| Loading screen | Wordmark and percentage status, skip control, 3-second maximum, and reduced-motion handling. |
| Cookie banner | KDPA-oriented consent notice; preference stored in `localStorage` as `joshua-jobs-cookie-consent`. Optional Vercel analytics and speed insights load only after opt-in. |
| CAPTCHA | Server-side reCAPTCHA verification on business POST APIs, v3 score threshold 0.5, and optional v2 challenge fallback using `NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY`. |
| Legal pages | `/legal/privacy-policy` includes KDPA 2019 rights and processing; `/legal/terms` identifies user-generated listings, clarifies Joshua Jobs is not the employer, and includes plain-language scam warnings; `/legal/cookie-policy` documents consent. |
| Error pages | `/404`, `/500`, Next.js not-found and error boundaries include WhatsApp support. |
| APIs | `/api/auth/register`, `/api/jobs/create`, `/api/applications/submit`, and `/api/send-enquiry`; Zod validation, CAPTCHA checks, optional KV persistence, employer confirmation email, and optional Blob CV storage. |
| Environment variables | See `.env.example` for all requested names plus the optional reCAPTCHA v2 public site key. |
| Responsive behavior | Mobile-first layouts, navigation toggle, county/category filters with bottom sheet, 44px controls, 16px form inputs, horizontally scrollable dashboard tables with hint, safe-area spacing, and `userScalable: true`. |
| Motion | Lenis, restrained fade-up/stagger, filter-sheet transition, details/summary FAQ, CTA feedback, and soft WhatsApp pulse. Reduced-motion preferences are honored. |
| Visual restrictions | No gold/chrome, neon, purple-blue AI gradients, or AI-themed visual metaphors. Pexels workplace photography is credited in `image-credits.md`. |
| Text audit | No em dashes were found in rendered application source. |

## Runtime configuration notes

- Account sign-in uses optional Google OAuth through NextAuth. Add the OAuth credentials and `NEXTAUTH_SECRET` to enable account sessions.
- Set the KV REST URL and token to persist registrations, job listings, applications and enquiries. API routes return a configuration error rather than claiming to save data when storage is absent.
- Set reCAPTCHA v3/v2 keys, Blob token and SMTP values to enable their respective protected features.
