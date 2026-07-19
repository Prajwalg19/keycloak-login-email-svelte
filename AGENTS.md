# Keycloakify Svelte Starter - Development Guide

## Theming Keycloak Pages

When adding or styling Keycloak pages, follow these conventions:

### 1. Component Implementation

- Use local UI components from `src/lib/components/ui/` (e.g., `Button`, `Input`, `Checkbox`, `Label`, `Field`) to maintain design consistency.
- Wrap page content in the local `Template` component (`src/login/Template.svelte`).
- Use `displayWide={true}` on the `Template` component for pages that benefit from a wider layout (e.g., `LoginUsername`).

### 2. Integration in `KcPage.svelte`

- Add new `pageId`s to the `switch` statement in `src/login/KcPage.svelte` to import the custom Svelte component.
- Add the `pageId` to the `doUseDefaultCss` exclusion list in `KcPage.svelte` to disable Keycloak's default Patternfly styles.

### 3. Shared Components

- Reuse and theme shared components in `src/login/components/` (e.g., `LogoutOtherSessions.svelte`, `UserProfileFormFields.svelte`) using the same local UI component library.

## Useful Commands

- **Eject a new page:** `npx keycloakify eject-page` (to get the base Svelte component for a Keycloak page).
- **Add a storybook page:** `npx keycloakify add-story` (to create a story for a specific page).

## Project Structure

- `src/login/pages/`: Individual Keycloak page components.
- `src/login/components/`: Shared components used across multiple Keycloak pages.
- `src/lib/components/ui/`: Core UI components based on shadcn/svelte patterns.
