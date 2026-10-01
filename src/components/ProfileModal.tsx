import React from 'react';
import { X, Award, ShieldCheck, MapPin, CheckCircle, Flame, Star, Volume2 } from 'lucide-react';
import { Language } from '../types';
import { i18nData } from '../data/i18n';
import { WARDS_LIST } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currentWard: string;
  onSelectWard: (ward: string) => void;
  sirenEnabled: boolean;
  onToggleSiren: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  lang,
  currentWard,
  onSelectWard,
  sirenEnabled,
  onToggleSiren,
}) => {
  if (!isOpen) return null;
  const t = i18nData[lang];
  const wardObj = WARDS_LIST.find(w => w.id === currentWard) || WARDS_LIST[2];

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Profile Card Header */}
        <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-white text-emerald-800 flex items-center justify-center font-black text-2xl shadow-lg border-2 border-emerald-400">
              AS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xl font-bold">Aarav Sharma</h3>
                <ShieldCheck className="size-4 text-emerald-300" />
              </div>
              <p className="text-xs text-emerald-100 flex items-center gap-1 mt-0.5">
                <MapPin className="size-3" /> Sector C, Vasant Kunj, New Delhi
              </p>
              <div className="inline-flex items-center gap-1 mt-2 bg-emerald-900/60 border border-emerald-400/30 px-2.5 py-0.5 rounded-full text-[11px] font-medium text-emerald-200">
                <Star className="size-3 text-amber-400 fill-amber-400" /> Verified Citizen Reporter
              </div>
            </div>
          </div>
        </div>

        {/* Civic Karma Score */}
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.profile.points}</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-black text-emerald-700">850</span>
                <span className="text-xs text-emerald-600 font-bold">Karma Pts</span>
              </div>
            </div>
            <div className="bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <Flame className="size-4 text-amber-600 fill-amber-600" />
              Level 4 Swachh Guard
            </div>
          </div>
          <p className="text-xs text-slate-600">{t.profile.pointsDesc}</p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center">
              <span className="text-2xl font-black text-slate-800">14</span>
              <p className="text-[11px] text-slate-500 font-medium">{t.profile.reportsSubmitted}</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center">
              <span className="text-2xl font-black text-emerald-700">12</span>
              <p className="text-[11px] text-slate-500 font-medium">{t.profile.cleanupsVerified}</p>
            </div>
          </div>
        </div>

        {/* Badges Earned */}
        <div className="p-6 border-b border-slate-100">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Award className="size-4 text-emerald-600" />
            {t.profile.badgeTitle}
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col items-center">
              <span className="text-xl mb-1">🌿</span>
              <span className="text-[11px] font-bold text-emerald-900 leading-tight">Green Warrior</span>
              <span className="text-[9px] text-emerald-600">Top 5%</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col items-center">
              <span className="text-xl mb-1">🔍</span>
              <span className="text-[11px] font-bold text-blue-900 leading-tight">Dump Spotter</span>
              <span className="text-[9px] text-blue-600">10+ Reports</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-200 flex flex-col items-center">
              <span className="text-xl mb-1">♻️</span>
              <span className="text-[11px] font-bold text-purple-900 leading-tight">Segregation Pro</span>
              <span className="text-[9px] text-purple-600">Certified</span>
            </div>
          </div>
        </div>

        {/* Citizen Municipal Settings */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              {t.profile.ward}
            </label>
            <select
              value={currentWard}
              onChange={(e) => onSelectWard(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-600"
            >
              {WARDS_LIST.map((w) => (
                <option key={w.id} value={w.id}>
                  Ward {w.id}: {w.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <Volume2 className="size-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-800">{t.collection.sirenAlert}</h5>
                <p className="text-[10px] text-slate-500">Chime when waste vehicle is within 300m</p>
              </div>
            </div>
            <button
              onClick={onToggleSiren}
              className={`w-11 h-6 flex items-center rounded-full p-1 duration-200 ${
                sirenEnabled ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white size-4 rounded-full shadow-md transform duration-200 ${
                  sirenEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 text-center">
          <p className="text-[10px] text-slate-500 font-mono">
            Citizen UID: DEL-MCD-2026-88190 • MoHUA Certified
          </p>
        </div>
      </div>
    </div>
  );
};
