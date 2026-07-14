<script lang="ts">
  import Template from "../Template.svelte";
  import { Button } from "$lib/components/ui/button";
  import type { PageProps } from "@keycloakify/svelte/login/pages/PageProps";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import type { Readable } from "svelte/store";

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: {
    kcContext: Extract<KcContext, { pageId: "webauthn-error.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    classes: Record<string, string>;
  } = $props();

  const { url, isAppInitiatedAction } = $derived(kcContext);
  const { msg, msgStr } = $i18n;

  function handleTryAgain() {
    // @ts-expect-error: Trusted Keycloak's code
    document.getElementById("isSetRetry").value = "retry";
    // @ts-expect-error: Trusted Keycloak's code
    document.getElementById("executionValue").value = "${execution}";
    // @ts-expect-error: Trusted Keycloak's code
    document.getElementById("kc-error-credential-form").requestSubmit();
  }
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={true}
  headerNode={msg("webauthn-error-title")}
>
  <form
    id="kc-error-credential-form"
    action={url.loginAction}
    method="post"
    class="hidden"
  >
    <input type="hidden" id="executionValue" name="authenticationExecution" />
    <input type="hidden" id="isSetRetry" name="isSetRetry" />
  </form>

  <div class="flex flex-col gap-2">
    <Button class="w-full" id="kc-try-again" onclick={handleTryAgain}>
      {msgStr("doTryAgain")}
    </Button>

    {#if isAppInitiatedAction}
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
</Template>
