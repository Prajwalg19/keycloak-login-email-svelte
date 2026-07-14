<script lang="ts">
  import Template from "../Template.svelte";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import * as Field from "$lib/components/ui/field/index.js";
  import { kcSanitize } from "keycloakify/lib/kcSanitize";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import type { Readable } from "svelte/store";

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: {
    kcContext: Extract<KcContext, { pageId: "login-reset-password.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    Template: typeof Template;
    classes: Record<string, string>;
  } = $props();

  const { url, realm, auth, messagesPerField } = $derived(kcContext);
  const { msg, msgStr } = $i18n;
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayInfo={true}
  displayMessage={!messagesPerField.existsError("username")}
  headerNode={msg("emailForgotTitle")}
  displayWide={false}
>
  {#snippet infoNode()}
    {#if realm.duplicateEmailsAllowed}
      {@render msg("emailInstructionUsername")()}
    {:else}
      {@render msg("emailInstruction")()}
    {/if}
  {/snippet}

  {#snippet children()}
    <form
      id="kc-reset-password-form"
      action={url.loginAction}
      method="post"
      class="space-y-4"
    >
      <Field.Field>
        <Field.Label for="username">
          {#if !realm.loginWithEmailAllowed}
            {@render msg("username")()}
          {:else if !realm.registrationEmailAsUsername}
            {@render msg("usernameOrEmail")()}
          {:else}
            {@render msg("email")()}
          {/if}
        </Field.Label>
        <Input
          type="text"
          id="username"
          name="username"
          autofocus
          value={auth.attemptedUsername ?? ""}
          aria-invalid={messagesPerField.existsError("username")}
        />
        {#if messagesPerField.existsError("username")}
          <Field.Error
            id="input-error-username"
            class="text-sm text-destructive"
            aria-live="polite"
          >
            {@html kcSanitize(messagesPerField.get("username"))}
          </Field.Error>
        {/if}
      </Field.Field>

      <div id="kc-form-options" class="flex items-center justify-center">
        <Button variant="link" href={url.loginUrl} class="text-sm">
          {@render msg("backToLogin")()}
        </Button>
      </div>

      <div id="kc-form-buttons">
        <Button type="submit" class="w-full">
          {msgStr("doSubmit")}
        </Button>
      </div>
    </form>
  {/snippet}
</Template>
