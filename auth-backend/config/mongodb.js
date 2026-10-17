import "dotenv/config"
import mongoose from "mongoose"

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Auth Database connected")
  })

  let rawUrl = (process.env.MONGODB_URL || process.env.MONGODB_URI || "").trim()
  let url = rawUrl.replace(/^['"]|['"]$/g, "").trim()

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

  await mongoose.connect(url, { dbName: "mern-auth" })
}

export default connectDB
