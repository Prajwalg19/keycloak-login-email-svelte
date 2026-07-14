<script lang="ts">
  import Template from "../Template.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import { cn } from "$lib/utils";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import type { Readable } from "svelte/store";

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: {
    kcContext: Extract<KcContext, { pageId: "select-authenticator.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    classes: Record<string, string>;
  } = $props();

  const { url, auth } = $derived(kcContext);
  const { msg, advancedMsg } = $i18n;
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={false}
  headerNode={msg("loginChooseAuthenticator")}
>
  <form
    id="kc-select-credential-form"
    action={url.loginAction}
    method="post"
    class="space-y-4"
  >
    <div class="grid gap-2">
      {#each auth.authenticationSelections as authenticationSelection (authenticationSelection.authExecId)}
        <Button
          variant="outline"
          class="flex h-auto flex-col items-start p-4 text-left"
          type="submit"
          name="authenticationExecution"
          value={authenticationSelection.authExecId}
        >
          <div class="flex w-full items-center justify-between">
            <div class="flex items-center gap-3">
              {#if authenticationSelection.iconCssClass}
                <i class={cn(authenticationSelection.iconCssClass, "text-xl")}
                ></i>
              {/if}
              <div>
                <div class="font-semibold">
                  {@render advancedMsg(authenticationSelection.displayName)()}
                </div>
                {#if authenticationSelection.helpText}
                  <div class="text-sm text-muted-foreground">
                    {@render advancedMsg(authenticationSelection.helpText)()}
                  </div>
                {/if}
              </div>
            </div>
            <i class="lucide-chevron-right h-4 w-4 text-muted-foreground"></i>
          </div>
        </Button>
      {/each}
    </div>
  </form>
</Template>
