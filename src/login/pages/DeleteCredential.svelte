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
  }: PageProps<
    Extract<KcContext, { pageId: "delete-credential.ftl" }>,
    I18n
  > = $props();

  const { msgStr, msg } = $derived($i18n);

  const { kcClsx } = $derived(
    getKcClsx({
      doUseDefaultCss,
      classes,
    }),
  );

  const { url, credentialLabel } = $derived(kcContext);
</script>

<Template {kcContext} {i18n} {doUseDefaultCss} {classes} displayMessage={false}>
  {#snippet headerNode()}
    {@render msg("deleteCredentialTitle", credentialLabel)()}
  {/snippet}

  <div class="space-y-6">
    <div id="kc-delete-text" class="text-sm leading-relaxed text-foreground">
      {@render msg("deleteCredentialMessage", credentialLabel)()}
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
        variant="destructive"
        class="w-full flex-1 font-medium sm:w-auto"
      >
        {msgStr("doConfirmDelete")}
      </Button>
      <Button
        name="cancel-aia"
        id="kc-decline"
        type="submit"
        variant="outline"
        class="w-full font-medium sm:w-auto"
      >
        {msgStr("doCancel")}
      </Button>
    </form>
  </div>
</Template>
