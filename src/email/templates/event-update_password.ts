import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render } from "../render";
import NotificationEmail from "../../lib/emails/notification-email.svelte";

const { exp } = createVariablesHelper("event-update_password.ftl");

export const getTemplate: GetTemplate = async (props) => {
  return render({
    template: NotificationEmail,
    props: {
      locale: props.locale,
      realmName: exp("realmName"),
      title: "Password Updated",
      bodyHtml:
        '${kcSanitize(msg("eventUpdatePasswordBodyHtml",event.date,event.ipAddress))?no_esc}',
    },
    options: {
      plainText: props.plainText,
    },
  });
};

export const getSubject: GetSubject = async () => {
  return "Password updated on your account";
};
