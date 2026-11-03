import mongoose from 'mongoose';

// Certification & Aptitude Test Schema
const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  examDate: { type: mongoose.Schema.Types.Mixed, default: () => new Date() },
  examTime: { type: String, default: "11:00 AM IST" },
  mode: { type: String, default: "Online Proctored" },
  applyLink: { type: String, default: "https://docs.google.com/forms/d/e/1FAIpQLSfzUllRkATkN6e9uRR25Fa2JoUgkcorcGOAJYzTtzMNOpYv7g/viewform" },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

delete mongoose.models.Certification;
const Certification = mongoose.model('Certification', certificationSchema);

export default Certification;
export { Certification };
