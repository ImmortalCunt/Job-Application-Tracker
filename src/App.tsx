import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { Navbar } from './components/Layout/Navbar';
import { Dashboard } from './components/Pages/Dashboard';
import { Applications } from './components/Pages/Applications';
import { Contacts } from './components/Pages/Contacts';
import { Documents } from './components/Pages/Documents';
import { Resources } from './components/Pages/Resources';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'applications':
        return <Applications />;
      case 'contacts':
        return <Contacts />;
      case 'documents':
        return <Documents />;
      case 'resources':
        return <Resources />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderPage()}
        </main>

        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-300 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;