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
    kcContext: Extract<KcContext, { pageId: "login-page-expired.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    Template: typeof Template;
    classes: Record<string, string>;
  } = $props();

  const { url } = $derived(kcContext);
  const { msg } = $i18n;
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  headerNode={msg("pageExpiredTitle")}
  displayWide={false}
>
  {#snippet children()}
    <div class="space-y-4 text-center text-sm text-muted-foreground">
      <p id="instruction1">
        {@render msg("pageExpiredMsg1")()}
        <Button
          variant="link"
          id="loginRestartLink"
          href={url.loginRestartFlowUrl}
          class="h-auto p-0 underline"
        >
          {@render msg("doClickHere")()}
        </Button>
        .<br />
        {@render msg("pageExpiredMsg2")()}
        <Button
          variant="link"
          id="loginContinueLink"
          href={url.loginAction}
          class="h-auto p-0 underline"
        >
          {@render msg("doClickHere")()}
        </Button>
        .
      </p>
    </div>
  {/snippet}
</Template>
