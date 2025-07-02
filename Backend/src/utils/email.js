// Core
const nodemailer = require("nodemailer");

// Utilities
const logger = require("./logger");

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
      <p style="text-align:center;">This OTP is valid for <strong>${expiryMinutes} minutes</strong>.</p>
    `
    : "";

  const buttonBlock =
    buttonText && buttonLink
      ? `
      <div style="text-align:center;margin:30px 0;">
        <a href="${buttonLink}" style="background-color:#4CAF50;color:white;padding:12px 24px;text-decoration:none;border-radius:5px;font-weight:bold;display:inline-block;">
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
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style>
      @media only screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
          padding: 20px !important;
        }
        .email-content {
          padding: 20px !important;
        }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
    <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
      <tr>
        <td align="center">
          <table class="email-container" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:8px;margin:20px auto;">
            <tr>
              <td class="email-content" style="padding:30px;">
                <h2 style="color:#333;font-size:24px;margin-bottom:10px;">${title}</h2>
                <p style="margin:0 0 10px;">${greeting}</p>
                <p style="margin:0 0 20px;">${message}</p>
                ${otpBlock}
                ${buttonBlock}
                <p style="color:#555;font-size:14px;">${finalFooterNote}</p>
                <p style="margin-top:30px;font-size:14px;">Regards,<br><strong>${appName}</strong></p>
              </td>
            </tr>
            <tr>
              <td style="background:#f4f4f4;padding:20px;text-align:center;font-size:12px;color:#777;border-top:1px solid #ddd;">
                &copy; ${year} ${appName}
              </td>
            </tr>
          </table>
        </td>
      </tr>
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
    firstName: user?.firstName || "there",
    title: "Verify Your Email",
    message:
      "To verify your email and create your account, please use the OTP (One-Time Password) below:",
    otp,
  });

  try {
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: user.email,
      subject: "Email Verification OTP",
      html,
    });

    return { isEmailSent: true };
  } catch (err) {
    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
      console.error("Email sending failed:", err.stack || err);
    } else {
      logger.error("Email sending failed", {
        message: err.message,
        code: err.code,
        name: err.name,
        timestamp: new Date().toISOString(),
      });
    }

    return {
      isEmailSent: false,
      message: isDev
        ? err.message || "Failed to send email"
        : "Failed to send email. Please try again later.",
    };
  }
};

const sendPasswordResetEmail = async ({ user, passwordResetUrl }) => {
  if (!user || !user.email || !user.passwordResetToken || !passwordResetUrl) {
    throw new Error("Missing user, password reset URL, or token");
  }

  const transporter = createTransport();

  const html = buildEmailTemplate({
    firstName: user.firstName,
    title: "Forgot Your Password?",
    message:
      "We received a request to reset your password. Click the button below to reset it.",
    buttonText: "Reset Password",
    buttonLink: passwordResetUrl + user.passwordResetToken,
  });

  try {
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: user.email,
      subject: "Password Reset Request",
      html,
    });

    return { isEmailSent: true };
  } catch (err) {
    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
      console.error("Password reset email failed:", err.stack || err);
    } else {
      logger.error("Password reset email failed", {
        message: err.message,
        code: err.code,
        name: err.name,
        timestamp: new Date().toISOString(),
      });
    }

    return {
      isEmailSent: false,
      message: isDev
        ? err.message || "Failed to send password reset email"
        : "Failed to send email. Please try again later.",
    };
  }
};

module.exports = {
  sendRegistrationOtpEmail,
  sendPasswordResetEmail,
};
