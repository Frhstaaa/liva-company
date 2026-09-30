import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSite } from '../../context/SiteContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Globe,
    Layers,
    ShieldCheck,
    Award,
    Users,
    Calendar,
    Palette,
    ArrowRight,
    ExternalLink,
    Inbox,
    MessageSquare,
    CheckCircle2,
    Clock,
    Phone,
    Sliders,
    Sparkles,
    Eye,
    RefreshCw,
    Building2,
    Activity,
    Check,
    Edit3
} from 'lucide-react';

export default function AdminDashboard({ onSelectTab, onNavigatePublic, onOpenPageEditor }) {
    const { showToast, getSetting } = useSite();

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatingLeadId, setUpdatingLeadId] = useState(null);

    // Load initial dashboard telemetry & counts
    const fetchDashboardData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/dashboard-stats');
            if (res.data.status === 'success') {
                setStats(res.data.data);
            }
        } catch (err) {
            console.error('Failed to load dashboard stats:', err);
            showToast('Gagal memuat data statistik dashboard', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    // Update lead status
    const handleUpdateLeadStatus = async (leadId, newStatus) => {
        try {
            setUpdatingLeadId(leadId);
            const res = await axios.patch(`/api/admin/demo-requests/${leadId}/status`, {
                status: newStatus.toLowerCase()
            });
            if (res.data.status === 'success') {
                showToast(`Status prospek rumah sakit berhasil diubah ke: ${newStatus}`, 'success');
                // Refresh dashboard stats
                const statsRes = await axios.get('/api/admin/dashboard-stats');
                if (statsRes.data.status === 'success') {
                    setStats(statsRes.data.data);
                }
            }
        } catch (err) {
            showToast('Gagal memperbarui status prospek', 'error');
        } finally {
            setUpdatingLeadId(null);
        }
    };

    const counts = stats?.counts || {};
    const recentLeads = stats?.recent_leads || [];

    // The 6 Public Pages with visual metadata
    const publicPages = [
        {
            id: 'beranda',
            name: 'Halaman Beranda (Home)',
            route: '/',
            icon: Globe,
            badge: 'Halaman Utama',
            badgeClass: 'bg-blue-50 text-[#1B84FF] border-blue-200',
            desc: 'Pusat landing page utama faskes, visual hero, simulasi live cockpit SIMRS, PACS radiologi, dan FAQ akreditasi.',
            sectionsCount: 10,
            colorAccent: 'border-l-4 border-l-[#1B84FF]',
            bgGlow: 'hover:border-[#1B84FF]/40',
        },
        {
            id: 'modul-simrs',
            name: 'Katalog 36 Modul SIMRS',
            route: '/modul-simrs',
            icon: Layers,
            badge: 'Katalog Klinis',
            badgeClass: 'bg-emerald-50 text-emerald-600 border-emerald-200',
            desc: 'Daftar interaktif modul klinis terpadu IGD, Rawat Jalan, Casemix BPJS, Farmasi, Laboratorium LIS, dan RME Paripurna.',
            sectionsCount: 4,
            colorAccent: 'border-l-4 border-l-emerald-500',
            bgGlow: 'hover:border-emerald-500/40',
        },
        {
            id: 'keunggulan',
            name: 'Keunggulan & Standar KLAS',
            route: '/keunggulan',
            icon: ShieldCheck,
            badge: 'Diferensiasi',
            badgeClass: 'bg-indigo-50 text-indigo-600 border-indigo-200',
            desc: 'Arsitektur misi-kritis cloud native, SLA uptime 99.98%, 6 pilar fondasi sistem, dan tabel komparasi vendor KLAS.',
            sectionsCount: 4,
            colorAccent: 'border-l-4 border-l-indigo-500',
            bgGlow: 'hover:border-indigo-500/40',
        },
        {
            id: 'studi-kasus',
            name: 'Studi Kasus & Kalkulator ROI',
            route: '/studi-kasus',
            icon: Award,
            badge: 'Evidensi Mitra',
            badgeClass: 'bg-amber-50 text-amber-600 border-amber-200',
            desc: 'Kisah nyata efisiensi RSUD & swasta, testimoni direktur faskes, dan kalkulator simulasi penghematan operasional bed.',
            sectionsCount: 4,
            colorAccent: 'border-l-4 border-l-amber-500',
            bgGlow: 'hover:border-amber-500/40',
        },
        {
            id: 'tentang-kami',
            name: 'Tentang Kami & Profil RS',
            route: '/tentang-kami',
            icon: Users,
            badge: 'Profil Perusahaan',
            badgeClass: 'bg-violet-50 text-violet-600 border-violet-200',
            desc: 'Naratif visi transformasi digital kesehatan Indonesia, counter 40+ faskes mitra, core values, dan profil tim direksi.',
            sectionsCount: 6,
            colorAccent: 'border-l-4 border-l-violet-500',
            bgGlow: 'hover:border-violet-500/40',
        },
        {
            id: 'jadwalkan-demo',
            name: 'Jadwalkan Live Demo RS',
            route: '/jadwalkan-demo',
            icon: Calendar,
            badge: 'Konversi Prospek',
            badgeClass: 'bg-rose-50 text-rose-600 border-rose-200',
            desc: 'Formulir reservasi demonstrasi sistem klinis, komitmen NDA kerahasiaan data medis, dan self-assessment kesiapan faskes.',
            sectionsCount: 4,
            colorAccent: 'border-l-4 border-l-rose-500',
            bgGlow: 'hover:border-rose-500/40',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center p-24">
                <div className="flex flex-col items-center gap-3">
                    <span className="w-8 h-8 border-3 border-[#1B84FF] border-t-transparent rounded-full animate-spin"></span>
                    <span className="text-xs text-[#78829D] font-mono tracking-wide">
                        Memuat Pusat Kendali Halaman Liva SIMRS...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-7">
            {/* ========================================================================= */}
            {/* 1. HERO COMMAND BANNER                                                    */}
            {/* ========================================================================= */}
            <div className="bg-gradient-to-r from-[#1E1E2D] via-[#2A2B3D] to-[#1E1E2D] text-white p-6 sm:p-7 rounded-3xl border border-slate-700/60 shadow-md relative overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                        background: 'radial-gradient(ellipse 60% 50% at 75% 0%, rgba(27,132,255,0.2) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 100%, rgba(16,185,129,0.15) 0%, transparent 70%)'
                    }}
                />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-semibold border border-emerald-500/30">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>SISTEM CMS VISUAL TERPADU • 6 HALAMAN AKTIF</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                            Pusat Kendali &amp; Pengelola Semua Halaman Website
                        </h1>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                            Atur tata letak konten di tiap halamannya tanpa terkecuali, ubah isi teks dan gambar secara instan (auto-WebP), serta sesuaikan desain visual halaman secara mandiri langsung dari panel ini.
                        </p>
                    </div>

                    {/* Quick Global Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                        <Button
                            onClick={() => (onOpenPageEditor ? onOpenPageEditor('beranda') : onSelectTab('layout-builder'))}
                            size="lg"
                            className="h-11 px-6 bg-[#1B84FF] hover:bg-[#1670DB] text-white gap-2 font-bold text-xs sm:text-sm cursor-pointer shadow-lg shadow-blue-500/25 rounded-xl btn-spring"
                        >
                            <Palette className="h-4 w-4" />
                            <span>Buka Editor Visual Halaman</span>
                        </Button>

                        <Button
                            onClick={() => onNavigatePublic('beranda')}
                            variant="outline"
                            size="lg"
                            className="h-11 px-5 bg-white/10 hover:bg-white/20 border-white/20 text-white gap-2 font-semibold text-xs sm:text-sm cursor-pointer rounded-xl"
                        >
                            <Eye className="h-4 w-4" />
                            <span>Lihat Website Asli</span>
                            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* 2. PILIH HALAMAN UNTUK DIUBAH (6 HALAMAN UTAMA)                            */}
            {/* ========================================================================= */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFF2F5] pb-3">
                    <div>
                        <h2 className="text-lg font-bold text-[#181C32] font-display flex items-center gap-2">
                            <Sliders className="h-5 w-5 text-[#1B84FF]" />
                            <span>Pilih Halaman yang Ingin Diubah (Semua 6 Halaman Publik)</span>
                        </h2>
                        <p className="text-xs text-[#78829D] mt-0.5">
                            Klik tombol <strong>"Edit Halaman Ini"</strong> untuk membuka editor visual lengkap (susunan seksi, teks, gambar, dan desain mandiri).
                        </p>
                    </div>

                    <Button
                        onClick={() => (onOpenPageEditor ? onOpenPageEditor('beranda') : onSelectTab('layout-builder'))}
                        variant="ghost"
                        size="sm"
                        className="text-xs text-[#1B84FF] hover:bg-blue-50 font-semibold gap-1 self-start sm:self-auto cursor-pointer"
                    >
                        <span>Buka Studio Semua Halaman</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {publicPages.map((page) => {
                        const Icon = page.icon;
                        const themeSetting = getSetting(`page_${page.id}_theme`, 'clinical-blue');
                        const themeLabel = {
                            'clinical-blue': 'Klinis Biru (Default)',
                            'pure-white': 'Minimalis Putih',
                            'dark-slate': 'Dark Slate',
                            'emerald-health': 'Kemenkes Zamrud',
                            'indigo-luxury': 'Royal Indigo',
                        }[themeSetting] || 'Klinis Biru';

                        return (
                            <Card
                                key={page.id}
                                className={`border-[#EFF2F5] shadow-xs hover:shadow-md transition-all ${page.colorAccent} ${page.bgGlow} bg-white rounded-2xl flex flex-col justify-between`}
                            >
                                <CardHeader className="p-5 pb-3 space-y-2.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-[#F5F8FA] border border-[#EFF2F5] flex items-center justify-center text-[#181C32]">
                                            <Icon className="h-5 w-5 text-[#1B84FF]" />
                                        </div>
                                        <Badge variant="outline" className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg border ${page.badgeClass}`}>
                                            {page.badge}
                                        </Badge>
                                    </div>

                                    <div>
                                        <CardTitle className="text-base font-bold text-[#181C32] font-display hover:text-[#1B84FF] transition-colors">
                                            {page.name}
                                        </CardTitle>
                                        <CardDescription className="text-xs text-[#78829D] mt-1 line-clamp-2 leading-relaxed">
                                            {page.desc}
                                        </CardDescription>
                                    </div>

                                    {/* Section count & theme indicators */}
                                    <div className="pt-2 flex items-center justify-between text-[11px] text-[#78829D] border-t border-[#EFF2F5]">
                                        <span className="flex items-center gap-1 font-medium">
                                            <Layers className="h-3 w-3 text-slate-400" />
                                            {page.sectionsCount} Seksi Konten
                                        </span>
                                        <span className="font-mono text-[#181C32] font-semibold bg-[#F5F8FA] px-2 py-0.5 rounded-md text-[10px]">
                                            {themeLabel}
                                        </span>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-5 pt-0 mt-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            onClick={() => (onOpenPageEditor ? onOpenPageEditor(page.id) : onSelectTab('layout-builder'))}
                                            className="w-full bg-[#1B84FF] hover:bg-[#1670DB] text-white font-bold text-xs h-9 rounded-xl gap-1.5 cursor-pointer shadow-xs"
                                        >
                                            <Edit3 className="h-3.5 w-3.5" />
                                            <span>Edit Halaman</span>
                                        </Button>

                                        <Button
                                            onClick={() => onNavigatePublic(page.id)}
                                            variant="outline"
                                            className="w-full border-[#EFF2F5] hover:bg-[#F5F8FA] text-[#4B5675] hover:text-[#181C32] font-semibold text-xs h-9 rounded-xl gap-1 cursor-pointer"
                                        >
                                            <Eye className="h-3.5 w-3.5 text-slate-400" />
                                            <span>Lihat Web</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* ========================================================================= */}
            {/* 3. BUSINESS TELEMETRY & STATS                                             */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Stat 1: Demo Requests */}
                <Card className="border-[#EFF2F5] shadow-xs bg-white rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between text-[#78829D]">
                        <span className="text-xs font-semibold uppercase tracking-wider font-mono">Permohonan Demo RS</span>
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1B84FF] flex items-center justify-center">
                            <Inbox className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <span className="text-2xl sm:text-3xl font-black text-[#181C32] font-display">
                            {counts.demo_requests || 0}
                        </span>
                        <Badge className="bg-[#E8FFF3] text-[#50CD89] border-0 text-[10px] font-mono">
                            Prospek Baru
                        </Badge>
                    </div>
                    <p className="text-[11px] text-[#78829D]">
                        Direksi &amp; manajemen RS yang mengajukan demonstrasi.
                    </p>
                </Card>

                {/* Stat 2: Total Modules */}
                <Card className="border-[#EFF2F5] shadow-xs bg-white rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between text-[#78829D]">
                        <span className="text-xs font-semibold uppercase tracking-wider font-mono">Modul Klinis Aktif</span>
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <Layers className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <span className="text-2xl sm:text-3xl font-black text-[#181C32] font-display">
                            {counts.modules || 36}
                        </span>
                        <Badge className="bg-[#E8FFF3] text-[#50CD89] border-0 text-[10px] font-mono">
                            Siap Pakai
                        </Badge>
                    </div>
                    <p className="text-[11px] text-[#78829D]">
                        IGD, Rawat Jalan, Casemix, Radiologi, Farmasi, &amp; RME.
                    </p>
                </Card>

                {/* Stat 3: Faskes Mitra */}
                <Card className="border-[#EFF2F5] shadow-xs bg-white rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between text-[#78829D]">
                        <span className="text-xs font-semibold uppercase tracking-wider font-mono">Mitra Faskes Nasional</span>
                        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                            <Building2 className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <span className="text-2xl sm:text-3xl font-black text-[#181C32] font-display">
                            40+
                        </span>
                        <Badge className="bg-amber-50 text-amber-700 border-0 text-[10px] font-mono">
                            Nasional
                        </Badge>
                    </div>
                    <p className="text-[11px] text-[#78829D]">
                        Tersebar di RSUD, RS Swasta, RSIA, dan Klinik K3.
                    </p>
                </Card>

                {/* Stat 4: SATUSEHAT & BPJS SLA */}
                <Card className="border-[#EFF2F5] shadow-xs bg-white rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between text-[#78829D]">
                        <span className="text-xs font-semibold uppercase tracking-wider font-mono">Kepatuhan Regulasi</span>
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <ShieldCheck className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <span className="text-2xl sm:text-3xl font-black text-[#181C32] font-display">
                            100%
                        </span>
                        <Badge className="bg-emerald-50 text-emerald-700 border-0 text-[10px] font-mono">
                            FHIR R4 &amp; VClaim
                        </Badge>
                    </div>
                    <p className="text-[11px] text-[#78829D]">
                        SLA Uptime 99.98% Cloud Domestik Tier 3/4.
                    </p>
                </Card>
            </div>

            {/* ========================================================================= */}
            {/* 4. LEADS TABLE (PERMOHONAN DEMO TERBARU)                                  */}
            {/* ========================================================================= */}
            <Card className="border-[#EFF2F5] shadow-xs bg-white rounded-2xl">
                <CardHeader className="p-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFF2F5]">
                    <div>
                        <CardTitle className="text-base font-bold text-[#181C32] font-display flex items-center gap-2">
                            <Inbox className="h-4 w-4 text-[#1B84FF]" />
                            <span>Permohonan Demo RS Masuk (Prospek Faskes Terbaru)</span>
                        </CardTitle>
                        <CardDescription className="text-xs text-[#78829D]">
                            Daftar pimpinan dan komite medis rumah sakit yang meminta demonstrasi sistem Liva SIMRS.
                        </CardDescription>
                    </div>

                    <Button
                        onClick={() => onSelectTab('leads')}
                        variant="outline"
                        size="sm"
                        className="text-xs font-semibold text-[#1B84FF] border-blue-200 hover:bg-blue-50 cursor-pointer self-start sm:self-auto"
                    >
                        <span>Kelola Semua Prospek ({counts.demo_requests || 0})</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                </CardHeader>

                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-[#F9F9F9]">
                            <TableRow className="border-[#EFF2F5]">
                                <TableHead className="text-[11px] font-bold text-[#78829D] uppercase tracking-wider py-3.5 pl-6 font-mono">
                                    Rumah Sakit / Faskes
                                </TableHead>
                                <TableHead className="text-[11px] font-bold text-[#78829D] uppercase tracking-wider py-3.5 font-mono">
                                    PIC &amp; Kontak
                                </TableHead>
                                <TableHead className="text-[11px] font-bold text-[#78829D] uppercase tracking-wider py-3.5 font-mono">
                                    Kapasitas Bed
                                </TableHead>
                                <TableHead className="text-[11px] font-bold text-[#78829D] uppercase tracking-wider py-3.5 font-mono">
                                    Status Prospek
                                </TableHead>
                                <TableHead className="text-[11px] font-bold text-[#78829D] uppercase tracking-wider py-3.5 pr-6 text-right font-mono">
                                    Tindakan Cepat
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentLeads.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-xs text-[#78829D]">
                                        Belum ada permohonan demo baru yang masuk saat ini.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                recentLeads.map((lead) => {
                                    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                                    const waNumber = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
                                    const waMsg = encodeURIComponent(
                                        `Halo Bapak/Ibu ${lead.pic_name}, salam dari Liva SIMRS. Kami telah menerima permohonan demo sistem untuk ${lead.hospital_name}. Kapan waktu yang tepat bagi kami untuk mendemonstrasikan sistem? Terima kasih.`
                                    );
                                    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;

                                    return (
                                        <TableRow key={lead.id} className="border-[#EFF2F5] hover:bg-[#F5F8FA]">
                                            <TableCell className="py-4 pl-6">
                                                <div className="font-bold text-xs text-[#181C32]">{lead.hospital_name}</div>
                                                <div className="text-[11px] text-[#78829D] capitalize">{lead.hospital_type || 'Rumah Sakit'}</div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="text-xs font-semibold text-[#181C32]">{lead.pic_name}</div>
                                                <div className="text-[11px] text-[#78829D] flex items-center gap-1 font-mono">
                                                    <Phone className="h-3 w-3 text-slate-400" />
                                                    {lead.phone}
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <span className="text-xs font-mono font-bold text-[#181C32] bg-[#F5F8FA] px-2 py-1 rounded-md border border-[#EFF2F5]">
                                                    {lead.bed_count || '-'} Bed
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <select
                                                    value={lead.status || 'pending'}
                                                    disabled={updatingLeadId === lead.id}
                                                    onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                                                    className="text-xs rounded-lg border border-[#EFF2F5] bg-white py-1 px-2 font-medium text-[#181C32] focus:ring-1 focus:ring-[#1B84FF] cursor-pointer"
                                                >
                                                    <option value="pending">⏳ Menunggu Respon</option>
                                                    <option value="contacted">📞 Sudah Dihubungi</option>
                                                    <option value="scheduled">📅 Demo Terjadwal</option>
                                                    <option value="completed">✅ Selesai</option>
                                                    <option value="cancelled">❌ Batal</option>
                                                </select>
                                            </TableCell>
                                            <TableCell className="py-4 pr-6 text-right">
                                                {cleanPhone ? (
                                                    <a
                                                        href={waUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E8FFF3] hover:bg-[#D1F7E2] text-[#50CD89] hover:text-[#38A56E] border border-[#B1F8D0] rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                                                    >
                                                        <MessageSquare className="h-3.5 w-3.5" />
                                                        <span>Chat WA</span>
                                                    </a>
                                                ) : (
                                                    <span className="text-xs text-[#78829D]">-</span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
