import React, { useState, useMemo } from 'react';
import { useSite } from '../../context/SiteContext';
import SectionWrapper from '../../components/public/SectionWrapper';
import { getSectionCustomStyles } from '../../lib/sectionStyler';
import {
    Activity,
    Layers,
    Monitor,
    Shield,
    ShieldCheck,
    Cpu,
    Zap,
    CheckCircle2,
    ArrowRight,
    Search,
    Sliders,
    Maximize2,
    Eye,
    Sun,
    Contrast,
    RotateCw,
    Move,
    Sparkles,
    FileText,
    Share2,
    Download,
    Lock,
    Server,
    Database,
    HardDrive,
    Smartphone,
    Tablet,
    Laptop,
    Check,
    ChevronRight,
    HelpCircle,
    ChevronDown,
    Building2,
    Hospital,
    PhoneCall,
    Rocket,
    Clock,
    TrendingDown,
    DollarSign,
    RefreshCw,
    Maximize,
    FolderKanban,
    Mic,
    Play,
    Pause,
    Home
} from 'lucide-react';

export default function RisPacsPage({ onNavigate }) {
    const { getSetting, openDemoModal, openAssessmentModal } = useSite();

    // Workstation Live Interactive Simulation State
    const [activeModality, setActiveModality] = useState('ct_scan');
    const [ctSlice, setCtSlice] = useState(24);
    const [windowPreset, setWindowPreset] = useState('lung');
    const [activeTool, setActiveTool] = useState('wl');
    const [showAiOverlay, setShowAiOverlay] = useState(true);
    const [isInverted, setIsInverted] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [isCinePlaying, setIsCinePlaying] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState(0);

    // ROI Calculator State
    const [monthlyExams, setMonthlyExams] = useState(1200);
    const costPerFilm = 38500; // IDR per physical film + chemical + envelope
    const yearlySavings = useMemo(() => {
        const totalFilmCost = monthlyExams * costPerFilm * 12;
        const operationalSavings = totalFilmCost * 0.82; // 82% savings considering minimal cloud pacs storage
        return Math.round(operationalSavings);
    }, [monthlyExams]);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(number);
    };

    // Dynamic Theme Mood & Spacing Density
    const theme = getSetting('page_ris-pacs_theme', 'clinical-blue');
    const density = getSetting('page_ris-pacs_density', 'normal');
    const cardRadius = getSetting('page_ris-pacs_card_radius', 'rounded-2xl');

    const themeClass = {
        'clinical-blue': 'bg-[#F8FAFC] text-[#0F172A]',
        'pure-white': 'bg-white text-[#0F172A]',
        'dark-slate': 'bg-[#0B1120] text-slate-100',
        'emerald-health': 'bg-[#F0FDF4]/40 text-[#064E3B]',
        'indigo-luxury': 'bg-[#F5F3FF]/40 text-[#1E1B4B]',
    }[theme] || 'bg-[#F8FAFC] text-[#0F172A]';

    const pyDensity = {
        compact: 'py-8 sm:py-10',
        normal: 'py-12 sm:py-16',
        spacious: 'py-16 sm:py-24',
    }[density] || 'py-12 sm:py-16';

    // Parse Dynamic Section Order
    const rawOrder = getSetting('page_ris-pacs_section_order');
    let orderedKeys = [
        'hero',
        'viewer_demo',
        'features',
        'modality_matrix',
        'workflow',
        'teleradiology',
        'roi_calculator',
        'security_compliance',
        'faq',
        'cta_banner'
    ];

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

    // =========================================================================
    // 1. HERO SECTION
    // =========================================================================
    const renderHero = () => {
        const heroStyles = getSectionCustomStyles(getSetting, 'ris-pacs', 'hero', {
            defaultBgClass: 'bg-gradient-to-b from-white via-[#F0F6FE] to-[#F8FAFC]',
            accent: '#1B84FF',
            defaultPaddingClass: 'pt-6 pb-12 sm:pb-16',
        });

        return (
            <section
                key="hero"
                id="sec-ris-pacs-hero"
                className={`relative w-full ${heroStyles.bgClass} ${heroStyles.paddingClass} ${heroStyles.borderClass} overflow-hidden`}
                style={heroStyles.bgStyle}
            >
                {heroStyles.hasAmbientGlow && (
                    <div
                        className="absolute inset-0 pointer-events-none opacity-30"
                        style={{
                            background: `radial-gradient(ellipse 60% 50% at 75% 0%, ${heroStyles.accentColor || '#1B84FF'}20 0%, transparent 70%)`
                        }}
                    />
                )}
                {heroStyles.hasGridLines && (
                    <div className="absolute inset-0 bg-clinical-grid opacity-50 pointer-events-none" />
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
                    {/* Breadcrumb Navigation */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                        <button
                            type="button"
                            onClick={() => onNavigate('beranda')}
                            className="hover:text-[#1E60D5] transition-colors flex items-center gap-1 cursor-pointer font-medium focus-ring rounded"
                        >
                            <Home className="h-3.5 w-3.5" />
                            <span>Beranda</span>
                        </button>
                        <span>/</span>
                        <button
                            type="button"
                            onClick={() => onNavigate('modul-simrs')}
                            className="hover:text-[#1E60D5] transition-colors cursor-pointer font-medium"
                        >
                            Ekosistem SIMRS
                        </button>
                        <span>/</span>
                        <span className="text-[#0F172A] font-semibold">Cloud RIS / PACS Radiologi</span>
                    </nav>

                    {/* Symmetrical 2-Column Hero Structure */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7 space-y-4">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] border border-[#BFDBFE] text-[#1E60D5] font-mono text-xs font-semibold shadow-2xs">
                                <span className="w-2 h-2 rounded-full bg-[#1E60D5] animate-pulse" />
                                <span>{heroStyles.badge || getSetting('ris_pacs_badge', 'DICOM 3.0 • ZERO-FOOTPRINT CLOUD PACS • SATUSEHAT READY')}</span>
                            </div>

                            <h1 className={`text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-tight font-display text-slate-900 ${heroStyles.titleTextClass}`}>
                                {heroStyles.title || getSetting('ris_pacs_title', 'Liva Cloud RIS & PACS: Sistem Radiologi & Arsip Citra Medis Berkecepatan Tinggi')}
                            </h1>

                            <p className={`text-xs sm:text-sm lg:text-base leading-relaxed text-slate-600 max-w-2xl ${heroStyles.bodyTextClass}`}>
                                {heroStyles.description || getSetting('ris_pacs_subtitle', 'Modernisasi instalasi radiologi rumah sakit dengan penampil DICOM web tanpa instalasi (zero-footprint), triase berbantuan AI (CADe/CADt), transmisi citra sub-detik, serta bridging otomatis ke Rekam Medis Elektronik (RME) & SATUSEHAT Kemenkes.')}
                            </p>

                            {/* Dual CTAs & Key Metrics */}
                            <div className="pt-2 flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => openDemoModal()}
                                    className="btn-amber-warm btn-spring h-11 px-6 rounded-full text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm focus-ring"
                                >
                                    <Rocket className="h-4 w-4 text-white" />
                                    <span>Jadwalkan Live Demo RIS/PACS</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const el = document.getElementById('sec-ris-pacs-viewer_demo');
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="btn-spring h-11 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-300 gap-2 flex items-center justify-center cursor-pointer shadow-2xs focus-ring"
                                >
                                    <Eye className="h-4 w-4 text-[#1E60D5]" />
                                    <span>Coba Workstation DICOM</span>
                                </button>
                            </div>

                            {/* 4 Micro Pill Proof Indicators */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-slate-200/80 font-mono text-[11px]">
                                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                                    <span className="text-slate-400 block text-[9.5px] uppercase font-bold">LATENSI RENDER</span>
                                    <span className="text-sm font-black text-[#1E60D5] font-display">&lt; 0.8 Detik</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                                    <span className="text-slate-400 block text-[9.5px] uppercase font-bold">STANDAR PROTOKOL</span>
                                    <span className="text-sm font-black text-emerald-600 font-display">DICOM 3.0 / MWL</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                                    <span className="text-slate-400 block text-[9.5px] uppercase font-bold">HEMAT BIAYA FILM</span>
                                    <span className="text-sm font-black text-amber-600 font-display">Hingga 85%</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                                    <span className="text-slate-400 block text-[9.5px] uppercase font-bold">KONEKSI RME</span>
                                    <span className="text-sm font-black text-purple-600 font-display">HL7 FHIR R4</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Telemetry Double-Bezel Workstation Card */}
                        <div className="lg:col-span-5 flex justify-center">
                            <div className="w-full max-w-md p-2 rounded-2xl bg-gradient-to-br from-blue-100/90 via-slate-100 to-emerald-50/60 border border-blue-200/90 shadow-md">
                                <div className="p-4 sm:p-5 rounded-xl bg-[#0F172A] text-slate-100 space-y-3 font-mono">
                                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 text-[11px]">
                                        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                            <span>LIVA PACS NODE: ACTIVE</span>
                                        </div>
                                        <span className="text-slate-400">TLS 1.3 AES-256</span>
                                    </div>

                                    {/* Mini Workstation Visual */}
                                    <div className="relative rounded-lg overflow-hidden border border-slate-700 aspect-4/3 bg-black flex items-center justify-center group">
                                        <img
                                            src="/images/liva_ris_pacs_workstation.jpg"
                                            alt="Liva RIS PACS Workstation"
                                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.src = '/images/dicom_ct_slice.jpg';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                                            <span className="text-[10px] text-emerald-400 font-bold">● AI CADt DETECTED: NO ACUTE LESION</span>
                                            <span className="text-xs text-white font-bold font-sans">CT Thorax 128-Slice • 512x512 HU</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-[10.5px] pt-1">
                                        <div className="p-2 rounded bg-slate-800/80 border border-slate-700/80">
                                            <span className="text-slate-400 block text-[9px]">STORAGE EFFICIENCY</span>
                                            <span className="font-bold text-white">Lossless Compression (10:1)</span>
                                        </div>
                                        <div className="p-2 rounded bg-slate-800/80 border border-slate-700/80">
                                            <span className="text-slate-400 block text-[9px]">WORKLIST SYNC</span>
                                            <span className="font-bold text-emerald-400">Real-time Auto-MWL</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // =========================================================================
    // 2. INTERACTIVE DICOM VIEWER WORKSTATION DEMO
    // =========================================================================
    const renderViewerDemo = () => {
        const modalities = [
            { id: 'ct_scan', label: 'CT Scan Thorax (128-Slice)', badge: 'Multi-Slice CT', image: '/images/dicom_ct_slice.jpg', patient: 'Ny. Siti Rahma (46 Thn)', idNum: 'RM-782910' },
            { id: 'chest_xray', label: 'Digital X-Ray Thorax (DR/CR)', badge: 'Digital Radiography', image: '/images/dicom_chest_xray.jpg', patient: 'Tn. Hendra Wijaya (52 Thn)', idNum: 'RM-654120' },
            { id: 'brain_mri', label: 'MRI Brain T1/T2 Flair', badge: 'High-Field MRI', image: '/images/dicom_brain_mri.jpg', patient: 'Ny. Dewi Lestari (34 Thn)', idNum: 'RM-890123' },
            { id: 'usg_doppler', label: 'USG 4D Doppler Kardiologi', badge: 'Color Doppler', image: '/images/dicom_usg_doppler.jpg', patient: 'Tn. Ahmad Fauzi (58 Thn)', idNum: 'RM-443198' },
        ];

        const activeModData = modalities.find(m => m.id === activeModality) || modalities[0];

        return (
            <section key="viewer_demo" id="sec-ris-pacs-viewer_demo" className={`${pyDensity} bg-transparent`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1E60D5] font-mono text-xs font-semibold">
                            <Monitor className="h-3.5 w-3.5" />
                            <span>INTERACTIVE ZERO-FOOTPRINT WEB WORKSTATION</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                            Simulasi Langsung Penampil DICOM Radiolog
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Rasakan kecepatan diagnostik penampil citra medis Liva PACS berbasis WebGL &amp; WebAssembly. Berfungsi mulus di browser tanpa perlu instalasi aplikasi tambahan.
                        </p>
                    </div>

                    {/* Modality Selector Tabs */}
                    <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {modalities.map((mod) => {
                            const isSelected = activeModality === mod.id;
                            return (
                                <button
                                    key={mod.id}
                                    type="button"
                                    onClick={() => setActiveModality(mod.id)}
                                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap btn-spring flex items-center gap-2 ${
                                        isSelected
                                            ? 'bg-[#1E60D5] text-white shadow-sm shadow-blue-500/25'
                                            : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs'
                                    }`}
                                >
                                    <Activity className={`h-3.5 w-3.5 ${isSelected ? 'text-white' : 'text-[#1E60D5]'}`} />
                                    <span>{mod.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Workstation Container (Dark Terminal Aesthetic) */}
                    <div className="w-full rounded-2xl bg-[#090D16] border border-slate-800 shadow-xl overflow-hidden text-slate-200">
                        {/* 1. Workstation Top Metadata Bar */}
                        <div className="p-3 sm:px-4 bg-[#0F172A] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-bold text-white">{activeModData.patient}</span>
                                    <span className="text-slate-500">|</span>
                                    <span className="text-slate-400">{activeModData.idNum}</span>
                                    <span className="text-slate-500">|</span>
                                    <span className="text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/80 text-[10.5px]">
                                        {activeModData.badge}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                                <span>Matrix: 512 x 512</span>
                                <span className="hidden sm:inline">Zoom: {zoomLevel}%</span>
                                <span className="text-slate-500">|</span>
                                <span className="text-[#38BDF8]">DICOMweb WADO-RS</span>
                            </div>
                        </div>

                        {/* 2. Main Workstation Body: Tools on left, Canvas in center, Dictation on right */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[460px]">
                            {/* Left: Tool Palette */}
                            <div className="lg:col-span-2 p-3 bg-[#0C121E] border-r border-slate-800/80 space-y-3 font-sans">
                                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block">
                                    Peralatan Diagnostik
                                </span>

                                <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 text-xs">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTool('wl')}
                                        className={`p-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors text-left ${
                                            activeTool === 'wl' ? 'bg-[#1E60D5] text-white font-semibold' : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300'
                                        }`}
                                    >
                                        <Sun className="h-4 w-4" />
                                        <span>Window / Level (W/L)</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setActiveTool('measure')}
                                        className={`p-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors text-left ${
                                            activeTool === 'measure' ? 'bg-[#1E60D5] text-white font-semibold' : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300'
                                        }`}
                                    >
                                        <Sliders className="h-4 w-4" />
                                        <span>Caliper &amp; Jarak (cm)</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setIsInverted(!isInverted)}
                                        className={`p-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors text-left ${
                                            isInverted ? 'bg-amber-600 text-white font-semibold' : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300'
                                        }`}
                                    >
                                        <Contrast className="h-4 w-4" />
                                        <span>Invert LUT {isInverted ? '(ON)' : ''}</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowAiOverlay(!showAiOverlay)}
                                        className={`p-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors text-left ${
                                            showAiOverlay ? 'bg-purple-600 text-white font-semibold' : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300'
                                        }`}
                                    >
                                        <Sparkles className="h-4 w-4" />
                                        <span>AI CADt Triage</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setZoomLevel(prev => prev === 100 ? 150 : 100)}
                                        className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 flex items-center gap-2 cursor-pointer transition-colors text-left"
                                    >
                                        <Maximize className="h-4 w-4" />
                                        <span>Toggle Zoom 150%</span>
                                    </button>
                                </div>

                                {/* Window Presets (For CT) */}
                                {activeModality === 'ct_scan' && (
                                    <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Window Preset (HU):</span>
                                        <div className="grid grid-cols-2 gap-1 text-[11px]">
                                            {['lung', 'bone', 'mediastinum', 'brain'].map((preset) => (
                                                <button
                                                    key={preset}
                                                    type="button"
                                                    onClick={() => setWindowPreset(preset)}
                                                    className={`px-2 py-1 rounded text-center uppercase font-mono cursor-pointer transition-colors ${
                                                        windowPreset === preset ? 'bg-[#38BDF8] text-slate-900 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                                                    }`}
                                                >
                                                    {preset}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Center: DICOM Image Canvas Area */}
                            <div className="lg:col-span-7 p-4 bg-black flex flex-col items-center justify-center relative overflow-hidden select-none min-h-[380px]">
                                {/* DICOM Canvas Image Container */}
                                <div
                                    className={`relative max-w-full max-h-[380px] rounded border border-slate-800 overflow-hidden transition-all duration-300 ${
                                        isInverted ? 'invert hue-rotate-180' : ''
                                    }`}
                                    style={{
                                        transform: `scale(${zoomLevel / 100})`,
                                        filter: windowPreset === 'bone' ? 'contrast(160%) brightness(90%)' : windowPreset === 'lung' ? 'contrast(120%) brightness(105%)' : 'none'
                                    }}
                                >
                                    <img
                                        src={activeModData.image}
                                        alt={activeModData.label}
                                        className="max-h-[360px] w-auto object-contain mx-auto"
                                        onError={(e) => {
                                            e.target.src = '/images/dicom_ct_slice.jpg';
                                        }}
                                    />

                                    {/* AI CADt Annotation Overlay */}
                                    {showAiOverlay && (
                                        <div className="absolute top-1/4 right-1/4 p-2 rounded border border-emerald-400 bg-emerald-950/60 text-emerald-300 text-[10px] font-mono space-y-0.5 animate-pulse">
                                            <div className="font-bold flex items-center gap-1">
                                                <Sparkles className="h-3 w-3 text-emerald-400" />
                                                <span>AI CADe: Normal Variant</span>
                                            </div>
                                            <div className="text-[9px] text-emerald-200">Confidence: 96.8% (No Acute Lesion)</div>
                                        </div>
                                    )}

                                    {/* Measurement Caliper Marker */}
                                    {activeTool === 'measure' && (
                                        <div className="absolute bottom-1/3 left-1/4 flex items-center gap-1 font-mono text-[10px] text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-400/80">
                                            <span>⌀ 14.8 mm</span>
                                        </div>
                                    )}
                                </div>

                                {/* CT Slice Scrubber (If CT scan) */}
                                {activeModality === 'ct_scan' && (
                                    <div className="w-full max-w-md mt-4 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3 text-xs font-mono">
                                        <span className="text-slate-400 shrink-0 text-[11px]">Slice {ctSlice} / 64</span>
                                        <input
                                            type="range"
                                            min="1"
                                            max="64"
                                            value={ctSlice}
                                            onChange={(e) => setCtSlice(parseInt(e.target.value))}
                                            className="w-full accent-[#1E60D5] cursor-pointer"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsCinePlaying(!isCinePlaying)}
                                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                                        >
                                            {isCinePlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Right: Radiologist Clinical Report & Dictation */}
                            <div className="lg:col-span-3 p-3.5 bg-[#0C121E] border-l border-slate-800/80 space-y-3 font-sans flex flex-col justify-between">
                                <div className="space-y-2.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                                            Ekspertise Radiolog
                                        </span>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/40 text-blue-400 border border-blue-800/60 font-semibold">
                                            E-Sign BSrE Ready
                                        </span>
                                    </div>

                                    {/* Clinical Text Snippet */}
                                    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11.5px] space-y-1.5 leading-relaxed text-slate-300">
                                        <div className="font-bold text-white text-xs font-mono border-b border-slate-800 pb-1 flex items-center justify-between">
                                            <span>HASIL PEMERIKSAAN:</span>
                                            <span className="text-[10px] text-emerald-400 font-normal">Auto-Saved</span>
                                        </div>
                                        <p className="text-[11px] text-slate-300">
                                            Cor: Bentuk dan ukuran dalam batas normal. CTR &lt; 50%.
                                        </p>
                                        <p className="text-[11px] text-slate-300">
                                            Pulmo: Corakan bronkovaskular normal. Tidak tampak infiltrat, konsolidasi, atau efusi pleura.
                                        </p>
                                        <div className="pt-1 text-[11px] font-bold text-emerald-400 font-mono">
                                            KESIMPULAN: Cor &amp; Pulmo normal.
                                        </div>
                                    </div>

                                    {/* Voice Dictation Button */}
                                    <button
                                        type="button"
                                        className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                                    >
                                        <Mic className="h-3.5 w-3.5 text-[#F97316]" />
                                        <span>Dikte Suara (Voice-to-Text)</span>
                                    </button>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                                    <button
                                        type="button"
                                        onClick={() => openDemoModal()}
                                        className="w-full py-2 rounded-lg bg-[#1E60D5] hover:bg-[#164DB0] text-white font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                                    >
                                        <Share2 className="h-3.5 w-3.5" />
                                        <span>Kirim ke RME &amp; SATUSEHAT</span>
                                    </button>
                                    <span className="text-[10px] font-mono text-center block text-slate-400">
                                        Integrasi otomatis dengan modul Rawat Jalan &amp; Inap
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // =========================================================================
    // 3. CORE FEATURES & ADVANTAGES GRID
    // =========================================================================
    const renderFeatures = () => {
        const features = [
            {
                icon: Zap,
                title: 'Zero-Footprint Web Streaming',
                desc: 'Buka dan evaluasi citra DICOM langsung dari Google Chrome, Safari, atau Edge tanpa perlu install software, Java Runtime, atau plugin desktop yang memberatkan PC rumah sakit.',
                badge: 'WebGL 2.0 Native'
            },
            {
                icon: Cpu,
                title: 'AI Diagnostic Triage (CADe/CADt)',
                desc: 'Algoritma machine learning secara instan memprioritaskan antrean kasus cito (seperti perdarahan intrakranial, pneumotoraks masif, atau fraktur akut) untuk respon dokter spesialis tercepat.',
                badge: 'Sub-Second AI'
            },
            {
                icon: RefreshCw,
                title: 'Modality Worklist (MWL) & Auto-Sync',
                desc: 'Bebas kesalahan ketik data identitas pasien. Jadwal pemeriksaan dari SIMRS otomatis terkirim langsung ke panel kontrol alat scanner (CT, X-Ray, MRI, USG).',
                badge: 'HL7 DICOM 3.0'
            },
            {
                icon: Layers,
                title: 'Multi-Modality & Multi-Series Fusion',
                desc: 'Mendukung perbandingan citra historis pasien secara side-by-side, sinkronisasi scroll cross-series, MIP/MPR 3D rendering, dan overlay series otomatis.',
                badge: '3D MPR & MIP'
            },
            {
                icon: Lock,
                title: 'Enkripsi AES-256 & Audit Trail Medis',
                desc: 'Data rekam medis radiologi terlindungi enkripsi standar perbankan. Dilengkapi pencatatan riwayat akses terperinci serta watermark dinamis nama faskes untuk mencegah kebocoran data.',
                badge: 'ISO 27001 & UU PDP'
            },
            {
                icon: Server,
                title: 'Hybrid Cloud & Local PACS Gateway',
                desc: 'Kombinasi storage lokal berkecepatan tinggi di jaringan LAN RS dengan backup arsip multi-tier di cloud. Citra tetap dapat diakses walau koneksi internet faskes sedang terputus.',
                badge: 'High-Availability SLA'
            }
        ];

        return (
            <section key="features" id="sec-ris-pacs-features" className={`${pyDensity} bg-transparent`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="text-center max-w-3xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1E60D5] font-mono text-xs font-semibold">
                            <Sparkles className="h-3.5 w-3.5 text-[#F97316]" />
                            <span>ARSITEKTUR RADIOLOGI GENERASI BARU</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                            6 Keunggulan Utama Liva Cloud RIS &amp; PACS
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Dirancang spesifik untuk mengatasi kendala lambatnya transfer file citra besar, mahalnya cetak film konvensional, serta kompleksitas bridging antar vendor.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {features.map((feat, idx) => {
                            const IconComp = feat.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-300 space-y-3.5 group flex flex-col justify-between"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#1E60D5] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#1E60D5] group-hover:text-white transition-all">
                                                <IconComp className="h-5 w-5" />
                                            </div>
                                            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                                                {feat.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-[#1E60D5] transition-colors">
                                            {feat.title}
                                        </h3>

                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            {feat.desc}
                                        </p>
                                    </div>

                                    <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#1E60D5]">
                                        <span>Terintegrasi Standar RS</span>
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    };

    // =========================================================================
    // 4. MODALITY COMPATIBILITY MATRIX
    // =========================================================================
    const renderModalityMatrix = () => {
        const modalities = [
            { code: 'DR / CR', title: 'Digital Radiography (X-Ray)', desc: 'X-Ray Thorax, Abdomen, Tulang & Gigi', image: '/images/dicom_chest_xray.jpg' },
            { code: 'CT-Scan', title: 'Multi-slice Computed Tomography', desc: '16, 32, 64, 128 hingga 512 Slices dengan kontras', image: '/images/dicom_ct_slice.jpg' },
            { code: 'MRI', title: 'Magnetic Resonance Imaging', desc: 'MRI 1.5T / 3.0T Brain, Spine, Ekstremitas & Kontras', image: '/images/dicom_brain_mri.jpg' },
            { code: 'USG', title: 'Ultrasonography & Doppler', desc: 'USG Abdomen, Kandungan 4D, Vaskular & Echo Kardiologi', image: '/images/dicom_usg_doppler.jpg' },
            { code: 'MAMMO', title: 'Digital Mammography', desc: 'Skrining payudara & 3D Breast Tomosynthesis', image: '/images/dicom_chest_xray.jpg' },
            { code: 'C-ARM', title: 'Fluoroscopy & Cath Lab', desc: 'Ruang Operasi (OK) & Tindakan Intervensi Jantung', image: '/images/liva_ris_pacs_workstation.jpg' },
            { code: 'PET-CT', title: 'Kedokteran Nuklir & Onkologi', desc: 'Imaging Onkologi, Fusion Citra & Staging Tumor', image: '/images/dicom_ct_slice.jpg' },
            { code: 'ENDO', title: 'Endoskopi Medis HD', desc: 'Video & Snapshot Gastroskopi, Kolonoskopi & Laparoskopi', image: '/images/dicom_usg_doppler.jpg' },
        ];

        return (
            <section key="modality_matrix" id="sec-ris-pacs-modality_matrix" className={`${pyDensity} bg-transparent`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="text-center max-w-3xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1E60D5] font-mono text-xs font-semibold">
                            <Layers className="h-3.5 w-3.5" />
                            <span>UNIVERSAL MODALITY COMPATIBILITY</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                            Kompatibel dengan Seluruh Modalitas &amp; Merk Mesin
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Mendukung protokol DICOM 3.0 standar untuk seluruh manufaktur terkemuka dunia: GE Healthcare, Siemens Healthineers, Philips, Canon/Toshiba, Shimadzu, Mindray, FujiFilm, dan Samsung Medison.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {modalities.map((mod, i) => (
                            <div
                                key={i}
                                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col"
                            >
                                <div className="h-32 w-full bg-slate-900 relative overflow-hidden">
                                    <img
                                        src={mod.image}
                                        alt={mod.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                                        onError={(e) => {
                                            e.target.src = '/images/dicom_ct_slice.jpg';
                                        }}
                                    />
                                    <div className="absolute top-2.5 left-2.5">
                                        <span className="px-2.5 py-1 rounded-md bg-[#0F172A]/90 text-white font-mono text-[10px] font-bold border border-slate-700/80 shadow-xs">
                                            {mod.code}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 font-display group-hover:text-[#1E60D5] transition-colors">
                                            {mod.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                                            {mod.desc}
                                        </p>
                                    </div>
                                    <div className="pt-2 text-[10.5px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                                        <Check className="h-3 w-3" />
                                        <span>DICOM Store &amp; MWL Ready</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    // =========================================================================
    // 5. RADIOLOGY WORKFLOW END-TO-END
    // =========================================================================
    const renderWorkflow = () => {
        const steps = [
            { num: '01', title: 'Order Elektronik dari RME', desc: 'Dokter DPJP membuat permintaan radiologi langsung di Rekam Medis Elektronik (RME) saat pasien di Poliklinik atau Rawat Inap.', icon: FileText },
            { num: '02', title: 'Worklist Otomatis (MWL)', desc: 'Identitas pasien & jenis pemeriksaan langsung muncul di layar modalitas tanpa radiografer perlu mengetik ulang data manual.', icon: RefreshCw },
            { num: '03', title: 'Akuisisi Citra & Auto-Routing', desc: 'Selesai pemindaian, citra DICOM langsung terkirim otomatis ke Liva PACS Cloud dan workstation dokter spesialis radiologi.', icon: Server },
            { num: '04', title: 'Ekspertise & AI Assistance', desc: 'Radiolog membaca citra dengan workstation resolusi tinggi, bantuan AI triage, dan template ekspertise terstruktur.', icon: Sparkles },
            { num: '05', title: 'Bridging RME & SATUSEHAT', desc: 'Hasil ekspertise dan tautan penampil citra otomatis terintegrasi ke rekam medis pasien serta portal SATUSEHAT Kemenkes.', icon: CheckCircle2 },
        ];

        return (
            <section key="workflow" id="sec-ris-pacs-workflow" className={`${pyDensity} bg-transparent`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="text-center max-w-3xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1E60D5] font-mono text-xs font-semibold">
                            <Workflow className="h-3.5 w-3.5" />
                            <span>END-TO-END CLINICAL INTEGRATION</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                            Alur Kerja Radiologi Terintegrasi &amp; Nir-Kertas
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Proses 100% digital tanpa jeda waktu antrean pengantaran berkas fisik, menghemat waktu tunggu pasien secara signifikan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                        {steps.map((step, idx) => {
                            const IconComponent = step.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-300 space-y-3 relative flex flex-col justify-between"
                                >
                                    <div className="space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-xl font-extrabold text-blue-200">
                                                {step.num}
                                            </span>
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E60D5] flex items-center justify-center">
                                                <IconComponent className="h-4 w-4" />
                                            </div>
                                        </div>

                                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-display">
                                            {step.title}
                                        </h3>

                                        <p className="text-[11.5px] text-slate-600 leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>

                                    <div className="pt-2 text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1">
                                        <span>Tahap {idx + 1} dari 5</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    };

    // Helper icon for workflow
    function Workflow(props) {
        return <Activity {...props} />;
    }

    // =========================================================================
    // 6. TELERADIOLOGY & MULTI-FASKES
    // =========================================================================
    const renderTeleradiology = () => {
        return (
            <section key="teleradiology" id="sec-ris-pacs-teleradiology" className={`${pyDensity} bg-transparent`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0F172A] to-blue-950 text-white border border-slate-800 shadow-xl space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-7 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-semibold border border-blue-400/30">
                                    <Globe className="h-3.5 w-3.5" />
                                    <span>24/7 TELERADIOLOGY CLOUD PLATFORM</span>
                                </div>

                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display leading-tight">
                                    Solusi Teleradiologi untuk Sentralisasi Ekspertise Lintas Rumah Sakit
                                </h2>

                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                    Atasi keterbatasan dokter spesialis radiologi di daerah. Dengan Liva Teleradiology, citra dari RSUD cabang atau klinik satelit dapat dibaca secara jarak jauh oleh dokter sub-spesialis dari mana saja melalui koneksi aman terenkripsi.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                                        <span className="text-slate-400 text-[10px] block">TURNAROUND TIME</span>
                                        <span className="text-base font-bold text-emerald-400">&lt; 20 Menit</span>
                                        <p className="text-[10px] text-slate-400 font-sans">Untuk kasus Cito / IGD</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                                        <span className="text-slate-400 text-[10px] block">MULTI-DEVICE</span>
                                        <span className="text-base font-bold text-white">iPad / Mac / PC</span>
                                        <p className="text-[10px] text-slate-400 font-sans">Zero installation app</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                                        <span className="text-slate-400 text-[10px] block">JEJARING FASKES</span>
                                        <span className="text-base font-bold text-[#38BDF8]">Multi-Tenant Hub</span>
                                        <p className="text-[10px] text-slate-400 font-sans">Grup RS &amp; RSUD</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-5 flex justify-center">
                                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-4 w-full">
                                    <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                                        Kemudahan Akses Dokter Radiolog:
                                    </span>

                                    <ul className="space-y-3 text-xs text-slate-200">
                                        <li className="flex items-start gap-2.5">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span><strong>Notifikasi Real-Time:</strong> Peringatan otomatis melalui WhatsApp &amp; SMS saat ada kasus cito yang memerlukan pembacaan segera.</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span><strong>Template Klinis Siap Pakai:</strong> 150+ format ekspertise terstruktur untuk berbagai jenis pemeriksaan diagnostik.</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span><strong>Tanda Tangan Elektronik:</strong> Integrasi sertifikat digital BSrE BSSN resmi diakui akreditasi KARS STARKES.</span>
                                        </li>
                                    </ul>

                                    <button
                                        type="button"
                                        onClick={() => openDemoModal()}
                                        className="w-full py-2.5 rounded-xl bg-[#1E60D5] hover:bg-[#164DB0] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <PhoneCall className="h-3.5 w-3.5" />
                                        <span>Konsultasi Skema Teleradiologi</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // Helper icon for teleradiology
    function Globe(props) {
        return <Activity {...props} />;
    }

    // =========================================================================
    // 7. FILM-LESS ROI & COST SAVINGS CALCULATOR
    // =========================================================================
    const renderRoiCalculator = () => {
        return (
            <section key="roi_calculator" id="sec-ris-pacs-roi_calculator" className={`${pyDensity} bg-transparent`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="text-center max-w-3xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-mono text-xs font-semibold">
                            <DollarSign className="h-3.5 w-3.5" />
                            <span>FILM-LESS HOSPITAL ROI CALCULATOR</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                            Kalkulator Penghematan Biaya Transisi Film-less
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Hitung berapa ratus juta rupiah anggaran operasional rumah sakit yang dapat dihemat setiap tahun dengan beralih dari film rontgen fisik ke arsip digital Liva Cloud PACS.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
                        {/* Interactive Slider Input */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label htmlFor="exam-slider" className="text-xs sm:text-sm font-bold text-slate-800">
                                    Estimasi Jumlah Pemeriksaan Radiologi per Bulan:
                                </label>
                                <span className="font-mono text-base sm:text-lg font-black text-[#1E60D5] px-3 py-1 rounded-lg bg-blue-50 border border-blue-200">
                                    {monthlyExams.toLocaleString('id-ID')} Pemeriksaan / Bln
                                </span>
                            </div>

                            <input
                                id="exam-slider"
                                type="range"
                                min="200"
                                max="6000"
                                step="100"
                                value={monthlyExams}
                                onChange={(e) => setMonthlyExams(parseInt(e.target.value))}
                                className="w-full h-2.5 bg-slate-200 rounded-lg accent-[#1E60D5] cursor-pointer"
                            />

                            <div className="flex justify-between text-[10.5px] font-mono text-slate-400">
                                <span>200 Foto (Klinik Pratama)</span>
                                <span>1.500 Foto (RSUD Tipe C)</span>
                                <span>6.000 Foto (RSUD Tipe A / B)</span>
                            </div>
                        </div>

                        {/* Calculated Results Bento */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 font-mono">
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                                <span className="text-[10px] text-slate-500 uppercase font-bold">Biaya Film Fisik (Konvensional)</span>
                                <div className="text-base sm:text-lg font-black text-slate-800">
                                    {formatRupiah(monthlyExams * costPerFilm * 12)}
                                </div>
                                <span className="text-[10px] text-slate-400 block font-sans">Per tahun (Film + Kimia + Amplop)</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                                <span className="text-[10px] text-emerald-700 uppercase font-bold">Estimasi Penghematan RS</span>
                                <div className="text-lg sm:text-xl font-black text-emerald-600">
                                    {formatRupiah(yearlySavings)}
                                </div>
                                <span className="text-[10px] text-emerald-700 block font-sans">Penghematan bersih per tahun (82%)</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                                <span className="text-[10px] text-[#1E60D5] uppercase font-bold">Percepatan Hasil (TAT)</span>
                                <div className="text-lg sm:text-xl font-black text-[#1E60D5]">
                                    12 Jam &rarr; 20 Mnt
                                </div>
                                <span className="text-[10px] text-blue-600 block font-sans">Keluaran hasil radiologi lebih cepat</span>
                            </div>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-slate-500 max-w-md">
                                *Perhitungan berdasarkan rata-rata biaya film dry/wet view, cairan fixer, amplop cetak, dan ruang penyimpanan arsip fisik di faskes Indonesia.
                            </p>
                            <button
                                type="button"
                                onClick={() => openDemoModal()}
                                className="btn-amber-warm btn-spring h-10 px-5 rounded-full text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
                            >
                                <TrendingDown className="h-4 w-4" />
                                <span>Minta Analisis ROI Lengkap Faskes</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // =========================================================================
    // 8. SECURITY, COMPLIANCE & STARKES
    // =========================================================================
    const renderSecurityCompliance = () => {
        const specs = [
            { title: 'Enkripsi Data In-Transit & At-Rest', desc: 'Seluruh citra radiologi terenkripsi standar AES-256 GCM dan protokol transmisi TLS 1.3.' },
            { title: 'Kepatuhan UU PDP No. 27/2022', desc: 'Hak akses berbasis peran (RBAC), pencegahan unduh tanpa izin, dan dynamic watermarking rekam medis.' },
            { title: 'Audit Trail Medis Terperinci', desc: 'Setiap pembukaan, ekspor, atau pencetakan citra dicatat otomatis untuk audit klinis rumah sakit.' },
            { title: 'Standar Akreditasi KARS STARKES', desc: 'Memenuhi 100% parameter penilaian Manajemen Rekam Medis (MRMIK) dan Integrasi Diagnostik.' },
        ];

        return (
            <section key="security_compliance" id="sec-ris-pacs-security_compliance" className={`${pyDensity} bg-transparent`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                            <div className="space-y-1">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-semibold border border-emerald-200">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    <span>ENTERPRISE-GRADE MEDICAL DATA GOVERNANCE</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                                    Keamanan &amp; Kepatuhan Regulasi Kesehatan
                                </h2>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-600">
                                <span className="px-3 py-1 rounded-lg bg-slate-100 font-bold">ISO 27001</span>
                                <span className="px-3 py-1 rounded-lg bg-slate-100 font-bold">HIPAA Compliant</span>
                                <span className="px-3 py-1 rounded-lg bg-slate-100 font-bold">BSrE Certified</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {specs.map((item, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                                    <div className="flex items-center gap-2 text-[#1E60D5] font-bold text-xs">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        <span>{item.title}</span>
                                    </div>
                                    <p className="text-[11.5px] text-slate-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // =========================================================================
    // 9. FAQ RADIOLOGI & PACS
    // =========================================================================
    const renderFaq = () => {
        const faqs = [
            {
                q: 'Apakah Liva PACS kompatibel dengan mesin rontgen / CT-Scan lama di rumah sakit kami?',
                a: 'Ya, Liva Cloud PACS kompatibel dengan seluruh alat yang mendukung protokol standar DICOM 3.0 (Store & MWL). Untuk alat analog lama yang belum memiliki modul DICOM digital, tim teknis kami menyediakan converter DICOM Gateway / Frame Grabber.'
            },
            {
                q: 'Berapa kebutuhan kecepatan internet (bandwidth) untuk menggunakan Cloud PACS?',
                a: 'Berkat teknologi Progressive Streaming & WebAssembly Liva PACS, citra layer diagnostik esensial dapat dibuka dalam < 0.8 detik dengan koneksi internet standar (10-20 Mbps). Kami juga memasang Local PACS Cache di jaringan LAN RS sehingga pembacaan citra di dalam RS berkecepatan Gigabit lokal tanpa membebani kuota internet.'
            },
            {
                q: 'Bagaimana cara memigrasikan arsip citra radiologi lama rumah sakit yang tersimpan di CD/DVD atau NAS lama?',
                a: 'Tim Liva menyediakan layanan migrasi data DICOM massal (*Data Ingestion Tool*) untuk memindahkan seluruh arsip historis rumah sakit Anda ke Liva Cloud Storage dengan verifikasi integritas checksum 100% aman.'
            },
            {
                q: 'Apakah hasil ekspertise radiologi dapat langsung dilihat dokter poli di Rekam Medis Elektronik (RME)?',
                a: 'Ya, hasil ekspertise radiolog beserta tautan penampil citra interaktif terintegrasi langsung secara otomatis ke lembar RME pasien (Rawat Jalan, Rawat Inap, maupun IGD) tanpa perlu cetak kertas atau kirim fisik.'
            },
            {
                q: 'Apakah Liva PACS sudah terintegrasi dengan SATUSEHAT Kemenkes?',
                a: 'Ya, Liva RIS/PACS telah memenuhi standar interoperabilitas HL7 FHIR R4 Kemenkes RI untuk modul Diagnostik Penunjang (DiagnosticReport & ImagingStudy) sesuai Permenkes No. 24 Tahun 2022.'
            }
        ];

        return (
            <section key="faq" id="sec-ris-pacs-faq" className={`${pyDensity} bg-transparent`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1E60D5] font-mono text-xs font-semibold">
                            <HelpCircle className="h-3.5 w-3.5" />
                            <span>PERTANYAAN UMUM PENGADAAN RADIOLOGI</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                            Pertanyaan Seputar Liva Cloud RIS &amp; PACS
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => {
                            const isOpen = expandedFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden transition-all duration-200 shadow-2xs"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setExpandedFaq(isOpen ? -1 : idx)}
                                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="text-xs sm:text-sm font-bold text-slate-900 font-display">
                                            {faq.q}
                                        </span>
                                        <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#1E60D5]' : ''}`} />
                                    </button>

                                    {isOpen && (
                                        <div className="px-4 pb-5 sm:px-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fade-in">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    };

    // =========================================================================
    // 10. CTA BANNER
    // =========================================================================
    const renderCtaBanner = () => {
        return (
            <section key="cta_banner" id="sec-ris-pacs-cta_banner" className={`${pyDensity} bg-white border-t border-slate-200/70 relative overflow-hidden`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] text-[#1E60D5] text-xs font-mono font-semibold border border-[#BFDBFE]">
                        <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
                        <span>MODERNISASI RADIOLOGI RUMAH SAKIT ANDA</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] font-display">
                        Siap Bertransisi ke Radiologi 100% Digital &amp; Film-less?
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                        Hubungi konsultan radiologi Liva untuk survei kompatibilitas alat scanner RS Anda, uji coba penampil DICOM interaktif, dan simulasi ROI penghematan biaya operasional.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => openDemoModal()}
                            className="btn-amber-warm btn-spring h-11 px-6 rounded-full text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm focus-ring"
                        >
                            <Rocket className="h-4 w-4 text-white" />
                            <span>Jadwalkan Live Demo RIS/PACS</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => openAssessmentModal()}
                            className="btn-spring h-11 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-300 gap-2 flex items-center justify-center cursor-pointer shadow-2xs focus-ring"
                        >
                            <Activity className="h-4 w-4 text-[#F97316]" />
                            <span>Uji Kesiapan Radiologi (2 Mnt)</span>
                        </button>
                    </div>
                </div>
            </section>
        );
    };

    const sectionRenderers = {
        hero: renderHero,
        viewer_demo: renderViewerDemo,
        features: renderFeatures,
        modality_matrix: renderModalityMatrix,
        workflow: renderWorkflow,
        teleradiology: renderTeleradiology,
        roi_calculator: renderRoiCalculator,
        security_compliance: renderSecurityCompliance,
        faq: renderFaq,
        cta_banner: renderCtaBanner,
    };

    return (
        <div className={`flex flex-col w-full min-h-screen font-sans antialiased transition-colors ${themeClass}`}>
            {orderedKeys.map((key) => {
                const fn = sectionRenderers[key];
                if (!fn) return null;
                if (key === 'hero' || key === 'viewer_demo') {
                    return <React.Fragment key={key}>{fn()}</React.Fragment>;
                }
                return (
                    <SectionWrapper key={key} pageId="ris-pacs" secId={key} showContainer={false}>
                        {fn()}
                    </SectionWrapper>
                );
            })}
        </div>
    );
}
