import React from 'react';
import { 
  MapPin, 
  Bell, 
  User, 
  Smartphone, 
  Monitor, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { Language } from '../types';
import { i18nData } from '../data/i18n';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  isMobileFrame: boolean;
  onToggleViewport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  unreadCount,
  onOpenNotifications,
  onOpenProfile,
  isMobileFrame,
  onToggleViewport
}) => {
  const t = i18nData[lang];

  return (
    <header className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-xl sticky top-0 z-50 transition-all border-b border-emerald-700/50">
      {/* Top micro banner */}
      <div className="bg-emerald-950/70 border-b border-emerald-800/40 px-4 py-1 text-[10px] flex items-center justify-between text-emerald-200/90 tracking-wide font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{t.badgeGovt}</span>
          <span className="hidden sm:inline text-emerald-400/50">•</span>
          <span className="hidden sm:inline text-emerald-300/80">Swachh Survekshan GIS Portal 2026</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleViewport}
            className="flex items-center gap-1 hover:text-white transition-colors bg-emerald-900/60 px-2 py-0.5 rounded-md border border-emerald-700/40 text-[10px]"
            title="Toggle between Mobile view & Fullscreen Dashboard view"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="size-3 text-teal-300" />
                <span className="hidden xs:inline">Expanded View</span>
              </>
            ) : (
              <>
                <Smartphone className="size-3 text-amber-300" />
                <span className="hidden xs:inline">Mobile Frame</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Header bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-2xl shadow-md border-2 border-emerald-400/40 flex items-center justify-center">
            <MapPin className="text-emerald-800 size-5 sm:size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black tracking-tight leading-none text-white drop-shadow-xs">
                {t.appTitle}
              </h1>
              <span className="bg-emerald-700/80 text-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-emerald-500/40">
                GIS 2.4
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-emerald-100/80 font-medium tracking-wide mt-0.5">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-emerald-950/80 hover:bg-emerald-950 text-emerald-100 text-xs font-semibold rounded-xl px-2.5 py-1.5 border border-emerald-600/50 shadow-inner outline-none cursor-pointer transition-colors"
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिन्दी (HI)</option>
              <option value="gu">ગુજરાતી (GU)</option>
            </select>
          </div>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative bg-emerald-900/70 hover:bg-emerald-800 p-2 rounded-xl border border-emerald-600/40 transition-colors shadow-xs"
            aria-label="Notifications"
          >
            <Bell className="size-4 sm:size-5 text-emerald-100" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] font-black rounded-full size-4.5 flex items-center justify-center border-2 border-emerald-900 shadow-sm animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Citizen Profile Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 bg-emerald-900/70 hover:bg-emerald-800 px-2.5 py-1.5 rounded-xl border border-emerald-600/40 transition-colors shadow-xs"
            aria-label="User Profile"
          >
            <div className="size-6 rounded-lg bg-teal-400 text-emerald-950 font-black text-xs flex items-center justify-center">
              AS
            </div>
            <span className="hidden md:inline text-xs font-bold text-emerald-100">
              Aarav S.
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
