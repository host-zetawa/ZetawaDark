/**
 * Zetawa Dark — Direct Import Script from saniya-dogra/Zetawa
 *
 * Imports all 12 student certificates and press releases from the saniya-dogra/Zetawa repository
 * directly into MongoDB Atlas and Cloudinary CDN.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/mongodb.js';
import certificateModel from '../models/certificateModel.js';
import pressReleaseModel from '../models/pressReleaseModel.js';
import { uploadFileToCloudinary, isCloudinaryReady } from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env'), override: true });

const CERTIFICATES_DATA = [
  {
    certificateNumber: 'ZD202501',
    internName: 'Manjeet Kumar',
    course: 'Data Analyst',
    issueDate: '2025-05-05',
    completionDate: '2025-07-05',
    status: 'Valid',
    duration: '3 months',
    pdfFile: 'intern2.pdf'
  },
  {
    certificateNumber: 'ZD202502',
    internName: 'Harshwardhan Rahul Patil',
    course: 'Software Development',
    issueDate: '2024-12-01',
    completionDate: '2025-08-31',
    status: 'Valid',
    duration: '8 months',
    pdfFile: 'intern.pdf'
  },
  {
    certificateNumber: 'ZD202503',
    internName: 'Aditya Bhamu',
    course: 'Graphic designer',
    issueDate: '2025-06-20',
    completionDate: '2025-09-20',
    status: 'Valid',
    duration: '2 months',
    pdfFile: 'intern3.pdf'
  },
  {
    certificateNumber: 'ZD202504',
    internName: 'Monaf Ansari',
    course: 'Web Development',
    issueDate: '2025-11-01',
    completionDate: '2025-10-02',
    status: 'Valid',
    duration: '2 months',
    pdfFile: 'intern4.pdf'
  },
  {
    certificateNumber: 'ZD202505',
    internName: 'Ikjot Kour',
    course: 'Software Development Intern',
    issueDate: '2025-11-05',
    completionDate: '2025-09-31',
    status: 'Valid',
    duration: '3 months',
    pdfFile: 'intern5.pdf'
  },
  {
    certificateNumber: 'ZD202601',
    internName: 'Radha Raman',
    course: 'Web Development',
    issueDate: '2026-02-14',
    completionDate: '2026-02-05',
    status: 'Valid',
    duration: '2 months',
    pdfFile: 'intern6.pdf'
  },
  {
    certificateNumber: 'ZD202602',
    internName: 'Saniya Dogra',
    course: 'Machine Learning',
    issueDate: '2026-02-14',
    completionDate: '2026-02-05',
    status: 'Valid',
    duration: '2 months',
    pdfFile: 'intern7.pdf'
  },
  {
    certificateNumber: 'ZD202603',
    internName: 'Saniya Dogra',
    course: 'SDE',
    issueDate: '2026-03-20',
    completionDate: '2026-02-28',
    status: 'Valid',
    duration: '6 months',
    pdfFile: 'intern8.pdf'
  },
  {
    certificateNumber: 'ZD202604',
    internName: 'Anupriya Singh',
    course: 'Web Dev',
    issueDate: '2026-06-24',
    completionDate: '2026-06-22',
    status: 'Valid',
    duration: '2 months',
    pdfFile: 'intern9.pdf'
  },
  {
    certificateNumber: 'ZD202606',
    internName: 'Sneha Devi',
    course: 'Web Dev',
    issueDate: '2026-08-01',
    completionDate: '2026-08-01',
    status: 'Valid',
    duration: '1 month',
    pdfFile: 'intern10.pdf'
  },
  {
    certificateNumber: 'ZD202605',
    internName: 'Sanskriti Pandey',
    course: 'Web Dev',
    issueDate: '2026-08-01',
    completionDate: '2026-08-01',
    status: 'Valid',
    duration: '1 month',
    pdfFile: 'intern11.pdf'
  },
  {
    certificateNumber: 'ZD202607',
    internName: 'Tanisha Mahajan',
    course: 'Web Dev',
    issueDate: '2026-09-02',
    completionDate: '2026-08-14',
    status: 'Valid',
    duration: '1 month',
    pdfFile: 'intern12.pdf'
  }
];

const PRESS_RELEASES_DATA = [
  {
    title: 'Viral Success Story - Company Achievement Goes Viral',
    date: 'August 27, 2025',
    type: 'Official Announcement',
    source: 'LinkedIn',
    year: 'FY2025',
    linkedinUrl: 'https://www.linkedin.com/posts/tabrez-alam-59b6b61b3_like-happy-viral-activity-7335224155493081088-lQ1n',
    content: 'Zetawa Dark milestone recognition and viral community engagement announcement.'
  },
  {
    title: 'Strategic Business Update and Company Activity',
    date: 'August 15, 2025',
    type: 'Business Update',
    source: 'LinkedIn',
    year: 'FY2025',
    linkedinUrl: 'https://www.linkedin.com/posts/tabrez-alam-59b6b61b3_activity-7274659404732346368-tjI6',
    content: 'Strategic operational expansion and technological capability updates across engineering squads.'
  },
  {
    title: 'Company Growth Milestone Announcement',
    date: 'August 10, 2025',
    type: 'Official Announcement',
    source: 'LinkedIn',
    year: 'FY2025',
    linkedinUrl: 'https://www.linkedin.com/posts/tabrez-alam-59b6b61b3_activity-7274659404732346368-tjI6',
    content: 'Formal milestone announcement marking growth and successful deployment cycles.'
  }
];

async function runImport() {
  console.log('\n======================================================');
  console.log('🚀 Importing Data from saniya-dogra/Zetawa');
  console.log('======================================================\n');

  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await connectDB();
    console.log('✅ Connected to MongoDB Atlas\n');

    const cloudinaryReady = isCloudinaryReady();
    if (cloudinaryReady) {
      console.log('☁️  Cloudinary is configured and ready for automatic PDF uploads.\n');
    } else {
      console.log('ℹ️  Cloudinary not configured; storing local uploads paths.\n');
    }

    const uploadsDir = path.join(__dirname, '..', 'uploads');
    let certInserted = 0;
    let certUpdated = 0;
    let certUploaded = 0;

    console.log('📜 Processing Certificates (12 Records)...');
    for (let i = 0; i < CERTIFICATES_DATA.length; i++) {
      const cert = CERTIFICATES_DATA[i];
      const localPdfPath = path.join(uploadsDir, cert.pdfFile);
      let fileUrl = `uploads/${cert.pdfFile}`;

      if (fs.existsSync(localPdfPath) && cloudinaryReady) {
        process.stdout.write(`   [${i + 1}/${CERTIFICATES_DATA.length}] Uploading ${cert.pdfFile} to Cloudinary... `);
        const uploadRes = await uploadFileToCloudinary(localPdfPath, 'zetawa_certificates');
        if (uploadRes.success && uploadRes.url) {
          fileUrl = uploadRes.url;
          certUploaded++;
          console.log('DONE ✅');
        } else {
          console.log(`RETAINED LOCAL (${uploadRes.message || 'Error'})`);
        }
      }

      const certDoc = {
        certificateNumber: cert.certificateNumber,
        internName: cert.internName,
        course: cert.course,
        issueDate: cert.issueDate,
        completionDate: cert.completionDate,
        duration: cert.duration,
        status: cert.status,
        certificateFile: fileUrl
      };

      const existing = await certificateModel.findOne({ certificateNumber: cert.certificateNumber });
      if (existing) {
        await certificateModel.updateOne({ _id: existing._id }, { $set: certDoc });
        certUpdated++;
        console.log(`   🔄 Updated: ${cert.certificateNumber} - ${cert.internName} (${cert.course})`);
      } else {
        await certificateModel.create(certDoc);
        certInserted++;
        console.log(`   ✨ Inserted: ${cert.certificateNumber} - ${cert.internName} (${cert.course})`);
      }
    }

    console.log('\n📰 Processing Press Releases...');
    let prInserted = 0;
    for (const pr of PRESS_RELEASES_DATA) {
      const existing = await pressReleaseModel.findOne({ title: pr.title });
      if (!existing) {
        await pressReleaseModel.create(pr);
        prInserted++;
        console.log(`   ✨ Inserted PR: ${pr.title}`);
      } else {
        console.log(`   ℹ️ PR already exists: ${pr.title}`);
      }
    }

    console.log('\n======================================================');
    console.log('🎉 Migration Completed Successfully!');
    console.log('======================================================');
    console.log(`  - Certificates Inserted:   ${certInserted}`);
    console.log(`  - Certificates Updated:    ${certUpdated}`);
    console.log(`  - Cloudinary PDF Uploads:  ${certUploaded}`);
    console.log(`  - Press Releases Added:    ${prInserted}`);
    console.log('======================================================\n');
    console.log('You can now:');
    console.log('1. Go to the website: verify any certificate ID like ZD202501, ZD202502, ZD202602');
    console.log('2. Log in as Admin: all 12 certificates appear in the Admin Portal table with View, Edit, and Delete options.');

  } catch (err) {
    console.error('❌ Error during import:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runImport();
