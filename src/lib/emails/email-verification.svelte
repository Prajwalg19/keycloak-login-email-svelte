<script lang="ts">
  import { Button, Heading, Section } from "@better-svelte-email/components";
  import Template from "./template.svelte";
  import { createVariablesHelper } from "keycloakify-emails/variables";

  interface Props {
    locale?: string;
    realmName?: string;
    link?: string;
  }

  let { locale = "en", realmName, link }: Props = $props();

  const { exp } = createVariablesHelper("email-verification.ftl");
</script>

<Template {realmName} {locale} preview="Verify Your Email Address">
  <Heading class="m-0 mb-4 text-xl font-semibold tracking-tight text-zinc-900">
    Verify Your Email Address
  </Heading>
  <Section class="m-0 mb-6 text-base leading-relaxed text-zinc-800">
    <p>
      Someone has created a {@html exp("user.firstName")} account with this email address. If
      this was you, click the button below to verify your email address.
    </p>
    <p>
      This link will expire within {@html exp("linkExpirationFormatter(linkExpiration)")}.
    </p>
    <p>If you didn't create this account, just ignore this message.</p>
  </Section>
  {#if link}
    <Section class="mt-6 mb-2 text-center" style="text-align: center;">
      <Button
        href={link}
        pX={24}
        pY={12}
        class="rounded-lg bg-zinc-900 text-sm font-medium text-white"
      >
        Verify Email Address
      </Button>
    </Section>
  {/if}
</Template>
