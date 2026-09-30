import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { 
    Activity, 
    Layers, 
    Eye, 
    Maximize2, 
    ZoomIn, 
    Sliders, 
    CheckCircle2, 
    ShieldCheck, 
    ArrowRight, 
    Cpu, 
    HardDrive, 
    FileText, 
    Smartphone, 
    Clock, 
    Stethoscope, 
    Share2, 
    Sparkles, 
    Server,
    Wifi,
    Check,
    Scan,
    Radio,
    Zap,
    Download
} from 'lucide-react';

export default function RisPacsShowcase({ onScheduleDemo, onConsultIntegrator }) {
    const { getSetting } = useSite();
    // Interactive DICOM Viewer Simulator State
    const [selectedModality, setSelectedModality] = useState('ct-scan');
    const [windowPreset, setWindowPreset] = useState('lung');
    const [sliceIndex, setSliceIndex] = useState(48);
    const [isMeasuring, setIsMeasuring] = useState(true);
    const [isInverted, setIsInverted] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    // Modality Scenarios with Authentic Medical Scan Assets
    const modalities = [
        {
            id: 'ct-scan',
            title: 'CT-Scan Thorax Multi-Slice',
            modalityCode: 'CT',
            equipment: '128-Slice Multi-Detector CT',
            imageSrc: '/images/dicom_ct_slice.jpg',
            totalSlices: 120,
            initialSlice: 48,
            kvp: '120 kV',
            ma: '240 mA',
            thickness: '1.25 mm',
            caliperLabel: 'CALIPER Ø: 24.8 mm',
            caliperSub: 'Density: +42 HU (Hounsfield)',
            caliperPosition: 'top-[36%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-40 h-28',
            finding: 'Tampak nodul soliter berbatas tegas pada segmen apikal pulmo dextra (diameter 24.8 mm). Parenkim paru kiri bersih. Tidak tampak efusi pleura bilateral.',
            conclusion: 'Nodul soliter pulmo perifer dextra. Direkomendasikan evaluasi berkala / biopsi PA terpandu CT.',
            presets: [
                { id: 'lung', label: 'Lung Window', ww: 1500, wl: -600, filterClass: 'contrast-[1.25] brightness-[1.05]' },
                { id: 'mediastinal', label: 'Mediastinal', ww: 350, wl: 40, filterClass: 'contrast-[1.8] brightness-[0.75]' },
                { id: 'bone', label: 'Bone Window', ww: 2000, wl: 400, filterClass: 'contrast-[2.4] brightness-[1.2] grayscale' },
            ]
        },
        {
            id: 'cxr',
            title: 'Chest X-Ray Digital (CXR AP)',
            modalityCode: 'DX',
            equipment: 'Flat-Panel Digital Radiography (DR)',
            imageSrc: '/images/dicom_chest_xray.jpg',
            totalSlices: 1,
            initialSlice: 1,
            kvp: '85 kV',
            ma: '160 mA',
            thickness: 'Full Field',
            caliperLabel: 'CTR RATIO: 48.2%',
            caliperSub: 'Cardiac Diameter < 50% (Normal)',
            caliperPosition: 'top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-52 h-36',
            finding: 'Cor: Bentuk dan ukuran normal (CTR 48.2%). Pulmo: Corakan bronkovaskular dalam batas normal, tidak tampak infiltrat aktif. Kedua sinus kostofrenikus lancip.',
            conclusion: 'Foto Thorax dalam batas normal (Normal Chest Radiograph).',
            presets: [
                { id: 'lung', label: 'Radiographic Standard', ww: 1000, wl: 500, filterClass: 'contrast-[1.15] brightness-[1.0]' },
                { id: 'bone', label: 'High Contrast Ribs', ww: 1800, wl: 300, filterClass: 'contrast-[1.5] brightness-[0.9]' },
            ]
        },
        {
            id: 'mri-brain',
            title: 'Brain MRI (T2 FLAIR Axial)',
            modalityCode: 'MR',
            equipment: 'Superconducting 1.5 Tesla MRI',
            imageSrc: '/images/dicom_brain_mri.jpg',
            totalSlices: 36,
            initialSlice: 18,
            kvp: 'RF Head Coil',
            ma: 'TR: 9000 / TE: 110',
            thickness: '4.0 mm',
            caliperLabel: 'VENTRICULAR SYMMETRY',
            caliperSub: 'Lateral Ventricle: 12.6 mm',
            caliperPosition: 'top-[42%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-36 h-28',
            finding: 'Diferensiasi substansia grisea dan alba tegas. Ventrikel lateralis, III, dan IV dalam batas normal. Sulki kortikalis simetris, tidak tampak lesi hiperintens akut.',
            conclusion: 'Brain MRI T2 FLAIR normal. Tidak tampak infark serebri akut maupun massa intrakranial.',
            presets: [
                { id: 'lung', label: 'T2 FLAIR Balanced', ww: 800, wl: 350, filterClass: 'contrast-[1.2] brightness-[1.05]' },
                { id: 'mediastinal', label: 'Parenchyma Boost', ww: 1200, wl: 200, filterClass: 'contrast-[1.45] brightness-[0.95]' },
            ]
        },
        {
            id: 'usg',
            title: 'USG Abdomen 4D Doppler',
            modalityCode: 'US',
            equipment: 'High-Definition Color Doppler USG',
            imageSrc: '/images/dicom_usg_doppler.jpg',
            totalSlices: 1,
            initialSlice: 1,
            kvp: '3.5 - 5.0 MHz',
            ma: 'Acoustic MI: 0.8',
            thickness: 'Real-time Cine',
            caliperLabel: 'V. PORTA: 11.4 mm',
            caliperSub: 'Flow: Hepatopetal Normal',
            caliperPosition: 'top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 w-44 h-32',
            finding: 'Hepar: Ukuran dan ekotekstur homogen normal, tepi reguler. Vaskularisasi vena porta paten dengan aliran hepatopetal tanpa thrombus.',
            conclusion: 'Ultrasonografi Abdomen Atas normal. Tidak ditemukan kelainan parenkim hepar.',
            presets: [
                { id: 'lung', label: 'Harmonic Tissue', ww: 600, wl: 300, filterClass: 'contrast-[1.1] brightness-[1.0]' },
                { id: 'mediastinal', label: 'Doppler Enhanced', ww: 900, wl: 150, filterClass: 'contrast-[1.35] brightness-[1.05]' },
            ]
        }
    ];

    const currentMod = modalities.find(m => m.id === selectedModality) || modalities[0];
    const currentPreset = currentMod.presets.find(p => p.id === windowPreset) || currentMod.presets[0];

    const handleModalityChange = (id) => {
        setSelectedModality(id);
        const mod = modalities.find(m => m.id === id);
        if (mod) {
            setSliceIndex(mod.initialSlice);
            setWindowPreset(mod.presets[0].id);
        }
    };

    const handleCopySync = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
    };

    // Four Architectural Pillars of Liva RIS/PACS
    const architecturePillars = [
        {
            icon: Cpu,
            title: 'DICOM Modality Worklist (MWL)',
            badge: 'Otomasi 2-Arah',
            badgeColor: 'bg-blue-50 text-[#1E60D5] border-blue-200/80',
            desc: 'Pendaftaran pasien di loket SIMRS langsung terkirim otomatis ke konsol mesin CT/MRI/Rontgen via protokol DICOM C-FIND. Menghilangkan pengetikan ulang dan mencegah salah pasien 100%.'
        },
        {
            icon: Eye,
            title: 'Zero-Footprint Web DICOM Viewer',
            badge: 'Multi-Device',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
            desc: 'Akses citra multi-slice langsung di browser Chrome/Safari dari laptop dokter, tablet poli, hingga smartphone DPJP tanpa instalasi aplikasi desktop 500MB+ yang membebani memori.'
        },
        {
            icon: Clock,
            title: 'Akselerasi TAT Ekspertise < 12 Menit',
            badge: 'Emergency Ready',
            badgeColor: 'bg-amber-50 text-[#F97316] border-amber-200/80',
            desc: 'Begitu radiografer menyelesaikan scan, dokter radiolog langsung menerima notifikasi dan dapat menulis ekspertise terstruktur yang langsung tersinkron ke Rekam Medis (CPPT) SIMRS.'
        },
        {
            icon: HardDrive,
            title: 'Cloud Storage & Zero On-Premise CAPEX',
            badge: 'Hemat Biaya RS',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/80',
            desc: 'Eliminasi pembelian server storage NAS puluhan terabyte yang rawan rusak atau terserang ransomware. Citra tersimpan aman di cloud terenkripsi AES-256 dengan kompresi lossless ISO/IEC.'
        }
    ];

    // Supported Modalities Matrix
    const supportedModalities = [
        { name: 'CT-Scan 16-256 Slice', brands: 'GE • Siemens • Philips • Canon', status: 'C-STORE / MWL' },
        { name: 'Magnetic Resonance (MRI)', brands: '1.5T / 3.0T High-Field', status: 'Multi-Frame DICOM' },
        { name: 'Digital Radiography (DR / CR)', brands: 'Shimadzu • Carestream • Fuji', status: 'Direct Flat Panel' },
        { name: 'USG Color Doppler', brands: 'Mindray • Samsung • GE Voluson', status: 'Cine Video DICOM' },
        { name: 'C-Arm & Cathlab Jantung', brands: 'Philips Azurion • Siemens Artis', status: 'Angiography Ready' },
        { name: 'Mammography & Dental OPG', brands: 'Digital Mammogram & 3D CBCT', status: 'High-DPI Matrix' },
    ];

    return (
        <section id="ris-pacs-spotlight" className="py-10 sm:py-14 bg-[#F8FAFC] border-b border-slate-200/70 relative overflow-hidden">
            
            {/* Ambient Background Lighting - Clean CSS Radial without blur bleed */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    background: 'radial-gradient(ellipse 60% 50% at 85% 20%, rgba(30,96,213,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 15% 85%, rgba(16,185,129,0.08) 0%, transparent 70%)'
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
                
                {/* 1. Header & Value Proposition */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2FE] border border-[#BFDBFE] text-[#1E60D5] text-xs font-semibold shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse shrink-0"></span>
                        <span className="font-mono uppercase tracking-wider text-[11px]">{getSetting('pacs_badge_text', 'MODUL FLAGSHIP TERBARU')}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-700 font-medium">{getSetting('pacs_badge_sub', 'Liva Cloud RIS & Zero-Footprint PACS')}</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-[1.18] font-display">
                        {getSetting('pacs_headline_main', 'Sistem RIS/PACS Cloud Terintegrasi Penuh')}{' '}
                        <span className="text-[#1E60D5] relative inline-block">
                            {getSetting('pacs_headline_highlight', 'Rekam Medis SIMRS')}
                            <svg
                                className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#F97316] overflow-visible"
                                viewBox="0 0 160 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 7.5C45 2.5 115 2.5 158 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        {getSetting('pacs_description', 'Hubungkan mesin CT-Scan, MRI, X-Ray, dan USG langsung ke antarmuka dokter. Pangkas Turnaround Time (TAT) ekspertise radiologi dari 3 jam ke kurang dari 12 menit dengan zero-footprint web viewer berstandar DICOM 3.0 & SATUSEHAT Kemenkes.')}
                    </p>

                    {/* Trust Badges Strip */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-2xs font-medium text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            DICOM 3.0 (C-STORE &amp; MWL)
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-2xs font-medium text-slate-700">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#1E60D5]" />
                            SATUSEHAT FHIR ImagingStudy
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-2xs font-medium text-slate-700">
                            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                            Zero-Footprint Web HTML5
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-2xs font-medium text-slate-700">
                            <HardDrive className="w-3.5 h-3.5 text-[#F97316]" />
                            Zero Server On-Premise CAPEX
                        </span>
                    </div>
                </div>

                {/* 2. Interactive DICOM Diagnostic Simulator with Double-Bezel Enclosure */}
                <div className="p-2 sm:p-3.5 rounded-[2.5rem] bg-gradient-to-b from-slate-200/90 via-slate-100 to-slate-200 border border-slate-300/80 shadow-2xl shadow-slate-300/40">
                    
                    {/* Inner Machined Console Core */}
                    <div className="rounded-[calc(2.5rem-0.625rem)] overflow-hidden bg-slate-950 border border-slate-800 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)] flex flex-col">
                        
                        {/* 2.1 Simulator Top Control Bar */}
                        <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-400 flex items-center justify-center shrink-0">
                                    <Scan className="w-5 h-5 animate-pulse text-[#60A5FA]" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold tracking-wide font-display text-white">
                                            LIVA WEB-DICOM DIAGNOSTIC WORKSTATION
                                        </span>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                                            LIVE SIMULATOR
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400">
                                        Uji coba manipulasi citra medis berstandar diagnostik langsung di browser Anda
                                    </p>
                                </div>
                            </div>

                            {/* Modality Selector Tabs */}
                            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                                {modalities.map((mod) => {
                                    const isCurrent = selectedModality === mod.id;
                                    return (
                                        <button
                                            key={mod.id}
                                            type="button"
                                            onClick={() => handleModalityChange(mod.id)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer font-mono flex items-center gap-1.5 ${
                                                isCurrent
                                                    ? 'bg-[#1E60D5] text-white shadow-md shadow-blue-600/30 font-bold'
                                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                                            }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-emerald-300' : 'bg-slate-500'}`}></span>
                                            <span>{mod.modalityCode}</span>
                                            <span className="hidden sm:inline font-sans font-normal text-[11px] opacity-80">
                                                • {mod.title.split(' ')[0]}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                        </div>

                        {/* 2.2 Workspace Grid (Viewport 8 Cols + Expertise Panel 4 Cols) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
                            
                            {/* Viewport Screen (Left 8 Cols) */}
                            <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between relative bg-black border-b lg:border-b-0 lg:border-r border-slate-800 select-none overflow-hidden">
                                
                                {/* Viewport Medical Top HUD */}
                                <div className="flex items-start justify-between text-xs font-mono text-emerald-400/90 relative z-20 pointer-events-none">
                                    <div className="space-y-0.5 bg-slate-950/85 p-2.5 rounded-lg border border-slate-800/90 backdrop-blur-sm shadow-md">
                                        <div className="font-bold text-white text-[13px] tracking-wide flex items-center gap-2">
                                            <span>RM-2026-08914 • RAHMAT SANTOSO (52Y / L)</span>
                                        </div>
                                        <div className="text-[11px] text-slate-300">
                                            Study: {currentMod.title}
                                        </div>
                                        <div className="text-[10.5px] text-emerald-400">
                                            Modality: {currentMod.modalityCode} | {currentMod.equipment}
                                        </div>
                                    </div>

                                    <div className="text-right space-y-0.5 bg-slate-950/85 p-2.5 rounded-lg border border-slate-800/90 backdrop-blur-sm shadow-md">
                                        <div className="font-bold text-white text-[12px]">
                                            KV: {currentMod.kvp} | mA: {currentMod.ma}
                                        </div>
                                        <div className="text-[11px] text-slate-300">
                                            Slice Thick: {currentMod.thickness}
                                        </div>
                                        <div className="text-[10.5px] text-blue-400">
                                            WW: {currentPreset.ww} / WL: {currentPreset.wl}
                                        </div>
                                    </div>
                                </div>

                                {/* Actual Medical Scan Viewport Canvas */}
                                <div className="my-auto py-4 relative flex items-center justify-center overflow-hidden">
                                    
                                    <div className={`relative max-w-full rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-black transition-all duration-300 ${
                                        isInverted ? 'invert hue-rotate-180' : ''
                                    }`}>
                                        {/* Pure Anatomical Radiologic Scan Image */}
                                        <img
                                            src={currentMod.imageSrc}
                                            alt={currentMod.title}
                                            className={`max-h-[380px] w-auto object-contain mx-auto transition-all duration-300 ${
                                                currentPreset.filterClass
                                            }`}
                                        />

                                        {/* Anatomical Orientation Tags */}
                                        <div className="absolute top-3 left-3 text-[11px] font-mono font-bold text-amber-300 bg-black/70 px-2 py-0.5 rounded border border-amber-400/30">
                                            R (Right)
                                        </div>
                                        <div className="absolute top-3 right-3 text-[11px] font-mono font-bold text-amber-300 bg-black/70 px-2 py-0.5 rounded border border-amber-400/30">
                                            L (Left)
                                        </div>
                                        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-black/70 px-1 py-0.5 rounded">
                                            A
                                        </div>
                                        <div className="absolute top-1/2 right-3 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-black/70 px-1 py-0.5 rounded">
                                            P
                                        </div>

                                        {/* Calibrated Anatomical Caliper Measurement Box */}
                                        {isMeasuring && (
                                            <div className={`absolute pointer-events-none ${currentMod.caliperPosition}`}>
                                                <div className="w-full h-full border border-dashed border-cyan-400/90 rounded bg-cyan-500/10 flex flex-col items-center justify-center relative shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                                    
                                                    {/* Top Measurement Pill */}
                                                    <div className="absolute -top-3.5 bg-cyan-400 text-slate-950 font-mono font-bold text-[10.5px] px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                                                        <Maximize2 className="w-2.5 h-2.5" />
                                                        <span>{currentMod.caliperLabel}</span>
                                                    </div>

                                                    {/* Bottom Density Pill */}
                                                    <div className="absolute -bottom-3 bg-slate-950/90 text-emerald-400 font-mono text-[9.5px] px-2 py-0.5 rounded border border-emerald-500/40">
                                                        {currentMod.caliperSub}
                                                    </div>

                                                    {/* Crosshair Center Reticle */}
                                                    <div className="w-full h-px bg-cyan-400/50"></div>
                                                    <div className="h-full w-px bg-cyan-400/50 absolute"></div>
                                                </div>
                                            </div>
                                        )}

                                        {/* DICOM Storage Protocol Status */}
                                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 border border-slate-700/80 text-[10px] font-mono text-slate-300">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                            <span>DICOM C-STORE: ACK 200 (Lossless JPEG2000)</span>
                                        </div>
                                    </div>

                                </div>

                                {/* Viewport Diagnostic Control Toolbar */}
                                <div className="pt-3.5 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono relative z-20">
                                    
                                    {/* Windowing Presets */}
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="text-[11px] text-slate-400 mr-1 flex items-center gap-1">
                                            <Sliders className="w-3.5 h-3.5 text-blue-400" />
                                            <span>Preset Window:</span>
                                        </span>
                                        {currentMod.presets.map((pr) => {
                                            const isActive = windowPreset === pr.id;
                                            return (
                                                <button
                                                    key={pr.id}
                                                    type="button"
                                                    onClick={() => setWindowPreset(pr.id)}
                                                    className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                                                        isActive
                                                            ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                                                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                                                    }`}
                                                >
                                                    {pr.label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Tool Toggles */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsMeasuring(!isMeasuring)}
                                            className={`px-3 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                                                isMeasuring
                                                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm'
                                                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                                            }`}
                                        >
                                            <Maximize2 className="w-3.5 h-3.5" />
                                            <span>Kaliper Ukur</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setIsInverted(!isInverted)}
                                            className={`px-3 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                                                isInverted
                                                    ? 'bg-slate-200 text-slate-950 font-bold'
                                                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                                            }`}
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            <span>Invert Gray</span>
                                        </button>
                                    </div>

                                </div>

                                {/* Slice Scroller Slider if Multi-Slice */}
                                {currentMod.totalSlices > 1 && (
                                    <div className="pt-2.5 flex items-center gap-3 text-xs font-mono text-slate-400">
                                        <span className="shrink-0 text-[11px]">Slice {sliceIndex} / {currentMod.totalSlices}</span>
                                        <input
                                            type="range"
                                            min="1"
                                            max={currentMod.totalSlices}
                                            value={sliceIndex}
                                            onChange={(e) => setSliceIndex(Number(e.target.value))}
                                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#1E60D5]"
                                        />
                                        <span className="text-emerald-400 text-[11px] shrink-0 font-bold">
                                            Z: {(-180 + sliceIndex * 1.25).toFixed(1)} mm
                                        </span>
                                    </div>
                                )}

                            </div>

                            {/* Tele-Radiology & Auto-Sync Panel (Right 4 Cols) */}
                            <div className="lg:col-span-4 p-5 sm:p-6 bg-slate-900/95 flex flex-col justify-between space-y-5">
                                
                                <div className="space-y-4">
                                    {/* Doctor Profile Header */}
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-400 flex items-center justify-center font-bold text-xs">
                                                FR
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-white font-display">
                                                    dr. Farida Rahma, Sp.Rad (K)
                                                </div>
                                                <div className="text-[10.5px] text-slate-400 font-mono">
                                                    Spesialis Radiologi Konsultan
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                            TAT: 11.2 Mnt
                                        </span>
                                    </div>

                                    {/* Clinical Expertise Report Card */}
                                    <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                                        <div>
                                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                                                TEMUAN RADIOLOGIS (FINDINGS):
                                            </span>
                                            <p className="text-slate-200 leading-relaxed font-sans text-xs">
                                                {currentMod.finding}
                                            </p>
                                        </div>

                                        <div className="pt-2.5 border-t border-slate-800/80">
                                            <span className="text-[10px] font-mono text-[#F97316] uppercase tracking-wider block mb-1">
                                                KESIMPULAN (IMPRESSION):
                                            </span>
                                            <p className="text-white font-medium leading-relaxed font-sans text-xs">
                                                {currentMod.conclusion}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Auto-Sync Checklist */}
                                    <div className="space-y-2 pt-1 text-xs">
                                        <span className="text-[11px] font-mono text-slate-400 block font-semibold">
                                            STATUS INTEGRASI OTOMATIS:
                                        </span>
                                        
                                        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span className="text-slate-200 text-[11.5px]">CPPT &amp; RME SIMRS Dokter</span>
                                            </div>
                                            <span className="text-[10.5px] font-mono text-emerald-400 font-semibold">Tersinkron</span>
                                        </div>

                                        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span className="text-slate-200 text-[11.5px]">SATUSEHAT DiagnosticReport</span>
                                            </div>
                                            <span className="text-[10.5px] font-mono text-emerald-400 font-semibold">FHIR R4 Sent</span>
                                        </div>

                                        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span className="text-slate-200 text-[11.5px]">Tanda Tangan TTE BSrE</span>
                                            </div>
                                            <span className="text-[10.5px] font-mono text-emerald-400 font-semibold">Tervalidasi</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Direct Action Inside Console */}
                                <div className="pt-4 border-t border-slate-800 space-y-2.5">
                                    <button
                                        type="button"
                                        onClick={() => onScheduleDemo('Solusi Cloud RIS/PACS & DICOM Viewer')}
                                        className="w-full btn-amber-warm h-11 rounded-xl text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer focus-ring"
                                    >
                                        <Stethoscope className="w-4 h-4" />
                                        <span>Jadwalkan Live Demo RIS/PACS</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleCopySync}
                                        className="w-full h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                                    >
                                        {isCopied ? (
                                            <>
                                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                <span className="text-emerald-400">Ekspertise Disalin ke Clipboard!</span>
                                            </>
                                        ) : (
                                            <>
                                                <FileText className="w-3.5 h-3.5 text-blue-400" />
                                                <span>Salin Format Resume Ekspertise</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                {/* 3. 4 Arsitektur Utama Keunggulan RIS/PACS Liva (Double-Bezel Bento Grid) */}
                <div className="space-y-6 pt-4">
                    <div className="text-center max-w-xl mx-auto space-y-1.5">
                        <span className="text-xs font-mono font-bold text-[#1E60D5] uppercase tracking-wider">
                            ARSITEKTUR &amp; VALUE PROPOSITION
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display">
                            Mengapa Rumah Sakit Beralih ke Liva Cloud RIS/PACS?
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {architecturePillars.map((p, idx) => {
                            const Icon = p.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-1.5 rounded-[1.75rem] bg-slate-100/80 border border-slate-200/70 shadow-xs group"
                                >
                                    <div className="p-5 sm:p-6 rounded-[calc(1.75rem-0.375rem)] bg-white border border-slate-100 h-full flex flex-col justify-between space-y-4 group-hover:border-blue-200 group-hover:shadow-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                                        <div className="space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="w-10 h-10 rounded-xl bg-[#EBF2FE] text-[#1E60D5] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${p.badgeColor}`}>
                                                    {p.badge}
                                                </span>
                                            </div>

                                            <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-[#1E60D5] transition-colors leading-snug font-display">
                                                {p.title}
                                            </h4>

                                            <p className="text-xs text-slate-600 leading-relaxed">
                                                {p.desc}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#1E60D5]">
                                            <span>Native SIMRS Bridging</span>
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 4. Supported Modality Brands & Protocols Strip */}
                <div className="p-1.5 rounded-[2rem] bg-slate-100/80 border border-slate-200/70 shadow-xs">
                    <div className="p-6 sm:p-8 rounded-[calc(2rem-0.375rem)] bg-white border border-slate-100 space-y-5">
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                            <div>
                                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                                    MODALITY HARDWARE COMPATIBILITY MATRIX
                                </span>
                                <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                                    Kompatibel 100% dengan Seluruh Merk Mesin Modalitas Medis
                                </h4>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start md:self-auto font-semibold">
                                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                                <span>DICOM 3.0 • HL7 V2/V3 • FHIR R4 Ready</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                            {supportedModalities.map((item, i) => (
                                <div key={i} className="p-3.5 bg-[#F8FAFC] rounded-xl border border-slate-200/70 flex items-center justify-between gap-3 hover:border-blue-200 hover:bg-white transition-colors">
                                    <div className="space-y-0.5 min-w-0">
                                        <div className="text-xs font-bold text-slate-900 font-display truncate">
                                            {item.name}
                                        </div>
                                        <div className="text-[11px] text-slate-500 font-mono truncate">
                                            {item.brands}
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-mono text-[#1E60D5] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-semibold shrink-0">
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* 5. Executive Call-to-Action Card (Button-in-Button Architecture) */}
                <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-[#1E60D5] via-[#154db0] to-[#0F172A] text-white flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-xl shadow-blue-900/20 relative overflow-hidden">
                    
                    {/* Background Decorative Gradient */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_0%,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
                    
                    <div className="space-y-3 max-w-2xl relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono font-medium">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>MIGRASI RIS/PACS TANPA DOWNTIME PELAYANAN</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
                            Ingin Mencoba Liva RIS/PACS Terhubung Langsung ke Mesin Rontgen RS Anda?
                        </h3>
                        <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                            Tim teknis dan dokter konsultan Liva siap mendemonstrasikan integrasi DICOM Modality Worklist dan cloud viewer langsung di instalasi radiologi faskes Anda.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 relative z-10">
                        {/* Nested Island Button-in-Button */}
                        <button
                            type="button"
                            onClick={() => onScheduleDemo('Solusi Cloud RIS/PACS & DICOM Viewer')}
                            className="group h-13 pl-7 pr-3 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-xs sm:text-sm flex items-center justify-between gap-3 shadow-lg shadow-orange-500/30 transition-all duration-300 active:scale-[0.98] cursor-pointer focus-ring"
                        >
                            <span>Jadwalkan Live Demo RS</span>
                            <div className="w-8 h-8 rounded-full bg-black/15 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                                <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => onConsultIntegrator ? onConsultIntegrator() : onScheduleDemo('Konsultasi Bridging Modalitas Radiologi')}
                            className="h-13 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-2 cursor-pointer transition-colors focus-ring"
                        >
                            <Server className="w-4 h-4 text-blue-200" />
                            <span>Konsultasi Hardware Modalitas</span>
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
}
