import React, { useState } from 'react';
import { 
  BarChart3, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Flame, 
  Sparkles, 
  FileSpreadsheet,
  Check
} from 'lucide-react';
import { Language } from '../types';
import { i18nData } from '../data/i18n';
import { MOCK_LEADERBOARD } from '../data/mockData';

interface StatsViewProps {
  lang: Language;
}

export const StatsView: React.FC<StatsViewProps> = ({ lang }) => {
  const t = i18nData[lang];
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="pt-4 pb-28 px-4 max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {t.stats.heading}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {t.stats.subheading}
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm"
        >
          {downloadSuccess ? (
            <>
              <Check className="size-4 text-emerald-400" />
              <span>Report Generated!</span>
            </>
          ) : (
            <>
              <Download className="size-4 text-slate-300" />
              <span>{t.stats.downloadReport}</span>
            </>
          )}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-5 rounded-3xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
            {t.stats.totalResolved}
          </span>
          <div className="text-3xl sm:text-4xl font-black mt-1">142</div>
          <div className="text-[11px] text-emerald-300 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="size-3" /> +18% this week
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            {t.stats.activePending}
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-800 mt-1">38</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">
            Average SLA: 3.8 hrs
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            {t.stats.hotspotsNeutralized}
          </span>
          <div className="text-3xl sm:text-4xl font-black text-emerald-700 mt-1">19</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            Zero-tolerance zones
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            {t.stats.wasteDiverted}
          </span>
          <div className="text-3xl sm:text-4xl font-black text-blue-700 mt-1">68.4%</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">
            To Biogas & Recycling
          </div>
        </div>
      </div>

      {/* Ward Cleanliness Leaderboard */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="size-5 text-amber-500" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              {t.stats.wardRankings}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Swachh Survekshan 2026</span>
        </div>

        <div className="space-y-2.5">
          {MOCK_LEADERBOARD.map((item) => (
            <div
              key={item.ward}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                item.rank === 1
                  ? 'bg-amber-50/70 border-amber-200 shadow-xs'
                  : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`size-8 rounded-xl flex items-center justify-center font-black text-xs ${
                  item.rank === 1 ? 'bg-amber-400 text-amber-950 shadow-xs' :
                  item.rank === 2 ? 'bg-slate-300 text-slate-800' :
                  item.rank === 3 ? 'bg-amber-700/30 text-amber-900' :
                  'bg-slate-200 text-slate-600'
                }`}>
                  #{item.rank}
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    Ward {item.ward}: {item.name}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                    <span>{item.resolvedRate}% resolution rate</span>
                    <span>•</span>
                    <span>Avg {item.avgResolutionHours}h turnaround</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-base sm:text-lg font-black text-emerald-800">
                  {item.score}
                </span>
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Waste Composition Breakdown */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-sm sm:text-base text-slate-900">
          {t.stats.wasteBreakdown}
        </h3>

        <div className="space-y-3">
          {[
            { label: 'Organic & Food Waste (Sent to Biogas)', pct: 42, color: 'bg-emerald-500', tons: '6.2 T' },
            { label: 'Dry Recyclables & Packaging', pct: 28, color: 'bg-blue-500', tons: '4.1 T' },
            { label: 'Single-Use Plastics (Sent to Refuse Derived Fuel)', pct: 16, color: 'bg-amber-500', tons: '2.4 T' },
            { label: 'Construction & Demolition Debris (Malba)', pct: 10, color: 'bg-stone-500', tons: '1.5 T' },
            { label: 'Sanitary & Domestic Hazardous', pct: 4, color: 'bg-red-500', tons: '0.6 T' },
          ].map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{item.label}</span>
                <span className="font-bold text-slate-900">{item.pct}% ({item.tons})</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
