import React from 'react';
import { useSite } from '../context/SiteContext';
import { 
    ShieldCheck, 
    Lock, 
    Award, 
    FileCheck, 
    CheckCircle2, 
    Zap, 
    QrCode, 
    Activity, 
    FileSpreadsheet, 
    ArrowRight,
    Star
} from 'lucide-react';

export default function BrandTrustAndShowcase({ onScheduleDemo, onNavigate }) {
    const { getSetting } = useSite();
    const trustCredentials = [
        {
            title: 'Kemenkes SATUSEHAT',
            desc: 'Native HL7 FHIR R4',
            icon: ShieldCheck,
            color: 'text-[#1E60D5]'
        },
        {
            title: 'BPJS VClaim 2.0',
            desc: 'Antrean Online JKN',
            icon: Zap,
            color: 'text-emerald-500'
        },
        {
            title: 'ISO 27001 & UU PDP',
            desc: 'Enkripsi Medis AES-256',
            icon: Lock,
            color: 'text-[#F97316]'
        },
        {
            title: 'TTE BSrE BSSN',
            desc: 'Tanda Tangan Sah Hukum',
            icon: FileCheck,
            color: 'text-[#1E60D5]'
        },
        {
            title: 'STARKES Paripurna',
            desc: 'Standar Akreditasi Kemenkes',
            icon: Award,
            color: 'text-amber-500'
        }
    ];

    const spotlightFeatures = [
        {
            badge: 'EFISIENSI LOKET & ADMISI',
            title: 'Anjungan Pendaftaran Mandiri (APM) & QR Check-in',
            description: 'Pasien BPJS dan Umum dapat melakukan pendaftaran mandiri lewat kios layar sentuh atau scan QR WhatsApp dalam < 15 detik, memangkas penumpukan antrean loket hingga 70%.',
            icon: QrCode,
            highlights: ['Cetak SEP BPJS Instan', 'Sinkron Antrean Mobile JKN', 'Beban Loket Berkurang Drastis']
        },
        {
            badge: 'KESELAMATAN PASIEN & DOKTER',
            title: 'Clinical Decision Support (CDS) & RME Terpadu',
            description: 'Asesmen medis SOAP dokter dilengkapi deteksi otomatis kontraindikasi obat, alergi pasien, dan kalkulasi skor EWS (Early Warning Score) untuk respon gawat darurat yang cepat.',
            icon: Activity,
            highlights: ['Proteksi Resep Alergi', 'EWS Skor Otomatis', 'Input SOAP < 2 Menit']
        },
        {
            badge: 'ARUS KAS & KEUANGAN FASKES',
            title: 'Smart Casemix & Pre-Validasi INA-CBGs BPJS',
            description: 'Pemeriksaan otomatis kesesuaian diagnosis utama, diagnosis sekunder, dan tindakan medis sebelum berkas klaim diajukan ke verifikator BPJS untuk mencegah klaim pending atau dispute.',
            icon: FileSpreadsheet,
            highlights: ['Dispute Rate < 0.3%', 'Auto-Grouping Tarif', 'Nol Biaya Bridging Tambahan']
        }
    ];

    const testimonials = [
        {
            quote: 'Transisi ke Liva SIMRS berjalan mulus hanya dalam 6 minggu. Waktu tunggu pasien rawat jalan terpangkas dari 45 menit menjadi rata-rata 12 menit, dan bridging SATUSEHAT 100% tervalidasi.',
            author: 'dr. H. Hendra Wijaya, Sp.OG',
            role: 'Direktur Pelayanan Medis',
            hospital: 'RSUD Tipe B Regional',
            metric: 'Waktu Tunggu Turun 73%',
            stars: 5
        },
        {
            quote: 'Fitur Casemix pre-validasi Liva SIMRS menyelamatkan arus kas RS kami. Dispute klaim BPJS turun drastis ke bawah 0.3%, dan tim billing tidak lagi lembur saat penutupan klaim bulanan.',
            author: 'dr. Ratna Juwita, MARS',
            role: 'Kepala Instalasi Casemix & Klaim',
            hospital: 'RS Khusus Ibu & Anak Jakarta',
            metric: 'Klaim Cair 100% Tepat Waktu',
            stars: 5
        },
        {
            quote: 'Sebagai jejaring 4 klinik pratama, model cloud Liva SIMRS memberi kami efisiensi luar biasa. Tanpa biaya beli server ratusan juta, seluruh klinik langsung terhubung PCare BPJS & SATUSEHAT.',
            author: 'dr. Budi Setiawan',
            role: 'Founder & Managing Director',
            hospital: 'Jejaring Klinik Sehat Utama',
            metric: 'Zero CAPEX Server',
            stars: 5
        }
    ];

    return (
        <div className="space-y-0">
            {/* 1. Trust & Accreditation Strip */}
            <section className="bg-white py-8 sm:py-10 border-b border-slate-200/60 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="text-center space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 text-[10.5px] font-mono font-semibold tracking-wider uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            {getSetting('trust_badge_text', 'STANDAR KEPATUHAN & KEAMANAN REGULASI NASIONAL')}
                        </div>
                        <h3 className="text-lg sm:text-2xl font-bold text-[#0F172A] font-display">
                            {getSetting('trust_headline', 'Tersertifikasi Penuh & Siap Akreditasi Paripurna')}
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                        {trustCredentials.map((cred, i) => {
                            const Icon = cred.icon;
                            return (
                                <div
                                    key={i}
                                    className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 hover:border-blue-200 hover:bg-white transition-all flex flex-col items-center text-center space-y-2.5 group card-interactive shadow-xs"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 text-[#1E60D5] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                                        <Icon className={`w-5 h-5 ${cred.color}`} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-[#0F172A] leading-tight font-display">
                                            {cred.title}
                                        </h4>
                                        <p className="text-[10.5px] text-slate-500 font-mono mt-0.5">
                                            {cred.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 2. Spotlight 3 Core Highlights */}
            <section className="py-10 sm:py-14 bg-[#F8FAFC] border-b border-slate-200/60 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                    <div className="text-center max-w-2xl mx-auto space-y-2.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7ED] text-[#F97316] text-xs font-semibold border border-[#FFEDD5]">
                            <span>KEUNGGULAN OPERASIONAL</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                            Dirancang Menjawab Hambatan Utama Faskes
                        </h2>
                        <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed">
                            Mereduksi antrean loket pendaftaran, memotong beban administratif dokter, dan mengamankan likuiditas klaim BPJS faskes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {spotlightFeatures.map((feat, idx) => {
                            const Icon = feat.icon;
                            return (
                                <div
                                    key={idx}
                                    className="card-clinical p-6 sm:p-7 flex flex-col justify-between space-y-5 group"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="w-11 h-11 rounded-xl bg-[#EBF2FE] text-[#1E60D5] flex items-center justify-center group-hover:scale-105 transition-transform">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                                {feat.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-display leading-snug group-hover:text-[#1E60D5] transition-colors">
                                            {feat.title}
                                        </h3>

                                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                                            {feat.description}
                                        </p>
                                    </div>

                                    <div className="space-y-2 pt-4 border-t border-slate-100">
                                        {feat.highlights.map((h, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. Transformation Stories (Testimonials) */}
            <section className="py-10 sm:py-14 bg-white border-b border-slate-200/60 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-1.5 max-w-xl">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                                <span>DAMPAK NYATA FASKES</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                                Kisah Sukses Digitalisasi Faskes Mitra
                            </h2>
                        </div>

                        <button
                            type="button"
                            onClick={() => onNavigate && onNavigate('studi-kasus')}
                            className="text-xs font-semibold text-[#1E60D5] hover:underline flex items-center gap-1 cursor-pointer self-start md:self-auto font-mono btn-spring focus-ring rounded"
                        >
                            <span>Lihat Semua Studi Kasus</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, idx) => (
                            <div
                                key={idx}
                                className="card-clinical p-6 sm:p-7 flex flex-col justify-between space-y-5"
                            >
                                <div className="space-y-3.5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-amber-400">
                                            {[...Array(t.stars)].map((_, i) => (
                                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                                            ))}
                                        </div>
                                        <span className="text-[10.5px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                                            {t.metric}
                                        </span>
                                    </div>

                                    <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed italic">
                                        "{t.quote}"
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-[#EBF2FE] text-[#1E60D5] flex items-center justify-center font-bold text-xs shrink-0">
                                        {t.author.split(' ')[1]?.charAt(0) || 'D'}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-[#0F172A]">
                                            {t.author}
                                        </h4>
                                        <p className="text-[11px] text-slate-500">
                                            {t.role} • <strong className="text-slate-700">{t.hospital}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
