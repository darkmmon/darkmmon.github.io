import React from 'react'

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>

export default function Badge({ className = '', children, ...props }: BadgeProps) {
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 ${className}`} {...props}>
      {children}
    </span>
  )
}
