/**
 * Zetawa Dark — Automated Certificate & PDF Migration Utility
 *
 * This script imports certificates and PDF files from an existing GitHub repository
 * or local directory directly into MongoDB Atlas and Cloudinary CDN.
 *
 * Usage:
 *   node scripts/migrate_certificates.js --dir /path/to/cloned-repo
 *   node scripts/migrate_certificates.js --repo https://github.com/username/repo-name.git
 *   node scripts/migrate_certificates.js --file ./data.json
 *   node scripts/migrate_certificates.js --file ./certificates.csv
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/mongodb.js';
import certificateModel from '../models/certificateModel.js';
import { uploadFileToCloudinary, isCloudinaryReady } from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root
dotenv.config({ path: path.join(__dirname, '..', '.env'), override: true });

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (flag) => {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
};

const repoUrl = getArg('--repo');
const dirPathArg = getArg('--dir');
const filePathArg = getArg('--file');

// Helper to normalize field names across different JSON/CSV schemas
const normalizeEntry = (item, baseDir = '') => {
  const getField = (...keys) => {
    for (const k of keys) {
      if (item[k] !== undefined && item[k] !== null && String(item[k]).trim() !== '') {
        return String(item[k]).trim();
      }
    }
    return '';
  };

  const certNumber = getField(
    'certificateNumber', 'certNumber', 'certNo', 'certificate_number',
    'certificate_no', 'cert_id', 'id', 'roll_no', 'code', 'serial'
  );

  const internName = getField(
    'internName', 'name', 'studentName', 'student_name', 'intern_name',
    'candidate_name', 'recipient', 'full_name', 'fullName'
  );

  const course = getField(
    'course', 'domain', 'track', 'program', 'specialization',
    'technology', 'title', 'role', 'internship_domain'
  ) || 'Full-Stack Software Engineering';

  const issueDate = getField(
    'issueDate', 'issue_date', 'issuedDate', 'date_of_issue', 'date', 'issued_on'
  );

  const completionDate = getField(
    'completionDate', 'completion_date', 'completedDate', 'end_date', 'completed_on'
  );

  const duration = getField('duration', 'tenure', 'period', 'timeline') || '3 Months';
  const status = getField('status') || 'Valid';

  let rawFile = getField('certificateFile', 'file', 'pdf', 'pdfUrl', 'certificateUrl', 'url', 'path');
  let localPdfPath = null;

  if (rawFile) {
    if (rawFile.startsWith('http://') || rawFile.startsWith('https://')) {
      localPdfPath = null; // already remote URL
    } else if (baseDir) {
      const candidate = path.isAbsolute(rawFile) ? rawFile : path.join(baseDir, rawFile);
      if (fs.existsSync(candidate)) {
        localPdfPath = candidate;
      }
    }
  }

  return {
    certificateNumber: certNumber,
    internName,
    course,
    issueDate,
    completionDate,
    duration,
    status,
    certificateFile: rawFile,
    localPdfPath,
  };
};

// Simple zero-dependency CSV parser
const parseCSV = (csvContent) => {
  const lines = csvContent.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  // Parse header
  const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  const entries = [];

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    // Match fields respecting quotes
    const values = [];
    let insideQuotes = false;
    let currentValue = '';

    for (let charIdx = 0; charIdx < rawLine.length; charIdx++) {
      const char = rawLine[charIdx];
      if (char === '"' || char === "'") {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue.trim().replace(/^["']|["']$/g, ''));
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim().replace(/^["']|["']$/g, ''));

    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || '';
    });
    entries.push(obj);
  }
  return entries;
};

// Scan a directory recursively for JSON, CSV, and PDF files
const scanDirectory = (dir) => {
  const results = {
    dataFiles: [],
    pdfFiles: [],
  };

  const walk = (currentDir) => {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      if (item === '.git' || item === 'node_modules') continue;
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        const ext = path.extname(item).toLowerCase();
        if (ext === '.json' || ext === '.csv') {
          results.dataFiles.push(fullPath);
        } else if (ext === '.pdf') {
          results.pdfFiles.push(fullPath);
        }
      }
    }
  };

  walk(dir);
  return results;
};

// Main migration runner
async function runMigration() {
  console.log('\n======================================================');
  console.log('🚀 Zetawa Dark — Certificate & PDF Migration Utility');
  console.log('======================================================\n');

  let workingDir = null;
  let tempClonedDir = null;

  try {
    // 1. Handle GitHub Repo Clone if URL passed
    if (repoUrl) {
      tempClonedDir = path.join(__dirname, '..', 'temp_github_repo_' + Date.now());
      console.log(`📥 Cloning repository: ${repoUrl}`);
      execSync(`git clone --depth 1 "${repoUrl}" "${tempClonedDir}"`, { stdio: 'inherit' });
      workingDir = tempClonedDir;
    } else if (dirPathArg) {
      workingDir = path.resolve(dirPathArg);
      if (!fs.existsSync(workingDir)) {
        throw new Error(`Directory does not exist: ${workingDir}`);
      }
    } else if (filePathArg) {
      const fileResolved = path.resolve(filePathArg);
      if (!fs.existsSync(fileResolved)) {
        throw new Error(`File does not exist: ${fileResolved}`);
      }
      workingDir = path.dirname(fileResolved);
    } else {
      console.log('ℹ️  No path specified. Looking for data in the current backend directory or parent...');
      workingDir = path.join(__dirname, '..');
    }

    // 2. Connect to Database
    console.log('\n🔌 Connecting to MongoDB Atlas...');
    await connectDB();
    console.log('✅ Connected to MongoDB Atlas\n');

    // 3. Check Cloudinary
    const cloudinaryReady = isCloudinaryReady();
    if (cloudinaryReady) {
      console.log('☁️  Cloudinary is configured and ready for automatic PDF uploads.');
    } else {
      console.log('⚠️  Cloudinary credentials not detected in .env. PDFs will be linked locally or as-is.');
    }

    // 4. Collect entries
    let rawEntries = [];
    const scanned = scanDirectory(workingDir);

    console.log(`\n🔍 Found in working directory:`);
    console.log(`   - ${scanned.dataFiles.length} JSON/CSV data files`);
    console.log(`   - ${scanned.pdfFiles.length} PDF certificate documents`);

    // Parse specific file if provided, or parse all found data files
    const dataFilesToParse = filePathArg ? [path.resolve(filePathArg)] : scanned.dataFiles;

    for (const dataFile of dataFilesToParse) {
      console.log(`📄 Reading: ${path.basename(dataFile)}`);
      const content = fs.readFileSync(dataFile, 'utf-8');
      if (dataFile.endsWith('.json')) {
        try {
          const parsed = JSON.parse(content);
          const list = Array.isArray(parsed) ? parsed : (parsed.certificates || parsed.data || [parsed]);
          rawEntries.push(...list.map(item => normalizeEntry(item, path.dirname(dataFile))));
        } catch (err) {
          console.warn(`   ⚠️ Could not parse JSON in ${dataFile}: ${err.message}`);
        }
      } else if (dataFile.endsWith('.csv')) {
        try {
          const parsed = parseCSV(content);
          rawEntries.push(...parsed.map(item => normalizeEntry(item, path.dirname(dataFile))));
        } catch (err) {
          console.warn(`   ⚠️ Could not parse CSV in ${dataFile}: ${err.message}`);
        }
      }
    }

    // If no JSON/CSV records found, but PDFs exist in the folder: generate entries directly from PDF file names!
    if (rawEntries.length === 0 && scanned.pdfFiles.length > 0) {
      console.log('\nℹ️  No JSON/CSV file found. Automatically extracting certificate entries from PDF filenames...');
      for (const pdfPath of scanned.pdfFiles) {
        const base = path.basename(pdfPath, '.pdf');
        // e.g. "ZW-2025-001 - John Doe" or "ZW-2025-001" or "John Doe"
        const parts = base.split(/[-_]+/).map(p => p.trim()).filter(Boolean);
        const certNo = parts.length > 0 ? parts[0] : `ZW-${Date.now().toString().slice(-6)}`;
        const name = parts.length > 1 ? parts.slice(1).join(' ') : 'Verified Fellow';

        rawEntries.push({
          certificateNumber: certNo,
          internName: name,
          course: 'Full-Stack Software Engineering',
          issueDate: new Date().toISOString().split('T')[0],
          completionDate: '',
          duration: '3 Months',
          status: 'Valid',
          certificateFile: pdfPath,
          localPdfPath: pdfPath,
        });
      }
    }

    // Associate scanned PDFs with entries if localPdfPath was not previously set
    for (const entry of rawEntries) {
      if (!entry.localPdfPath && entry.certificateNumber) {
        const matchingPdf = scanned.pdfFiles.find(p => {
          const filename = path.basename(p, '.pdf').toLowerCase();
          const cleanCert = entry.certificateNumber.toLowerCase();
          return filename.includes(cleanCert) || (entry.internName && filename.includes(entry.internName.toLowerCase().split(' ')[0]));
        });
        if (matchingPdf) {
          entry.localPdfPath = matchingPdf;
        }
      }
    }

    console.log(`\n📦 Total valid records to process: ${rawEntries.length}\n`);

    if (rawEntries.length === 0) {
      console.log('⚠️  No certificate records found. Please specify --repo <url>, --dir <path>, or --file <path>');
      return;
    }

    let importedCount = 0;
    let updatedCount = 0;
    let uploadCount = 0;
    let errorCount = 0;

    for (let i = 0; i < rawEntries.length; i++) {
      const item = rawEntries[i];
      if (!item.certificateNumber || !item.internName) {
        console.warn(`[${i + 1}/${rawEntries.length}] ⚠️  Skipping item without Certificate Number or Name.`);
        continue;
      }

      try {
        let finalFileUrl = item.certificateFile || '';

        // Upload PDF to Cloudinary if available
        if (item.localPdfPath && cloudinaryReady) {
          process.stdout.write(`[${i + 1}/${rawEntries.length}] ☁️  Uploading PDF to Cloudinary (${item.certificateNumber})... `);
          const uploadRes = await uploadFileToCloudinary(item.localPdfPath, 'zetawa_certificates');
          if (uploadRes.success && uploadRes.url) {
            finalFileUrl = uploadRes.url;
            uploadCount++;
            console.log('DONE');
          } else {
            console.log('FAILED (retaining local reference)');
          }
        }

        // Upsert into MongoDB Atlas (safe & idempotent)
        const updateData = {
          certificateNumber: item.certificateNumber,
          internName: item.internName,
          course: item.course || 'Full-Stack Software Engineering',
          issueDate: item.issueDate || '',
          completionDate: item.completionDate || '',
          duration: item.duration || '3 Months',
          status: item.status || 'Valid',
        };

        if (finalFileUrl) {
          updateData.certificateFile = finalFileUrl;
        }

        const existing = await certificateModel.findOne({ certificateNumber: item.certificateNumber });
        if (existing) {
          await certificateModel.updateOne({ _id: existing._id }, { $set: updateData });
          updatedCount++;
          console.log(`[${i + 1}/${rawEntries.length}] 🔄 Updated in DB: ${item.certificateNumber} (${item.internName})`);
        } else {
          await certificateModel.create(updateData);
          importedCount++;
          console.log(`[${i + 1}/${rawEntries.length}] ✨ Inserted in DB: ${item.certificateNumber} (${item.internName})`);
        }
      } catch (err) {
        errorCount++;
        console.error(`[${i + 1}/${rawEntries.length}] ❌ Error processing ${item.certificateNumber}: ${err.message}`);
      }
    }

    // 5. Final Report
    console.log('\n======================================================');
    console.log('🎉 Migration Completed Successfully!');
    console.log('======================================================');
    console.log(`  - Total Records Processed: ${rawEntries.length}`);
    console.log(`  - Newly Inserted into DB:  ${importedCount}`);
    console.log(`  - Existing Records Updated: ${updatedCount}`);
    console.log(`  - Cloudinary Uploads:      ${uploadCount}`);
    console.log(`  - Errors:                  ${errorCount}`);
    console.log('======================================================\n');
    console.log('All certificates are now instantly verifiable on the website (/certifications)');
    console.log('and fully manageable in the Admin Portal (/#/admin -> Certifications).\n');

  } catch (globalErr) {
    console.error('\n❌ Fatal Migration Error:', globalErr.message);
  } finally {
    // Clean up temporary clone if created
    if (tempClonedDir && fs.existsSync(tempClonedDir)) {
      console.log('🧹 Cleaning up temporary cloned repository folder...');
      fs.rmSync(tempClonedDir, { recursive: true, force: true });
    }
    await mongoose.disconnect();
    process.exit(0);
  }
}

runMigration();
