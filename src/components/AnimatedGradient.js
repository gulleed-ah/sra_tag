import React, { useEffect, useState } from 'react';

const AnimatedGradient = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`
        fixed inset-0 
        w-full 
        h-screen 
        overflow-hidden
        ${isLoaded ? 'opacity-100' : 'opacity-0'}
        transition-opacity duration-500
      `}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 animate-gradient"
        style={{
          backgroundSize: '200% 200%',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          perspective: 1000,
          willChange: 'background-position'
        }}
      />
      
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @media (prefers-reduced-motion: no-preference) {
          .animate-gradient {
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedGradient;
