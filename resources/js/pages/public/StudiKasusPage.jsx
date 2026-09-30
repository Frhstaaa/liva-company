import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Button } from '@/components/ui/button';
import SectionWrapper from '../../components/public/SectionWrapper';
import { getSectionCustomStyles } from '../../lib/sectionStyler';
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
    Activity,
    ChevronRight,
    Check,
    ShieldCheck,
    Award,
    Zap
} from 'lucide-react';

export default function StudiKasusPage({ onNavigate }) {
    const { siteData, openDemoModal, openAssessmentModal, getSetting } = useSite();
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

    const [bedCountSim, setBedCountSim] = useState(150);

    const isVisible = (key, defaultVal = true) => {
        const val = getSetting(key, defaultVal);
        if (typeof val === 'boolean') return val;
        if (val === '1' || val === 'true') return true;
        if (val === '0' || val === 'false') return false;
        return defaultVal;
    };

    // Dynamic Theme Mood & Spacing Density
    const theme = getSetting('page_studi-kasus_theme', 'clinical-blue');
    const density = getSetting('page_studi-kasus_density', 'normal');
    const cardRadius = getSetting('page_studi-kasus_card_radius', 'rounded-2xl');

    const themeClass = {
        'clinical-blue': 'bg-[#F8FAFC] text-[#0F172A]',
        'pure-white': 'bg-white text-[#0F172A]',
        'dark-slate': 'bg-[#0B1120] text-slate-100',
        'emerald-health': 'bg-[#F0FDF4]/40 text-[#064E3B]',
        'indigo-luxury': 'bg-[#F5F3FF]/40 text-[#1E1B4B]',
    }[theme] || 'bg-[#F8FAFC] text-[#0F172A]';

    const pyDensity = {
        compact: 'py-6 sm:py-8',
        normal: 'py-10 sm:py-14',
        spacious: 'py-14 sm:py-18',
    }[density] || 'py-10 sm:py-14';

    // Parse Dynamic Section Order
    const rawOrder = getSetting('page_studi-kasus_section_order');
    let orderedKeys = ['hero', 'case_cards', 'roi_calculator', 'cta'];

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

    const renderHero = () => {
        const heroStyles = getSectionCustomStyles(getSetting, 'studi-kasus', 'hero', {
            defaultBgClass: 'bg-gradient-to-b from-white via-[#F8FAFC] to-[#EEF5FF]',
            accent: '#1B84FF',
            defaultPaddingClass: 'pt-6 pb-10 sm:pb-14',
        });

        return (
            <section
                key="hero"
                id="sec-studi-kasus-hero"
                className={`relative w-full ${heroStyles.bgClass} ${heroStyles.paddingClass} ${heroStyles.borderClass} overflow-hidden border-b border-slate-200/70`}
                style={heroStyles.bgStyle}
            >
                {/* Architectural Hospital Photo Overlay */}
                <div 
                    className="absolute top-0 right-0 w-full sm:w-2/3 lg:w-1/2 h-full pointer-events-none z-0 opacity-12 bg-cover bg-no-repeat bg-right-top mix-blend-multiply"
                    style={{
                        backgroundImage: `url(${heroStyles.imageUrl || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=80'})`,
                        maskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 80%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 80%)'
                    }}
                />

                {/* Clean Ambiance Accents */}
                {heroStyles.hasAmbientGlow && (
                    <div
                        className="absolute inset-0 pointer-events-none opacity-30"
                        style={{
                            background: `radial-gradient(ellipse 60% 50% at 75% 0%, ${heroStyles.accentColor || '#1B84FF'}20 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 25% 100%, rgba(249,115,22,0.05) 0%, transparent 70%)`
                        }}
                    />
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
                    {/* Accessible Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                        <button
                            type="button"
                            onClick={() => onNavigate('beranda')}
                            className="hover:text-[#1E60D5] transition-colors flex items-center gap-1 cursor-pointer font-medium focus-ring rounded"
                        >
                            <Home className="h-3.5 w-3.5" />
                            <span>Beranda</span>
                        </button>
                        <ChevronRight className="h-3 w-3 text-slate-400" />
                        <span className="text-[#0F172A] font-semibold">Studi Kasus &amp; Dampak Klinis</span>
                    </nav>

                    <div className="text-center max-w-3xl mx-auto space-y-4 animate-slide-up">
                        {heroStyles.showBadge && (
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] border border-[#C5DCFE] text-[#1E60D5] font-mono text-xs font-bold shadow-2xs">
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: heroStyles.accentColor }}></span>
                                <span>{heroStyles.badge || getSetting('page_case_badge', 'LAPORAN EVALUASI DAMPAK KLINIS & FINANSIAL RUMAH SAKIT')}</span>
                            </div>
                        )}

                        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight font-display ${heroStyles.titleTextClass}`}>
                            {heroStyles.title || getSetting('page_case_title', 'Transformasi Digital Terverifikasi di Berbagai RS Indonesia')}
                        </h1>

                        <p className={`text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-2xl mx-auto ${heroStyles.bodyTextClass}`}>
                            {heroStyles.description || getSetting('page_case_subtitle', 'Pelajari bagaimana rumah sakit mitra Liva memangkas waktu tunggu pasien, meloloskan akreditasi paripurna STARKES, dan mengoptimalkan arus kas klaim BPJS secara transparan.')}
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            {heroStyles.showCta && (
                                <button
                                    type="button"
                                    onClick={() => openDemoModal()}
                                    className={`${heroStyles.ctaClass} px-6 py-3 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 btn-spring focus-ring`}
                                >
                                    <Calendar className="h-4 w-4 text-amber-300" />
                                    <span>{heroStyles.ctaPrimaryText || 'Jadwalkan Diskusi Studi Kelayakan RS'}</span>
                                </button>
                            )}
                        </div>
                    </div>

                {/* Telemetry Summary HUD - Clean Clinical Cards */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 p-5 sm:p-6 bg-white/95 backdrop-blur-sm ${cardRadius} border border-slate-200/90 shadow-md animate-slide-up delay-stagger-2`}>
                    <div className="p-3 space-y-1">
                        <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">EFISIENSI WAKTU TUNGGU</span>
                        <div className="text-lg sm:text-xl font-bold text-[#1E60D5] flex items-baseline gap-1.5 tabular-nums">
                            <span className="text-slate-400 line-through text-xs font-normal">45m</span>
                            <span>➔ 8.5 mnt</span>
                        </div>
                        <span className="text-[11px] text-emerald-700 font-sans block font-semibold">Turun 81% antrean farmasi &amp; loket</span>
                    </div>

                    <div className="p-3 space-y-1 border-t sm:border-t-0 sm:border-l border-slate-200/80">
                        <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">VERIFIKASI KLAIM BPJS</span>
                        <div className="text-lg sm:text-xl font-bold text-emerald-700 tabular-nums">99.8% LOLOS</div>
                        <span className="text-[11px] text-slate-600 font-sans block">Tanpa dispute retur berkas</span>
                    </div>

                    <div className="p-3 space-y-1 border-t lg:border-t-0 lg:border-l border-slate-200/80">
                        <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">MIGRASI DATA REKAM MEDIS</span>
                        <div className="text-lg sm:text-xl font-bold text-[#EA580C] tabular-nums">100% UTUH</div>
                        <span className="text-[11px] text-slate-600 font-sans block">Validasi hashing SHA-256</span>
                    </div>

                    <div className="p-3 space-y-1 border-t sm:border-t-0 sm:border-l border-slate-200/80">
                        <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">AKREDITASI STARKES</span>
                        <div className="text-lg sm:text-xl font-bold text-emerald-700">PARIPURNA</div>
                        <span className="text-[11px] text-slate-600 font-sans block">100% Bab Rekam Medis Terpenuhi</span>
                    </div>
                </div>
            </div>
        </section>
        );
    };

    const renderCaseCards = () => (
        <section key="case_cards" className={`relative overflow-hidden bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] ${pyDensity}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
                {/* Accessible Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Filter kategori rumah sakit">
                    {categories.map((cat) => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                role="tab"
                                aria-selected={isSelected}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer btn-spring focus-ring ${
                                    isSelected
                                        ? 'bg-[#1E60D5] text-white shadow-md shadow-blue-600/20'
                                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/90 shadow-2xs'
                                }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Asymmetric Case Study Bento Architecture */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-7">
                    {filteredStudies.map((cs, idx) => {
                        const isGrandCase = idx === 0;

                        if (isGrandCase) {
                            return (
                                <div
                                    key={cs.id}
                                    className="col-span-12 relative overflow-hidden p-2 sm:p-2.5 rounded-[2.25rem] bg-gradient-to-br from-blue-100/90 via-slate-100/80 to-emerald-50/50 border border-blue-200/90 shadow-md group transition-all duration-300"
                                >
                                    <div className="p-6 sm:p-8 lg:p-9 rounded-[calc(2.25rem-0.5rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_0%,rgba(30,96,213,0.08)_0%,transparent_70%)] pointer-events-none" />

                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
                                            {/* Left Column: Context, Challenge & Solution */}
                                            <div className="lg:col-span-7 space-y-5">
                                                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                                    <div className="flex items-center gap-2.5">
                                                        <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1E60D5] font-mono text-[10.5px] font-bold">
                                                            FLAGSHIP CASE STUDY
                                                        </span>
                                                        <span className="text-[11px] font-mono text-slate-500 font-semibold">
                                                            {cs.hospital_type} • {cs.location}
                                                        </span>
                                                    </div>
                                                    <span className="font-mono text-xs font-bold text-slate-800 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 shadow-2xs">
                                                        {cs.bed_count} Tempat Tidur
                                                    </span>
                                                </div>

                                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0F172A] tracking-tight font-display group-hover:text-[#1E60D5] transition-colors leading-tight">
                                                    {cs.hospital_name}
                                                </h3>

                                                <div className="space-y-3.5 text-xs sm:text-[13px]">
                                                    <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                                                        <span className="font-mono font-bold text-rose-600 block text-[11px] uppercase tracking-wide">
                                                            Tantangan Awal:
                                                        </span>
                                                        <p className="text-slate-600 italic leading-relaxed">
                                                            "{cs.challenge}"
                                                        </p>
                                                    </div>

                                                    <div className="bg-[#EBF2FE]/70 p-4 rounded-2xl border border-[#C5DCFE]/80 space-y-1">
                                                        <span className="font-mono font-bold text-[#1E60D5] block text-[11px] uppercase tracking-wide">
                                                            Solusi Terintegrasi Liva:
                                                        </span>
                                                        <p className="text-slate-700 leading-relaxed font-medium">
                                                            {cs.solution}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Column: High-Impact Metric Terminal */}
                                            <div className="lg:col-span-5 p-1 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-200/90 shadow-sm">
                                                <div className="p-6 rounded-[calc(1rem-0.125rem)] bg-white space-y-5">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                                            VERIFIED ROI IMPACT
                                                        </span>
                                                        <Award className="h-5 w-5 text-emerald-600" />
                                                    </div>

                                                    <div className="space-y-1">
                                                        <span className="text-xs text-slate-500 font-mono block">Dampak Utama Terukur:</span>
                                                        <div className="text-xl sm:text-2xl font-black text-emerald-800 font-display leading-tight">
                                                            {cs.impact_metric}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2.5 pt-2 border-t border-emerald-100">
                                                        <div className="flex items-center justify-between text-xs text-slate-700 font-mono">
                                                            <span>Antrean Pasien Rawat Jalan:</span>
                                                            <span className="text-emerald-700 font-bold">Turun 81%</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-xs text-slate-700 font-mono">
                                                            <span>Lolos Verifikasi Klaim BPJS:</span>
                                                            <span className="text-emerald-700 font-bold">99.8% (0 Dispute)</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-xs text-slate-700 font-mono">
                                                            <span>Akreditasi KARS STARKES:</span>
                                                            <span className="text-emerald-700 font-bold">Lulus Paripurna</span>
                                                        </div>
                                                    </div>

                                                    <div className="pt-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => openDemoModal(`Studi Kasus ${cs.hospital_name}`)}
                                                            className="w-full btn-spring py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer focus-ring"
                                                        >
                                                            <span>Konsultasi Studi Kelayakan Mirip</span>
                                                            <ArrowRight className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        // Staggered secondary cards
                        return (
                            <div
                                key={cs.id}
                                className="col-span-12 lg:col-span-6 p-1.5 sm:p-2 rounded-[2rem] bg-slate-100/80 hover:bg-slate-200/60 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all duration-300 group"
                            >
                                <div className="p-6 sm:p-7 rounded-[calc(2rem-0.375rem)] bg-white h-full flex flex-col justify-between space-y-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                                            <div>
                                                <span className="text-[10.5px] font-mono text-[#1E60D5] font-bold block uppercase tracking-wider">
                                                    {cs.hospital_type} • {cs.location}
                                                </span>
                                                <h3 className="text-lg font-bold text-[#0F172A] leading-snug font-display mt-0.5 group-hover:text-[#1E60D5] transition-colors">
                                                    {cs.hospital_name}
                                                </h3>
                                            </div>
                                            <span className="font-mono text-[10px] font-bold text-slate-700 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 shadow-2xs shrink-0">
                                                {cs.bed_count} TT
                                            </span>
                                        </div>

                                        <div className="space-y-3 text-xs sm:text-[13px]">
                                            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/70">
                                                <span className="font-bold text-slate-800 block text-xs mb-1">Tantangan Awal:</span>
                                                <p className="text-slate-600 italic leading-relaxed">"{cs.challenge}"</p>
                                            </div>

                                            <div className="bg-[#EBF2FE]/60 p-3.5 rounded-xl border border-[#C5DCFE]/60">
                                                <span className="font-bold text-[#1E60D5] block text-xs mb-1">Solusi Implementasi Liva:</span>
                                                <p className="text-slate-700 leading-relaxed">{cs.solution}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/90 flex items-center gap-3 text-xs text-emerald-950 font-semibold shadow-2xs">
                                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                            <TrendingUp className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-[10px] text-emerald-700 block uppercase font-mono tracking-wider">Dampak Terukur:</span>
                                            <span className="text-xs sm:text-sm font-bold text-emerald-900">{cs.impact_metric}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );

    const renderRoiCalculator = () => {
        const estimatedSavings = Math.round(bedCountSim * 1.85); // Jutaan rupiah per tahun
        const paperlessHours = Math.round(bedCountSim * 32); // Jam kerja nakes saved

        return (
            <section key="roi_calculator" className={`relative bg-gradient-to-br from-[#1E60D5]/5 via-white to-orange-50/20 ${pyDensity} border-t border-slate-200/80`}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className={`card-clinical p-6 sm:p-10 border border-blue-200/80 shadow-xl ${cardRadius}`}>
                        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2FE] text-[#1E60D5] text-xs font-mono font-bold border border-[#C5DCFE]">
                                <Sparkles className="h-3.5 w-3.5 text-[#F97316]" />
                                <span>SIMULASI KALKULATOR ROI RUMAH SAKIT</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display">
                                Hitung Estimasi Efisiensi Finansial &amp; Waktu Nakes Faskes Anda
                            </h2>
                            <p className="text-xs text-slate-600">
                                Geser jumlah tempat tidur (TT) rumah sakit untuk melihat proyeksi penghematan operasional berkas fisik dan pencegahan dispute klaim.
                            </p>
                        </div>

                        <div className="space-y-6 max-w-xl mx-auto">
                            <div className="space-y-2 text-center">
                                <label className="text-xs font-mono font-bold text-slate-700 uppercase">
                                    Kapasitas Tempat Tidur (TT): <span className="text-xl text-[#1E60D5] font-black">{bedCountSim} Bed</span>
                                </label>
                                <input
                                    type="range"
                                    min="30"
                                    max="600"
                                    step="10"
                                    value={bedCountSim}
                                    onChange={(e) => setBedCountSim(Number(e.target.value))}
                                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E60D5]"
                                />
                                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                                    <span>30 TT (Klinik/RS D)</span>
                                    <span>200 TT (RS C/B)</span>
                                    <span>600 TT (RSUD Rujukan)</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-center space-y-1">
                                    <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block">Proyeksi Penghematan / Thn</span>
                                    <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-display">± Rp {estimatedSavings} Juta</span>
                                    <span className="text-[11px] text-emerald-600 block">Efisiensi ATK &amp; Pre-validasi Klaim</span>
                                </div>
                                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/80 text-center space-y-1">
                                    <span className="text-[10px] font-mono font-bold text-[#1E60D5] uppercase block">Waktu Dokter &amp; Nakes Terhemat</span>
                                    <span className="text-2xl sm:text-3xl font-black text-[#1E60D5] font-display">± {paperlessHours.toLocaleString()} Jam</span>
                                    <span className="text-[11px] text-blue-600 block">Eliminasi Paperwork &amp; Double Entry</span>
                                </div>
                            </div>

                            <div className="text-center pt-2">
                                <button
                                    type="button"
                                    onClick={() => openDemoModal()}
                                    className="btn-amber-warm btn-spring px-6 py-2.5 rounded-full text-white text-xs font-semibold cursor-pointer shadow-xs focus-ring"
                                >
                                    Dapatkan Audit Kelayakan Resmi RS Anda
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    const renderCta = () => (
        <section key="cta" className={`${pyDensity} bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] relative overflow-hidden border-t border-slate-200/80`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] text-[#1E60D5] text-xs font-mono font-bold border border-[#C5DCFE] shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
                    <span>PROVEN TRACK RECORD</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] font-display">
                    Ingin Mengetahui Proyeksi Efisiensi untuk Rumah Sakit Anda?
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                    Tim analis klinis kami siap menyusun simulasi kalkulasi ROI dan skema transisi data tanpa mengganggu operasional IGD dan Rawat Jalan yang sedang berjalan.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                        onClick={() => openDemoModal()}
                        className="h-11 px-6 rounded-xl bg-[#1E60D5] hover:bg-[#164DB0] text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all cursor-pointer gap-2 btn-spring focus-ring"
                    >
                        <Rocket className="h-4 w-4 text-white" />
                        <span>Jadwalkan Diskusi Studi Kasus</span>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => openAssessmentModal()}
                        className="h-11 px-6 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300/80 gap-2 btn-spring cursor-pointer shadow-2xs focus-ring"
                    >
                        <Activity className="h-4 w-4 text-[#F97316]" />
                        <span>Uji Kesiapan SIMRS (2 Menit)</span>
                    </Button>
                </div>
            </div>
        </section>
    );

    const sectionRenderers = {
        hero: renderHero,
        case_cards: renderCaseCards,
        roi_calculator: renderRoiCalculator,
        cta: renderCta,
    };

    return (
        <div className={`flex flex-col w-full min-h-screen ${themeClass} font-sans antialiased transition-colors duration-300`}>
            {orderedKeys.map((key) => {
                const renderer = sectionRenderers[key];
                if (!renderer) return null;
                if (key === 'hero') {
                    return <React.Fragment key={key}>{renderer()}</React.Fragment>;
                }
                return (
                    <SectionWrapper key={key} pageId="studi-kasus" secId={key} showContainer={false}>
                        {renderer()}
                    </SectionWrapper>
                );
            })}
        </div>
    );
}

