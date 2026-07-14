<script lang="ts">
  import { Eye, EyeOff } from "@lucide/svelte";
  import Template from "../Template.svelte";
  import { Separator } from "$lib/components/ui/separator";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import { kcSanitize } from "keycloakify/lib/kcSanitize";
  import type { Readable } from "svelte/store";

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    Template: TemplateComponent,
    classes,
  }: {
    kcContext: Extract<KcContext, { pageId: "login.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    Template: typeof Template;
    classes: Record<string, string>;
  } = $props();

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
    messagesPerField,
  } = $derived(kcContext);

  const { msg, msgStr } = $i18n;

  let isLoginButtonDisabled = $state(false);
  let passwordInputRef = $state<HTMLInputElement | null>(null);
  let isPasswordRevealed = $state(false);

  function togglePasswordVisibility() {
    isPasswordRevealed = !isPasswordRevealed;
  }

  function handleFormSubmit() {
    isLoginButtonDisabled = true;
    return true;
  }
</script>

{#snippet passwordWrapper(passwordInputId: string)}
  <div class="relative">
    <Input
      id={passwordInputId}
      bind:ref={passwordInputRef}
      class="pr-10"
      name="password"
      type={isPasswordRevealed ? "text" : "password"}
      autocomplete="current-password"
      aria-invalid={messagesPerField.existsError("username", "password")}
    />
    <button
      type="button"
      onclick={togglePasswordVisibility}
      aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
      aria-controls={passwordInputId}
      class="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
    >
      {#if isPasswordRevealed}
        <Eye class="h-4 w-4" />
      {:else}
        <EyeOff class="h-4 w-4" />
      {/if}
    </button>
  </div>
{/snippet}

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={!messagesPerField.existsError("username", "password")}
  headerNode={msg("loginAccountTitle")}
  displayInfo={realm.password &&
    realm.registrationAllowed &&
    !registrationDisabled}
>
  {#snippet infoNode()}
    <div class="space-y-4">
      <Separator />
      <div id="kc-registration-container" class="text-center">
        <div id="kc-registration" class="space-y-2">
          <div class="text-sm text-muted-foreground">
            {@render msg("noAccount")()}
          </div>
          <Button variant="secondary" href={url.registrationUrl} class="w-full">
            {@render msg("doRegister")()}
          </Button>
        </div>
      </div>
    </div>
  {/snippet}

  {#snippet socialProvidersNode()}
    {#if realm.password && social?.providers !== undefined && social.providers.length !== 0}
      <div id="kc-social-providers" class="space-y-2">
        <div class="text-center text-sm text-muted-foreground">
          {@render msg("identity-provider-login-label")()}
        </div>
        <div
          class={cn(
            "grid gap-2",
            social.providers.length === 1 && "grid-cols-1",
            social.providers.length === 2 && "grid-cols-2",
            social.providers.length === 3 && "grid-cols-3",
            social.providers.length > 3 && "grid-cols-1",
          )}
        >
          {#each social.providers as p (p.alias)}
            <Button variant="outline" href={p.loginUrl}>
              {@html kcSanitize(p.displayName)}
            </Button>
          {/each}
        </div>
      </div>
    {/if}
  {/snippet}

  {#snippet children()}
    <div id="kc-form">
      <div id="kc-form-wrapper">
        {#if realm.password}
          <form
            id="kc-form-login"
            onsubmit={handleFormSubmit}
            action={url.loginAction}
            method="post"
            class="space-y-4"
          >
            {#if !usernameHidden}
              {@const label = !realm.loginWithEmailAllowed
                ? msg("username")
                : !realm.registrationEmailAsUsername
                  ? msg("usernameOrEmail")
                  : msg("email")}
              <Field.Field>
                <Field.Label for="username">
                  {@render label()}
                </Field.Label>
                <Input
                  id="username"
                  name="username"
                  value={login.username ?? ""}
                  type="text"
                  autofocus
                  autocomplete="username"
                  aria-invalid={messagesPerField.existsError(
                    "username",
                    "password",
                  )}
                />
                <Field.Description>Username.</Field.Description>
                {#if messagesPerField.existsError("username", "password")}
                  <Field.Error
                    id="input-error"
                    class="text-sm text-destructive"
                    aria-live="polite"
                  >
                    {@html kcSanitize(
                      messagesPerField.getFirstError("username", "password"),
                    )}
                  </Field.Error>
                {/if}
              </Field.Field>
            {/if}

            <Field.Field>
              <Field.Label for="password">
                {@render msg("password")()}
              </Field.Label>
              {@render passwordWrapper("password")}
              {#if usernameHidden && messagesPerField.existsError("username", "password")}
                <Field.Error id="input-error" aria-live="polite">
                  {@html kcSanitize(
                    messagesPerField.getFirstError("username", "password"),
                  )}
                </Field.Error>
              {/if}
            </Field.Field>
            <div
              class={cn(
                "flex items-center gap-4",
                realm.rememberMe &&
                  !usernameHidden &&
                  realm.resetPasswordAllowed
                  ? "justify-between"
                  : realm.resetPasswordAllowed
                    ? "justify-center"
                    : "justify-start",
              )}
            >
              {#if realm.rememberMe && !usernameHidden}
                <div id="kc-form-options">
                  <div class="flex items-center gap-3">
                    <Checkbox
                      id="rememberMe"
                      name="rememberMe"
                      checked={!!login.rememberMe}
                    />
                    <Label for="rememberMe">{@render msg("rememberMe")()}</Label
                    >
                  </div>
                </div>
              {/if}
              <div>
                {#if realm.resetPasswordAllowed}
                  <span>
                    <Button variant="ghost" href={url.loginResetCredentialsUrl}>
                      {@render msg("doForgotPassword")()}
                    </Button>
                  </span>
                {/if}
              </div>
            </div>

            <div id="kc-form-buttons">
              <input
                type="hidden"
                id="id-hidden-input"
                name="credentialId"
                value={auth.selectedCredential}
              />
              <Button
                disabled={isLoginButtonDisabled}
                class={cn("w-full")}
                name="login"
                id="kc-login"
                type="submit"
              >
                {msgStr("doLogIn")}
              </Button>
            </div>
          </form>
        {/if}
      </div>
    </div>
  {/snippet}
</Template>
