import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render } from "../render";
import PasswordReset from "../../lib/emails/password-reset.svelte";

const { exp } = createVariablesHelper("password-reset.ftl");

export const getTemplate: GetTemplate = async (props) => {
  return await render({
    template: PasswordReset,
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
  return "Reset your password";
};
