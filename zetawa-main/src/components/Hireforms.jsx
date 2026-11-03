import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Code2, 
  Smartphone, 
  Cpu, 
  Palette, 
  Cloud, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Clock, 
  ShieldCheck, 
  IndianRupee,
  ArrowRight,
  Layers,
  Check,
  RotateCcw,
  Info,
  Server,
  Zap,
  Database,
  Terminal,
  FileCheck
} from "lucide-react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useAppContext } from "../context/AppContext";
import AuthModal from "./AuthModal";

const ICONS_MAP = {
  Code2,
  Smartphone,
  Cpu,
  Palette,
  Cloud,
  Users,
  ShieldCheck,
  Sparkles,
  Layers,
  Server,
  Zap,
  Database,
  Terminal
};

const resolveIcon = (icon) => {
  if (!icon) return Code2;
  if (typeof icon === "function" || (typeof icon === "object" && icon !== null)) return icon;
  return ICONS_MAP[icon] || Code2;
};

const BASE_SERVICES_OPTIONS = [
  {
    id: "web-saas",
    icon: Code2,
    title: "Full-Stack Web & SaaS",
    tagline: "React, Next.js, Node.js, Python, scalable APIs & databases.",
    capabilities: [
      "Modern full-stack web application development",
      "Robust REST & GraphQL API architecture",
      "High-performance databases & real-time synchronization",
      "Production-grade security & automated CI/CD deployment"
    ],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB"]
  },
  {
    id: "mobile-app",
    icon: Smartphone,
    title: "Mobile App Development",
    tagline: "Cross-platform iOS & Android apps with smooth native UX.",
    capabilities: [
      "Cross-platform iOS and Android mobile engineering",
      "Fluid 60fps animations & responsive native design",
      "Offline-first sync & push notifications integration",
      "App Store & Google Play submission and approval support"
    ],
    techStack: ["React Native", "Flutter", "TypeScript", "Swift / Kotlin", "Firebase"]
  },
  {
    id: "ai-automation",
    icon: Cpu,
    title: "AI & Smart Automation",
    tagline: "Custom LLM agents, RAG retrieval & workflow automation.",
    capabilities: [
      "Custom Retrieval-Augmented Generation (RAG) vector pipelines",
      "Autonomous multi-agent workflows for repetitive tasks",
      "Fine-tuned LLM implementations & prompt optimization",
      "Smart document parsing, semantic search & automated reporting"
    ],
    techStack: ["Python", "OpenAI", "Gemini API", "LangChain", "FastAPI", "Pinecone"]
  },
  {
    id: "ui-ux",
    icon: Palette,
    title: "UI/UX & Design Systems",
    tagline: "Figma component libraries, prototypes & high-conversion UI.",
    capabilities: [
      "Interactive clickable prototypes for rapid validation",
      "Scalable Figma design systems & reusable component libraries",
      "WCAG 2.1 accessibility compliance & responsive design",
      "Conversion-rate-optimized (CRO) user onboarding flows"
    ],
    techStack: ["Figma", "Design Tokens", "Tailwind CSS", "Storybook", "WCAG A11y"]
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud, DevOps & Infra",
    tagline: "AWS, GCP, Docker, Kubernetes, CI/CD & zero-downtime scale.",
    capabilities: [
      "Cloud architecture & cost optimization (AWS, GCP)",
      "Docker containerization & Kubernetes cluster orchestration",
      "Automated CI/CD deployment pipelines with zero downtime",
      "Comprehensive log observability, tracing & uptime monitoring"
    ],
    techStack: ["AWS", "GCP", "Kubernetes", "Docker", "Terraform", "GitHub Actions"]
  },
  {
    id: "dedicated-squad",
    icon: Users,
    title: "Dedicated Developer Squad",
    tagline: "Embedded senior engineers for fast sprint execution.",
    capabilities: [
      "Dedicated senior software engineers embedded in your team",
      "Agile 2-week sprint delivery with transparent milestones",
      "Direct technical leadership & architecture code reviews",
      "Seamless ramp-up and flexible scaling based on velocity"
    ],
    techStack: ["Agile/Scrum", "Jira", "Full-Stack Engineers", "Code Reviews", "Sprint Sprints"]
  }
];

const BUDGET_PRESETS_INR = [
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹5,00,000",
  "₹5,00,000+",
  "Flexible / To Discuss"
];

const TIMELINE_OPTIONS = [
  { id: "urgent", label: "Urgent (< 2 weeks)" },
  { id: "1-month", label: "Within 1 Month" },
  { id: "2-3-months", label: "2 – 3 Months" },
  { id: "exploring", label: "Flexible / Planning Stage" }
];

const formatInitialDescription = (service) => {
  if (!service) return "";
  let desc = `Consultation Request for: ${service.title}\n`;
  if (service.tagline) {
    desc += `Scope Overview: ${service.tagline}\n\n`;
  }
  if (Array.isArray(service.capabilities) && service.capabilities.length > 0) {
    desc += `Included Standard Deliverables (Automatically Registered):\n`;
    service.capabilities.forEach(cap => {
      desc += `• ${cap}\n`;
    });
    desc += `\n`;
  }
  if (Array.isArray(service.techStack) && service.techStack.length > 0) {
    desc += `Preferred Technology Stack: ${service.techStack.join(', ')}\n\n`;
  }
  desc += `Additional Custom Requirements & Goals:\n(Describe any specific features, third-party integrations, or custom requirements here...)`;
  return desc;
};

const Hireforms = () => {
  const { user } = useAppContext();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Read incoming service from route state or URL query parameter
  const searchParams = new URLSearchParams(location.search);
  const queryServiceName = searchParams.get("service");
  const passedService = location.state?.selectedService || null;

  const [availableServices, setAvailableServices] = useState(BASE_SERVICES_OPTIONS);
  const [primaryService, setPrimaryService] = useState(null);

  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(" ")[0] : "",
    lastName: user?.name ? user.name.split(" ").slice(1).join(" ") : "",
    email: user?.email || "",
    phone: "",
    company: "",
    website: "",
    projectTitle: "",
    projectType: "Web Application",
    projectDescription: "",
    customFeatures: "",
    reference: "",
    additionalInfo: ""
  });

  const [selectedServices, setSelectedServices] = useState(["Full-Stack Web & SaaS"]);
  const [budget, setBudget] = useState("");
  const [selectedTimeline, setSelectedTimeline] = useState("Within 1 Month");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize or fetch dynamic services catalog
  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          // Merge dynamic services with base options, deduplicating by title
          const dynamicServices = data.data.map(d => ({
            id: d._id || d.id || d.title.toLowerCase().replace(/\s+/g, '-'),
            icon: resolveIcon(d.icon),
            title: d.title,
            tagline: d.tagline || d.description?.slice(0, 80) || "",
            description: d.description || "",
            capabilities: Array.isArray(d.capabilities) ? d.capabilities : [],
            techStack: Array.isArray(d.techStack) ? d.techStack : [],
            highlight: d.highlight || ""
          }));

          const combined = [...dynamicServices];
          BASE_SERVICES_OPTIONS.forEach(base => {
            if (!combined.some(c => c.title.toLowerCase() === base.title.toLowerCase())) {
              combined.push(base);
            }
          });
          setAvailableServices(combined);
        }
      })
      .catch(err => console.error("Could not fetch remote services catalog:", err));
  }, []);

  // Configure pre-filled details when a specific service is clicked
  useEffect(() => {
    let target = passedService;

    if (!target && queryServiceName) {
      target = availableServices.find(s => s.title.toLowerCase() === queryServiceName.toLowerCase()) || {
        title: queryServiceName,
        tagline: `Dedicated consultation for ${queryServiceName}`,
        capabilities: ["Custom architecture & sprint planning", "Production-grade implementation"],
        techStack: ["Full-Stack Stack"]
      };
    }

    if (target) {
      setPrimaryService(target);
      setSelectedServices([target.title]);

      setFormData(prev => ({
        ...prev,
        projectTitle: `${target.title} Implementation`,
        projectType: target.category || target.title,
        projectDescription: formatInitialDescription(target)
      }));
    }
  }, [passedService, queryServiceName, availableServices]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (serviceTitle) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceTitle)) {
        // Prevent deselecting if it is the only one selected
        return prev.length > 1 ? prev.filter(t => t !== serviceTitle) : prev;
      } else {
        return [...prev, serviceTitle];
      }
    });
  };

  const handleClearPreselectedService = () => {
    setPrimaryService(null);
    setSelectedServices(["Full-Stack Web & SaaS"]);
    setFormData(prev => ({
      ...prev,
      projectTitle: "",
      projectType: "Web Application",
      projectDescription: "",
      customFeatures: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      alert("Please select at least one service category.");
      return;
    }

    if (!formData.email.trim() || !formData.projectDescription.trim()) {
      alert("Please provide your email and project overview.");
      return;
    }

    setIsSubmitting(true);

    const formattedBudget = budget.trim()
      ? (budget.trim().startsWith("₹") ? budget.trim() : `₹${budget.trim()}`)
      : "Flexible / Not specified";

    // Combine description and custom extra details
    let finalDescription = formData.projectDescription.trim();
    if (formData.customFeatures && formData.customFeatures.trim()) {
      finalDescription += `\n\n--- Custom Additions & Specific Feature Requests ---\n${formData.customFeatures.trim()}`;
    }

    const payload = {
      ...formData,
      clientName: `${formData.firstName} ${formData.lastName}`.trim() || (user?.name || "Client"),
      services: selectedServices,
      projectDescription: finalDescription,
      budget: formattedBudget,
      timeline: selectedTimeline,
      additionalInfo: formData.customFeatures?.trim() || formData.additionalInfo || "",
      userId: user?._id || user?.id || ""
    };

    try {
      const res = await fetch("/api/hire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.message || data.error || "Failed to submit consultation form");
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 120, behavior: "smooth" });
    } catch (error) {
      console.error("Hire form submit error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      backgroundColor: "var(--bg)",
      minHeight: "100vh",
      color: "var(--text)",
      fontFamily: "var(--font-family, system-ui, -apple-system, sans-serif)"
    }}>
      <Nav />

      {/* Auth Modal overlay if needed */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onSuccess={() => setShowAuthModal(false)} 
      />

      {/* Main Container */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "clamp(4.5rem, 8vw, 7rem) clamp(1rem, 3.5vw, 1.5rem) clamp(2.5rem, 5vw, 5rem)",
        boxSizing: "border-box"
      }}>

        {isSubmitted ? (
          /* Success Screen */
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: "clamp(2rem, 5vw, 3.5rem) clamp(1rem, 3.5vw, 2rem)",
            textAlign: "center",
            boxShadow: "var(--shadow)"
          }}>
            <div style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "color-mix(in srgb, var(--success) 15%, transparent)",
              color: "var(--success)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              border: "1px solid color-mix(in srgb, var(--success) 30%, transparent)"
            }}>
              <CheckCircle2 size={40} />
            </div>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              backgroundColor: "var(--bg-alt)",
              color: "var(--primary)",
              padding: "4px 14px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "1rem",
              border: "1px solid var(--border)"
            }}>
              <Check size={14} /> CONSULTATION INITIATED
            </div>

            <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--text)", marginBottom: "1rem" }}>
              Project Scope Successfully Received
            </h1>

            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
              Thank you, <strong style={{ color: "var(--text)" }}>{formData.firstName || "Client"}</strong>. Our technical architects are reviewing your specifications. We will reach out to you at <strong style={{ color: "var(--primary)" }}>{formData.email}</strong> within 24 hours with an initial architectural roadmap and sprint estimate.
            </p>

            <div style={{
              backgroundColor: "var(--bg-alt)",
              borderRadius: "16px",
              border: "1px solid var(--border)",
              padding: "1.5rem",
              maxWidth: "560px",
              margin: "0 auto 2.5rem",
              textAlign: "left"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Registered Disciplines:</span>
                <span style={{ color: "var(--text)", fontSize: "0.85rem", fontWeight: 700 }}>{selectedServices.join(", ")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Project Title:</span>
                <span style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700 }}>{formData.projectTitle || "Custom Solution"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Estimated Budget:</span>
                <span style={{ color: "var(--text)", fontSize: "0.85rem", fontWeight: 600 }}>
                  {budget.trim() ? (budget.trim().startsWith("₹") ? budget.trim() : `₹${budget.trim()}`) : "Flexible / Not specified"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Target Timeline:</span>
                <span style={{ color: "var(--text)", fontSize: "0.85rem", fontWeight: 600 }}>{selectedTimeline}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                to="/profile"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-contrast)",
                  padding: "0.9rem 2rem",
                  minHeight: "48px",
                  borderRadius: "50px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "var(--shadow)",
                  touchAction: "manipulation"
                }}
              >
                Track in Client Portal <ArrowRight size={16} />
              </Link>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  handleClearPreselectedService();
                }}
                style={{
                  backgroundColor: "transparent",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  padding: "0.9rem 1.8rem",
                  minHeight: "48px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  touchAction: "manipulation"
                }}
              >
                Submit Another Project
              </button>
            </div>
          </div>
        ) : (
          /* Project Consultation Form */
          <div>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                backgroundColor: "var(--bg-alt)",
                color: "var(--primary)",
                padding: "4px 14px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "1rem",
                border: "1px solid var(--border)"
              }}>
                <Sparkles size={14} /> STARTUP &amp; PRODUCT DISCOVERY
              </div>

              <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: "1rem", letterSpacing: "-0.02em", lineHeight: 1.15, textWrap: "balance" }}>
                Let us Build Something High-Impact Together
              </h1>

              <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem, 2vw, 1.15rem)", maxWidth: "700px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
                Tell us about your startup, product vision, or technical requirements. We will analyze your scope and return with an architectural plan and sprint estimate within 24 hours.
              </p>

              {/* Trust badges */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "clamp(0.6rem, 2vw, 1.25rem)",
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                padding: "0.6rem clamp(0.85rem, 2.5vw, 1.25rem)",
                borderRadius: "20px",
                flexWrap: "wrap",
                justifyContent: "center",
                boxShadow: "var(--shadow)"
              }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--text)", whiteSpace: "nowrap" }}>
                  <Clock size={14} style={{ color: "var(--primary)", flexShrink: 0 }} /> 24-Hour Response
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--text)", whiteSpace: "nowrap" }}>
                  <ShieldCheck size={14} style={{ color: "var(--success)", flexShrink: 0 }} /> Strict NDA Protection
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--text)", whiteSpace: "nowrap" }}>
                  <IndianRupee size={14} style={{ color: "var(--accent)", flexShrink: 0 }} /> Milestone-Based Pricing
                </span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* ====== SPOTLIGHT: PRE-LOADED SERVICE PACKAGE BANNER (WHEN CLICKED) ====== */}
            {/* ========================================================================= */}
            {primaryService && (
              <div style={{
                background: "linear-gradient(145deg, var(--surface) 0%, var(--bg-alt) 100%)",
                border: "1.5px solid var(--primary)",
                borderRadius: "20px",
                padding: "clamp(1rem, 3.5vw, 1.75rem)",
                marginBottom: "2rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "linear-gradient(90deg, var(--primary), var(--accent))"
                }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.85rem", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", flex: "1 1 240px", minWidth: 0 }}>
                    <div style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(242, 140, 40, 0.12)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(242, 140, 40, 0.25)",
                      flexShrink: 0
                    }}>
                      <FileCheck size={24} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap", marginBottom: "4px" }}>
                        <span style={{
                          backgroundColor: "rgba(16, 185, 129, 0.12)",
                          color: "#10b981",
                          border: "1px solid rgba(16, 185, 129, 0.25)",
                          padding: "3px 8px",
                          borderRadius: "10px",
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          whiteSpace: "nowrap"
                        }}>
                          ✓ Pre-Loaded Service Scope
                        </span>
                        {primaryService.highlight && (
                          <span style={{
                            backgroundColor: "var(--bg-alt)",
                            color: "var(--text-muted)",
                            border: "1px solid var(--border)",
                            padding: "3px 8px",
                            borderRadius: "10px",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            whiteSpace: "nowrap"
                          }}>
                            {primaryService.highlight}
                          </span>
                        )}
                      </div>
                      <h2 style={{ fontSize: "clamp(1.15rem, 3.5vw, 1.45rem)", fontWeight: 800, color: "var(--text)", margin: "0.25rem 0 0", wordBreak: "break-word" }}>
                        {primaryService.title}
                      </h2>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleClearPreselectedService}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                      padding: "0.45rem 0.85rem",
                      borderRadius: "10px",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0
                    }}
                    title="Switch to blank general form"
                  >
                    <RotateCcw size={13} /> Reset to Blank Form
                  </button>
                </div>

                {primaryService.tagline && (
                  <p style={{ color: "var(--primary)", fontSize: "0.92rem", fontWeight: 600, margin: "0 0 1.15rem", lineHeight: 1.45 }}>
                    {primaryService.tagline}
                  </p>
                )}

                {/* Pre-included deliverables */}
                {Array.isArray(primaryService.capabilities) && primaryService.capabilities.length > 0 && (
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.6rem" }}>
                      Pre-Included Standard Deliverables (No Need to Re-Enter):
                    </div>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
                      gap: "0.55rem"
                    }}>
                      {primaryService.capabilities.map((cap, idx) => (
                        <div key={idx} style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          backgroundColor: "var(--surface)",
                          padding: "0.6rem 0.8rem",
                          borderRadius: "10px",
                          border: "1px solid var(--border)",
                          fontSize: "0.82rem",
                          color: "var(--text)",
                          lineHeight: 1.4
                        }}>
                          <CheckCircle2 size={15} style={{ color: "#10b981", flexShrink: 0, marginTop: "2px" }} />
                          <span style={{ wordBreak: "break-word" }}>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Pills */}
                {Array.isArray(primaryService.techStack) && primaryService.techStack.length > 0 && (
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.5rem" }}>
                      Included Technology Ecosystem:
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {primaryService.techStack.map((tech, tIdx) => (
                        <span key={tIdx} style={{
                          backgroundColor: "var(--bg-alt)",
                          color: "var(--text)",
                          border: "1px solid var(--border)",
                          padding: "0.25rem 0.65rem",
                          borderRadius: "6px",
                          fontSize: "0.76rem",
                          fontWeight: 600,
                          whiteSpace: "nowrap"
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.6rem",
                  backgroundColor: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  padding: "0.75rem 0.9rem",
                  borderRadius: "10px",
                  fontSize: "0.8rem",
                  color: "var(--text)",
                  lineHeight: 1.45
                }}>
                  <Info size={16} style={{ color: "#10b981", flexShrink: 0, marginTop: "2px" }} />
                  <span>
                    <strong>Zero re-entry required:</strong> All deliverables and specifications above are already registered into your consultation request. You can check off extra disciplines below or enter custom features.
                  </span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "24px",
              padding: "clamp(1.25rem, 4vw, 3rem) clamp(0.85rem, 3.5vw, 2.5rem)",
              boxShadow: "var(--shadow)"
            }}>

              {/* Step 1: Select Disciplines & Add Extra Services */}
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.6rem", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-contrast)",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      flexShrink: 0
                    }}>1</span>
                    <h3 style={{ fontSize: "clamp(1.05rem, 3.5vw, 1.25rem)", fontWeight: 700, color: "var(--text)", margin: 0 }}>
                      What disciplines or services do you need?
                    </h3>
                  </div>

                  <span style={{
                    backgroundColor: "var(--bg-alt)",
                    border: "1px solid var(--border)",
                    color: "var(--primary)",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "16px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    whiteSpace: "nowrap"
                  }}>
                    {selectedServices.length} Selected {primaryService ? "(Primary + Add-ons)" : ""}
                  </span>
                </div>

                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: "0 0 1.25rem clamp(0.25rem, 1.5vw, 2rem)", lineHeight: 1.45 }}>
                  {primaryService 
                    ? "Your selected service is active below. Click any other service cards to add extra disciplines to your roadmap."
                    : "Select all disciplines that apply to your product roadmap."
                  }
                </p>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
                  gap: "0.85rem"
                }}>
                  {availableServices.map((srv) => {
                    const IconComp = resolveIcon(srv.icon);
                    const isSelected = selectedServices.includes(srv.title);
                    const isPrimary = primaryService && primaryService.title.toLowerCase() === srv.title.toLowerCase();

                    return (
                      <div
                        key={srv.id || srv.title}
                        onClick={() => handleServiceToggle(srv.title)}
                        style={{
                          backgroundColor: isSelected 
                            ? (isPrimary ? "rgba(242, 140, 40, 0.05)" : "rgba(16, 185, 129, 0.05)") 
                            : "var(--surface)",
                          border: isSelected 
                            ? (isPrimary ? "1.5px solid var(--primary)" : "1.5px solid #10b981")
                            : "1px solid var(--border)",
                          borderRadius: "16px",
                          padding: "clamp(0.9rem, 2.5vw, 1.25rem)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          gap: "0.75rem",
                          position: "relative",
                          boxShadow: isSelected 
                            ? (isPrimary ? "0 4px 18px rgba(242, 140, 40, 0.12)" : "0 4px 18px rgba(16, 185, 129, 0.12)") 
                            : "none",
                          touchAction: "manipulation"
                        }}
                      >
                        {/* Top row: Icon on left, status pill on right (prevents any letter wrapping) */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                          <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            backgroundColor: isSelected 
                              ? (isPrimary ? "var(--primary)" : "#10b981")
                              : "var(--bg-alt)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isSelected ? "#ffffff" : "var(--text-muted)",
                            border: "1px solid var(--border)",
                            flexShrink: 0,
                            transition: "all 0.2s ease"
                          }}>
                            <IconComp size={20} />
                          </div>

                          {isSelected ? (
                            <span style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              flexShrink: 0,
                              whiteSpace: "nowrap",
                              fontSize: "0.72rem",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              padding: "3px 9px",
                              borderRadius: "20px",
                              backgroundColor: isPrimary ? "rgba(242, 140, 40, 0.16)" : "rgba(16, 185, 129, 0.16)",
                              color: isPrimary ? "var(--primary)" : "#10b981",
                              border: isPrimary ? "1px solid rgba(242, 140, 40, 0.35)" : "1px solid rgba(16, 185, 129, 0.35)"
                            }}>
                              {isPrimary ? "Primary" : "+ Add-on"}
                              <CheckCircle2 size={13} style={{ flexShrink: 0 }} />
                            </span>
                          ) : (
                            <span style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "3px",
                              flexShrink: 0,
                              whiteSpace: "nowrap",
                              fontSize: "0.72rem",
                              fontWeight: 600,
                              color: "var(--text-muted)",
                              padding: "3px 8px",
                              borderRadius: "20px",
                              backgroundColor: "var(--bg-alt)",
                              border: "1px dashed var(--border)"
                            }}>
                              + Select
                            </span>
                          )}
                        </div>

                        {/* Card Text: Full width under icon row */}
                        <div>
                          <h4 style={{
                            margin: "0 0 0.35rem 0",
                            fontSize: "0.96rem",
                            fontWeight: 700,
                            color: isSelected ? "var(--primary)" : "var(--text)",
                            lineHeight: 1.35,
                            wordBreak: "break-word"
                          }}>
                            {srv.title}
                          </h4>
                          <p style={{
                            margin: 0,
                            fontSize: "0.82rem",
                            color: "var(--text-muted)",
                            lineHeight: 1.45
                          }}>
                            {srv.tagline}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Contact Information */}
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-contrast)",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    flexShrink: 0
                  }}>2</span>
                  <h3 style={{ fontSize: "clamp(1.05rem, 3.5vw, 1.25rem)", fontWeight: 700, color: "var(--text)", margin: 0 }}>
                    About you and your business
                  </h3>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: "0 0 1.25rem clamp(0.25rem, 1.5vw, 2rem)", lineHeight: 1.45 }}>
                  Where should we send your project proposal and sprint timeline?
                </p>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
                  gap: "1rem"
                }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>First Name *</label>
                    <input
                      style={formInputGlass}
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>Last Name</label>
                    <input
                      style={formInputGlass}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Morgan"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>Work Email *</label>
                    <input
                      style={formInputGlass}
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="alex@startup.com"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>Phone / WhatsApp</label>
                    <input
                      style={formInputGlass}
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>Company / Startup Name</label>
                    <input
                      style={formInputGlass}
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Acme Labs"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>Existing Website / App Link</label>
                    <input
                      style={formInputGlass}
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Project Scope & Vision */}
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-contrast)",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    flexShrink: 0
                  }}>3</span>
                  <h3 style={{ fontSize: "clamp(1.05rem, 3.5vw, 1.25rem)", fontWeight: 700, color: "var(--text)", margin: 0 }}>
                    Project Specifications &amp; Requirements
                  </h3>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: "0 0 1.25rem clamp(0.25rem, 1.5vw, 2rem)", lineHeight: 1.45 }}>
                  {primaryService 
                    ? "Your baseline deliverables have been pre-filled below. You can edit any details or add extra custom requirements."
                    : "Give us as much context as possible to help us scope accurately."
                  }
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.35rem", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>
                      <span>Project Title / Working Name</span>
                      {primaryService && <span style={{ color: "#10b981", fontSize: "0.74rem", fontWeight: 700, whiteSpace: "nowrap" }}>✓ Pre-filled from service</span>}
                    </label>
                    <input
                      style={formInputGlass}
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={handleInputChange}
                      placeholder="e.g. AI-Powered Customer Onboarding SaaS"
                    />
                  </div>

                  <div>
                    <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.35rem", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>
                      <span>Project Overview &amp; Included Scope *</span>
                      {primaryService && <span style={{ color: "#10b981", fontSize: "0.74rem", fontWeight: 700, whiteSpace: "nowrap" }}>✓ Deliverables pre-loaded</span>}
                    </label>
                    <textarea
                      style={{ ...formInputGlass, minHeight: "140px", resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }}
                      required
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      placeholder="Describe what you want to build, the core problem it solves, target users, and any key feature requirements..."
                    />
                    <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "4px" }}>
                      You can directly edit the text above to adjust any pre-loaded deliverables.
                    </p>
                  </div>

                  {/* Dedicated Extra Details / Custom Features input */}
                  <div>
                    <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.35rem", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>
                      <span>Add Extra Custom Features or Changes (Optional)</span>
                      <span style={{ color: "var(--primary)", fontSize: "0.74rem", fontWeight: 700, whiteSpace: "nowrap" }}>Add-on specifications</span>
                    </label>
                    <textarea
                      style={{ ...formInputGlass, minHeight: "95px", resize: "vertical" }}
                      name="customFeatures"
                      value={formData.customFeatures}
                      onChange={handleInputChange}
                      placeholder="e.g. Need WhatsApp notifications integration, custom admin analytics dashboard, multi-currency Stripe checkout, or 3-week target delivery..."
                    />
                    <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "4px" }}>
                      Anything entered here will be added on top of your selected service package.
                    </p>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>Figma, Wireframes, or Reference URLs (Optional)</label>
                    <input
                      style={formInputGlass}
                      name="reference"
                      value={formData.reference}
                      onChange={handleInputChange}
                      placeholder="Paste link to Figma prototype, GitHub repo, or inspiration product"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Budget & Timeline */}
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-contrast)",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    flexShrink: 0
                  }}>4</span>
                  <h3 style={{ fontSize: "clamp(1.05rem, 3.5vw, 1.25rem)", fontWeight: 700, color: "var(--text)", margin: 0 }}>
                    Estimated Budget &amp; Target Timeline
                  </h3>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: "0 0 1.25rem clamp(0.25rem, 1.5vw, 2rem)", lineHeight: 1.45 }}>
                  This helps us architect the right scope, team size, and milestone schedule.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "1.25rem" }}>
                  {/* Budget Input in Rupees */}
                  <div>
                    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.35rem", fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                      <span>Estimated Budget (₹ Rupees)</span>
                      <span style={{ fontSize: "0.74rem", fontWeight: 500, color: "var(--text-muted)" }}>In Indian Rupees (INR)</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <div style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        pointerEvents: "none",
                        fontWeight: 700,
                        fontSize: "1.1rem"
                      }}>
                        ₹
                      </div>
                      <input
                        type="text"
                        style={{
                          ...formInputGlass,
                          paddingLeft: "2.5rem"
                        }}
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="e.g. 50,000 or 1,00,000 – 2,50,000"
                      />
                    </div>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "6px", marginBottom: "0.85rem" }}>
                      Enter your estimated project budget or range in Indian Rupees (₹).
                    </p>

                    {/* Quick suggestion tags in INR */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {BUDGET_PRESETS_INR.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setBudget(preset)}
                          style={{
                            background: budget === preset ? "var(--primary)" : "var(--bg-alt)",
                            border: budget === preset ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                            borderRadius: "20px",
                            padding: "6px 12px",
                            minHeight: "36px",
                            color: budget === preset ? "var(--primary-contrast)" : "var(--text-muted)",
                            fontSize: "0.75rem",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            touchAction: "manipulation",
                            display: "inline-flex",
                            alignItems: "center",
                            whiteSpace: "nowrap"
                          }}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Options */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                      Desired Launch Timeline
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {TIMELINE_OPTIONS.map((t) => {
                        const isSelected = selectedTimeline === t.label;
                        return (
                          <div
                            key={t.id}
                            onClick={() => setSelectedTimeline(t.label)}
                            style={{
                              backgroundColor: isSelected ? "var(--bg-alt)" : "var(--surface)",
                              border: isSelected ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                              padding: "10px 14px",
                              borderRadius: "12px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "0.5rem",
                              transition: "all 0.2s ease",
                              minHeight: "44px",
                              touchAction: "manipulation"
                            }}
                          >
                            <span style={{ fontSize: "0.88rem", fontWeight: isSelected ? 700 : 500, color: isSelected ? "var(--primary)" : "var(--text)" }}>
                              {t.label}
                            </span>
                            <div style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "50%",
                              border: isSelected ? "5px solid var(--primary)" : "2px solid var(--border)",
                              backgroundColor: isSelected ? "var(--surface)" : "transparent",
                              flexShrink: 0
                            }} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Scope Review & Live Summary Strip */}
              <div style={{
                backgroundColor: "var(--bg-alt)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "clamp(0.85rem, 3vw, 1.25rem)",
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.85rem"
              }}>
                <div style={{ flex: "1 1 240px", minWidth: 0 }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
                    Inquiry Summary
                  </div>
                  <div style={{ fontSize: "0.96rem", fontWeight: 800, color: "var(--text)", marginTop: "2px", wordBreak: "break-word" }}>
                    {selectedServices.join(" + ")}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "3px" }}>
                    Target Timeline: <strong style={{ color: "var(--primary)" }}>{selectedTimeline}</strong> • Budget: <strong style={{ color: "var(--primary)" }}>{budget || "Flexible"}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                  <span style={{
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    color: "#10b981",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    whiteSpace: "nowrap"
                  }}>
                    <CheckCircle2 size={14} /> Scope Ready
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ textAlign: "center", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-contrast)",
                    border: "none",
                    padding: "1rem 2.5rem",
                    width: "min(100%, 420px)",
                    minHeight: "48px",
                    borderRadius: "50px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    boxShadow: "var(--shadow)",
                    transition: "all 0.25s ease",
                    opacity: isSubmitting ? 0.7 : 1,
                    touchAction: "manipulation"
                  }}
                  onMouseOver={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = "var(--accent)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = "var(--primary)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {isSubmitting ? (
                    "Submitting Project Scope..."
                  ) : (
                    <>
                      <Send size={18} /> Submit Consultation Request
                    </>
                  )}
                </button>

                <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: "1rem" }}>
                  🔒 Your information is confidential and protected by standard mutual NDA terms.
                </p>
              </div>

            </form>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};

const formInputGlass = {
  width: "100%",
  padding: "0.85rem 1rem",
  backgroundColor: "var(--input-bg)",
  border: "1px solid var(--input-border)",
  borderRadius: "10px",
  color: "var(--text)",
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
  minWidth: 0,
};

export default Hireforms;
