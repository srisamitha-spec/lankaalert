
import React from 'react';
import { CloudRain, Wind, Thermometer, MapPin, AlertCircle, ChevronRight, Activity, Zap, PhoneCall } from 'lucide-react';
import { AppView } from '../types';

interface DashboardProps {
  onNav: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNav }) => {
  return (
    <div className="p-4 space-y-6">
      {/* Weather Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-1 mb-1 opacity-80">
              <MapPin className="w-3 h-3" />
              <span className="text-xs font-medium">Colombo, Sri Lanka</span>
            </div>
            <h2 className="text-4xl font-bold">29°C</h2>
            <p className="text-sm font-medium opacity-90">Partly Cloudy</p>
          </div>
          <CloudRain className="w-12 h-12 text-blue-200" />
        </div>
        
        <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-4">
          <div className="text-center">
            <Wind className="w-4 h-4 mx-auto mb-1 opacity-70" />
            <p className="text-[10px] uppercase opacity-60">Wind</p>
            <p className="text-xs font-bold">12 km/h</p>
          </div>
          <div className="text-center">
            <Activity className="w-4 h-4 mx-auto mb-1 opacity-70" />
            <p className="text-[10px] uppercase opacity-60">Humidity</p>
            <p className="text-xs font-bold">82%</p>
          </div>
          <div className="text-center">
            <Thermometer className="w-4 h-4 mx-auto mb-1 opacity-70" />
            <p className="text-[10px] uppercase opacity-60">UV Index</p>
            <p className="text-xs font-bold">Moderate</p>
          </div>
        </div>
      </div>

      {/* Critical Alert Banner */}
      <button 
        onClick={() => onNav(AppView.ALERTS)}
        className="w-full bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-4 text-left active:bg-red-100 transition-colors"
      >
        <div className="bg-red-500 p-2 rounded-xl">
          <AlertCircle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-red-800">Landslide Warning Issued</h4>
          <p className="text-xs text-red-600 font-medium">Ratnapura & Kegalle Districts - High Alert</p>
        </div>
        <ChevronRight className="w-5 h-5 text-red-300" />
      </button>

      {/* Feature Tiles */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-100 rounded-2xl p-4 flex flex-col items-center text-center gap-2 group cursor-pointer active:bg-slate-200 transition-all" onClick={() => onNav(AppView.ALERTS)}>
          <div className="bg-white p-3 rounded-full shadow-sm text-orange-600">
            <Zap className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-slate-700">Latest Alerts</span>
          <span className="text-[10px] text-slate-500">Real-time warnings</span>
        </div>
        <div className="bg-slate-100 rounded-2xl p-4 flex flex-col items-center text-center gap-2 group cursor-pointer active:bg-slate-200 transition-all" onClick={() => onNav(AppView.EMERGENCY)}>
          <div className="bg-white p-3 rounded-full shadow-sm text-red-600">
            <PhoneCall className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-slate-700">Emergency</span>
          <span className="text-[10px] text-slate-500">SOS & Contact List</span>
        </div>
      </div>

      {/* News Feed Mock */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 px-1">Safety Information</h3>
        {[
          { title: "Monsoon Preparedness Guide", date: "Today", tag: "Safety" },
          { title: "Coastal Erosion Updates", date: "Yesterday", tag: "Alert" },
          { title: "Community Shelter Map", date: "3 days ago", tag: "Guide" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-4 hover:border-slate-200 transition-colors cursor-pointer">
            <div className="w-20 h-16 bg-slate-200 rounded-lg shrink-0 overflow-hidden">
               <img src={`https://picsum.photos/seed/${idx+20}/200/200`} alt="news" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-bold text-orange-600 uppercase mb-1 tracking-wider">{item.tag}</span>
              <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{item.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
