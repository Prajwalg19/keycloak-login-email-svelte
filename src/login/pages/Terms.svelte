<script lang="ts">
  import type { PageProps } from "@keycloakify/svelte/login/pages/PageProps";
  import { getKcClsx } from "keycloakify/login/lib/kcClsx";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import { Button } from "$lib/components/ui/button";

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n> = $props();

  const { kcClsx } = $derived(
    getKcClsx({
      doUseDefaultCss,
      classes,
    }),
  );

  const { msg, msgStr } = $derived($i18n);

  const { url } = $derived(kcContext);
</script>

<Template {kcContext} {i18n} {doUseDefaultCss} {classes} displayMessage={false}>
  {#snippet headerNode()}
    {@render msg("termsTitle")()}
  {/snippet}

  <div class="space-y-6">
    <div
      id="kc-terms-text"
      class="max-h-80 space-y-3 overflow-y-auto rounded-lg border border-border bg-muted/20 p-4 text-sm leading-relaxed text-foreground"
    >
      {@render msg("termsText")()}
    </div>
    <form
      class="flex flex-col gap-3 border-t border-border/50 pt-4 sm:flex-row"
      action={url.loginAction}
      method="POST"
    >
      <Button
        name="accept"
        id="kc-accept"
        type="submit"
        class="w-full flex-1 font-medium sm:w-auto"
      >
        {msgStr("doAccept")}
      </Button>
      <Button
        name="cancel"
        id="kc-decline"
        type="submit"
        variant="outline"
        class="w-full font-medium sm:w-auto"
      >
        {msgStr("doDecline")}
      </Button>
    </form>
  </div>
</Template>
