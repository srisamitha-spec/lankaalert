
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, MapPin, Search, RefreshCcw, WifiOff } from 'lucide-react';
import { DisasterAlert } from '../types';

const INITIAL_ALERTS: DisasterAlert[] = [
  {
    id: '1',
    type: 'Landslide',
    severity: 'High',
    title: 'Level 2 Warning: Landslides',
    description: 'Continued rainfall has increased the risk of landslides in the following areas: Ratnapura, Elapatha, and Pelmadulla.',
    location: 'Sabaragamuwa Province',
    timestamp: '1 hour ago'
  },
  {
    id: '2',
    type: 'Weather',
    severity: 'Medium',
    title: 'Strong Winds Forecast',
    description: 'Wind speeds may increase up to 60kmph across coastal regions. Fishermen are advised to be cautious.',
    location: 'Coastal Belt',
    timestamp: '3 hours ago'
  },
  {
    id: '3',
    type: 'Flood',
    severity: 'Low',
    title: 'Rising Water Levels',
    description: 'Kalu Ganga water levels are rising at Putupaula station. Residents in low-lying areas should stay alert.',
    location: 'Kalutara',
    timestamp: 'Yesterday'
  }
];

const AlertsList: React.FC = () => {
  const [alerts, setAlerts] = useState<DisasterAlert[]>([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Load from cache first
    const cachedAlerts = localStorage.getItem('cached_alerts');
    if (cachedAlerts) {
      setAlerts(JSON.parse(cachedAlerts));
    } else {
      setAlerts(INITIAL_ALERTS);
      localStorage.setItem('cached_alerts', JSON.stringify(INITIAL_ALERTS));
    }

    const handleConnectionChange = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);

  const refreshAlerts = () => {
    if (navigator.onLine) {
      // In a real app, this would be an API call
      setAlerts(INITIAL_ALERTS);
      localStorage.setItem('cached_alerts', JSON.stringify(INITIAL_ALERTS));
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search by area or alert type..." 
          className="w-full pl-11 pr-4 py-3 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 text-sm"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-bold text-slate-800">Safety Alerts</h3>
          <button 
            onClick={refreshAlerts}
            disabled={isOffline}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
              isOffline ? 'bg-slate-100 text-slate-400' : 'bg-orange-100 text-orange-600 active:bg-orange-200'
            }`}
          >
            {isOffline ? <WifiOff className="w-3 h-3" /> : <RefreshCcw className="w-3 h-3" />}
            {isOffline ? 'Offline' : 'Refresh'}
          </button>
        </div>

        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:border-slate-200 transition-colors relative overflow-hidden group">
            {/* Severity Indicator */}
            <div className={`absolute top-0 left-0 w-1.5 h-full ${
              alert.severity === 'High' ? 'bg-red-500' : 
              alert.severity === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500'
            }`} />
            
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${
                  alert.severity === 'High' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-800">{alert.title}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                alert.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
              }`}>
                {alert.severity}
              </span>
            </div>

            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              {alert.description}
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{alert.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{alert.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200">
        <p className="text-xs text-slate-500 italic">Alerts are cached locally for offline access. Data sourced from DMC Sri Lanka.</p>
      </div>
    </div>
  );
};

export default AlertsList;
