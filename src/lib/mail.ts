import dns from 'dns';
import { readFile } from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import sharp from 'sharp';

dns.setDefaultResultOrder('ipv4first');

const SITE_URL = 'https://www.alemanypajaron.es';
const LOGO_CID = 'logo-ayp';

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
  const options: SMTPTransport.Options = {
    host: process.env.SMTP_HOST?.trim() || 'smtp.hostinger.com',
    port,
    secure: process.env.SMTP_SECURE !== 'false',
    requireTLS: process.env.SMTP_SECURE === 'false',
    auth: {
      user: requireEnv('SMTP_USER'),
      pass: requireEnv('SMTP_PASS'),
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_TLS_STRICT === 'true',
    },
  };
  return nodemailer.createTransport(options);
}

async function getLogoAttachment() {
  const svgPath = path.join(
    process.cwd(),
    'public',
    'images',
    'alemanypajaron-logo-white-4.svg'
  );
  const svg = await readFile(svgPath, 'utf8');
  const sizedSvg = svg.replace('<svg', '<svg width="634" height="80"');
  const content = await sharp(Buffer.from(sizedSvg))
    .resize({ width: 260 })
    .png()
    .toBuffer();

  return {
    filename: 'logo-alemanypajaron.png',
    content,
    cid: LOGO_CID,
  };
}

export function wrapHtmlEmail(bodyHtml: string): string {
  const { fromName } = getMailFrom();
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${fromName}</title>
  </head>
  <body style="margin:0;padding:0;background:#eef1f3;font-family:Inter,Arial,Helvetica,sans-serif;color:#1F2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f3;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 8px 24px rgba(10,34,48,0.08);">
            <tr>
              <td style="background:#F9B513;height:5px;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="background:#0A2230;padding:22px 32px;">
                <img src="cid:${LOGO_CID}" alt="Alemán y Pajarón" width="220" style="display:block;width:220px;max-width:70%;height:auto;border:0;" />
              </td>
            </tr>
            <tr>
              <td style="background:#0F2D3F;padding:10px 32px;color:#F9B513;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-family:Poppins,Arial,Helvetica,sans-serif;">
                Arquitectura técnica · Murcia
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px 12px;font-size:16px;line-height:1.7;color:#1F2937;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #E5E7EB;">
                  <tr>
                    <td style="padding-top:24px;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:4px;background:#F9B513;border-radius:2px;">&nbsp;</td>
                          <td style="padding-left:16px;">
                            <p style="margin:0 0 4px;font-family:Poppins,Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#0A2230;">
                              Alemán y Pajarón
                            </p>
                            <p style="margin:0 0 14px;font-size:13px;color:#6B7280;">
                              Gestores de obras en Murcia · Dirección de obra, licencias y reformas
                            </p>
                            <p style="margin:0 0 4px;font-size:13px;color:#1F2937;">
                              <a href="tel:+34650075842" style="color:#0A2230;text-decoration:none;">650 075 842</a>
                              &nbsp;·&nbsp;
                              <a href="mailto:contacto@alemanypajaron.es" style="color:#0A2230;text-decoration:none;">contacto@alemanypajaron.es</a>
                            </p>
                            <p style="margin:0;font-size:13px;">
                              <a href="${SITE_URL}" style="color:#0A2230;text-decoration:none;font-weight:600;">www.alemanypajaron.es</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#0A2230;padding:22px 32px;">
                <p style="margin:0 0 8px;font-size:12px;line-height:1.6;color:#D1D5DB;">
                  Murcia · Lunes a viernes, 8:00 – 16:00
                </p>
                <p style="margin:0 0 10px;font-size:12px;">
                  <a href="${SITE_URL}" style="color:#F9B513;text-decoration:none;">Web</a>
                  <span style="color:#4B5563;">&nbsp;|&nbsp;</span>
                  <a href="https://www.instagram.com/alemanypajaron/" style="color:#F9B513;text-decoration:none;">Instagram</a>
                  <span style="color:#4B5563;">&nbsp;|&nbsp;</span>
                  <a href="https://www.linkedin.com/company/alemanypajaron/" style="color:#F9B513;text-decoration:none;">LinkedIn</a>
                </p>
                <p style="margin:0;font-size:11px;color:#9CA3AF;">
                  © ${year} Alemán y Pajarón. Todos los derechos reservados.
                </p>
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
  const paragraphs = escaped
    .split(/\n{2,}/)
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1F2937;">${p.replace(/\n/g, '<br />')}</p>`
    )
    .join('');
  return wrapHtmlEmail(paragraphs);
}

export async function sendMail(payload: MailPayload) {
  const transporter = createTransporter();
  const { formatted, from } = getMailFrom();
  const logo = await getLogoAttachment();

  return transporter.sendMail({
    from: formatted,
    to: payload.to,
    cc: payload.cc,
    bcc: payload.bcc,
    replyTo: payload.replyTo || process.env.MAIL_REPLY_TO?.trim() || from,
    subject: payload.subject,
    text: payload.text,
    html: payload.html || textToHtml(payload.text),
    attachments: [logo],
  });
}

export async function verifyMailConnection() {
  const transporter = createTransporter();
  await transporter.verify();
}
