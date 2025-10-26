import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signin = async (email: string, password: string) => {
    // Simulate API call - in production, call your actual auth endpoint
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock authentication
    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockUser = { name: email.split('@')[0], email };
    
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('authUser', JSON.stringify(mockUser));
    
    setToken(mockToken);
    setUser(mockUser);
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call - in production, call your actual signup endpoint
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock authentication
    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockUser = { name, email };
    
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('authUser', JSON.stringify(mockUser));
    
    setToken(mockToken);
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signin, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
