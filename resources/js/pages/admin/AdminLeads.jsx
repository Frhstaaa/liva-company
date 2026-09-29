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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
    Inbox,
    Download,
    Search,
    Trash2,
    Calendar,
    Phone,
    Mail,
    Building,
    MessageSquare,
    ExternalLink,
    Filter,
} from 'lucide-react';

export default function AdminLeads() {
    const { showToast } = useSite();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [updating, setUpdating] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [adminNotes, setAdminNotes] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('baru');

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/demo-requests', {
                params: {
                    status: statusFilter,
                    search: search,
                },
            });
            if (res.data.status === 'success') {
                setLeads(res.data.data.data || []);
            }
        } catch (err) {
            showToast('Gagal memuat data pengajuan demo', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [statusFilter]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchLeads();
    };

    const openLeadModal = (lead) => {
        setSelectedLead(lead);
        setSelectedStatus(lead.status);
        setAdminNotes(lead.admin_notes || '');
        setModalOpen(true);
    };

    const handleSaveStatus = async () => {
        if (!selectedLead) return;
        setUpdating(true);

        try {
            const res = await axios.patch(`/api/admin/demo-requests/${selectedLead.id}/status`, {
                status: selectedStatus,
                admin_notes: adminNotes,
            });

            if (res.data.status === 'success') {
                showToast(res.data.message, 'success');
                setModalOpen(false);
                fetchLeads();
            }
        } catch (err) {
            showToast('Gagal memperbarui status pengajuan', 'error');
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Hapus data pengajuan demo dari "${name}"?`)) return;

        try {
            await axios.delete(`/api/admin/demo-requests/${id}`);
            showToast('Data pengajuan berhasil dihapus', 'success');
            fetchLeads();
        } catch (err) {
            showToast('Gagal menghapus data', 'error');
        }
    };

    const exportToCsv = () => {
        if (leads.length === 0) {
            showToast('Tidak ada data untuk diekspor', 'error');
            return;
        }

        const headers = ['ID', 'Nama RS', 'Tipe RS', 'Kapasitas Bed', 'Nama PIC', 'Jabatan', 'Email', 'WhatsApp', 'Status', 'Modul Diminati', 'Tanggal Dibuat'];
        const rows = leads.map((l) => [
            l.id,
            `"${l.hospital_name}"`,
            `"${l.hospital_type}"`,
            `"${l.bed_count || ''}"`,
            `"${l.pic_name}"`,
            `"${l.pic_role}"`,
            `"${l.email}"`,
            `"${l.phone_whatsapp}"`,
            `"${l.status}"`,
            `"${Array.isArray(l.modules_interested) ? l.modules_interested.join(', ') : ''}"`,
            `"${new Date(l.created_at).toLocaleDateString('id-ID')}"`,
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `leads_liva_simrs_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('File CSV berhasil diunduh', 'success');
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'baru':
                return <Badge variant="accent" className="text-[10px] uppercase">Baru Masuk</Badge>;
            case 'dihubungi':
                return <Badge variant="secondary" className="text-[10px] uppercase text-[#2F8BFF] bg-blue-50">Dihubungi</Badge>;
            case 'dijadwalkan':
                return <Badge variant="default" className="text-[10px] uppercase">Dijadwalkan</Badge>;
            case 'selesai':
                return <Badge variant="outline" className="text-[10px] uppercase text-emerald-700 bg-emerald-50 border-emerald-200">Selesai</Badge>;
            default:
                return <Badge variant="secondary" className="text-[10px] uppercase">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Top Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="text-[#FF8A2B] bg-orange-50/70 border-orange-200/80 font-mono text-[10.5px] px-2.5 py-0.5"
                        >
                            <Inbox className="h-3 w-3 mr-1 text-[#FF8A2B]" />
                            {leads.length} Permintaan Masuk
                        </Badge>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-xs font-mono text-slate-500">
                            Pipeline Penjualan & Demo Faskes
                        </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2937] font-display">
                        Permohonan Demo RS
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                        Pantau prospek RS/Klinik, tindak lanjuti via WhatsApp, atur status presentasi, dan catat meeting log.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                    <Button
                        variant="outline"
                        onClick={exportToCsv}
                        className="bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs gap-1.5 h-9 px-4 rounded-lg font-medium text-xs cursor-pointer"
                    >
                        <Download className="h-4 w-4 text-[#2F8BFF]" />
                        <span>Ekspor CSV</span>
                    </Button>
                </div>
            </div>

            {/* Main Table Card */}
            <Card className="border-slate-200/80 shadow-xs overflow-hidden bg-white">
                {/* Status Tabs & Search Toolbar */}
                <div className="p-4 sm:px-6 sm:py-3.5 border-b border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-lg w-full sm:w-auto overflow-x-auto border border-slate-200/60">
                        {[
                            { id: 'all', label: 'Semua Leads' },
                            { id: 'baru', label: 'Baru' },
                            { id: 'dihubungi', label: 'Dihubungi' },
                            { id: 'dijadwalkan', label: 'Dijadwalkan' },
                            { id: 'selesai', label: 'Selesai' },
                        ].map((st) => (
                            <button
                                key={st.id}
                                onClick={() => setStatusFilter(st.id)}
                                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                                    statusFilter === st.id
                                        ? 'bg-white text-[#1F2937] shadow-2xs'
                                        : 'text-slate-500 hover:text-[#1F2937]'
                                }`}
                            >
                                {st.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <Input
                            placeholder="Cari RS / PIC / WhatsApp..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-8 h-8 text-xs bg-white border-slate-200"
                        />
                    </form>
                </div>

                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 border-b border-slate-200/80">
                                <TableHead className="w-[220px] text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4 sm:px-6">
                                    Rumah Sakit
                                </TableHead>
                                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                                    PIC & Kontak Langsung
                                </TableHead>
                                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                                    Modul Diminati
                                </TableHead>
                                <TableHead className="w-[120px] text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                                    Status
                                </TableHead>
                                <TableHead className="w-[120px] text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                                    Tanggal Masuk
                                </TableHead>
                                <TableHead className="w-[90px] text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4 sm:px-6">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-40 text-center text-xs text-slate-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <span className="w-5 h-5 border-2 border-[#2F8BFF] border-t-transparent rounded-full animate-spin"></span>
                                            <span className="font-mono text-slate-400">Memuat data pengajuan demo...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : leads.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-40 text-center text-xs text-slate-500">
                                        <div className="flex flex-col items-center justify-center gap-1.5">
                                            <Inbox className="h-8 w-8 text-slate-300" />
                                            <span className="font-medium text-slate-600">Tidak ada permintaan demo yang cocok</span>
                                            <span className="text-slate-400 text-[11px]">Coba sesuaikan filter status atau kata kunci pencarian.</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                leads.map((lead) => (
                                    <TableRow
                                        key={lead.id}
                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                                    >
                                        <TableCell className="align-top py-4 px-4 sm:px-6">
                                            <div className="font-bold text-xs text-[#1F2937]">
                                                {lead.hospital_name}
                                            </div>
                                            <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                                                {lead.hospital_type} {lead.bed_count ? `• ${lead.bed_count} TT` : ''}
                                            </span>
                                        </TableCell>

                                        <TableCell className="align-top py-4 px-4">
                                            <div className="font-bold text-xs text-[#1F2937]">
                                                {lead.pic_name}
                                            </div>
                                            <div className="text-[11px] font-mono text-[#2F8BFF] flex items-center gap-1 mt-0.5">
                                                <a
                                                    href={`https://wa.me/${lead.phone_whatsapp?.replace(/[^0-9]/g, '')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline flex items-center gap-0.5 font-medium"
                                                >
                                                    <span>{lead.phone_whatsapp}</span>
                                                    <ExternalLink className="h-2.5 w-2.5" />
                                                </a>
                                            </div>
                                            <span className="text-[10px] font-mono text-slate-400 block">{lead.email}</span>
                                        </TableCell>

                                        <TableCell className="align-top py-4 px-4 max-w-xs">
                                            {lead.modules_interested && lead.modules_interested.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {lead.modules_interested.slice(0, 2).map((m, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/60"
                                                        >
                                                            {m}
                                                        </span>
                                                    ))}
                                                    {lead.modules_interested.length > 2 && (
                                                        <span className="text-[9.5px] font-mono text-[#2F8BFF] font-bold self-center">
                                                            +{lead.modules_interested.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-slate-400 text-xs italic">Semua Modul SIMRS</span>
                                            )}
                                        </TableCell>

                                        <TableCell className="text-center align-top py-4 px-4">
                                            {getStatusBadge(lead.status)}
                                        </TableCell>

                                        <TableCell className="align-top py-4 px-4 text-xs text-slate-500 font-mono">
                                            {new Date(lead.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </TableCell>

                                        <TableCell className="text-right align-top py-4 px-4 sm:px-6">
                                            <div className="inline-flex items-center gap-1">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="h-8 px-2.5 text-xs font-semibold text-[#2F8BFF] bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/60 rounded-lg cursor-pointer"
                                                    onClick={() => openLeadModal(lead)}
                                                >
                                                    Kelola
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                                    onClick={() => handleDelete(lead.id, lead.hospital_name)}
                                                    title="Hapus Lead"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Dialog Detail & Follow Up */}
            {selectedLead && (
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogContent className="max-w-xl">
                        <DialogHeader>
                            <DialogTitle>Detail Pengajuan Demo RS</DialogTitle>
                            <DialogDescription>
                                {selectedLead.hospital_name} — {selectedLead.hospital_type}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 pt-2">
                            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                                <div>
                                    <span className="text-slate-400 block text-[10px]">Tipe Rumah Sakit</span>
                                    <span className="font-semibold text-[#1F2937]">{selectedLead.hospital_type}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block text-[10px]">Kapasitas Tempat Tidur</span>
                                    <span className="font-semibold text-[#1F2937]">{selectedLead.bed_count || '—'} TT</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block text-[10px]">Nama PIC</span>
                                    <span className="font-semibold text-[#1F2937]">{selectedLead.pic_name} ({selectedLead.pic_role})</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block text-[10px]">WhatsApp</span>
                                    <a
                                        href={`https://wa.me/${selectedLead.phone_whatsapp?.replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold text-[#2F8BFF] hover:underline flex items-center gap-1"
                                    >
                                        <span>{selectedLead.phone_whatsapp}</span>
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </div>

                            {selectedLead.notes && (
                                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                                    <span className="text-[10px] font-bold text-slate-500 block mb-1">Catatan Kebutuhan:</span>
                                    <p className="text-[#1F2937] leading-relaxed">{selectedLead.notes}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Status Prospek & Demo
                                </label>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-[#1F2937] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2F8BFF]"
                                >
                                    <option value="baru">Baru Masuk (Belum Dihubungi)</option>
                                    <option value="dihubungi">Sedang Dihubungi via WhatsApp/Telp</option>
                                    <option value="dijadwalkan">Jadwal Demo Zoom / On-site Dikonfirmasi</option>
                                    <option value="selesai">Selesai Demo & Presentasi</option>
                                    <option value="batal">Dibatalkan / Tidak Relevan</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Catatan Internal Administrator
                                </label>
                                <Textarea
                                    rows={3}
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder="Contoh: Sudah dihubungi dr. Bambang, jadwal demo Zoom disepakati Kamis jam 10:00 WIB..."
                                    className="text-xs"
                                />
                            </div>

                            <DialogFooter className="pt-3 border-t border-slate-100">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Tutup
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleSaveStatus}
                                    disabled={updating}
                                >
                                    {updating ? 'Menyimpan...' : 'Simpan Status & Log'}
                                </Button>
                            </DialogFooter>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
