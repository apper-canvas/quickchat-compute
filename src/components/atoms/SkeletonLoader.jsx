const SkeletonLoader = ({ className = '', count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gradient-to-r from-surface-200 via-surface-300 to-surface-200 bg-[length:200%_100%] rounded ${className}`}
          style={{
            animation: 'pulse 1.5s ease-in-out infinite, shimmer 2s ease-in-out infinite'
          }}
        />
      ))}
    </>
  )
}

export default SkeletonLoader