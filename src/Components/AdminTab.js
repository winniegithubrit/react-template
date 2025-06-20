import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faTools, 
  faShirt, 
  faMessage,
  faInfoCircle,
  faImage,
  faBox,
  faUser,
  faChevronDown,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';
import './AdminTab.css'

const AdminTab = () => {
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const { navbarBg, themeColors, handleThemeChange, getNavbarStyle } = useTheme();
  
  return (
    <nav className={`navbar navbar-expand navbar-dark ${navbarBg} px-3`} style={getNavbarStyle()}>
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          {/* UPDATED: navbar-brand now has typography styles in CSS */}
          <span className="navbar-brand me-4">H-ui.admin v3.1</span>
          <div 
            className="dropdown me-3" 
            onMouseEnter={() => setShowNewDropdown(true)}
            onMouseLeave={() => setShowNewDropdown(false)}
          >
            {/* UPDATED: Added btn-text class for typography */}
            <button className="btn btn-link text-white d-flex align-items-center btn-text">
              <FontAwesomeIcon icon={faPlus} className="me-1" />
              New
              <FontAwesomeIcon icon={faChevronDown} className="ms-1" style={{ fontSize: '0.75rem' }} />
            </button>
            <ul 
              className="dropdown-menu" 
              style={{ 
                display: showNewDropdown ? 'block' : 'none',
                minWidth: '200px'
              }}
            >
              <li>
                {/* UPDATED: dropdown-item now has typography styles in CSS */}
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                  Information
                </a>
              </li>
              <li>
                {/* UPDATED: dropdown-item now has typography styles in CSS */}
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon icon={faImage} className="me-2" />
                  Pictures
                </a>
              </li>
              <li>
                {/* UPDATED: dropdown-item now has typography styles in CSS */}
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon icon={faBox} className="me-2" />
                  Products
                </a>
              </li>
              <li>
                {/* UPDATED: dropdown-item now has typography styles in CSS */}
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  User
                </a>
              </li>
            </ul>
          </div>

          {/* UPDATED: Added btn-text class for typography */}
          <button className="btn btn-link text-white me-3 btn-text">
            <FontAwesomeIcon icon={faTools} />
          </button>
        </div>
        <div className="d-flex align-items-center gap-4">
          {/* UPDATED: Added secondary-text class for typography */}
          <span className="text-white secondary-text">Super Administrator</span>
          <div 
            className="dropdown"
            onMouseEnter={() => setShowAdminDropdown(true)}
            onMouseLeave={() => setShowAdminDropdown(false)}
          >
            {/* UPDATED: Added btn-text class for typography */}
            <button className="btn btn-link text-white btn-text">
              admin
              <FontAwesomeIcon icon={faChevronDown} className="ms-1" style={{ fontSize: '0.75rem' }} />
            </button>
            <ul 
              className="dropdown-menu dropdown-menu-end" 
              style={{ 
                display: showAdminDropdown ? 'block' : 'none',
                minWidth: '150px'
              }}
            >
              <li>
                {/* UPDATED: dropdown-item now has typography styles in CSS */}
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Profile
                </a>
              </li>
              <li>
                {/* UPDATED: dropdown-item now has typography styles in CSS */}
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon icon={faCog} className="me-2" />
                  Settings
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                {/* UPDATED: dropdown-item now has typography styles in CSS */}
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
          {/* UPDATED: Added btn-text class for typography */}
          <button className="btn btn-link text-white position-relative btn-text">
            <FontAwesomeIcon icon={faMessage} />
            {/* UPDATED: Added badge-text class for typography */}
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger badge-text">
              3
            </span>
          </button>
          <div 
            className="dropdown"
            onMouseEnter={() => setShowThemeDropdown(true)}
            onMouseLeave={() => setShowThemeDropdown(false)}
          >
            {/* UPDATED: Added btn-text class for typography */}
            <button className="btn btn-link text-white btn-text">
              <FontAwesomeIcon icon={faShirt} />
            </button>
            <ul 
              className="dropdown-menu" 
              style={{ 
                display: showThemeDropdown ? 'block' : 'none',
                minWidth: '180px',
                maxHeight: '300px',
                overflowY: 'auto',
                right: '0px',
                left: 'auto',
                transform: 'translateX(-5px)'
              }}
            >
              {themeColors.map((theme, index) => (
                <li key={index}>
                  {/* UPDATED: dropdown-item now has typography styles in CSS */}
                  <button 
                    className="dropdown-item d-flex align-items-center"
                    onClick={() => {
                      handleThemeChange(theme);
                      setShowThemeDropdown(false);
                    }}
                  >
                    <div 
                      className="me-2 rounded"
                      style={{ 
                        width: '16px', 
                        height: '16px', 
                        backgroundColor: theme.color,
                        border: '1px solid #ccc'
                      }}
                    ></div>
                    {theme.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminTab;