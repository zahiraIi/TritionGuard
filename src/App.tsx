import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Authentication from "./pages/Authentication";
import AccessCode from "./pages/AccessCode";
import MapView from "./pages/MapView";
import ReportIncident from "./pages/ReportIncident";
import Emergency from "./pages/Emergency";
import KnowYourRights from "./pages/KnowYourRights";
import NotFound from "./pages/NotFound";
import NotificationService from "./services/NotificationService";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize services when app starts
    const initializeServices = async () => {
      try {
        const notificationService = NotificationService.getInstance();
        await notificationService.initialize();
        console.log('TritionGuard services initialized successfully');
      } catch (error) {
        console.error('Failed to initialize TritionGuard services:', error);
      }
    };

    initializeServices();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/access-code" element={<AccessCode />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/report" element={<ReportIncident />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/know-your-rights" element={<KnowYourRights />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
