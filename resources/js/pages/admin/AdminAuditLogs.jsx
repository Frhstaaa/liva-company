import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSite } from '../../context/SiteContext';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { History, Search, Activity, ShieldCheck, UserCheck } from 'lucide-react';

export default function AdminAuditLogs() {
    const { showToast } = useSite();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchAction, setSearchAction] = useState('');

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/audit-logs', {
                params: { action: searchAction },
            });
            if (res.data.status === 'success') {
                setLogs(res.data.data.data || []);
            }
        } catch (err) {
            showToast('Gagal memuat log audit', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchLogs();
    };

    const getActionBadge = (action) => {
        const act = action.toLowerCase();
        if (act.includes('failed') || act.includes('delete')) {
            return <Badge variant="destructive" className="text-[9px] uppercase font-mono">{action}</Badge>;
        }
        if (act.includes('login') || act.includes('auth')) {
            return <Badge variant="default" className="text-[9px] uppercase font-mono">{action}</Badge>;
        }
        if (act.includes('update') || act.includes('create')) {
            return <Badge variant="outline" className="text-[9px] uppercase font-mono text-emerald-700 bg-emerald-50 border-emerald-200">{action}</Badge>;
        }
        return <Badge variant="secondary" className="text-[9px] uppercase font-mono">{action}</Badge>;
    };

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
                            <History className="h-3 w-3 mr-1 text-[#2F8BFF]" />
                            {logs.length} Jejak Rekam Terpantau
                        </Badge>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-xs font-mono text-slate-500">
                            ISO 27001 Audit Trail
                        </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2937] font-display">
                        Log Audit Keamanan & Sistem
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                        Rekam jejak seluruh aktivitas administrasi, update konten CMS, decrypting vault, dan autentikasi admin.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="relative w-full sm:w-72 shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <Input
                        placeholder="Cari aksi (login, update)..."
                        value={searchAction}
                        onChange={(e) => setSearchAction(e.target.value)}
                        className="pl-8 h-9 text-xs bg-white border-slate-200"
                    />
                </form>
            </div>

            {/* Main Table Card */}
            <Card className="border-slate-200/80 shadow-xs overflow-hidden bg-white">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 border-b border-slate-200/80">
                                <TableHead className="w-44 text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4 sm:px-6">
                                    Waktu Kejadian
                                </TableHead>
                                <TableHead className="w-48 text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                                    Aksi / Event
                                </TableHead>
                                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                                    Rincian Aktivitas
                                </TableHead>
                                <TableHead className="w-36 text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                                    Pengguna
                                </TableHead>
                                <TableHead className="w-32 text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4 sm:px-6">
                                    Alamat IP
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-40 text-center text-xs text-slate-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <span className="w-5 h-5 border-2 border-[#2F8BFF] border-t-transparent rounded-full animate-spin"></span>
                                            <span className="font-mono text-slate-400">Memuat jejak audit...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : logs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-40 text-center text-xs text-slate-500">
                                        <div className="flex flex-col items-center justify-center gap-1.5">
                                            <History className="h-8 w-8 text-slate-300" />
                                            <span className="font-medium text-slate-600">Belum ada riwayat audit log yang cocok</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                logs.map((log) => (
                                    <TableRow key={log.id} className="hover:bg-slate-50/50 text-xs">
                                        <TableCell className="font-mono text-slate-500 whitespace-nowrap text-[11px]">
                                            {new Date(log.created_at).toLocaleString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                            })}
                                        </TableCell>

                                        <TableCell>
                                            {getActionBadge(log.action)}
                                        </TableCell>

                                        <TableCell className="text-[#1F2937] max-w-md leading-relaxed text-xs">
                                            {log.details || '—'}
                                        </TableCell>

                                        <TableCell className="font-semibold text-xs text-[#1F2937]">
                                            {log.user_name || 'System Auto'}
                                        </TableCell>

                                        <TableCell className="text-right font-mono text-[11px] text-slate-400">
                                            {log.ip_address || '127.0.0.1'}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
