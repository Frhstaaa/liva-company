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
    BadgeCheck
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export default function TentangKamiPage({ onNavigate }) {
    const { openDemoModal, openAssessmentModal } = useSite();

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
            color: 'text-[#2F8BFF]',
            bg: 'bg-blue-50/80',
            border: 'border-blue-200'
        },
        {
            title: 'Zero-Compromise Security',
            tag: 'Keamanan Setara Perbankan',
            desc: 'Enkripsi data medis AES-256 saat transmisi dan penyimpanan, kepatuhan UU PDP No. 27/2022, serta audit log digital BSrE sah hukum.',
            icon: Lock,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50/80',
            border: 'border-emerald-200'
        },
        {
            title: 'Native Interoperability',
            tag: 'Integrasi Ekosistem Nasional',
            desc: 'Kompatibilitas bawaan dengan SATUSEHAT FHIR R4 Kemenkes, BPJS VClaim 2.0, Mobile JKN, Antrean Faskes, dan LIS/PACS tanpa biaya perantara.',
            icon: Globe2,
            color: 'text-[#FF8A2B]',
            bg: 'bg-orange-50/80',
            border: 'border-orange-200'
        },
        {
            title: 'Human-Centric Partnership',
            tag: 'Pendampingan On-Site 24/7',
            desc: 'Kami tidak sekadar menjual lisensi, tetapi mendampingi rumah sakit Anda melalui pelatihan langsung, gladi bersih akreditasi, dan SLA dukungan teknis 99.98%.',
            icon: HeartHandshake,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50/80',
            border: 'border-indigo-200'
        }
    ];

    return (
        <div className="space-y-0 relative overflow-hidden bg-white text-slate-800">
            {/* ========================================================================= */}
            {/* 1. HERO SECTION: TENTANG KAMI */}
            {/* ========================================================================= */}
            <section className="py-20 sm:py-28 bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] relative overflow-hidden">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Subtle Hospital Architectural Background */}
                <div 
                    className="absolute top-0 right-0 w-full sm:w-1/2 h-full pointer-events-none z-0 opacity-10 bg-cover bg-no-repeat bg-right-top mix-blend-multiply"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80')`,
                        maskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)'
                    }}
                />

                {/* Decorative Top-Left Blue Wedge */}
                <svg 
                    className="absolute top-0 left-0 w-48 sm:w-72 h-32 sm:h-44 pointer-events-none z-0 opacity-80" 
                    viewBox="0 0 280 160" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M0 0 L180 0 L0 120 Z" fill="#2F8BFF" opacity="0.12" />
                    <path d="M0 0 L120 0 L0 80 Z" fill="#5BC0FF" opacity="0.2" />
                </svg>

                {/* Decorative Bottom-Right Warm Orange Sweep */}
                <svg 
                    className="absolute bottom-0 right-0 w-64 sm:w-96 h-32 sm:h-48 pointer-events-none z-0" 
                    viewBox="0 0 400 180" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path 
                        d="M400 180 L400 40 C300 70 200 130 120 180 Z" 
                        fill="url(#about-orange-grad)" 
                        opacity="0.85"
                    />
                    <defs>
                        <linearGradient id="about-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFB266" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#FF8A2B" stopOpacity="0.6" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Left Hero Narrative */}
                        <div className="lg:col-span-7 space-y-5 text-left">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[#2F8BFF] text-xs font-mono font-bold shadow-2xs">
                                <Sparkles className="w-3.5 h-3.5 text-[#FF8A2B] animate-spin" />
                                <span>PROFIL PERUSAHAAN &amp; VISI KESEHATAN DIGITAL</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2937] tracking-tight font-display leading-[1.15]">
                                Membangun Fondasi Digital Rumah Sakit Indonesia yang <span className="text-[#2F8BFF]">Modern</span>, <span className="text-[#FF8A2B]">Andal</span>, dan Humanis.
                            </h1>

                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                                <strong>Liva SIMRS</strong> adalah pengembang platform teknologi informasi kesehatan terkemuka di Indonesia yang mengintegrasikan Rekam Medis Elektronik (RME) Permenkes No. 24/2022, Bridging BPJS VClaim 2.0, SATUSEHAT Kemenkes, dan otomasi manajemen operasional rumah sakit dalam satu ekosistem terpadu berkeamanan tinggi.
                            </p>

                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <button
                                    onClick={() => openDemoModal('Presentasi Direksi & Tentang Kami')}
                                    className="px-6 py-3 rounded-xl bg-[#2F8BFF] hover:bg-[#1E75E6] text-white font-bold text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 cursor-pointer btn-spring shadow-lg shadow-blue-500/20"
                                >
                                    <span>Jadwalkan Presentasi Direksi</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => openAssessmentModal()}
                                    className="px-5 py-3 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
                                >
                                    <Sparkles className="w-4 h-4 text-[#FF8A2B]" />
                                    <span>Uji Kesiapan Digital Faskes</span>
                                </button>
                            </div>

                            {/* Trust Pill Strip */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/80 font-sans">
                                <div className="space-y-0.5">
                                    <div className="text-xl font-black text-[#2F8BFF] font-display">40+</div>
                                    <div className="text-[11px] text-slate-500">Mitra Faskes Aktif</div>
                                </div>
                                <div className="space-y-0.5">
                                    <div className="text-xl font-black text-emerald-600 font-display">99.98%</div>
                                    <div className="text-[11px] text-slate-500">SLA Server Uptime</div>
                                </div>
                                <div className="space-y-0.5">
                                    <div className="text-xl font-black text-[#FF8A2B] font-display">100%</div>
                                    <div className="text-[11px] text-slate-500">SATUSEHAT Native</div>
                                </div>
                                <div className="space-y-0.5">
                                    <div className="text-xl font-black text-slate-800 font-display">&lt; 0.3%</div>
                                    <div className="text-[11px] text-slate-500">Dispute Rate BPJS</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Photo Frame */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-100 aspect-4/3 group">
                                <img 
                                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=85" 
                                    alt="Tim Medis dan Tim Digital Health Liva SIMRS Berkolaborasi di Rumah Sakit"
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/15 pointer-events-none" />

                                {/* Top Floating Badge */}
                                <div className="absolute top-4 left-4 backdrop-blur-md bg-white/90 border border-white/80 shadow-md px-3.5 py-1.5 rounded-xl flex items-center gap-2">
                                    <BadgeCheck className="w-4 h-4 text-[#2F8BFF]" />
                                    <span className="text-xs font-bold text-slate-800 font-mono">
                                        100% Karya Anak Bangsa
                                    </span>
                                </div>

                                {/* Bottom Floating Glass Card */}
                                <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-white/95 border border-white/90 shadow-lg rounded-2xl p-3.5 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] text-[#2F8BFF] flex items-center justify-center shrink-0">
                                            <Hospital className="w-5 h-5 text-[#2F8BFF]" />
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
                                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                                        Aktif
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 2. VISI & MISI KAMI */}
            {/* ========================================================================= */}
            <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-[#F8FAFC] via-white to-transparent pointer-events-none z-10 backdrop-blur-[2px]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[#2F8BFF] text-xs font-mono font-bold shadow-2xs">
                            <Target className="w-3.5 h-3.5 text-[#FF8A2B]" />
                            <span>ARAH STRATEGIS &amp; KOMITMEN</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight font-display">
                            Visi &amp; Misi Memajukan Faskes Nusantara
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
                            Komitmen jangka panjang kami untuk menghadirkan teknologi yang membebaskan tenaga medis dari kerumitan administratif agar dapat fokus penuh pada keselamatan pasien.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Visi Box */}
                        <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/70 via-white to-blue-50/30 border border-blue-200/90 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg shadow-blue-500/5 relative overflow-hidden flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#2F8BFF] text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                                    <Target className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2F8BFF] block">
                                    VISI PERUSAHAAN
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] font-display leading-snug">
                                    Menjadi Standar Emas Arsitektur Digital Rumah Sakit di Indonesia &amp; Asia Tenggara.
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    Mewujudkan ekosistem kesehatan digital di mana setiap data rekam medis terhubung mulus, dokter bekerja tanpa beban birokrasi berlebih, dan manajemen rumah sakit memiliki kepastian finansial berbasis data analitik real-time.
                                </p>
                            </div>

                            <div className="pt-4 border-t border-blue-100 flex items-center gap-2 text-xs font-mono text-[#2F8BFF] font-semibold">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Standar Akreditasi KARS STARKES &amp; Kemenkes</span>
                            </div>
                        </div>

                        {/* Misi Box */}
                        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg shadow-slate-900/5 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#FF8A2B] text-white flex items-center justify-center shadow-md shadow-orange-500/30">
                                    <Award className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8A2B] block">
                                    MISI UTAMA KAMI
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] font-display">
                                    4 Komitmen Nyata Transformasi Faskes
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                                        <div className="font-bold text-[#1F2937] flex items-center gap-1.5">
                                            <CheckCircle2 className="w-4 h-4 text-[#2F8BFF] shrink-0" />
                                            <span>RME Cepat &amp; Intuitif</span>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed text-[11.5px]">
                                            Menyediakan SOAP digital dengan auto-complete ICD-10 yang memangkas waktu entri nakes &lt; 2.4 menit.
                                        </p>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                                        <div className="font-bold text-[#1F2937] flex items-center gap-1.5">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                            <span>Klaim BPJS Anti-Dispute</span>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed text-[11.5px]">
                                            Engine auto-grouping INA-CBGs dan pre-validasi berkas untuk memastikan dispute rate &lt; 0.3%.
                                        </p>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                                        <div className="font-bold text-[#1F2937] flex items-center gap-1.5">
                                            <CheckCircle2 className="w-4 h-4 text-[#FF8A2B] shrink-0" />
                                            <span>Infrastruktur Cloud SLA 99.98%</span>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed text-[11.5px]">
                                            Arsitektur multi-availability zone dengan enkripsi AES-256 dan kepatuhan penuh UU Perlindungan Data Pribadi.
                                        </p>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                                        <div className="font-bold text-[#1F2937] flex items-center gap-1.5">
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
                                <span className="text-[#2F8BFF] font-semibold">ISO 27001 Certified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 3. NILAI UTAMA PERUSAHAAN (CORE VALUES) */}
            {/* ========================================================================= */}
            <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F8FAFC] via-[#EEF5FF] to-white relative overflow-hidden">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[#2F8BFF] text-xs font-mono font-bold shadow-2xs">
                            <Sparkles className="w-3.5 h-3.5 text-[#FF8A2B]" />
                            <span>FILOSOFI &amp; NILAI DASAR</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight font-display">
                            4 Pilar Nilai yang Memandu Setiap Baris Kode Kami
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
                            Arsitektur kami dibangun dengan standar rekayasa tertinggi untuk menjawab tantangan nyata di ruang gawat darurat, poliklinik, instalasi farmasi, dan manajemen rumah sakit.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreValues.map((val, idx) => {
                            const Icon = val.icon;
                            return (
                                <div 
                                    key={idx} 
                                    className={`bg-white border ${val.border} rounded-2xl p-5 sm:p-6 space-y-4 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1`}
                                >
                                    <div className={`w-12 h-12 rounded-xl ${val.bg} flex items-center justify-center ${val.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase">
                                            {val.tag}
                                        </span>
                                        <h3 className="text-base sm:text-lg font-bold text-[#1F2937] font-display">
                                            {val.title}
                                        </h3>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        {val.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 4. PERJALANAN INOVASI & MILESTONES */}
            {/* ========================================================================= */}
            <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[#2F8BFF] text-xs font-mono font-bold shadow-2xs">
                            <Clock className="w-3.5 h-3.5 text-[#2F8BFF]" />
                            <span>REKAM JEJAK &amp; MILESTONE</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight font-display">
                            Perjalanan Dedikasi Inovasi Kesehatan Digital
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
                            Dari riset klinis pertama hingga menjadi tulang punggung digital puluhan rumah sakit di Indonesia.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {milestones.map((m, idx) => (
                            <div 
                                key={idx} 
                                className="bg-gradient-to-b from-slate-50 via-white to-blue-50/30 border border-slate-200/90 rounded-2xl p-5 space-y-3 hover:border-blue-300 hover:shadow-md transition-all relative group"
                            >
                                <div className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-[#2F8BFF] text-white font-mono font-bold text-xs shadow-xs">
                                    {m.year}
                                </div>
                                <h3 className="text-sm font-bold text-[#1F2937] font-display">
                                    {m.title}
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {m.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 5. TIM KEPEMIMPINAN & DEWAN PENASIHAT MEDIS */}
            {/* ========================================================================= */}
            <section className="py-16 sm:py-24 bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] relative overflow-hidden">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[#2F8BFF] text-xs font-mono font-bold shadow-2xs">
                            <Users className="w-3.5 h-3.5 text-[#2F8BFF]" />
                            <span>DEWAN EKSEKUTIF &amp; PAKAR MEDIS</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight font-display">
                            Dipimpin Praktisi Klinis &amp; Arsitek Teknologi Berpengalaman
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
                            Kombinasi dokter spesialis, konsultan akreditasi rumah sakit, dan insinyur piranti lunak berstandar global.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {leadership.map((person, idx) => (
                            <div 
                                key={idx} 
                                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="aspect-4/3 overflow-hidden bg-slate-100 relative">
                                        <img 
                                            src={person.photo} 
                                            alt={person.name} 
                                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono font-bold text-[#2F8BFF] border border-white/80">
                                            {person.cert}
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <div>
                                            <h3 className="text-sm font-bold text-[#1F2937] font-display">
                                                {person.name}
                                            </h3>
                                            <div className="text-xs font-bold text-[#2F8BFF]">
                                                {person.role}
                                            </div>
                                            <div className="text-[11px] text-slate-500 font-mono">
                                                {person.sub}
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed pt-1">
                                            {person.bio}
                                        </p>
                                    </div>
                                </div>
                                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                                    <span className="flex items-center gap-1 text-emerald-600">
                                        <Check className="w-3 h-3" />
                                        Verified Expert
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 6. LEGALITAS, SERTIFIKASI & KEPATUHAN REGULASI */}
            {/* ========================================================================= */}
            <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>LEGALITAS &amp; KEPATUHAN HUKUM LENGKAP</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#1F2937] font-display">
                            Sertifikasi &amp; Standar Industri Terverifikasi
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-1">
                            <div className="font-bold text-xs text-[#1F2937]">PSE Kominfo</div>
                            <div className="text-[10px] text-slate-500 font-mono">Terdaftar Resmi</div>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-1">
                            <div className="font-bold text-xs text-[#1F2937]">ISO 27001:2022</div>
                            <div className="text-[10px] text-emerald-600 font-mono font-semibold">Data Security Cert</div>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-1">
                            <div className="font-bold text-xs text-[#1F2937]">SATUSEHAT FHIR</div>
                            <div className="text-[10px] text-[#2F8BFF] font-mono font-semibold">Kemenkes RI R4</div>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-1">
                            <div className="font-bold text-xs text-[#1F2937]">BPJS VClaim 2.0</div>
                            <div className="text-[10px] text-[#FF8A2B] font-mono font-semibold">Bridging Validated</div>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-1">
                            <div className="font-bold text-xs text-[#1F2937]">TTE BSrE</div>
                            <div className="text-[10px] text-slate-500 font-mono">Sah Hukum Peradilan</div>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-1">
                            <div className="font-bold text-xs text-[#1F2937]">STARKES KARS</div>
                            <div className="text-[10px] text-slate-500 font-mono">Akreditasi Paripurna</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 7. BOTTOM CTA: PRESENTASI DIREKSI & KONSULTASI */}
            {/* ========================================================================= */}
            <section className="py-20 sm:py-24 bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] relative overflow-hidden">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="bg-white/95 rounded-3xl border border-blue-200/90 shadow-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[#2F8BFF] text-xs font-mono font-bold shadow-2xs">
                            <Sparkles className="w-3.5 h-3.5 text-[#FF8A2B] animate-spin" />
                            <span>KEMITRAAN STRATEGIS FASKES</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight font-display">
                            Siap Mentransformasi Rumah Sakit Anda Bersama Tim Ahli Kami?
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Jadwalkan audiensi dan live demo modul Liva SIMRS langsung bersama tim dokter dan konsultan arsitektur kami, baik secara daring maupun on-site di rumah sakit Anda.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <button
                                onClick={() => openDemoModal('Presentasi Direksi Tentang Kami')}
                                className="px-6 py-3 rounded-xl bg-[#2F8BFF] hover:bg-[#1E75E6] text-white font-bold text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 cursor-pointer btn-spring shadow-lg shadow-blue-500/20"
                            >
                                <span>Jadwalkan Live Demo / Paparan Direksi</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onNavigate && onNavigate('modul-simrs')}
                                className="px-5 py-3 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all shadow-2xs cursor-pointer"
                            >
                                <span>Jelajahi 36 Modul SIMRS</span>
                            </button>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-mono">
                            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                                <CheckCircle2 className="w-4 h-4" />
                                Konsultasi &amp; Paparan Awal Gratis
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5 text-[#2F8BFF] font-semibold">
                                <ShieldCheck className="w-4 h-4" />
                                Didukung NDA &amp; Kerahasiaan Medis
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
