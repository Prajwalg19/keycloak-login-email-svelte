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
    kcContext: Extract<KcContext, { pageId: "logout-confirm.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    Template: typeof Template;
    classes: Record<string, string>;
  } = $props();

  const { url, client, logoutConfirm } = $derived(kcContext);
  const { msg, msgStr } = $i18n;
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  headerNode={msg("logoutConfirmTitle")}
>
  {#snippet children()}
    <div id="kc-logout-confirm" class="space-y-4">
      <p class="text-center text-sm text-muted-foreground">
        {@render msg("logoutConfirmHeader")()}
      </p>

      <form action={url.logoutConfirmAction} method="POST" class="space-y-4">
        <input type="hidden" name="session_code" value={logoutConfirm.code} />

        <div id="kc-form-buttons">
          <Button
            type="submit"
            name="confirmLogout"
            id="kc-logout"
            class="w-full"
          >
            {msgStr("doLogout")}
          </Button>
        </div>
      </form>

      {#if !logoutConfirm.skipLink}
        <div id="kc-info-message" class="text-center">
          {#if client?.baseUrl && client.baseUrl !== ""}
            <Button variant="link" href={client.baseUrl} class="text-sm">
              {@render msg("backToApplication")()}
            </Button>
          {:else}
            <Button
              variant="link"
              onclick={() => window.history.back()}
              class="text-sm"
            >
              {@render msg("backToApplication")()}
            </Button>
          {/if}
        </div>
      {/if}
    </div>
  {/snippet}
</Template>
