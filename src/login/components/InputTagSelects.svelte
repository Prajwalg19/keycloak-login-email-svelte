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
    i18n,
    valueOrValues,
    displayableErrors,
  }: InputFieldByTypeProps<I18n> = $props();

  const { classDiv, classInput, classLabel, inputType } = (() => {
    const { inputType } = attribute.annotations;

    assert(
      inputType === "select-radiobuttons" ||
        inputType === "multiselect-checkboxes",
    );

    switch (inputType) {
      case "select-radiobuttons":
        return {
          inputType: "radio",
          classDiv: cn(
            "flex items-center space-x-2 my-1.5",
            kcClsx("kcInputClassRadio"),
          ),
          classInput: cn(
            "peer h-4 w-4 shrink-0 rounded-full border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-primary",
            kcClsx("kcInputClassRadioInput"),
          ),
          classLabel: cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground",
            kcClsx("kcInputClassRadioLabel"),
          ),
        };
      case "multiselect-checkboxes":
        return {
          inputType: "checkbox",
          classDiv: cn(
            "flex items-center space-x-2 my-1.5",
            kcClsx("kcInputClassCheckbox"),
          ),
          classInput: cn(
            "peer h-4 w-4 shrink-0 rounded border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-primary",
            kcClsx("kcInputClassCheckboxInput"),
          ),
          classLabel: cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground",
            kcClsx("kcInputClassCheckboxLabel"),
          ),
        };
      default:
        return {
          inputType: "",
          classDiv: "",
          classInput: "",
          classLabel: "",
        };
    }
  })();

  const options = (() => {
    walk: {
      const { inputOptionsFromValidation } = attribute.annotations;

      if (inputOptionsFromValidation === undefined) {
        break walk;
      }

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

{#each options as option (option)}
  <div class={classDiv}>
    <input
      type={inputType}
      id={`${attribute.name}-${option}`}
      name={attribute.name}
      value={option}
      class={classInput}
      aria-invalid={displayableErrors.length !== 0}
      disabled={attribute.readOnly}
      checked={valueOrValues instanceof Array
        ? valueOrValues.includes(option)
        : valueOrValues === option}
      onchange={(event) =>
        dispatchFormAction("formAction", {
          action: "update",
          name: attribute.name,
          valueOrValues: (() => {
            const isChecked = event.currentTarget.checked;

            if (valueOrValues instanceof Array) {
              const newValues = [...valueOrValues];

              if (isChecked) {
                newValues.push(option);
              } else {
                newValues.splice(newValues.indexOf(option), 1);
              }

              return newValues;
            }

            return event.currentTarget.checked ? option : "";
          })(),
        })}
      onblur={() =>
        dispatchFormAction("formAction", {
          action: "focus lost",
          name: attribute.name,
          fieldIndex: undefined,
        })}
    />
    <label
      for={`${attribute.name}-${option}`}
      class={`${classLabel}${attribute.readOnly ? ` ${kcClsx("kcInputClassRadioCheckboxLabelDisabled")}` : ""}`}
    >
      {@render inputLabel($i18n, attribute, option)()}
    </label>
  </div>
{/each}
