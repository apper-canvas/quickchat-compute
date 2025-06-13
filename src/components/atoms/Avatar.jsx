import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  status = null, 
  className = '',
  fallbackIcon = 'User'
}) => {
  const [imageError, setImageError] = useState(false)
  
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }
  
  const statusSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5'
  }
  
  const statusColors = {
    online: 'bg-success',
    offline: 'bg-surface-400',
    away: 'bg-warning'
  }

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className={`${sizes[size]} rounded-full object-cover`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={`${sizes[size]} rounded-full bg-surface-200 flex items-center justify-center`}>
          <ApperIcon 
            name={fallbackIcon} 
            size={size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 28}
            className="text-surface-500"
          />
        </div>
      )}
      
      {status && (
        <div 
          className={`absolute -bottom-0.5 -right-0.5 ${statusSizes[size]} ${statusColors[status]} rounded-full border-2 border-white`}
        />
      )}
    </div>
  )
}

export default Avatar