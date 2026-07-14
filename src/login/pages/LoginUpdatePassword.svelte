<script lang="ts">
  import Template from "../Template.svelte";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Eye, EyeOff } from "@lucide/svelte";
  import { kcSanitize } from "keycloakify/lib/kcSanitize";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import type { Readable } from "svelte/store";

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: {
    kcContext: Extract<KcContext, { pageId: "login-update-password.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    Template: typeof Template;
    classes: Record<string, string>;
  } = $props();

  const { url, messagesPerField, isAppInitiatedAction } = $derived(kcContext);
  const { msg, msgStr } = $i18n;

  let isNewPasswordRevealed = $state(false);
  let isConfirmPasswordRevealed = $state(false);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={!messagesPerField.existsError("password", "password-confirm")}
  headerNode={msg("updatePasswordTitle")}
>
  {#snippet children()}
    <form
      id="kc-passwd-update-form"
      action={url.loginAction}
      method="post"
      class="space-y-4"
    >
      <Field.Field>
        <Field.Label for="password-new">
          {@render msg("passwordNew")()}
        </Field.Label>
        <div class="relative">
          <Input
            id="password-new"
            name="password-new"
            type={isNewPasswordRevealed ? "text" : "password"}
            autofocus
            autocomplete="new-password"
            aria-invalid={messagesPerField.existsError(
              "password",
              "password-confirm",
            )}
            class="pr-10"
          />
          <button
            type="button"
            onclick={() => (isNewPasswordRevealed = !isNewPasswordRevealed)}
            aria-label={msgStr(
              isNewPasswordRevealed ? "hidePassword" : "showPassword",
            )}
            aria-controls="password-new"
            class="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {#if isNewPasswordRevealed}
              <Eye class="h-4 w-4" />
            {:else}
              <EyeOff class="h-4 w-4" />
            {/if}
          </button>
        </div>
        {#if messagesPerField.existsError("password")}
          <Field.Error class="text-sm text-destructive" aria-live="polite">
            {@html kcSanitize(messagesPerField.get("password"))}
          </Field.Error>
        {/if}
      </Field.Field>

      <Field.Field>
        <Field.Label for="password-confirm">
          {@render msg("passwordConfirm")()}
        </Field.Label>
        <div class="relative">
          <Input
            id="password-confirm"
            name="password-confirm"
            type={isConfirmPasswordRevealed ? "text" : "password"}
            autocomplete="new-password"
            aria-invalid={messagesPerField.existsError(
              "password",
              "password-confirm",
            )}
            class="pr-10"
          />
          <button
            type="button"
            onclick={() =>
              (isConfirmPasswordRevealed = !isConfirmPasswordRevealed)}
            aria-label={msgStr(
              isConfirmPasswordRevealed ? "hidePassword" : "showPassword",
            )}
            aria-controls="password-confirm"
            class="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {#if isConfirmPasswordRevealed}
              <Eye class="h-4 w-4" />
            {:else}
              <EyeOff class="h-4 w-4" />
            {/if}
          </button>
        </div>
        {#if messagesPerField.existsError("password-confirm")}
          <Field.Error class="text-sm text-destructive" aria-live="polite">
            {@html kcSanitize(messagesPerField.get("password-confirm"))}
          </Field.Error>
        {/if}
      </Field.Field>

      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <Checkbox
            id="logout-sessions"
            name="logout-sessions"
            value="on"
            checked={true}
          />
          <Label for="logout-sessions" class="text-sm leading-none font-medium">
            {@render msg("logoutOtherSessions")()}
          </Label>
        </div>

        <div id="kc-form-buttons" class="flex flex-col gap-2">
          <Button type="submit" class="w-full">
            {msgStr("doSubmit")}
          </Button>
          {#if isAppInitiatedAction}
            <Button
              variant="outline"
              type="submit"
              name="cancel-aia"
              value="true"
              class="w-full"
            >
              {@render msg("doCancel")()}
            </Button>
          {/if}
        </div>
      </div>
    </form>
  {/snippet}
</Template>
