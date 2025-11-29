import React from 'react';

function Logo({ size = 32 }) {
  return (
    <div 
      className="nav-logo" 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg 
        width={size * 0.625} 
        height={size * 0.625} 
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3))' }}
      >
        <defs>
          <linearGradient id="cardano-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1fc7d4" />
            <stop offset="50%" stopColor="#0033ad" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        {/* Magnifying glass circle */}
        <circle 
          cx="10" 
          cy="10" 
          r="7" 
          stroke="url(#cardano-gradient)" 
          strokeWidth="1.5" 
          fill="none"
        />
        {/* Magnifying glass handle */}
        <line 
          x1="15" 
          y1="15" 
          x2="17" 
          y2="17" 
          stroke="url(#cardano-gradient)" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
        {/* Window/house inside - divided into 4 squares */}
        <rect 
          x="7" 
          y="7" 
          width="6" 
          height="6" 
          stroke="url(#cardano-gradient)" 
          strokeWidth="1" 
          fill="none"
        />
        <line 
          x1="10" 
          y1="7" 
          x2="10" 
          y2="13" 
          stroke="url(#cardano-gradient)" 
          strokeWidth="1"
        />
        <line 
          x1="7" 
          y1="10" 
          x2="13" 
          y2="10" 
          stroke="url(#cardano-gradient)" 
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export default Logo;

