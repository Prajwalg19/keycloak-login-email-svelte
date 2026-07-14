<script lang="ts">
  import type { UserProfileFormFieldsProps } from "@keycloakify/svelte/login/components/UserProfileFormFieldsProps";
  import type { PageProps } from "@keycloakify/svelte/login/pages/PageProps";
  import { useState } from "@keycloakify/svelte/tools/useState";
  import type { Component } from "svelte";
  import { getKcClsx } from "keycloakify/login/lib/kcClsx";
  import Template from "../Template.svelte";
  import TermsAcceptance from "../components/TermsAcceptance.svelte";
  import type { I18n } from "../i18n";
  import type { KcContext } from "../KcContext";
  import UserProfileFormFields from "../components/UserProfileFormFields.svelte";

  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";

  type RegisterProps = PageProps<
    Extract<KcContext, { pageId: "register.ftl" }>,
    I18n
  > & {
    UserProfileFormFields: Component<UserProfileFormFieldsProps>;
    doMakeUserConfirmPassword: boolean;
    Template: typeof Template;
  };

  const props: RegisterProps = $props();
  const {
    kcContext,
    i18n,
    UserProfileFormFields: UserProfileFormFieldsComp,
    doMakeUserConfirmPassword,
    doUseDefaultCss,
    classes,
  } = props;

  const {
    messageHeader,
    url,
    messagesPerField,
    recaptchaRequired,
    recaptchaVisible,
    recaptchaSiteKey,
    recaptchaAction,
    termsAcceptanceRequired,
  } = kcContext;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const { msg, msgStr, advancedMsg } = $i18n;

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);

  let htmlFormElement: HTMLFormElement | null = $state(null);

  $effect(() => {
    if (htmlFormElement === null) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)["onSubmitRecaptcha"] = () => {
      // @ts-expect-error; form not null
      htmlFormElement.requestSubmit();
    };

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any)["onSubmitRecaptcha"];
    };
  });
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={messagesPerField.exists("global")}
>
  {#snippet headerNode()}
    {#if messageHeader}
      {@render advancedMsg(messageHeader)()}
    {:else}
      {@render msg("registerTitle")()}
    {/if}
  {/snippet}

  <form
    id="kc-register-form"
    action={url.registrationAction}
    method="post"
    bind:this={htmlFormElement}
    class="space-y-6"
  >
    <!-- User profile fields -->
    <UserProfileFormFields
      {kcContext}
      {i18n}
      {kcClsx}
      onIsFormSubmittableValueChange={setIsFormSubmittable}
      {doMakeUserConfirmPassword}
    />

    <!-- Terms -->
    {#if termsAcceptanceRequired}
      <TermsAcceptance
        {i18n}
        {kcClsx}
        {messagesPerField}
        areTermsAccepted={$areTermsAccepted}
        onAreTermsAcceptedValueChange={setAreTermsAccepted}
      />
    {/if}

    <!-- Recaptcha (visible) -->
    {#if recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined)}
      <div class="flex justify-center">
        <div
          class="g-recaptcha"
          data-size="compact"
          data-sitekey={recaptchaSiteKey}
          data-action={recaptchaAction}
        ></div>
      </div>
    {/if}

    <!-- Submit -->
    {#if recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined}
      <Button
        type="submit"
        class="g-recaptcha w-full"
        data-sitekey={recaptchaSiteKey}
        data-callback="onSubmitRecaptcha"
        data-action={recaptchaAction}
      >
        {@render msg("doRegister")()}
      </Button>
    {:else}
      <Button
        type="submit"
        class="w-full"
        disabled={!$isFormSubmittable ||
          (termsAcceptanceRequired && !$areTermsAccepted)}
      >
        {msgStr("doRegister")}
      </Button>
    {/if}
  </form>
  <Button href={url.loginUrl}>{@render msg("backToLogin")()}</Button>
</Template>
