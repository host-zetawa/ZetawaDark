import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, LogIn, LogOut, User, Shield, Briefcase, FileText, Sparkles, Phone, ArrowRight, Sun, Moon } from 'lucide-react';
import img1 from '../assets/vite.png';
import { useAppContext } from '../context/AppContext';
import AuthModal from './AuthModal';

function ZetawaNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zetawa-theme') || localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, user, isAdmin, logout } = useAppContext();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/aboutus' },
    { name: 'Services', path: '/services' },
    { name: 'Press Releases', path: '/press-release' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Careers', path: '/careers' },
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('zetawa-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowDropdown(false);
    handleMenuClose();
    try {
      await logout();
    } catch (err) {
      console.error("Logout error", err);
    }
    navigate('/');
  };

  const handleNavClick = (item) => {
    navigate(item.path);
    handleMenuClose();
  };

  const handleMenuOpen = () => {
    setIsMenuAnimating(true);
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setIsMenuAnimating(false), 300);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) handleMenuClose();
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  const userFirstName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .nav-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: var(--nav-bg) !important;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--nav-border) !important;
          box-shadow: var(--shadow) !important;
          z-index: 1000;
          transition: background 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      color 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      padding 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-header.scrolled {
          padding: 0.45rem 0;
          background: var(--surface-elevated) !important;
          border-bottom: 1px solid var(--border) !important;
          box-shadow: var(--shadow) !important;
        }

        .brand-name {
          color: var(--nav-text) !important;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: 0.8px;
          background: none !important;
          -webkit-text-fill-color: var(--nav-text) !important;
          transition: all 0.3s ease;
        }

        .nav-header.scrolled .brand-name {
          font-size: 1.02rem;
        }

        .nav-link {
          color: var(--nav-link) !important;
        }

        .nav-link:hover {
          color: var(--nav-link-hover) !important;
          background: rgba(242, 140, 40, 0.12) !important;
          border-color: rgba(242, 140, 40, 0.3) !important;
        }

        .nav-link.active {
          color: var(--accent) !important;
          background: rgba(242, 140, 40, 0.16) !important;
          border-color: rgba(242, 140, 40, 0.45) !important;
        }

        .nav-theme-btn {
          background: var(--nav-theme-btn-bg) !important;
          border-color: var(--nav-theme-btn-border) !important;
          color: var(--nav-theme-btn-color) !important;
        }

        .nav-auth-btn {
          background: var(--primary) !important;
          color: var(--primary-contrast) !important;
          border-color: var(--primary) !important;
        }

        .user-chip {
          background: var(--nav-theme-btn-bg) !important;
          border-color: var(--nav-theme-btn-border) !important;
          color: var(--nav-text) !important;
        }

        .menu-button {
          color: var(--nav-text) !important;
          background: var(--nav-theme-btn-bg) !important;
          border-color: var(--nav-theme-btn-border) !important;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }

        .nav-brand:hover {
          transform: translateY(-1px);
        }

        .logo-container {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 3px;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-header.scrolled .logo-container {
          width: 32px;
          height: 32px;
        }

        .logo-container:hover {
          transform: scale(1.06) rotate(6deg);
          box-shadow: 0 6px 20px rgba(242, 140, 40, 0.45);
        }

        .logo-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .brand-name {
          color: var(--nav-text, #ffffff);
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: 0.8px;
          background: var(--hero-title-gradient, linear-gradient(135deg, #ffffff 60%, rgba(242, 140, 40, 0.9) 100%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: all 0.3s ease;
        }

        .nav-header.scrolled .brand-name {
          font-size: 1.02rem;
        }

        .nav-links {
          display: none;
          align-items: center;
          gap: 0.35rem;
        }

        .nav-link {
          color: var(--nav-link, rgba(255, 255, 255, 0.82));
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.45rem 0.9rem;
          border-radius: 9999px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          border: 1px solid transparent;
        }

        .nav-link:hover {
          color: var(--nav-link-hover, #ffffff);
          background: rgba(242, 140, 40, 0.1);
          border-color: rgba(242, 140, 40, 0.25);
          transform: translateY(-1px);
        }

        .nav-link.active {
          color: var(--accent-orange, #f28c28);
          background: rgba(242, 140, 40, 0.16);
          border-color: rgba(242, 140, 40, 0.45);
          box-shadow: 0 0 14px rgba(242, 140, 40, 0.22);
        }

        .nav-theme-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--glass-card-bg, rgba(255, 255, 255, 0.07));
          border: 1px solid var(--border-default, rgba(255, 255, 255, 0.16));
          color: var(--text-primary, rgba(255, 255, 255, 0.9));
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
        }

        .nav-theme-btn:hover {
          background: rgba(242, 140, 40, 0.18);
          border-color: rgba(242, 140, 40, 0.5);
          color: #f28c28;
          transform: scale(1.08) rotate(15deg);
          box-shadow: 0 0 14px rgba(242, 140, 40, 0.3);
        }

        .nav-auth-btn {
          background: linear-gradient(135deg, rgba(242, 140, 40, 0.18) 0%, rgba(107, 45, 58, 0.35) 100%);
          border: 1px solid rgba(242, 140, 40, 0.45);
          color: #ffffff;
          padding: 0.45rem 1.15rem;
          border-radius: 9999px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: inherit;
          white-space: nowrap;
          backdrop-filter: blur(8px);
        }

        .nav-auth-btn:hover {
          background: linear-gradient(135deg, #f28c28 0%, #e07b18 100%);
          color: #ffffff;
          border-color: #f28c28;
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(242, 140, 40, 0.4);
        }

        .nav-user-btn {
          background: var(--glass-card-bg, rgba(255, 255, 255, 0.08));
          border: 1px solid var(--border-default, rgba(255, 255, 255, 0.2));
          color: var(--text-primary, #ffffff);
          padding: 0.3rem 0.8rem 0.3rem 0.3rem;
          border-radius: 9999px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.55rem;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: inherit;
          position: relative;
          white-space: nowrap;
          backdrop-filter: blur(8px);
        }

        .nav-user-btn:hover {
          background: var(--bg-surface-elevated, rgba(255, 255, 255, 0.14));
          border-color: rgba(242, 140, 40, 0.45);
        }

        .nav-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f28c28 0%, #6b2d3a 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.84rem;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .nav-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: var(--nav-dropdown-bg, rgba(25, 14, 19, 0.96));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 14px;
          box-shadow: var(--shadow-xl, 0 16px 48px rgba(0, 0, 0, 0.35));
          min-width: 230px;
          max-width: min(320px, calc(100vw - 2rem));
          padding: 0.5rem 0;
          z-index: 1100;
          animation: dropdownSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--nav-dropdown-border, rgba(255, 255, 255, 0.12));
        }

        @keyframes dropdownSlideIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes bottomSheetSlideUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          color: var(--text-secondary, #cbd5e1);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          text-decoration: none;
          border: none;
          background: none;
          width: 100%;
          font-family: inherit;
          text-align: left;
          min-height: 44px;
          box-sizing: border-box;
        }

        @media (hover: hover) {
          .dropdown-item:hover {
            background: rgba(242, 140, 40, 0.12);
            color: var(--accent-orange, #f28c28);
          }
        }

        .dropdown-divider {
          height: 1px;
          background: var(--border-subtle, rgba(255, 255, 255, 0.1));
          margin: 0.4rem 0;
        }

        .dropdown-item.danger {
          color: #e5484d;
        }

        @media (hover: hover) {
          .dropdown-item.danger:hover {
            background: rgba(229, 72, 77, 0.14);
            color: #ff6b6b;
          }
        }

        /* Mobile Bottom Sheet Transformation for User Dropdown */
        @media (max-width: 767px) {
          .nav-dropdown-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--overlay, rgba(14, 7, 10, 0.75));
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 2050;
          }

          .nav-dropdown {
            position: fixed !important;
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            min-width: 100% !important;
            max-width: 100% !important;
            border-radius: 24px 24px 0 0 !important;
            border-bottom: none !important;
            padding: 1.25rem 1.25rem calc(1.75rem + env(safe-area-inset-bottom, 0px)) 1.25rem !important;
            box-shadow: 0 -12px 48px rgba(0, 0, 0, 0.6) !important;
            z-index: 2100 !important;
            animation: bottomSheetSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
            box-sizing: border-box;
          }

          .dropdown-item {
            padding: 0.9rem 1rem !important;
            font-size: 0.98rem !important;
            border-radius: 12px !important;
            margin-bottom: 0.25rem !important;
          }
        }

        .menu-button {
          background: var(--glass-card-bg, rgba(255, 255, 255, 0.08));
          border: 1px solid var(--border-default, rgba(255, 255, 255, 0.2));
          color: var(--text-primary, #ffffff);
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
          touch-action: manipulation;
        }

        @media (hover: hover) {
          .menu-button:hover {
            background: rgba(242, 140, 40, 0.18);
            border-color: rgba(242, 140, 40, 0.5);
            color: var(--accent-orange, #f28c28);
            transform: scale(1.05);
          }
        }

        .menu-button:active {
          transform: scale(0.96);
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--nav-dropdown-bg, rgba(14, 7, 10, 0.96));
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: max(1.25rem, calc(1rem + env(safe-area-inset-top, 0px))) max(1rem, env(safe-area-inset-right, 0px)) max(2rem, calc(2rem + env(safe-area-inset-bottom, 0px))) max(1rem, env(safe-area-inset-left, 0px));
          box-sizing: border-box;
        }

        .menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .menu-drawer-header {
          width: 100%;
          max-width: 460px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.1));
          margin-bottom: 1rem;
        }

        .close-button {
          background: var(--glass-card-bg, rgba(255, 255, 255, 0.08));
          border: 1px solid var(--border-default, rgba(255, 255, 255, 0.2));
          color: var(--text-primary, #ffffff);
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: manipulation;
        }

        @media (hover: hover) {
          .close-button:hover {
            background: rgba(242, 140, 40, 0.2);
            border-color: rgba(242, 140, 40, 0.5);
            color: var(--accent-orange, #f28c28);
            transform: rotate(90deg) scale(1.05);
          }
        }

        .close-button:active {
          transform: rotate(90deg) scale(0.95);
        }

        .menu-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          max-width: 460px;
        }

        .menu-item {
          width: 100%;
          padding: 0.95rem 1.25rem;
          min-height: 48px;
          color: var(--text-primary, #e2e8f0);
          cursor: pointer;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.98rem;
          font-weight: 600;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          background: var(--glass-card-bg, rgba(255, 255, 255, 0.04));
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
          text-decoration: none;
          box-sizing: border-box;
          touch-action: manipulation;
        }

        @media (hover: hover) {
          .menu-item:hover {
            background: rgba(242, 140, 40, 0.12);
            border-color: rgba(242, 140, 40, 0.35);
            color: var(--accent-orange, #ffffff);
            transform: translateX(3px);
          }
        }

        .menu-item:active {
          background: rgba(242, 140, 40, 0.2);
        }

        .menu-item.active {
          background: linear-gradient(135deg, rgba(107, 45, 58, 0.6) 0%, rgba(242, 140, 40, 0.2) 100%);
          border-color: rgba(242, 140, 40, 0.45);
          color: #ffffff;
          font-weight: 700;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        /* Desktop Navigation (>= 1024px) */
        @media (min-width: 1024px) {
          .nav-links {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
          }

          .menu-button {
            display: none;
          }
        }

        @media (min-width: 1024px) and (max-width: 1200px) {
          .nav-container {
            padding: 0 1rem;
          }

          .nav-links {
            gap: 0.2rem;
          }

          .nav-link {
            font-size: 0.82rem;
            padding: 0.35rem 0.65rem;
          }

          .brand-name {
            font-size: 0.98rem;
          }

          .nav-auth-btn {
            padding: 0.35rem 0.85rem;
            font-size: 0.82rem;
          }
        }

        @media (max-width: 1023px) {
          .nav-container {
            padding: 0 1.25rem;
          }
        }

        @media (max-width: 768px) {
          .nav-header {
            padding: 0.35rem 0 !important;
          }

          .nav-container {
            padding: 0 0.85rem;
            height: 56px;
          }

          .brand-name {
            font-size: 0.92rem;
            letter-spacing: 0.6px;
            white-space: nowrap;
          }

          .nav-spacer {
            height: 68px !important;
          }
        }

        @media (max-width: 480px) {
          .nav-header {
            padding: 0.35rem 0 !important;
          }

          .nav-container {
            padding: 0 0.65rem;
            height: 56px;
          }

          .nav-brand {
            min-width: 0;
            flex-shrink: 1;
          }

          .brand-name {
            font-size: clamp(0.75rem, 3.2vw, 0.88rem);
            white-space: nowrap;
          }

          .logo-container {
            width: 30px;
            height: 30px;
            flex-shrink: 0;
          }

          .mobile-auth-area {
            flex-shrink: 0 !important;
            gap: 0.35rem !important;
          }

          .nav-auth-btn {
            padding: 0.35rem 0.7rem !important;
            font-size: 0.8rem !important;
            white-space: nowrap !important;
            word-break: normal !important;
            flex-shrink: 0 !important;
            min-width: max-content !important;
          }

          .menu-button {
            width: 40px;
            height: 40px;
            min-width: 40px;
            min-height: 40px;
            flex-shrink: 0;
          }

          .nav-spacer {
            height: 68px !important;
          }
        }

        @media (max-width: 320px) {
          .nav-container {
            padding: 0 0.4rem;
          }

          .brand-name {
            font-size: 0.74rem;
            letter-spacing: 0.2px;
          }

          .logo-container {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* Mobile Menu Overlay */}
      {(isMenuOpen || isMenuAnimating) && (
        <div
          className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
          onClick={handleMenuClose}
        >
          <div className="menu-drawer-header" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div className="logo-container" style={{ width: '34px', height: '34px' }}>
                <img src={img1} alt="Zetawa Logo" className="logo-img" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="brand-name" style={{ fontSize: '0.98rem', letterSpacing: '0.8px', color: '#fff', fontWeight: 800 }}>ZETAWA DARK</span>
                <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Industrial & Digital Solutions</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                className="nav-theme-btn"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <button
                className="close-button"
                onClick={handleMenuClose}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={item.name}
                  className={`menu-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                >
                  <span>{item.name}</span>
                  <ChevronRight size={16} opacity={0.55} />
                </div>
              );
            })}

            <div
              className={`menu-item ${location.pathname === '/privacy-policy' ? 'active' : ''}`}
              onClick={() => { navigate('/privacy-policy'); handleMenuClose(); }}
            >
              <span>Privacy Policy</span>
              <ChevronRight size={16} opacity={0.55} />
            </div>

            {/* Admin Portal in mobile menu - only for admins */}
            {isAdmin && (
              <div
                className="menu-item"
                onClick={() => { navigate('/admin'); handleMenuClose(); }}
                style={{ background: 'rgba(242, 140, 40, 0.12)', borderColor: 'rgba(242, 140, 40, 0.35)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Shield size={18} strokeWidth={2.2} style={{ color: '#f28c28' }} />
                  <span>Admin Command Center</span>
                </div>
                <ChevronRight size={16} opacity={0.6} />
              </div>
            )}

            {/* Auth items in mobile menu */}
            {isAuth && (
              <>
                <div
                  className="menu-item"
                  onClick={() => { navigate('/profile'); handleMenuClose(); }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <User size={18} strokeWidth={2.2} />
                    <span>My Project Portal</span>
                  </div>
                  <ChevronRight size={16} opacity={0.6} />
                </div>
                <div
                  className="menu-item"
                  onClick={() => { navigate('/hireforms'); handleMenuClose(); }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <FileText size={18} strokeWidth={2.2} />
                    <span>Hire Us / Start Project</span>
                  </div>
                  <ChevronRight size={16} opacity={0.6} />
                </div>
              </>
            )}

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />

            {/* Hire/Consultation primary button if not auth */}
            {!isAuth && (
              <button
                type="button"
                onClick={() => { navigate('/hireforms'); handleMenuClose(); }}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #f28c28 0%, #6b2d3a 100%)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(242, 140, 40, 0.35)',
                  minHeight: '46px'
                }}
              >
                <span>Start Project Consultation</span>
                <ArrowRight size={16} />
              </button>
            )}

            {/* Logout / Login in mobile menu */}
            {isAuth ? (
              <div
                className="menu-item"
                onClick={handleLogout}
                style={{ color: '#e5484d', borderColor: 'rgba(229, 72, 77, 0.35)', background: 'rgba(229, 72, 77, 0.1)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <LogOut size={18} strokeWidth={2.2} />
                  <span>Logout ({userFirstName})</span>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => { setShowAuthModal(true); handleMenuClose(); }}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  minHeight: '44px'
                }}
              >
                <LogIn size={18} strokeWidth={2.2} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <header className={`nav-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand" onClick={() => navigate('/')}>
            <div className="logo-container">
              <img src={img1} alt="Zetawa Logo" className="logo-img" />
            </div>
            <span className="brand-name">ZETAWA DARK</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-links">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Theme Toggle Button on Desktop */}
            <button
              className="nav-theme-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              style={{ marginLeft: '0.4rem' }}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Auth section on desktop */}
            {isAuth ? (
              <div ref={dropdownRef} style={{ position: 'relative', marginLeft: '0.5rem' }}>
                <button
                  className="nav-user-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="nav-avatar">{userInitial}</div>
                  <span>{userFirstName}</span>
                  <ChevronDown size={14} style={{
                    transition: 'transform 0.2s ease',
                    transform: showDropdown ? 'rotate(180deg)' : 'rotate(0)',
                  }} />
                </button>

                {showDropdown && (
                  <div className="nav-dropdown" onMouseDown={(e) => e.stopPropagation()}>
                    <button type="button" className="dropdown-item" onClick={() => { navigate('/profile'); setShowDropdown(false); }}>
                      <User size={16} />
                      My Project Portal
                    </button>
                    <button type="button" className="dropdown-item" onClick={() => { navigate('/hireforms'); setShowDropdown(false); }}>
                      <FileText size={16} />
                      Hire Us / Start Project
                    </button>
                    <button type="button" className="dropdown-item" onClick={() => { navigate('/careers'); setShowDropdown(false); }}>
                      <Briefcase size={16} />
                      Job Openings
                    </button>
                    {isAdmin && (
                      <>
                        <div className="dropdown-divider" />
                        <button type="button" className="dropdown-item" onClick={() => { navigate('/admin'); setShowDropdown(false); }}>
                          <Shield size={16} style={{ color: '#f28c28' }} />
                          Admin Command Center
                        </button>
                      </>
                    )}
                    <div className="dropdown-divider" />
                    <button type="button" className="dropdown-item danger" onClick={handleLogout}>
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="nav-auth-btn"
                onClick={() => setShowAuthModal(true)}
                style={{ marginLeft: '0.5rem' }}
              >
                <LogIn size={15} />
                Login
              </button>
            )}
          </nav>

          {/* Mobile: Theme + Auth + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <style>{`
              .mobile-auth-area { display: flex; align-items: center; gap: 0.35rem; flex-shrink: 0; }
              @media (min-width: 1024px) { .mobile-auth-area { display: none; } }
            `}</style>
            <div className="mobile-auth-area">
              <button
                className="nav-theme-btn"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                style={{ width: '34px', height: '34px', flexShrink: 0 }}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              {isAuth ? (
                <div ref={dropdownRef} style={{ position: 'relative', flexShrink: 0 }}>
                  <button
                    className="nav-user-btn"
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{ padding: '0.25rem 0.55rem 0.25rem 0.25rem', fontSize: '0.8rem', whiteSpace: 'nowrap', flexShrink: 0 }}
                    aria-label="User account menu"
                  >
                    <div className="nav-avatar" style={{ width: '26px', height: '26px', fontSize: '0.75rem', flexShrink: 0 }}>{userInitial}</div>
                    <ChevronDown size={12} />
                  </button>
                </div>
              ) : (
                <button
                  className="nav-auth-btn"
                  onClick={() => setShowAuthModal(true)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    wordBreak: 'normal',
                    flexShrink: 0,
                    minWidth: 'max-content',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <LogIn size={13} style={{ flexShrink: 0 }} />
                  <span>Login</span>
                </button>
              )}
            </div>

            <button
              className="menu-button"
              onClick={handleMenuOpen}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Mobile Bottom Sheet for User Menu */}
        {isAuth && showDropdown && (
          <div className="mobile-dropdown-sheet-wrapper">
            <style>{`
              @media (min-width: 768px) {
                .mobile-dropdown-sheet-wrapper { display: none; }
              }
            `}</style>
            <div
              className="nav-dropdown-backdrop"
              onClick={() => setShowDropdown(false)}
            />
            <div className="nav-dropdown" style={{ zIndex: 2100 }}>
              <div style={{
                width: '40px',
                height: '4px',
                borderRadius: '4px',
                background: 'var(--border, rgba(255,255,255,0.2))',
                margin: '0 auto 1rem auto'
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.25rem 0.5rem 0.85rem', borderBottom: '1px solid var(--border)' }}>
                <div className="nav-avatar" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>{userInitial}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)' }}>{user?.name || 'User'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.email}</div>
                </div>
              </div>
              <button type="button" className="dropdown-item" onClick={() => { navigate('/profile'); setShowDropdown(false); }}>
                <User size={18} />
                My Project Portal
              </button>
              <button type="button" className="dropdown-item" onClick={() => { navigate('/hireforms'); setShowDropdown(false); }}>
                <FileText size={18} />
                Hire Us / Start Project
              </button>
              <button type="button" className="dropdown-item" onClick={() => { navigate('/careers'); setShowDropdown(false); }}>
                <Briefcase size={18} />
                Job Openings
              </button>
              {isAdmin && (
                <>
                  <div className="dropdown-divider" />
                  <button type="button" className="dropdown-item" onClick={() => { navigate('/admin'); setShowDropdown(false); }}>
                    <Shield size={18} style={{ color: '#f28c28' }} />
                    Admin Command Center
                  </button>
                </>
              )}
              <div className="dropdown-divider" />
              <button type="button" className="dropdown-item danger" onClick={handleLogout}>
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div
        className="nav-spacer"
        style={{
          height: '68px',
          background: 'var(--bg)',
          transition: 'height 0.3s ease'
        }}
      />
    </>
  );
}

export default ZetawaNav;
