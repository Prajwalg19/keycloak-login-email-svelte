import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render } from "../render";
import ActionEmail from "../../lib/emails/action-email.svelte";

const { exp } = createVariablesHelper("password-reset.ftl");

export const getTemplate: GetTemplate = async (props) => {
  return render({
    template: ActionEmail,
    props: {
      locale: props.locale,
      realmName: exp("realmName"),
      title: "Password Reset Request",
      bodyHtml:
        '${kcSanitize(msg("passwordResetBodyHtml",link, linkExpiration, realmName, linkExpirationFormatter(linkExpiration)))?no_esc}',
      link: exp("link"),
      buttonText: "Reset Password",
    },
    options: {
      plainText: props.plainText,
    },
  });
};

export const getSubject: GetSubject = async () => {
  return "Reset your password";
};
