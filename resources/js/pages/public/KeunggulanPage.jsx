import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Button } from '@/components/ui/button';
import {
    Home,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    XCircle,
    HelpCircle,
    Clock,
    Network,
    Gauge,
    ShieldCheck,
    Calendar,
    Activity,
    GitCompare,
    Rocket,
    Layers
} from 'lucide-react';

export default function KeunggulanPage({ onNavigate }) {
    const { siteData, getSetting, openDemoModal, openAssessmentModal } = useSite();
    const pillars = siteData.pillars || [];
    const comparisons = siteData.comparisons || [];

    // KPI Strip values from CMS
    const kpiRme = getSetting('kpi_rme_time', '2.4 mnt');
    const kpiRmeNote = getSetting('kpi_rme_time_note', 'Turun 78% dari SIMRS lama');
    const kpiFhir = getSetting('kpi_fhir_sync', '100%');
    const kpiFhirNote = getSetting('kpi_fhir_note', 'Zero Double Data-Entry');
    const kpiGolive = getSetting('kpi_golive_speed', '6-8 Mgg');
    const kpiGoliveNote = getSetting('kpi_golive_note', 'Pendampingan dokter on-site');
    const kpiBpjs = getSetting('kpi_bpjs_dispute', '< 0.3%');
    const kpiBpjsNote = getSetting('kpi_bpjs_note', 'Pre-Validation INA-CBGs');

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#F8FAFC] text-[#1F2937] font-sans">
            {/* ========================================================================= */}
            {/* 1. Header Section with Hospital Image Mask & Luminous Gradient            */}
            {/* ========================================================================= */}
            <section className="relative w-full bg-gradient-to-b from-white via-[#F4F8FE] to-[#EEF5FF] pt-8 pb-16 sm:pb-20 overflow-hidden">
                {/* 1.1 Architectural Hospital Background Image Overlay */}
                <div 
                    className="absolute top-0 right-0 w-full sm:w-2/3 lg:w-1/2 h-full pointer-events-none z-0 opacity-15 bg-cover bg-no-repeat bg-right-top mix-blend-multiply"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80')`,
                        maskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 75%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 75%)'
                    }}
                />

                {/* 1.2 Bottom Left Modern Blue Geometric Accent Shape */}
                <svg 
                    className="absolute bottom-0 left-0 w-44 sm:w-64 h-28 sm:h-36 pointer-events-none z-0 opacity-90" 
                    viewBox="0 0 240 140" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M0 140 L0 80 L120 140 Z" fill="#2F8BFF" />
                    <path d="M0 140 L60 50 L180 140 Z" fill="#5BC0FF" opacity="0.6" />
                </svg>

                {/* 1.3 Bottom Right Dynamic Orange Wave Accent */}
                <svg 
                    className="absolute bottom-0 right-0 w-64 sm:w-96 h-28 sm:h-40 pointer-events-none z-0" 
                    viewBox="0 0 400 160" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path 
                        d="M400 160 L400 30 C300 60 200 110 120 160 Z" 
                        fill="url(#keunggulan-orange-gradient)" 
                    />
                    <defs>
                        <linearGradient id="keunggulan-orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FF9E4A" />
                            <stop offset="100%" stopColor="#FF7A00" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* 1.4 Subtle Dot Grid Matrix */}
                <div className="absolute top-8 right-16 hidden lg:grid grid-cols-8 gap-2.5 pointer-events-none opacity-25 z-0">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#2F8BFF]"></span>
                    ))}
                </div>

                {/* 1.5 Soft White Blur Fade at Bottom Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                        <button
                            type="button"
                            onClick={() => onNavigate('beranda')}
                            className="hover:text-[#2F8BFF] transition-colors flex items-center gap-1 cursor-pointer font-medium"
                        >
                            <Home className="h-3.5 w-3.5" />
                            <span>Beranda</span>
                        </button>
                        <span>/</span>
                        <span className="text-[#1F2937] font-semibold">Keunggulan &amp; Komparasi</span>
                    </div>

                    <div className="text-center max-w-3xl mx-auto space-y-3.5 animate-slide-up">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[#2F8BFF] font-mono text-xs font-bold shadow-2xs">
                            <span className="w-2 h-2 rounded-full bg-[#FF8A2B] animate-pulse"></span>
                            <span>Evaluasi Objektif Arsitektur SIMRS Enterprise</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight leading-tight font-display">
                            Mengapa Rumah Sakit Terkemuka Memilih Liva SIMRS?
                        </h1>

                        <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            Bukan sekadar aplikasi pencatatan administratif. Liva SIMRS adalah sistem pendukung keputusan klinis berstandar internasional yang menjamin kelancaran klaim BPJS, kepatuhan SATUSEHAT Kemenkes, dan efisiensi belanja faskes.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => openAssessmentModal()}
                                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2F8BFF] hover:bg-[#1E75E6] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 btn-spring"
                            >
                                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                                <span>Uji Kelayakan SIMRS (2 Menit)</span>
                            </button>

                            <a
                                href="#komparasi-table"
                                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm border border-slate-300 shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2 btn-spring"
                            >
                                <GitCompare className="h-4 w-4 text-[#2F8BFF]" />
                                <span>Lihat Matriks Perbandingan</span>
                            </a>
                        </div>
                    </div>

                    {/* KPI Telemetry Strip - Luminous Light Theme */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5 sm:p-6 bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 text-slate-800 font-mono shadow-xl card-interactive animate-slide-up delay-stagger-2">
                        <div className="p-3 text-center space-y-1">
                            <div className="flex items-center justify-center gap-1.5 text-[#2F8BFF]">
                                <Clock className="h-4 w-4" />
                                <span className="text-lg sm:text-2xl font-bold text-[#1F2937]">{kpiRme}</span>
                            </div>
                            <span className="text-[10.5px] text-slate-600 block font-sans">Waktu Input RME Dokter</span>
                            <span className="text-[10px] text-emerald-600 font-semibold block">{kpiRmeNote}</span>
                        </div>

                        <div className="p-3 text-center space-y-1 border-l border-slate-200">
                            <div className="flex items-center justify-center gap-1.5 text-emerald-600">
                                <Activity className="h-4 w-4" />
                                <span className="text-lg sm:text-2xl font-bold text-[#1F2937]">{kpiFhir}</span>
                            </div>
                            <span className="text-[10.5px] text-slate-600 block font-sans">SATUSEHAT FHIR Sync</span>
                            <span className="text-[10px] text-[#2F8BFF] font-semibold block">{kpiFhirNote}</span>
                        </div>

                        <div className="p-3 text-center space-y-1 border-l border-slate-200">
                            <div className="flex items-center justify-center gap-1.5 text-[#FF8A2B]">
                                <Gauge className="h-4 w-4" />
                                <span className="text-lg sm:text-2xl font-bold text-[#1F2937]">{kpiGolive}</span>
                            </div>
                            <span className="text-[10.5px] text-slate-600 block font-sans">Kecepatan Go-Live</span>
                            <span className="text-[10px] text-amber-600 font-semibold block">{kpiGoliveNote}</span>
                        </div>

                        <div className="p-3 text-center space-y-1 border-l border-slate-200">
                            <div className="flex items-center justify-center gap-1.5 text-emerald-600">
                                <ShieldCheck className="h-4 w-4" />
                                <span className="text-lg sm:text-2xl font-bold text-[#1F2937]">{kpiBpjs}</span>
                            </div>
                            <span className="text-[10.5px] text-slate-600 block font-sans">Dispute Klaim BPJS</span>
                            <span className="text-[10px] text-emerald-600 font-semibold block">{kpiBpjsNote}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 2. 6 Core Pillars Bento Grid Section with Smooth Blur Boundaries          */}
            {/* ========================================================================= */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] py-16 sm:py-24">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Decorative Top-Left Blue Accent */}
                <svg 
                    className="absolute top-0 left-0 w-44 sm:w-64 h-28 pointer-events-none z-0 opacity-70" 
                    viewBox="0 0 240 120" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M0 0 L120 0 L0 80 Z" fill="#2F8BFF" opacity="0.12" />
                </svg>

                {/* Dot Matrix Grid */}
                <div className="absolute top-12 right-12 hidden lg:grid grid-cols-8 gap-2.5 pointer-events-none opacity-25 z-0">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#2F8BFF]"></span>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF4FF] text-[#2F8BFF] text-xs font-mono font-bold border border-[#CCE2FF]">
                            <Layers className="h-3.5 w-3.5" />
                            <span>ARCHITECTURAL EXCELLENCE</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight font-display">
                            6 Pilar Fondasi Sistem Informasi Manajemen Rumah Sakit
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Fondasi arsitektur cloud native yang tangguh untuk memfasilitasi beban operasional medis 24/7 tanpa kompromi performa.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {pillars.map((pilar, index) => (
                            <div
                                key={index}
                                className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/90 hover:border-[#2F8BFF] hover:shadow-xl transition-all duration-300 space-y-3.5 group card-interactive"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 text-[#2F8BFF] flex items-center justify-center shadow-2xs group-hover:bg-[#2F8BFF] group-hover:text-white transition-colors duration-200">
                                        <Activity className="h-5 w-5" />
                                    </div>
                                    <span className="font-mono text-[10px] text-slate-700 font-bold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                                        PILAR 0{index + 1}
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-[#1F2937] group-hover:text-[#2F8BFF] transition-colors leading-snug font-display">
                                    {pilar.title}
                                </h3>

                                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                                    {pilar.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 3. Comprehensive KLAS-Grade Comparison Matrix Table                       */}
            {/* ========================================================================= */}
            <section id="komparasi-table" className="relative overflow-hidden bg-gradient-to-b from-[#F4F8FE] via-white to-[#EEF5FF] py-16 sm:py-24">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Decorative Bottom-Right Orange Accent */}
                <svg 
                    className="absolute bottom-0 right-0 w-64 sm:w-96 h-32 pointer-events-none z-0" 
                    viewBox="0 0 360 140" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M360 140 L360 40 C280 70 180 110 100 140 Z" fill="#FF8A2B" opacity="0.15" />
                </svg>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF0E6] text-[#FF8A2B] text-xs font-mono font-bold border border-[#FFD8BF]">
                            <GitCompare className="h-3.5 w-3.5" />
                            <span>OBJECTIVE EVALUATION MATRIX</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight font-display">
                            Matriks Komparasi Standar Evaluasi Rumah Sakit
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Perbandingan menyeluruh Liva SIMRS terhadap vendor warisan lama dan pengembangan internal (in-house).
                        </p>
                    </div>

                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="bg-slate-100/90 text-slate-800 font-mono text-[11px] border-b border-slate-200">
                                        <th className="p-4 sm:p-5 font-bold">DIMENSI EVALUASI</th>
                                        <th className="p-4 sm:p-5 font-bold bg-[#2F8BFF] text-white">LIVA SIMRS (ENTERPRISE)</th>
                                        <th className="p-4 sm:p-5 font-bold text-slate-700">VENDOR SIMRS LAMA</th>
                                        <th className="p-4 sm:p-5 font-bold text-slate-700">DEVELOPMENT IN-HOUSE</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200/80">
                                    {comparisons.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-blue-50/20 transition-colors">
                                            <td className="p-4 sm:p-5 font-bold text-[#1F2937] bg-slate-50/50">
                                                {item.feature}
                                            </td>
                                            <td className="p-4 sm:p-5 font-semibold text-[#1F2937] bg-blue-50/40 border-x border-blue-100">
                                                <div className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                                    <span>{item.liva}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 sm:p-5 text-slate-600">
                                                <div className="flex items-start gap-2">
                                                    <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                                                    <span>{item.others}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 sm:p-5 text-slate-600">
                                                <div className="flex items-start gap-2">
                                                    <HelpCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                                    <span>{item.inhouse || 'Tergantung turnover programmer IT internal'}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-slate-500 font-mono">
                            * Data perbandingan diverifikasi dari audit implementasi 18+ rumah sakit mitra.
                        </p>
                        <button
                            type="button"
                            onClick={() => openDemoModal()}
                            className="px-6 py-3 bg-[#2F8BFF] hover:bg-[#1E75E6] text-white rounded-full text-xs font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center gap-2 btn-spring"
                        >
                            <Calendar className="h-4 w-4" />
                            <span>Jadwalkan Technical Assessment RS</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 4. Bottom Consultation Call To Action                                     */}
            {/* ========================================================================= */}
            <section className="py-16 sm:py-20 bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] relative overflow-hidden">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Decorative Bottom-Right Orange Accent */}
                <svg 
                    className="absolute bottom-0 right-0 w-64 sm:w-96 h-32 pointer-events-none z-0" 
                    viewBox="0 0 360 140" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M360 140 L360 40 C280 70 180 110 100 140 Z" fill="#FF8A2B" opacity="0.15" />
                </svg>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] text-[#2F8BFF] text-xs font-mono font-bold border border-[#CCE2FF] shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-[#FF8A2B] animate-pulse"></span>
                        <span>CLINICAL RISK ASSESSMENT</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F2937] font-display">
                        Siap Membuktikan Efisiensi Finansial &amp; Klinis Liva SIMRS?
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                        Dapatkan perbandingan detail TCO (Total Cost of Ownership) dan uji coba live data sandbox untuk tim manajemen faskes Anda.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button
                            onClick={() => openDemoModal()}
                            className="h-11 px-6 rounded-full bg-[#2F8BFF] hover:bg-[#1E75E6] text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all cursor-pointer gap-2 btn-spring"
                        >
                            <Rocket className="h-4 w-4 text-white" />
                            <span>Jadwalkan Live Demo RS</span>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => openAssessmentModal()}
                            className="h-11 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 gap-2 btn-spring cursor-pointer shadow-2xs"
                        >
                            <Activity className="h-4 w-4 text-[#FF8A2B]" />
                            <span>Uji Kesiapan SIMRS (2 Menit)</span>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
