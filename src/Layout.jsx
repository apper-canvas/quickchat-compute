import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import routes from '@/config/routes'

const Layout = () => {
  const location = useLocation()
  const isDetailView = location.pathname.includes('/chat/') || location.pathname.includes('/status/')
  
  const navigationRoutes = routes.filter(route => !route.hideInNav)

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex-shrink-0 h-16 bg-secondary text-white flex items-center justify-between px-4 z-40">
        <h1 className="text-xl font-semibold">QuickChat</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ApperIcon name="Search" size={20} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ApperIcon name="MoreVertical" size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Bottom Navigation - Hide on detail views */}
      {!isDetailView && (
        <nav className="flex-shrink-0 bg-white border-t border-surface-200 flex items-center justify-around py-2 z-40">
          {navigationRoutes.map(route => (
            <NavLink
              key={route.id}
              to={route.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-surface-500 hover:text-surface-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ApperIcon 
                      name={route.icon} 
                      size={24}
                      className={isActive ? 'text-primary' : 'text-surface-500'}
                    />
                  </motion.div>
                  <span className={`text-xs font-medium ${
                    isActive ? 'text-primary' : 'text-surface-500'
                  }`}>
                    {route.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}

export default Layout