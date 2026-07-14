<script lang="ts">
  import type { KcClsx } from "keycloakify/login/lib/kcClsx";
  import type { I18n } from "../i18n";
  import type { Readable } from "svelte/store";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Label } from "$lib/components/ui/label";

  let {
    kcClsx,
    i18n,
  }: {
    kcClsx: KcClsx;
    i18n: Readable<I18n>;
  } = $props();

  const { msg } = $i18n;
</script>

<div id="kc-form-options" class="flex items-center gap-3">
  <Checkbox
    id="logout-sessions"
    name="logout-sessions"
    value="on"
    checked={true}
  />
  <Label for="logout-sessions">
    {@render msg("logoutOtherSessions")()}
  </Label>
</div>
