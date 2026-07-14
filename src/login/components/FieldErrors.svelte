<script lang="ts">
  import type { FormFieldError } from "@keycloakify/svelte/login/lib/useUserProfileForm";
  import type { Attribute } from "keycloakify/login/KcContext";
  import type { KcClsx } from "keycloakify/login/lib/kcClsx";
  import * as Field from "$lib/components/ui/field/index.js";

  type FieldErrorProps = {
    attribute: Attribute;
    displayableErrors: FormFieldError[];
    fieldIndex?: number;
    kcClsx: KcClsx;
  };
  let {
    attribute,
    fieldIndex,
    kcClsx,
    displayableErrors = $bindable([]),
  }: FieldErrorProps = $props();
</script>

{#snippet fieldErrors()}
  {@const _displayableErrors = displayableErrors.filter(
    (error) => error.fieldIndex === fieldIndex,
  )}
  {#if _displayableErrors.length !== 0}
    <Field.Error
      id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`}
      aria-live="polite"
    >
      {#each _displayableErrors as displayableError, i (i)}
        {@const { errorMessage } = displayableError}
        {@render errorMessage()}
        {#if _displayableErrors.length - 1 !== i}<br />{/if}
      {/each}
    </Field.Error>
  {/if}
{/snippet}
{@render fieldErrors()}
