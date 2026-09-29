import React from 'react';
import { useSite } from '../context/SiteContext';
import { 
    X, 
    TrendingUp, 
    CheckCircle2, 
    ShieldCheck, 
    Calendar, 
    LayoutGrid, 
    Database, 
    Activity, 
    Cpu, 
    Shield, 
    FileSpreadsheet, 
    Server 
} from 'lucide-react';

const iconMap = {
    'folder_shared': Database,
    'clinical_notes': Activity,
    'medication': Activity,
    'hotel': Server,
    'biotech': Activity,
    'receipt_long': FileSpreadsheet,
    'hub': Cpu,
    'shield': Shield,
    'analytics': TrendingUp,
};

export default function ModuleDetailModal() {
    const { activeModuleModal, closeModuleModal, openDemoModal } = useSite();

    if (!activeModuleModal) return null;

    const mod = activeModuleModal;
    const IconComponent = iconMap[mod.icon] || LayoutGrid;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
            <div className="relative w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4 max-h-[92vh] flex flex-col font-sans animate-scale-spring">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/40 border-b border-slate-200 p-4 sm:p-5 text-[#1F2937] relative shrink-0">
                    <button
                        onClick={closeModuleModal}
                        className="absolute top-3.5 right-3.5 w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer border border-slate-200 active:scale-90 btn-spring"
                        aria-label="Tutup"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#2F8BFF] flex items-center justify-center shrink-0 shadow-xs">
                            <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF8A2B] bg-[#FFF0E6] px-2 py-0.5 rounded border border-[#FFD8BF]">
                                {mod.module_code} • {mod.category_label || mod.category}
                            </span>
                            <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-[#1F2937] font-display mt-1">
                                {mod.title}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 bg-white text-[#1F2937]">
                    {/* Highlight Metric */}
                    {mod.highlight_metric && (
                        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50/80 border border-blue-200">
                            <div className="w-8 h-8 rounded-lg bg-[#2F8BFF]/10 flex items-center justify-center shrink-0 text-[#2F8BFF]">
                                <TrendingUp className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-500 font-bold block font-mono uppercase tracking-wider">DAMPAK KLINIS &amp; EFISIENSI TERUKUR:</span>
                                <span className="text-xs sm:text-sm font-bold text-[#1F2937]">{mod.highlight_metric}</span>
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <h4 className="text-xs font-bold text-[#1F2937] uppercase font-mono tracking-wider mb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2F8BFF]"></span>
                            Spesifikasi &amp; Ruang Lingkup Modul
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-3 border-l-2 border-slate-200">
                            {mod.full_description || mod.short_description}
                        </p>
                    </div>

                    {/* Features List */}
                    {mod.features && mod.features.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-[#1F2937] uppercase font-mono tracking-wider flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2F8BFF]"></span>
                                Standar Alur Kerja Terintegrasi
                            </h4>
                            <ul className="space-y-2">
                                {mod.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Compliance Tags */}
                    {mod.compliance_tags && mod.compliance_tags.length > 0 && (
                        <div className="space-y-2 pt-1">
                            <h4 className="text-xs font-bold text-[#1F2937] uppercase font-mono tracking-wider flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2F8BFF]"></span>
                                Interoperabilitas &amp; Bridging Regulasi
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {mod.compliance_tags.map((tag, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-medium">
                                        <ShieldCheck className="w-3.5 h-3.5 text-[#2F8BFF]" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
                        <button
                            onClick={closeModuleModal}
                            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors w-full sm:w-auto btn-spring"
                        >
                            Tutup
                        </button>

                        <button
                            onClick={() => {
                                closeModuleModal();
                                openDemoModal(mod.title);
                            }}
                            className="w-full sm:w-auto px-5 py-2.5 bg-[#2F8BFF] hover:bg-[#1E75E6] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer btn-spring"
                        >
                            <Calendar className="w-4 h-4" />
                            <span>Jadwalkan Demo Modul {mod.module_code}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
