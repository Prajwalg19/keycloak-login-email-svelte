# Keycloak Login & Email Svelte Starter

<p align="center">
    <i><b>Svelte + Vite Keycloakify Starter</b> with Shadcn UI & Better Svelte Email</i>
    <br/>
    <br/>
</p>

This repository is a comprehensive, production-ready starter for building custom **Keycloak Login** and **Email** themes using **Svelte 5**, **Vite**, **Shadcn UI**, and **Better Svelte Email**.

Say goodbye to PatternFly struggles, raw Freemarker email template syntax errors, and complex asset pipeline issues. Everything is pre-configured so you can focus on building stunning, brand-consistent authentication flows right out of the box.

## Features

- **Modern Login Theme**: Replaces Keycloak's default PatternFly styling with a sleek, responsive design powered by **Tailwind CSS** and **Shadcn Svelte UI components** (`src/lib/components/ui/`).
- **Complete Email Theming**: Build rich, responsive transactional emails using **Better Svelte Email** and **Svelte 5** (`src/lib/emails/`).
- **FreeMarker Preservation Engine**: Custom token preservation inside `src/email/render.ts` guarantees FreeMarker expressions (`<#if>`, `${user.firstName}`, etc.) stay intact without HTML entity escaping or unwanted casing changes.
- **Embedded Asset Pipeline**: Pre-configured Vite build hooks automatically sync local assets (logos, icons) into Keycloak's resource folder (`${url.resourcesUrl}` in production, `/assets` in JSX preview).
- **Vite & Storybook**: Fast hot-module replacement locally and isolated UI component testing with Storybook.

---

## Quick Start

```bash
git clone https://github.com/Prajwalg19/keycloak-login-email-svelte.git
cd keycloak-login-email-svelte
npm install
```

### Run Local Development Server

```bash
npm run dev
```

### Check Svelte & TypeScript Errors

```bash
npm run check
```

---

## Building the Theme (JAR)

To build the Keycloak theme `.jar` file that you can deploy to any Keycloak server (>= 22):

```bash
npm run build-keycloak-theme
```

The compiled `.jar` file will be generated inside `dist_keycloak/`. Just drop it into Keycloak's `providers/` directory and restart/build Keycloak.

---

## Project Structure

```
├── src/
│   ├── login/               # Keycloak Login Pages & Components
│   │   ├── pages/           # Ejected login pages (Login.svelte, Register.svelte, etc.)
│   │   ├── components/      # Shared authentication wrappers and forms
│   │   └── Template.svelte  # Global login page layout wrapper
│   ├── email/               # Keycloak Email Generation Pipeline
│   │   ├── render.ts        # Core email renderer & FreeMarker token preservation
│   │   ├── templates/       # TS bridge templates that compile Svelte to FTL
│   │   └── text/            # Plain-text FreeMarker email templates
│   └── lib/
│       ├── components/ui/   # Local Shadcn Svelte UI design system
│       └── emails/          # Rich Svelte transactional email components
└── vite.config.ts           # Pre-configured Vite + Keycloakify build hooks
```

---

## Email Theming Workflow

When creating or editing email templates:
1. Build your component inside `src/lib/emails/your-email.svelte` using `<Template>` and `<If condition="...">` FreeMarker helpers.
2. Ensure your component filename uses **kebab-case**.
3. Register the bridge inside `src/email/templates/yourEmail.ts`.
4. During `npm run build-keycloak-theme`, Keycloakify automatically compiles your Svelte components into valid Keycloak `.ftl` (FreeMarker) templates inside your theme package!

---

## Useful Keycloakify Commands

- **Eject a new Keycloak page:** `npx keycloakify eject-page`
- **Add a Storybook story:** `npx keycloakify add-story`

## License

MIT License. Free to use and customize for commercial and open-source projects.
