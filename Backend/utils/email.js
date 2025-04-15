const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url ? url : null;
    this.from = `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }

    return nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c0ebba01904879",
        pass: "c65b788e1bfd83",
      },
    });
  }

  generateVerificationTemplate() {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Email Verification</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 40px 30px 20px 30px; text-align: center;">
                    <h2 style="color: #333333;">Verify Your Email Address</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 20px 30px;">
                    <p>Hello ${this.firstName},</p>
                    <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the button below.</p>
                    <p style="text-align: center; margin: 30px 0;">
                      <a href="${this.url}" style="
                        background-color: #4CAF50;
                        color: white;
                        padding: 12px 24px;
                        text-decoration: none;
                        border-radius: 5px;
                        display: inline-block;
                        font-weight: bold;
                      ">Verify Email</a>
                    </p>
                    <p>If you did not request this, you can safely ignore this email.</p>
                    <p>Best regards,<br>${process.env.FROM_NAME}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f4f4f4; padding: 20px; text-align: center; color: #777; font-size: 12px;">
                    &copy; ${new Date().getFullYear()} ${
      process.env.FROM_NAME
    }. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  generatePasswordResetTemplate() {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Password Reset</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 40px 30px 20px 30px; text-align: center;">
                    <h2 style="color: #333333;">Password Reset Request</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 20px 30px;">
                    <p>Hello ${this.firstName},</p>
                    <p>We received a request to reset your password. Click the button below to reset it. This link is valid for only <strong>30 minutes</strong>.</p>
                    <p style="text-align: center; margin: 30px 0;">
                      <a href="${this.url}" style="
                        background-color: #4CAF50;
                        color: white;
                        padding: 12px 24px;
                        text-decoration: none;
                        border-radius: 5px;
                        display: inline-block;
                        font-weight: bold;
                      ">Reset Password</a>
                    </p>
                    <p>If you did not request this, please ignore this email. Your password will remain unchanged.</p>
                    <p>Best regards,<br>${process.env.FROM_NAME}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f4f4f4; padding: 20px; text-align: center; color: #777; font-size: 12px;">
                    &copy; ${new Date().getFullYear()} ${
      process.env.FROM_NAME
    }. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  generateGuideApprovalTemplate() {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Guide Approval Notification</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 40px 30px 20px 30px; text-align: center;">
                    <h2 style="color: #333333;">Your Guide Application Has Been Approved</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 20px 30px;">
                    <p>Hello ${this.firstName},</p>
                    <p>We are pleased to inform you that your application as a guide has been approved. You can now access your account and start contributing.</p>
                    <p style="text-align: center; margin: 30px 0;">
                      <a href="${this.url}" style="
                        background-color: #4CAF50;
                        color: white;
                        padding: 12px 24px;
                        text-decoration: none;
                        border-radius: 5px;
                        display: inline-block;
                        font-weight: bold;
                      ">Access Your Dashboard</a>
                    </p>
                    <p>If you did not initiate this process, please disregard this email.</p>
                    <p>Best regards,<br>${process.env.FROM_NAME}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f4f4f4; padding: 20px; text-align: center; color: #777; font-size: 12px;">
                    &copy; ${new Date().getFullYear()} ${
      process.env.FROM_NAME
    }. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  generateFeedbackResponseTemplate(responseMessage) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2f855a;">Hello ${this.firstName},</h2>
  
        <p>Thank you for getting in touch with us. We have reviewed your feedback and marked the issue as <strong style="color: green;">resolved</strong>.</p>
  
        <p><strong>Our Response:</strong></p>
        <blockquote style="background-color: #f0fdf4; border-left: 4px solid #38a169; padding: 10px; margin: 10px 0;">
          ${responseMessage}
        </blockquote>
  
        <p>If you have any further concerns or questions, feel free to reply to this email or contact us through the platform.</p>
  
        <p style="margin-top: 30px;">Best regards,<br/><strong>${process.env.FROM_NAME}</strong></p>
      </div>
    `;
  }

  generateNotificationTemplate(messageBody) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2f855a;">Hello ${this.firstName},</h2>
  
        <p>We would like to inform you about the following update:</p>
  
        <blockquote style="background-color: #ebf8ff; border-left: 4px solid #3182ce; padding: 10px; margin: 10px 0;">
          ${messageBody}
        </blockquote>
  
        <p>If you have any questions or require further assistance, please feel free to reply to this email or contact our support team.</p>
  
        <p style="margin-top: 30px;">Best regards,<br/><strong>${process.env.FROM_NAME}</strong></p>
      </div>
    `;
  }

  async send(subject, html) {
    try {
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: htmlToText.convert(html),
      };

      const response = await this.newTransport().sendMail(mailOptions);

      return { success: true, response };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    }
  }

  async sendVerification() {
    const html = this.generateVerificationTemplate();
    return await this.send("Please verify your email address", html);
  }

  async sendPasswordReset() {
    const html = this.generatePasswordResetTemplate();
    return await this.send(
      "Your password reset token (valid for only 30 minutes)",
      html
    );
  }

  async sendGuideApprovalMail() {
    const html = this.generateGuideApprovalTemplate();
    return await this.send("Your Guide Application Has Been Approved", html);
  }

  async sendFeedbackResolution(responseMessage) {
    const html = this.generateFeedbackResponseTemplate(responseMessage);
    return await this.send("Your feedback has been addressed.", html);
  }

  async sendNotification(subject, message) {
    const html = this.generateNotificationTemplate(message);
    return await this.send(subject, html);
  }
};
