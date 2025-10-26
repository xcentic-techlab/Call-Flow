import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { CallForm } from '@/components/CallForm';
import { Button } from '@/components/ui/button';

const Call = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-8 hover:bg-muted/50 hover:scale-105 transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary">Call Interface</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Make a Call
            </h1>
            <p className="text-muted-foreground text-lg">Enter a phone number in E.164 format to connect instantly</p>
          </div>

          <div className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-white/[0.08] rounded-3xl p-8 md:p-10 shadow-2xl mb-8">
            <CallForm />
          </div>

          <div className="p-6 bg-gradient-to-br from-muted/10 to-muted/5 rounded-2xl border border-white/[0.05]">
            <h3 className="text-sm font-bold mb-4 text-foreground uppercase tracking-wider flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              API Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 bg-background/30 p-3 rounded-lg">
                <span className="text-primary font-mono font-semibold">POST</span>
                <code className="text-xs bg-background/50 px-3 py-1.5 rounded-md font-mono flex-1">
                  http://89.116.121.214:8000/call
                </code>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Phone numbers should be in E.164 format for best results (e.g., +919876543210)
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Call;
