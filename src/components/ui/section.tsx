import React from 'react'

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  title?: string
}

export default function Section({ title, className = '', children, ...props }: SectionProps) {
  return (
    <section className={`my-8 ${className}`} {...props}>
      {title && <h2 className="text-2xl font-semibold mb-3">{title}</h2>}
      {children}
    </section>
  )
}
