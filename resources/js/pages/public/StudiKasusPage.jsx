import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Button } from '@/components/ui/button';
import {
    Home,
    Calendar,
    TrendingUp,
    CheckCircle2,
    Building2,
    Hospital,
    Layers,
    Sparkles,
    ArrowRight,
    Rocket,
    Activity
} from 'lucide-react';

export default function StudiKasusPage({ onNavigate }) {
    const { siteData, openDemoModal, openAssessmentModal } = useSite();
    const caseStudies = siteData.case_studies || [];

    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'Semua Tipe Rumah Sakit' },
        { id: 'rsud', label: 'RSUD BLUD Pemerintah' },
        { id: 'swasta', label: 'Rumah Sakit Swasta' },
        { id: 'rsia', label: 'RS Khusus (RSIA / Jiwa / Mata)' },
    ];

    const filteredStudies = caseStudies.filter((cs) => {
        return selectedCategory === 'all' || cs.hospital_category === selectedCategory;
    });

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
                        backgroundImage: `url('https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=80')`,
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
                        fill="url(#studi-orange-gradient)" 
                    />
                    <defs>
                        <linearGradient id="studi-orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                        <span className="text-[#1F2937] font-semibold">Studi Kasus &amp; Dampak Klinis</span>
                    </div>

                    <div className="text-center max-w-3xl mx-auto space-y-3.5 animate-slide-up">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[#2F8BFF] font-mono text-xs font-bold shadow-2xs">
                            <span className="w-2 h-2 rounded-full bg-[#FF8A2B] animate-pulse"></span>
                            <span>Laporan Evaluasi Dampak Klinis &amp; Finansial Rumah Sakit</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight leading-tight font-display">
                            Transformasi Digital Terverifikasi di Berbagai RS Indonesia
                        </h1>

                        <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            Pelajari bagaimana rumah sakit mitra Liva memangkas waktu tunggu pasien, meloloskan akreditasi paripurna STARKES, dan mengoptimalkan arus kas klaim BPJS secara transparan.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => openDemoModal()}
                                className="px-6 py-3 rounded-full bg-[#2F8BFF] hover:bg-[#1E75E6] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center gap-2 btn-spring"
                            >
                                <Calendar className="h-4 w-4 text-amber-300" />
                                <span>Jadwalkan Diskusi Studi Kelayakan RS</span>
                            </button>
                        </div>
                    </div>

                    {/* Telemetry Summary HUD - Luminous Light Theme */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 p-5 sm:p-6 bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 text-slate-800 font-mono shadow-xl card-interactive animate-slide-up delay-stagger-2">
                        <div className="p-3 space-y-1">
                            <span className="text-[9.5px] text-slate-500 block uppercase font-semibold">EFISIENSI WAKTU TUNGGU</span>
                            <div className="text-lg sm:text-xl font-bold text-[#2F8BFF] flex items-baseline gap-1.5">
                                <span className="text-slate-400 line-through text-xs font-normal">45m</span>
                                <span>➔ 8.5 mnt</span>
                            </div>
                            <span className="text-[10px] text-emerald-600 font-sans block font-medium">Turun 81% antrean farmasi &amp; loket</span>
                        </div>

                        <div className="p-3 space-y-1 border-l border-slate-200">
                            <span className="text-[9.5px] text-slate-500 block uppercase font-semibold">VERIFIKASI KLAIM BPJS</span>
                            <div className="text-lg sm:text-xl font-bold text-emerald-600">99.8% LOLOS</div>
                            <span className="text-[10px] text-slate-500 font-sans block">Tanpa dispute retur berkas</span>
                        </div>

                        <div className="p-3 space-y-1 border-l border-slate-200">
                            <span className="text-[9.5px] text-slate-500 block uppercase font-semibold">MIGRASI DATA REKAM MEDIS</span>
                            <div className="text-lg sm:text-xl font-bold text-[#FF8A2B]">100% UTUH</div>
                            <span className="text-[10px] text-slate-500 font-sans block">Validasi hashing SHA-256</span>
                        </div>

                        <div className="p-3 space-y-1 border-l border-slate-200">
                            <span className="text-[9.5px] text-slate-500 block uppercase font-semibold">AKREDITASI STARKES</span>
                            <div className="text-lg sm:text-xl font-bold text-emerald-600">PARIPURNA</div>
                            <span className="text-[10px] text-slate-500 font-sans block">100% Bab Rekam Medis Terpenuhi</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 2. Case Studies Filter & List Section with Smooth Blur Boundaries         */}
            {/* ========================================================================= */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] py-16 sm:py-24">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Decorative Bottom-Right Orange Accent */}
                <svg 
                    className="absolute bottom-0 right-0 w-56 sm:w-80 h-28 pointer-events-none z-0" 
                    viewBox="0 0 320 120" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M320 120 L320 40 C240 60 160 95 100 120 Z" fill="#FF8A2B" opacity="0.12" />
                </svg>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer btn-spring ${
                                    selectedCategory === cat.id
                                        ? 'bg-[#2F8BFF] text-white font-bold shadow-md shadow-blue-500/20 scale-102'
                                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/90 shadow-2xs'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Case Study Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
                        {filteredStudies.map((cs) => (
                            <div
                                key={cs.id}
                                className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 hover:border-[#2F8BFF] hover:shadow-xl transition-all duration-300 p-6 sm:p-7 space-y-5 card-interactive flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                                        <div>
                                            <span className="text-[10.5px] font-mono text-[#2F8BFF] font-bold block uppercase tracking-wider">
                                                {cs.hospital_type} • {cs.location}
                                            </span>
                                            <h3 className="text-lg font-bold text-[#1F2937] leading-snug font-display mt-0.5">
                                                {cs.hospital_name}
                                            </h3>
                                        </div>
                                        <span className="font-mono text-[10px] font-bold text-slate-700 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 shadow-2xs">
                                            {cs.bed_count} TT
                                        </span>
                                    </div>

                                    <div className="space-y-3 text-xs sm:text-[13px]">
                                        <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                                            <span className="font-bold text-slate-800 block text-xs mb-1">Tantangan Awal:</span>
                                            <p className="text-slate-600 italic leading-relaxed">"{cs.challenge}"</p>
                                        </div>

                                        <div className="bg-blue-50/40 p-3.5 rounded-2xl border border-blue-100/60">
                                            <span className="font-bold text-[#2F8BFF] block text-xs mb-1">Solusi Implementasi Liva:</span>
                                            <p className="text-slate-700 leading-relaxed">{cs.solution}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex items-center gap-3 text-xs text-emerald-950 font-semibold shadow-2xs">
                                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                        <TrendingUp className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-emerald-700 block uppercase font-mono tracking-wider">Dampak Terukur:</span>
                                        <span className="text-xs sm:text-sm font-bold text-emerald-900">{cs.impact_metric}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 3. Bottom Consultation Call To Action                                     */}
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
                        <span>PROVEN TRACK RECORD</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F2937] font-display">
                        Ingin Mengetahui Proyeksi Efisiensi untuk Rumah Sakit Anda?
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                        Tim analis klinis kami siap menyusun simulasi kalkulasi ROI dan skema transisi data tanpa mengganggu operasional IGD dan Rawat Jalan yang sedang berjalan.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button
                            onClick={() => openDemoModal()}
                            className="h-11 px-6 rounded-full bg-[#2F8BFF] hover:bg-[#1E75E6] text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all cursor-pointer gap-2 btn-spring"
                        >
                            <Rocket className="h-4 w-4 text-white" />
                            <span>Jadwalkan Diskusi Studi Kasus</span>
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
