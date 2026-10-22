import certificateModel from "../models/certificateModel.js"
import { uploadFileToCloudinary, deleteFileFromStorage } from "../config/cloudinary.js"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Helper to ensure a certificate's file is uploaded to Cloudinary.
 * If the file is still stored locally in uploads/ and Cloudinary is configured,
 * it will automatically upload the local file to Cloudinary, delete the local file,
 * and update the database with the Cloudinary secure URL.
 */
const ensureCloudinaryUrl = async (cert) => {
  if (!cert || !cert.certificateFile) return cert
  // Already a Cloudinary URL or external HTTP URL
  if (cert.certificateFile.startsWith("http://") || cert.certificateFile.startsWith("https://")) {
    return cert
  }
  // Local file staged on disk
  const localFilePath = path.join(__dirname, "..", cert.certificateFile)
  if (fs.existsSync(localFilePath)) {
    try {
      const uploadRes = await uploadFileToCloudinary(localFilePath, "zetawa_certificates")
      if (uploadRes.success && uploadRes.url) {
        cert.certificateFile = uploadRes.url
        await certificateModel.findByIdAndUpdate(cert._id, { certificateFile: uploadRes.url })
      }
    } catch (err) {
      console.warn("Notice: Auto Cloudinary upload failed:", err.message)
    }
  }
  return cert
}

export const DEFAULT_CERTIFICATES = [
  {
    certificateNumber: "ZD202501",
    internName: "Manjeet Kumar",
    course: "Data Analyst",
    issueDate: "2025-05-05",
    completionDate: "2025-07-05",
    duration: "3 months",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677563/zetawa_certificates/ZD202501_certificate.pdf"
  },
  {
    certificateNumber: "ZD202502",
    internName: "Harshwardhan Rahul Patil",
    course: "Software Development",
    issueDate: "2024-12-01",
    completionDate: "2025-08-31",
    duration: "8 months",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677568/zetawa_certificates/ZD202502_certificate.pdf"
  },
  {
    certificateNumber: "ZD202503",
    internName: "Aditya Bhamu",
    course: "Graphic designer",
    issueDate: "2025-06-20",
    completionDate: "2025-09-20",
    duration: "2 months",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677572/zetawa_certificates/ZD202503_certificate.pdf"
  },
  {
    certificateNumber: "ZD202504",
    internName: "Monaf Ansari",
    course: "Web Development",
    issueDate: "2025-11-01",
    completionDate: "2025-10-02",
    duration: "2 months",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677575/zetawa_certificates/ZD202504_certificate.pdf"
  },
  {
    certificateNumber: "ZD202505",
    internName: "Ikjot Kour",
    course: "Software Development Intern",
    issueDate: "2025-11-05",
    completionDate: "2025-09-31",
    duration: "3 months",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677578/zetawa_certificates/ZD202505_certificate.pdf"
  },
  {
    certificateNumber: "ZD202601",
    internName: "Radha Raman",
    course: "Web Development",
    issueDate: "2026-02-14",
    completionDate: "2026-02-05",
    duration: "2 months",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677582/zetawa_certificates/ZD202601_certificate.pdf"
  },
  {
    certificateNumber: "ZD202602",
    internName: "Saniya Dogra",
    course: "Machine Learning",
    issueDate: "2026-02-14",
    completionDate: "2026-02-05",
    duration: "2 months",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677585/zetawa_certificates/ZD202602_certificate.pdf"
  },
  {
    certificateNumber: "ZD202603",
    internName: "Saniya Dogra",
    course: "SDE",
    issueDate: "2026-03-20",
    completionDate: "2026-02-28",
    duration: "6 months",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677589/zetawa_certificates/ZD202603_certificate.pdf"
  },
  {
    certificateNumber: "ZD202604",
    internName: "Anupriya Singh",
    course: "Web Dev",
    issueDate: "2026-06-24",
    completionDate: "2026-06-22",
    duration: "2 months",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677595/zetawa_certificates/ZD202604_certificate.pdf"
  },
  {
    certificateNumber: "ZD202605",
    internName: "Sanskriti Pandey",
    course: "Web Dev",
    issueDate: "2026-08-01",
    completionDate: "2026-08-01",
    duration: "1 month",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677601/zetawa_certificates/ZD202605_certificate.pdf"
  },
  {
    certificateNumber: "ZD202606",
    internName: "Sneha Devi",
    course: "Web Dev",
    issueDate: "2026-08-01",
    completionDate: "2026-08-01",
    duration: "1 month",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677619/zetawa_certificates/ZD202606_certificate.pdf"
  },
  {
    certificateNumber: "ZD202607",
    internName: "Tanisha Mahajan",
    course: "Web Dev",
    issueDate: "2026-09-02",
    completionDate: "2026-08-14",
    duration: "1 month",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677624/zetawa_certificates/ZD202607_certificate.pdf"
  },
  {
    certificateNumber: "ZD-2026-AI-0101",
    internName: "Aarav Sharma",
    course: "Autonomous AI Systems Engineering",
    issueDate: "Oct 01, 2026",
    completionDate: "Sep 28, 2026",
    duration: "6 Months Fellowship",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677870/zetawa_certificates/ZD-2026-AI-0101_cert.pdf"
  },
  {
    certificateNumber: "ZD-2026-DS-0305",
    internName: "Ananya Verma",
    course: "Data Science & MLOps",
    issueDate: "Jul 10, 2026",
    completionDate: "Jul 05, 2026",
    duration: "6 Months Fellowship",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677873/zetawa_certificates/ZD-2026-DS-0305_cert.pdf"
  },
  {
    certificateNumber: "ZD-2026-SEC-0089",
    internName: "Rohan Gupta",
    course: "Cybersecurity & Cryptography",
    issueDate: "Aug 20, 2026",
    completionDate: "Aug 18, 2026",
    duration: "4 Months Fellowship",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677894/zetawa_certificates/ZD-2026-SEC-0089_cert.pdf"
  },
  {
    certificateNumber: "ZD-2026-WEB-0214",
    internName: "Priya Patel",
    course: "Full-Stack Web Development",
    issueDate: "Sep 15, 2026",
    completionDate: "Sep 10, 2026",
    duration: "3 Months Internship",
    status: "Valid",
    certificateFile: "https://res.cloudinary.com/ezgx4l1i/image/upload/v1792677900/zetawa_certificates/ZD-2026-WEB-0214_cert.pdf"
  }
];

// Get all certificates (public for verification & admin listing)
export const getCertificates = async (req, res) => {
  try {
    let certs = await certificateModel.find().sort({ createdAt: -1 })
    if (!certs || certs.length === 0) {
      certs = await certificateModel.insertMany(DEFAULT_CERTIFICATES)
    }
    // Ensure any local files get synced to Cloudinary if credentials are ready
    for (let i = 0; i < certs.length; i++) {
      if (certs[i].certificateFile && !certs[i].certificateFile.startsWith("http")) {
        await ensureCloudinaryUrl(certs[i])
      }
    }
    res.json({ success: true, count: certs.length, data: certs })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Verify certificate (public)
export const verifyCertificate = async (req, res) => {
  const { certificateNumber } = req.params
  try {
    const cert = await certificateModel.findOne({
      certificateNumber: { $regex: new RegExp(`^${certificateNumber}$`, "i") },
    })
    if (!cert) {
      return res.json({ success: false, message: "Certificate not found" })
    }
    // Automatically promote local file to Cloudinary link if ready
    if (cert.certificateFile && !cert.certificateFile.startsWith("http")) {
      await ensureCloudinaryUrl(cert)
    }
    res.json({ success: true, data: cert })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Create certificate (admin only)
export const createCertificate = async (req, res) => {
  const {
    certificateNumber,
    internName,
    course,
    issueDate,
    completionDate,
    duration,
    certificateUrl,
    certificateFile: bodyCertFile,
  } = req.body
  const uploadedFile = req.file || (Array.isArray(req.files) ? req.files[0] : null)
  let certificateFile = certificateUrl || bodyCertFile || ""

  if (!certificateNumber || !internName || !course) {
    return res.json({ success: false, message: "Certificate number, intern name, and course are required" })
  }
  try {
    const existing = await certificateModel.findOne({ certificateNumber })
    if (existing) {
      return res.json({ success: false, message: "Certificate number already exists" })
    }

    if (uploadedFile) {
      // 1. Staged in local disk first
      const localFilePath = path.join(__dirname, "..", "uploads", uploadedFile.filename)
      // 2. Upload to Cloudinary; if success, auto-deletes local file; if fails, retains local copy
      const uploadRes = await uploadFileToCloudinary(localFilePath, "zetawa_certificates")
      console.log("createCertificate uploadRes:", JSON.stringify(uploadRes))
      certificateFile = uploadRes.success && uploadRes.url ? uploadRes.url : `uploads/${uploadedFile.filename}`
    }

    const cert = new certificateModel({
      certificateNumber,
      internName,
      course,
      issueDate: issueDate || "",
      completionDate: completionDate || "",
      duration: duration || "",
      certificateFile,
    })
    await cert.save()
    res.json({ success: true, data: cert, message: "Certificate created successfully" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Update certificate (admin only)
export const updateCertificate = async (req, res) => {
  const { id } = req.params
  const {
    certificateNumber,
    internName,
    course,
    issueDate,
    completionDate,
    status,
    duration,
    certificateUrl,
    certificateFile: bodyCertFile,
  } = req.body
  const uploadedFile = req.file || (Array.isArray(req.files) ? req.files[0] : null)

  try {
    const existingCert = await certificateModel.findById(id)
    if (!existingCert) {
      return res.json({ success: false, message: "Certificate not found" })
    }

    let certificateFile = certificateUrl || bodyCertFile || existingCert.certificateFile

    if (uploadedFile) {
      // Delete old file if exists (from Cloudinary or local disk)
      if (existingCert.certificateFile) {
        await deleteFileFromStorage(existingCert.certificateFile)
      }
      const localFilePath = path.join(__dirname, "..", "uploads", uploadedFile.filename)
      const uploadRes = await uploadFileToCloudinary(localFilePath, "zetawa_certificates")
      certificateFile = uploadRes.success && uploadRes.url ? uploadRes.url : `uploads/${uploadedFile.filename}`
    }

    const cert = await certificateModel.findByIdAndUpdate(
      id,
      { certificateNumber, internName, course, issueDate, completionDate, status, duration, certificateFile },
      { new: true }
    )
    res.json({ success: true, data: cert, message: "Certificate updated successfully" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Delete certificate (admin only)
export const deleteCertificate = async (req, res) => {
  const { id } = req.params
  try {
    const cert = await certificateModel.findById(id)
    if (!cert) {
      return res.json({ success: false, message: "Certificate not found" })
    }
    if (cert.certificateFile) {
      await deleteFileFromStorage(cert.certificateFile)
    }
    await certificateModel.findByIdAndDelete(id)
    res.json({ success: true, message: "Certificate deleted" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Sync all legacy local certificates to Cloudinary (admin only)
export const syncCertificatesToCloudinary = async (req, res) => {
  try {
    const localCerts = await certificateModel.find({
      certificateFile: { $regex: /^uploads\// },
    })

    if (localCerts.length === 0) {
      return res.json({ success: true, message: "All certificates are already hosted on Cloudinary.", syncedCount: 0 })
    }

    let syncedCount = 0
    const errors = []

    for (const cert of localCerts) {
      const localFilePath = path.join(__dirname, "..", cert.certificateFile)
      if (fs.existsSync(localFilePath)) {
        const uploadRes = await uploadFileToCloudinary(localFilePath, "zetawa_certificates")
        if (uploadRes.success && uploadRes.url) {
          cert.certificateFile = uploadRes.url
          await certificateModel.findByIdAndUpdate(cert._id, { certificateFile: uploadRes.url })
          syncedCount++
        } else {
          errors.push({ number: cert.certificateNumber, error: uploadRes.error || uploadRes.message })
        }
      }
    }

    res.json({
      success: true,
      message: `Successfully synced ${syncedCount} certificate(s) directly to Cloudinary.`,
      syncedCount,
      errors,
    })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Bulk import certificates (admin only)
export const bulkImportCertificates = async (req, res) => {
  try {
    const list = Array.isArray(req.body) ? req.body : req.body.certificates;
    if (!Array.isArray(list) || list.length === 0) {
      return res.json({ success: false, message: 'Please provide an array of certificates to import.' });
    }

    let inserted = 0;
    let updated = 0;
    const errors = [];

    for (const item of list) {
      const certNo = item.certificateNumber || item.certNo || item.id;
      const name = item.internName || item.name || item.studentName;
      const course = item.course || item.domain || 'Full-Stack Software Engineering';

      if (!certNo || !name) {
        errors.push({ item, error: 'Missing certificateNumber or internName' });
        continue;
      }

      const docData = {
        certificateNumber: String(certNo).trim(),
        internName: String(name).trim(),
        course: String(course).trim(),
        issueDate: item.issueDate ? String(item.issueDate).trim() : '',
        completionDate: item.completionDate ? String(item.completionDate).trim() : '',
        duration: item.duration ? String(item.duration).trim() : '3 Months',
        status: item.status || 'Valid',
        certificateFile: item.certificateFile || item.file || item.certificateUrl || ''
      };

      const existing = await certificateModel.findOne({ certificateNumber: docData.certificateNumber });
      if (existing) {
        await certificateModel.updateOne({ _id: existing._id }, { $set: docData });
        updated++;
      } else {
        await certificateModel.create(docData);
        inserted++;
      }
    }

    return res.json({
      success: true,
      message: `Bulk import completed: ${inserted} newly added, ${updated} updated.`,
      inserted,
      updated,
      failed: errors.length,
      errors
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Reset certificates to defaults (admin utility)
export const resetDefaultCertificates = async (req, res) => {
  try {
    await certificateModel.deleteMany({});
    const certs = await certificateModel.insertMany(DEFAULT_CERTIFICATES);
    return res.json({
      success: true,
      message: 'Certificates reset to official registry defaults',
      count: certs.length,
      data: certs
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


