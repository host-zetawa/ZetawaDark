import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Nav from './Nav';
import Footer from './Footer';
import { 
  User, Mail, Shield, Briefcase, Plus, Clock, DollarSign, Calendar, 
  CheckCircle2, ArrowRight, MessageSquare, ExternalLink, RefreshCw, 
  Sparkles, Layers, FileText, Check, Phone, ArrowUpRight
} from 'lucide-react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const API_URL = '';

const STATUS_CONFIG = {
  'Pending Review': {
    label: 'Pending Review',
    color: '#b45309',
    bg: '#fef3c7',
    border: '#fde68a',
    step: 1,
    desc: 'Our engineering lead is reviewing your project requirements and scope.'
  },
  'In Discussion': {
    label: 'Technical Discussion',
    color: '#1d4ed8',
    bg: '#dbeafe',
    border: '#bfdbfe',
    step: 2,
    desc: 'Architecture consultation and discovery call scheduled.'
  },
  'Proposal Sent': {
    label: 'Proposal & Scope Finalized',
    color: '#6b21a8',
    bg: '#f3e8ff',
    border: '#e9d5ff',
    step: 3,
    desc: 'Custom technical proposal and milestone sprint roadmap sent.'
  },
  'In Development': {
    label: 'In Sprint Build',
    color: '#3730a3',
    bg: '#e0e7ff',
    border: '#c7d2fe',
    step: 4,
    desc: 'Dedicated engineering squad is actively building and deploying milestones.'
  },
  'Completed': {
    label: 'Delivered & Launched',
    color: '#15803d',
    bg: '#dcfce7',
    border: '#bbf7d0',
    step: 5,
    desc: 'Project successfully built, QA tested, and deployed to production.'
  },
  'Archived': {
    label: 'Archived',
    color: '#4b5563',
    bg: '#f3f4f6',
    border: '#e5e7eb',
    step: 1,
    desc: 'Inquiry archived or deferred.'
  }
};

const UserProfile = () => {
  const { user, isAdmin } = useAppContext();
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const fetchMyInquiries = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/hire/my-requests?email=${encodeURIComponent(user.email)}`);
      if (res.data.success) {
        setInquiries(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch user project requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInquiries();
  }, [user?.email]);

  const filteredInquiries = inquiries.filter(inq => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['Pending Review', 'In Discussion', 'Proposal Sent', 'In Development'].includes(inq.status);
    if (activeTab === 'completed') return inq.status === 'Completed';
    return true;
  });

  const activeCount = inquiries.filter(i => ['Pending Review', 'In Discussion', 'Proposal Sent', 'In Development'].includes(i.status)).length;
  const completedCount = inquiries.filter(i => i.status === 'Completed').length;

  return (
    <div style={{ 
      fontFamily: 'var(--font-family, system-ui, -apple-system, sans-serif)',
      backgroundColor: 'var(--bg)',
      color: 'var(--text)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Nav />
      
      <style>{`
        .user-tab-btn {
          white-space: nowrap !important;
          word-break: normal !important;
          flex-shrink: 0 !important;
          min-width: max-content !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .user-profile-tabs {
          display: flex !important;
          flex-wrap: nowrap !important;
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch !important;
          scrollbar-width: none !important;
        }
        .user-profile-tabs::-webkit-scrollbar {
          display: none !important;
        }
        .milestone-container {
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch !important;
          scrollbar-width: none !important;
        }
        .milestone-container::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>
      
      <div style={{ flex: 1, padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 3vw, 1.5rem) 3rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* User Hero Banner */}
        <div style={{
          background: 'var(--banner-cta-bg)',
          borderRadius: '24px',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: 'var(--banner-cta-text)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--banner-cta-border)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(217, 107, 20, 0.12) 0%, transparent 70%)',
            borderRadius: '50%'
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 3vw, 1.5rem)', flexWrap: 'wrap' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--surface)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                fontWeight: 800,
                boxShadow: 'var(--shadow-md)',
                border: '3px solid var(--border)',
                flexShrink: 0
              }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', fontWeight: 800, margin: 0, color: 'var(--banner-cta-text)' }}>
                    {user?.name || 'Client Portal'}
                  </h1>
                  {isAdmin && (
                    <span style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text)' }}>
                      Admin
                    </span>
                  )}
                </div>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--banner-cta-text-muted)' }}>
                  <Mail size={15} /> {user?.email || 'N/A'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link
                to="/hireforms"
                style={{
                  backgroundColor: 'var(--accent-orange, #f28c28)',
                  color: '#ffffff',
                  padding: '0.75rem 1.4rem',
                  minHeight: '44px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 14px rgba(242, 140, 40, 0.3)',
                  transition: 'transform 0.2s ease',
                  touchAction: 'manipulation'
                }}>
                <Plus size={16} /> Start New Project Consultation
              </Link>

              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  style={{
                    backgroundColor: 'var(--banner-cta-btn-sec-bg)',
                    color: 'var(--banner-cta-btn-sec-color)',
                    border: '1.5px solid var(--banner-cta-btn-sec-border)',
                    padding: '0.75rem 1.2rem',
                    minHeight: '44px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    touchAction: 'manipulation'
                  }}>
                  <Shield size={16} /> Admin Command Center
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
            gap: '1rem',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--banner-cta-border)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', fontWeight: 600, color: 'var(--banner-cta-text-muted)' }}>Total Projects</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--banner-cta-text)' }}>{inquiries.length}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', fontWeight: 600, color: 'var(--banner-cta-text-muted)' }}>Active Pipelines</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent)' }}>{activeCount}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', fontWeight: 600, color: 'var(--banner-cta-text-muted)' }}>Completed & Shipped</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--success, #16a34a)' }}>{completedCount}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', fontWeight: 600, color: 'var(--banner-cta-text-muted)' }}>Engineering Squad</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginTop: '0.4rem' }}>Zetawa Dark Sprint Squad</div>
            </div>
          </div>
        </div>

        {/* Section Header & Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)', margin: 0 }}>
              My Projects & Service Inquiries
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.2rem 0 0' }}>
              Track real-time sprint milestones, status updates, and engineer feedback.
            </p>
          </div>

          <div 
            className="user-profile-tabs"
            style={{
              display: 'flex',
              gap: '0.4rem',
              background: 'var(--surface)',
              padding: '0.35rem',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              overflowX: 'auto',
              maxWidth: '100%',
              flexWrap: 'nowrap',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none'
            }}
          >
            <button
              className="user-tab-btn"
              onClick={() => setActiveTab('all')}
              style={{
                padding: '0.45rem 0.95rem',
                minHeight: '38px',
                whiteSpace: 'nowrap',
                wordBreak: 'normal',
                flexShrink: 0,
                minWidth: 'max-content',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: activeTab === 'all' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'all' ? 'var(--primary-contrast)' : 'var(--text-muted)',
                touchAction: 'manipulation'
              }}>
              All ({inquiries.length})
            </button>
            <button
              className="user-tab-btn"
              onClick={() => setActiveTab('active')}
              style={{
                padding: '0.45rem 0.95rem',
                minHeight: '38px',
                whiteSpace: 'nowrap',
                wordBreak: 'normal',
                flexShrink: 0,
                minWidth: 'max-content',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: activeTab === 'active' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'active' ? 'var(--primary-contrast)' : 'var(--text-muted)',
                touchAction: 'manipulation'
              }}>
              Active ({activeCount})
            </button>
            <button
              className="user-tab-btn"
              onClick={() => setActiveTab('completed')}
              style={{
                padding: '0.45rem 0.95rem',
                minHeight: '38px',
                whiteSpace: 'nowrap',
                wordBreak: 'normal',
                flexShrink: 0,
                minWidth: 'max-content',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: activeTab === 'completed' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'completed' ? 'var(--primary-contrast)' : 'var(--text-muted)',
                touchAction: 'manipulation'
              }}>
              Completed ({completedCount})
            </button>
            <button
              onClick={fetchMyInquiries}
              style={{
                padding: '0.4rem 0.6rem',
                minHeight: '38px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                color: 'var(--primary)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                touchAction: 'manipulation'
              }}
              title="Refresh Inquiries">
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Inquiries Content */}
        {loading ? (
          <div style={{ background: 'var(--surface)', borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center', border: '1px solid var(--border)' }}>
            <div style={{ display: 'inline-block', width: '36px', height: '36px', border: '3px solid var(--border)', borderTop: '3px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontWeight: 600 }}>Loading project inquiries...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div style={{
            background: 'var(--surface)',
            borderRadius: '20px',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px dashed var(--border)',
            boxShadow: 'var(--shadow)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-alt)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <Sparkles size={30} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem' }}>
              No Consultation Requests Found
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
              Looking to build a custom web app, integrate autonomous AI tools, revamp your UI/UX, or scale your cloud infrastructure?
            </p>
            <Link
              to="/hireforms"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-contrast)',
                padding: '0.85rem 1.75rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: 'var(--shadow)'
              }}>
              Launch Project Sprint Form <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredInquiries.map((inq) => {
              const statusInfo = STATUS_CONFIG[inq.status] || STATUS_CONFIG['Pending Review'];
              const currentStep = statusInfo.step;

              return (
                <div
                  key={inq._id}
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    padding: 'clamp(1rem, 3.5vw, 2rem)',
                    boxShadow: 'var(--shadow)',
                    transition: 'transform 0.2s ease'
                  }}>
                  
                  {/* Top Bar: Title, Status Pill, Meta */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', margin: 0 }}>
                          {inq.projectTitle || inq.company || 'Technology Consultation'}
                        </h3>
                        <span style={{
                          padding: '0.35rem 0.85rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          backgroundColor: statusInfo.bg,
                          color: statusInfo.color,
                          border: `1px solid ${statusInfo.border}`,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: statusInfo.color }} />
                          {statusInfo.label}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {inq.company && (
                          <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
                            {inq.company}
                          </span>
                        )}
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Calendar size={14} /> Submitted: {new Date(inq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        {inq.budget && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#047857', fontWeight: 600 }}>
                            <DollarSign size={14} /> Budget: {inq.budget}
                          </span>
                        )}
                        {inq.timeline && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#1d4ed8', fontWeight: 600 }}>
                            <Clock size={14} /> Target: {inq.timeline}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <a
                        href="https://wa.me/917004265718"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: '#25D366',
                          color: 'white',
                          padding: '0.45rem 0.85rem',
                          minHeight: '38px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          touchAction: 'manipulation'
                        }}>
                        <Phone size={14} /> Fast Support
                      </a>
                    </div>
                  </div>

                  {/* Visual Milestone Progress Tracker */}
                  <div className="milestone-container" style={{ marginBottom: '1.75rem', padding: '1rem', backgroundColor: 'var(--bg-alt)', borderRadius: '12px', border: '1px solid var(--border)', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.5px' }}>
                      Sprint Milestone Journey:
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', minWidth: '460px', gap: '0.5rem', position: 'relative' }}>
                      {[
                        { stepNum: 1, title: '1. Submitted' },
                        { stepNum: 2, title: '2. Discovery' },
                        { stepNum: 3, title: '3. Proposal' },
                        { stepNum: 4, title: '4. Sprint Build' },
                        { stepNum: 5, title: '5. Launch' }
                      ].map((s) => {
                        const isDone = currentStep >= s.stepNum;
                        const isCurrent = currentStep === s.stepNum;

                        return (
                          <div key={s.stepNum} style={{ textAlign: 'center' }}>
                            <div style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: isDone ? 'var(--primary)' : 'var(--border)',
                              color: isDone ? 'var(--primary-contrast)' : 'var(--text-muted)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              margin: '0 auto 0.4rem',
                              border: isCurrent ? '3px solid var(--primary)' : 'none',
                              boxShadow: isCurrent ? '0 0 0 3px rgba(126, 58, 65, 0.2)' : 'none'
                            }}>
                              {isDone ? <Check size={14} /> : s.stepNum}
                            </div>
                            <span style={{
                              fontSize: '0.75rem',
                              fontWeight: isDone ? 700 : 500,
                              color: isDone ? 'var(--text)' : 'var(--text-muted)',
                              whiteSpace: 'nowrap',
                              wordBreak: 'normal',
                              display: 'block'
                            }}>
                              {s.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Services Requested Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    {Array.isArray(inq.services) && inq.services.map((svc, i) => (
                      <span key={i} style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        backgroundColor: 'var(--bg-alt)',
                        color: 'var(--primary)',
                        border: '1px solid var(--border)'
                      }}>
                        {svc}
                      </span>
                    ))}
                  </div>

                  {/* Project Scope Description */}
                  {inq.projectDescription && (
                    <div style={{ marginBottom: '1.25rem', backgroundColor: 'var(--surface-elevated)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        Your Submitted Scope:
                      </div>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                        {inq.projectDescription}
                      </p>
                    </div>
                  )}

                  {/* Admin Notes & Direct Feedback Callout */}
                  {inq.adminNotes ? (
                    <div style={{
                      backgroundColor: 'rgba(2, 132, 199, 0.1)',
                      borderLeft: '4px solid #0284c7',
                      padding: '1rem 1.25rem',
                      borderRadius: '0 10px 10px 0'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          <MessageSquare size={14} /> Zetawa Dark Team Update & Next Steps:
                        </span>
                        {inq.estimatedCompletion && (
                          <span style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 700 }}>
                            Target Milestone: {inq.estimatedCompletion}
                          </span>
                        )}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.5 }}>
                        {inq.adminNotes}
                      </p>
                    </div>
                  ) : (
                    <div style={{
                      backgroundColor: 'rgba(217, 119, 6, 0.1)',
                      borderLeft: '4px solid #d97706',
                      padding: '0.85rem 1.25rem',
                      borderRadius: '0 10px 10px 0',
                      fontSize: '0.85rem',
                      color: 'var(--text)'
                    }}>
                      {statusInfo.desc}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
