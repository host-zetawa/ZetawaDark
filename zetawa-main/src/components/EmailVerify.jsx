import { useState } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import { ShieldCheck, ArrowLeft, Mail } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import Nav from "./Nav"
import Footer from "./Footer"
import Background3D from "./Background3D"

const EmailVerify = () => {
  const [searchParams] = useSearchParams()
  const emailFromUrl = searchParams.get("email") || ""
  const [email, setEmail] = useState(emailFromUrl)
  const [otp, setOtp] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { verifyEmail } = useAppContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const success = await verifyEmail(email, otp)
    setSubmitting(false)
    if (success) navigate("/")
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
        <form onSubmit={handleSubmit} style={{
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
          <Link to="/register" style={{
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
            <ArrowLeft size={16} /> Back to register
          </Link>

          <h1 style={{ color: "var(--text)", fontSize: "clamp(1.4rem, 4vw, 1.8rem)", marginBottom: "0.25rem" }}>
            Email Verification
          </h1>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.95rem" }}>
            Enter the 6-digit OTP sent to your email
          </p>

          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.5rem" }}>
            Email
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", border: "1.5px solid var(--input-border)", background: "var(--input-bg)", borderRadius: "10px", padding: "0.8rem 1rem", marginBottom: "1.25rem" }}>
            <Mail size={18} color="var(--text-muted)" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              style={{ border: "none", outline: "none", flex: 1, fontSize: "1rem", background: "transparent", color: "var(--text)", minWidth: 0 }} />
          </div>

          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.5rem" }}>
            OTP Code
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", border: "1.5px solid var(--input-border)", background: "var(--input-bg)", borderRadius: "10px", padding: "0.8rem 1rem", marginBottom: "1.5rem" }}>
            <ShieldCheck size={18} color="var(--text-muted)" />
            <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} placeholder="000000"
              style={{ border: "none", outline: "none", flex: 1, fontSize: "1.2rem", background: "transparent", color: "var(--text)", letterSpacing: "0.3em", textAlign: "center", minWidth: 0 }} />
          </div>

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
            <ShieldCheck size={18} />
            {submitting ? "Verifying..." : "Verify Email"}
          </button>

          <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "1.5rem" }}>
            Already verified?{" "}
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

export default EmailVerify
