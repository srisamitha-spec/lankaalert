
import React, { useState } from 'react';
import { Phone, Users, Siren, Shield, Map, MessageSquare, Heart } from 'lucide-react';

const EmergencyPanel: React.FC = () => {
  const [sosActive, setSosActive] = useState(false);

  const contacts = [
    { name: "Police Emergency", number: "119", icon: <Shield className="w-5 h-5" /> },
    { name: "Ambulance / Fire", number: "110", icon: <Siren className="w-5 h-5" /> },
    { name: "Disaster Management", number: "117", icon: <Map className="w-5 h-5" /> },
    { name: "Suel Suwa (Child)", number: "1929", icon: <Heart className="w-5 h-5" /> },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Panic Button */}
      <div className="flex flex-col items-center justify-center pt-6 pb-2">
        <button 
          onMouseDown={() => setSosActive(true)}
          onMouseUp={() => setSosActive(false)}
          className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 transition-all active:scale-90 ${
            sosActive ? 'bg-red-700 shadow-inner' : 'bg-red-600 shadow-xl shadow-red-200'
          }`}
        >
          <div className={`absolute inset-0 rounded-full border-4 border-red-500/30 animate-ping ${sosActive ? 'block' : 'hidden'}`}></div>
          <Siren className="w-12 h-12 text-white" />
          <span className="text-white font-black text-xl tracking-wider">S O S</span>
          <span className="text-red-100 text-[10px] font-bold uppercase">Hold for 3s</span>
        </button>
        <p className="mt-6 text-sm text-slate-500 font-medium text-center">
          Tap and hold the SOS button to alert emergency contacts and local authorities with your GPS location.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-bold text-slate-800">Quick Contact</h3>
          <button className="text-xs font-bold text-indigo-600 flex items-center gap-1">
            <Users className="w-3 h-3" /> Manage Family
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {contacts.map((contact, idx) => (
            <a 
              key={idx}
              href={`tel:${contact.number}`}
              className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all shadow-sm group"
            >
              <div className="bg-slate-100 p-3 rounded-full text-slate-600 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                {contact.icon}
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-800 line-clamp-1">{contact.name}</p>
                <p className="text-[10px] text-slate-400 font-bold">{contact.number}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Safety Message */}
      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h4 className="font-bold">Family Broadcast</h4>
        </div>
        <p className="text-sm opacity-90 mb-6">
          "I am safe but in a flood zone. Moving to the community shelter now."
        </p>
        <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-all">
          Send Safe Status
        </button>
      </div>
    </div>
  );
};

export default EmergencyPanel;
