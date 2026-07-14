<script lang="ts">
  import { kcSanitize } from "keycloakify/lib/kcSanitize";
  import type { KcClsx } from "keycloakify/login/lib/kcClsx";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";
  import type { Readable } from "svelte/store";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label";

  type TermsAcceptanceProps = {
    i18n: Readable<I18n>;
    kcClsx: KcClsx;
    messagesPerField: Pick<
      KcContext["messagesPerField"],
      "existsError" | "get"
    >;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
  };
  let {
    i18n,
    kcClsx,
    messagesPerField,
    areTermsAccepted,
    onAreTermsAcceptedValueChange,
  }: TermsAcceptanceProps = $props();

  const { msg } = $i18n;
</script>

<div class="form-group">
  <div class={kcClsx("kcInputWrapperClass")}>
    {@render msg("termsTitle")()}
    <div id="kc-registration-terms-text">{@render msg("termsText")()}</div>
  </div>
</div>
<div class="form-group">
  <div class="flex items-center gap-3">
    <Checkbox
      id="termsAccepted"
      name="termsAccepted"
      checked={areTermsAccepted}
      onCheckedChange={(e) => onAreTermsAcceptedValueChange(e)}
      aria-invalid={messagesPerField.existsError("termsAccepted")}
    />
    <Label for="termsAccepted" class={kcClsx("kcLabelClass")}>
      {@render msg("acceptTerms")()}
    </Label>
  </div>
  {#if messagesPerField.existsError("termsAccepted")}
    <div class={kcClsx("kcLabelWrapperClass")}>
      <span
        id="input-error-terms-accepted"
        class={kcClsx("kcInputErrorMessageClass")}
        aria-live="polite"
      >
        {@html kcSanitize(messagesPerField.get("termsAccepted"))}
      </span>
    </div>
  {/if}
</div>
