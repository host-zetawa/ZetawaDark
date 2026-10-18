import express from 'express'
import { 
  getCareers, 
  createCareer, 
  updateCareer, 
  deleteCareer,
  resetDefaultCareers 
} from '../controllers/careerControllers.js'
import adminAuth from '../middleware/adminAuth.js'

const careerRouter = express.Router()

// Public
careerRouter.get('/', getCareers)

// Reset / Seed defaults
careerRouter.post('/reset-defaults', resetDefaultCareers)

// Admin only
careerRouter.post('/', adminAuth, createCareer)
careerRouter.put('/:id', adminAuth, updateCareer)
careerRouter.delete('/:id', adminAuth, deleteCareer)

export default careerRouter
