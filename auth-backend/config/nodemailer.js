import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  connectionTimeout: 5000,
  greetingTimeout: 5000,
  socketTimeout: 5000,
  auth: {
    user: process.env.EMAIL || process.env.EMAIL_USER,
    pass: process.env.PASSWORD || process.env.EMAIL_PASS
  }
})

/**
 * Universal safe email dispatcher:
 * 1. Uses Resend HTTP API (port 443) if RESEND_API_KEY is configured (bypasses Render Free SMTP block).
 * 2. Falls back to Nodemailer SMTP with 5-second timeout (never causes 502 Bad Gateway).
 * 3. Never throws unhandled exceptions that cause requests to hang or crash.
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  // Option 1: HTTP-based Resend API (Render Free Tier safe - port 443)
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Zetawa Dark <onboarding@resend.dev>',
          to: Array.isArray(to) ? to : [to],
          subject,
          text,
          html: html || `<p>${text}</p>`
        })
      })
      const data = await res.json()
      if (res.ok) {
        console.log(`[Email] Successfully delivered via Resend API to ${to}`)
        return { success: true, provider: 'resend', data }
      }
      console.warn(`[Email] Resend API error:`, data)
    } catch (err) {
      console.warn(`[Email] Resend API failed:`, err.message)
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
      to,
      subject,
      text,
      html: html || text
    })
    console.log(`[Email] Successfully delivered via SMTP to ${to}`)
    return { success: true, provider: 'smtp', info }
  } catch (err) {
    console.error(`[Email] SMTP delivery failed to ${to}: ${err.message}`)
    return { success: false, error: err.message }
  }
}

export default transporter
