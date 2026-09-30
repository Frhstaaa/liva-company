import React, { useState, useRef, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
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
    Award,
    ChevronLeft,
    ChevronRight
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
    const { getSetting } = useSite();
    const [activeRegion, setActiveRegion] = useState('nasional');
    const [activeClientIdx, setActiveClientIdx] = useState(0);
    const clientScrollRef = useRef(null);

    const currentData = REGIONS.find(r => r.id === activeRegion) || REGIONS[0];

    // Reset carousel index when region changes
    useEffect(() => {
        setActiveClientIdx(0);
        if (clientScrollRef.current) {
            clientScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }, [activeRegion]);

    const scrollClientTo = (idx) => {
        const nextIdx = Math.max(0, Math.min(currentData.activeClients.length - 1, idx));
        setActiveClientIdx(nextIdx);
        if (clientScrollRef.current) {
            const container = clientScrollRef.current;
            const card = container.children[nextIdx];
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    };

    const handleClientScroll = (e) => {
        const container = e.currentTarget;
        const scrollLeft = container.scrollLeft;
        const width = container.offsetWidth;
        if (width > 0) {
            const newIndex = Math.round(scrollLeft / (width * 0.85));
            if (newIndex !== activeClientIdx && newIndex >= 0 && newIndex < currentData.activeClients.length) {
                setActiveClientIdx(newIndex);
            }
        }
    };

    return (
        <section className="py-10 sm:py-20 bg-white border-t border-slate-200/80 relative overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-14">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wide mb-3 shadow-2xs font-mono">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{getSetting('network_badge_text', 'JARINGAN NASIONAL KEPERCAYAAN FASKES')}</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight font-display">
                            {getSetting('network_headline_prefix', 'Dipercaya Puluhan Rumah Sakit')} <br className="hidden sm:inline" />
                            <span className="text-[#1E60D5]">{getSetting('network_headline_highlight', 'Dari Sabang Hingga Merauke')}</span>
                        </h2>
                        <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-slate-600 leading-relaxed font-sans">
                            {getSetting('network_subheadline', 'Liva SIMRS diimplementasikan secara terbukti di berbagai fasyankes: RSUD pemerintah, rumah sakit swasta, RSIA khusus ibu & anak, hingga klinik industri pertambangan.')}
                        </p>
                    </div>

                    {/* Quick Metric Ribbon */}
                    <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-3 shrink-0">
                        <div className="px-2.5 py-2 sm:px-4 sm:py-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-center">
                            <span className="block text-xl sm:text-2xl font-black text-[#1E60D5] leading-none tabular-nums font-display">{getSetting('network_total_faskes', '40+')}</span>
                            <span className="text-[10px] sm:text-[11px] text-slate-600 font-medium mt-1 block">Mitra Faskes</span>
                        </div>
                        <div className="px-2.5 py-2 sm:px-4 sm:py-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-center">
                            <span className="block text-xl sm:text-2xl font-black text-emerald-700 leading-none tabular-nums font-display">{getSetting('network_total_rme', '1.2M+')}</span>
                            <span className="text-[10px] sm:text-[11px] text-slate-600 font-medium mt-1 block">RME Pasien</span>
                        </div>
                        <div className="px-2.5 py-2 sm:px-4 sm:py-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-center">
                            <span className="block text-xl sm:text-2xl font-black text-[#EA580C] leading-none tabular-nums font-display">{getSetting('network_cloud_sla', '99.98%')}</span>
                            <span className="text-[10px] sm:text-[11px] text-slate-600 font-medium mt-1 block">Cloud SLA</span>
                        </div>
                    </div>
                </div>

                {/* Region Selector Pills (Scrollable on mobile) */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 border-b border-slate-200/80 pb-3 sm:pb-4 overflow-x-auto no-scrollbar" role="tablist">
                    {REGIONS.map((reg) => {
                        const isSelected = activeRegion === reg.id;
                        return (
                            <button
                                key={reg.id}
                                type="button"
                                role="tab"
                                aria-selected={isSelected}
                                onClick={() => setActiveRegion(reg.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 btn-spring focus-ring ${
                                    isSelected
                                        ? 'bg-[#0F172A] text-white shadow-md'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                                }`}
                            >
                                <span>{reg.name}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                                    isSelected ? 'bg-[#1E60D5] text-white' : 'bg-white text-slate-700'
                                }`}>
                                    {reg.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Mobile Navigation Header */}
                <div className="flex sm:hidden items-center justify-between mb-3 px-1">
                    <span className="text-xs font-mono font-semibold text-slate-500">
                        Mitra <strong className="text-[#1E60D5]">{activeClientIdx + 1}</strong> dari {currentData.activeClients.length}
                    </span>
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => scrollClientTo(activeClientIdx - 1)}
                            disabled={activeClientIdx === 0}
                            className="p-1.5 rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs active:scale-95"
                            aria-label="Mitra sebelumnya"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollClientTo(activeClientIdx + 1)}
                            disabled={activeClientIdx === currentData.activeClients.length - 1}
                            className="p-1.5 rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs active:scale-95"
                            aria-label="Mitra berikutnya"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Hospital Client Spotlight Track: Carousel on Mobile, Grid on Desktop */}
                <div
                    ref={clientScrollRef}
                    onScroll={handleClientScroll}
                    className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 pt-1"
                >
                    {currentData.activeClients.map((client, idx) => (
                        <div 
                            key={idx}
                            className="w-[85vw] xs:w-[300px] sm:w-auto shrink-0 snap-center card-clinical p-5 flex flex-col justify-between group bg-white border border-slate-200/90 shadow-xs"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-3xs font-mono">
                                        <MapPin className="w-3 h-3 text-[#1E60D5]" />
                                        {client.city}
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                                        {client.type}
                                    </span>
                                </div>

                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E60D5] flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-[#1E60D5] group-hover:text-white transition-colors shadow-2xs">
                                    <Building2 className="w-5 h-5" />
                                </div>

                                <h4 className="font-bold text-base text-[#0F172A] leading-snug group-hover:text-[#1E60D5] transition-colors font-display">
                                    {client.name}
                                </h4>

                                <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span>{client.badge}</span>
                                </div>
                            </div>

                            <div className="mt-5 pt-3.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                                <span className="text-slate-500 text-[11px]">Dampak Terukur:</span>
                                <span className="font-bold text-[#EA580C] bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60 font-mono text-[11px]">
                                    {client.highlight}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Dot Indicators */}
                <div className="flex sm:hidden justify-center items-center gap-1.5 pt-2">
                    {currentData.activeClients.map((_, dotIdx) => (
                        <button
                            key={dotIdx}
                            type="button"
                            onClick={() => scrollClientTo(dotIdx)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                activeClientIdx === dotIdx
                                    ? 'w-6 bg-[#1E60D5]'
                                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                            }`}
                            aria-label={`Pindah ke mitra ${dotIdx + 1}`}
                        />
                    ))}
                </div>

                {/* Bottom Trust Assurance Ribbon */}
                <div className="mt-8 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#1E60D5] text-white shadow-xs">
                            <Award className="w-5 h-5" />
                        </div>
                        <div>
                            <h5 className="text-sm font-bold text-[#0F172A]">Ingin Menghubungi Rekan Direktur RS Pengguna Liva SIMRS?</h5>
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
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap btn-spring focus-ring"
                    >
                        <span>Minta Kontak Referensi RS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>

            </div>
        </section>
    );
}

