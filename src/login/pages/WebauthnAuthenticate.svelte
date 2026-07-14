<script lang="ts">
  import Template from "../Template.svelte";
  import { Button } from "$lib/components/ui/button";
  import { useScript } from "@keycloakify/svelte/login/pages/WebauthnAuthenticate.useScript";
  import { type ClassKey, getKcClsx } from "keycloakify/login/lib/kcClsx";
  import { cn } from "$lib/utils";
  import type { CxArg } from "keycloakify/tools/clsx_withTransform";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import type { Readable } from "svelte/store";

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: {
    kcContext: Extract<KcContext, { pageId: "webauthn-authenticate.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    classes: Record<string, string>;
  } = $props();

  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

  const {
    url,
    realm,
    registrationDisabled,
    authenticators,
    shouldDisplayAuthenticators,
  } = $derived(kcContext);

  const { msg, msgStr, advancedMsg } = $i18n;

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
  displayWide={true}
  displayInfo={realm.registrationAllowed && !registrationDisabled}
  headerNode={msg("webauthn-login-title")}
>
  {#snippet infoNode()}
    <div id="kc-registration" class="space-y-2">
      <div class="text-sm text-muted-foreground">
        {@render msg("noAccount")()}
      </div>
      <Button variant="secondary" href={url.registrationUrl} class="w-full">
        {@render msg("doRegister")()}
      </Button>
    </div>
  {/snippet}

  <div id="kc-form-webauthn" class="space-y-4">
    <form id="webauth" action={url.loginAction} method="post">
      <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
      <input type="hidden" id="authenticatorData" name="authenticatorData" />
      <input type="hidden" id="signature" name="signature" />
      <input type="hidden" id="credentialId" name="credentialId" />
      <input type="hidden" id="userHandle" name="userHandle" />
      <input type="hidden" id="error" name="error" />
    </form>

    <div class="space-y-4">
      {#if authenticators}
        <form id="authn_select">
          {#each authenticators.authenticators as authenticator (authenticator.credentialId)}
            <input
              type="hidden"
              name="authn_use_chk"
              value={authenticator.credentialId}
            />
          {/each}
        </form>

        {#if shouldDisplayAuthenticators}
          <div class="grid gap-2">
            {#if authenticators.authenticators.length > 1}
              <p class="text-sm font-medium">
                {@render msg("webauthn-available-authenticators")()}
              </p>
            {/if}
            {#each authenticators.authenticators as authenticator, i (authenticator.credentialId)}
              <div
                id={`kc-webauthn-authenticator-item-${i}`}
                class="flex items-start gap-3 rounded-md border p-3"
              >
                <div class="mt-1 text-muted-foreground">
                  <i
                    class={cn(
                      (() => {
                        const klass = kcClsx(
                          authenticator.transports.iconClass as CxArg<ClassKey>,
                        );
                        if (klass === authenticator.transports.iconClass) {
                          return kcClsx("kcWebAuthnDefaultIcon");
                        }
                        return klass;
                      })(),
                      "text-xl",
                    )}
                  ></i>
                </div>
                <div class="flex-1 space-y-1">
                  <div
                    id={`kc-webauthn-authenticator-label-${i}`}
                    class="font-medium"
                  >
                    {@render advancedMsg(authenticator.label)()}
                  </div>
                  {#if authenticator.transports.displayNameProperties?.length}
                    <div
                      id={`kc-webauthn-authenticator-transport-${i}`}
                      class="text-xs text-muted-foreground"
                    >
                      {#each authenticator.transports.displayNameProperties as displayNameProperty, j (displayNameProperty)}
                        {@render advancedMsg(displayNameProperty)()}
                        {#if j !== authenticator.transports.displayNameProperties.length - 1}
                          <span>, </span>
                        {/if}
                      {/each}
                    </div>
                  {/if}
                  <div class="text-xs text-muted-foreground">
                    <span id={`kc-webauthn-authenticator-createdlabel-${i}`}>
                      {@render msg("webauthn-createdAt-label")()}
                    </span>
                    <span id={`kc-webauthn-authenticator-created-${i}`}
                      >{authenticator.createdAt}</span
                    >
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      {/if}

      <div id="kc-form-buttons">
        <Button id={authButtonId} class="w-full" type="button">
          {msgStr("webauthn-doAuthenticate")}
        </Button>
      </div>
    </div>
  </div>
</Template>
