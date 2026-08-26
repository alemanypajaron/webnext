/**
 * Envía un email desde contacto@alemanypajaron.es (SMTP Hostinger).
 *
 * Uso:
 *   npm run mail:verificar
 *   npm run mail:enviar -- --to=cliente@correo.com --subject="Asunto" --body="Mensaje"
 *   npm run mail:enviar -- --to=cliente@correo.com --subject="Asunto" --body-file=tmp/mensaje.txt
 */
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { sendMail, verifyMailConnection } from '../src/lib/mail';

config({ path: resolve(process.cwd(), '.env.local') });

function parseArgs() {
  const args = process.argv.slice(2);
  const values: Record<string, string> = {};
  const flags = new Set<string>();

  for (const arg of args) {
    if (arg.startsWith('--') && arg.includes('=')) {
      const eq = arg.indexOf('=');
      values[arg.slice(2, eq)] = arg.slice(eq + 1);
    } else if (arg.startsWith('--')) {
      flags.add(arg.slice(2));
    }
  }

  return { values, flags };
}

async function main() {
  const { values, flags } = parseArgs();

  if (flags.has('verify') || flags.has('verificar')) {
    await verifyMailConnection();
    console.log('Conexión SMTP con Hostinger correcta.');
    return;
  }

  const to = values.to?.trim();
  const subject = values.subject?.trim();
  let text = values.body ?? '';

  if (values['body-file']) {
    text = readFileSync(resolve(process.cwd(), values['body-file']), 'utf8');
  }

  if (!to || !subject || !text.trim()) {
    console.error(
      'Uso: npm run mail:enviar -- --to=correo --subject="Asunto" --body="Texto"'
    );
    process.exit(1);
  }

  const info = await sendMail({
    to,
    subject,
    text,
    cc: values.cc,
    bcc: values.bcc,
    replyTo: values['reply-to'],
  });

  console.log('Email enviado.');
  console.log(`Destinatario: ${to}`);
  console.log(`Asunto: ${subject}`);
  console.log(`Id: ${info.messageId}`);
}

main().catch((error) => {
  console.error('No se pudo enviar el email.');
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
