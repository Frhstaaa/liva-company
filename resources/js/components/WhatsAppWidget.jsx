import React, { useState, useEffect } from 'react';
import { 
    MessageCircle, 
    X, 
    Send, 
    Sparkles, 
    ShieldCheck, 
    Phone, 
    Building2, 
    Stethoscope, 
    Activity, 
    ChevronRight,
    Headphones
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function WhatsAppWidget() {
    const { getSetting } = useSite();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('demo');
    const [hospitalName, setHospitalName] = useState('');
    const [picName, setPicName] = useState('');

    const rawPhone = getSetting('contact_phone', '6281280625599');
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '');

    const topics = [
        {
            id: 'demo',
            label: 'Jadwalkan Live Demo & Uji Coba SIMRS',
            icon: Sparkles,
            color: 'text-[#2F8BFF] bg-blue-50',
            template: 'Halo Tim Konsultan Liva SIMRS, saya ingin menjadwalkan presentasi dan live demo sistem untuk fasyankes kami.'
        },
        {
            id: 'satusehat',
            label: 'Konsultasi Integrasi SATUSEHAT & BPJS',
            icon: ShieldCheck,
            color: 'text-emerald-600 bg-emerald-50',
            template: 'Halo Liva SIMRS, saya ingin konsultasi teknis terkait bridging SATUSEHAT Kemenkes (FHIR R4) dan BPJS VClaim 2.0.'
        },
        {
            id: 'radiology_pacs',
            label: 'Solusi Cloud PACS & DICOM Viewer',
            icon: Activity,
            color: 'text-purple-600 bg-purple-50',
            template: 'Halo, kami tertarik dengan modul Cloud PACS & Zero-Footprint DICOM Viewer Liva SIMRS untuk unit radiologi kami.'
        },
        {
            id: 'procurement',
            label: 'Skema Biaya & Proposal Pengadaan RS',
            icon: Building2,
            color: 'text-[#FF8A2B] bg-orange-50',
            template: 'Halo Liva SIMRS, bisa kami meminta proposal penawaran resmi (SOW) dan skema pembiayaan implementasi SIMRS?'
        }
    ];

    const handleSendWhatsApp = (e) => {
        e.preventDefault();
        const activeTopic = topics.find(t => t.id === selectedTopic) || topics[0];
        
        let message = `${activeTopic.template}\n\n`;
        if (hospitalName.trim()) {
            message += `*Nama Rumah Sakit / Faskes:* ${hospitalName.trim()}\n`;
        }
        if (picName.trim()) {
            message += `*Nama PIC / Kontak:* ${picName.trim()}\n`;
        }
        message += `\n_Dikirim melalui Website Resmi Liva SIMRS_`;

        const encodedMsg = encodeURIComponent(message);
        const waUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {/* Expanded Consultation Card */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-[340px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
                    
                    {/* Header with Doctor/Expert Profile Lockup */}
                    <div className="bg-gradient-to-r from-[#1F2937] via-[#111827] to-[#0F172A] p-4 text-white relative">
                        <button 
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3.5 right-3.5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#2F8BFF] to-emerald-400 p-0.5">
                                    <div className="w-full h-full bg-[#1F2937] rounded-[14px] flex items-center justify-center text-white font-bold text-sm">
                                        <Headphones className="w-5 h-5 text-emerald-400" />
                                    </div>
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#1F2937] rounded-full"></span>
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <h4 className="text-sm font-bold leading-tight">Konsultan MedTech RS</h4>
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">Online</span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                    Respon cepat 24/7 via WhatsApp Resmi
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Body Form */}
                    <form onSubmit={handleSendWhatsApp} className="p-4 space-y-3.5 bg-slate-50/50">
                        <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Pilih Kebutuhan Konsultasi:
                            </label>
                            <div className="space-y-1.5">
                                {topics.map((t) => {
                                    const IconComponent = t.icon;
                                    const isSelected = selectedTopic === t.id;
                                    return (
                                        <button
                                            key={t.id}
                                            type="button"
                                            onClick={() => setSelectedTopic(t.id)}
                                            className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                                                isSelected 
                                                    ? 'bg-white border-[#2F8BFF] shadow-xs text-[#2F8BFF]' 
                                                    : 'bg-white/80 border-slate-200/70 text-slate-700 hover:bg-white hover:border-slate-300'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <div className={`p-1.5 rounded-lg ${t.color} shrink-0`}>
                                                    <IconComponent className="w-3.5 h-3.5" />
                                                </div>
                                                <span className="text-xs font-semibold truncate">
                                                    {t.label}
                                                </span>
                                            </div>
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                                isSelected ? 'border-[#2F8BFF] bg-[#2F8BFF]' : 'border-slate-300'
                                            }`}>
                                                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Optional Hospital & PIC Input */}
                        <div className="space-y-2 pt-1">
                            <input 
                                type="text"
                                placeholder="Nama Rumah Sakit / Faskes Anda (Opsional)"
                                value={hospitalName}
                                onChange={(e) => setHospitalName(e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#2F8BFF] text-slate-800 placeholder:text-slate-400"
                            />
                            <input 
                                type="text"
                                placeholder="Nama Anda & Gelar (Opsional)"
                                value={picName}
                                onChange={(e) => setPicName(e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#2F8BFF] text-slate-800 placeholder:text-slate-400"
                            />
                        </div>

                        {/* Submit WhatsApp CTA */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer"
                        >
                            <MessageCircle className="w-4 h-4 fill-white" />
                            <span>Mulai Chat via WhatsApp</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Bottom Micro Footer */}
                    <div className="bg-slate-100/80 px-4 py-2 text-center text-[10px] text-slate-500 border-t border-slate-200">
                        ⚡ Rata-rata respon tim konsultan: <strong className="text-slate-700">&lt; 5 Menit</strong>
                    </div>
                </div>
            )}

            {/* Floating Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`relative flex items-center gap-2.5 px-4 py-3 rounded-full shadow-xl transition-all duration-300 cursor-pointer active:scale-95 ${
                    isOpen 
                        ? 'bg-slate-800 text-white' 
                        : 'bg-[#25D366] hover:bg-[#20bd5a] text-white hover:shadow-2xl hover:shadow-emerald-500/30'
                }`}
                aria-label="Konsultasi WhatsApp Liva SIMRS"
            >
                {/* Ping Ring Effect */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
                    </span>
                )}

                {isOpen ? (
                    <>
                        <X className="w-5 h-5" />
                        <span className="text-xs font-bold tracking-wide">Tutup</span>
                    </>
                ) : (
                    <>
                        <MessageCircle className="w-5 h-5 fill-white shrink-0" />
                        <span className="text-xs font-bold tracking-wide hidden sm:inline whitespace-nowrap">
                            Tanya Konsultan RS
                        </span>
                    </>
                )}
            </button>
        </div>
    );
}
