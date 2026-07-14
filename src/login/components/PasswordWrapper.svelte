<script lang="ts">
  import { useReducer } from "@keycloakify/svelte/tools/useReducer";
  import type { KcClsx } from "keycloakify/login/lib/kcClsx";
  import { assert } from "keycloakify/tools/assert";
  import { onMount, type Snippet } from "svelte";
  import type { I18n } from "../i18n";
  import type { Readable } from "svelte/store";
  import { Eye, EyeOff } from "@lucide/svelte";

  const props: {
    kcClsx: KcClsx;
    i18n: Readable<I18n>;
    passwordInputId: string;
    children: Snippet;
  } = $props();
  const { kcClsx, i18n, passwordInputId, children } = props;

  const { msgStr } = $i18n;

  const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer<
    boolean,
    boolean
  >((isPasswordRevealed: boolean) => !isPasswordRevealed, false);
  onMount(() => {
    const unsubscribe = isPasswordRevealed.subscribe(($isPasswordRevealed) => {
      const passwordInputElement: HTMLInputElement = document.getElementById(
        passwordInputId,
      ) as HTMLInputElement;

      assert(passwordInputElement instanceof HTMLInputElement);
      passwordInputElement.type = $isPasswordRevealed ? "text" : "password";
    });
    return () => unsubscribe();
  });
</script>

<div class="relative">
  {@render children?.()}
  <button
    type="button"
    onclick={() => toggleIsPasswordRevealed($isPasswordRevealed)}
    aria-label={msgStr($isPasswordRevealed ? "hidePassword" : "showPassword")}
    aria-controls={passwordInputId}
    class="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
  >
    {#if $isPasswordRevealed}
      <Eye class="h-4 w-4" />
    {:else}
      <EyeOff class="h-4 w-4" />
    {/if}
  </button>
</div>
