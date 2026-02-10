
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  ShieldAlert, 
  Home, 
  Zap, 
  PhoneCall,
  CreditCard,
  X,
  CheckCircle2,
  WifiOff
} from 'lucide-react';
import { AppView, UserSubscription } from './types';
import Dashboard from './components/Dashboard';
import AlertsList from './components/AlertsList';
import EmergencyPanel from './components/EmergencyPanel';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [showSubModal, setShowSubModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initialize subscription from localStorage if needed
    const savedSub = localStorage.getItem('lanka_alert_sub');
    if (savedSub === 'active') setIsSubscribed(true);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSubscribe = () => {
    setIsSubscribed(true);
    localStorage.setItem('lanka_alert_sub', 'active');
    setTimeout(() => setShowSubModal(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative overflow-hidden">
      {/* Offline Status Bar */}
      {isOffline && (
        <div className="bg-slate-800 text-white text-[10px] py-1 px-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest animate-pulse">
          <WifiOff className="w-3 h-3" />
          Offline Mode - Using Cached Data
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 p-1.5 rounded-lg shadow-md">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">LankaAlert AI</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Sri Lanka Disaster Safety</p>
          </div>
        </div>
        
        {!isSubscribed ? (
          <button 
            onClick={() => setShowSubModal(true)}
            className="text-xs bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full font-bold border border-orange-200 hover:bg-orange-200 transition-colors"
          >
            Activate Rs.20/mo
          </button>
        ) : (
          <div className="bg-green-50 text-green-600 p-1.5 rounded-full">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24">
        {currentView === AppView.DASHBOARD && <Dashboard onNav={setCurrentView} />}
        {currentView === AppView.ALERTS && <AlertsList />}
        {currentView === AppView.EMERGENCY && <EmergencyPanel />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 grid grid-cols-3 py-3 px-2 z-50">
        <NavItem 
          active={currentView === AppView.DASHBOARD} 
          onClick={() => setCurrentView(AppView.DASHBOARD)} 
          icon={<Home className="w-6 h-6" />} 
          label="Home" 
        />
        <NavItem 
          active={currentView === AppView.ALERTS} 
          onClick={() => setCurrentView(AppView.ALERTS)} 
          icon={<Bell className="w-6 h-6" />} 
          label="Alerts" 
        />
        <NavItem 
          active={currentView === AppView.EMERGENCY} 
          onClick={() => setCurrentView(AppView.EMERGENCY)} 
          icon={<Zap className="w-6 h-6" />} 
          label="Safety" 
        />
      </nav>

      {/* Subscription Modal */}
      {showSubModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs p-6 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            {!isSubscribed ? (
              <>
                <button onClick={() => setShowSubModal(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Activate Subscription</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Get real-time disaster alerts for only <span className="font-bold text-slate-800">Rs. 20 per month</span>. DEDUCTED FROM YOUR MOBILE BALANCE.
                  </p>
                  <button 
                    onClick={handleSubscribe}
                    className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-all"
                  >
                    Confirm & Activate
                  </button>
                  <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest">Available for Dialog, Mobitel, Hutch</p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800">Success!</h3>
                <p className="text-sm text-slate-500">Subscription activated via mobile reload.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 transition-all ${active ? 'text-orange-600' : 'text-slate-400 hover:text-slate-500'}`}
  >
    {icon}
    <span className="text-[10px] font-bold uppercase">{label}</span>
    {active && <div className="w-1 h-1 bg-orange-600 rounded-full mt-0.5"></div>}
  </button>
);

export default App;
