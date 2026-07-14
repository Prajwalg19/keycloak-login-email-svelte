<script lang="ts">
  import type { Snippet } from "svelte";
  interface Props {
    value: string;
    children: Snippet;
  }
  let { value, children }: Props = $props();
</script>

{@html `___FM_START___#list ${value}___FM_END___`}
{@render children()}
{@html `___FM_START___/#list___FM_END___`}
