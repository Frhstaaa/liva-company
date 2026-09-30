import React from 'react';
import { 
    Sparkles, 
    ShieldCheck, 
    CheckCircle2, 
    ArrowRight, 
    Building2, 
    Users, 
    Award, 
    Target, 
    HeartHandshake, 
    Lock, 
    Stethoscope, 
    Hospital, 
    TrendingUp, 
    Clock, 
    Check, 
    MapPin, 
    Phone, 
    Mail, 
    Activity, 
    Cpu, 
    Server,
    Globe2,
    Calendar,
    ChevronRight,
    BadgeCheck,
    Zap
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import SectionWrapper from '../../components/public/SectionWrapper';
import { getSectionCustomStyles } from '../../lib/sectionStyler';

export default function TentangKamiPage({ onNavigate }) {
    const { openDemoModal, openAssessmentModal, getSetting } = useSite();

    const milestones = [
        {
            year: '2021',
            title: 'Inisiasi Arsitektur Cloud Klinis',
            desc: 'Riset mendalam bersama 15+ direktur rumah sakit dan dokter spesialis untuk merancang arsitektur SIMRS modular yang ringan dan intuitif.'
        },
        {
            year: '2022',
            title: 'Peluncuran RME Permenkes No. 24',
            desc: 'Implementasi modul Rekam Medis Elektronik (RME) native SOAP, integrasi TTE BSrE sah hukum, dan bridging BPJS VClaim 2.0.'
        },
        {
            year: '2023',
            title: 'Sertifikasi SATUSEHAT Kemenkes RI',
            desc: 'Integrasi penuh protokol HL7 FHIR R4 SATUSEHAT untuk modul Rawat Jalan, IGD, Laboratorium, dan Radiologi secara real-time.'
        },
        {
            year: '2024',
            title: 'Ekspansi 40+ Faskes & Auto-Grouping CBGs',
            desc: 'Pengembangan engine Casemix cerdas dengan akurasi bridging 99.7% dan implementasi di RSUD serta RS Swasta kelas B, C, dan D.'
        },
        {
            year: '2025 - 2026',
            title: 'Liva Medical OS & Intelligence Hub',
            desc: 'Peluncuran generasi baru 36 modul terpadu dengan standar keamanan ISO 27001 dan pemantauan kinerja rumah sakit real-time.'
        }
    ];

    const leadership = [
        {
            name: 'Ir. Reza Prasetyo, M.T.',
            role: 'Chief Executive Officer',
            sub: 'Health Tech Architect & Enterprise System Lead',
            bio: 'Berpengalaman lebih dari 14 tahun dalam memimpin arsitektur sistem informasi skala nasional dan transformasi digital industri kesehatan.',
            photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
            cert: 'Enterprise Cloud Architect'
        },
        {
            name: 'dr. Hendra Wijaya, Sp.PK, MARS',
            role: 'Chief Medical Officer',
            sub: 'Clinical Governance & STARKES Accreditation Lead',
            bio: 'Dokter spesialis dan konsultan manajemen rumah sakit yang memastikan seluruh alur SOAP, triage IGD, dan laboratorium memenuhi standar akreditasi KARS & STARKES.',
            photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
            cert: 'Surveior Akreditasi KARS'
        },
        {
            name: 'Maya Kusuma, S.Kom., M.Sc.',
            role: 'Chief Technology Officer',
            sub: 'Cloud Infrastructure & Health Data Security',
            bio: 'Spesialis keamanan data kesehatan terdistribusi dan integrasi HL7 FHIR Kemenkes, memimpin tim DevOps dengan jaminan uptime 99.98%.',
            photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
            cert: 'ISO 27001 Lead Implementer'
        },
        {
            name: 'Dimas Raditya, S.Far., Apt.',
            role: 'Head of Pharmacy & Casemix Solutions',
            sub: 'Hospital Dispensing & INA-CBGs Specialist',
            bio: 'Pakar tata kelola farmasi rumah sakit dan koding INA-CBGs yang merancang engine pencegahan dispute klaim BPJS serta otomasi stok FIFO/FEFO.',
            photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
            cert: 'Casemix Coding Specialist'
        }
    ];

    const coreValues = [
        {
            title: 'Clinical-First UX',
            tag: 'Desain Berpusat Pada Nakes',
            desc: 'Setiap antarmuka dirancang langsung bersama dokter, perawat, dan staf medis untuk memangkas waktu entri data menjadi < 2.4 menit per pasien.',
            icon: Stethoscope,
            color: 'text-[#1E60D5]',
            bg: 'bg-blue-50/80',
            border: 'border-blue-200/80'
        },
        {
            title: 'Zero-Compromise Security',
            tag: 'Keamanan Setara Perbankan',
            desc: 'Enkripsi data medis AES-256 saat transmisi dan penyimpanan, kepatuhan UU PDP No. 27/2022, serta audit log digital BSrE sah hukum.',
            icon: Lock,
            color: 'text-emerald-700',
            bg: 'bg-emerald-50/80',
            border: 'border-emerald-200/80'
        },
        {
            title: 'Native Interoperability',
            tag: 'Integrasi Ekosistem Nasional',
            desc: 'Kompatibilitas bawaan dengan SATUSEHAT FHIR R4 Kemenkes, BPJS VClaim 2.0, Mobile JKN, Antrean Faskes, dan LIS/PACS tanpa biaya perantara.',
            icon: Globe2,
            color: 'text-[#EA580C]',
            bg: 'bg-orange-50/80',
            border: 'border-orange-200/80'
        },
        {
            title: 'Human-Centric Partnership',
            tag: 'Pendampingan On-Site 24/7',
            desc: 'Kami tidak sekadar menjual lisensi, tetapi mendampingi rumah sakit Anda melalui pelatihan langsung, gladi bersih akreditasi, dan SLA dukungan teknis 99.98%.',
            icon: HeartHandshake,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50/80',
            border: 'border-indigo-200/80'
        }
    ];

    const isVisible = (key, defaultVal = true) => {
        const val = getSetting(key, defaultVal);
        if (typeof val === 'boolean') return val;
        if (val === '1' || val === 'true') return true;
        if (val === '0' || val === 'false') return false;
        return defaultVal;
    };

    // Dynamic Theme Mood & Spacing Density
    const theme = getSetting('page_tentang-kami_theme', 'clinical-blue');
    const density = getSetting('page_tentang-kami_density', 'normal');
    const cardRadius = getSetting('page_tentang-kami_card_radius', 'rounded-2xl');

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
    const rawOrder = getSetting('page_tentang-kami_section_order');
    let orderedKeys = ['hero', 'stats', 'visi_misi', 'values', 'leadership', 'cta'];

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

    const heroStyles = getSectionCustomStyles(getSetting, 'tentang-kami', 'hero', {
        title: getSetting('page_about_title', 'Membangun Fondasi Digital Rumah Sakit Indonesia yang Modern, Andal, dan Humanis.'),
        badge: getSetting('page_about_badge', 'PROFIL PERUSAHAAN & VISI KESEHATAN DIGITAL'),
        description: getSetting('page_about_subtitle', 'Liva SIMRS adalah pengembang platform teknologi informasi kesehatan terkemuka di Indonesia yang mengintegrasikan Rekam Medis Elektronik (RME) Permenkes No. 24/2022, Bridging BPJS VClaim 2.0, SATUSEHAT Kemenkes, dan otomasi manajemen operasional rumah sakit dalam satu ekosistem terpadu berkeamanan tinggi.'),
        cta1Text: 'Jadwalkan Presentasi Direksi',
        cta2Text: 'Uji Kesiapan Digital Faskes'
    });

    const renderHero = () => (
        <section key="hero" className={`py-14 sm:py-20 relative overflow-hidden border-b border-slate-200/70 ${heroStyles.bgClasses}`} style={heroStyles.bgStyle}>
            {/* Clean Ambient Lights */}
            {heroStyles.showAmbientGlow && (
                <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                        background: 'radial-gradient(ellipse 60% 50% at 75% 0%, rgba(30,96,213,0.15) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 25% 100%, rgba(249,115,22,0.05) 0%, transparent 70%)'
                    }}
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                {/* Accessible Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                    <button
                        type="button"
                        onClick={() => onNavigate && onNavigate('beranda')}
                        className="hover:text-[#1E60D5] transition-colors flex items-center gap-1 cursor-pointer font-medium focus-ring rounded"
                    >
                        <Building2 className="h-3.5 w-3.5" />
                        <span>Beranda</span>
                    </button>
                    <ChevronRight className="h-3 w-3 text-slate-400" />
                    <span className="text-[#0F172A] font-semibold">Tentang Kami</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* Left Hero Narrative */}
                    <div className="lg:col-span-7 space-y-5 text-left">
                        {heroStyles.showBadge && (
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] border border-[#C5DCFE] text-[#1E60D5] text-xs font-mono font-bold shadow-2xs">
                                <Sparkles className="w-3.5 h-3.5 text-[#F97316] animate-spin" />
                                <span>{heroStyles.badge}</span>
                            </div>
                        )}

                        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display leading-[1.18] ${heroStyles.textColor}`}>
                            {heroStyles.title}
                        </h1>

                        <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${heroStyles.textMutedColor}`}>
                            {heroStyles.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            {heroStyles.showCta && (
                                <button
                                    onClick={() => openDemoModal('Presentasi Direksi & Tentang Kami')}
                                    style={{ backgroundColor: heroStyles.accentColor }}
                                    className="px-6 py-3 rounded-xl hover:opacity-95 text-white font-bold text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 cursor-pointer btn-spring shadow-lg shadow-blue-600/20 focus-ring"
                                >
                                    <span>{heroStyles.cta1Text || 'Jadwalkan Presentasi Direksi'}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            )}
                            <button
                                onClick={() => openAssessmentModal()}
                                className="px-5 py-3 rounded-xl bg-white border border-slate-200/90 hover:border-blue-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all shadow-2xs flex items-center gap-2 cursor-pointer btn-spring focus-ring"
                            >
                                <Sparkles className="w-4 h-4 text-[#F97316]" />
                                <span>{heroStyles.cta2Text || 'Uji Kesiapan Digital Faskes'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Photo Frame */}
                    {heroStyles.showImage && (
                        <div className="lg:col-span-5 relative">
                            <div className={`relative ${cardRadius} overflow-hidden border border-slate-200 shadow-xl bg-slate-100 ${heroStyles.imageAspectClass} ${heroStyles.imageFrameClass} group`}>
                                <img 
                                    src={heroStyles.imageUrl || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=85"} 
                                    alt="Tim Medis dan Tim Digital Health Liva SIMRS Berkolaborasi di Rumah Sakit"
                                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/10 pointer-events-none" />

                                {/* Top Floating Badge */}
                                <div className="absolute top-4 left-4 backdrop-blur-md bg-white/95 border border-white/80 shadow-md px-3.5 py-1.5 rounded-xl flex items-center gap-2">
                                    <BadgeCheck className="w-4 h-4 text-[#1E60D5]" />
                                    <span className="text-xs font-bold text-slate-800 font-mono">
                                        100% Karya Anak Bangsa
                                    </span>
                                </div>

                                {/* Bottom Floating Glass Card */}
                                <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-white/95 border border-white/90 shadow-lg rounded-xl p-3.5 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-10 h-10 rounded-xl bg-[#EBF2FE] text-[#1E60D5] flex items-center justify-center shrink-0">
                                            <Hospital className="w-5 h-5 text-[#1E60D5]" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-800">
                                                Liva Health Intelligence Platform
                                            </div>
                                            <div className="text-[10.5px] text-slate-500 font-mono">
                                                ISO 27001 Certified • Permenkes No. 24/2022
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                        Aktif
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );

    const renderStats = () => (
        <section key="stats" className="w-full bg-white border-b border-slate-200/80 py-8 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    <div className="space-y-1">
                        <div className="text-2xl sm:text-3xl font-black text-[#1E60D5] font-display tabular-nums">
                            {getSetting('about_stat_1_val', '40+')}
                        </div>
                        <div className="text-xs text-slate-600 font-medium">
                            {getSetting('about_stat_1_label', 'Mitra Faskes Aktif Se-Indonesia')}
                        </div>
                    </div>
                    <div className="space-y-1 border-l border-slate-200/80">
                        <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-display tabular-nums">
                            {getSetting('about_stat_2_val', '99.98%')}
                        </div>
                        <div className="text-xs text-slate-600 font-medium">
                            {getSetting('about_stat_2_label', 'SLA Server Cloud Uptime')}
                        </div>
                    </div>
                    <div className="space-y-1 border-l border-slate-200/80">
                        <div className="text-2xl sm:text-3xl font-black text-[#EA580C] font-display tabular-nums">
                            {getSetting('about_stat_3_val', '100%')}
                        </div>
                        <div className="text-xs text-slate-600 font-medium">
                            {getSetting('about_stat_3_label', 'SATUSEHAT Native HL7 FHIR')}
                        </div>
                    </div>
                    <div className="space-y-1 border-l border-slate-200/80">
                        <div className="text-2xl sm:text-3xl font-black text-slate-800 font-display tabular-nums">
                            {getSetting('about_stat_4_val', '< 0.3%')}
                        </div>
                        <div className="text-xs text-slate-600 font-medium">
                            {getSetting('about_stat_4_label', 'Dispute Rate Klaim BPJS')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    const renderVisiMisi = () => (
        <section key="visi_misi" className={`${pyDensity} bg-white relative overflow-hidden`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] border border-[#C5DCFE] text-[#1E60D5] text-xs font-mono font-bold shadow-2xs">
                        <Target className="w-3.5 h-3.5 text-[#F97316]" />
                        <span>ARAH STRATEGIS &amp; KOMITMEN</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                        Visi &amp; Misi Memajukan Faskes Nusantara
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
                        Komitmen jangka panjang kami untuk menghadirkan teknologi yang membebaskan tenaga medis dari kerumitan administratif agar dapat fokus penuh pada keselamatan pasien.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Visi Box */}
                    <div className={`lg:col-span-5 bg-gradient-to-br from-blue-50/70 via-white to-blue-50/30 border border-blue-200/90 ${cardRadius} p-6 sm:p-8 space-y-5 shadow-sm relative overflow-hidden flex flex-col justify-between`}>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-[#1E60D5] text-white flex items-center justify-center shadow-md shadow-blue-600/25">
                                <Target className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E60D5] block">
                                VISI PERUSAHAAN
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display leading-snug">
                                {getSetting('about_visi_title', 'Menjadi Standar Emas Arsitektur Digital Rumah Sakit di Indonesia & Asia Tenggara.')}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {getSetting('about_visi_desc', 'Mewujudkan ekosistem kesehatan digital di mana setiap data rekam medis terhubung mulus, dokter bekerja tanpa beban birokrasi berlebih, dan manajemen rumah sakit memiliki kepastian finansial berbasis data analitik real-time.')}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-blue-100 flex items-center gap-2 text-xs font-mono text-[#1E60D5] font-semibold">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Standar Akreditasi KARS STARKES &amp; Kemenkes</span>
                        </div>
                    </div>

                    {/* Misi Box */}
                    <div className={`lg:col-span-7 card-clinical p-6 sm:p-8 space-y-5 flex flex-col justify-between ${cardRadius}`}>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-[#F97316] text-white flex items-center justify-center shadow-md shadow-orange-500/25">
                                <Award className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#EA580C] block">
                                MISI UTAMA KAMI
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display">
                                4 Komitmen Nyata Transformasi Faskes
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1.5">
                                    <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#1E60D5] shrink-0" />
                                        <span>RME Cepat &amp; Intuitif</span>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed text-[11.5px]">
                                        Menyediakan SOAP digital dengan auto-complete ICD-10 yang memangkas waktu entri nakes &lt; 2.4 menit.
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1.5">
                                    <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                        <span>Klaim BPJS Anti-Dispute</span>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed text-[11.5px]">
                                        Engine auto-grouping INA-CBGs dan pre-validasi berkas untuk memastikan dispute rate &lt; 0.3%.
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1.5">
                                    <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                                        <span>Infrastruktur Cloud SLA 99.98%</span>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed text-[11.5px]">
                                        Arsitektur multi-availability zone dengan enkripsi AES-256 dan kepatuhan penuh UU Perlindungan Data Pribadi.
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1.5">
                                    <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                                        <span>Pendampingan On-Site</span>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed text-[11.5px]">
                                        Gladi bersih go-live dan pendampingan akreditasi STARKES oleh tim implementor bersertifikat.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                            <span>⚡ Standar Pelayanan Berbasis Pasien</span>
                            <span className="text-[#1E60D5] font-semibold">ISO 27001 Certified</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    const renderValues = () => (
        <section key="values" className={`${pyDensity} bg-gradient-to-b from-[#F8FAFC] via-[#EEF5FF] to-white relative overflow-hidden border-t border-slate-200/80`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] border border-[#C5DCFE] text-[#1E60D5] text-xs font-mono font-bold shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                        <span>FILOSOFI &amp; NILAI DASAR</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                        4 Pilar Nilai yang Memandu Setiap Baris Kode Kami
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
                        Arsitektur kami dibangun dengan standar rekayasa tertinggi untuk menjawab tantangan nyata di ruang gawat darurat, poliklinik, instalasi farmasi, dan manajemen rumah sakit.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
                    {coreValues.map((val, idx) => {
                        const Icon = val.icon;
                        const isPrimary = (idx === 0 || idx === 3);
                        const colSpan = isPrimary ? 'col-span-12 lg:col-span-7' : 'col-span-12 lg:col-span-5';

                        return (
                            <div 
                                key={idx} 
                                className={`${colSpan} relative overflow-hidden p-1.5 sm:p-2 rounded-[2rem] transition-all duration-300 group ${
                                    idx === 0
                                        ? 'bg-gradient-to-br from-blue-100/90 via-slate-100/80 to-blue-50/50 border border-blue-200/90 shadow-sm hover:border-blue-400'
                                        : idx === 1
                                            ? 'bg-gradient-to-br from-emerald-100/80 via-slate-100/70 to-emerald-50/40 border border-emerald-200/80 shadow-sm hover:border-emerald-400'
                                            : idx === 2
                                                ? 'bg-gradient-to-br from-indigo-100/80 via-slate-100/70 to-indigo-50/40 border border-indigo-200/80 shadow-sm hover:border-indigo-400'
                                                : 'bg-gradient-to-br from-amber-100/80 via-slate-100/70 to-amber-50/40 border border-amber-200/80 shadow-sm hover:border-amber-400'
                                }`}
                            >
                                <div className="p-6 sm:p-7 rounded-[calc(2rem-0.375rem)] bg-white h-full flex flex-col justify-between space-y-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] relative overflow-hidden">
                                    {isPrimary && (
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_0%,rgba(30,96,213,0.08)_0%,transparent_70%)] pointer-events-none" />
                                    )}

                                    <div className="space-y-4 relative z-10">
                                        <div className="flex items-center justify-between">
                                            <div className={`w-12 h-12 rounded-xl ${val.bg} flex items-center justify-center ${val.color} group-hover:scale-105 transition-transform shadow-xs`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-[10.5px] font-mono font-bold text-slate-600 uppercase px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
                                                {val.tag}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className={`font-bold text-[#0F172A] font-display leading-snug group-hover:text-[#1E60D5] transition-colors ${
                                                isPrimary ? 'text-lg sm:text-xl lg:text-2xl' : 'text-base sm:text-lg'
                                            }`}>
                                                {val.title}
                                            </h3>
                                            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                                                {val.desc}
                                            </p>
                                        </div>

                                        {idx === 0 && (
                                            <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono">
                                                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#1E60D5] border border-blue-200 font-semibold">
                                                    ISO 27001 Certified
                                                </span>
                                                <span className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200">
                                                    UU PDP Kemenkominfo
                                                </span>
                                            </div>
                                        )}

                                        {idx === 3 && (
                                            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between text-xs text-amber-950 font-mono">
                                                <span>⚡ Pendampingan On-Site &amp; Gladi Bersih</span>
                                                <span className="text-amber-800 font-bold">100% Terkawal</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono relative z-10">
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                            <span className="text-slate-700 font-medium">Standar Keunggulan Liva</span>
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

    const renderLeadership = () => (
        <section key="leadership" className={`${pyDensity} bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] relative overflow-hidden border-t border-slate-200/80`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] border border-[#C5DCFE] text-[#1E60D5] text-xs font-mono font-bold shadow-2xs">
                        <Users className="w-3.5 h-3.5 text-[#1E60D5]" />
                        <span>DEWAN EKSEKUTIF &amp; PAKAR MEDIS</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                        Dipimpin Praktisi Klinis &amp; Arsitek Teknologi Berpengalaman
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
                        Kombinasi dokter spesialis, konsultan akreditasi rumah sakit, dan insinyur piranti lunak berstandar global.
                    </p>
                </div>

                {/* Bento Grid Leadership Cards */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
                    {leadership.map((person, idx) => {
                        const colSpan = 'col-span-12 lg:col-span-6';

                        return (
                            <div 
                                key={idx} 
                                className={`${colSpan} p-1.5 sm:p-2 rounded-[2rem] transition-all duration-300 group ${
                                    idx === 0
                                        ? 'bg-gradient-to-br from-blue-100/90 via-slate-100/80 to-blue-50/50 border border-blue-200/90 shadow-xs hover:border-blue-400'
                                        : idx === 1
                                            ? 'bg-gradient-to-br from-indigo-100/80 via-slate-100/70 to-indigo-50/40 border border-indigo-200/80 shadow-xs hover:border-indigo-400'
                                            : 'bg-slate-100/80 hover:bg-slate-200/60 border border-slate-200/90 shadow-2xs hover:border-slate-300'
                                }`}
                            >
                                <div className="p-5 sm:p-6 rounded-[calc(2rem-0.375rem)] bg-white h-full flex flex-col sm:flex-row gap-5 items-start justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                                    {/* Portrait Photo Frame */}
                                    <div className="w-full sm:w-44 aspect-square sm:aspect-auto sm:h-52 rounded-2xl overflow-hidden shrink-0 relative bg-slate-100 border border-slate-200/80">
                                        <img 
                                            src={person.photo} 
                                            alt={person.name} 
                                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold text-[#1E60D5] border border-white/80 shadow-2xs">
                                            {person.cert}
                                        </div>
                                    </div>

                                    {/* Bio & Details */}
                                    <div className="flex-1 flex flex-col justify-between h-full space-y-3 min-w-0">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-mono uppercase font-bold text-slate-500">
                                                    Dewan Eksekutif Liva
                                                </span>
                                                <span className="flex items-center gap-1 text-[10.5px] text-emerald-700 font-semibold font-mono bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                                    <Check className="w-3 h-3" />
                                                    Verified
                                                </span>
                                            </div>

                                            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-display group-hover:text-[#1E60D5] transition-colors leading-snug">
                                                {person.name}
                                            </h3>
                                            <div className="text-xs font-bold text-[#1E60D5]">
                                                {person.role}
                                            </div>
                                            <div className="text-[11px] text-slate-500 font-mono">
                                                {person.sub}
                                            </div>

                                            <p className="text-xs text-slate-600 leading-relaxed pt-1 line-clamp-3 sm:line-clamp-4">
                                                {person.bio}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                                            <span>Pakar SIMRS &amp; Kesehatan</span>
                                            <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#1E60D5] group-hover:text-white flex items-center justify-center transition-all">
                                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                            </div>
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

    const renderCta = () => (
        <section key="cta" className={`${pyDensity} bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] relative overflow-hidden border-t border-slate-200/80`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className={`bg-white ${cardRadius} border border-blue-200/80 shadow-xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6`}>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] border border-[#C5DCFE] text-[#1E60D5] text-xs font-mono font-bold shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5 text-[#F97316] animate-spin" />
                        <span>KEMITRAAN STRATEGIS FASKES</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                        Siap Mentransformasi Rumah Sakit Anda Bersama Tim Ahli Kami?
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Jadwalkan audiensi dan live demo modul Liva SIMRS langsung bersama tim dokter dan konsultan arsitektur kami, baik secara daring maupun on-site di rumah sakit Anda.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                            onClick={() => openDemoModal('Presentasi Direksi Tentang Kami')}
                            className="px-6 py-3 rounded-xl bg-[#1E60D5] hover:bg-[#164DB0] text-white font-bold text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 cursor-pointer btn-spring shadow-lg shadow-blue-600/20 focus-ring"
                        >
                            <span>Jadwalkan Live Demo / Paparan Direksi</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onNavigate && onNavigate('modul-simrs')}
                            className="px-5 py-3 rounded-xl bg-white border border-slate-200/90 hover:border-blue-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all shadow-2xs cursor-pointer btn-spring focus-ring"
                        >
                            <span>Jelajahi 36 Modul SIMRS</span>
                        </button>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                            <CheckCircle2 className="w-4 h-4" />
                            Konsultasi &amp; Paparan Awal Gratis
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 text-[#1E60D5] font-semibold">
                            <ShieldCheck className="w-4 h-4" />
                            Didukung NDA &amp; Kerahasiaan Medis
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );

    const sectionRenderers = {
        hero: renderHero,
        stats: renderStats,
        visi_misi: renderVisiMisi,
        values: renderValues,
        leadership: renderLeadership,
        cta: renderCta,
    };

    return (
        <div className={`space-y-0 relative overflow-hidden ${themeClass} font-sans transition-colors duration-300`}>
            {orderedKeys.map((key) => {
                const renderer = sectionRenderers[key];
                if (!renderer) return null;
                if (key === 'hero') return renderer();
                return (
                    <SectionWrapper key={key} pageId="tentang-kami" secId={key} showContainer={false}>
                        {renderer()}
                    </SectionWrapper>
                );
            })}
        </div>
    );
}
