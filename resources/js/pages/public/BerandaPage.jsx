import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import SolutionMatrix from '../../components/SolutionMatrix';
import ProductCockpitShowcase from '../../components/ProductCockpitShowcase';
import BrandTrustAndShowcase from '../../components/BrandTrustAndShowcase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Sparkles,
    ArrowRight,
    Rocket,
    BookOpen,
    Cloud,
    ShieldCheck,
    Award,
    FileText,
    Users,
    Link2,
    Activity,
    Layers
} from 'lucide-react';

export default function BerandaPage({ onNavigate }) {
    const { siteData, getSetting, openDemoModal, openAssessmentModal, openModuleModal } = useSite();

    const modules = siteData.modules || [];
    const pillars = siteData.pillars || [];
    const caseStudies = siteData.case_studies || [];

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#F8FAFC] text-[#1F2937] font-sans">
            {/* ========================================================================= */}
            {/* 1. HERO SECTION & VALUE PROPOSITION (Pixel-Perfect Match with Design Comps) */}
            {/* ========================================================================= */}
            <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F4F8FE] to-[#EEF5FF] pt-10 sm:pt-14 pb-20 sm:pb-28">
                
                {/* 1.1 Architectural Hospital Background Image Overlay (Top Right) */}
                <div 
                    className="absolute top-0 right-0 w-full sm:w-2/3 lg:w-1/2 h-full pointer-events-none z-0 opacity-20 bg-cover bg-no-repeat bg-right-top mix-blend-multiply"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=80')`,
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
                    className="absolute bottom-0 right-0 w-72 sm:w-[480px] lg:w-[580px] h-36 sm:h-[220px] lg:h-[260px] pointer-events-none z-0" 
                    viewBox="0 0 580 260" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path 
                        d="M580 260 L580 60 C440 100 320 190 200 260 Z" 
                        fill="url(#hero-orange-gradient)" 
                    />
                    <defs>
                        <linearGradient id="hero-orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FF9E4A" />
                            <stop offset="100%" stopColor="#FF7A00" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* 1.4 Subtle Dot Grid Matrix next to the Orange Swoosh */}
                <div className="absolute bottom-12 right-32 sm:right-48 lg:right-64 hidden md:grid grid-cols-10 gap-3 pointer-events-none opacity-40 z-0">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#2F8BFF]/40"></span>
                    ))}
                </div>

                {/* 1.5 Soft White Blur Fade at Bottom Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                        
                        {/* ========================================================= */}
                        {/* LEFT COLUMN: BADGE, HEADLINE, DESCRIPTION & ACTIONS       */}
                        {/* ========================================================= */}
                        <div className="lg:col-span-6 space-y-6 animate-slide-up">
                            {/* Pill Badge */}
                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[#2F8BFF] text-xs sm:text-[13px] font-semibold shadow-2xs">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A2B] shrink-0"></span>
                                <span>Solusi SIMRS Generasi Baru</span>
                                <span className="text-slate-400">•</span>
                                <span>Terhubung SATUSEHAT &amp; BPJS</span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-[#1F2937] tracking-tight leading-[1.2] font-display">
                                Transformasi Digital Rumah Sakit yang{' '}
                                <span className="text-[#2F8BFF] relative inline-block whitespace-nowrap">
                                    Lebih Cepat,
                                    {/* Curved Marker Underline SVG */}
                                    <svg
                                        className="absolute -bottom-2 left-0 w-full h-3 text-[#FF8A2B] overflow-visible"
                                        viewBox="0 0 160 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2 8.5C45 2.5 115 3 158 8.5"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>{' '}
                                Terintegrasi, &amp; Berstandar Nasional
                            </h1>

                            {/* Lead Subtitle */}
                            <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed max-w-xl">
                                Liva SIMRS menghubungkan seluruh alur pelayanan mulai dari IGD, Rawat Jalan, Rawat Inap, Farmasi, Laboratorium hingga Rekam Medis Elektronik (RME) dalam satu ekosistem cloud yang aman &amp; patuh regulasi.
                            </p>

                            {/* Action CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                                <Button
                                    onClick={() => openDemoModal()}
                                    className="h-12 px-6 rounded-full bg-[#2F8BFF] hover:bg-[#1E75E6] text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-200 cursor-pointer gap-2.5 btn-spring"
                                >
                                    <Rocket className="h-4 w-4 text-white" />
                                    <span>Jadwalkan Live Demo RS</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => onNavigate('modul-simrs')}
                                    className="h-12 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 hover:border-slate-400 shadow-2xs gap-2.5 btn-spring cursor-pointer"
                                >
                                    <BookOpen className="h-4 w-4 text-[#2F8BFF]" />
                                    <span>Katalog 36 Modul</span>
                                </Button>
                            </div>

                            {/* Accreditation & Compliance Strip (3 Badges) */}
                            <div className="pt-5 border-t border-slate-200/80 flex items-center gap-4 sm:gap-6">
                                {/* Badge 1: Permenkes 24/2022 */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100/80 flex items-center justify-center text-[#2F8BFF] shrink-0">
                                        <Cloud className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col text-[11px] sm:text-xs">
                                        <span className="font-bold text-slate-800 leading-tight">Permenkes</span>
                                        <span className="text-slate-500 leading-tight">24/2022</span>
                                    </div>
                                </div>

                                <div className="h-8 w-px bg-slate-200"></div>

                                {/* Badge 2: SATUSEHAT FHIR R4 */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100/80 flex items-center justify-center text-emerald-600 shrink-0">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col text-[11px] sm:text-xs">
                                        <span className="font-bold text-slate-800 leading-tight">SATUSEHAT</span>
                                        <span className="text-slate-500 leading-tight">FHIR R4</span>
                                    </div>
                                </div>

                                <div className="h-8 w-px bg-slate-200"></div>

                                {/* Badge 3: ISO 27001 & BSrE */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-100/80 flex items-center justify-center text-[#FF8A2B] shrink-0">
                                        <Award className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col text-[11px] sm:text-xs">
                                        <span className="font-bold text-slate-800 leading-tight">ISO 27001 &amp;</span>
                                        <span className="text-slate-500 leading-tight">BSrE</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ========================================================= */}
                        {/* RIGHT COLUMN: LIVA CLINICAL INTELLIGENCE NODE CARD        */}
                        {/* ========================================================= */}
                        <div className="lg:col-span-6 animate-slide-up delay-stagger-2">
                            <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-blue-200/90 shadow-2xl p-5 sm:p-6 text-slate-800 space-y-4 font-mono text-xs card-interactive">
                                {/* Header inside Node Card */}
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#2F8BFF] shadow-[0_0_10px_#2F8BFF]"></span>
                                        <span className="text-slate-900 font-bold tracking-widest text-[11px]">
                                            LIVA CLINICAL INTELLIGENCE NODE
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-emerald-700 font-bold px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        SLA 99.98% ACTIVE
                                    </span>
                                </div>

                                {/* Two Side-by-Side Light Feature Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-sans">
                                    {/* Card 1: Rekam Medis (RME) */}
                                    <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100/90 flex items-center gap-3.5 hover:border-[#2F8BFF] hover:bg-white transition-all duration-200 group shadow-2xs">
                                        <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#2F8BFF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div className="space-y-0.5 min-w-0">
                                            <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-wider block">
                                                REKAM MEDIS (RME):
                                            </span>
                                            <div className="text-[14px] font-bold text-slate-900 group-hover:text-[#2F8BFF] transition-colors leading-tight">
                                                SOAP &amp; CPPT Digital
                                            </div>
                                            <p className="text-[11px] text-[#2F8BFF] font-medium leading-tight">
                                                Terstandar ICD-10 Kemenkes
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card 2: Klaim BPJS */}
                                    <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100/90 flex items-center gap-3.5 hover:border-emerald-500 hover:bg-white transition-all duration-200 group shadow-2xs">
                                        <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <div className="space-y-0.5 min-w-0">
                                            <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-wider block">
                                                KLAIM BPJS:
                                            </span>
                                            <div className="text-[14px] font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">
                                                Auto-Grouping CBGS
                                            </div>
                                            <p className="text-[11px] text-emerald-600 font-medium leading-tight">
                                                &lt; 0.3% Dispute Rate
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom SATUSEHAT Integration Card */}
                                <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200/90 space-y-2.5">
                                    <div className="flex items-center justify-between text-xs font-sans">
                                        <span className="text-slate-700 font-semibold">Integrasi SATUSEHAT:</span>
                                        <span className="text-[#FF8A2B] font-bold font-mono text-xs flex items-center gap-1.5">
                                            <Link2 className="h-3.5 w-3.5 text-[#FF8A2B]" />
                                            Native HL7 FHIR
                                        </span>
                                    </div>

                                    {/* Glowing Full Gradient Progress Bar */}
                                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-300/60">
                                        <div className="bg-gradient-to-r from-[#2F8BFF] via-[#5BC0FF] to-[#00E5FF] h-full w-full rounded-full shadow-[0_0_8px_rgba(47,139,255,0.4)]"></div>
                                    </div>

                                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                                        <span>Patient • Encounter • Condition</span>
                                        <span className="text-emerald-600 font-bold">100% Terverifikasi</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 2. INTERACTIVE PRODUCT COCKPIT SHOWCASE */}
            {/* ========================================================================= */}
            <ProductCockpitShowcase onScheduleDemo={(topic) => openDemoModal(topic)} />

            {/* ========================================================================= */}
            {/* 3. MULTI-SEGMENT HEALTHCARE SOLUTION MATRIX */}
            {/* ========================================================================= */}
            <section id="solution-matrix-section" className="py-20 sm:py-28 bg-gradient-to-b from-[#EEF5FF] via-white to-[#F4F8FE] relative overflow-hidden">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10 backdrop-blur-[2px]"></div>

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10 backdrop-blur-[2px]"></div>

                {/* Decorative Top-Left Blue Accent */}
                <svg 
                    className="absolute top-0 left-0 w-44 sm:w-64 h-28 pointer-events-none z-0 opacity-70" 
                    viewBox="0 0 240 120" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M0 0 L120 0 L0 80 Z" fill="#2F8BFF" opacity="0.12" />
                    <path d="M0 0 L80 0 L0 50 Z" fill="#5BC0FF" opacity="0.2" />
                </svg>

                {/* Decorative Bottom-Right Orange Accent */}
                <svg 
                    className="absolute bottom-0 right-0 w-56 sm:w-80 h-28 pointer-events-none z-0" 
                    viewBox="0 0 320 120" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M320 120 L320 40 C240 60 160 95 100 120 Z" fill="#FF8A2B" opacity="0.15" />
                </svg>

                {/* Dot Matrix Grid */}
                <div className="absolute top-14 right-12 hidden lg:grid grid-cols-8 gap-2.5 pointer-events-none opacity-25 z-0">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#2F8BFF]"></span>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF4FF] border border-[#CCE2FF] text-[#2F8BFF] text-xs font-mono font-bold shadow-2xs">
                            <Layers className="h-3.5 w-3.5" />
                            <span>SOLUSI SPESIFIK SESUAI TIPE FASKES</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight font-display">
                            Ekosistem Digital untuk Setiap Skala Layanan Medis
                        </h2>
                        <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed">
                            Pilih modul dan arsitektur yang dirancang khusus untuk alur kerja rumah sakit, klinik pratama, klinik industri K3, hingga apotek mandiri.
                        </p>
                    </div>

                    <SolutionMatrix
                        onNavigate={onNavigate}
                        onScheduleDemo={(topic) => openDemoModal(topic)}
                    />
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 4. BRAND TRUST CREDENTIALS & SPOTLIGHT HIGHLIGHTS */}
            {/* ========================================================================= */}
            <BrandTrustAndShowcase 
                onScheduleDemo={(topic) => openDemoModal(topic)} 
                onNavigate={onNavigate} 
            />

            {/* ========================================================================= */}
            {/* 5. 6 PILAR KEUNGGULAN ARSITEKTUR */}
            {/* ========================================================================= */}
            <section className="py-20 sm:py-28 bg-gradient-to-b from-[#F4F8FE] via-white to-[#EEF5FF] relative overflow-hidden">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10 backdrop-blur-[2px]"></div>

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10 backdrop-blur-[2px]"></div>

                {/* Decorative Top-Right Blue Accent */}
                <svg 
                    className="absolute top-0 right-0 w-48 sm:w-72 h-32 pointer-events-none z-0 opacity-70" 
                    viewBox="0 0 280 140" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M280 0 L140 0 L280 80 Z" fill="#2F8BFF" opacity="0.1" />
                </svg>

                {/* Dot Matrix Grid */}
                <div className="absolute bottom-12 left-12 hidden lg:grid grid-cols-8 gap-2.5 pointer-events-none opacity-25 z-0">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#2F8BFF]"></span>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-1.5 max-w-xl">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FF] text-[#2F8BFF] text-xs font-mono font-bold border border-[#CCE2FF]">
                                <span>CORE ARCHITECTURE</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight font-display">
                                6 Pilar Keunggulan Solusi Liva SIMRS
                            </h2>
                        </div>
                        <button
                            onClick={() => onNavigate('keunggulan')}
                            className="text-xs font-bold text-[#2F8BFF] hover:underline flex items-center gap-1 cursor-pointer self-start md:self-auto font-mono btn-spring"
                        >
                            <span>Lihat Matriks Komparasi KLAS</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {pillars.map((pillar, idx) => (
                            <div
                                key={idx}
                                className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/90 hover:border-[#2F8BFF] hover:shadow-xl transition-all duration-300 space-y-3.5 group card-interactive"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 text-[#2F8BFF] flex items-center justify-center shadow-2xs group-hover:bg-[#2F8BFF] group-hover:text-white transition-colors duration-200">
                                        <Activity className="h-5 w-5" />
                                    </div>
                                    <span className="font-mono text-[10px] text-slate-700 font-bold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                                        PILAR 0{idx + 1}
                                    </span>
                                </div>
                                <h3 className="text-base font-bold text-[#1F2937] group-hover:text-[#2F8BFF] transition-colors leading-snug font-display">
                                    {pillar.title}
                                </h3>
                                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 6. KATALOG 36 MODUL PRIORITAS */}
            {/* ========================================================================= */}
            <section className="py-20 sm:py-28 bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] relative overflow-hidden">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10 backdrop-blur-[2px]"></div>

                {/* Bottom Smooth White Blur Boundary */}
                <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10 backdrop-blur-[2px]"></div>

                {/* Decorative Bottom-Right Orange Accent */}
                <svg 
                    className="absolute bottom-0 right-0 w-64 sm:w-96 h-32 pointer-events-none z-0" 
                    viewBox="0 0 360 140" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M360 140 L360 40 C280 70 180 110 100 140 Z" fill="#FF8A2B" opacity="0.15" />
                </svg>

                {/* Dot Matrix Grid */}
                <div className="absolute top-14 right-12 hidden lg:grid grid-cols-8 gap-2.5 pointer-events-none opacity-25 z-0">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#2F8BFF]"></span>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-1.5 max-w-xl">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E6] text-[#FF8A2B] text-xs font-mono font-bold border border-[#FFD8BF]">
                                <span>MODULAR &amp; SCALABLE</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight font-display">
                                Katalog 36 Modul SIMRS &amp; Klinik Terpadu
                            </h2>
                        </div>
                        <Button
                            onClick={() => onNavigate('modul-simrs')}
                            variant="outline"
                            className="text-xs font-bold border-slate-300 gap-2 btn-spring rounded-full h-11 px-5 shadow-2xs hover:border-[#2F8BFF] cursor-pointer"
                        >
                            <span>Lihat Semua 36 Modul</span>
                            <ArrowRight className="h-4 w-4 text-[#2F8BFF]" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {modules.slice(0, 4).map((mod, i) => (
                            <div
                                key={mod.id || i}
                                onClick={() => openModuleModal(mod)}
                                className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 hover:border-[#2F8BFF] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group card-interactive"
                            >
                                <div className="space-y-3.5">
                                    <div className="flex items-center justify-between">
                                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2F8BFF] flex items-center justify-center font-bold text-xs group-hover:bg-[#2F8BFF] group-hover:text-white transition-colors duration-200 shadow-2xs">
                                            <Activity className="h-4 w-4" />
                                        </div>
                                        <span className="font-mono text-[9.5px] font-bold text-slate-700 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                                            {mod.module_code}
                                        </span>
                                    </div>
                                    <h3 className="text-sm font-bold text-[#1F2937] group-hover:text-[#2F8BFF] transition-colors leading-snug font-display">
                                        {mod.title}
                                    </h3>
                                    <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                        {mod.short_description}
                                    </p>
                                </div>

                                <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#2F8BFF]">
                                    <span>Detail Alur Kerja</span>
                                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 7. BOTTOM CONSULTATION CALL TO ACTION (Luminous Navy Tech Theme) */}
            {/* ========================================================================= */}
            <section className="py-18 sm:py-24 bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC] relative overflow-hidden">
                {/* Top Smooth White Blur Boundary */}
                <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/85 to-transparent pointer-events-none z-10 backdrop-blur-[4px]" />

                {/* Decorative Bottom-Right Orange Accent */}
                <svg 
                    className="absolute bottom-0 right-0 w-64 sm:w-96 h-32 pointer-events-none z-0" 
                    viewBox="0 0 360 140" 
                    fill="none" 
                    preserveAspectRatio="none"
                >
                    <path d="M360 140 L360 40 C280 70 180 110 100 140 Z" fill="#FF8A2B" opacity="0.15" />
                </svg>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF4FF] text-[#2F8BFF] text-xs font-mono font-bold border border-[#CCE2FF] shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-[#FF8A2B] animate-pulse"></span>
                        <span>SOLUSI TERSTANDAR UNTUK RUMAH SAKIT &amp; KLINIK</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1F2937] leading-tight font-display">
                        Siap Mengakselerasi Digitalisasi Faskes Anda?
                    </h2>

                    <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Jadwalkan sesi konsultasi dan demonstrasi langsung bersama konsultan klinis Liva SIMRS untuk melihat bagaimana sistem kami terhubung dengan alur kerja faskes Anda.
                    </p>

                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                        <Button
                            onClick={() => openDemoModal()}
                            className="h-12 px-7 rounded-full bg-[#2F8BFF] hover:bg-[#1E75E6] text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-200 cursor-pointer gap-2.5 btn-spring"
                        >
                            <Rocket className="h-4 w-4 text-white" />
                            <span>Ajukan Jadwal Demo Gratis</span>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => openAssessmentModal()}
                            className="h-12 px-7 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 gap-2.5 btn-spring cursor-pointer shadow-2xs"
                        >
                            <Activity className="h-4 w-4 text-[#FF8A2B]" />
                            <span>Uji Kesiapan SIMRS (2 Menit)</span>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

