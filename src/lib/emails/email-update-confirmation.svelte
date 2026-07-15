<script lang="ts">
  import { Button, Heading, Section } from "@better-svelte-email/components";
  import Template from "./template.svelte";
  import { createVariablesHelper } from "keycloakify-emails/variables";

  interface Props {
    locale?: string;
    realmName?: string;
    link?: string;
    newEmail?: string;
  }

  let { locale = "en", realmName, link, newEmail }: Props = $props();

  const { exp } = createVariablesHelper("email-update-confirmation.ftl");
</script>

<Template {realmName} {locale} preview="Confirm Email Update">
  <Heading class="m-0 mb-4 text-xl font-semibold tracking-tight text-zinc-900">
    Confirm Email Update
  </Heading>
  <Section class="m-0 mb-6 text-base leading-relaxed text-zinc-800">
    <p>
      To update your {realmName} account with email address {@html newEmail ?? exp("newEmail")},
      click the button below.
    </p>
    <p>
      This link will expire within {@html exp("linkExpirationFormatter(linkExpiration)")}.
    </p>
    <p>
      If you don't want to proceed with this modification, just ignore this
      message.
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
        Confirm Email Address
      </Button>
    </Section>
  {/if}
</Template>
