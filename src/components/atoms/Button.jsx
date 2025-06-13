import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-sm",
    secondary: "bg-surface-100 text-surface-700 hover:bg-surface-200 border border-surface-200",
    ghost: "text-surface-600 hover:bg-surface-100",
    danger: "bg-error text-white hover:bg-error/90"
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "p-2"
  }
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : ""
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button