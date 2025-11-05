import React from 'react'

export function Button({ children, className = '', variant, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-4 py-2 font-medium transition-colors'
  const variantClass = variant === 'outline' ? 'border border-white bg-transparent' : ''
  return (
    <button className={[base, variantClass, className].join(' ')} {...props}>
      {children}
    </button>
  )
}

export default Button
