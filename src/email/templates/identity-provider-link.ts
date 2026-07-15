import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render } from "../render";
import IdentityProviderLink from "../../lib/emails/identity-provider-link.svelte";

const { exp } = createVariablesHelper("identity-provider-link.ftl");

export const getTemplate: GetTemplate = async (props) => {
  return await render({
    template: IdentityProviderLink,
    props: {
      locale: props.locale,
      realmName: exp("realmName"),
      link: exp("link"),
      identityProviderDisplayName: exp("identityProviderDisplayName"),
      identityProviderUsername: exp("identityProviderContext.username"),
    },
    options: {
      plainText: props.plainText,
    },
  });
};

export const getSubject: GetSubject = async () => {
  return "Link your identity provider account";
};
