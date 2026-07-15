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

  const { exp } = createVariablesHelper("password-reset.ftl");
</script>

<Template {realmName} {locale} preview="Password Reset Request">
  <Heading class="m-0 mb-4 text-xl font-semibold tracking-tight text-zinc-900">
    Password Reset Request
  </Heading>
  <Section class="m-0 mb-6 text-base leading-relaxed text-zinc-800">
    <p>
      Someone just requested to change your {realmName} account's
      credentials. If this was you, click on the button below to reset them.
    </p>
    <p>
      This link will expire within {@html exp("linkExpirationFormatter(linkExpiration)")}.
    </p>
    <p>
      If you don't want to reset your credentials, just ignore this message and
      nothing will be changed.
    </p>
  </Section>
  {#if link}
    <Section class="mt-6 mb-2 text-center" style="text-align: center;">
      <Button
        href={link}
        pX={24}
        pY={12}
        class="rounded-lg bg-zinc-900 text-sm font-medium text-white"
      >
        Reset Password
      </Button>
    </Section>
  {/if}
</Template>
