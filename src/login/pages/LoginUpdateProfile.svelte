<script lang="ts">
  import type { UserProfileFormFieldsProps } from "@keycloakify/svelte/login/components/UserProfileFormFieldsProps";
  import type { PageProps } from "@keycloakify/svelte/login/pages/PageProps";
  import { getKcClsx } from "keycloakify/login/lib/kcClsx";
  import type { Component } from "svelte";
  import type { I18n } from "../i18n";
  import type { KcContext } from "../KcContext";
  import Template from "../Template.svelte";
  import { Button } from "$lib/components/ui/button";
  import type { Readable } from "svelte/store";

  type LoginUpdateProfileProps = {
    kcContext: Extract<KcContext, { pageId: "login-update-profile.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    Template: typeof Template;
    classes: Record<string, string>;
    UserProfileFormFields: Component<UserProfileFormFieldsProps<any, any>>;
    doMakeUserConfirmPassword: boolean;
  };

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    UserProfileFormFields,
    doMakeUserConfirmPassword,
  }: LoginUpdateProfileProps = $props();

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const { messagesPerField, url, isAppInitiatedAction } = $derived(kcContext);
  const { msg, msgStr } = $i18n;

  let isFormSubmittable = $state(false);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayRequiredFields={true}
  displayMessage={messagesPerField.exists("global")}
  headerNode={msg("loginProfileTitle")}
>
  {#snippet children()}
    <form
      id="kc-update-profile-form"
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

      <div id="kc-form-buttons" class="flex flex-col gap-2">
        <Button disabled={!isFormSubmittable} type="submit" class="w-full">
          {msgStr("doSubmit")}
        </Button>
        {#if isAppInitiatedAction}
          <Button
            variant="outline"
            type="submit"
            name="cancel-aia"
            value="true"
            class="w-full"
            formnovalidate
          >
            {@render msg("doCancel")()}
          </Button>
        {/if}
      </div>
    </form>
  {/snippet}
</Template>
