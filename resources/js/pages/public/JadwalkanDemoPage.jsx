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
    Activity,
    ChevronRight
} from 'lucide-react';
import SectionWrapper from '../../components/public/SectionWrapper';
import { getSectionCustomStyles } from '../../lib/sectionStyler';

export default function JadwalkanDemoPage({ onNavigate }) {
    const { showToast, openAssessmentModal, getSetting } = useSite();

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

    const isVisible = (key, defaultVal = true) => {
        const val = getSetting(key, defaultVal);
        if (typeof val === 'boolean') return val;
        if (val === '1' || val === 'true') return true;
        if (val === '0' || val === 'false') return false;
        return defaultVal;
    };

    // Dynamic Theme Mood & Spacing Density
    const theme = getSetting('page_jadwalkan-demo_theme', 'clinical-blue');
    const density = getSetting('page_jadwalkan-demo_density', 'normal');
    const cardRadius = getSetting('page_jadwalkan-demo_card_radius', 'rounded-2xl');

    const themeClass = {
        'clinical-blue': 'bg-[#F8FAFC] text-[#0F172A]',
        'pure-white': 'bg-white text-[#0F172A]',
        'dark-slate': 'bg-[#0B1120] text-slate-100',
        'emerald-health': 'bg-[#F0FDF4]/40 text-[#064E3B]',
        'indigo-luxury': 'bg-[#F5F3FF]/40 text-[#1E1B4B]',
    }[theme] || 'bg-[#F8FAFC] text-[#0F172A]';

    const pyDensity = {
        compact: 'py-6 sm:py-8',
        normal: 'py-8 sm:py-12',
        spacious: 'py-12 sm:py-16',
    }[density] || 'py-8 sm:py-12';

    // Parse Dynamic Section Order
    const rawOrder = getSetting('page_jadwalkan-demo_section_order');
    let orderedKeys = ['hero', 'form_grid', 'guarantee', 'faq_help'];

    if (rawOrder) {
        try {
            const parsed = typeof rawOrder === 'string' ? JSON.parse(rawOrder) : rawOrder;
            if (Array.isArray(parsed) && parsed.length > 0) {
                orderedKeys = parsed.filter(item => item.visible !== false).map(item => item.id);
            }
        } catch (e) {
            // fallback
        }
    }

    const heroStyles = getSectionCustomStyles(getSetting, 'jadwalkan-demo', 'hero', {
        title: getSetting('page_demo_title', 'Jadwalkan Live Demo & Assessment SIMRS'),
        badge: getSetting('page_demo_badge', 'CONSULTATION & CLINICAL SANDBOX'),
        description: getSetting('page_demo_subtitle', 'Dapatkan sesi demonstrasi langsung arsitektur Liva SIMRS yang disesuaikan dengan volume pasien rumah sakit Anda, didampingi langsung oleh konsultan klinis berpengalaman.')
    });

    const renderHero = () => (
        <section key="hero" className={`relative w-full pt-6 pb-10 sm:pb-12 overflow-hidden border-b border-slate-200/70 ${heroStyles.bgClasses}`} style={heroStyles.bgStyle}>
            {/* Architectural Hospital Background Image Overlay */}
            {heroStyles.showImage && (
                <div 
                    className="absolute top-0 right-0 w-full sm:w-2/3 lg:w-1/2 h-full pointer-events-none z-0 opacity-12 bg-cover bg-no-repeat bg-right-top mix-blend-multiply"
                    style={{
                        backgroundImage: `url('${heroStyles.imageUrl || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80"}')`,
                        maskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 80%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at top right, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 80%)'
                    }}
                />
            )}

            {/* Clean Ambiance Accents */}
            {heroStyles.showAmbientGlow && (
                <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                        background: 'radial-gradient(ellipse 60% 50% at 75% 0%, rgba(30,96,213,0.15) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 25% 100%, rgba(249,115,22,0.05) 0%, transparent 70%)'
                    }}
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
                {/* Accessible Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                    <button
                        type="button"
                        onClick={() => onNavigate('beranda')}
                        className="hover:text-[#1E60D5] transition-colors flex items-center gap-1 cursor-pointer font-medium focus-ring rounded"
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span>Beranda</span>
                    </button>
                    <ChevronRight className="h-3 w-3 text-slate-400" />
                    <span className="text-[#0F172A] font-semibold">Jadwalkan Live Demo RS</span>
                </nav>

                <div className="max-w-3xl space-y-4 animate-slide-up">
                    {heroStyles.showBadge && (
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] border border-[#C5DCFE] text-[#1E60D5] font-mono text-xs font-bold shadow-2xs">
                            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
                            <span>{heroStyles.badge}</span>
                        </div>
                    )}

                    <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight font-display ${heroStyles.textColor}`}>
                        {heroStyles.title}
                    </h1>

                    <p className={`text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-2xl ${heroStyles.textMutedColor}`}>
                        {heroStyles.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-slate-600 font-mono">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>NDA Kerahasiaan Medis Dijamin</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" style={{ color: heroStyles.accentColor }} />
                            <span>Respon &lt; 2 Jam Kerja</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    const renderFormGrid = () => (
        <section key="form_grid" className={`relative overflow-hidden bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] ${pyDensity} flex-1`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className={`card-clinical p-6 sm:p-8 ${cardRadius}`}>
                    {submitted ? (
                        <div className="text-center py-12 space-y-4 animate-scale-in">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display">
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
                                    className="px-6 py-3 bg-[#1E60D5] text-white rounded-xl text-xs font-bold hover:bg-[#164DB0] transition-all cursor-pointer shadow-md shadow-blue-600/20 btn-spring focus-ring"
                                >
                                    Kembali ke Beranda
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-medium hover:bg-slate-200 transition-all cursor-pointer btn-spring focus-ring"
                                >
                                    Ajukan Demo RS Lain
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Section 1: Profil RS */}
                            <div className="space-y-4">
                                <h2 className="text-xs font-bold font-mono text-[#0F172A] uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                                    <span className="w-5 h-5 rounded-full bg-[#1E60D5] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                                    Informasi Profil Rumah Sakit / Faskes
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="hospital_name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Nama Resmi Rumah Sakit / Faskes <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="hospital_name"
                                            type="text"
                                            required
                                            aria-required="true"
                                            aria-invalid={!!errors.hospital_name}
                                            value={formData.hospital_name}
                                            onChange={(e) => setFormData({ ...formData, hospital_name: e.target.value })}
                                            placeholder="Contoh: RSUD Sehat Terpadu"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all shadow-2xs focus-ring"
                                        />
                                        {errors.hospital_name && (
                                            <span className="text-[11px] text-rose-500 mt-1 block">{errors.hospital_name[0]}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="hospital_type" className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Tipe / Kelas Rumah Sakit <span className="text-rose-500">*</span>
                                        </label>
                                        <select
                                            id="hospital_type"
                                            value={formData.hospital_type}
                                            onChange={(e) => setFormData({ ...formData, hospital_type: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all shadow-2xs focus-ring"
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
                                        <label htmlFor="bed_count" className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Kapasitas Tempat Tidur (TT)
                                        </label>
                                        <select
                                            id="bed_count"
                                            value={formData.bed_count}
                                            onChange={(e) => setFormData({ ...formData, bed_count: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all shadow-2xs focus-ring"
                                        >
                                            <option value="< 50 Bed">&lt; 50 Tempat Tidur</option>
                                            <option value="50 - 100 Bed">50 - 100 Tempat Tidur</option>
                                            <option value="100 - 300 Bed">100 - 300 Tempat Tidur</option>
                                            <option value="300 - 500 Bed">300 - 500 Tempat Tidur</option>
                                            <option value="> 500 Bed">&gt; 500 Tempat Tidur</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="current_simrs_status" className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Status SIMRS Saat Ini
                                        </label>
                                        <select
                                            id="current_simrs_status"
                                            value={formData.current_simrs_status}
                                            onChange={(e) => setFormData({ ...formData, current_simrs_status: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all shadow-2xs focus-ring"
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
                                <h2 className="text-xs font-bold font-mono text-[#0F172A] uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                                    <span className="w-5 h-5 rounded-full bg-[#1E60D5] text-white text-[10px] flex items-center justify-center font-bold">2</span>
                                    Data Penanggung Jawab / PIC Teknis
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="pic_name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Nama Lengkap &amp; Gelar <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="pic_name"
                                            type="text"
                                            required
                                            aria-required="true"
                                            value={formData.pic_name}
                                            onChange={(e) => setFormData({ ...formData, pic_name: e.target.value })}
                                            placeholder="dr. Ahmad Santoso, Sp.A / MARS"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all shadow-2xs focus-ring"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="pic_role" className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Jabatan / Komite <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="pic_role"
                                            type="text"
                                            required
                                            aria-required="true"
                                            value={formData.pic_role}
                                            onChange={(e) => setFormData({ ...formData, pic_role: e.target.value })}
                                            placeholder="Direktur Yanmed / Kabid IT"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all shadow-2xs focus-ring"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Alamat Email Resmi <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            aria-required="true"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="ahmad@rsud-sehat.go.id"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all shadow-2xs focus-ring"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone_whatsapp" className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="phone_whatsapp"
                                            type="tel"
                                            required
                                            aria-required="true"
                                            value={formData.phone_whatsapp}
                                            onChange={(e) => setFormData({ ...formData, phone_whatsapp: e.target.value })}
                                            placeholder="081234567890"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all shadow-2xs focus-ring"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Modul Prioritas */}
                            <div className="space-y-3.5">
                                <span className="block text-xs font-semibold text-slate-700">
                                    Modul Prioritas untuk Demonstrasi Langsung:
                                </span>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        'Anjungan Pendaftaran Mandiri (APM) & Antrean BPJS',
                                        'Rekam Medis Elektronik (RME) & SOAP Dokter',
                                        'Farmasi, Depo & E-Prescription Otomatis',
                                        'Rawat Inap, EWS & CPPT Terpadu',
                                        'Laboratorium (LIS) & Radiologi PACS DICOM',
                                        'Kasir, Billing & Pre-validasi INA-CBGs',
                                    ].map((modTitle, i) => {
                                        const checked = formData.modules_interested.includes(modTitle);
                                        const checkboxId = `module_check_${i}`;
                                        return (
                                            <label
                                                key={modTitle}
                                                htmlFor={checkboxId}
                                                className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                                                    checked
                                                        ? 'bg-blue-50/80 border-[#1E60D5] text-[#0F172A] font-semibold shadow-xs'
                                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                <input
                                                    id={checkboxId}
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => handleCheckboxChange(modTitle)}
                                                    className="mt-0.5 rounded text-[#1E60D5] focus:ring-[#1E60D5] cursor-pointer"
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
                                    className="w-full sm:w-auto px-8 py-3.5 bg-[#1E60D5] hover:bg-[#164DB0] text-white rounded-xl text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2.5 btn-spring focus-ring"
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
        </section>
    );

    const renderGuarantee = () => (
        <section key="guarantee" className={`${pyDensity} bg-white border-t border-slate-200/80`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className={`card-clinical p-6 sm:p-7 space-y-5 ${cardRadius}`}>
                    <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-mono border-b border-slate-100 pb-3 flex items-center gap-2">
                        <ClipboardCheck className="w-4 h-4 text-[#1E60D5]" />
                        <span>Agenda 3 Tahapan Sesi Demonstrasi Klinis</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="flex items-start gap-3.5">
                            <div className="w-8 h-8 rounded-xl bg-[#EBF2FE] border border-[#C5DCFE] text-[#1E60D5] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 shadow-2xs">
                                01
                            </div>
                            <div>
                                <h3 className="text-xs sm:text-[13px] font-bold text-[#0F172A]">Pemetaan Alur Pasien Eksisting</h3>
                                <p className="text-[11px] sm:text-xs text-slate-600 leading-normal mt-0.5">
                                    Analisis titik hambatan loket antrean, poli rawat jalan, dan instalasi farmasi.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5">
                            <div className="w-8 h-8 rounded-xl bg-[#EBF2FE] border border-[#C5DCFE] text-[#1E60D5] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 shadow-2xs">
                                02
                            </div>
                            <div>
                                <h3 className="text-xs sm:text-[13px] font-bold text-[#0F172A]">Simulasi Live Rekam Medis (RME)</h3>
                                <p className="text-[11px] sm:text-xs text-slate-600 leading-normal mt-0.5">
                                    Input SOAP, EWS skor otomatis, e-resep, dan validasi TTE BSrE sah hukum peradilan.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5">
                            <div className="w-8 h-8 rounded-xl bg-[#EBF2FE] border border-[#C5DCFE] text-[#1E60D5] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 shadow-2xs">
                                03
                            </div>
                            <div>
                                <h3 className="text-xs sm:text-[13px] font-bold text-[#0F172A]">Uji Bridging SATUSEHAT &amp; VClaim</h3>
                                <p className="text-[11px] sm:text-xs text-slate-600 leading-normal mt-0.5">
                                    Verifikasi payload JSON FHIR R4 dan klaim otomatis INA-CBGs BPJS tanpa dispute.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    const renderFaqHelp = () => (
        <section key="faq_help" className={`${pyDensity} bg-gradient-to-br from-blue-50/70 via-white to-blue-50/30 border-t border-slate-200/80`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] text-[#1E60D5] text-xs font-mono font-bold border border-[#C5DCFE] shadow-2xs">
                    <HelpCircle className="w-3.5 h-3.5 text-[#1E60D5]" />
                    <span>SELF-ASSESSMENT TOOL &amp; BANTUAN</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display">
                    Ingin Mengetahui Skor Kesiapan Faskes Terlebih Dahulu?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                    Jalankan kuis 5 parameter evaluasi Permenkes No. 24/2022 dalam 2 menit bersama konsultan klinis kami sebelum sesi live demo berlangsung.
                </p>
                <div className="pt-2">
                    <button
                        type="button"
                        onClick={() => openAssessmentModal()}
                        className="py-3 px-6 rounded-xl bg-[#1E60D5] hover:bg-[#164DB0] text-white text-xs font-bold tracking-wide transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 btn-spring focus-ring"
                    >
                        <span>Mulai Kuis Kesiapan SIMRS (2 Menit)</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );

    const sectionRenderers = {
        hero: renderHero,
        form_grid: renderFormGrid,
        guarantee: renderGuarantee,
        faq_help: renderFaqHelp,
    };

    return (
        <div className={`flex flex-col w-full min-h-screen ${themeClass} font-sans transition-colors duration-300`}>
            {orderedKeys.map((key) => {
                const renderer = sectionRenderers[key];
                if (!renderer) return null;
                if (key === 'hero') return renderer();
                return (
                    <SectionWrapper key={key} pageId="jadwalkan-demo" secId={key} showContainer={false}>
                        {renderer()}
                    </SectionWrapper>
                );
            })}
        </div>
    );
}
