import { client } from "./client";
import { SUPPORT_EMAIL, SYSTEM_EMAIL } from "./general";

export function sendMagicLink(name: string, email: string, action_url: string) {
  return client.sendEmailWithTemplate({
    From: SYSTEM_EMAIL,
    To: email,
    TemplateAlias: "user-login",
    TemplateModel: {
      name,
      action_url,
      email,
      SUPPORT_EMAIL,
    },
  });
}

export default {
  sendMagicLink,
};
