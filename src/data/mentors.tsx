import React from 'react';
import { Mentor } from '../types';

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
    avatarStyle: {
      skinTone: '#F3D2BA',
      hairColor: '#27272A',
      hairStyle: 'short_bob', // Slender, short hair, glasses
      glasses: true,
      outfit: 'german_collar_kvis', // Purple German collar shirt with KVIS tag
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
    avatarStyle: {
      skinTone: '#F4D4BC',
      hairColor: '#1E1E24',
      hairStyle: 'long_wavy',
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
    avatarStyle: {
      skinTone: '#ECC3A4',
      hairColor: '#18181B',
      hairStyle: 'stylish_bun',
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

// Vector SVG Avatar Component designed specifically for the 8 STEM Mentors
export const MentorAvatar: React.FC<{
  mentor: Mentor | string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}> = ({ mentor: mentorInput, size = 'md', showBadge = true, className = '' }) => {
  const mentor = typeof mentorInput === 'string' ? getMentor(mentorInput) : mentorInput;
  const { avatarStyle } = mentor;

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  };

  const iconSizes = {
    sm: 'w-3 h-3 text-[9px]',
    md: 'w-4 h-4 text-xs',
    lg: 'w-6 h-6 text-sm',
    xl: 'w-7 h-7 text-base',
  };

  return (
    <div className={`relative inline-block ${sizeClasses[size]} ${className} shrink-0`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full rounded-2xl shadow-md border-2"
        style={{
          borderColor: mentor.accentHex,
          background: 'linear-gradient(145deg, #0F172A, #1E293B)',
        }}
      >
        <defs>
          <linearGradient id={`grad-${mentor.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* Background glow */}
        <circle cx="50" cy="50" r="45" fill={mentor.accentHex} opacity="0.15" />

        {/* Head Base & Neck */}
        <path d="M 43 55 L 43 70 L 57 70 L 57 55 Z" fill={avatarStyle.skinTone} />
        {/* Face shape */}
        <ellipse cx="50" cy="42" rx="20" ry="22" fill={avatarStyle.skinTone} />

        {/* Hair Styles */}
        {mentor.id === 'zainuddin' && (
          // Mr Zainuddin: Thick, abundant well-groomed hair (NO baldness/thinning)
          <path
            d="M 28 38 C 28 20, 72 20, 72 38 C 70 32, 64 24, 50 24 C 36 24, 30 32, 28 38 Z"
            fill="#1E293B"
          />
        )}
        {mentor.id === 'dr_tang' && (
          // Dr Tang: Slender, short neat bob hair
          <path
            d="M 29 44 C 28 22, 72 22, 71 44 C 71 46, 68 30, 50 28 C 32 30, 29 46, 29 44 Z"
            fill="#18181B"
          />
        )}
        {mentor.id === 'phuong_chick' && (
          // Ms Phượng Chick: Elegant wavy black hair
          <path
            d="M 26 48 C 25 18, 75 18, 74 48 C 76 56, 70 42, 65 30 C 50 26, 35 30, 26 48 Z"
            fill="#111827"
          />
        )}
        {mentor.id === 'selena' && (
          // Ms Selena: Gentle side-parted long hair
          <path
            d="M 27 50 C 26 20, 74 20, 73 50 C 70 32, 62 26, 48 26 C 34 26, 28 36, 27 50 Z"
            fill="#27272A"
          />
        )}
        {mentor.id === 'ngoan' && (
          // Ms Ngoan: Stylish creative hair with bun
          <g>
            <circle cx="50" cy="18" r="9" fill="#18181B" />
            <path
              d="M 28 42 C 28 22, 72 22, 72 42 C 68 30, 58 26, 50 26 C 42 26, 32 30, 28 42 Z"
              fill="#18181B"
            />
          </g>
        )}
        {(mentor.id === 'hero' || mentor.id === 'dimark' || mentor.id === 'tuan_rich') && (
          // Male teachers: neatly trimmed, thick professional hair
          <path
            d="M 29 36 C 29 20, 71 20, 71 36 C 68 28, 60 24, 50 24 C 40 24, 32 28, 29 36 Z"
            fill="#1F2937"
          />
        )}

        {/* Eyes & Brows */}
        <circle cx="43" cy="42" r="2.2" fill="#1E293B" />
        <circle cx="57" cy="42" r="2.2" fill="#1E293B" />
        {/* Smile */}
        <path d="M 45 49 Q 50 53 55 49" stroke="#7C2D12" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Glasses for Zainuddin, Dr Tang, Ms Phượng Chick */}
        {avatarStyle.glasses && (
          <g stroke="#38BDF8" strokeWidth="1.6" fill="rgba(56, 189, 248, 0.15)">
            <rect x="36" y="37" width="13" height="10" rx="3" />
            <rect x="51" y="37" width="13" height="10" rx="3" />
            <line x1="49" y1="42" x2="51" y2="42" stroke="#38BDF8" strokeWidth="1.5" />
          </g>
        )}

        {/* Outfits */}
        {mentor.id === 'zainuddin' && (
          // Mr Zainuddin: Tucked-in shirt + MANDATORY TIE
          <g>
            <path d="M 20 100 L 25 72 L 43 68 L 50 75 L 57 68 L 75 72 L 80 100 Z" fill="#F8FAFC" />
            {/* Collar */}
            <path d="M 43 68 L 50 76 L 38 72 Z" fill="#E2E8F0" />
            <path d="M 57 68 L 50 76 L 62 72 Z" fill="#E2E8F0" />
            {/* Professional Orange Tie */}
            <path d="M 48 74 L 52 74 L 54 88 L 50 94 L 46 88 Z" fill="#EA580C" />
            {/* Belt line for tucked-in look */}
            <line x1="20" y1="96" x2="80" y2="96" stroke="#0F172A" strokeWidth="4" />
          </g>
        )}

        {mentor.id === 'dr_tang' && (
          // Dr Tang: Slender, Purple German-collar shirt with KVIS tag
          <g>
            <path d="M 24 100 L 28 72 L 42 68 L 50 74 L 58 68 L 72 72 L 76 100 Z" fill="#6B21A8" />
            {/* German high stand collar */}
            <path d="M 42 66 L 50 73 L 39 70 Z" fill="#581C87" />
            <path d="M 58 66 L 50 73 L 61 70 Z" fill="#581C87" />
            {/* KVIS Chest Tag */}
            <rect x="58" y="77" width="16" height="8" rx="1.5" fill="#FFFFFF" stroke="#3B0764" strokeWidth="0.8" />
            <text x="66" y="83" fill="#6B21A8" fontSize="4.5" fontWeight="bold" textAnchor="middle">
              KVIS
            </text>
          </g>
        )}

        {mentor.id === 'phuong_chick' && (
          // Ms Phượng Chick: Elegant Red Vietnamese Áo Dài
          <g>
            <path d="M 24 100 L 27 72 L 42 68 L 50 73 L 58 68 L 73 72 L 76 100 Z" fill="#DC2626" />
            {/* Traditional high collar */}
            <path d="M 44 64 L 56 64 L 55 69 L 45 69 Z" fill="#B91C1C" />
            {/* Gold Áo Dài embroidery accent */}
            <path d="M 50 73 Q 56 82 58 98" stroke="#FBBF24" strokeWidth="1.2" fill="none" />
            <circle cx="53" cy="77" r="1.2" fill="#FBBF24" />
          </g>
        )}

        {mentor.id === 'selena' && (
          // Ms Selena: Elegant Purple Vietnamese Áo Dài
          <g>
            <path d="M 24 100 L 27 72 L 42 68 L 50 73 L 58 68 L 73 72 L 76 100 Z" fill="#8B5CF6" />
            <path d="M 44 64 L 56 64 L 55 69 L 45 69 Z" fill="#7C3AED" />
            <path d="M 50 73 Q 44 82 42 98" stroke="#A78BFA" strokeWidth="1.2" fill="none" />
            {/* Leaf motif */}
            <circle cx="46" cy="78" r="1.2" fill="#34D399" />
          </g>
        )}

        {mentor.id === 'ngoan' && (
          // Ms Ngoan: Elegant Blue Vietnamese Áo Dài
          <g>
            <path d="M 24 100 L 27 72 L 42 68 L 50 73 L 58 68 L 73 72 L 76 100 Z" fill="#2563EB" />
            <path d="M 44 64 L 56 64 L 55 69 L 45 69 Z" fill="#1D4ED8" />
            <path d="M 50 73 Q 54 84 56 98" stroke="#60A5FA" strokeWidth="1.2" fill="none" />
            <circle cx="53" cy="79" r="1.2" fill="#FCD34D" />
          </g>
        )}

        {(mentor.id === 'hero' || mentor.id === 'dimark' || mentor.id === 'tuan_rich') && (
          // Male teachers: Tucked-in smart shirt (crisp, professional teacher look)
          <g>
            <path
              d="M 22 100 L 26 72 L 42 68 L 50 75 L 58 68 L 74 72 L 78 100 Z"
              fill={mentor.id === 'hero' ? '#FEE2E2' : mentor.id === 'dimark' ? '#E0F2FE' : '#F3E8FF'}
            />
            {/* Crisp collar */}
            <path d="M 42 68 L 50 76 L 37 72 Z" fill="#94A3B8" />
            <path d="M 58 68 L 50 76 L 63 72 Z" fill="#94A3B8" />
            {/* Buttons */}
            <circle cx="50" cy="80" r="1" fill="#334155" />
            <circle cx="50" cy="88" r="1" fill="#334155" />
            {/* Belt line for tucked-in look */}
            <line x1="20" y1="96" x2="80" y2="96" stroke="#1E293B" strokeWidth="3.5" />
          </g>
        )}
      </svg>

      {/* Floating Role/Domain Icon Badge */}
      {showBadge && (
        <div
          className={`absolute -bottom-1 -right-1 rounded-full flex items-center justify-center font-bold shadow-md border-2 border-slate-900 ${iconSizes[size]}`}
          style={{ backgroundColor: mentor.accentHex, color: '#FFFFFF' }}
          title={mentor.expertise}
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
