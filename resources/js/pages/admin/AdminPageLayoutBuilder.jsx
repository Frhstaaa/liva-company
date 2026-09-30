import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSite } from '../../context/SiteContext';
import WebpUploadButton from '../../components/WebpUploadButton';
import SectionComprehensiveEditor from '../../components/admin/SectionComprehensiveEditor';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Palette,
    Layers,
    ArrowUp,
    ArrowDown,
    Eye,
    EyeOff,
    Monitor,
    Tablet,
    Smartphone,
    RotateCcw,
    Save,
    Sparkles,
    CheckCircle2,
    Sliders,
    Globe,
    Award,
    Users,
    Calendar,
    ShieldCheck,
    Type,
    ArrowRight,
    Edit3,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    RefreshCw,
    Activity,
    ImageIcon,
    HelpCircle
} from 'lucide-react';

// Definitions for all 6 public pages and their individual sections
const PAGE_DEFINITIONS = {
    beranda: {
        id: 'beranda',
        name: 'Halaman Beranda (Home)',
        path: '/',
        icon: Globe,
        description: 'Landing page utama faskes, visual hero, live cockpit SIMRS, PACS radiologi, 6 pilar, modul, peta sebaran, FAQ, dan CTA banner.',
        defaultSections: [
            { id: 'hero', name: '1. Hero & Value Proposition', desc: 'Headline utama, badge regulasi, deskripsi, & tombol pendaftaran demo.', visible: true },
            { id: 'cockpit', name: '2. Cockpit Telemetri Medis', desc: 'Simulasi dashboard interaktif Direktur RS & indikator BOR real-time.', visible: true },
            { id: 'pacs', name: '3. Cloud RIS/PACS & DICOM', desc: 'Penampil radiologi CT-Scan/MRI & integrasi nakes langsung ke RME.', visible: true },
            { id: 'solutions', name: '4. Solusi Spesifik Faskes', desc: 'Segmentasi RSUD, RS Swasta, RSIA, dan Klinik Pratama.', visible: true },
            { id: 'trust', name: '5. Kredensial Brand & Regulasi', desc: 'Sertifikasi ISO 27001, UU PDP, BSrE BSSN & VClaim BPJS.', visible: true },
            { id: 'pillars', name: '6. Enam Pilar Keunggulan', desc: 'Grid 6 pilar diferensiasi arsitektur KLAS Liva SIMRS.', visible: true },
            { id: 'modules', name: '7. Katalog 36 Modul SIMRS', desc: 'Preview modul terpadu IGD, Ranap, Farmasi hingga Rekam Medis.', visible: true },
            { id: 'network_map', name: '8. Peta Sebaran Faskes', desc: 'Distribusi 40+ RS dan faskes mitra dari Sabang sampai Merauke.', visible: true },
            { id: 'faq', name: '9. FAQ Interaktif & Pengadaan', desc: 'Tanya jawab migrasi data, legalitas, SLA cloud, & skema investasi.', visible: true },
            { id: 'cta_banner', name: '10. Banner Konsultasi Bawah', desc: 'Ajakan reservasi demo gratis & assessment kesiapan faskes 2 menit.', visible: true },
        ],
    },
    'modul-simrs': {
        id: 'modul-simrs',
        name: 'Katalog 36 Modul SIMRS',
        path: '/modul-simrs',
        icon: Layers,
        description: 'Eksplorasi modul klinis terpadu IGD, Rawat Jalan, Casemix, Farmasi, Laboratorium LIS, dan RME Paripurna.',
        defaultSections: [
            { id: 'hero', name: '1. Hero Header & Akreditasi', desc: 'Judul katalog, total modul siap pakai, dan badge KARS STARKES.', visible: true },
            { id: 'filter_search', name: '2. Bilah Pencarian & Kategori', desc: 'Input pencarian kata kunci dan filter kategori modul klinis.', visible: true },
            { id: 'modules_grid', name: '3. Grid 36 Kartu Modul SIMRS', desc: 'Daftar interaktif 36 modul dengan alur kerja dan modal detail.', visible: true },
            { id: 'cta', name: '4. Banner Konsultasi Kustomisasi', desc: 'Ajakan konsultasi alur kerja khusus sesuai SOP faskes Anda.', visible: true },
        ],
    },
    keunggulan: {
        id: 'keunggulan',
        name: 'Keunggulan & Standar KLAS',
        path: '/keunggulan',
        icon: ShieldCheck,
        description: 'Standar evaluasi internasional KLAS, 4 KPI strip, 6 pilar fondasi arsitektur, dan matriks komparasi vendor.',
        defaultSections: [
            { id: 'hero', name: '1. Hero Header & 4 KPI Strip', desc: 'Headline keunggulan, KPI uptime 99.98%, dan sinkronisasi FHIR.', visible: true },
            { id: 'pillars', name: '2. Grid 6 Pilar Fondasi Sistem', desc: 'Arsitektur cloud native, zero trust security, dan interoperabilitas.', visible: true },
            { id: 'comparison', name: '3. Matriks Komparasi Standar KLAS', desc: 'Tabel perbandingan mendalam vs vendor konvensional & in-house.', visible: true },
            { id: 'cta', name: '4. Banner Uji Kesiapan & Assessment', desc: 'Tombol konsultasi teknis arsitektur bersama tim klinis.', visible: true },
        ],
    },
    'studi-kasus': {
        id: 'studi-kasus',
        name: 'Studi Kasus RS Mitra & ROI',
        path: '/studi-kasus',
        icon: Award,
        description: 'Kisah nyata peningkatan efisiensi, penurunan waktu tunggu, dan kalkulator simulasi ROI kapasitas bed.',
        defaultSections: [
            { id: 'hero', name: '1. Hero Header & Evidensi Klinis', desc: 'Headline evidensi nyata transformasi digital faskes mitra.', visible: true },
            { id: 'case_cards', name: '2. Kartu Studi Kasus RSUD & Swasta', desc: 'Metrik penurunan dispute BPJS, efisiensi waktu, dan testimoni direktur.', visible: true },
            { id: 'roi_calculator', name: '3. Kalkulator Simulasi ROI RS', desc: 'Simulasi penghematan operasional faskes berdasarkan kapasitas tempat tidur.', visible: true },
            { id: 'cta', name: '4. Banner Diskusi Kasus Faskes', desc: 'Ajakan studi kelayakan faskes bersama konsultan senior Liva.', visible: true },
        ],
    },
    'tentang-kami': {
        id: 'tentang-kami',
        name: 'Tentang Kami & Profil RS',
        path: '/tentang-kami',
        icon: Users,
        description: 'Visi kesehatan digital Indonesia, misi transformasi faskes, counter 40+ mitra, core values, dan tim manajemen.',
        defaultSections: [
            { id: 'hero', name: '1. Hero Naratif & Filosofi Layanan', desc: 'Profil perusahaan membangun fondasi digital rumah sakit Indonesia.', visible: true },
            { id: 'stats', name: '2. Strip 4 Metrik Statistik', desc: '40+ mitra faskes, 99.98% SLA uptime, entri RME < 2.4 menit, 100% FHIR.', visible: true },
            { id: 'visi_misi', name: '3. Visi & Misi Transformasi', desc: 'Standar emas arsitektur digital dan komitmen pelayanan nakes.', visible: true },
            { id: 'values', name: '4. Empat Nilai Inti Perusahaan', desc: 'Clinical-First UX, Zero-Compromise Security, Interoperabilitas.', visible: true },
            { id: 'leadership', name: '5. Dewan Direksi & Ahli Medis', desc: 'Profil dokter spesialis, pakar rekam medis, dan insinyur cloud.', visible: true },
            { id: 'cta', name: '6. Banner Presentasi Direksi Faskes', desc: 'Jadwalkan audiensi presentasi langsung dengan pimpinan Liva.', visible: true },
        ],
    },
    'jadwalkan-demo': {
        id: 'jadwalkan-demo',
        name: 'Jadwalkan Live Demo RS',
        path: '/jadwalkan-demo',
        icon: Calendar,
        description: 'Formulir reservasi sandbox klinis, komitmen NDA medis, 3 tahapan agenda, dan self-assessment kesiapan faskes.',
        defaultSections: [
            { id: 'hero', name: '1. Hero Header & Lencana NDA', desc: 'Judul sesi demo klinis dan jaminan kerahasiaan data medis.', visible: true },
            { id: 'form_grid', name: '2. Formulir Reservasi & Modul', desc: 'Pilihan modul peminatan, tipe faskes, jadwal demo, dan PIC RS.', visible: true },
            { id: 'guarantee', name: '3. Kotak Jaminan & Agenda Demo', desc: 'Agenda 3 tahapan demonstrasi klinis dan jaminan respon < 2 jam kerja.', visible: true },
            { id: 'faq_help', name: '4. Bantuan & Kuis Kesiapan SIMRS', desc: 'Self-assessment kesiapan faskes 2 menit sebelum sesi demo.', visible: true },
        ],
    },
};

// Design Theme Presets
const THEME_PRESETS = [
    {
        id: 'clinical-blue',
        name: 'Klinis Modern Biru (Default)',
        desc: 'Suasana medis terpercaya dengan biru royal, putih bersih, dan aksen oranye hangat.',
        primary: '#1B84FF',
        bg: '#FFFFFF',
        accent: '#F97316',
        badge: 'Medical Standard',
    },
    {
        id: 'pure-white',
        name: 'Minimalis Editorial Putih',
        desc: 'Kontras tinggi, tipografi tajam, latar putih murni dengan garis border abu-abu halus.',
        primary: '#0F172A',
        bg: '#FFFFFF',
        accent: '#2563EB',
        badge: 'High-End Minimalist',
    },
    {
        id: 'dark-slate',
        name: 'Midnight Health-Tech (Gelap)',
        desc: 'Latar gelap elegan bernuansa deep slate dengan pendar neon cyan futuristik.',
        primary: '#38BDF8',
        bg: '#0F172A',
        accent: '#818CF8',
        badge: 'Luxury Dark',
    },
    {
        id: 'emerald-health',
        name: 'Kemenkes Sehat (Zamrud)',
        desc: 'Nuansa hijau kesehatan terstandar Kemenkes yang menenangkan dan ramah pasien.',
        primary: '#059669',
        bg: '#F0FDF4',
        accent: '#10B981',
        badge: 'Health Trust',
    },
    {
        id: 'indigo-luxury',
        name: 'Royal Health-AI (Indigo)',
        desc: 'Kombinasi modern deep indigo dan violet klinis mencerminkan kecerdasan AI rumah sakit.',
        primary: '#4F46E5',
        bg: '#EEF2FF',
        accent: '#9333EA',
        badge: 'Enterprise AI',
    },
];

export default function AdminPageLayoutBuilder({ initialPageId = 'beranda', onNavigatePublic }) {
    const { refetchSiteData, showToast } = useSite();

    // Active page being customized
    const [activePageId, setActivePageId] = useState(initialPageId);

    // Studio Mode: 'editor' (Sections & Content), 'design' (Visual Theme), 'simulator' (Live Viewport)
    const [studioTab, setStudioTab] = useState('editor');

    // Simulator Device: 'desktop', 'tablet', 'mobile'
    const [previewDevice, setPreviewDevice] = useState('desktop');

    // Expanded accordion section IDs for editing content
    const [expandedSections, setExpandedSections] = useState({ hero: true });

    const [settingsMap, setSettingsMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Keep activePageId in sync if prop changes
    useEffect(() => {
        if (initialPageId && PAGE_DEFINITIONS[initialPageId]) {
            setActivePageId(initialPageId);
            setExpandedSections({ hero: true });
        }
    }, [initialPageId]);

    // Fetch existing settings
    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/settings');
            if (res.data.status === 'success') {
                const map = {};
                res.data.data.forEach((s) => {
                    map[s.key] = s.raw_value !== undefined ? s.raw_value : s.value;
                });
                setSettingsMap(map);
            }
        } catch (err) {
            showToast('Gagal memuat konfigurasi halaman', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleChange = (key, value) => {
        setSettingsMap((prev) => ({
            ...prev,
            [key]: value,
        }));
        setHasUnsavedChanges(true);
    };

    // Toggle expand for a section content form
    const toggleExpandSection = (secId) => {
        setExpandedSections((prev) => ({
            ...prev,
            [secId]: !prev[secId],
        }));
    };

    // Helper: Get parsed section order for active page
    const getPageSections = (pageId) => {
        const orderKey = `page_${pageId}_section_order`;
        const raw = settingsMap[orderKey];
        if (raw) {
            try {
                const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
                if (Array.isArray(parsed) && parsed.length > 0) {
                    const def = PAGE_DEFINITIONS[pageId]?.defaultSections || [];
                    const merged = parsed.map((item) => {
                        const original = def.find((d) => d.id === item.id);
                        return {
                            id: item.id,
                            name: original?.name || item.id,
                            desc: original?.desc || '',
                            visible: item.visible !== false,
                        };
                    });
                    def.forEach((d) => {
                        if (!merged.some((m) => m.id === d.id)) {
                            merged.push({ ...d });
                        }
                    });
                    return merged;
                }
            } catch (e) {
                // fallback
            }
        }
        return PAGE_DEFINITIONS[pageId]?.defaultSections || [];
    };

    // Save Section Order back to settingsMap
    const updateSectionOrder = (pageId, newSections) => {
        const orderKey = `page_${pageId}_section_order`;
        const payload = newSections.map((s) => ({
            id: s.id,
            visible: s.visible !== false,
        }));
        handleChange(orderKey, JSON.stringify(payload));
    };

    // Move Section Up
    const handleMoveUp = (pageId, index) => {
        if (index <= 0) return;
        const sections = [...getPageSections(pageId)];
        const temp = sections[index - 1];
        sections[index - 1] = sections[index];
        sections[index] = temp;
        updateSectionOrder(pageId, sections);
        showToast('Urutan seksi dinaikkan', 'success');
    };

    // Move Section Down
    const handleMoveDown = (pageId, index) => {
        const sections = [...getPageSections(pageId)];
        if (index >= sections.length - 1) return;
        const temp = sections[index + 1];
        sections[index + 1] = sections[index];
        sections[index] = temp;
        updateSectionOrder(pageId, sections);
        showToast('Urutan seksi diturunkan', 'success');
    };

    // Toggle Section Visibility
    const handleToggleSectionVisibility = (pageId, index) => {
        const sections = [...getPageSections(pageId)];
        sections[index].visible = !sections[index].visible;
        updateSectionOrder(pageId, sections);
        showToast(
            `Seksi ${sections[index].visible ? 'ditampilkan di web' : 'disembunyikan dari web'}`,
            'info'
        );
    };

    // Reset Sections to factory default
    const handleResetSections = (pageId) => {
        const def = PAGE_DEFINITIONS[pageId]?.defaultSections || [];
        updateSectionOrder(pageId, def);
        showToast(`Susunan seksi ${PAGE_DEFINITIONS[pageId]?.name} dikembalikan ke bawaan pabrik`, 'success');
    };

    // Save all changes atomically
    const handleSaveAll = async () => {
        try {
            setSaving(true);
            const res = await axios.post('/api/admin/settings/batch', {
                settings: settingsMap,
            });

            if (res.data.status === 'success') {
                showToast(`Perubahan ${activePageDef.name} berhasil disimpan dan diterapkan ke website publik!`, 'success');
                setHasUnsavedChanges(false);
                await refetchSiteData();
            } else {
                showToast(res.data.message || 'Gagal menyimpan perubahan', 'error');
            }
        } catch (err) {
            console.error('Batch save error:', err);
            showToast('Terjadi kesalahan koneksi saat menyimpan perubahan', 'error');
        } finally {
            setSaving(false);
        }
    };

    const activePageDef = PAGE_DEFINITIONS[activePageId] || PAGE_DEFINITIONS.beranda;
    const currentSections = getPageSections(activePageId);

    // Active visual design settings
    const currentTheme = settingsMap[`page_${activePageId}_theme`] || 'clinical-blue';
    const currentDensity = settingsMap[`page_${activePageId}_density`] || 'normal';
    const currentCardRadius = settingsMap[`page_${activePageId}_card_radius`] || 'rounded-2xl';
    const currentHeaderStyle = settingsMap[`page_${activePageId}_header_style`] || 'split-hero';

    if (loading) {
        return (
            <div className="flex items-center justify-center p-24">
                <div className="flex flex-col items-center gap-3">
                    <span className="w-8 h-8 border-3 border-[#1B84FF] border-t-transparent rounded-full animate-spin"></span>
                    <span className="text-xs text-[#78829D] font-mono tracking-wide">
                        Memuat Visual Page Studio Liva SIMRS...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-24">
            {/* ========================================================================= */}
            {/* 1. VISUAL PAGE SELECTOR TOP BAR                                           */}
            {/* ========================================================================= */}
            <div className="bg-white rounded-2xl border border-[#EFF2F5] p-3 shadow-xs">
                <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-[#EFF2F5]">
                    <div className="flex items-center gap-2">
                        <Sliders className="h-4 w-4 text-[#1B84FF]" />
                        <span className="text-xs font-bold text-[#181C32] font-display uppercase tracking-wider">
                            PILIH HALAMAN WEBSITE YANG INGIN DIUBAH:
                        </span>
                    </div>

                    <a
                        href={activePageDef.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-[#1B84FF] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                        <span>Lihat Halaman di Tab Baru</span>
                        <ExternalLink className="h-3 w-3" />
                    </a>
                </div>

                {/* 6 Page Tabs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {Object.values(PAGE_DEFINITIONS).map((page) => {
                        const Icon = page.icon;
                        const isSelected = activePageId === page.id;
                        return (
                            <button
                                key={page.id}
                                type="button"
                                onClick={() => {
                                    setActivePageId(page.id);
                                    setExpandedSections({ hero: true });
                                }}
                                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                                    isSelected
                                        ? 'bg-[#1B84FF] text-white border-[#1B84FF] shadow-md shadow-blue-500/20'
                                        : 'bg-[#F9F9F9] hover:bg-[#F1FAFF] text-[#181C32] border-[#EFF2F5] hover:border-[#1B84FF]/40'
                                }`}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <Icon className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-[#1B84FF]'}`} />
                                    {isSelected && (
                                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                    )}
                                </div>
                                <div>
                                    <span className={`text-xs font-bold block truncate ${isSelected ? 'text-white' : 'text-[#181C32]'}`}>
                                        {page.name.split(' ')[0]} {page.name.split(' ')[1] || ''}
                                    </span>
                                    <span className={`text-[10px] block truncate ${isSelected ? 'text-blue-100' : 'text-[#78829D]'}`}>
                                        {page.defaultSections.length} Seksi
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ========================================================================= */}
            {/* 2. STUDIO WORKSPACE HEADER & TAB SWITCHER                                 */}
            {/* ========================================================================= */}
            <div className="bg-white rounded-2xl border border-[#EFF2F5] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#1B84FF]/10 text-[#1B84FF] flex items-center justify-center font-bold shrink-0">
                        {React.createElement(activePageDef.icon, { className: 'h-6 w-6 text-[#1B84FF]' })}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-[#181C32] font-display">
                                {activePageDef.name}
                            </h2>
                            <Badge className="bg-[#E8FFF3] text-[#50CD89] border-0 text-[10px] font-mono">
                                Rute: {activePageDef.path}
                            </Badge>
                        </div>
                        <p className="text-xs text-[#78829D] mt-0.5">
                            {activePageDef.description}
                        </p>
                    </div>
                </div>

                {/* Studio Mode Selector */}
                <div className="flex items-center gap-1.5 p-1 bg-[#F5F8FA] rounded-xl border border-[#EFF2F5] self-start sm:self-auto">
                    <button
                        type="button"
                        onClick={() => setStudioTab('editor')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            studioTab === 'editor'
                                ? 'bg-white text-[#181C32] shadow-2xs'
                                : 'text-[#78829D] hover:text-[#181C32]'
                        }`}
                    >
                        <Edit3 className="h-3.5 w-3.5 text-[#1B84FF]" />
                        <span>Konten &amp; Seksi</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setStudioTab('design')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            studioTab === 'design'
                                ? 'bg-white text-[#181C32] shadow-2xs'
                                : 'text-[#78829D] hover:text-[#181C32]'
                        }`}
                    >
                        <Palette className="h-3.5 w-3.5 text-purple-600" />
                        <span>Desain Mandiri</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setStudioTab('simulator')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            studioTab === 'simulator'
                                ? 'bg-white text-[#181C32] shadow-2xs'
                                : 'text-[#78829D] hover:text-[#181C32]'
                        }`}
                    >
                        <Monitor className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Simulator Live</span>
                    </button>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* 3. MODE 1: KONTEN & TATA LETAK SEKSI (ACCORDION PER SEKSI)                 */}
            {/* ========================================================================= */}
            {studioTab === 'editor' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F1FAFF] border border-[#BFDBFE] rounded-2xl p-4">
                        <div className="space-y-0.5">
                            <span className="text-xs font-bold text-[#1E60D5] flex items-center gap-1.5">
                                <Sparkles className="h-4 w-4" />
                                Panduan Pengaturan Tata Letak &amp; Konten
                            </span>
                            <p className="text-[11px] text-slate-600">
                                Gunakan tombol panah <strong>⬆️ (Naikkan)</strong> dan <strong>⬇️ (Turunkan)</strong> untuk mengatur urutan seksi. Klik tombol mata <strong>👁️</strong> untuk menyembunyikan / menampilkan seksi. Klik tombol <strong>"Edit Isi Konten"</strong> untuk memperbarui judul, teks, gambar (auto-WebP), dan tombol seksi tersebut.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleResetSections(activePageId)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-[#1E60D5] text-xs font-bold shrink-0 cursor-pointer shadow-2xs self-start sm:self-auto"
                        >
                            <RotateCcw className="h-3.5 w-3.5" />
                            <span>Reset Urutan</span>
                        </button>
                    </div>

                    {/* The Sections Accordion List */}
                    <div className="space-y-3">
                        {currentSections.map((sec, idx) => {
                            const isExpanded = !!expandedSections[sec.id];
                            return (
                                <Card
                                    key={sec.id}
                                    className={`border transition-all rounded-2xl overflow-hidden ${
                                        sec.visible
                                            ? 'bg-white border-[#EFF2F5] shadow-xs'
                                            : 'bg-[#F9F9F9] border-[#EFF2F5] opacity-70'
                                    }`}
                                >
                                    {/* Section Summary Header Bar */}
                                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            {/* Position Badge */}
                                            <div
                                                className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                                                    sec.visible
                                                        ? 'bg-[#1B84FF]/10 text-[#1B84FF] border border-[#1B84FF]/20'
                                                        : 'bg-slate-200 text-slate-500'
                                                }`}
                                            >
                                                #{idx + 1}
                                            </div>

                                            <div className="space-y-0.5 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-[#181C32] truncate">
                                                        {sec.name}
                                                    </span>
                                                    <Badge
                                                        variant="outline"
                                                        className={`text-[9px] font-mono px-2 py-0.5 rounded-md font-bold ${
                                                            sec.visible
                                                                ? 'bg-[#E8FFF3] text-[#50CD89] border-emerald-200'
                                                                : 'bg-slate-200 text-slate-600 border-slate-300'
                                                        }`}
                                                    >
                                                        {sec.visible ? 'Tampil di Web' : 'Disembunyikan'}
                                                    </Badge>
                                                </div>
                                                <p className="text-[11px] text-[#78829D] truncate">
                                                    {sec.desc}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions: Move Up, Move Down, Toggle Visibility, Expand/Collapse */}
                                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                            {/* Move Up */}
                                            <button
                                                type="button"
                                                disabled={idx === 0}
                                                onClick={() => handleMoveUp(activePageId, idx)}
                                                className="p-2 rounded-xl border border-[#EFF2F5] hover:border-[#1B84FF] hover:bg-[#F1FAFF] text-[#4B5675] hover:text-[#1B84FF] disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
                                                title="Naikkan Posisi Seksi"
                                            >
                                                <ArrowUp className="h-4 w-4" />
                                            </button>

                                            {/* Move Down */}
                                            <button
                                                type="button"
                                                disabled={idx === currentSections.length - 1}
                                                onClick={() => handleMoveDown(activePageId, idx)}
                                                className="p-2 rounded-xl border border-[#EFF2F5] hover:border-[#1B84FF] hover:bg-[#F1FAFF] text-[#4B5675] hover:text-[#1B84FF] disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
                                                title="Turunkan Posisi Seksi"
                                            >
                                                <ArrowDown className="h-4 w-4" />
                                            </button>

                                            {/* Toggle Visibility */}
                                            <button
                                                type="button"
                                                onClick={() => handleToggleSectionVisibility(activePageId, idx)}
                                                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                                                    sec.visible
                                                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                                        : 'border-slate-300 bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                }`}
                                                title={sec.visible ? 'Klik untuk Sembunyikan' : 'Klik untuk Tampilkan'}
                                            >
                                                {sec.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                            </button>

                                            {/* Expand/Collapse Button */}
                                            <Button
                                                type="button"
                                                onClick={() => toggleExpandSection(sec.id)}
                                                size="sm"
                                                className={`gap-1.5 font-bold text-xs h-9 rounded-xl cursor-pointer ${
                                                    isExpanded
                                                        ? 'bg-[#181C32] text-white hover:bg-black'
                                                        : 'bg-[#1B84FF]/10 hover:bg-[#1B84FF]/20 text-[#1B84FF] border border-[#1B84FF]/20'
                                                }`}
                                            >
                                                <Edit3 className="h-3.5 w-3.5" />
                                                <span>{isExpanded ? 'Tutup Formulir' : 'Edit Isi Konten'}</span>
                                                {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Expanded Section Form */}
                                    {isExpanded && (
                                        <div className="border-t border-[#EFF2F5] bg-[#F5F8FA]/60 p-5 sm:p-6 space-y-4">
                                            {/* Comprehensive 5-tab Section Studio: Content, Color, Layout, WebP Photo, Visibility */}
                                            {renderSectionFormFields(activePageId, sec.id, sec.name)}
                                        </div>
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* 4. MODE 2: DESAIN VISUAL MANDIRI (PER-PAGE STYLING)                       */}
            {/* ========================================================================= */}
            {studioTab === 'design' && (
                <div className="space-y-6">
                    {/* Visual Color Themes */}
                    <Card className="border-[#EFF2F5] shadow-xs bg-white rounded-2xl">
                        <CardHeader className="p-6 pb-4">
                            <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                <Palette className="h-4 w-4 text-[#1B84FF]" />
                                <span>Pilih Tema Mood &amp; Warna Halaman Ini</span>
                            </CardTitle>
                            <CardDescription className="text-xs text-[#78829D]">
                                Halaman <strong>{activePageDef.name}</strong> dapat memiliki tema warna mandiri yang berbeda dari halaman lainnya.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                                {THEME_PRESETS.map((t) => {
                                    const isSelected = currentTheme === t.id;
                                    return (
                                        <div
                                            key={t.id}
                                            onClick={() => handleChange(`page_${activePageId}_theme`, t.id)}
                                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative space-y-2.5 ${
                                                isSelected
                                                    ? 'border-[#1B84FF] bg-blue-50/40 shadow-xs'
                                                    : 'border-[#EFF2F5] bg-white hover:border-[#BFDBFE]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-5 h-5 rounded-full border border-slate-300 shadow-2xs" style={{ backgroundColor: t.primary }}></span>
                                                    <span className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs -ml-3" style={{ backgroundColor: t.accent }}></span>
                                                    <span className="text-xs font-bold text-[#181C32]">{t.name}</span>
                                                </div>
                                                {isSelected && (
                                                    <CheckCircle2 className="h-4 w-4 text-[#1B84FF]" />
                                                )}
                                            </div>
                                            <p className="text-[11px] text-[#78829D] leading-relaxed">
                                                {t.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Spacing & Radius Card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Spacing Density */}
                        <Card className="border-[#EFF2F5] shadow-xs bg-white rounded-2xl">
                            <CardHeader className="p-5 pb-3">
                                <CardTitle className="text-xs font-bold text-[#181C32] uppercase tracking-wider font-mono">
                                    Kerapatan Jarak (Spasi Vertikal)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 pt-0 space-y-2">
                                {[
                                    { id: 'compact', label: 'Ringkas (Compact)', desc: 'Padding lebih sempit untuk memuat informasi lebih padat.' },
                                    { id: 'normal', label: 'Standar Seimbang (Normal)', desc: 'Jarak proporsional ideal standar enterprise web.' },
                                    { id: 'spacious', label: 'Lega Editorial (Spacious)', desc: 'Ruang nafas lebih luas untuk tampilan mewah dan berwibawa.' },
                                ].map((d) => (
                                    <button
                                        key={d.id}
                                        type="button"
                                        onClick={() => handleChange(`page_${activePageId}_density`, d.id)}
                                        className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all ${
                                            currentDensity === d.id
                                                ? 'border-[#1B84FF] bg-[#F1FAFF] shadow-2xs'
                                                : 'border-[#EFF2F5] bg-white hover:bg-[#F9F9F9]'
                                        }`}
                                    >
                                        <span className="text-xs font-bold text-[#181C32] block">{d.label}</span>
                                        <span className="text-[10px] text-[#78829D]">{d.desc}</span>
                                    </button>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Card Corner Radius */}
                        <Card className="border-[#EFF2F5] shadow-xs bg-white rounded-2xl">
                            <CardHeader className="p-5 pb-3">
                                <CardTitle className="text-xs font-bold text-[#181C32] uppercase tracking-wider font-mono">
                                    Kelengkungan Sudut Kartu (Border Radius)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 pt-0 space-y-2">
                                {[
                                    { id: 'rounded-xl', label: 'Sudut Tegas (rounded-xl / 12px)', desc: 'Tampilan rapi dan presisi khas antarmuka dashboard klinis.' },
                                    { id: 'rounded-2xl', label: 'Standar Elegan (rounded-2xl / 16px)', desc: 'Keseimbangan modern Metronic yang ramah dan formal.' },
                                    { id: 'rounded-3xl', label: 'Melengkung Halus (rounded-3xl / 24px)', desc: 'Desain organik lembut khas aplikasi kesehatan generasi terbaru.' },
                                ].map((r) => (
                                    <button
                                        key={r.id}
                                        type="button"
                                        onClick={() => handleChange(`page_${activePageId}_card_radius`, r.id)}
                                        className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all ${
                                            currentCardRadius === r.id
                                                ? 'border-[#1B84FF] bg-[#F1FAFF] shadow-2xs'
                                                : 'border-[#EFF2F5] bg-white hover:bg-[#F9F9F9]'
                                        }`}
                                    >
                                        <span className="text-xs font-bold text-[#181C32] block">{r.label}</span>
                                        <span className="text-[10px] text-[#78829D]">{r.desc}</span>
                                    </button>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* 5. MODE 3: SIMULATOR LIVE MULTI-DEVICE                                    */}
            {/* ========================================================================= */}
            {studioTab === 'simulator' && (
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-[#EFF2F5] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4 text-[#1B84FF]" />
                            <span className="text-xs font-bold text-[#181C32]">
                                Pratinjau Langsung: {activePageDef.name} ({activePageDef.path})
                            </span>
                        </div>

                        {/* Device Switcher */}
                        <div className="flex items-center gap-1.5 p-1 bg-[#F5F8FA] rounded-xl border border-[#EFF2F5]">
                            <button
                                type="button"
                                onClick={() => setPreviewDevice('desktop')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                                    previewDevice === 'desktop' ? 'bg-white text-[#181C32] shadow-2xs' : 'text-[#78829D]'
                                }`}
                            >
                                <Monitor className="h-3.5 w-3.5" />
                                <span>Desktop</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setPreviewDevice('tablet')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                                    previewDevice === 'tablet' ? 'bg-white text-[#181C32] shadow-2xs' : 'text-[#78829D]'
                                }`}
                            >
                                <Tablet className="h-3.5 w-3.5" />
                                <span>Tablet</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setPreviewDevice('mobile')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                                    previewDevice === 'mobile' ? 'bg-white text-[#181C32] shadow-2xs' : 'text-[#78829D]'
                                }`}
                            >
                                <Smartphone className="h-3.5 w-3.5" />
                                <span>Mobile</span>
                            </button>
                        </div>
                    </div>

                    {/* Viewport Frame */}
                    <div className="flex items-center justify-center p-4 bg-slate-900/90 rounded-2xl min-h-[600px] border border-slate-800">
                        <div
                            className={`bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
                                previewDevice === 'desktop'
                                    ? 'w-full h-[750px]'
                                    : previewDevice === 'tablet'
                                    ? 'w-[768px] h-[750px] border-8 border-slate-700 rounded-3xl'
                                    : 'w-[375px] h-[750px] border-8 border-slate-700 rounded-3xl'
                            }`}
                        >
                            <iframe
                                key={`${activePageDef.path}-${currentTheme}`}
                                src={activePageDef.path}
                                title={`Live Preview ${activePageDef.name}`}
                                className="w-full h-full border-0"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* 6. STICKY FLOATING BOTTOM ACTION BAR                                      */}
            {/* ========================================================================= */}
            <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 z-40 bg-[#1E1E2D]/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl border border-slate-700 shadow-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1B84FF] animate-pulse"></div>
                    <div>
                        <span className="text-xs font-bold text-white block">
                            {activePageDef.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                            {hasUnsavedChanges ? '⚠️ Ada perubahan belum disimpan' : 'Semua konfigurasi tersimpan'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2.5">
                    <Button
                        type="button"
                        onClick={() => setStudioTab(studioTab === 'simulator' ? 'editor' : 'simulator')}
                        variant="outline"
                        size="sm"
                        className="bg-white/10 hover:bg-white/20 border-white/20 text-white text-xs h-9 rounded-xl cursor-pointer"
                    >
                        <Monitor className="h-3.5 w-3.5 mr-1" />
                        <span>{studioTab === 'simulator' ? 'Editor Konten' : 'Simulator'}</span>
                    </Button>

                    <Button
                        type="button"
                        disabled={saving}
                        onClick={handleSaveAll}
                        size="sm"
                        className="bg-[#1B84FF] hover:bg-[#1670DB] text-white font-bold text-xs h-9 px-5 rounded-xl cursor-pointer shadow-lg shadow-blue-500/30 gap-1.5 btn-spring"
                    >
                        {saving ? (
                            <>
                                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                <span>Menyimpan...</span>
                            </>
                        ) : (
                            <>
                                <Save className="h-3.5 w-3.5" />
                                <span>Simpan &amp; Terapkan</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );

    // =========================================================================
    // DYNAMIC FORM FIELDS RENDERER PER PAGE AND PER SECTION
    // =========================================================================
    function renderSectionFormFields(pageId, secId, secName) {
        const specificFields = renderSectionSpecificFields(pageId, secId);
        return (
            <SectionComprehensiveEditor
                key={`${pageId}-${secId}`}
                pageId={pageId}
                secId={secId}
                sectionName={secName || secId}
                settingsMap={settingsMap}
                onChange={handleChange}
                customFields={specificFields}
            />
        );
    }

    function renderSectionSpecificFields(pageId, secId) {
        // -------------------------------------------------------------
        // 1. BERANDA (HOME) SECTIONS
        // -------------------------------------------------------------
        if (pageId === 'beranda') {
            if (secId === 'hero') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Pill Badge Atas</label>
                                <Input
                                    value={settingsMap.hero_badge_text || ''}
                                    onChange={(e) => handleChange('hero_badge_text', e.target.value)}
                                    placeholder="Solusi SIMRS Generasi Baru • Terhubung SATUSEHAT & BPJS"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Prefix Judul Utama</label>
                                <Input
                                    value={settingsMap.hero_title_prefix || ''}
                                    onChange={(e) => handleChange('hero_title_prefix', e.target.value)}
                                    placeholder="Transformasi Digital Rumah Sakit yang"
                                    className="text-xs bg-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Highlight Biru</label>
                                <Input
                                    value={settingsMap.hero_title_highlight_1 || ''}
                                    onChange={(e) => handleChange('hero_title_highlight_1', e.target.value)}
                                    placeholder="Lebih Cepat"
                                    className="text-xs bg-white font-bold text-[#1B84FF]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Teks Tengah</label>
                                <Input
                                    value={settingsMap.hero_title_middle || ''}
                                    onChange={(e) => handleChange('hero_title_middle', e.target.value)}
                                    placeholder=", Terintegrasi, &"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Highlight Oranye</label>
                                <Input
                                    value={settingsMap.hero_title_highlight_2 || ''}
                                    onChange={(e) => handleChange('hero_title_highlight_2', e.target.value)}
                                    placeholder="Berstandar Nasional"
                                    className="text-xs bg-white font-bold text-[#F97316]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Paragraf Deskripsi Hero</label>
                            <Textarea
                                rows={3}
                                value={settingsMap.hero_description || ''}
                                onChange={(e) => handleChange('hero_description', e.target.value)}
                                placeholder="Liva SIMRS menghubungkan seluruh alur pelayanan mulai dari IGD, Rawat Jalan..."
                                className="text-xs bg-white leading-relaxed"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Teks Tombol Demo Utama</label>
                                <Input
                                    value={settingsMap.hero_cta_primary_text || ''}
                                    onChange={(e) => handleChange('hero_cta_primary_text', e.target.value)}
                                    placeholder="Jadwalkan Live Demo RS"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Teks Tombol Sekunder</label>
                                <Input
                                    value={settingsMap.hero_cta_secondary_text || ''}
                                    onChange={(e) => handleChange('hero_cta_secondary_text', e.target.value)}
                                    placeholder="Katalog 36 Modul"
                                    className="text-xs bg-white"
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            if (secId === 'cockpit') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Pill Badge Seksi</label>
                                <Input
                                    value={settingsMap.cockpit_badge_text || ''}
                                    onChange={(e) => handleChange('cockpit_badge_text', e.target.value)}
                                    placeholder="LIVE PRODUCT EXPERIENCE & WORKFLOW"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama Cockpit</label>
                                <Input
                                    value={settingsMap.cockpit_headline || ''}
                                    onChange={(e) => handleChange('cockpit_headline', e.target.value)}
                                    placeholder="Eksplorasi Antarmuka Klinis & Operasional Liva SIMRS"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Cockpit</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.cockpit_subheadline || ''}
                                onChange={(e) => handleChange('cockpit_subheadline', e.target.value)}
                                placeholder="Lihat bagaimana arsitektur Liva SIMRS dirancang dengan standar UX kelas dunia..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }

            if (secId === 'pacs') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Badge Kategori</label>
                                <Input
                                    value={settingsMap.pacs_badge_text || ''}
                                    onChange={(e) => handleChange('pacs_badge_text', e.target.value)}
                                    placeholder="MODUL FLAGSHIP TERBARU"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Sub-Badge</label>
                                <Input
                                    value={settingsMap.pacs_badge_sub || ''}
                                    onChange={(e) => handleChange('pacs_badge_sub', e.target.value)}
                                    placeholder="Liva Cloud RIS & Zero-Footprint PACS"
                                    className="text-xs bg-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama</label>
                                <Input
                                    value={settingsMap.pacs_headline_main || ''}
                                    onChange={(e) => handleChange('pacs_headline_main', e.target.value)}
                                    placeholder="Sistem RIS/PACS Cloud Terintegrasi Penuh"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Teks Highlight Biru</label>
                                <Input
                                    value={settingsMap.pacs_headline_highlight || ''}
                                    onChange={(e) => handleChange('pacs_headline_highlight', e.target.value)}
                                    placeholder="Rekam Medis SIMRS"
                                    className="text-xs bg-white font-bold text-[#1B84FF]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Deskripsi RIS/PACS</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.pacs_description || ''}
                                onChange={(e) => handleChange('pacs_description', e.target.value)}
                                placeholder="Hubungkan mesin CT-Scan, MRI, X-Ray, dan USG langsung ke antarmuka dokter..."
                                className="text-xs bg-white"
                            />
                        </div>

                        <div className="p-4 bg-white rounded-xl border border-[#EFF2F5] space-y-2">
                            <label className="block text-xs font-bold text-[#181C32]">Gambar Scan DICOM Radiologi (Auto-WebP)</label>
                            <div className="flex items-center gap-3">
                                <Input
                                    value={settingsMap.pacs_image_url || ''}
                                    onChange={(e) => handleChange('pacs_image_url', e.target.value)}
                                    placeholder="/images/dicom_ct_slice.webp"
                                    className="text-xs font-mono bg-white"
                                />
                                <WebpUploadButton
                                    value={settingsMap.pacs_image_url}
                                    onUploadSuccess={(url) => handleChange('pacs_image_url', url)}
                                    label="Upload & WebP"
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            if (secId === 'solutions') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Pill Badge Seksi</label>
                                <Input
                                    value={settingsMap.solutions_badge_text || ''}
                                    onChange={(e) => handleChange('solutions_badge_text', e.target.value)}
                                    placeholder="SOLUSI SPESIFIK SESUAI TIPE FASKES"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Headline Seksi</label>
                                <Input
                                    value={settingsMap.solutions_headline || ''}
                                    onChange={(e) => handleChange('solutions_headline', e.target.value)}
                                    placeholder="Ekosistem Digital untuk Setiap Skala Layanan Medis"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Solusi</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.solutions_subheadline || ''}
                                onChange={(e) => handleChange('solutions_subheadline', e.target.value)}
                                placeholder="Pilih konfigurasi modul yang dirancang khusus untuk alur kerja rumah sakit..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }

            if (secId === 'trust') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Pill Badge Regulasi</label>
                                <Input
                                    value={settingsMap.trust_badge_text || ''}
                                    onChange={(e) => handleChange('trust_badge_text', e.target.value)}
                                    placeholder="STANDAR KEPATUHAN & KEAMANAN REGULASI NASIONAL"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Headline Kepatuhan</label>
                                <Input
                                    value={settingsMap.trust_headline || ''}
                                    onChange={(e) => handleChange('trust_headline', e.target.value)}
                                    placeholder="Tersertifikasi Penuh & Siap Akreditasi Paripurna"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            if (secId === 'pillars') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Badge Seksi Pilar</label>
                                <Input
                                    value={settingsMap.pillars_badge_text || ''}
                                    onChange={(e) => handleChange('pillars_badge_text', e.target.value)}
                                    placeholder="ARSITEKTUR MISI-KRITIS"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Headline Pilar</label>
                                <Input
                                    value={settingsMap.pillars_headline || ''}
                                    onChange={(e) => handleChange('pillars_headline', e.target.value)}
                                    placeholder="6 Pilar Keunggulan Solusi Liva SIMRS"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            if (secId === 'modules') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Badge Seksi Modul</label>
                                <Input
                                    value={settingsMap.modules_badge_text || ''}
                                    onChange={(e) => handleChange('modules_badge_text', e.target.value)}
                                    placeholder="MODULAR & TERPADU"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Headline Modul</label>
                                <Input
                                    value={settingsMap.modules_headline || ''}
                                    onChange={(e) => handleChange('modules_headline', e.target.value)}
                                    placeholder="Katalog 36 Modul SIMRS & Klinik Terpadu"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            if (secId === 'network_map') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Pill Badge</label>
                                <Input
                                    value={settingsMap.network_badge_text || ''}
                                    onChange={(e) => handleChange('network_badge_text', e.target.value)}
                                    placeholder="JARINGAN NASIONAL KEPERCAYAAN FASKES"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Awalan Judul</label>
                                <Input
                                    value={settingsMap.network_headline_prefix || ''}
                                    onChange={(e) => handleChange('network_headline_prefix', e.target.value)}
                                    placeholder="Dipercaya Puluhan Rumah Sakit"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Highlight Biru</label>
                                <Input
                                    value={settingsMap.network_headline_highlight || ''}
                                    onChange={(e) => handleChange('network_headline_highlight', e.target.value)}
                                    placeholder="Dari Sabang Hingga Merauke"
                                    className="text-xs bg-white font-bold text-[#1B84FF]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Deskripsi Peta</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.network_subheadline || ''}
                                onChange={(e) => handleChange('network_subheadline', e.target.value)}
                                placeholder="Liva SIMRS diimplementasikan secara terbukti di berbagai fasyankes..."
                                className="text-xs bg-white"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Counter Faskes</label>
                                <Input
                                    value={settingsMap.network_total_faskes || ''}
                                    onChange={(e) => handleChange('network_total_faskes', e.target.value)}
                                    placeholder="40+"
                                    className="text-xs bg-white font-bold text-[#1B84FF]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Counter RME</label>
                                <Input
                                    value={settingsMap.network_total_rme || ''}
                                    onChange={(e) => handleChange('network_total_rme', e.target.value)}
                                    placeholder="1.2M+"
                                    className="text-xs bg-white font-bold text-emerald-600"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Counter SLA</label>
                                <Input
                                    value={settingsMap.network_cloud_sla || ''}
                                    onChange={(e) => handleChange('network_cloud_sla', e.target.value)}
                                    placeholder="99.98%"
                                    className="text-xs bg-white font-bold text-[#F97316]"
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            if (secId === 'faq') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Pill Badge</label>
                                <Input
                                    value={settingsMap.faq_badge_text || ''}
                                    onChange={(e) => handleChange('faq_badge_text', e.target.value)}
                                    placeholder="PUSAT INFORMASI & PANDUAN PENGADAAN"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Awalan Judul</label>
                                <Input
                                    value={settingsMap.faq_headline_prefix || ''}
                                    onChange={(e) => handleChange('faq_headline_prefix', e.target.value)}
                                    placeholder="Pertanyaan Sering Diajukan"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Highlight Biru</label>
                                <Input
                                    value={settingsMap.faq_headline_highlight || ''}
                                    onChange={(e) => handleChange('faq_headline_highlight', e.target.value)}
                                    placeholder="Oleh Manajemen & Direksi RS"
                                    className="text-xs bg-white font-bold text-[#1B84FF]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Seksi FAQ</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.faq_subheadline || ''}
                                onChange={(e) => handleChange('faq_subheadline', e.target.value)}
                                placeholder="Temukan jawaban komprehensif terkait proses migrasi data, kepatuhan SATUSEHAT..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }

            if (secId === 'cta_banner') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Pill Badge</label>
                                <Input
                                    value={settingsMap.cta_badge_text || ''}
                                    onChange={(e) => handleChange('cta_badge_text', e.target.value)}
                                    placeholder="SOLUSI TERSTANDAR UNTUK RUMAH SAKIT & KLINIK"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Headline CTA</label>
                                <Input
                                    value={settingsMap.cta_headline || ''}
                                    onChange={(e) => handleChange('cta_headline', e.target.value)}
                                    placeholder="Siap Mengakselerasi Digitalisasi Faskes Anda?"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Ajakan CTA</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.cta_description || ''}
                                onChange={(e) => handleChange('cta_description', e.target.value)}
                                placeholder="Jadwalkan sesi konsultasi dan demonstrasi langsung bersama konsultan klinis Liva SIMRS..."
                                className="text-xs bg-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Teks Tombol Utama</label>
                                <Input
                                    value={settingsMap.cta_btn_primary || ''}
                                    onChange={(e) => handleChange('cta_btn_primary', e.target.value)}
                                    placeholder="Ajukan Jadwal Demo Gratis"
                                    className="text-xs bg-white font-semibold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Teks Tombol Kuis (2 Menit)</label>
                                <Input
                                    value={settingsMap.cta_btn_secondary || ''}
                                    onChange={(e) => handleChange('cta_btn_secondary', e.target.value)}
                                    placeholder="Uji Kesiapan SIMRS (2 Menit)"
                                    className="text-xs bg-white font-semibold"
                                />
                            </div>
                        </div>
                    </div>
                );
            }
        }

        // -------------------------------------------------------------
        // 2. KATALOG MODUL SIMRS SECTIONS
        // -------------------------------------------------------------
        if (pageId === 'modul-simrs') {
            if (secId === 'hero') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Badge Pill Atas</label>
                                <Input
                                    value={settingsMap.page_modules_badge || ''}
                                    onChange={(e) => handleChange('page_modules_badge', e.target.value)}
                                    placeholder="ARSITEKTUR LENGKAP 36 MODUL TERPADU"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Label Total Modul</label>
                                <Input
                                    value={settingsMap.page_modules_total_label || ''}
                                    onChange={(e) => handleChange('page_modules_total_label', e.target.value)}
                                    placeholder="36 Modul Siap Pakai"
                                    className="text-xs bg-white font-bold text-[#1B84FF]"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama Halaman</label>
                            <Input
                                value={settingsMap.page_modules_title || ''}
                                onChange={(e) => handleChange('page_modules_title', e.target.value)}
                                placeholder="Katalog Modul Klinis, Operasional, & Finansial Rumah Sakit"
                                className="text-xs bg-white font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Halaman</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.page_modules_subtitle || ''}
                                onChange={(e) => handleChange('page_modules_subtitle', e.target.value)}
                                placeholder="Eksplorasi ekosistem terpadu Liva SIMRS yang dirancang memenuhi standar akreditasi..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }

            if (secId === 'filter_search') {
                return (
                    <div>
                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Placeholder Bilah Pencarian</label>
                        <Input
                            value={settingsMap.page_modules_search_placeholder || ''}
                            onChange={(e) => handleChange('page_modules_search_placeholder', e.target.value)}
                            placeholder="Cari modul SIMRS (contoh: IGD, Farmasi, Radiologi, Casemix, RME)..."
                            className="text-xs bg-white"
                        />
                    </div>
                );
            }

            if (secId === 'modules_grid') {
                return (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                        Modul individual dapat dikelola (tambah, edit alur kerja, ganti ikon & kategori) melalui menu <strong>"Katalog 36 Modul SIMRS"</strong> di sidebar navigasi.
                    </div>
                );
            }

            if (secId === 'cta') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul CTA Modul</label>
                                <Input
                                    value={settingsMap.page_modules_cta_title || ''}
                                    onChange={(e) => handleChange('page_modules_cta_title', e.target.value)}
                                    placeholder="Butuh Alur Kerja Khusus Sesuai SOP Rumah Sakit Anda?"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Teks Tombol Konsultasi</label>
                                <Input
                                    value={settingsMap.page_modules_cta_btn_text || ''}
                                    onChange={(e) => handleChange('page_modules_cta_btn_text', e.target.value)}
                                    placeholder="Konsultasi dengan Arsitek Solusi"
                                    className="text-xs bg-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi CTA</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.page_modules_cta_desc || ''}
                                onChange={(e) => handleChange('page_modules_cta_desc', e.target.value)}
                                placeholder="Tim arsitek solusi klinis kami siap membantu memetakan kebutuhan integrasi..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }
        }

        // -------------------------------------------------------------
        // 3. KEUNGGULAN SECTIONS
        // -------------------------------------------------------------
        if (pageId === 'keunggulan') {
            if (secId === 'hero') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Badge Pill Atas</label>
                                <Input
                                    value={settingsMap.page_keunggulan_badge || ''}
                                    onChange={(e) => handleChange('page_keunggulan_badge', e.target.value)}
                                    placeholder="EVALUASI OBJEKTIF ARSITEKTUR SIMRS ENTERPRISE"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama Halaman</label>
                                <Input
                                    value={settingsMap.page_keunggulan_title || ''}
                                    onChange={(e) => handleChange('page_keunggulan_title', e.target.value)}
                                    placeholder="Mengapa Rumah Sakit Terkemuka Memilih Liva SIMRS?"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Halaman</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.page_keunggulan_subtitle || ''}
                                onChange={(e) => handleChange('page_keunggulan_subtitle', e.target.value)}
                                placeholder="Bukan sekadar aplikasi pencatatan administratif..."
                                className="text-xs bg-white"
                            />
                        </div>

                        {/* 4 KPI Strip Values */}
                        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                            <span className="text-xs font-bold text-[#181C32] block font-mono">
                                Strip 4 Key Performance Indicator (KPI)
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div>
                                    <label className="block text-[11px] text-slate-500 mb-0.5">Waktu RME</label>
                                    <Input
                                        value={settingsMap.kpi_rme_time || ''}
                                        onChange={(e) => handleChange('kpi_rme_time', e.target.value)}
                                        placeholder="2.4 mnt"
                                        className="text-xs font-bold bg-white text-[#1B84FF]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-500 mb-0.5">SATUSEHAT Sync</label>
                                    <Input
                                        value={settingsMap.kpi_fhir_sync || ''}
                                        onChange={(e) => handleChange('kpi_fhir_sync', e.target.value)}
                                        placeholder="100%"
                                        className="text-xs font-bold bg-white text-emerald-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-500 mb-0.5">Go-Live SLA</label>
                                    <Input
                                        value={settingsMap.kpi_golive_speed || ''}
                                        onChange={(e) => handleChange('kpi_golive_speed', e.target.value)}
                                        placeholder="6-8 Mgg"
                                        className="text-xs font-bold bg-white text-[#F97316]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-500 mb-0.5">Dispute BPJS</label>
                                    <Input
                                        value={settingsMap.kpi_bpjs_dispute || ''}
                                        onChange={(e) => handleChange('kpi_bpjs_dispute', e.target.value)}
                                        placeholder="< 0.3%"
                                        className="text-xs font-bold bg-white text-emerald-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            if (secId === 'pillars') {
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Seksi 6 Pilar</label>
                            <Input
                                value={settingsMap.page_keunggulan_pillars_title || ''}
                                onChange={(e) => handleChange('page_keunggulan_pillars_title', e.target.value)}
                                placeholder="6 Pilar Fondasi Sistem Informasi Manajemen Rumah Sakit"
                                className="text-xs bg-white font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Deskripsi Pilar</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.page_keunggulan_pillars_desc || ''}
                                onChange={(e) => handleChange('page_keunggulan_pillars_desc', e.target.value)}
                                placeholder="Fondasi arsitektur cloud native yang tangguh untuk memfasilitasi beban operasional medis..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }

            if (secId === 'comparison') {
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Matriks Komparasi KLAS</label>
                            <Input
                                value={settingsMap.page_keunggulan_comp_title || ''}
                                onChange={(e) => handleChange('page_keunggulan_comp_title', e.target.value)}
                                placeholder="Matriks Komparasi Standar Industri SIMRS"
                                className="text-xs bg-white font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Komparasi</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.page_keunggulan_comp_desc || ''}
                                onChange={(e) => handleChange('page_keunggulan_comp_desc', e.target.value)}
                                placeholder="Bandingkan fitur, kecepatan bridging, kepatuhan regulasi, dan total biaya kepemilikan..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }

            if (secId === 'cta') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Banner CTA</label>
                                <Input
                                    value={settingsMap.page_keunggulan_cta_title || ''}
                                    onChange={(e) => handleChange('page_keunggulan_cta_title', e.target.value)}
                                    placeholder="Siap Membuktikan Efisiensi Finansial & Klinis Liva SIMRS?"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Teks Tombol Aksi</label>
                                <Input
                                    value={settingsMap.page_keunggulan_cta_btn_text || ''}
                                    onChange={(e) => handleChange('page_keunggulan_cta_btn_text', e.target.value)}
                                    placeholder="Jadwalkan Live Demo RS"
                                    className="text-xs bg-white font-semibold"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Banner</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.page_keunggulan_cta_desc || ''}
                                onChange={(e) => handleChange('page_keunggulan_cta_desc', e.target.value)}
                                placeholder="Dapatkan perbandingan detail TCO (Total Cost of Ownership) dan uji coba live data sandbox..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }
        }

        // -------------------------------------------------------------
        // 4. STUDI KASUS & ROI SECTIONS
        // -------------------------------------------------------------
        if (pageId === 'studi-kasus') {
            if (secId === 'hero') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Badge Pill Atas</label>
                                <Input
                                    value={settingsMap.page_case_badge || ''}
                                    onChange={(e) => handleChange('page_case_badge', e.target.value)}
                                    placeholder="EVIDENSI NYATA & TESTIMONI RUMAH SAKIT"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama Halaman</label>
                                <Input
                                    value={settingsMap.page_case_title || ''}
                                    onChange={(e) => handleChange('page_case_title', e.target.value)}
                                    placeholder="Kisah Sukses Transformasi Digital Bersama Liva SIMRS"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Halaman</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.page_case_subtitle || ''}
                                onChange={(e) => handleChange('page_case_subtitle', e.target.value)}
                                placeholder="Pelajari bagaimana rumah sakit umum daerah, rumah sakit swasta, dan RSIA meningkatkan kepuasan pasien..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }

            if (secId === 'case_cards') {
                return (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                        Item studi kasus rumah sakit (RSUD, RS Swasta, RSIA) dapat dikelola secara mendalam melalui menu <strong>"Studi Kasus & Testimoni RS"</strong> di sidebar navigasi.
                    </div>
                );
            }

            if (secId === 'roi_calculator') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Kalkulator ROI</label>
                                <Input
                                    value={settingsMap.page_case_roi_title || ''}
                                    onChange={(e) => handleChange('page_case_roi_title', e.target.value)}
                                    placeholder="Hitung Estimasi Efisiensi Finansial & Waktu Nakes Faskes Anda"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Kapasitas Tempat Tidur Default</label>
                                <Input
                                    value={settingsMap.page_case_roi_default_bed || ''}
                                    onChange={(e) => handleChange('page_case_roi_default_bed', e.target.value)}
                                    placeholder="150"
                                    className="text-xs bg-white font-bold text-[#1B84FF]"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Kalkulator</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.page_case_roi_desc || ''}
                                onChange={(e) => handleChange('page_case_roi_desc', e.target.value)}
                                placeholder="Geser jumlah tempat tidur (TT) rumah sakit untuk melihat proyeksi penghematan operasional..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }

            if (secId === 'cta') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Banner CTA</label>
                                <Input
                                    value={settingsMap.page_case_cta_title || ''}
                                    onChange={(e) => handleChange('page_case_cta_title', e.target.value)}
                                    placeholder="Ingin Mendapatkan Studi Kelayakan & ROI Khusus Faskes Anda?"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Teks Tombol CTA</label>
                                <Input
                                    value={settingsMap.page_case_cta_btn_text || ''}
                                    onChange={(e) => handleChange('page_case_cta_btn_text', e.target.value)}
                                    placeholder="Ajukan Studi Kelayakan Faskes"
                                    className="text-xs bg-white font-semibold"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Ajakan</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.page_case_cta_desc || ''}
                                onChange={(e) => handleChange('page_case_cta_desc', e.target.value)}
                                placeholder="Jadwalkan sesi konsultasi dan audit alur data klinis bersama tim arsitek solusi Liva SIMRS..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }
        }

        // -------------------------------------------------------------
        // 5. TENTANG KAMI SECTIONS
        // -------------------------------------------------------------
        if (pageId === 'tentang-kami') {
            if (secId === 'hero') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Badge Pill Atas</label>
                                <Input
                                    value={settingsMap.page_about_badge || ''}
                                    onChange={(e) => handleChange('page_about_badge', e.target.value)}
                                    placeholder="PROFIL PERUSAHAAN & VISI KESEHATAN DIGITAL"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Naratif Utama</label>
                                <Input
                                    value={settingsMap.page_about_title || ''}
                                    onChange={(e) => handleChange('page_about_title', e.target.value)}
                                    placeholder="Membangun Fondasi Digital Rumah Sakit Indonesia yang Modern, Andal, dan Humanis."
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Naratif</label>
                            <Textarea
                                rows={3}
                                value={settingsMap.page_about_subtitle || ''}
                                onChange={(e) => handleChange('page_about_subtitle', e.target.value)}
                                placeholder="Liva SIMRS adalah pengembang platform teknologi informasi kesehatan terkemuka di Indonesia..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }

            if (secId === 'stats') {
                return (
                    <div className="space-y-3">
                        <span className="text-xs font-bold text-[#181C32] block font-mono">
                            Nilai &amp; Label 4 Counter Statistik
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="space-y-1">
                                <label className="block text-[11px] text-slate-500">Statistik 1</label>
                                <Input
                                    value={settingsMap.about_stat_1_val || ''}
                                    onChange={(e) => handleChange('about_stat_1_val', e.target.value)}
                                    placeholder="40+"
                                    className="text-xs font-bold bg-white text-[#1B84FF]"
                                />
                                <Input
                                    value={settingsMap.about_stat_1_label || ''}
                                    onChange={(e) => handleChange('about_stat_1_label', e.target.value)}
                                    placeholder="Mitra Faskes Aktif"
                                    className="text-[11px] bg-white text-slate-600"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[11px] text-slate-500">Statistik 2</label>
                                <Input
                                    value={settingsMap.about_stat_2_val || ''}
                                    onChange={(e) => handleChange('about_stat_2_val', e.target.value)}
                                    placeholder="99.98%"
                                    className="text-xs font-bold bg-white text-emerald-600"
                                />
                                <Input
                                    value={settingsMap.about_stat_2_label || ''}
                                    onChange={(e) => handleChange('about_stat_2_label', e.target.value)}
                                    placeholder="SLA Server Cloud Uptime"
                                    className="text-[11px] bg-white text-slate-600"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[11px] text-slate-500">Statistik 3</label>
                                <Input
                                    value={settingsMap.about_stat_3_val || ''}
                                    onChange={(e) => handleChange('about_stat_3_val', e.target.value)}
                                    placeholder="100%"
                                    className="text-xs font-bold bg-white text-[#F97316]"
                                />
                                <Input
                                    value={settingsMap.about_stat_3_label || ''}
                                    onChange={(e) => handleChange('about_stat_3_label', e.target.value)}
                                    placeholder="SATUSEHAT Native HL7 FHIR"
                                    className="text-[11px] bg-white text-slate-600"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[11px] text-slate-500">Statistik 4</label>
                                <Input
                                    value={settingsMap.about_stat_4_val || ''}
                                    onChange={(e) => handleChange('about_stat_4_val', e.target.value)}
                                    placeholder="< 0.3%"
                                    className="text-xs font-bold bg-white text-slate-800"
                                />
                                <Input
                                    value={settingsMap.about_stat_4_label || ''}
                                    onChange={(e) => handleChange('about_stat_4_label', e.target.value)}
                                    placeholder="Dispute Rate Klaim BPJS"
                                    className="text-[11px] bg-white text-slate-600"
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            if (secId === 'visi_misi') {
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Visi Perusahaan</label>
                            <Input
                                value={settingsMap.about_visi_title || ''}
                                onChange={(e) => handleChange('about_visi_title', e.target.value)}
                                placeholder="Menjadi Standar Emas Arsitektur Digital Rumah Sakit di Indonesia & Asia Tenggara."
                                className="text-xs bg-white font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Visi Perusahaan</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.about_visi_desc || ''}
                                onChange={(e) => handleChange('about_visi_desc', e.target.value)}
                                placeholder="Mewujudkan ekosistem kesehatan digital di mana setiap data rekam medis terhubung mulus..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }

            if (secId === 'values' || secId === 'leadership' || secId === 'cta') {
                return (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                        Konten untuk seksi ini terhubung langsung dengan database tim &amp; arsitektur yang dapat diperbarui kapan saja.
                    </div>
                );
            }
        }

        // -------------------------------------------------------------
        // 6. JADWALKAN DEMO SECTIONS
        // -------------------------------------------------------------
        if (pageId === 'jadwalkan-demo') {
            if (secId === 'hero') {
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Badge Pill Atas</label>
                                <Input
                                    value={settingsMap.page_demo_badge || ''}
                                    onChange={(e) => handleChange('page_demo_badge', e.target.value)}
                                    placeholder="PENJADWALAN DEMO KLINIS LIVE & KONSULTASI"
                                    className="text-xs bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama Halaman</label>
                                <Input
                                    value={settingsMap.page_demo_title || ''}
                                    onChange={(e) => handleChange('page_demo_title', e.target.value)}
                                    placeholder="Jadwalkan Live Demo Liva SIMRS untuk Rumah Sakit Anda"
                                    className="text-xs bg-white font-bold"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Halaman</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.page_demo_subtitle || ''}
                                onChange={(e) => handleChange('page_demo_subtitle', e.target.value)}
                                placeholder="Saksikan langsung bagaimana dokter Anda dapat menginput RME dalam 2 menit..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }

            if (secId === 'form_grid') {
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Formulir Demo</label>
                            <Input
                                value={settingsMap.page_demo_form_title || ''}
                                onChange={(e) => handleChange('page_demo_form_title', e.target.value)}
                                placeholder="Formulir Reservasi Sesi Demonstrasi Klinis"
                                className="text-xs bg-white font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Petunjuk Formulir</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.page_demo_form_desc || ''}
                                onChange={(e) => handleChange('page_demo_form_desc', e.target.value)}
                                placeholder="Pilih modul peminatan dan jadwal preferensi, konsultan klinis kami akan menyiapkan simulasi data..."
                                className="text-xs bg-white"
                            />
                        </div>
                    </div>
                );
            }

            if (secId === 'guarantee' || secId === 'faq_help') {
                return (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                        Agenda demonstrasi 3 tahapan dan self-assessment 2 menit aktif secara interaktif di halaman registrasi.
                    </div>
                );
            }
        }

        // Generic fallback for any other section
        return (
            <div className="space-y-3">
                <p className="text-xs text-slate-600">
                    Konfigurasi untuk seksi <strong>{secId}</strong> telah aktif dan tersinkronisasi dengan database.
                </p>
            </div>
        );
    }
}
