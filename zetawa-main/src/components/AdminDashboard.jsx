import { useState, useEffect } from "react"
import { 
  Newspaper, Award, Plus, Trash2, Edit3, Save, X, Bell, Briefcase, 
  ExternalLink, Layers, RotateCcw, CheckCircle2, Code2, Cpu, Palette, 
  Cloud, ShieldCheck, Users, Server, Zap, Database, Terminal, Sparkles, 
  Tag, Eye, Search, Check, ListChecks, ArrowUp, ArrowDown, ChevronDown, 
  ChevronUp, Wrench, Inbox, MessageSquare, Clock, DollarSign, Calendar,
  User, Mail, Phone, Building, FileText, Send, AlertCircle, RefreshCw,
  Copy, CheckCheck, Compass, CheckSquare, Shield
} from "lucide-react"
import { useAppContext } from "../context/AppContext"
import Nav from "./Nav"
import Footer from "./Footer"
import axios from "axios"
axios.defaults.withCredentials = true

const API_URL = ""

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
}

const resolveIcon = (icon) => {
  if (!icon) return Code2
  if (typeof icon === "function" || (typeof icon === "object" && icon !== null)) return icon
  return ICONS_MAP[icon] || Code2
}

const ICON_PICKER_OPTIONS = [
  { id: "Code2", label: "Full-Stack / Code", icon: Code2 },
  { id: "Cpu", label: "AI & Intelligence", icon: Cpu },
  { id: "Palette", label: "UI / UX Design", icon: Palette },
  { id: "Cloud", label: "Cloud & DevOps", icon: Cloud },
  { id: "ShieldCheck", label: "Security & Audit", icon: ShieldCheck },
  { id: "Users", label: "Squads & Teams", icon: Users },
  { id: "Server", label: "Backend / Infra", icon: Server },
  { id: "Zap", label: "Performance / Speed", icon: Zap },
  { id: "Database", label: "Data & Databases", icon: Database },
  { id: "Terminal", label: "Systems & CLI", icon: Terminal },
  { id: "Layers", label: "Architecture", icon: Layers },
  { id: "Sparkles", label: "Innovation", icon: Sparkles }
]

const CATEGORY_CHOICES = [
  { id: "engineering", label: "Engineering & Web/App" },
  { id: "intelligence", label: "AI & Automation" },
  { id: "design", label: "UI/UX & Design Systems" },
  { id: "security", label: "Security & Integrations" },
  { id: "advisory", label: "Dedicated Tech Squads" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "other", label: "Other Services" }
]

const BADGE_PRESETS = [
  "Fast Turnaround Sprints",
  "Production-Grade AI",
  "Pixel-Perfect Polish",
  "Zero-Downtime Reliability",
  "Scalable Architecture",
  "Full IP Ownership",
  "Dedicated Engineers"
]

const TECH_PRESETS = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "React Native", "PostgreSQL",
  "MongoDB", "Docker", "AWS", "Figma", "OpenAI", "FastAPI", "Tailwind CSS",
  "GraphQL", "Redis", "Supabase", "Flutter"
]

const INQUIRY_STATUSES = [
  { value: "Pending Review", label: "Pending Review", bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
  { value: "In Discussion", label: "In Discussion", bg: "#dbeafe", color: "#1e40af", border: "#bfdbfe" },
  { value: "Proposal Sent", label: "Proposal Sent", bg: "#f3e8ff", color: "#6b21a8", border: "#e9d5ff" },
  { value: "In Development", label: "In Development", bg: "#e0e7ff", color: "#3730a3", border: "#c7d2fe" },
  { value: "Completed", label: "Completed", bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  { value: "Archived", label: "Archived", bg: "#f3f4f6", color: "#4b5563", border: "#e5e7eb" }
]

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("inquiries")
  const [pressReleases, setPressReleases] = useState([])
  const [certificates, setCertificates] = useState([])
  const [services, setServices] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [latestUpdates, setLatestUpdates] = useState([])
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const { user } = useAppContext()

  // Inquiries Filter & Status Update State
  const [inquiryFilter, setInquiryFilter] = useState("all")
  const [inquirySearch, setInquirySearch] = useState("")
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [statusUpdateForm, setStatusUpdateForm] = useState({
    status: "",
    adminNotes: "",
    estimatedCompletion: ""
  })
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

  // Forms
  const [prForm, setPrForm] = useState({
    title: "", date: "", type: "Official Announcement",
    source: "LinkedIn", linkedinUrl: "", year: "FY2025", content: ""
  })
  const [certForm, setCertForm] = useState({
    certificateNumber: "", internName: "", course: "",
    issueDate: "", completionDate: "", duration: "", certificateFile: ""
  })
  const [certFile, setCertFile] = useState(null)
  const [luFile, setLuFile] = useState(null)
  const [syncingCloudinary, setSyncingCloudinary] = useState(false)

  const DEFAULT_PR_FORM = { title: "", date: "", type: "Official Announcement", source: "LinkedIn", linkedinUrl: "", year: "FY2025", content: "" }
  const DEFAULT_LU_FORM = { title: "", date: "", description: "", file: "" }
  const DEFAULT_CAREER_FORM = { title: "", department: "Engineering", location: "Remote / Hybrid", type: "Full-time", experience: "Fresher / 0-2 yrs", description: "", requirements: "", applyLink: "" }
  const DEFAULT_SERVICE_FORM = {
    title: "",
    tagline: "",
    description: "",
    category: "engineering",
    icon: "Code2",
    highlight: "Fast Turnaround Sprints",
    capabilities: [
      "Custom full-stack web and mobile application engineering",
      "Modern API architecture & high-performance databases",
      "Automated CI/CD workflows and zero-downtime deployment"
    ],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    order: 1
  }

  const [luForm, setLuForm] = useState({ ...DEFAULT_LU_FORM })
  const [careerForm, setCareerForm] = useState({ ...DEFAULT_CAREER_FORM })
  const [serviceForm, setServiceForm] = useState({ ...DEFAULT_SERVICE_FORM })

  // Interactive parts in service form
  const [newCapInput, setNewCapInput] = useState("")
  const [bulkCapInput, setBulkCapInput] = useState("")
  const [isBulkCapMode, setIsBulkCapMode] = useState(false)
  const [newTechInput, setNewTechInput] = useState("")
  const [serviceSearchQuery, setServiceSearchQuery] = useState("")
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState("all")
  const [expandedServiceIds, setExpandedServiceIds] = useState([])

  // Search filters for other tabs
  const [tableSearch, setTableSearch] = useState("")

  const handleChange = (form, field, value) => {
    if (form === "pr") setPrForm(prev => ({...prev, [field]: value}))
    else if (form === "cert") setCertForm(prev => ({...prev, [field]: value}))
    else if (form === "lu") setLuForm(prev => ({...prev, [field]: value}))
    else if (form === "career") setCareerForm(prev => ({...prev, [field]: value}))
    else if (form === "service") setServiceForm(prev => ({...prev, [field]: value}))
  }

  const handleCopy = (text, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const handleAddCapability = (customText) => {
    const val = (customText !== undefined ? customText : newCapInput).trim()
    if (!val) return
    setServiceForm(prev => ({
      ...prev,
      capabilities: [...(prev.capabilities || []), val]
    }))
    setNewCapInput("")
  }

  const handleUpdateCapability = (index, value) => {
    setServiceForm(prev => {
      const nextCaps = [...(prev.capabilities || [])]
      nextCaps[index] = value
      return { ...prev, capabilities: nextCaps }
    })
  }

  const handleDeleteCapability = (index) => {
    setServiceForm(prev => {
      const nextCaps = [...(prev.capabilities || [])]
      nextCaps.splice(index, 1)
      return { ...prev, capabilities: nextCaps }
    })
  }

  const handleApplyBulkCapabilities = () => {
    if (!bulkCapInput.trim()) return
    const lines = bulkCapInput.split("\n").map(l => l.trim().replace(/^[-*•\d.]\s*/, "")).filter(Boolean)
    if (lines.length > 0) {
      setServiceForm(prev => ({
        ...prev,
        capabilities: [...(prev.capabilities || []), ...lines]
      }))
    }
    setBulkCapInput("")
    setIsBulkCapMode(false)
  }

  const handleAddTech = (tech) => {
    const val = (tech || newTechInput).trim()
    if (!val) return
    setServiceForm(prev => {
      const current = prev.techStack || []
      if (current.some(t => t.toLowerCase() === val.toLowerCase())) return prev
      return { ...prev, techStack: [...current, val] }
    })
    setNewTechInput("")
  }

  const handleDeleteTech = (techToDelete) => {
    setServiceForm(prev => ({
      ...prev,
      techStack: (prev.techStack || []).filter(t => t !== techToDelete)
    }))
  }

  const handleToggleExpandService = (id) => {
    setExpandedServiceIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [prRes, certRes, luRes, careerRes, serviceRes, hireRes] = await Promise.all([
        axios.get(`${API_URL}/api/press-releases`).catch(() => ({ data: { success: false, data: [] } })),
        axios.get(`${API_URL}/api/certificates`).catch(() => ({ data: { success: false, data: [] } })),
        axios.get(`${API_URL}/api/latest-updates`).catch(() => ({ data: { success: false, data: [] } })),
        axios.get(`${API_URL}/api/careers`).catch(() => ({ data: { success: false, data: [] } })),
        axios.get(`${API_URL}/api/services`).catch(() => ({ data: { success: false, data: [] } })),
        axios.get(`${API_URL}/api/hire`).catch(() => ({ data: { success: false, data: [] } }))
      ])
      if (prRes.data.success) setPressReleases(prRes.data.data)
      if (certRes.data.success) setCertificates(certRes.data.data)
      if (luRes.data.success) setLatestUpdates(luRes.data.data)
      if (careerRes.data.success) setCareers(careerRes.data.data)
      if (serviceRes.data.success) setServices(serviceRes.data.data)
      if (hireRes.data.success) setInquiries(hireRes.data.data)
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err)
    } finally {
      setLoading(false)
    }
  }

  // Inquiries Handlers
  const handleOpenStatusModal = (inquiry) => {
    setSelectedInquiry(inquiry)
    setStatusUpdateForm({
      status: inquiry.status || "Pending Review",
      adminNotes: inquiry.adminNotes || "",
      estimatedCompletion: inquiry.estimatedCompletion || ""
    })
  }

  const handleSaveInquiryStatus = async (e) => {
    if (e) e.preventDefault()
    if (!selectedInquiry) return
    setIsUpdatingStatus(true)
    try {
      const res = await axios.put(`${API_URL}/api/hire/${selectedInquiry._id}/status`, statusUpdateForm)
      if (res.data.success) {
        setInquiries(prev => prev.map(item => item._id === selectedInquiry._id ? res.data.data : item))
        setSelectedInquiry(null)
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update inquiry status")
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  const handleDeleteInquiry = async (id) => {
    if (!confirm("Are you sure you want to delete this consultation inquiry?")) return
    try {
      await axios.delete(`${API_URL}/api/hire/${id}`)
      setInquiries(prev => prev.filter(item => item._id !== id))
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete inquiry")
    }
  }

  // Service CRUD
  const handleServiceSubmit = async (e) => {
    e.preventDefault()
    if (!serviceForm.title.trim()) {
      alert("Please enter a service title")
      return
    }
    if (!serviceForm.description.trim()) {
      alert("Please enter a service description")
      return
    }
    try {
      const payload = {
        title: serviceForm.title.trim(),
        tagline: serviceForm.tagline.trim(),
        description: serviceForm.description.trim(),
        category: serviceForm.category || "engineering",
        icon: serviceForm.icon || "Code2",
        highlight: serviceForm.highlight.trim() || "Fast Turnaround Sprints",
        capabilities: (serviceForm.capabilities || []).map(s => String(s).trim()).filter(Boolean),
        techStack: (serviceForm.techStack || []).map(s => String(s).trim()).filter(Boolean),
        order: Number(serviceForm.order) || 0
      }
      if (editingId) {
        await axios.put(`${API_URL}/api/services/${editingId}`, payload)
      } else {
        await axios.post(`${API_URL}/api/services`, payload)
      }
      setEditingId(null)
      setShowAddForm(false)
      setServiceForm({ ...DEFAULT_SERVICE_FORM })
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error saving service")
    }
  }

  const handleServiceEdit = (svc) => {
    setEditingId(svc._id)
    setServiceForm({
      title: svc.title || "",
      tagline: svc.tagline || "",
      description: svc.description || "",
      category: svc.category || "engineering",
      icon: svc.icon || "Code2",
      highlight: svc.highlight || "Fast Turnaround Sprints",
      capabilities: Array.isArray(svc.capabilities) ? [...svc.capabilities] : (svc.capabilities ? [svc.capabilities] : []),
      techStack: Array.isArray(svc.techStack) ? [...svc.techStack] : (svc.techStack ? [svc.techStack] : []),
      order: svc.order !== undefined ? svc.order : 0
    })
    setShowAddForm(true)
    setTimeout(() => {
      const el = document.getElementById("service-editor-anchor")
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 60)
  }

  const handleServiceDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return
    try {
      await axios.delete(`${API_URL}/api/services/${id}`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting service")
    }
  }

  const handleServiceReset = async () => {
    if (!confirm("Reset all services to modern default services? Any custom added services will be replaced.")) return
    try {
      await axios.post(`${API_URL}/api/services/reset-defaults`)
      fetchData()
      alert("Services reset successfully!")
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting services")
    }
  }

  // Press Release CRUD
  const handlePrSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/press-releases/${editingId}`, prForm)
      } else {
        await axios.post(`${API_URL}/api/press-releases`, prForm)
      }
      setEditingId(null)
      setShowAddForm(false)
      setPrForm(DEFAULT_PR_FORM)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error saving press release")
    }
  }

  const handlePrEdit = (pr) => {
    setEditingId(pr._id)
    setPrForm({
      title: pr.title, date: pr.date, type: pr.type || "Official Announcement",
      source: pr.source || "LinkedIn", linkedinUrl: pr.linkedinUrl || "",
      year: pr.year || "FY2025", content: pr.content || ""
    })
    setShowAddForm(true)
  }

  const handlePrDelete = async (id) => {
    if (!confirm("Are you sure?")) return
    try {
      await axios.delete(`${API_URL}/api/press-releases/${id}`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting")
    }
  }

  // Certificate CRUD
  const handleCertSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(certForm).forEach(key => {
      if (certForm[key] !== undefined && certForm[key] !== null) {
        formData.append(key, certForm[key])
      }
    })
    if (certFile) formData.append("file", certFile)

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/certificates/${editingId}`, formData)
      } else {
        await axios.post(`${API_URL}/api/certificates`, formData)
      }
      setEditingId(null)
      setShowAddForm(false)
      setCertForm({ certificateNumber: "", internName: "", course: "", issueDate: "", completionDate: "", duration: "", certificateFile: "" })
      setCertFile(null)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error saving certificate")
    }
  }

  const handleCertDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return
    try {
      await axios.delete(`${API_URL}/api/certificates/${id}`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting")
    }
  }

  const handleSyncCloudinary = async () => {
    try {
      setSyncingCloudinary(true)
      const res = await axios.post(`${API_URL}/api/certificates/sync-cloudinary`)
      if (res.data.success) {
        alert(res.data.message)
        fetchData()
      } else {
        alert(res.data.message || "Failed to sync to Cloudinary")
      }
    } catch (err) {
      alert(err.response?.data?.message || "Cloudinary sync request failed")
    } finally {
      setSyncingCloudinary(false)
    }
  }

  // Latest Updates CRUD
  const handleLuSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", luForm.title)
    formData.append("date", luForm.date)
    formData.append("description", luForm.description)
    if (luFile) formData.append("file", luFile)

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/latest-updates/${editingId}`, formData)
      } else {
        await axios.post(`${API_URL}/api/latest-updates`, formData)
      }
      setEditingId(null)
      setShowAddForm(false)
      setLuForm(DEFAULT_LU_FORM)
      setLuFile(null)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error saving update")
    }
  }

  const handleLuEdit = (lu) => {
    setEditingId(lu._id)
    setLuForm({ title: lu.title, date: lu.date, description: lu.description, file: lu.file || "" })
    setShowAddForm(true)
  }

  const handleLuDelete = async (id) => {
    if (!confirm("Are you sure?")) return
    try {
      await axios.delete(`${API_URL}/api/latest-updates/${id}`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting")
    }
  }

  // Careers CRUD
  const handleCareerSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...careerForm,
        requirements: (typeof careerForm.requirements === 'string'
          ? careerForm.requirements.split('\n')
          : careerForm.requirements || []
        ).map(r => r.trim()).filter(Boolean)
      }
      if (editingId) {
        await axios.put(`${API_URL}/api/careers/${editingId}`, payload)
      } else {
        await axios.post(`${API_URL}/api/careers`, payload)
      }
      setEditingId(null)
      setShowAddForm(false)
      setCareerForm(DEFAULT_CAREER_FORM)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error saving career")
    }
  }

  const handleCareerEdit = (career) => {
    setEditingId(career._id)
    setCareerForm({
      title: career.title || "",
      department: career.department || "Engineering",
      location: career.location || "Remote / Hybrid",
      type: career.type || "Full-time",
      experience: career.experience || "Fresher / 0-2 yrs",
      description: career.description || "",
      requirements: Array.isArray(career.requirements) ? career.requirements.join('\n') : (career.requirements || ""),
      applyLink: career.applyLink || ""
    })
    setShowAddForm(true)
  }

  const handleCareerDelete = async (id) => {
    if (!confirm("Are you sure you want to remove this career opportunity?")) return
    try {
      await axios.delete(`${API_URL}/api/careers/${id}`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting")
    }
  }

  const handleCareerReset = async () => {
    if (!confirm("Reset all careers to predefined defaults? Any custom added careers will be replaced.")) return
    try {
      await axios.post(`${API_URL}/api/careers/reset-defaults`)
      fetchData()
      alert("Career opportunities reset to defaults successfully!")
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting careers")
    }
  }

  // Filtered inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const matchesFilter = inquiryFilter === "all" || inq.status === inquiryFilter
    const q = inquirySearch.toLowerCase().trim()
    if (!q) return matchesFilter
    const matchesSearch = 
      (inq.clientName && inq.clientName.toLowerCase().includes(q)) ||
      (inq.email && inq.email.toLowerCase().includes(q)) ||
      (inq.company && inq.company.toLowerCase().includes(q)) ||
      (inq.projectTitle && inq.projectTitle.toLowerCase().includes(q)) ||
      (Array.isArray(inq.services) && inq.services.some(s => s.toLowerCase().includes(q))) ||
      (inq.projectDescription && inq.projectDescription.toLowerCase().includes(q))
    return matchesFilter && matchesSearch
  })

  const pendingInquiriesCount = inquiries.filter(i => i.status === "Pending Review").length

  // Filtered services
  const filteredServices = services.filter(svc => {
    const matchesCat = serviceCategoryFilter === "all" || svc.category === serviceCategoryFilter
    const q = serviceSearchQuery.toLowerCase().trim()
    if (!q) return matchesCat
    const matchesText = 
      (svc.title && svc.title.toLowerCase().includes(q)) ||
      (svc.tagline && svc.tagline.toLowerCase().includes(q)) ||
      (svc.description && svc.description.toLowerCase().includes(q)) ||
      (svc.highlight && svc.highlight.toLowerCase().includes(q)) ||
      (Array.isArray(svc.capabilities) && svc.capabilities.some(c => c.toLowerCase().includes(q))) ||
      (Array.isArray(svc.techStack) && svc.techStack.some(t => t.toLowerCase().includes(q)))
    return matchesCat && matchesText
  })

  // Style objects
  const inputStyle = {
    width: "100%",
    padding: "0.8rem 1rem",
    borderRadius: "10px",
    border: "1.5px solid var(--input-border)",
    backgroundColor: "var(--input-bg)",
    fontSize: "1rem",
    color: "var(--text)",
    boxSizing: "border-box",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    minWidth: 0
  }

  const labelStyle = {
    display: "block",
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "var(--primary)",
    marginBottom: "0.4rem",
    textTransform: "uppercase",
    letterSpacing: "0.6px"
  }

  const btnPrimary = {
    padding: "0.75rem 1.4rem",
    borderRadius: "10px",
    border: "none",
    background: "var(--primary)",
    color: "var(--primary-contrast)",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.9rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    boxShadow: "var(--shadow)",
    transition: "all 0.2s ease",
    minHeight: "44px",
    touchAction: "manipulation"
  }

  const btnSecondary = {
    padding: "0.75rem 1.4rem",
    borderRadius: "10px",
    border: "1.5px solid var(--border)",
    backgroundColor: "var(--surface)",
    color: "var(--text)",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.9rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    transition: "all 0.2s ease",
    minHeight: "44px",
    touchAction: "manipulation"
  }

  const getStatusBadge = (status) => {
    const conf = INQUIRY_STATUSES.find(s => s.value === status) || { bg: "#f3f4f6", color: "#4b5563", border: "#e5e7eb" }
    return (
      <span style={{
        padding: "0.35rem 0.85rem",
        borderRadius: "24px",
        fontSize: "0.78rem",
        fontWeight: 700,
        backgroundColor: conf.bg,
        color: conf.color,
        border: `1px solid ${conf.border}`,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
      }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: conf.color }} />
        {status || "Pending Review"}
      </span>
    )
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)", color: "var(--text)", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Nav />

      {/* Global CSS enhancements */}
      <style>{`
        .admin-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow) !important;
        }
        .admin-nav-tab:hover {
          background-color: var(--bg-alt);
        }
        .admin-nav-tab {
          white-space: nowrap !important;
          word-break: normal !important;
          flex-shrink: 0 !important;
          min-width: max-content !important;
          display: inline-flex !important;
          align-items: center !important;
        }
        .admin-nav-tab-container {
          display: flex !important;
          flex-wrap: nowrap !important;
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch !important;
          scrollbar-width: none !important;
        }
        .admin-nav-tab-container::-webkit-scrollbar {
          display: none !important;
        }
        .table-row-hover:hover {
          background-color: var(--bg-alt) !important;
        }
        .action-icon-btn:hover {
          transform: scale(1.1);
        }
        input:focus, textarea:focus, select:focus {
          border-color: var(--focus-ring) !important;
          box-shadow: 0 0 0 3px var(--focus-ring) !important;
        }
      `}</style>

      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "clamp(1.5rem, 4vw, 2rem) clamp(1rem, 3.5vw, 1.5rem) 4rem", boxSizing: "border-box" }}>
        
        {/* ============ 1. HEADER EXECUTIVE HERO ============ */}
        <div style={{
          background: "var(--surface)",
          backdropFilter: "blur(16px)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "clamp(1.25rem, 3.5vw, 2rem) clamp(1rem, 3vw, 2.25rem)",
          marginBottom: "2rem",
          boxShadow: "var(--shadow)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}>
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "var(--bg-alt)",
              color: "var(--primary)",
              padding: "0.35rem 0.9rem",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: 800,
              letterSpacing: "0.5px",
              marginBottom: "0.65rem",
              border: "1px solid var(--border)"
            }}>
              <Shield size={14} /> ZETAWA DARK EXECUTIVE CONSOLE
            </div>
            <h1 style={{ color: "var(--text)", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
              Admin Command Suite
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "0.35rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>Authenticated Officer:</span>
              <strong style={{ color: "var(--primary)" }}>{user?.name || "Executive Admin"}</strong>
              <span style={{ color: "var(--text-muted)" }}>•</span>
              <span style={{ color: "var(--text-muted)" }}>{user?.email}</span>
            </p>
          </div>

          {/* Quick Actions & Live Refresh */}
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
            <button 
              onClick={fetchData} 
              style={{
                ...btnSecondary,
                padding: "0.65rem 1.25rem",
                fontSize: "0.85rem",
                boxShadow: "var(--shadow)"
              }}>
              <RefreshCw size={15} style={{ transition: "transform 0.5s ease" }} /> Refresh Live Data
            </button>
          </div>
        </div>

        {/* ============ 2. EXECUTIVE KPI OVERVIEW ============ */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: "1.1rem", marginBottom: "2rem" }}>
          {[
            { label: "Consultation Inquiries", val: inquiries.length, sub: "Client project requests", icon: Inbox, color: "#7e3a41", bg: "rgba(126, 58, 65, 0.06)", border: "rgba(126, 58, 65, 0.16)" },
            { label: "Pending Response", val: pendingInquiriesCount, sub: "Requires officer review", icon: AlertCircle, color: "#b45309", bg: "#fffdfa", border: "#fef3c7" },
            { label: "Active Services", val: services.length, sub: "Public offerings catalog", icon: Layers, color: "#1d4ed8", bg: "#fbfdff", border: "#dbeafe" },
            { label: "Press Disclosures", val: pressReleases.length, sub: "Official newsroom posts", icon: Newspaper, color: "#6b21a8", bg: "#fcfaff", border: "#f3e8ff" },
            { label: "Verified Certificates", val: certificates.length, sub: "Cryptographic credentials", icon: Award, color: "#15803d", bg: "#fbfffc", border: "#dcfce7" },
            { label: "Career Postings", val: careers.length, sub: "Active fellowship openings", icon: Briefcase, color: "#0369a1", bg: "#f0f9ff", border: "#bae6fd" }
          ].map((kpi, idx) => (
            <div 
              key={idx}
              className="admin-stat-card"
              style={{
                background: "var(--surface)",
                padding: "1.35rem 1.25rem",
                borderRadius: "16px",
                border: `1px solid ${kpi.border}`,
                boxShadow: "var(--shadow)",
                transition: "all 0.25s ease",
                position: "relative",
                overflow: "hidden"
              }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                backgroundColor: kpi.color
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {kpi.label}
                  </div>
                  <div style={{ fontSize: "1.85rem", fontWeight: 800, color: kpi.color, marginTop: "0.3rem" }}>
                    {kpi.val}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                    {kpi.sub}
                  </div>
                </div>
                <div style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  backgroundColor: kpi.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: kpi.color
                }}>
                  <kpi.icon size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============ 3. NAVIGATION TABS BAR ============ */}
        <div 
          className="admin-nav-tab-container"
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "2rem",
            flexWrap: "nowrap",
            background: "var(--surface)",
            padding: "0.6rem",
            borderRadius: "16px",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow)",
            overflowX: "auto",
            maxWidth: "100%",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none"
          }}
        >
          {[
            { id: "inquiries", label: "Project Consultations", icon: Inbox, badge: inquiries.length, pendingBadge: pendingInquiriesCount },
            { id: "services", label: "Services CMS", icon: Layers, badge: services.length },
            { id: "careers", label: "Careers & Openings", icon: Briefcase, badge: careers.length },
            { id: "press-releases", label: "Press Releases", icon: Newspaper, badge: pressReleases.length },
            { id: "certificates", label: "Certificates Registry", icon: Award, badge: certificates.length },
            { id: "latest-updates", label: "Latest Announcements", icon: Bell, badge: latestUpdates.length },
          ].map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button 
                key={tab.id} 
                className="admin-nav-tab"
                onClick={() => { setActiveTab(tab.id); setEditingId(null); setShowAddForm(false); setTableSearch(""); }}
                style={{
                  padding: "0.8rem 1.4rem", 
                  borderRadius: "12px", 
                  border: "none", 
                  fontWeight: 700, 
                  cursor: "pointer",
                  background: isActive ? "var(--primary)" : "transparent",
                  color: isActive ? "var(--primary-contrast)" : "var(--text-muted)",
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "0.55rem",
                  transition: "all 0.2s ease",
                  fontSize: "0.92rem",
                  boxShadow: isActive ? "var(--shadow)" : "none",
                  whiteSpace: "nowrap",
                  wordBreak: "normal",
                  minWidth: "max-content",
                  flexShrink: 0,
                  minHeight: "44px",
                  touchAction: "manipulation"
                }}>
                <tab.icon size={17} style={{ flexShrink: 0 }} /> 
                <span style={{ whiteSpace: "nowrap", flexShrink: 0 }}>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span style={{
                    backgroundColor: isActive ? "rgba(255,255,255,0.22)" : "var(--bg-alt)",
                    color: isActive ? "var(--primary-contrast)" : "var(--primary)",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    padding: "0.15rem 0.55rem",
                    borderRadius: "20px",
                    marginLeft: "0.2rem",
                    whiteSpace: "nowrap",
                    flexShrink: 0
                  }}>
                    {tab.badge}
                  </span>
                )}
                {tab.pendingBadge > 0 && (
                  <span 
                    title={`${tab.pendingBadge} pending review`}
                    style={{
                      backgroundColor: "var(--danger)",
                      color: "var(--primary-contrast)",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "0.12rem 0.48rem",
                      borderRadius: "20px",
                      marginLeft: "0.1rem",
                      whiteSpace: "nowrap",
                      flexShrink: 0
                    }}>
                    {tab.pendingBadge} new
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "6rem 2rem", background: "var(--surface)", borderRadius: "20px", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
            <div style={{ display: "inline-block", width: "45px", height: "45px", border: "3px solid var(--border)", borderTop: "3px solid var(--primary)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            <p style={{ color: "var(--text-muted)", marginTop: "1.25rem", fontWeight: 700, fontSize: "1rem" }}>Connecting to Zetawa Dark CMS...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <>
            {/* ========================================================================= */}
            {/* ============ 1. PROJECT CONSULTATIONS & INQUIRIES CMS =================== */}
            {/* ========================================================================= */}
            {activeTab === "inquiries" && (
              <div>
                {/* Filter and Search Bar */}
                <div style={{
                  background: "var(--surface)",
                  padding: "1.25rem 1.5rem",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  marginBottom: "1.5rem",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "var(--shadow)"
                }}>
                  <div className="scrollable-filter-row" style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", overflowX: "auto" }}>
                    {[
                      { id: "all", label: `All (${inquiries.length})` },
                      { id: "Pending Review", label: `Pending Review (${inquiries.filter(i => i.status === "Pending Review").length})` },
                      { id: "In Discussion", label: "In Discussion" },
                      { id: "Proposal Sent", label: "Proposal Sent" },
                      { id: "In Development", label: "In Development" },
                      { id: "Completed", label: "Completed" },
                      { id: "Archived", label: "Archived" }
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setInquiryFilter(f.id)}
                        style={{
                          padding: "0.5rem 0.95rem",
                          borderRadius: "20px",
                          border: "none",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          backgroundColor: inquiryFilter === f.id ? "var(--primary)" : "var(--bg-alt)",
                          color: inquiryFilter === f.id ? "var(--primary-contrast)" : "var(--text-muted)",
                          transition: "all 0.2s ease",
                          whiteSpace: "nowrap",
                          wordBreak: "normal",
                          flexShrink: 0,
                          minWidth: "max-content",
                          touchAction: "manipulation"
                        }}>
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <div style={{ position: "relative", minWidth: "min(100%, 260px)", flex: 1 }}>
                    <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input
                      type="text"
                      placeholder="Search client, email, company, scope..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      style={{ ...inputStyle, paddingLeft: "2.4rem", backgroundColor: "var(--input-bg)" }}
                    />
                  </div>
                </div>

                {/* Inquiries Cards List */}
                {filteredInquiries.length === 0 ? (
                  <div style={{ background: "var(--surface)", padding: "5rem 2rem", borderRadius: "18px", textAlign: "center", border: "1px dashed var(--border)" }}>
                    <Inbox size={54} color="var(--border)" style={{ margin: "0 auto 1.25rem" }} />
                    <h3 style={{ color: "var(--text)", fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                      No Consultation Requests Found
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: "440px", margin: "0 auto" }}>
                      {inquirySearch ? "No inquiries match your current search query." : "When clients submit project proposals via the Hire Us portal, they will populate here in real time."}
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
                    {filteredInquiries.map((inq) => (
                      <div 
                        key={inq._id}
                        style={{
                          background: "var(--surface)",
                          borderRadius: "18px",
                          border: "1px solid var(--border)",
                          padding: "clamp(1.1rem, 3vw, 1.75rem) clamp(0.9rem, 2.5vw, 2rem)",
                          boxShadow: "var(--shadow)",
                          transition: "all 0.2s ease"
                        }}>
                        {/* Card Top Row */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "1.25rem", marginBottom: "1.25rem" }}>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text)", margin: 0 }}>
                                {inq.projectTitle || inq.company || "Project Consultation"}
                              </h3>
                              {getStatusBadge(inq.status)}
                              {inq.projectType && (
                                <span style={{ fontSize: "0.78rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "8px", backgroundColor: "var(--bg-alt)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                                  {inq.projectType}
                                </span>
                              )}
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "1.35rem", flexWrap: "wrap", fontSize: "0.88rem", color: "var(--text-muted)" }}>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, color: "var(--primary)" }}>
                                <User size={15} /> {inq.clientName}
                              </span>
                              {inq.company && (
                                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: 600 }}>
                                  <Building size={15} /> {inq.company}
                                </span>
                              )}
                              <a href={`mailto:${inq.email}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-2)", fontWeight: 600, textDecoration: "none" }}>
                                <Mail size={15} /> {inq.email}
                              </a>
                              {inq.phone && (
                                <a href={`tel:${inq.phone}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", textDecoration: "none" }}>
                                  <Phone size={15} /> {inq.phone}
                                </a>
                              )}
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)" }}>
                                <Calendar size={15} /> {new Date(inq.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                            <button
                              onClick={() => handleOpenStatusModal(inq)}
                              style={{
                                ...btnPrimary,
                                padding: "0.55rem 1.15rem",
                                fontSize: "0.85rem",
                                minHeight: "40px"
                              }}>
                              <Edit3 size={14} /> Update Status & Milestones
                            </button>
                            <button
                              onClick={() => handleDeleteInquiry(inq._id)}
                              style={{
                                padding: "0.55rem 0.85rem",
                                borderRadius: "10px",
                                border: "1px solid var(--danger)",
                                backgroundColor: "rgba(239, 68, 68, 0.1)",
                                color: "var(--danger)",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                minHeight: "40px",
                                touchAction: "manipulation"
                              }}
                              title="Delete Inquiry">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Services & Financials Badges */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.1rem" }}>
                          {Array.isArray(inq.services) && inq.services.map((svc, i) => (
                            <span key={i} style={{ padding: "0.3rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 700, backgroundColor: "var(--bg-alt)", color: "var(--primary)", border: "1px solid var(--border)" }}>
                              {svc}
                            </span>
                          ))}
                          {inq.budget && (
                            <span style={{ padding: "0.3rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 700, backgroundColor: "rgba(16, 185, 129, 0.12)", color: "var(--success)", border: "1px solid rgba(16, 185, 129, 0.25)", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                              <DollarSign size={14} /> Budget: {inq.budget}
                            </span>
                          )}
                          {inq.timeline && (
                            <span style={{ padding: "0.3rem 0.75rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 700, backgroundColor: "rgba(59, 130, 246, 0.12)", color: "var(--accent-2)", border: "1px solid rgba(59, 130, 246, 0.25)", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                              <Clock size={14} /> Target Timeline: {inq.timeline}
                            </span>
                          )}
                        </div>

                        {/* Project Description / Scope */}
                        {inq.projectDescription && (
                          <div style={{ backgroundColor: "var(--bg-alt)", padding: "1.1rem 1.4rem", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "1rem" }}>
                            <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase", marginBottom: "0.4rem", letterSpacing: "0.6px" }}>
                              Client Project Scope & Deliverables:
                            </div>
                            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--text)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                              {inq.projectDescription}
                            </p>
                          </div>
                        )}

                        {/* Admin Notes / Milestones Callout */}
                        {inq.adminNotes ? (
                          <div style={{ backgroundColor: "var(--bg-alt)", borderLeft: "4px solid var(--accent-2)", padding: "1rem 1.35rem", borderRadius: "0 10px 10px 0" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--accent-2)", textTransform: "uppercase" }}>
                                Zetawa Dark Admin Notes & Pipeline Updates:
                              </span>
                              {inq.estimatedCompletion && (
                                <span style={{ fontSize: "0.78rem", color: "var(--accent-2)", fontWeight: 700 }}>
                                  Target Window: {inq.estimatedCompletion}
                                </span>
                              )}
                            </div>
                            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text)" }}>{inq.adminNotes}</p>
                          </div>
                        ) : (
                          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontStyle: "italic", padding: "0.4rem 0" }}>
                            No officer milestone notes entered yet. Click &quot;Update Status & Milestones&quot; to push progress updates to the client portal.
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Status Update Modal */}
                {selectedInquiry && (
                  <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "var(--overlay)",
                    backdropFilter: "blur(8px)",
                    zIndex: 2000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem"
                  }}>
                    <div style={{
                      backgroundColor: "var(--surface-elevated)",
                      borderRadius: "clamp(14px, 4vw, 20px)",
                      maxWidth: "580px",
                      width: "100%",
                      padding: "clamp(1.25rem, 4vw, 2.25rem)",
                      maxHeight: "min(90vh, 90dvh)",
                      overflowY: "auto",
                      boxShadow: "var(--shadow)",
                      border: "1px solid var(--border)",
                      boxSizing: "border-box"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                        <div>
                          <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text)", margin: 0 }}>
                            Update Consultation Lifecycle
                          </h3>
                          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: "0.25rem 0 0" }}>
                            Client: <strong>{selectedInquiry.clientName}</strong> ({selectedInquiry.email})
                          </p>
                        </div>
                        <button onClick={() => setSelectedInquiry(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                          <X size={22} />
                        </button>
                      </div>

                      <form onSubmit={handleSaveInquiryStatus}>
                        <div style={{ marginBottom: "1.25rem" }}>
                          <label style={labelStyle}>Project Pipeline Status *</label>
                          <select
                            style={inputStyle}
                            value={statusUpdateForm.status}
                            onChange={(e) => setStatusUpdateForm(prev => ({ ...prev, status: e.target.value }))}
                          >
                            {INQUIRY_STATUSES.map(st => (
                              <option key={st.value} value={st.value}>{st.label}</option>
                            ))}
                          </select>
                        </div>

                        <div style={{ marginBottom: "1.25rem" }}>
                          <label style={labelStyle}>Estimated Milestone / Delivery Window</label>
                          <input
                            type="text"
                            placeholder="e.g. Sprint 1 Kickoff: Nov 10 | Target V1: Dec 01"
                            style={inputStyle}
                            value={statusUpdateForm.estimatedCompletion}
                            onChange={(e) => setStatusUpdateForm(prev => ({ ...prev, estimatedCompletion: e.target.value }))}
                          />
                        </div>

                        <div style={{ marginBottom: "1.5rem" }}>
                          <label style={labelStyle}>Client-Visible Notes & Next Steps</label>
                          <textarea
                            rows={4}
                            placeholder="Add development milestones, scheduled sprint meetings, or requirements clarifications..."
                            style={{ ...inputStyle, resize: "vertical" }}
                            value={statusUpdateForm.adminNotes}
                            onChange={(e) => setStatusUpdateForm(prev => ({ ...prev, adminNotes: e.target.value }))}
                          />
                          <span style={{ fontSize: "0.75rem", color: "var(--primary)", marginTop: "0.4rem", display: "block", fontWeight: 600 }}>
                            💡 Client will see these progress updates in their authenticated User Profile portal.
                          </span>
                        </div>

                        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                          <button
                            type="button"
                            onClick={() => setSelectedInquiry(null)}
                            style={btnSecondary}>
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isUpdatingStatus}
                            style={btnPrimary}>
                            {isUpdatingStatus ? "Saving Changes..." : "Save Status & Notify"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* ======================= 2. SERVICES CMS TAB ============================= */}
            {/* ========================================================================= */}
            {activeTab === "services" && (
              <div id="service-editor-anchor">
                {/* Header & Global Actions */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.75rem",
                  flexWrap: "wrap",
                  gap: "1rem",
                  backgroundColor: "var(--surface)",
                  padding: "1.5rem 1.75rem",
                  borderRadius: "18px",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow)"
                }}>
                  <div>
                    <h2 style={{ color: "var(--text)", fontSize: "1.45rem", fontWeight: 800, margin: 0 }}>
                      Services & Engineering Offerings CMS
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.25rem 0 0" }}>
                      Manage public service offerings, technology stacks, bullet capabilities, and featured badges.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={handleServiceReset}
                      style={{ ...btnSecondary, padding: "0.7rem 1.2rem", fontSize: "0.85rem" }}
                      title="Reset database to default offerings">
                      <RotateCcw size={15} /> Reset Default Services
                    </button>

                    {!showAddForm && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddForm(true)
                          setEditingId(null)
                          setServiceForm({ ...DEFAULT_SERVICE_FORM, order: services.length + 1 })
                        }}
                        style={btnPrimary}>
                        <Plus size={18} /> Add New Service Offering
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter and Search Bar for Services */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                  gap: "1rem",
                  backgroundColor: "var(--surface)",
                  padding: "1.1rem 1.4rem",
                  borderRadius: "16px",
                  border: "1px solid var(--border)"
                }}>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Filter:</span>
                    <button
                      onClick={() => setServiceCategoryFilter("all")}
                      style={{
                        padding: "0.4rem 0.85rem",
                        borderRadius: "20px",
                        border: "none",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        backgroundColor: serviceCategoryFilter === "all" ? "var(--primary)" : "var(--bg-alt)",
                        color: serviceCategoryFilter === "all" ? "var(--primary-contrast)" : "var(--text-muted)"
                      }}>
                      All ({services.length})
                    </button>
                    {CATEGORY_CHOICES.map(cat => {
                      const count = services.filter(s => s.category === cat.id).length
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setServiceCategoryFilter(cat.id)}
                          style={{
                            padding: "0.4rem 0.85rem",
                            borderRadius: "20px",
                            border: "none",
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            backgroundColor: serviceCategoryFilter === cat.id ? "var(--primary)" : "var(--bg-alt)",
                            color: serviceCategoryFilter === cat.id ? "var(--primary-contrast)" : "var(--text-muted)"
                          }}>
                          {cat.label} ({count})
                        </button>
                      )
                    })}
                  </div>

                  <div style={{ position: "relative", minWidth: "min(100%, 250px)", flex: 1 }}>
                    <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input
                      type="text"
                      placeholder="Search services, tech, capabilities..."
                      value={serviceSearchQuery}
                      onChange={(e) => setServiceSearchQuery(e.target.value)}
                      style={{ ...inputStyle, paddingLeft: "2.4rem", backgroundColor: "var(--input-bg)" }}
                    />
                  </div>
                </div>

                {/* Form Section */}
                {showAddForm && (
                  <form onSubmit={handleServiceSubmit} style={{
                    backgroundColor: "var(--surface)",
                    borderRadius: "clamp(14px, 4vw, 20px)",
                    padding: "clamp(1.25rem, 4vw, 2.25rem)",
                    marginBottom: "2.5rem",
                    boxShadow: "var(--shadow)",
                    border: "2px solid var(--primary)",
                    boxSizing: "border-box"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem", borderBottom: "1px solid var(--border)", paddingBottom: "1.25rem" }}>
                      <div>
                        <h3 style={{ margin: 0, color: "var(--primary)", fontSize: "1.4rem", fontWeight: 800 }}>
                          {editingId ? "Edit Service Offering" : "Add New Service Offering"}
                        </h3>
                        <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)", fontSize: "0.88rem" }}>
                          Fill out the comprehensive service profile to showcase on the services portal.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setShowAddForm(false); setEditingId(null); setServiceForm({ ...DEFAULT_SERVICE_FORM }); }}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "0.5rem" }}>
                        <X size={22} />
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
                      <div>
                        <label style={labelStyle}>Service Title *</label>
                        <input
                          style={inputStyle}
                          placeholder="e.g. Modern Full-Stack & MVP Engineering"
                          required
                          value={serviceForm.title}
                          onChange={(e) => handleChange("service", "title", e.target.value)}
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>Category</label>
                        <select
                          style={inputStyle}
                          value={serviceForm.category}
                          onChange={(e) => handleChange("service", "category", e.target.value)}>
                          {CATEGORY_CHOICES.map(c => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle}>Featured Badge / Highlight</label>
                        <input
                          style={inputStyle}
                          placeholder="e.g. Fast Turnaround Sprints"
                          value={serviceForm.highlight}
                          onChange={(e) => handleChange("service", "highlight", e.target.value)}
                        />
                        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                          {BADGE_PRESETS.slice(0, 4).map((bp, i) => (
                            <span
                              key={i}
                              onClick={() => handleChange("service", "highlight", bp)}
                              style={{ fontSize: "0.72rem", padding: "0.15rem 0.5rem", background: "var(--bg-alt)", color: "var(--primary)", borderRadius: "4px", cursor: "pointer", fontWeight: 600 }}>
                              + {bp}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>Display Order</label>
                        <input
                          type="number"
                          style={inputStyle}
                          value={serviceForm.order}
                          onChange={(e) => handleChange("service", "order", e.target.value)}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={labelStyle}>Punchy Tagline *</label>
                      <input
                        style={inputStyle}
                        placeholder="e.g. Scalable web & mobile apps built with modern full-stack velocity."
                        value={serviceForm.tagline}
                        onChange={(e) => handleChange("service", "tagline", e.target.value)}
                      />
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={labelStyle}>In-Depth Description *</label>
                      <textarea
                        style={{ ...inputStyle, minHeight: "110px", resize: "vertical" }}
                        placeholder="Detailed breakdown of the engineering methodology, stack capabilities, and business impact..."
                        required
                        value={serviceForm.description}
                        onChange={(e) => handleChange("service", "description", e.target.value)}
                      />
                    </div>

                    {/* Icon Selection */}
                    <div style={{ marginBottom: "1.5rem", padding: "1.35rem", background: "var(--bg-alt)", borderRadius: "14px", border: "1px solid var(--border)" }}>
                      <label style={{ ...labelStyle, marginBottom: "0.75rem" }}>Select Service Icon</label>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.65rem" }}>
                        {ICON_PICKER_OPTIONS.map(opt => {
                          const IconComp = opt.icon
                          const isSelected = serviceForm.icon === opt.id
                          return (
                            <button
                              type="button"
                              key={opt.id}
                              onClick={() => handleChange("service", "icon", opt.id)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.55rem",
                                padding: "0.65rem 0.85rem",
                                borderRadius: "10px",
                                border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border)",
                                backgroundColor: isSelected ? "var(--primary)" : "var(--surface)",
                                color: isSelected ? "var(--primary-contrast)" : "var(--text)",
                                cursor: "pointer",
                                fontSize: "0.82rem",
                                fontWeight: isSelected ? 700 : 600,
                                textAlign: "left",
                                transition: "all 0.2s ease"
                              }}>
                              <IconComp size={16} />
                              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{opt.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Capabilities Builder */}
                    <div style={{ marginBottom: "1.5rem", padding: "1.35rem", background: "var(--bg-alt)", borderRadius: "14px", border: "1px solid var(--border)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                        <label style={{ ...labelStyle, margin: 0 }}>Core Capabilities & Deliverables ({serviceForm.capabilities?.length || 0})</label>
                        <button
                          type="button"
                          onClick={() => setIsBulkCapMode(!isBulkCapMode)}
                          style={{ fontSize: "0.78rem", background: "none", border: "none", color: "var(--primary)", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>
                          {isBulkCapMode ? "Switch to single input" : "Bulk Paste Multi-line"}
                        </button>
                      </div>

                      {isBulkCapMode ? (
                        <div>
                          <textarea
                            style={{ ...inputStyle, minHeight: "110px" }}
                            placeholder="Paste multiple bullet points here, one per line..."
                            value={bulkCapInput}
                            onChange={(e) => setBulkCapInput(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={handleApplyBulkCapabilities}
                            style={{ ...btnPrimary, marginTop: "0.6rem", fontSize: "0.82rem", padding: "0.5rem 1rem" }}>
                            Add All Lines
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: "0.6rem", marginBottom: "0.75rem" }}>
                          <input
                            style={inputStyle}
                            placeholder="Add a new deliverable capability..."
                            value={newCapInput}
                            onChange={(e) => setNewCapInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCapability(); } }}
                          />
                          <button
                            type="button"
                            onClick={() => handleAddCapability()}
                            style={{ ...btnPrimary, padding: "0.75rem 1.35rem" }}>
                            <Plus size={16} /> Add
                          </button>
                        </div>
                      )}

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginTop: "0.85rem" }}>
                        {(serviceForm.capabilities || []).map((cap, idx) => (
                          <div key={idx} style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                            <span style={{ color: "var(--primary)", fontWeight: 800, fontSize: "0.85rem", width: "20px" }}>{idx + 1}.</span>
                            <input
                              style={{ ...inputStyle, padding: "0.55rem 0.85rem" }}
                              value={cap}
                              onChange={(e) => handleUpdateCapability(idx, e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteCapability(idx)}
                              style={{ background: "none", border: "none", color: "var(--danger)", cursor: "pointer", padding: "0.4rem" }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Chips */}
                    <div style={{ marginBottom: "1.5rem", padding: "1.35rem", background: "var(--bg-alt)", borderRadius: "14px", border: "1px solid var(--border)" }}>
                      <label style={labelStyle}>Technologies & Frameworks</label>
                      <div style={{ display: "flex", gap: "0.6rem", marginBottom: "0.75rem" }}>
                        <input
                          style={inputStyle}
                          placeholder="Add custom technology (e.g. FastAPI, Supabase)..."
                          value={newTechInput}
                          onChange={(e) => setNewTechInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTech(); } }}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddTech()}
                          style={{ ...btnPrimary, padding: "0.75rem 1.35rem" }}>
                          <Plus size={16} /> Add
                        </button>
                      </div>

                      <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "0.85rem" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", alignSelf: "center", marginRight: "0.25rem", fontWeight: 600 }}>Quick Presets:</span>
                        {TECH_PRESETS.map((t, idx) => (
                          <span
                            key={idx}
                            onClick={() => handleAddTech(t)}
                            style={{
                              padding: "0.2rem 0.55rem",
                              borderRadius: "6px",
                              backgroundColor: "var(--surface)",
                              border: "1px solid var(--border)",
                              fontSize: "0.75rem",
                              color: "var(--text)",
                              cursor: "pointer",
                              fontWeight: 600
                            }}>
                            + {t}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {(serviceForm.techStack || []).map((t, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: "0.35rem 0.75rem",
                              borderRadius: "20px",
                              backgroundColor: "var(--primary)",
                              color: "var(--primary-contrast)",
                              fontSize: "0.82rem",
                              fontWeight: 700,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.4rem"
                            }}>
                            {t}
                            <X size={14} style={{ cursor: "pointer" }} onClick={() => handleDeleteTech(t)} />
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        onClick={() => { setShowAddForm(false); setEditingId(null); setServiceForm({ ...DEFAULT_SERVICE_FORM }); }}
                        style={btnSecondary}>
                        Cancel
                      </button>
                      <button type="submit" style={btnPrimary}>
                        <Save size={16} /> {editingId ? "Save Changes" : "Publish Service"}
                      </button>
                    </div>
                  </form>
                )}

                {/* Service Cards Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
                  {filteredServices.map(svc => {
                    const IconComponent = resolveIcon(svc.icon)
                    const isExpanded = expandedServiceIds.includes(svc._id)
                    return (
                      <div key={svc._id} style={{
                        backgroundColor: "var(--surface)",
                        borderRadius: "18px",
                        border: "1px solid var(--border)",
                        padding: "clamp(1.1rem, 3vw, 1.75rem)",
                        boxShadow: "var(--shadow)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                      }}>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                            <div style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "12px",
                              backgroundColor: "rgba(126, 58, 65, 0.12)",
                              color: "var(--primary)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}>
                              <IconComponent size={24} />
                            </div>

                            <div style={{ display: "flex", gap: "0.4rem" }}>
                              <button
                                onClick={() => handleServiceEdit(svc)}
                                className="action-icon-btn"
                                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent-2)", padding: "0.4rem" }}
                                title="Edit Service">
                                <Edit3 size={18} />
                              </button>
                              <button
                                onClick={() => handleServiceDelete(svc._id)}
                                className="action-icon-btn"
                                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)", padding: "0.4rem" }}
                                title="Delete Service">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>

                          {svc.highlight && (
                            <span style={{
                              display: "inline-block",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "20px",
                              fontSize: "0.75rem",
                              fontWeight: 800,
                              backgroundColor: "var(--bg-alt)",
                              color: "var(--primary)",
                              marginBottom: "0.6rem"
                            }}>
                              {svc.highlight}
                            </span>
                          )}

                          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.4rem" }}>
                            {svc.title}
                          </h3>

                          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "0.85rem", fontStyle: "italic" }}>
                            {svc.tagline}
                          </p>

                          <p style={{ fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.55, marginBottom: "1.1rem" }}>
                            {svc.description}
                          </p>

                          {/* Capabilities List */}
                          <div style={{ marginBottom: "1rem" }}>
                            <div
                              onClick={() => handleToggleExpandService(svc._id)}
                              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", padding: "0.5rem 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: "0.5rem" }}>
                              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--primary)" }}>
                                {svc.capabilities?.length || 0} Core Capabilities & Deliverables
                              </span>
                              {isExpanded ? <ChevronUp size={16} color="var(--primary)" /> : <ChevronDown size={16} color="var(--primary)" />}
                            </div>

                            {isExpanded && (
                              <ul style={{ margin: "0.65rem 0", paddingLeft: "1.2rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                                {(svc.capabilities || []).map((c, i) => (
                                  <li key={i} style={{ marginBottom: "0.35rem", lineHeight: 1.45 }}>{c}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

                        {/* Tech Stack Footer */}
                        <div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.5rem" }}>
                            {(svc.techStack || []).map((tech, i) => (
                              <span key={i} style={{
                                padding: "0.2rem 0.55rem",
                                borderRadius: "6px",
                                backgroundColor: "var(--bg-alt)",
                                color: "var(--text-muted)",
                                fontSize: "0.75rem",
                                fontWeight: 600
                              }}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* ======================= 3. CAREERS & OPENINGS TAB ======================= */}
            {/* ========================================================================= */}
            {activeTab === "careers" && (
              <div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                  gap: "1rem",
                  backgroundColor: "var(--surface)",
                  padding: "1.5rem 1.75rem",
                  borderRadius: "18px",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow)"
                }}>
                  <div>
                    <h2 style={{ color: "var(--text)", fontSize: "1.45rem", fontWeight: 800, margin: 0 }}>
                      Career Openings & Fellowships
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.25rem 0 0" }}>
                      Manage open engineering, design, AI and internship listings visible on the Careers portal.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={handleCareerReset}
                      style={{ ...btnSecondary, padding: "0.7rem 1.2rem", fontSize: "0.85rem" }}
                      title="Reset database to default career openings">
                      <RotateCcw size={15} /> Reset Default Openings
                    </button>

                    {!showAddForm && (
                      <button onClick={() => { setShowAddForm(true); setEditingId(null); setCareerForm(DEFAULT_CAREER_FORM); }} style={btnPrimary}>
                        <Plus size={18} /> Add Opportunity
                      </button>
                    )}
                  </div>
                </div>

                {/* Careers Table */}
                <div style={{ background: "var(--surface)", borderRadius: "18px", overflowX: "auto", WebkitOverflowScrolling: "touch", boxShadow: "var(--shadow)", border: "1px solid var(--border)" }}>
                  <table style={{ width: "100%", minWidth: "680px", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "var(--bg-alt)", borderBottom: "1.5px solid var(--border)" }}>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Job Role</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Department</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Location</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Type</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Experience</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Apply Link</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "center", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {careers.length === 0 ? (
                        <tr><td colSpan={7} style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--text-muted)" }}>No career opportunities posted yet</td></tr>
                      ) : careers.map(c => (
                        <tr key={c._id} className="table-row-hover" style={{ borderTop: "1px solid var(--border)", transition: "background 0.2s" }}>
                          <td style={{ padding: "1.1rem 1.25rem", fontWeight: 700, color: "var(--primary)" }}>
                            <div>{c.title}</div>
                            {Array.isArray(c.requirements) && c.requirements.length > 0 && (
                              <div style={{ fontSize: "0.76rem", color: "var(--accent-2)", fontWeight: 500, marginTop: "0.25rem" }}>
                                {c.requirements.length} {c.requirements.length === 1 ? 'requirement' : 'requirements'}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: "1.1rem 1.25rem" }}>
                            <span style={{ padding: "0.25rem 0.65rem", borderRadius: "6px", backgroundColor: "var(--bg-alt)", fontSize: "0.78rem", fontWeight: 600, color: "var(--text)" }}>
                              {c.department || "General"}
                            </span>
                          </td>
                          <td style={{ padding: "1.1rem 1.25rem", color: "var(--text-muted)", fontSize: "0.88rem" }}>{c.location || "Remote"}</td>
                          <td style={{ padding: "1.1rem 1.25rem", color: "var(--text-muted)", fontSize: "0.88rem" }}>{c.type || "Full-time"}</td>
                          <td style={{ padding: "1.1rem 1.25rem", color: "var(--text-muted)", fontSize: "0.88rem" }}>{c.experience || "Any"}</td>
                          <td style={{ padding: "1.1rem 1.25rem" }}>
                            {c.applyLink ? (
                              <a href={c.applyLink} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-2)", display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                                <ExternalLink size={14} /> Open Form
                              </a>
                            ) : (
                              <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>Official Form</span>
                            )}
                          </td>
                          <td style={{ padding: "1.1rem 1.25rem", textAlign: "center" }}>
                            <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center" }}>
                              <button onClick={() => handleCareerEdit(c)} className="action-icon-btn" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent-2)" }} title="Edit"><Edit3 size={17} /></button>
                              <button onClick={() => handleCareerDelete(c._id)} className="action-icon-btn" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)" }} title="Delete"><Trash2 size={17} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add / Edit Career Form */}
                {showAddForm && (
                  <form onSubmit={handleCareerSubmit} style={{
                    background: "var(--surface)",
                    borderRadius: "clamp(14px, 4vw, 20px)",
                    padding: "clamp(1.25rem, 4vw, 2.25rem)",
                    marginTop: "2rem",
                    boxShadow: "var(--shadow)",
                    border: "2px solid var(--primary)",
                    boxSizing: "border-box"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                      <h3 style={{ margin: 0, color: "var(--primary)", fontSize: "1.35rem", fontWeight: 800 }}>
                        {editingId ? "Edit Career Opportunity" : "Create New Opportunity"}
                      </h3>
                      <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                        <X size={20} />
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
                      <div>
                        <label style={labelStyle}>Job Role Title *</label>
                        <input style={inputStyle} placeholder="e.g. Senior Full-Stack Engineer" required
                          value={careerForm.title} onChange={(e) => handleChange("career", "title", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Department</label>
                        <input style={inputStyle} placeholder="e.g. Engineering, AI & Automation, Design"
                          value={careerForm.department} onChange={(e) => handleChange("career", "department", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Location / Work Mode</label>
                        <input style={inputStyle} placeholder="e.g. Remote / Hybrid (Srinagar/Delhi)"
                          value={careerForm.location} onChange={(e) => handleChange("career", "location", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Employment Type</label>
                        <input style={inputStyle} placeholder="e.g. Full-time, Fellowship, Internship"
                          value={careerForm.type} onChange={(e) => handleChange("career", "type", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Experience Requirement</label>
                        <input style={inputStyle} placeholder="e.g. 1-3 years or Freshers welcome"
                          value={careerForm.experience} onChange={(e) => handleChange("career", "experience", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Application Link (Google Form / External)</label>
                        <input style={inputStyle} placeholder="https://docs.google.com/forms/..."
                          value={careerForm.applyLink} onChange={(e) => handleChange("career", "applyLink", e.target.value)} />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>Role Description & Key Responsibilities</label>
                        <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
                          placeholder="Outline candidate qualifications, tech requirements, and growth opportunities..."
                          value={careerForm.description} onChange={(e) => handleChange("career", "description", e.target.value)} />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>Key Requirements & Tech Stack (One per line)</label>
                        <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
                          placeholder="Proficiency in JavaScript/TypeScript, React or Next.js&#10;Understanding of relational databases (PostgreSQL/MySQL) or MongoDB&#10;Experience with Git version control and modern web architectures"
                          value={careerForm.requirements} onChange={(e) => handleChange("career", "requirements", e.target.value)} />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                      <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); }} style={btnSecondary}>
                        Cancel
                      </button>
                      <button type="submit" style={btnPrimary}>
                        <Save size={16} /> {editingId ? "Update Opportunity" : "Publish Opportunity"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* ======================= 4. PRESS RELEASES TAB =========================== */}
            {/* ========================================================================= */}
            {activeTab === "press-releases" && (
              <div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                  gap: "1rem",
                  backgroundColor: "var(--surface)",
                  padding: "1.5rem 1.75rem",
                  borderRadius: "18px",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow)"
                }}>
                  <div>
                    <h2 style={{ color: "var(--text)", fontSize: "1.45rem", fontWeight: 800, margin: 0 }}>
                      Press Releases & Corporate Disclosures
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.25rem 0 0" }}>
                      Publish official news, strategic announcements, and media statements.
                    </p>
                  </div>

                  {!showAddForm && (
                    <button onClick={() => { setShowAddForm(true); setEditingId(null); setPrForm(DEFAULT_PR_FORM); }} style={btnPrimary}>
                      <Plus size={18} /> Add Press Release
                    </button>
                  )}
                </div>

                <div style={{ background: "var(--surface)", borderRadius: "18px", overflowX: "auto", WebkitOverflowScrolling: "touch", boxShadow: "var(--shadow)", border: "1px solid var(--border)" }}>
                  <table style={{ width: "100%", minWidth: "680px", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "var(--bg-alt)", borderBottom: "1.5px solid var(--border)" }}>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Title</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Date</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Category / Type</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Source</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Fiscal Year</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Link</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "center", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pressReleases.length === 0 ? (
                        <tr><td colSpan={7} style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--text-muted)" }}>No press releases published yet</td></tr>
                      ) : pressReleases.map(pr => (
                        <tr key={pr._id} className="table-row-hover" style={{ borderTop: "1px solid var(--border)", transition: "background 0.2s" }}>
                          <td style={{ padding: "1.1rem 1.25rem", fontWeight: 700, color: "var(--primary)" }}>{pr.title}</td>
                          <td style={{ padding: "1.1rem 1.25rem", color: "var(--text-muted)", fontSize: "0.88rem" }}>{pr.date}</td>
                          <td style={{ padding: "1.1rem 1.25rem" }}><span style={{ padding: "0.25rem 0.65rem", borderRadius: "6px", backgroundColor: "var(--bg-alt)", fontSize: "0.78rem", fontWeight: 600, color: "var(--text)" }}>{pr.type}</span></td>
                          <td style={{ padding: "1.1rem 1.25rem", color: "var(--text-muted)", fontSize: "0.88rem" }}>{pr.source}</td>
                          <td style={{ padding: "1.1rem 1.25rem", color: "var(--text-muted)", fontSize: "0.88rem" }}>{pr.year}</td>
                          <td style={{ padding: "1.1rem 1.25rem" }}>
                            {pr.linkedinUrl && (
                              <a href={pr.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-2)", display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                                <ExternalLink size={14} /> View
                              </a>
                            )}
                          </td>
                          <td style={{ padding: "1.1rem 1.25rem", textAlign: "center" }}>
                            <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center" }}>
                              <button onClick={() => handlePrEdit(pr)} className="action-icon-btn" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent-2)" }} title="Edit"><Edit3 size={17} /></button>
                              <button onClick={() => handlePrDelete(pr._id)} className="action-icon-btn" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)" }} title="Delete"><Trash2 size={17} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {showAddForm && (
                  <form onSubmit={handlePrSubmit} style={{
                    background: "var(--surface)",
                    borderRadius: "clamp(14px, 4vw, 20px)",
                    padding: "clamp(1.25rem, 4vw, 2.25rem)",
                    marginTop: "2rem",
                    boxShadow: "var(--shadow)",
                    border: "2px solid var(--primary)",
                    boxSizing: "border-box"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                      <h3 style={{ margin: 0, color: "var(--primary)", fontSize: "1.35rem", fontWeight: 800 }}>
                        {editingId ? "Edit Press Release" : "Add Press Release"}
                      </h3>
                      <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                        <X size={20} />
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
                      <div>
                        <label style={labelStyle}>Announcement Title *</label>
                        <input style={inputStyle} placeholder="e.g. Zetawa Dark Announces Next-Gen AI Solutions" required
                          value={prForm.title} onChange={(e) => handleChange("pr", "title", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Publication Date *</label>
                        <input style={inputStyle} placeholder="e.g. Jan 15, 2025" required
                          value={prForm.date} onChange={(e) => handleChange("pr", "date", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Category / Type</label>
                        <input style={inputStyle} placeholder="Official Announcement, Technology, Partnership"
                          value={prForm.type} onChange={(e) => handleChange("pr", "type", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Source Publication</label>
                        <input style={inputStyle} placeholder="e.g. LinkedIn, Medium, Press Center"
                          value={prForm.source} onChange={(e) => handleChange("pr", "source", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>LinkedIn / Direct Link URL</label>
                        <input style={inputStyle} placeholder="https://www.linkedin.com/feed/update/..."
                          value={prForm.linkedinUrl} onChange={(e) => handleChange("pr", "linkedinUrl", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Fiscal Period</label>
                        <input style={inputStyle} placeholder="e.g. FY2025"
                          value={prForm.year} onChange={(e) => handleChange("pr", "year", e.target.value)} />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>Full Announcement / Abstract</label>
                        <textarea style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }}
                          placeholder="Enter summary or full transcript of the press announcement..."
                          value={prForm.content} onChange={(e) => handleChange("pr", "content", e.target.value)} />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                      <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); }} style={btnSecondary}>
                        Cancel
                      </button>
                      <button type="submit" style={btnPrimary}>
                        <Save size={16} /> {editingId ? "Update Release" : "Publish Release"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* ======================= 5. CERTIFICATES TAB ============================= */}
            {/* ========================================================================= */}
            {activeTab === "certificates" && (
              <div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                  gap: "1rem",
                  backgroundColor: "var(--surface)",
                  padding: "1.5rem 1.75rem",
                  borderRadius: "18px",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow)"
                }}>
                  <div>
                    <h2 style={{ color: "var(--text)", fontSize: "1.45rem", fontWeight: 800, margin: 0 }}>
                      Certificate & Credential Registry
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.25rem 0 0" }}>
                      Issue, track, and validate official certificates issued by Zetawa Dark Private Limited.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                    <button
                      onClick={handleSyncCloudinary}
                      disabled={syncingCloudinary}
                      style={{
                        ...btnSecondary,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.45rem",
                        backgroundColor: "var(--bg-alt)",
                        color: "var(--primary)",
                        borderColor: "var(--border)",
                        fontWeight: 700
                      }}
                      title="Sync all local staged certificates directly to Cloudinary"
                    >
                      <RefreshCw size={16} className={syncingCloudinary ? "spin-animation" : ""} />
                      {syncingCloudinary ? "Syncing..." : "Sync to Cloudinary"}
                    </button>
                    {!showAddForm && (
                      <button onClick={() => { setShowAddForm(true); setEditingId(null); setCertForm({ certificateNumber: "", internName: "", course: "", issueDate: "", completionDate: "", duration: "", certificateFile: "" }); setCertFile(null); }} style={btnPrimary}>
                        <Plus size={18} /> Issue Certificate
                      </button>
                    )}
                  </div>
                </div>

                <div style={{ background: "var(--surface)", borderRadius: "18px", overflowX: "auto", WebkitOverflowScrolling: "touch", boxShadow: "var(--shadow)", border: "1px solid var(--border)" }}>
                  <table style={{ width: "100%", minWidth: "720px", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "var(--bg-alt)", borderBottom: "1.5px solid var(--border)" }}>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Certificate No.</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Recipient / Intern</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Domain / Course</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Issue Date</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Duration</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Cloudinary Document</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "center", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificates.length === 0 ? (
                        <tr><td colSpan={7} style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--text-muted)" }}>No certificates issued yet</td></tr>
                      ) : certificates.map(c => (
                        <tr key={c._id} className="table-row-hover" style={{ borderTop: "1px solid var(--border)", transition: "background 0.2s" }}>
                          <td style={{ padding: "1.1rem 1.25rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <span style={{ fontWeight: 800, color: "var(--primary)", fontFamily: "monospace", fontSize: "0.95rem" }}>{c.certificateNumber}</span>
                              <button
                                onClick={() => handleCopy(c.certificateNumber, c._id)}
                                style={{ background: "none", border: "none", cursor: "pointer", color: copiedId === c._id ? "var(--success)" : "var(--text-muted)", padding: "0.2rem" }}
                                title="Copy ID">
                                {copiedId === c._id ? <CheckCheck size={14} /> : <Copy size={14} />}
                              </button>
                            </div>
                          </td>
                          <td style={{ padding: "1.1rem 1.25rem", fontWeight: 700, color: "var(--text)" }}>{c.internName}</td>
                          <td style={{ padding: "1.1rem 1.25rem", color: "var(--text-muted)", fontSize: "0.88rem" }}>{c.course}</td>
                          <td style={{ padding: "1.1rem 1.25rem", color: "var(--text-muted)", fontSize: "0.88rem" }}>{c.issueDate}</td>
                          <td style={{ padding: "1.1rem 1.25rem", color: "var(--text-muted)", fontSize: "0.88rem" }}>{c.duration || "N/A"}</td>
                          <td style={{ padding: "1.1rem 1.25rem" }}>
                            {c.certificateFile ? (
                              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                                <a
                                  href={c.certificateFile.startsWith('http') ? c.certificateFile : `http://localhost:4000/${c.certificateFile}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.35rem",
                                    padding: "0.35rem 0.75rem",
                                    borderRadius: "8px",
                                    backgroundColor: c.certificateFile.startsWith('http') ? "rgba(16, 185, 129, 0.12)" : "var(--bg-alt)",
                                    color: c.certificateFile.startsWith('http') ? "var(--success)" : "var(--primary)",
                                    border: c.certificateFile.startsWith('http') ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid var(--border)",
                                    fontSize: "0.82rem",
                                    fontWeight: 700,
                                    textDecoration: "none"
                                  }}
                                  title={c.certificateFile}
                                >
                                  <ExternalLink size={13} />
                                  {c.certificateFile.startsWith('http') ? "Cloudinary Link" : "View Local"}
                                </a>
                                {c.certificateFile.startsWith('http') && (
                                  <button
                                    onClick={() => handleCopy(c.certificateFile, `link-${c._id}`)}
                                    style={{ background: "none", border: "none", cursor: "pointer", color: copiedId === `link-${c._id}` ? "var(--success)" : "var(--text-muted)", padding: "0.2rem" }}
                                    title="Copy Direct Cloudinary Link">
                                    {copiedId === `link-${c._id}` ? <CheckCheck size={14} /> : <Copy size={14} />}
                                  </button>
                                )}
                              </div>
                            ) : (
                              <span style={{ color: "var(--text-muted)", fontSize: "0.82rem", fontStyle: "italic" }}>No document</span>
                            )}
                          </td>
                          <td style={{ padding: "1.1rem 1.25rem", textAlign: "center" }}>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                              <button
                                onClick={() => {
                                  setEditingId(c._id)
                                  setCertForm({
                                    certificateNumber: c.certificateNumber || "",
                                    internName: c.internName || "",
                                    course: c.course || "",
                                    issueDate: c.issueDate || "",
                                    completionDate: c.completionDate || "",
                                    duration: c.duration || "",
                                    certificateFile: c.certificateFile || "",
                                  })
                                  setShowAddForm(true)
                                }}
                                className="action-icon-btn"
                                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent-2)" }}
                                title="Edit Certificate">
                                <Edit3 size={17} />
                              </button>
                              <button onClick={() => handleCertDelete(c._id)} className="action-icon-btn" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)" }} title="Delete">
                                <Trash2 size={17} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {showAddForm && (
                  <form onSubmit={handleCertSubmit} style={{
                    background: "var(--surface)",
                    borderRadius: "clamp(14px, 4vw, 20px)",
                    padding: "clamp(1.25rem, 4vw, 2.25rem)",
                    marginTop: "2rem",
                    boxShadow: "var(--shadow)",
                    border: "2px solid var(--primary)",
                    boxSizing: "border-box"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                      <h3 style={{ margin: 0, color: "var(--primary)", fontSize: "1.35rem", fontWeight: 800 }}>
                        {editingId ? "Edit Certificate Credential" : "Issue Official Certificate"}
                      </h3>
                      <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                        <X size={20} />
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
                      <div>
                        <label style={labelStyle}>Unique Certificate ID *</label>
                        <input style={inputStyle} placeholder="e.g. ZD-2025-ENG-088" required
                          value={certForm.certificateNumber} onChange={(e) => handleChange("cert", "certificateNumber", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Recipient Full Name *</label>
                        <input style={inputStyle} placeholder="e.g. John Doe" required
                          value={certForm.internName} onChange={(e) => handleChange("cert", "internName", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Course / Domain Track *</label>
                        <input style={inputStyle} placeholder="e.g. Autonomous AI Systems Engineering" required
                          value={certForm.course} onChange={(e) => handleChange("cert", "course", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Issue Date</label>
                        <input style={inputStyle} placeholder="e.g. Feb 01, 2025"
                          value={certForm.issueDate} onChange={(e) => handleChange("cert", "issueDate", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Completion Date</label>
                        <input style={inputStyle} placeholder="e.g. Jan 30, 2025"
                          value={certForm.completionDate} onChange={(e) => handleChange("cert", "completionDate", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Tenure / Duration</label>
                        <input style={inputStyle} placeholder="e.g. 3 Months Fellowship"
                          value={certForm.duration} onChange={(e) => handleChange("cert", "duration", e.target.value)} />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>Direct Cloudinary Link (Paste Cloudinary URL)</label>
                        <input style={inputStyle} placeholder="https://res.cloudinary.com/..."
                          value={certForm.certificateFile || ""} onChange={(e) => handleChange("cert", "certificateFile", e.target.value)} />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>OR Upload File (Staged on local disk, uploaded to Cloudinary, then deleted locally)</label>
                        <input type="file" onChange={(e) => setCertFile(e.target.files[0])} style={{ ...inputStyle, padding: "0.55rem" }} />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                      <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); }} style={btnSecondary}>
                        Cancel
                      </button>
                      <button type="submit" style={btnPrimary}>
                        <Save size={16} /> Save & Register Credential
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* ======================= 6. LATEST UPDATES TAB =========================== */}
            {/* ========================================================================= */}
            {activeTab === "latest-updates" && (
              <div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                  gap: "1rem",
                  backgroundColor: "var(--surface)",
                  padding: "1.5rem 1.75rem",
                  borderRadius: "18px",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow)"
                }}>
                  <div>
                    <h2 style={{ color: "var(--text)", fontSize: "1.45rem", fontWeight: 800, margin: 0 }}>
                      Latest Announcements & Notices
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.25rem 0 0" }}>
                      Manage quick notifications, service advisories, and system updates.
                    </p>
                  </div>

                  {!showAddForm && (
                    <button onClick={() => { setShowAddForm(true); setEditingId(null); setLuForm(DEFAULT_LU_FORM); }} style={btnPrimary}>
                      <Plus size={18} /> Add Notice
                    </button>
                  )}
                </div>

                <div style={{ background: "var(--surface)", borderRadius: "18px", overflowX: "auto", WebkitOverflowScrolling: "touch", boxShadow: "var(--shadow)", border: "1px solid var(--border)" }}>
                  <table style={{ width: "100%", minWidth: "600px", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "var(--bg-alt)", borderBottom: "1.5px solid var(--border)" }}>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Notice Title</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Date</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "left", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Description</th>
                        <th style={{ padding: "1.1rem 1.25rem", textAlign: "center", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {latestUpdates.length === 0 ? (
                        <tr><td colSpan={4} style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--text-muted)" }}>No notices posted yet</td></tr>
                      ) : latestUpdates.map(lu => (
                        <tr key={lu._id} className="table-row-hover" style={{ borderTop: "1px solid var(--border)", transition: "background 0.2s" }}>
                          <td style={{ padding: "1.1rem 1.25rem", fontWeight: 700, color: "var(--primary)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <span>{lu.title}</span>
                              {lu.file && (
                                <a
                                  href={lu.file.startsWith('http') ? lu.file : `/${lu.file}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: "var(--primary)", display: "inline-flex", alignItems: "center" }}
                                  title="View Attachment">
                                  <ExternalLink size={14} />
                                </a>
                              )}
                            </div>
                          </td>

                          <td style={{ padding: "1.1rem 1.25rem", color: "var(--text-muted)", fontSize: "0.88rem" }}>{lu.date}</td>
                          <td style={{ padding: "1.1rem 1.25rem", color: "var(--text-muted)", fontSize: "0.88rem", maxWidth: "420px" }}>{lu.description}</td>
                          <td style={{ padding: "1.1rem 1.25rem", textAlign: "center" }}>
                            <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center" }}>
                              <button onClick={() => handleLuEdit(lu)} className="action-icon-btn" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent-2)" }} title="Edit"><Edit3 size={17} /></button>
                              <button onClick={() => handleLuDelete(lu._id)} className="action-icon-btn" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)" }} title="Delete"><Trash2 size={17} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {showAddForm && (
                  <form onSubmit={handleLuSubmit} style={{
                    background: "var(--surface)",
                    borderRadius: "clamp(14px, 4vw, 20px)",
                    padding: "clamp(1.25rem, 4vw, 2.25rem)",
                    marginTop: "2rem",
                    boxShadow: "var(--shadow)",
                    border: "2px solid var(--primary)",
                    boxSizing: "border-box"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                      <h3 style={{ margin: 0, color: "var(--primary)", fontSize: "1.35rem", fontWeight: 800 }}>
                        {editingId ? "Edit Notice" : "Post Notice"}
                      </h3>
                      <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                        <X size={20} />
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
                      <div>
                        <label style={labelStyle}>Notice Title *</label>
                        <input style={inputStyle} placeholder="e.g. Scheduled Infrastructure Maintenance" required
                          value={luForm.title} onChange={(e) => handleChange("lu", "title", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Notice Date *</label>
                        <input style={inputStyle} placeholder="e.g. Oct 24, 2025" required
                          value={luForm.date} onChange={(e) => handleChange("lu", "date", e.target.value)} />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>Notice Body *</label>
                        <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
                          placeholder="Provide all relevant details and links..." required
                          value={luForm.description} onChange={(e) => handleChange("lu", "description", e.target.value)} />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>Optional Attachment</label>
                        <input type="file" onChange={(e) => setLuFile(e.target.files[0])} style={{ ...inputStyle, padding: "0.55rem" }} />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                      <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); }} style={btnSecondary}>
                        Cancel
                      </button>
                      <button type="submit" style={btnPrimary}>
                        <Save size={16} /> {editingId ? "Update Notice" : "Broadcast Notice"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </>
        )}

      </div>
      <Footer />
    </div>
  )
}

export default AdminDashboard;
