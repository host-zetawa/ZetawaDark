import React, { useState, useEffect } from 'react';
import { Phone, Mail, Instagram, Linkedin, MapPin, Send, Heart, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false
  });
  
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth <= 768,
        isTablet: window.innerWidth <= 1024
      });
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { isMobile } = screenSize;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const iconMap = {
    LinkedIn: <Linkedin size={isMobile ? 18 : 22} />,
    Instagram: <Instagram size={isMobile ? 18 : 22} />,
    Phone: <Phone size={isMobile ? 18 : 22} />,
    Email: <Mail size={isMobile ? 18 : 22} />
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/107492000/admin/dashboard/',
      color: '#6b2d3a',
      hoverColor: '#f28c28'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/zetawadark?igsh=NXQ0dTdram83ejQx',
      color: '#6b2d3a',
      hoverColor: '#f28c28'
    },
    {
      name: 'Phone',
      url: 'tel:7004265718',
      color: '#6b2d3a',
      hoverColor: '#f28c28'
    },
    {
      name: 'Email',
      url: 'mailto:director@zetawa.com',
      color: '#6b2d3a',
      hoverColor: '#f28c28'
    }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/aboutus' },
    { name: 'Services', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'News & Insights', path: '/news-insights' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .social-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: var(--shadow);
          backdrop-filter: blur(8px);
        }

        @media (hover: hover) {
          .social-icon:hover {
            transform: translateY(-4px) scale(1.06);
            background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
            border-color: var(--accent);
            color: var(--primary-contrast);
            box-shadow: 0 8px 24px rgba(242, 140, 40, 0.35);
          }

          .quick-link:hover {
            color: var(--accent) !important;
            transform: translateX(4px);
          }

          .scroll-top-btn:hover {
            transform: translateY(-4px) scale(1.08);
            box-shadow: 0 10px 28px rgba(242, 140, 40, 0.45);
          }
        }

        .quick-link {
          position: relative;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          min-height: 28px;
          display: inline-flex;
          align-items: center;
        }

        .quick-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--primary));
          transition: width 0.3s ease;
        }

        .quick-link:hover::after {
          width: 100%;
        }

        .scroll-top-btn {
          position: fixed;
          bottom: max(20px, calc(16px + env(safe-area-inset-bottom, 0px)));
          right: max(16px, calc(16px + env(safe-area-inset-right, 0px)));
          width: 46px;
          height: 46px;
          min-width: 46px;
          min-height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: var(--primary-contrast);
          border: 1px solid var(--border);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 99;
          animation: float 3s ease-in-out infinite;
          touch-action: manipulation;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--text) 60%, var(--accent) 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient 6s ease infinite;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin: 2rem 0;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        @media (min-width: 680px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (min-width: 1024px) {
          .footer-top-grid {
            grid-template-columns: 2fr 1fr 1fr;
            gap: 3rem;
          }
        }

        .footer-bottom-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .footer-card {
            padding: 0.75rem 0;
          }

          .footer-bottom-flex {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
        }
      `}</style>

      {/* Main Footer */}
      <div className="footer-animated" style={{ 
        background: 'var(--surface)',
        color: 'var(--text)', 
        padding: 'clamp(2.5rem, 5vw, 4rem) 0 clamp(2rem, 4vw, 2.75rem) 0',
        position: 'relative',
        borderTop: '1px solid var(--border)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
          
          {/* Top Section */}
          <div className="footer-top-grid">
            
            {/* Company Info */}
            <div className="footer-section-left footer-card">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                  marginRight: '1rem',
                  boxShadow: '0 4px 16px rgba(242, 140, 40, 0.3)',
                  border: '1px solid var(--border)'
                }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-contrast)' }}>Z</span>
                </div>
                <div>
                  <div className="gradient-text" style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '0.6px' }}>
                    ZETAWA DARK
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.8px' }}>
                    PRIVATE LIMITED
                  </div>
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.65', fontSize: '0.94rem', maxWidth: '420px' }}>
                We design, build, and market intelligent software solutions and websites to help your business grow and thrive in the digital age.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-section-right">
              <h3 style={{ 
                fontSize: '1.15rem', 
                marginBottom: '1.25rem',
                color: 'var(--text)',
                fontWeight: '700'
              }}>
                Quick Links
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : '1fr',
                gap: isMobile ? '0.75rem 1rem' : '0.85rem'
              }}>
                {quickLinks.map(link => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className="quick-link"
                    style={{
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      fontSize: '0.92rem',
                      display: 'inline-block'
                    }}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact & Social */}
            <div className="footer-section-right">
              <h3 style={{ 
                fontSize: '1.15rem', 
                marginBottom: '1.25rem',
                color: 'var(--text)',
                fontWeight: '700'
              }}>
                Connect With Us
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 48px)',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {iconMap[social.name]}
                  </a>
                ))}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Phone size={16} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent)' }} />
                  7004265718
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Mail size={16} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent)' }} />
                  director@zetawa.com
                </div>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Bottom Section */}
          <div className="footer-bottom-flex">
            <div style={{ 
              fontSize: '0.88rem', 
              color: 'var(--text-muted)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.65rem', 
              flexWrap: 'wrap'
            }}>
              <span>© 2026 ZETAWA DARK PRIVATE LIMITED. All rights reserved.</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <Link 
                to="/privacy-policy" 
                style={{ 
                  color: 'var(--accent)', 
                  textDecoration: 'underline', 
                  textUnderlineOffset: '3px',
                  fontWeight: 500
                }}
              >
                Privacy Policy
              </Link>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Equal opportunity employer committed to diversity and inclusion.
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </>
  );
}

export default Footer;