import React from 'react';
import { useSite } from '../../context/SiteContext';
import SolutionMatrix from '../../components/SolutionMatrix';
import ProductCockpitShowcase from '../../components/ProductCockpitShowcase';
import RisPacsShowcase from '../../components/RisPacsShowcase';
import BrandTrustAndShowcase from '../../components/BrandTrustAndShowcase';
import HospitalNetworkMap from '../../components/HospitalNetworkMap';
import FaqProcurementSection from '../../components/FaqProcurementSection';
import SectionWrapper from '../../components/public/SectionWrapper';
import { getSectionCustomStyles } from '../../lib/sectionStyler';
import { Button } from '@/components/ui/button';
import {
    Sparkles,
    ArrowRight,
    Rocket,
    BookOpen,
    Cloud,
    ShieldCheck,
    Award,
    FileText,
    Users,
    Link2,
    Activity,
    Layers,
    CheckCircle2
} from 'lucide-react';

export default function BerandaPage({ onNavigate }) {
    const { siteData, openDemoModal, openAssessmentModal, openModuleModal, getSetting } = useSite();

    const modules = siteData.modules || [];
    const pillars = siteData.pillars || [];

    const isVisible = (key, defaultVal = true) => {
        const val = getSetting(key, defaultVal);
        if (typeof val === 'boolean') return val;
        if (val === '1' || val === 'true') return true;
        if (val === '0' || val === 'false') return false;
        return defaultVal;
    };

    // Dynamic Theme Mood & Spacing Density
    const theme = getSetting('page_beranda_theme', 'clinical-blue');
    const density = getSetting('page_beranda_density', 'normal');
    const cardRadius = getSetting('page_beranda_card_radius', 'rounded-2xl');

    const themeClass = {
        'clinical-blue': 'bg-[#F8FAFC] text-[#0F172A]',
        'pure-white': 'bg-white text-[#0F172A]',
        'dark-slate': 'bg-[#0B1120] text-slate-100',
        'emerald-health': 'bg-[#F0FDF4]/40 text-[#064E3B]',
        'indigo-luxury': 'bg-[#F5F3FF]/40 text-[#1E1B4B]',
    }[theme] || 'bg-[#F8FAFC] text-[#0F172A]';

    // Parse Dynamic Section Order
    const rawOrder = getSetting('page_beranda_section_order');
    let orderedKeys = [
        'hero',
        'cockpit',
        'pacs',
        'solutions',
        'trust',
        'pillars',
        'modules',
        'network_map',
        'faq',
        'cta_banner'
    ];

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

    const finalOrderedKeys = orderedKeys.filter(key => isVisible('show_' + key, true));

    const pyDensity = {
        compact: 'py-10 sm:py-14',
        normal: 'py-18 sm:py-26',
        spacious: 'py-24 sm:py-32',
    }[density] || 'py-18 sm:py-26';

    const renderHero = () => {
        const heroStyles = getSectionCustomStyles(getSetting, 'beranda', 'hero', {
            defaultBgClass: 'bg-gradient-to-b from-white via-[#F0F6FE] to-[#F8FAFC]',
            accent: '#1B84FF',
            defaultPaddingClass: 'pt-8 sm:pt-14 pb-18 sm:pb-26',
        });

        return (
            <section
                id="sec-beranda-hero"
                className={`relative overflow-hidden transition-all duration-300 ${heroStyles.bgClass} ${heroStyles.paddingClass} ${heroStyles.borderClass} border-b border-slate-200/60`}
                style={heroStyles.bgStyle}
            >
                {/* 1.1 Subtle Ambient Medical Light Glows */}
                {heroStyles.hasAmbientGlow && (
                    <>
                        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20" style={{ backgroundColor: heroStyles.accentColor }} />
                        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-400/6 rounded-full blur-3xl pointer-events-none" />
                    </>
                )}

                {/* 1.2 Fine Grid Texture */}
                {heroStyles.hasGridLines && (
                    <div className="absolute inset-0 bg-clinical-grid opacity-60 pointer-events-none" />
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-2 sm:pt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* LEFT COLUMN: BADGE, HEADLINE, DESCRIPTION & ACTIONS */}
                        <div className="lg:col-span-6 space-y-6 animate-slide-up">
                            
                            {/* Pill Badge */}
                            {heroStyles.showBadge && (
                                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] border border-[#BFDBFE] text-[#1E60D5] text-xs font-semibold shadow-xs">
                                    <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: heroStyles.accentColor }}></span>
                                    <span>{heroStyles.badge || getSetting('hero_badge_text', 'Solusi SIMRS Generasi Baru • Terhubung SATUSEHAT & BPJS')}</span>
                                </div>
                            )}

                            {/* Main Headline */}
                            <h1 className={`text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.18] font-display ${heroStyles.titleTextClass}`}>
                                {heroStyles.title || getSetting('hero_title_prefix', 'Transformasi Digital Rumah Sakit yang')}{' '}
                                <span className="relative inline-block whitespace-nowrap" style={{ color: heroStyles.accentColor }}>
                                    {heroStyles.highlight || getSetting('hero_title_highlight_1', 'Lebih Cepat')},
                                    <svg
                                        className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#F97316] overflow-visible"
                                        viewBox="0 0 160 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2 8.5C45 2.5 115 3 158 8.5"
                                            stroke="currentColor"
                                            strokeWidth="3.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>{' '}
                                {getSetting('hero_title_middle', 'Terintegrasi, &')}{' '}
                                <span>{getSetting('hero_title_highlight_2', 'Berstandar Nasional')}</span>
                            </h1>

                            {/* Lead Subtitle */}
                            <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${heroStyles.bodyTextClass}`}>
                                {heroStyles.description || getSetting('hero_description', 'Liva SIMRS menghubungkan seluruh alur pelayanan mulai dari IGD, Rawat Jalan, Rawat Inap, Farmasi, Laboratorium hingga Rekam Medis Elektronik (RME) dalam satu ekosistem cloud yang aman, andal, dan patuh regulasi Permenkes No. 24/2022.')}
                            </p>

                            {/* Action CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                                {heroStyles.showCta && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (heroStyles.ctaPrimaryUrl?.startsWith('/')) {
                                                onNavigate(heroStyles.ctaPrimaryUrl.replace('/', ''));
                                            } else {
                                                openDemoModal();
                                            }
                                        }}
                                        className={`${heroStyles.ctaClass} h-12 px-7 rounded-full text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-md cursor-pointer focus-ring`}
                                    >
                                        <Rocket className="h-4 w-4 text-white" />
                                        <span>{heroStyles.ctaPrimaryText || getSetting('hero_cta_primary_text', 'Jadwalkan Live Demo RS')}</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                )}

                                {heroStyles.showSecondaryCta && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (heroStyles.ctaSecondaryUrl?.startsWith('/')) {
                                                onNavigate(heroStyles.ctaSecondaryUrl.replace('/', ''));
                                            } else {
                                                onNavigate('modul-simrs');
                                            }
                                        }}
                                        className="btn-spring h-12 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200/90 hover:border-slate-300 shadow-xs flex items-center justify-center gap-2.5 cursor-pointer focus-ring"
                                    >
                                        <BookOpen className="h-4 w-4 text-[#1E60D5]" />
                                        <span>{heroStyles.ctaSecondaryText || getSetting('hero_cta_secondary_text', 'Katalog 36 Modul')}</span>
                                    </button>
                                )}
                            </div>

                            {/* Accreditation & Compliance Strip */}
                            <div className="pt-6 border-t border-slate-200/70 flex items-center gap-4 sm:gap-6">
                                {/* Badge 1: Permenkes 24/2022 */}
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-full bg-blue-50 text-[#1E60D5] flex items-center justify-center shrink-0">
                                        <Cloud className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col text-[11px] sm:text-xs">
                                        <span className="font-bold text-slate-800 leading-tight">{getSetting('hero_badge_1_title', 'Permenkes')}</span>
                                        <span className="text-slate-500 leading-tight">{getSetting('hero_badge_1_sub', '24/2022')}</span>
                                    </div>
                                </div>

                                <div className="h-7 w-px bg-slate-200"></div>

                                {/* Badge 2: SATUSEHAT FHIR R4 */}
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col text-[11px] sm:text-xs">
                                        <span className="font-bold text-slate-800 leading-tight">{getSetting('hero_badge_2_title', 'SATUSEHAT')}</span>
                                        <span className="text-slate-500 leading-tight">{getSetting('hero_badge_2_sub', 'FHIR R4')}</span>
                                    </div>
                                </div>

                                <div className="h-7 w-px bg-slate-200"></div>

                                {/* Badge 3: ISO 27001 & BSrE */}
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-full bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
                                        <Award className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col text-[11px] sm:text-xs">
                                        <span className="font-bold text-slate-800 leading-tight">{getSetting('hero_badge_3_title', 'ISO 27001 &')}</span>
                                        <span className="text-slate-500 leading-tight">{getSetting('hero_badge_3_sub', 'BSrE BSSN')}</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: LIVA CLINICAL INTELLIGENCE NODE CARD OR UPLOADED HERO PHOTO */}
                        <div className="lg:col-span-6 animate-slide-up delay-stagger-2">
                            {heroStyles.imageUrl && heroStyles.showImage ? (
                                <div className={`relative ${heroStyles.imageStyleClass}`}>
                                    <img
                                        src={heroStyles.imageUrl}
                                        alt="Liva SIMRS Hero Visual"
                                        className={`w-full object-cover ${heroStyles.imageAspectClass}`}
                                    />
                                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                        <span>LIVA SIMRS CLOUD</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="card-clinical p-6 sm:p-7 space-y-4 relative bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-md">
                                    {/* Header inside Node Card */}
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#1E60D5] animate-pulse"></span>
                                            <span className="text-slate-900 font-bold tracking-wider text-xs font-mono">
                                                {getSetting('hub_node_header', 'LIVA CLINICAL INTELLIGENCE HUB')}
                                            </span>
                                        </div>
                                        <span className="text-[11px] text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/70 flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            {getSetting('hub_node_sla', 'SLA 99.98% Active')}
                                        </span>
                                    </div>

                                    {/* Two Side-by-Side Light Feature Cards */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {/* Card 1: Rekam Medis (RME) */}
                                        <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200/70 hover:border-[#BFDBFE] hover:bg-white transition-all flex items-start gap-3.5 group">
                                            <div className="w-10 h-10 rounded-xl bg-[#EBF2FE] text-[#1E60D5] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div className="space-y-0.5 min-w-0">
                                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                                                    REKAM MEDIS (RME):
                                                </span>
                                                <div className="text-[13.5px] font-bold text-slate-900 group-hover:text-[#1E60D5] transition-colors leading-tight">
                                                    {getSetting('hub_card_1_title', 'SOAP & CPPT Digital')}
                                                </div>
                                                <p className="text-[11.5px] text-[#1E60D5] font-medium leading-tight">
                                                    {getSetting('hub_card_1_sub', 'Terstandar ICD-10 Kemenkes')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 2: Klaim BPJS */}
                                        <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200/70 hover:border-emerald-300 hover:bg-white transition-all flex items-start gap-3.5 group">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                                <Users className="h-5 w-5" />
                                            </div>
                                            <div className="space-y-0.5 min-w-0">
                                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                                                    KLAIM BPJS:
                                                </span>
                                                <div className="text-[13.5px] font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">
                                                    {getSetting('hub_card_2_title', 'Auto-Grouping CBGs')}
                                                </div>
                                                <p className="text-[11.5px] text-emerald-600 font-medium leading-tight">
                                                    {getSetting('hub_card_2_sub', 'Dispute Rate < 0.3%')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom SATUSEHAT Integration Card */}
                                    <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200/70 space-y-2.5">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-700 font-medium">Sinkronisasi SATUSEHAT Kemenkes:</span>
                                            <span className="text-[#F97316] font-semibold text-xs flex items-center gap-1.5 font-mono">
                                                <Link2 className="h-3.5 w-3.5 text-[#F97316]" />
                                                Native HL7 FHIR R4
                                            </span>
                                        </div>

                                        {/* Progress Bar with Smooth Medical Gradient */}
                                        <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden p-0.5">
                                            <div className="bg-gradient-to-r from-[#1E60D5] via-[#4D8BFF] to-[#059669] h-full w-full rounded-full"></div>
                                        </div>

                                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                                            <span>Patient • Encounter • Condition • Medication</span>
                                            <span className="text-emerald-600 font-semibold">100% Terverifikasi</span>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        );
    };

    const renderCockpit = () => (
        <ProductCockpitShowcase onScheduleDemo={(topic) => openDemoModal(topic)} />
    );

    const renderPacs = () => (
        <RisPacsShowcase 
            onScheduleDemo={(topic) => openDemoModal(topic)}
            onConsultIntegrator={() => openDemoModal('Konsultasi Bridging Modalitas Radiologi RIS/PACS')}
        />
    );

    const renderSolutions = () => (
        <section id="solution-matrix-section" className={`${pyDensity} bg-white border-b border-slate-200/60 relative`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                <div className="text-center max-w-2xl mx-auto space-y-2.5">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF2FE] border border-[#BFDBFE] text-[#1E60D5] text-xs font-semibold">
                        <Layers className="h-3.5 w-3.5" />
                        <span>{getSetting('solutions_badge_text', 'SOLUSI SPESIFIK SESUAI TIPE FASKES')}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                        {getSetting('solutions_headline', 'Ekosistem Digital untuk Setiap Skala Layanan Medis')}
                    </h2>
                    <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed">
                        {getSetting('solutions_subheadline', 'Pilih konfigurasi modul yang dirancang khusus untuk alur kerja rumah sakit, klinik pratama, klinik industri K3, hingga apotek mandiri.')}
                    </p>
                </div>

                <SolutionMatrix
                    onNavigate={onNavigate}
                    onScheduleDemo={(topic) => openDemoModal(topic)}
                />
            </div>
        </section>
    );

    const renderTrust = () => (
        <BrandTrustAndShowcase 
            onScheduleDemo={(topic) => openDemoModal(topic)} 
            onNavigate={onNavigate} 
        />
    );

    const renderPillars = () => (
        <section className={`${pyDensity} bg-[#F8FAFC] border-b border-slate-200/60 relative`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1.5 max-w-xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2FE] text-[#1E60D5] text-xs font-semibold border border-[#BFDBFE]">
                            <span>{getSetting('pillars_badge_text', 'ARSITEKTUR MISI-KRITIS')}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                            {getSetting('pillars_headline', '6 Pilar Keunggulan Solusi Liva SIMRS')}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={() => onNavigate('keunggulan')}
                        className="text-xs font-semibold text-[#1E60D5] hover:underline flex items-center gap-1 cursor-pointer self-start md:self-auto font-mono btn-spring focus-ring rounded"
                    >
                        <span>Lihat Matriks Komparasi KLAS</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {pillars.map((pillar, idx) => (
                        <div
                            key={idx}
                            className={`card-clinical p-6 flex flex-col justify-between space-y-4 group ${cardRadius}`}
                        >
                            <div className="space-y-3.5">
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-xl bg-[#EBF2FE] text-[#1E60D5] flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <Activity className="h-5 w-5" />
                                    </div>
                                    <span className="font-mono text-[10px] text-slate-500 font-semibold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                                        PILAR 0{idx + 1}
                                    </span>
                                </div>
                                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#1E60D5] transition-colors leading-snug font-display">
                                    {pillar.title}
                                </h3>
                                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                                <span>Standar Akreditasi</span>
                                <span className="text-emerald-600 font-semibold">Paripurna Ready</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    const renderModules = () => (
        <section className={`${pyDensity} bg-white border-b border-slate-200/60 relative`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1.5 max-w-xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7ED] text-[#F97316] text-xs font-semibold border border-[#FFEDD5]">
                            <span>{getSetting('modules_badge_text', 'MODULAR & TERPADU')}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                            {getSetting('modules_headline', 'Katalog 36 Modul SIMRS & Klinik Terpadu')}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={() => onNavigate('modul-simrs')}
                        className="btn-spring text-xs font-semibold text-slate-700 hover:text-[#1E60D5] border border-slate-200 hover:border-blue-300 rounded-full h-10 px-5 flex items-center gap-2 cursor-pointer bg-white shadow-xs focus-ring"
                    >
                        <span>Lihat Semua 36 Modul</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#1E60D5]" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {modules.slice(0, 4).map((mod, i) => (
                        <div
                            key={mod.id || i}
                            onClick={() => openModuleModal(mod)}
                            className={`card-clinical p-5 flex flex-col justify-between cursor-pointer group ${cardRadius}`}
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-lg bg-[#EBF2FE] text-[#1E60D5] flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                                        <Activity className="h-4 w-4" />
                                    </div>
                                    <span className="font-mono text-[10px] font-semibold text-slate-600 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                                        {mod.module_code}
                                    </span>
                                </div>
                                <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#1E60D5] transition-colors leading-snug font-display">
                                    {mod.title}
                                </h3>
                                <p className="text-[11.5px] text-slate-600 line-clamp-3 leading-relaxed">
                                    {mod.short_description}
                                </p>
                            </div>

                            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1E60D5]">
                                <span>Detail Alur Kerja</span>
                                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    const renderNetworkMap = () => (
        <HospitalNetworkMap onNavigate={onNavigate} onOpenDemo={openDemoModal} />
    );

    const renderFaq = () => (
        <FaqProcurementSection onNavigate={onNavigate} onOpenDemo={openDemoModal} />
    );

    const renderCtaBanner = () => (
        <section className={`${pyDensity} bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white relative overflow-hidden`}>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#60A5FA] text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
                    <span>{getSetting('cta_badge_text', 'SOLUSI TERSTANDAR UNTUK RUMAH SAKIT & KLINIK')}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight font-display">
                    {getSetting('cta_headline', 'Siap Mengakselerasi Digitalisasi Faskes Anda?')}
                </h2>

                <p className="text-xs sm:text-sm lg:text-[15px] text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    {getSetting('cta_description', 'Jadwalkan sesi konsultasi dan demonstrasi langsung bersama konsultan klinis Liva SIMRS untuk melihat bagaimana sistem kami terhubung dengan alur kerja faskes Anda.')}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                    <button
                        type="button"
                        onClick={() => openDemoModal()}
                        className="btn-amber-warm btn-spring h-12 px-7 rounded-full text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-pointer focus-ring"
                    >
                        <Rocket className="h-4 w-4 text-white" />
                        <span>{getSetting('cta_btn_primary', 'Ajukan Jadwal Demo Gratis')}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => openAssessmentModal()}
                        className="btn-spring h-12 px-7 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-2.5 cursor-pointer focus-ring"
                    >
                        <Activity className="h-4 w-4 text-[#F97316]" />
                        <span>{getSetting('cta_btn_secondary', 'Uji Kesiapan SIMRS (2 Menit)')}</span>
                    </button>
                </div>
            </div>
        </section>
    );

    const sectionRenderers = {
        hero: renderHero,
        cockpit: renderCockpit,
        pacs: renderPacs,
        solutions: renderSolutions,
        trust: renderTrust,
        pillars: renderPillars,
        modules: renderModules,
        network_map: renderNetworkMap,
        faq: renderFaq,
        cta_banner: renderCtaBanner,
    };

    return (
        <div className={`flex flex-col w-full min-h-screen font-sans antialiased transition-colors ${themeClass}`}>
            {finalOrderedKeys.map((key) => {
                const fn = sectionRenderers[key];
                if (!fn) return null;
                if (key === 'hero') {
                    return <React.Fragment key={key}>{fn()}</React.Fragment>;
                }
                return (
                    <SectionWrapper key={key} pageId="beranda" secId={key} showContainer={false}>
                        {fn()}
                    </SectionWrapper>
                );
            })}
        </div>
    );
}
