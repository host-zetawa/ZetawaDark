import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Cpu, 
  Palette, 
  Cloud, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Zap, 
  Server, 
  Database, 
  Terminal, 
  ChevronRight, 
  PhoneCall, 
  FileText,
  Clock,
  Award
} from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import AuthModal from './AuthModal';

const ICONS_MAP = {
  Code2,
  Cpu,
  Palette,
  Cloud,
  ShieldCheck,
  Users,
  Server,
  Zap,
  Database,
  Terminal,
  Layers,
  Sparkles
};

const resolveIcon = (icon) => {
  if (!icon) return Code2;
  if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null)) return icon;
  return ICONS_MAP[icon] || Code2;
};

const DEFAULT_SERVICE_PILLARS = [
  {
    id: 'fullstack',
    category: 'engineering',
    icon: Code2,
    title: 'Custom Full-Stack Web & Mobile Apps',
    tagline: 'High-performance web apps, mobile solutions & scalable microservices.',
    description: 'We build responsive, production-ready web and mobile applications tailored for fast-growing businesses. From rapid MVP launches to multi-tenant architectures, we deliver clean, modular code designed for velocity and effortless scaling.',
    capabilities: [
      'Modern web apps with React, Next.js, and TypeScript',
      'Cross-platform mobile engineering with React Native & Flutter',
      'Robust backend APIs & microservices (Node.js, Python, Go, PostgreSQL)',
      'Real-time data synchronization & event-driven WebSockets',
      'Clean multi-tenant architectures & secure payment integrations'
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'React Native', 'PostgreSQL', 'Docker'],
    highlight: 'Fast Turnaround Sprints'
  },
  {
    id: 'ai-agents',
    category: 'intelligence',
    icon: Cpu,
    title: 'AI Engineering, Custom Agents & LLM Pipelines',
    tagline: 'Supercharge workflows with tailored AI models, autonomous agents & smart automation.',
    description: 'Harness state-of-the-art machine learning models and generative AI customized for your specific business data. We engineer autonomous agents, workflow automations, and intelligent retrieval systems (RAG) that eliminate repetitive manual overhead.',
    capabilities: [
      'Custom Retrieval-Augmented Generation (RAG) with vector databases',
      'Autonomous multi-agent workflows for internal process automation',
      'Fine-tuned LLM implementations & prompt engineering optimization',
      'Smart document extraction, semantic search & automated reporting',
      'Secure AI gateways with robust guardrails and API rate limiting'
    ],
    techStack: ['Python', 'OpenAI', 'Gemini API', 'LangChain', 'Pinecone', 'FastAPI', 'Hugging Face'],
    highlight: 'Production-Grade AI'
  },
  {
    id: 'ui-ux',
    category: 'design',
    icon: Palette,
    title: 'Product Strategy & UI/UX Design Systems',
    tagline: 'High-converting, intuitive interfaces crafted with user-centric precision.',
    description: 'Great software starts with exceptional user experience. We conduct user research, map frictionless workflows, and engineer scalable Figma design systems that turn visitors into loyal customers.',
    capabilities: [
      'User journey mapping & high-fidelity interactive wireframing',
      'Scalable Figma design systems with tokenized styles and reusable component libraries',
      'Interactive clickable prototypes for rapid stakeholder and user validation',
      'WCAG 2.1 accessibility compliance audits and responsive remediation',
      'Conversion rate optimization (CRO) and user onboarding telemetry'
    ],
    techStack: ['Figma', 'Design Tokens', 'Storybook', 'Tailwind', 'Accessibility WCAG', 'Protopie'],
    highlight: 'Pixel-Perfect Fidelity'
  },
  {
    id: 'cloud-devops',
    category: 'engineering',
    icon: Cloud,
    title: 'Cloud Infrastructure, DevOps & Reliability',
    tagline: 'Zero-downtime deployments, automated CI/CD pipelines & resilient cloud setups.',
    description: 'Empower your application with modern cloud-native infrastructure that scales effortlessly. We implement automated CI/CD deployment pipelines, containerization, and monitoring that ensure dependable uptime and low operating costs.',
    capabilities: [
      'Cloud setup & cost optimization across AWS, GCP, and DigitalOcean',
      'Docker containerization & Kubernetes cluster orchestration',
      'Automated CI/CD deployment pipelines with automated test gates',
      'Comprehensive log observability, distributed tracing, and real-time alerts',
      'Automated backup disaster recovery and zero-downtime rolling updates'
    ],
    techStack: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Datadog'],
    highlight: 'Zero-Downtime Reliability'
  },
  {
    id: 'security-audit',
    category: 'security',
    icon: ShieldCheck,
    title: 'Cybersecurity, API Integrations & Code Audits',
    tagline: 'Hardened application security, vulnerability testing & secure integrations.',
    description: 'Safeguard your data and customer trust. Our security engineers perform deep code reviews, authentication hardening, and architectural audits to protect against modern attack vectors.',
    capabilities: [
      'OWASP Top 10 vulnerability assessment and code security audits',
      'API security hardening, rate limiting, and JWT/OAuth2 authentication',
      'Data encryption implementation (at rest and in transit)',
      'Security compliance readiness consulting and safe third-party integrations',
      'Actionable vulnerability remediation code reports'
    ],
    techStack: ['OWASP', 'Burp Suite', 'SonarQube', 'JWT / OAuth2', 'Zero-Trust', 'SSL/TLS'],
    highlight: 'Hardened Security'
  },
  {
    id: 'dedicated-teams',
    category: 'advisory',
    icon: Users,
    title: 'Dedicated Tech Squads & Agile Sprints',
    tagline: 'Vetted senior developers and technical leads embedded directly into your project.',
    description: 'Accelerate your product delivery without lengthy hiring cycles. We provide senior, vetted engineering squads that integrate into your agile workflow with weekly sprint demos and full code ownership.',
    capabilities: [
      'Autonomous dedicated engineering squads (frontend, backend, QA, and DevOps)',
      'Fractional CTO leadership, technology roadmap planning, and architecture reviews',
      'Seamless integration into Jira, Slack, and daily agile standups',
      'Transparent sprint velocity tracking with weekly milestone demonstrations',
      '100% full intellectual property and clean repository handover'
    ],
    techStack: ['Agile / Scrum', 'Jira', 'Architecture Reviews', 'Sprint Velocity', 'CI/CD Mentoring'],
    highlight: 'Rapid Squad Ramp-Up'
  }
];

const Services = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppContext();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [servicePillars, setServicePillars] = useState(DEFAULT_SERVICE_PILLARS);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setServicePillars(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch services:', err));
  }, []);

  const handleGatedAction = (path) => {
    if (isAuth) {
      navigate(path);
    } else {
      setPendingRedirect(path);
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (pendingRedirect) {
      navigate(pendingRedirect);
      setPendingRedirect(null);
    }
  };

  const categoryFilters = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'engineering', label: 'Custom Web & Mobile' },
    { id: 'intelligence', label: 'AI & Automations' },
    { id: 'design', label: 'UI/UX & Design' },
    { id: 'security', label: 'Security & Integrations' },
    { id: 'advisory', label: 'Dedicated Squads' },
  ];

  const filteredServices = servicePillars.filter(service => {
    if (activeTab === 'all') return true;
    return service.category === activeTab;
  });

  return (
    <div style={{
      fontFamily: 'var(--font-family, "Plus Jakarta Sans", system-ui, sans-serif)',
      backgroundColor: 'var(--bg-canvas, #f8f6f7)',
      minHeight: '100vh',
      color: 'var(--text-primary, #1e293b)'
    }}>
      <Nav />
      <style>{`
        * {
          box-sizing: border-box;
        }

        .services-filter-bar {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.5rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 0.25rem;
        }

        .services-filter-bar::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 640px) {
          .services-hero-actions {
            flex-direction: column !important;
            width: 100% !important;
            gap: 0.75rem !important;
          }
          .services-hero-actions button,
          .services-hero-actions a {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.85rem 1.25rem !important;
            font-size: 0.95rem !important;
            min-height: 44px !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
      <AuthModal isOpen={showAuthModal} onClose={() => { setShowAuthModal(false); setPendingRedirect(null); }} onSuccess={handleAuthSuccess} />

      {/* ──────── Header / Hero Banner ──────── */}
      <section style={{
        background: 'linear-gradient(135deg, #14080d 0%, #2a1019 50%, #1e0b12 100%)',
        color: '#ffffff',
        padding: 'clamp(3rem, 6vw, 5.5rem) clamp(1rem, 4vw, 1.5rem) clamp(3rem, 6vw, 5rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(242, 140, 40, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(242, 140, 40, 0.12)',
            border: '1px solid rgba(242, 140, 40, 0.35)',
            color: '#f28c28',
            padding: '0.4rem 1.25rem',
            borderRadius: '50px',
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(8px)'
          }}>
            <Sparkles size={16} /> END-TO-END TECH &amp; AI CAPABILITIES
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5.5vw, 3.4rem)',
            fontWeight: 800,
            marginBottom: '1.25rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            textWrap: 'balance'
          }}>
            Engineering Services Built for <br />
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 60%, rgba(242, 140, 40, 0.95) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Velocity, Quality &amp; Scale</span>
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.65
          }}>
            We partner with ambitious startups and mid-market companies to build full-stack web and mobile applications, deploy custom AI workflows, craft beautiful design systems, and manage dependable cloud infrastructure.
          </p>

          <div className="services-hero-actions" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleGatedAction('/hireforms')}
              style={{
                backgroundColor: 'var(--accent-orange, #f28c28)',
                color: '#ffffff',
                padding: '0.95rem 2.25rem',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(242, 140, 40, 0.35)',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: '44px'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-orange-hover, #e07b18)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(242, 140, 40, 0.45)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-orange, #f28c28)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(242, 140, 40, 0.35)'; }}
            >
              Start a Project Sprint <ArrowRight size={18} />
            </button>
            <a
              href="#service-catalog"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                padding: '0.95rem 2rem',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.25s ease',
                minHeight: '44px'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.45)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Browse Disciplines <Layers size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ──────── Category Navigation Tabs ──────── */}
      <section id="service-catalog" style={{
        position: 'sticky',
        top: '54px',
        zIndex: 90,
        backgroundColor: 'var(--glass-bg, rgba(255, 255, 255, 0.94))',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-default, #e8e0e2)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        padding: '0.75rem 1rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="services-filter-bar">
            {categoryFilters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveTab(filter.id)}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '50px',
                  border: activeTab === filter.id ? '1.5px solid var(--accent-orange, #f28c28)' : '1px solid var(--border-default, #e2e8f0)',
                  backgroundColor: activeTab === filter.id ? 'var(--brand-maroon, #6b2d3a)' : 'var(--bg-surface, #ffffff)',
                  color: activeTab === filter.id ? '#ffffff' : 'var(--text-secondary, #475569)',
                  fontSize: '0.88rem',
                  fontWeight: activeTab === filter.id ? 700 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: activeTab === filter.id ? '0 4px 14px rgba(107, 45, 58, 0.25)' : 'none',
                  minHeight: '40px',
                  flexShrink: 0
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── Services Detailed Grid ──────── */}
      <section style={{ padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1rem, 3vw, 1.5rem)', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2rem' }}>
          {filteredServices.map((service, index) => {
            const Icon = resolveIcon(service.icon);
            return (
              <div
                key={service._id || service.id || index}
                style={{
                  backgroundColor: 'var(--bg-surface, #ffffff)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-default, #e8e0e2)',
                  padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  height: '100%'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(42, 16, 25, 0.09)';
                  e.currentTarget.style.borderColor = 'rgba(242, 140, 40, 0.45)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.borderColor = 'var(--border-default, #e8e0e2)';
                }}
              >
                <div>
                  {/* Top Header Card */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(242, 140, 40, 0.1)',
                      color: 'var(--accent-orange, #f28c28)',
                      border: '1px solid rgba(242, 140, 40, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={26} />
                    </div>
                    {service.highlight && (
                      <span style={{
                        backgroundColor: 'rgba(242, 140, 40, 0.08)',
                        color: 'var(--accent-orange, #f28c28)',
                        border: '1px solid rgba(242, 140, 40, 0.25)',
                        padding: '0.3rem 0.85rem',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {service.highlight}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary, #1e293b)', marginBottom: '0.5rem', lineHeight: 1.25 }}>
                    {service.title}
                  </h3>
                  <p style={{ color: 'var(--brand-maroon, #6b2d3a)', fontSize: '0.92rem', fontWeight: 600, marginBottom: '1rem' }}>
                    {service.tagline}
                  </p>
                  <p style={{ color: 'var(--text-secondary, #64748b)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    {service.description}
                  </p>

                  {/* Capabilities List */}
                  <div style={{ marginBottom: '1.75rem' }}>
                    <h4 style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--text-muted, #94a3b8)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '0.85rem'
                    }}>
                      Key Deliverables &amp; Outcomes
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {(service.capabilities || []).map((cap, cIdx) => (
                        <li key={cIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary, #334155)' }}>
                          <CheckCircle2 size={16} style={{ color: 'var(--accent-orange, #f28c28)', flexShrink: 0, marginTop: '2px' }} />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  {Array.isArray(service.techStack) && service.techStack.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--text-muted, #94a3b8)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '0.65rem'
                      }}>
                        Tech Ecosystem
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {service.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              backgroundColor: 'var(--bg-canvas, #f1f5f9)',
                              color: 'var(--text-secondary, #475569)',
                              border: '1px solid var(--border-subtle, #e2e8f0)',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 600
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom CTA */}
                <div style={{ borderTop: '1px solid var(--border-subtle, #f1f5f9)', paddingTop: '1.25rem', marginTop: 'auto' }}>
                  <button
                    onClick={() => handleGatedAction('/hireforms')}
                    style={{
                      backgroundColor: 'var(--brand-maroon, #6b2d3a)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.25s ease',
                      width: '100%',
                      justifyContent: 'center',
                      minHeight: '44px',
                      whiteSpace: 'normal',
                      textAlign: 'center',
                      lineHeight: 1.35,
                      boxShadow: '0 4px 14px rgba(107, 45, 58, 0.2)'
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
                    Request Project Sprint for {service.title.split(' ')[0]} <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────── Bottom Project Callout ──────── */}
      <section style={{
        padding: 'clamp(3.5rem, 6vw, 5.5rem) clamp(1rem, 3vw, 1.5rem)',
        backgroundColor: 'var(--bg-surface, #ffffff)',
        borderTop: '1px solid var(--border-subtle, #e8e0e2)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, #14080d 0%, #2a1019 50%, #1e0b12 100%)',
          borderRadius: '24px',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2.5rem)',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 24px 60px rgba(20, 8, 13, 0.4)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em', textWrap: 'balance' }}>
            Ready to Build Your Next Product?
          </h2>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '640px', margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
            Share your requirements, select your preferred budget and timeline, and our senior engineers will deliver a comprehensive scope breakdown within 24 hours.
          </p>
          <button
            onClick={() => handleGatedAction('/hireforms')}
            style={{
              backgroundColor: 'var(--accent-orange, #f28c28)',
              color: '#ffffff',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              fontSize: '1.02rem',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(242, 140, 40, 0.4)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              minHeight: '48px'
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-orange-hover, #e07b18)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(242, 140, 40, 0.5)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-orange, #f28c28)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(242, 140, 40, 0.4)'; }}
          >
            Launch Project Scope Configurator <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
