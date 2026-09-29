import React, { useState, useEffect } from 'react';
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
    Layers,
    Inbox,
    ShieldCheck,
    History,
    Activity,
    Sliders,
    Eye,
    CheckCircle2,
    Calendar,
    ArrowUpRight,
    Lock,
    Sparkles,
    Database,
} from 'lucide-react';

export default function AdminDashboard({ onSelectTab, onNavigatePublic }) {
    const { showToast } = useSite();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/dashboard-stats');
            if (res.data.status === 'success') {
                setStats(res.data.data);
            }
        } catch (err) {
            showToast('Gagal memuat telemetry dashboard', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="flex flex-col items-center gap-2.5">
                    <span className="w-7 h-7 border-3 border-[#2F8BFF] border-t-transparent rounded-full animate-spin"></span>
                    <span className="text-xs text-slate-500 font-mono">Mengotentikasi Telemetry CMS...</span>
                </div>
            </div>
        );
    }

    const counts = stats?.counts || {};
    const recentLeads = stats?.recent_leads || [];
    const recentAudits = stats?.recent_audits || [];
    const system = stats?.system_status || {};

    return (
        <div className="space-y-6">
            {/* Top Executive Banner */}
            <div className="bg-[#1F2937] text-white p-5 sm:p-6 rounded-xl border border-slate-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden bg-clinical-dark-grid">
                <div className="space-y-1.5 relative z-10 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-[#5BC0FF] text-[11px] font-mono border border-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>SISTEM CMS DINAMIS AKTIF &amp; TERENKRIPSI</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
                        Executive Control Dashboard
                    </h1>
                    <p className="text-xs text-slate-300 leading-relaxed">
                        Kelola seluruh data publik (modul, 6 pilar, tabel komparasi KLAS, studi kasus faskes, serta teks hero) secara real-time.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 relative z-10">
                    <Button
                        onClick={() => onSelectTab('settings-cms')}
                        variant="default"
                        size="sm"
                        className="h-8 gap-1.5"
                    >
                        <Sliders className="h-3.5 w-3.5" />
                        <span>Atur Konten Beranda</span>
                    </Button>
                    <Button
                        onClick={() => onNavigatePublic('beranda')}
                        variant="outline"
                        size="sm"
                        className="h-8 bg-slate-800 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700 gap-1.5"
                    >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Lihat Publik</span>
                    </Button>
                </div>
            </div>

            {/* Metric KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <Card className="hover:border-[#2F8BFF]/40 transition-colors">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b-0">
                        <span className="text-xs font-semibold text-slate-600">Total Modul SIMRS</span>
                        <div className="w-7 h-7 rounded-md bg-blue-50 text-[#2F8BFF] flex items-center justify-center">
                            <Layers className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-1">
                        <div className="text-2xl font-bold font-display text-[#1F2937]">
                            {counts.total_modules || 0}
                        </div>
                        <Badge variant="blueLight" className="text-[10px] font-mono">
                            {counts.active_modules || 0} Modul Aktif di Publik
                        </Badge>
                    </CardContent>
                </Card>

                <Card className="hover:border-[#FF8A2B]/40 transition-colors">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b-0">
                        <span className="text-xs font-semibold text-slate-600">Permohonan Demo Baru</span>
                        <div className="w-7 h-7 rounded-md bg-orange-50 text-[#FF8A2B] flex items-center justify-center">
                            <Inbox className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-1">
                        <div className="text-2xl font-bold font-display text-[#FF8A2B]">
                            {counts.new_leads || 0}
                        </div>
                        <Badge variant="orangeLight" className="text-[10px] font-mono">
                            {counts.total_leads || 0} Total Permohonan RS
                        </Badge>
                    </CardContent>
                </Card>

                <Card className="hover:border-emerald-500/40 transition-colors">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b-0">
                        <span className="text-xs font-semibold text-slate-600">Pilar &amp; Studi Kasus</span>
                        <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <ShieldCheck className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-1">
                        <div className="text-2xl font-bold font-display text-[#1F2937]">
                            {counts.total_pillars || 0} <span className="text-xs text-slate-500 font-normal">/ {counts.total_case_studies || 0} RS</span>
                        </div>
                        <Badge variant="emeraldLight" className="text-[10px] font-mono">
                            {counts.total_comparisons || 0} Dimensi KLAS
                        </Badge>
                    </CardContent>
                </Card>

                <Card className="hover:border-slate-400 transition-colors">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b-0">
                        <span className="text-xs font-semibold text-slate-600">Status Keamanan DB</span>
                        <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center">
                            <Lock className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-1">
                        <div className="text-base font-bold font-mono text-emerald-600 flex items-center gap-1.5 pt-1">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>ENCRYPTED</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 block">
                            AES-256 Master PIN Enforced
                        </span>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Grid: Recent Leads & Security Audit Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Recent Leads */}
                <div className="lg:col-span-7">
                    <Card>
                        <CardHeader className="p-4 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                                    <Inbox className="h-4 w-4 text-[#2F8BFF]" />
                                    <span>Permohonan Live Demo Terkini</span>
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Rumah sakit dan faskes yang baru mengajukan konsultasi teknis.
                                </CardDescription>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onSelectTab('leads')}
                                className="h-7 text-xs font-semibold"
                            >
                                <span>Lihat Semua</span>
                                <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            {recentLeads.length === 0 ? (
                                <div className="text-center py-8 text-xs text-slate-500">
                                    Belum ada permohonan demo baru masuk.
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Rumah Sakit</TableHead>
                                            <TableHead>PIC / Kontak</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentLeads.slice(0, 5).map((lead) => (
                                            <TableRow key={lead.id}>
                                                <TableCell className="font-semibold text-xs">
                                                    <div>{lead.hospital_name}</div>
                                                    <span className="text-[10px] font-mono text-slate-500 font-normal">
                                                        {lead.hospital_type} • {lead.bed_count}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-xs">
                                                    <div>{lead.pic_name}</div>
                                                    <span className="text-[10px] text-slate-500 font-mono">
                                                        {lead.phone_whatsapp}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={lead.status === 'Baru' ? 'orangeLight' : lead.status === 'Selesai' ? 'emeraldLight' : 'blueLight'}
                                                        className="text-[9.5px]"
                                                    >
                                                        {lead.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Security & Audit Stream */}
                <div className="lg:col-span-5">
                    <Card>
                        <CardHeader className="p-4 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                                    <History className="h-4 w-4 text-[#FF8A2B]" />
                                    <span>Audit Log &amp; Telemetri Keamanan</span>
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Rekaman mutasi data terenkripsi dan aktivitas admin.
                                </CardDescription>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onSelectTab('audit-logs')}
                                className="h-7 text-xs font-semibold"
                            >
                                <span>Audit Lengkap</span>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-4 pt-2 space-y-3">
                            {recentAudits.length === 0 ? (
                                <div className="text-center py-8 text-xs text-slate-500 font-mono">
                                    Log aktivitas sistem aman.
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {recentAudits.slice(0, 4).map((audit) => (
                                        <div
                                            key={audit.id}
                                            className="p-2.5 rounded-lg border border-slate-100 bg-[#F8FAFC] text-xs space-y-0.5 font-mono"
                                        >
                                            <div className="flex items-center justify-between font-bold text-[#1F2937]">
                                                <span className="text-[#2F8BFF] text-[11px]">{audit.action}</span>
                                                <span className="text-[9.5px] text-slate-400">
                                                    {new Date(audit.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <p className="text-[10.5px] text-slate-600 truncate font-sans">
                                                {audit.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Server & DB Status Box */}
                            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] font-mono text-slate-600">
                                <div className="flex items-center justify-between">
                                    <span>DATABASE STATUS:</span>
                                    <span className="text-emerald-600 font-bold">SQLITE WAL ACTIVE</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>SECURITY ENCRYPTION:</span>
                                    <span className="text-[#2F8BFF] font-bold">AES-256 MASTER LOCK</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
