import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ onSearch, placeholder = "Search...", className = '' }) => {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <motion.div
      animate={{ 
        borderColor: focused ? '#25D366' : '#e2e8f0',
        boxShadow: focused ? '0 0 0 3px rgba(37, 211, 102, 0.1)' : 'none'
      }}
      className={`relative flex items-center bg-white border rounded-lg transition-all duration-200 ${className}`}
    >
      <div className="pl-3 pr-2">
        <ApperIcon name="Search" size={20} className="text-surface-400" />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 py-2.5 pr-3 bg-transparent border-none outline-none text-surface-900 placeholder-surface-500"
      />
      
      {query && (
        <button
          onClick={handleClear}
          className="p-2 text-surface-400 hover:text-surface-600 transition-colors"
        >
          <ApperIcon name="X" size={16} />
        </button>
      )}
    </motion.div>
  )
}

export default SearchBar