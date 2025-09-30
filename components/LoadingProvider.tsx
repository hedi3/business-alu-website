"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

const LoadingContext = createContext<{
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  isLoading: true,
  setLoading: () => {}
});

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading for initial page load only
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Slightly reduced for better UX

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      <LoadingScreen loading={isLoading} />
      <div 
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: 'opacity 0.5s ease-in' 
        }}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
}
