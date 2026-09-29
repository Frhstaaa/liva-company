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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
            <div className="relative w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4 max-h-[92vh] flex flex-col font-sans animate-scale-in">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/40 border-b border-slate-200 p-4 sm:p-5 text-[#1F2937] relative shrink-0">
                    <button
                        onClick={handleResetAndClose}
                        className="absolute top-3.5 right-3.5 w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 btn-spring"
                        aria-label="Tutup"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[10px] font-mono font-bold text-[#2F8BFF] mb-1.5 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A2B] animate-pulse"></span>
                        <span>CLINICAL CONSULTATION &amp; SIMULATION</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#1F2937] font-display">
                        Jadwalkan Live Demo SIMRS Cloud
                    </h3>
                    <p className="text-slate-600 text-xs mt-0.5 max-w-xl leading-relaxed">
                        Saksikan demonstrasi alur kerja RME SOAP, Farmasi, EWS, dan bridging SATUSEHAT Kemenkes &amp; BPJS VClaim.
                    </p>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5 md:p-6 overflow-y-auto flex-1 text-[#1F2937] bg-white">
                    {submitted ? (
                        <div className="text-center py-6 space-y-3 animate-scale-in">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-2xs">
                                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                            </div>
                            <h4 className="text-lg font-bold text-[#1F2937] font-display">
                                Permintaan Demo Berhasil Dikirim!
                            </h4>
                            <p className="text-slate-600 text-xs max-w-md mx-auto leading-relaxed">
                                Terima kasih <strong>{formData.pic_name}</strong>. Tim spesialis implementasi rumah sakit dari <strong>Liva SIMRS</strong> akan segera menghubungi Anda di <strong>{formData.phone_whatsapp}</strong> untuk jadwal demonstrasi.
                            </p>
                            <div className="pt-2">
                                <button
                                    onClick={handleResetAndClose}
                                    className="px-5 py-2 bg-[#2F8BFF] hover:bg-[#1E75E6] text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer btn-spring"
                                >
                                    Selesai &amp; Tutup
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Section 1: Profil Rumah Sakit */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-[#1F2937] uppercase font-mono tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                                    <Hospital className="h-4 w-4 text-[#2F8BFF]" />
                                    1. Informasi Rumah Sakit / Faskes
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Nama Rumah Sakit / Faskes <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.hospital_name}
                                            onChange={(e) => setFormData({ ...formData, hospital_name: e.target.value })}
                                            placeholder="Contoh: RSUD Sehat Terpadu"
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all"
                                        />
                                        {errors.hospital_name && (
                                            <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.hospital_name[0]}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Tipe / Kelas Rumah Sakit <span className="text-rose-500">*</span>
                                        </label>
                                        <select
                                            value={formData.hospital_type}
                                            onChange={(e) => setFormData({ ...formData, hospital_type: e.target.value })}
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all"
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
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Jumlah Tempat Tidur
                                        </label>
                                        <select
                                            value={formData.bed_count}
                                            onChange={(e) => setFormData({ ...formData, bed_count: e.target.value })}
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all"
                                        >
                                            <option value="< 50 Bed">&lt; 50 Bed</option>
                                            <option value="50 - 100 Bed">50 - 100 Bed</option>
                                            <option value="100 - 300 Bed">100 - 300 Bed</option>
                                            <option value="300 - 500 Bed">300 - 500 Bed</option>
                                            <option value="> 500 Bed">&gt; 500 Bed</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Status SIMRS Saat Ini
                                        </label>
                                        <select
                                            value={formData.current_simrs_status}
                                            onChange={(e) => setFormData({ ...formData, current_simrs_status: e.target.value })}
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all"
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
                                <h4 className="text-xs font-bold text-[#1F2937] uppercase font-mono tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                                    <User className="h-4 w-4 text-[#2F8BFF]" />
                                    2. Data Penanggung Jawab / Pemohon
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Nama Lengkap &amp; Gelar <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.pic_name}
                                            onChange={(e) => setFormData({ ...formData, pic_name: e.target.value })}
                                            placeholder="Contoh: dr. Bambang H., Sp.A"
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Jabatan di Rumah Sakit <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.pic_role}
                                            onChange={(e) => setFormData({ ...formData, pic_role: e.target.value })}
                                            placeholder="Direktur / Ka. IT / Komite Medis"
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Alamat Email Resmi <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="nama@rsud.go.id"
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone_whatsapp}
                                            onChange={(e) => setFormData({ ...formData, phone_whatsapp: e.target.value })}
                                            placeholder="081234567890"
                                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Modul yang Diminati */}
                            <div className="space-y-2 pt-1">
                                <label className="block text-xs font-semibold text-slate-700">
                                    Modul Prioritas untuk Sesi Demo:
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                    {[
                                        'Anjungan Pendaftaran Mandiri (APM) & Antrean BPJS',
                                        'Rekam Medis Elektronik (RME) & SOAP Dokter',
                                        'Farmasi, Depo & E-Prescription Otomatis',
                                        'Rawat Inap, EWS & CPPT Terpadu',
                                        'Laboratorium (LIS) & Radiologi PACS DICOM',
                                        'Kasir, Billing & Pre-validasi INA-CBGs',
                                    ].map((moduleTitle) => {
                                        const checked = formData.modules_interested.includes(moduleTitle);
                                        return (
                                            <label
                                                key={moduleTitle}
                                                className={`flex items-start gap-1.5 p-2 rounded-lg border text-xs cursor-pointer transition-all duration-150 ${
                                                    checked
                                                        ? 'bg-blue-50 border-[#2F8BFF] text-[#1F2937] font-semibold'
                                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => handleCheckboxChange(moduleTitle)}
                                                    className="mt-0.5 rounded text-[#2F8BFF] focus:ring-[#2F8BFF]"
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
                                    className="w-full sm:w-auto px-5 py-2 bg-[#2F8BFF] hover:bg-[#1E75E6] text-white rounded-lg text-xs font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5 btn-spring"
                                >
                                    {submitting ? (
                                        <>
                                            <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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
