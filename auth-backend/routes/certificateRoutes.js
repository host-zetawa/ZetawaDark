import express from 'express'
import upload from '../config/cloudinary.js'
import {
  getCertificates,
  verifyCertificate,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  syncCertificatesToCloudinary,
  bulkImportCertificates,
  resetDefaultCertificates
} from '../controllers/certificateControllers.js'
import adminAuth from '../middleware/adminAuth.js'

const certificateRouter = express.Router()

// Public routes
certificateRouter.get('/', getCertificates)
certificateRouter.get('/verify/:certificateNumber', verifyCertificate)

// Utility / Reset defaults
certificateRouter.post('/reset-defaults', resetDefaultCertificates)

// Admin only routes
certificateRouter.post('/bulk-import', adminAuth, bulkImportCertificates)
certificateRouter.post('/sync-cloudinary', adminAuth, syncCertificatesToCloudinary)
certificateRouter.post('/', adminAuth, upload.any(), createCertificate)
certificateRouter.put('/:id', adminAuth, upload.any(), updateCertificate)
certificateRouter.delete('/:id', adminAuth, deleteCertificate)

export default certificateRouter
