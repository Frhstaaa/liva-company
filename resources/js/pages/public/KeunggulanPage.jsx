import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Button } from '@/components/ui/button';
import SectionWrapper from '../../components/public/SectionWrapper';
import { getSectionCustomStyles } from '../../lib/sectionStyler';
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
    Layers,
    ChevronRight,
    Shield,
    Check,
    Zap
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

    // Dynamic Theme Mood & Spacing Density
    const theme = getSetting('page_keunggulan_theme', 'clinical-blue');
    const density = getSetting('page_keunggulan_density', 'normal');
    const cardRadius = getSetting('page_keunggulan_card_radius', 'rounded-2xl');

    const themeClass = {
        'clinical-blue': 'bg-[#F8FAFC] text-[#0F172A]',
        'pure-white': 'bg-white text-[#0F172A]',
        'dark-slate': 'bg-[#0B1120] text-slate-100',
        'emerald-health': 'bg-[#F0FDF4]/40 text-[#064E3B]',
        'indigo-luxury': 'bg-[#F5F3FF]/40 text-[#1E1B4B]',
    }[theme] || 'bg-[#F8FAFC] text-[#0F172A]';

    const pyDensity = {
        compact: 'py-10 sm:py-16',
        normal: 'py-16 sm:py-24',
        spacious: 'py-22 sm:py-32',
    }[density] || 'py-16 sm:py-24';

    // Parse Dynamic Section Order
    const rawOrder = getSetting('page_keunggulan_section_order');
    let orderedKeys = ['hero', 'pillars', 'comparison', 'cta'];

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
        const heroStyles = getSectionCustomStyles(getSetting, 'keunggulan', 'hero', {
            defaultBgClass: 'bg-gradient-to-b from-white via-[#F8FAFC] to-[#EEF5FF]',
            accent: '#1B84FF',
            defaultPaddingClass: 'pt-10 pb-16 sm:pb-24',
        });

        return (
            <section
                key="hero"
                id="sec-keunggulan-hero"
                className={`relative w-full ${heroStyles.bgClass} ${heroStyles.paddingClass} ${heroStyles.borderClass} overflow-hidden border-b border-slate-200/70`}
                style={heroStyles.bgStyle}
            >
                {/* Architectural Hospital Photo Overlay */}
                <div 
                    className="absolute top-0 right-0 w-full sm:w-2/3 lg:w-1/2 h-full pointer-events-none z-0 opacity-12 bg-cover bg-no-repeat bg-right-top mix-blend-multiply"
                    style={{
                        backgroundImage: `url(${heroStyles.imageUrl || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80'})`,
                        maskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 80%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 80%)'
                    }}
                />

                {/* Soft Diffuse Ambiance Lights */}
                {heroStyles.hasAmbientGlow && (
                    <>
                        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-10" style={{ backgroundColor: heroStyles.accentColor }} />
                        <div className="absolute bottom-4 right-1/4 w-80 h-80 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />
                    </>
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
                        <span className="text-[#0F172A] font-semibold">Keunggulan &amp; Komparasi</span>
                    </nav>

                    <div className="text-center max-w-3xl mx-auto space-y-4 animate-slide-up">
                        {heroStyles.showBadge && (
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] border border-[#C5DCFE] text-[#1E60D5] font-mono text-xs font-bold shadow-2xs">
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: heroStyles.accentColor }}></span>
                                <span>{heroStyles.badge || getSetting('page_keunggulan_badge', 'EVALUASI OBJEKTIF ARSITEKTUR SIMRS ENTERPRISE')}</span>
                            </div>
                        )}

                        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight font-display ${heroStyles.titleTextClass}`}>
                            {heroStyles.title || getSetting('page_keunggulan_title', 'Mengapa Rumah Sakit Terkemuka Memilih Liva SIMRS?')}
                        </h1>

                        <p className={`text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-2xl mx-auto ${heroStyles.bodyTextClass}`}>
                            {heroStyles.description || getSetting('page_keunggulan_subtitle', 'Bukan sekadar aplikasi pencatatan administratif. Liva SIMRS adalah sistem pendukung keputusan klinis berstandar internasional yang menjamin kelancaran klaim BPJS, kepatuhan SATUSEHAT Kemenkes, dan efisiensi belanja faskes.')}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                            {heroStyles.showCta && (
                                <button
                                    type="button"
                                    onClick={() => openAssessmentModal()}
                                    className={`${heroStyles.ctaClass} w-full sm:w-auto px-6 py-3 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 btn-spring focus-ring`}
                                >
                                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                                    <span>{heroStyles.ctaPrimaryText || 'Uji Kelayakan SIMRS (2 Menit)'}</span>
                                </button>
                            )}

                            {heroStyles.showSecondaryCta && (
                                <a
                                    href="#komparasi-table"
                                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm border border-slate-300/80 shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2 btn-spring focus-ring"
                                >
                                    <GitCompare className="h-4 w-4 text-[#1E60D5]" />
                                    <span>{heroStyles.ctaSecondaryText || 'Lihat Matriks Perbandingan'}</span>
                                </a>
                            )}
                        </div>
                    </div>

                {/* KPI Telemetry Strip - Modern Clinical Cards */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-3.5 p-5 sm:p-6 bg-white/95 backdrop-blur-sm ${cardRadius} border border-slate-200/90 shadow-md animate-slide-up delay-stagger-2`}>
                    <div className="p-3 text-center space-y-1">
                        <div className="flex items-center justify-center gap-1.5 text-[#1E60D5]">
                            <Clock className="h-4 w-4" />
                            <span className="text-xl sm:text-2xl font-black text-[#0F172A] font-display tabular-nums">{kpiRme}</span>
                        </div>
                        <span className="text-[11px] text-slate-600 block font-medium">Waktu Input RME Dokter</span>
                        <span className="text-[10px] text-emerald-700 font-semibold block">{kpiRmeNote}</span>
                    </div>

                    <div className="p-3 text-center space-y-1 border-l border-slate-200/80">
                        <div className="flex items-center justify-center gap-1.5 text-emerald-600">
                            <Activity className="h-4 w-4" />
                            <span className="text-xl sm:text-2xl font-black text-[#0F172A] font-display tabular-nums">{kpiFhir}</span>
                        </div>
                        <span className="text-[11px] text-slate-600 block font-medium">SATUSEHAT FHIR Sync</span>
                        <span className="text-[10px] text-[#1E60D5] font-semibold block">{kpiFhirNote}</span>
                    </div>

                    <div className="p-3 text-center space-y-1 border-l border-slate-200/80">
                        <div className="flex items-center justify-center gap-1.5 text-[#F97316]">
                            <Gauge className="h-4 w-4" />
                            <span className="text-xl sm:text-2xl font-black text-[#0F172A] font-display tabular-nums">{kpiGolive}</span>
                        </div>
                        <span className="text-[11px] text-slate-600 block font-medium">Kecepatan Go-Live</span>
                        <span className="text-[10px] text-amber-700 font-semibold block">{kpiGoliveNote}</span>
                    </div>

                    <div className="p-3 text-center space-y-1 border-l border-slate-200/80">
                        <div className="flex items-center justify-center gap-1.5 text-emerald-600">
                            <ShieldCheck className="h-4 w-4" />
                            <span className="text-xl sm:text-2xl font-black text-[#0F172A] font-display tabular-nums">{kpiBpjs}</span>
                        </div>
                        <span className="text-[11px] text-slate-600 block font-medium">Dispute Klaim BPJS</span>
                        <span className="text-[10px] text-emerald-700 font-semibold block">{kpiBpjsNote}</span>
                    </div>
                </div>
            </div>
        </section>
        );
    };

    const renderPillars = () => {
        const defaultPillars = [
            {
                pillar_number: '01',
                badge: 'ARSITEKTUR CLOUD NATIVE',
                title: 'High Availability Multi-Availability Zone & Auto-Scaling',
                description: 'Infrastruktur cloud medis terdistribusi dengan failover otomatis tanpa downtime, menjamin faskes tetap melayani pasien 24/7/365.',
                metric_value: '99.98%',
                metric_label: 'SLA Uptime Ketersediaan',
            },
            {
                pillar_number: '02',
                badge: 'STANDAR KEAMANAN TERTINGGI',
                title: 'Zero-Trust Security, ISO 27001 & TTE Terverifikasi BSrE',
                description: 'Enkripsi data klinis ganda tingkat AES-256, autentikasi multi-faktor, dan tanda tangan elektronik dokter yang diakui hukum nasional.',
                metric_value: 'ISO 27001',
                metric_label: 'Sertifikasi Keamanan Siber',
            },
            {
                pillar_number: '03',
                badge: 'INTEROPERABILITAS TERBUKA',
                title: 'Open API Architecture & HL7 FHIR SATUSEHAT Native',
                description: 'Integrasi langsung ke ekosistem kesehatan nasional Kemenkes tanpa jembatan perantara (middleware), memangkas latensi pertukaran data.',
                metric_value: '100% FHIR',
                metric_label: 'Kepatuhan Permenkes 24/2022',
            },
            {
                pillar_number: '04',
                badge: 'AUTOMATION & GROUPING',
                title: 'Engine Auto-Grouping INA-CBGs & Dispute Prevention',
                description: 'Sistem pra-validasi berkas klaim digital BPJS secara otomatis untuk mencegah kegagalan verifikasi dan mempercepat likuiditas cashflow RS.',
                metric_value: '< 0.3%',
                metric_label: 'Tingkat Dispute Berkas',
            },
            {
                pillar_number: '05',
                badge: 'ERGONOMI KLINIS',
                title: 'Antarmuka Dokter Cepat Berbasis Keyboard Shortcut',
                description: 'Desain UX klinis yang dirancang bersama dokter spesialis, memangkas entri data dari 11 menit menjadi kurang dari 2.4 menit.',
                metric_value: '< 2.4 mnt',
                metric_label: 'Waktu Selesai SOAP Medis',
            },
            {
                pillar_number: '06',
                badge: 'KEMANDIRIAN DATA',
                title: 'Data Sovereignty & Automated Hashing Backup Harian',
                description: 'Kepemilikan data 100% milik faskes dengan backup terenkripsi berkala dan verifikasi integritas SHA-256 anti manipulasi.',
                metric_value: '100% Utuh',
                metric_label: 'Validasi Integritas Data',
            }
        ];

        const activePillars = pillars && pillars.length > 0 ? pillars : defaultPillars;

        return (
            <section key="pillars" className={`relative overflow-hidden bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] ${pyDensity}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF2FE] text-[#1E60D5] text-xs font-mono font-bold border border-[#C5DCFE]">
                            <Layers className="h-3.5 w-3.5" />
                            <span>ARCHITECTURAL EXCELLENCE</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                            {getSetting('page_keunggulan_pillars_title', '6 Pilar Fondasi Sistem Informasi Manajemen Rumah Sakit')}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {getSetting('page_keunggulan_pillars_desc', 'Fondasi arsitektur cloud native yang tangguh untuk memfasilitasi beban operasional medis 24/7 tanpa kompromi performa.')}
                        </p>
                    </div>

                    {/* Asymmetric Bento Architecture */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
                        {activePillars.map((pilar, index) => {
                            const isHero = index === 0;
                            const isSecondary = index === 1;
                            const colSpan = isHero
                                ? 'col-span-12 lg:col-span-7'
                                : isSecondary
                                    ? 'col-span-12 lg:col-span-5'
                                    : 'col-span-12 sm:col-span-6 lg:col-span-4';

                            const numStr = pilar.pillar_number || String(index + 1).padStart(2, '0');
                            const tagLabel = pilar.badge || `PILAR ${numStr}`;
                            const metricVal = pilar.metric_value || (isHero ? '99.98%' : isSecondary ? 'ISO 27001' : '< 0.3%');
                            const metricTxt = pilar.metric_label || (isHero ? 'High Availability SLA' : isSecondary ? 'Standar Kemenkes' : 'Tingkat Dispute');

                            return (
                                <div
                                    key={index}
                                    className={`${colSpan} p-1.5 sm:p-2 rounded-[2rem] transition-all duration-300 group ${
                                        isHero
                                            ? 'bg-gradient-to-br from-blue-100/90 via-slate-100/80 to-blue-50/50 border border-blue-200/90 shadow-sm hover:border-blue-400'
                                            : isSecondary
                                                ? 'bg-gradient-to-br from-emerald-100/80 via-slate-100/80 to-emerald-50/50 border border-emerald-200/80 shadow-sm hover:border-emerald-400'
                                                : 'bg-slate-100/80 hover:bg-slate-200/60 border border-slate-200/90 shadow-2xs hover:border-slate-300'
                                    }`}
                                >
                                    <div className="p-6 sm:p-7 rounded-[calc(2rem-0.375rem)] bg-white h-full flex flex-col justify-between space-y-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] relative overflow-hidden">
                                        {isHero && (
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
                                        )}
                                        {isSecondary && (
                                            <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
                                        )}

                                        <div className="space-y-4 relative z-10">
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-2.5">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                                                        isHero 
                                                            ? 'bg-[#EBF2FE] text-[#1E60D5] shadow-xs' 
                                                            : isSecondary 
                                                                ? 'bg-emerald-50 text-emerald-700 shadow-xs' 
                                                                : 'bg-slate-100 text-slate-700'
                                                    }`}>
                                                        <Activity className="h-5 w-5" />
                                                    </div>
                                                    <span className={`font-mono text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border ${
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
                                                    <span className="text-[9.5px] text-slate-500 font-mono block">
                                                        {metricTxt}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h3 className={`font-bold text-[#0F172A] tracking-tight font-display transition-colors leading-snug ${
                                                    isHero ? 'text-lg sm:text-xl lg:text-2xl group-hover:text-[#1E60D5]' : isSecondary ? 'text-base sm:text-lg group-hover:text-emerald-700' : 'text-base group-hover:text-[#1E60D5]'
                                                }`}>
                                                    {pilar.title}
                                                </h3>
                                                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                                                    {pilar.description}
                                                </p>
                                            </div>

                                            {isHero && (
                                                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono">
                                                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#1E60D5] border border-blue-200/80 font-semibold">
                                                        ⚡ Cloud-Native Kubernetes
                                                    </span>
                                                    <span className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200">
                                                        Multi-AZ Redundancy
                                                    </span>
                                                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                                                        Auto-Failover Sub-Detik
                                                    </span>
                                                </div>
                                            )}

                                            {isSecondary && (
                                                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-950 font-mono">
                                                    <span>Enkripsi AES-256 GCM</span>
                                                    <span className="text-emerald-700 font-bold">Terverifikasi BSrE</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono relative z-10">
                                            <div className="flex items-center gap-1.5">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                                <span className="text-slate-700 font-medium">Standar Evaluasi KLAS Enterprise</span>
                                            </div>
                                            <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#1E60D5] group-hover:text-white text-slate-500 flex items-center justify-center transition-all duration-200">
                                                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
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
    };

    const renderComparison = () => (
        <section key="comparison" id="komparasi-table" className={`relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#EEF5FF] ${pyDensity} border-t border-slate-200/80`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF7ED] text-[#EA580C] text-xs font-mono font-bold border border-[#FFD8BF]">
                        <GitCompare className="h-3.5 w-3.5" />
                        <span>OBJECTIVE EVALUATION MATRIX</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                        Matriks Komparasi Standar Evaluasi Rumah Sakit
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Perbandingan menyeluruh Liva SIMRS terhadap vendor warisan lama dan pengembangan internal (in-house).
                    </p>
                </div>

                {/* 3 Executive Summary Bento Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                    {/* Card 1: Liva SIMRS */}
                    <div className="p-1.5 rounded-[1.75rem] bg-gradient-to-br from-blue-500 to-[#1E60D5] shadow-md text-white">
                        <div className="p-5 sm:p-6 rounded-[calc(1.75rem-0.375rem)] bg-gradient-to-br from-[#1E60D5] to-[#1248A8] h-full flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[10px] font-bold">
                                        PILIHAN UTAMA RS
                                    </span>
                                    <span className="text-xs font-mono font-bold text-amber-300">
                                        SKOR 99.8%
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold font-display">Liva SIMRS Enterprise</h3>
                                <p className="text-xs text-blue-100 leading-relaxed">
                                    Arsitektur modern cloud-native, bridging native SATUSEHAT & BPJS, zero-maintenance infrastruktur.
                                </p>
                            </div>
                            <div className="pt-3 border-t border-white/20 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5 font-semibold">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span>100% Kepatuhan STARKES & Permenkes</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Vendor Lama */}
                    <div className="p-1.5 rounded-[1.75rem] bg-slate-200/80">
                        <div className="p-5 sm:p-6 rounded-[calc(1.75rem-0.375rem)] bg-white h-full flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] font-semibold">
                                        SISTEM TRADISIONAL
                                    </span>
                                    <span className="text-xs font-mono font-bold text-rose-500">
                                        LEGACY RISK
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 font-display">Vendor SIMRS Warisan</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Aplikasi desktop lokal rentan korupsi database, bridging sering terputus, pembaruan fitur lambat.
                                </p>
                            </div>
                            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                                <XCircle className="w-4 h-4 text-rose-500" />
                                <span>Biaya lisensi tinggi & dispute klaim</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: In-House Dev */}
                    <div className="p-1.5 rounded-[1.75rem] bg-slate-200/80">
                        <div className="p-5 sm:p-6 rounded-[calc(1.75rem-0.375rem)] bg-white h-full flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] font-semibold">
                                        INTERNAL TIM IT
                                    </span>
                                    <span className="text-xs font-mono font-bold text-amber-600">
                                        TURNOVER RISK
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 font-display">Development In-House</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Rentan terbengkalai saat programmer resign, dokumentasi minim, sulit mengikuti perubahan regulasi cepat.
                                </p>
                            </div>
                            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                                <HelpCircle className="w-4 h-4 text-amber-500" />
                                <span>Biaya server & gaji developer terus naik</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Double-Bezel Table Wrapper */}
                <div className="p-1.5 sm:p-2.5 rounded-[2.25rem] bg-slate-100/90 border border-slate-200/90 shadow-md">
                    <div className="rounded-[calc(2.25rem-0.5rem)] bg-white overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="bg-slate-100/90 text-slate-800 font-mono text-[11px] border-b border-slate-200">
                                        <th scope="col" className="p-4 sm:p-5 font-bold">DIMENSI EVALUASI</th>
                                        <th scope="col" className="p-4 sm:p-5 font-bold bg-[#1E60D5] text-white tracking-wide">
                                            <div className="flex items-center gap-1.5">
                                                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                                <span>LIVA SIMRS (ENTERPRISE)</span>
                                            </div>
                                        </th>
                                        <th scope="col" className="p-4 sm:p-5 font-bold text-slate-700">VENDOR SIMRS LAMA</th>
                                        <th scope="col" className="p-4 sm:p-5 font-bold text-slate-700">DEVELOPMENT IN-HOUSE</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {comparisons.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-blue-50/20 transition-colors">
                                            <td className="p-4 sm:p-5 font-bold text-[#0F172A] bg-slate-50/50">
                                                {item.feature}
                                            </td>
                                            <td className="p-4 sm:p-5 font-semibold text-[#0F172A] bg-blue-50/40 border-x border-blue-100">
                                                <div className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                                    <span className="leading-snug">{item.liva}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 sm:p-5 text-slate-600">
                                                <div className="flex items-start gap-2">
                                                    <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                                                    <span className="leading-snug">{item.others}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 sm:p-5 text-slate-600">
                                                <div className="flex items-start gap-2">
                                                    <HelpCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                                    <span className="leading-snug">{item.inhouse || 'Tergantung turnover programmer IT internal'}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 font-mono">
                        * Data perbandingan diverifikasi dari audit implementasi 18+ rumah sakit mitra.
                    </p>
                    <button
                        type="button"
                        onClick={() => openDemoModal()}
                        className="btn-spring px-6 py-3 bg-[#1E60D5] hover:bg-[#164DB0] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/25 transition-all cursor-pointer flex items-center gap-2 focus-ring"
                    >
                        <Calendar className="h-4 w-4" />
                        <span>Jadwalkan Technical Assessment RS</span>
                    </button>
                </div>
            </div>
        </section>
    );

    const renderCta = () => (
        <section key="cta" className={`${pyDensity} bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] relative overflow-hidden border-t border-slate-200/80`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] text-[#1E60D5] text-xs font-mono font-bold border border-[#C5DCFE] shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
                    <span>CLINICAL RISK ASSESSMENT</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] font-display">
                    Siap Membuktikan Efisiensi Finansial &amp; Klinis Liva SIMRS?
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                    Dapatkan perbandingan detail TCO (Total Cost of Ownership) dan uji coba live data sandbox untuk tim manajemen faskes Anda.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                        onClick={() => openDemoModal()}
                        className="h-11 px-6 rounded-xl bg-[#1E60D5] hover:bg-[#164DB0] text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all cursor-pointer gap-2 btn-spring focus-ring"
                    >
                        <Rocket className="h-4 w-4 text-white" />
                        <span>Jadwalkan Live Demo RS</span>
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
        pillars: renderPillars,
        comparison: renderComparison,
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
                    <SectionWrapper key={key} pageId="keunggulan" secId={key} showContainer={false}>
                        {renderer()}
                    </SectionWrapper>
                );
            })}
        </div>
    );
}

