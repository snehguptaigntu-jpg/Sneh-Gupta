import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ThumbsUp, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  ShieldAlert, 
  FileText, 
  Share2, 
  Truck, 
  UserCheck,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { Complaint, Language } from '../types';
import { i18nData } from '../data/i18n';

interface MyComplaintsViewProps {
  lang: Language;
  complaints: Complaint[];
  onUpvote: (id: string) => void;
  onOpenReportModal: () => void;
  selectedComplaintId?: string | null;
  onClearSelectedComplaintId?: () => void;
}

export const MyComplaintsView: React.FC<MyComplaintsViewProps> = ({
  lang,
  complaints,
  onUpvote,
  onOpenReportModal,
  selectedComplaintId,
  onClearSelectedComplaintId
}) => {
  const t = i18nData[lang];

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'hotspot' | 'resolved'>('all');
  const [activeComplaintForModal, setActiveComplaintForModal] = useState<Complaint | null>(
    selectedComplaintId ? complaints.find(c => c.id === selectedComplaintId) || null : null
  );
  const [escalated, setEscalated] = useState(false);

  // Sync if selectedComplaintId changes externally
  React.useEffect(() => {
    if (selectedComplaintId) {
      const found = complaints.find(c => c.id === selectedComplaintId);
      if (found) setActiveComplaintForModal(found);
    }
  }, [selectedComplaintId, complaints]);

  const filtered = complaints.filter(c => {
    const matchesSearch = 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ward.includes(searchQuery) ||
      c.wardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.landmark.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return c.status !== 'resolved';
    if (statusFilter === 'hotspot') return c.status === 'hotspot';
    if (statusFilter === 'resolved') return c.status === 'resolved';
    return true;
  });

  return (
    <div className="pt-4 pb-28 px-4 max-w-4xl mx-auto space-y-4">
      {/* Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {t.complaints.heading}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {t.complaints.subheading}
          </p>
        </div>
        <button
          onClick={onOpenReportModal}
          className="self-start sm:self-auto bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-md shadow-emerald-200 transition-colors"
        >
          + {t.btn.reportNow}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.complaints.searchPlaceholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-600 transition-colors shadow-xs"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        {[
          { id: 'all', label: 'All Tickets' },
          { id: 'active', label: 'Under Action' },
          { id: 'hotspot', label: '🔥 Chronic Hotspots' },
          { id: 'resolved', label: '✅ Resolved & Cleaned' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
              statusFilter === tab.id
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Complaints List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <AlertTriangle className="size-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-500">{t.complaints.emptyState}</p>
          </div>
        ) : (
          filtered.map((c) => {
            const isResolved = c.status === 'resolved';
            const isHotspot = c.status === 'hotspot';

            return (
              <div
                key={c.id}
                className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200 hover:border-emerald-300 transition-all flex flex-col sm:flex-row gap-4"
              >
                {/* Photo thumbnail */}
                <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={c.photoUrl}
                    alt={c.title}
                    className="w-full h-full object-cover"
                  />
                  {isResolved && (
                    <div className="absolute top-1 left-1 bg-emerald-600 text-white p-1 rounded-lg">
                      <CheckCircle2 className="size-3" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        {c.id}
                      </span>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-tight ${
                        isResolved ? 'bg-emerald-100 text-emerald-800' :
                        isHotspot ? 'bg-red-100 text-red-700 animate-pulse' :
                        c.status === 'verified' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {t.status[c.status]}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                      {c.title}
                    </h4>

                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-slate-700">Ward {c.ward}</span>
                      <span>•</span>
                      <span>{c.landmark}</span>
                      <span>•</span>
                      <span className="text-[11px] text-slate-400">{c.date}</span>
                    </p>
                  </div>

                  {/* Actions & Upvote */}
                  <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onUpvote(c.id)}
                      className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl text-xs font-bold text-slate-700 transition-colors"
                    >
                      <ThumbsUp className="size-3.5 text-emerald-600" />
                      <span>{c.upvotes} Upvotes</span>
                    </button>

                    <button
                      onClick={() => setActiveComplaintForModal(c)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <span>{t.btn.viewDetails}</span>
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DETAILED TIMELINE & ACTION MODAL */}
      {activeComplaintForModal && (
        <div className="fixed inset-0 z-[65] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-300">
                  {activeComplaintForModal.id}
                </span>
                <h3 className="text-base font-bold">{activeComplaintForModal.title}</h3>
              </div>
              <button
                onClick={() => {
                  setActiveComplaintForModal(null);
                  if (onClearSelectedComplaintId) onClearSelectedComplaintId();
                  setEscalated(false);
                }}
                className="p-1.5 rounded-full hover:bg-white/20 text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Status Header Badge */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Phase</span>
                  <span className="text-sm font-black text-slate-800 uppercase">
                    {t.status[activeComplaintForModal.status]}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Ward Assignment</span>
                  <span className="text-xs font-bold text-emerald-800">
                    Ward {activeComplaintForModal.ward}
                  </span>
                </div>
              </div>

              {/* Photos Comparison (Evidence vs Cleaned) */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Site Evidence Photos
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Before: Reported</span>
                    <img 
                      src={activeComplaintForModal.photoUrl} 
                      alt="Before" 
                      className="w-full h-32 rounded-2xl object-cover border border-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">
                      {activeComplaintForModal.resolutionPhotoUrl ? 'After: Sanitized' : 'After (Pending Closure)'}
                    </span>
                    {activeComplaintForModal.resolutionPhotoUrl ? (
                      <img 
                        src={activeComplaintForModal.resolutionPhotoUrl} 
                        alt="After Cleaned" 
                        className="w-full h-32 rounded-2xl object-cover border-2 border-emerald-500"
                      />
                    ) : (
                      <div className="w-full h-32 rounded-2xl bg-slate-100 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-center p-2">
                        <Clock className="size-6 mb-1 opacity-50" />
                        <span className="text-[10px] font-bold">Crew en route to site</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Official Municipal Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {t.complaints.timelineTitle}
                </h4>
                <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {activeComplaintForModal.timeline.map((step, idx) => (
                    <div key={idx} className="relative pl-8 text-xs">
                      <div className={`absolute left-1.5 top-0.5 size-3.5 rounded-full border-2 border-white ${
                        step.done ? 'bg-emerald-600 ring-2 ring-emerald-200' : 'bg-slate-300'
                      }`} />
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{step.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                      {step.officer && (
                        <span className="inline-block mt-1 text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          Verified by {step.officer}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Assigned Crew & Vehicle Details */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Sanitary Inspector</span>
                  <span className="font-bold text-slate-800">
                    {activeComplaintForModal.assignedOfficer || 'Ward 03 Inspection Team'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Assigned Fleet</span>
                  <span className="font-bold text-blue-700">
                    {activeComplaintForModal.assignedVehicleId || 'Compactor SW-07'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Estimated Weight Lifted</span>
                  <span className="font-bold text-slate-800">
                    ~{activeComplaintForModal.estimatedKg || 180} kg
                  </span>
                </div>
              </div>

              {/* Escalation notification if clicked */}
              {escalated && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl text-amber-900 text-xs font-semibold flex items-center gap-2">
                  <ShieldAlert className="size-4 text-amber-600 shrink-0" />
                  <span>Grievance successfully escalated to Zonal Municipal Commissioner with High Priority flag.</span>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
              <button
                onClick={() => setEscalated(true)}
                disabled={escalated}
                className="flex-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 py-3 rounded-2xl text-xs font-bold transition-colors disabled:opacity-50"
              >
                {t.btn.escalate}
              </button>
              <button
                onClick={() => {
                  alert(`Receipt for ${activeComplaintForModal.id} downloaded successfully.`);
                }}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-2xl text-xs font-bold shadow-md shadow-emerald-200 transition-colors"
              >
                {t.btn.downloadReceipt}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
