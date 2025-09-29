import { DashboardHeader } from "@/components/DashboardHeader";
import { HeroSection } from "@/components/HeroSection";
import { StatsGrid } from "@/components/StatsGrid";
import { DisasterMap } from "@/components/DisasterMap";
import { QuickActions } from "@/components/QuickActions";
import { AlertsPanel } from "@/components/AlertsPanel";
import { ResourcesPanel } from "@/components/ResourcesPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <HeroSection />
        <StatsGrid />
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <DisasterMap />
          </div>
          
          <div className="space-y-6">
            <QuickActions />
            <AlertsPanel />
          </div>
        </div>

        <ResourcesPanel />
      </main>
    </div>
  );
};

export default Index;
