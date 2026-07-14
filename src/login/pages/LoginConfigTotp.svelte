<script lang="ts">
  import Template from "../Template.svelte";
  import { kcSanitize } from "keycloakify/lib/kcSanitize";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import type { Readable } from "svelte/store";

  import { Button } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";

  let {
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: {
    kcContext: Extract<KcContext, { pageId: "login-config-totp.ftl" }>;
    i18n: Readable<I18n>;
    doUseDefaultCss: boolean;
    Template: typeof Template;
    classes: Record<string, string>;
  } = $props();

  const { url, isAppInitiatedAction, totp, mode, messagesPerField } =
    $derived(kcContext);
  const { msg, msgStr, advancedMsg } = $i18n;

  let logoutOtherSessions = $state(true);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={!messagesPerField.existsError("totp", "userLabel")}
  headerNode={msg("loginTotpTitle")}
  displayWide={true}
>
  {#snippet children()}
    <div class="space-y-5 text-sm">
      <!-- Step 1: Install app -->
      <div class="space-y-2">
        <p class="text-foreground">
          {@render msg("loginTotpStep1")()}
        </p>
        <div class="flex flex-wrap gap-1.5">
          {#each totp.supportedApplications as app (app)}
            <span
              class="inline-flex items-center rounded-md border bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground"
            >
              {@render advancedMsg(app)()}
            </span>
          {/each}
        </div>
      </div>

      <!-- Step 2: QR or manual -->
      {#if mode === "manual"}
        <div class="space-y-3">
          <p class="text-foreground">
            {@render msg("loginTotpManualStep2")()}
          </p>

          <div
            class="rounded-md bg-muted px-3 py-2.5 font-mono text-sm tracking-widest break-all text-foreground select-all"
          >
            {totp.totpSecretEncoded}
          </div>

          <dl
            class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted-foreground"
          >
            <div>
              <dt class="inline font-medium text-foreground">
                {@render msg("loginTotpType")()}:
              </dt>
              <dd class="inline capitalize">
                {@render msg(`loginTotp.${totp.policy.type}`)()}
              </dd>
            </div>
            <div>
              <dt class="inline font-medium text-foreground">
                {@render msg("loginTotpAlgorithm")()}:
              </dt>
              <dd class="inline font-mono">{totp.policy.getAlgorithmKey()}</dd>
            </div>
            <div>
              <dt class="inline font-medium text-foreground">
                {@render msg("loginTotpDigits")()}:
              </dt>
              <dd class="inline">{totp.policy.digits}</dd>
            </div>
            {#if totp.policy.type === "totp"}
              <div>
                <dt class="inline font-medium text-foreground">
                  {@render msg("loginTotpInterval")()}:
                </dt>
                <dd class="inline">{totp.policy.period}s</dd>
              </div>
            {:else}
              <div>
                <dt class="inline font-medium text-foreground">
                  {@render msg("loginTotpCounter")()}:
                </dt>
                <dd class="inline">{totp.policy.initialCounter}</dd>
              </div>
            {/if}
          </dl>

          <Button variant="link" href={totp.qrUrl} class="h-auto p-0 text-sm">
            {@render msg("loginTotpScanBarcode")()}
          </Button>
        </div>
      {:else}
        <div class="space-y-3">
          <p class="text-foreground">
            {@render msg("loginTotpStep2")()}
          </p>

          <!-- QR Code — centered -->
          <div class="flex justify-center">
            <div class="rounded-lg border bg-white p-2.5">
              <img
                id="kc-totp-secret-qr-code"
                src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                alt="TOTP QR Code"
                class="block h-36 w-36"
              />
            </div>
          </div>

          <div class="flex justify-center">
            <Button
              variant="link"
              href={totp.manualUrl}
              class="h-auto p-0 text-sm"
            >
              {@render msg("loginTotpUnableToScan")()}
            </Button>
          </div>
        </div>
      {/if}

      <!-- Step 3 instructions -->
      <div class="space-y-1">
        <p class="text-foreground">
          {@render msg("loginTotpStep3")()}
        </p>
        <p class="text-muted-foreground">
          {@render msg("loginTotpStep3DeviceName")()}
        </p>
      </div>

      <!-- Form -->
      <form
        action={url.loginAction}
        class="space-y-4"
        id="kc-totp-settings-form"
        method="post"
      >
        <!-- One-time code -->
        <div class="space-y-1.5">
          <Label for="totp">
            {@render msg("authenticatorCode")()}
            <span class="text-destructive">*</span>
          </Label>
          <Input
            type="text"
            id="totp"
            name="totp"
            autocomplete="off"
            inputmode="numeric"
            aria-invalid={messagesPerField.existsError("totp")}
            class={messagesPerField.existsError("totp")
              ? "border-destructive"
              : ""}
          />
          {#if messagesPerField.existsError("totp")}
            <p class="text-xs text-destructive">
              {@html kcSanitize(messagesPerField.get("totp"))}
            </p>
          {/if}
        </div>

        <!-- Device name -->
        <div class="space-y-1.5">
          <Label for="userLabel">
            {@render msg("loginTotpDeviceName")()}
            {#if totp.otpCredentials.length >= 1}
              <span class="text-destructive">*</span>
            {/if}
          </Label>
          <Input
            type="text"
            id="userLabel"
            name="userLabel"
            autocomplete="off"
            aria-invalid={messagesPerField.existsError("userLabel")}
            class={messagesPerField.existsError("userLabel")
              ? "border-destructive"
              : ""}
          />
          {#if messagesPerField.existsError("userLabel")}
            <p class="text-xs text-destructive">
              {@html kcSanitize(messagesPerField.get("userLabel"))}
            </p>
          {/if}
        </div>

        <!-- Hidden fields -->
        <input
          type="hidden"
          id="totpSecret"
          name="totpSecret"
          value={totp.totpSecret}
        />
        {#if mode}<input type="hidden" id="mode" value={mode} />{/if}

        <!-- Logout other sessions — shadcn Checkbox -->
        <div class="flex items-center gap-2">
          <Checkbox
            id="logout-sessions"
            name="logoutOtherSessions"
            value="on"
            bind:checked={logoutOtherSessions}
          />
          <Label for="logout-sessions" class="cursor-pointer font-normal">
            {@render msg("logoutOtherSessions")()}
          </Label>
        </div>

        <!-- Submit -->
        <div class="flex flex-col gap-2 pt-1">
          {#if isAppInitiatedAction}
            <Button type="submit" id="saveTOTPBtn" class="w-full">
              {msgStr("doSubmit")}
            </Button>
            <Button
              variant="outline"
              id="cancelTOTPBtn"
              name="cancel-aia"
              value="true"
              class="w-full"
            >
              {@render msg("doCancel")()}
            </Button>
          {:else}
            <Button type="submit" id="saveTOTPBtn" class="w-full">
              {msgStr("doSubmit")}
            </Button>
          {/if}
        </div>
      </form>
    </div>
  {/snippet}
</Template>
