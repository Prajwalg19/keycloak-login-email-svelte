import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render } from "../render";
import EmailTest from "../../lib/emails/email-test.svelte";

const { exp } = createVariablesHelper("email-test.ftl");

export const getTemplate: GetTemplate = async (props) => {
  return await render({
    template: EmailTest,
    props: {
      locale: props.locale,
      realmName: exp("realmName"),
      bodyHtml: '${kcSanitize(msg("emailTestBodyHtml",realmName))?no_esc}',
      homeUrl: "${url.homeUrl!'https://example.com'}",
    },
    options: {
      plainText: props.plainText,
    },
  });
};

export const getSubject: GetSubject = async () => {
  return "Test message from Acme";
};
