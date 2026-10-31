import mongoose from 'mongoose';

// Certification & Aptitude Test Schema
const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  examDate: { type: Date, required: true },
  examTime: { type: String, required: true },
  mode: { type: String, default: "Online Proctored" },
  applyLink: { type: String, default: "https://docs.google.com/forms/d/e/1FAIpQLSfzUllRkATkN6e9uRR25Fa2JoUgkcorcGOAJYzTtzMNOpYv7g/viewform" },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Certification = mongoose.models.Certification || mongoose.model('Certification', certificationSchema);

export default Certification;
export { Certification };
