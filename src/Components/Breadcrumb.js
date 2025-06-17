import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';
import './Breadcrumb.css';

const Breadcrumb = ({ currentPath }) => {
  const { currentTheme } = useTheme();
  const breadcrumbMap = {
    '/': [{ label: 'Home', path: '/', icon: faHome }],
    '/information': [
      { label: 'Home', path: '/', icon: faHome },
      { label: 'Information Management', path: '/information' }
    ],
    '/images': [
      { label: 'Home', path: '/', icon: faHome },
      { label: 'Image Management', path: '/images' }
    ],
    '/products': [
      { label: 'Home', path: '/', icon: faHome },
      { label: 'Product Management', path: '/products' }
    ],
    '/products/category': [
      { label: 'Home', path: '/', icon: faHome },
      { label: 'Product Management', path: '/products' },
      { label: 'Category Management', path: '/products/category' }
    ],
    '/products/brand': [
      { label: 'Home', path: '/', icon: faHome },
      { label: 'Product Management', path: '/products' },
      { label: 'Brand Management', path: '/products/brand' }
    ],
    '/comments': [
      { label: 'Home', path: '/', icon: faHome },
      { label: 'Comment Management', path: '/comments' }
    ],
    '/members': [
      { label: 'Home', path: '/', icon: faHome },
      { label: 'Membership Management', path: '/members' }
    ],
    '/administrators': [
      { label: 'Home', path: '/', icon: faHome },
      { label: 'Administrator Management', path: '/administrators' }
    ],
    '/statistics': [
      { label: 'Home', path: '/', icon: faHome },
      { label: 'System Statistics', path: '/statistics' }
    ],
    '/settings': [
      { label: 'Home', path: '/', icon: faHome },
      { label: 'System Management', path: '/settings' }
    ]
  };
  const breadcrumbItems = breadcrumbMap[currentPath] || breadcrumbMap['/'];
  const getTextColor = () => {
    return currentTheme?.color || '#000000';
  };
  const getIconColor = () => {
    return currentTheme?.color || '#000000';
  };

  return (
    <div className="breadcrumb-container">
      <nav aria-label="breadcrumb">
        <div className="custom-breadcrumb">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <React.Fragment key={index}>
                <span
                  className={`breadcrumb-item-custom ${isLast ? 'active' : ''}`}
                  style={{ color: getTextColor() }}
                >
                  {index === 0 && item.icon && (
                    <FontAwesomeIcon 
                      icon={item.icon} 
                      className="me-1" 
                      style={{ color: getIconColor() }}
                    />
                  )}
                  {item.label}
                </span>
                {!isLast && (
                  <FontAwesomeIcon 
                    icon={faChevronRight} 
                    className="breadcrumb-separator"
                    style={{ color: getIconColor() }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Breadcrumb;