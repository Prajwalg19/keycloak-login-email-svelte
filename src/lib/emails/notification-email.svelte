<script lang="ts">
  import { Heading, Section } from "@better-svelte-email/components";
  import Template from "./template.svelte";

  interface Props {
    locale?: string;
    realmName?: string;
    title: string;
    bodyHtml: string;
  }

  let { locale = "en", realmName, title, bodyHtml }: Props = $props();
</script>

<Template {realmName} {locale} preview={title}>
  <Heading class="m-0 mb-4 text-xl font-semibold tracking-tight text-zinc-900">
    {title}
  </Heading>
  <Section class="m-0 mb-6 text-base leading-relaxed text-zinc-800">
    {@html bodyHtml}
  </Section>
</Template>
