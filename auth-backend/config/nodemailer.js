import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  connectionTimeout: 4000,
  greetingTimeout: 4000,
  socketTimeout: 4000,
  auth: {
    user: process.env.EMAIL || process.env.EMAIL_USER,
    pass: process.env.PASSWORD || process.env.EMAIL_PASS
  }
})

/**
 * Universal safe email dispatcher:
 * 1. Resend API via HTTPS port 443 (Render Free Tier safe).
 * 2. Brevo API via HTTPS port 443 (Can send to ANY recipient without domain verification).
 * 3. Direct SMTP fallback with 4-second timeout.
 * Never throws unhandled errors or blocks server requests.
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  const recipients = Array.isArray(to) 
    ? to.map(e => String(e).trim().toLowerCase()) 
    : [String(to).trim().toLowerCase()]

  // Option 1A: HTTP-based Resend API (Render Free Tier safe - port 443)
  if (process.env.RESEND_API_KEY) {
    const apiKey = process.env.RESEND_API_KEY.trim().replace(/^['"]|['"]$/g, '')
    const sender = process.env.RESEND_FROM || 'onboarding@resend.dev'

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from: sender,
          to: recipients,
          subject,
          text,
          html: html || `<p>${text}</p>`
        })
      })
      const data = await res.json()
      if (res.ok) {
        console.log(`[Email] Successfully delivered via Resend API to: ${recipients.join(', ')}`)
        return { success: true, provider: 'resend', data }
      }
      console.error(`[Email] Resend API error (${res.status}):`, JSON.stringify(data))
    } catch (err) {
      console.error(`[Email] Resend API request failed:`, err.message)
    }
  }

  // Option 1B: HTTP-based Brevo API (Render Free Tier safe - port 443)
  if (process.env.BREVO_API_KEY) {
    const brevoKey = process.env.BREVO_API_KEY.trim().replace(/^['"]|['"]$/g, '')
    const senderEmail = (process.env.BREVO_SENDER || process.env.EMAIL || 'vansh100101102@gmail.com').trim()

    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': brevoKey
        },
        body: JSON.stringify({
          sender: { name: 'Zetawa Dark', email: senderEmail },
          to: recipients.map(email => ({ email })),
          subject,
          htmlContent: html || `<p>${text}</p>`,
          textContent: text
        })
      })
      const data = await res.json()
      if (res.ok) {
        console.log(`[Email] Successfully delivered via Brevo API to: ${recipients.join(', ')}`)
        return { success: true, provider: 'brevo', data }
      }
      console.error(`[Email] Brevo API error (${res.status}):`, JSON.stringify(data))
    } catch (err) {
      console.error(`[Email] Brevo API request failed:`, err.message)
    }
  }

  // Option 2: Direct SMTP with strict timeout
  const fromEmail = process.env.EMAIL || process.env.EMAIL_USER
  const pass = process.env.PASSWORD || process.env.EMAIL_PASS
  if (!fromEmail || !pass) {
    console.warn(`[Email] No EMAIL / PASSWORD configured in environment variables.`)
    return { success: false, error: 'Email credentials not configured' }
  }

  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to: recipients.join(', '),
      subject,
      text,
      html: html || text
    })
    console.log(`[Email] Successfully delivered via SMTP to: ${recipients.join(', ')}`)
    return { success: true, provider: 'smtp', info }
  } catch (err) {
    console.error(`[Email] SMTP delivery failed to ${recipients.join(', ')}: ${err.message}`)
    return { success: false, error: err.message }
  }
}

export default transporter
