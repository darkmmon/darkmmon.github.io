import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost'
}

export default function Button({ variant = 'default', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants: Record<string, string> = {
    default: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-400',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
