import React, { useState } from 'react';
import { 
  Camera, 
  Truck, 
  MapPin, 
  Navigation, 
  Layers, 
  Filter, 
  X, 
  Plus, 
  Minus, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Flame, 
  Share2, 
  ThumbsUp, 
  Sparkles,
  Compass,
  Trash2
} from 'lucide-react';
import { Complaint, SanitationVehicle, HotspotArea, SmartBin, Language } from '../types';
import { i18nData } from '../data/i18n';
import { WARDS_LIST } from '../data/mockData';

interface MapViewProps {
  lang: Language;
  complaints: Complaint[];
  vehicles: SanitationVehicle[];
  hotspots: HotspotArea[];
  smartBins: SmartBin[];
  userLocation: { lat: number; lng: number };
  onOpenReportModal: () => void;
  onSelectComplaintForDetails: (complaint: Complaint) => void;
  onUpvoteComplaint: (id: string) => void;
  userWard: string;
}

export const MapView: React.FC<MapViewProps> = ({
  lang,
  complaints,
  vehicles,
  hotspots,
  smartBins,
  userLocation,
  onOpenReportModal,
  onSelectComplaintForDetails,
  onUpvoteComplaint,
  userWard
}) => {
  const t = i18nData[lang];

  // Map state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapPan, setMapPan] = useState({ x: 0, y: 0 });
  const [selectedVehicle, setSelectedVehicle] = useState<SanitationVehicle | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotArea | null>(null);

  // Layer toggles
  const [showLayersMenu, setShowLayersMenu] = useState(false);
  const [activeLayers, setActiveLayers] = useState({
    wards: true,
    hotspots: true,
    vehicles: true,
    bins: true,
    complaints: true
  });

  // Filter
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredComplaints = complaints.filter(c => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'hotspot') return c.status === 'hotspot';
    if (filterCategory === 'resolved') return c.status === 'resolved';
    return c.type.toLowerCase().includes(filterCategory.toLowerCase());
  });

  const toggleLayer = (layerName: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const handleRecenter = () => {
    setMapPan({ x: 0, y: 0 });
    setZoomLevel(1);
  };

  return (
    <div className="relative w-full h-full min-h-[620px] bg-slate-900 overflow-hidden select-none">
      {/* Top Filter Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-700/60 shadow-lg text-white">
          <Filter className="size-3.5 text-emerald-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-100 outline-none cursor-pointer pr-2"
          >
            <option value="all" className="bg-slate-800 text-white">{t.map.filterAll}</option>
            <option value="hotspot" className="bg-slate-800 text-white">🔥 {t.status.hotspot}</option>
            <option value="overflowing" className="bg-slate-800 text-white">🗑️ Overflowing Bins</option>
            <option value="plastic" className="bg-slate-800 text-white">🥤 Plastic Waste</option>
            <option value="organic" className="bg-slate-800 text-white">🥬 Organic / Food</option>
            <option value="construction" className="bg-slate-800 text-white">🧱 C&D Debris</option>
            <option value="resolved" className="bg-slate-800 text-white">✅ Resolved Cleanups</option>
          </select>
        </div>

        {/* Live Status indicator */}
        <div className="pointer-events-auto flex items-center gap-2 bg-emerald-950/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-emerald-600/40 shadow-lg text-emerald-200 text-xs font-semibold">
          <span className="size-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>4 Trucks Live</span>
        </div>
      </div>

      {/* Main Interactive SVG Map Canvas */}
      <div 
        className="w-full h-full relative cursor-crosshair transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${zoomLevel}) translate(${mapPan.x}px, ${mapPan.y}px)`,
          transformOrigin: 'center center'
        }}
      >
        {/* Background GIS Grid & Satellite Vector Texture */}
        <div className="absolute inset-0 bg-radial from-slate-800 via-slate-900 to-slate-950 opacity-90" />
        
        {/* Street & Route Mock Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.75" />
            </pattern>
            <radialGradient id="hotspotGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#dc2626" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Primary Arterial Roads */}
          <path d="M0,150 Q250,180 500,120 T1000,200" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
          <path d="M150,0 Q200,350 250,700" fill="none" stroke="#475569" strokeWidth="4" />
          <path d="M0,450 Q400,420 800,500" fill="none" stroke="#64748b" strokeWidth="5" />
          <path d="M450,0 C420,300 600,450 550,800" fill="none" stroke="#475569" strokeWidth="4" strokeDasharray="6,4" />

          {/* River / Green Belt Zone */}
          <path d="M0,620 C200,600 450,680 700,640 L700,750 L0,750 Z" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" strokeWidth="1" strokeDasharray="4,4" />
        </svg>

        {/* WARD BOUNDARIES & LABELS */}
        {activeLayers.wards && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Ward 01 Boundary */}
            <polygon points="50,40 280,30 240,240 70,220" fill="rgba(16, 185, 129, 0.05)" stroke="rgba(52, 211, 153, 0.35)" strokeWidth="1.5" strokeDasharray="5,4" />
            {/* Ward 03 Boundary */}
            <polygon points="260,200 520,180 480,430 220,380" fill="rgba(59, 130, 246, 0.06)" stroke="rgba(96, 165, 250, 0.4)" strokeWidth="1.5" strokeDasharray="5,4" />
            {/* Ward 07 Boundary */}
            <polygon points="40,320 230,300 210,540 30,500" fill="rgba(245, 158, 11, 0.05)" stroke="rgba(251, 191, 36, 0.35)" strokeWidth="1.5" strokeDasharray="5,4" />
            {/* Ward 02 Boundary */}
            <polygon points="520,120 800,90 760,340 500,300" fill="rgba(168, 85, 247, 0.05)" stroke="rgba(192, 132, 252, 0.35)" strokeWidth="1.5" strokeDasharray="5,4" />
            {/* Ward 05 Boundary */}
            <polygon points="480,400 780,360 740,650 460,580" fill="rgba(236, 72, 153, 0.05)" stroke="rgba(244, 114, 182, 0.35)" strokeWidth="1.5" strokeDasharray="5,4" />
          </svg>
        )}

        {/* Ward Name Badges */}
        {activeLayers.wards && WARDS_LIST.slice(0, 5).map((w) => (
          <div
            key={w.id}
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${w.lat}%`, left: `${w.lng}%` }}
          >
            <div className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider backdrop-blur-xs border ${
              w.id === userWard 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50' 
                : 'bg-slate-900/60 text-slate-400 border-slate-700/50'
            }`}>
              Ward {w.id} {w.id === userWard && '★ My Ward'}
            </div>
          </div>
        ))}

        {/* HOTSPOTS HEATMAP LAYER */}
        {activeLayers.hotspots && hotspots.map((hs) => (
          <div
            key={hs.id}
            onClick={() => setSelectedHotspot(hs)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ top: `${hs.lat}%`, left: `${hs.lng}%` }}
          >
            {/* Pulsing Radiation Circle */}
            <div className="relative flex items-center justify-center">
              <div 
                className="rounded-full bg-red-600/25 border border-red-500/50 animate-ping"
                style={{ width: `${hs.radius * 2}px`, height: `${hs.radius * 2}px`, animationDuration: '3s' }}
              />
              <div 
                className="absolute rounded-full bg-radial from-red-600/50 to-transparent border border-red-500/40"
                style={{ width: `${hs.radius * 1.5}px`, height: `${hs.radius * 1.5}px` }}
              />
              
              {/* Center Hotspot Badge */}
              <div className="absolute bg-red-600 text-white px-2.5 py-1 rounded-xl shadow-xl border-2 border-white flex items-center gap-1.5 transition-transform group-hover:scale-110">
                <Flame className="size-3.5 fill-white animate-bounce" />
                <div className="text-left leading-none">
                  <div className="text-[10px] font-black">{hs.complaintCount} Reports</div>
                  <div className="text-[8px] opacity-80 uppercase tracking-tighter">Hotspot</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* SMART SENSOR BINS LAYER */}
        {activeLayers.bins && smartBins.map((bin) => (
          <div
            key={bin.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
            style={{ top: `${bin.lat}%`, left: `${bin.lng}%` }}
          >
            <div className={`p-1 rounded-lg border shadow-lg flex items-center gap-1 ${
              bin.fillLevel > 80 ? 'bg-amber-600 text-white border-white' : 'bg-emerald-700 text-white border-emerald-300'
            }`}>
              <Trash2 className="size-3" />
              <span className="text-[9px] font-bold">{bin.fillLevel}%</span>
            </div>
            {/* Tooltip on hover */}
            <div className="hidden group-hover:block absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded-md whitespace-nowrap z-40 border border-slate-700">
              {bin.location} ({bin.type})
            </div>
          </div>
        ))}

        {/* COMPLAINT MARKERS */}
        {activeLayers.complaints && filteredComplaints.map((c) => {
          const isHotspot = c.status === 'hotspot';
          const isResolved = c.status === 'resolved';
          const isVerified = c.status === 'verified';
          const isAssigned = c.status === 'assigned';

          const markerColor = isHotspot 
            ? 'bg-red-600 text-white border-white' 
            : isResolved 
            ? 'bg-emerald-500 text-white border-white'
            : isAssigned
            ? 'bg-blue-600 text-white border-white'
            : isVerified
            ? 'bg-amber-500 text-white border-white'
            : 'bg-yellow-500 text-slate-950 border-white';

          return (
            <button
              key={c.id}
              onClick={() => {
                setSelectedComplaint(c);
                setSelectedVehicle(null);
                setSelectedHotspot(null);
              }}
              className="absolute z-25 transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 focus:outline-none"
              style={{ top: `${c.lat}%`, left: `${c.lng}%` }}
              title={`${c.id}: ${c.title}`}
            >
              <div className={`p-1.5 rounded-full border-2 shadow-xl flex items-center justify-center ${markerColor}`}>
                <MapPin className="size-3.5" />
              </div>
              {c.priority === 'urgent' && (
                <span className="absolute -top-1 -right-1 size-2 rounded-full bg-red-400 animate-ping"></span>
              )}
            </button>
          );
        })}

        {/* SIMULATED USER LOCATION */}
        <div
          className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ top: `${userLocation.lat}%`, left: `${userLocation.lng}%` }}
        >
          <div className="relative flex items-center justify-center">
            <div className="size-10 rounded-full bg-emerald-500/20 border border-emerald-400 animate-ping" />
            <div className="absolute size-4 rounded-full bg-emerald-500 border-2 border-white shadow-lg" />
          </div>
        </div>

        {/* LIVE FLEET VEHICLES */}
        {activeLayers.vehicles && vehicles.map((veh) => (
          <div
            key={veh.id}
            onClick={() => {
              setSelectedVehicle(veh);
              setSelectedComplaint(null);
              setSelectedHotspot(null);
            }}
            className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-[2800ms] ease-linear hover:scale-115"
            style={{ top: `${veh.lat}%`, left: `${veh.lng}%` }}
          >
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-2 rounded-2xl shadow-2xl border-2 border-white flex items-center gap-2">
              <div className="bg-white/20 p-1 rounded-xl">
                <Truck className="size-4 text-white" />
              </div>
              <div className="pr-1 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[11px] font-black leading-none">{veh.id}</span>
                </div>
                <div className="text-[9px] text-blue-100 font-medium leading-tight mt-0.5">
                  {veh.speed} • Ward {veh.ward}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Map Action Controls (Right Column) */}
      <div className="absolute right-4 bottom-28 z-40 flex flex-col gap-2">
        {/* Recenter Button */}
        <button
          onClick={handleRecenter}
          className="bg-slate-900/90 hover:bg-slate-800 text-emerald-400 p-3 rounded-2xl shadow-xl border border-slate-700 backdrop-blur-md transition-all active:scale-90"
          title={t.btn.recenter}
        >
          <Navigation className="size-5" />
        </button>

        {/* Layer toggle button */}
        <div className="relative">
          <button
            onClick={() => setShowLayersMenu(!showLayersMenu)}
            className={`p-3 rounded-2xl shadow-xl border backdrop-blur-md transition-all active:scale-90 ${
              showLayersMenu 
                ? 'bg-emerald-600 text-white border-emerald-400' 
                : 'bg-slate-900/90 hover:bg-slate-800 text-white border-slate-700'
            }`}
            title={t.btn.layers}
          >
            <Layers className="size-5" />
          </button>

          {/* Layer selection popover */}
          {showLayersMenu && (
            <div className="absolute right-full bottom-0 mr-3 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-3xl p-4 shadow-2xl text-white space-y-3 animate-in fade-in slide-in-from-right-3 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {t.map.layersTitle}
                </span>
                <button onClick={() => setShowLayersMenu(false)} className="text-slate-400 hover:text-white">
                  <X className="size-4" />
                </button>
              </div>

              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span>{t.map.layerWards}</span>
                <input
                  type="checkbox"
                  checked={activeLayers.wards}
                  onChange={() => toggleLayer('wards')}
                  className="rounded text-emerald-600 focus:ring-0 accent-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span>{t.map.layerHotspots}</span>
                <input
                  type="checkbox"
                  checked={activeLayers.hotspots}
                  onChange={() => toggleLayer('hotspots')}
                  className="rounded text-emerald-600 focus:ring-0 accent-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span>{t.map.layerVehicles}</span>
                <input
                  type="checkbox"
                  checked={activeLayers.vehicles}
                  onChange={() => toggleLayer('vehicles')}
                  className="rounded text-emerald-600 focus:ring-0 accent-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span>{t.map.layerBins}</span>
                <input
                  type="checkbox"
                  checked={activeLayers.bins}
                  onChange={() => toggleLayer('bins')}
                  className="rounded text-emerald-600 focus:ring-0 accent-emerald-500"
                />
              </label>
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex flex-col bg-slate-900/90 border border-slate-700 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
            className="p-2.5 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors border-b border-slate-800"
          >
            <Plus className="size-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            className="p-2.5 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Minus className="size-4" />
          </button>
        </div>
      </div>

      {/* Primary Floating Report CTA (Center Bottom) */}
      <div className="absolute bottom-22 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={onOpenReportModal}
          className="group bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white px-7 py-3.5 rounded-full shadow-[0_12px_32px_rgba(16,185,129,0.45)] flex items-center gap-3 font-black text-sm tracking-wide border-2 border-emerald-300/40 active:scale-95 transition-all"
        >
          <div className="bg-white/20 p-1.5 rounded-full group-hover:rotate-12 transition-transform">
            <Camera className="size-5" />
          </div>
          <span>{t.btn.reportNow}</span>
        </button>
      </div>

      {/* BOTTOM SHEET: Selected Vehicle Telemetry */}
      {selectedVehicle && (
        <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-[32px] shadow-2xl p-6 z-50 animate-in slide-in-from-bottom duration-300 border-t border-slate-200 max-w-xl mx-auto">
          <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-4" />
          
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3">
              <div className="bg-blue-100 text-blue-700 p-3.5 rounded-2xl flex items-center justify-center">
                <Truck className="size-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900">
                    Vehicle {selectedVehicle.id}
                  </h3>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                    {selectedVehicle.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Ward {selectedVehicle.ward}: {selectedVehicle.wardName}
                </p>
                <p className="text-[11px] text-emerald-600 font-bold mt-0.5">
                  Reg: {selectedVehicle.plate}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedVehicle(null)} 
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Telemetry Stats Grid */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 font-medium block">ETA</span>
              <span className="text-sm font-black text-emerald-700">{selectedVehicle.eta}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 font-medium block">{t.collection.speed}</span>
              <span className="text-sm font-black text-slate-800">{selectedVehicle.speed}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 font-medium block">Load</span>
              <span className="text-sm font-black text-amber-600">{selectedVehicle.capacityFilled}%</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 font-medium block">Fuel/EV</span>
              <span className="text-sm font-black text-blue-600">{selectedVehicle.fuelBattery}%</span>
            </div>
          </div>

          {/* Route progress */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-4">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-600">Current Loop: {selectedVehicle.currentStop}</span>
              <span className="font-bold text-slate-800">{selectedVehicle.routeProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${selectedVehicle.routeProgress}%` }}
              />
            </div>
          </div>

          {/* Operator Action Bar */}
          <div className="flex gap-2">
            <a 
              href={`tel:${selectedVehicle.driverPhone}`}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border border-slate-200"
            >
              <PhoneCall className="size-4 text-emerald-700" />
              {t.btn.callDriver} ({selectedVehicle.driverName.split(' ')[0]})
            </a>
            <button 
              onClick={() => setSelectedVehicle(null)}
              className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-2xl font-bold text-xs shadow-lg shadow-emerald-200"
            >
              Track Live Path
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM SHEET: Selected Complaint Preview */}
      {selectedComplaint && (
        <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-[32px] shadow-2xl p-6 z-50 animate-in slide-in-from-bottom duration-300 border-t border-slate-200 max-w-xl mx-auto">
          <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-4" />

          <div className="flex gap-4 mb-4">
            <img 
              src={selectedComplaint.photoUrl} 
              alt={selectedComplaint.type}
              className="size-20 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0" 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  {selectedComplaint.id}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  selectedComplaint.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                  selectedComplaint.status === 'hotspot' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {t.status[selectedComplaint.status]}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 truncate mt-0.5">
                {selectedComplaint.title}
              </h4>
              <p className="text-xs text-slate-500 truncate">
                Ward {selectedComplaint.ward} • {selectedComplaint.landmark}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="size-3" /> {selectedComplaint.date}
                </span>
                <span>•</span>
                <span>Est: ~{selectedComplaint.estimatedKg || 150} kg</span>
              </div>
            </div>
            <button 
              onClick={() => setSelectedComplaint(null)} 
              className="p-1.5 bg-slate-100 rounded-full text-slate-400 self-start"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onUpvoteComplaint(selectedComplaint.id)}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold border border-emerald-200 flex items-center gap-1.5 transition-colors"
            >
              <ThumbsUp className="size-4" />
              <span>{selectedComplaint.upvotes} Upvotes</span>
            </button>
            <button
              onClick={() => {
                onSelectComplaintForDetails(selectedComplaint);
                setSelectedComplaint(null);
              }}
              className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-2xl text-xs font-bold shadow-lg shadow-emerald-200 text-center"
            >
              {t.btn.viewDetails} & Municipal Timeline
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM SHEET: Selected Hotspot Details */}
      {selectedHotspot && (
        <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-[32px] shadow-2xl p-6 z-50 animate-in slide-in-from-bottom duration-300 border-t border-red-200 max-w-xl mx-auto">
          <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-4" />

          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
                <Flame className="size-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full uppercase">
                  Chronic Dumping Hotspot
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedHotspot.name}
                </h3>
              </div>
            </div>
            <button onClick={() => setSelectedHotspot(null)} className="p-2 bg-slate-100 rounded-full text-slate-400">
              <X className="size-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-4">
            Ward {selectedHotspot.ward} • {selectedHotspot.complaintCount} active citizen complaints logged. Primary debris: <strong className="text-slate-800">{selectedHotspot.primaryWaste}</strong>.
          </p>

          <button
            onClick={() => {
              onOpenReportModal();
              setSelectedHotspot(null);
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-2xl font-bold text-xs shadow-lg shadow-red-200 flex items-center justify-center gap-2"
          >
            <Camera className="size-4" />
            Report Additional Evidence for this Hotspot
          </button>
        </div>
      )}
    </div>
  );
};
