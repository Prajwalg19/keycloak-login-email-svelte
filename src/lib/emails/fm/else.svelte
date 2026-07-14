<script lang="ts">
  import type { Snippet } from "svelte";
  interface Props {
    children: Snippet;
  }
  let { children }: Props = $props();
</script>

{@html `___FM_START___#else___FM_END___`}
{@render children()}
