<script lang="ts">
  import Template from "../Template.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
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
    kcContext: Extract<KcContext, { pageId: "login-otp.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    classes: Record<string, string>;
  } = $props();

  const { otpLogin, url, messagesPerField } = $derived(kcContext);
  const { msg, msgStr, advancedMsg } = $derived($i18n);

  let isLoginButtonDisabled = $state(false);
  let selectedCredentialId = $state(otpLogin.selectedCredentialId ?? "");

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
  displayMessage={!messagesPerField.existsError("totp")}
  headerNode={msg("doLogIn")}
>
  <form
    id="kc-otp-login-form"
    onsubmit={handleFormSubmit}
    action={url.loginAction}
    method="post"
    class="space-y-4"
  >
    {#if otpLogin.userOtpCredentials.length > 1}
      <div class="space-y-2">
        <Label>{@render advancedMsg("loginOtpStep1")()}</Label>
        <RadioGroup.Root
          name="selectedCredentialId"
          bind:value={selectedCredentialId}
          class="grid gap-2"
        >
          {#each otpLogin.userOtpCredentials as otpCredential, index (otpCredential.id)}
            <div class="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroup.Item
                value={otpCredential.id}
                id={`kc-otp-credential-${index}`}
              />
              <Label
                for={`kc-otp-credential-${index}`}
                class="flex flex-1 cursor-pointer items-center gap-2"
              >
                <span class="font-medium">{otpCredential.userLabel}</span>
              </Label>
            </div>
          {/each}
        </RadioGroup.Root>
      </div>
    {/if}

    <Field.Field>
      <Field.Label for="otp">
        {@render msg("loginOtpOneTime")()}
      </Field.Label>
      <Input
        id="otp"
        name="otp"
        autocomplete="off"
        type="text"
        autofocus
        aria-invalid={messagesPerField.existsError("totp")}
      />
      {#if messagesPerField.existsError("totp")}
        <Field.Error id="input-error-otp-code">
          {@html kcSanitize(messagesPerField.get("totp"))}
        </Field.Error>
      {/if}
    </Field.Field>

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
</Template>
