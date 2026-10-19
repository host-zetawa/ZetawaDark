# 🌌 Zetawa Dark — Enterprise Platform & Engineering CMS

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-19.1.0-blue.svg)](https://react.dev/)
[![Express Version](https://img.shields.io/badge/express-5.2.1-lightgrey.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/database-MongoDB%20Atlas-forestgreen.svg)](https://www.mongodb.com/atlas)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](#license)

**Zetawa Dark** is the flagship web application and administrative content management ecosystem for **Zetawa**. Built with a sleek, dark-themed glassmorphic aesthetic, the platform showcases high-performance software engineering services, custom AI/ML capabilities, team certifications, career opportunities, press releases, client satisfaction reviews, and an interactive project inquiry workflow.

It includes a comprehensive, role-protected **Admin Portal** (`/#/admin`) that empowers non-technical stakeholders to manage job openings, services, client inquiries, certificates, and media releases in real time with zero code deployment required.

---

## 📑 Table of Contents

- [🌌 Zetawa Dark — Enterprise Platform & Engineering CMS](#-zetawa-dark--enterprise-platform--engineering-cms)
  - [📑 Table of Contents](#-table-of-contents)
  - [🏛️ High-Level System Architecture](#️-high-level-system-architecture)
  - [🚀 Quick Start (Local Development)](#-quick-start-local-development)
    - [Prerequisites](#prerequisites)
    - [1. Clone and Install Dependencies](#1-clone-and-install-dependencies)
    - [2. Configure Environment Variables](#2-configure-environment-variables)
    - [3. Start Development Servers](#3-start-development-servers)
  - [📂 Comprehensive Repository Structure](#-comprehensive-repository-structure)
    - [Root Directory (`/`)](#root-directory-)
    - [Frontend Application (`/zetawa-main`)](#frontend-application-zetawa-main)
    - [Backend Application (`/auth-backend`)](#backend-application-auth-backend)
  - [🔐 Authentication & Role-Based Access Control (RBAC)](#-authentication--role-based-access-control-rbac)
    - [How Authentication Works](#how-authentication-works)
    - [Admin Access & Privileges](#admin-access--privileges)
  - [⚙️ Environment Variables Reference](#️-environment-variables-reference)
    - [Backend Variables (`auth-backend/.env`)](#backend-variables-auth-backendenv)
    - [Frontend Variables (`zetawa-main`)](#frontend-variables-zetawa-main)
  - [🌐 Production Deployment Architecture](#-production-deployment-architecture)
    - [1. Frontend (Vercel)](#1-frontend-vercel)
    - [2. Backend (Render)](#2-backend-render)
    - [3. Database (MongoDB Atlas)](#3-database-mongodb-atlas)
  - [🛠️ Developer Guide: How to Extend the Codebase](#️-developer-guide-how-to-extend-the-codebase)
    - [Adding a New Public Page](#adding-a-new-public-page)
    - [Adding a New Backend Feature / API Endpoint](#adding-a-new-backend-feature--api-endpoint)
    - [Modifying or Adding Default CMS Content](#modifying-or-adding-default-cms-content)
  - [📜 Available NPM Scripts](#-available-npm-scripts)
  - [🔒 Security & Best Practices](#-security--best-practices)
  - [🤝 Contributing \& Team Workflow](#-contributing--team-workflow)

---

## 🏛️ High-Level System Architecture

```mermaid
graph TD
    Client[Browser / User] -->|HTTPS| Frontend[React 19 + Vite Frontend SPA<br/>Vercel: zetawa-dark.vercel.app]
    Client -->|Direct Admin Actions| Frontend
    
    subgraph Routing & Reverse Proxy
        Frontend -->|'/api/*' Rewrites via vercel.json| Backend[Express 5 Unified API<br/>Render: zetawadark.onrender.com]
        Frontend -.->|Local Proxy via vite.config.js| Backend
    end

    subgraph Data & Storage Cloud
        Backend -->|Mongoose ODM| Atlas[(MongoDB Atlas<br/>Multi-Tenant Clusters)]
        Backend -->|Image / PDF Storage| Cloudinary[Cloudinary CDN]
        Backend -->|OTP & Status Emails| SMTP[Nodemailer / Gmail SMTP]
    end
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher (recommended: `v20` or `v24` LTS)
- **npm**: `v9.0.0` or higher
- **MongoDB Atlas** account or a local MongoDB instance running at `mongodb://localhost:27017`

---

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone git@github.com:host-zetawa/ZetawaDark.git
cd ZetawaDark

# 1. Install root workspace dependencies
npm install

# 2. Install backend dependencies
cd auth-backend && npm install && cd ..

# 3. Install frontend dependencies
cd zetawa-main && npm install && cd ..
```

---

### 2. Configure Environment Variables

Create the backend environment file:
```bash
cp auth-backend/.env.example auth-backend/.env
# or edit auth-backend/.env directly with your credentials
```
*(See the [Environment Variables Reference](#️-environment-variables-reference) section below for required keys).*

---

### 3. Start Development Servers

You can launch both the backend API and frontend Vite server concurrently with a single command from the root directory:

```bash
# Run both Backend (:4000) and Frontend (:5173) together
npm run dev
```

Alternatively, you can run them in separate terminals:

```bash
# Terminal 1 - Backend API (runs nodemon on port 4000)
cd auth-backend
npm run server

# Terminal 2 - Frontend SPA (runs Vite on port 5173)
cd zetawa-main
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 📂 Comprehensive Repository Structure

```
Zetawa/
├── package.json               # Root workspace scripts (concurrent runner)
├── netlify.toml               # Optional Netlify build configuration
├── README.md                  # Master documentation (this file)
│
├── auth-backend/              # Express.js REST API server
│   ├── config/
│   │   └── mongodb.js         # MongoDB connection with sanitization & URL encoding
│   ├── controllers/           # Route handler logic & business rules
│   │   ├── authControllers.js         # Login, register, OTP verification, password resets
│   │   ├── careerControllers.js       # Career listings CMS & auto-seeding defaults
│   │   ├── certificateControllers.js  # Certificate issuance & Cloudinary sync
│   │   ├── hireControllers.js         # Client project inquiry submission & lifecycle
│   │   ├── latestUpdateControllers.js # Press & banner announcement controllers
│   │   ├── pressReleaseControllers.js # Media releases & download management
│   │   ├── serviceControllers.js      # Services CMS & auto-seeding defaults
│   │   └── userControllers.js         # User profile retrieval & modifications
│   ├── middleware/
│   │   ├── adminAuth.js       # Verifies JWT and enforces admin privilege
│   │   └── userAuth.js        # Verifies JWT for authenticated user sessions
│   ├── models/                # Mongoose database schemas
│   │   ├── careerModel.js     # Job openings schema (requirements, applyLink, type)
│   │   ├── certificateModel.js# Issued student/fellow certificates
│   │   ├── HireForm.js        # Client hiring inquiry submission model
│   │   ├── latestUpdateModel.js# Announcements & updates
│   │   ├── pressReleaseModel.js# Company press releases
│   │   ├── Review.js          # Client reviews & testimonials
│   │   ├── serviceModel.js    # Service offerings, capabilities, tech stack
│   │   └── userModel.js       # User accounts, hashed passwords, verification flags
│   ├── routes/                # Express API endpoint declarations
│   ├── uploads/               # Temporary/local file uploads directory
│   ├── server.js              # Express app bootstrap, CORS, middlewares, route mounts
│   └── package.json           # Backend dependencies and scripts
│
└── zetawa-main/               # React 19 + Vite frontend Single Page Application (SPA)
    ├── public/                # Static assets, favicons, logos
    ├── src/
    │   ├── assets/            # Component image assets, banners, icons
    │   ├── context/
    │   │   └── AppContext.jsx # Global auth, user session, and modal state provider
    │   ├── components/        # Reusable UI views and layout components
    │   │   ├── MainPage.jsx           # Landing page (hero, tech stack, metrics, CTA)
    │   │   ├── Nav.jsx                # Responsive header bar with auth modals
    │   │   ├── Footer.jsx             # Site footer with social links and company info
    │   │   ├── AboutUs.jsx            # Company mission, leadership, core pillars
    │   │   ├── Services.jsx           # Engineering services grid & capabilities
    │   │   ├── Careers.jsx            # Job openings & fellowship listings
    │   │   ├── Certifications.jsx     # Certificate verification & student showcase
    │   │   ├── Events.jsx             # Hackathons, seminars, community events
    │   │   ├── PressRelease.jsx       # Media releases & official press kit
    │   │   ├── Hireforms.jsx          # Client project inquiry intake wizard
    │   │   ├── ClientSatisfaction.jsx # Client ratings & feedback submissions
    │   │   ├── AdminDashboard.jsx     # Full-featured CMS & admin control room
    │   │   ├── AdminRoute.jsx         # Protected route wrapper for admins
    │   │   ├── ProtectedRoute.jsx     # Protected route wrapper for users
    │   │   ├── AuthModal.jsx          # Modal for in-page login/register triggers
    │   │   ├── Background3D.jsx       # Three.js interactive canvas particle network
    │   │   ├── UserProfile.jsx        # Account details & session information
    │   │   └── PrivacyPolicy.jsx      # Legal terms and privacy documentation
    │   ├── App.jsx            # React Router tree & global scroll-to-top behavior
    │   ├── index.css          # CSS design tokens, dark palette, animations, resets
    │   └── main.jsx           # React DOM root entrypoint
    ├── vercel.json            # Vercel deployment config with /api/* reverse-proxy
    ├── vite.config.js         # Vite configuration with local API proxy
    └── package.json           # Frontend dependencies and build scripts
```

---

### Detailed File Descriptions

#### Root Directory (`/`)
- [`package.json`](file:///Users/vansh/Documents/Zetawa/package.json): Root orchestration manifest. Defines the `npm run dev` script using `concurrently` to run both frontend and backend concurrently without requiring two separate terminal windows.
- [`netlify.toml`](file:///Users/vansh/Documents/Zetawa/netlify.toml): Configures build output directory (`zetawa-main/dist`) and redirect rules in case the project is hosted on Netlify.

#### Frontend Application (`/zetawa-main`)
- [`src/App.jsx`](file:///Users/vansh/Documents/Zetawa/zetawa-main/src/App.jsx): The master React Router routing manifest. Uses `HashRouter` (`/#/...`) to guarantee reliable routing across static edge CDNs without server-side rewrite mismatches. Includes automated `ScrollToTop` on route transitions.
- [`src/context/AppContext.jsx`](file:///Users/vansh/Documents/Zetawa/zetawa-main/src/context/AppContext.jsx): The centralized React Context handling:
  - User authentication state (`isAuth`, `user`, `isAdmin`).
  - Axios defaults (`withCredentials = true` for automatic HttpOnly cookie transmission).
  - Auth actions (`login`, `register`, `logout`, `sendVerifyOtp`, `verifyEmail`, `resetPassword`).
  - Automatic session hydration on page refresh from `/api/user/data`.
- [`src/components/AdminDashboard.jsx`](file:///Users/vansh/Documents/Zetawa/zetawa-main/src/components/AdminDashboard.jsx): The administrative control panel. Contains tabs for:
  1. **Client Project Inquiries**: Status progression (*Pending Review* ➔ *Under Discussion* ➔ *Proposal Sent* ➔ *In Progress* ➔ *Completed*), timeline estimation, internal admin notes.
  2. **Services & Engineering CMS**: Full CRUD for public services, tech stacks, order sorting, and "Reset to Defaults".
  3. **Careers & Fellowships CMS**: Full CRUD for job openings, requirement bullets, apply links, and "Reset Default Openings".
  4. **Press Releases CMS**: Creation, editing, and deletion of media publications.
  5. **Certifications CMS**: Certificate uploads, student validation, and Cloudinary synchronization.
  6. **Latest Announcements & Banners**: Site-wide announcements management.
- [`src/components/Background3D.jsx`](file:///Users/vansh/Documents/Zetawa/zetawa-main/src/components/Background3D.jsx): High-performance Three.js WebGL canvas displaying a glowing, interactive dark-themed particle constellation that reacts to user scroll and cursor movements.
- [`src/index.css`](file:///Users/vansh/Documents/Zetawa/zetawa-main/src/index.css): The core CSS design system. Defines CSS custom properties (`--bg-primary`, `--accent`, `--surface`, `--border`), responsive typography, button states, and custom scrollbars.
- [`vercel.json`](file:///Users/vansh/Documents/Zetawa/zetawa-main/vercel.json): Configures production reverse-proxy rewrites. Forwards all `/api/:path*` requests directly to the live Render backend (`https://zetawadark.onrender.com/api/:path*`), eliminating CORS issues and keeping cookies first-party.

#### Backend Application (`/auth-backend`)
- [`server.js`](file:///Users/vansh/Documents/Zetawa/auth-backend/server.js): Express server initialization. Enforces JSON parsing, URL encoding, cookie parsing, CORS policies, static uploads serving, and feature route mounting.
- [`config/mongodb.js`](file:///Users/vansh/Documents/Zetawa/auth-backend/config/mongodb.js): Enterprise-grade MongoDB connection module. Automatically sanitizes and URL-encodes special characters in database passwords to eliminate `MongoParseError` crashes during deployment.
- [`middleware/adminAuth.js`](file:///Users/vansh/Documents/Zetawa/auth-backend/middleware/adminAuth.js): Intercepts requests to administrative endpoints. Decodes the JWT from either HttpOnly cookies or the `Authorization: Bearer <token>` header, verifies the user in MongoDB, and ensures they have `isAdmin: true` or match the master `ADMIN_EMAIL`.
- [`controllers/careerControllers.js`](file:///Users/vansh/Documents/Zetawa/auth-backend/controllers/careerControllers.js): Manages career listings. If the database is empty, it automatically seeds 6 predefined modern roles into MongoDB Atlas on first query. Also exposes `POST /api/careers/reset-defaults`.
- [`controllers/serviceControllers.js`](file:///Users/vansh/Documents/Zetawa/auth-backend/controllers/serviceControllers.js): Manages engineering service offerings. Auto-seeds default services when empty and provides `POST /api/services/reset-defaults`.

---

## 🔐 Authentication & Role-Based Access Control (RBAC)

### How Authentication Works

1. **Registration & Verification**:
   - A user signs up via `/register` or the interactive [`AuthModal.jsx`](file:///Users/vansh/Documents/Zetawa/zetawa-main/src/components/AuthModal.jsx).
   - The backend hashes the password using `bcryptjs` and generates a 6-digit numeric OTP with an expiration timestamp.
   - Nodemailer delivers the OTP to the user's email.
   - Once verified, the account is marked `isAccountVerified: true`.

2. **Login & Session Token**:
   - Upon successful credentials verification, the server generates a signed JWT token containing `{ id: user._id }`.
   - The token is attached as an **HttpOnly, Secure cookie** (`token`) and also returned in the JSON payload for clients using bearer headers.

3. **Client Session Hydration**:
   - On initial load, [`AppContext.jsx`](file:///Users/vansh/Documents/Zetawa/zetawa-main/src/context/AppContext.jsx) sends a request to `GET /api/user/data`.
   - If a valid session cookie exists, the user's name, email, and admin status are populated into state.

### Admin Access & Privileges

Admin access is guarded at both the frontend and backend levels:
- **Backend Guard**: [`adminAuth.js`](file:///Users/vansh/Documents/Zetawa/auth-backend/middleware/adminAuth.js) checks if `user.isAdmin === true` or `user.email === 'vansh100101102@gmail.com'`. If not, it rejects the request with HTTP 403 / JSON `{ success: false, message: "Admin access only" }`.
- **Frontend Guard**: [`AdminRoute.jsx`](file:///Users/vansh/Documents/Zetawa/zetawa-main/src/components/AdminRoute.jsx) wraps the `/#/admin` route. Non-admin users are automatically redirected to the home page with an unauthorized notification.

---

## ⚙️ Environment Variables Reference

### Backend Variables (`auth-backend/.env`)

Create a `.env` file in the `auth-backend/` directory with the following keys:

| Variable | Type | Description | Example / Default |
| :--- | :--- | :--- | :--- |
| `PORT` | Number | Port on which the Express server listens | `4000` |
| `MONGODB_URL` | String | MongoDB Atlas connection string URI | `mongodb+srv://<user>:<password>@cluster0.mongodb.net/zetawa` |
| `JWT_SECRET` | String | Cryptographic key used to sign and verify JWT tokens | *(32+ character random secret)* |
| `NODE_ENV` | String | Environment mode (`development` or `production`) | `development` |
| `EMAIL` | String | SMTP email sender for OTP and notifications | `your-service@gmail.com` |
| `PASSWORD` | String | SMTP App Password (for Gmail: 16-character App Password) | `abcd efgh ijkl mnop` |
| `ADMIN_EMAIL` | String | Master administrative email with root privileges | `vansh100101102@gmail.com` |
| `CLOUDINARY_URL` | String | Complete Cloudinary connection URL | `cloudinary://API_KEY:API_SECRET@CLOUD_NAME` |
| `CLOUDINARY_CLOUD_NAME` | String | Cloudinary cloud account name | `dptqxxxx` |
| `CLOUDINARY_API_KEY` | String | Cloudinary API Key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | String | Cloudinary API Secret | `xxxxxxxxxxxxxxxxxxxx` |

> [!IMPORTANT]
> When using Gmail for SMTP, generate an **App Password** from your Google Account Security settings (`myaccount.google.com/apppasswords`). Standard account passwords will fail due to Google's 2FA requirements.

---

### Frontend Variables (`zetawa-main`)

The frontend is designed to work seamlessly out-of-the-box:
- In **development**, [`vite.config.js`](file:///Users/vansh/Documents/Zetawa/zetawa-main/vite.config.js) proxies `/api` requests to `http://localhost:4000`.
- In **production on Vercel**, [`vercel.json`](file:///Users/vansh/Documents/Zetawa/zetawa-main/vercel.json) rewrites `/api/*` requests to the live Render backend (`https://zetawadark.onrender.com/api/:path*`).
- No hardcoded environment variables are strictly required on the frontend, making client builds deterministic and zero-configuration.

---

## 🌐 Production Deployment Architecture

```mermaid
sequenceDiagram
    autonumber
    actor Developer
    participant GitHub as GitHub (origin/main)
    participant Vercel as Vercel (Frontend)
    participant Render as Render (Backend)
    participant Atlas as MongoDB Atlas

    Developer->>GitHub: git push origin main
    par Automated Webhooks
        GitHub->>Vercel: Trigger Frontend Build
        Vercel->>Vercel: npm run build (Vite)
        Vercel-->>Developer: Deployed to https://zetawa-dark.vercel.app
    and
        GitHub->>Render: Trigger Backend Deploy
        Render->>Render: npm install && node server.js
        Render->>Atlas: connectDB()
        Render-->>Developer: Live at https://zetawadark.onrender.com
    end
```

### 1. Frontend (Vercel)
- **Root Directory**: `zetawa-main`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Reverse Proxy**: [`vercel.json`](file:///Users/vansh/Documents/Zetawa/zetawa-main/vercel.json) routes all calls to `/api/...` to the backend on Render, preventing third-party cookie blocking and eliminating Cross-Origin Resource Sharing (CORS) complications.

### 2. Backend (Render)
- **Root Directory**: `auth-backend`
- **Environment**: Node.js
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Health Check Path**: `GET /` (returns `Zetawa Unified Backend API is running ✅`)

### 3. Database (MongoDB Atlas)
- Ensure your MongoDB Atlas Network Access whitelist includes `0.0.0.0/0` (Allow access from anywhere) so Render container IPs can connect without connection timeouts.

---

## 🛠️ Developer Guide: How to Extend the Codebase

### Adding a New Public Page

1. Create a new component in `zetawa-main/src/components/MyNewPage.jsx`:
   ```jsx
   import React from 'react';
   import Nav from './Nav';
   import Footer from './Footer';

   const MyNewPage = () => {
     return (
       <div className="page-container">
         <Nav />
         <main style={{ minHeight: '80vh', padding: '6rem 2rem' }}>
           <h1>My New Page</h1>
         </main>
         <Footer />
       </div>
     );
   };

   export default MyNewPage;
   ```
2. Register the route in [`zetawa-main/src/App.jsx`](file:///Users/vansh/Documents/Zetawa/zetawa-main/src/App.jsx):
   ```jsx
   import MyNewPage from './components/MyNewPage';
   // Inside <Routes>:
   <Route path="/my-new-page" element={<MyNewPage />} />
   ```
3. Add navigation links inside [`Nav.jsx`](file:///Users/vansh/Documents/Zetawa/zetawa-main/src/components/Nav.jsx) or [`Footer.jsx`](file:///Users/vansh/Documents/Zetawa/zetawa-main/src/components/Footer.jsx).

---

### Adding a New Backend Feature / API Endpoint

1. **Define Schema**: Create `auth-backend/models/featureModel.js`:
   ```javascript
   import mongoose from "mongoose";

   const featureSchema = new mongoose.Schema({
     title: { type: String, required: true },
     content: { type: String, default: "" },
   }, { timestamps: true });

   export default mongoose.models.feature || mongoose.model("feature", featureSchema);
   ```

2. **Write Controller**: Create `auth-backend/controllers/featureControllers.js`:
   ```javascript
   import featureModel from "../models/featureModel.js";

   export const getFeatures = async (req, res) => {
     try {
       const features = await featureModel.find().sort({ createdAt: -1 });
       res.json({ success: true, data: features });
     } catch (err) {
       res.status(500).json({ success: false, message: err.message });
     }
   };
   ```

3. **Expose Route**: Create `auth-backend/routes/featureRoutes.js` and mount it in [`auth-backend/server.js`](file:///Users/vansh/Documents/Zetawa/auth-backend/server.js):
   ```javascript
   import featureRouter from "./routes/featureRoutes.js";
   app.use("/api/features", featureRouter);
   ```

---

### Modifying or Adding Default CMS Content

The platform uses an auto-seeding pattern for services and career openings. If the database collection is empty, the controllers automatically populate high-fidelity predefined data:
- **Careers Defaults**: Defined in [`careerControllers.js`](file:///Users/vansh/Documents/Zetawa/auth-backend/controllers/careerControllers.js) under `DEFAULT_CAREERS`.
- **Services Defaults**: Defined in [`serviceControllers.js`](file:///Users/vansh/Documents/Zetawa/auth-backend/controllers/serviceControllers.js) under `DEFAULT_SERVICES`.
- To reset database records to modern defaults at any time, log in as Admin in the Admin Portal and click **"Reset Default Openings"** or **"Reset Default Services"**, or trigger:
  ```bash
  curl -X POST https://zetawadark.onrender.com/api/careers/reset-defaults
  curl -X POST https://zetawadark.onrender.com/api/services/reset-defaults
  ```

---

## 📜 Available NPM Scripts

| Location | Command | Action |
| :--- | :--- | :--- |
| **Root (`/`)** | `npm run dev` | Runs both backend and frontend concurrently with color-coded terminal logs. |
| **Root (`/`)** | `npm run backend` | Starts the Express server in development mode using `nodemon`. |
| **Root (`/`)** | `npm run frontend` | Starts the Vite development server for the frontend. |
| **Root (`/`)** | `npm run start` | Production start command for the backend. |
| **`zetawa-main/`** | `npm run build` | Compiles and minifies the React application into `zetawa-main/dist`. |
| **`zetawa-main/`** | `npm run preview` | Locally serves the production build output for pre-deployment validation. |
| **`zetawa-main/`** | `npm run lint` | Runs ESLint to check for syntax and style issues. |
| **`auth-backend/`** | `npm run server` | Starts the backend with live auto-reloading via `nodemon`. |
| **`auth-backend/`** | `npm start` | Production backend entrypoint (`node server.js`). |

---

## 🔒 Security & Best Practices

1. **HttpOnly Cookie Tokens**: Authentication tokens are transmitted in `HttpOnly, SameSite` cookies, making them inaccessible to malicious client-side JavaScript and protecting against Cross-Site Scripting (XSS) token theft.
2. **Password URL Encoding**: The database connector automatically sanitizes connection strings to prevent credential leaks or syntax parsing crashes.
3. **Password Hashing**: User passwords are encrypted with `bcryptjs` using 10 salt rounds before storage. Plain-text passwords are never logged or stored.
4. **Environment Isolation**: Never commit `.env` files to git. All sensitive credentials are included in `.gitignore`.
5. **Role-Based Guards**: Every mutating endpoint (`POST`, `PUT`, `DELETE`) for services, careers, updates, and certificates requires a valid JWT verified against an admin identity via `adminAuth.js`.

---

## 🤝 Contributing & Team Workflow

1. Always branch off `main` before starting new feature development:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Test builds locally before committing:
   ```bash
   cd zetawa-main && npm run build
   ```
3. Submit a clean commit message adhering to conventional commit guidelines:
   ```bash
   git commit -m "feat(careers): add filter by experience level"
   ```
4. Push and open a Pull Request against `main`. Automated deployments will trigger upon merge.

---

<p align="center">
  <b>Built with excellence by the Zetawa Engineering Team.</b><br/>
  © 2026 Zetawa. All rights reserved.
</p>
