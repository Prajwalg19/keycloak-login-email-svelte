import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render } from "../render";
import NotificationEmail from "../../lib/emails/notification-email.svelte";

const { exp } = createVariablesHelper(
  "event-user_disabled_by_temporary_lockout.ftl",
);

export const getTemplate: GetTemplate = async (props) => {
  return render({
    template: NotificationEmail,
    props: {
      locale: props.locale,
      realmName: exp("realmName"),
      title: "Account Temporarily Locked",
      bodyHtml:
        '${kcSanitize(msg("eventUserDisabledByTemporaryLockoutBodyHtml",event.date,event.ipAddress))?no_esc}',
    },
    options: {
      plainText: props.plainText,
    },
  });
};

export const getSubject: GetSubject = async () => {
  return "Account temporarily locked";
};
