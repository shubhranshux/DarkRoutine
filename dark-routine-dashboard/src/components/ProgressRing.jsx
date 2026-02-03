import { motion } from 'framer-motion';

export function ProgressRing({
  percentage,
  size = 80,
  strokeWidth = 6,
  showPercentage = true,
  glowOnComplete = true,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  const isComplete = percentage === 100;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="progress-ring"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          className="stroke-secondary"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        
        {/* Progress circle */}
        <motion.circle
          className={isComplete && glowOnComplete ? 'stroke-primary drop-shadow-glow' : 'stroke-primary'}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{
            strokeDasharray: circumference,
            filter: isComplete && glowOnComplete ? 'drop-shadow(0 0 8px hsl(var(--primary) / 0.6))' : 'none',
          }}
        />
      </svg>
      
      {showPercentage && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <span className={`text-sm font-semibold ${isComplete ? 'text-primary' : 'text-foreground'}`}>
            {percentage}%
          </span>
        </motion.div>
      )}
    </div>
  );
}
