import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render } from "../render";
import ActionEmail from "../../lib/emails/action-email.svelte";

const { exp } = createVariablesHelper("email-verification.ftl");

export const getTemplate: GetTemplate = async (props) => {
  return await render({
    template: ActionEmail,
    props: {
      locale: props.locale,
      realmName: exp("realmName"),
      title: "Verify Your Email Address",
      bodyHtml:
        '${kcSanitize(msg("emailVerificationBodyHtml",link, linkExpiration, realmName, linkExpirationFormatter(linkExpiration)))?no_esc}',
      link: exp("link"),
      buttonText: "Verify Email Address",
    },
    options: {
      plainText: props.plainText,
    },
  });
};

export const getSubject: GetSubject = async () => {
  return "Verify your email address";
};
