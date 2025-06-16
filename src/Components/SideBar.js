import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInfoCircle,
  faImage,
  faBox,
  faComment,
  faUsers,
  faUserShield,
  faChartBar,
  faCog,
  faBars,
  faChevronLeft,
  faChevronDown,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';
import './SideBar.css';
const Sidebar = ({ addTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme } = useTheme();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) setOpenDropdown(null);
  };
  const toggleDropdown = (menuText) => {
    setOpenDropdown(openDropdown === menuText ? null : menuText);
  };
  const handleNavigation = (path, text) => {
    if (path && addTab) {
      const tabId = path; 
      addTab(tabId, text, path);
      navigate(path);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isParentActive = (subItems) => {
    return subItems?.some(subItem => location.pathname === subItem.path);
  };
  const getTextColor = () => {
    return currentTheme.color;
  };
  const getIconColor = () => {
    return currentTheme.color;
  };

  const menuItems = [
    {
      icon: faInfoCircle,
      text: 'Information Management',
      path: '/information'
    },
    {
      icon: faImage,
      text: 'Image Management',
      path: '/images'
    },
    {
      icon: faBox,
      text: 'Product Management',
      path: '/products',
      subItems: [
        { text: 'Category Management', path: '/products/category' },
        { text: 'Brand Management', path: '/products/brand' }
      ]
    },
    {
      icon: faComment,
      text: 'Comment management',
      path: '/comments'
    },
    {
      icon: faUsers,
      text: 'Membership Management',
      path: '/members'
    },
    {
      icon: faUserShield,
      text: 'Administrator management',
      path: '/administrators'
    },
    {
      icon: faChartBar,
      text: 'System Statistics',
      path: '/statistics'
    },
    {
      icon: faCog,
      text: 'System Management',
      path: '/settings'
    }
  ];

  return (
    <div className={`d-flex flex-column bg-light border-end position-relative sidebar-container ${
      isCollapsed ? 'collapsed' : ''
    }`}
    >
      <button
        onClick={toggleSidebar}
        className={`btn btn-light border-0 position-absolute toggle-btn ${
          isCollapsed ? 'collapsed' : ''
        }`}
      >
        <FontAwesomeIcon 
          icon={isCollapsed ? faBars : faChevronLeft} 
          className="text-secondary"
          style={{ fontSize: '14px' }}
        />
      </button>

      <div className="p-3 nav-content">
        <nav className="nav flex-column">
          {menuItems.map((item, index) => (
            <div key={index} className="position-relative">
              {item.subItems ? (
                <>
                  <div
                    className={`nav-link-custom nav-link d-flex align-items-center py-2 px-3 mb-1 cursor-pointer ${
                      isCollapsed ? 'justify-content-center' : 'justify-content-start'
                    } ${isParentActive(item.subItems) ? 'active' : ''}`}
                    onClick={() => toggleDropdown(item.text)}
                    style={{ color: getTextColor() }}
                  >
                    <FontAwesomeIcon 
                      icon={item.icon} 
                      className={isCollapsed ? '' : 'me-3'} 
                      style={{ 
                        width: '16px', 
                        color: getIconColor(), 
                        minWidth: '16px' 
                      }} 
                    />
                    {!isCollapsed && (
                      <>
                        <span>{item.text}</span>
                        <FontAwesomeIcon 
                          icon={openDropdown === item.text ? faChevronDown : faChevronRight}
                          className="ms-auto"
                          style={{ width: '12px', color: getIconColor() }}
                        />
                      </>
                    )}
                  </div>

                  {!isCollapsed && openDropdown === item.text && (
                    <div className="submenu ps-4">
                      {item.subItems.map((subItem, subIndex) => (
                        <div
                          key={subIndex}
                          className={`nav-link-custom nav-link d-flex align-items-center py-2 px-3 mb-1 cursor-pointer ${
                            isActive(subItem.path) ? 'active' : ''
                          }`}
                          onClick={() => handleNavigation(subItem.path, subItem.text)}
                          style={{ color: getTextColor() }}
                        >
                          <span style={{ marginLeft: '28px' }}>{subItem.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div
                  className={`nav-link-custom nav-link d-flex align-items-center py-2 px-3 mb-1 cursor-pointer ${
                    isCollapsed ? 'justify-content-center' : 'justify-content-start'
                  } ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path, item.text)}
                  style={{ color: getTextColor() }}
                >
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    className={isCollapsed ? '' : 'me-3'} 
                    style={{ 
                      width: '16px', 
                      color: getIconColor(), 
                      minWidth: '16px' 
                    }} 
                  />
                  {!isCollapsed && <span>{item.text}</span>}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;