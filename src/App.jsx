import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import MedicationList from './components/MedicationList';
import AddMedication from './components/AddMedication';
import InteractionChecker from './components/InteractionChecker';
import Schedule from './components/Schedule';
import UserProfile from './pages/UserProfile';
import Welcome from './pages/Welcome';
import useMedicationStore from './store/medicationStore';

function App() {
  const [currentView, setCurrentView] = useState('welcome');
  const { medications, userProfile } = useMedicationStore();
  
  // Auto-navigate to dashboard if user has set up profile
  const hasCompletedSetup = userProfile.name && medications.length > 0;
  
  const renderView = () => {
    if (!hasCompletedSetup && currentView !== 'profile' && currentView !== 'welcome') {
      return <Welcome onGetStarted={() => setCurrentView('profile')} />;
    }
    
    switch (currentView) {
      case 'welcome':
        return <Welcome onGetStarted={() => setCurrentView('profile')} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'medications':
        return <MedicationList onNavigate={setCurrentView} />;
      case 'add-medication':
        return <AddMedication onBack={() => setCurrentView('medications')} />;
      case 'interactions':
        return <InteractionChecker />;
      case 'schedule':
        return <Schedule />;
      case 'profile':
        return <UserProfile onSave={() => setCurrentView('medications')} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };
  
  return (
    <div className="min-h-screen">
      {currentView !== 'welcome' && (
        <Header currentView={currentView} onNavigate={setCurrentView} />
      )}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
