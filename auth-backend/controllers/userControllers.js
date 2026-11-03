import userModel from "../models/userModel.js"

const ADMIN_EMAILS = [
  'tabrez.zeta@gmail.com',
  'vansh100101102@gmail.com',
  (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
].filter(Boolean).map(e => e.toLowerCase())

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId || req.body?.userId

    const user = await userModel.findById(userId)
    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }

    const cleanEmail = (user.email || '').trim().toLowerCase()
    const isAdmin = Boolean(user.isAdmin || ADMIN_EMAILS.includes(cleanEmail))
    let needsSave = false

    if (isAdmin && !user.isAdmin) {
      user.isAdmin = true
      needsSave = true
    }
    if (isAdmin && !user.isAccountVerified) {
      user.isAccountVerified = true
      needsSave = true
    }
    if (needsSave) {
      await user.save()
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
        isAdmin: isAdmin,
      }
    })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
