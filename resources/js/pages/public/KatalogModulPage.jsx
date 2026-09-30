import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
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
    const { siteData, openDemoModal, openAssessmentModal, openModuleModal, getSetting } = useSite();
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

    const isVisible = (key, defaultVal = true) => {
        const val = getSetting(key, defaultVal);
        if (typeof val === 'boolean') return val;
        if (val === '1' || val === 'true') return true;
        if (val === '0' || val === 'false') return false;
        return defaultVal;
    };

    // Dynamic Theme Mood & Spacing Density
    const theme = getSetting('page_modul-simrs_theme', 'clinical-blue');
    const density = getSetting('page_modul-simrs_density', 'normal');
    const cardRadius = getSetting('page_modul-simrs_card_radius', 'rounded-2xl');

    const themeClass = {
        'clinical-blue': 'bg-[#F8FAFC] text-[#0F172A]',
        'pure-white': 'bg-white text-[#0F172A]',
        'dark-slate': 'bg-[#0B1120] text-slate-100',
        'emerald-health': 'bg-[#F0FDF4]/40 text-[#064E3B]',
        'indigo-luxury': 'bg-[#F5F3FF]/40 text-[#1E1B4B]',
    }[theme] || 'bg-[#F8FAFC] text-[#0F172A]';

    const pyDensity = {
        compact: 'py-8 sm:py-12',
        normal: 'py-12 sm:py-18',
        spacious: 'py-18 sm:py-26',
    }[density] || 'py-12 sm:py-18';

    // Parse Dynamic Section Order
    const rawOrder = getSetting('page_modul-simrs_section_order');
    let orderedKeys = ['hero', 'filter_search', 'modules_grid', 'cta'];

    if (rawOrder) {
        try {
            const parsed = typeof rawOrder === 'string' ? JSON.parse(rawOrder) : rawOrder;
            if (Array.isArray(parsed) && parsed.length > 0) {
                orderedKeys = parsed.filter(item => item.visible !== false).map(item => item.id);
            }
        } catch (e) {
            // fallback
        }
    }

    const renderHero = () => (
        <section key="hero" className="relative w-full bg-gradient-to-b from-white via-[#F0F6FE] to-[#F8FAFC] pt-8 pb-12 sm:pb-16 overflow-hidden border-b border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                    <button
                        type="button"
                        onClick={() => onNavigate('beranda')}
                        className="hover:text-[#1E60D5] transition-colors flex items-center gap-1 cursor-pointer font-medium focus-ring rounded"
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span>Beranda</span>
                    </button>
                    <span>/</span>
                    <span className="text-[#0F172A] font-semibold">Katalog Modul Ekosistem</span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 animate-slide-up">
                    <div className="max-w-2xl space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] border border-[#BFDBFE] text-[#1E60D5] font-mono text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
                            <span>{getSetting('page_modules_badge', 'Katalog Arsitektur Ekosistem Medis 36 Modul Terpadu')}</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight font-display">
                            {getSetting('page_modules_title', 'Modul Klinis, Rawat Inap, K3 & Manajerial Rumah Sakit')}
                        </h1>

                        <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed">
                            {getSetting('page_modules_subtitle', 'Seluruh modul terhubung secara native tanpa middleware pihak ketiga, dirancang sesuai alur kerja akreditasi STARKES, Kemenaker RI, dan regulasi Kemenkes SATUSEHAT.')}
                        </p>
                    </div>

                    {/* Telemetry Summary Card */}
                    <div className={`card-clinical p-4.5 sm:p-5 flex items-center gap-6 shrink-0 font-mono ${cardRadius}`}>
                        <div>
                            <span className="text-[10px] text-slate-500 block uppercase font-semibold">TOTAL ARSITEKTUR</span>
                            <span className="text-lg sm:text-2xl font-extrabold text-[#1E60D5]">{getSetting('page_modules_total_label', '36 Modul')}</span>
                        </div>
                        <div className="h-8 w-px bg-slate-200"></div>
                        <div>
                            <span className="text-[10px] text-slate-500 block uppercase font-semibold">STANDAR AKREDITASI</span>
                            <span className="text-lg sm:text-2xl font-extrabold text-emerald-600">{getSetting('page_modules_akreditasi_label', '100% STARKES')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    const renderFilterSearch = () => (
        <section key="filter_search" className="w-full bg-white border-b border-slate-200/80 py-4 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5">
                {/* Search Input */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari modul, kode (RME, APM, LIS, INA-CBGs, SATUSEHAT)..."
                        className="w-full pl-10 pr-9 py-2.5 rounded-full border border-slate-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-transparent transition-all shadow-xs"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            aria-label="Bersihkan pencarian"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Category Buttons */}
                <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1" role="tablist">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap btn-spring focus-ring ${
                                selectedCategory === cat.id
                                    ? 'bg-[#1E60D5] text-white font-semibold shadow-md shadow-blue-500/20'
                                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/90 shadow-xs'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );

    const renderModulesGrid = () => (
        <section key="modules_grid" className={`${pyDensity} flex-1`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {filteredModules.length === 0 ? (
                    <div className={`text-center py-16 bg-white ${cardRadius} border border-slate-200 p-8 space-y-3 animate-scale-in max-w-lg mx-auto shadow-sm`}>
                        <Activity className="h-10 w-10 text-slate-400 mx-auto" />
                        <h3 className="text-base font-bold text-[#0F172A] font-display">Tidak Ada Modul Ditemukan</h3>
                        <p className="text-xs text-slate-500 max-w-md mx-auto">
                            Tidak ditemukan modul dengan kata kunci "{searchQuery}". Coba kata kunci lain atau bersihkan filter pencarian.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCategory('all');
                                setSearchQuery('');
                            }}
                            className="btn-amber-warm btn-spring h-10 px-5 rounded-full text-white text-xs font-semibold cursor-pointer focus-ring"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {filteredModules.map((mod) => (
                            <div
                                key={mod.id}
                                onClick={() => openModuleModal(mod)}
                                className={`card-clinical p-5 sm:p-6 flex flex-col justify-between cursor-pointer group ${cardRadius}`}
                            >
                                <div className="space-y-3.5">
                                    <div className="flex items-center justify-between">
                                        <div className="w-10 h-10 rounded-xl bg-[#EBF2FE] text-[#1E60D5] flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform shadow-xs">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                        <span className="font-mono text-[10px] font-semibold text-slate-600 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                                            {mod.module_code}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#1E60D5] transition-colors leading-snug font-display">
                                            {mod.title}
                                        </h3>
                                        <div className="mt-1.5">
                                            <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1E60D5] border border-blue-100">
                                                {mod.category_name || 'Modul Inti'}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                                        {mod.short_description}
                                    </p>
                                </div>

                                <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1E60D5]">
                                    <span>Eksplorasi Alur Kerja</span>
                                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );

    const renderCta = () => (
        <section key="cta" className={`${pyDensity} bg-white border-t border-slate-200/60 relative overflow-hidden`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] text-[#1E60D5] text-xs font-mono font-semibold border border-[#BFDBFE]">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
                    <span>CUSTOMIZABLE WORKFLOW</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] font-display">
                    Butuh Penyesuaian Modul Sesuai SOP Khusus Rumah Sakit Anda?
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                    Konsultan klinis kami siap membantu pemetaan modul dan integrasi bridging yang sesuai dengan skala dan tipe faskes Anda.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => openDemoModal()}
                        className="btn-amber-warm btn-spring h-11 px-6 rounded-full text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer focus-ring"
                    >
                        <Rocket className="h-4 w-4 text-white" />
                        <span>Konsultasi Modul &amp; Demo Gratis</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => openAssessmentModal()}
                        className="btn-spring h-11 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-300 gap-2 flex items-center justify-center cursor-pointer shadow-xs focus-ring"
                    >
                        <Activity className="h-4 w-4 text-[#F97316]" />
                        <span>Uji Kesiapan SIMRS (2 Mnt)</span>
                    </button>
                </div>
            </div>
        </section>
    );

    const sectionRenderers = {
        hero: renderHero,
        filter_search: renderFilterSearch,
        modules_grid: renderModulesGrid,
        cta: renderCta,
    };

    return (
        <div className={`flex flex-col w-full min-h-screen ${themeClass} font-sans antialiased transition-colors duration-300`}>
            {orderedKeys.map((key) => {
                const renderer = sectionRenderers[key];
                return renderer ? renderer() : null;
            })}
        </div>
    );
}
