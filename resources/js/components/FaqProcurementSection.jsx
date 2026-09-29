import React, { useState, useMemo } from 'react';
import { 
    HelpCircle, 
    ChevronDown, 
    Search, 
    Sparkles, 
    ArrowRight, 
    ShieldCheck, 
    Server, 
    Database, 
    DollarSign, 
    Clock, 
    CheckCircle2, 
    Building2,
    FileText
} from 'lucide-react';

const FAQ_DATA = [
    {
        category: 'migration',
        categoryLabel: 'Migrasi & Implementasi',
        icon: Database,
        q: 'Berapa lama proses implementasi dan migrasi database dari SIMRS lama?',
        a: 'Proses migrasi dan Go-Live Liva SIMRS rata-rata berlangsung antara 2 hingga 4 minggu tergantung pada skala fasyankes (Tipe B, C, D, atau Klinik). Tim kami menyediakan automated data extraction script untuk database lama (MySQL, PostgreSQL, Oracle, SQL Server) dengan garansi zero data loss dan validasi integritas rekam medis sebelum cut-off.'
    },
    {
        category: 'migration',
        categoryLabel: 'Migrasi & Implementasi',
        icon: Clock,
        q: 'Bagaimana alur pendampingan dokter dan perawat saat masa Go-Live?',
        a: 'Kami menyertakan tim Field Support Engineer on-site di rumah sakit Anda selama masa transisi Go-Live (standby di IGD, Rawat Jalan, Rawat Inap, dan Farmasi). Selain itu, tersedia modul panduan video interaktif di dalam aplikasi serta hotline teknis prioritas 24/7.'
    },
    {
        category: 'compliance',
        categoryLabel: 'SATUSEHAT & BPJS',
        icon: ShieldCheck,
        q: 'Apakah Liva SIMRS sudah lulus integrasi 6 Resource SATUSEHAT Kemenkes?',
        a: 'Ya, 100% tersertifikasi dan terhubung native dengan standar HL7 FHIR R4 Kementerian Kesehatan RI. Data Encounter, Condition (ICD-10), Observation (TTV & Lab), DiagnosticReport (Radiologi DICOM), Specimen, dan Medication disinkronkan secara otomatis tanpa perlu entri ganda (double-entry).'
    },
    {
        category: 'compliance',
        categoryLabel: 'SATUSEHAT & BPJS',
        icon: FileText,
        q: 'Bagaimana integrasi dengan BPJS V-Claim 2.0 & Antrean Online 3.0?',
        a: 'Liva SIMRS memiliki bridging engine resmi yang mengintegrasikan pembuatan SEP instan (< 2 detik), validasi sidik jari (fingerprint), sinkronisasi kuota jadwal poli di Mobile JKN, hingga e-Klaim INA-CBGs dengan verifikasi aturan coding untuk mencegah potensi klaim pending atau dispute.'
    },
    {
        category: 'technical',
        categoryLabel: 'Arsitektur & Offline Mode',
        icon: Server,
        q: 'Apakah rumah sakit tetap bisa melayani pasien jika koneksi internet terputus?',
        a: 'Ya. Liva SIMRS mengusung arsitektur Hybrid Edge Caching. Jika terjadi gangguan internet ISP, server lokal rumah sakit tetap dapat melayani pendaftaran, input resep dokter, tindakan poli, dan kasir secara offline. Saat koneksi internet kembali normal, seluruh data akan tersinkronisasi otomatis (auto-reconciliation) ke cloud tanpa konflik data.'
    },
    {
        category: 'technical',
        categoryLabel: 'Arsitektur & Offline Mode',
        icon: Server,
        q: 'Apakah Liva SIMRS mendukung bridging alat medis radiologi (PACS/DICOM) & LIS Laboratorium?',
        a: 'Sangat mendukung. Liva SIMRS terintegrasi langsung dengan mesin radiologi (CT-Scan, MRI, X-Ray, USG) via DICOM C-STORE / C-FIND Worklist, serta terhubung dengan auto-analyzer laboratorium darah melalui protokol HL7 / ASTM dengan pengiriman nilai kritis (critical result alert) langsung ke DPJP.'
    },
    {
        category: 'procurement',
        categoryLabel: 'Skema Biaya & Garansi SLA',
        icon: DollarSign,
        q: 'Skema pengadaan apa saja yang tersedia untuk rumah sakit swasta maupun RSUD?',
        a: 'Tersedia 2 skema fleksibel: (1) Skema OPEX / Cloud Subscription (bulanan/tahunan berbasis kapasitas TT tanpa biaya server fisik besar di awal), atau (2) Skema CAPEX / On-Premise Enterprise (lisensi kepemilikan penuh dengan opsi maintenance tahunan). Untuk RSUD, kami mendukung penyusunan dokumen RKA / KAK pengadaan e-Katalog.'
    },
    {
        category: 'procurement',
        categoryLabel: 'Skema Biaya & Garansi SLA',
        icon: CheckCircle2,
        q: 'Berapa jaminan SLA ketersediaan sistem dan keamanan data medis?',
        a: 'Kami memberikan jaminan Service Level Agreement (SLA) Uptime 99.98% dengan multi-zone cloud backup di Indonesia. Keamanan data dilindungi enkripsi AES-256 GCM at-rest dan TLS 1.3 in-transit, memenuhi UU Perlindungan Data Pribadi (PDP) No. 27/2022 dan standar akreditasi KARS STARKES.'
    },
];

export default function FaqProcurementSection({ onNavigate, onOpenDemo }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openIndex, setOpenIndex] = useState(0); // First item open by default

    const categories = [
        { id: 'all', label: 'Semua Pertanyaan' },
        { id: 'migration', label: 'Migrasi & Go-Live' },
        { id: 'compliance', label: 'SATUSEHAT & BPJS' },
        { id: 'technical', label: 'Arsitektur & Offline' },
        { id: 'procurement', label: 'Skema Biaya & SLA' },
    ];

    const filteredFaqs = useMemo(() => {
        return FAQ_DATA.filter((item) => {
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            const matchesSearch = searchQuery.trim() === '' || 
                item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.a.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const toggleFaq = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="py-20 sm:py-28 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F4F8FE] border-t border-slate-200/80 relative overflow-hidden">
            {/* Ambient Background Accents */}
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#2F8BFF] text-xs font-bold tracking-wide mb-4 shadow-2xs">
                        <HelpCircle className="w-3.5 h-3.5 text-[#2F8BFF]" />
                        <span>Pusat Informasi &amp; Panduan Pengadaan</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2937] tracking-tight font-display">
                        Pertanyaan Sering Diajukan <br className="hidden sm:inline" />
                        <span className="text-[#2F8BFF]">Oleh Manajemen &amp; Direksi RS</span>
                    </h2>

                    <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                        Temukan jawaban komprehensif terkait proses migrasi data, kepatuhan SATUSEHAT Kemenkes, keandalan mode offline, serta skema investasi sistem.
                    </p>

                    {/* Interactive Live Search Bar */}
                    <div className="mt-8 relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Ketik kata kunci (contoh: migrasi data, BPJS, offline, biaya, SLA)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm rounded-2xl bg-white border border-slate-200 shadow-xs focus:outline-none focus:border-[#2F8BFF] focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder:text-slate-400 transition-all"
                        />
                    </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                selectedCategory === cat.id
                                    ? 'bg-[#2F8BFF] text-white shadow-md shadow-blue-500/20'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* FAQ Accordion Grid */}
                <div className="max-w-4xl mx-auto space-y-3.5">
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
                            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <h4 className="text-sm font-bold text-slate-700">Pertanyaan Tidak Ditemukan</h4>
                            <p className="text-xs text-slate-500 mt-1">
                                Tidak ada FAQ yang cocok dengan kata kunci "{searchQuery}". Tim konsultan kami siap menjawab langsung via WhatsApp.
                            </p>
                        </div>
                    ) : (
                        filteredFaqs.map((faq, idx) => {
                            const isOpen = openIndex === idx;
                            const IconComponent = faq.icon;

                            return (
                                <div
                                    key={idx}
                                    className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                                        isOpen 
                                            ? 'border-blue-300 shadow-md shadow-blue-500/5' 
                                            : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                                    >
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                                                isOpen ? 'bg-blue-50 text-[#2F8BFF]' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                <IconComponent className="w-4 h-4" />
                                            </div>
                                            <span className={`text-xs sm:text-sm font-bold transition-colors ${
                                                isOpen ? 'text-[#2F8BFF]' : 'text-slate-800'
                                            }`}>
                                                {faq.q}
                                            </span>
                                        </div>

                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                            isOpen 
                                                ? 'bg-[#2F8BFF] text-white border-[#2F8BFF] rotate-180' 
                                                : 'border-slate-200 text-slate-400 bg-slate-50'
                                        }`}>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
                                            <p className="mt-2">{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Bottom CTA Box */}
                <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#1F2937] via-[#111827] to-[#0F172A] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2F8BFF] to-emerald-400 p-0.5 shrink-0">
                            <div className="w-full h-full bg-[#1F2937] rounded-[14px] flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-[#2F8BFF]" />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-base font-bold">Membutuhkan Proposal Resmi &amp; Konsultasi KAK?</h4>
                            <p className="text-xs text-slate-300 mt-0.5">
                                Tim konsultan SIMRS siap mengadakan rapat koordinasi daring atau presentasi on-site ke RS Anda.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            if (onOpenDemo) onOpenDemo();
                            else if (onNavigate) onNavigate('jadwalkan-demo');
                        }}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2F8BFF] hover:bg-[#1E75E6] text-white font-bold text-xs flex items-center justify-center gap-2 shrink-0 shadow-md shadow-blue-500/25 transition-all cursor-pointer whitespace-nowrap"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Minta Jadwal Presentasi Direksi</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>

            </div>
        </section>
    );
}
