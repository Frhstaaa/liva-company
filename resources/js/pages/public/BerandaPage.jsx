import React, { useState, useRef } from 'react';
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
    CheckCircle2,
    Check,
    Zap,
    Database,
    Clock,
    TrendingUp,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

export default function BerandaPage({ onNavigate }) {
    const { siteData, openDemoModal, openAssessmentModal, openModuleModal, getSetting } = useSite();

    const modules = siteData.modules || [];
    const pillars = siteData.pillars || [];

    const [activePillarIdx, setActivePillarIdx] = useState(0);
    const [activeModuleIdx, setActiveModuleIdx] = useState(0);
    const pillarScrollRef = useRef(null);
    const moduleScrollRef = useRef(null);

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
        compact: 'py-6 sm:py-8',
        normal: 'py-10 sm:py-14',
        spacious: 'py-14 sm:py-18',
    }[density] || 'py-10 sm:py-14';

    const renderHero = () => {
        const heroStyles = getSectionCustomStyles(getSetting, 'beranda', 'hero', {
            defaultBgClass: 'bg-gradient-to-b from-white via-[#F0F6FE] to-[#F8FAFC]',
            accent: '#1B84FF',
            defaultPaddingClass: 'pt-4 sm:pt-10 pb-8 sm:pb-14',
        });

        // Ensure highlight string does not have trailing comma that duplicates in render
        const rawHighlight = heroStyles.highlight || getSetting('hero_title_highlight_1', 'Lebih Cepat');
        const cleanHighlight = (rawHighlight || '').replace(/[,.\s]+$/, '');

        return (
            <section
                id="sec-beranda-hero"
                className={`relative overflow-hidden transition-all duration-300 ${heroStyles.bgClass} ${heroStyles.paddingClass} ${heroStyles.borderClass} border-b border-slate-200/60`}
                style={heroStyles.bgStyle}
            >
                {/* 1.1 Clean Ambient Medical Light Glows */}
                {heroStyles.hasAmbientGlow && (
                    <div
                        className="absolute inset-0 pointer-events-none opacity-30"
                        style={{
                            background: `radial-gradient(ellipse 60% 50% at 75% 0%, ${heroStyles.accentColor || '#1B84FF'}20 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 25% 100%, rgba(249,115,22,0.05) 0%, transparent 70%)`
                        }}
                    />
                )}

                {/* 1.2 Fine Grid Texture */}
                {heroStyles.hasGridLines && (
                    <div className="absolute inset-0 bg-clinical-grid opacity-60 pointer-events-none" />
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-1 sm:pt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                        
                        {/* LEFT COLUMN: BADGE, HEADLINE, DESCRIPTION & ACTIONS */}
                        <div className="lg:col-span-6 space-y-4 sm:space-y-6 animate-slide-up">
                            
                            {/* Pill Badge */}
                            {heroStyles.showBadge && (
                                <div className="inline-flex max-w-full items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#EBF2FE] border border-[#BFDBFE] text-[#1E60D5] text-[11px] sm:text-xs font-semibold shadow-2xs leading-snug">
                                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: heroStyles.accentColor }}></span>
                                    <span className="truncate sm:whitespace-normal">{heroStyles.badge || getSetting('hero_badge_text', 'Solusi SIMRS Generasi Baru • Terhubung SATUSEHAT & BPJS')}</span>
                                </div>
                            )}

                            {/* Main Headline */}
                            <h1 className={`text-[25px] xs:text-[28px] sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.2] sm:leading-[1.18] font-display ${heroStyles.titleTextClass}`}>
                                {heroStyles.title || getSetting('hero_title_prefix', 'Transformasi Digital Rumah Sakit yang')}{' '}
                                <span className="relative inline-block whitespace-nowrap" style={{ color: heroStyles.accentColor }}>
                                    {cleanHighlight},
                                    <svg
                                        className="absolute -bottom-1 left-0 w-full h-2 text-[#F97316] overflow-visible"
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
                            <p className={`text-xs sm:text-sm lg:text-base leading-relaxed text-slate-600 max-w-xl ${heroStyles.bodyTextClass}`}>
                                {heroStyles.description || getSetting('hero_description', 'Liva SIMRS menghubungkan seluruh alur pelayanan mulai dari IGD, Rawat Jalan, Rawat Inap, Farmasi, Laboratorium hingga Rekam Medis Elektronik (RME) dalam satu ekosistem cloud yang aman, andal, dan patuh regulasi Permenkes No. 24/2022.')}
                            </p>

                            {/* Action CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-0.5 sm:pt-1">
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
                                        className={`${heroStyles.ctaClass} h-11 sm:h-12 px-6 sm:px-7 rounded-full text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer focus-ring`}
                                    >
                                        <Rocket className="h-4 w-4 text-white shrink-0" />
                                        <span>{heroStyles.ctaPrimaryText || getSetting('hero_cta_primary_text', 'Jadwalkan Live Demo RS')}</span>
                                        <ArrowRight className="h-4 w-4 shrink-0" />
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
                                        className="btn-spring h-11 sm:h-12 px-5 sm:px-6 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200/90 hover:border-slate-300 shadow-2xs flex items-center justify-center gap-2 cursor-pointer focus-ring"
                                    >
                                        <BookOpen className="h-4 w-4 text-[#1E60D5] shrink-0" />
                                        <span>{heroStyles.ctaSecondaryText || getSetting('hero_cta_secondary_text', 'Katalog 36 Modul')}</span>
                                    </button>
                                )}
                            </div>

                            {/* Accreditation & Compliance Strip */}
                            <div className="pt-4 sm:pt-6 border-t border-slate-200/70 flex items-center justify-between sm:justify-start gap-2 sm:gap-6">
                                {/* Badge 1: Permenkes 24/2022 */}
                                <div className="flex items-center gap-1.5 sm:gap-2.5">
                                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-blue-50 text-[#1E60D5] flex items-center justify-center shrink-0">
                                        <Cloud className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </div>
                                    <div className="flex flex-col text-[10px] sm:text-xs">
                                        <span className="font-bold text-slate-800 leading-tight">{getSetting('hero_badge_1_title', 'Permenkes')}</span>
                                        <span className="text-slate-500 leading-tight">{getSetting('hero_badge_1_sub', '24/2022')}</span>
                                    </div>
                                </div>

                                <div className="h-6 sm:h-7 w-px bg-slate-200"></div>

                                {/* Badge 2: SATUSEHAT FHIR R4 */}
                                <div className="flex items-center gap-1.5 sm:gap-2.5">
                                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </div>
                                    <div className="flex flex-col text-[10px] sm:text-xs">
                                        <span className="font-bold text-slate-800 leading-tight">{getSetting('hero_badge_2_title', 'SATUSEHAT')}</span>
                                        <span className="text-slate-500 leading-tight">{getSetting('hero_badge_2_sub', 'FHIR R4')}</span>
                                    </div>
                                </div>

                                <div className="h-6 sm:h-7 w-px bg-slate-200"></div>

                                {/* Badge 3: ISO 27001 & BSrE */}
                                <div className="flex items-center gap-1.5 sm:gap-2.5">
                                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
                                        <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </div>
                                    <div className="flex flex-col text-[10px] sm:text-xs">
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
                                <div className="card-clinical p-4 sm:p-7 space-y-3.5 sm:space-y-4 relative bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-md">
                                    {/* Header inside Node Card */}
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-3.5">
                                        <div className="flex items-center gap-2 sm:gap-2.5">
                                            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#1E60D5] animate-pulse"></span>
                                            <span className="text-slate-900 font-bold tracking-wider text-[11px] sm:text-xs font-mono">
                                                {getSetting('hub_node_header', 'LIVA CLINICAL INTELLIGENCE HUB')}
                                            </span>
                                        </div>
                                        <span className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold px-2 py-0.5 sm:px-2.5 rounded-full bg-emerald-50 border border-emerald-200/70 flex items-center gap-1 sm:gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            {getSetting('hub_node_sla', 'SLA 99.98% Active')}
                                        </span>
                                    </div>

                                    {/* Two Side-by-Side Light Feature Cards */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                                        {/* Card 1: Rekam Medis (RME) */}
                                        <div className="p-3.5 sm:p-4 bg-[#F8FAFC] rounded-xl border border-slate-200/70 hover:border-[#BFDBFE] hover:bg-white transition-all flex items-start gap-3 sm:gap-3.5 group">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EBF2FE] text-[#1E60D5] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </div>
                                            <div className="space-y-0.5 min-w-0">
                                                <span className="text-[9.5px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                                                    REKAM MEDIS (RME):
                                                </span>
                                                <div className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 group-hover:text-[#1E60D5] transition-colors leading-tight">
                                                    {getSetting('hub_card_1_title', 'SOAP & CPPT Digital')}
                                                </div>
                                                <p className="text-[11px] sm:text-[11.5px] text-[#1E60D5] font-medium leading-tight">
                                                    {getSetting('hub_card_1_sub', 'Terstandar ICD-10 Kemenkes')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 2: Klaim BPJS */}
                                        <div className="p-3.5 sm:p-4 bg-[#F8FAFC] rounded-xl border border-slate-200/70 hover:border-emerald-300 hover:bg-white transition-all flex items-start gap-3 sm:gap-3.5 group">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </div>
                                            <div className="space-y-0.5 min-w-0">
                                                <span className="text-[9.5px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                                                    KLAIM BPJS:
                                                </span>
                                                <div className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">
                                                    {getSetting('hub_card_2_title', 'Auto-Grouping CBGs')}
                                                </div>
                                                <p className="text-[11px] sm:text-[11.5px] text-emerald-600 font-medium leading-tight">
                                                    {getSetting('hub_card_2_sub', 'Dispute Rate < 0.3%')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom SATUSEHAT Integration Card */}
                                    <div className="p-3 sm:p-4 bg-[#F8FAFC] rounded-xl border border-slate-200/70 space-y-2 sm:space-y-2.5">
                                        <div className="flex items-center justify-between text-[11px] sm:text-xs">
                                            <span className="text-slate-700 font-medium">Sinkronisasi SATUSEHAT:</span>
                                            <span className="text-[#F97316] font-semibold flex items-center gap-1.5 font-mono">
                                                <Link2 className="h-3.5 w-3.5 text-[#F97316]" />
                                                Native HL7 FHIR R4
                                            </span>
                                        </div>

                                        {/* Progress Bar with Smooth Medical Gradient */}
                                        <div className="w-full bg-slate-200/80 h-1.5 sm:h-2 rounded-full overflow-hidden p-0.5">
                                            <div className="bg-gradient-to-r from-[#1E60D5] via-[#4D8BFF] to-[#059669] h-full w-full rounded-full"></div>
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 font-mono">
                                            <span className="truncate mr-2">Patient • Encounter • Condition</span>
                                            <span className="text-emerald-600 font-semibold shrink-0">100% Terverifikasi</span>
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

    const renderPillars = () => {
        const defaultPillars = [
            {
                pillar_number: '01',
                badge: 'REKAM MEDIS ELEKTRONIK TERPADU',
                title: 'Rekam Medis Elektronik (RME) Paripurna & SOAP Terstandar',
                description: 'Dokumentasi klinis terintegrasi SOAP, CPPT multidisiplin, resume medis otomatis, dan penomoran rekam medis terpadu sesuai Permenkes No. 24/2022.',
                metric_value: '< 2.4 mnt',
                metric_label: 'Waktu Input SOAP Dokter',
                tag: 'FLAGSHIP RME'
            },
            {
                pillar_number: '02',
                badge: 'INTEROPERABILITAS NASIONAL',
                title: 'Interoperabilitas Native SATUSEHAT Kemenkes & HL7 FHIR R4',
                description: 'Pertukaran data klinis otomatis (Encounter, Condition, Medication, Observation) langsung ke cloud SATUSEHAT tanpa middleware pihak ketiga.',
                metric_value: '100% FHIR',
                metric_label: 'Kepatuhan Standar Kemenkes',
                tag: 'HL7 FHIR R4'
            },
            {
                pillar_number: '03',
                badge: 'BRIDGING ASURANSI & KLAIM',
                title: 'Bridging BPJS VClaim 2.0 & Auto-Grouping INA-CBGs',
                description: 'Verifikasi SEP instan, sinkronisasi klaim digital e-Klaim, dan validasi pre-klaim real-time untuk memangkas potensi dispute berkas.',
                metric_value: '< 0.3%',
                metric_label: 'Dispute Rate Klaim',
                tag: 'BPJS VCLAIM'
            },
            {
                pillar_number: '04',
                badge: 'IMAGING & RADIOLOGI CLOUD',
                title: 'Cloud RIS/PACS & Zero-Footprint DICOM Web Viewer',
                description: 'Akses hasil radiologi CT-Scan, MRI, dan USG langsung dari lembar kerja dokter dengan rendering berkecepatan tinggi tanpa instalasi software rumit.',
                metric_value: 'Sub-detik',
                metric_label: 'Akses Citra Diagnostik',
                tag: 'DICOM 3.0'
            },
            {
                pillar_number: '05',
                badge: 'KEAMANAN SIBER & PRIVASI DATA',
                title: 'Sertifikasi ISO 27001 & Arsitektur Zero-Trust Kemenkes',
                description: 'Enkripsi data at-rest & in-transit AES-256, tanda tangan digital tersertifikasi BSrE BSSN, dan audit trail klinis anti-tamper.',
                metric_value: '99.98%',
                metric_label: 'High Availability SLA',
                tag: 'ISO 27001'
            },
            {
                pillar_number: '06',
                badge: 'MANAJEMEN CASEMIX & AKUNTANSI',
                title: 'Otomasi Casemix, Farmasi E-Prescription & Keuangan RS',
                description: 'Pengendalian biaya riil terhadap tarif INA-CBGs, manajemen multi-depo farmasi pintar, dan pelaporan keuangan RS terpadu secara real-time.',
                metric_value: '100% Real-Time',
                metric_label: 'Pelaporan Casemix',
                tag: 'FINANSIAL RS'
            }
        ];

        const scrollPillarTo = (idx) => {
            const nextIdx = Math.max(0, Math.min(activePillars.length - 1, idx));
            setActivePillarIdx(nextIdx);
            if (pillarScrollRef.current) {
                const card = pillarScrollRef.current.children[nextIdx];
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        };

        const handlePillarScroll = (e) => {
            const container = e.currentTarget;
            const scrollLeft = container.scrollLeft;
            const width = container.offsetWidth;
            if (width > 0) {
                const newIndex = Math.round(scrollLeft / (width * 0.85));
                if (newIndex !== activePillarIdx && newIndex >= 0 && newIndex < activePillars.length) {
                    setActivePillarIdx(newIndex);
                }
            }
        };

        return (
            <section className={`${pyDensity} bg-[#F8FAFC] border-b border-slate-200/60 relative overflow-hidden`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-2 max-w-xl">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2FE] text-[#1E60D5] text-xs font-semibold border border-[#BFDBFE]">
                                <Sparkles className="h-3.5 w-3.5 text-[#F97316]" />
                                <span>{getSetting('pillars_badge_text', 'ARSITEKTUR MISI-KRITIS')}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                                {getSetting('pillars_headline', '6 Pilar Keunggulan Solusi Liva SIMRS')}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Fondasi teknologi kesehatan masa depan yang menggabungkan efisiensi alur klinis, integrasi regulasi Kemenkes, dan ketangguhan arsitektur cloud.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => onNavigate('keunggulan')}
                            className="btn-spring px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-xs font-semibold text-[#1E60D5] border border-blue-200/80 shadow-xs flex items-center gap-2 cursor-pointer self-start md:self-auto font-mono focus-ring"
                        >
                            <span>Lihat Matriks Komparasi KLAS</span>
                            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                                <ArrowRight className="h-3 w-3 text-[#1E60D5]" />
                            </div>
                        </button>
                    </div>

                    {/* Mobile Pillar Quick Category Switcher */}
                    <div className="flex md:hidden items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                        {activePillars.map((p, pIdx) => {
                            const isSelected = activePillarIdx === pIdx;
                            const numStr = p.pillar_number || String(pIdx + 1).padStart(2, '0');
                            return (
                                <button
                                    key={pIdx}
                                    type="button"
                                    onClick={() => scrollPillarTo(pIdx)}
                                    className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                        isSelected
                                            ? 'bg-[#1E60D5] text-white shadow-xs'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <span>{numStr} • {p.tag || p.badge?.split(' ')[0] || `Pilar ${pIdx + 1}`}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Asymmetric Bento Architecture (Horizontal Snap Carousel on mobile, Bento on Desktop) */}
                    <div
                        ref={pillarScrollRef}
                        onScroll={handlePillarScroll}
                        className="flex md:grid md:grid-cols-12 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 pt-1"
                    >
                        {activePillars.map((pillar, idx) => {
                            const isHero = idx === 0;
                            const isSecondary = idx === 1;
                            const colSpan = isHero 
                                ? 'col-span-12 lg:col-span-7' 
                                : isSecondary 
                                    ? 'col-span-12 lg:col-span-5' 
                                    : 'col-span-12 sm:col-span-6 lg:col-span-4';

                            const numStr = pillar.pillar_number || String(idx + 1).padStart(2, '0');
                            const tagLabel = pillar.badge || (isHero ? 'FLAGSHIP RME' : isSecondary ? 'SATUSEHAT FHIR' : `PILAR ${numStr}`);
                            const metricVal = pillar.metric_value || (isHero ? '< 2.4 mnt' : isSecondary ? '100% FHIR' : idx === 2 ? '< 0.3%' : '99.98%');
                            const metricTxt = pillar.metric_label || (isHero ? 'Entri SOAP Dokter' : isSecondary ? 'HL7 Standar Nasional' : idx === 2 ? 'Dispute Klaim BPJS' : 'SLA Ketersediaan');

                            return (
                                <div
                                    key={pillar.id || idx}
                                    className={`w-[88vw] xs:w-[330px] md:w-auto shrink-0 snap-center ${colSpan} relative overflow-hidden p-1.5 sm:p-2 rounded-[2rem] transition-all duration-300 group ${
                                        isHero
                                            ? 'bg-gradient-to-br from-blue-100/90 via-slate-100/80 to-blue-50/50 border border-blue-200/90 shadow-sm hover:border-blue-400'
                                            : isSecondary
                                                ? 'bg-gradient-to-br from-emerald-100/80 via-slate-100/80 to-emerald-50/50 border border-emerald-200/80 shadow-sm hover:border-emerald-400'
                                                : 'bg-slate-100/80 hover:bg-slate-200/60 border border-slate-200/90 shadow-2xs hover:border-slate-300'
                                    }`}
                                >
                                    <div className="p-5 sm:p-7 rounded-[calc(2rem-0.375rem)] bg-white h-full flex flex-col justify-between space-y-4 sm:space-y-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] relative overflow-hidden">
                                        {isHero && (
                                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_0%,rgba(30,96,213,0.08)_0%,transparent_70%)] pointer-events-none" />
                                        )}
                                        {isSecondary && (
                                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_0%,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />
                                        )}

                                        <div className="space-y-3.5 sm:space-y-4 relative z-10">
                                            {/* Header inside card */}
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-2 sm:gap-2.5">
                                                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                                                        isHero 
                                                            ? 'bg-[#EBF2FE] text-[#1E60D5] shadow-xs' 
                                                            : isSecondary 
                                                                ? 'bg-emerald-50 text-emerald-700 shadow-xs' 
                                                                : 'bg-slate-100 text-slate-700'
                                                    }`}>
                                                        {isHero ? <FileText className="h-4 w-4 sm:h-5 sm:w-5" /> : isSecondary ? <Cloud className="h-4 w-4 sm:h-5 sm:w-5" /> : <Activity className="h-4 w-4 sm:h-5 sm:w-5" />}
                                                    </div>
                                                    <span className={`text-[10px] sm:text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                                                        isHero 
                                                            ? 'bg-blue-50 border-blue-200 text-[#1E60D5]' 
                                                            : isSecondary 
                                                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                                                                : 'bg-slate-50 border-slate-200 text-slate-600'
                                                    }`}>
                                                        {tagLabel}
                                                    </span>
                                                </div>

                                                <div className="text-right">
                                                    <span className="text-[11px] font-mono font-bold text-slate-900 block leading-tight">
                                                        {metricVal}
                                                    </span>
                                                    <span className="text-[9px] sm:text-[9.5px] text-slate-500 font-mono block">
                                                        {metricTxt}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Title & Description */}
                                            <div className="space-y-1.5 sm:space-y-2">
                                                <h3 className={`font-extrabold text-[#0F172A] tracking-tight font-display transition-colors leading-snug ${
                                                    isHero ? 'text-base sm:text-xl lg:text-2xl group-hover:text-[#1E60D5]' : isSecondary ? 'text-[15px] sm:text-lg group-hover:text-emerald-700' : 'text-sm sm:text-base group-hover:text-[#1E60D5]'
                                                }`}>
                                                    {pillar.title}
                                                </h3>
                                                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                                                    {pillar.description}
                                                </p>
                                            </div>

                                            {isHero && (
                                                <div className="pt-1 sm:pt-2">
                                                    <div className="text-[9.5px] sm:text-[10px] font-mono uppercase text-slate-500 font-semibold mb-1.5 sm:mb-2">
                                                        Alur Kerja Klinis Terintegrasi:
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[10.5px] sm:text-[11px] font-medium text-slate-700">
                                                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-50 border border-slate-200/80">Triase IGD</span>
                                                        <span className="text-slate-400">➔</span>
                                                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-blue-50 border border-blue-200/80 text-[#1E60D5] font-semibold">SOAP & CPPT</span>
                                                        <span className="text-slate-400">➔</span>
                                                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-50 border border-slate-200/80">E-Prescription</span>
                                                        <span className="text-slate-400">➔</span>
                                                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-700 font-semibold">Klaim Valid</span>
                                                    </div>
                                                </div>
                                            )}

                                            {isSecondary && (
                                                <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
                                                    <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] font-semibold text-emerald-900">
                                                        <span>Kemenkes SATUSEHAT Sync</span>
                                                        <span className="text-emerald-700 font-mono">100% Verified</span>
                                                    </div>
                                                    <div className="w-full bg-emerald-200/60 h-1.5 rounded-full overflow-hidden">
                                                        <div className="bg-emerald-600 h-full w-full rounded-full" />
                                                    </div>
                                                    <div className="text-[9.5px] sm:text-[10px] text-emerald-800 font-mono">
                                                        Encounter • Condition • Medication
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono relative z-10">
                                            <div className="flex items-center gap-1.5">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                                                <span className="text-slate-700 font-medium text-[11px] sm:text-xs">Akreditasi STARKES</span>
                                            </div>
                                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 group-hover:bg-[#1E60D5] group-hover:text-white text-slate-500 flex items-center justify-center transition-all duration-200">
                                                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile Dot Indicators & Control */}
                    <div className="flex md:hidden items-center justify-between pt-1">
                        <div className="flex items-center gap-1">
                            {activePillars.map((_, dotIdx) => (
                                <button
                                    key={dotIdx}
                                    type="button"
                                    onClick={() => scrollPillarTo(dotIdx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        activePillarIdx === dotIdx
                                            ? 'w-6 bg-[#1E60D5]'
                                            : 'w-2 bg-slate-300 hover:bg-slate-400'
                                    }`}
                                    aria-label={`Pindah ke pilar ${dotIdx + 1}`}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => scrollPillarTo(activePillarIdx - 1)}
                                disabled={activePillarIdx === 0}
                                className="p-1.5 rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                                aria-label="Pilar sebelumnya"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollPillarTo(activePillarIdx + 1)}
                                disabled={activePillarIdx === activePillars.length - 1}
                                className="p-1.5 rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                                aria-label="Pilar berikutnya"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    const renderModules = () => {
        const previewModules = modules.slice(0, 4);

        const scrollModuleTo = (idx) => {
            const nextIdx = Math.max(0, Math.min(previewModules.length - 1, idx));
            setActiveModuleIdx(nextIdx);
            if (moduleScrollRef.current) {
                const card = moduleScrollRef.current.children[nextIdx];
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        };

        const handleModuleScroll = (e) => {
            const container = e.currentTarget;
            const scrollLeft = container.scrollLeft;
            const width = container.offsetWidth;
            if (width > 0) {
                const newIndex = Math.round(scrollLeft / (width * 0.85));
                if (newIndex !== activeModuleIdx && newIndex >= 0 && newIndex < previewModules.length) {
                    setActiveModuleIdx(newIndex);
                }
            }
        };

        return (
            <section className={`${pyDensity} bg-white border-b border-slate-200/60 relative overflow-hidden`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-12 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-2 max-w-xl">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7ED] text-[#F97316] text-xs font-semibold border border-[#FFEDD5]">
                                <Layers className="h-3.5 w-3.5" />
                                <span>{getSetting('modules_badge_text', 'MODULAR & TERPADU')}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                                {getSetting('modules_headline', 'Katalog 36 Modul SIMRS & Klinik Terpadu')}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Seluruh modul saling terhubung secara native untuk efisiensi menyeluruh di instalasi rawat jalan, rawat inap, farmasi, kasir, dan penunjang medis.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => onNavigate('modul-simrs')}
                            className="btn-spring text-xs font-semibold text-slate-700 hover:text-[#1E60D5] border border-slate-200 hover:border-blue-300 rounded-full h-11 px-5 flex items-center gap-2.5 cursor-pointer bg-white shadow-xs focus-ring"
                        >
                            <span>Eksplorasi Seluruh 36 Modul</span>
                            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                                <ArrowRight className="h-3.5 w-3.5 text-[#1E60D5]" />
                            </div>
                        </button>
                    </div>

                    {/* Asymmetric Bento Architecture for Modules (Snap Carousel on Mobile, Bento on Desktop) */}
                    <div
                        ref={moduleScrollRef}
                        onScroll={handleModuleScroll}
                        className="flex md:grid md:grid-cols-12 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 pt-1"
                    >
                        {previewModules.map((mod, i) => {
                            const isPrimary = i === 0;
                            const isSecondary = i === 1;
                            const colSpan = isPrimary
                                ? 'col-span-12 lg:col-span-7'
                                : isSecondary
                                    ? 'col-span-12 lg:col-span-5'
                                    : 'col-span-12 sm:col-span-6 lg:col-span-6';

                            return (
                                <div
                                    key={mod.id || i}
                                    onClick={() => openModuleModal(mod)}
                                    className={`w-[85vw] xs:w-[300px] md:w-auto shrink-0 snap-center ${colSpan} p-1.5 sm:p-2 rounded-[2rem] transition-all duration-300 cursor-pointer group ${
                                        isPrimary
                                            ? 'bg-gradient-to-br from-blue-100/90 via-slate-100/80 to-blue-50/50 border border-blue-200/90 shadow-xs hover:border-blue-400'
                                            : isSecondary
                                                ? 'bg-gradient-to-br from-indigo-100/80 via-slate-100/80 to-indigo-50/40 border border-indigo-200/80 shadow-xs hover:border-indigo-400'
                                                : 'bg-slate-100/80 hover:bg-slate-200/60 border border-slate-200/90 shadow-2xs hover:border-slate-300'
                                    }`}
                                >
                                    <div className="p-5 sm:p-7 rounded-[calc(2rem-0.375rem)] bg-white h-full flex flex-col justify-between space-y-4 sm:space-y-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                                        <div className="space-y-3.5 sm:space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 sm:gap-2.5">
                                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EBF2FE] text-[#1E60D5] flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform shadow-xs">
                                                        <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    </div>
                                                    <span className="font-mono text-[10px] sm:text-[10.5px] font-bold text-[#1E60D5] px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/70">
                                                        {mod.module_code || `MOD-0${i + 1}`}
                                                    </span>
                                                </div>

                                                <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 font-semibold px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200/70">
                                                    {mod.category_name || (isPrimary ? 'Modul Pelayanan' : 'Integrasi')}
                                                </span>
                                            </div>

                                            <div className="space-y-1.5">
                                                <h3 className={`font-bold text-[#0F172A] group-hover:text-[#1E60D5] transition-colors leading-snug font-display ${
                                                    isPrimary ? 'text-base sm:text-xl' : 'text-sm sm:text-lg'
                                                }`}>
                                                    {mod.title}
                                                </h3>
                                                <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-3 leading-relaxed">
                                                    {mod.short_description}
                                                </p>
                                            </div>

                                            {isPrimary && (
                                                <div className="p-2.5 sm:p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-[11px] sm:text-xs text-blue-900 font-mono">
                                                    <span className="truncate mr-2">⚡ SATUSEHAT & BPJS VClaim</span>
                                                    <span className="text-emerald-700 font-bold shrink-0">Aktif</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-3 sm:pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1E60D5]">
                                            <span>Spesifikasi Modul</span>
                                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50 group-hover:bg-[#1E60D5] group-hover:text-white flex items-center justify-center transition-all">
                                                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile Dot Indicators & Control */}
                    <div className="flex md:hidden items-center justify-between pt-1">
                        <div className="flex items-center gap-1">
                            {previewModules.map((_, dotIdx) => (
                                <button
                                    key={dotIdx}
                                    type="button"
                                    onClick={() => scrollModuleTo(dotIdx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        activeModuleIdx === dotIdx
                                            ? 'w-6 bg-[#1E60D5]'
                                            : 'w-2 bg-slate-300 hover:bg-slate-400'
                                    }`}
                                    aria-label={`Pindah ke modul ${dotIdx + 1}`}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => scrollModuleTo(activeModuleIdx - 1)}
                                disabled={activeModuleIdx === 0}
                                className="p-1.5 rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                                aria-label="Modul sebelumnya"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollModuleTo(activeModuleIdx + 1)}
                                disabled={activeModuleIdx === previewModules.length - 1}
                                className="p-1.5 rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                                aria-label="Modul berikutnya"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    const renderNetworkMap = () => (
        <HospitalNetworkMap onNavigate={onNavigate} onOpenDemo={openDemoModal} />
    );

    const renderFaq = () => (
        <FaqProcurementSection onNavigate={onNavigate} onOpenDemo={openDemoModal} />
    );

    const renderCtaBanner = () => (
        <section className={`${pyDensity} bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white relative overflow-hidden`}>
            <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_60%_50%_at_75%_20%,rgba(59,130,246,0.3)_0%,transparent_70%)]" />
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
