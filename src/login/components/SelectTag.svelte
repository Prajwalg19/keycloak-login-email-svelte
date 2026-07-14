<script lang="ts">
  import type { InputFieldByTypeProps } from "@keycloakify/svelte/login/components/InputFieldByTypeProps";
  import { inputLabel } from "@keycloakify/svelte/login/components/inputLabel";
  import { assert } from "keycloakify/tools/assert";
  import { cn } from "$lib/utils.js";
  import type { I18n } from "../i18n";

  const {
    attribute,
    dispatchFormAction,
    kcClsx,
    displayableErrors,
    i18n,
    valueOrValues,
  }: InputFieldByTypeProps<I18n> = $props();

  const isMultiple = attribute.annotations.inputType === "multiselect";
  const options = (() => {
    walk: {
      const { inputOptionsFromValidation } = attribute.annotations;

      if (inputOptionsFromValidation === undefined) {
        break walk;
      }

      assert(typeof inputOptionsFromValidation === "string");

      const validator = (
        attribute.validators as Record<string, { options?: string[] }>
      )[inputOptionsFromValidation];

      if (validator === undefined) {
        break walk;
      }

      if (validator.options === undefined) {
        break walk;
      }

      return validator.options;
    }

    return attribute.validators.options?.options ?? [];
  })();
</script>

<select
  id={attribute.name}
  name={attribute.name}
  class={cn(
    "h-8 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30",
    kcClsx("kcInputClass"),
  )}
  aria-invalid={displayableErrors.length !== 0}
  disabled={attribute.readOnly}
  multiple={isMultiple}
  size={attribute.annotations.inputTypeSize === undefined
    ? undefined
    : parseInt(`${attribute.annotations.inputTypeSize}`)}
  value={valueOrValues}
  onchange={(event) =>
    dispatchFormAction("formAction", {
      action: "update",
      name: attribute.name,
      valueOrValues: (() => {
        if (isMultiple) {
          return Array.from(event.currentTarget.selectedOptions).map(
            (option) => option.value,
          );
        }

        return event.currentTarget.value;
      })(),
    })}
  onblur={() =>
    dispatchFormAction("formAction", {
      action: "focus lost",
      name: attribute.name,
      fieldIndex: undefined,
    })}
>
  {#if !isMultiple}<option value=""></option>{/if}
  {#each options as option (option)}
    <option value={option}>
      {@render inputLabel($i18n, attribute, option)()}
    </option>
  {/each}
</select>
