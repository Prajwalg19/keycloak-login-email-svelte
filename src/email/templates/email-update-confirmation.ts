import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render } from "../render";
import EmailUpdateConfirmation from "../../lib/emails/email-update-confirmation.svelte";

const { exp } = createVariablesHelper("email-update-confirmation.ftl");

export const getTemplate: GetTemplate = async (props) => {
  return await render({
    template: EmailUpdateConfirmation,
    props: {
      locale: props.locale,
      realmName: exp("realmName"),
      link: exp("link"),
      newEmail: exp("newEmail"),
    },
    options: {
      plainText: props.plainText,
    },
  });
};

export const getSubject: GetSubject = async () => {
  return "Confirm your new email address";
};
