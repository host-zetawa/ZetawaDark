import express from 'express'
import { 
  getPressReleases, 
  createPressRelease, 
  updatePressRelease, 
  deletePressRelease,
  resetDefaultPressReleases 
} from '../controllers/pressReleaseControllers.js'
import adminAuth from '../middleware/adminAuth.js'

const pressReleaseRouter = express.Router()

// Public
pressReleaseRouter.get('/', getPressReleases)

// Reset / Seed defaults
pressReleaseRouter.post('/reset-defaults', resetDefaultPressReleases)

// Admin only
pressReleaseRouter.post('/', adminAuth, createPressRelease)
pressReleaseRouter.put('/:id', adminAuth, updatePressRelease)
pressReleaseRouter.delete('/:id', adminAuth, deletePressRelease)

export default pressReleaseRouter
