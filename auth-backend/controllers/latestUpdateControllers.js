import latestUpdateModel from "../models/latestUpdateModel.js"
import { uploadFileToCloudinary, deleteFileFromStorage } from "../config/cloudinary.js"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const DEFAULT_UPDATES = [
  {
    title: 'Bonus Announcement for Interns',
    date: '29-08-2025',
    description: 'We are pleased to announce a 10% bonus for all current interns. As part of our efforts to recognize and reward the hard work and dedication of our interns, Zetawa Dark Private Limited has approved a 10% bonus effective from 29-08-2025. The bonus will be disbursed accordingly in the current payment cycle.',
    file: 'https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677626/zetawa_documents/Zetawa_dark_bonus.pdf'
  },
  {
    title: 'Internship Notice',
    date: 'August 2025',
    description: 'Join Our Dynamic Team - Internship Opportunities Available. We are excited to announce internship opportunities across various departments. Join us to gain valuable experience and contribute to our innovative projects.',
    file: 'https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677628/zetawa_documents/internshipnotice.jpg'
  },
  {
    title: 'Board Resolution for FY24-25',
    date: 'FY 2024-25',
    description: 'Complete board resolution document for the financial year 2024-25, including all strategic decisions and corporate governance updates: Strategic Decisions & Approvals, Corporate Governance Updates, Financial Year Planning.',
    file: 'https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677632/zetawa_documents/boardResolution.pdf'
  },
  {
    title: 'Sonam Wangchuk Internship',
    date: 'August 2025',
    description: 'Launch of the Sonam Wangchuk Internship Program. We are extremely proud to announce that Zetawa Dark Private Limited is launching the "SONAM WANGCHUK INTERNSHIP". Inspired by the vision of Sonam Wangchuk Sir and the fact that we are proud Alumni of NIT Srinagar. Our mission is simple – Using technology to solve real social problems.',
    file: 'https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677634/zetawa_documents/SonamWangchukInternship.jpg'
  }
]

// Get all latest updates (auto-seeds defaults if empty)
export const getLatestUpdates = async (req, res) => {
  try {
    let updates = await latestUpdateModel.find().sort({ createdAt: -1 })
    if (!updates || updates.length === 0) {
      updates = await latestUpdateModel.insertMany(DEFAULT_UPDATES)
    }
    res.json({ success: true, count: updates.length, data: updates })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Reset latest updates to defaults (admin utility)
export const resetDefaultUpdates = async (req, res) => {
  try {
    await latestUpdateModel.deleteMany({})
    const updates = await latestUpdateModel.insertMany(DEFAULT_UPDATES)
    return res.json({
      success: true,
      message: 'Latest updates reset to predefined defaults',
      count: updates.length,
      data: updates
    })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

// Create latest update (admin only)
export const createLatestUpdate = async (req, res) => {
  const { title, date, description } = req.body
  const uploadedFile = req.file || (Array.isArray(req.files) ? req.files[0] : null)
  let file = ''

  if (!title || !date) {
    return res.json({ success: false, message: 'Title and date are required' })
  }
  try {
    if (uploadedFile) {
      // 1. Staged in local disk first
      const localFilePath = path.join(__dirname, '..', 'uploads', uploadedFile.filename)
      // 2. Upload to Cloudinary; if success, deletes local file; if fail, retains local copy
      const uploadRes = await uploadFileToCloudinary(localFilePath, 'zetawa_updates')
      file = uploadRes.url || `uploads/${uploadedFile.filename}`
    }

    const update = new latestUpdateModel({ title, date, description, file })
    await update.save()
    res.json({ success: true, data: update, message: 'Latest update created successfully' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Update latest update (admin only)
export const updateLatestUpdate = async (req, res) => {
  const { id } = req.params
  const { title, date, description } = req.body
  const uploadedFile = req.file || (Array.isArray(req.files) ? req.files[0] : null)

  try {
    const existingUpdate = await latestUpdateModel.findById(id)
    if (!existingUpdate) {
      return res.json({ success: false, message: 'Latest update not found' })
    }

    let file = existingUpdate.file

    if (uploadedFile) {
      // Remove old file from Cloudinary or local disk
      if (existingUpdate.file) {
        await deleteFileFromStorage(existingUpdate.file)
      }
      const localFilePath = path.join(__dirname, '..', 'uploads', uploadedFile.filename)
      const uploadRes = await uploadFileToCloudinary(localFilePath, 'zetawa_updates')
      file = uploadRes.url || `uploads/${uploadedFile.filename}`
    }

    const update = await latestUpdateModel.findByIdAndUpdate(
      id,
      { title, date, description, file },
      { new: true }
    )
    res.json({ success: true, data: update, message: 'Latest update updated successfully' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Delete latest update (admin only)
export const deleteLatestUpdate = async (req, res) => {
  const { id } = req.params
  try {
    const update = await latestUpdateModel.findById(id)
    if (!update) {
      return res.json({ success: false, message: 'Latest update not found' })
    }
    if (update.file) {
      await deleteFileFromStorage(update.file)
    }
    await latestUpdateModel.findByIdAndDelete(id)
    res.json({ success: true, message: 'Latest update deleted' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

