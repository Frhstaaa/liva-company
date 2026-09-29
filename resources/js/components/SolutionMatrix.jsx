import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Building2,
    Hospital,
    Factory,
    Pill,
    ShieldCheck,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Layers,
    ChevronRight,
    Users,
    FileText,
    Activity,
    Lock
} from 'lucide-react';

export default function SolutionMatrix({ onNavigate, onScheduleDemo }) {
    const [selectedSolution, setSelectedSolution] = useState('hospital');

    const solutions = {
        hospital: {
            id: 'hospital',
            title: 'SIMRS Terpadu Rumah Sakit (Kelas A, B, C, D & RSIA)',
            subtitle: 'Arsitektur digital komprehensif untuk rawat jalan, rawat inap, IGD cito, kamar operasi, dan penunjang medis terstandar akreditasi STARKES.',
            icon: Hospital,
            badge: 'Enterprise RS Solution',
            features: [
                'Modul Rawat Jalan (Rajal), Rawat Inap (Ranap), IGD Triage Cito & ICU/NICU.',
                'Laboratorium LIS & Radiologi RIS/PACS Interoperability.',
                'Bridging BPJS VClaim 2.0 & Antrean Online Mobile JKN otomatis.',
                'Pencegahan dispute klaim INA-CBGs & sinkronisasi SATUSEHAT Kemenkes.',
                'Opsi Hybrid: Cloud SaaS Terkelola atau On-Premises Server Lokal.'
            ],
            targetAudience: 'Direktur RS, Komite Medis, Kepala IT RS, Manajer Finansial & Klaim',
            metricHighlight: '99.98% Uptime SLA • Akreditasi STARKES Paripurna Ready'
        },
        clinic: {
            id: 'clinic',
            title: 'SIM Klinik Pratama & Mandiri',
            subtitle: 'Aplikasi klinik terjangkau, cepat, dan mudah dioperasikan untuk klinik mandiri, klinik bersama, dan poliklinik pratama.',
            icon: Building2,
            badge: 'SaaS Ramah Klinik',
            features: [
                'Registrasi pasien kilat via QR Code & WhatsApp Notifikasi.',
                'Bridging resmi PCare BPJS Kesehatan (Pendaftaran & Pelayanan Pasien).',
                'Rekam Medis Elektronik (RME) ringkas dengan auto-suggest ICD-10.',
                'Kasir klinik terpadu & laporan pendapatan harian otomatis.',
                'Model berlangganan bulanan terjangkau tanpa biaya server awal (Zero CAPEX).'
            ],
            targetAudience: 'Dokter Pemilik Klinik, Manajer Operasional Klinik, Staf Admisi',
            metricHighlight: '< 1 Hari Proses Onboarding • Tanpa Instalasi Rumit'
        },
        industrial_k3: {
            id: 'industrial_k3',
            title: 'Sistem Klinik Industri & K3 (Occupational Health)',
            subtitle: 'Dirancang khusus untuk klinik onsite perusahaan di sektor pertambangan, manufaktur, dan perkebunan.',
            icon: Factory,
            badge: 'K3 & Manufaktur / Tambang',
            features: [
                'Manajemen Medical Check Up (MCU) massal berkala & pre-employment karyawan.',
                'Surveilans Penyakit Akibat Kerja (PAK) & rekapitulasi kecelakaan kerja K3.',
                'Riwayat kesehatan kerja terintegrasi dengan Nomor Induk Karyawan (NIK HR).',
                'Dukungan operasional klinik remote/site dengan offline-first synchronization.',
                'Laporan kepatuhan regulasi Kemenkes & Kemenaker terstandar.'
            ],
            targetAudience: 'HSE Manager, Dokter Perusahaan (K3), HR Director, Onsite Paramedic',
            metricHighlight: 'Kapasitas 10.000+ Karyawan • Sesuai Regulasi Kemenaker & Kemenkes'
        },
        pharmacy: {
            id: 'pharmacy',
            title: 'Sistem Manajemen Farmasi & Apotek',
            subtitle: 'Kontrol rantai pasok obat otomatis berbasis FIFO / FEFO, peringatan kadaluarsa, dan e-Prescribing terpadu.',
            icon: Pill,
            badge: 'Smart Pharmacy & Supply Chain',
            features: [
                'Penerimaan e-Resep langsung dari layar dokter ke display peracikan apotek.',
                'Pengelolaan stok multi-depo (Apotek Rawat Jalan, Ranap, Gudang Farmasi).',
                'Pelacakan nomor batch, tanggal kadaluarsa (ED), dan batas minimum stok.',
                'Integrasi Kamus Farmasi & Alat Kesehatan (KFA) Kemenkes SATUSEHAT.',
                'Laporan mutasi obat, pemakaian narkotika/psikotropika, dan margin penjualan.'
            ],
            targetAudience: 'Apoteker Penanggung Jawab, Kepala Instalasi Farmasi, Manajer Logistik',
            metricHighlight: '0 Resep Salah Baca • 100% Tracking Batch & FIFO/FEFO'
        },
        compliance: {
            id: 'compliance',
            title: 'Integrasi Regulasi Pemerintah (SATUSEHAT & BPJS)',
            subtitle: 'Engine interoperabilitas resmi tanpa plugin pihak ketiga yang rawan error saat pembaruan versi.',
            icon: ShieldCheck,
            badge: 'Kemenkes & BPJS Native',
            features: [
                'Native HL7 FHIR Interoperability (Patient, Encounter, Condition, Medication).',
                'BPJS VClaim v2.0, Antrean Online Mobile JKN, Aplicares, & I-Care JKN.',
                'Keamanan data terstandar ISO 27001 dan kepatuhan UU Pelindungan Data Pribadi (UU PDP).',
                'Enkripsi data medis AES-256 GCM pada level database dan transmisi.',
                'Pembaruan regulasi Kemenkes seumur hidup tanpa biaya bridging terpisah.'
            ],
            targetAudience: 'Direktur Utama, Manajer IT RS, Tim Akreditasi STARKES, Tim Casemix',
            metricHighlight: 'ISO 27001 Certified • Native FHIR R4 Kemenkes RI'
        }
    };

    const current = solutions[selectedSolution];

    return (
        <div className="space-y-6">
            {/* Horizontal Segment Navigation Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {Object.values(solutions).map((sol) => {
                    const isSelected = selectedSolution === sol.id;
                    const IconComp = sol.icon;
                    return (
                        <button
                            key={sol.id}
                            type="button"
                            onClick={() => setSelectedSolution(sol.id)}
                            className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 btn-spring ${
                                isSelected
                                    ? 'bg-[#2F8BFF] text-white border-[#2F8BFF] shadow-md shadow-blue-500/20 scale-[1.02]'
                                    : 'bg-white border-slate-200/90 text-slate-700 hover:border-blue-300 hover:bg-slate-50 card-interactive'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                                isSelected ? 'bg-white/20 text-white scale-105' : 'bg-blue-50 text-[#2F8BFF]'
                            }`}>
                                <IconComp className="h-4 w-4" />
                            </div>
                            <div>
                                <span className={`text-xs font-bold font-display block leading-tight ${
                                    isSelected ? 'text-white' : 'text-[#1F2937]'
                                }`}>
                                    {sol.title.split(' ')[0]} {sol.title.split(' ')[1]}
                                </span>
                                <span className={`text-[10px] block mt-0.5 line-clamp-1 ${
                                    isSelected ? 'text-blue-100' : 'text-slate-500'
                                }`}>
                                    {sol.badge}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Detailed Selected Solution Card with Spring Keyframe */}
            <div
                key={selectedSolution}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-scale-in"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-blue-50 text-[#2F8BFF] border border-blue-200">
                                {current.badge}
                            </span>
                            <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                                {current.metricHighlight}
                            </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1F2937]">
                            {current.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                            {current.subtitle}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 shrink-0">
                        <Button
                            onClick={() => onScheduleDemo && onScheduleDemo(current.title)}
                            className="bg-[#2F8BFF] hover:bg-[#1E75E6] text-white font-semibold text-xs h-9 gap-1.5 btn-spring shadow-xs cursor-pointer"
                        >
                            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                            <span>Minta Demo Solusi Ini</span>
                        </Button>
                    </div>
                </div>

                {/* Core Feature Bullet Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {current.features.map((feat, idx) => (
                        <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80 hover:border-blue-200 hover:bg-blue-50/20 transition-all duration-150 flex items-start gap-3 card-interactive"
                        >
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-xs text-slate-700 leading-relaxed">
                                {feat}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Footer Metadata */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-mono">
                    <div>
                        <span className="text-slate-400">Target Pengguna:</span>{' '}
                        <strong className="text-slate-700 font-sans">{current.targetAudience}</strong>
                    </div>
                    <button
                        type="button"
                        onClick={() => onNavigate('modul-simrs')}
                        className="text-[#2F8BFF] hover:text-[#1E75E6] font-semibold flex items-center gap-1 cursor-pointer font-sans btn-spring"
                    >
                        <span>Lihat 36 Modul Terkait</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

