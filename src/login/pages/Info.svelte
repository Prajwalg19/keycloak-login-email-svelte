<script lang="ts">
  import Template from "../Template.svelte";
  import { Button } from "$lib/components/ui/button";
  import type { PageProps } from "@keycloakify/svelte/login/pages/PageProps";
  import { kcSanitize } from "keycloakify/lib/kcSanitize";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";

  const {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n> = $props();

  const { advancedMsgStr, msg } = $derived($i18n);

  const {
    messageHeader,
    message,
    requiredActions,
    skipLink,
    pageRedirectUri,
    actionUri,
    client,
  } = $derived(kcContext);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={false}
  displayWide={true}
>
  {#snippet headerNode()}
    <span>{@html kcSanitize(messageHeader ?? message.summary)}</span>
  {/snippet}

  {#snippet children()}
    <div id="kc-info-message" class="space-y-6 text-center">
      <p class="instruction text-sm text-muted-foreground">
        {@html kcSanitize(
          (() => {
            let html = message.summary;

            if (requiredActions) {
              html += "<b>";

              html += requiredActions
                .map((requiredAction) =>
                  advancedMsgStr(`requiredAction.${requiredAction}`),
                )
                .join(", ");

              html += "</b>";
            }

            return html;
          })(),
        )}
      </p>
      {#if !skipLink}
        <div class="space-y-2">
          {#if pageRedirectUri}
            <Button variant="outline" href={pageRedirectUri} class="w-full">
              {@render msg("backToApplication")()}
            </Button>
          {:else if actionUri}
            <Button variant="default" href={actionUri} class="w-full">
              {@render msg("proceedWithAction")()}
            </Button>
          {:else if client?.baseUrl && client.baseUrl !== ""}
            <Button variant="outline" href={client.baseUrl} class="w-full">
              {@render msg("backToApplication")()}
            </Button>
          {:else}
            <Button
              variant="outline"
              onclick={() => window.history.back()}
              class="w-full"
            >
              {@render msg("backToApplication")()}
            </Button>
          {/if}
        </div>
      {/if}
    </div>
  {/snippet}
</Template>
