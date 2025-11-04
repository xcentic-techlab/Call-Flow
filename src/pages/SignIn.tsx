import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/useAuth';
import { toast } from 'sonner';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signin, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/dashboard', { replace: true });
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Please fill all fields');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error('Invalid email');

    setIsLoading(true);
    try {
      await signin(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch {
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br bg-gray-900 text-white px-4 relative">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r text-white bg-clip-text text-transparent">
          CallFlow
        </h1>
        <p className="text-white/60 text-base">
          Welcome back — streamline your communication, elevate your workflow
        </p>
      </div>
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 hover:border-white/20 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90 text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-gray-500 focus:border-transparent rounded-xl transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/90 text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-gray-500 focus:border-transparent rounded-xl transition-all"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            
            className="w-full h-12 bg-gradient-to-r from-gray-200 to-gray-200 text-gray-900 font-semibold rounded-xl transition-all duration-300 shadow-lg mt-6">
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" /> Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-transparent text-white/60">OR</span>
            </div>
          </div>
          <p className="text-center text-sm text-white/70">
            Don’t have an account?{' '}
            <Link
              to="/auth/signup"
              className="text-white font-medium hover:text-gray-300 transition-colors underline decoration-gray-400/30 hover:decoration-gray-300"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
