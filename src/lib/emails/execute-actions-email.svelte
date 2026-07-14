<script lang="ts">
  import { Button, Heading, Section } from "@better-svelte-email/components";
  import Template from "./template.svelte";
  import { If, List, Items } from "./fm";
  import { createVariablesHelper } from "keycloakify-emails/variables";

  interface Props {
    locale?: string;
    realmName?: string;
    link?: string;
  }

  let { locale = "en", realmName, link }: Props = $props();

  const { exp } = createVariablesHelper("executeActions.ftl");
</script>

<Template {realmName} {locale} preview="Action Required on Your Account">
  <Heading class="m-0 mb-4 text-xl font-semibold tracking-tight text-zinc-900">
    Action Required on Your Account
  </Heading>
  <Section class="m-0 mb-6 text-base leading-relaxed text-zinc-800">
    <p>
      Your administrator has just requested that you update your {realmName} account
      by performing the following action(s):
    </p>
    <If condition="requiredActions??">
      <ul class="my-4 list-disc pl-6 text-left" style="text-align: left;">
        <List value="requiredActions">
          <Items as="reqActionItem">
            <li class="mb-1.5 text-left" style="text-align: left;">
              <If condition="reqActionItem == 'UPDATE_PASSWORD'"
                >Update Password</If
              >
              <If condition="reqActionItem == 'UPDATE_PROFILE'"
                >Update Profile</If
              >
              <If condition="reqActionItem == 'TERMS_AND_CONDITIONS'"
                >Terms and Conditions</If
              >
              <If condition="reqActionItem == 'CONFIGURE_TOTP'"
                >Configure OTP</If
              >
              <If condition="reqActionItem == 'VERIFY_EMAIL'">Verify Email</If>
              <If condition="reqActionItem == 'CONFIGURE_RECOVERY_AUTHN_CODES'"
                >Generate Recovery Codes</If
              >
            </li>
          </Items>
        </List>
      </ul>
    </If>
    <p>Click on the button below to start this process.</p>
    <p>
      This link will expire within {@html exp(
        "linkExpirationFormatter(linkExpiration)",
      )}.
    </p>
    <p>
      If you are unaware that your administrator has requested this, just ignore
      this message and nothing will be changed.
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
        Execute Account Actions
      </Button>
    </Section>
  {/if}
</Template>
