import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  light?: boolean;
}

export default function Logo({ className = '', size = 'md', light = false }: LogoProps) {
  const dimensions = {
    sm: { width: '120px', height: '40px', iconSize: 40 },
    md: { width: '180px', height: '60px', iconSize: 56 },
    lg: { width: '240px', height: '80px', iconSize: 80 },
    xl: { width: '320px', height: '120px', iconSize: 110 },
  };

  const current = dimensions[size];
  const textColor = light ? 'text-white' : 'text-[#111111] dark:text-white';
  const brandOrange = '#F05A28'; // Brand orange/red from the logo

  return (
    <div id="padanda-logo" className={`flex flex-col items-center justify-center ${className}`}>
      {/* SVG Icon of Padanda Pot & Fire */}
      <svg
        width={current.iconSize}
        height={current.iconSize}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Flame gradient matching the logo's orange-red glow */}
          <linearGradient id="flameGradient" x1="100" y1="140" x2="100" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E53E3E" />
            <stop offset="40%" stopColor="#F05A28" />
            <stop offset="100%" stopColor="#FFA000" />
          </linearGradient>
          {/* Inner bright flame gradient */}
          <linearGradient id="innerFlameGradient" x1="100" y1="130" x2="100" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F05A28" />
            <stop offset="100%" stopColor="#FFD54F" />
          </linearGradient>
        </defs>

        {/* 1. Firewood Logs at bottom (y ~ 110 to 140) */}
        <g id="firewood" stroke={light ? '#FAFAF8' : '#111111'} strokeWidth="1.5">
          {/* Back horizontal base support log */}
          <path
            d="M 60 115 L 140 115"
            stroke={light ? '#FAFAF8' : '#111111'}
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Log 1 (angled down-left) */}
          <line x1="85" y1="115" x2="60" y2="126" stroke={light ? '#FAFAF8' : '#111111'} strokeWidth="10" strokeLinecap="round" />
          <circle cx="60" cy="126" r="4.5" fill={light ? '#121212' : '#FAFAF8'} stroke={light ? '#FAFAF8' : '#111111'} strokeWidth="2" />
          <circle cx="60" cy="126" r="1.5" fill={light ? '#FAFAF8' : '#111111'} />

          {/* Log 2 (angled down-left-center) */}
          <line x1="95" y1="115" x2="80" y2="134" stroke={light ? '#FAFAF8' : '#111111'} strokeWidth="10" strokeLinecap="round" />
          <circle cx="80" cy="134" r="4.5" fill={light ? '#121212' : '#FAFAF8'} stroke={light ? '#FAFAF8' : '#111111'} strokeWidth="2" />
          <circle cx="80" cy="134" r="1.5" fill={light ? '#FAFAF8' : '#111111'} />

          {/* Log 3 (angled down-right-center) */}
          <line x1="105" y1="115" x2="120" y2="134" stroke={light ? '#FAFAF8' : '#111111'} strokeWidth="10" strokeLinecap="round" />
          <circle cx="120" cy="134" r="4.5" fill={light ? '#121212' : '#FAFAF8'} stroke={light ? '#FAFAF8' : '#111111'} strokeWidth="2" />
          <circle cx="120" cy="134" r="1.5" fill={light ? '#FAFAF8' : '#111111'} />

          {/* Log 4 (angled down-right) */}
          <line x1="115" y1="115" x2="140" y2="126" stroke={light ? '#FAFAF8' : '#111111'} strokeWidth="10" strokeLinecap="round" />
          <circle cx="140" cy="126" r="4.5" fill={light ? '#121212' : '#FAFAF8'} stroke={light ? '#FAFAF8' : '#111111'} strokeWidth="2" />
          <circle cx="140" cy="126" r="1.5" fill={light ? '#FAFAF8' : '#111111'} />
        </g>

        {/* 2. Traditional Cooking Pot (Hari) - Charcoal Silhouette */}
        <g id="clay-pot" fill={light ? '#FAFAF8' : '#111111'}>
          {/* Lid Loop Handle */}
          <path
            d="M 82 38 C 82 24, 118 24, 118 38"
            stroke={light ? '#FAFAF8' : '#111111'}
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />

          {/* Upper Rim Ring */}
          <rect x="68" y="38" width="64" height="7" rx="3.5" fill={light ? '#FAFAF8' : '#111111'} />

          {/* Lower Rim Ring */}
          <rect x="62" y="48" width="76" height="7" rx="3.5" fill={light ? '#FAFAF8' : '#111111'} />

          {/* Pot Main Bulbous Body */}
          <path
            d="M 68 54 
               C 50 68, 50 102, 76 110 
               C 85 113, 115 113, 124 110 
               C 150 102, 150 68, 132 54 
               Z"
            fill={light ? '#FAFAF8' : '#111111'}
          />

          {/* Left Side Hanging Hoop Handle */}
          <path
            d="M 64 58 C 52 58, 52 78, 63 80"
            stroke={light ? '#FAFAF8' : '#111111'}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Side Hanging Hoop Handle */}
          <path
            d="M 136 58 C 148 58, 148 78, 137 80"
            stroke={light ? '#FAFAF8' : '#111111'}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 3. Glowing Fire Flame in Front of Pot */}
        <g id="flame-front">
          {/* Outer Orange/Red Flame */}
          <path
            d="M 100 66 
               C 83 90, 80 114, 100 120 
               C 120 114, 117 90, 100 66 
               Z"
            fill="url(#flameGradient)"
          />
          {/* Inner Light Orange/Yellow Flame Core */}
          <path
            d="M 100 78 
               C 89 94, 88 112, 100 116 
               C 112 112, 111 94, 100 78 
               Z"
            fill="url(#innerFlameGradient)"
          />
          {/* Tiny center core detail */}
          <path
            d="M 100 88 
               C 94 98, 94 110, 100 112 
               C 106 110, 106 98, 100 88 
               Z"
            fill="#FFF59D"
          />
        </g>
      </svg>

      {/* Typography underneath */}
      <div className="text-center mt-3">
        <h1
          className={`font-sans font-black tracking-[0.12em] text-2xl uppercase ${textColor} leading-none`}
          style={{ letterSpacing: '0.12em', fontWeight: 900 }}
        >
          Padanda
        </h1>
        <p
          className="text-[10px] font-sans font-bold uppercase text-center mt-1.5 leading-none"
          style={{ color: brandOrange, letterSpacing: '0.42em' }}
        >
          Restaurant
        </p>
      </div>
    </div>
  );
}
