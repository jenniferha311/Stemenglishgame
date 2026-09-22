import React, { useState } from 'react';
import { Mentor } from '../types';

import avatarZainuddin from '../assets/images/avatar_zainuddin_1790074470008.jpg';
import avatarHero from '../assets/images/avatar_hero_1790074502534.jpg';
import avatarDimark from '../assets/images/avatar_dimark_noglasses_1790084940550.jpg';
import avatarTuanRich from '../assets/images/avatar_tuan_rich_1790074537705.jpg';
import avatarDrTang from '../assets/images/avatar_dr_tang_shirt_1790084953167.jpg';
import avatarPhuongChick from '../assets/images/avatar_phuong_shoulder_length_1790085956876.jpg';
import avatarSelena from '../assets/images/avatar_selena_1790074551623.jpg';
import avatarNgoan from '../assets/images/avatar_ngoan_short_hair_1790085121431.jpg';

export const STEM_MENTORS: Mentor[] = [
  {
    id: 'zainuddin',
    name: 'Mr Zainuddin',
    gender: 'male',
    expertise: 'Engineering & Systems Thinking',
    role: 'Lead Systems Analyst & Engineering Evaluator',
    color: 'orange',
    accentHex: '#EA580C',
    symbol: 'gear',
    avatarUrl: avatarZainuddin,
    avatarStyle: {
      skinTone: '#B2764B', // Slightly tanned Malaysian skin tone
      hairColor: '#1F2937',
      hairStyle: 'thick_groomed', // Thick, well-groomed hair (never bald)
      glasses: true,
      outfit: 'shirt_and_tie', // Professional tucked-in shirt with mandatory tie
      outfitColor: '#EA580C',
      hasTie: true,
    },
    quote: 'Systemic failures can be resolved when components are rigorously tested in sequence.',
  },
  {
    id: 'hero',
    name: 'Mr Hero',
    gender: 'male',
    expertise: 'Physics & Problem Solving',
    role: 'Lead Energy Dynamics & Physical Motion Advisor',
    color: 'red',
    accentHex: '#DC2626',
    symbol: 'lightning',
    avatarUrl: avatarHero,
    avatarStyle: {
      skinTone: '#E5B895',
      hairColor: '#2B2B2B',
      hairStyle: 'neat_short',
      glasses: false,
      outfit: 'tucked_shirt',
      outfitColor: '#DC2626',
      hasTie: false,
    },
    quote: 'Energy can neither be created nor destroyed—only channeled with precision!',
  },
  {
    id: 'dimark',
    name: 'Mr Dimark',
    gender: 'male',
    expertise: 'Technology & Coding',
    role: 'Lead Algorithm Engineer & Logic Architect',
    color: 'cyan',
    accentHex: '#0891B2',
    symbol: 'chip',
    avatarUrl: avatarDimark,
    avatarStyle: {
      skinTone: '#ECC2A2',
      hairColor: '#1E293B',
      hairStyle: 'modern_trim',
      glasses: false,
      outfit: 'tucked_shirt',
      outfitColor: '#0891B2',
      hasTie: false,
    },
    quote: 'An algorithm without testing is just an assumption. Let us debug step by step.',
  },
  {
    id: 'tuan_rich',
    name: 'Mr Tuấn Rich',
    gender: 'male',
    expertise: 'Mathematics & Data',
    role: 'Lead Quantitative Analyst & Model Verifier',
    color: 'purple',
    accentHex: '#9333EA',
    symbol: 'graph',
    avatarUrl: avatarTuanRich,
    avatarStyle: {
      skinTone: '#E8C19D',
      hairColor: '#1C1917',
      hairStyle: 'side_part',
      glasses: false,
      outfit: 'tucked_shirt',
      outfitColor: '#9333EA',
      hasTie: false,
    },
    quote: 'Numbers do not lie when your statistical formula is built on verifiable evidence.',
  },
  {
    id: 'dr_tang',
    name: 'Dr Tang',
    gender: 'female',
    expertise: 'Chemistry & Scientific Method',
    role: 'Lead Chemical Scientist & Lab Safety Director',
    color: 'purple',
    accentHex: '#7E22CE',
    symbol: 'flask',
    avatarUrl: avatarDrTang,
    avatarStyle: {
      skinTone: '#F3D2BA',
      hairColor: '#27272A',
      hairStyle: 'short_bob', // Slender, short hair, glasses
      glasses: true,
      outfit: 'german_collar_kvis', // Purple German collar shirt with KVIS tag (not Ao Dai)
      outfitColor: '#6B21A8',
      hasTie: false,
      tag: 'KVIS',
    },
    quote: 'Formulate your hypothesis, control your variables, and maintain safety protocols.',
  },
  {
    id: 'phuong_chick',
    name: 'Ms Phượng Chick',
    gender: 'female',
    expertise: 'English, Pronunciation & STEM Communication',
    role: 'Lead Global Communicator & Phonetics Specialist',
    color: 'red',
    accentHex: '#E11D48',
    symbol: 'mic',
    avatarUrl: avatarPhuongChick,
    avatarStyle: {
      skinTone: '#F4D4BC',
      hairColor: '#1E1E24',
      hairStyle: 'shoulder_length_straight', // Straight hair touching shoulders, black square eyeglasses
      glasses: true,
      outfit: 'red_ao_dai', // Red Vietnamese Áo Dài
      outfitColor: '#DC2626',
      hasTie: false,
    },
    quote: 'Speak with precision and passion. Science without clear communication remains locked inside!',
  },
  {
    id: 'selena',
    name: 'Ms Selena',
    gender: 'female',
    expertise: 'Biology & Environment',
    role: 'Lead Ecological Biologist & Sustainability Director',
    color: 'purple',
    accentHex: '#8B5CF6',
    symbol: 'leaf',
    avatarUrl: avatarSelena,
    avatarStyle: {
      skinTone: '#EED0B8',
      hairColor: '#2D283E',
      hairStyle: 'gentle_parted',
      glasses: false,
      outfit: 'purple_ao_dai', // Purple Vietnamese Áo Dài
      outfitColor: '#8B5CF6',
      hasTie: false,
    },
    quote: 'True technological innovation must exist in harmony with natural ecosystems.',
  },
  {
    id: 'ngoan',
    name: 'Ms Ngoan',
    gender: 'female',
    expertise: 'Creative Design & Teamwork',
    role: 'Lead Collaborative Design & Human-Centered Mentor',
    color: 'blue',
    accentHex: '#2563EB',
    symbol: 'lightbulb',
    avatarUrl: avatarNgoan,
    avatarStyle: {
      skinTone: '#ECC3A4',
      hairColor: '#18181B',
      hairStyle: 'short_modern', // Short hair
      glasses: false,
      outfit: 'blue_ao_dai', // Blue Vietnamese Áo Dài
      outfitColor: '#2563EB',
      hasTie: false,
    },
    quote: 'Empathy in design turns a sterile contraption into a life-changing innovation.',
  },
];

export const MENTORS_MAP: { [id: string]: Mentor } = STEM_MENTORS.reduce((acc, m) => {
  acc[m.id] = m;
  acc[m.name] = m;
  return acc;
}, {} as { [id: string]: Mentor });

export function getMentor(nameOrId: string): Mentor {
  return MENTORS_MAP[nameOrId] || STEM_MENTORS[0];
}

// High-Fidelity Animated 3D Portrait Avatar Component
export const MentorAvatar: React.FC<{
  mentor: Mentor | string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showBadge?: boolean;
  className?: string;
  glow?: boolean;
}> = ({ mentor: mentorInput, size = 'md', showBadge = true, className = '', glow = false }) => {
  const [imageError, setImageError] = useState(false);
  const mentor = typeof mentorInput === 'string' ? getMentor(mentorInput) : mentorInput;

  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-11 h-11',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    '2xl': 'w-36 h-36',
  };

  const roundedClasses = {
    xs: 'rounded-xl',
    sm: 'rounded-xl',
    md: 'rounded-2xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    '2xl': 'rounded-3xl',
  };

  const badgeSizes = {
    xs: 'w-3.5 h-3.5 text-[8px]',
    sm: 'w-4 h-4 text-[9px]',
    md: 'w-5 h-5 text-xs',
    lg: 'w-6 h-6 text-sm',
    xl: 'w-8 h-8 text-base',
    '2xl': 'w-9 h-9 text-lg',
  };

  return (
    <div
      className={`relative inline-block ${sizeClasses[size]} ${className} shrink-0 group transition-transform duration-200 hover:scale-105`}
    >
      {/* Outer ambient glow */}
      <div
        className={`absolute -inset-0.5 ${roundedClasses[size]} opacity-60 blur-xs transition-opacity duration-300 group-hover:opacity-100`}
        style={{
          background: `radial-gradient(circle at center, ${mentor.accentHex} 0%, transparent 75%)`,
        }}
      />

      {/* Main Avatar Container */}
      <div
        className={`relative w-full h-full overflow-hidden ${roundedClasses[size]} border-2 bg-slate-900 shadow-xl`}
        style={{
          borderColor: mentor.accentHex,
          boxShadow: glow
            ? `0 0 20px -3px ${mentor.accentHex}88, inset 0 0 10px rgba(0,0,0,0.5)`
            : `0 4px 14px -2px rgba(0,0,0,0.5)`,
        }}
      >
        {mentor.avatarUrl && !imageError ? (
          <img
            src={mentor.avatarUrl}
            alt={mentor.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          // Elegant Fallback if image is unavailable
          <div
            className="w-full h-full flex items-center justify-center font-bold text-white font-mono"
            style={{
              background: `linear-gradient(135deg, #1E293B, ${mentor.accentHex}44)`,
            }}
          >
            <span className="text-sm sm:text-base">
              {mentor.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </span>
          </div>
        )}

        {/* Subtle inner top-lighting gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-white/10 pointer-events-none" />
      </div>

      {/* Floating Domain Symbol Badge */}
      {showBadge && (
        <div
          className={`absolute -bottom-1 -right-1 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-slate-950 z-10 transition-transform duration-200 group-hover:scale-110 ${badgeSizes[size]}`}
          style={{ backgroundColor: mentor.accentHex, color: '#FFFFFF' }}
          title={`${mentor.name} - ${mentor.expertise}`}
        >
          {mentor.symbol === 'gear' && '⚙'}
          {mentor.symbol === 'lightning' && '⚡'}
          {mentor.symbol === 'chip' && '⌥'}
          {mentor.symbol === 'graph' && '📊'}
          {mentor.symbol === 'flask' && '🧪'}
          {mentor.symbol === 'mic' && '🎙'}
          {mentor.symbol === 'leaf' && '🌿'}
          {mentor.symbol === 'lightbulb' && '💡'}
        </div>
      )}
    </div>
  );
};
