import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Play, Image, FileText, CheckCircle, AlertCircle, User, Mail, Phone, Video, Coffee, Briefcase, GraduationCap } from 'lucide-react';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    eventId: null
  });
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const upcomingEvents = [
    {
      id: 1,
      title: 'Full Stack Development Workshop',
      date: '2025-08-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Virtual Event',
      type: 'Workshop',
      category: 'Technical',
      description: 'Comprehensive workshop covering React, Node.js, and modern development practices.',
      speaker: 'Sarah Johnson',
      capacity: 50,
      registered: 32,
      image: '🚀',
      registrationOpen: true,
      tags: ['Development', 'React', 'Node.js']
    },
    {
      id: 2,
      title: 'Data Science Conference 2025',
      date: '2025-08-22',
      time: '9:00 AM - 6:00 PM',
      location: 'Tech Hub, Jammu',
      type: 'Conference',
      category: 'Data Science',
      description: 'Annual conference bringing together data scientists, analysts, and ML engineers.',
      speaker: 'Dr. Michael Chen',
      capacity: 200,
      registered: 145,
      image: '📊',
      registrationOpen: true,
      tags: ['Data Science', 'ML', 'Analytics']
    },
    {
      id: 3,
      title: 'UI/UX Design Webinar',
      date: '2025-08-05',
      time: '2:00 PM - 4:00 PM',
      location: 'Online',
      type: 'Webinar',
      category: 'Design',
      description: 'Learn modern UI/UX principles and design thinking methodologies.',
      speaker: 'Emily Davis',
      capacity: 100,
      registered: 78,
      image: '🎨',
      registrationOpen: true,
      tags: ['Design', 'UX', 'UI']
    },
    {
      id: 4,
      title: 'Mobile App Development Bootcamp',
      date: '2025-09-10',
      time: '10:00 AM - 5:00 PM',
      location: 'Innovation Center, Kashmir',
      type: 'Bootcamp',
      category: 'Mobile',
      description: 'Intensive bootcamp covering React Native and Flutter development.',
      speaker: 'David Lee',
      capacity: 30,
      registered: 28,
      image: '📱',
      registrationOpen: true,
      tags: ['Mobile', 'React Native', 'Flutter']
    }
  ];

  const pastEvents = [
    {
      id: 5,
      title: 'Tech Innovation Summit 2025',
      date: '2025-07-20',
      time: '9:00 AM - 6:00 PM',
      location: 'Grand Convention Center',
      type: 'Summit',
      category: 'Innovation',
      description: 'Major tech summit featuring industry leaders and emerging technologies.',
      speaker: 'Multiple Speakers',
      attendees: 500,
      image: '🏆',
      highlights: ['AI & Machine Learning', 'Blockchain Technology', 'IoT Applications'],
      photos: 25,
      videos: 8,
      summary: 'Successful summit with 500+ attendees, 20 speakers, and valuable networking opportunities.'
    },
    {
      id: 6,
      title: 'Startup Pitch Competition',
      date: '2025-07-10',
      time: '1:00 PM - 8:00 PM',
      location: 'Startup Hub, Jammu',
      type: 'Competition',
      category: 'Entrepreneurship',
      description: 'Annual startup pitch competition with cash prizes and mentorship opportunities.',
      speaker: 'Panel of Judges',
      attendees: 150,
      image: '💡',
      highlights: ['15 Startups Pitched', 'Winner: EcoTech Solutions', 'Prize Pool: ₹5 Lakhs'],
      photos: 40,
      videos: 12,
      summary: 'Exciting competition showcasing innovative startups with promising solutions.'
    },
    {
      id: 7,
      title: 'Women in Tech Panel Discussion',
      date: '2025-06-25',
      time: '3:00 PM - 5:00 PM',
      location: 'Virtual Event',
      type: 'Panel',
      category: 'Diversity',
      description: 'Inspiring panel discussion featuring successful women leaders in technology.',
      speaker: 'Panel of Women Leaders',
      attendees: 300,
      image: '👩‍💻',
      highlights: ['Career Guidance', 'Breaking Barriers', 'Mentorship Programs'],
      photos: 15,
      videos: 5,
      summary: 'Inspiring session promoting diversity and inclusion in the tech industry.'
    }
  ];

  const eventCalendar = [
    { date: '2025-08-05', event: 'UI/UX Design Webinar', type: 'webinar' },
    { date: '2025-08-15', event: 'Full Stack Development Workshop', type: 'workshop' },
    { date: '2025-08-22', event: 'Data Science Conference 2025', type: 'conference' },
    { date: '2025-09-10', event: 'Mobile App Development Bootcamp', type: 'bootcamp' },
    { date: '2025-09-18', event: 'Cybersecurity Awareness Session', type: 'session' },
    { date: '2025-10-05', event: 'Annual Tech Awards Ceremony', type: 'ceremony' }
  ];

  const handleRegistration = (eventId) => {
    if (!registrationData.name || !registrationData.email || !registrationData.phone) {
      setRegistrationStatus({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    setRegistrationStatus({
      type: 'success',
      message: 'Registration successful! Check your email for confirmation.'
    });

    setRegistrationData({ name: '', email: '', phone: '', eventId: null });
    setSelectedEvent(null);
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      'Workshop': <Coffee size={16} />,
      'Conference': <Briefcase size={16} />,
      'Webinar': <Video size={16} />,
      'Bootcamp': <GraduationCap size={16} />,
      'Summit': <Users size={16} />,
      'Competition': <CheckCircle size={16} />,
      'Panel': <Users size={16} />
    };
    return icons[type] || <Calendar size={16} />;
  };

  const getTypeColor = (type) => {
    const colors = {
      'Workshop': '#28a745',
      'Conference': '#17a2b8',
      'Webinar': '#ffc107',
      'Bootcamp': '#6f42c1',
      'Summit': '#20c997',
      'Competition': '#fd7e14',
      'Panel': '#e83e8c'
    };
    return colors[type] || '#6c757d';
  };

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#304356ff',
      minHeight: '100vh'
    }}>
      <style>{`
        :root {
          --primary-red: #7e3a41ff;
          --primary-red-hover: #884a51ff;
          --dark-bg: #304356ff;
          --dark-card: #2d2d2d;
          --dark-border: #404040;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .back-button {
          background-color: var(--primary-red);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .back-button:hover {
          background-color: var(--primary-red-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }

        .hero-section {
          background-color: var(--primary-red);
          color: white;
          text-align: center;
          padding: 3rem 0;
          position: relative;
          overflow: hidden;
        }
        
        .hero-title {
          font-size: clamp(1.85rem, 5vw, 2.8rem);
          font-weight: 700;
          margin-bottom: 1rem;
          color: #ffebee;
          text-wrap: balance;
        }

        .hero-subtitle {
          font-size: clamp(1.05rem, 2.5vw, 1.3rem);
          margin-bottom: 0.5rem;
          opacity: 0.9;
          color: white;
        }

        .hero-description {
          font-size: clamp(0.9rem, 2vw, 1rem);
          opacity: 0.8;
          color: #f5f5f5;
          margin: 0;
        }

        .notification-banner {
          background: linear-gradient(45deg, var(--primary-red), #dc3545);
          color: white;
          padding: 10px 0;
          overflow: hidden;
          position: relative;
        }

        .notification-text {
          animation: scroll-left 25s linear infinite;
          white-space: nowrap;
          font-weight: 500;
        }

        @keyframes scroll-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .card-custom {
          background-color: white;
          border: 1px solid #e9ecef;
          border-radius: 15px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
        }

        .card-custom:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }

        .tab-button {
          background-color: transparent;
          color: #6c757d;
          border: 2px solid #e9ecef;
          padding: 12px 24px;
          border-radius: 10px;
          margin: 0 5px;
          transition: all 0.3s;
          cursor: pointer;
          font-weight: 500;
        }

        .tab-button.active {
          background-color: var(--primary-red);
          color: white;
          border-color: var(--primary-red);
        }

        .tab-button:hover {
          border-color: var(--primary-red);
          color: var(--primary-red);
          transform: translateY(-2px);
        }

        .event-card {
          background-color: white;
          border: 1px solid #e9ecef;
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          border-color: var(--primary-red);
        }

        .btn-primary-custom {
          background-color: var(--primary-red);
          border-color: var(--primary-red);
          padding: 12px 24px;
          font-weight: 600;
          transition: all 0.2s;
          border-radius: 8px;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 1rem;
        }
        
        .btn-primary-custom:hover {
          background-color: var(--primary-red-hover);
          border-color: var(--primary-red-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }

        .btn-primary-custom:disabled {
          background-color: #6c757d;
          border-color: #6c757d;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .form-control-custom {
          background-color: white;
          border: 2px solid #e9ecef;
          color: #2d2d2d;
          padding: 12px;
          border-radius: 8px;
          transition: all 0.3s;
          width: 100%;
          font-size: 1rem;
        }
        
        .form-control-custom:focus {
          background-color: #f8f9fa;
          border-color: var(--primary-red);
          color: #2d2d2d;
          box-shadow: 0 0 0 0.2rem rgba(126, 58, 65, 0.25);
          outline: none;
        }

        .type-badge {
          padding: 8px 12px;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .progress-bar-custom {
          background-color: #e9ecef;
          border-radius: 10px;
          height: 8px;
          overflow: hidden;
        }

        .progress-fill {
          background: linear-gradient(45deg, var(--primary-red), #ff6b7d);
          height: 100%;
          border-radius: 10px;
          transition: width 0.3s ease;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .calendar-item {
          background-color: white;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .calendar-item:hover {
          border-color: var(--primary-red);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -0.5rem;
        }

        .col-lg-6, .col-md-6, .col-12 {
          padding: 0 0.5rem;
        }

        .col-lg-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }

        .col-md-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }

        .col-12 {
          flex: 0 0 100%;
          max-width: 100%;
        }

        .col-lg-8 {
          flex: 0 0 66.666667%;
          max-width: 66.666667%;
        }

        .col-md-4 {
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
        }

        .mb-3 { margin-bottom: 1rem; }
        .mb-4 { margin-bottom: 1.5rem; }
        .mb-5 { margin-bottom: 3rem; }
        .pb-5 { padding-bottom: 3rem; }
        .text-center { text-align: center; }
        .w-100 { width: 100%; }

        .d-flex {
          display: flex;
        }

        .justify-content-between {
          justify-content: space-between;
        }

        .justify-content-center {
          justify-content: center;
        }

        .align-items-center {
          align-items: center;
        }

        .align-items-start {
          align-items: flex-start;
        }

        .flex-wrap {
          flex-wrap: wrap;
        }

        .gap-2 {
          gap: 0.5rem;
        }

        .gap-3 {
          gap: 1rem;
        }

        .tag-badge {
          background: rgba(126, 58, 65, 0.1);
          color: var(--primary-red);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .alert-success {
          background: rgba(40, 167, 69, 0.1);
          border: 2px solid #28a745;
          color: #28a745;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .alert-danger {
          background: rgba(220, 53, 69, 0.1);
          border: 2px solid #dc3545;
          color: #dc3545;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .stats-section {
          background-color: white;
          padding: 2rem 0;
          margin: 2rem 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          background-color: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 15px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }

        .cta-section {
          background: linear-gradient(135deg, var(--primary-red), #ff6b7d);
          color: white;
          padding: 3rem;
          border-radius: 20px;
          text-align: center;
          margin: 2rem 0;
        }

        .cta-button {
          background-color: white;
          color: var(--primary-red);
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 0.5rem;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }

        .cta-button-outline {
          background-color: transparent;
          color: white;
          border: 2px solid white;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 0.5rem;
        }

        .cta-button-outline:hover {
          background-color: white;
          color: var(--primary-red);
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .tab-button {
            padding: 8px 16px;
            margin: 5px 2px;
            font-size: 0.9rem;
          }
          
          .col-lg-6, .col-md-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }
          
          .col-lg-8 {
            flex: 0 0 100%;
            max-width: 100%;
          }
          
          .col-md-4 {
            flex: 0 0 100%;
            max-width: 100%;
          }
          
          .calendar-grid {
            grid-template-columns: 1fr;
          }
          
          .event-card {
            padding: 20px;
          }
          
          .container {
            padding: 0 1rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-button, .cta-button-outline {
            display: block;
            width: 100%;
            margin: 0.5rem 0;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.8rem;
          }
          
          .tab-button {
            padding: 8px 14px;
            font-size: 0.85rem;
            min-height: 38px;
          }
          
          .event-card {
            padding: 15px;
          }
          
          .card-custom {
            padding: 20px !important;
          }
        }
      `}</style>

      {/* Moving Notification Banner */}
      <div className="notification-banner">
        <div className="notification-text">
          🎉 Upcoming: Full Stack Development Workshop - Aug 15 • Data Science Conference - Aug 22 • 
          UI/UX Design Webinar - Aug 5 • Register now for limited seats! Early bird discounts available
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <button className="back-button">
            <ArrowLeft size={20} style={{ marginRight: '8px' }} />
            Back to Home
          </button>
          <h1 className="hero-title">ZETAWA DARK</h1>
          <p className="hero-subtitle">
            Events & Learning Hub
          </p>
          <p className="hero-description">
            Conferences, workshops, webinars, and networking opportunities
          </p>
        </div>
      </div>

      <div className="container pb-5">
        {/* Navigation Tabs */}
        <div className="text-center mb-4">
          <button 
            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            <Calendar size={16} style={{ marginRight: '8px' }} />
            Upcoming Events
          </button>
          <button 
            className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            <Clock size={16} style={{ marginRight: '8px' }} />
            Past Events
          </button>
          <button 
            className={`tab-button ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            <Calendar size={16} style={{ marginRight: '8px' }} />
            Event Calendar
          </button>
          <button 
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            <User size={16} style={{ marginRight: '8px' }} />
            Event Registration
          </button>
        </div>

        {/* Upcoming Events Tab */}
        {activeTab === 'upcoming' && (
          <div>
            <div className="card-custom" style={{ padding: '30px' }}>
              <h3 style={{ color: '#2d2d2d', marginBottom: '20px', textAlign: 'center' }}>
                🚀 Upcoming Events
              </h3>
              <p style={{ color: '#6c757d', textAlign: 'center', marginBottom: '30px' }}>
                Details about conferences, webinars, workshops, and other events
              </p>
          

              {/* <div className="row"> */}
                {/* {upcomingEvents.map((event) => (
                  <div key={event.id} className="col-lg-6 mb-4">
                    <div className="event-card">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div style={{ fontSize: '3rem' }}>{event.image}</div>
                        <span 
                          className="type-badge" 
                          style={{ backgroundColor: getTypeColor(event.type) }}
                        >
                          {getEventTypeIcon(event.type)}
                          {event.type}
                        </span>
                      </div>

                      <h5 style={{ color: '#2d2d2d', marginBottom: '15px', fontWeight: '600' }}>{event.title}</h5>
                      
                      <div className="mb-3">
                        <div style={{ color: '#6c757d', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                          <MapPin size={16} style={{ marginRight: '8px', color: 'var(--primary-red)' }} />
                          {event.location}
                        </div>
                        <div style={{ color: '#6c757d', marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                          <Users size={16} style={{ marginRight: '8px', color: 'var(--primary-red)' }} />
                          {event.attendees} attendees
                        </div>
                      </div>

                      <p style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '15px', lineHeight: '1.6' }}>
                        {event.summary}
                      </p> */}

                      {/* <div className="mb-3">
                        <h6 style={{ color: '#2d2d2d', marginBottom: '10px', fontWeight: '600' }}>Highlights:</h6>
                        {event.highlights.map((highlight, index) => (
                          <div key={index} style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '5px' }}>
                            • {highlight}
                          </div>
                        ))}
                      </div> */}

                      {/* <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-3">
                          <span style={{ color: '#6c757d', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                            <Image size={16} style={{ marginRight: '5px' }} />
                            {event.photos} Photos
                          </span>
                          <span style={{ color: '#6c757d', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                            <Play size={16} style={{ marginRight: '5px' }} />
                            {event.videos} Videos
                          </span>
                        </div>
                        <button className="btn-primary-custom" style={{ padding: '8px 16px' }}>
                          View Media
                        </button>
                      </div>
                    </div>
                  </div> */}
                {/* ))}
              </div> */}
            </div>
          </div>
        )}

        {/* Event Calendar Tab */}
        {activeTab === 'calendar' && (
          <div>
            <div className="card-custom" style={{ padding: '30px' }}>
              <h3 style={{ color: '#2d2d2d', marginBottom: '20px', textAlign: 'center' }}>
                📅 Event Calendar
              </h3>
              <p style={{ color: '#6c757d', textAlign: 'center', marginBottom: '30px' }}>
                Calendar view of all events and important dates
              </p>

              <div className="calendar-grid">
                {eventCalendar.map((item, index) => (
                  <div key={index} className="calendar-item">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span style={{ 
                        color: 'var(--primary-red)', 
                        fontWeight: '600',
                        fontSize: '1.1rem'
                      }}>
                        {new Date(item.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span 
                        className="type-badge"
                        style={{ 
                          backgroundColor: getTypeColor(item.type),
                          fontSize: '0.7rem',
                          padding: '4px 8px'
                        }}
                      >
                        {item.type}
                      </span>
                    </div>
                    <h6 style={{ color: '#2d2d2d', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '600' }}>
                      {item.event}
                    </h6>
                    <div style={{ 
                      color: '#6c757d', 
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Calendar size={14} style={{ marginRight: '5px' }} />
                      {new Date(item.date).getFullYear()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Event Registration Tab */}
        {activeTab === 'register' && (
          <div>
            <div className="card-custom" style={{ padding: '30px' }}>
              <h3 style={{ color: '#2d2d2d', marginBottom: '20px', textAlign: 'center' }}>
                📝 Event Registration
              </h3>
              <p style={{ color: '#6c757d', textAlign: 'center', marginBottom: '30px' }}>
                Option to sign up or register for upcoming events
              </p>

              {selectedEvent && (
                <div className="card-custom" style={{ 
                  padding: '20px', 
                  marginBottom: '30px', 
                  background: 'rgba(126, 58, 65, 0.05)',
                  border: '2px solid rgba(126, 58, 65, 0.2)'
                }}>
                  <h5 style={{ color: 'var(--primary-red)', marginBottom: '10px', fontWeight: '600' }}>
                    Selected Event: {selectedEvent.title}
                  </h5>
                  <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                    {selectedEvent.date} • {selectedEvent.time} • {selectedEvent.location}
                  </p>
                </div>
              )}

              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label style={{ color: '#2d2d2d', marginBottom: '8px', fontWeight: '500', display: 'flex', alignItems: 'center' }}>
                        <User size={16} style={{ marginRight: '8px' }} />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="form-control-custom"
                        placeholder="Enter your full name"
                        value={registrationData.name}
                        onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label style={{ color: '#2d2d2d', marginBottom: '8px', fontWeight: '500', display: 'flex', alignItems: 'center' }}>
                        <Mail size={16} style={{ marginRight: '8px' }} />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-control-custom"
                        placeholder="Enter your email"
                        value={registrationData.email}
                        onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label style={{ color: '#2d2d2d', marginBottom: '8px', fontWeight: '500', display: 'flex', alignItems: 'center' }}>
                        <Phone size={16} style={{ marginRight: '8px' }} />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        className="form-control-custom"
                        placeholder="Enter your phone number"
                        value={registrationData.phone}
                        onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label style={{ color: '#2d2d2d', marginBottom: '8px', fontWeight: '500', display: 'flex', alignItems: 'center' }}>
                        <Briefcase size={16} style={{ marginRight: '8px' }} />
                        Organization/Company
                      </label>
                      <input
                        type="text"
                        className="form-control-custom"
                        placeholder="Enter your organization"
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label style={{ color: '#2d2d2d', marginBottom: '8px', fontWeight: '500', display: 'flex', alignItems: 'center' }}>
                        <FileText size={16} style={{ marginRight: '8px' }} />
                        Additional Comments
                      </label>
                      <textarea
                        className="form-control-custom"
                        rows="3"
                        placeholder="Any special requirements or questions?"
                        style={{ resize: 'vertical' }}
                      ></textarea>
                    </div>
                  </div>

                  {registrationStatus && (
                    <div 
                      className={`${registrationStatus.type === 'success' ? 'alert-success' : 'alert-danger'}`}
                    >
                      <div className="d-flex align-items-center">
                        {registrationStatus.type === 'success' ? 
                          <CheckCircle size={20} style={{ marginRight: '10px' }} /> : 
                          <AlertCircle size={20} style={{ marginRight: '10px' }} />
                        }
                        {registrationStatus.message}
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <button 
                      className="btn-primary-custom"
                      onClick={() => handleRegistration(registrationData.eventId)}
                      style={{ padding: '15px 40px', fontSize: '1.1rem' }}
                    >
                      Complete Registration
                    </button>
                  </div>

                  <div style={{ 
                    marginTop: '30px', 
                    padding: '20px', 
                    background: '#f8f9fa', 
                    borderRadius: '15px',
                    border: '1px solid #e9ecef'
                  }}>
                    <h6 style={{ color: 'var(--primary-red)', marginBottom: '15px', fontWeight: '600' }}>Available Events for Registration:</h6>
                    <div className="row">
                      {upcomingEvents.filter(event => event.registrationOpen).map((event) => (
                        <div key={event.id} className="col-md-6 mb-3">
                          <div 
                            style={{ 
                              background: registrationData.eventId === event.id ? 'rgba(126, 58, 65, 0.1)' : 'white',
                              border: `2px solid ${registrationData.eventId === event.id ? 'var(--primary-red)' : '#e9ecef'}`,
                              borderRadius: '10px',
                              padding: '15px',
                              cursor: 'pointer',
                              transition: 'all 0.3s'
                            }}
                            onClick={() => {
                              setSelectedEvent(event);
                              setRegistrationData({...registrationData, eventId: event.id});
                            }}
                          >
                            <div className="d-flex align-items-center mb-2">
                              <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>{event.image}</span>
                              <div>
                                <h6 style={{ color: '#2d2d2d', margin: '0', fontSize: '0.9rem', fontWeight: '600' }}>{event.title}</h6>
                                <small style={{ color: '#6c757d' }}>{event.date}</small>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <span 
                                className="type-badge"
                                style={{ 
                                  backgroundColor: getTypeColor(event.type),
                                  fontSize: '0.7rem',
                                  padding: '4px 8px'
                                }}
                              >
                                {event.type}
                              </span>
                              <small style={{ color: '#6c757d' }}>
                                {event.capacity - event.registered} seats left
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Section */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎯</div>
              <h5 style={{ color: 'var(--primary-red)', marginBottom: '15px', fontWeight: '600' }}>Upcoming Events</h5>
              <p style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '15px', lineHeight: '1.6' }}>
                Join our upcoming conferences, workshops, and webinars to enhance your skills and network with industry professionals.
              </p>
              <div style={{ color: 'var(--primary-red)', fontWeight: '700', fontSize: '2rem' }}>
                {upcomingEvents.length}
              </div>
              <small style={{ color: '#6c757d' }}>Events scheduled</small>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📊</div>
              <h5 style={{ color: 'var(--primary-red)', marginBottom: '15px', fontWeight: '600' }}>Past Events</h5>
              <p style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '15px', lineHeight: '1.6' }}>
                Explore highlights, photos, and summaries from our successful past events and get inspired for future participation.
              </p>
              <div style={{ color: 'var(--primary-red)', fontWeight: '700', fontSize: '2rem' }}>
                {pastEvents.length}
              </div>
              <small style={{ color: '#6c757d' }}>Events completed</small>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📅</div>
              <h5 style={{ color: 'var(--primary-red)', marginBottom: '15px', fontWeight: '600' }}>Event Calendar</h5>
              <p style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '15px', lineHeight: '1.6' }}>
                Stay updated with our comprehensive event calendar featuring all important dates and upcoming activities.
              </p>
              <div style={{ color: 'var(--primary-red)', fontWeight: '700', fontSize: '2rem' }}>
                {eventCalendar.length}
              </div>
              <small style={{ color: '#6c757d' }}>Calendar entries</small>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="cta-section">
          <h4 style={{ marginBottom: '20px', fontSize: '2rem', fontWeight: '600' }}>Stay Connected with Our Events</h4>
          <p style={{ marginBottom: '30px', fontSize: '1.1rem', opacity: '0.9' }}>
            Don't miss out on learning opportunities, networking events, and industry insights. 
            Subscribe to our newsletter for event updates and early bird registration access.
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="d-flex" style={{ flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                <input
                  type="email"
                  className="form-control-custom"
                  placeholder="Enter your email for event notifications"
                  style={{ flex: '1', minWidth: '250px' }}
                />
                <button className="cta-button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <small style={{ opacity: '0.8' }}>
              🔔 Get notified about new events, early bird discounts, and exclusive workshops
            </small>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#2d2d2d', 
        color: 'white', 
        padding: '3rem 0 2rem 0'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--primary-red)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                marginRight: '12px'
              }}>
                Z
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>ZETAWA DARK</div>
                <div style={{ fontSize: '0.9rem', color: '#adb5bd' }}>PRIVATE LIMITED</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                © 2026 ZETAWA DARK PRIVATE LIMITED. All rights reserved.
              </div>
              <div style={{ fontSize: '0.9rem', color: '#adb5bd' }}>
                Equal opportunity employer committed to diversity and inclusion.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Events;