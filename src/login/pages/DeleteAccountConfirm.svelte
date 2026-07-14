<script lang="ts">
  import type { PageProps } from "@keycloakify/svelte/login/pages/PageProps";
  import { getKcClsx } from "keycloakify/login/lib/kcClsx";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import { Button } from "$lib/components/ui/button";
  import * as Alert from "$lib/components/ui/alert";

  const {
    kcContext,
    i18n,
    doUseDefaultCss,
    Template,
    classes,
  }: PageProps<
    Extract<KcContext, { pageId: "delete-account-confirm.ftl" }>,
    I18n
  > = $props();

  const { kcClsx } = $derived(
    getKcClsx({
      doUseDefaultCss,
      classes,
    }),
  );

  const { url, triggered_from_aia } = $derived(kcContext);

  const { msg, msgStr } = $derived($i18n);
</script>

<Template {kcContext} {i18n} {doUseDefaultCss} {classes}>
  {#snippet headerNode()}
    {@render msg("deleteAccountConfirm")()}
  {/snippet}

  <form action={url.loginAction} class="space-y-6" method="post">
    <Alert.Root
      variant="destructive"
      class="my-2 border-destructive/50 bg-destructive/10 text-destructive"
    >
      <Alert.Title class="flex items-center gap-2 font-semibold">
        {@render msg("irreversibleAction")()}
      </Alert.Title>
    </Alert.Root>
    <div class="space-y-3 text-sm text-foreground">
      <p class="font-medium">{@render msg("deletingImplies")()}</p>
      <ul class="list-inside list-disc space-y-1 pl-2 text-muted-foreground">
        <li>{@render msg("loggingOutImmediately")()}</li>
        <li>{@render msg("errasingData")()}</li>
      </ul>
      <p class="pt-2 font-medium text-destructive">
        {@render msg("finalDeletionConfirmation")()}
      </p>
    </div>
    <div class="flex flex-col gap-3 border-t border-border/50 pt-4 sm:flex-row">
      <Button
        type="submit"
        variant="destructive"
        class="w-full flex-1 font-medium sm:w-auto"
      >
        {msgStr("doConfirmDelete")}
      </Button>
      {#if triggered_from_aia}
        <Button
          type="submit"
          variant="outline"
          name="cancel-aia"
          value="true"
          class="w-full font-medium sm:w-auto"
        >
          {msgStr("doCancel")}
        </Button>
      {/if}
    </div>
  </form>
</Template>
