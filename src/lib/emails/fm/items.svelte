<script lang="ts">
  import type { Snippet } from "svelte";
  interface Props {
    as: string;
    children: Snippet;
  }
  let { as, children }: Props = $props();
</script>

{@html `___FM_START___#items as ${as}___FM_END___`}
{@render children()}
{@html `___FM_START___/#items___FM_END___`}
