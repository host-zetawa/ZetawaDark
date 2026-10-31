import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  ArrowRight, 
  Mail, 
  Phone, 
  Briefcase, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Palette, 
  Cloud, 
  ShieldCheck, 
  ExternalLink,
  Zap,
  GraduationCap
} from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
import { useAppContext } from '../context/AppContext';
import AuthModal from './AuthModal';
import Background3D from './Background3D';

const DEFAULT_APPLY_LINK = 'https://docs.google.com/forms/d/e/1FAIpQLSfzUllRkATkN6e9uRR25Fa2JoUgkcorcGOAJYzTtzMNOpYv7g/viewform';
const SANIYA_APPLY_LINK = 'https://forms.gle/2gMcHVynaLx7Bei38';

const DEFAULT_JOB_OPENINGS = [
  {
    _id: "saniya-job-1",
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
    _id: "saniya-job-2",
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
    _id: "saniya-job-3",
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
    _id: "saniya-job-4",
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
    _id: "saniya-job-5",
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
    _id: "job-1",
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
    _id: "job-2",
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
    _id: "job-3",
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
    _id: "job-4",
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
    _id: "job-5",
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
    _id: "job-6",
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

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isAuth } = useAppContext();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingApplyLink, setPendingApplyLink] = useState(null);

  // Dynamic Aptitude Test & Certification state
  const [aptitudeTest, setAptitudeTest] = useState({
    title: 'Certification Aptitude Test',
    description: 'Take our certification aptitude test to evaluate your skills, benchmark your core technical foundations, and qualify for verified Zetawa certifications and fellowship placements.',
    examDate: '2026-03-22',
    examTime: '11:00 AM IST',
    mode: 'Online Proctored',
    isActive: true
  });

  const formatUrl = (url) => {
    if (!url) return DEFAULT_APPLY_LINK;
    const trimmed = String(url).trim();
    if (!trimmed) return DEFAULT_APPLY_LINK;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const formatExamDate = (dateVal) => {
    if (!dateVal) return '22 March 2026';
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return String(dateVal);
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return String(dateVal);
    }
  };

  const handleApplyClick = (link) => {
    const targetLink = formatUrl(link);
    if (isAuth) {
      window.open(targetLink, '_blank', 'noopener,noreferrer');
    } else {
      setPendingApplyLink(targetLink);
      setShowAuthModal(true);
    }
  };

  const handleApplyForTest = () => {
    const testFormLink = aptitudeTest.applyLink || "https://docs.google.com/forms/d/e/1FAIpQLSfzUllRkATkN6e9uRR25Fa2JoUgkcorcGOAJYzTtzMNOpYv7g/viewform";
    if (isAuth) {
      window.open(testFormLink, '_blank', 'noopener,noreferrer');
    } else {
      setPendingApplyLink(testFormLink);
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    const targetLink = formatUrl(pendingApplyLink);
    window.open(targetLink, '_blank', 'noopener,noreferrer');
    setPendingApplyLink(null);
  };

  useEffect(() => {
    // 1. Fetch Open Roles
    fetch('/api/careers')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setJobs(data.data);
        } else {
          setJobs(DEFAULT_JOB_OPENINGS);
        }
      })
      .catch(err => {
        console.error('Failed to fetch careers:', err);
        setJobs(DEFAULT_JOB_OPENINGS);
      })
      .finally(() => setLoading(false));

    // 2. Fetch Active Certification / Aptitude Test
    fetch('/api/certifications')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const test = data.data[0];
          setAptitudeTest({
            title: test.title,
            description: test.description,
            examDate: test.examDate,
            examTime: test.examTime,
            mode: test.mode || 'Online Proctored',
            applyLink: test.applyLink || '',
            isActive: test.isActive !== false
          });
        }
      })
      .catch(err => console.error('Failed to fetch certifications/tests:', err));
  }, []);

  const departments = [
    { id: 'all', label: 'All Openings' },
    { id: 'Engineering', label: 'Engineering' },
    { id: 'AI & Intelligence', label: 'AI & Intelligence' },
    { id: 'Design', label: 'Design & UI/UX' },
    { id: 'Cloud & DevOps', label: 'Cloud & DevOps' },
    { id: 'Internships & Fellowship', label: 'Fellowships & Interns' }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesDept = activeCategory === 'all' || 
      (job.department && job.department.toLowerCase().includes(activeCategory.toLowerCase()));
    
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesDept;
    
    const matchesSearch = 
      (job.title && job.title.toLowerCase().includes(q)) ||
      (job.department && job.department.toLowerCase().includes(q)) ||
      (job.description && job.description.toLowerCase().includes(q)) ||
      (job.location && job.location.toLowerCase().includes(q)) ||
      (Array.isArray(job.requirements) && job.requirements.some(r => r.toLowerCase().includes(q)));
      
    return matchesDept && matchesSearch;
  });

  return (
    <div style={{
      fontFamily: 'var(--font-family, "Plus Jakarta Sans", system-ui, sans-serif)',
      backgroundColor: 'var(--bg)',
      minHeight: '100vh',
      color: 'var(--text)'
    }}>
      <Nav />
      <style>{`
        .careers-category-scroll {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 0.35rem;
        }

        .careers-category-scroll::-webkit-scrollbar {
          display: none;
        }

        .careers-category-scroll button {
          scroll-snap-align: start;
          flex-shrink: 0;
          min-height: 40px;
          touch-action: manipulation;
        }

        @media (max-width: 768px) {
          .hero-trust-strip {
            flex-direction: column !important;
            border-radius: 20px !important;
            padding: 1.25rem 1rem !important;
            gap: 0.75rem !important;
            width: 100% !important;
            max-width: 480px !important;
            margin: 0 auto !important;
          }
          .hero-trust-strip .strip-divider {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .careers-resume-cta {
            width: 100% !important;
            padding: 0.9rem 1.25rem !important;
            font-size: 0.95rem !important;
            min-height: 48px !important;
            justify-content: center !important;
            white-space: normal !important;
            line-height: 1.35 !important;
            box-sizing: border-box !important;
            touch-action: manipulation !important;
          }
        }
      `}</style>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => { setShowAuthModal(false); setPendingApplyLink(null); }} 
        onSuccess={handleAuthSuccess} 
      />

      {/* ──────── Hero Header ──────── */}
      <section style={{
        background: 'var(--bg-hero)',
        color: 'var(--hero-text)',
        padding: 'clamp(3rem, 6vw, 5.5rem) clamp(1rem, 4vw, 1.5rem) clamp(3rem, 6vw, 5rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)'
      }}>
        <Background3D />
        {/* Glow ambient background */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(217, 107, 20, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--hero-badge-bg)',
            border: '1px solid var(--hero-badge-border)',
            color: 'var(--hero-badge-text)',
            padding: '0.4rem 1.25rem',
            borderRadius: '50px',
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: '1.25rem',
            backdropFilter: 'blur(8px)'
          }}>
            <Sparkles size={16} /> WORK WITH PURPOSE AT ZETAWA DARK
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5.5vw, 3.4rem)',
            fontWeight: 800,
            marginBottom: '1.25rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            textWrap: 'balance',
            color: 'var(--hero-text)'
          }}>
            Build Exceptional Software. <br />
            <span style={{
              background: 'var(--hero-title-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Grow Without Limits.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            color: 'var(--hero-text-muted)',
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.65
          }}>
            We are an ambitious team of engineers, designers, and AI specialists building production systems and next-gen tools for fast-growing companies. Join us to ship high-impact code.
          </p>

          {/* Quick Perks Strip */}
          <div className="hero-trust-strip" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(1rem, 2.5vw, 2.5rem)',
            padding: '1rem clamp(1.25rem, 3vw, 2.5rem)',
            background: 'var(--hero-trust-bg)',
            backdropFilter: 'blur(16px)',
            borderRadius: '50px',
            border: '1px solid var(--hero-trust-border)',
            flexWrap: 'wrap',
            maxWidth: '100%',
            boxSizing: 'border-box',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--hero-trust-val)' }}>100% Remote</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--hero-trust-lbl)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Async &amp; Flexible</div>
            </div>
            <div className="strip-divider" style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--hero-trust-val)' }}>Fast Sprints</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--hero-trust-lbl)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>2-Week Iterations</div>
            </div>
            <div className="strip-divider" style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--hero-trust-val)' }}>Real Ownership</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--hero-trust-lbl)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Direct Production Code</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── Open Positions Explorer ──────── */}
      <section style={{ padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1rem, 3vw, 1.5rem)', maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Certification Aptitude Test Featured Card */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: '24px',
          padding: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '3.5rem',
          border: '1.5px solid rgba(242, 140, 40, 0.35)',
          boxShadow: '0 12px 35px -8px rgba(242, 140, 40, 0.15)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.1rem',
            backgroundColor: 'rgba(242, 140, 40, 0.12)',
            borderRadius: '50px',
            color: 'var(--accent-orange, #f28c28)',
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            marginBottom: '1rem'
          }}>
            <Sparkles size={16} /> Official Examination
          </div>

          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 800,
            color: 'var(--text-primary, #1e293b)',
            marginBottom: '0.85rem',
            letterSpacing: '-0.02em'
          }}>
            {aptitudeTest.title}
          </h2>

          <p style={{
            color: 'var(--text-secondary, #64748b)',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            maxWidth: '680px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.65
          }}>
            {aptitudeTest.description}
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.5rem',
            backgroundColor: 'var(--bg-canvas, #f8fafc)',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border-default, #e2e8f0)',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            color: 'var(--text-primary, #1e293b)',
            fontWeight: 600,
            fontSize: '0.95rem'
          }}>
            <span>📅 <strong>Date:</strong> {formatExamDate(aptitudeTest.examDate)}</span>
            <span style={{ color: 'var(--border-default, #cbd5e1)' }}>|</span>
            <span>⏰ <strong>Time:</strong> {aptitudeTest.examTime}</span>
            <span style={{ color: 'var(--border-default, #cbd5e1)' }}>|</span>
            <span>🌐 <strong>Mode:</strong> {aptitudeTest.mode}</span>
          </div>

          <div>
            <button
              onClick={handleApplyForTest}
              style={{
                backgroundColor: 'var(--accent-orange, #f28c28)',
                color: '#ffffff',
                border: 'none',
                padding: '0.95rem 2.25rem',
                borderRadius: '12px',
                fontSize: '1.05rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 20px rgba(242, 140, 40, 0.35)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-orange-hover, #e07b18)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-orange, #f28c28)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Apply For Test</span>
              <ExternalLink size={18} />
            </button>
          </div>
        </div>

        {/* Section Title & Search */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(242, 140, 40, 0.1)',
              color: 'var(--accent-orange, #f28c28)',
              border: '1px solid rgba(242, 140, 40, 0.25)',
              padding: '0.35rem 0.9rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              <Briefcase size={14} /> CURRENT OPPORTUNITIES
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary, #1e293b)', margin: 0, textWrap: 'balance', letterSpacing: '-0.02em' }}>
              Open Roles &amp; Fellowships
            </h2>
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', minWidth: 'min(100%, 220px)', flex: '1', maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by role title or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.4rem',
                borderRadius: '12px',
                border: '1px solid var(--border-default, #e2e8f0)',
                fontSize: '0.92rem',
                outline: 'none',
                backgroundColor: 'var(--bg-surface, #ffffff)',
                color: 'var(--text-primary, #1e293b)',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent-orange, #f28c28)';
                e.target.style.boxShadow = '0 0 0 3px rgba(242, 140, 40, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-default, #e2e8f0)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Category Pills (Horizontally scrollable on mobile) */}
        <div className="careers-category-scroll" style={{ marginBottom: '2.5rem' }}>
          {departments.map(dept => (
            <button
              key={dept.id}
              onClick={() => setActiveCategory(dept.id)}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '50px',
                border: activeCategory === dept.id ? '1.5px solid var(--accent-orange, #f28c28)' : '1px solid var(--border-default, #e2e8f0)',
                backgroundColor: activeCategory === dept.id ? 'var(--brand-maroon, #6b2d3a)' : 'var(--bg-surface, #ffffff)',
                color: activeCategory === dept.id ? '#ffffff' : 'var(--text-secondary, #475569)',
                fontSize: '0.88rem',
                fontWeight: activeCategory === dept.id ? 700 : 600,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: activeCategory === dept.id ? '0 4px 14px rgba(107, 45, 58, 0.25)' : 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                minHeight: '40px'
              }}
            >
              {dept.label}
            </button>
          ))}
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--bg-surface, #ffffff)', borderRadius: '16px', border: '1px solid var(--border-subtle, #eee)' }}>
            <div style={{ display: 'inline-block', width: '36px', height: '36px', border: '3px solid #f3e8e9', borderTop: '3px solid var(--brand-maroon, #6b2d3a)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--text-muted, #777)', marginTop: '1rem', fontWeight: 600 }}>Loading active positions...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div style={{
            background: 'var(--bg-surface, #ffffff)',
            borderRadius: '20px',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px dashed var(--border-default, #d5c8ca)'
          }}>
            <Briefcase size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary, #1e293b)', marginBottom: '0.5rem' }}>
              No Openings Found
            </h3>
            <p style={{ color: 'var(--text-secondary, #64748b)', fontSize: '0.95rem', maxWidth: '460px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
              We don&apos;t currently have an open position matching your exact filter, but we are always eager to meet talented developers and creators.
            </p>
            <a
              href="mailto:director@zetawa.com?subject=General%20Application%20-%20Zetawa%20Dark"
              style={{
                backgroundColor: 'var(--brand-maroon, #6b2d3a)',
                color: 'white',
                padding: '0.85rem 1.75rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(107, 45, 58, 0.25)'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--brand-maroon-hover, #55222d)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--brand-maroon, #6b2d3a)'; }}
            >
              <Mail size={16} /> Send General Application
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.75rem' }}>
            {filteredJobs.map((job) => {
              const requirements = Array.isArray(job.requirements) ? job.requirements : [];

              return (
                <div
                  key={job._id}
                  style={{
                    backgroundColor: 'var(--bg-surface, #ffffff)',
                    borderRadius: '20px',
                    border: '1px solid var(--border-default, #e8e0e2)',
                    padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    height: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(42, 16, 25, 0.09)';
                    e.currentTarget.style.borderColor = 'rgba(242, 140, 40, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.03)';
                    e.currentTarget.style.borderColor = 'var(--border-default, #e8e0e2)';
                  }}
                >
                  <div>
                    {/* Consistent Top Tag Meta Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      <span style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(242, 140, 40, 0.1)',
                        color: 'var(--accent-orange, #f28c28)',
                        border: '1px solid rgba(242, 140, 40, 0.25)'
                      }}>
                        {job.department || 'Engineering'}
                      </span>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <span style={{
                          padding: '0.3rem 0.65rem',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: 'var(--bg-canvas, #f8fafc)',
                          color: 'var(--text-secondary, #475569)',
                          border: '1px solid var(--border-subtle, #e2e8f0)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <MapPin size={12} /> {job.location || 'Remote'}
                        </span>
                        <span style={{
                          padding: '0.3rem 0.65rem',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: 'var(--bg-canvas, #f8fafc)',
                          color: 'var(--text-secondary, #475569)',
                          border: '1px solid var(--border-subtle, #e2e8f0)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <Clock size={12} /> {job.type || 'Full-time'}
                        </span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary, #1e293b)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                      {job.title}
                    </h3>

                    {job.experience && (
                      <p style={{ color: 'var(--brand-maroon, #6b2d3a)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.85rem' }}>
                        Experience: {job.experience}
                      </p>
                    )}

                    <p style={{ color: 'var(--text-secondary, #64748b)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {job.description}
                    </p>

                    {/* Requirements / Key Points */}
                    {requirements.length > 0 && (
                      <div style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-canvas, #faf8f9)', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-subtle, #f0e6e8)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-orange, #f28c28)', textTransform: 'uppercase', marginBottom: '0.6rem', letterSpacing: '0.5px' }}>
                          Key Qualifications:
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          {requirements.map((req, rIdx) => (
                            <li key={rIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--text-primary, #334155)' }}>
                              <CheckCircle2 size={15} style={{ color: 'var(--accent-orange, #f28c28)', flexShrink: 0, marginTop: '2px' }} />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Apply Button (Pinned to Bottom) */}
                  <div style={{ borderTop: '1px solid var(--border-subtle, #f3ecee)', paddingTop: '1.25rem', marginTop: 'auto' }}>
                    <button
                      onClick={() => handleApplyClick(job.applyLink)}
                      style={{
                        width: '100%',
                        backgroundColor: 'var(--brand-maroon, #6b2d3a)',
                        color: 'white',
                        border: 'none',
                        padding: '0.85rem 1.5rem',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.25s ease',
                        boxShadow: '0 4px 14px rgba(107, 45, 58, 0.2)',
                        minHeight: '48px',
                        touchAction: 'manipulation'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--accent-orange, #f28c28)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(242, 140, 40, 0.35)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--brand-maroon, #6b2d3a)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(107, 45, 58, 0.2)';
                      }}
                    >
                      Apply for this Position <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ──────── Engineering Culture & Pillars ──────── */}
      <section style={{ padding: 'clamp(3.5rem, 6vw, 5rem) clamp(1rem, 3vw, 1.5rem)', backgroundColor: 'var(--bg-surface, #ffffff)', borderTop: '1px solid var(--border-subtle, #e8e0e2)', borderBottom: '1px solid var(--border-subtle, #e8e0e2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(242, 140, 40, 0.1)',
              color: 'var(--accent-orange, #f28c28)',
              border: '1px solid rgba(242, 140, 40, 0.25)',
              padding: '0.35rem 0.9rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.6px'
            }}>
              <Users size={14} /> LIFE AT ZETAWA DARK
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary, #1e293b)', margin: 0, textWrap: 'balance', letterSpacing: '-0.02em' }}>
              Why Build Your Career With Us?
            </h2>
            <p style={{ color: 'var(--text-secondary, #64748b)', fontSize: '1.05rem', maxWidth: '650px', margin: '0.5rem auto 0', lineHeight: 1.6 }}>
              We combine startup agility with serious engineering standards, giving you high ownership and rapid skill acceleration.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.75rem' }}>
            {[
              {
                icon: <Zap size={28} />,
                title: "High-Velocity Sprints",
                desc: "Ship production features every 2 weeks. No endless committee meetings or bureaucracy — just clean code, rapid feedback, and real impact."
              },
              {
                icon: <Code2 size={28} />,
                title: "Production-Level Ownership",
                desc: "Work directly on real-world web apps, AI pipelines, and mobile architectures that serve live commercial clients globally."
              },
              {
                icon: <GraduationCap size={28} />,
                title: "Senior Pair-Programming Mentorship",
                desc: "Direct guidance and code reviews from senior engineers to help you master system architecture, testing, and modern frameworks."
              },
              {
                icon: <Cloud size={28} />,
                title: "Async & Remote-First Flexibility",
                desc: "We focus on output, clarity of thought, and high-standard results rather than tracking hours in a traditional cubicle."
              }
            ].map((perk, pIdx) => (
              <div
                key={pIdx}
                style={{
                  backgroundColor: 'var(--bg-canvas, #faf8f9)',
                  borderRadius: '20px',
                  padding: '2.25rem 2rem',
                  border: '1px solid var(--border-default, #ecdfe2)',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.02)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(42, 16, 25, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(242, 140, 40, 0.45)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface, #ffffff)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.02)';
                  e.currentTarget.style.borderColor = 'var(--border-default, #ecdfe2)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-canvas, #faf8f9)';
                }}
              >
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(242, 140, 40, 0.1)',
                  color: 'var(--accent-orange, #f28c28)',
                  border: '1px solid rgba(242, 140, 40, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  {perk.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary, #1e293b)', marginBottom: '0.65rem' }}>
                  {perk.title}
                </h3>
                <p style={{ color: 'var(--text-secondary, #64748b)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── Mentor Testimonials Section ──────── */}
      <section style={{ padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1rem, 3vw, 1.5rem)', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(242, 140, 40, 0.1)',
            color: 'var(--accent-orange, #f28c28)',
            border: '1px solid rgba(242, 140, 40, 0.25)',
            padding: '0.35rem 0.9rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            <Award size={14} /> MENTOR VOICES
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary, #1e293b)', margin: 0, letterSpacing: '-0.02em' }}>
            What Our Mentors &amp; Leaders Say
          </h2>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--text-secondary, #64748b)', maxWidth: '640px', margin: '0.75rem auto 0' }}>
            Hear from our mentors and leaders about their experiences guiding talent at Zetawa Dark
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            backgroundColor: 'var(--surface)',
            padding: '2.5rem',
            borderRadius: '20px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-primary, #1e293b)',
              lineHeight: 1.7,
              fontStyle: 'italic',
              marginBottom: '2rem'
            }}>
              &ldquo;Real identity comes from those who support you. Real friends keep you grounded, real goals keep you awake. To shine like the sun, work like the sun. Classroom lessons fade, but education lasts a lifetime.&rdquo;
            </p>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary, #1e293b)', margin: '0 0 0.25rem' }}>
                Surendra Kumar Sir
              </h4>
              <p style={{ color: 'var(--accent-orange, #f28c28)', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>
                Founder • Newton Coaching Centre
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--surface)',
            padding: '2.5rem',
            borderRadius: '20px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-primary, #1e293b)',
              lineHeight: 1.7,
              fontStyle: 'italic',
              marginBottom: '2rem'
            }}>
              &ldquo;The unique vision and collective effort makes this company a great place to work and very good for the personal and professional growth of an individual.&rdquo;
            </p>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary, #1e293b)', margin: '0 0 0.25rem' }}>
                Ayush Kumar
              </h4>
              <p style={{ color: 'var(--accent-orange, #f28c28)', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>
                HR Team • Analytics &amp; Operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── Direct Resume Drop Banner ──────── */}
      <section style={{ padding: 'clamp(3.5rem, 6vw, 5rem) clamp(1rem, 3vw, 1.5rem)', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          background: 'var(--banner-cta-bg)',
          borderRadius: '24px',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2.5rem)',
          color: 'var(--banner-cta-text)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--banner-cta-border)'
        }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.4rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em', textWrap: 'balance', color: 'var(--banner-cta-text)' }}>
            Don&apos;t See Your Exact Role?
          </h2>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--banner-cta-text-muted)', maxWidth: '640px', margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
            We are always looking for exceptional software engineers, designers, and AI creators. Send your resume, GitHub profile, and portfolio directly to our leadership team.
          </p>
          <a
            href="mailto:director@zetawa.com?subject=Direct%20Career%20Inquiry%20-%20Zetawa%20Dark"
            className="careers-resume-cta"
            style={{
              backgroundColor: 'var(--accent-orange, #f28c28)',
              color: '#ffffff',
              padding: '1rem 2.25rem',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(242, 140, 40, 0.4)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              minHeight: '48px',
              maxWidth: '100%',
              textAlign: 'center',
              lineHeight: 1.35
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-orange-hover, #e07b18)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(242, 140, 40, 0.5)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-orange, #f28c28)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(242, 140, 40, 0.4)'; }}
          >
            <Mail size={18} /> Email Resume to director@zetawa.com
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
