import mongoose from 'mongoose';

// News & Announcements Schema (Replacing Press Releases)
const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Announcement', 'Milestone', 'Culture'], 
    required: true 
  },
  content: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);

export default Announcement;
export { Announcement };
