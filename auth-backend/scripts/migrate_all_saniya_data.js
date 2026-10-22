/**
 * Zetawa Dark — Complete Migration Script from saniya-dogra/Zetawa
 *
 * Imports:
 * 1. Latest Updates (with Cloudinary-hosted PDFs/images for Bonus notice, Board resolution, Internship notice, and Sonam Wangchuk Internship)
 * 2. Press Releases (all FY2025 LinkedIn announcements and updates with exact links)
 * 3. Careers Portal Data (3D Animation, Android Developer, UX Designer, Software Developer, Machine Learning, and Certification Aptitude Test)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/mongodb.js';
import latestUpdateModel from '../models/latestUpdateModel.js';
import pressReleaseModel from '../models/pressReleaseModel.js';
import careerModel from '../models/careerModel.js';
import { uploadFileToCloudinary, isCloudinaryReady } from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env'), override: true });

// 1. LATEST UPDATES DATA (from saniya-dogra/Zetawa PressRelease.jsx lines 533-750)
const LATEST_UPDATES_DATA = [
  {
    title: 'Bonus Announcement for Interns',
    date: '29-08-2025',
    description: 'We are pleased to announce a 10% bonus for all current interns. As part of our efforts to recognize and reward the hard work and dedication of our interns, Zetawa Dark Private Limited has approved a 10% bonus effective from 29-08-2025. The bonus will be disbursed accordingly in the current payment cycle.',
    sourceFile: 'Zetawa_dark_bonus.pdf'
  },
  {
    title: 'Internship Notice',
    date: 'August 2025',
    description: 'Join Our Dynamic Team - Internship Opportunities Available. We are excited to announce internship opportunities across various departments. Join us to gain valuable experience and contribute to our innovative projects.',
    sourceFile: 'internshipnotice.jpg'
  },
  {
    title: 'Board Resolution for FY24-25',
    date: 'FY 2024-25',
    description: 'Complete board resolution document for the financial year 2024-25, including all strategic decisions and corporate governance updates: Strategic Decisions & Approvals, Corporate Governance Updates, Financial Year Planning.',
    sourceFile: 'boardResolution.pdf'
  },
  {
    title: 'Sonam Wangchuk Internship',
    date: 'August 2025',
    description: 'Launch of the Sonam Wangchuk Internship Program. We are extremely proud to announce that Zetawa Dark Private Limited is launching the "SONAM WANGCHUK INTERNSHIP". Inspired by the vision of Sonam Wangchuk Sir and the fact that we are proud Alumni of NIT Srinagar. Our mission is simple – Using technology to solve real social problems.',
    sourceFile: 'SonamWangchukInternship.jpg'
  }
];

// 2. PRESS RELEASES DATA (from saniya-dogra/Zetawa PressRelease.jsx lines 16-41)
const PRESS_RELEASES_DATA = [
  {
    title: 'Viral Success Story - Company Achievement Goes Viral',
    date: 'August 27, 2025',
    type: 'Official Announcement',
    source: 'LinkedIn',
    year: 'FY2025',
    linkedinUrl: 'https://www.linkedin.com/posts/tabrez-alam-59b6b61b3_like-happy-viral-activity-7335224155493081088-lQ1n',
    content: 'Zetawa Dark milestone recognition and viral community engagement announcement celebrating team engineering achievements and company milestones.'
  },
  {
    title: 'Strategic Business Update and Company Activity',
    date: 'August 15, 2025',
    type: 'Business Update',
    source: 'LinkedIn',
    year: 'FY2025',
    linkedinUrl: 'https://www.linkedin.com/posts/tabrez-alam-59b6b61b3_activity-7274659404732346368-tjI6',
    content: 'Strategic operational expansion and technological capability updates across engineering squads and research labs.'
  },
  {
    title: 'Company Growth Milestone Announcement',
    date: 'August 10, 2025',
    type: 'Official Announcement',
    source: 'LinkedIn',
    year: 'FY2025',
    linkedinUrl: 'https://www.linkedin.com/posts/tabrez-alam-59b6b61b3_activity-7274659404732346368-tjI6',
    content: 'Formal milestone announcement marking growth, expanded client delivery capabilities, and successful deployment cycles.'
  }
];

// 3. CAREERS PORTAL DATA (from saniya-dogra/Zetawa Careers.jsx lines 19-95 & lines 340-418)
const CAREERS_DATA = [
  {
    title: '3D Animation',
    department: 'Technology',
    location: 'Remote',
    type: 'Full-time / Intern',
    experience: 'Freshers / 0-2 years',
    description: 'Create high-quality 3D animations and visual effects for digital media, games, and applications. Collaborate with designers and developers to bring creative concepts to life.',
    requirements: [
      "Bachelor's in Animation/Design or related field",
      'Strong skills in Blender, Maya, or 3ds Max',
      'Knowledge of texturing, rigging, and rendering',
      'Creative storytelling and visualization skills'
    ],
    applyLink: 'https://forms.gle/2gMcHVynaLx7Bei38'
  },
  {
    title: 'Android Developer',
    department: 'Analytics',
    location: 'Remote',
    type: 'Full-time / Intern',
    experience: 'Freshers / 0-2 years',
    description: 'Develop and maintain Android applications with a focus on performance, usability, and scalability. Work closely with product and design teams to deliver seamless user experiences.',
    requirements: [
      "Bachelor's in Computer Science/Engineering",
      'Proficiency in Java/Kotlin',
      'Experience with Android Studio and SDKs',
      'Understanding of REST APIs and mobile UI design'
    ],
    applyLink: 'https://forms.gle/2gMcHVynaLx7Bei38'
  },
  {
    title: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time / Intern',
    experience: 'Freshers / 0-2 years',
    description: 'Design user-centered interfaces and experiences across web and mobile platforms. Conduct research, wireframing, prototyping, and usability testing to improve product design.',
    requirements: [
      "Bachelor's in Design, HCI, or related field",
      'Proficiency in Figma, Adobe XD, or Sketch',
      'Experience with wireframes, prototypes, and user testing',
      'Strong portfolio demonstrating UX/UI design skills'
    ],
    applyLink: 'https://forms.gle/2gMcHVynaLx7Bei38'
  },
  {
    title: 'Software Developer',
    department: 'Strategy',
    location: 'Remote',
    type: 'Full-time / Intern',
    experience: 'Freshers / 0-2 years',
    description: 'Build, test, and deploy software applications across different platforms. Collaborate with teams to design efficient and scalable solutions.',
    requirements: [
      "Bachelor's in Computer Science/IT",
      'Proficiency in Java, Python, or C++',
      'Knowledge of databases (MySQL, MongoDB)',
      'Familiarity with Git and version control'
    ],
    applyLink: 'https://forms.gle/2gMcHVynaLx7Bei38'
  },
  {
    title: 'Machine Learning',
    department: 'Strategy',
    location: 'Remote',
    type: 'Full-time / Intern',
    experience: 'Freshers / 0-2 years',
    description: 'Develop and implement machine learning models for solving real-world problems. Work with large datasets to build predictive and analytical solutions.',
    requirements: [
      "Bachelor's/Master's in Computer Science, AI, or Data Science",
      'Strong programming skills in Python',
      'Experience with ML libraries like TensorFlow, PyTorch, or Scikit-learn',
      'Understanding of statistics and data preprocessing'
    ],
    applyLink: 'https://forms.gle/2gMcHVynaLx7Bei38'
  },
  {
    title: 'Certification Aptitude Test',
    department: 'Examinations & Certifications',
    location: 'Online Assessment',
    type: 'Qualification Test',
    experience: 'Open to Students & Freshers',
    description: 'Take our certification aptitude test to evaluate your skills and qualify for Zetawa certifications. Date: 22 March 2026 | Time: 11:00 AM IST.',
    requirements: [
      'Evaluate fundamental coding, logical reasoning, and domain aptitude',
      'Qualify for Zetawa verified corporate credentials and internship placement offers',
      'Conducted online — register via the official Google Form application'
    ],
    applyLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfzUllRkATkN6e9uRR25Fa2JoUgkcorcGOAJYzTtzMNOpYv7g/viewform'
  }
];

async function runMigration() {
  console.log('\n======================================================');
  console.log('🚀 Migrating Press Releases, Updates & Careers from saniya-dogra/Zetawa');
  console.log('======================================================\n');

  try {
    console.log('🔌 Connecting to MongoDB Atlas (mern-auth)...');
    await connectDB();
    console.log('✅ Connected to MongoDB Atlas\n');

    const cloudinaryReady = isCloudinaryReady();
    if (cloudinaryReady) {
      console.log('☁️  Cloudinary is configured and ready for file uploads.\n');
    } else {
      console.log('ℹ️  Cloudinary not configured; storing local uploads paths.\n');
    }

    const uploadsDir = path.join(__dirname, '..', 'uploads');

    // -----------------------------------------------------------------
    // 1. LATEST UPDATES (with uploaded documents)
    // -----------------------------------------------------------------
    console.log('📢 1. Processing Latest Updates & Document Attachments...');
    for (let i = 0; i < LATEST_UPDATES_DATA.length; i++) {
      const item = LATEST_UPDATES_DATA[i];
      const srcPath = path.join(uploadsDir, item.sourceFile);
      let fileUrl = `uploads/${item.sourceFile}`;

      if (fs.existsSync(srcPath) && cloudinaryReady) {
        // Create a temporary copy to upload, since uploadFileToCloudinary unlinks the file on success
        const tempPath = path.join(uploadsDir, `temp_${Date.now()}_${item.sourceFile}`);
        fs.copyFileSync(srcPath, tempPath);

        process.stdout.write(`   [${i + 1}/${LATEST_UPDATES_DATA.length}] Uploading ${item.sourceFile} to Cloudinary... `);
        const uploadRes = await uploadFileToCloudinary(tempPath, 'zetawa_documents');
        if (uploadRes.success && uploadRes.url) {
          fileUrl = uploadRes.url;
          console.log(`DONE ✅ (${fileUrl})`);
        } else {
          console.log(`RETAINED LOCAL (${uploadRes.message || 'Notice'})`);
        }
      }

      const updateDoc = {
        title: item.title,
        date: item.date,
        description: item.description,
        file: fileUrl
      };

      const existing = await latestUpdateModel.findOne({ title: item.title });
      if (existing) {
        await latestUpdateModel.updateOne({ _id: existing._id }, { $set: updateDoc });
        console.log(`   🔄 Updated Update: "${item.title}"`);
      } else {
        await latestUpdateModel.create(updateDoc);
        console.log(`   ✨ Inserted Update: "${item.title}"`);
      }
    }

    // -----------------------------------------------------------------
    // 2. PRESS RELEASES
    // -----------------------------------------------------------------
    console.log('\n📰 2. Processing Press Releases & LinkedIn Links...');
    for (const pr of PRESS_RELEASES_DATA) {
      const existing = await pressReleaseModel.findOne({ title: pr.title });
      if (existing) {
        await pressReleaseModel.updateOne(
          { _id: existing._id },
          { $set: { ...pr } }
        );
        console.log(`   🔄 Updated PR: "${pr.title}"`);
      } else {
        await pressReleaseModel.create(pr);
        console.log(`   ✨ Inserted PR: "${pr.title}"`);
      }
    }

    // -----------------------------------------------------------------
    // 3. CAREERS PORTAL DATA
    // -----------------------------------------------------------------
    console.log('\n💼 3. Processing Careers Portal Openings...');
    for (const job of CAREERS_DATA) {
      const existing = await careerModel.findOne({ title: job.title });
      if (existing) {
        await careerModel.updateOne(
          { _id: existing._id },
          { $set: { ...job } }
        );
        console.log(`   🔄 Updated Career: "${job.title}" (${job.department})`);
      } else {
        await careerModel.create(job);
        console.log(`   ✨ Inserted Career: "${job.title}" (${job.department})`);
      }
    }

    console.log('\n======================================================');
    console.log('🎉 Migration Completed Successfully!');
    console.log('======================================================');

    const totalUpdates = await latestUpdateModel.countDocuments();
    const totalPRs = await pressReleaseModel.countDocuments();
    const totalCareers = await careerModel.countDocuments();

    console.log(`  - Total Latest Updates in DB: ${totalUpdates}`);
    console.log(`  - Total Press Releases in DB: ${totalPRs}`);
    console.log(`  - Total Careers in DB:        ${totalCareers}`);
    console.log('======================================================\n');

  } catch (err) {
    console.error('❌ Migration Error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runMigration();
