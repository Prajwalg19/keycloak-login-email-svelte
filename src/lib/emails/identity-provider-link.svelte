<script lang="ts">
  import { Button, Heading, Section } from "@better-svelte-email/components";
  import Template from "./template.svelte";
  import { createVariablesHelper } from "keycloakify-emails/variables";

  interface Props {
    locale?: string;
    realmName?: string;
    link?: string;
    identityProviderDisplayName?: string;
    identityProviderUsername?: string;
  }

  let {
    locale = "en",
    realmName,
    link,
    identityProviderDisplayName,
    identityProviderUsername,
  }: Props = $props();

  const { exp } = createVariablesHelper("identity-provider-link.ftl");
</script>

<Template {realmName} {locale} preview="Link Identity Provider">
  <Heading class="m-0 mb-4 text-xl font-semibold tracking-tight text-zinc-900">
    Link Identity Provider
  </Heading>
  <Section class="m-0 mb-6 text-base leading-relaxed text-zinc-800">
    <p>
      Someone wants to link your <b>{realmName}</b> account with
      <b>{@html identityProviderDisplayName ?? exp("identityProviderDisplayName")}</b> account of user
      {@html identityProviderUsername ?? exp("identityProviderContext.username")}. If this was you, click the button below
      to link accounts.
    </p>
    <p>
      This link will expire within {@html exp("linkExpirationFormatter(linkExpiration)")}.
    </p>
    <p>
      If you didn't initiate this process or don't want to link accounts, just
      ignore this message. If you link accounts, you will be able to log in to
      {realmName} through {@html identityProviderDisplayName ?? exp("identityProviderDisplayName")}.
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
        Link Account
      </Button>
    </Section>
  {/if}
</Template>
