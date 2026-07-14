<script lang="ts">
  import { Button, Heading, Section } from "@better-svelte-email/components";
  import Template from "./template.svelte";

  interface Props {
    locale?: string;
    realmName?: string;
    title: string;
    bodyHtml: string;
    link?: string;
    buttonText?: string;
  }

  let {
    locale = "en",
    realmName,
    title,
    bodyHtml,
    link,
    buttonText = "Verify Address",
  }: Props = $props();
</script>

<Template {realmName} {locale} preview={title}>
  <Heading class="m-0 mb-4 text-xl font-semibold tracking-tight text-zinc-900">
    {title}
  </Heading>
  <Section class="m-0 mb-6 text-base leading-relaxed text-zinc-800">
    {@html bodyHtml}
  </Section>
  {#if link}
    <Section class="mt-6 mb-2 text-center" style="text-align: center;">
      <Button
        href={link}
        pX={24}
        pY={12}
        class="rounded-lg bg-zinc-900 text-sm font-medium text-white"
      >
        {buttonText}
      </Button>
    </Section>
  {/if}
</Template>
