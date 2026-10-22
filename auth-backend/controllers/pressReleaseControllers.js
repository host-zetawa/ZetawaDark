import pressReleaseModel from "../models/pressReleaseModel.js"

export const DEFAULT_PRESS_RELEASES = [
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
  },
  {
    title: 'Zetawa Dark Expands Autonomous AI Infrastructure Solutions Across APAC',
    date: 'October 12, 2026',
    type: 'Official Announcement',
    source: 'Corporate Communications',
    year: 'FY2026',
    linkedinUrl: 'https://www.linkedin.com/company/zetawa-dark',
    content: 'Zetawa Dark announces expanded distributed compute architecture and high-availability enterprise AI deployment across the Asia-Pacific region.'
  },
  {
    title: 'Zetawa Dark Launches Next-Gen Cloud Optimization Engine',
    date: 'September 28, 2026',
    type: 'Business Update',
    source: 'Engineering Press Office',
    year: 'FY2026',
    linkedinUrl: 'https://www.linkedin.com/company/zetawa-dark',
    content: 'Revolutionary cloud telemetry tool reduces infrastructure overhead by up to 40% for enterprise Kubernetes workloads.'
  },
  {
    title: 'Zetawa Dark Achieves ISO/IEC 27001 Certification for Information Security',
    date: 'August 15, 2026',
    type: 'Official Announcement',
    source: 'Compliance & Legal',
    year: 'FY2026',
    linkedinUrl: 'https://www.linkedin.com/company/zetawa-dark',
    content: 'Global certification audit confirms stringent data protection and enterprise-grade security compliance across all Zetawa platforms.'
  }
];

// Get all press releases (auto-seeds defaults if empty)
export const getPressReleases = async (req, res) => {
  try {
    const { year } = req.query
    const filter = year && year !== 'ALL' ? { year } : {}
    let releases = await pressReleaseModel.find(filter).sort({ createdAt: -1 })
    
    if ((!releases || releases.length === 0) && (!year || year === 'ALL')) {
      releases = await pressReleaseModel.insertMany(DEFAULT_PRESS_RELEASES)
    }
    res.json({ success: true, count: releases.length, data: releases })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Reset press releases to defaults (admin utility)
export const resetDefaultPressReleases = async (req, res) => {
  try {
    await pressReleaseModel.deleteMany({})
    const releases = await pressReleaseModel.insertMany(DEFAULT_PRESS_RELEASES)
    return res.json({
      success: true,
      message: 'Press releases reset to predefined defaults',
      count: releases.length,
      data: releases
    })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

// Create press release (admin only)
export const createPressRelease = async (req, res) => {
  const { title, date, type, source, linkedinUrl, year, content } = req.body
  if (!title || !date || !year) {
    return res.json({ success: false, message: 'Title, date, and year are required' })
  }
  try {
    const release = new pressReleaseModel({ title, date, type, source, linkedinUrl, year, content })
    await release.save()
    res.json({ success: true, data: release, message: 'Press release created' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Update press release (admin only)
export const updatePressRelease = async (req, res) => {
  const { id } = req.params
  const { title, date, type, source, linkedinUrl, year, content } = req.body
  try {
    const release = await pressReleaseModel.findByIdAndUpdate(
      id,
      { title, date, type, source, linkedinUrl, year, content },
      { new: true }
    )
    if (!release) {
      return res.json({ success: false, message: 'Press release not found' })
    }
    res.json({ success: true, data: release, message: 'Press release updated' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Delete press release (admin only)
export const deletePressRelease = async (req, res) => {
  const { id } = req.params
  try {
    const release = await pressReleaseModel.findByIdAndDelete(id)
    if (!release) {
      return res.json({ success: false, message: 'Press release not found' })
    }
    res.json({ success: true, message: 'Press release deleted' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
