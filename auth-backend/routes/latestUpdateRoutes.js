import express from 'express'
import { 
  getLatestUpdates, 
  createLatestUpdate, 
  updateLatestUpdate, 
  deleteLatestUpdate,
  resetDefaultUpdates 
} from '../controllers/latestUpdateControllers.js'
import adminAuth from '../middleware/adminAuth.js'
import upload from '../config/cloudinary.js'

const latestUpdateRouter = express.Router()

// Public
latestUpdateRouter.get('/', getLatestUpdates)

// Reset / Seed defaults
latestUpdateRouter.post('/reset-defaults', resetDefaultUpdates)

// Admin only with file upload
latestUpdateRouter.post('/', adminAuth, upload.any(), createLatestUpdate)
latestUpdateRouter.put('/:id', adminAuth, upload.any(), updateLatestUpdate)
latestUpdateRouter.delete('/:id', adminAuth, deleteLatestUpdate)

export default latestUpdateRouter
