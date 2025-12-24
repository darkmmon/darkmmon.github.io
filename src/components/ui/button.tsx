import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost' | 'outline';
};

export default function Button({
  variant = 'default',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-1';
  const variants: Record<string, string> = {
    default: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-400',
    ghost: 'bg-transparent text-gray-100 hover:bg-gray-700',
    outline:
      'bg-transparent hover:bg-blue-300 text-gray-100 font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
