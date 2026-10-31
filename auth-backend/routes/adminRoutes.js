import express from 'express';
import { Certification } from '../models/Certification.js';
import { Announcement } from '../models/Announcement.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

export const DEFAULT_CERTIFICATIONS = [
  {
    title: 'Certification Aptitude Test',
    description: 'Take our certification aptitude test to evaluate your skills, benchmark your core technical foundations, and qualify for verified Zetawa certifications and fellowship placements.',
    examDate: new Date('2026-03-22T05:30:00.000Z'),
    examTime: '11:00 AM IST',
    mode: 'Online Proctored',
    applyLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfzUllRkATkN6e9uRR25Fa2JoUgkcorcGOAJYzTtzMNOpYv7g/viewform',
    isActive: true
  }
];

export const DEFAULT_ANNOUNCEMENTS = [
  {
    title: 'Zetawa Dark Expands Autonomous AI Infrastructure Solutions Across APAC',
    category: 'Announcement',
    content: 'Zetawa Dark announces expanded distributed compute architecture and high-availability enterprise AI deployment across the Asia-Pacific region, enabling sub-millisecond neural agent orchestration.',
    publishedDate: new Date('2026-10-12T00:00:00.000Z')
  },
  {
    title: 'Zetawa Dark Launches Next-Gen Cloud Optimization Engine',
    category: 'Milestone',
    content: 'Revolutionary cloud telemetry and resource scheduling tool reduces infrastructure overhead by up to 40% for enterprise Kubernetes workloads and multi-region deployments.',
    publishedDate: new Date('2026-09-28T00:00:00.000Z')
  },
  {
    title: 'Zetawa Dark Achieves ISO/IEC 27001 Certification for Information Security',
    category: 'Milestone',
    content: 'Global certification audit confirms stringent data protection, end-to-end cryptographic integrity, and enterprise-grade security compliance across all Zetawa platform infrastructure.',
    publishedDate: new Date('2026-08-15T00:00:00.000Z')
  },
  {
    title: 'Viral Success Story - Team Engineering Achievement Goes Viral',
    category: 'Culture',
    content: 'Zetawa Dark culture and team engineering milestones celebrate viral community engagement across developer networks, highlighting student fellowship innovations and technical mentoring.',
    publishedDate: new Date('2025-08-27T00:00:00.000Z')
  },
  {
    title: 'Zetawa Innovation Fellowship & Sustainable Tech Initiative',
    category: 'Culture',
    content: 'Hands-on experiential learning program fostering climate-resilient computing and hardware-software optimization fellowship opportunities for outstanding engineering scholars.',
    publishedDate: new Date('2025-08-20T00:00:00.000Z')
  },
  {
    title: 'Strategic Engineering Squad Expansion & Research Labs Update',
    category: 'Announcement',
    content: 'Operational expansion and new distributed squad launches focused on high-throughput backend systems, resilient API microservices, and AI-assisted pair programming architectures.',
    publishedDate: new Date('2025-08-10T00:00:00.000Z')
  }
];

// Seed helper function
export const seedDefaultsIfEmpty = async () => {
  try {
    const certCount = await Certification.countDocuments();
    if (certCount === 0) {
      await Certification.insertMany(DEFAULT_CERTIFICATIONS);
      console.log('🌱 Seeded default Certifications & Aptitude Tests into MongoDB');
    } else {
      await Certification.updateMany(
        { applyLink: { $exists: false } },
        { $set: { applyLink: DEFAULT_CERTIFICATIONS[0].applyLink } }
      );
    }

    const annCount = await Announcement.countDocuments();
    if (annCount === 0) {
      await Announcement.insertMany(DEFAULT_ANNOUNCEMENTS);
      console.log('🌱 Seeded default Announcements & News into MongoDB');
    }
  } catch (err) {
    console.error('Error auto-seeding admin data:', err.message);
  }
};

// ==========================================
// --- CERTIFICATIONS & TESTS CRUD ---
// ==========================================

// Public: Get all active Certifications / Tests (with optional ?all=true for admin)
router.get('/certifications', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const tests = await Certification.find(filter).sort({ examDate: 1 });
    res.status(200).json({ success: true, count: tests.length, data: tests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin: Create Certification / Test
router.post('/certifications', adminAuth, async (req, res) => {
  try {
    const newTest = new Certification(req.body);
    const savedTest = await newTest.save();
    res.status(201).json({ success: true, data: savedTest });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin: Update Certification / Test
router.put('/certifications/:id', adminAuth, async (req, res) => {
  try {
    const updatedTest = await Certification.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { returnDocument: 'after', runValidators: true }
    );
    if (!updatedTest) {
      return res.status(404).json({ success: false, message: "Certification not found" });
    }
    res.status(200).json({ success: true, data: updatedTest });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin: Delete Certification / Test
router.delete('/certifications/:id', adminAuth, async (req, res) => {
  try {
    const deleted = await Certification.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Certification not found" });
    }
    res.status(200).json({ success: true, message: "Certification/Test deleted successfully." });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Utility: Reset Default Certifications
router.post('/certifications/reset-defaults', adminAuth, async (req, res) => {
  try {
    await Certification.deleteMany({});
    const inserted = await Certification.insertMany(DEFAULT_CERTIFICATIONS);
    res.status(200).json({ success: true, message: "Certifications reset to defaults", data: inserted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// ==========================================
// --- NEWS & ANNOUNCEMENTS CRUD ---
// ==========================================

// Public: Get all Announcements (optionally filter by ?category=...)
router.get('/announcements', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && ['Announcement', 'Milestone', 'Culture'].includes(req.query.category)) {
      filter.category = req.query.category;
    }
    const posts = await Announcement.find(filter).sort({ publishedDate: -1, createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin: Create Announcement
router.post('/announcements', adminAuth, async (req, res) => {
  try {
    const newPost = new Announcement(req.body);
    const savedPost = await newPost.save();
    res.status(201).json({ success: true, data: savedPost });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin: Update Announcement
router.put('/announcements/:id', adminAuth, async (req, res) => {
  try {
    const updatedPost = await Announcement.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { returnDocument: 'after', runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    res.status(200).json({ success: true, data: updatedPost });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin: Delete Announcement
router.delete('/announcements/:id', adminAuth, async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    res.status(200).json({ success: true, message: "Announcement deleted successfully." });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Utility: Reset Default Announcements
router.post('/announcements/reset-defaults', adminAuth, async (req, res) => {
  try {
    await Announcement.deleteMany({});
    const inserted = await Announcement.insertMany(DEFAULT_ANNOUNCEMENTS);
    res.status(200).json({ success: true, message: "Announcements reset to defaults", data: inserted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
