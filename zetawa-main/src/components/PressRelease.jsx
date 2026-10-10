import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Calendar, 
  TrendingUp, 
  Globe, 
  Award, 
  Search, 
  X, 
  ExternalLink, 
  BookOpen, 
  ArrowRight, 
  Share2, 
  Check, 
  Newspaper, 
  Mail, 
  Sparkles,
  Filter,
  ChevronRight
} from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const PressRelease = () => {
  const [releases, setReleases] = useState([]);
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Fetch all press releases from backend
  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const res = await fetch('/api/press-releases');
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setReleases(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch press releases:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReleases();
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedRelease(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Format external URLs safely
  const formatExternalUrl = (url) => {
    if (!url) return '';
    const trimmed = String(url).trim();
    if (!trimmed) return '';
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  // Distinct list of available years
  const availableYears = Array.from(
    new Set(releases.map((r) => (r.year ? r.year.trim() : 'FY2025')).filter(Boolean))
  ).sort().reverse();

  // Distinct list of categories/types
  const availableCategories = Array.from(
    new Set(releases.map((r) => r.type || 'Official Announcement').filter(Boolean))
  );

  // Filtered releases based on year, category, and search query
  const filteredReleases = releases.filter((release) => {
    const relYear = release.year ? release.year.trim() : 'FY2025';
    const relType = release.type || 'Official Announcement';

    const matchesYear = selectedYear === 'ALL' || relYear === selectedYear;
    const matchesCategory = selectedCategory === 'ALL' || relType === selectedCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      (release.title && release.title.toLowerCase().includes(query)) ||
      (release.content && release.content.toLowerCase().includes(query)) ||
      (release.source && release.source.toLowerCase().includes(query)) ||
      (relType.toLowerCase().includes(query));

    return matchesYear && matchesCategory && matchesSearch;
  });

  const getTypeStyle = (type) => {
    switch (type) {
      case 'Official Announcement':
        return { bg: 'rgba(242, 140, 40, 0.1)', text: '#f28c28', border: 'rgba(242, 140, 40, 0.25)' };
      case 'Business Update':
      case 'Company Update':
        return { bg: 'rgba(59, 75, 200, 0.1)', text: '#3b4bc8', border: 'rgba(59, 75, 200, 0.25)' };
      case 'Milestone':
      case 'Project Award':
        return { bg: 'rgba(16, 185, 129, 0.1)', text: '#047857', border: 'rgba(16, 185, 129, 0.25)' };
      case 'Partnership':
        return { bg: 'rgba(217, 119, 6, 0.1)', text: '#b45309', border: 'rgba(217, 119, 6, 0.25)' };
      case 'Industry News':
        return { bg: 'rgba(107, 45, 58, 0.1)', text: '#6b2d3a', border: 'rgba(107, 45, 58, 0.25)' };
      default:
        return { bg: 'rgba(100, 116, 139, 0.1)', text: '#475569', border: 'rgba(100, 116, 139, 0.25)' };
    }
  };

  const handleCopyLink = (releaseId) => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(releaseId);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const stats = [
    { value: releases.length.toString(), label: "Total Releases", icon: FileText, desc: "Published official records" },
    { value: availableYears.length.toString(), label: "Reporting Years", icon: TrendingUp, desc: "Historical archive" },
    { value: availableCategories.length || "4", label: "Media Categories", icon: Award, desc: "Corporate disclosures" },
    { value: "Verified", label: "Official Sources", icon: Globe, desc: "Authenticated statements" }
  ];

  return (
    <div style={{
      fontFamily: 'var(--font-family, "Plus Jakarta Sans", system-ui, sans-serif)',
      backgroundColor: 'var(--bg-canvas, #f8f6f7)',
      minHeight: '100vh',
      color: 'var(--text-primary, #1e293b)'
    }}>
      <Nav />

      {/* Global CSS for Animations and Responsiveness */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .press-hero-gradient {
          background: linear-gradient(135deg, #14080d 0%, #2a1019 50%, #1e0b12 100%);
        }

        .pr-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pr-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 35px -8px rgba(42, 16, 25, 0.12), 0 8px 16px -6px rgba(0, 0, 0, 0.04);
          border-color: rgba(242, 140, 40, 0.4) !important;
        }

        .filter-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .filter-btn:hover {
          transform: translateY(-1px);
        }

        .read-btn {
          transition: all 0.2s ease;
        }

        .read-btn:hover {
          background-color: var(--brand-maroon-hover, #55222d) !important;
          transform: translateY(-1px);
        }

        .source-btn {
          transition: all 0.2s ease;
        }

        .source-btn:hover {
          background-color: #2f3da8 !important;
          transform: translateY(-1px);
        }

        .modal-backdrop {
          animation: fadeIn 0.2s ease-out forwards;
        }

        .modal-panel {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .pr-filter-scroll-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 0.25rem;
        }

        .pr-filter-scroll-row::-webkit-scrollbar {
          display: none;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(1.8rem, 5vw, 2.25rem) !important;
          }
          .hero-subtitle {
            font-size: clamp(0.95rem, 2vw, 1.05rem) !important;
          }
          .hero-action-buttons-wrap {
            flex-direction: column !important;
            width: 100% !important;
            gap: 0.75rem !important;
          }
          .hero-action-buttons-wrap button,
          .hero-action-buttons-wrap a {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.85rem 1.25rem !important;
            box-sizing: border-box !important;
            font-size: 0.92rem !important;
            min-height: 44px !important;
          }
          .filter-btn {
            min-height: 38px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 0.45rem 0.85rem !important;
            font-size: 0.84rem !important;
            flex-shrink: 0 !important;
          }
          .search-filter-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 0.85rem !important;
          }
          .pr-main-container {
            padding: clamp(1.5rem, 4vw, 2.5rem) 1rem 3.5rem 1rem !important;
          }
          .filter-toolbar-box {
            padding: 1.25rem 1rem !important;
            margin-bottom: 1.75rem !important;
          }
          .pr-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .pr-card {
            padding: 1.35rem 1.15rem !important;
          }
          .pr-card-actions {
            flex-wrap: wrap !important;
            gap: 0.6rem !important;
          }
          .pr-card-actions button,
          .pr-card-actions a {
            flex: 1 1 130px !important;
            justify-content: center !important;
            padding: 0.7rem 0.85rem !important;
            font-size: 0.85rem !important;
            min-height: 42px !important;
            box-sizing: border-box !important;
          }
          .modal-backdrop {
            padding: 0.5rem !important;
          }
          .modal-panel {
            margin: 0 !important;
            width: 100% !important;
            max-height: 92vh !important;
            border-radius: 16px !important;
          }
          .modal-header-section {
            padding: 1.25rem 1rem 1rem 1rem !important;
          }
          .modal-header-section h2 {
            font-size: 1.35rem !important;
            word-break: break-word !important;
          }
          .modal-body-section {
            padding: 1.25rem 1rem !important;
          }
          .modal-footer-section {
            padding: 1rem !important;
            flex-direction: column !important;
            gap: 0.65rem !important;
          }
          .modal-footer-section > div,
          .modal-footer-section a,
          .modal-footer-section button {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            min-height: 44px !important;
            box-sizing: border-box !important;
            font-size: 0.92rem !important;
          }
          .media-desk-section {
            padding: 2rem 1.25rem !important;
            margin-top: 3rem !important;
          }
          .media-desk-actions {
            flex-direction: column !important;
            width: 100% !important;
            gap: 0.75rem !important;
          }
          .media-desk-actions a {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.85rem 1.25rem !important;
            min-height: 44px !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

      {/* Hero Header */}
      <header className="press-hero-gradient" style={{
        color: 'white',
        padding: 'clamp(2.5rem, 6vw, 5rem) 0 clamp(2rem, 5vw, 4rem) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {/* Subtle geometric pattern overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.07,
          background: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb / Category indicator */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(242, 140, 40, 0.12)',
            backdropFilter: 'blur(8px)',
            color: 'var(--accent-orange, #f28c28)',
            padding: '0.45rem 1.1rem',
            borderRadius: '50px',
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.8px',
            marginBottom: '1.25rem',
            border: '1px solid rgba(242, 140, 40, 0.35)'
          }}>
            <Newspaper size={16} />
            ZETAWA DARK NEWSROOM & MEDIA CENTER
          </div>

          <h1 className="hero-title" style={{
            fontSize: 'clamp(1.9rem, 5.2vw, 3.4rem)',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            lineHeight: 1.2,
            textWrap: 'balance'
          }}>
            Press Releases &amp; Corporate Announcements
          </h1>

          <p className="hero-subtitle" style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
            maxWidth: '750px',
            opacity: 0.92,
            lineHeight: 1.6,
            fontWeight: 400,
            marginBottom: '2rem'
          }}>
            Official press disclosures, corporate milestones, leadership updates, and strategic technology developments from Zetawa Dark.
          </p>

          <div className="hero-action-buttons-wrap" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('releases-archive');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                backgroundColor: 'var(--accent-orange, #f28c28)',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 6px 20px rgba(242, 140, 40, 0.35)',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: '44px'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-orange-hover, #e07b18)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-orange, #f28c28)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Browse Announcements <ArrowRight size={16} />
            </button>

            <a
              href="mailto:vansh100101102@gmail.com?subject=Press%20Inquiry%20-%20Zetawa%20Dark"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                transition: 'all 0.25s ease',
                backdropFilter: 'blur(8px)',
                minHeight: '44px'
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.16)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Mail size={16} /> Contact Media Desk
            </a>
          </div>
        </div>
      </header>

      {/* Corporate Stats Strip */}
      <section style={{
        backgroundColor: 'var(--bg-surface, #ffffff)',
        borderBottom: '1px solid var(--border-subtle, #e2e8f0)',
        padding: '2.5rem 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
          <div className="stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'var(--bg-canvas, #faf8f9)',
                    borderRadius: '16px',
                    border: '1px solid var(--border-default, #e2e8f0)',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.02)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(42, 16, 25, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(242, 140, 40, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.02)';
                    e.currentTarget.style.borderColor = 'var(--border-default, #e2e8f0)';
                  }}
                >
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(242, 140, 40, 0.1)',
                    color: 'var(--accent-orange, #f28c28)',
                    border: '1px solid rgba(242, 140, 40, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary, #1e293b)', lineHeight: 1.1 }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--brand-maroon, #6b2d3a)', margin: '2px 0' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted, #94a3b8)' }}>
                      {stat.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <main id="releases-archive" className="pr-main-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1rem, 3.5vw, 2rem) 4rem' }}>
        
        {/* Search & Filter Toolbar */}
        <div className="filter-toolbar-box" style={{
          backgroundColor: 'var(--bg-surface, #ffffff)',
          borderRadius: '16px',
          border: '1px solid var(--border-default, #e2e8f0)',
          padding: 'clamp(1.25rem, 3vw, 1.75rem)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          marginBottom: '2.5rem'
        }}>
          {/* Top row: Search input & Active count */}
          <div className="search-filter-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.25rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            {/* Search Bar */}
            <div style={{
              position: 'relative',
              flex: '1',
              minWidth: '280px'
            }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }}
              />
              <input
                type="text"
                placeholder="Search by title, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 2.5rem 0.75rem 2.6rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-default, #cbd5e1)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  backgroundColor: 'var(--bg-canvas, #f8fafc)',
                  color: 'var(--text-primary, #1e293b)',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent-orange, #f28c28)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(242, 140, 40, 0.15)';
                  e.target.style.backgroundColor = 'var(--bg-surface, #ffffff)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-default, #cbd5e1)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.backgroundColor = 'var(--bg-canvas, #f8fafc)';
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Results count pill */}
            <div style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary, #64748b)',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>Showing <strong>{filteredReleases.length}</strong> of {releases.length} announcements</span>
            </div>
          </div>

          {/* Bottom row: Filter Pills (Horizontally scrollable on mobile) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            borderTop: '1px solid var(--border-subtle, #f1f5f9)',
            paddingTop: '1.25rem'
          }}>
            {/* Year Filters */}
            <div className="pr-filter-scroll-row">
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary, #475569)', minWidth: '75px', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                <Calendar size={14} /> Year:
              </span>
              <button
                className="filter-btn"
                onClick={() => setSelectedYear('ALL')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '30px',
                  border: selectedYear === 'ALL' ? '1.5px solid var(--accent-orange, #f28c28)' : '1px solid var(--border-default, #e2e8f0)',
                  backgroundColor: selectedYear === 'ALL' ? 'var(--brand-maroon, #6b2d3a)' : 'var(--bg-surface, #ffffff)',
                  color: selectedYear === 'ALL' ? '#ffffff' : 'var(--text-secondary, #475569)',
                  fontWeight: selectedYear === 'ALL' ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  flexShrink: 0,
                  boxShadow: selectedYear === 'ALL' ? '0 4px 12px rgba(107, 45, 58, 0.2)' : 'none'
                }}
              >
                All Years ({releases.length})
              </button>
              {availableYears.map((year) => {
                const count = releases.filter((r) => (r.year || 'FY2025') === year).length;
                const isSelected = selectedYear === year;
                return (
                  <button
                    key={year}
                    className="filter-btn"
                    onClick={() => setSelectedYear(year)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '30px',
                      border: isSelected ? '1.5px solid var(--accent-orange, #f28c28)' : '1px solid var(--border-default, #e2e8f0)',
                      backgroundColor: isSelected ? 'var(--brand-maroon, #6b2d3a)' : 'var(--bg-surface, #ffffff)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary, #475569)',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      flexShrink: 0,
                      boxShadow: isSelected ? '0 4px 12px rgba(107, 45, 58, 0.2)' : 'none'
                    }}
                  >
                    {year} ({count})
                  </button>
                );
              })}
            </div>

            {/* Category Filters (if multiple exist) */}
            {availableCategories.length > 1 && (
              <div className="pr-filter-scroll-row">
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary, #475569)', minWidth: '75px', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                  <Filter size={14} /> Category:
                </span>
                <button
                  className="filter-btn"
                  onClick={() => setSelectedCategory('ALL')}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: '20px',
                    border: selectedCategory === 'ALL' ? '1.5px solid var(--accent-orange, #f28c28)' : '1px solid var(--border-default, #e2e8f0)',
                    backgroundColor: selectedCategory === 'ALL' ? 'var(--brand-maroon, #6b2d3a)' : 'var(--bg-surface, #ffffff)',
                    color: selectedCategory === 'ALL' ? '#ffffff' : 'var(--text-secondary, #64748b)',
                    fontWeight: selectedCategory === 'ALL' ? 700 : 500,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  All Types
                </button>
                {availableCategories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      className="filter-btn"
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '0.35rem 0.85rem',
                        borderRadius: '20px',
                        border: isSelected ? '1.5px solid var(--accent-orange, #f28c28)' : '1px solid var(--border-default, #e2e8f0)',
                        backgroundColor: isSelected ? 'var(--brand-maroon, #6b2d3a)' : 'var(--bg-surface, #ffffff)',
                        color: isSelected ? '#ffffff' : 'var(--text-secondary, #64748b)',
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '3px solid rgba(242, 140, 40, 0.2)',
              borderTopColor: 'var(--accent-orange, #f28c28)',
              borderRadius: '50%',
              margin: '0 auto 1.5rem',
              animation: 'spin 0.8s linear infinite'
            }} />
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary, #334155)', fontWeight: 600 }}>Loading announcements...</h3>
            <p style={{ color: 'var(--text-secondary, #64748b)', fontSize: '0.95rem' }}>Fetching records from the Zetawa Dark Newsroom</p>
          </div>
        ) : filteredReleases.length === 0 ? (
          /* Empty State */
          <div style={{
            backgroundColor: 'var(--bg-surface, #ffffff)',
            borderRadius: '16px',
            border: '1px solid var(--border-default, #e2e8f0)',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-canvas, #f1f5f9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#94a3b8'
            }}>
              <FileText size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary, #1e293b)', marginBottom: '0.5rem' }}>
              No press releases found
            </h3>
            <p style={{ color: 'var(--text-secondary, #64748b)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
              {searchQuery || selectedYear !== 'ALL' || selectedCategory !== 'ALL'
                ? "No announcements matched your current filter criteria. Try resetting your search or selecting a different year."
                : "There are currently no public press releases uploaded to the system."}
            </p>
            {(searchQuery || selectedYear !== 'ALL' || selectedCategory !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedYear('ALL');
                  setSelectedCategory('ALL');
                }}
                style={{
                  padding: '0.65rem 1.4rem',
                  backgroundColor: 'var(--brand-maroon, #6b2d3a)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(107, 45, 58, 0.2)'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--brand-maroon-hover, #55222d)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--brand-maroon, #6b2d3a)'; }}
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          /* Announcements Grid */
          <div className="pr-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '1.75rem'
          }}>
            {filteredReleases.map((release, index) => {
              const typeStyle = getTypeStyle(release.type);
              const hasExternalLink = Boolean(release.linkedinUrl);
              const formattedLink = formatExternalUrl(release.linkedinUrl);

              return (
                <article
                  key={release._id || release.id || index}
                  className="pr-card"
                  style={{
                    backgroundColor: 'var(--bg-surface, #ffffff)',
                    borderRadius: '16px',
                    border: '1px solid var(--border-default, #e2e8f0)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 'clamp(1.5rem, 3.5vw, 2rem)',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    height: '100%'
                  }}
                  onClick={() => setSelectedRelease(release)}
                >
                  {/* Top Color Accent Line */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #6b2d3a 0%, #f28c28 100%)'
                  }} />

                  <div>
                    {/* Header: Category Badge + Year + Date */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1.25rem',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        backgroundColor: typeStyle.bg,
                        color: typeStyle.text,
                        border: `1px solid ${typeStyle.border}`,
                        padding: '0.35rem 0.85rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {release.type || 'Announcement'}
                      </span>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-muted, #64748b)',
                        fontSize: '0.85rem',
                        fontWeight: 500
                      }}>
                        <Calendar size={14} />
                        <span>{release.date}</span>
                        {release.year && (
                          <span style={{
                            backgroundColor: 'var(--bg-canvas, #f1f5f9)',
                            color: 'var(--text-secondary, #475569)',
                            border: '1px solid var(--border-subtle, #e2e8f0)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}>
                            {release.year}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Headline */}
                    <h2 style={{
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: 'var(--text-primary, #0f172a)',
                      lineHeight: 1.35,
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {release.title}
                    </h2>

                    {/* Content Excerpt (if provided) */}
                    {release.content ? (
                      <p style={{
                        color: 'var(--text-secondary, #475569)',
                        fontSize: '0.95rem',
                        lineHeight: 1.65,
                        marginBottom: '1.5rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {release.content}
                      </p>
                    ) : (
                      <p style={{
                        color: 'var(--text-muted, #94a3b8)',
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                        marginBottom: '1.5rem'
                      }}>
                        Official release statement. Click to view announcement details.
                      </p>
                    )}
                  </div>

                  {/* Card Bottom / Action Row (Pinned) */}
                  <div className="pr-card-actions" style={{
                    borderTop: '1px solid var(--border-subtle, #f1f5f9)',
                    paddingTop: '1.25rem',
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    flexWrap: 'wrap'
                  }}>
                    {/* Read Full Release Button */}
                    <button
                      className="read-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRelease(release);
                      }}
                      style={{
                        backgroundColor: 'var(--brand-maroon, #6b2d3a)',
                        color: 'white',
                        border: 'none',
                        padding: '0.65rem 1.15rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        boxShadow: '0 2px 8px rgba(107, 45, 58, 0.2)',
                        minHeight: '40px',
                        whiteSpace: 'normal',
                        lineHeight: 1.35
                      }}
                    >
                      <BookOpen size={15} /> Read Details
                    </button>

                    {/* Source / LinkedIn Link (if available) */}
                    {hasExternalLink && (
                      <a
                        href={formattedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="source-btn"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          backgroundColor: 'var(--accent-indigo, #3b4bc8)',
                          color: 'white',
                          textDecoration: 'none',
                          padding: '0.65rem 1rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          boxShadow: '0 2px 8px rgba(59, 75, 200, 0.2)',
                          minHeight: '40px',
                          whiteSpace: 'normal',
                          lineHeight: 1.35
                        }}
                        title={`Open source on ${release.source || 'Media'}`}
                      >
                        <Globe size={15} />
                        <span>{release.source || 'Source'}</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Media Desk Contact & Resources Strip (Replaced beige panel with sleek dark glassmorphism) */}
        <section className="media-desk-section" style={{
          marginTop: 'clamp(3rem, 6vw, 5rem)',
          background: 'linear-gradient(135deg, #14080d 0%, #2a1019 50%, #1e0b12 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.25rem, 4vw, 3rem)',
          boxShadow: '0 24px 60px rgba(20, 8, 13, 0.45)',
          position: 'relative',
          overflow: 'hidden',
          color: '#ffffff'
        }}>
          {/* Ambient Background Glow replacing the old beige block */}
          <div style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle, rgba(242, 140, 40, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--accent-orange, #f28c28)',
              fontWeight: 700,
              fontSize: '0.82rem',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              marginBottom: '0.75rem',
              backgroundColor: 'rgba(242, 140, 40, 0.12)',
              border: '1px solid rgba(242, 140, 40, 0.3)',
              padding: '0.35rem 0.85rem',
              borderRadius: '20px'
            }}>
              <Mail size={16} /> Press & Media Relations Desk
            </div>

            <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
              Have a media inquiry or interview request?
            </h3>

            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '2rem' }}>
              Members of the press, industry analysts, and conference organizers are invited to connect directly with the Zetawa Dark communications team for official commentary, executive bios, and brand assets.
            </p>

            <div className="media-desk-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="mailto:vansh100101102@gmail.com?subject=Press%20Inquiry%20-%20Zetawa%20Dark"
                style={{
                  backgroundColor: 'var(--accent-orange, #f28c28)',
                  color: 'white',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 6px 20px rgba(242, 140, 40, 0.35)',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  minHeight: '44px'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-orange-hover, #e07b18)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-orange, #f28c28)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Mail size={18} /> Inquire with Communications
              </a>

              <Link
                to="/aboutus"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s ease',
                  minHeight: '44px'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.16)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                About Zetawa Dark <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Full Press Release Reader Modal */}
      {selectedRelease && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedRelease(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(14, 7, 10, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1.5rem'
          }}
        >
          <div
            className="modal-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--bg-surface, #ffffff)',
              borderRadius: '20px',
              maxWidth: '750px',
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.45)',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid var(--border-default, #e2e8f0)'
            }}
          >
            {/* Modal Top Accent Line */}
            <div style={{
              height: '5px',
              background: 'linear-gradient(90deg, #6b2d3a 0%, #f28c28 100%)',
              width: '100%'
            }} />

            {/* Modal Header */}
            <div className="modal-header-section" style={{
              padding: '1.75rem 2rem 1.25rem 2rem',
              borderBottom: '1px solid var(--border-subtle, #f1f5f9)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                  <span style={{
                    backgroundColor: getTypeStyle(selectedRelease.type).bg,
                    color: getTypeStyle(selectedRelease.type).text,
                    border: `1px solid ${getTypeStyle(selectedRelease.type).border}`,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {selectedRelease.type || 'Official Announcement'}
                  </span>

                  {selectedRelease.year && (
                    <span style={{
                      backgroundColor: 'var(--bg-canvas, #f1f5f9)',
                      color: 'var(--text-secondary, #475569)',
                      border: '1px solid var(--border-subtle, #e2e8f0)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {selectedRelease.year}
                    </span>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted, #64748b)', fontSize: '0.85rem' }}>
                    <Calendar size={14} />
                    <span>{selectedRelease.date}</span>
                  </div>
                </div>

                <h2 style={{
                  fontSize: '1.65rem',
                  fontWeight: 800,
                  color: 'var(--text-primary, #0f172a)',
                  lineHeight: 1.3,
                  margin: 0
                }}>
                  {selectedRelease.title}
                </h2>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedRelease(null)}
                style={{
                  background: 'var(--bg-canvas, #f1f5f9)',
                  border: '1px solid var(--border-subtle, #e2e8f0)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted, #64748b)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--border-subtle, #e2e8f0)';
                  e.currentTarget.style.color = '#0f172a';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-canvas, #f1f5f9)';
                  e.currentTarget.style.color = 'var(--text-muted, #64748b)';
                }}
                title="Close (Esc)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div className="modal-body-section" style={{
              padding: '2rem',
              overflowY: 'auto',
              flex: 1
            }}>
              {/* Publication metadata notice */}
              <div style={{
                backgroundColor: 'var(--bg-canvas, #f8fafc)',
                borderLeft: '4px solid var(--brand-maroon, #6b2d3a)',
                padding: '0.85rem 1.25rem',
                borderRadius: '0 8px 8px 0',
                marginBottom: '1.75rem',
                fontSize: '0.85rem',
                color: 'var(--text-secondary, #475569)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <div>
                  <strong>Official Release</strong> • Published on {selectedRelease.date}
                  {selectedRelease.source && ` via ${selectedRelease.source}`}
                </div>
                <button
                  onClick={() => handleCopyLink(selectedRelease._id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copiedId === selectedRelease._id ? '#047857' : 'var(--brand-maroon, #6b2d3a)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedId === selectedRelease._id ? (
                    <>
                      <Check size={14} /> Link Copied
                    </>
                  ) : (
                    <>
                      <Share2 size={14} /> Share
                    </>
                  )}
                </button>
              </div>

              {/* Announcement Body Content */}
              {selectedRelease.content ? (
                <div style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'var(--text-primary, #334155)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {selectedRelease.content}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem 1rem',
                  color: 'var(--text-muted, #64748b)'
                }}>
                  <p style={{ fontSize: '1rem', fontStyle: 'italic' }}>
                    No extended text was included with this press announcement. Please refer to the official external link below for full coverage.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="modal-footer-section" style={{
              padding: '1.25rem 2rem',
              borderTop: '1px solid var(--border-subtle, #f1f5f9)',
              backgroundColor: 'var(--bg-canvas, #f8fafc)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                {selectedRelease.linkedinUrl && (
                  <a
                    href={formatExternalUrl(selectedRelease.linkedinUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: 'var(--accent-indigo, #3b4bc8)',
                      color: 'white',
                      padding: '0.65rem 1.25rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 2px 8px rgba(59, 75, 200, 0.25)',
                      transition: 'all 0.2s ease',
                      minHeight: '40px'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#2f3da8'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-indigo, #3b4bc8)'; }}
                  >
                    <Globe size={16} />
                    <span>View Official Source ({selectedRelease.source || 'LinkedIn'})</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedRelease(null)}
                style={{
                  backgroundColor: 'var(--bg-surface, #ffffff)',
                  color: 'var(--text-secondary, #475569)',
                  border: '1px solid var(--border-default, #cbd5e1)',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minHeight: '40px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-canvas, #f1f5f9)';
                  e.currentTarget.style.color = 'var(--text-primary, #0f172a)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface, #ffffff)';
                  e.currentTarget.style.color = 'var(--text-secondary, #475569)';
                }}
              >
                Close Release
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Footer */}
      <Footer />
    </div>
  );
};

export default PressRelease;