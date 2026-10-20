import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'teal' | 'orange' | 'outline' | 'pulse';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium'
  };

  const variantClasses = {
    default: 'bg-slate-800/80 text-slate-200 border border-slate-700/50',
    teal: 'bg-teal-950/70 text-cyan-300 border border-teal-500/30 shadow-[0_0_12px_rgba(20,184,166,0.15)]',
    orange: 'bg-orange-950/70 text-orange-300 border border-orange-500/30 shadow-[0_0_12px_rgba(249,115,22,0.15)]',
    outline: 'bg-transparent text-slate-300 border border-slate-700/70',
    pulse: 'bg-teal-950/80 text-teal-300 border border-teal-500/40 relative'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full tracking-wide transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {variant === 'pulse' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
        </span>
      )}
      {children}
    </span>
  );
}
