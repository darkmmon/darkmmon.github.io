import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export default function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`border border-slate-100 rounded-lg bg-white shadow-sm p-4 ${className}`} {...props}>
      {children}
    </div>
  )
}
