const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env

// === Reusable Email Sender ===
// -----------------------------
// A single-file utility to send OTP-based verification emails using nodemailer
// HTML structure and dynamic content are generated using a configurable template

const buildEmailTemplate = ({
  firstName,
  title,
  message,
  otp = null,
  buttonText = null,
  buttonLink = null,
  footerNote = null,
}) => {
  const year = new Date().getFullYear();
  const expiryMinutes = process.env.OTP_EXPIRES_IN_MINUTES || 10;
  const appName = process.env.FROM_NAME || "App Platform";

  const greeting = firstName ? `Hi ${firstName},` : "";

  const otpBlock = otp
    ? `
      <div style="text-align:center;margin:20px 0;">
        <span style="display:inline-block;background:#4CAF50;color:#fff;font-size:24px;padding:10px 24px;border-radius:6px;letter-spacing:4px;font-weight:bold;">
          ${otp}
        </span>
      </div>
      <p>This OTP is valid for <strong>${expiryMinutes} minutes</strong>.</p>
    `
    : "";

  const buttonBlock =
    buttonText && buttonLink
      ? `
      <div style="text-align:center;margin:30px 0;">
        <a href="${buttonLink}" style="background-color:#4CAF50;color:white;padding:12px 24px;text-decoration:none;border-radius:5px;font-weight:bold;">
          ${buttonText}
        </a>
      </div>
    `
      : "";

  const finalFooterNote =
    footerNote ||
    "If you didn’t initiate this request, you can safely ignore this email.";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
    <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr><td align="center" style="padding: 20px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;">
            <tr><td style="padding: 30px;">
              <h2 style="color:#333;">${title}</h2>
              <p>${greeting}</p>
              <p>${message}</p>
              ${otpBlock}
              ${buttonBlock}
              <p>${finalFooterNote}</p>
              <p style="margin-top: 30px;">Regards,<br><strong>${appName}</strong></p>
            </td></tr>
            <tr><td style="background:#f4f4f4;padding:20px;text-align:center;font-size:12px;color:#777;">
              &copy; ${year} ${appName}
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
};

const createTransport = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

const sendRegistrationOtpEmail = async ({ user, otp }) => {
  if (!user || !user.email || !otp) {
    throw new Error("Missing user or OTP");
  }

  const transporter = createTransport();

  const html = buildEmailTemplate({
    firstName: user.name?.split(" ")[0] || "there",
    title: "Verify Your Email",
    message:
      "To verify your email and create your account, please use the OTP (One-Time Password) below:",
    otp,
  });

  await transporter.sendMail({
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: user.email,
    subject: "Email Verification OTP",
    html,
  });
};

module.exports = {
  sendRegistrationOtpEmail,
};
