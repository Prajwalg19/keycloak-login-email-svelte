import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render } from "../render";
import ActionEmail from "../../lib/emails/action-email.svelte";

const { exp } = createVariablesHelper("identity-provider-link.ftl");

export const getTemplate: GetTemplate = async (props) => {
  return render({
    template: ActionEmail,
    props: {
      locale: props.locale,
      realmName: exp("realmName"),
      title: "Link Identity Provider",
      bodyHtml:
        '${kcSanitize(msg("identityProviderLinkBodyHtml", identityProviderDisplayName, realmName, identityProviderContext.username, link, linkExpiration, linkExpirationFormatter(linkExpiration)))?no_esc}',
      link: exp("link"),
      buttonText: "Link Account",
    },
    options: {
      plainText: props.plainText,
    },
  });
};

export const getSubject: GetSubject = async () => {
  return "Link your identity provider account";
};
