<script lang="ts">
  import Template from "../Template.svelte";
  import { Button } from "$lib/components/ui/button";
  import { kcSanitize } from "keycloakify/lib/kcSanitize";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import type { Readable } from "svelte/store";
  import * as Empty from "$lib/components/ui/empty";
  import { CircleAlert } from "@lucide/svelte";

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: {
    kcContext: Extract<KcContext, { pageId: "error.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    Template: typeof Template;
    classes: Record<string, string>;
  } = $props();

  const { message, client, skipLink } = $derived(kcContext);
  const { msg } = $i18n;
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={false}
  displayWide={false}
>
  {#snippet headerNode()}{/snippet}
  <Empty.Root>
    <Empty.Header>
      <Empty.Media variant="icon">
        <CircleAlert class="size-8" />
      </Empty.Media>
      <Empty.Title>{@render msg("errorTitle")()}</Empty.Title>
      <Empty.Description>
        {@html kcSanitize(message.summary)}
      </Empty.Description>
    </Empty.Header>
    <Empty.Content>
      {#if !skipLink}
        {#if client?.baseUrl && client.baseUrl !== ""}
          <Button variant="outline" class="w-full" href={client.baseUrl}>
            {@render msg("backToApplication")()}
          </Button>
        {:else}
          <Button
            variant="outline"
            class="w-full"
            onclick={() => window.history.back()}
          >
            {@render msg("backToApplication")()}
          </Button>
        {/if}
      {/if}
    </Empty.Content>
  </Empty.Root>
</Template>
