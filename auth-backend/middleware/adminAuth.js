import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const ADMIN_EMAILS = [
  'tabrez.zeta@gmail.com',
  'vansh100101102@gmail.com',
  (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
].filter(Boolean).map(e => e.toLowerCase())

const adminAuth = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.replace(/^Bearer\s+/i, '') || req.headers?.token
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" })
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
    if (!tokenDecode.id) {
      return res.json({ success: false, message: "Not Authorized, Login Again" })
    }

    const user = await userModel.findById(tokenDecode.id)
    const cleanEmail = (user?.email || '').trim().toLowerCase()
    const isAdmin = Boolean(user && (user.isAdmin || ADMIN_EMAILS.includes(cleanEmail)))
    if (!user || !isAdmin) {
      return res.json({ success: false, message: "Admin access only" })
    }

    let needsSave = false
    if (!user.isAdmin) {
      user.isAdmin = true
      needsSave = true
    }
    if (!user.isAccountVerified) {
      user.isAccountVerified = true
      needsSave = true
    }
    if (needsSave) {
      await user.save()
    }

    req.user = user
    req.userId = user._id
    if (!req.body) req.body = {}
    req.body.userId = user._id
    next()
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export default adminAuth

