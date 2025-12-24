import React from 'react';

type BadgeProps = React.HTMLAttributes<HTMLParagraphElement>;

export default function Text({
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <p className={`dark:text-white text-gray-700 ${className}`} {...props}>
      {children}
    </p>
  );
}
