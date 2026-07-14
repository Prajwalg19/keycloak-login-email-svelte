<script lang="ts">
  import { Button, Heading, Section } from "@better-svelte-email/components";
  import Template from "./template.svelte";

  interface Props {
    locale?: string;
    realmName?: string;
    bodyHtml: string;
    homeUrl: string;
  }

  let { locale = "en", realmName, bodyHtml, homeUrl }: Props = $props();
</script>

<Template {realmName} {locale} preview="Test Email Notification">
  <Heading class="m-0 mb-4 text-xl font-semibold tracking-tight text-zinc-900">
    Test Email Notification
  </Heading>
  <Section class="m-0 mb-6 text-base leading-relaxed text-zinc-800">
    {@html bodyHtml}
  </Section>
  <Section class="mt-6 mb-2 text-center" style="text-align: center;">
    <Button
      href={homeUrl}
      pX={24}
      pY={12}
      class="rounded-lg bg-zinc-900 text-sm font-medium text-white"
    >
      Go to Application
    </Button>
  </Section>
</Template>
