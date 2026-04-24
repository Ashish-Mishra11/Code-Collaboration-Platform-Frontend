import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Code2, LayoutDashboard, FolderGit2, Users, LogOut,
  User, Menu, X, ChevronDown, Terminal, Shield
} from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, isLoggedIn, isAdmin, isDeveloper } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
  };

  const navLinks = isAdmin()
    ? [{ to: '/admin', label: 'Admin Panel', icon: <Shield size={16} /> }]
    : isLoggedIn()
    ? [
        { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
        { to: '/projects', label: 'Projects', icon: <FolderGit2 size={16} /> },
        ...(isDeveloper()
          ? [{ to: '/editor', label: 'Editor', icon: <Terminal size={16} /> }]
          : []
        ),
      ]
    : [];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <span className="navbar-logo-icon"><Code2 size={22} /></span>
          <span className="navbar-logo-text">Code<span className="gradient-text">Sync</span></span>
        </Link>

        {/* Desktop Nav Links */}
        {navLinks.length > 0 && (
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`navbar-link ${isActive(link.to) ? 'active' : ''}`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Right Side */}
        <div className="navbar-right">
          {isLoggedIn() ? (
            <div className="profile-dropdown">
              <button
                className="profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="profile-avatar">
                  {(user?.username || user?.userName || 'U')[0].toUpperCase()}
                </div>
                <span className="profile-name">
                  {user?.username || user?.userName || 'User'}
                </span>
                <ChevronDown size={14} className={profileOpen ? 'rotated' : ''} />
              </button>

              {profileOpen && (
                <div className="dropdown-menu animate-slide-down">
                  <div className="dropdown-header">
                    <p className="dropdown-user">{user?.username || user?.userName}</p>
                    <span className={`badge badge-${isAdmin() ? 'red' : isDeveloper() ? 'primary' : 'secondary'}`}>
                      {isAdmin() ? 'Admin' : isDeveloper() ? 'Developer' : 'User'}
                    </span>
                  </div>
                  <hr className="divider" />
                  {!isAdmin() && (
                    <Link
                      to={`/profile`}
                      className="dropdown-item"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User size={15} /> My Profile
                    </Link>
                  )}
                  <button className="dropdown-item danger" onClick={handleLogout}>
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-auth-btns">
              <Link to="/login" className="btn btn-secondary btn-sm">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu animate-slide-down">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`mobile-link ${isActive(link.to) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.icon} {link.label}
            </Link>
          ))}
          {!isLoggedIn() && (
            <>
              <Link to="/login" className="mobile-link" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/register" className="mobile-link" onClick={() => setMenuOpen(false)}>Get Started</Link>
            </>
          )}
          {isLoggedIn() && (
            <button className="mobile-link danger" onClick={handleLogout}>
              <LogOut size={15} /> Sign Out
            </button>
          )}
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(profileOpen || menuOpen) && (
        <div
          className="overlay-dismiss"
          onClick={() => { setProfileOpen(false); setMenuOpen(false); }}
        />
      )}
    </nav>
  );
}
