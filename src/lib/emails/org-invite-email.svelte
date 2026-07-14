<script lang="ts">
  import { Button, Heading, Section } from "@better-svelte-email/components";
  import Template from "./template.svelte";
  import { If, Then, Else } from "./fm";
  import { createVariablesHelper } from "keycloakify-emails/variables";

  interface Props {
    locale?: string;
    realmName?: string;
    link?: string;
  }

  let { locale = "en", realmName, link }: Props = $props();

  const { exp } = createVariablesHelper("org-invite.ftl");
</script>

<Template {realmName} {locale} preview="You're Invited to Join an Organization">
  <Heading class="m-0 mb-4 text-xl font-semibold tracking-tight text-zinc-900">
    You're Invited!
  </Heading>
  <Section class="m-0 mb-6 text-base leading-relaxed text-zinc-800">
    <If condition="firstName?? && lastName??">
      <Then>
        <p>
          You were invited to join the organization <strong
            >{@html exp("organization.name")}</strong
          >
          by {@html exp("firstName")}
          {@html exp("lastName")}.
        </p>
      </Then>
      <Else>
        <p>
          You were invited to join the organization <strong
            >{@html exp("organization.name")}</strong
          >.
        </p>
      </Else>
    </If>
    <p>Click on the button below to join the organization.</p>
    <p>
      This link will expire within {@html exp(
        "linkExpirationFormatter(linkExpiration)",
      )}.
    </p>
    <p>
      If you were not expecting this invitation, just ignore this message and
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
        Join Organization
      </Button>
    </Section>
  {/if}
</Template>
