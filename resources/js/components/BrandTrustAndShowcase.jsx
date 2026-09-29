import React from 'react';
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
    Star,
    Building,
    TrendingUp,
    Quote
} from 'lucide-react';

export default function BrandTrustAndShowcase({ onScheduleDemo, onNavigate }) {
    const trustCredentials = [
        {
            title: 'Kemenkes SATUSEHAT',
            desc: 'Native HL7 FHIR R4',
            icon: ShieldCheck,
            color: 'text-[#2F8BFF]'
        },
        {
            title: 'BPJS VClaim 2.0',
            desc: 'Antrean Online JKN',
            icon: Zap,
            color: 'text-emerald-500'
        },
        {
            title: 'ISO 27001 & PDP',
            desc: 'Enkripsi Medis AES-256',
            icon: Lock,
            color: 'text-[#FF8A2B]'
        },
        {
            title: 'TTE BSrE BSSN',
            desc: 'Tanda Tangan Sah Hukum',
            icon: FileCheck,
            color: 'text-[#5BC0FF]'
        },
        {
            title: 'STARKES Paripurna',
            desc: 'Standar Akreditasi Kemenkes',
            icon: Award,
            color: 'text-amber-400'
        }
    ];

    const spotlightFeatures = [
        {
            badge: 'EFISIENSI LOKET & ADMISI',
            title: 'Anjungan Pendaftaran Mandiri (APM) & QR Check-in',
            description: 'Pasien BPJS dan Umum dapat melakukan pendaftaran mandiri lewat kios layar sentuh atau scan QR WhatsApp dalam < 15 detik, memangkas penumpukan antrean loket hingga 70%.',
            icon: QrCode,
            highlights: ['Cetak SEP BPJS Instan', 'Sinkron Antrean Mobile JKN', 'Beban Loket Berkurang Drastis'],
            bgLight: 'bg-blue-50/50',
            borderColor: 'border-blue-200'
        },
        {
            badge: 'KESELAMATAN PASIEN & DOKTER',
            title: 'Clinical Decision Support (CDS) & RME Terpadu',
            description: 'Asesmen medis SOAP dokter dilengkapi deteksi otomatis kontraindikasi obat, alergi pasien, dan kalkulasi skor EWS (Early Warning Score) untuk respon gawat darurat yang cepat.',
            icon: Activity,
            highlights: ['Proteksi Resep Alergi', 'EWS Skor Otomatis', 'Input SOAP < 2.4 Menit'],
            bgLight: 'bg-emerald-50/50',
            borderColor: 'border-emerald-200'
        },
        {
            badge: 'ARUS KAS & KEUANGAN FASKES',
            title: 'Smart Casemix & Pre-Validasi INA-CBGs BPJS',
            description: 'Pemeriksaan otomatis kesesuaian diagnosis utama, diagnosis sekunder, dan tindakan medis sebelum berkas klaim diajukan ke verifikator BPJS untuk mencegah klaim pending atau dispute.',
            icon: FileSpreadsheet,
            highlights: ['Dispute Rate < 0.3%', 'Auto-Grouping Tarif', 'Nol Biaya Bridging Tambahan'],
            bgLight: 'bg-amber-50/50',
            borderColor: 'border-amber-200'
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
            {/* 1. Trust & Accreditation Strip (Luminous Light Theme) */}
            <section className="bg-gradient-to-b from-white via-[#EEF5FF] to-[#F8FAFC] py-14 relative overflow-hidden">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
                    <div className="text-center space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold tracking-widest uppercase shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            STANDAR KEPATUHAN &amp; KEAMANAN REGULASI NASIONAL
                        </div>
                        <h3 className="text-lg sm:text-2xl font-extrabold text-[#1F2937] font-display">
                            Tersertifikasi Penuh &amp; Siap Akreditasi Paripurna
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                        {trustCredentials.map((cred, i) => {
                            const Icon = cred.icon;
                            return (
                                <div
                                    key={i}
                                    className="p-4 rounded-3xl bg-white/95 border border-slate-200/90 hover:border-[#2F8BFF] hover:bg-blue-50/20 transition-all flex flex-col items-center text-center space-y-2.5 group card-interactive shadow-2xs"
                                >
                                    <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#2F8BFF] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                                        <Icon className={`w-5 h-5 ${cred.color}`} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-[#1F2937] leading-tight font-display">
                                            {cred.title}
                                        </h4>
                                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                                            {cred.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 2. Spotlight 3 Core Highlights with Luminous Background */}
            <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F8FAFC] via-[#EEF5FF] to-white relative overflow-hidden">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Decorative Top-Right Blue Accent */}
                <svg 
                    className="absolute top-0 right-0 w-48 sm:w-72 h-32 pointer-events-none z-0 opacity-70" 
                    viewBox="0 0 280 140" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M280 0 L100 0 L280 100 Z" fill="#2F8BFF" opacity="0.1" />
                    <path d="M280 0 L160 0 L280 60 Z" fill="#5BC0FF" opacity="0.15" />
                </svg>

                {/* Decorative Bottom-Left Orange Curve */}
                <svg 
                    className="absolute bottom-0 left-0 w-56 sm:w-80 h-28 pointer-events-none z-0" 
                    viewBox="0 0 320 120" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M0 120 L0 30 C80 50 160 90 220 120 Z" fill="#FF8A2B" opacity="0.15" />
                </svg>

                {/* Dot Matrix Grid */}
                <div className="absolute bottom-8 right-16 hidden lg:grid grid-cols-8 gap-2.5 pointer-events-none opacity-25 z-0">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#2F8BFF]"></span>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E6] text-[#FF8A2B] text-xs font-mono font-bold border border-[#FFD8BF]">
                            <span>PRODUCT EXCELLENCE</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight font-display">
                            Dirancang untuk Menjawab Hambatan Utama Operasional Faskes
                        </h2>
                        <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed">
                            Dari antrean loket pendaftaran yang padat, beban administratif dokter yang tinggi, hingga klaim BPJS yang sering tertunda.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {spotlightFeatures.map((feat, idx) => {
                            const Icon = feat.icon;
                            return (
                                <div
                                    key={idx}
                                    className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 card-interactive group"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2F8BFF] flex items-center justify-center shadow-2xs group-hover:bg-[#2F8BFF] group-hover:text-white transition-colors duration-200">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                                {feat.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-bold text-[#1F2937] font-display leading-snug group-hover:text-[#2F8BFF] transition-colors">
                                            {feat.title}
                                        </h3>

                                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                                            {feat.description}
                                        </p>
                                    </div>

                                    <div className="space-y-2.5 pt-4 border-t border-slate-100">
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

            {/* 3. Transformation Stories (Testimonials) with Luminous Gradient */}
            <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#F4F8FE] to-[#EEF5FF] relative overflow-hidden">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />
                {/* Dot Matrix Grid */}
                <div className="absolute top-8 left-12 hidden lg:grid grid-cols-8 gap-2.5 pointer-events-none opacity-25 z-0">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#2F8BFF]"></span>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-1.5 max-w-xl">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
                                <span>TESTIMONIAL &amp; DAMPAK NYATA</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight font-display">
                                Kisah Sukses Digitalisasi Faskes Bersama Liva SIMRS
                            </h2>
                        </div>

                        <button
                            onClick={() => onNavigate && onNavigate('studi-kasus')}
                            className="text-xs font-bold text-[#2F8BFF] hover:underline flex items-center gap-1 cursor-pointer self-start md:self-auto font-mono btn-spring"
                        >
                            <span>Lihat Semua Studi Kasus</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 card-interactive"
                            >
                                <div className="space-y-3.5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-amber-400">
                                            {[...Array(t.stars)].map((_, i) => (
                                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                                            {t.metric}
                                        </span>
                                    </div>

                                    <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed italic">
                                        "{t.quote}"
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2F8BFF] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                                        {t.author.split(' ')[1]?.charAt(0) || 'D'}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-[#1F2937]">
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
