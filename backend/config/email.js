import nodemailer from "nodemailer";

export function makeTransport() {
  // Using Gmail: ensure "App password" is created in Google Account > Security
  // and 2FA is enabled. Do NOT use the normal account password.
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    // tls: {
    //     rejectUnauthorized: false, // ✅ ignore self-signed certificates
    // },
  });
}
