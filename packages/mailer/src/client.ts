/* global process */
import postmark from "postmark";

if (
  process.env.POSTMARK_API_KEY == "" ||
  process.env.POSTMARK_API_KEY == null ||
  process.env.POSTMARK_API_KEY == undefined
) {
  throw new Error("POSTMARK_API_KEY is not set");
}

export const client = new postmark.ServerClient(
  process.env.POSTMARK_API_KEY || ""
);
