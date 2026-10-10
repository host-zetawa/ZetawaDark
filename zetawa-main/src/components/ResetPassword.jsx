import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, KeyRound, ArrowLeft } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import Nav from "./Nav"
import Footer from "./Footer"
import Background3D from "./Background3D"

const ResetPassword = () => {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const { sendResetOtp, resetPassword } = useAppContext()
  const navigate = useNavigate()

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const sent = await sendResetOtp(email)
    setSubmitting(false)
    if (sent) setStep(2)
  }

  const handleReset = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const success = await resetPassword(email, otp, newPassword)
    setSubmitting(false)
    if (success) navigate("/")
  }

  const fieldStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    border: "1.5px solid var(--input-border)",
    background: "var(--input-bg)",
    borderRadius: "10px",
    padding: "0.8rem 1rem",
    marginBottom: "1.25rem",
  }

  const inputStyle = {
    border: "none",
    outline: "none",
    flex: 1,
    fontSize: "1rem",
    background: "transparent",
    color: "var(--text)",
    minWidth: 0,
  }

  const labelStyle = {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--text)",
    marginBottom: "0.5rem",
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Nav />
      <div style={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1.5rem, 4vw, 3rem) clamp(0.75rem, 3vw, 1.5rem)",
        position: "relative",
        overflow: "hidden"
      }}>
        <Background3D />
        <form onSubmit={step === 1 ? handleSendOtp : handleReset} style={{
          width: "100%",
          maxWidth: "420px",
          background: "var(--surface)",
          borderRadius: "clamp(12px, 3vw, 16px)",
          padding: "clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 2.5rem)",
          boxShadow: "var(--shadow-lg)",
          border: "1px solid var(--border)",
          position: "relative",
          zIndex: 1,
          boxSizing: "border-box"
        }}>
          <Link to="/login" style={{
            color: "var(--accent)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.9rem",
            marginBottom: "1.5rem",
            minHeight: "36px",
            touchAction: "manipulation"
          }}>
            <ArrowLeft size={16} /> Back to login
          </Link>

          <h1 style={{ color: "var(--text)", fontSize: "clamp(1.4rem, 4vw, 1.8rem)", marginBottom: "0.25rem" }}>
            {step === 1 ? "Reset Password" : "Enter OTP & New Password"}
          </h1>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.95rem" }}>
            {step === 1 ? "Enter your email to receive OTP" : "Enter the OTP and your new password"}
          </p>

          {step === 1 ? (
            <>
              <label style={labelStyle}>Email</label>
              <div style={{ ...fieldStyle, marginBottom: "1.5rem" }}>
                <Mail size={18} color="var(--text-muted)" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
              </div>
            </>
          ) : (
            <>
              <label style={labelStyle}>OTP Code</label>
              <div style={fieldStyle}>
                <KeyRound size={18} color="var(--text-muted)" />
                <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} placeholder="000000"
                  style={{ ...inputStyle, letterSpacing: "0.3em", textAlign: "center" }} />
              </div>
              <label style={labelStyle}>New Password</label>
              <div style={{ ...fieldStyle, marginBottom: "1.5rem" }}>
                <Lock size={18} color="var(--text-muted)" />
                <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 6 characters" style={inputStyle} />
              </div>
            </>
          )}

          <button type="submit" disabled={submitting} style={{
            width: "100%",
            minHeight: "48px",
            background: "var(--accent-orange, #f28c28)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "0.9rem",
            fontSize: "1.05rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            boxShadow: "0 6px 20px rgba(242, 140, 40, 0.35)",
            opacity: submitting ? 0.7 : 1,
            touchAction: "manipulation"
          }}>
            <KeyRound size={18} />
            {submitting ? "Processing..." : step === 1 ? "Send OTP" : "Reset Password"}
          </button>

          <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "1.5rem" }}>
            Remember your password?{" "}
            <Link to="/login" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default ResetPassword
