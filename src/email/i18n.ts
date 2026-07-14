import type { GetMessages } from "keycloakify-emails";

export const getMessages: GetMessages = (props) => {
  if (props.locale === "en") {
    const messages: Record<string, string> = {
      "requiredAction.CONFIGURE_TOTP": "Configure OTP",
      "requiredAction.TERMS_AND_CONDITIONS": "Terms and Conditions",
      "requiredAction.UPDATE_PASSWORD": "Update Password",
      "requiredAction.UPDATE_PROFILE": "Update Profile",
      "requiredAction.VERIFY_EMAIL": "Verify Email",
      "requiredAction.CONFIGURE_RECOVERY_AUTHN_CODES":
        "Generate Recovery Codes",

      "linkExpirationFormatter.timePeriodUnit.seconds":
        "{0,choice,0#seconds|1#second|1<seconds}",
      "linkExpirationFormatter.timePeriodUnit.minutes":
        "{0,choice,0#minutes|1#minute|1<minutes}",
      "linkExpirationFormatter.timePeriodUnit.hours":
        "{0,choice,0#hours|1#hour|1<hours}",
      "linkExpirationFormatter.timePeriodUnit.days":
        "{0,choice,0#days|1#day|1<days}",
      emailTestSubject: "[KEYCLOAK] - SMTP test message from Keycloak Svelte",
      emailTestBodyHtml:
        "<p>This is a test message from Keycloak Svelte email theme</p>",
    };
    return messages;
  }
  return {} as Record<string, string>;
};
