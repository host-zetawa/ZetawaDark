import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, User as UserIcon, UserPlus, ArrowLeft } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import Nav from "./Nav"
import Footer from "./Footer"
import Background3D from "./Background3D"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { register } = useAppContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const success = await register(name, email, password)
    setSubmitting(false)
    if (success) navigate(`/verify-email?email=${encodeURIComponent(email)}`)
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
          <Link to="/" style={{
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
            <ArrowLeft size={16} /> Back to home
          </Link>

          <h1 style={{ color: "var(--text)", fontSize: "clamp(1.4rem, 4vw, 1.8rem)", marginBottom: "0.25rem" }}>
            Create account
          </h1>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.95rem" }}>
            Create account — OTP will be sent to verify your email
          </p>

          <label style={labelStyle}>Name</label>
          <div style={fieldStyle}>
            <UserIcon size={18} color="var(--text-muted)" />
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" style={inputStyle} />
          </div>

          <label style={labelStyle}>Email</label>
          <div style={fieldStyle}>
            <Mail size={18} color="var(--text-muted)" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
          </div>

          <label style={labelStyle}>Password</label>
          <div style={{ ...fieldStyle, marginBottom: "1.5rem" }}>
            <Lock size={18} color="var(--text-muted)" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" style={inputStyle} />
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
            <UserPlus size={18} />
            {submitting ? "Creating account..." : "Sign Up"}
          </button>

          <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "1.5rem" }}>
            Already have an account?{" "}
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

export default Register
