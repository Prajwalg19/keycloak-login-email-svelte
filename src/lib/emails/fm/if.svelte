<script lang="ts">
  import type { Snippet } from "svelte";
  interface Props {
    condition: string;
    children: Snippet;
  }
  let { condition, children }: Props = $props();
</script>

{@html `___FM_START___#if ${condition}___FM_END___`}
{@render children()}
{@html `___FM_START___/#if___FM_END___`}
