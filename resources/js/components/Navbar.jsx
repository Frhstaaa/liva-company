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
    Calculator,
    Activity,
    Layers
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
    const topAnnouncementLinkText = getSetting('top_announcement_link_text', 'Uji Kesiapan');

    // Scroll state detection for dynamic elevation
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 15) {
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
        { id: 'hospital', label: 'Rumah Sakit (Kelas A, B, C, D & RSIA)', icon: Hospital, desc: 'Rawat Jalan, Ranap, IGD, OK, ICU & STARKES' },
        { id: 'clinic', label: 'SIM Klinik Pratama & Mandiri', icon: Building2, desc: 'Registrasi cepat, rekam medis & PCare BPJS' },
        { id: 'industrial_k3', label: 'Klinik Industri & K3 (Tambang / Manufaktur)', icon: Factory, desc: 'MCU massal karyawan & surveilans PAK Kemenaker' },
        { id: 'pharmacy', label: 'Sistem Manajemen Apotek & Farmasi', icon: Pill, desc: 'Stok FIFO/FEFO, batch tracking & e-Resep' },
        { id: 'compliance', label: 'Integrasi SATUSEHAT & BPJS', icon: ShieldCheck, desc: 'Native HL7 FHIR R4 & VClaim 2.0 resmi Kemenkes' },
    ];

    const navLinks = [
        { id: 'beranda', label: 'Beranda' },
        { id: 'modul-simrs', label: 'Katalog Modul', badge: '36 Modul' },
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
        <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
            isScrolled ? 'shadow-md border-b border-slate-300/80' : 'shadow-2xs border-b border-slate-200/80'
        }`}>
            {/* Top Micro Compliance Bar - Luminous Light Theme */}
            <div className="bg-gradient-to-r from-blue-50/90 via-slate-50 to-orange-50/40 text-slate-700 h-8 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 flex items-center">
                <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4 font-mono text-[11px]">
                    <div className="flex items-center gap-2 truncate">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-[9px] shrink-0 whitespace-nowrap shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            FHIR R4
                        </span>
                        <span className="text-slate-700 font-sans truncate text-[11px] font-medium whitespace-nowrap">
                            {topAnnouncement}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 font-sans text-[11px] whitespace-nowrap">
                        <button
                            type="button"
                            onClick={() => openAssessmentModal()}
                            className="text-[#2F8BFF] hover:text-[#1E75E6] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                            <Sparkles className="h-3 w-3 text-[#FF8A2B]" />
                            <span>{topAnnouncementLinkText}</span>
                            <ArrowRight className="h-3 w-3" />
                        </button>
                        <span className="text-slate-300 hidden md:inline">|</span>
                        <div className="hidden md:flex items-center gap-1.5 text-slate-600 text-[11px]">
                            <Phone className="h-3 w-3 text-slate-400" />
                            <span>Hotline RS:</span>
                            <strong className="text-slate-800 font-mono">+62 21 8062 5599</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div className="h-16 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 xl:gap-4">
                {/* Brand Logo Lockup */}
                <div className="flex items-center shrink-0">
                    <button
                        type="button"
                        onClick={() => handleNavClick('beranda')}
                        className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
                    >
                        <img
                            alt={`${siteName} Logo`}
                            className="h-8 w-auto object-contain transition-transform group-hover:scale-102 shrink-0"
                            src={siteLogo}
                        />
                        <div className="flex flex-col">
                            <div className="font-bold text-base text-[#1F2937] tracking-tight leading-none flex items-center gap-1 font-display whitespace-nowrap">
                                <span>{siteName}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A2B] shrink-0"></span>
                            </div>
                            <span className="text-slate-400 tracking-wider uppercase text-[8.5px] font-bold font-sans mt-0.5 whitespace-nowrap">
                                {siteTagline}
                            </span>
                        </div>
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
                    {/* Beranda Link */}
                    <button
                        type="button"
                        onClick={() => handleNavClick('beranda')}
                        className={`inline-flex items-center justify-center px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-[13.5px] whitespace-nowrap shrink-0 transition-all cursor-pointer focus:outline-none ${
                            currentPath === 'beranda'
                                ? 'text-[#2F8BFF] font-bold bg-blue-50/70'
                                : 'text-slate-700 hover:text-[#2F8BFF] hover:bg-slate-50 font-medium'
                        }`}
                    >
                        <span>Beranda</span>
                    </button>

                    {/* Solusi Multi-Fasilitas Dropdown */}
                    <div className="relative shrink-0" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setSolutionDropdownOpen(!solutionDropdownOpen)}
                            className={`inline-flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-[13.5px] whitespace-nowrap shrink-0 transition-all cursor-pointer focus:outline-none ${
                                solutionDropdownOpen
                                    ? 'text-[#2F8BFF] font-bold bg-blue-50/70'
                                    : 'text-slate-700 hover:text-[#2F8BFF] hover:bg-slate-50 font-medium'
                            }`}
                        >
                            <span className="whitespace-nowrap">Solusi Faskes</span>
                            <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${solutionDropdownOpen ? 'rotate-180 text-[#2F8BFF]' : 'text-slate-400'}`} />
                        </button>

                        {solutionDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                                    Pilih Jenis Fasilitas Kesehatan:
                                </div>
                                <div className="space-y-1">
                                    {solutionItems.map((item) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => handleSolutionClick(item.id)}
                                                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3 group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2F8BFF] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#2F8BFF] group-hover:text-white transition-colors">
                                                    <IconComponent className="h-4 w-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-xs font-bold text-[#1F2937] group-hover:text-[#2F8BFF] transition-colors leading-snug">
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
                        className={`inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-[13.5px] whitespace-nowrap shrink-0 transition-all cursor-pointer focus:outline-none ${
                            currentPath === 'modul-simrs'
                                ? 'text-[#2F8BFF] font-bold bg-blue-50/70'
                                : 'text-slate-700 hover:text-[#2F8BFF] hover:bg-slate-50 font-medium'
                        }`}
                    >
                        <span className="whitespace-nowrap">Katalog Modul</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-[#FFF0E6] text-[#FF8A2B] border border-[#FFD8BF] leading-none shrink-0 shadow-2xs whitespace-nowrap">
                            36 Modul
                        </span>
                    </button>

                    {/* Keunggulan Link */}
                    <button
                        type="button"
                        onClick={() => handleNavClick('keunggulan')}
                        className={`inline-flex items-center px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-[13.5px] whitespace-nowrap shrink-0 transition-all cursor-pointer focus:outline-none ${
                            currentPath === 'keunggulan'
                                ? 'text-[#2F8BFF] font-bold bg-blue-50/70'
                                : 'text-slate-700 hover:text-[#2F8BFF] hover:bg-slate-50 font-medium'
                        }`}
                    >
                        <span className="whitespace-nowrap">Keunggulan</span>
                    </button>

                    {/* Studi Kasus RS Link */}
                    <button
                        type="button"
                        onClick={() => handleNavClick('studi-kasus')}
                        className={`inline-flex items-center px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-[13.5px] whitespace-nowrap shrink-0 transition-all cursor-pointer focus:outline-none ${
                            currentPath === 'studi-kasus'
                                ? 'text-[#2F8BFF] font-bold bg-blue-50/70'
                                : 'text-slate-700 hover:text-[#2F8BFF] hover:bg-slate-50 font-medium'
                        }`}
                    >
                        <span className="whitespace-nowrap">Studi Kasus RS</span>
                    </button>

                    {/* Tentang Kami Link */}
                    <button
                        type="button"
                        onClick={() => handleNavClick('tentang-kami')}
                        className={`inline-flex items-center px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-[13.5px] whitespace-nowrap shrink-0 transition-all cursor-pointer focus:outline-none ${
                            currentPath === 'tentang-kami'
                                ? 'text-[#2F8BFF] font-bold bg-blue-50/70'
                                : 'text-slate-700 hover:text-[#2F8BFF] hover:bg-slate-50 font-medium'
                        }`}
                    >
                        <span className="whitespace-nowrap">Tentang Kami</span>
                    </button>
                </nav>

                {/* Right Action CTA Button - Blue Pill with Sparkles and Arrow */}
                <div className="hidden sm:flex items-center shrink-0">
                    <button
                        type="button"
                        onClick={() => handleNavClick('jadwalkan-demo')}
                        className="inline-flex items-center gap-2 px-4.5 xl:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2F8BFF] to-[#1E75E6] hover:from-[#1E75E6] hover:to-[#175ec2] text-white font-semibold text-[13px] xl:text-[13.5px] whitespace-nowrap shrink-0 transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer active:scale-98"
                    >
                        <Sparkles className="h-4 w-4 text-amber-300 shrink-0" />
                        <span className="whitespace-nowrap">Minta Demo Faskes</span>
                        <ArrowRight className="h-4 w-4 shrink-0 ml-0.5" />
                    </button>
                </div>

                {/* Mobile Hamburger Menu Button */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-[#1F2937] hover:bg-slate-100 transition-colors shrink-0"
                    aria-label="Toggle Navigation Menu"
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
                <div className="lg:hidden bg-white/98 backdrop-blur-md border-b border-slate-200 px-4 py-4 shadow-lg animate-in slide-in-from-top-2 duration-150 space-y-2">
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => {
                            const isActive = currentPath === link.id;
                            return (
                                <button
                                    key={link.id}
                                    type="button"
                                    onClick={() => handleNavClick(link.id)}
                                    className={`text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                                        isActive
                                            ? 'bg-blue-50 text-[#2F8BFF] font-semibold'
                                            : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                    <span>{link.label}</span>
                                    {link.badge && (
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF8A2B]/10 text-[#FF8A2B] font-bold border border-[#FF8A2B]/20">
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
                            className="w-full py-2.5 rounded-lg bg-[#2F8BFF] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                        >
                            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                            <span>Minta Demo &amp; Uji Coba Faskes</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
