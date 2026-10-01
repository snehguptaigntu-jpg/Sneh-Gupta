import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Battery, 
  Fuel, 
  Navigation, 
  PhoneCall, 
  Volume2, 
  VolumeX, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SanitationVehicle, Language } from '../types';
import { i18nData } from '../data/i18n';

interface CollectionFleetViewProps {
  lang: Language;
  vehicles: SanitationVehicle[];
  sirenEnabled: boolean;
  onToggleSiren: () => void;
  userWard: string;
}

export const CollectionFleetView: React.FC<CollectionFleetViewProps> = ({
  lang,
  vehicles,
  sirenEnabled,
  onToggleSiren,
  userWard
}) => {
  const t = i18nData[lang];

  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkScheduled, setBulkScheduled] = useState(false);
  const [bulkCategory, setBulkCategory] = useState('Old Furniture & Wood');
  const [bulkDate, setBulkDate] = useState('Tomorrow, 10:00 AM');

  // Audio siren test chime simulation
  const [playingSiren, setPlayingSiren] = useState(false);

  const handleTestSiren = () => {
    setPlayingSiren(true);
    // Play synthetic chime via Web Audio API if available
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.2); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      // Audio fallback
    }
    setTimeout(() => setPlayingSiren(false), 1200);
  };

  return (
    <div className="pt-4 pb-28 px-4 max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {t.collection.heading}
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {t.collection.subheading}
        </p>
      </div>

      {/* Fleet Overview KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-emerald-800 text-white p-4 rounded-3xl shadow-sm">
          <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider block">
            {t.collection.statsFleet}
          </span>
          <div className="text-2xl sm:text-3xl font-black mt-1">4 Live</div>
          <span className="text-[10px] text-emerald-300">100% GPS online</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
            {t.collection.statsBins}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">42 / 50</div>
          <span className="text-[10px] text-emerald-600 font-bold">84% cleared today</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
            {t.collection.statsTonnage}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">14.8 T</div>
          <span className="text-[10px] text-blue-600 font-bold">To Biomethanation & MRF</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
            {t.collection.statsEfficiency}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">94.2%</div>
          <span className="text-[10px] text-slate-500">Route adherence</span>
        </div>
      </div>

      {/* Morning Doorstep Siren Alert Card */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-sm shrink-0">
            <Volume2 className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900">{t.collection.sirenAlert}</h3>
              <span className="bg-emerald-200 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Active Ward 03
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 max-w-md">
              {t.collection.sirenDesc}. Prevents household missed waste pickups.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleTestSiren}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-2xl bg-white border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="size-3.5 text-amber-500" />
            <span>{playingSiren ? 'Playing Chime...' : 'Test Siren Chime'}</span>
          </button>
          
          <button
            onClick={onToggleSiren}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
              sirenEnabled 
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-200' 
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {sirenEnabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>

      {/* Live Vehicle Telemetry Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Active Vehicles in Operation
          </h3>
          <span className="text-xs text-slate-400 font-mono">Synced with GPS Fleet Server</span>
        </div>

        {vehicles.map((v) => {
          const isUserWard = v.ward === userWard;

          return (
            <div
              key={v.id}
              className={`bg-white rounded-3xl p-4 sm:p-5 border transition-all ${
                isUserWard 
                  ? 'border-emerald-400 ring-2 ring-emerald-500/10 shadow-sm' 
                  : 'border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl">
                    <Truck className="size-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-slate-900 text-base">{v.id}</h4>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        {v.plate}
                      </span>
                      {isUserWard && (
                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                          Servicing Your Ward
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ward {v.ward}: {v.wardName} • {v.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Arrival</span>
                    <span className="text-base font-black text-emerald-700">{v.eta}</span>
                  </div>
                  <a
                    href={`tel:${v.driverPhone}`}
                    className="p-2.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-2xl text-slate-600 transition-colors"
                    title={`Call driver ${v.driverName}`}
                  >
                    <PhoneCall className="size-4" />
                  </a>
                </div>
              </div>

              {/* Progress Bar & Telemetry */}
              <div className="pt-3 space-y-3">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-600 font-medium">
                      Current Waypoint: <strong className="text-slate-900">{v.currentStop}</strong>
                    </span>
                    <span className="font-bold text-slate-800">{v.routeProgress}% Route Completed</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-700"
                      style={{ width: `${v.routeProgress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">{t.collection.speed}</span>
                    <span className="font-bold text-slate-800">{v.speed}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Compactor Load</span>
                    <span className="font-bold text-amber-600">{v.capacityFilled}% Full</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Fuel / Battery</span>
                    <span className="font-bold text-blue-600">{v.fuelBattery}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Special Bulk Waste Pickup Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
            Special Municipal Service
          </span>
          <h3 className="font-bold text-base text-slate-900 mt-0.5">
            Bulk Waste & Garden Pruning Doorstep Collection
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Book a dedicated hydraulic vehicle for heavy mattresses, old furniture, or pruning branches.
          </p>
        </div>
        <button
          onClick={() => setBulkModalOpen(true)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-md shadow-emerald-200 transition-colors whitespace-nowrap"
        >
          {t.btn.scheduleBulk}
        </button>
      </div>

      {/* BULK PICKUP SCHEDULING MODAL */}
      {bulkModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">{t.btn.scheduleBulk}</h3>
              <button onClick={() => setBulkModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            {bulkScheduled ? (
              <div className="text-center py-6 space-y-3">
                <div className="size-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="size-10" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Pickup Slot Confirmed!</h4>
                <p className="text-xs text-slate-500">
                  Municipal Bulk Truck SW-03 scheduled for <strong>{bulkDate}</strong> at your registered address in Ward {userWard}.
                </p>
                <button
                  onClick={() => {
                    setBulkScheduled(false);
                    setBulkModalOpen(false);
                  }}
                  className="w-full bg-emerald-700 text-white py-3 rounded-2xl font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Item Category</label>
                  <select
                    value={bulkCategory}
                    onChange={(e) => setBulkCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800"
                  >
                    <option>Old Furniture & Wood Items</option>
                    <option>Tree Trimmings & Garden Waste</option>
                    <option>Discarded Household Appliances / Mattresses</option>
                    <option>Festival / Event Residue Waste</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Time Window</label>
                  <select
                    value={bulkDate}
                    onChange={(e) => setBulkDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800"
                  >
                    <option>Tomorrow Morning (09:00 AM - 12:00 PM)</option>
                    <option>Tomorrow Afternoon (02:00 PM - 05:00 PM)</option>
                    <option>This Saturday Morning (08:00 AM - 11:00 AM)</option>
                  </select>
                </div>

                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                  <ShieldCheck className="size-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Free municipal service under Swachh Bharat Mission (Up to 200 kg per household).</span>
                </div>

                <button
                  onClick={() => setBulkScheduled(true)}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 rounded-2xl font-bold text-xs shadow-md shadow-emerald-200"
                >
                  Confirm Doorstep Booking
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
