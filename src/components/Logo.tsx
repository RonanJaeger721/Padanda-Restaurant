import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  light?: boolean;
}

export default function Logo({ className = '', size = 'md', light = false }: LogoProps) {
  const dimensions = {
    sm: { width: '120px', height: '40px', iconSize: 24 },
    md: { width: '180px', height: '60px', iconSize: 36 },
    lg: { width: '240px', height: '80px', iconSize: 48 },
    xl: { width: '320px', height: '120px', iconSize: 72 },
  };

  const current = dimensions[size];
  const textColor = light ? 'text-white' : 'text-primary';
  const subTextColor = '#C79A32'; // Gold

  return (
    <div id="padanda-logo" className={`flex flex-col items-center justify-center ${className}`}>
      {/* SVG Icon of Padanda Pot & Fire */}
      <svg
        width={current.iconSize * 1.5}
        height={current.iconSize * 1.5}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform duration-300 hover:scale-105"
      >
        {/* Firewood Logs at Bottom */}
        <g id="firewood-logs" stroke={light ? '#ffffff' : '#222222'} strokeWidth="5" strokeLinecap="round">
          {/* Middle log */}
          <line x1="80" y1="120" x2="80" y2="145" />
          <circle cx="80" cy="145" r="5" fill={light ? '#ffffff' : '#222222'} />
          
          {/* Left log */}
          <line x1="80" y1="120" x2="50" y2="135" />
          <circle cx="50" cy="135" r="5" fill={light ? '#ffffff' : '#222222'} />
          
          {/* Right log */}
          <line x1="80" y1="120" x2="110" y2="135" />
          <circle cx="110" cy="135" r="5" fill={light ? '#ffffff' : '#222222'} />
        </g>

        {/* Flashing / Glowing Flames */}
        <g id="flames">
          {/* Outer red flame */}
          <path
            d="M80 50 C40 85, 55 125, 80 125 C105 125, 120 85, 80 50 Z"
            fill="#EF4444"
            opacity="0.85"
          />
          {/* Mid orange flame */}
          <path
            d="M80 65 C55 93, 65 123, 80 123 C95 123, 105 93, 80 65 Z"
            fill="#F97316"
            opacity="0.95"
          />
          {/* Inner gold flame */}
          <path
            d="M80 80 C65 100, 70 120, 80 120 C90 120, 95 100, 80 80 Z"
            fill="#FACC15"
          />
        </g>

        {/* Traditional African Clay Pot (Hari) */}
        <g id="clay-pot">
          {/* Pot Rim Lid Handle */}
          <path
            d="M60 25 C60 15, 100 15, 100 25"
            stroke={light ? '#ffffff' : '#222222'}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Pot Rim */}
          <ellipse
            cx="80"
            cy="30"
            rx="45"
            ry="7.5"
            fill={light ? '#1F4D3B' : '#222222'}
            stroke={light ? '#ffffff' : '#222222'}
            strokeWidth="5"
          />

          {/* Pot Body */}
          <path
            d="M37 32 C20 65, 20 90, 45 98 C55 101, 105 101, 115 98 C140 90, 140 65, 123 32 Z"
            fill={light ? '#1F4D3B' : '#222222'}
            stroke={light ? '#ffffff' : '#222222'}
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Pot Ears/Handles */}
          <path
            d="M32 50 C22 50, 22 70, 31 70"
            stroke={light ? '#ffffff' : '#222222'}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M128 50 C138 50, 138 70, 129 70"
            stroke={light ? '#ffffff' : '#222222'}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>

      {/* Typography underneath */}
      <div className="text-center mt-2">
        <h1
          className={`font-serif-display font-black tracking-widest text-2xl uppercase ${textColor} leading-none`}
          style={{ letterSpacing: '0.15em' }}
        >
          Padanda
        </h1>
        <p
          className="text-[9px] font-sans font-bold tracking-[0.35em] uppercase text-center mt-1 leading-none"
          style={{ color: subTextColor, letterSpacing: '0.38em' }}
        >
          Restaurant
        </p>
      </div>
    </div>
  );
}
