import React from 'react';
import { SiGmail } from "react-icons/si";
import image from '../assets/image.png';
import { 
  Target, 
  Eye, 
  Award, 
  Users, 
  Lightbulb, 
  Shield, 
  Zap,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  GraduationCap,
  Bug,
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Code2,
  TrendingUp,
  Rocket,
  Heart,
  Quote
} from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Background3D from './Background3D';

const AboutUs = () => {
  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: 'var(--bg)',
      minHeight: '100vh',
      color: 'var(--text)'
    }}>
      <style>{`
        .founder-header-grid {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 2.5rem;
          align-items: center;
          padding: 3rem;
        }

        .founder-photo-container {
          width: 180px;
          height: 180px;
        }

        .founder-contact-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--surface);
          border-radius: 50px;
          padding: 0.4rem 0.95rem;
          font-size: clamp(0.75rem, 2.8vw, 0.85rem);
          font-weight: 600;
          color: var(--text);
          backdrop-filter: blur(6px);
          border: 1px solid var(--border);
          max-width: 100%;
          word-break: break-all;
          overflow-wrap: anywhere;
          box-sizing: border-box;
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

          .hero-trust-strip .strip-divider,
          .hero-trust-strip > div[style*="width: '1px'"],
          .hero-trust-strip > div[style*="width: 1px"] {
            display: none !important;
          }

          .mission-vision-section {
            padding: 2.5rem 0 !important;
          }

          .vision-card, .mission-card {
            padding: clamp(1.25rem, 4vw, 1.75rem) clamp(1rem, 3.5vw, 1.5rem) !important;
            border-radius: 18px !important;
          }

          .vision-card h2, .mission-card h2 {
            font-size: 1.5rem !important;
          }

          .differentiators-section {
            padding: clamp(1.5rem, 4vw, 2rem) clamp(0.85rem, 3vw, 1.5rem) !important;
            border-radius: 20px !important;
            margin-bottom: 3rem !important;
          }

          .differentiators-section h2 {
            font-size: clamp(1.4rem, 5vw, 1.75rem) !important;
          }

          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 1.15rem !important;
          }

          .feature-card {
            padding: 1.25rem 1rem !important;
            border-radius: 14px !important;
          }

          .founder-section {
            padding: 0 0 3.5rem !important;
          }

          .founder-card {
            border-radius: 20px !important;
          }

          .founder-header-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 1.5rem !important;
            padding: clamp(1.5rem, 4vw, 2rem) clamp(0.85rem, 3vw, 1.5rem) !important;
          }

          .founder-photo-container {
            width: clamp(130px, 35vw, 150px) !important;
            height: clamp(130px, 35vw, 150px) !important;
            margin: 0 auto !important;
            border-radius: 20px !important;
          }

          .founder-name-heading {
            font-size: clamp(1.5rem, 5vw, 1.85rem) !important;
          }

          .founder-contact-row-flex {
            justify-content: center !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 0.5rem !important;
            width: 100% !important;
          }

          .founder-contact-chip {
            width: 100% !important;
            max-width: 100% !important;
            justify-content: center !important;
            padding: 0.5rem 0.85rem !important;
            box-sizing: border-box !important;
          }

          .founder-social-row-flex {
            justify-content: center !important;
            gap: 0.75rem !important;
          }

          .founder-social-link {
            width: 44px !important;
            height: 44px !important;
            min-width: 44px !important;
            min-height: 44px !important;
          }

          .founder-body-container {
            padding: clamp(1.25rem, 4vw, 1.75rem) clamp(0.85rem, 3vw, 1.5rem) !important;
          }

          .founder-summary-box {
            padding: 1.25rem 1rem !important;
            margin-bottom: 1.5rem !important;
            border-radius: 14px !important;
          }

          .founder-summary-box p {
            font-size: 0.98rem !important;
            line-height: 1.7 !important;
          }

          .highlights-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }

          .highlight-card {
            padding: 1.25rem 1rem !important;
            border-radius: 14px !important;
          }

          .founder-impact-banner {
            padding: 1.25rem 1rem !important;
            flex-direction: column !important;
            gap: 0.85rem !important;
            align-items: flex-start !important;
            border-radius: 14px !important;
          }

          .founder-philosophy-banner {
            padding: 1.75rem 1rem !important;
            border-radius: 16px !important;
            margin-top: 2rem !important;
          }

          .philosophy-grid-flex {
            gap: 0.65rem !important;
            justify-content: center !important;
          }

          .philosophy-pill-badge {
            padding: 0.55rem 0.9rem !important;
            border-radius: 10px !important;
            box-sizing: border-box !important;
          }

          .philosophy-pill-badge span {
            font-size: 0.95rem !important;
            letter-spacing: 0.04em !important;
          }

          .bottom-cta-banner-wrap {
            padding: clamp(1.75rem, 5vw, 2.5rem) clamp(1rem, 4vw, 1.5rem) !important;
            border-radius: 18px !important;
          }

          .bottom-cta-actions-wrap {
            flex-direction: column !important;
            width: 100% !important;
            gap: 0.75rem !important;
          }

          .bottom-cta-actions-wrap a {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.85rem 1.25rem !important;
            font-size: 0.92rem !important;
            min-height: 48px !important;
            box-sizing: border-box !important;
            touch-action: manipulation !important;
          }
        }
      `}</style>
      <Nav />
      
      {/* ──────── Hero Section ──────── */}
      <section className="hero-section" style={{
        background: 'var(--bg-hero)',
        color: 'var(--hero-text)',
        padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 4vw, 1.5rem) clamp(2.5rem, 5vw, 4.5rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)'
      }}>
        <Background3D />
        {/* Ambient Glow Orb */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(217, 107, 20, 0.12) 0%, transparent 70%)',
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
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1.25rem',
            backdropFilter: 'blur(8px)'
          }}>
            <Sparkles size={16} /> EMPOWERING DIGITAL INNOVATION
          </div>

          <h1 style={{ 
            fontSize: 'clamp(1.9rem, 5.2vw, 3.4rem)', 
            fontWeight: 800, 
            marginBottom: '1.25rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            textWrap: 'balance',
            color: 'var(--hero-text)'
          }}>
            Transforming Businesses with <br />
            <span style={{
              background: 'var(--hero-title-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Intelligent Software Solutions</span>
          </h1>

          <p style={{ 
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', 
            color: 'var(--hero-text-muted)',
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Empowering organizations with cutting-edge technology solutions that drive growth, 
            enhance efficiency, and unlock new possibilities in the digital age.
          </p>

          {/* Quick Metrics Trust Strip */}
          <div className="hero-trust-strip" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(1rem, 2.5vw, 2.5rem)',
            padding: '1rem clamp(1.25rem, 3vw, 2.5rem)',
            background: 'var(--hero-trust-bg)',
            backdropFilter: 'blur(12px)',
            borderRadius: '50px',
            border: '1px solid var(--hero-trust-border)',
            flexWrap: 'wrap',
            maxWidth: '100%',
            boxSizing: 'border-box',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', fontWeight: 800, color: 'var(--hero-trust-val)' }}>Founded Nov 2024</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--hero-trust-lbl)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Zetawa Dark Pvt Ltd</div>
            </div>
            <div className="strip-divider" style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--hero-trust-val)' }}>NIT Srinagar Roots</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--hero-trust-lbl)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Engineering Foundation</div>
            </div>
            <div className="strip-divider" style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--hero-trust-val)' }}>Security &amp; AI First</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--hero-trust-lbl)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ethical &amp; Proven</div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(0.75rem, 3.5vw, 1.5rem)' }}>
        
        {/* ──────────── 1. Vision & Mission ──────────── */}
        <section className="mission-vision-section" style={{ padding: '4.5rem 0' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', 
            gap: '2.5rem',
            alignItems: 'stretch'
          }}>
            {/* Vision Card */}
            <div className="vision-card" style={{
              background: 'var(--surface)',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              boxShadow: 'var(--shadow)',
              border: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = 'var(--shadow)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, rgba(126, 58, 65, 0.12) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />
              
              <div>
                <div style={{ 
                  background: 'rgba(126, 58, 65, 0.12)',
                  color: 'var(--primary)',
                  borderRadius: '16px',
                  width: '64px',
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.75rem'
                }}>
                  <Eye size={32} />
                </div>
                
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 800, 
                  marginBottom: '1rem',
                  color: 'var(--text)'
                }}>
                  Our Vision
                </h2>
                <p style={{ 
                  fontSize: '1.05rem', 
                  lineHeight: '1.75', 
                  color: 'var(--text-muted)',
                  margin: 0
                }}>
                  To be a leading technology partner that transforms how businesses operate, 
                  innovate, and grow through intelligent software solutions that make complex 
                  challenges simple and accessible.
                </p>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                <Sparkles size={16} /> Pioneering Intelligent Scale
              </div>
            </div>

            {/* Mission Card */}
            <div className="mission-card" style={{
              background: 'var(--surface)',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              boxShadow: 'var(--shadow)',
              border: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = 'var(--shadow)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, rgba(126, 58, 65, 0.12) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />
              
              <div>
                <div style={{ 
                  background: 'rgba(126, 58, 65, 0.12)',
                  color: 'var(--primary)',
                  borderRadius: '16px',
                  width: '64px',
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.75rem'
                }}>
                  <Target size={32} />
                </div>
                
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 800, 
                  marginBottom: '1rem',
                  color: 'var(--text)'
                }}>
                  Our Mission
                </h2>
                <p style={{ 
                  fontSize: '1.05rem', 
                  lineHeight: '1.75', 
                  color: 'var(--text-muted)',
                  margin: 0
                }}>
                  We empower businesses of all sizes with innovative, user-friendly software 
                  solutions that streamline operations, enhance productivity, and drive sustainable 
                  growth in an ever-evolving digital landscape.
                </p>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                <CheckCircle size={16} /> Value &amp; Velocity Driven
              </div>
            </div>
          </div>
        </section>

        {/* ──────────── 2. What Sets Us Apart ──────────── */}
        <section className="differentiators-section" style={{ 
          padding: '4.5rem 2rem',
          background: 'var(--surface)',
          borderRadius: '28px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
          marginBottom: '4.5rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'var(--bg-alt)',
              color: 'var(--primary)',
              padding: '0.35rem 0.9rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
              textTransform: 'uppercase'
            }}>
              <ShieldCheck size={14} /> CORE VALUES &amp; EXCELLENCE
            </div>
            <h2 style={{ 
              fontSize: '2.6rem', 
              fontWeight: 800, 
              marginBottom: '0.75rem',
              color: 'var(--text)'
            }}>
              What Sets Us Apart
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'var(--text-muted)',
              maxWidth: '650px',
              margin: '0 auto'
            }}>
              Our commitment to excellence and innovation makes us the preferred 
              technology partner for forward-thinking businesses.
            </p>
          </div>

          <div className="features-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', 
            gap: '2rem'
          }}>
            {[
              {
                icon: <Lightbulb size={28} />,
                title: "Innovation-First Approach",
                description: "We stay ahead of technology trends, continuously exploring emerging technologies to deliver cutting-edge solutions that give our clients a competitive advantage."
              },
              {
                icon: <Users size={28} />,
                title: "User-Centric Design",
                description: "Every solution we create prioritizes user experience, ensuring our software is intuitive, accessible, and designed with real user needs at the forefront."
              },
              {
                icon: <Shield size={28} />,
                title: "Reliability & Security",
                description: "Our robust development practices and security-first mindset ensure that your business data and operations remain protected and consistently available."
              },
              {
                icon: <Zap size={28} />,
                title: "Agile Development",
                description: "We embrace agile methodologies to deliver solutions faster, adapt to changing requirements, and maintain transparent communication throughout the development process."
              },
              {
                icon: <Award size={28} />,
                title: "Proven Excellence",
                description: "Our track record of successful projects and satisfied clients demonstrates our commitment to delivering high-quality solutions that exceed expectations."
              },
              {
                icon: <CheckCircle size={28} />,
                title: "Comprehensive Support",
                description: "From initial consultation to ongoing maintenance, we provide end-to-end support to ensure your success with our solutions at every stage of your journey."
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card" style={{
                background: 'var(--surface)',
                padding: '2.25rem 2rem',
                borderRadius: '18px',
                boxShadow: 'var(--shadow)',
                border: '1px solid var(--border)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 14px 32px rgba(126,58,65,0.12)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.backgroundColor = 'var(--surface-elevated)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.backgroundColor = 'var(--surface)';
              }}>
                <div style={{ 
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(126, 58, 65, 0.1)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 800, 
                  marginBottom: '0.65rem',
                  color: 'var(--text)'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: 'var(--text-muted)', 
                  lineHeight: '1.65',
                  fontSize: '0.92rem',
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────── 3. Meet the Founder ──────────── */}
        <section className="founder-section" style={{ padding: '0 0 5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(126, 58, 65, 0.1)',
              color: 'var(--primary)',
              padding: '0.35rem 0.9rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
              textTransform: 'uppercase'
            }}>
              <GraduationCap size={14} /> LEADERSHIP &amp; VISION
            </div>
            <h2 style={{ 
              fontSize: '2.6rem', 
              fontWeight: 800, 
              marginBottom: '0.75rem',
              color: 'var(--text)'
            }}>
              Meet the Founder
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'var(--text-muted)',
              maxWidth: '550px',
              margin: '0 auto'
            }}>
              The vision, technical passion, and drive behind Zetawa Dark Private Limited.
            </p>
          </div>

          <div className="founder-card" style={{
            background: 'var(--surface)',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow)',
            border: '1px solid var(--border)',
          }}>
            {/* Founder banner + photo row */}
            <div className="founder-header founder-header-grid" style={{
              background: 'var(--banner-cta-bg)',
              color: 'var(--banner-cta-text)',
              position: 'relative',
              overflow: 'hidden',
              borderBottom: '1px solid var(--banner-cta-border)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '240px',
                height: '240px',
                background: 'radial-gradient(circle, rgba(217, 107, 20, 0.12) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }} />

              {/* Photo */}
              <div className="founder-photo-wrap founder-photo-container" style={{
                borderRadius: '24px',
                border: '4px solid var(--border)',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                zIndex: 1,
              }}>
                <img
                  src={image}
                  alt="Tabrez Alam — Founder"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Name + title + socials */}
              <div style={{ position: 'relative', zIndex: 1, minWidth: 0, overflow: 'hidden' }}>
                <h3 className="founder-name founder-name-heading" style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
                  fontWeight: 800,
                  marginBottom: '0.25rem',
                  letterSpacing: '-0.01em',
                  textWrap: 'balance',
                  color: 'var(--banner-cta-text)'
                }}>
                  Tabrez Alam
                </h3>
                <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', marginBottom: '1.25rem', fontWeight: 600, color: 'var(--banner-cta-text-muted)', lineHeight: 1.4 }}>
                  Founder &amp; Director, ZETAWA DARK PRIVATE LIMITED
                </p>

                {/* Contact chips */}
                <div className="founder-contact-row founder-contact-row-flex" style={{
                  display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1.25rem'
                }}>
                  {[
                    { icon: <Mail size={14} />, text: 'tabrez.zeta@gmail.com' },
                    { icon: <Phone size={14} />, text: '+91 70042 65718' },
                    { icon: <MapPin size={14} />, text: 'Dhaka, East Champaran, Bihar' },
                  ].map((item, i) => (
                    <span key={i} className="founder-contact-chip">
                      {item.icon} <span style={{ wordBreak: 'break-word' }}>{item.text}</span>
                    </span>
                  ))}
                </div>

                {/* Social icons */}
                <div className="founder-social-row founder-social-row-flex" style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  {[
                    { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/tabrez-alam-59b6b61b3/' },
                    { icon: <Instagram size={18} />, href: 'https://www.instagram.com/tabrez_zeta?igsh=aXZveDRxend3NGpv' },
                    { icon: <Twitter size={18} />, href: 'https://x.com/tabrez_zeta?t=YaorG8xFInFR2bLaPxG0TA&s=08' },
                    { icon: <SiGmail size={18} />, href: 'mailto:tabrez.zeta@gmail.com' },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="founder-social-link"
                      style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'var(--surface)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text)', textDecoration: 'none',
                        transition: 'all 0.25s ease',
                        border: '1px solid var(--border)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'var(--primary)';
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'var(--surface)';
                        e.currentTarget.style.color = 'var(--text)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio + Highlights + Philosophy body */}
            <div className="founder-body founder-body-container" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
              {/* Executive Lead Summary */}
              <div className="founder-summary-box" style={{
                background: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                borderLeft: '5px solid var(--primary)',
                borderRadius: '18px',
                padding: '2rem 2.25rem',
                marginBottom: '2.5rem',
                boxShadow: 'var(--shadow)'
              }}>
                <p style={{
                  fontSize: '1.16rem',
                  lineHeight: '1.9',
                  color: 'var(--text)',
                  margin: 0
                }}>
                  <strong style={{ color: 'var(--primary)', fontWeight: 800 }}>Tabrez Alam</strong> is a <strong style={{ color: 'var(--text)' }}>technology entrepreneur</strong>, <strong style={{ color: 'var(--text)' }}>cybersecurity enthusiast</strong> and the <strong style={{ color: 'var(--primary)', fontWeight: 700 }}>Founder &amp; Director</strong> of <strong style={{ color: 'var(--text)' }}>ZETAWA DARK PRIVATE LIMITED</strong>, founded in <strong style={{ color: 'var(--text)' }}>November 2024</strong>. Hailing from <strong style={{ color: 'var(--text)' }}>Dhaka, East Champaran, Bihar</strong>, he holds a <strong style={{ color: 'var(--text)' }}>B.Tech in Information Technology</strong> from <strong style={{ color: 'var(--primary)', fontWeight: 700 }}>NIT Srinagar</strong>.
                </p>
              </div>

              {/* 4 Themed Journey & Achievement Cards */}
              <div className="highlights-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '1.75rem',
              }}>
                {/* 1. Cybersecurity Recognition */}
                <div className="highlight-card" style={{
                  padding: '2rem',
                  background: 'var(--surface)',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  borderLeft: '5px solid var(--primary)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(126,58,65,0.12)'; e.currentTarget.style.backgroundColor = 'var(--surface-elevated)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.backgroundColor = 'var(--surface)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--primary)' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(126, 58, 65, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <ShieldCheck size={20} />
                    </div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text)' }}>
                      Cybersecurity Recognition
                    </h4>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', margin: 0, fontSize: '0.98rem' }}>
                    His early work in <strong style={{ color: 'var(--text)' }}>cybersecurity</strong> gained recognition when he identified and responsibly disclosed a vulnerability in the <strong style={{ color: 'var(--primary)' }}>MobiKwik digital payment application</strong>, earning a <span style={{ backgroundColor: 'rgba(126, 58, 65, 0.12)', color: 'var(--primary)', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700 }}>₹1 lakh award</span> and <strong style={{ color: 'var(--text)' }}>Certificate of Appreciation</strong> under MobiKwik&apos;s <strong style={{ color: 'var(--text)' }}>Responsible Disclosure Program</strong>.
                  </p>
                </div>

                {/* 2. Equity Investing & Philanthropy */}
                <div className="highlight-card" style={{
                  padding: '2rem',
                  background: 'var(--surface)',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  borderLeft: '5px solid var(--primary)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(126,58,65,0.12)'; e.currentTarget.style.backgroundColor = 'var(--surface-elevated)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.backgroundColor = 'var(--surface)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--primary)' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(126, 58, 65, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TrendingUp size={20} />
                    </div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text)' }}>
                      Equity Investing &amp; Giving Back
                    </h4>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', margin: 0, fontSize: '0.98rem' }}>
                    With a strong interest in <strong style={{ color: 'var(--text)' }}>technology, cybersecurity, entrepreneurship, innovation and financial markets</strong>, Tabrez has also developed an interest in <strong style={{ color: 'var(--text)' }}>equity-market investing</strong>. During his student years, he reported earning a <span style={{ backgroundColor: 'rgba(126, 58, 65, 0.12)', color: 'var(--primary)', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700 }}>₹1.23 lakh profit</span> from a stock-market investment and chose to <strong style={{ color: 'var(--primary)' }}>contribute the profit toward supporting students and marginalized sections of society</strong>.
                  </p>
                </div>

                {/* 3. Startup Ecosystem Exposure */}
                <div className="highlight-card" style={{
                  padding: '2rem',
                  background: 'var(--surface)',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  borderLeft: '5px solid var(--primary)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(126,58,65,0.12)'; e.currentTarget.style.backgroundColor = 'var(--surface-elevated)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.backgroundColor = 'var(--surface)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--primary)' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(126, 58, 65, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Rocket size={20} />
                    </div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text)' }}>
                      Startup Ecosystem Exposure
                    </h4>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', margin: 0, fontSize: '0.98rem' }}>
                    His entrepreneurial journey includes participation in <strong style={{ color: 'var(--primary)' }}>IIT Bombay&apos;s E-Summit</strong> and mentorship associated with <strong style={{ color: 'var(--primary)' }}>Startup Mahakumbh at Bharat Mandapam, New Delhi</strong>, providing exposure to India&apos;s wider <strong style={{ color: 'var(--text)' }}>startup and innovation ecosystem</strong>.
                  </p>
                </div>

                {/* 4. Leadership at ZETAWA DARK */}
                <div className="highlight-card" style={{
                  padding: '2rem',
                  background: 'var(--surface)',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  borderLeft: '5px solid var(--primary)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(126,58,65,0.12)'; e.currentTarget.style.backgroundColor = 'var(--surface-elevated)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.backgroundColor = 'var(--surface)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--primary)' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(126, 58, 65, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Briefcase size={20} />
                    </div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text)' }}>
                      Leadership at ZETAWA DARK
                    </h4>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', margin: 0, fontSize: '0.98rem' }}>
                    As the <strong style={{ color: 'var(--primary)' }}>Founder &amp; Director of ZETAWA DARK</strong>, he leads the company&apos;s <strong style={{ color: 'var(--text)' }}>strategic vision, business development, team leadership and innovation initiatives</strong>, with a focus on <strong style={{ color: 'var(--text)' }}>building practical technology solutions and nurturing emerging talent</strong>.
                  </p>
                </div>
              </div>

              {/* Social and Environmental Initiatives Banner */}
              <div className="founder-impact-banner" style={{
                marginTop: '1.75rem',
                padding: '1.75rem 2.25rem',
                background: 'var(--bg-alt)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                borderLeft: '5px solid var(--primary)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
                boxShadow: 'var(--shadow)'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(126, 58, 65, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0
                }}>
                  <Heart size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.12rem', fontWeight: 800, margin: '0 0 0.45rem', color: 'var(--text)' }}>
                    Social &amp; Environmental Impact
                  </h4>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: 'var(--text-muted)',
                    margin: 0
                  }}>
                    Beyond technology and business, Tabrez is also interested in <strong style={{ color: 'var(--primary)' }}>social and environmental initiatives</strong>, reflecting his belief that <strong style={{ color: 'var(--text)' }}>entrepreneurship should create value for both society and the wider community</strong>.
                  </p>
                </div>
              </div>

              {/* Founder's Core Philosophy */}
              <div className="founder-philosophy-banner" style={{
                marginTop: '2.5rem',
                background: 'var(--banner-cta-bg)',
                borderRadius: '22px',
                padding: '2.5rem 2rem',
                color: 'var(--banner-cta-text)',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--banner-cta-border)',
                boxShadow: 'var(--shadow-md)',
                textAlign: 'center'
              }}>
                {/* Decorative background glow */}
                <div style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(217, 107, 20, 0.12) 0%, transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--banner-cta-text-muted)',
                    marginBottom: '1.25rem',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    opacity: 0.95
                  }}>
                    His philosophy is simple:
                  </p>

                  <div className="philosophy-grid-flex" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                  }}>
                    {['LEARN', 'INNOVATE', 'BUILD', 'GIVE BACK'].map((item, idx) => (
                      <div key={idx} className="philosophy-pill-badge" style={{
                        background: 'var(--surface)',
                        backdropFilter: 'blur(10px)',
                        border: '1.5px solid var(--border)',
                        borderRadius: '14px',
                        padding: '0.9rem 1.8rem',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'all 0.25s ease'
                      }}>
                        <span style={{
                          fontSize: '1.35rem',
                          fontWeight: 900,
                          letterSpacing: '0.08em',
                          color: 'var(--text)'
                        }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────── 4. Bottom CTA ──────────── */}
        <section style={{
          padding: '0 0 5rem'
        }}>
          <div className="bottom-cta-banner-wrap" style={{
            background: 'var(--banner-cta-bg)',
            borderRadius: '24px',
            padding: '3.5rem 2.5rem',
            color: 'var(--banner-cta-text)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--banner-cta-border)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.01em', textWrap: 'balance', color: 'var(--banner-cta-text)' }}>
              Partner with Zetawa Dark Today
            </h2>
            <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'var(--banner-cta-text-muted)', maxWidth: '640px', margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
              Let&apos;s collaborate to design, develop, and scale intelligent software solutions that elevate your business.
            </p>
            <div className="bottom-cta-actions-wrap" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/hireforms"
                style={{
                  backgroundColor: 'var(--accent-orange, #f28c28)',
                  color: '#ffffff',
                  padding: '0.85rem 1.85rem',
                  borderRadius: '50px',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 6px 20px rgba(242, 140, 40, 0.35)',
                  transition: 'transform 0.2s ease',
                  minHeight: '46px'
                }}
              >
                Start a Project Consultation <ArrowRight size={18} />
              </Link>
              <Link
                to="/services"
                style={{
                  backgroundColor: 'var(--banner-cta-btn-sec-bg)',
                  color: 'var(--banner-cta-btn-sec-color)',
                  border: '1.5px solid var(--banner-cta-btn-sec-border)',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '50px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  minHeight: '46px'
                }}
              >
                Explore Services <Code2 size={18} />
              </Link>
            </div>
          </div>
        </section>

      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
