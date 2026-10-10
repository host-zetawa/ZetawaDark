import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Database, 
  Server, 
  UserCheck, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  Clock,
  Shield,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

const PrivacyPolicy = () => {
  const lastUpdated = "October 2026";

  const keyPrinciples = [
    {
      icon: ShieldCheck,
      title: "100% Client IP Ownership",
      desc: "All custom software, AI models, and assets developed for your company belong entirely to you with strict confidentiality."
    },
    {
      icon: Lock,
      title: "Zero Data Selling",
      desc: "We never monetize, sell, or rent your company or personal data to third parties or data brokers under any circumstances."
    },
    {
      icon: Server,
      title: "Encrypted & Isolated",
      desc: "Project communications and data pipelines are encrypted in transit and at rest using industry-standard protocols."
    },
    {
      icon: UserCheck,
      title: "Complete Control",
      desc: "You retain full control over your stored credentials, profile information, and can request complete data erasure at any time."
    }
  ];

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction & Overview",
      content: `Zetawa Dark Private Limited ("Zetawa", "we", "our", or "us") provides engineering consultancy, custom software development, full-stack application building, and AI workflow integration. 

We are dedicated to safeguarding the privacy and confidentiality of our clients, website visitors, partners, and team applicants. This Privacy Policy outlines our transparent policies regarding the collection, handling, storage, and protection of information when you interact with our website (zetawa.com), engage our engineering squads, or communicate with our leadership team.`
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      content: `We collect minimal, necessary information required to deliver enterprise-grade services and respond to project inquiries:`,
      bullets: [
        "Inquiry & Contact Details: Full name, business email address, phone/WhatsApp number, company name, and project scope submitted through our contact or consultation forms.",
        "Account & Authentication Data: For authenticated users and client dashboards, we securely store account credentials (encrypted passwords via salted hashing), full names, and verification statuses.",
        "Project Specifications: Architectural briefs, technical requirements, Figma files, API documentation, and code repositories shared during sprint engagements under mutual Non-Disclosure Agreements (NDAs).",
        "Technical & Telemetry Data: Device type, browser environment, IP address, approximate geographic location, and interaction events to maintain system uptime, detect anomalies, and prevent malicious attacks."
      ]
    },
    {
      id: "usage",
      title: "3. How We Use Your Information",
      content: `Your data is utilized strictly for legitimate business objectives and service fulfillment:`,
      bullets: [
        "Evaluating technical feasibility and providing accurate project sprint estimates and proposals.",
        "Developing, deploying, and maintaining custom software deliverables specified in your service contract.",
        "Communicating milestone updates, sprint demos, deployment notifications, and emergency security advisories.",
        "Managing client accounts, processing verified payments, and issuing compliant tax invoices.",
        "Upholding our platform security, preventing unauthorized access, and complying with statutory legal requirements."
      ]
    },
    {
      id: "ip-guarantee",
      title: "4. Intellectual Property & Confidentiality Guarantee",
      content: `We recognize that your proprietary code, business logic, training data, and product ideas are your most vital assets:`,
      bullets: [
        "Full IP Transfer: Upon receipt of contracted payments, 100% of the intellectual property, copyright, and source code generated during your engagement belongs exclusively to your entity.",
        "Strict Non-Disclosure: All engineers, architects, and staff operate under binding NDAs prohibiting the disclosure or external sharing of your proprietary information.",
        "Clean Room Architecture: Client data, API keys, and model weights are strictly isolated and never used to train generalized multi-tenant public AI models without explicit, written consent."
      ]
    },
    {
      id: "data-security",
      title: "5. Data Security & Retention",
      content: `We employ multi-layered technical and organizational safeguards including TLS/SSL encryption for data in transit, AES-256 for sensitive credentials at rest, rate limiting, and restricted access protocols. 

We retain information only as long as necessary to fulfill the operational purposes detailed herein or to satisfy legal, tax, and accounting standards. When data is no longer required, it is permanently deleted or irreversibly anonymized.`
    },
    {
      id: "third-parties",
      title: "6. Sub-processors & Third-Party Services",
      content: `We may utilize vetted enterprise cloud infrastructure and SaaS providers to host systems and manage workflows (such as AWS, Vercel, MongoDB Atlas, and secure transactional email gateways). Each partner is required to maintain rigorous security compliances and process data solely on our direct instructions.`
    },
    {
      id: "your-rights",
      title: "7. Your Rights & Choices",
      content: `Depending on your jurisdiction, you possess the following rights regarding your personal information:`,
      bullets: [
        "Right of Access: Request a copy of the personal information we hold concerning you.",
        "Right to Rectification: Request correction of inaccurate or incomplete personal records.",
        "Right to Erasure ('Right to be Forgotten'): Request the permanent deletion of your personal account data.",
        "Right to Restriction & Objection: Object to or limit specific processing activities.",
        "Right to Data Portability: Receive your data in a structured, machine-readable format."
      ]
    },
    {
      id: "contact-us",
      title: "8. Privacy Inquiries & Contact",
      content: `If you have questions, wish to exercise your data rights, or need an executed Non-Disclosure Agreement before discussing sensitive architecture, please contact our team directly:`
    }
  ];

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8f6f7',
      minHeight: '100vh',
      color: '#1e293b',
      overflowX: 'hidden'
    }}>
      <Nav />

      {/* Hero Header */}
      <header style={{
        background: 'linear-gradient(135deg, #7e3a41 0%, #522026 100%)',
        color: 'white',
        padding: 'clamp(3rem, 7vw, 5rem) 1.25rem clamp(2.5rem, 5vw, 4rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Glow */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Back button & badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '1.25rem'
          }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                backgroundColor: 'rgba(255,255,255,0.12)',
                padding: '0.35rem 0.85rem',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(255,255,255,0.15)',
              padding: '0.35rem 0.95rem',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              <Shield size={14} /> Official Policy &amp; Terms
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5.5vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            color: 'white',
            textWrap: 'balance'
          }}>
            Privacy Policy &amp; Data Protection
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            opacity: 0.92,
            maxWidth: '680px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6,
            color: '#fce7ea'
          }}>
            How Zetawa Dark protects your intellectual property, handles sensitive project briefs, and safeguards personal information across our engineering operations.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.8)',
            backgroundColor: 'rgba(0,0,0,0.15)',
            padding: '0.35rem 0.85rem',
            borderRadius: '16px'
          }}>
            <Clock size={13} /> Last Updated: {lastUpdated}
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem)'
      }}>
        {/* Core Principles Grid */}
        <section aria-labelledby="principles-heading" style={{ marginBottom: '3.5rem' }}>
          <h2 id="principles-heading" style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.85rem)',
            fontWeight: 800,
            color: '#2d2d2d',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            Our Core Privacy Commitments
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '1.25rem'
          }}>
            {keyPrinciples.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid #f0e6e8',
                    boxShadow: '0 4px 16px rgba(126,58,65,0.04)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                  }}
                >
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(126, 58, 65, 0.08)',
                    color: '#7e3a41',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#2d2d2d',
                    marginBottom: '0.5rem'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    lineHeight: 1.55,
                    margin: 0
                  }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Detailed Policy Sections */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          border: '1px solid #ede5e7',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.03)'
        }}>
          {sections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              style={{
                paddingBottom: idx === sections.length - 1 ? 0 : '2.25rem',
                marginBottom: idx === sections.length - 1 ? 0 : '2.25rem',
                borderBottom: idx === sections.length - 1 ? 'none' : '1px solid #f1ecee'
              }}
            >
              <h2 style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                fontWeight: 800,
                color: '#2d2d2d',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {section.title}
              </h2>

              <p style={{
                fontSize: '0.95rem',
                color: '#475569',
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
                marginBottom: section.bullets ? '1rem' : 0
              }}>
                {section.content}
              </p>

              {section.bullets && (
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {section.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.65rem',
                        fontSize: '0.92rem',
                        color: '#475569',
                        lineHeight: 1.6
                      }}
                    >
                      <CheckCircle2
                        size={17}
                        style={{
                          color: '#7e3a41',
                          marginTop: '3px',
                          flexShrink: 0
                        }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Special Contact Card inside Section 8 */}
              {section.id === "contact-us" && (
                <div style={{
                  marginTop: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    backgroundColor: '#faf8f9',
                    border: '1px solid #f0e6e8'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      marginBottom: '0.4rem',
                      color: '#7e3a41',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      <Mail size={18} /> Executive Privacy Inquiries
                    </div>
                    <a
                      href="mailto:director@zetawa.com"
                      style={{
                        color: '#2d2d2d',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        wordBreak: 'break-all'
                      }}
                    >
                      director@zetawa.com
                    </a>
                  </div>

                  <div style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    backgroundColor: '#faf8f9',
                    border: '1px solid #f0e6e8'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      marginBottom: '0.4rem',
                      color: '#7e3a41',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      <Phone size={18} /> Phone &amp; WhatsApp Desk
                    </div>
                    <a
                      href="tel:7004265718"
                      style={{
                        color: '#2d2d2d',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.95rem'
                      }}
                    >
                      +91 7004265718
                    </a>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div style={{
          marginTop: '3.5rem',
          textAlign: 'center',
          backgroundColor: '#faf8f9',
          border: '1px solid #f0e6e8',
          borderRadius: '18px',
          padding: 'clamp(2rem, 4vw, 3rem) 1.5rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 800,
            color: '#2d2d2d',
            marginBottom: '0.75rem'
          }}>
            Ready to Build With Complete Confidence?
          </h2>
          <p style={{
            color: '#64748b',
            maxWidth: '560px',
            margin: '0 auto 1.5rem',
            fontSize: '0.95rem',
            lineHeight: 1.6
          }}>
            Every client partnership begins with mutual protection, clear intellectual property terms, and enterprise-grade discretion.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/hireforms"
              style={{
                backgroundColor: '#7e3a41',
                color: 'white',
                padding: '0.8rem 1.8rem',
                borderRadius: '50px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 14px rgba(126,58,65,0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              Start Project Inquiry &rarr;
            </Link>
            <Link
              to="/"
              style={{
                backgroundColor: 'white',
                color: '#7e3a41',
                border: '1.5px solid #7e3a41',
                padding: '0.8rem 1.8rem',
                borderRadius: '50px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '0.95rem'
              }}
            >
              Explore Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
