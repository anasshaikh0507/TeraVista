import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AtmosphericBackdrop } from "@/components/features/AtmosphericBackdrop";
import { SavedPlacesProvider } from "@/context/SavedPlacesContext";
import { TripPlannerProvider } from "@/context/TripPlannerContext";
import { ToastContainer } from "@/components/ui/ToastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TerraVista — Smart Tourism & Travel Explorer",
  description:
    "Discover Places Beyond the Ordinary. A premium cinematic travel-tech platform integrating 3D spatial terrain models, microclimate telemetry, and eco-conscious expedition discovery.",
  keywords: [
    "TerraVista",
    "Smart Tourism",
    "3D Travel Explorer",
    "Mumbai Destinations",
    "Gateway of India",
    "Marine Drive",
    "Bandra Fort",
    "Juhu Beach",
    "Spatial GIS",
    "Topographic Expeditions"
  ],
  authors: [{ name: "TerraVista Engineering Team" }],
  openGraph: {
    title: "TerraVista — Smart Tourism & Travel Explorer",
    description:
      "Discover Places Beyond the Ordinary. Explore Earth's frontiers and iconic Mumbai landmarks in immersive spatial fidelity.",
    siteName: "TerraVista",
    locale: "en_US",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#040814",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#040814] text-slate-100 selection:bg-teal-500 selection:text-white">
        <SavedPlacesProvider>
          <TripPlannerProvider>
            <AtmosphericBackdrop />
            <Navbar />
            <main className="flex-1 w-full flex flex-col">{children}</main>
            <Footer />
            <ToastContainer />
          </TripPlannerProvider>
        </SavedPlacesProvider>
      </body>
    </html>
  );
}
