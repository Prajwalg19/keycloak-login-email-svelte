<script lang="ts">
  import Template from "./Template.svelte";
  import UserProfileFormFields from "./components/UserProfileFormFields.svelte";
  import type { KcContext } from "./KcContext";
  import type { ClassKey } from "keycloakify/login";
  import { useI18n } from "./i18n";
  import "../app.css";
  import type { Component } from "svelte";

  let { kcContext }: { kcContext: KcContext } = $props();

  const { i18n } = useI18n({ kcContext });

  const classes = {} satisfies { [key in ClassKey]?: string };
  const doMakeUserConfirmPassword = true;

  const page = async (): Promise<{ default?: Component<any> }> => {
    switch (kcContext.pageId) {
      case "login.ftl":
        return import("./pages/Login.svelte");
      case "register.ftl":
        return import("./pages/Register.svelte");
      case "login-verify-email.ftl":
        return import("./pages/LoginVerifyEmail.svelte");
      case "login-config-totp.ftl":
        return import("./pages/LoginConfigTotp.svelte");
      case "login-reset-password.ftl":
        return import("./pages/LoginResetPassword.svelte");
      case "login-update-password.ftl":
        return import("./pages/LoginUpdatePassword.svelte");
      case "login-update-profile.ftl":
        return import("./pages/LoginUpdateProfile.svelte");
      case "logout-confirm.ftl":
        return import("./pages/LogoutConfirm.svelte");
      case "error.ftl":
        return import("./pages/Error.svelte");
      case "login-idp-link-email.ftl":
        return import("./pages/LoginIdpLinkEmail.svelte");
      case "login-page-expired.ftl":
        return import("./pages/LoginPageExpired.svelte");
      case "login-username.ftl":
        return import("./pages/LoginUsername.svelte");
      case "login-otp.ftl":
        return import("./pages/LoginOtp.svelte");
      case "select-authenticator.ftl":
        return import("./pages/SelectAuthenticator.svelte");
      case "update-email.ftl":
        return import("./pages/UpdateEmail.svelte");
      case "webauthn-authenticate.ftl":
        return import("./pages/WebauthnAuthenticate.svelte");
      case "webauthn-error.ftl":
        return import("./pages/WebauthnError.svelte");
      case "webauthn-register.ftl":
        return import("./pages/WebauthnRegister.svelte");
      case "info.ftl":
        return import("./pages/Info.svelte");
      case "delete-account-confirm.ftl":
        return import("./pages/DeleteAccountConfirm.svelte");
      case "delete-credential.ftl":
        return import("./pages/DeleteCredential.svelte");
      case "terms.ftl":
        return import("./pages/Terms.svelte");
      default:
        return import("@keycloakify/svelte/login/DefaultPage.svelte");
    }
  };
</script>

{#await page() then { default: Page }}
  {#if kcContext.pageId === "login.ftl"}
    <Page {kcContext} {i18n} {classes} {Template} doUseDefaultCss={false} />
    <!--Dont use default csss which is patternfly styles-->
  {:else}
    {@const doUseDefaultCss = ![
      "register.ftl",
      "login-verify-email.ftl",
      "login-config-totp.ftl",
      "login-reset-password.ftl",
      "login-update-password.ftl",
      "login-update-profile.ftl",
      "logout-confirm.ftl",
      "error.ftl",
      "login-idp-link-email.ftl",
      "login-page-expired.ftl",
      "login-username.ftl",
      "login-otp.ftl",
      "select-authenticator.ftl",
      "update-email.ftl",
      "webauthn-authenticate.ftl",
      "webauthn-error.ftl",
      "webauthn-register.ftl",
      "info.ftl",
      "delete-account-confirm.ftl",
      "delete-credential.ftl",
      "terms.ftl",
    ].includes(kcContext.pageId)}
    <Page
      {kcContext}
      {i18n}
      {classes}
      {Template}
      {UserProfileFormFields}
      {doUseDefaultCss}
      {doMakeUserConfirmPassword}
    ></Page>
  {/if}
{/await}
