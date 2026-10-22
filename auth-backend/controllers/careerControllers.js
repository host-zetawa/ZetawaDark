import careerModel from "../models/careerModel.js"

const DEFAULT_APPLY_LINK = 'https://docs.google.com/forms/d/e/1FAIpQLSfzUllRkATkN6e9uRR25Fa2JoUgkcorcGOAJYzTtzMNOpYv7g/viewform';

const SANIYA_APPLY_LINK = 'https://forms.gle/2gMcHVynaLx7Bei38';

export const DEFAULT_CAREERS = [
  {
    title: "3D Animation",
    department: "Technology",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 years",
    description: "Create high-quality 3D animations and visual effects for digital media, games, and applications. Collaborate with designers and developers to bring creative concepts to life.",
    requirements: [
      "Bachelor's in Animation/Design or related field",
      "Strong skills in Blender, Maya, or 3ds Max",
      "Knowledge of texturing, rigging, and rendering",
      "Creative storytelling and visualization skills"
    ],
    applyLink: SANIYA_APPLY_LINK
  },
  {
    title: "Android Developer",
    department: "Analytics",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 years",
    description: "Develop and maintain Android applications with a focus on performance, usability, and scalability. Work closely with product and design teams to deliver seamless user experiences.",
    requirements: [
      "Bachelor's in Computer Science/Engineering",
      "Proficiency in Java/Kotlin",
      "Experience with Android Studio and SDKs",
      "Understanding of REST APIs and mobile UI design"
    ],
    applyLink: SANIYA_APPLY_LINK
  },
  {
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 years",
    description: "Design user-centered interfaces and experiences across web and mobile platforms. Conduct research, wireframing, prototyping, and usability testing to improve product design.",
    requirements: [
      "Bachelor's in Design, HCI, or related field",
      "Proficiency in Figma, Adobe XD, or Sketch",
      "Experience with wireframes, prototypes, and user testing",
      "Strong portfolio demonstrating UX/UI design skills"
    ],
    applyLink: SANIYA_APPLY_LINK
  },
  {
    title: "Software Developer",
    department: "Strategy",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 years",
    description: "Build, test, and deploy software applications across different platforms. Collaborate with teams to design efficient and scalable solutions.",
    requirements: [
      "Bachelor's in Computer Science/IT",
      "Proficiency in Java, Python, or C++",
      "Knowledge of databases (MySQL, MongoDB)",
      "Familiarity with Git and version control"
    ],
    applyLink: SANIYA_APPLY_LINK
  },
  {
    title: "Machine Learning",
    department: "Strategy",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 years",
    description: "Develop and implement machine learning models for solving real-world problems. Work with large datasets to build predictive and analytical solutions.",
    requirements: [
      "Bachelor’s/Master’s in Computer Science, AI, or Data Science",
      "Strong programming skills in Python",
      "Experience with ML libraries like TensorFlow, PyTorch, or Scikit-learn",
      "Understanding of statistics and data preprocessing"
    ],
    applyLink: SANIYA_APPLY_LINK
  },
  {
    title: "Certification Aptitude Test",
    department: "Examinations & Certifications",
    location: "Online Assessment",
    type: "Qualification Test",
    experience: "Open to Students & Freshers",
    description: "Take our certification aptitude test to evaluate your skills and qualify for Zetawa certifications. Date: 22 March 2026 | Time: 11:00 AM IST.",
    requirements: [
      "Evaluate fundamental coding, logical reasoning, and domain aptitude",
      "Qualify for Zetawa verified corporate credentials and internship placement offers",
      "Conducted online — register via the official Google Form application"
    ],
    applyLink: DEFAULT_APPLY_LINK
  },
  {
    title: "Full-Stack Software Engineer (React / Node.js)",
    department: "Engineering",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 Years",
    description: "Design and build responsive web applications, robust REST/GraphQL APIs, and scalable distributed backends. Collaborate directly with senior leads in agile 2-week sprints.",
    requirements: [
      "Proficiency in JavaScript/TypeScript, React or Next.js, and Node.js",
      "Understanding of relational databases (PostgreSQL/MySQL) or MongoDB",
      "Experience with Git version control and modern web architectures",
      "Passionate about clean code, test coverage, and product velocity"
    ],
    applyLink: DEFAULT_APPLY_LINK
  },
  {
    title: "AI & Machine Learning Engineer",
    department: "AI & Intelligence",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 Years",
    description: "Develop custom LLM agents, vector RAG pipelines, and intelligent workflow automations using modern Python frameworks and API integrations.",
    requirements: [
      "Strong Python programming skills and familiarity with FastAPI",
      "Experience with OpenAI APIs, LangChain, or Hugging Face models",
      "Understanding of vector databases (Pinecone, Chroma, pgvector)",
      "Curiosity for autonomous agent workflows and prompt engineering"
    ],
    applyLink: DEFAULT_APPLY_LINK
  },
  {
    title: "UI/UX Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 Years",
    description: "Craft pixel-perfect user interfaces, interactive Figma prototypes, and comprehensive design systems that deliver frictionless user experiences.",
    requirements: [
      "Expertise in Figma, wireframing, and interactive prototyping",
      "Strong understanding of visual hierarchy, typography, and design tokens",
      "Knowledge of responsive design and WCAG accessibility standards",
      "Portfolio showcasing web or mobile product design projects"
    ],
    applyLink: DEFAULT_APPLY_LINK
  },
  {
    title: "Mobile App Developer (React Native / Flutter)",
    department: "Engineering",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 Years",
    description: "Build fluid, cross-platform mobile apps for iOS and Android with smooth animations, offline capabilities, and seamless API integrations.",
    requirements: [
      "Hands-on experience with React Native or Flutter",
      "Familiarity with native device APIs, state management, and push notifications",
      "Understanding of app store deployment guidelines (Play Store & App Store)",
      "Strong problem-solving and debugging skills"
    ],
    applyLink: DEFAULT_APPLY_LINK
  },
  {
    title: "Cloud DevOps & Infrastructure Engineer",
    department: "Cloud & DevOps",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 Years",
    description: "Maintain cloud environments, build automated CI/CD pipelines, containerize applications with Docker, and ensure 99.9% uptime reliability.",
    requirements: [
      "Familiarity with Linux environments, Docker, and CI/CD tools (GitHub Actions)",
      "Basic knowledge of cloud providers (AWS, GCP, or DigitalOcean)",
      "Understanding of networking, SSL/TLS, and security best practices",
      "Interest in infrastructure-as-code and automated deployment scaling"
    ],
    applyLink: DEFAULT_APPLY_LINK
  },
  {
    title: "Zetawa Fellowship & Software Intern",
    department: "Internships & Fellowship",
    location: "Remote",
    type: "Internship (3-6 Months)",
    experience: "Students / Freshers",
    description: "Intensive hands-on engineering fellowship program where you build live production features under dedicated mentorship with verified certificate of excellence.",
    requirements: [
      "Enthusiastic computer science or engineering student / recent graduate",
      "Foundational coding knowledge in JavaScript, Python, or Web Tech",
      "Eagerness to learn agile team ceremonies and production workflows",
      "Opportunity for full-time pre-placement offers (PPO) upon completion"
    ],
    applyLink: DEFAULT_APPLY_LINK
  }
];

// Helper to sanitize arrays (requirements)
const sanitizeArray = (val) => {
  if (Array.isArray(val)) return val.map(s => String(s).trim()).filter(Boolean);
  if (typeof val === 'string') {
    const separator = val.includes('\n') ? '\n' : ',';
    return val.split(separator).map(s => s.trim()).filter(Boolean);
  }
  return [];
};

// Get all careers (public) - auto-seed defaults if collection is empty
export const getCareers = async (req, res) => {
  try {
    let careers = await careerModel.find().sort({ createdAt: -1 });
    if (!careers || careers.length === 0) {
      careers = await careerModel.insertMany(DEFAULT_CAREERS);
    }
    res.json({ success: true, count: careers.length, data: careers });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Create career (admin only)
export const createCareer = async (req, res) => {
  const { title, department, location, type, experience, description, requirements, applyLink } = req.body;
  if (!title) {
    return res.json({ success: false, message: 'Job role is required' });
  }
  try {
    const career = new careerModel({
      title: title.trim(),
      department: department ? department.trim() : 'Engineering',
      location: location ? location.trim() : 'Remote',
      type: type ? type.trim() : 'Full-time',
      experience: experience ? experience.trim() : 'Freshers / 0-2 Years',
      description: description ? description.trim() : '',
      requirements: sanitizeArray(requirements),
      applyLink: applyLink ? applyLink.trim() : DEFAULT_APPLY_LINK
    });
    await career.save();
    res.json({ success: true, data: career, message: 'Career opportunity created' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update career (admin only)
export const updateCareer = async (req, res) => {
  const { id } = req.params;
  const { title, department, location, type, experience, description, requirements, applyLink } = req.body;
  try {
    const updatePayload = {};
    if (title !== undefined) updatePayload.title = title.trim();
    if (department !== undefined) updatePayload.department = department.trim();
    if (location !== undefined) updatePayload.location = location.trim();
    if (type !== undefined) updatePayload.type = type.trim();
    if (experience !== undefined) updatePayload.experience = experience.trim();
    if (description !== undefined) updatePayload.description = description.trim();
    if (requirements !== undefined) updatePayload.requirements = sanitizeArray(requirements);
    if (applyLink !== undefined) updatePayload.applyLink = applyLink.trim();

    const career = await careerModel.findByIdAndUpdate(
      id,
      updatePayload,
      { new: true, runValidators: true }
    );
    if (!career) {
      return res.json({ success: false, message: 'Career opportunity not found' });
    }
    res.json({ success: true, data: career, message: 'Career opportunity updated' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete career (admin only)
export const deleteCareer = async (req, res) => {
  const { id } = req.params;
  try {
    const career = await careerModel.findById(id);
    if (!career) {
      return res.json({ success: false, message: 'Career opportunity not found' });
    }
    await careerModel.findByIdAndDelete(id);
    res.json({ success: true, message: 'Career opportunity deleted' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Reset careers to defaults (admin utility)
export const resetDefaultCareers = async (req, res) => {
  try {
    await careerModel.deleteMany({});
    const careers = await careerModel.insertMany(DEFAULT_CAREERS);
    return res.json({
      success: true,
      message: 'Careers reset to predefined defaults',
      count: careers.length,
      data: careers
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
