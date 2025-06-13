const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'sm',
  className = ''
}) => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-surface-100 text-surface-700',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white'
  }
  
  const sizes = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1 text-sm'
  }
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge