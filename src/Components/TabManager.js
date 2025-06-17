import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TabManager.css';
import SideBar from './SideBar';
import Breadcrumb from './Breadcrumb';

function TabManager({ children }) {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentTab = tabs.find(tab => tab.path === location.pathname);
    if (currentTab && currentTab.id !== activeTab) {
      setActiveTab(currentTab.id);
      setTabs(tabs.map(tab => ({
        ...tab,
        active: tab.id === currentTab.id
      })));
    }
  }, [location.pathname, tabs, activeTab]);

  const addTab = (tabId, tabTitle, tabPath) => {
    const existingTab = tabs.find(tab => tab.id === tabId);
    
    if (existingTab) {
      setActiveTab(tabId);
      setTabs(tabs.map(tab => ({
        ...tab,
        active: tab.id === tabId
      })));
      navigate(tabPath);
    } else {
      const newTabs = tabs.map(tab => ({ ...tab, active: false }));
      newTabs.push({
        id: tabId,
        title: tabTitle,
        path: tabPath,
        active: true
      });
      setTabs(newTabs);
      setActiveTab(tabId);
      navigate(tabPath);
    }
  };

  const closeTab = (tabId, e) => {
    e.stopPropagation();
    if (tabId === 'dashboard') return;
    
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(updatedTabs);
    
    if (activeTab === tabId) {
      if (updatedTabs.length > 0) {
        const lastTab = updatedTabs[updatedTabs.length - 1];
        setActiveTab(lastTab.id);
        setTabs(updatedTabs.map(tab => ({
          ...tab,
          active: tab.id === lastTab.id
        })));
        navigate(lastTab.path);
      } else {
        setActiveTab('');
        navigate('/');
      }
    }
  };

  const switchTab = (tabId) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setActiveTab(tabId);
      setTabs(tabs.map(tab => ({
        ...tab,
        active: tab.id === tabId
      })));
      navigate(tab.path);
    }
  };

  return (
    <div className='admin-container'>
      <SideBar addTab={addTab} />
      <div className='main-content'>
        <div className='tabbed-interface'>
          <div className='tab-container'>
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`tab ${tab.active ? 'active' : ''}`}
                onClick={() => switchTab(tab.id)}
              >
                <span className='tab-title'>{tab.title}</span>
                {tab.id !== 'dashboard' && (
                  <span
                    className='tab-close'
                    onClick={(e) => closeTab(tab.id, e)}
                  >
                    x
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <Breadcrumb currentPath={location.pathname}/>
        <div className='content-container'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default TabManager;