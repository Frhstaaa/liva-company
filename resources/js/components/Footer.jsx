import React from 'react';
import { useSite } from '../context/SiteContext';
import { 
    Shield, 
    ShieldCheck, 
    Lock, 
    MapPin, 
    Mail, 
    Phone, 
    Sparkles,
    ArrowUpRight
} from 'lucide-react';

export default function Footer({ onNavigate }) {
    const { getSetting, openDemoModal, openAssessmentModal } = useSite();

    const siteName = getSetting('site_name', 'Liva SIMRS');
    const siteTagline = getSetting('site_tagline', 'Hospital Information System');
    const siteLogo = getSetting('site_logo', 'https://lh3.googleusercontent.com/aida/AEtjO1XAHIn1996QD1vNDMJOI8vdcD23fhuJ9R1JA7IQBDBpCleoEmx9kMbyYdRUDT0uLi7_REF8zQVaH0To8_w471zcowmSdXjp2znm9RnHL5dtzXY8dA103emK9CmIDNTLY41jkXa8FVs-gZ80YgXohNYtPSkgXFfEBGxyU4w0aGxkITySYI_yEPJOhgmzNIOLyTBXTg1IMhQsGD2dUtkAOrYDyjtEFtFHLVJZjFyOSJIPWo5i2pitZyCQXaIH');
    const email = getSetting('contact_email', 'institusi@livasimrs.id');
    const phone = getSetting('contact_phone', '+62 21 8062 5599');
    const whatsapp = getSetting('contact_whatsapp', '+62 812 8899 0012');
    const address = getSetting('contact_address', 'Liva Health Intelligence Tower, Lt. 18, Jl. TB Simatupang No. 88, Jakarta Selatan 12430');

    return (
        <footer className="bg-white text-slate-600 border-t border-slate-200/90 text-xs font-sans relative overflow-hidden">
            {/* Top Micro Strip */}
            <div className="border-b border-slate-100 bg-slate-50/80 py-2.5 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 font-mono text-[11px]">
                    <div className="flex flex-wrap items-center gap-3 text-slate-600">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            PROD SLA 99.98%
                        </span>
                        <span className="text-slate-300 hidden sm:inline">|</span>
                        <span className="flex items-center gap-1.5 text-[#1E60D5] font-medium">
                            <Shield className="w-3.5 h-3.5" />
                            KEMENKES SATUSEHAT &amp; BPJS CERTIFIED
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-slate-500">Hotdesk 24/7:</span>
                        <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-[#1E60D5] hover:underline font-bold transition-colors">
                            {whatsapp}
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content Links */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                    
                    {/* Brand Overview */}
                    <div className="lg:col-span-4 space-y-3.5">
                        <div className="flex items-center gap-3">
                            <img
                                alt={siteName}
                                className="h-8 w-auto object-contain shrink-0"
                                src={siteLogo}
                            />
                            <div className="flex flex-col">
                                <span className="text-base font-bold text-[#0F172A] tracking-tight font-display flex items-center gap-1.5">
                                    {siteName}
                                    <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                                </span>
                                <span className="font-mono text-[9.5px] text-slate-500 uppercase tracking-wider">
                                    {siteTagline}
                                </span>
                            </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed text-xs">
                            Sistem Informasi Manajemen Rumah Sakit (SIMRS) terintegrasi penuh dengan Rekam Medis Elektronik (RME) Permenkes No. 24/2022, SATUSEHAT FHIR R4, BPJS VClaim 2.0, serta tata kelola keuangan faskes.
                        </p>

                        <div className="flex flex-wrap gap-2 pt-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1E60D5] font-mono text-[10.5px]">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                SATUSEHAT FHIR R4
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1E60D5] font-mono text-[10.5px]">
                                <Shield className="w-3.5 h-3.5" />
                                BPJS VClaim 2.0
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-[10.5px]">
                                <Lock className="w-3.5 h-3.5" />
                                ISO 27001 &amp; BSrE
                            </span>
                        </div>
                    </div>

                    {/* Modul Klinis */}
                    <div className="lg:col-span-3 space-y-3">
                        <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-mono flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1E60D5]"></span>
                            Modul SIMRS
                        </h4>
                        <ul className="space-y-2 text-slate-600 text-xs">
                            <li>
                                <button onClick={() => onNavigate && onNavigate('modul-simrs')} className="hover:text-[#1E60D5] transition-colors text-left cursor-pointer hover:translate-x-1 duration-150 transform inline-block">
                                    Rekam Medis Elektronik (RME)
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate && onNavigate('modul-simrs')} className="hover:text-[#1E60D5] transition-colors text-left cursor-pointer hover:translate-x-1 duration-150 transform inline-block">
                                    Rawat Jalan, IGD Triage &amp; Rawat Inap
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate && onNavigate('modul-simrs')} className="hover:text-[#1E60D5] transition-colors text-left cursor-pointer hover:translate-x-1 duration-150 transform inline-block">
                                    Smart Pharmacy &amp; E-Prescription
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate && onNavigate('modul-simrs')} className="hover:text-[#1E60D5] transition-colors text-left cursor-pointer hover:translate-x-1 duration-150 transform inline-block">
                                    Laboratorium LIS &amp; Radiologi PACS
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate && onNavigate('modul-simrs')} className="hover:text-[#1E60D5] transition-colors text-left cursor-pointer hover:translate-x-1 duration-150 transform inline-block">
                                    Billing Kasir &amp; Auto-Klaim INA-CBGs
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Solusi */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-mono flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
                            Solusi &amp; Evaluasi
                        </h4>
                        <ul className="space-y-2 text-slate-600 text-xs">
                            <li>
                                <button onClick={() => onNavigate && onNavigate('tentang-kami')} className="hover:text-[#1E60D5] transition-colors text-left cursor-pointer hover:translate-x-1 duration-150 transform inline-block font-semibold text-slate-700">
                                    Tentang Kami &amp; Visi
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate && onNavigate('keunggulan')} className="hover:text-[#1E60D5] transition-colors text-left cursor-pointer hover:translate-x-1 duration-150 transform inline-block">
                                    6 Pilar Keunggulan
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate && onNavigate('studi-kasus')} className="hover:text-[#1E60D5] transition-colors text-left cursor-pointer hover:translate-x-1 duration-150 transform inline-block">
                                    Kisah Sukses Mitra RS
                                </button>
                            </li>
                            <li>
                                <button onClick={() => openAssessmentModal()} className="hover:text-[#1E60D5] transition-colors text-left cursor-pointer text-[#1E60D5] font-semibold flex items-center gap-1.5 group">
                                    <Sparkles className="w-3.5 h-3.5 text-[#F97316] group-hover:rotate-12 transition-transform" />
                                    <span>Uji Kesiapan SIMRS</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => openDemoModal()} className="hover:text-[#1E60D5] transition-colors text-left cursor-pointer hover:translate-x-1 duration-150 transform inline-block">
                                    Jadwalkan Live Demo
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate && onNavigate('admin-login')} className="hover:text-[#1E60D5] transition-colors text-left cursor-pointer text-slate-400 font-mono text-[11px]">
                                    Portal Administrator
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div className="lg:col-span-3 space-y-3">
                        <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-mono flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Pusat Layanan
                        </h4>
                        <div className="space-y-2.5 text-xs text-slate-600">
                            <p className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-[#1E60D5] shrink-0 mt-0.5" />
                                <span>{address}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#1E60D5] shrink-0" />
                                <a href={`mailto:${email}`} className="hover:text-[#1E60D5] transition-colors">{email}</a>
                            </p>
                            <p className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-[#1E60D5] shrink-0" />
                                <span>{phone} (Hunting)</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Legal */}
                <div className="mt-10 pt-5 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3 text-[10.5px] text-slate-500 font-mono text-center md:text-left">
                    <p>
                        &copy; {new Date().getFullYear()} {siteName}. Hak Cipta Dilindungi Undang-Undang. Sesuai Permenkes No. 24/2022 &amp; Standar HL7 FHIR R4.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <span className="hover:text-slate-700 cursor-pointer">SLA &amp; Keamanan</span>
                        <span>•</span>
                        <span className="hover:text-slate-700 cursor-pointer">Kerahasiaan Medis (PDP)</span>
                        <span>•</span>
                        <button onClick={() => onNavigate && onNavigate('admin-login')} className="text-[#1E60D5] hover:underline font-bold cursor-pointer transition-colors">
                            [Admin Login]
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
