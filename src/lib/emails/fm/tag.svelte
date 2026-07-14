<script lang="ts">
  import type { Snippet } from "svelte";
  interface Props {
    name: string;
    attributes?: string;
    children?: Snippet;
  }
  let { name, attributes, children }: Props = $props();
</script>

{@html `___FM_START___#${name}${attributes ? ` ${attributes}` : ""}___FM_END___`}
{#if children}
  {@render children()}
  {@html `___FM_START___/#${name}___FM_END___`}
{/if}
