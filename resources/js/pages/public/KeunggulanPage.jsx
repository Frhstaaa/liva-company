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
    Shield
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

    const renderPillars = () => (
        <section key="pillars" className={`relative overflow-hidden bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] ${pyDensity}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF2FE] text-[#1E60D5] text-xs font-mono font-bold border border-[#C5DCFE]">
                        <Layers className="h-3.5 w-3.5" />
                        <span>ARCHITECTURAL EXCELLENCE</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-display">
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
                            className={`card-clinical p-6 sm:p-7 space-y-4 group ${cardRadius}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="w-11 h-11 rounded-xl bg-[#EBF2FE] border border-[#C5DCFE] text-[#1E60D5] flex items-center justify-center shadow-2xs group-hover:bg-[#1E60D5] group-hover:text-white transition-colors duration-200">
                                    <Activity className="h-5 w-5" />
                                </div>
                                <span className="font-mono text-[10px] text-slate-700 font-bold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                                    PILAR 0{index + 1}
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#1E60D5] transition-colors leading-snug font-display">
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
    );

    const renderComparison = () => (
        <section key="comparison" id="komparasi-table" className={`relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#EEF5FF] ${pyDensity} border-t border-slate-200/80`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF7ED] text-[#EA580C] text-xs font-mono font-bold border border-[#FFD8BF]">
                        <GitCompare className="h-3.5 w-3.5" />
                        <span>OBJECTIVE EVALUATION MATRIX</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-display">
                        Matriks Komparasi Standar Evaluasi Rumah Sakit
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Perbandingan menyeluruh Liva SIMRS terhadap vendor warisan lama dan pengembangan internal (in-house).
                    </p>
                </div>

                <div className={`bg-white ${cardRadius} border border-slate-200 shadow-lg overflow-hidden`}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-800 font-mono text-[11px] border-b border-slate-200">
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

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 font-mono">
                        * Data perbandingan diverifikasi dari audit implementasi 18+ rumah sakit mitra.
                    </p>
                    <button
                        type="button"
                        onClick={() => openDemoModal()}
                        className="px-6 py-3 bg-[#1E60D5] hover:bg-[#164DB0] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/25 transition-all cursor-pointer flex items-center gap-2 btn-spring focus-ring"
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

