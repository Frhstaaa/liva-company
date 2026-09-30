import React, { useState, useRef, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import {
    Menu,
    X,
    Sparkles,
    ArrowRight,
    Phone,
    ChevronDown,
    Hospital,
    Building2,
    Factory,
    Pill,
    ShieldCheck,
    CheckCircle2
} from 'lucide-react';

export default function Navbar({ currentPath = 'beranda', onNavigate }) {
    const { getSetting, openAssessmentModal } = useSite();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [solutionDropdownOpen, setSolutionDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const dropdownRef = useRef(null);

    const siteName = getSetting('site_name', 'Liva SIMRS');
    const siteTagline = getSetting('site_tagline', 'Hospital Intelligence Platform');
    const siteLogo = getSetting(
        'site_logo',
        'https://lh3.googleusercontent.com/aida/AEtjO1XAHIn1996QD1vNDMJOI8vdcD23fhuJ9R1JA7IQBDBpCleoEmx9kMbyYdRUDT0uLi7_REF8zQVaH0To8_w471zcowmSdXjp2znm9RnHL5dtzXY8dA103emK9CmIDNTLY41jkXa8FVs-gZ80YgXohNYtPSkgXFfEBGxyU4w0aGxkITySYI_yEPJOhgmzNIOLyTBXTg1IMhQsGD2dUtkAOrYDyjtEFtFHLVJZjFyOSJIPWo5i2pitZyCQXaIH'
    );
    const topAnnouncement = getSetting(
        'top_announcement_text',
        'Kepatuhan RME Nasional: Terintegrasi Penuh SATUSEHAT Kemenkes & BPJS VClaim 2.0 (Permenkes 24/2022)'
    );
    const topAnnouncementLinkText = getSetting('top_announcement_link_text', 'Uji Kesiapan RS');

    // Scroll state detection for dynamic elevation
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 12) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSolutionDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const solutionItems = [
        { id: 'hospital', label: 'Rumah Sakit (Kelas A, B, C, D & RSIA)', icon: Hospital, desc: 'Rawat Jalan, Ranap, IGD Cito, OK, ICU & STARKES' },
        { id: 'clinic', label: 'SIM Klinik Pratama & Mandiri', icon: Building2, desc: 'Registrasi cepat, rekam medis & bridging PCare BPJS' },
        { id: 'industrial_k3', label: 'Klinik Industri & K3 (Tambang / Pabrik)', icon: Factory, desc: 'MCU massal karyawan & surveilans PAK Kemenaker' },
        { id: 'pharmacy', label: 'Sistem Manajemen Farmasi & Apotek', icon: Pill, desc: 'Stok FIFO/FEFO, batch tracking & e-Resep' },
        { id: 'compliance', label: 'Integrasi SATUSEHAT & BPJS', icon: ShieldCheck, desc: 'Native HL7 FHIR R4 & VClaim 2.0 resmi Kemenkes' },
    ];

    const navLinks = [
        { id: 'beranda', label: 'Beranda' },
        { id: 'modul-simrs', label: 'Katalog Modul', badge: '36 Modul' },
        { id: 'ris-pacs', label: 'RIS / PACS', badge: 'DICOM Cloud' },
        { id: 'keunggulan', label: 'Keunggulan' },
        { id: 'studi-kasus', label: 'Studi Kasus RS' },
        { id: 'tentang-kami', label: 'Tentang Kami' },
    ];

    const handleNavClick = (id) => {
        setMobileMenuOpen(false);
        setSolutionDropdownOpen(false);
        if (onNavigate) {
            onNavigate(id);
        }
    };

    const handleSolutionClick = (solId) => {
        setSolutionDropdownOpen(false);
        setMobileMenuOpen(false);
        if (onNavigate) {
            onNavigate('beranda');
            setTimeout(() => {
                const element = document.getElementById('solution-matrix-section');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
            isScrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] border-b border-slate-200/80' 
                : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/60'
        }`}>
            {/* Top Micro Announcement & Compliance Bar */}
            {(() => {
                const val = getSetting('top_announcement_enabled', true);
                const isEnabled = val === true || val === '1' || val === 'true';
                if (!isEnabled) return null;
                return (
                    <div className="bg-gradient-to-r from-[#F0F6FE] via-[#F8FAFC] to-[#FFF7ED] text-slate-700 h-8 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 flex items-center">
                        <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4 text-[11px]">
                            <div className="flex items-center gap-2.5 truncate">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-semibold text-[10px] shrink-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    {getSetting('top_announcement_badge', 'SATUSEHAT FHIR R4')}
                                </span>
                                <span className="text-slate-600 font-normal truncate text-[11.5px]">
                                    {topAnnouncement}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 text-[11px]">
                                <button
                                    type="button"
                                    onClick={() => openAssessmentModal()}
                                    className="text-[#1E60D5] hover:text-[#164DB0] font-semibold flex items-center gap-1 cursor-pointer transition-colors focus-ring rounded"
                                >
                                    <Sparkles className="h-3 w-3 text-[#F97316]" />
                                    <span>{topAnnouncementLinkText}</span>
                                    <ArrowRight className="h-3 w-3" />
                                </button>
                                <span className="text-slate-300 hidden md:inline">|</span>
                                <div className="hidden md:flex items-center gap-1.5 text-slate-500 text-[11px]">
                                    <Phone className="h-3 w-3 text-slate-400" />
                                    <span>Hotline RS:</span>
                                    <strong className="text-slate-800 font-mono font-medium">{getSetting('company_hotline', '+62 21 8062 5599')}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Main Navigation Bar */}
            <div className="h-16 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                {/* Brand Logo Lockup */}
                <div className="flex items-center shrink-0">
                    <button
                        type="button"
                        onClick={() => handleNavClick('beranda')}
                        className="flex items-center gap-3 text-left group cursor-pointer focus-ring rounded-lg"
                        aria-label="Kembali ke Beranda"
                    >
                        <img
                            alt={`${siteName} Logo`}
                            className="h-8 w-auto object-contain transition-transform group-hover:scale-102 shrink-0"
                            src={siteLogo}
                        />
                        <div className="flex flex-col">
                            <div className="font-bold text-[16px] text-slate-900 tracking-tight leading-none flex items-center gap-1 font-display">
                                <span>{siteName}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0"></span>
                            </div>
                            <span className="text-slate-400 tracking-wider uppercase text-[8.5px] font-semibold mt-0.5">
                                {siteTagline}
                            </span>
                        </div>
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-1.5 shrink-0" aria-label="Navigasi Utama">
                    {/* Beranda Link */}
                    <button
                        type="button"
                        onClick={() => handleNavClick('beranda')}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer focus-ring ${
                            currentPath === 'beranda'
                                ? 'text-[#1E60D5] font-semibold bg-[#EBF2FE]'
                                : 'text-slate-700 hover:text-[#1E60D5] hover:bg-slate-50'
                        }`}
                    >
                        <span>Beranda</span>
                    </button>

                    {/* Solusi Multi-Fasilitas Dropdown */}
                    <div className="relative shrink-0" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setSolutionDropdownOpen(!solutionDropdownOpen)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer focus-ring ${
                                solutionDropdownOpen
                                    ? 'text-[#1E60D5] font-semibold bg-[#EBF2FE]'
                                    : 'text-slate-700 hover:text-[#1E60D5] hover:bg-slate-50'
                            }`}
                            aria-expanded={solutionDropdownOpen}
                            aria-haspopup="true"
                        >
                            <span>Solusi Faskes</span>
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${solutionDropdownOpen ? 'rotate-180 text-[#1E60D5]' : 'text-slate-400'}`} />
                        </button>

                        {solutionDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-84 bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_32px_-4px_rgba(15,23,42,0.12)] p-2 z-50 animate-scale-in">
                                <div className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                                    Pilih Jenis Fasilitas Kesehatan:
                                </div>
                                <div className="space-y-0.5">
                                    {solutionItems.map((item) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => handleSolutionClick(item.id)}
                                                className="w-full text-left p-2.5 rounded-xl hover:bg-[#F0F6FE] transition-colors cursor-pointer flex items-start gap-3 group focus-ring"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-[#EBF2FE] text-[#1E60D5] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                                                    <IconComponent className="h-4 w-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-xs font-semibold text-slate-800 group-hover:text-[#1E60D5] transition-colors leading-snug">
                                                        {item.label}
                                                    </div>
                                                    <div className="text-[11px] text-slate-500 leading-tight truncate mt-0.5">
                                                        {item.desc}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Katalog Modul Link */}
                    <button
                        type="button"
                        onClick={() => handleNavClick('modul-simrs')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer focus-ring ${
                            currentPath === 'modul-simrs'
                                ? 'text-[#1E60D5] font-semibold bg-[#EBF2FE]'
                                : 'text-slate-700 hover:text-[#1E60D5] hover:bg-slate-50'
                        }`}
                    >
                        <span>Katalog Modul</span>
                        <span className="inline-flex items-center px-2 py-0.2 rounded-full text-[10.5px] font-semibold bg-[#FFF7ED] text-[#F97316] border border-[#FFEDD5]">
                            36 Modul
                        </span>
                    </button>

                    {/* RIS / PACS Link */}
                    <button
                        type="button"
                        onClick={() => handleNavClick('ris-pacs')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer focus-ring ${
                            currentPath === 'ris-pacs'
                                ? 'text-[#1E60D5] font-semibold bg-[#EBF2FE]'
                                : 'text-slate-700 hover:text-[#1E60D5] hover:bg-slate-50'
                        }`}
                    >
                        <span>RIS / PACS</span>
                        <span className="inline-flex items-center px-2 py-0.2 rounded-full text-[10.5px] font-semibold bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                            DICOM Cloud
                        </span>
                    </button>

                    {/* Keunggulan Link */}
                    <button
                        type="button"
                        onClick={() => handleNavClick('keunggulan')}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer focus-ring ${
                            currentPath === 'keunggulan'
                                ? 'text-[#1E60D5] font-semibold bg-[#EBF2FE]'
                                : 'text-slate-700 hover:text-[#1E60D5] hover:bg-slate-50'
                        }`}
                    >
                        <span>Keunggulan</span>
                    </button>

                    {/* Studi Kasus RS Link */}
                    <button
                        type="button"
                        onClick={() => handleNavClick('studi-kasus')}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer focus-ring ${
                            currentPath === 'studi-kasus'
                                ? 'text-[#1E60D5] font-semibold bg-[#EBF2FE]'
                                : 'text-slate-700 hover:text-[#1E60D5] hover:bg-slate-50'
                        }`}
                    >
                        <span>Studi Kasus RS</span>
                    </button>

                    {/* Tentang Kami Link */}
                    <button
                        type="button"
                        onClick={() => handleNavClick('tentang-kami')}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer focus-ring ${
                            currentPath === 'tentang-kami'
                                ? 'text-[#1E60D5] font-semibold bg-[#EBF2FE]'
                                : 'text-slate-700 hover:text-[#1E60D5] hover:bg-slate-50'
                        }`}
                    >
                        <span>Tentang Kami</span>
                    </button>
                </nav>

                {/* Right Action CTA Button - Tactile Warm Amber */}
                <div className="hidden sm:flex items-center shrink-0">
                    <button
                        type="button"
                        onClick={() => handleNavClick('jadwalkan-demo')}
                        className="btn-amber-warm btn-spring h-10 px-5 rounded-full text-[13px] font-semibold flex items-center gap-2 cursor-pointer focus-ring"
                    >
                        <Sparkles className="h-3.5 w-3.5 text-white shrink-0" />
                        <span>Minta Demo RS</span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </button>
                </div>

                {/* Mobile Hamburger Menu Button */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-ring shrink-0"
                    aria-label="Buka Menu Navigasi"
                >
                    {mobileMenuOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white/98 backdrop-blur-md border-b border-slate-200 px-4 py-4 shadow-lg animate-scale-in space-y-2">
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => {
                            const isActive = currentPath === link.id;
                            return (
                                <button
                                    key={link.id}
                                    type="button"
                                    onClick={() => handleNavClick(link.id)}
                                    className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                                        isActive
                                            ? 'bg-[#EBF2FE] text-[#1E60D5] font-semibold'
                                            : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                    <span>{link.label}</span>
                                    {link.badge && (
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF7ED] text-[#F97316] border border-[#FFEDD5]">
                                            {link.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => handleNavClick('jadwalkan-demo')}
                            className="btn-amber-warm w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                        >
                            <Sparkles className="h-3.5 w-3.5 text-white" />
                            <span>Minta Demo &amp; Uji Coba Faskes</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
