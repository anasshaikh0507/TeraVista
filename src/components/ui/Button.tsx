import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'teal' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-xl gap-2 font-medium',
    lg: 'text-base px-7 py-3.5 rounded-xl gap-2.5 font-semibold tracking-wide'
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:shadow-[0_0_28px_rgba(249,115,22,0.5)] hover:brightness-110 active:scale-[0.98] border border-orange-400/30',
    secondary:
      'bg-slate-900/80 text-slate-100 border border-slate-700/60 hover:bg-slate-800/90 hover:border-slate-600 shadow-sm active:scale-[0.98]',
    teal:
      'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-[0_0_20px_rgba(20,184,166,0.35)] hover:shadow-[0_0_28px_rgba(20,184,166,0.5)] hover:brightness-110 active:scale-[0.98] border border-cyan-400/30',
    ghost:
      'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/50 active:scale-[0.98]',
    outline:
      'bg-transparent text-cyan-300 border border-cyan-500/30 hover:bg-cyan-950/30 hover:border-cyan-400/50 active:scale-[0.98]'
  };

  const baseClasses =
    'inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none';

  const content = (
    <>
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
