import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render } from "../render";
import ActionEmail from "../../lib/emails/action-email.svelte";

const { exp } = createVariablesHelper("email-update-confirmation.ftl");

export const getTemplate: GetTemplate = async (props) => {
  return render({
    template: ActionEmail,
    props: {
      locale: props.locale,
      realmName: exp("realmName"),
      title: "Confirm Email Update",
      bodyHtml:
        '${kcSanitize(msg("emailUpdateConfirmationBodyHtml",link, newEmail, realmName, linkExpirationFormatter(linkExpiration)))?no_esc}',
      link: exp("link"),
      buttonText: "Confirm Email Address",
    },
    options: {
      plainText: props.plainText,
    },
  });
};

export const getSubject: GetSubject = async () => {
  return "Confirm your new email address";
};
