import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/CookieBanner";

/* Eagerly load landing page for fast FCP */
import Index from "./pages/Index";

/* Lazy-load all other routes */
const About = lazy(() => import("./pages/About"));
const LicenseClasses = lazy(() => import("./pages/LicenseClasses"));
const LicenseClassDetail = lazy(() => import("./pages/LicenseClassDetail"));
const Prices = lazy(() => import("./pages/Prices"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const Locations = lazy(() => import("./pages/Locations"));
const Bremen = lazy(() => import("./pages/locations/Bremen"));
const Garbsen = lazy(() => import("./pages/locations/Garbsen"));
const Hannover = lazy(() => import("./pages/locations/Hannover"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ErsteHilfe = lazy(() => import("./pages/ErsteHilfe"));
const Aufbauseminar = lazy(() => import("./pages/Aufbauseminar"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const Impressum = lazy(() => import("./pages/Impressum"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <main className="bg-driving-pattern">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ueber-uns" element={<About />} />
              <Route path="/fuehrerscheinklassen" element={<LicenseClasses />} />
              <Route path="/fuehrerschein/:slug" element={<LicenseClassDetail />} />
              <Route path="/preise" element={<Prices />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/standorte" element={<Locations />} />
              <Route path="/standorte/bremen" element={<Bremen />} />
              <Route path="/standorte/garbsen" element={<Garbsen />} />
              <Route path="/standorte/hannover" element={<Hannover />} />
              <Route path="/erste-hilfe" element={<ErsteHilfe />} />
              <Route path="/aufbauseminar" element={<Aufbauseminar />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
