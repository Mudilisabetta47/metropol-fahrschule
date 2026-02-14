import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import LicenseClasses from "./pages/LicenseClasses";
import LicenseClassDetail from "./pages/LicenseClassDetail";
import Prices from "./pages/Prices";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Locations from "./pages/Locations";
import Bremen from "./pages/locations/Bremen";
import Garbsen from "./pages/locations/Garbsen";
import Hannover from "./pages/locations/Hannover";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <main className="bg-driving-pattern">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ueber-uns" element={<About />} />
            <Route path="/fuehrerscheinklassen" element={<LicenseClasses />} />
            <Route path="/fuehrerschein-:slug" element={<LicenseClassDetail />} />
            <Route path="/preise" element={<Prices />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/standorte" element={<Locations />} />
            <Route path="/standorte/bremen" element={<Bremen />} />
            <Route path="/standorte/garbsen" element={<Garbsen />} />
            <Route path="/standorte/hannover" element={<Hannover />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
