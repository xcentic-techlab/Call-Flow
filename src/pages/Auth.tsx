import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/useAuth';

const Auth = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CallFlow
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Premium voice calling platform
          </p>
        </div>

        <div className="bg-card/30 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold mb-6">Get Started</h2>
          <Button
            onClick={() => navigate('/auth/signin')}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
          >
            Sign in
          </Button>
          <Button
            onClick={() => navigate('/auth/signup')}
            variant="outline"
            className="w-full h-12 text-base font-semibold border-white/[0.06] hover:bg-muted/50"
          >
            Create account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
