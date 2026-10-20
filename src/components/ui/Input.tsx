import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  error?: string;
  label?: string;
}

export function Input({
  icon,
  iconPosition = 'left',
  error,
  label,
  className = '',
  id,
  ...props
}: InputProps) {
  const fallbackId = React.useId();
  const inputId = id || fallbackId;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-slate-900/80 text-slate-100 placeholder-slate-500 text-sm rounded-xl border border-slate-700/60 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all py-2.5 ${
            icon && iconPosition === 'left' ? 'pl-10' : 'pl-4'
          } ${icon && iconPosition === 'right' ? 'pr-10' : 'pr-4'} ${
            error ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20' : ''
          } ${className}`}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3.5 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
    </div>
  );
}
