import { useNavigate } from 'react-router-dom';
import { Phone, Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { InfoCard } from '@/components/InfoCard';
import { StatsGrid } from '@/components/StatsGrid';
import { Button } from '@/components/ui/button';
import dashboardHero from '@/assets/dashboard-hero.png';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-10 space-y-10">
        {/* Hero Section with Image */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/20 rounded-3xl border border-white/[0.08] shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="p-8 md:p-12 lg:p-16 space-y-6 relative z-10">
              <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <span className="text-sm font-semibold text-primary">Premium Voice Platform</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                  CallFlow
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Experience crystal-clear voice calling with enterprise-grade security. Connect with anyone, anywhere, instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => navigate('/call')}
                  size="lg"
                  className="h-14 px-8 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all group"
                >
                  <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Make a Call
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base font-semibold border-white/10 hover:border-primary/50 hover:bg-primary/5"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative h-full min-h-[400px] lg:min-h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 lg:hidden"></div>
              <img 
                src={dashboardHero} 
                alt="Professional woman making a call" 
                className="absolute inset-0 w-full h-full object-cover lg:object-contain lg:p-8"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/50 to-background hidden lg:block"></div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid />

        {/* About Section */}
        <div>
          <div className="mb-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-3">Why Choose CallFlow?</h3>
            <p className="text-muted-foreground text-lg">Enterprise-grade features designed for seamless communication</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              title="Secure Calling"
              description="All calls are encrypted end-to-end, ensuring your conversations remain private and secure. We use industry-standard protocols to protect your data."
              icon={<Shield className="h-6 w-6 text-primary" />}
            />
            <InfoCard
              title="Lightning Fast"
              description="Experience crystal-clear voice quality with minimal latency. Our optimized infrastructure ensures smooth calling experiences worldwide."
              icon={<Zap className="h-6 w-6 text-secondary" />}
            />
            <InfoCard
              title="Global Reach"
              description="Make calls to any country with competitive rates and reliable connectivity. Our network spans across continents for seamless communication."
              icon={<Globe className="h-6 w-6 text-primary" />}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 md:p-10 shadow-xl">
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Platform Features</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform">
              <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-semibold mb-1">E.164 Format Support</h4>
                <p className="text-sm text-muted-foreground">International dialing with standardized formatting</p>
              </div>
            </div>
            <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform">
              <div className="mt-1 h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <div className="h-2 w-2 rounded-full bg-secondary"></div>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Real-time Status</h4>
                <p className="text-sm text-muted-foreground">Live call status and instant notifications</p>
              </div>
            </div>
            <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform">
              <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Call Analytics</h4>
                <p className="text-sm text-muted-foreground">Comprehensive history and detailed insights</p>
              </div>
            </div>
            <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform">
              <div className="mt-1 h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <div className="h-2 w-2 rounded-full bg-secondary"></div>
              </div>
              <div>
                <h4 className="font-semibold mb-1">24/7 Support</h4>
                <p className="text-sm text-muted-foreground">Expert assistance whenever you need it</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
