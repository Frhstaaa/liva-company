import React, { useState } from 'react';
import { 
    MapPin, 
    Building2, 
    Activity, 
    ShieldCheck, 
    Users, 
    TrendingUp, 
    Sparkles, 
    CheckCircle2, 
    ArrowRight,
    Award
} from 'lucide-react';

const REGIONS = [
    {
        id: 'nasional',
        name: 'Seluruh Indonesia',
        count: '40+ Faskes',
        activeClients: [
            { name: 'RSUD dr. Soetrasno', city: 'Jawa Tengah', type: 'RSUD Kelas B', badge: 'Akreditasi Paripurna', highlight: 'Dispute BPJS 0.1%' },
            { name: 'RSIA Permata Bunda', city: 'DKI Jakarta', type: 'RSIA Khusus', badge: 'RME Terintegrasi SATUSEHAT', highlight: 'Antrean Obat < 8 Mnt' },
            { name: 'RS Medika Citra Sentosa', city: 'Sumatera Utara', type: 'RS Swasta Kelas C', badge: 'Cloud PACS Ready', highlight: 'TAT Radiologi 12 Mnt' },
            { name: 'Klinik Industri & MCU Tambang', city: 'Kalimantan Timur', type: 'Klinik K3 Industri', badge: 'Surveilans PAK Kemenaker', highlight: 'Paperless 100%' },
        ]
    },
    {
        id: 'jawa_bali',
        name: 'Jawa & Bali',
        count: '22 Faskes',
        activeClients: [
            { name: 'RSUD dr. Soetrasno', city: 'Jawa Tengah', type: 'RSUD Kelas B', badge: 'Akreditasi Paripurna', highlight: '100% SATUSEHAT FHIR' },
            { name: 'RSIA Permata Bunda', city: 'DKI Jakarta', type: 'RSIA Khusus', badge: 'RME Permenkes 24/2022', highlight: 'Zero Transcribing Error' },
            { name: 'RS Pratama Bali Sejahtera', city: 'Denpasar, Bali', type: 'RS Swasta Kelas D', badge: 'E-Prescribing Smart Dispense', highlight: 'Klaim Cair < 3 Hari' },
        ]
    },
    {
        id: 'sumatera',
        name: 'Sumatera',
        count: '9 Faskes',
        activeClients: [
            { name: 'RS Medika Citra Sentosa', city: 'Medan, Sumut', type: 'RS Swasta Kelas C', badge: 'Cloud PACS & DICOM', highlight: 'TAT Radiologi 12 Mnt' },
            { name: 'RSIA Bunda Andalas', city: 'Padang, Sumbar', type: 'RSIA Khusus', badge: 'Integrasi BPJS VClaim', highlight: 'Antrean Online 3.0' },
        ]
    },
    {
        id: 'kalimantan_sulawesi',
        name: 'Kalimantan & Sulawesi',
        count: '7 Faskes',
        activeClients: [
            { name: 'Klinik K3 Tambang Mineral', city: 'Balikpapan, Kaltim', type: 'Klinik Industri', badge: 'MCU Massal 5.000 Karyawan', highlight: 'Auto-Sync Offline' },
            { name: 'RS Bhakti Manado Sehat', city: 'Manado, Sulut', type: 'RS Swasta Kelas C', badge: 'SatuSehat DiagnosticReport', highlight: 'Paperless Total' },
        ]
    },
    {
        id: 'timur',
        name: 'Nusa Tenggara & Papua',
        count: '4 Faskes',
        activeClients: [
            { name: 'RS Pratama Nusantara Timur', city: 'Kupang, NTT', type: 'RS Pratama', badge: 'Hybrid Edge Local Sync', highlight: 'Stabil Tanpa Internet' },
            { name: 'Klinik Medika Cendrawasih', city: 'Jayapura, Papua', type: 'Klinik Utama', badge: 'PCare BPJS Bridging', highlight: 'Kecepatan SEP < 2 Detik' },
        ]
    }
];

export default function HospitalNetworkMap({ onNavigate, onOpenDemo }) {
    const [activeRegion, setActiveRegion] = useState('nasional');

    const currentData = REGIONS.find(r => r.id === activeRegion) || REGIONS[0];

    return (
        <section className="py-20 sm:py-28 bg-white border-t border-slate-200/80 relative overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wide mb-3 shadow-2xs">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Jaringan Nasional Kepercayaan Faskes</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2937] tracking-tight font-display">
                            Dipercaya Puluhan Rumah Sakit <br className="hidden sm:inline" />
                            <span className="text-[#2F8BFF]">Dari Sabang Hingga Merauke</span>
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                            Liva SIMRS diimplementasikan secara terbukti di berbagai fasyankes: RSUD pemerintah, rumah sakit swasta, RSIA khusus ibu &amp; anak, hingga klinik industri pertambangan.
                        </p>
                    </div>

                    {/* Quick Metric Ribbon */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                            <span className="block text-2xl font-black text-[#2F8BFF] leading-none">40+</span>
                            <span className="text-[11px] text-slate-500 font-medium mt-1 block">Mitra Faskes Aktif</span>
                        </div>
                        <div className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                            <span className="block text-2xl font-black text-emerald-600 leading-none">1.2M+</span>
                            <span className="text-[11px] text-slate-500 font-medium mt-1 block">Rekam Medis Pasien</span>
                        </div>
                        <div className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                            <span className="block text-2xl font-black text-[#FF8A2B] leading-none">99.98%</span>
                            <span className="text-[11px] text-slate-500 font-medium mt-1 block">Cloud Uptime SLA</span>
                        </div>
                    </div>
                </div>

                {/* Region Selector Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 pb-4">
                    {REGIONS.map((reg) => (
                        <button
                            key={reg.id}
                            type="button"
                            onClick={() => setActiveRegion(reg.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                                activeRegion === reg.id
                                    ? 'bg-[#1F2937] text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                            }`}
                        >
                            <span>{reg.name}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                                activeRegion === reg.id ? 'bg-[#2F8BFF] text-white' : 'bg-white text-slate-700'
                            }`}>
                                {reg.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Hospital Client Spotlight Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {currentData.activeClients.map((client, idx) => (
                        <div 
                            key={idx}
                            className="rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/70 p-5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-3xs">
                                        <MapPin className="w-3 h-3 text-[#2F8BFF]" />
                                        {client.city}
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                        {client.type}
                                    </span>
                                </div>

                                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2F8BFF] flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-[#2F8BFF] group-hover:text-white transition-colors shadow-2xs">
                                    <Building2 className="w-5 h-5" />
                                </div>

                                <h4 className="font-bold text-base text-[#1F2937] leading-snug group-hover:text-[#2F8BFF] transition-colors">
                                    {client.name}
                                </h4>

                                <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                    <span>{client.badge}</span>
                                </div>
                            </div>

                            <div className="mt-5 pt-3.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                                <span className="text-slate-400 text-[11px]">Dampak Terukur:</span>
                                <span className="font-bold text-[#FF8A2B] bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60 font-mono text-[11px]">
                                    {client.highlight}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Trust Assurance Ribbon */}
                <div className="mt-12 p-6 rounded-3xl bg-blue-50/60 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-2xl bg-[#2F8BFF] text-white shadow-xs">
                            <Award className="w-5 h-5" />
                        </div>
                        <div>
                            <h5 className="text-sm font-bold text-[#1F2937]">Ingin Menghubungi Rekan Direktur RS Pengguna Liva SIMRS?</h5>
                            <p className="text-xs text-slate-600 mt-0.5">
                                Kami menyediakan sesi peer-to-peer sharing dengan manajemen rumah sakit mitra kami.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            if (onOpenDemo) onOpenDemo();
                            else if (onNavigate) onNavigate('jadwalkan-demo');
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#1F2937] hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                    >
                        <span>Minta Kontak Referensi RS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>

            </div>
        </section>
    );
}
