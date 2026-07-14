<script lang="ts">
  import Template from "../Template.svelte";
  import LogoutOtherSessions from "../components/LogoutOtherSessions.svelte";
  import { Button } from "$lib/components/ui/button";
  import type { UserProfileFormFieldsProps } from "@keycloakify/svelte/login/components/UserProfileFormFieldsProps";
  import type { PageProps } from "@keycloakify/svelte/login/pages/PageProps";
  import { getKcClsx } from "keycloakify/login/lib/kcClsx";
  import type { Component } from "svelte";
  import type { I18n } from "../i18n";
  import type { KcContext } from "../KcContext";
  import type { Readable } from "svelte/store";

  type UpdateEmailProps = PageProps<
    Extract<KcContext, { pageId: "update-email.ftl" }>,
    I18n
  > & {
    UserProfileFormFields: Component<UserProfileFormFieldsProps>;
    doMakeUserConfirmPassword: boolean;
  };

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    UserProfileFormFields,
    doMakeUserConfirmPassword,
  }: UpdateEmailProps = $props();

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const { msg, msgStr } = $i18n;

  let isFormSubmittable = $state(false);

  const { url, messagesPerField, isAppInitiatedAction } = $derived(kcContext);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={messagesPerField.exists("global")}
  displayRequiredFields={true}
  headerNode={msg("updateEmailTitle")}
>
  <form
    id="kc-update-email-form"
    action={url.loginAction}
    method="post"
    class="space-y-4"
  >
    <UserProfileFormFields
      {kcContext}
      {i18n}
      {kcClsx}
      onIsFormSubmittableValueChange={(value) => (isFormSubmittable = value)}
      {doMakeUserConfirmPassword}
    />

    <LogoutOtherSessions {kcClsx} {i18n} />

    <div id="kc-form-buttons" class="flex flex-col gap-2">
      <Button disabled={!isFormSubmittable} class="w-full" type="submit">
        {msgStr("doSubmit")}
      </Button>
      {#if isAppInitiatedAction}
        <Button
          variant="outline"
          class="w-full"
          type="submit"
          name="cancel-aia"
          value="true"
        >
          {@render msg("doCancel")()}
        </Button>
      {/if}
    </div>
  </form>
</Template>
