import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render } from "../render";
import ExecuteActionsEmail from "../../lib/emails/execute-actions-email.svelte";

const { exp } = createVariablesHelper("executeActions.ftl");

export const getTemplate: GetTemplate = async (props) => {
  return await render({
    template: ExecuteActionsEmail,
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
  return "Action required on your account";
};
