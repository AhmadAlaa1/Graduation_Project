import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FilePlus, FileText, LogOut, Sparkles } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { logout, selectUser } from '../../store/slices/authSlice'
import { useTranslation } from "react-i18next";
import toast from 'react-hot-toast'

export default function AppLayout() {
  const dispatch  = useDispatch()
  const user      = useSelector(selectUser)
  const navigate  = useNavigate()
  const { t } = useTranslation();

  const navItems = [
    { to: '/dashboard',       icon: LayoutDashboard, label: t('navbar.links.home') },
    { to: '/cv-builder/new',  icon: FilePlus,        label: t('dashboard.btn_new_cv') },
  ]

  const handleLogout = () => {
    dispatch(logout())
    toast.success(t('navbar.logout_success_text'))
    navigate('/login')
  }

  return (
    <div className="cvb-app">

      {/* Sidebar */}
      <aside className="cvb-sidebar">

        {/* Logo */}
        <div className="cvb-sidebar-logo">
          <div className="cvb-sidebar-logo-row">
            <div className="cvb-sidebar-logo-icon">
              <FileText size={16} color="#fff" />
            </div>
            <span className="cvb-sidebar-logo-text">
              {t('navbar.brand')}
            </span>
          </div>
          <div className="cvb-sidebar-ats-badge">
            <Sparkles size={11} style={{ color: 'var(--primary)' }} />
            {t('nav_pills.how_steps.ai_analysis.title')}
          </div>
        </div>

        {/* Nav */}
        <nav className="cvb-sidebar-nav">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `cvb-nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User footer */}
        <div className="cvb-sidebar-footer">
          <div className="cvb-user-row">
            <div className="cvb-avatar">
              {user?.fullName?.[0]?.toUpperCase() || user?.firstName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="cvb-user-name">{user?.fullName || user?.firstName}</div>
              <div className="cvb-user-email">{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="cvb-nav-link danger" style={{ width: '100%' }}>
            <LogOut size={15} />
            {t('navbar.logout')}
          </button>
        </div>

      </aside>

      {/* Main */}
      <main className="cvb-main">
        <Outlet />
      </main>

    </div>
  )
}