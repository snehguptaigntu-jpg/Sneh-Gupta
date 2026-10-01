import React, { useState, useEffect } from 'react';
import { 
  Map as MapIcon, 
  Camera, 
  Truck, 
  ClipboardList, 
  BarChart3, 
  Sparkles,
  MapPin,
  Smartphone
} from 'lucide-react';
import { 
  Language, 
  Complaint, 
  SanitationVehicle, 
  HotspotArea, 
  SmartBin, 
  CitizenNotification 
} from './types';
import { i18nData } from './data/i18n';
import { 
  INITIAL_COMPLAINTS, 
  MOCK_VEHICLES, 
  MOCK_HOTSPOTS, 
  MOCK_SMART_BINS, 
  MOCK_NOTIFICATIONS 
} from './data/mockData';
import { Header } from './components/Header';
import { MapView } from './components/MapView';
import { ReportModal } from './components/ReportModal';
import { MyComplaintsView } from './components/MyComplaintsView';
import { CollectionFleetView } from './components/CollectionFleetView';
import { StatsView } from './components/StatsView';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'home' | 'myComplaints' | 'collection' | 'stats'>('home');
  
  // Data state
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [vehicles, setVehicles] = useState<SanitationVehicle[]>(MOCK_VEHICLES);
  const [hotspots] = useState<HotspotArea[]>(MOCK_HOTSPOTS);
  const [smartBins] = useState<SmartBin[]>(MOCK_SMART_BINS);
  const [notifications, setNotifications] = useState<CitizenNotification[]>(MOCK_NOTIFICATIONS);

  // User state
  const [userWard, setUserWard] = useState<string>('03');
  const [userLocation, setUserLocation] = useState({ lat: 45, lng: 42 });
  const [sirenEnabled, setSirenEnabled] = useState(true);

  // Modals & Drawers
  const [showReportModal, setShowReportModal] = useState(false);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedComplaintIdForModal, setSelectedComplaintIdForModal] = useState<string | null>(null);

  // Viewport mode: Default to true for authentic citizen mobile experience, with instant toggle to full screen
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  const t = i18nData[lang];
  const unreadCount = notifications.filter(n => !n.read).length;

  // Real-time Vehicle GPS Simulation (moves trucks subtly on the map)
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prevVehicles =>
        prevVehicles.map(veh => {
          const deltaLat = (Math.random() - 0.48) * 1.8;
          const deltaLng = (Math.random() - 0.48) * 1.8;
          // Keep within map boundaries 10% - 90%
          const newLat = Math.min(Math.max(veh.lat + deltaLat, 15), 85);
          const newLng = Math.min(Math.max(veh.lng + deltaLng, 15), 85);
          
          return {
            ...veh,
            lat: Number(newLat.toFixed(2)),
            lng: Number(newLng.toFixed(2)),
            speed: `${Math.floor(18 + Math.random() * 16)} km/h`
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleComplaintSubmitted = (newComplaint: Complaint) => {
    setComplaints(prev => [newComplaint, ...prev]);
    // Add notification
    const newNotif: CitizenNotification = {
      id: `notif-${Date.now()}`,
      title: 'Complaint Registered',
      message: `Ticket #${newComplaint.id} for ${newComplaint.type} dispatched to Ward ${newComplaint.ward} Sanitary Inspector.`,
      time: 'Just now',
      read: false,
      type: 'status_update',
      actionId: newComplaint.id
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleUpvoteComplaint = (id: string) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === id) {
          return { ...c, upvotes: c.upvotes + 1 };
        }
        return c;
      })
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleSelectNotificationAction = (complaintId: string) => {
    setSelectedComplaintIdForModal(complaintId);
    setActiveTab('myComplaints');
  };

  const handleSelectComplaintForDetails = (complaint: Complaint) => {
    setSelectedComplaintIdForModal(complaint.id);
    setActiveTab('myComplaints');
  };

  // Nav Item Component
  const NavButton = ({
    icon,
    label,
    active,
    onClick
  }: {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all py-1 px-2 rounded-xl ${
        active ? 'text-emerald-700 font-black' : 'text-slate-400 hover:text-slate-600 font-semibold'
      }`}
    >
      <div className={`transition-transform duration-200 ${active ? 'scale-115 text-emerald-700' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] uppercase tracking-tight">{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen bg-slate-950 font-sans text-slate-900 ${
      isMobileFrame ? 'flex items-center justify-center p-0 sm:py-6 sm:px-4' : ''
    }`}>
      {/* Container Frame */}
      <div className={`w-full bg-slate-50 flex flex-col relative overflow-hidden transition-all shadow-2xl ${
        isMobileFrame 
          ? 'max-w-[430px] h-[100dvh] sm:h-[890px] sm:rounded-[44px] sm:border-[8px] sm:border-slate-800' 
          : 'min-h-screen max-w-7xl mx-auto rounded-none border-0'
      }`}>
        
        {/* Mobile Mock Notch / Status bar (only when mobile framed) */}
        {isMobileFrame && (
          <div className="hidden sm:flex bg-emerald-950 text-emerald-200 text-[10px] font-mono justify-between items-center px-6 py-1 select-none">
            <span>09:41</span>
            <div className="size-3 rounded-full bg-slate-900 border border-slate-700 mx-auto" />
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Global App Header */}
        <Header
          lang={lang}
          onLanguageChange={setLang}
          unreadCount={unreadCount}
          onOpenNotifications={() => setShowNotificationDrawer(true)}
          onOpenProfile={() => setShowProfileModal(true)}
          isMobileFrame={isMobileFrame}
          onToggleViewport={() => setIsMobileFrame(!isMobileFrame)}
        />

        {/* Main Content Screen */}
        <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
          {activeTab === 'home' && (
            <MapView
              lang={lang}
              complaints={complaints}
              vehicles={vehicles}
              hotspots={hotspots}
              smartBins={smartBins}
              userLocation={userLocation}
              onOpenReportModal={() => setShowReportModal(true)}
              onSelectComplaintForDetails={handleSelectComplaintForDetails}
              onUpvoteComplaint={handleUpvoteComplaint}
              userWard={userWard}
            />
          )}

          {activeTab === 'myComplaints' && (
            <MyComplaintsView
              lang={lang}
              complaints={complaints}
              onUpvote={handleUpvoteComplaint}
              onOpenReportModal={() => setShowReportModal(true)}
              selectedComplaintId={selectedComplaintIdForModal}
              onClearSelectedComplaintId={() => setSelectedComplaintIdForModal(null)}
            />
          )}

          {activeTab === 'collection' && (
            <CollectionFleetView
              lang={lang}
              vehicles={vehicles}
              sirenEnabled={sirenEnabled}
              onToggleSiren={() => setSirenEnabled(!sirenEnabled)}
              userWard={userWard}
            />
          )}

          {activeTab === 'stats' && (
            <StatsView lang={lang} />
          )}
        </main>

        {/* Bottom Navigation Dock */}
        <nav className="sticky bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex justify-between items-center z-40 shadow-lg">
          <NavButton
            icon={<MapIcon className="size-5" />}
            label={t.nav.home}
            active={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />

          <NavButton
            icon={<ClipboardList className="size-5" />}
            label={t.nav.myComplaints}
            active={activeTab === 'myComplaints'}
            onClick={() => setActiveTab('myComplaints')}
          />

          {/* Elevated Center Floating Camera / Report Button */}
          <div className="relative -top-5">
            <button
              onClick={() => setShowReportModal(true)}
              className="bg-gradient-to-tr from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 p-4 rounded-full shadow-[0_8px_24px_rgba(16,185,129,0.5)] text-white border-4 border-white active:scale-90 transition-transform flex items-center justify-center"
              aria-label="Report Waste Grievance"
            >
              <Camera className="size-6" />
            </button>
          </div>

          <NavButton
            icon={<Truck className="size-5" />}
            label={t.nav.collection}
            active={activeTab === 'collection'}
            onClick={() => setActiveTab('collection')}
          />

          <NavButton
            icon={<BarChart3 className="size-5" />}
            label={t.nav.stats}
            active={activeTab === 'stats'}
            onClick={() => setActiveTab('stats')}
          />
        </nav>

        {/* Prototype Watermark */}
        <div className="absolute top-16 left-3 pointer-events-none z-30">
          <span className="bg-slate-900/40 text-slate-300 text-[8px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs border border-white/10">
            Swachh Bharat GIS • Live Sim
          </span>
        </div>

        {/* Modals & Drawers */}
        <ReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          lang={lang}
          onComplaintSubmitted={handleComplaintSubmitted}
          defaultWard={userWard}
        />

        <NotificationDrawer
          isOpen={showNotificationDrawer}
          onClose={() => setShowNotificationDrawer(false)}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          lang={lang}
          onSelectAction={handleSelectNotificationAction}
        />

        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          lang={lang}
          currentWard={userWard}
          onSelectWard={setUserWard}
          sirenEnabled={sirenEnabled}
          onToggleSiren={() => setSirenEnabled(!sirenEnabled)}
        />
      </div>
    </div>
  );
}
