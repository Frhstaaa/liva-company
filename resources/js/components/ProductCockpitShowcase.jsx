import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
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
    Activity
} from 'lucide-react';

export default function ProductCockpitShowcase({ onScheduleDemo }) {
    const { getSetting } = useSite();
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
            latency: 'Latensi 114ms',
            metrics: [
                {
                    label: 'Bed Occupancy (BOR)',
                    val: '84.2%',
                    sub: 'Rentang Optimal STARKES (75-85%)',
                    color: 'text-[#1E60D5]',
                    trend: '+2.4% vs bulan lalu'
                },
                {
                    label: 'Klaim BPJS Lolos',
                    val: '99.7%',
                    sub: 'Tingkat Dispute < 0.3%',
                    color: 'text-emerald-600',
                    trend: 'Pre-Audit Otomatis Valid'
                },
                {
                    label: 'Rata-Rata Waktu Tunggu',
                    val: '12.4 Mnt',
                    sub: 'Turun 68% vs Sistem Manual',
                    color: 'text-[#F97316]',
                    trend: 'SOP Pelayanan Terjaga'
                },
                {
                    label: 'Uptime Cloud Server',
                    val: '99.98%',
                    sub: 'High Availability Multi-AZ',
                    color: 'text-slate-900',
                    trend: 'Tier-3 Datacenter SLA'
                }
            ],
            highlights: [
                'Visibilitas pendapatan harian, bulanan, dan proyeksi klaim INA-CBGs real-time',
                'Pemantauan utilisasi tempat tidur rawat inap (VIP, Kelas 1, 2, 3, ICU, NICU)',
                'Notifikasi otomatis lonjakan antrean poli dan hambatan dispensing farmasi',
                'Laporan kinerja dokter spesialis dan utilisasi fasilitas medis berbasis data akurat'
            ]
        },
        {
            id: 'rme',
            label: 'RME & SOAP Dokter',
            badge: 'Dokter & Perawat',
            icon: Stethoscope,
            headline: 'Rekam Medis Cepat (< 2 Menit) Sesuai Permenkes No. 24/2022',
            subheadline: 'Pengisian SOAP klinis terpadu dengan kamus ICD-10 Kemenkes, kalkulator dosis, Early Warning System (EWS), e-resep langsung terhubung ke apotek, dan validasi TTE BSrE tersertifikasi.',
            photo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85',
            photoAlt: 'Dokter menggunakan Rekam Medis Elektronik Terpadu RME SOAP Liva SIMRS pada Tablet Medis',
            photoTag: 'Digital Clinical Consultation & SOAP Flow',
            floatingPill: 'TTE BSrE Terverifikasi Sah Hukum',
            liveStatus: 'SATUSEHAT ENCOUNTER SYNC',
            latency: 'Respons < 1.2s',
            metrics: [
                {
                    label: 'Kecepatan Input SOAP',
                    val: '1.8 Mnt',
                    sub: 'Template Spesialisasi Khusus',
                    color: 'text-[#1E60D5]',
                    trend: 'Pangkas 70% Waktu Menulis'
                },
                {
                    label: 'Kepatuhan Permenkes 24',
                    val: '100%',
                    sub: 'Audit Trail Timestamp Lengkap',
                    color: 'text-emerald-600',
                    trend: 'Standar Akreditasi STARKES'
                },
                {
                    label: 'Peringatan Dini EWS',
                    val: 'Otomatis',
                    sub: 'Skor Vital Pasien Real-Time',
                    color: 'text-[#F97316]',
                    trend: 'Proaktif Cegah Deteriorasi'
                },
                {
                    label: 'Validitas TTE BSrE',
                    val: 'Sah Hukum',
                    sub: 'Sertifikat Elektronik BSrE',
                    color: 'text-slate-900',
                    trend: 'Integritas Berkas Terjaga'
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
            liveStatus: 'KEMENKES KFA VALIDATED',
            latency: 'Dispensing -62% Lebih Cepat',
            metrics: [
                {
                    label: 'Kecepatan Dispensing',
                    val: '4.2 Mnt',
                    sub: 'Dari input hingga penyerahan',
                    color: 'text-[#1E60D5]',
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
                    color: 'text-[#F97316]',
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
            badge: 'Auto-Grouping CBGs',
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
                    color: 'text-[#1E60D5]',
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
                    color: 'text-[#F97316]',
                    trend: 'Cegah Unnecessary Loss'
                },
                {
                    label: 'Bridging BPJS VClaim',
                    val: 'Native',
                    sub: 'SEP & LPK Terbit Otomatis',
                    color: 'text-slate-900',
                    trend: 'Resmi Terdaftar BPJS'
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
        <section className="py-10 sm:py-14 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F0F6FE] relative overflow-hidden border-b border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF2FE] border border-[#BFDBFE] text-[#1E60D5] text-xs font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                        <span>{getSetting('cockpit_badge_text', 'LIVE PRODUCT EXPERIENCE & WORKFLOW')}</span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                        {getSetting('cockpit_headline', 'Eksplorasi Antarmuka Klinis & Operasional Liva SIMRS')}
                    </h2>
                    
                    <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        {getSetting('cockpit_subheadline', 'Lihat bagaimana arsitektur Liva SIMRS dirancang dengan standar UX kelas dunia untuk mempercepat pelayanan dokter, mempermudah farmasi, dan mengamankan klaim faskes.')}
                    </p>
                </div>

                {/* Tab Navigator: Scrollable on mobile, Centered wrap on desktop */}
                <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 pb-1" role="tablist">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2.5 rounded-full border text-xs font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer btn-spring focus-ring ${
                                    isActive
                                        ? 'bg-[#1E60D5] text-white border-[#1E60D5] shadow-md shadow-blue-500/20'
                                        : 'bg-white text-slate-700 border-slate-200/80 hover:border-blue-200 hover:bg-slate-50'
                                }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#1E60D5]'}`} />
                                <span className="font-medium whitespace-nowrap">{tab.label}</span>
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                                    isActive ? 'bg-white/20 text-white' : 'bg-[#FFF7ED] text-[#F97316] border border-[#FFEDD5]'
                                }`}>
                                    {tab.badge}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Main Showcase Showcase Window */}
                <div className="card-clinical bg-white overflow-hidden text-slate-800 space-y-0">
                    
                    {/* Top Status Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-7 py-3.5 bg-gradient-to-r from-slate-50 via-[#F0F6FE] to-slate-50 border-b border-slate-200/70">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                            </div>
                            <span className="font-mono text-xs text-slate-700 pl-2 border-l border-slate-300 font-semibold">
                                Liva Medical OS • {currentTab.label}
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5 font-mono text-[11px]">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                {currentTab.liveStatus}
                            </span>
                            <span className="text-slate-300 hidden sm:inline">|</span>
                            <span className="text-slate-500 font-medium">{currentTab.latency}</span>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 sm:p-8 space-y-8">
                        {/* Headline & Subheadline */}
                        <div className="space-y-1.5">
                            <h3 className="text-lg sm:text-2xl font-bold font-display text-[#0F172A] tracking-tight">
                                {currentTab.headline}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-4xl leading-relaxed">
                                {currentTab.subheadline}
                            </p>
                        </div>

                        {/* Interactive Photo Showcase + Telemetry Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                            
                            {/* Left: High-Impact Clinical Photo Frame */}
                            <div className="lg:col-span-7 relative group">
                                <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-100 aspect-16/10">
                                    <img 
                                        src={currentTab.photo} 
                                        alt={currentTab.photoAlt}
                                        className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
                                        loading="lazy"
                                    />
                                    {/* Soft Medical Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent pointer-events-none" />

                                    {/* Top-Left Floating Badge */}
                                    <div className="absolute top-3.5 left-3.5 backdrop-blur-md bg-white/90 border border-white/80 shadow-xs px-3 py-1.5 rounded-xl flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#1E60D5] animate-ping"></div>
                                        <span className="text-[11px] font-semibold text-slate-800 font-mono tracking-tight">
                                            {currentTab.photoTag}
                                        </span>
                                    </div>

                                    {/* Bottom Floating Telemetry Card */}
                                    <div className="absolute bottom-3.5 left-3.5 right-3.5 backdrop-blur-md bg-white/95 border border-white/90 shadow-md rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-[#EBF2FE] text-[#1E60D5] flex items-center justify-center shrink-0">
                                                <Activity className="w-4 h-4 text-[#1E60D5]" />
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

                                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                            Verified
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: 4 Luminous Metric Cards & Highlights */}
                            <div className="lg:col-span-5 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    {currentTab.metrics.map((metric, idx) => (
                                        <div 
                                            key={idx} 
                                            className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3.5 space-y-1 hover:border-blue-200 hover:bg-white transition-all"
                                        >
                                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold block truncate">
                                                {metric.label}
                                            </span>
                                            <div className={`text-xl sm:text-2xl font-extrabold font-display ${metric.color}`}>
                                                {metric.val}
                                            </div>
                                            <div className="text-[10.5px] text-slate-600 font-medium leading-tight">
                                                {metric.sub}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4 space-y-2.5">
                                    <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#1E60D5]" />
                                        <span>Keunggulan Utama Alur Ini:</span>
                                    </div>
                                    <ul className="space-y-1.5 text-xs text-slate-600">
                                        {currentTab.highlights.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-[#F97316] font-bold mt-0.5">•</span>
                                                <span className="leading-snug">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Bottom Action Footer Bar */}
                    <div className="px-5 sm:px-8 py-4 bg-[#F8FAFC] border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
                            <Zap className="w-4 h-4 text-[#F97316] shrink-0" />
                            <span>Cloud SLA 99.98% • Enkripsi AES-256 • ISO 27001 Certified</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => onScheduleDemo && onScheduleDemo(currentTab.label)}
                            className="btn-amber-warm btn-spring h-10 px-6 rounded-full text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer focus-ring"
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
