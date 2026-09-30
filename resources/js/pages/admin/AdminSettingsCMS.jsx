import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSite } from '../../context/SiteContext';
import WebpUploadButton from '../../components/WebpUploadButton';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
    Save,
    Building2,
    Type,
    Activity,
    TrendingUp,
    CheckCircle2,
    ShieldCheck,
    Globe,
    PhoneCall,
    Sparkles,
    FileText,
    HelpCircle,
    MapPin,
    Layers,
    Sliders,
    Eye,
    Plus,
    Trash2,
    ExternalLink,
    RefreshCw,
    MessageSquare,
    Phone,
    Mail,
    SlidersHorizontal,
    MonitorSmartphone,
    Radio,
    Clock,
    Lock,
    Search,
    Upload,
    ImageIcon,
    Copy,
    Check,
    ArrowRight,
    Users,
    Calendar,
    Award,
    FileCheck,
    Stethoscope
} from 'lucide-react';

export default function AdminSettingsCMS() {
    const { refetchSiteData, showToast } = useSite();

    // High-level Page Navigation: 'beranda', 'katalog-modul', 'keunggulan', 'studi-kasus', 'tentang-kami', 'jadwalkan-demo', 'identitas', 'webp-studio'
    const [selectedPage, setSelectedPage] = useState('beranda');
    
    // Sub-tab for Beranda sections
    const [berandaSection, setBerandaSection] = useState('visibility');

    const [settingsMap, setSettingsMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');

    // Custom FAQ Editor State
    const [customFaqs, setCustomFaqs] = useState([]);
    const [newFaqQ, setNewFaqQ] = useState('');
    const [newFaqA, setNewFaqA] = useState('');
    const [newFaqCategory, setNewFaqCategory] = useState('migration');

    // Dedicated Auto-WebP Studio State
    const studioFileInputRef = useRef(null);
    const [studioUploading, setStudioUploading] = useState(false);
    const [studioLastResult, setStudioLastResult] = useState(null);
    const [copiedUrl, setCopiedUrl] = useState(false);
    const [studioHistory, setStudioHistory] = useState([]);

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

                // Parse custom FAQ items if present
                if (map['faq_custom_items']) {
                    try {
                        const parsed = typeof map['faq_custom_items'] === 'string'
                            ? JSON.parse(map['faq_custom_items'])
                            : map['faq_custom_items'];
                        if (Array.isArray(parsed)) {
                            setCustomFaqs(parsed);
                        }
                    } catch (e) {
                        setCustomFaqs([]);
                    }
                }
            }
        } catch (err) {
            showToast('Gagal memuat konfigurasi CMS', 'error');
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
    };

    const handleToggleBool = (key, defaultVal = true) => {
        const current = settingsMap[key];
        const isCurrentOn = current === undefined ? defaultVal : (current === true || current === '1' || current === 'true');
        const nextVal = !isCurrentOn;
        handleChange(key, nextVal ? '1' : '0');
    };

    const isChecked = (key, defaultVal = true) => {
        const val = settingsMap[key];
        if (val === undefined) return defaultVal;
        return val === true || val === '1' || val === 'true';
    };

    // Add FAQ Item
    const handleAddFaqItem = () => {
        if (!newFaqQ.trim() || !newFaqA.trim()) {
            showToast('Harap isi pertanyaan dan jawaban FAQ', 'error');
            return;
        }

        const categoryLabels = {
            migration: 'Migrasi & Go-Live',
            compliance: 'SATUSEHAT & BPJS',
            technical: 'Arsitektur & Offline',
            procurement: 'Skema Biaya & SLA'
        };

        const newItem = {
            id: Date.now(),
            category: newFaqCategory,
            categoryLabel: categoryLabels[newFaqCategory] || 'Pertanyaan Umum',
            q: newFaqQ.trim(),
            a: newFaqA.trim()
        };

        const updated = [...customFaqs, newItem];
        setCustomFaqs(updated);
        handleChange('faq_custom_items', JSON.stringify(updated));
        setNewFaqQ('');
        setNewFaqA('');
        showToast('Pertanyaan FAQ baru ditambahkan ke daftar draft', 'success');
    };

    // Remove FAQ Item
    const handleRemoveFaqItem = (id) => {
        const updated = customFaqs.filter(item => item.id !== id);
        setCustomFaqs(updated);
        handleChange('faq_custom_items', JSON.stringify(updated));
        showToast('Pertanyaan FAQ dihapus dari draft', 'info');
    };

    // Save All Settings
    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);

        try {
            // Ensure custom faqs are synced in map
            const payload = {
                ...settingsMap,
                faq_custom_items: JSON.stringify(customFaqs)
            };

            const res = await axios.post('/api/admin/settings/batch', {
                settings: payload,
            });

            if (res.data.status === 'success') {
                showToast(res.data.message || 'Semua pengaturan CMS berhasil disimpan dan langsung aktif di publik!', 'success');
                await refetchSiteData();
            }
        } catch (err) {
            console.error('Save settings error:', err);
            showToast('Gagal menyimpan pengaturan CMS', 'error');
        } finally {
            setSaving(false);
        }
    };

    // Dedicated Studio Auto-WebP Upload Handler
    const handleStudioUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 12 * 1024 * 1024) {
            showToast('Ukuran gambar maksimal 12MB', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            setStudioUploading(true);
            setStudioLastResult(null);

            const res = await axios.post('/api/admin/upload-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.status === 'success') {
                const data = res.data.data;
                setStudioLastResult(data);
                setStudioHistory((prev) => [data, ...prev.slice(0, 7)]);
                showToast(`Gambar terkonversi ke WebP! Hemat ${data.saved_percent}%`, 'success');
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal memproses dan mengonversi gambar';
            showToast(msg, 'error');
        } finally {
            setStudioUploading(false);
            if (studioFileInputRef.current) {
                studioFileInputRef.current.value = '';
            }
        }
    };

    const handleCopyUrl = (url) => {
        navigator.clipboard.writeText(window.location.origin + url);
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
        showToast('URL gambar WebP berhasil disalin ke clipboard!', 'success');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-24">
                <div className="flex flex-col items-center gap-3">
                    <span className="w-9 h-9 border-3 border-[#1B84FF] border-t-transparent rounded-full animate-spin"></span>
                    <span className="text-xs text-[#78829D] font-mono tracking-wide">
                        Memuat Master CMS Pengaturan Tampilan Publik...
                    </span>
                </div>
            </div>
        );
    }

    const publicPages = [
        { id: 'beranda', label: '1. Beranda (Home)', icon: Globe, count: '10 Bagian' },
        { id: 'katalog-modul', label: '2. Katalog Modul', icon: Layers, count: '36 Modul' },
        { id: 'ris-pacs', label: '3. RIS / PACS Radiologi', icon: Activity, count: 'DICOM Cloud' },
        { id: 'keunggulan', label: '4. Keunggulan & KLAS', icon: ShieldCheck, count: 'Arsitektur' },
        { id: 'studi-kasus', label: '5. Studi Kasus RS', icon: Award, count: 'Evidensi' },
        { id: 'tentang-kami', label: '6. Tentang Kami', icon: Users, count: 'Profil & Visi' },
        { id: 'jadwalkan-demo', label: '7. Jadwalkan Demo', icon: Calendar, count: 'Assessment' },
        { id: 'identitas', label: '8. Identitas & Kontak', icon: Building2, count: 'Brand' },
        { id: 'webp-studio', label: '9. Studio Media Auto-WebP', icon: ImageIcon, count: 'Converter' },
    ];

    return (
        <div className="space-y-6">
            
            {/* ========================================================================= */}
            {/* 1. TOP METRONIC STICKY CMS HEADER & GLOBAL ACTIONS                        */}
            {/* ========================================================================= */}
            <div className="bg-white p-6 rounded-2xl border border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)] flex flex-col lg:flex-row lg:items-center justify-between gap-4 sticky top-[70px] z-20 backdrop-blur-md bg-white/95">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F1FAFF] text-[#1B84FF] border border-[#B5DBFF] font-mono text-[10.5px] font-bold">
                            <Globe className="h-3 w-3" />
                            Multi-Page CMS Command Center
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E8FFF3] text-[#50CD89] border border-[#B1F8D0] font-mono text-[10.5px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#50CD89] animate-pulse"></span>
                            Auto-WebP Converter Aktif
                        </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#181C32] font-display">
                        Pengaturan Fleksibel &amp; Dinamis Seluruh Halaman
                    </h1>
                    <p className="text-xs text-[#78829D] max-w-2xl leading-relaxed">
                        Atur konten setiap halaman publik, sembunyikan atau tampilkan seksi, perbarui headline klinis, dan kelola konversi gambar ke format ringan WebP secara instan.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#1B84FF] hover:bg-[#056EE9] text-white shadow-[0_4px_14px_rgba(27,132,255,0.3)] gap-2 h-10 px-6 rounded-xl font-bold text-xs cursor-pointer focus-ring"
                    >
                        <Save className="h-4 w-4" />
                        <span>{saving ? 'Menyimpan Perubahan...' : 'Simpan Semua Pengaturan'}</span>
                    </Button>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* 2. MASTER PAGE SELECTOR TABS (METRONIC STYLE PILLS)                      */}
            {/* ========================================================================= */}
            <div className="bg-white p-2 rounded-2xl border border-[#EFF2F5] shadow-xs flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
                {publicPages.map((page) => {
                    const IconComponent = page.icon;
                    const isActive = selectedPage === page.id;
                    return (
                        <button
                            key={page.id}
                            type="button"
                            onClick={() => setSelectedPage(page.id)}
                            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                                isActive
                                    ? 'bg-[#1B84FF] text-white shadow-[0_4px_12px_rgba(27,132,255,0.25)]'
                                    : 'text-[#4B5675] hover:text-[#181C32] hover:bg-[#F5F8FA]'
                            }`}
                        >
                            <IconComponent className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#78829D]'}`} />
                            <span>{page.label}</span>
                            <span className={`text-[9.5px] px-1.5 py-0.5 rounded-md font-mono ${
                                isActive ? 'bg-white/20 text-white' : 'bg-[#F5F8FA] text-[#78829D]'
                            }`}>
                                {page.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* ========================================================================= */}
            {/* 3. PAGE VIEW: BERANDA (HOME PAGE - 10 SECTIONS)                           */}
            {/* ========================================================================= */}
            {selectedPage === 'beranda' && (
                <div className="space-y-6">
                    {/* Sub-Tabs for Beranda */}
                    <div className="flex flex-wrap gap-1.5 p-1.5 bg-white rounded-xl border border-[#EFF2F5]">
                        {[
                            { id: 'visibility', label: 'Saklar 10 Bagian', icon: Sliders },
                            { id: 'hero', label: 'Hero & CTA', icon: Type },
                            { id: 'cockpit', label: 'Cockpit Medis', icon: Activity },
                            { id: 'pacs', label: 'Cloud RIS/PACS', icon: Radio },
                            { id: 'solutions', label: 'Solusi Faskes', icon: Layers },
                            { id: 'trust', label: 'Kredensial Brand', icon: ShieldCheck },
                            { id: 'pillars_modules', label: 'Pilar & Modul', icon: TrendingUp },
                            { id: 'network', label: 'Peta Sebaran RS', icon: MapPin },
                            { id: 'faq', label: 'FAQ & Pengadaan', icon: HelpCircle },
                            { id: 'bottom_cta', label: 'Banner Bawah', icon: ArrowRight },
                        ].map((sec) => {
                            const SecIcon = sec.icon;
                            const isSecActive = berandaSection === sec.id;
                            return (
                                <button
                                    key={sec.id}
                                    type="button"
                                    onClick={() => setBerandaSection(sec.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                                        isSecActive
                                            ? 'bg-[#1B84FF]/10 text-[#1B84FF] font-bold'
                                            : 'text-[#78829D] hover:text-[#181C32] hover:bg-[#F5F8FA]'
                                    }`}
                                >
                                    <SecIcon className="h-3.5 w-3.5" />
                                    <span>{sec.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Section 1: Visibility Switchboard */}
                    {berandaSection === 'visibility' && (
                        <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                            <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <Sliders className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Master Saklar Visibilitas Bagian Publik Beranda</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Sembunyikan atau tampilkan bagian apapun di halaman publik beranda secara instan tanpa perlu mengubah source code.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                {/* Announcement Bar */}
                                <div className="p-4 rounded-xl bg-[#F1FAFF] border border-[#B5DBFF] space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <span className="text-xs font-bold text-[#181C32] block">
                                                Pita Pengumuman Regulasi &amp; Kepatuhan (Top Announcement Bar)
                                            </span>
                                            <p className="text-[11px] text-[#4B5675]">
                                                Pita banner paling atas navbar untuk sertifikasi Kemenkes dan nomor hotline.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleToggleBool('top_announcement_enabled', true)}
                                            className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center cursor-pointer ${
                                                isChecked('top_announcement_enabled', true) ? 'bg-[#1B84FF]' : 'bg-slate-300'
                                            }`}
                                        >
                                            <div className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                                                isChecked('top_announcement_enabled', true) ? 'translate-x-5' : 'translate-x-0'
                                            }`} />
                                        </button>
                                    </div>
                                    {isChecked('top_announcement_enabled', true) && (
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-blue-200/60">
                                            <div>
                                                <label className="block text-[11px] font-semibold text-[#4B5675] mb-1">Lencana Badge</label>
                                                <Input
                                                    value={settingsMap.top_announcement_badge || ''}
                                                    onChange={(e) => handleChange('top_announcement_badge', e.target.value)}
                                                    placeholder="KEMENKES RME TERVERIFIKASI"
                                                    className="text-xs bg-white font-mono"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold text-[#4B5675] mb-1">Teks Pengumuman</label>
                                                <Input
                                                    value={settingsMap.top_announcement_text || ''}
                                                    onChange={(e) => handleChange('top_announcement_text', e.target.value)}
                                                    placeholder="Siap Akreditasi KARS STARKES & Terintegrasi SATUSEHAT..."
                                                    className="text-xs bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold text-[#4B5675] mb-1">Hotline RS / PIC</label>
                                                <Input
                                                    value={settingsMap.top_announcement_phone || ''}
                                                    onChange={(e) => handleChange('top_announcement_phone', e.target.value)}
                                                    placeholder="+62 812-8000-5599"
                                                    className="text-xs bg-white font-mono"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* 10 Sections Switchboard Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                    {[
                                        { key: 'show_hero', title: '1. Hero & Value Proposition', desc: 'Headline utama, lencana regulasi & tombol pendaftaran demo.' },
                                        { key: 'show_cockpit', title: '2. Cockpit Telemetri Medis', desc: 'Simulasi dashboard interaktif Direktur RS & metrik BOR.' },
                                        { key: 'show_pacs', title: '3. Cloud RIS/PACS & DICOM', desc: 'Penampil radiologi CT-Scan/MRI & integrasi nakes.' },
                                        { key: 'show_solutions', title: '4. Solusi Spesifik Faskes', desc: 'Kategori RSUD, RS Swasta, dan Klinik Utama.' },
                                        { key: 'show_trust', title: '5. Kredensial Brand & Regulasi', desc: 'Sertifikasi ISO 27001, UU PDP & VClaim BPJS.' },
                                        { key: 'show_pillars', title: '6. Enam Pilar Keunggulan', desc: 'Grid 6 pilar diferensiasi arsitektur KLAS Liva SIMRS.' },
                                        { key: 'show_modules', title: '7. Katalog 36 Modul SIMRS', desc: 'Grid modul terpadu IGD, Ranap, Farmasi hingga RME.' },
                                        { key: 'show_network_map', title: '8. Peta Sebaran Faskes', desc: 'Distribusi 40+ RS dan faskes mitra se-Indonesia.' },
                                        { key: 'show_faq', title: '9. FAQ Interaktif & Pengadaan', desc: 'Tanya jawab migrasi data, legalitas, dan SLA cloud.' },
                                        { key: 'show_cta_banner', title: '10. Banner Konsultasi Bawah', desc: 'Aksi pendaftaran demo & assessment kesiapan faskes.' },
                                    ].map((item) => {
                                        const active = isChecked(item.key, true);
                                        return (
                                            <div
                                                key={item.key}
                                                className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                                                    active ? 'bg-white border-[#B5DBFF] shadow-2xs' : 'bg-[#F9F9F9] border-[#EFF2F5] opacity-60'
                                                }`}
                                            >
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-[#181C32]">{item.title}</span>
                                                        <span className={`text-[9.5px] px-2 py-0.5 rounded-md font-mono font-bold ${
                                                            active ? 'bg-[#F1FAFF] text-[#1B84FF]' : 'bg-slate-200 text-slate-600'
                                                        }`}>
                                                            {active ? 'Tampil' : 'Disembunyikan'}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-[#78829D] leading-relaxed">{item.desc}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleBool(item.key, true)}
                                                    className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center cursor-pointer shrink-0 ${
                                                        active ? 'bg-[#1B84FF]' : 'bg-slate-300'
                                                    }`}
                                                >
                                                    <div className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                                                        active ? 'translate-x-5' : 'translate-x-0'
                                                    }`} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Section 2: Hero Section */}
                    {berandaSection === 'hero' && (
                        <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                            <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <Type className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Hero Section &amp; Value Proposition Beranda</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Konfigurasi judul utama beranda, penekanan warna khusus, teks deskripsi, dan gambar visual hero.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Lencana Pill Atas (Badge)</label>
                                    <Input
                                        value={settingsMap.hero_badge_text || ''}
                                        onChange={(e) => handleChange('hero_badge_text', e.target.value)}
                                        placeholder="Solusi SIMRS Generasi Baru • Terhubung SATUSEHAT & BPJS"
                                        className="text-xs font-mono"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Bagian 1</label>
                                        <Input
                                            value={settingsMap.hero_headline_p1 || ''}
                                            onChange={(e) => handleChange('hero_headline_p1', e.target.value)}
                                            placeholder="Fondasi Digital Rumah Sakit"
                                            className="text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1B84FF] mb-1">Teks Sorotan Warna (Highlight)</label>
                                        <Input
                                            value={settingsMap.hero_headline_highlight || ''}
                                            onChange={(e) => handleChange('hero_headline_highlight', e.target.value)}
                                            placeholder="Terakreditasi & Terpercaya"
                                            className="text-xs border-blue-300 font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Bagian 2</label>
                                        <Input
                                            value={settingsMap.hero_headline_p2 || ''}
                                            onChange={(e) => handleChange('hero_headline_p2', e.target.value)}
                                            placeholder="Untuk Faskes Modern"
                                            className="text-xs"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Deskripsi Hero</label>
                                    <Textarea
                                        rows={3}
                                        value={settingsMap.hero_subheadline || ''}
                                        onChange={(e) => handleChange('hero_subheadline', e.target.value)}
                                        placeholder="Platform SIMRS modern yang memadukan rekam medis elektronik terstandar..."
                                        className="text-xs leading-relaxed"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Teks Tombol Aksi Utama</label>
                                        <Input
                                            value={settingsMap.hero_cta_primary || ''}
                                            onChange={(e) => handleChange('hero_cta_primary', e.target.value)}
                                            placeholder="Jadwalkan Live Demo RS"
                                            className="text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Teks Tombol Aksi Sekunder</label>
                                        <Input
                                            value={settingsMap.hero_cta_secondary || ''}
                                            onChange={(e) => handleChange('hero_cta_secondary', e.target.value)}
                                            placeholder="Uji Kesiapan Faskes (2 Menit)"
                                            className="text-xs"
                                        />
                                    </div>
                                </div>

                                {/* Hero Visual Image with Auto-WebP Upload */}
                                <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#EFF2F5] space-y-3">
                                    <label className="block text-xs font-bold text-[#181C32]">Gambar Visual Hero Banner (Auto-WebP)</label>
                                    <div className="flex items-center gap-3">
                                        <Input
                                            value={settingsMap.hero_visual_url || ''}
                                            onChange={(e) => handleChange('hero_visual_url', e.target.value)}
                                            placeholder="/images/hero-visual.webp atau URL..."
                                            className="text-xs font-mono bg-white"
                                        />
                                        <WebpUploadButton
                                            value={settingsMap.hero_visual_url}
                                            onUploadSuccess={(url) => handleChange('hero_visual_url', url)}
                                            label="Upload & WebP"
                                        />
                                    </div>
                                    {settingsMap.hero_visual_url && (
                                        <div className="p-2 bg-white border border-[#EFF2F5] rounded-xl inline-block shadow-2xs">
                                            <img src={settingsMap.hero_visual_url} alt="Hero Preview" className="h-16 rounded object-cover" />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Section 3: Cockpit Simulator */}
                    {berandaSection === 'cockpit' && (
                        <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                            <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Cockpit Interaktif Telemetri Medis Beranda</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Sesuaikan metrik live simulator Direktur RS di halaman beranda publik.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Bed Occupancy Rate (BOR)</label>
                                        <Input
                                            value={settingsMap.cockpit_bor_val || ''}
                                            onChange={(e) => handleChange('cockpit_bor_val', e.target.value)}
                                            placeholder="84.2%"
                                            className="text-xs font-mono font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Klaim BPJS Lolos</label>
                                        <Input
                                            value={settingsMap.cockpit_bpjs_claim || ''}
                                            onChange={(e) => handleChange('cockpit_bpjs_claim', e.target.value)}
                                            placeholder="99.7%"
                                            className="text-xs font-mono font-bold text-emerald-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Rata-Rata Waktu Tunggu</label>
                                        <Input
                                            value={settingsMap.cockpit_wait_time || ''}
                                            onChange={(e) => handleChange('cockpit_wait_time', e.target.value)}
                                            placeholder="12.4 Mnt"
                                            className="text-xs font-mono font-bold text-[#F97316]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Uptime Cloud Server</label>
                                        <Input
                                            value={settingsMap.cockpit_cloud_uptime || ''}
                                            onChange={(e) => handleChange('cockpit_cloud_uptime', e.target.value)}
                                            placeholder="99.98%"
                                            className="text-xs font-mono font-bold text-[#1B84FF]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Bagian Cockpit</label>
                                    <Input
                                        value={settingsMap.cockpit_headline || ''}
                                        onChange={(e) => handleChange('cockpit_headline', e.target.value)}
                                        placeholder="Pemantauan Kinerja Finansial & Klinis Real-Time"
                                        className="text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Penjelas Cockpit</label>
                                    <Textarea
                                        rows={2}
                                        value={settingsMap.cockpit_subheadline || ''}
                                        onChange={(e) => handleChange('cockpit_subheadline', e.target.value)}
                                        placeholder="Dashboard eksekutif terintegrasi memberikan visibilitas penuh..."
                                        className="text-xs leading-relaxed"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Section 4: Cloud RIS/PACS */}
                    {berandaSection === 'pacs' && (
                        <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                            <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <Radio className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Flagship Cloud RIS/PACS &amp; Zero-Footprint DICOM</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Kelola kampanye modul radiologi unggulan, workstation visual DICOM, dan metrik turnaround time.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Badge Label Atas</label>
                                        <Input
                                            value={settingsMap.pacs_badge_text || ''}
                                            onChange={(e) => handleChange('pacs_badge_text', e.target.value)}
                                            placeholder="MODUL FLAGSHIP TERBARU"
                                            className="text-xs font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Sub-Badge Label</label>
                                        <Input
                                            value={settingsMap.pacs_badge_sub || ''}
                                            onChange={(e) => handleChange('pacs_badge_sub', e.target.value)}
                                            placeholder="Liva Cloud RIS & Zero-Footprint PACS"
                                            className="text-xs"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama RIS/PACS</label>
                                        <Input
                                            value={settingsMap.pacs_headline_main || ''}
                                            onChange={(e) => handleChange('pacs_headline_main', e.target.value)}
                                            placeholder="Sistem RIS/PACS Cloud Terintegrasi Penuh"
                                            className="text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1B84FF] mb-1">Teks Sorotan Warna</label>
                                        <Input
                                            value={settingsMap.pacs_headline_highlight || ''}
                                            onChange={(e) => handleChange('pacs_headline_highlight', e.target.value)}
                                            placeholder="Rekam Medis SIMRS"
                                            className="text-xs border-blue-300 font-bold"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Modul RIS/PACS</label>
                                    <Textarea
                                        rows={3}
                                        value={settingsMap.pacs_description || ''}
                                        onChange={(e) => handleChange('pacs_description', e.target.value)}
                                        placeholder="Hubungkan mesin CT-Scan, MRI, X-Ray, dan USG langsung ke antarmuka dokter..."
                                        className="text-xs leading-relaxed"
                                    />
                                </div>

                                {/* Workstation Visual with Auto-WebP Upload */}
                                <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#EFF2F5] space-y-3">
                                    <label className="block text-xs font-bold text-[#181C32]">Gambar Diagnostic Workstation PACS (Auto-WebP)</label>
                                    <div className="flex items-center gap-3">
                                        <Input
                                            value={settingsMap.pacs_visual_url || ''}
                                            onChange={(e) => handleChange('pacs_visual_url', e.target.value)}
                                            placeholder="/images/pacs-workstation.webp atau URL..."
                                            className="text-xs font-mono bg-white"
                                        />
                                        <WebpUploadButton
                                            value={settingsMap.pacs_visual_url}
                                            onUploadSuccess={(url) => handleChange('pacs_visual_url', url)}
                                            label="Upload Gambar (Auto-WebP)"
                                        />
                                    </div>
                                    {settingsMap.pacs_visual_url && (
                                        <div className="p-2 bg-white border border-[#EFF2F5] rounded-xl inline-block shadow-2xs">
                                            <img src={settingsMap.pacs_visual_url} alt="PACS Preview" className="h-16 rounded object-cover" />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Section 5: Solutions Faskes */}
                    {berandaSection === 'solutions' && (
                        <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                            <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <Layers className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Solusi Berdasarkan Tipe Fasilitas Kesehatan</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Konfigurasi teks judul dan penjelasan solusi spesifik RSUD, RS Swasta, dan Klinik Pratama/Utama.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Badge Label</label>
                                    <Input
                                        value={settingsMap.solutions_badge || ''}
                                        onChange={(e) => handleChange('solutions_badge', e.target.value)}
                                        placeholder="SPESIFIKASI BERDASARKAN SKALA FASKES"
                                        className="text-xs font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama Solusi</label>
                                    <Input
                                        value={settingsMap.solutions_title || ''}
                                        onChange={(e) => handleChange('solutions_title', e.target.value)}
                                        placeholder="Dirancang Fleksibel untuk Segala Tipe Rumah Sakit"
                                        className="text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Deskripsi</label>
                                    <Textarea
                                        rows={2}
                                        value={settingsMap.solutions_subtitle || ''}
                                        onChange={(e) => handleChange('solutions_subtitle', e.target.value)}
                                        placeholder="Dari RSUD dengan integrasi BLUD hingga jaringan RS swasta multi-cabang..."
                                        className="text-xs leading-relaxed"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Section 6: Trust & Credentials */}
                    {berandaSection === 'trust' && (
                        <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                            <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Kredensial Keamanan &amp; Kepatuhan Regulasi Nasional</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Sertifikasi ISO 27001, UU PDP No. 27/2022, SATUSEHAT Kemenkes, dan Bridging BPJS Kesehatan.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Badge Kredensial</label>
                                    <Input
                                        value={settingsMap.trust_badge || ''}
                                        onChange={(e) => handleChange('trust_badge', e.target.value)}
                                        placeholder="KEAMANAN DATA TINGKAT TINGGI"
                                        className="text-xs font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Kredensial</label>
                                    <Input
                                        value={settingsMap.trust_title || ''}
                                        onChange={(e) => handleChange('trust_title', e.target.value)}
                                        placeholder="Kepatuhan Tanpa Kompromi terhadap Regulasi Medis"
                                        className="text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Kredensial</label>
                                    <Textarea
                                        rows={2}
                                        value={settingsMap.trust_desc || ''}
                                        onChange={(e) => handleChange('trust_desc', e.target.value)}
                                        placeholder="Arsitektur kami memenuhi seluruh persyaratan kepatuhan regulasi kesehatan Indonesia..."
                                        className="text-xs leading-relaxed"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Section 7: Pillars & Modules */}
                    {berandaSection === 'pillars_modules' && (
                        <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                            <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Header 6 Pilar &amp; 36 Modul Terpadu</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Atur teks pengantar 6 pilar keunggulan dan etalase 36 modul SIMRS di beranda.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#EFF2F5] space-y-3">
                                        <span className="text-xs font-bold text-[#181C32] block">Bagian 6 Pilar Keunggulan</span>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-[#4B5675] mb-1">Badge Pilar</label>
                                            <Input
                                                value={settingsMap.pillars_badge || ''}
                                                onChange={(e) => handleChange('pillars_badge', e.target.value)}
                                                placeholder="6 PILAR DIFERENSIASI KLAS"
                                                className="text-xs bg-white font-mono"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-[#4B5675] mb-1">Judul Pilar</label>
                                            <Input
                                                value={settingsMap.pillars_title || ''}
                                                onChange={(e) => handleChange('pillars_title', e.target.value)}
                                                placeholder="Mengapa Faskes Terkemuka Memilih Liva SIMRS"
                                                className="text-xs bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#EFF2F5] space-y-3">
                                        <span className="text-xs font-bold text-[#181C32] block">Bagian Etalase 36 Modul</span>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-[#4B5675] mb-1">Badge Modul</label>
                                            <Input
                                                value={settingsMap.modules_badge || ''}
                                                onChange={(e) => handleChange('modules_badge', e.target.value)}
                                                placeholder="ARSITEKTUR LENGKAP 36 MODUL"
                                                className="text-xs bg-white font-mono"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-[#4B5675] mb-1">Judul Modul</label>
                                            <Input
                                                value={settingsMap.modules_title || ''}
                                                onChange={(e) => handleChange('modules_title', e.target.value)}
                                                placeholder="Ekosistem Modul Rumah Sakit Terlengkap"
                                                className="text-xs bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Section 8: Network Map */}
                    {berandaSection === 'network' && (
                        <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                            <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Peta Sebaran Faskes Mitra Nasional</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Atur teks pendukung sebaran 40+ rumah sakit mitra se-Indonesia.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Badge Peta</label>
                                    <Input
                                        value={settingsMap.map_badge || ''}
                                        onChange={(e) => handleChange('map_badge', e.target.value)}
                                        placeholder="DISTRIBUSI MITRA NASIONAL"
                                        className="text-xs font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Peta</label>
                                    <Input
                                        value={settingsMap.map_title || ''}
                                        onChange={(e) => handleChange('map_title', e.target.value)}
                                        placeholder="Dipercaya Lebih dari 40+ Rumah Sakit di Seluruh Indonesia"
                                        className="text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Deskripsi Peta</label>
                                    <Textarea
                                        rows={2}
                                        value={settingsMap.map_subtitle || ''}
                                        onChange={(e) => handleChange('map_subtitle', e.target.value)}
                                        placeholder="Mulai dari RSUD Kelas B di Sumatera hingga RS Khusus di Jawa Timur..."
                                        className="text-xs leading-relaxed"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Section 9: FAQ */}
                    {berandaSection === 'faq' && (
                        <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                            <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <HelpCircle className="h-4 w-4 text-[#1B84FF]" />
                                    <span>FAQ Klinis, Migrasi Data &amp; Pengadaan RS</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Kelola daftar pertanyaan yang sering diajukan oleh Direksi dan Komite IT Rumah Sakit.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Badge FAQ</label>
                                        <Input
                                            value={settingsMap.faq_badge || ''}
                                            onChange={(e) => handleChange('faq_badge', e.target.value)}
                                            placeholder="TANYA JAWAB KLINIS & TEKNIS"
                                            className="text-xs font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul FAQ</label>
                                        <Input
                                            value={settingsMap.faq_title || ''}
                                            onChange={(e) => handleChange('faq_title', e.target.value)}
                                            placeholder="Pertanyaan Seputar Implementasi Liva SIMRS"
                                            className="text-xs"
                                        />
                                    </div>
                                </div>

                                {/* Custom FAQ List */}
                                <div className="space-y-3 pt-2">
                                    <span className="text-xs font-bold text-[#181C32] block">Daftar Pertanyaan Kustom ({customFaqs.length})</span>
                                    {customFaqs.map((faq) => (
                                        <div key={faq.id} className="p-3.5 rounded-xl bg-[#F9F9F9] border border-[#EFF2F5] flex items-start justify-between gap-3">
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">
                                                    {faq.categoryLabel || faq.category}
                                                </span>
                                                <p className="text-xs font-bold text-[#181C32]">{faq.q}</p>
                                                <p className="text-[11px] text-[#4B5675] leading-relaxed">{faq.a}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveFaqItem(faq.id)}
                                                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-8 w-8 p-0 shrink-0"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}

                                    {/* Add New FAQ Box */}
                                    <div className="p-4 rounded-xl border border-dashed border-[#1B84FF]/40 bg-[#F1FAFF]/30 space-y-3">
                                        <span className="text-xs font-bold text-[#1B84FF] block">+ Tambah Pertanyaan FAQ Baru</span>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <div className="sm:col-span-2">
                                                <Input
                                                    value={newFaqQ}
                                                    onChange={(e) => setNewFaqQ(e.target.value)}
                                                    placeholder="Tuliskan pertanyaan baru..."
                                                    className="text-xs bg-white"
                                                />
                                            </div>
                                            <div>
                                                <select
                                                    value={newFaqCategory}
                                                    onChange={(e) => setNewFaqCategory(e.target.value)}
                                                    className="w-full h-9 rounded-md border border-[#EFF2F5] bg-white px-3 py-1 text-xs text-[#181C32]"
                                                >
                                                    <option value="migration">Migrasi &amp; Go-Live</option>
                                                    <option value="compliance">SATUSEHAT &amp; BPJS</option>
                                                    <option value="technical">Arsitektur &amp; Offline</option>
                                                    <option value="procurement">Skema Biaya &amp; SLA</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <Textarea
                                                rows={2}
                                                value={newFaqA}
                                                onChange={(e) => setNewFaqA(e.target.value)}
                                                placeholder="Tuliskan jawaban penjelasan..."
                                                className="text-xs bg-white leading-relaxed"
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={handleAddFaqItem}
                                            className="bg-[#1B84FF] hover:bg-[#056EE9] text-white text-xs h-8 px-4 rounded-lg font-semibold"
                                        >
                                            <Plus className="h-3.5 w-3.5 mr-1" />
                                            <span>Tambahkan ke Daftar</span>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Section 10: Bottom CTA Banner */}
                    {berandaSection === 'bottom_cta' && (
                        <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                            <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Banner Panggilan Aksi (CTA) Bawah Beranda</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Ubah judul dan pesan penutup yang mendorong pimpinan faskes menjadwalkan demo.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Lencana Badge CTA</label>
                                    <Input
                                        value={settingsMap.cta_badge_text || ''}
                                        onChange={(e) => handleChange('cta_badge_text', e.target.value)}
                                        placeholder="SOLUSI TERSTANDAR UNTUK RUMAH SAKIT & KLINIK"
                                        className="text-xs font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Banner CTA</label>
                                    <Input
                                        value={settingsMap.cta_headline || ''}
                                        onChange={(e) => handleChange('cta_headline', e.target.value)}
                                        placeholder="Siap Mengakselerasi Digitalisasi Faskes Anda?"
                                        className="text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Penjelas CTA</label>
                                    <Textarea
                                        rows={2}
                                        value={settingsMap.cta_description || ''}
                                        onChange={(e) => handleChange('cta_description', e.target.value)}
                                        placeholder="Jadwalkan sesi konsultasi dan demonstrasi langsung..."
                                        className="text-xs leading-relaxed"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {/* ========================================================================= */}
            {/* 4. PAGE VIEW: KATALOG MODUL (KATALOGMODULPAGE)                            */}
            {/* ========================================================================= */}
            {selectedPage === 'katalog-modul' && (
                <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                    <CardHeader className="p-6 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <Layers className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Halaman Publik: Katalog 36 Modul SIMRS</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Atur teks pembuka, lencana akreditasi, dan metrik arsitektur yang tampil di /modul-simrs.
                                </CardDescription>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#F1FAFF] text-[#1B84FF]">
                                /modul-simrs
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Lencana Pill Atas (Badge)</label>
                                <Input
                                    value={settingsMap.page_modules_badge || ''}
                                    onChange={(e) => handleChange('page_modules_badge', e.target.value)}
                                    placeholder="ARSITEKTUR LENGKAP 36 MODUL TERPADU"
                                    className="text-xs font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Label Total Arsitektur</label>
                                <Input
                                    value={settingsMap.page_modules_total_label || ''}
                                    onChange={(e) => handleChange('page_modules_total_label', e.target.value)}
                                    placeholder="36 Modul Siap Pakai"
                                    className="text-xs font-mono font-bold text-[#1B84FF]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama Halaman</label>
                            <Input
                                value={settingsMap.page_modules_title || ''}
                                onChange={(e) => handleChange('page_modules_title', e.target.value)}
                                placeholder="Katalog 36 Modul SIMRS Enterprise Terintegrasi"
                                className="text-xs font-bold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Deskripsi Halaman</label>
                            <Textarea
                                rows={3}
                                value={settingsMap.page_modules_subtitle || ''}
                                onChange={(e) => handleChange('page_modules_subtitle', e.target.value)}
                                placeholder="Dirancang khusus untuk memenuhi standar akreditasi KARS STARKES, Permenkes No. 24/2022..."
                                className="text-xs leading-relaxed"
                            />
                        </div>

                        <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#EFF2F5] flex items-center justify-between">
                            <div className="space-y-0.5">
                                <span className="text-xs font-bold text-[#181C32] block">Edit Deskripsi Tiap-tiap Modul (36 Modul)</span>
                                <p className="text-[11px] text-[#78829D]">
                                    Untuk mengedit fitur detail per modul (IGD, Rawat Jalan, Casemix, dll), buka menu Katalog 36 Modul SIMRS di sidebar.
                                </p>
                            </div>
                            <span className="text-xs font-bold text-[#1B84FF] font-mono">Modul Live Active</span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* ========================================================================= */}
            {/* 4b. PAGE VIEW: RIS / PACS (RISPACSPAGE)                                   */}
            {/* ========================================================================= */}
            {selectedPage === 'ris-pacs' && (
                <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                    <CardHeader className="p-6 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Halaman Publik: Liva Cloud RIS / PACS Radiologi</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Atur teks pembuka, lencana DICOM 3.0, headline marketing, dan fitur penunjang radiologi yang tampil di /ris-pacs.
                                </CardDescription>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#F1FAFF] text-[#1B84FF]">
                                /ris-pacs
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Lencana Pill Atas (Badge)</label>
                                <Input
                                    value={settingsMap.ris_pacs_badge || ''}
                                    onChange={(e) => handleChange('ris_pacs_badge', e.target.value)}
                                    placeholder="DICOM 3.0 • ZERO-FOOTPRINT CLOUD PACS • SATUSEHAT READY"
                                    className="text-xs font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Target Halaman Publik</label>
                                <Input
                                    value="https://livasimrs.id/ris-pacs"
                                    disabled
                                    className="text-xs font-mono bg-slate-50 text-slate-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama Halaman RIS / PACS</label>
                            <Input
                                value={settingsMap.ris_pacs_title || ''}
                                onChange={(e) => handleChange('ris_pacs_title', e.target.value)}
                                placeholder="Liva Cloud RIS & PACS: Sistem Radiologi & Arsip Citra Medis Berkecepatan Tinggi"
                                className="text-xs font-bold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Deskripsi Halaman</label>
                            <Textarea
                                rows={3}
                                value={settingsMap.ris_pacs_subtitle || ''}
                                onChange={(e) => handleChange('ris_pacs_subtitle', e.target.value)}
                                placeholder="Modernisasi instalasi radiologi rumah sakit dengan penampil DICOM web tanpa instalasi (zero-footprint)..."
                                className="text-xs leading-relaxed"
                            />
                        </div>

                        <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#EFF2F5] flex items-center justify-between">
                            <div className="space-y-0.5">
                                <span className="text-xs font-bold text-[#181C32] block">Kustomisasi Tata Letak &amp; Foto Bagian RIS/PACS</span>
                                <p className="text-[11px] text-[#78829D]">
                                    Untuk mengubah foto tiap bagian, warna latar belakang, dan urutan seksi RIS/PACS, buka menu <strong>Tata Letak (Page Builder)</strong> di sidebar.
                                </p>
                            </div>
                            <span className="text-xs font-bold text-[#1B84FF] font-mono">10 Bagian Siap Edit</span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* ========================================================================= */}
            {/* 5. PAGE VIEW: KEUNGGULAN & ARSITEKTUR KLAS (KEUNGGULANPAGE)               */}
            {/* ========================================================================= */}
            {selectedPage === 'keunggulan' && (
                <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                    <CardHeader className="p-6 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Halaman Publik: Keunggulan &amp; Arsitektur KLAS</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Atur headline keunggulan teknis, komparasi vendor konvensional, dan metrik arsitektur di /keunggulan.
                                </CardDescription>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#F1FAFF] text-[#1B84FF]">
                                /keunggulan
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Lencana Pill Atas (Badge)</label>
                            <Input
                                value={settingsMap.page_keunggulan_badge || ''}
                                onChange={(e) => handleChange('page_keunggulan_badge', e.target.value)}
                                placeholder="ARSITEKTUR & STANDAR KLAS INTERNASIONAL"
                                className="text-xs font-mono"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama Halaman</label>
                            <Input
                                value={settingsMap.page_keunggulan_title || ''}
                                onChange={(e) => handleChange('page_keunggulan_title', e.target.value)}
                                placeholder="Keunggulan Arsitektur & Standar Komparasi KLAS"
                                className="text-xs font-bold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Deskripsi Halaman</label>
                            <Textarea
                                rows={3}
                                value={settingsMap.page_keunggulan_subtitle || ''}
                                onChange={(e) => handleChange('page_keunggulan_subtitle', e.target.value)}
                                placeholder="Perbandingan komprehensif kapabilitas Liva SIMRS terhadap vendor konvensional..."
                                className="text-xs leading-relaxed"
                            />
                        </div>

                        <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#EFF2F5] flex items-center justify-between">
                            <div className="space-y-0.5">
                                <span className="text-xs font-bold text-[#181C32] block">Tabel Komparasi Vendor &amp; 6 Pilar</span>
                                <p className="text-[11px] text-[#78829D]">
                                    Untuk menyesuaikan baris matriks komparasi fitur vs vendor konvensional, gunakan tab Komparasi Vendor KLAS di sidebar.
                                </p>
                            </div>
                            <span className="text-xs font-bold text-emerald-600 font-mono">100% KLAS Benchmark</span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* ========================================================================= */}
            {/* 6. PAGE VIEW: STUDI KASUS RS MITRA (STUDIKASUSPAGE)                       */}
            {/* ========================================================================= */}
            {selectedPage === 'studi-kasus' && (
                <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                    <CardHeader className="p-6 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <Award className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Halaman Publik: Studi Kasus RS Mitra</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Kelola judul, uraian pembuka, dan testimoni transformasi rumah sakit di /studi-kasus.
                                </CardDescription>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#F1FAFF] text-[#1B84FF]">
                                /studi-kasus
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Lencana Pill Atas (Badge)</label>
                            <Input
                                value={settingsMap.page_case_badge || ''}
                                onChange={(e) => handleChange('page_case_badge', e.target.value)}
                                placeholder="EVIDENSI NYATA & TESTIMONI RUMAH SAKIT"
                                className="text-xs font-mono"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama Halaman</label>
                            <Input
                                value={settingsMap.page_case_title || ''}
                                onChange={(e) => handleChange('page_case_title', e.target.value)}
                                placeholder="Studi Kasus & Transformasi Faskes Mitra"
                                className="text-xs font-bold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Deskripsi Halaman</label>
                            <Textarea
                                rows={3}
                                value={settingsMap.page_case_subtitle || ''}
                                onChange={(e) => handleChange('page_case_subtitle', e.target.value)}
                                placeholder="Bukti nyata peningkatan efisiensi operasional dan kepatuhan regulasi di berbagai tipe rumah sakit..."
                                className="text-xs leading-relaxed"
                            />
                        </div>

                        <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#EFF2F5] flex items-center justify-between">
                            <div className="space-y-0.5">
                                <span className="text-xs font-bold text-[#181C32] block">Kelola Testimoni &amp; Metrik Rumah Sakit Mitra</span>
                                <p className="text-[11px] text-[#78829D]">
                                    Untuk menambah profil RSUD baru, angka efisiensi, dan kutipan Direktur, gunakan tab Studi Kasus RS Mitra di sidebar.
                                </p>
                            </div>
                            <span className="text-xs font-bold text-[#1B84FF] font-mono">Live Evidensi</span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* ========================================================================= */}
            {/* 7. PAGE VIEW: TENTANG KAMI (TENTANGKAMIPAGE)                               */}
            {/* ========================================================================= */}
            {selectedPage === 'tentang-kami' && (
                <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                    <CardHeader className="p-6 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <Users className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Halaman Publik: Tentang Kami &amp; Profil Perusahaan</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Atur visi, misi, nilai perusahaan, dan pesan kepemimpinan nakes di /tentang-kami.
                                </CardDescription>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#F1FAFF] text-[#1B84FF]">
                                /tentang-kami
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Lencana Pill Atas (Badge)</label>
                                <Input
                                    value={settingsMap.page_about_badge || ''}
                                    onChange={(e) => handleChange('page_about_badge', e.target.value)}
                                    placeholder="PROFIL PERUSAHAAN & VISI KESEHATAN DIGITAL"
                                    className="text-xs font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Visi Perusahaan</label>
                                <Input
                                    value={settingsMap.about_visi_title || ''}
                                    onChange={(e) => handleChange('about_visi_title', e.target.value)}
                                    placeholder="Menjadi Standar Emas Arsitektur Digital Rumah Sakit di Indonesia..."
                                    className="text-xs font-bold text-[#1B84FF]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama Halaman</label>
                            <Input
                                value={settingsMap.page_about_title || ''}
                                onChange={(e) => handleChange('page_about_title', e.target.value)}
                                placeholder="Membangun Fondasi Digital Rumah Sakit Indonesia yang Modern, Andal, dan Humanis."
                                className="text-xs font-bold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Deskripsi Halaman</label>
                            <Textarea
                                rows={3}
                                value={settingsMap.page_about_subtitle || ''}
                                onChange={(e) => handleChange('page_about_subtitle', e.target.value)}
                                placeholder="Liva SIMRS adalah pengembang platform teknologi informasi kesehatan terkemuka di Indonesia..."
                                className="text-xs leading-relaxed"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Narasi Visi Perusahaan</label>
                            <Textarea
                                rows={2}
                                value={settingsMap.about_visi_desc || ''}
                                onChange={(e) => handleChange('about_visi_desc', e.target.value)}
                                placeholder="Mewujudkan ekosistem kesehatan digital di mana setiap data rekam medis terhubung mulus..."
                                className="text-xs leading-relaxed"
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* ========================================================================= */}
            {/* 8. PAGE VIEW: JADWALKAN DEMO (JADWALKANDEMOPAGE)                           */}
            {/* ========================================================================= */}
            {selectedPage === 'jadwalkan-demo' && (
                <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                    <CardHeader className="p-6 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-[#1B84FF]" />
                                    <span>Halaman Publik: Jadwalkan Live Demo &amp; Assessment RS</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-[#78829D]">
                                    Atur teks pembuka formulir reservasi konsultasi klinis dan jaminan kerahasiaan medis di /jadwalkan-demo.
                                </CardDescription>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#F1FAFF] text-[#1B84FF]">
                                /jadwalkan-demo
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Lencana Pill Atas (Badge)</label>
                            <Input
                                value={settingsMap.page_demo_badge || ''}
                                onChange={(e) => handleChange('page_demo_badge', e.target.value)}
                                placeholder="CONSULTATION & CLINICAL SANDBOX"
                                className="text-xs font-mono"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Judul Utama Halaman</label>
                            <Input
                                value={settingsMap.page_demo_title || ''}
                                onChange={(e) => handleChange('page_demo_title', e.target.value)}
                                placeholder="Jadwalkan Live Demo & Assessment SIMRS"
                                className="text-xs font-bold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Uraian Deskripsi Halaman</label>
                            <Textarea
                                rows={3}
                                value={settingsMap.page_demo_subtitle || ''}
                                onChange={(e) => handleChange('page_demo_subtitle', e.target.value)}
                                placeholder="Dapatkan sesi demonstrasi langsung arsitektur Liva SIMRS yang disesuaikan dengan volume pasien rumah sakit Anda..."
                                className="text-xs leading-relaxed"
                            />
                        </div>

                        <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#EFF2F5] flex items-center justify-between">
                            <div className="space-y-0.5">
                                <span className="text-xs font-bold text-[#181C32] block">Pantau Permohonan Masuk (Live Leads)</span>
                                <p className="text-[11px] text-[#78829D]">
                                    Setiap formulir demo yang diisi rumah sakit akan langsung tercatat dan dapat ditindaklanjuti pada menu Permohonan Demo RS.
                                </p>
                            </div>
                            <span className="text-xs font-bold text-[#50CD89] font-mono">Real-Time CRM</span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* ========================================================================= */}
            {/* 9. PAGE VIEW: IDENTITAS BRAND, KONTAK & MEDIA                              */}
            {/* ========================================================================= */}
            {selectedPage === 'identitas' && (
                <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                    <CardHeader className="p-6 pb-4">
                        <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-[#1B84FF]" />
                            <span>Identitas Brand, Kontak Hotline &amp; Footer Global</span>
                        </CardTitle>
                        <CardDescription className="text-xs text-[#78829D]">
                            Konfigurasi logo sistem (auto-convert ke WebP), nama platform, kontak darurat rumah sakit, dan teks copyright.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-5">
                        {/* Logo and Favicon with WebP Upload */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#F9F9F9] border border-[#EFF2F5]">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-[#181C32]">Logo Utama SIMRS (Auto-WebP)</label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={settingsMap.site_logo_url || ''}
                                        onChange={(e) => handleChange('site_logo_url', e.target.value)}
                                        placeholder="/images/logo.webp atau URL..."
                                        className="text-xs font-mono bg-white"
                                    />
                                    <WebpUploadButton
                                        value={settingsMap.site_logo_url}
                                        onUploadSuccess={(url) => handleChange('site_logo_url', url)}
                                        label="Upload Logo"
                                    />
                                </div>
                                {settingsMap.site_logo_url && (
                                    <div className="p-2 bg-white border border-[#EFF2F5] rounded-lg inline-block">
                                        <img src={settingsMap.site_logo_url} alt="Logo Preview" className="h-8 max-w-[120px] object-contain" />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-[#181C32]">Favicon / App Icon (Auto-WebP)</label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={settingsMap.site_favicon_url || ''}
                                        onChange={(e) => handleChange('site_favicon_url', e.target.value)}
                                        placeholder="/favicon.ico atau URL..."
                                        className="text-xs font-mono bg-white"
                                    />
                                    <WebpUploadButton
                                        value={settingsMap.site_favicon_url}
                                        onUploadSuccess={(url) => handleChange('site_favicon_url', url)}
                                        label="Upload Icon"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Nama Brand Platform</label>
                                <Input
                                    value={settingsMap.site_name || ''}
                                    onChange={(e) => handleChange('site_name', e.target.value)}
                                    placeholder="Liva SIMRS"
                                    className="text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Tagline Platform</label>
                                <Input
                                    value={settingsMap.site_tagline || ''}
                                    onChange={(e) => handleChange('site_tagline', e.target.value)}
                                    placeholder="Generasi Baru Sistem Informasi Manajemen Rumah Sakit Terakreditasi"
                                    className="text-xs"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Nomor WhatsApp Hotline RS</label>
                                <Input
                                    value={settingsMap.contact_whatsapp || ''}
                                    onChange={(e) => handleChange('contact_whatsapp', e.target.value)}
                                    placeholder="6281280005599"
                                    className="text-xs font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Hotline Telepon Darurat 24/7</label>
                                <Input
                                    value={settingsMap.company_hotline || ''}
                                    onChange={(e) => handleChange('company_hotline', e.target.value)}
                                    placeholder="+62 21 8062 5599"
                                    className="text-xs font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#181C32] mb-1">Email Resmi Konsultasi</label>
                                <Input
                                    value={settingsMap.company_email || ''}
                                    onChange={(e) => handleChange('company_email', e.target.value)}
                                    placeholder="info@livasimrs.id"
                                    className="text-xs font-mono"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Alamat Kantor &amp; Data Center</label>
                            <Input
                                value={settingsMap.company_address || ''}
                                onChange={(e) => handleChange('company_address', e.target.value)}
                                placeholder="Jl. RS Fatmawati Raya No. 45, Cilandak Barat, Jakarta Selatan 12430"
                                className="text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#181C32] mb-1">Teks Hak Cipta Footer (Copyright)</label>
                            <Input
                                value={settingsMap.footer_copyright || ''}
                                onChange={(e) => handleChange('footer_copyright', e.target.value)}
                                placeholder="© 2026 PT Liva Medika Solusindo. Seluruh hak cipta dilindungi."
                                className="text-xs"
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* ========================================================================= */}
            {/* 10. PAGE VIEW: STUDIO MEDIA & KONVERSI WEBP OTOMATIS                      */}
            {/* ========================================================================= */}
            {selectedPage === 'webp-studio' && (
                <div className="space-y-6">
                    <Card className="border-[#EFF2F5] shadow-[0_0_20px_0_rgba(76,87,125,0.02)]">
                        <CardHeader className="p-6 pb-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E8FFF3] text-[#50CD89] border border-[#B1F8D0] font-mono text-[10.5px] font-bold">
                                        <Sparkles className="h-3 w-3" />
                                        GD Native Engine • Quality 82% Lossless Profile
                                    </div>
                                    <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4 text-[#1B84FF]" />
                                        <span>Studio Media &amp; Otomasi Konversi Gambar WebP</span>
                                    </CardTitle>
                                    <CardDescription className="text-xs text-[#78829D]">
                                        Semua gambar (PNG, JPG, BMP, GIF) yang diupload ke studio ini otomatis dikonversi menjadi format WebP berbobot super ringan agar load time website instan untuk pengunjung.
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-6">
                            {/* Drag and Drop Zone */}
                            <input
                                ref={studioFileInputRef}
                                type="file"
                                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml,image/bmp"
                                onChange={handleStudioUpload}
                                className="hidden"
                            />

                            <div
                                onClick={() => studioFileInputRef.current?.click()}
                                className="border-2 border-dashed border-[#1B84FF]/40 hover:border-[#1B84FF] rounded-2xl p-8 sm:p-12 text-center bg-[#F1FAFF]/20 hover:bg-[#F1FAFF]/50 transition-all cursor-pointer space-y-3 group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#1B84FF]/10 text-[#1B84FF] group-hover:scale-110 flex items-center justify-center mx-auto transition-transform">
                                    {studioUploading ? (
                                        <RefreshCw className="h-6 w-6 animate-spin text-[#1B84FF]" />
                                    ) : (
                                        <Upload className="h-6 w-6 text-[#1B84FF]" />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-[#181C32]">
                                        {studioUploading ? 'Sedang Mengompresi dan Mengonversi ke WebP...' : 'Klik untuk Memilih Gambar atau Tarik File ke Sini'}
                                    </p>
                                    <p className="text-xs text-[#78829D]">
                                        Mendukung PNG, JPEG, JPG, GIF, BMP, atau SVG (Maksimal 12MB). Otomatis terkonversi ke .webp ringan.
                                    </p>
                                </div>
                            </div>

                            {/* Conversion Results Spotlight */}
                            {studioLastResult && (
                                <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            <span className="text-xs font-bold text-slate-900 font-display">Hasil Konversi WebP Sukses</span>
                                        </div>
                                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                                            Hemat {studioLastResult.saved_percent}% Ukuran File
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                                        <div className="p-3 bg-slate-50 rounded-xl">
                                            <span className="text-[10px] text-slate-500 block">Ukuran Asli</span>
                                            <span className="font-bold text-slate-800">{studioLastResult.original_size_kb} KB ({studioLastResult.original_format})</span>
                                        </div>
                                        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                                            <span className="text-[10px] text-emerald-700 block">Ukuran Setelah WebP</span>
                                            <span className="font-bold text-emerald-800">{studioLastResult.webp_size_kb} KB (WebP)</span>
                                        </div>
                                        <div className="p-3 bg-blue-50 rounded-xl">
                                            <span className="text-[10px] text-blue-700 block">Penghematan Bobot</span>
                                            <span className="font-bold text-blue-800">-{studioLastResult.saved_kb} KB</span>
                                        </div>
                                    </div>

                                    {/* Image Preview & URL copy */}
                                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                                        <div className="w-28 h-20 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center p-1 shrink-0">
                                            <img src={studioLastResult.url} alt="Uploaded WebP" className="max-h-full max-w-full object-contain" />
                                        </div>

                                        <div className="flex-1 space-y-2 w-full">
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    readOnly
                                                    value={studioLastResult.url}
                                                    className="text-xs font-mono bg-slate-50"
                                                />
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleCopyUrl(studioLastResult.url)}
                                                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs h-9 px-3 gap-1.5 shrink-0"
                                                >
                                                    {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                                                    <span>{copiedUrl ? 'Tersalin' : 'Salin URL'}</span>
                                                </Button>
                                            </div>

                                            {/* Quick Apply Buttons */}
                                            <div className="flex flex-wrap items-center gap-2 pt-1">
                                                <span className="text-[10.5px] font-semibold text-slate-500">Terapkan Langsung:</span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        handleChange('site_logo_url', studioLastResult.url);
                                                        showToast('Berhasil diterapkan ke Logo Website! Klik Simpan Pengaturan.', 'success');
                                                    }}
                                                    className="text-[10.5px] px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold cursor-pointer border border-blue-200"
                                                >
                                                    Sebagai Logo
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        handleChange('hero_visual_url', studioLastResult.url);
                                                        showToast('Berhasil diterapkan ke Visual Hero! Klik Simpan Pengaturan.', 'success');
                                                    }}
                                                    className="text-[10.5px] px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold cursor-pointer border border-blue-200"
                                                >
                                                    Sebagai Hero
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        handleChange('pacs_visual_url', studioLastResult.url);
                                                        showToast('Berhasil diterapkan ke RIS/PACS Workstation! Klik Simpan Pengaturan.', 'success');
                                                    }}
                                                    className="text-[10.5px] px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold cursor-pointer border border-blue-200"
                                                >
                                                    Sebagai RIS/PACS
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Recent Studio Uploads */}
                            {studioHistory.length > 0 && (
                                <div className="space-y-3 pt-4 border-t border-[#EFF2F5]">
                                    <span className="text-xs font-bold text-[#181C32] block">Riwayat Upload Terakhir Sesi Ini</span>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {studioHistory.map((item, idx) => (
                                            <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#EFF2F5] shadow-2xs space-y-1.5">
                                                <div className="h-16 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden">
                                                    <img src={item.url} alt="History" className="max-h-full max-w-full object-contain" />
                                                </div>
                                                <div className="flex items-center justify-between text-[10px] font-mono">
                                                    <span className="text-emerald-700 font-bold">{item.webp_size_kb} KB</span>
                                                    <span className="text-slate-400">-{item.saved_percent}%</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCopyUrl(item.url)}
                                                    className="w-full text-center text-[10px] font-semibold text-blue-600 hover:text-blue-700 py-0.5 cursor-pointer"
                                                >
                                                    Salin Link
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* ========================================================================= */}
            {/* 11. BOTTOM FLOATING SAVE BAR                                              */}
            {/* ========================================================================= */}
            <div className="p-5 rounded-2xl bg-white border border-[#EFF2F5] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs text-[#4B5675]">
                    <CheckCircle2 className="h-4 w-4 text-[#50CD89] shrink-0" />
                    <span>
                        Seluruh pengaturan yang disimpan akan langsung direfleksikan ke semua pengunjung website secara real-time.
                    </span>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#1B84FF] hover:bg-[#056EE9] text-white gap-2 h-10 px-7 rounded-xl font-bold text-xs cursor-pointer shadow-[0_4px_14px_rgba(27,132,255,0.3)]"
                    >
                        <Save className="h-4 w-4" />
                        <span>{saving ? 'Menyimpan Semua...' : 'Simpan Semua Pengaturan'}</span>
                    </Button>
                </div>
            </div>

        </div>
    );
}
