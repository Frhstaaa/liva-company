import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSite } from '../context/SiteContext';
import {
    X,
    CheckCircle2,
    Hospital,
    User,
    Mail,
    Phone,
    Calendar,
    Sparkles,
    Send,
    Lock
} from 'lucide-react';

export default function DemoModal() {
    const { demoModalOpen, closeDemoModal, demoPreselectedModule, siteData, showToast } = useSite();

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
        modules_interested: [],
        current_simrs_status: 'Menggunakan SIMRS lokal dan butuh migrasi SATUSEHAT',
        notes: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (demoPreselectedModule) {
            setFormData((prev) => ({
                ...prev,
                modules_interested: Array.from(new Set([...prev.modules_interested, demoPreselectedModule])),
            }));
        }
    }, [demoPreselectedModule]);

    if (!demoModalOpen) return null;

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
                showToast(res.data.message || 'Jadwal demo berhasil diajukan', 'success');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                showToast('Gagal mengajukan demo. Silakan periksa koneksi internet Anda.', 'error');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleResetAndClose = () => {
        setSubmitted(false);
        setFormData({
            hospital_name: '',
            hospital_type: 'RSUD Kelas B',
            bed_count: '100 - 300 Bed',
            pic_name: '',
            pic_role: 'Direktur / Kepala IT Medis',
            email: '',
            phone_whatsapp: '',
            preferred_date: '',
            preferred_time: 'Pagi (09:00 - 11:30 WIB)',
            modules_interested: [],
            current_simrs_status: 'Menggunakan SIMRS lokal dan butuh migrasi SATUSEHAT',
            notes: '',
        });
        closeDemoModal();
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-md overflow-y-auto animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
        >
            <div className="relative w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4 max-h-[92vh] flex flex-col font-sans animate-scale-in">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/40 border-b border-slate-200/80 p-4 sm:p-5 text-[#0F172A] relative shrink-0">
                    <button
                        onClick={handleResetAndClose}
                        className="absolute top-3.5 right-3.5 w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80 btn-spring focus-ring"
                        aria-label="Tutup jendela demo"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF2FE] border border-[#C5DCFE] text-[10px] font-mono font-bold text-[#1E60D5] mb-1.5 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse"></span>
                        <span>CLINICAL CONSULTATION &amp; SIMULATION</span>
                    </div>
                    <h3 id="demo-modal-title" className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0F172A] font-display">
                        Jadwalkan Live Demo SIMRS Cloud
                    </h3>
                    <p className="text-slate-600 text-xs mt-0.5 max-w-xl leading-relaxed">
                        Saksikan demonstrasi alur kerja RME SOAP, Farmasi, EWS, dan bridging SATUSEHAT Kemenkes &amp; BPJS VClaim.
                    </p>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5 md:p-6 overflow-y-auto flex-1 text-[#0F172A] bg-white">
                    {submitted ? (
                        <div className="text-center py-8 space-y-3.5 animate-scale-in">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                            </div>
                            <h4 className="text-lg sm:text-xl font-bold text-[#0F172A] font-display">
                                Permintaan Demo Berhasil Dikirim!
                            </h4>
                            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                                Terima kasih <strong>{formData.pic_name}</strong>. Tim spesialis implementasi rumah sakit dari <strong>Liva SIMRS</strong> akan segera menghubungi Anda di <strong>{formData.phone_whatsapp}</strong> untuk jadwal demonstrasi.
                            </p>
                            <div className="pt-2">
                                <button
                                    onClick={handleResetAndClose}
                                    className="px-6 py-2.5 bg-[#1E60D5] hover:bg-[#164DB0] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer btn-spring focus-ring"
                                >
                                    Selesai &amp; Tutup
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Section 1: Profil Rumah Sakit */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-[#0F172A] uppercase font-mono tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                                    <Hospital className="h-4 w-4 text-[#1E60D5]" />
                                    1. Informasi Rumah Sakit / Faskes
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label htmlFor="modal_hospital_name" className="block text-xs font-semibold text-slate-700 mb-1">
                                            Nama Rumah Sakit / Faskes <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="modal_hospital_name"
                                            type="text"
                                            required
                                            aria-required="true"
                                            value={formData.hospital_name}
                                            onChange={(e) => setFormData({ ...formData, hospital_name: e.target.value })}
                                            placeholder="Contoh: RSUD Sehat Terpadu"
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all focus-ring shadow-2xs"
                                        />
                                        {errors.hospital_name && (
                                            <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.hospital_name[0]}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="modal_hospital_type" className="block text-xs font-semibold text-slate-700 mb-1">
                                            Tipe / Kelas Rumah Sakit <span className="text-rose-500">*</span>
                                        </label>
                                        <select
                                            id="modal_hospital_type"
                                            value={formData.hospital_type}
                                            onChange={(e) => setFormData({ ...formData, hospital_type: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all focus-ring shadow-2xs"
                                        >
                                            <option value="RSUD Kelas A">RSUD Kelas A (Pendidikan)</option>
                                            <option value="RSUD Kelas B">RSUD Kelas B</option>
                                            <option value="RSUD Kelas C / D">RSUD Kelas C / D</option>
                                            <option value="RS Swasta Tipe B / C">RS Swasta Tipe B / C</option>
                                            <option value="RS Khusus (RSIA / Bedah / Mata / Jantung)">RS Khusus (RSIA / Bedah / Mata)</option>
                                            <option value="Klinik Utama / Jejaring Faskes">Klinik Utama / Puskesmas</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label htmlFor="modal_bed_count" className="block text-xs font-semibold text-slate-700 mb-1">
                                            Jumlah Tempat Tidur
                                        </label>
                                        <select
                                            id="modal_bed_count"
                                            value={formData.bed_count}
                                            onChange={(e) => setFormData({ ...formData, bed_count: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all focus-ring shadow-2xs"
                                        >
                                            <option value="< 50 Bed">&lt; 50 Bed</option>
                                            <option value="50 - 100 Bed">50 - 100 Bed</option>
                                            <option value="100 - 300 Bed">100 - 300 Bed</option>
                                            <option value="300 - 500 Bed">300 - 500 Bed</option>
                                            <option value="> 500 Bed">&gt; 500 Bed</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="modal_current_simrs" className="block text-xs font-semibold text-slate-700 mb-1">
                                            Status SIMRS Saat Ini
                                        </label>
                                        <select
                                            id="modal_current_simrs"
                                            value={formData.current_simrs_status}
                                            onChange={(e) => setFormData({ ...formData, current_simrs_status: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all focus-ring shadow-2xs"
                                        >
                                            <option value="Masih manual / kertas & Excel">Masih Manual Kertas &amp; Excel</option>
                                            <option value="Menggunakan SIMRS lokal dan butuh migrasi SATUSEHAT">SIMRS Lokal (Butuh SATUSEHAT)</option>
                                            <option value="Mencari pengganti vendor SIMRS lama yang sering down">Mencari Pengganti Vendor Lama</option>
                                            <option value="Faskes / Rumah Sakit Baru yang sedang persiapan Go-Live">Rumah Sakit Baru (Persiapan Opening)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Data PIC */}
                            <div className="space-y-3 pt-1">
                                <h4 className="text-xs font-bold text-[#0F172A] uppercase font-mono tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                                    <User className="h-4 w-4 text-[#1E60D5]" />
                                    2. Data Penanggung Jawab / Pemohon
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label htmlFor="modal_pic_name" className="block text-xs font-semibold text-slate-700 mb-1">
                                            Nama Lengkap &amp; Gelar <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="modal_pic_name"
                                            type="text"
                                            required
                                            aria-required="true"
                                            value={formData.pic_name}
                                            onChange={(e) => setFormData({ ...formData, pic_name: e.target.value })}
                                            placeholder="Contoh: dr. Bambang H., Sp.A"
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all focus-ring shadow-2xs"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="modal_pic_role" className="block text-xs font-semibold text-slate-700 mb-1">
                                            Jabatan di Rumah Sakit <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="modal_pic_role"
                                            type="text"
                                            required
                                            aria-required="true"
                                            value={formData.pic_role}
                                            onChange={(e) => setFormData({ ...formData, pic_role: e.target.value })}
                                            placeholder="Direktur / Ka. IT / Komite Medis"
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all focus-ring shadow-2xs"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label htmlFor="modal_email" className="block text-xs font-semibold text-slate-700 mb-1">
                                            Alamat Email Resmi <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="modal_email"
                                            type="email"
                                            required
                                            aria-required="true"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="nama@rsud.go.id"
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all focus-ring shadow-2xs"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="modal_phone" className="block text-xs font-semibold text-slate-700 mb-1">
                                            Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="modal_phone"
                                            type="tel"
                                            required
                                            aria-required="true"
                                            value={formData.phone_whatsapp}
                                            onChange={(e) => setFormData({ ...formData, phone_whatsapp: e.target.value })}
                                            placeholder="081234567890"
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E60D5] focus:border-[#1E60D5] transition-all focus-ring shadow-2xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Modul yang Diminati */}
                            <div className="space-y-2 pt-1">
                                <span className="block text-xs font-semibold text-slate-700">
                                    Modul Prioritas untuk Sesi Demo:
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                    {[
                                        'Anjungan Pendaftaran Mandiri (APM) & Antrean BPJS',
                                        'Rekam Medis Elektronik (RME) & SOAP Dokter',
                                        'Farmasi, Depo & E-Prescription Otomatis',
                                        'Rawat Inap, EWS & CPPT Terpadu',
                                        'Laboratorium (LIS) & Radiologi PACS DICOM',
                                        'Kasir, Billing & Pre-validasi INA-CBGs',
                                    ].map((moduleTitle, idx) => {
                                        const checked = formData.modules_interested.includes(moduleTitle);
                                        const modId = `modal_mod_${idx}`;
                                        return (
                                            <label
                                                key={moduleTitle}
                                                htmlFor={modId}
                                                className={`flex items-start gap-2 p-2 rounded-xl border text-xs cursor-pointer transition-all duration-150 ${
                                                    checked
                                                        ? 'bg-blue-50/80 border-[#1E60D5] text-[#0F172A] font-semibold'
                                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                <input
                                                    id={modId}
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => handleCheckboxChange(moduleTitle)}
                                                    className="mt-0.5 rounded text-[#1E60D5] focus:ring-[#1E60D5] cursor-pointer"
                                                />
                                                <span className="leading-tight">{moduleTitle}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Submit CTA */}
                            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                                <p className="text-[11px] text-slate-500 font-mono hidden sm:flex items-center gap-1">
                                    <Lock className="h-3 w-3 text-slate-400" />
                                    <span>Data terenkripsi sesuai UU PDP.</span>
                                </p>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-[#1E60D5] hover:bg-[#164DB0] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/25 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5 btn-spring focus-ring"
                                >
                                    {submitting ? (
                                        <>
                                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            <span>Memproses...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-3.5 w-3.5" />
                                            <span>Kirim Pengajuan Demo</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
