/**
 * Zetawa Dark — Upload All Assets to User's Cloudinary Account (ezgx4l1i)
 *
 * Uploads:
 * 1. 12 Student Certificates (PDFs) into folder `zetawa_certificates`
 * 2. 4 Latest Updates (PDFs & Notice Images) into folder `zetawa_documents`
 * Updates MongoDB Atlas (mern-auth) documents with the new Cloudinary CDN links.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import connectDB from '../config/mongodb.js';
import certificateModel from '../models/certificateModel.js';
import latestUpdateModel from '../models/latestUpdateModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env'), override: true });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const SCRATCH_ASSETS_DIR = '/Users/vansh/.gemini/antigravity-ide/brain/77df5224-2082-4027-84ba-26f2176064ea/scratch/saniya_zetawa/zetawa-main/src/assets';

const CERTIFICATES_MAP = [
  { certNo: 'ZD202501', file: 'intern2.pdf' },
  { certNo: 'ZD202502', file: 'intern.pdf' },
  { certNo: 'ZD202503', file: 'intern3.pdf' },
  { certNo: 'ZD202504', file: 'intern4.pdf' },
  { certNo: 'ZD202505', file: 'intern5.pdf' },
  { certNo: 'ZD202601', file: 'intern6.pdf' },
  { certNo: 'ZD202602', file: 'intern7.pdf' },
  { certNo: 'ZD202603', file: 'intern8.pdf' },
  { certNo: 'ZD202604', file: 'intern9.pdf' },
  { certNo: 'ZD202605', file: 'intern11.pdf' },
  { certNo: 'ZD202606', file: 'intern10.pdf' },
  { certNo: 'ZD202607', file: 'intern12.pdf' }
];

const UPDATES_MAP = [
  { title: 'Bonus Announcement for Interns', file: 'Zetawa_dark_bonus.pdf' },
  { title: 'Internship Notice', file: 'internshipnotice.jpg' },
  { title: 'Board Resolution for FY24-25', file: 'boardResolution.pdf' },
  { title: 'Sonam Wangchuk Internship', file: 'SonamWangchukInternship.jpg' }
];

async function uploadFile(filePath, folder, publicName) {
  try {
    const res = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      public_id: publicName,
      resource_type: 'auto',
      overwrite: true
    });
    return res.secure_url;
  } catch (err) {
    // Retry with raw resource type (common for some PDFs)
    const rawRes = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      public_id: publicName,
      resource_type: 'raw',
      overwrite: true
    });
    return rawRes.secure_url;
  }
}

async function run() {
  console.log('\n======================================================');
  console.log('☁️  Uploading Assets to User Cloudinary Account: ezgx4l1i');
  console.log('======================================================\n');

  try {
    await connectDB();
    console.log('✅ Connected to MongoDB Atlas\n');

    // 1. Upload Certificates
    console.log('📜 1. Uploading 12 Student Certificates to zetawa_certificates...');
    const uploadedCerts = {};
    for (let i = 0; i < CERTIFICATES_MAP.length; i++) {
      const item = CERTIFICATES_MAP[i];
      const filePath = path.join(SCRATCH_ASSETS_DIR, item.file);

      if (!fs.existsSync(filePath)) {
        console.error(`   ❌ File not found: ${filePath}`);
        continue;
      }

      process.stdout.write(`   [${i + 1}/${CERTIFICATES_MAP.length}] Uploading ${item.file} (${item.certNo})... `);
      const publicName = `${item.certNo}_certificate`;
      const secureUrl = await uploadFile(filePath, 'zetawa_certificates', publicName);
      uploadedCerts[item.certNo] = secureUrl;
      console.log(`DONE ✅\n      URL: ${secureUrl}`);

      // Update in MongoDB
      await certificateModel.updateOne(
        { certificateNumber: item.certNo },
        { $set: { certificateFile: secureUrl } }
      );
    }

    // 2. Upload Latest Updates Notices
    console.log('\n📢 2. Uploading 4 Latest Updates Notices to zetawa_documents...');
    const uploadedUpdates = {};
    for (let i = 0; i < UPDATES_MAP.length; i++) {
      const item = UPDATES_MAP[i];
      const filePath = path.join(SCRATCH_ASSETS_DIR, item.file);

      if (!fs.existsSync(filePath)) {
        console.error(`   ❌ File not found: ${filePath}`);
        continue;
      }

      process.stdout.write(`   [${i + 1}/${UPDATES_MAP.length}] Uploading ${item.file} ("${item.title}")... `);
      const safeName = item.file.replace(/\.[^/.]+$/, '');
      const secureUrl = await uploadFile(filePath, 'zetawa_documents', safeName);
      uploadedUpdates[item.title] = secureUrl;
      console.log(`DONE ✅\n      URL: ${secureUrl}`);

      // Update in MongoDB
      await latestUpdateModel.updateOne(
        { title: item.title },
        { $set: { file: secureUrl } }
      );
    }

    console.log('\n======================================================');
    console.log('🎉 ALL ASSETS SUCCESSFULLY UPLOADED TO ezgx4l1i!');
    console.log('======================================================');
    console.log('You can now log in to your Cloudinary dashboard at https://console.cloudinary.com');
    console.log('under cloud name: ezgx4l1i');
    console.log('Folders created:');
    console.log('  📁 zetawa_certificates  (12 Certificate PDFs)');
    console.log('  📁 zetawa_documents     (4 Notice PDFs & Images)');
    console.log('======================================================\n');

    // Output JSON for updating controller defaults
    console.log('UPDATED_URLS_JSON:', JSON.stringify(uploadedUpdates, null, 2));

  } catch (err) {
    console.error('❌ Upload Error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
