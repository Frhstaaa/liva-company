import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Search,
    X,
    Activity,
    Home,
    ArrowRight,
    Layers,
    CheckCircle2,
    Shield,
    Sparkles,
    Rocket
} from 'lucide-react';

export default function KatalogModulPage({ onNavigate }) {
    const { siteData, openDemoModal, openAssessmentModal, openModuleModal } = useSite();
    const modules = siteData.modules || [];

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', label: 'Semua 36 Modul Terintegrasi' },
        { id: 'front-office', label: 'Admisi & APM Mandiri' },
        { id: 'clinical', label: 'Pelayanan Medis (RME & SOAP)' },
        { id: 'k3', label: 'Klinik Industri & MCU K3' },
        { id: 'ancillary', label: 'Penunjang Medis (LIS & PACS)' },
        { id: 'pharmacy', label: 'Smart Pharmacy & FEFO' },
        { id: 'finance', label: 'Billing & INA-CBGs BPJS' },
        { id: 'integration', label: 'SATUSEHAT FHIR & IT Core' },
    ];

    const filteredModules = modules.filter((mod) => {
        const matchesCategory = selectedCategory === 'all' || 
            mod.category === selectedCategory;
        const matchesSearch =
            searchQuery.trim() === '' ||
            mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mod.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mod.module_code.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#F8FAFC] text-[#1F2937] font-sans">
            {/* ========================================================================= */}
            {/* 1. Header & Architectural Overview with Luminous Gradient & Mask          */}
            {/* ========================================================================= */}
            <section className="relative w-full bg-gradient-to-b from-white via-[#F4F8FE] to-[#EEF5FF] pt-8 pb-16 sm:pb-20 overflow-hidden">
                {/* 1.1 Architectural Hospital Background Image Overlay (Top Right) */}
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
                        fill="url(#modul-orange-gradient)" 
                    />
                    <defs>
                        <linearGradient id="modul-orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                        <span className="text-[#1F2937] font-semibold">Katalog Modul Ekosistem</span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 animate-slide-up">
                        <div className="max-w-2xl space-y-3">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[#2F8BFF] font-mono text-xs font-bold shadow-2xs">
                                <span className="w-2 h-2 rounded-full bg-[#FF8A2B] animate-pulse"></span>
                                <span>Katalog Arsitektur Ekosistem Medis 36 Modul Terpadu</span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight leading-tight font-display">
                                Modul Klinis, Rawat Inap, K3 &amp; Manajerial Rumah Sakit
                            </h1>

                            <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed">
                                Seluruh modul terhubung secara native tanpa middleware pihak ketiga, dirancang sesuai alur kerja akreditasi STARKES, Kemenaker RI, dan regulasi Kemenkes SATUSEHAT.
                            </p>
                        </div>

                        {/* Telemetry Summary Pill - Luminous Light Node */}
                        <div className="bg-white/95 backdrop-blur-sm p-4.5 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xl flex items-center gap-6 shrink-0 font-mono card-interactive">
                            <div>
                                <span className="text-[9.5px] text-slate-500 block uppercase font-semibold">TOTAL ARSITEKTUR</span>
                                <span className="text-lg sm:text-2xl font-extrabold text-[#2F8BFF]">36 Modul</span>
                            </div>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <div>
                                <span className="text-[9.5px] text-slate-500 block uppercase font-semibold">STANDAR AKREDITASI</span>
                                <span className="text-lg sm:text-2xl font-extrabold text-emerald-600">100% STARKES</span>
                            </div>
                        </div>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="space-y-3.5 pt-4 border-t border-slate-200/80">
                        {/* Search Input */}
                        <div className="relative max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari modul, kode (RME, APM, LIS, INA-CBGs, SATUSEHAT)..."
                                className="w-full pl-10 pr-9 py-2.5 rounded-full border border-slate-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-transparent transition-all shadow-2xs"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {/* Category Buttons */}
                        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap btn-spring ${
                                        selectedCategory === cat.id
                                            ? 'bg-[#2F8BFF] text-white font-bold shadow-md shadow-blue-500/20 scale-102'
                                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/90 shadow-2xs'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 2. Modules Grid Section with Smooth Top & Bottom Blur                     */}
            {/* ========================================================================= */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] py-12 sm:py-16 flex-1">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Decorative Background Accents */}
                <svg 
                    className="absolute bottom-0 right-0 w-56 sm:w-80 h-28 pointer-events-none z-0" 
                    viewBox="0 0 320 120" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M320 120 L320 40 C240 60 160 95 100 120 Z" fill="#FF8A2B" opacity="0.12" />
                </svg>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {filteredModules.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3 animate-scale-in max-w-lg mx-auto shadow-sm">
                            <Activity className="h-10 w-10 text-slate-400 mx-auto" />
                            <h3 className="text-base font-bold text-[#1F2937] font-display">Tidak Ada Modul Ditemukan</h3>
                            <p className="text-xs text-slate-500 max-w-md mx-auto">
                                Tidak ditemukan modul dengan kata kunci "{searchQuery}". Coba kata kunci lain atau bersihkan filter pencarian.
                            </p>
                            <Button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setSearchQuery('');
                                }}
                                className="bg-[#2F8BFF] hover:bg-[#1E75E6] text-white text-xs font-semibold btn-spring cursor-pointer rounded-full px-5"
                            >
                                Reset Filter
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                            {filteredModules.map((mod) => (
                                <div
                                    key={mod.id}
                                    onClick={() => openModuleModal(mod)}
                                    className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 hover:border-[#2F8BFF] hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between cursor-pointer group card-interactive"
                                >
                                    <div className="space-y-3.5">
                                        <div className="flex items-center justify-between">
                                            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2F8BFF] flex items-center justify-center font-bold text-xs group-hover:bg-[#2F8BFF] group-hover:text-white transition-colors duration-200 shadow-2xs">
                                                <Activity className="h-5 w-5" />
                                            </div>
                                            <span className="font-mono text-[10px] font-bold text-slate-700 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                                                {mod.module_code}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-base font-bold text-[#1F2937] group-hover:text-[#2F8BFF] transition-colors leading-snug font-display">
                                                {mod.title}
                                            </h3>
                                            <div className="mt-1.5">
                                                <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2F8BFF] border border-blue-100">
                                                    {mod.category_name || 'Modul Inti'}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                                            {mod.short_description}
                                        </p>
                                    </div>

                                    <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#2F8BFF]">
                                        <span>Eksplorasi Alur Kerja</span>
                                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 3. Bottom Consultation Call To Action                     */}
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
                        <span>CUSTOMIZABLE WORKFLOW</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F2937] font-display">
                        Butuh Penyesuaian Modul Sesuai SOP Khusus Rumah Sakit Anda?
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                        Konsultan klinis kami siap membantu pemetaan modul dan integrasi bridging yang sesuai dengan skala dan tipe faskes Anda.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button
                            onClick={() => openDemoModal()}
                            className="h-11 px-6 rounded-full bg-[#2F8BFF] hover:bg-[#1E75E6] text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all cursor-pointer gap-2 btn-spring"
                        >
                            <Rocket className="h-4 w-4 text-white" />
                            <span>Konsultasi Modul &amp; Demo Gratis</span>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => openAssessmentModal()}
                            className="h-11 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 gap-2 btn-spring cursor-pointer shadow-2xs"
                        >
                            <Activity className="h-4 w-4 text-[#FF8A2B]" />
                            <span>Uji Kesiapan SIMRS (2 Mnt)</span>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
