import React, { useState } from 'react';
import { 
    LayoutDashboard, 
    Stethoscope, 
    Pill, 
    FileSpreadsheet, 
    CheckCircle2, 
    Sparkles, 
    TrendingUp, 
    ShieldCheck, 
    Clock, 
    Users, 
    ArrowRight, 
    Lock, 
    Zap, 
    Activity,
    QrCode,
    Check,
    AlertCircle,
    Eye,
    Cpu,
    Server
} from 'lucide-react';

export default function ProductCockpitShowcase({ onScheduleDemo }) {
    const [activeTab, setActiveTab] = useState('executive');

    const tabs = [
        {
            id: 'executive',
            label: 'Cockpit Direktur RS',
            badge: 'Executive View',
            icon: LayoutDashboard,
            headline: 'Pemantauan Kinerja Finansial & Klinis Real-Time',
            subheadline: 'Dashboard eksekutif terintegrasi memberikan visibilitas penuh terhadap Bed Occupancy Rate (BOR), arus kas klaim BPJS, kepuasan pasien, dan efisiensi operasional seluruh instalasi rumah sakit.',
            photo: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=85',
            photoAlt: 'Dashboard Eksekutif Direktur Rumah Sakit dan Pemantauan Klinis Real-Time Liva SIMRS',
            photoTag: 'Executive Clinical Intelligence Hub',
            floatingPill: 'BOR 84.2% • Optimal STARKES',
            liveStatus: 'SATUSEHAT FHIR R4 SYNC',
            latency: 'Latensi 128ms',
            metrics: [
                {
                    label: 'Bed Occupancy (BOR)',
                    val: '84.2%',
                    sub: 'Optimal STARKES (75-85%)',
                    color: 'text-[#2F8BFF]',
                    trend: '+2.4% vs bln lalu'
                },
                {
                    label: 'Klaim BPJS Lolos',
                    val: '99.7%',
                    sub: 'Dispute Rate < 0.3%',
                    color: 'text-emerald-600',
                    trend: '99.9% Berhasil Terverifikasi'
                },
                {
                    label: 'Rata-Rata Waktu Tunggu',
                    val: '12.4 Mnt',
                    sub: 'Turun 68% vs Manual',
                    color: 'text-[#FF8A2B]',
                    trend: 'SOP Pelayanan Prima'
                },
                {
                    label: 'Uptime Cloud Server',
                    val: '99.98%',
                    sub: 'High Availability SLA',
                    color: 'text-slate-900',
                    trend: 'Multi-AZ Tier-3 Data Center'
                }
            ],
            highlights: [
                'Visibilitas pendapatan harian, bulanan, dan proyeksi klaim INA-CBGs',
                'Pemantauan utilisasi tempat tidur rawat inap (VIP, Kelas 1, 2, 3, ICU)',
                'Notifikasi otomatis lonjakan antrean poli dan waktu tunggu farmasi',
                'Laporan kinerja dokter dan utilisasi fasilitas medis berbasis data akurat'
            ]
        },
        {
            id: 'rme',
            label: 'RME & SOAP Terpadu',
            badge: 'Dokter & Perawat',
            icon: Stethoscope,
            headline: 'Rekam Medis Cepat (< 2.4 Menit) Sesuai Permenkes No. 24/2022',
            subheadline: 'Pengisian SOAP klinis terpadu dengan kamus ICD-10 Kemenkes, kalkulator dosis, Early Warning System (EWS), e-resep langsung terhubung ke apotek, dan validasi TTE BSrE tersertifikasi.',
            photo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85',
            photoAlt: 'Dokter menggunakan Rekam Medis Elektronik Terpadu RME SOAP Liva SIMRS pada Tablet Medis',
            photoTag: 'Digital Clinical Consultation & SOAP Flow',
            floatingPill: 'TTE BSrE Terverifikasi Sah Hukum',
            liveStatus: 'SATUSEHAT ENCOUNTER SYNC',
            latency: 'Response < 1.8s',
            metrics: [
                {
                    label: 'Kecepatan Input SOAP',
                    val: '1.8 Mnt',
                    sub: 'Template Spesialisasi Khusus',
                    color: 'text-[#2F8BFF]',
                    trend: 'Pangkas 70% Waktu Menulis'
                },
                {
                    label: 'Kepatuhan Permenkes 24',
                    val: '100%',
                    sub: 'Audit Trail Lengkap',
                    color: 'text-emerald-600',
                    trend: 'Standar Akreditasi STARKES'
                },
                {
                    label: 'Peringatan Dini EWS',
                    val: 'Otomatis',
                    sub: 'Skor Vital Pasien Real-Time',
                    color: 'text-[#FF8A2B]',
                    trend: 'Proaktif Cegah Deteriorasi'
                },
                {
                    label: 'Validitas TTE BSrE',
                    val: 'Sah Hukum',
                    sub: 'Sertifikat Elektronik BSrE',
                    color: 'text-slate-900',
                    trend: 'Anti-Pemalsuan Dokumen'
                }
            ],
            highlights: [
                'Kamus diagnosis ICD-10 & ICD-9-CM resmi Kemenkes dengan auto-complete pintar',
                'Integrasi riwayat alergi pasien dan peringatan kontraindikasi otomatis',
                'E-Resep sekali klik langsung terkirim ke antrean dispensing farmasi',
                'Sinkronisasi riwayat kunjungan lintas instalasi (IGD, Rawat Jalan, Rawat Inap)'
            ]
        },
        {
            id: 'pharmacy',
            label: 'Smart Farmasi & E-Resep',
            badge: 'Instalasi Farmasi',
            icon: Pill,
            headline: 'Dispensing Obat Terkendali & Kontrol FIFO/FEFO Otomatis',
            subheadline: 'E-Resep langsung masuk antrean peracikan farmasi tanpa perantara kertas. Dilengkapi sistem peringatan kadaluarsa FEFO, kontrol stok batch, dan verifikasi interaksi obat real-time.',
            photo: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1600&q=85',
            photoAlt: 'Instalasi Farmasi Rumah Sakit dengan Sistem Smart E-Resep dan Kontrol Stok Otomatis Liva SIMRS',
            photoTag: 'Automated Pharmacy Dispensing & Inventory Control',
            floatingPill: '0 Resep Duplikat • Kontrol Stok FEFO',
            liveStatus: 'KEMENKES FORMULARIUM VALID',
            latency: 'Dispensing -62% Lebih Cepat',
            metrics: [
                {
                    label: 'Kecepatan Dispensing',
                    val: '4.2 Mnt',
                    sub: 'Dari input hingga penyerahan',
                    color: 'text-[#2F8BFF]',
                    trend: 'Antrean Apotek Lancar'
                },
                {
                    label: 'Akurasi Stok Obat',
                    val: '99.9%',
                    sub: 'Sistem Batch & Expired Date',
                    color: 'text-emerald-600',
                    trend: 'Nol Selisih Stok Opname'
                },
                {
                    label: 'Deteksi Alergi Obat',
                    val: '100% Aman',
                    sub: 'Screening otomatis 3 lapis',
                    color: 'text-[#FF8A2B]',
                    trend: 'Cegah Medication Error'
                },
                {
                    label: 'Integrasi e-Katalog',
                    val: 'Terkoneksi',
                    sub: 'Monitoring batas minimum obat',
                    color: 'text-slate-900',
                    trend: 'Auto PO Pengadaan'
                }
            ],
            highlights: [
                'Penerimaan resep digital langsung dari meja dokter tanpa re-entry manual',
                'Label etiket dan aturan pakai obat ter-generate otomatis dengan barcode QR',
                'Manajemen stok otomatis dengan metode FIFO (First In First Out) & FEFO',
                'Notifikasi otomatis saat stok mendekati batas minimum reorder point'
            ]
        },
        {
            id: 'casemix',
            label: 'Casemix & Klaim BPJS',
            badge: 'Auto-Grouping INA-CBGs',
            icon: FileSpreadsheet,
            headline: 'Pre-Validasi Koding Klaim & Nol Dispute Rate BPJS',
            subheadline: 'Engine koding cerdas mencocokkan diagnosa ICD-10 dan tindakan ICD-9-CM dengan tarif INA-CBGs sebelum bridging ke VClaim 2.0 untuk memastikan klaim cair 100% tepat waktu.',
            photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85',
            photoAlt: 'Tim Casemix dan Rekam Medis melakukan Grouping INA-CBGs dan Bridging BPJS VClaim Liva SIMRS',
            photoTag: 'Intelligent Casemix & BPJS VClaim 2.0 Engine',
            floatingPill: 'Dispute Rate < 0.3% • Klaim Aman',
            liveStatus: 'BPJS VCLAIM 2.0 BRIDGED',
            latency: 'Auto-Grouping Instant',
            metrics: [
                {
                    label: 'Tingkat Kelolosan Klaim',
                    val: '99.7%',
                    sub: 'Pre-audit sebelum kirim',
                    color: 'text-[#2F8BFF]',
                    trend: 'Klaim Anti-Pending'
                },
                {
                    label: 'Waktu Pengajuan Klaim',
                    val: '3x Cepat',
                    sub: 'Auto-bundling berkas digital',
                    color: 'text-emerald-600',
                    trend: 'Arus Kas RS Terjaga'
                },
                {
                    label: 'Kesesuaian Tarif CBGs',
                    val: 'Optimal',
                    sub: 'Simulasi biaya vs tarif INA-CBG',
                    color: 'text-[#FF8A2B]',
                    trend: 'Cegah Unnecessary Loss'
                },
                {
                    label: 'Bridging BPJS VClaim',
                    val: 'Native',
                    sub: 'SEP & LPK Terbit Otomatis',
                    color: 'text-slate-900',
                    trend: 'Resmi Terdaftar BPJS Kesehatan'
                }
            ],
            highlights: [
                'Pengecekan kelengkapan berkas resume medis, lembar operasi, & hasil lab otomatis',
                'Pemberian saran kode INA-CBGs paling tepat sesuai kaidah koding Kemenkes',
                'Penerbitan SEP (Surat Eligibilitas Peserta) dan Surat Rujukan online tanpa kendala',
                'Monitoring status verifikasi dan berita acara klaim BPJS secara transparan'
            ]
        }
    ];

    const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

    return (
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#EEF5FF] via-[#F8FAFC] to-white relative overflow-hidden">
            {/* Top Smooth White Blur Boundary */}
            <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

            {/* Bottom Smooth White Blur Boundary */}
            <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

            {/* Subtle Hospital Architectural Image Mask Overlay */}
            <div 
                className="absolute top-0 right-0 w-full sm:w-1/2 h-full pointer-events-none z-0 opacity-10 bg-cover bg-no-repeat bg-right-top mix-blend-multiply"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80')`,
                    maskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)'
                }}
            />

            {/* Top-Left Blue Accent Angle */}
            <svg 
                className="absolute top-0 left-0 w-48 sm:w-72 h-32 sm:h-44 pointer-events-none z-0 opacity-80" 
                viewBox="0 0 280 160" 
                fill="none" 
                preserveAspectRatio="none"
            >
                <path d="M0 0 L180 0 L0 120 Z" fill="#2F8BFF" opacity="0.12" />
                <path d="M0 0 L120 0 L0 80 Z" fill="#5BC0FF" opacity="0.2" />
            </svg>

            {/* Bottom-Right Orange Dynamic Curve Accent */}
            <svg 
                className="absolute bottom-0 right-0 w-64 sm:w-96 h-32 sm:h-48 pointer-events-none z-0" 
                viewBox="0 0 400 180" 
                fill="none" 
                preserveAspectRatio="none"
            >
                <path 
                    d="M400 180 L400 40 C300 70 200 130 120 180 Z" 
                    fill="url(#cockpit-orange-grad)" 
                    opacity="0.85"
                />
                <defs>
                    <linearGradient id="cockpit-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFB266" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#FF8A2B" stopOpacity="0.6" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Dot Matrix Grid Accent */}
            <div className="absolute top-12 right-12 hidden lg:grid grid-cols-8 gap-2.5 pointer-events-none opacity-30 z-0">
                {Array.from({ length: 32 }).map((_, i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#2F8BFF]"></span>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[#2F8BFF] text-xs font-mono font-bold shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5 text-[#FF8A2B] animate-spin" />
                        <span>LIVE PRODUCT EXPERIENCE &amp; WORKFLOW</span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight font-display">
                        Eksplorasi Antarmuka Klinis &amp; Operasional Liva SIMRS
                    </h2>
                    
                    <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Lihat bagaimana arsitektur Liva SIMRS dirancang dengan standar UX kelas dunia untuk mempercepat pelayanan dokter, mempermudah farmasi, dan mengamankan klaim faskes.
                    </p>
                </div>

                {/* Tab Navigator */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer btn-spring ${
                                    isActive
                                        ? 'bg-[#2F8BFF] text-white border-[#2F8BFF] shadow-lg shadow-blue-500/25 scale-105'
                                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50 shadow-2xs'
                                }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                <span className="font-medium">{tab.label}</span>
                                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                                    isActive ? 'bg-white/20 text-white' : 'bg-[#FFF0E6] text-[#FF8A2B] border border-[#FFD8BF]'
                                }`}>
                                    {tab.badge}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Main Showcase Showcase Window (Luminous Theme with Real Photo & Floating HUD) */}
                <div className="bg-white/95 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl shadow-blue-500/10 overflow-hidden text-slate-800 space-y-0 transition-all duration-300">
                    {/* Top macOS-style Luminous Status Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-7 py-3.5 bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border-b border-slate-200/80">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                            </div>
                            <span className="font-mono text-xs text-slate-700 pl-2 border-l border-slate-300 font-bold">
                                Liva Medical OS • {currentTab.label}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 font-mono text-[11px]">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                {currentTab.liveStatus}
                            </span>
                            <span className="text-slate-400 hidden sm:inline">|</span>
                            <span className="text-slate-600 font-semibold">{currentTab.latency}</span>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 sm:p-8 space-y-8">
                        {/* Headline & Subheadline */}
                        <div className="space-y-1.5">
                            <h3 className="text-lg sm:text-2xl font-extrabold font-display text-[#1F2937] tracking-tight">
                                {currentTab.headline}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-4xl leading-relaxed">
                                {currentTab.subheadline}
                            </p>
                        </div>

                        {/* Interactive Photo Showcase + Telemetry Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                            {/* Left: High-Impact Clinical Photo Frame with Floating Glass Badges */}
                            <div className="lg:col-span-7 relative group">
                                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 aspect-16/10">
                                    <img 
                                        src={currentTab.photo} 
                                        alt={currentTab.photoAlt}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                                        loading="lazy"
                                    />
                                    {/* Soft Medical Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/15 to-transparent pointer-events-none" />

                                    {/* Top-Left Floating Badge */}
                                    <div className="absolute top-3.5 left-3.5 backdrop-blur-md bg-white/90 border border-white/80 shadow-md px-3 py-1.5 rounded-xl flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#2F8BFF] animate-ping"></div>
                                        <span className="text-[11px] font-bold text-slate-800 font-mono tracking-tight">
                                            {currentTab.photoTag}
                                        </span>
                                    </div>

                                    {/* Bottom Floating Glass Telemetry Card */}
                                    <div className="absolute bottom-3.5 left-3.5 right-3.5 backdrop-blur-md bg-white/95 border border-white/90 shadow-lg rounded-xl p-3 sm:p-4 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-9 h-9 rounded-lg bg-[#EBF4FF] text-[#2F8BFF] flex items-center justify-center shrink-0">
                                                <Activity className="w-5 h-5 text-[#2F8BFF]" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-slate-800">
                                                    {currentTab.floatingPill}
                                                </div>
                                                <div className="text-[10.5px] text-slate-500 font-mono">
                                                    Terintegrasi Database Terpusat Liva SIMRS
                                                </div>
                                            </div>
                                        </div>

                                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                            Verified
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: 4 Luminous Metric Cards & Key Feature Highlights */}
                            <div className="lg:col-span-5 space-y-5">
                                {/* Metric Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    {currentTab.metrics.map((metric, idx) => (
                                        <div 
                                            key={idx} 
                                            className="bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border border-slate-200/90 rounded-xl p-3.5 space-y-1 hover:border-blue-400/80 hover:shadow-md transition-all"
                                        >
                                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold block truncate">
                                                {metric.label}
                                            </span>
                                            <div className={`text-xl sm:text-2xl font-black font-display ${metric.color}`}>
                                                {metric.val}
                                            </div>
                                            <div className="text-[10px] text-slate-600 font-medium leading-tight">
                                                {metric.sub}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Highlight Points */}
                                <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-4 space-y-2.5">
                                    <div className="text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#2F8BFF]" />
                                        <span>Keunggulan Utama Alur Ini:</span>
                                    </div>
                                    <ul className="space-y-1.5 text-xs text-slate-600">
                                        {currentTab.highlights.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-[#FF8A2B] font-bold mt-0.5">•</span>
                                                <span className="leading-snug">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Footer Bar */}
                    <div className="px-5 sm:px-8 py-4 bg-gradient-to-r from-blue-50/50 via-slate-50 to-orange-50/40 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
                            <Zap className="w-4 h-4 text-[#FF8A2B] shrink-0" />
                            <span>Cloud SLA 99.98% • Enkripsi AES-256 • ISO 27001 Certified</span>
                        </div>
                        <button
                            onClick={() => onScheduleDemo && onScheduleDemo(currentTab.label)}
                            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#2F8BFF] hover:bg-[#1E75E6] text-white font-bold text-xs transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer btn-spring shadow-md shadow-blue-500/20"
                        >
                            <span>Jadwalkan Live Demo Modul Ini</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
