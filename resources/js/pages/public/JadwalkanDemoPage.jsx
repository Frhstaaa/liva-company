import React, { useState } from 'react';
import axios from 'axios';
import { useSite } from '../../context/SiteContext';
import { 
    ShieldCheck, 
    Clock, 
    ClipboardCheck, 
    HelpCircle, 
    ArrowRight, 
    CheckCircle2, 
    Calendar, 
    Lock,
    Send,
    Home,
    Sparkles,
    Activity
} from 'lucide-react';

export default function JadwalkanDemoPage({ onNavigate }) {
    const { showToast, openAssessmentModal } = useSite();

    const [formData, setFormData] = useState({
        hospital_name: '',
        hospital_type: 'RSUD Kelas B',
        bed_count: '100 - 300 Bed',
        pic_name: '',
        pic_role: 'Direktur / Kepala IT Medis',
        email: '',
        phone_whatsapp: '',
        preferred_date: '',
        preferred_time: 'Pagi (09:00 - 11:30 WIB)',
        modules_interested: ['Rekam Medis Elektronik (RME) & SOAP Dokter'],
        current_simrs_status: 'Menggunakan SIMRS lokal dan butuh migrasi SATUSEHAT',
        notes: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleCheckboxChange = (title) => {
        setFormData((prev) => {
            const exists = prev.modules_interested.includes(title);
            const updated = exists
                ? prev.modules_interested.filter((t) => t !== title)
                : [...prev.modules_interested, title];
            return { ...prev, modules_interested: updated };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        try {
            const res = await axios.post('/api/public/demo-request', formData);
            if (res.data.status === 'success') {
                setSubmitted(true);
                showToast(res.data.message || 'Permohonan demo SIMRS berhasil diajukan', 'success');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                showToast('Gagal mengirim formulir. Silakan coba lagi.', 'error');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#F8FAFC] text-[#1F2937] font-sans">
            {/* ========================================================================= */}
            {/* 1. Header Section with Hospital Image Mask & Luminous Gradient            */}
            {/* ========================================================================= */}
            <section className="relative w-full bg-gradient-to-b from-white via-[#F4F8FE] to-[#EEF5FF] pt-8 pb-16 sm:pb-20 overflow-hidden">
                {/* 1.1 Architectural Hospital Background Image Overlay */}
                <div 
                    className="absolute top-0 right-0 w-full sm:w-2/3 lg:w-1/2 h-full pointer-events-none z-0 opacity-15 bg-cover bg-no-repeat bg-right-top mix-blend-multiply"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80')`,
                        maskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 75%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 75%)'
                    }}
                />

                {/* 1.2 Bottom Left Modern Blue Geometric Accent Shape */}
                <svg 
                    className="absolute bottom-0 left-0 w-44 sm:w-64 h-28 sm:h-36 pointer-events-none z-0 opacity-90" 
                    viewBox="0 0 240 140" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M0 140 L0 80 L120 140 Z" fill="#2F8BFF" />
                    <path d="M0 140 L60 50 L180 140 Z" fill="#5BC0FF" opacity="0.6" />
                </svg>

                {/* 1.3 Bottom Right Dynamic Orange Wave Accent */}
                <svg 
                    className="absolute bottom-0 right-0 w-64 sm:w-96 h-28 sm:h-40 pointer-events-none z-0" 
                    viewBox="0 0 400 160" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path 
                        d="M400 160 L400 30 C300 60 200 110 120 160 Z" 
                        fill="url(#demo-orange-gradient)" 
                    />
                    <defs>
                        <linearGradient id="demo-orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FF9E4A" />
                            <stop offset="100%" stopColor="#FF7A00" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* 1.4 Subtle Dot Grid Matrix */}
                <div className="absolute top-8 right-16 hidden lg:grid grid-cols-8 gap-2.5 pointer-events-none opacity-25 z-0">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#2F8BFF]"></span>
                    ))}
                </div>

                {/* 1.5 Soft White Blur Fade at Bottom Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                        <button
                            type="button"
                            onClick={() => onNavigate('beranda')}
                            className="hover:text-[#2F8BFF] transition-colors flex items-center gap-1 cursor-pointer font-medium"
                        >
                            <Home className="h-3.5 w-3.5" />
                            <span>Beranda</span>
                        </button>
                        <span>/</span>
                        <span className="text-[#1F2937] font-semibold">Jadwalkan Live Demo RS</span>
                    </div>

                    <div className="max-w-3xl space-y-3.5 animate-slide-up">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[#2F8BFF] font-mono text-xs font-bold shadow-2xs">
                            <span className="w-2 h-2 rounded-full bg-[#FF8A2B] animate-pulse"></span>
                            <span>CONSULTATION &amp; CLINICAL SANDBOX</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight leading-tight font-display">
                            Jadwalkan Live Demo &amp; Assessment SIMRS
                        </h1>

                        <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed max-w-2xl">
                            Dapatkan sesi demonstrasi langsung arsitektur Liva SIMRS yang disesuaikan dengan volume pasien rumah sakit Anda, didampingi langsung oleh konsultan klinis berpengalaman.
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-slate-600 font-mono">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <span>NDA Kerahasiaan Medis Dijamin</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#2F8BFF]" />
                                <span>Respon &lt; 2 Jam Kerja</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 2. Main Form Grid Section with Smooth Top & Bottom Blur                   */}
            {/* ========================================================================= */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] py-12 sm:py-16 flex-1">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
                        
                        {/* Left Column: Agenda Details & Assessment Box */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-5 card-interactive">
                                <h2 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider font-mono border-b border-slate-100 pb-3 flex items-center gap-2">
                                    <ClipboardCheck className="w-4 h-4 text-[#2F8BFF]" />
                                    <span>Agenda Sesi Demonstrasi</span>
                                </h2>

                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3.5">
                                        <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-200 text-[#2F8BFF] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 shadow-2xs">
                                            01
                                        </div>
                                        <div>
                                            <h3 className="text-xs sm:text-[13px] font-bold text-[#1F2937]">Pemetaan Alur Pasien Eksisting</h3>
                                            <p className="text-[11px] sm:text-xs text-slate-600 leading-normal mt-0.5">
                                                Analisis titik hambatan loket antrean, poli rawat jalan, dan farmasi.
                                            </p>
                                        </div>
                                    </li>

                                    <li className="flex items-start gap-3.5">
                                        <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-200 text-[#2F8BFF] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 shadow-2xs">
                                            02
                                        </div>
                                        <div>
                                            <h3 className="text-xs sm:text-[13px] font-bold text-[#1F2937]">Simulasi Live Rekam Medis (RME)</h3>
                                            <p className="text-[11px] sm:text-xs text-slate-600 leading-normal mt-0.5">
                                                Input SOAP, EWS skor otomatis, e-resep, dan validasi TTE BSrE sah hukum.
                                            </p>
                                        </div>
                                    </li>

                                    <li className="flex items-start gap-3.5">
                                        <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-200 text-[#2F8BFF] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 shadow-2xs">
                                            03
                                        </div>
                                        <div>
                                            <h3 className="text-xs sm:text-[13px] font-bold text-[#1F2937]">Uji Bridging SATUSEHAT &amp; VClaim</h3>
                                            <p className="text-[11px] sm:text-xs text-slate-600 leading-normal mt-0.5">
                                                Verifikasi payload JSON FHIR R4 dan klaim otomatis INA-CBGs BPJS.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Quick Assessment Box - Luminous Light Card */}
                            <div className="bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 rounded-3xl p-6 text-slate-800 border border-blue-200/90 space-y-4 shadow-md card-interactive font-sans">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF4FF] text-[#2F8BFF] text-xs font-mono font-bold border border-[#CCE2FF] shadow-2xs">
                                    <HelpCircle className="w-3.5 h-3.5 text-[#2F8BFF]" />
                                    <span>SELF-ASSESSMENT TOOL</span>
                                </div>
                                <h2 className="text-sm sm:text-base font-bold text-[#1F2937] leading-snug font-display">
                                    Ingin Mengetahui Skor Kesiapan Faskes Terlebih Dahulu?
                                </h2>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Jalankan kuis 5 parameter evaluasi Permenkes No. 24/2022 dalam 2 menit bersama konsultan kami.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => openAssessmentModal()}
                                    className="w-full py-3 px-4 rounded-full bg-[#2F8BFF] hover:bg-[#1E75E6] text-white text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 btn-spring"
                                >
                                    <span>Mulai Kuis Kesiapan SIMRS</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Form Container */}
                        <div className="lg:col-span-8">
                            <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-lg">
                                {submitted ? (
                                    <div className="text-center py-12 space-y-4 animate-scale-spring">
                                        <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] font-display">
                                                Permohonan Live Demo Terkirim!
                                            </h2>
                                            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                                                Terima kasih <strong>{formData.pic_name}</strong>. Tim Liva SIMRS telah menerima permohonan demonstrasi untuk <strong>{formData.hospital_name}</strong>.
                                            </p>
                                        </div>

                                        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => onNavigate('beranda')}
                                                className="px-6 py-3 bg-[#2F8BFF] text-white rounded-full text-xs font-bold hover:bg-[#1E75E6] transition-all cursor-pointer shadow-md shadow-blue-500/20 btn-spring"
                                            >
                                                Kembali ke Beranda
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSubmitted(false)}
                                                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-full text-xs font-medium hover:bg-slate-200 transition-all cursor-pointer btn-spring"
                                            >
                                                Ajukan Demo RS Lain
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Section 1: Profil RS */}
                                        <div className="space-y-4">
                                            <h2 className="text-xs font-bold font-mono text-[#1F2937] uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                                                <span className="w-5 h-5 rounded-full bg-[#2F8BFF] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                                                Informasi Profil Rumah Sakit / Faskes
                                            </h2>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                        Nama Resmi Rumah Sakit / Faskes <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.hospital_name}
                                                        onChange={(e) => setFormData({ ...formData, hospital_name: e.target.value })}
                                                        placeholder="Contoh: RSUD Sehat Terpadu"
                                                        className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 bg-white text-xs sm:text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all shadow-2xs"
                                                    />
                                                    {errors.hospital_name && (
                                                        <span className="text-[11px] text-rose-500 mt-1 block">{errors.hospital_name[0]}</span>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                        Tipe / Kelas Rumah Sakit <span className="text-rose-500">*</span>
                                                    </label>
                                                    <select
                                                        value={formData.hospital_type}
                                                        onChange={(e) => setFormData({ ...formData, hospital_type: e.target.value })}
                                                        className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 bg-white text-xs sm:text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all shadow-2xs"
                                                    >
                                                        <option value="RSUD Kelas A">RSUD Kelas A (Pendidikan)</option>
                                                        <option value="RSUD Kelas B">RSUD Kelas B (Regional / BLUD)</option>
                                                        <option value="RSUD Kelas C / D">RSUD Kelas C / D</option>
                                                        <option value="RS Swasta Tipe B / C">RS Swasta Tipe B / C</option>
                                                        <option value="RS Khusus (RSIA / Bedah / Mata / Jantung)">RS Khusus (RSIA / Mata / Jiwa)</option>
                                                        <option value="Klinik Utama / Jejaring Faskes">Klinik Utama / Puskesmas</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                        Kapasitas Tempat Tidur (TT)
                                                    </label>
                                                    <select
                                                        value={formData.bed_count}
                                                        onChange={(e) => setFormData({ ...formData, bed_count: e.target.value })}
                                                        className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 bg-white text-xs sm:text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all shadow-2xs"
                                                    >
                                                        <option value="< 50 Bed">&lt; 50 Tempat Tidur</option>
                                                        <option value="50 - 100 Bed">50 - 100 Tempat Tidur</option>
                                                        <option value="100 - 300 Bed">100 - 300 Tempat Tidur</option>
                                                        <option value="300 - 500 Bed">300 - 500 Tempat Tidur</option>
                                                        <option value="> 500 Bed">&gt; 500 Tempat Tidur</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                        Status SIMRS Saat Ini
                                                    </label>
                                                    <select
                                                        value={formData.current_simrs_status}
                                                        onChange={(e) => setFormData({ ...formData, current_simrs_status: e.target.value })}
                                                        className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 bg-white text-xs sm:text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all shadow-2xs"
                                                    >
                                                        <option value="Masih manual / kertas & Excel">Masih Manual / Kertas &amp; Excel</option>
                                                        <option value="Menggunakan SIMRS lokal dan butuh migrasi SATUSEHAT">SIMRS Lokal (Butuh SATUSEHAT)</option>
                                                        <option value="Mencari pengganti vendor SIMRS lama yang sering down">Mencari Pengganti Vendor Lama</option>
                                                        <option value="Faskes / Rumah Sakit Baru yang sedang persiapan Go-Live">Rumah Sakit Baru (Persiapan Go-Live)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section 2: Data PIC */}
                                        <div className="space-y-4">
                                            <h2 className="text-xs font-bold font-mono text-[#1F2937] uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                                                <span className="w-5 h-5 rounded-full bg-[#2F8BFF] text-white text-[10px] flex items-center justify-center font-bold">2</span>
                                                Data Penanggung Jawab / PIC Teknis
                                            </h2>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                        Nama Lengkap &amp; Gelar <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.pic_name}
                                                        onChange={(e) => setFormData({ ...formData, pic_name: e.target.value })}
                                                        placeholder="dr. Ahmad Santoso, Sp.A / MARS"
                                                        className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 bg-white text-xs sm:text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all shadow-2xs"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                        Jabatan / Komite <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.pic_role}
                                                        onChange={(e) => setFormData({ ...formData, pic_role: e.target.value })}
                                                        placeholder="Direktur Yanmed / Kabid IT"
                                                        className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 bg-white text-xs sm:text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all shadow-2xs"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                        Alamat Email Resmi <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        placeholder="ahmad@rsud-sehat.go.id"
                                                        className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 bg-white text-xs sm:text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all shadow-2xs"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                        Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        value={formData.phone_whatsapp}
                                                        onChange={(e) => setFormData({ ...formData, phone_whatsapp: e.target.value })}
                                                        placeholder="081234567890"
                                                        className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 bg-white text-xs sm:text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all shadow-2xs"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section 3: Modul Prioritas */}
                                        <div className="space-y-3.5">
                                            <label className="block text-xs font-semibold text-slate-700">
                                                Modul Prioritas untuk Demonstrasi Langsung:
                                            </label>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {[
                                                    'Anjungan Pendaftaran Mandiri (APM) & Antrean BPJS',
                                                    'Rekam Medis Elektronik (RME) & SOAP Dokter',
                                                    'Farmasi, Depo & E-Prescription Otomatis',
                                                    'Rawat Inap, EWS & CPPT Terpadu',
                                                    'Laboratorium (LIS) & Radiologi PACS DICOM',
                                                    'Kasir, Billing & Pre-validasi INA-CBGs',
                                                ].map((modTitle) => {
                                                    const checked = formData.modules_interested.includes(modTitle);
                                                    return (
                                                        <label
                                                            key={modTitle}
                                                            className={`flex items-start gap-3 p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                                                                checked
                                                                    ? 'bg-blue-50/80 border-[#2F8BFF] text-[#1F2937] font-semibold shadow-xs'
                                                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                                            }`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={checked}
                                                                onChange={() => handleCheckboxChange(modTitle)}
                                                                className="mt-0.5 rounded text-[#2F8BFF] focus:ring-[#2F8BFF] cursor-pointer"
                                                            />
                                                            <span className="leading-snug">{modTitle}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Submit CTA */}
                                        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                                            <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                                                <Lock className="w-3.5 h-3.5 text-slate-400" />
                                                <span>Terenkripsi &amp; Sesuai UU Perlindungan Data Pribadi (PDP)</span>
                                            </span>

                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full sm:w-auto px-8 py-3.5 bg-[#2F8BFF] hover:bg-[#1E75E6] text-white rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2.5 btn-spring"
                                            >
                                                {submitting ? (
                                                    <>
                                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                        <span>Memproses...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Calendar className="w-4 h-4" />
                                                        <span>Kirim Pengajuan Demo RS</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
