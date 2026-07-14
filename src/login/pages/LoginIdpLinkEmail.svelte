<script lang="ts">
  import Template from "../Template.svelte";
  import { Button } from "$lib/components/ui/button";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import type { Readable } from "svelte/store";

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: {
    kcContext: Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    Template: typeof Template;
    classes: Record<string, string>;
  } = $props();

  const { url, realm, brokerContext, idpAlias } = $derived(kcContext);
  const { msg } = $i18n;
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={false}
  headerNode={msg("emailLinkIdpTitle", idpAlias)}
  displayWide={false}
>
  {#snippet children()}
    <div class="space-y-4 text-center text-sm text-muted-foreground">
      <p id="instruction1">
        {@render msg(
          "emailLinkIdp1",
          idpAlias,
          brokerContext.username,
          realm.displayName,
        )()}
      </p>

      <div class="flex flex-col gap-2 pt-2">
        <p id="instruction2">
          {@render msg("emailLinkIdp2")()}
          <Button
            variant="link"
            href={url.loginAction}
            class="h-auto p-0 underline"
          >
            {@render msg("doClickHere")()}
          </Button>
          {@render msg("emailLinkIdp3")()}
        </p>

        <p id="instruction3">
          {@render msg("emailLinkIdp4")()}
          <Button
            variant="link"
            href={url.loginAction}
            class="h-auto p-0 underline"
          >
            {@render msg("doClickHere")()}
          </Button>
          {@render msg("emailLinkIdp5")()}
        </p>
      </div>
    </div>
  {/snippet}
</Template>
