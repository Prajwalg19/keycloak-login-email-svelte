import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render } from "../render";
import EmailVerification from "../../lib/emails/email-verification.svelte";

const { exp } = createVariablesHelper("email-verification.ftl");

export const getTemplate: GetTemplate = async (props) => {
  return await render({
    template: EmailVerification,
    props: {
      locale: props.locale,
      realmName: exp("realmName"),
      link: exp("link"),
    },
    options: {
      plainText: props.plainText,
    },
  });
};

export const getSubject: GetSubject = async () => {
  return "Verify your email address";
};
