# TerraVista — Smart Tourism & Travel Explorer

**Complete, Portable, Runnable College Project • Academic Submission Reference**

TerraVista is a full-stack spatial travel-technology and smart tourism explorer built with **Next.js (App Router)**, **React**, **Three.js**, and **Leaflet (OpenStreetMap)**. It is designed around a cinematic travel-tech brand featuring realistic 3D mountain and ocean environments, topographic GIS telemetry, and an interactive geographic map centered on curated Mumbai destinations.

---

## 📋 Table of Contents
1. [Project Overview & Key Highlights](#-project-overview--key-highlights)
2. [Technology Stack](#-technology-stack) & [Detailed Tech Stack Specification (TECH_STACK.md)](file:///C:/Users/Lenovo/.gemini/antigravity/scratch/terravista/TECH_STACK.md)
3. [Prerequisites & System Requirements](#-prerequisites--system-requirements)
4. [Step-by-Step Instructions for Evaluators & Professors](#-step-by-step-instructions-for-evaluators--professors)
5. [Backend API & Route Handlers](#-backend-api--route-handlers)
6. [External Services, Map Tiles & Supabase Policy](#-external-services-map-tiles--supabase-policy)
7. [Running Available Tests & Quality Control](#-running-available-tests--quality-control)
8. [Feature Verification Checklist](#-feature-verification-checklist)
9. [Demonstration Script for Professors](#-demonstration-script-for-professors)
10. [Submission Guide & How to Create a ZIP](#-submission-guide--how-to-create-a-zip)
11. [Troubleshooting Guide](#-troubleshooting-guide)

---

## 🏛️ Project Overview & Key Highlights

TerraVista bridges interactive spatial graphics with accessible geospatial intelligence. Rather than relying on static mockups or generic templates, the platform delivers:

- **Immersive 3D Spatial Canvas**: Real-time Three.js procedural terrain featuring rugged mountain ridges, coastal sea cliffs, offshore island pinnacles, an undulating ocean surface with specular lighting, and volumetric drifting cloud clusters.
- **Interactive OpenStreetMap Geospatial Engine**: Centered on Mumbai (`18.98° N, 72.83° E`) with verified coordinates, custom glowing category-coded pins, elevation telemetry, and external Google Maps directions.
- **Unified Filtering & Real-Time Discovery**: Synchronized search and category filters across both destination cards and map markers simultaneously.
- **Trip Itinerary & Favourites**: State-managed itinerary planning with sequential stop reordering (`Move Up` / `Move Down`), geodesic Haversine distance calculations, and `localStorage` persistence.
- **Backend Route Handlers**: Next.js REST API endpoints (`/api/destinations`, `/api/destinations/[id]`, `/api/health`) for destination querying and telemetry status.
- **Accessibility & Zero-Hydration-Error Architecture**: Native `prefers-reduced-motion` detection, client-boundary map mounting (`next/dynamic`), high-visibility keyboard focus rings, and an SVG/CSS fallback for low-spec hardware without WebGL.

---

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.4.0` | Server Components, Route Handlers, static prerendering, Turbopack |
| **Frontend Library** | React | `19.3.0` | Declarative UI and component lifecycle |
| **Language** | TypeScript | `5.x` | Strict type safety for GIS models, filters, and API contracts |
| **Styling** | Tailwind CSS | `4.x` | Design tokens, responsive grids, and cinematic glassmorphism |
| **3D Rendering** | Three.js | `0.186.1` | WebGL procedural terrain, lighting rigs, and mouse parallax |
| **Mapping Engine** | Leaflet | `1.9.4` | OpenStreetMap tile rendering, markers, and custom interactive popups |
| **Iconography** | Lucide Icons | `1.56.0` | Clean, accessible SVG iconography |
| **Backend** | Next.js Route Handlers | Built-in | Full-stack REST API endpoints for destination queries and health |

---

## 💻 Prerequisites & System Requirements

- **Visual Studio Code**: Latest version recommended.
- **Node.js**: `v20.x` or `v22.x` (LTS recommended).
- **Package Manager**: `npm` (`v10+` comes with Node.js).
- **Operating System**: Windows 10/11, macOS, or Linux.
- **Internet Access**: Required for downloading initial npm dependencies and fetching OpenStreetMap map tiles during interactive navigation.

---

## 🚀 Step-by-Step Instructions for Evaluators & Professors

Follow these exact steps to open, install, and run TerraVista in **Visual Studio Code**:

### Step 1: Open the Project in VS Code
1. Launch **Visual Studio Code**.
2. Select **File > Open Folder...** (`Ctrl + K, Ctrl + O`).
3. Select the `terravista` folder and click **Select Folder**.

### Step 2: Open an Integrated Terminal
1. Open a terminal in VS Code: **Terminal > New Terminal** (or press `` Ctrl + ` ``).
2. Ensure you are in the root directory where `package.json` resides.

### Step 3: Install Dependencies
Run the standard package installation command:
```bash
npm install
```
*(All required dependencies including Next.js, React, Three.js, Leaflet, Tailwind CSS, and Lucide Icons will be installed).*

### Step 4: Run the Available Test Suite
Run the automated core unit and verification tests:
```bash
npm test
```
*Expected Output:*
```text
🧪 [Test Suite] Running TerraVista Core Verification Tests...
✓ Testing coordinate validity for curated destinations...
  PASS: All 10 Mumbai destinations have verified GIS coordinates.
✓ Testing Haversine Geodesic Distance algorithm...
  PASS: Gateway to Marine Drive distance verified (~2.66 km).
✓ Testing search and category filter matching...
  PASS: Search and category filters operate with 100% precision.
✓ Testing Itinerary Stop Reordering (Move Up / Down)...
  PASS: Array-swap reordering preserves immutability and sequence.
✨ ALL TESTS PASSED SUCCESSFULLY! (4 of 4 suites green)
```

### Step 5: Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your web browser (Chrome, Edge, Firefox, or Safari).

### Alternative: Run the Production Build (Recommended for Demonstrations)
```bash
npm run build
npm run start
```
The application will statically prerender and launch an optimized production server on **[http://localhost:3000](http://localhost:3000)**.

---

## 🌐 Backend API & Route Handlers

TerraVista contains a full-stack backend running via Next.js Route Handlers. Evaluators can test these endpoints directly in their browser or via curl/Postman:

1. **`GET /api/destinations`**:
   - Returns curated destinations with support for query params:
     - `?mumbai=true`: Returns only curated Mumbai attractions (10 locations).
     - `?category=Heritage`: Filters by category (`Beaches`, `Heritage`, `Religious Places`, `Nature`, `Viewpoints`).
     - `?q=Gateway`: Full-text search across names, regions, and features.
2. **`GET /api/destinations/[id]`**:
   - Returns detailed JSON specifications for a single destination (e.g., `/api/destinations/mumbai-gateway-of-india`).
3. **`GET /api/health`**:
   - Returns backend service health, database mode, and active capabilities.

---

## 🔒 External Services, Map Tiles & Supabase Policy

- **Zero Required Paid Accounts or API Keys**:
  - The project runs **100% out of the box** without any paid services, credit cards, or external database setups.
- **OpenStreetMap & CartoDB Tiles**:
  - Map tiles are streamed live over public HTTPS using standard OpenStreetMap/CartoDB tile servers with legal attribution. **An active internet connection is required to load map tiles.**
- **Directions API**:
  - Uses standard Google Maps URL navigation schema (`https://www.google.com/maps/dir/?api=1&destination=LAT,LNG`). **No API keys required.**
- **Supabase Policy (Optional)**:
  - TerraVista is built so that Supabase is **strictly optional**. The application never crashes if Supabase environment variables are missing. An `.env.example` file is included in the project root to demonstrate how future external databases can be connected.

---

## ✅ Feature Verification Checklist

| Category | Feature | Status | Implementation Details |
| :--- | :--- | :---: | :--- |
| **3D Environment** | Procedural Mountains, Cliffs & Islands | **Verified** | Three.js WebGL canvas with 3 offshore islands |
| **3D Environment** | Ocean Waves & Volumetric Clouds | **Verified** | Vertex displacement waves + 18 drifting clouds |
| **3D Environment** | Interactive Mouse Parallax & Card Tilt | **Verified** | Damped camera tracking + 3D pointer-tilt on cards |
| **3D Environment** | Reduced Motion & WebGL Fallbacks | **Verified** | Respects OS motion preference + `LayeredAtmosphericFallback` |
| **Interactive Map** | Authentic Mumbai Geographic Canvas | **Verified** | Centered on Mumbai (`18.98° N, 72.83° E`) |
| **Interactive Map** | Verified Mumbai Attractions (10+) | **Verified** | Gateway of India, Marine Drive, Juhu, Bandra Fort, Siddhivinayak, etc. |
| **Interactive Map** | Glowing Popups & Selection State | **Verified** | Category-coded SVG pins with image and specs popup |
| **Interactive Map** | Responsive Mode Switcher | **Verified** | Split View, Map Area, Places List (defaults to Map on mobile) |
| **Discovery** | Live Destination Search | **Verified** | Real-time dropdown search across names, regions, & tags |
| **Discovery** | Category Filter Buttons | **Verified** | `All`, `Beaches`, `Heritage`, `Religious Places`, `Nature`, `Viewpoints` |
| **Discovery** | Coordinated Filtering | **Verified** | Filters update card grid and map markers simultaneously |
| **Planning** | Favourites / Bookmarking Kit | **Verified** | Saved places persist in `localStorage` across reloads |
| **Planning** | Trip Itinerary Planner | **Verified** | Add/remove stops, reorder (`Up`/`Down`), sequential distance |
| **Directions** | External Navigation Link | **Verified** | "Open Directions" opens Google Maps with verified lat/long |
| **Backend** | Next.js REST API Route Handlers | **Verified** | `/api/destinations`, `/api/destinations/[id]`, `/api/health` |
| **Code Quality** | Automated Test Suite | **Verified** | `npm test` passes 4 of 4 verification suites |
| **Code Quality** | Production Build & Type Safety | **Verified** | `npm run build` generates 6 static & dynamic routes |

---

## 🎓 Demonstration Script for Professors

When presenting the project to your professor, use this ordered demonstration:

1. **Step 1: The 3D Cinematic Environment**
   - Open `http://localhost:3000`.
   - Move the mouse across the hero header to showcase the **interactive camera parallax**.
   - Point out the **three offshore island pinnacles**, the **ocean wave displacement**, and the **drifting clouds with sunset rim lighting**.
   - In the search bar, type `"Gateway"` or `"Marine"` to demonstrate the **live matching suggestions dropdown**.
2. **Step 2: Destination Explorer & 3D Pointer Tilt**
   - Click **"Explore Destinations"** (or scroll down).
   - Hover over any destination card to show the **restrained 3D pointer-tilt depth effect** and image zoom.
   - Click the category buttons (`Beaches`, `Heritage`, `Religious Places`, `Nature`, `Viewpoints`) to demonstrate instant client-side filtering.
   - Click on **"Gateway of India"** to open the **Full Destination Specs Modal**, showing coordinates, elevation, and terrain features.
3. **Step 3: Interactive Mumbai Geographic Map**
   - Click **"Show on Map"** inside the modal or navigate to `#interactive-map`.
   - Show how the map pans and locks onto the selected marker.
   - Click different markers (e.g. *Bandra Fort*, *Siddhivinayak Temple*, *Elephanta Caves*) to view custom glowing pins, popups, and telemetry updates in the inspector panel.
   - Click the **"Reset to Mumbai View"** button to restore the macro view.
   - Demonstrate the **Split View**, **Map Area**, and **Places List** mode switcher.
4. **Step 4: Favourites & Trip Itinerary Planning**
   - Click **"Save Place"** on any destination; show the **"Saved (1)"** badge in the navbar update immediately.
   - Click **"Add to Itinerary"** on 2–3 destinations.
   - Open the **Trip Itinerary** modal from the navbar:
     - Show the numbered stops (`#1`, `#2`, `#3`).
     - Click **Move Up / Move Down** to reorder stops and observe the sequential order recalculate.
     - Highlight the calculated **geodesic straight-line distance** metric and duration estimate.
     - Click **"Focus Map"** on any stop to demonstrate direct navigation back to that coordinate on the map.
5. **Step 5: Backend API Routes & Code Verification**
   - In the browser, navigate to:
     - `http://localhost:3000/api/health` (Service health & database mode)
     - `http://localhost:3000/api/destinations?mumbai=true` (Curated Mumbai JSON list)
   - In the VS Code terminal, run `npm test` and `npm run build` to verify that all test suites pass and the production build compiles with zero errors.

---

## 📦 Submission Guide & How to Create a ZIP

### Which Folder to Submit
Submit the entire **`terravista`** project directory containing all source code, configurations, test scripts, and documentation.

### What NOT to Include in the ZIP
To keep the ZIP small and prevent file locking issues:
- **Do NOT include `node_modules`** (the professor will run `npm install`).
- **Do NOT include the `.next` build folder** (the professor will run `npm run dev` or `npm run build`).

### How to Create the Submission ZIP (Windows PowerShell)
Open PowerShell, navigate to the folder containing `terravista`, and run:
```powershell
Compress-Archive -Path "terravista\*" -DestinationPath "TerraVista_College_Project_Submission.zip" -CompressionLevel Optimal
```
*Or via File Explorer:*
1. Right-click the `terravista` folder.
2. Select **Send to > Compressed (zipped) folder**.
3. (Optional) Delete `node_modules` and `.next` before zipping if the file size is too large.

---

## ❓ Troubleshooting Guide

1. **Map Tiles Appear Blank**:
   - Ensure your computer is connected to the internet. Map tiles stream from OpenStreetMap/CartoDB servers.
2. **Port 3000 Already in Use**:
   - Run Next.js on a different port:
     ```bash
     npm run dev -- -p 3001
     ```
     Then open `http://localhost:3001`.
3. **PowerShell Execution Policy Warning**:
   - If running `npm` commands shows an execution policy error on Windows, run:
     ```powershell
     Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
     ```
4. **Node.js Version Warning**:
   - Ensure Node.js is version 20 or higher (`node -v`). Update from [nodejs.org](https://nodejs.org) if needed.
