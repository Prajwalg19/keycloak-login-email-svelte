<script lang="ts">
  import Template from "../Template.svelte";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import type { Readable } from "svelte/store";

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: {
    kcContext: Extract<KcContext, { pageId: "login-verify-email.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    Template: typeof Template;
    classes: Record<string, string>;
  } = $props();

  const { msg } = $i18n;
  const { url, user } = $derived(kcContext);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayInfo={true}
  headerNode={msg("emailVerifyTitle")}
  displayWide={false}
>
  {#snippet infoNode()}
    <p class="instruction">
      {@render msg("emailVerifyInstruction2")()}
      <br />
      <a
        class="font-medium underline underline-offset-4"
        href={url.loginAction}
      >
        {@render msg("doClickHere")()}
      </a>
      &nbsp;
      {@render msg("emailVerifyInstruction3")()}
    </p>
  {/snippet}

  {#snippet children()}
    <p class="text-center text-sm text-muted-foreground">
      {@render msg("emailVerifyInstruction1", user?.email ?? "")()}
    </p>
  {/snippet}
</Template>
