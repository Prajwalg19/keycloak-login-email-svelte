<script lang="ts">
  import Template from "../Template.svelte";
  import LogoutOtherSessions from "../components/LogoutOtherSessions.svelte";
  import { Button } from "$lib/components/ui/button";
  import { useScript } from "@keycloakify/svelte/login/pages/WebauthnRegister.useScript";
  import { getKcClsx } from "keycloakify/login/lib/kcClsx";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import type { Readable } from "svelte/store";

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: {
    kcContext: Extract<KcContext, { pageId: "webauthn-register.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    classes: Record<string, string>;
  } = $props();

  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

  const { url, isSetRetry, isAppInitiatedAction } = $derived(kcContext);
  const { msg, msgStr } = $i18n;

  const authButtonId = "authenticateWebAuthnButton";

  useScript({
    authButtonId,
    kcContext,
    i18n,
  });
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  headerNode={msg("webauthn-registration-title")}
>
  <div class="space-y-4">
    <form id="register" action={url.loginAction} method="post">
      <div class="space-y-4">
        <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
        <input type="hidden" id="attestationObject" name="attestationObject" />
        <input
          type="hidden"
          id="publicKeyCredentialId"
          name="publicKeyCredentialId"
        />
        <input
          type="hidden"
          id="authenticatorLabel"
          name="authenticatorLabel"
        />
        <input type="hidden" id="transports" name="transports" />
        <input type="hidden" id="error" name="error" />
        <LogoutOtherSessions {kcClsx} {i18n} />
      </div>
    </form>

    <div class="flex flex-col gap-2">
      <Button class="w-full" id={authButtonId} type="submit">
        {msgStr("doRegisterSecurityKey")}
      </Button>

      {#if !isSetRetry && isAppInitiatedAction}
        <form
          action={url.loginAction}
          id="kc-webauthn-settings-form"
          method="post"
        >
          <Button
            variant="outline"
            class="w-full"
            id="cancelWebAuthnAIA"
            name="cancel-aia"
            value="true"
            type="submit"
          >
            {msgStr("doCancel")}
          </Button>
        </form>
      {/if}
    </div>
  </div>
</Template>
