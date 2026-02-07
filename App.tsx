
import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import SitesOverview from './views/SitesOverview';
import SiteDetail from './views/SiteDetail';
import Login from './views/Login';

const App: React.FC = () => {
  // Theme state with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('nexus-theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Primary color state with localStorage persistence
  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('nexus-primary-color') || 'indigo';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ADMIN);
  const [currentView, setCurrentView] = useState<'overview' | 'detail'>('overview');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  useEffect(() => {
    // Apply theme class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nexus-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nexus-theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Persist primary color choice
    localStorage.setItem('nexus-primary-color', primaryColor);
    
    // In a real Tailwind setup with dynamic colors, we might inject a style tag 
    // or use Tailwind's configuration. Here we can use standard Tailwind classes 
    // but the state is ready for deeper integration if the framework allowed.
  }, [primaryColor]);

  if (!isAuthenticated) {
    return (
      <Login 
        onLogin={(role) => {
          setUserRole(role);
          setIsAuthenticated(true);
        }} 
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
    );
  }

  const handleSelectSite = (id: string) => {
    setSelectedSiteId(id);
    setCurrentView('detail');
  };

  const handleBackToOverview = () => {
    setSelectedSiteId(null);
    setCurrentView('overview');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0d0d12] overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        onNavigate={(view) => {
          if (view === 'overview') handleBackToOverview();
        }}
        userRole={userRole}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav 
          isDarkMode={isDarkMode} 
          toggleTheme={() => setIsDarkMode(!isDarkMode)}
          userRole={userRole}
          onLogout={() => setIsAuthenticated(false)}
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {currentView === 'overview' ? (
            <SitesOverview onSelectSite={handleSelectSite} userRole={userRole} />
          ) : (
            selectedSiteId && (
              <SiteDetail 
                siteId={selectedSiteId} 
                userRole={userRole}
                onBack={handleBackToOverview} 
              />
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default App;