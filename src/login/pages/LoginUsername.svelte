<script lang="ts">
  import Template from "../Template.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Label } from "$lib/components/ui/label";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Separator } from "$lib/components/ui/separator";
  import { cn } from "$lib/utils";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import { kcSanitize } from "keycloakify/lib/kcSanitize";
  import type { Readable } from "svelte/store";

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: {
    kcContext: Extract<KcContext, { pageId: "login-username.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    classes: Record<string, string>;
  } = $props();

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    registrationDisabled,
    messagesPerField,
  } = $derived(kcContext);

  const { msg, msgStr } = $i18n;

  let isLoginButtonDisabled = $state(false);

  function handleFormSubmit() {
    isLoginButtonDisabled = true;
    return true;
  }
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayWide={true}
  displayMessage={!messagesPerField.existsError("username")}
  headerNode={msg("doLogIn")}
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
                aria-invalid={messagesPerField.existsError("username")}
              />
              {#if messagesPerField.existsError("username")}
                <Field.Error
                  id="input-error"
                  class="text-sm text-destructive"
                  aria-live="polite"
                >
                  {@html kcSanitize(messagesPerField.getFirstError("username"))}
                </Field.Error>
              {/if}
            </Field.Field>
          {/if}

          <div id="kc-form-options">
            {#if realm.rememberMe && !usernameHidden}
              <div class="flex items-center gap-3">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={!!login.rememberMe}
                />
                <Label for="rememberMe">{@render msg("rememberMe")()}</Label>
              </div>
            {/if}
          </div>

          <div id="kc-form-buttons">
            <Button
              disabled={isLoginButtonDisabled}
              class="w-full"
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
</Template>
