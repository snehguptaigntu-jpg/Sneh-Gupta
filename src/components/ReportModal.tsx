import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Camera, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Upload, 
  AlertTriangle, 
  Shield, 
  Share2, 
  FileCheck,
  Compass,
  Trash2,
  Package
} from 'lucide-react';
import { Complaint, WasteCategory, Language } from '../types';
import { i18nData } from '../data/i18n';
import { WARDS_LIST, SAMPLE_EVIDENCE_PHOTOS } from '../data/mockData';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onComplaintSubmitted: (newComplaint: Complaint) => void;
  defaultWard: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  lang,
  onComplaintSubmitted,
  defaultWard
}) => {
  if (!isOpen) return null;
  const t = i18nData[lang];

  const [step, setStep] = useState(0);

  // Form State
  const [selectedWard, setSelectedWard] = useState(defaultWard || '03');
  const [gpsCoords, setGpsCoords] = useState({ lat: 44.2, lng: 38.8 });
  const [landmark, setLandmark] = useState('');
  
  const [wasteType, setWasteType] = useState<WasteCategory>('Overflowing Bin');
  const [wasteVolume, setWasteVolume] = useState<'small' | 'medium' | 'large' | 'heavy'>('medium');
  
  const [photoUrl, setPhotoUrl] = useState<string>(SAMPLE_EVIDENCE_PHOTOS[0].url);
  const [aiConfidence, setAiConfidence] = useState<string>('95%');
  const [hazardRating, setHazardRating] = useState<string>('Moderate (Odor & Flies)');
  
  const [notes, setNotes] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [citizenName, setCitizenName] = useState('Aarav Sharma');
  const [citizenPhone, setCitizenPhone] = useState('+91 98765 43210');

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const wardInfo = WARDS_LIST.find(w => w.id === selectedWard) || WARDS_LIST[2];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
        setAiConfidence('96%');
        setHazardRating('Validated by AI Vision Engine');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSamplePhoto = (sample: typeof SAMPLE_EVIDENCE_PHOTOS[0]) => {
    setPhotoUrl(sample.url);
    setWasteType(sample.type);
    setAiConfidence(sample.aiConfidence);
    setHazardRating(sample.hazard);
  };

  const handleFinalSubmit = () => {
    const ticketId = `SWT-2026-00${Math.floor(Math.random() * 899 + 100)}`;
    setSubmittedTicket(ticketId);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];

    const estimatedKg = 
      wasteVolume === 'small' ? 25 :
      wasteVolume === 'medium' ? 120 :
      wasteVolume === 'large' ? 350 : 850;

    const newComplaint: Complaint = {
      id: ticketId,
      type: wasteType,
      title: `${wasteType} Reported at Ward ${selectedWard}`,
      description: notes.trim() || `Citizen report for ${wasteType.toLowerCase()} dumping at ${wardInfo.name}.`,
      status: 'reported',
      lat: wardInfo.lat + (Math.random() - 0.5) * 4,
      lng: wardInfo.lng + (Math.random() - 0.5) * 4,
      ward: selectedWard,
      wardName: wardInfo.name,
      landmark: landmark.trim() || 'Near main intersection',
      date: dateStr,
      time: timeStr,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&auto=format&fit=crop&q=80',
      reportedBy: isAnonymous ? 'Anonymous Citizen' : citizenName,
      isAnonymous,
      upvotes: 1,
      priority: isUrgent ? 'urgent' : 'medium',
      estimatedKg,
      timeline: [
        {
          title: 'Grievance Registered',
          time: timeStr,
          desc: 'Citizen ticket generated & dispatched to Ward Control Room',
          done: true
        },
        {
          title: 'Sanitary Inspector Inspection',
          time: 'Within 45 min',
          desc: `Assigned to Ward ${selectedWard} Chief Sanitation Officer`,
          done: false
        },
        {
          title: 'Compactor Vehicle Dispatched',
          time: 'Within 2 hours',
          desc: 'Route schedule allocation',
          done: false
        },
        {
          title: 'Site Sanitization & Closure',
          time: 'Within 4 hours',
          desc: 'After-clean photo proof upload & notification',
          done: false
        }
      ]
    };

    onComplaintSubmitted(newComplaint);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-xs flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4">
      <div 
        className="w-full max-w-lg bg-white rounded-t-[36px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-900 to-teal-900 text-white">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Swachh Grievance Portal
            </span>
            <h2 className="text-lg font-black tracking-tight">{t.report.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {!submittedTicket && (
              <span className="text-xs bg-emerald-800/80 px-2 py-1 rounded-lg border border-emerald-600/50 font-semibold">
                Step {step + 1} of 5
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-emerald-800 text-emerald-200 transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Indicators */}
        {!submittedTicket && (
          <div className="px-6 pt-3 pb-1 bg-slate-50 border-b border-slate-100">
            <div className="flex gap-1.5">
              {[0, 1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-emerald-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1.5 text-right">
              {t.report.stepNames[step]}
            </div>
          </div>
        )}

        {/* Step Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* SUCCESS SCREEN */}
          {submittedTicket ? (
            <div className="text-center py-6 animate-in zoom-in-95 duration-200">
              <div className="size-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <CheckCircle2 className="size-12" />
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase">
                {t.report.successIdNotice}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2 mb-1">
                {submittedTicket}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Thank you for being a responsible citizen. Your report has been dispatched to <strong>Ward {selectedWard} ({wardInfo.name})</strong> sanitary inspection team.
              </p>

              {/* SLA Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 mb-6 text-left flex items-start gap-3">
                <Shield className="size-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-emerald-950">Municipal SLA Guaranteed</h5>
                  <p className="text-[11px] text-emerald-800 mt-0.5">{t.report.slaNotice}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 rounded-2xl font-bold text-xs shadow-lg shadow-emerald-200 transition-colors"
                >
                  View on GIS Map
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 0: Location Pinpoint */}
              {step === 0 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{t.report.step1Heading}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{t.report.step1Desc}</p>
                  </div>

                  {/* Ward Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Select Municipal Ward</label>
                    <select
                      value={selectedWard}
                      onChange={(e) => setSelectedWard(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-600"
                    >
                      {WARDS_LIST.map((w) => (
                        <option key={w.id} value={w.id}>
                          Ward {w.id}: {w.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Simulated GPS Pin Box */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                        <MapPin className="size-4 text-emerald-600" />
                        <span>Live Geotag Captured</span>
                      </div>
                      <span className="text-[10px] bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-md font-mono">
                        GPS ± 3.4m
                      </span>
                    </div>
                    <p className="font-mono text-xs text-emerald-900 font-semibold">
                      Latitude: {gpsCoords.lat.toFixed(4)}° N, Longitude: {gpsCoords.lng.toFixed(4)}° E
                    </p>
                    <div className="text-[11px] text-emerald-700">
                      Auto-matched: {wardInfo.name}
                    </div>
                  </div>

                  {/* Landmark input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Specific Landmark or Street</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder={t.report.landmarkPlaceholder}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-800 outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              )}

              {/* STEP 1: Waste Category */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{t.report.step2Heading}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{t.report.step2Desc}</p>
                  </div>

                  {/* Waste Category Cards */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { type: 'Overflowing Bin' as const, icon: '🗑️', label: 'Overflowing Bin' },
                      { type: 'Plastic' as const, icon: '🥤', label: 'Plastic & Polythene' },
                      { type: 'Organic' as const, icon: '🥬', label: 'Wet / Food Waste' },
                      { type: 'Mixed' as const, icon: '📦', label: 'Mixed Garbage' },
                      { type: 'Construction' as const, icon: '🧱', label: 'C&D Debris (Malba)' },
                      { type: 'Biomedical' as const, icon: '💉', label: 'Biomedical / Bio-Hazard' },
                      { type: 'E-Waste' as const, icon: '🔋', label: 'Electronic E-Waste' },
                    ].map((cat) => (
                      <button
                        key={cat.type}
                        onClick={() => setWasteType(cat.type)}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                          wasteType === cat.type
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <div>
                          <div className="font-bold text-xs text-slate-900">{cat.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Volume Estimate */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-700">Estimated Dump Volume</label>
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      {[
                        { id: 'small', label: '< 25 kg', desc: 'Bag' },
                        { id: 'medium', label: '~100 kg', desc: 'Barrow' },
                        { id: 'large', label: '~350 kg', desc: 'Dump Pile' },
                        { id: 'heavy', label: '> 800 kg', desc: 'Truckload' },
                      ].map((vol) => (
                        <button
                          key={vol.id}
                          onClick={() => setWasteVolume(vol.id as any)}
                          className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                            wasteVolume === vol.id
                              ? 'bg-emerald-700 text-white border-emerald-700'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          <div>{vol.label}</div>
                          <div className="text-[10px] font-normal opacity-80">{vol.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Photo Evidence & AI Classification */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{t.report.step3Heading}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{t.report.step3Desc}</p>
                  </div>

                  {/* Preview or Upload Box */}
                  {photoUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                      <img src={photoUrl} alt="Dump Evidence" className="w-full h-48 object-cover" />
                      <button
                        onClick={() => setPhotoUrl('')}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full"
                      >
                        <X className="size-4" />
                      </button>

                      {/* AI Vision Badge Overlay */}
                      <div className="absolute bottom-2 inset-x-2 bg-slate-900/85 backdrop-blur-md text-white p-2.5 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="size-4 text-emerald-400" />
                          <div>
                            <div className="text-[10px] font-bold text-emerald-300">
                              {t.report.aiDetectedBadge}
                            </div>
                            <div className="text-xs font-bold">{wasteType} Identified</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-slate-400">{t.report.detectedConfidence}</div>
                          <div className="text-xs font-black text-emerald-400">{aiConfidence}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-50 transition-colors">
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      <div className="bg-emerald-100 p-4 rounded-full text-emerald-700 mb-3">
                        <Upload className="size-8" />
                      </div>
                      <span className="font-bold text-xs text-slate-800">{t.btn.uploadFile}</span>
                      <span className="text-[10px] text-slate-500 mt-1">Camera snap or JPG/PNG image</span>
                    </label>
                  )}

                  {/* Quick Select Sample Photos */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Or Select a Sample Dump Photo:</label>
                    <div className="grid grid-cols-4 gap-2">
                      {SAMPLE_EVIDENCE_PHOTOS.map((sample, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectSamplePhoto(sample)}
                          className="relative rounded-xl overflow-hidden border-2 border-slate-200 hover:border-emerald-600 focus:border-emerald-600 transition-all aspect-square"
                        >
                          <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/30 flex items-end p-1">
                            <span className="text-[8px] text-white font-bold truncate leading-tight">
                              {sample.name.split(' ')[0]}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Notes & Urgency */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{t.report.step4Heading}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{t.report.step4Desc}</p>
                  </div>

                  {/* Notes input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Additional Remarks / Instructions</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="e.g. Garbage dumped behind transformer. Dogs and stray cattle tearing bags."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-800 outline-none focus:border-emerald-600"
                    />
                  </div>

                  {/* Urgent toggle */}
                  <div 
                    onClick={() => setIsUrgent(!isUrgent)}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-3 transition-colors ${
                      isUrgent ? 'bg-red-50 border-red-300' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <AlertTriangle className={`size-5 mt-0.5 ${isUrgent ? 'text-red-600' : 'text-slate-400'}`} />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-900">{t.report.urgentToggle}</div>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Will flag this grievance directly to the Zonal Municipal Health Officer.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={() => {}}
                      className="size-4 mt-1 accent-red-600"
                    />
                  </div>

                  {/* Anonymous toggle */}
                  <div 
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{t.report.anonymousReport}</div>
                      <p className="text-[10px] text-slate-500">Your phone number won't be revealed to field crew</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={() => {}}
                      className="size-4 accent-emerald-600"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Confirmation */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{t.report.step5Heading}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{t.report.step5Desc}</p>
                  </div>

                  {/* Verification Summary Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="text-xs text-slate-500">Target Ward</span>
                      <span className="text-xs font-black text-slate-900">
                        Ward {selectedWard}: {wardInfo.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="text-xs text-slate-500">Waste Type</span>
                      <span className="text-xs font-black text-emerald-800">
                        {wasteType} (~{wasteVolume === 'small' ? '25' : wasteVolume === 'medium' ? '120' : '350'} kg)
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="text-xs text-slate-500">Reported Landmark</span>
                      <span className="text-xs font-medium text-slate-800">
                        {landmark || 'GPS Center Coordinates'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Reporter Identity</span>
                      <span className="text-xs font-semibold text-slate-800">
                        {isAnonymous ? 'Anonymous Citizen' : citizenName}
                      </span>
                    </div>
                  </div>

                  {/* Service Level Agreement Guarantee */}
                  <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Guaranteed Response Window</span>
                      <p className="text-[11px] text-emerald-800 mt-0.5">
                        Ward sanitation inspector will inspect within 45 minutes. Compactor vehicle SW-07 or SW-12 scheduled.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {!submittedTicket && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep(prev => prev - 1)}
                className="px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="size-4" />
                {t.btn.back}
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep(prev => prev + 1)}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 transition-colors"
              >
                <span>{t.btn.continue}</span>
                <ArrowRight className="size-4" />
              </button>
            ) : (
              <button
                onClick={handleFinalSubmit}
                className="flex-1 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white py-3.5 rounded-2xl font-black text-xs shadow-xl shadow-emerald-200 transition-colors"
              >
                {t.btn.submit}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
