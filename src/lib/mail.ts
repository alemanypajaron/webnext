import nodemailer from 'nodemailer';

export type MailPayload = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name} en .env.local`);
  }
  return value;
}

export function getMailFrom() {
  const fromName = process.env.MAIL_FROM_NAME?.trim() || 'Alemán y Pajarón';
  const from = process.env.MAIL_FROM?.trim() || requireEnv('SMTP_USER');
  return { fromName, from, formatted: `"${fromName}" <${from}>` };
}

export function createTransporter() {
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || 'smtp.hostinger.com',
    port,
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: requireEnv('SMTP_USER'),
      pass: requireEnv('SMTP_PASS'),
    },
  });
}

export function wrapHtmlEmail(bodyHtml: string): string {
  const { fromName } = getMailFrom();
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${fromName}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background:#111827;padding:20px 28px;color:#ffffff;font-size:18px;font-weight:bold;">
                ${fromName}
              </td>
            </tr>
            <tr>
              <td style="padding:28px;font-size:16px;line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 24px;font-size:13px;line-height:1.5;color:#6b7280;">
                Alemán y Pajarón · Murcia<br />
                <a href="https://www.alemanypajaron.es" style="color:#2563eb;">www.alemanypajaron.es</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function textToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return wrapHtmlEmail(escaped.replace(/\n/g, '<br />'));
}

export async function sendMail(payload: MailPayload) {
  const transporter = createTransporter();
  const { formatted, from } = getMailFrom();

  return transporter.sendMail({
    from: formatted,
    to: payload.to,
    cc: payload.cc,
    bcc: payload.bcc,
    replyTo: payload.replyTo || process.env.MAIL_REPLY_TO?.trim() || from,
    subject: payload.subject,
    text: payload.text,
    html: payload.html || textToHtml(payload.text),
  });
}

export async function verifyMailConnection() {
  const transporter = createTransporter();
  await transporter.verify();
}
