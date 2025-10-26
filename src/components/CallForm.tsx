import { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Spinner } from './Spinner';

export const CallForm = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const validatePhone = (phoneNumber: string): boolean => {
    // Remove all non-digit characters for validation
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    return digitsOnly.length >= 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      toast.error('Please enter a valid phone number (minimum 10 digits)');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://89.116.121.214:8000/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Call initiated successfully!');
        setPhone('');
      } else {
        toast.error(data.error || 'Failed to initiate call. Please try again.');
      }
    } catch (error) {
      toast.error('Server error — try again');
      console.error('Call API error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="phone" className="text-base font-semibold mb-3 block">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
          <Input
            id="phone"
            type="tel"
            placeholder="Enter phone number (e.g. +919876543210)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-12 h-14 bg-background/50 border-white/[0.08] focus:border-primary/50 focus:ring-2 focus:ring-primary/30 transition-all text-base rounded-xl"
            required
            disabled={isLoading}
            aria-describedby="phone-hint"
          />
        </div>
        <p id="phone-hint" className="text-sm text-muted-foreground mt-3">
          Use E.164 format for best results (e.g., +919876543210)
        </p>
      </div>

      <Button
        type="submit"
        className="w-full h-16 text-lg font-bold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/25 focus:ring-2 focus:ring-primary/40 transition-all rounded-xl group"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner size="sm" className="mr-2" />
            Connecting...
          </>
        ) : (
          <>
            <Phone className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
            Start Call
          </>
        )}
      </Button>
    </form>
  );
};
