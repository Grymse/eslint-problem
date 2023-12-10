import { client } from "./client";
import user from "./user";

export default {
  sendEmail: client.sendEmail,
  templates: {
    user,
  },
};
