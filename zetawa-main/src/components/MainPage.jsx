import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Calendar, 
  Bell, 
  ArrowRight, 
  Newspaper, 
  Globe, 
  ExternalLink,
  Code2,
  Cpu,
  Palette,
  Cloud,
  Layers,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Users,
  Server,
  Zap,
  Database,
  Terminal,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Send,
  Check
} from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
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

const LatestUpdates = () => {
  const [updates, setUpdates] = useState([]);
  useEffect(() => {
    fetch('/api/latest-updates')
      .then(res => res.json())
      .then(data => { if (data.success) setUpdates(data.data); })
      .catch(err => console.error('Failed to fetch latest updates:', err));
  }, []);

  if (updates.length === 0) return null;

  return (
    <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', backgroundColor: 'var(--bg-surface, #ffffff)', borderTop: '1px solid var(--border-subtle, #f0e6e8)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '800', color: 'var(--text-primary, #1e293b)', marginBottom: '0.75rem', letterSpacing: '-0.02em', textWrap: 'balance' }}>
            Latest Updates
          </h2>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--text-secondary, #64748b)', maxWidth: '640px', margin: '0 auto' }}>
            Stay informed about our latest engineering developments and team milestones
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
          {updates.map(update => (
            <div key={update._id} style={{
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              backgroundColor: 'var(--bg-canvas, #faf8f9)',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle, #f0e6e8)',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)'
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(42, 16, 25, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(242, 140, 40, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.02)';
                e.currentTarget.style.borderColor = 'var(--border-subtle, #f0e6e8)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-orange, #f28c28)', fontWeight: '700', fontSize: '0.85rem' }}>
                    <Bell size={16} />
                    <span>Update</span>
                  </div>
                  {update.date && <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted, #94a3b8)' }}>{update.date}</span>}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary, #1e293b)', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                  {update.title}
                </h3>
                <p style={{ color: 'var(--text-secondary, #64748b)', marginBottom: '1.25rem', lineHeight: '1.6', fontSize: '0.92rem' }}>
                  {update.description}
                </p>
              </div>
              {update.file && (
                <div style={{ borderTop: '1px solid var(--border-subtle, #f0e6e8)', paddingTop: '1rem', marginTop: 'auto' }}>
                  <a href={update.file.startsWith('http') ? update.file : `http://localhost:4000/${update.file}`} target="_blank" rel="noopener noreferrer" style={{
                    color: 'var(--accent-orange, #f28c28)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700', textDecoration: 'none', fontSize: '0.88rem'
                  }}>
                    View Attachment <ChevronRight size={16} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PressReleasesSection = () => {
  const [releases, setReleases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/press-releases')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setReleases(data.data.slice(0, 3));
        }
      })
      .catch(err => console.error('Failed to fetch press releases:', err));
  }, []);

  if (releases.length === 0) return null;

  const formatExternalUrl = (url) => {
    if (!url) return '';
    const trimmed = String(url).trim();
    if (!trimmed) return '';
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  return (
    <section style={{
      padding: 'clamp(3rem, 6vw, 5rem) 0',
      backgroundColor: 'var(--bg-canvas, #faf8f9)',
      borderTop: '1px solid var(--border-subtle, #f0e6e8)',
      borderBottom: '1px solid var(--border-subtle, #f0e6e8)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(242, 140, 40, 0.1)',
              color: 'var(--accent-orange, #f28c28)',
              border: '1px solid rgba(242, 140, 40, 0.25)',
              padding: '0.35rem 0.85rem',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              marginBottom: '0.6rem'
            }}>
              <Newspaper size={14} /> OFFICIAL ANNOUNCEMENTS
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary, #1e293b)', margin: 0, textWrap: 'balance', letterSpacing: '-0.02em' }}>
              Company Announcements &amp; Updates
            </h2>
          </div>

          <button
            onClick={() => navigate('/press-release')}
            style={{
              backgroundColor: 'var(--bg-surface, #ffffff)',
              color: 'var(--brand-maroon, #6b2d3a)',
              border: '1.5px solid var(--brand-maroon, #6b2d3a)',
              padding: '0.65rem 1.25rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.25s ease',
              minHeight: '44px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--brand-maroon, #6b2d3a)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(107, 45, 58, 0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-surface, #ffffff)';
              e.currentTarget.style.color = 'var(--brand-maroon, #6b2d3a)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
            }}
          >
            Browse All Announcements <ArrowRight size={16} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.5rem'
        }}>
          {releases.map((release) => (
            <div
              key={release._id}
              onClick={() => navigate('/press-release')}
              style={{
                backgroundColor: 'var(--bg-surface, #ffffff)',
                borderRadius: '16px',
                border: '1px solid var(--border-default, #e8e0e2)',
                padding: 'clamp(1.25rem, 3.5vw, 1.75rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(42, 16, 25, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(242, 140, 40, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)';
                e.currentTarget.style.borderColor = 'var(--border-default, #e8e0e2)';
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: 'rgba(242, 140, 40, 0.1)',
                    color: 'var(--accent-orange, #f28c28)',
                    border: '1px solid rgba(242, 140, 40, 0.25)'
                  }}>
                    {release.type || 'Announcement'}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted, #94a3b8)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={13} /> {release.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary, #1e293b)', marginBottom: '0.75rem', lineHeight: 1.4, wordBreak: 'break-word' }}>
                  {release.title}
                </h3>

                {release.content && (
                  <p style={{ color: 'var(--text-secondary, #64748b)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {release.content.length > 140 ? release.content.substring(0, 140) + '...' : release.content}
                  </p>
                )}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle, #f4f1f2)',
                flexWrap: 'wrap',
                gap: '0.65rem',
                marginTop: 'auto'
              }}>
                <span style={{ color: 'var(--brand-maroon, #6b2d3a)', fontWeight: 700, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  Read Announcement <ChevronRight size={15} />
                </span>

                {release.linkedinUrl && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(formatExternalUrl(release.linkedinUrl), '_blank', 'noopener,noreferrer');
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: 'var(--accent-indigo, #3b4bc8)',
                      backgroundColor: 'rgba(59, 75, 200, 0.08)',
                      border: '1px solid rgba(59, 75, 200, 0.18)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                    <ExternalLink size={13} /> Source
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesOverviewSection = ({ handleGatedAction }) => {
  const navigate = useNavigate();

  const [displayServices, setDisplayServices] = useState([
    {
      icon: Code2,
      title: "Full-Stack Web & Mobile Apps",
      tagline: "Custom software, MVP builds & modern APIs",
      description: "High-performance applications built with React, Next.js, Node.js, and modern databases engineered for velocity and scalability.",
      capabilities: ["Fast MVP & full product sprints", "Scalable REST & GraphQL APIs", "Custom multi-tenant architectures"],
      highlight: "Agile Sprints"
    },
    {
      icon: Cpu,
      title: "AI Workflows & Autonomous Tools",
      tagline: "Custom LLMs, intelligent agents & automation",
      description: "Smart generative AI systems, internal tools, and workflow automations that eliminate manual overhead and supercharge operations.",
      capabilities: ["Custom LLM agent workflows", "Vector RAG knowledge search", "Automated smart task pipelines"],
      highlight: "AI & Automation"
    },
    {
      icon: Palette,
      title: "Product UI/UX & Design Systems",
      tagline: "Figma design systems & interactive prototypes",
      description: "Intuitive, high-converting interfaces crafted with human-centered precision, clickable prototypes, and tokenized Figma libraries.",
      capabilities: ["Figma design system tokens", "Interactive clickable prototypes", "High-converting UX workflows"],
      highlight: "Pixel Perfect"
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure & DevOps",
      tagline: "Automated CI/CD, AWS/GCP & reliability",
      description: "Resilient cloud infrastructure with Docker, CI/CD automated deployments, and continuous monitoring for zero downtime.",
      capabilities: ["Automated deployment pipelines", "Containerized cloud scaling", "Security audits & monitoring"],
      highlight: "Reliable Scale"
    }
  ]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setDisplayServices(data.data.slice(0, 4));
        }
      })
      .catch(err => console.error("Error loading dynamic services overview:", err));
  }, []);

  return (
    <section style={{
      padding: 'clamp(3rem, 6vw, 5.5rem) 0',
      backgroundColor: 'var(--bg-surface, #ffffff)',
      borderBottom: '1px solid var(--border-subtle, #e8e0e2)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(242, 140, 40, 0.1)',
              color: 'var(--accent-orange, #f28c28)',
              border: '1px solid rgba(242, 140, 40, 0.25)',
              padding: '0.4rem 1rem',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              marginBottom: '0.75rem'
            }}>
              <Sparkles size={14} /> WHAT WE BUILD
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary, #1e293b)', margin: 0, letterSpacing: '-0.02em', textWrap: 'balance' }}>
              Engineered for Speed, Polish &amp; Growth
            </h2>
            <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--text-secondary, #64748b)', marginTop: '0.5rem', margin: 0, maxWidth: '650px' }}>
              Agile development sprints tailored for modern startups, mid-sized companies, and expanding businesses.
            </p>
          </div>

          <Link
            to="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--brand-maroon, #6b2d3a)',
              color: 'white',
              padding: '0.75rem 1.6rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.92rem',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 14px rgba(107, 45, 58, 0.25)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--brand-maroon-hover, #55222d)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(107, 45, 58, 0.35)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--brand-maroon, #6b2d3a)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(107, 45, 58, 0.25)';
            }}
          >
            Explore All Services <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
          gap: '1.75rem'
        }}>
          {displayServices.map((item, idx) => {
            const Icon = resolveIcon(item.icon);
            const badgeText = item.highlight || 'Fast Turnaround';
            const points = Array.isArray(item.capabilities) && item.capabilities.length > 0
              ? item.capabilities.slice(0, 3)
              : (Array.isArray(item.points) ? item.points.slice(0, 3) : []);

            return (
              <div
                key={item._id || item.id || idx}
                style={{
                  backgroundColor: 'var(--bg-canvas, #faf8f9)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-default, #ecdfe2)',
                  padding: 'clamp(1.75rem, 3.5vw, 2.25rem) clamp(1.25rem, 3vw, 1.75rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(42, 16, 25, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(242, 140, 40, 0.45)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface, #ffffff)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-default, #ecdfe2)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-canvas, #faf8f9)';
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(242, 140, 40, 0.1)',
                      color: 'var(--accent-orange, #f28c28)',
                      border: '1px solid rgba(242, 140, 40, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={24} />
                    </div>
                    <span style={{
                      backgroundColor: 'var(--bg-surface, #ffffff)',
                      color: 'var(--accent-orange, #f28c28)',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: '1px solid rgba(242, 140, 40, 0.3)'
                    }}>
                      {badgeText}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary, #1e293b)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>

                  <p style={{ color: 'var(--brand-maroon, #6b2d3a)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {item.tagline}
                  </p>

                  <p style={{ color: 'var(--text-secondary, #64748b)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '1.5rem' }}>
                    {item.description}
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                    {points.map((pt, pIdx) => (
                      <li key={pIdx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-primary, #334155)',
                        marginBottom: '0.4rem'
                      }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--accent-orange, #f28c28)', flexShrink: 0 }} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  borderTop: '1px solid var(--border-subtle, #f0e6e8)',
                  paddingTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 'auto'
                }}>
                  <Link
                    to="/services"
                    style={{
                      color: 'var(--brand-maroon, #6b2d3a)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    View Details <ArrowRight size={14} />
                  </Link>

                  <button
                    onClick={() => handleGatedAction('/hireforms')}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted, #64748b)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-orange, #f28c28)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted, #64748b)'; }}
                  >
                    Hire Team <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const MainPage = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppContext();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState(null);

  // Contact form state
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...contactData, inquiryType: 'general' };
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setIsSent(true);
        setContactData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSent(false), 5000);
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div style={{ 
      fontFamily: 'var(--font-family, "Plus Jakarta Sans", system-ui, sans-serif)',
      backgroundColor: 'var(--bg-canvas, #f8f6f7)',
      minHeight: '100vh',
      color: 'var(--text-primary, #1e293b)'
    }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .triangle-shape {
          position: absolute;
          top: 15%;
          right: 8%;
          width: 0;
          height: 0;
          border-left: 140px solid transparent;
          border-right: 140px solid transparent;
          border-bottom: 240px solid rgba(242, 140, 40, 0.05);
          transform: rotate(-15deg);
          animation: float 8s ease-in-out infinite;
          pointer-events: none;
        }

        .triangle-shape-2 {
          position: absolute;
          bottom: 25%;
          left: 6%;
          width: 0;
          height: 0;
          border-left: 90px solid transparent;
          border-right: 90px solid transparent;
          border-bottom: 160px solid rgba(107, 45, 58, 0.1);
          transform: rotate(25deg);
          animation: float 10s ease-in-out infinite reverse;
          pointer-events: none;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-15deg); }
          50% { transform: translateY(-20px) rotate(-15deg); }
        }

        @media (max-width: 768px) {
          .triangle-shape, .triangle-shape-2 {
            display: none !important;
          }

          .hero-content-container {
            padding: clamp(2rem, 6vw, 3rem) 1rem 2.25rem !important;
          }

          .hero-action-buttons {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 380px !important;
            margin: 0 auto 2rem auto !important;
            gap: 0.75rem !important;
          }

          .hero-action-buttons button {
            width: 100% !important;
            padding: 0.85rem 1.25rem !important;
            font-size: 0.95rem !important;
            min-height: 44px !important;
          }

          .hero-trust-strip {
            display: grid !important;
            grid-template-columns: 1fr 1fr 1fr !important;
            border-radius: 16px !important;
            padding: 0.85rem 0.5rem !important;
            width: 100% !important;
            gap: 0.35rem !important;
          }

          .hero-trust-strip .strip-divider {
            display: none !important;
          }

          .hero-trust-strip .strip-val {
            font-size: 0.85rem !important;
            line-height: 1.2 !important;
          }

          .hero-trust-strip .strip-lbl {
            font-size: 0.65rem !important;
            letter-spacing: 0px !important;
          }
        }
      `}</style>

      {/* Navigation */}
      <Nav />

      {/* Auth Modal for gated content */}
      <AuthModal isOpen={showAuthModal} onClose={() => { setShowAuthModal(false); setPendingRedirect(null); }} onSuccess={handleAuthSuccess} />

      {/* ──────── Hero Section ──────── */}
      <header style={{
        background: 'linear-gradient(135deg, #14080d 0%, #2a1019 50%, #1e0b12 100%)',
        color: '#ffffff',
        padding: '0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div className="triangle-shape" />
        <div className="triangle-shape-2" />

        <div className="hero-content-container" style={{ maxWidth: '960px', margin: '0 auto', padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1rem, 4vw, 2rem) clamp(3rem, 6vw, 4rem)', position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(242, 140, 40, 0.12)',
            border: '1px solid rgba(242, 140, 40, 0.35)',
            color: '#f28c28',
            padding: '0.4rem 1.1rem',
            borderRadius: '50px',
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.6px',
            marginBottom: '1.25rem',
            backdropFilter: 'blur(8px)'
          }}>
            <Sparkles size={15} /> AGILE SOFTWARE &amp; AI SPRINT SQUADS
          </div>

          <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 5.5vw, 3.4rem)', fontWeight: '800', marginBottom: '1.25rem', lineHeight: 1.15, letterSpacing: '-0.02em', textWrap: 'balance' }}>
            We Design, Build &amp; Scale<br />
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 60%, rgba(242, 140, 40, 0.95) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>High-Impact Software Solutions</span>
          </h1>

          <p className="hero-subtitle" style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '720px', margin: '0 auto 2.25rem auto', lineHeight: '1.65',
          }}>
            Zetawa Dark is a high-velocity technology partner. We engineer custom full-stack web &amp; mobile apps, autonomous AI agents, intuitive design systems, and resilient cloud architectures for modern companies and startups.
          </p>

          <div className="hero-action-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.75rem' }}>
            <button
              style={{
                backgroundColor: 'var(--accent-orange, #f28c28)',
                color: '#ffffff',
                border: 'none',
                padding: '0.85rem 2rem',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 6px 20px rgba(242, 140, 40, 0.35)',
                minHeight: '44px'
              }}
              onClick={() => handleGatedAction('/hireforms')}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-orange-hover, #e07b18)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 26px rgba(242, 140, 40, 0.45)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-orange, #f28c28)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(242, 140, 40, 0.35)'; }}
            >
              Start Project Consultation →
            </button>
            <button
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                padding: '0.85rem 2rem',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                backdropFilter: 'blur(8px)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                minHeight: '44px'
              }}
              onClick={() => navigate('/services')}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.45)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Explore Our Services <Layers size={18} />
            </button>
          </div>

          {/* Quick Metrics Trust Strip */}
          <div className="hero-trust-strip" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(1rem, 2.5vw, 2.5rem)',
            padding: '1rem clamp(1.25rem, 3vw, 2.5rem)',
            background: 'rgba(255, 255, 255, 0.07)',
            backdropFilter: 'blur(16px)',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            flexWrap: 'wrap',
            maxWidth: '100%',
            boxSizing: 'border-box',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }}>
            <div className="strip-item" style={{ textAlign: 'center' }}>
              <div className="strip-val" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', fontWeight: 800, color: 'white' }}>Fast Sprint Sprints</div>
              <div className="strip-lbl" style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>2-4 Week Delivery</div>
            </div>
            <div className="strip-divider" style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.18)' }} />
            <div className="strip-item" style={{ textAlign: 'center' }}>
              <div className="strip-val" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', fontWeight: 800, color: 'white' }}>100% IP Ownership</div>
              <div className="strip-lbl" style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Clean Production Code</div>
            </div>
            <div className="strip-divider" style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.18)' }} />
            <div className="strip-item" style={{ textAlign: 'center' }}>
              <div className="strip-val" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', fontWeight: 800, color: 'white' }}>AI &amp; Full-Stack</div>
              <div className="strip-lbl" style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Next.js, Node &amp; LLMs</div>
            </div>
          </div>
        </div>
      </header>

      {/* ──────── Services Overview Section ──────── */}
      <ServicesOverviewSection handleGatedAction={handleGatedAction} />

      {/* Press Releases Section */}
      <PressReleasesSection />

      {/* Latest Updates */}
      <LatestUpdates />

      {/* ──────── Modern Frosted Glass Contact Section ──────── */}
      <section id="contact" style={{ padding: 'clamp(3rem, 6vw, 6rem) 0', backgroundColor: 'var(--bg-canvas, #f8f6f7)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
          
          <div style={{
            background: 'linear-gradient(135deg, #1e0b12 0%, #2a1019 50%, #14080d 100%)',
            borderRadius: '28px',
            color: 'white',
            boxShadow: '0 24px 60px rgba(20, 8, 13, 0.45)',
            padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.25rem, 4vw, 3rem)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            {/* Ambient Background Glow */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '350px',
              height: '350px',
              background: 'radial-gradient(circle, rgba(242, 140, 40, 0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
              gap: 'clamp(1.5rem, 4vw, 3rem)',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2
            }}>
              
              {/* Left Column: Direct Outreach & Estimator Promo */}
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'rgba(242, 140, 40, 0.15)',
                  color: 'var(--accent-orange, #f28c28)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  border: '1px solid rgba(242, 140, 40, 0.35)'
                }}>
                  <Clock size={14} /> ⚡ Response within 24 Hours
                </div>

                <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', letterSpacing: '-0.01em', textWrap: 'balance' }}>
                  Let&apos;s Build Something <br />Exceptional Together
                </h2>

                <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Have a product to build, an AI feature to integrate, or a technical architecture to review? Reach out to our core team for immediate engineering discovery.
                </p>

                {/* Direct Contact Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.06)', padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <Mail size={20} color="#f28c28" style={{ flexShrink: 0 }} />
                    <div style={{ minWidth: 0, overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', fontWeight: 600 }}>Direct Email</div>
                      <a href="mailto:support@zetawa.com" style={{ color: 'white', fontWeight: 700, textDecoration: 'none', fontSize: '0.92rem', wordBreak: 'break-all' }}>support@zetawa.com</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.06)', padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <Phone size={20} color="#86efac" style={{ flexShrink: 0 }} />
                    <div style={{ minWidth: 0, overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', fontWeight: 600 }}>WhatsApp &amp; Phone Line</div>
                      <a href="https://wa.me/917004265718" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontWeight: 700, textDecoration: 'none', fontSize: '0.92rem', wordBreak: 'break-word' }}>+91 7004265718 (Fast WhatsApp Support)</a>
                    </div>
                  </div>
                </div>

                {/* Structured Form Callout */}
                <div style={{
                  padding: '1.25rem',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  border: '1px dashed rgba(242, 140, 40, 0.4)'
                }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Need a structured project sprint estimate?
                  </div>
                  <p style={{ fontSize: '0.82rem', opacity: 0.85, margin: '0 0 0.75rem 0' }}>
                    Choose services, select budget tiers, and configure timelines in our interactive estimator.
                  </p>
                  <button
                    onClick={() => handleGatedAction('/hireforms')}
                    style={{
                      background: 'linear-gradient(135deg, #f28c28 0%, #e07b18 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.55rem 1.15rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      boxShadow: '0 4px 14px rgba(242, 140, 40, 0.3)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    Launch Scope Configurator <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right Column: Glassmorphic Quick Contact Form */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '20px',
                padding: 'clamp(1.25rem, 4vw, 2.5rem)',
                border: '1.5px solid rgba(255, 255, 255, 0.16)',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)'
              }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Send a Message</h3>
                  <p style={{ fontSize: '0.85rem', opacity: 0.85, margin: '0.3rem 0 0' }}>
                    We typically reply with a technical roadmap within 24 hours.
                  </p>
                </div>

                {isSent ? (
                  <div style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    border: '1px solid rgba(34, 197, 94, 0.5)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <Check size={32} color="#86efac" style={{ margin: '0 auto 0.5rem' }} />
                    <h4 style={{ margin: '0 0 0.35rem', fontSize: '1.1rem', fontWeight: 700 }}>Message Received!</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>
                      Thank you for reaching out. A senior engineering lead will review and get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.9 }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={contactData.name}
                        onChange={handleContactChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          border: '1.5px solid rgba(255,255,255,0.25)',
                          backgroundColor: 'rgba(255,255,255,0.08)',
                          color: 'white',
                          fontSize: '1rem',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s ease'
                        }}
                        placeholder="e.g. Alex Johnson"
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-orange, #f28c28)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.9 }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={contactData.email}
                        onChange={handleContactChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          border: '1.5px solid rgba(255,255,255,0.25)',
                          backgroundColor: 'rgba(255,255,255,0.08)',
                          color: 'white',
                          fontSize: '1rem',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s ease'
                        }}
                        placeholder="alex@company.com"
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-orange, #f28c28)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.9 }}>
                        How Can We Help? *
                      </label>
                      <textarea
                        name="message"
                        value={contactData.message}
                        onChange={handleContactChange}
                        required
                        rows={4}
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          border: '1.5px solid rgba(255,255,255,0.25)',
                          backgroundColor: 'rgba(255,255,255,0.08)',
                          color: 'white',
                          fontSize: '1rem',
                          outline: 'none',
                          resize: 'vertical',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s ease'
                        }}
                        placeholder="Tell us about your project goals, tech stack, or target launch date..."
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-orange, #f28c28)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: 'var(--accent-orange, #f28c28)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.95rem 1.5rem',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        fontWeight: 800,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        marginTop: '0.5rem',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 6px 20px rgba(242, 140, 40, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        opacity: isSubmitting ? 0.7 : 1,
                        minHeight: '46px'
                      }}
                      onMouseOver={(e) => { if (!isSubmitting) { e.currentTarget.style.backgroundColor = 'var(--accent-orange-hover, #e07b18)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                      onMouseOut={(e) => { if (!isSubmitting) { e.currentTarget.style.backgroundColor = 'var(--accent-orange, #f28c28)'; e.currentTarget.style.transform = 'translateY(0)'; } }}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>Send Message <Send size={16} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    
    </div>
  );
};

export default MainPage;
