import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSite } from '../../context/SiteContext';
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
} from 'lucide-react';

export default function AdminSettingsCMS() {
    const { refetchSiteData, showToast } = useSite();

    const [activeSection, setActiveSection] = useState('general');
    const [settingsMap, setSettingsMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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
            showToast('Gagal memuat data pengaturan', 'error');
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

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);

        try {
            const res = await axios.post('/api/admin/settings/batch', {
                settings: settingsMap,
            });

            if (res.data.status === 'success') {
                showToast(res.data.message || 'Pengaturan berhasil disimpan dan aktif di halaman publik', 'success');
                await refetchSiteData();
            }
        } catch (err) {
            showToast('Gagal menyimpan pengaturan CMS', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20 text-xs text-slate-500">
                <span className="w-6 h-6 border-2 border-[#2F8BFF] border-t-transparent rounded-full animate-spin mr-2"></span>
                Memuat konfigurasi CMS Liva SIMRS...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Top Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="text-[#2F8BFF] bg-blue-50/70 border-blue-200/80 font-mono text-[10.5px] px-2.5 py-0.5"
                        >
                            <Globe className="h-3 w-3 mr-1 text-[#2F8BFF]" />
                            Single Source of Truth CMS
                        </Badge>
                        <span className="text-xs text-slate-300">•</span>
                        <Badge
                            variant="outline"
                            className="text-emerald-700 bg-emerald-50/80 border-emerald-200/80 font-mono text-[10.5px] px-2.5 py-0.5"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 inline-block"></span>
                            Live Sync Realtime
                        </Badge>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2937] font-display">
                        Pengaturan CMS Beranda Publik
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                        Ubah teks judul hero, nomor kontak, banner pengumuman regulasi, dan simulator live cockpit tanpa redeploy.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#2F8BFF] hover:bg-[#256ecc] text-white shadow-xs gap-1.5 h-9 px-4 rounded-lg font-medium text-xs cursor-pointer"
                    >
                        <Save className="h-4 w-4" />
                        <span>{saving ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}</span>
                    </Button>
                </div>
            </div>

            {/* shadcn Tabs */}
            <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto p-1 bg-slate-100/80">
                    <TabsTrigger value="general" className="gap-2 py-2 text-xs font-semibold">
                        <Building2 className="h-3.5 w-3.5" />
                        <span>Brand & Kontak Faskes</span>
                    </TabsTrigger>
                    <TabsTrigger value="hero" className="gap-2 py-2 text-xs font-semibold">
                        <Type className="h-3.5 w-3.5" />
                        <span>Teks Hero & Judul</span>
                    </TabsTrigger>
                    <TabsTrigger value="telemetry" className="gap-2 py-2 text-xs font-semibold">
                        <Activity className="h-3.5 w-3.5" />
                        <span>Cockpit Mockup Live</span>
                    </TabsTrigger>
                    <TabsTrigger value="keunggulan" className="gap-2 py-2 text-xs font-semibold">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span>KPI Strip & Efisiensi</span>
                    </TabsTrigger>
                </TabsList>

                {/* 1. BRAND & CONTACT */}
                <TabsContent value="general">
                    <Card className="border-slate-200 shadow-xs">
                        <CardHeader className="p-6 pb-4">
                            <CardTitle className="text-sm font-bold text-[#1F2937] font-display">
                                Identitas Brand & Pita Pengumuman Header
                            </CardTitle>
                            <CardDescription className="text-xs text-slate-500">
                                Konfigurasi nama platform, slogan perusahaan, logo resmi, dan pita notifikasi kepatuhan regulasi Kemenkes.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 pt-0 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Nama Brand Platform
                                    </label>
                                    <Input
                                        value={settingsMap.site_name || ''}
                                        onChange={(e) => handleChange('site_name', e.target.value)}
                                        className="text-xs"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Tagline / Slogan Brand
                                    </label>
                                    <Input
                                        value={settingsMap.site_tagline || ''}
                                        onChange={(e) => handleChange('site_tagline', e.target.value)}
                                        className="text-xs"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    URL Logo Liva SIMRS (Image / SVG Link)
                                </label>
                                <Input
                                    value={settingsMap.site_logo || ''}
                                    onChange={(e) => handleChange('site_logo', e.target.value)}
                                    className="font-mono text-xs"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Teks Pengumuman Kepatuhan Nasional (Top Bar)
                                    </label>
                                    <Input
                                        value={settingsMap.top_announcement_text || ''}
                                        onChange={(e) => handleChange('top_announcement_text', e.target.value)}
                                        className="text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Teks Tombol Aksi Pengumuman
                                    </label>
                                    <Input
                                        value={settingsMap.top_announcement_link_text || ''}
                                        onChange={(e) => handleChange('top_announcement_link_text', e.target.value)}
                                        className="text-xs"
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <PhoneCall className="h-4 w-4 text-[#2F8BFF]" />
                                    <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                        Kontak Resmi & Layanan Hotline Rumah Sakit
                                    </h4>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                            Email Resmi
                                        </label>
                                        <Input
                                            type="email"
                                            value={settingsMap.contact_email || ''}
                                            onChange={(e) => handleChange('contact_email', e.target.value)}
                                            className="text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                            Telepon Kantor
                                        </label>
                                        <Input
                                            value={settingsMap.contact_phone || ''}
                                            onChange={(e) => handleChange('contact_phone', e.target.value)}
                                            className="text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                            Nomor WhatsApp 24/7
                                        </label>
                                        <Input
                                            value={settingsMap.contact_whatsapp || ''}
                                            onChange={(e) => handleChange('contact_whatsapp', e.target.value)}
                                            className="text-xs font-mono"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Alamat Kantor Pusat & Pusat Integrasi
                                    </label>
                                    <Textarea
                                        rows={2}
                                        value={settingsMap.contact_address || ''}
                                        onChange={(e) => handleChange('contact_address', e.target.value)}
                                        className="text-xs"
                                    />
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-0 flex justify-end">
                            <Button onClick={handleSave} disabled={saving} className="gap-1.5 shadow-xs">
                                <Save className="h-4 w-4" />
                                <span>Simpan Perubahan Brand</span>
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* 2. HERO SECTION */}
                <TabsContent value="hero">
                    <Card className="border-slate-200 shadow-xs">
                        <CardHeader className="p-6 pb-4">
                            <CardTitle className="text-sm font-bold text-[#1F2937] font-display">
                                Teks Headline & Tombol Aksi Hero Beranda
                            </CardTitle>
                            <CardDescription className="text-xs text-slate-500">
                                Atur komposisi judul dengan variasi warna primary (#2F8BFF) dan accent (#FF8A2B) untuk estetika anti-slop.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 pt-0 space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Teks Pill Badge Hero
                                </label>
                                <Input
                                    value={settingsMap.hero_badge_text || ''}
                                    onChange={(e) => handleChange('hero_badge_text', e.target.value)}
                                    className="text-xs"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Awalan Judul
                                    </label>
                                    <Input
                                        value={settingsMap.hero_title_prefix || ''}
                                        onChange={(e) => handleChange('hero_title_prefix', e.target.value)}
                                        className="text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#2F8BFF] mb-1">
                                        Highlight 1 (Biru)
                                    </label>
                                    <Input
                                        value={settingsMap.hero_title_highlight_1 || ''}
                                        onChange={(e) => handleChange('hero_title_highlight_1', e.target.value)}
                                        className="text-xs font-bold text-[#2F8BFF] border-[#2F8BFF]/40 bg-blue-50/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Tengah Judul
                                    </label>
                                    <Input
                                        value={settingsMap.hero_title_middle || ''}
                                        onChange={(e) => handleChange('hero_title_middle', e.target.value)}
                                        className="text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#FF8A2B] mb-1">
                                        Highlight 2 (Oranye)
                                    </label>
                                    <Input
                                        value={settingsMap.hero_title_highlight_2 || ''}
                                        onChange={(e) => handleChange('hero_title_highlight_2', e.target.value)}
                                        className="text-xs font-bold text-[#FF8A2B] border-[#FF8A2B]/40 bg-orange-50/30"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Paragraf Deskripsi Hero
                                </label>
                                <Textarea
                                    rows={3}
                                    value={settingsMap.hero_description || ''}
                                    onChange={(e) => handleChange('hero_description', e.target.value)}
                                    className="text-xs leading-relaxed"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Teks Tombol CTA Utama
                                    </label>
                                    <Input
                                        value={settingsMap.hero_cta_primary_text || ''}
                                        onChange={(e) => handleChange('hero_cta_primary_text', e.target.value)}
                                        className="text-xs font-semibold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Teks Tombol CTA Kedua
                                    </label>
                                    <Input
                                        value={settingsMap.hero_cta_secondary_text || ''}
                                        onChange={(e) => handleChange('hero_cta_secondary_text', e.target.value)}
                                        className="text-xs font-semibold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Badge Kepatuhan 1
                                    </label>
                                    <Input
                                        value={settingsMap.hero_badge_1 || ''}
                                        onChange={(e) => handleChange('hero_badge_1', e.target.value)}
                                        className="text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Badge Kepatuhan 2
                                    </label>
                                    <Input
                                        value={settingsMap.hero_badge_2 || ''}
                                        onChange={(e) => handleChange('hero_badge_2', e.target.value)}
                                        className="text-xs"
                                    />
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-0 flex justify-end">
                            <Button onClick={handleSave} disabled={saving} className="gap-1.5 shadow-xs">
                                <Save className="h-4 w-4" />
                                <span>Simpan Perubahan Hero</span>
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* 3. COCKPIT MOCKUP TELEMETRY */}
                <TabsContent value="telemetry">
                    <Card className="border-slate-200 shadow-xs">
                        <CardHeader className="p-6 pb-4">
                            <CardTitle className="text-sm font-bold text-[#1F2937] font-display">
                                Data Live Cockpit & Simulator Telemetri Hero
                            </CardTitle>
                            <CardDescription className="text-xs text-slate-500">
                                Nilai-nilai ini terhubung langsung ke simulasi UI Cockpit & RME di mockup hero beranda.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 pt-0 space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Label Node / Nama Rumah Sakit Simulator
                                </label>
                                <Input
                                    value={settingsMap.mockup_hospital_name || ''}
                                    onChange={(e) => handleChange('mockup_hospital_name', e.target.value)}
                                    className="text-xs font-semibold"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Nilai BOR Bed (%)
                                    </label>
                                    <Input
                                        value={settingsMap.mockup_bor_percentage || ''}
                                        onChange={(e) => handleChange('mockup_bor_percentage', e.target.value)}
                                        className="font-mono text-xs font-bold text-[#2F8BFF]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Status BOR
                                    </label>
                                    <Input
                                        value={settingsMap.mockup_bor_status || ''}
                                        onChange={(e) => handleChange('mockup_bor_status', e.target.value)}
                                        className="text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Sinkronisasi SATUSEHAT (%)
                                    </label>
                                    <Input
                                        value={settingsMap.mockup_satusehat_sync || ''}
                                        onChange={(e) => handleChange('mockup_satusehat_sync', e.target.value)}
                                        className="font-mono text-xs font-bold text-emerald-600"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Total Antrean Poliklinik Hari Ini
                                    </label>
                                    <Input
                                        value={settingsMap.mockup_queue_count || ''}
                                        onChange={(e) => handleChange('mockup_queue_count', e.target.value)}
                                        className="text-xs font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Teks Pasien Terlayani
                                    </label>
                                    <Input
                                        value={settingsMap.mockup_queue_served || ''}
                                        onChange={(e) => handleChange('mockup_queue_served', e.target.value)}
                                        className="text-xs"
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                                    Simulasi Kartu Rekam Medis Elektronik (RME Active Patient)
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                            Nama Pasien Contoh
                                        </label>
                                        <Input
                                            value={settingsMap.mockup_patient_name || ''}
                                            onChange={(e) => handleChange('mockup_patient_name', e.target.value)}
                                            className="text-xs font-semibold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                            Kelas Asuransi / BPJS
                                        </label>
                                        <Input
                                            value={settingsMap.mockup_patient_class || ''}
                                            onChange={(e) => handleChange('mockup_patient_class', e.target.value)}
                                            className="text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                            Dokter DPJP & Poliklinik
                                        </label>
                                        <Input
                                            value={settingsMap.mockup_patient_dpjp || ''}
                                            onChange={(e) => handleChange('mockup_patient_dpjp', e.target.value)}
                                            className="text-xs"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                            Tanda Vital
                                        </label>
                                        <Input
                                            value={settingsMap.mockup_patient_vitals || ''}
                                            onChange={(e) => handleChange('mockup_patient_vitals', e.target.value)}
                                            className="font-mono text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                            ICD-10 Diagnosa
                                        </label>
                                        <Input
                                            value={settingsMap.mockup_patient_icd10 || ''}
                                            onChange={(e) => handleChange('mockup_patient_icd10', e.target.value)}
                                            className="font-mono text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                            Status E-Resep
                                        </label>
                                        <Input
                                            value={settingsMap.mockup_patient_pharmacy || ''}
                                            onChange={(e) => handleChange('mockup_patient_pharmacy', e.target.value)}
                                            className="text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                            Rata-rata Waktu Tunggu
                                        </label>
                                        <Input
                                            value={settingsMap.mockup_avg_wait_time || ''}
                                            onChange={(e) => handleChange('mockup_avg_wait_time', e.target.value)}
                                            className="font-mono text-xs font-bold text-emerald-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-0 flex justify-end">
                            <Button onClick={handleSave} disabled={saving} className="gap-1.5 shadow-xs">
                                <Save className="h-4 w-4" />
                                <span>Simpan Data Cockpit</span>
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* 4. KEUNGGULAN KPI STRIP */}
                <TabsContent value="keunggulan">
                    <Card className="border-slate-200 shadow-xs">
                        <CardHeader className="p-6 pb-4">
                            <CardTitle className="text-sm font-bold text-[#1F2937] font-display">
                                Indikator Kinerja Klinis Utama (KPI Strip)
                            </CardTitle>
                            <CardDescription className="text-xs text-slate-500">
                                Menampilkan angka-angka efisiensi terukur pada banner metrik di halaman publik.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 pt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2.5">
                                    <label className="block text-xs font-bold text-[#2F8BFF]">
                                        1. Rata-rata Input RME Dokter
                                    </label>
                                    <Input
                                        value={settingsMap.kpi_rme_time || ''}
                                        onChange={(e) => handleChange('kpi_rme_time', e.target.value)}
                                        placeholder="2.4 mnt"
                                        className="font-mono text-sm font-bold"
                                    />
                                    <Input
                                        value={settingsMap.kpi_rme_time_note || ''}
                                        onChange={(e) => handleChange('kpi_rme_time_note', e.target.value)}
                                        placeholder="Turun 78% dari SIMRS lama"
                                        className="text-xs"
                                    />
                                </div>

                                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2.5">
                                    <label className="block text-xs font-bold text-[#FF8A2B]">
                                        2. Kepatuhan HL7 FHIR & SATUSEHAT
                                    </label>
                                    <Input
                                        value={settingsMap.kpi_fhir_sync || ''}
                                        onChange={(e) => handleChange('kpi_fhir_sync', e.target.value)}
                                        placeholder="100%"
                                        className="font-mono text-sm font-bold text-[#FF8A2B]"
                                    />
                                    <Input
                                        value={settingsMap.kpi_fhir_note || ''}
                                        onChange={(e) => handleChange('kpi_fhir_note', e.target.value)}
                                        placeholder="Zero Double Data-Entry"
                                        className="text-xs"
                                    />
                                </div>

                                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2.5">
                                    <label className="block text-xs font-bold text-[#2F8BFF]">
                                        3. SLA Go-Live Tercepat
                                    </label>
                                    <Input
                                        value={settingsMap.kpi_golive_speed || ''}
                                        onChange={(e) => handleChange('kpi_golive_speed', e.target.value)}
                                        placeholder="6-8 Mgg"
                                        className="font-mono text-sm font-bold"
                                    />
                                    <Input
                                        value={settingsMap.kpi_golive_note || ''}
                                        onChange={(e) => handleChange('kpi_golive_note', e.target.value)}
                                        placeholder="Pendampingan dokter on-site"
                                        className="text-xs"
                                    />
                                </div>

                                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2.5">
                                    <label className="block text-xs font-bold text-emerald-600">
                                        4. Tingkat Dispute Klaim BPJS
                                    </label>
                                    <Input
                                        value={settingsMap.kpi_bpjs_dispute || ''}
                                        onChange={(e) => handleChange('kpi_bpjs_dispute', e.target.value)}
                                        placeholder="< 0.3%"
                                        className="font-mono text-sm font-bold text-emerald-600"
                                    />
                                    <Input
                                        value={settingsMap.kpi_bpjs_note || ''}
                                        onChange={(e) => handleChange('kpi_bpjs_note', e.target.value)}
                                        placeholder="Pre-Validation INA-CBGs"
                                        className="text-xs"
                                    />
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-0 flex justify-end">
                            <Button onClick={handleSave} disabled={saving} className="gap-1.5 shadow-xs">
                                <Save className="h-4 w-4" />
                                <span>Simpan KPI Strip</span>
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
