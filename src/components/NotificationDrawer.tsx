import React from 'react';
import { X, CheckCircle2, Truck, AlertTriangle, Bell, Trash2 } from 'lucide-react';
import { CitizenNotification, Language } from '../types';
import { i18nData } from '../data/i18n';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: CitizenNotification[];
  onMarkAllRead: () => void;
  lang: Language;
  onSelectAction?: (complaintId: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  lang,
  onSelectAction
}) => {
  if (!isOpen) return null;
  const t = i18nData[lang];

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-emerald-800 text-white">
          <div className="flex items-center gap-2">
            <Bell className="size-5" />
            <h2 className="font-bold text-base">{t.notifications.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-emerald-700 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-500 font-medium">
            {notifications.filter(n => !n.read).length} unread updates
          </span>
          <button 
            onClick={onMarkAllRead}
            className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
          >
            <CheckCircle2 className="size-3.5" />
            {t.notifications.markAllRead}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              <Bell className="size-10 mx-auto mb-2 opacity-40" />
              {t.notifications.empty}
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  notif.read ? 'bg-white border-slate-200' : 'bg-emerald-50/60 border-emerald-200 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl mt-0.5 ${
                    notif.type === 'vehicle_nearby' ? 'bg-blue-100 text-blue-700' :
                    notif.type === 'hotspot_alert' ? 'bg-red-100 text-red-600' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {notif.type === 'vehicle_nearby' ? <Truck className="size-4" /> :
                     notif.type === 'hotspot_alert' ? <AlertTriangle className="size-4" /> :
                     <CheckCircle2 className="size-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-slate-800">{notif.title}</h4>
                      <span className="text-[10px] text-slate-400">{notif.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">{notif.message}</p>
                    {notif.actionId && onSelectAction && (
                      <button 
                        onClick={() => {
                          onSelectAction(notif.actionId!);
                          onClose();
                        }}
                        className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        Track Ticket #{notif.actionId}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
