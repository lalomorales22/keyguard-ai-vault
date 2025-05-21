
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

const LOADING_IMAGES = [
  'https://source.unsplash.com/random/1200x800/?tech,dark',
  'https://source.unsplash.com/random/1200x800/?code,dark',
  'https://source.unsplash.com/random/1200x800/?api,dark',
  'https://source.unsplash.com/random/1200x800/?developer,dark',
  'https://source.unsplash.com/random/1200x800/?security,dark',
];

const LoginScreen = () => {
  const { setIsAuthenticated } = useApp();
  const [password, setPassword] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load a random image on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * LOADING_IMAGES.length);
    const imageUrl = LOADING_IMAGES[randomIndex];
    
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setBackgroundImage(imageUrl);
      setIsLoading(false);
    };
    img.onerror = () => {
      // Fallback if image loading fails
      setBackgroundImage('');
      setIsLoading(false);
    };

    // For development, set a short timeout to simulate login
    // In production, this would use a proper auth flow
    /*
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 2000);
    */
  }, [setIsAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, any password is accepted
    // In a real app, this would validate against a stored password
    if (password) {
      setIsAuthenticated(true);
      toast.success('Login successful');
    } else {
      toast.error('Please enter a password');
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-brand-dark">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gradient-primary mb-4">whereMYAPIKEY?</h1>
          <div className="w-12 h-12 rounded-full border-4 border-brand-purple border-t-transparent animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 glass-morphism p-8 w-full max-w-md rounded-2xl animate-fade-in">
        <h1 className="text-4xl font-bold text-gradient-primary text-center mb-8">whereMYAPIKEY?</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-white/80">
              Enter your password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Password"
              autoFocus
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-medium"
          >
            Unlock
          </Button>
          
          <p className="text-xs text-center text-white/60 mt-4">
            Secure API Key Management
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
