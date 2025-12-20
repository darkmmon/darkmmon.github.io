import React from 'react'

type ContainerProps = React.HTMLAttributes<HTMLDivElement>

export default function Container({ className = '', children, ...props }: ContainerProps) {
  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </div>
  )
}
