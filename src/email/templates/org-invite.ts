import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render } from "../render";
import OrgInviteEmail from "../../lib/emails/org-invite-email.svelte";

const { exp } = createVariablesHelper("org-invite.ftl");

export const getTemplate: GetTemplate = async (props) => {
  return render({
    template: OrgInviteEmail,
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
  return "Invitation to join {0}";
};
