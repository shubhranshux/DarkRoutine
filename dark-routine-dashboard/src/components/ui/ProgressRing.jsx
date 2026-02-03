import { motion } from 'framer-motion';

export function ProgressRing({ 
  percentage = 0, 
  size = 50, 
  strokeWidth = 5, 
  className = '' 
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg 
      width={size} 
      height={size} 
      className={`transform -rotate-90 ${className}`}
    >
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        opacity={0.2}
      />
      
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </svg>
  );
}
