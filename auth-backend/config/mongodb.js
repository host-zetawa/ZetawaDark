import "dotenv/config"
import mongoose from "mongoose"

const sanitizeMongoUri = (rawUri) => {
  let url = (rawUri || "").trim().replace(/^['"]|['"]$/g, "")
  if (url.startsWith("MONGODB_URL=")) url = url.replace(/^MONGODB_URL=/, "").trim()
  if (url.startsWith("MONGODB_URI=")) url = url.replace(/^MONGODB_URI=/, "").trim()

  const protoMatch = url.match(/^(mongodb(?:\+srv)?:\/\/)(.*)$/)
  if (!protoMatch) return url

  const prefix = protoMatch[1]
  const rest = protoMatch[2]

  const lastAtIdx = rest.lastIndexOf("@")
  if (lastAtIdx === -1) return url

  const creds = rest.substring(0, lastAtIdx)
  const hostAndRest = rest.substring(lastAtIdx + 1)

  const firstColonIdx = creds.indexOf(":")
  if (firstColonIdx === -1) return url

  const username = creds.substring(0, firstColonIdx)
  let password = creds.substring(firstColonIdx + 1)

  try {
    password = decodeURIComponent(password)
  } catch (e) {}

  const encodedPassword = encodeURIComponent(password)
  return `${prefix}${username}:${encodedPassword}@${hostAndRest}`
}

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Auth Database connected")
  })

  let rawUrl = (process.env.MONGODB_URL || process.env.MONGODB_URI || "").trim()
  let url = sanitizeMongoUri(rawUrl)

  if (!url) {
    console.error("\n❌ [MongoDB Error] Neither MONGODB_URL nor MONGODB_URI is set in Environment Variables!\n")
    throw new Error("MONGODB_URL environment variable is missing on Render.")
  }

  if (url.includes("<") && url.includes(">")) {
    console.error("\n❌ [MongoDB Error] Your MONGODB_URL still contains placeholder brackets like '<password>' or '<username>'. Please replace them with your actual MongoDB Atlas database username and password!\n")
    throw new Error("MONGODB_URL contains unreplaced placeholder brackets.")
  }

  if (!url.includes("mern-auth")) {
    if (url.includes("?")) {
      const [base, query] = url.split("?")
      url = `${base.replace(/\/$/, "")}/mern-auth?${query}`
    } else {
      url = `${url.replace(/\/$/, "")}/mern-auth`
    }
  }

  try {
    await mongoose.connect(url, { dbName: "mern-auth" })
  } catch (err) {
    console.error("\n❌ [MongoDB Connection Error]:", err.message)
    console.error("Please verify that your database username, password, and MongoDB Atlas IP Access (0.0.0.0/0) are properly configured.\n")
    throw err
  }
}

export default connectDB
