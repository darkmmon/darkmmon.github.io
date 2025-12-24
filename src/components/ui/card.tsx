import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export default function Card({
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-lg dark:bg-gray-700 bg-gray-300 shadow-sm p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
