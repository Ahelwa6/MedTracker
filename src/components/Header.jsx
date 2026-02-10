import { Pill, Home, Calendar, AlertCircle, User, ListChecks } from 'lucide-react';

const Header = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'interactions', label: 'Interactions', icon: AlertCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];
  
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-sage-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2.5 rounded-xl shadow-md">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 font-display">MedTrack</h1>
              <p className="text-xs text-sage-600">Smart Medication Management</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700 font-medium' 
                      : 'text-sage-600 hover:bg-sage-50 hover:text-sage-800'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
          
          {/* Mobile menu - simplified */}
          <div className="md:hidden">
            <button className="p-2 text-sage-600">
              <ListChecks className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
