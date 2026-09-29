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
    Layers,
    Plus,
    Pencil,
    Trash2,
    CheckCircle2,
    XCircle,
    Search,
    Sparkles,
    SlidersHorizontal,
    Tag,
    Activity,
    Check,
} from 'lucide-react';

export default function AdminModules() {
    const { refetchSiteData, showToast } = useSite();

    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
    const [saving, setSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const [formData, setFormData] = useState({
        module_code: '',
        title: '',
        category: 'front-office',
        category_label: 'Front Office',
        icon: 'grid_view',
        short_description: '',
        full_description: '',
        highlight_metric: '',
        features_text: '',
        compliance_tags_text: '',
        order_index: 0,
        is_active: true,
        is_featured: false,
    });

    const fetchModules = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/modules');
            if (res.data.status === 'success') {
                setModules(res.data.data);
            }
        } catch (err) {
            showToast('Gagal memuat daftar modul', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModules();
    }, []);

    const openCreateModal = () => {
        setEditingModule(null);
        setFormData({
            module_code: `MODUL-${String(modules.length + 1).padStart(2, '0')}`,
            title: '',
            category: 'front-office',
            category_label: 'Front Office',
            icon: 'grid_view',
            short_description: '',
            full_description: '',
            highlight_metric: '',
            features_text: '',
            compliance_tags_text: '',
            order_index: modules.length + 1,
            is_active: true,
            is_featured: false,
        });
        setModalOpen(true);
    };

    const openEditModal = (mod) => {
        setEditingModule(mod);
        setFormData({
            module_code: mod.module_code || '',
            title: mod.title || '',
            category: mod.category || 'front-office',
            category_label: mod.category_label || '',
            icon: mod.icon || 'grid_view',
            short_description: mod.short_description || '',
            full_description: mod.full_description || '',
            highlight_metric: mod.highlight_metric || '',
            features_text: Array.isArray(mod.features) ? mod.features.join('\n') : '',
            compliance_tags_text: Array.isArray(mod.compliance_tags) ? mod.compliance_tags.join(', ') : '',
            order_index: mod.order_index || 0,
            is_active: mod.is_active,
            is_featured: mod.is_featured,
        });
        setModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            ...formData,
            features: formData.features_text
                .split('\n')
                .map((f) => f.trim())
                .filter(Boolean),
            compliance_tags: formData.compliance_tags_text
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
        };

        try {
            if (editingModule) {
                await axios.put(`/api/admin/modules/${editingModule.id}`, payload);
                showToast(`Modul ${formData.title} berhasil diperbarui`, 'success');
            } else {
                await axios.post('/api/admin/modules', payload);
                showToast(`Modul ${formData.title} berhasil ditambahkan`, 'success');
            }

            setModalOpen(false);
            fetchModules();
            refetchSiteData();
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal menyimpan modul';
            showToast(msg, 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            const res = await axios.patch(`/api/admin/modules/${id}/toggle`);
            if (res.data.status === 'success') {
                showToast(res.data.message, 'success');
                fetchModules();
                refetchSiteData();
            }
        } catch (err) {
            showToast('Gagal mengubah status modul', 'error');
        }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Apakah Anda yakin ingin menghapus modul "${title}"?`)) return;

        try {
            const res = await axios.delete(`/api/admin/modules/${id}`);
            if (res.data.status === 'success') {
                showToast(res.data.message, 'success');
                fetchModules();
                refetchSiteData();
            }
        } catch (err) {
            showToast('Gagal menghapus modul', 'error');
        }
    };

    const filteredModules = modules.filter((m) => {
        const matchSearch =
            m.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.module_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.short_description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCat = categoryFilter === 'all' || m.category === categoryFilter;
        return matchSearch && matchCat;
    });

    const categoryLabels = {
        'front-office': 'Front Office & Antrean',
        'clinical': 'Pelayanan Medis (EMR)',
        'ancillary': 'Penunjang Medis (LIS/RIS)',
        'pharmacy': 'Farmasi & Logistik',
        'finance': 'Keuangan & Klaim BPJS',
        'integration': 'Integrasi Eksekutif & SATUSEHAT',
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
                            <Layers className="h-3 w-3 mr-1 text-[#2F8BFF]" />
                            {modules.length} Modul Terpasang
                        </Badge>
                        <span className="text-xs text-slate-300">•</span>
                        <Badge
                            variant="outline"
                            className="text-emerald-700 bg-emerald-50/80 border-emerald-200/80 font-mono text-[10.5px] px-2.5 py-0.5"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 inline-block"></span>
                            {modules.filter((m) => m.is_active).length} Aktif di Katalog
                        </Badge>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2937] font-display">
                        Katalog Modul SIMRS
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                        Konfigurasi katalog fitur, modul spesialisasi, standardisasi akreditasi, dan metrik efisiensi publik.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                    <Button
                        onClick={openCreateModal}
                        className="bg-[#2F8BFF] hover:bg-[#256ecc] text-white shadow-xs gap-1.5 h-9 px-4 rounded-lg font-medium text-xs cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Tambah Modul Baru</span>
                    </Button>
                </div>
            </div>

            {/* Main Table Card */}
            <Card className="border-slate-200/80 shadow-xs overflow-hidden bg-white">
                {/* Search & Category Filter Toolbar */}
                <div className="p-4 sm:px-6 sm:py-3.5 border-b border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <Input
                            placeholder="Cari modul berdasarkan kode, nama, atau deskripsi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 h-8 text-xs bg-white border-slate-200"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="h-8 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-[#1F2937] shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#2F8BFF]/20 focus:border-[#2F8BFF] w-full sm:w-48"
                        >
                            <option value="all">Semua Kategori ({modules.length})</option>
                            <option value="front-office">Front Office</option>
                            <option value="clinical">Pelayanan Medis (EMR)</option>
                            <option value="ancillary">Penunjang Medis (LIS/RIS)</option>
                            <option value="pharmacy">Farmasi & Logistik</option>
                            <option value="finance">Keuangan & Klaim</option>
                            <option value="integration">Integrasi & Eksekutif</option>
                        </select>
                    </div>
                </div>

                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 border-b border-slate-200/80">
                                <TableHead className="w-[140px] text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4 sm:px-6">
                                    Kode & Ikon
                                </TableHead>
                                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                                    Nama Modul & Deskripsi
                                </TableHead>
                                <TableHead className="w-[170px] text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                                    Kategori
                                </TableHead>
                                <TableHead className="w-[150px] text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                                    Dampak / Metric
                                </TableHead>
                                <TableHead className="w-[90px] text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                                    Status
                                </TableHead>
                                <TableHead className="w-[80px] text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4 sm:px-6">
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
                                            <span className="font-mono text-slate-400">Memuat data modul SIMRS...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredModules.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-40 text-center text-xs text-slate-500">
                                        <div className="flex flex-col items-center justify-center gap-1.5">
                                            <Layers className="h-8 w-8 text-slate-300" />
                                            <span className="font-medium text-slate-600">Tidak ada modul yang cocok dengan filter</span>
                                            <span className="text-slate-400 text-[11px]">Coba sesuaikan kata kunci atau kategori filter.</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredModules.map((mod) => (
                                    <TableRow
                                        key={mod.id}
                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                                    >
                                        <TableCell className="align-top py-4 px-4 sm:px-6">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-lg bg-[#2F8BFF]/10 text-[#2F8BFF] flex items-center justify-center shrink-0 border border-[#2F8BFF]/20 shadow-2xs">
                                                    <Layers className="w-4 h-4" />
                                                </div>
                                                <div className="font-mono font-bold text-xs text-[#1F2937]">
                                                    {mod.module_code}
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="align-top py-4 px-4">
                                            <div className="space-y-1 max-w-lg">
                                                <div className="font-bold text-xs text-[#1F2937] flex items-center gap-1.5">
                                                    <span>{mod.title}</span>
                                                    {mod.is_featured && (
                                                        <Badge variant="accent" className="text-[9px] py-0 px-1.5 gap-0.5 font-mono">
                                                            <Sparkles className="h-2.5 w-2.5" />
                                                            Featured
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-[11.5px] text-slate-500 line-clamp-2 leading-relaxed">
                                                    {mod.short_description}
                                                </p>
                                                {mod.compliance_tags && mod.compliance_tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-1.5 pt-0.5">
                                                        {mod.compliance_tags.slice(0, 3).map((t, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="text-[9px] font-mono px-1.5 py-0.5 bg-slate-100/90 text-slate-600 rounded border border-slate-200/60"
                                                            >
                                                                {t}
                                                            </span>
                                                        ))}
                                                        {mod.compliance_tags.length > 3 && (
                                                            <span className="text-[9px] font-mono text-slate-400 self-center">
                                                                +{mod.compliance_tags.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>

                                        <TableCell className="align-top py-4 px-4">
                                            <span className="inline-block px-2.5 py-1 rounded-md text-[10.5px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                                                {mod.category_label || mod.category}
                                            </span>
                                        </TableCell>

                                        <TableCell className="align-top py-4 px-4">
                                            {mod.highlight_metric ? (
                                                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50/80 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                                                    {mod.highlight_metric}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-slate-400 font-mono">—</span>
                                            )}
                                        </TableCell>

                                        <TableCell className="text-center align-top py-4 px-4">
                                            <button
                                                type="button"
                                                onClick={() => handleToggleStatus(mod.id)}
                                                className="cursor-pointer inline-flex items-center transition-opacity hover:opacity-80"
                                                title={mod.is_active ? 'Klik untuk nonaktifkan' : 'Klik untuk aktifkan'}
                                            >
                                                {mod.is_active ? (
                                                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-[10px] font-mono gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        Aktif
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-slate-400 border-slate-200 text-[10px] font-mono">
                                                        Draft
                                                    </Badge>
                                                )}
                                            </button>
                                        </TableCell>

                                        <TableCell className="text-right align-top py-4 px-4 sm:px-6">
                                            <div className="inline-flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-lg text-slate-500 hover:text-[#2F8BFF] hover:bg-blue-50 transition-colors"
                                                    onClick={() => openEditModal(mod)}
                                                    title="Edit Modul"
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                                    onClick={() => handleDelete(mod.id, mod.title)}
                                                    title="Hapus Modul"
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

            {/* shadcn Dialog Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingModule ? `Edit Modul ${editingModule.module_code}` : 'Tambah Modul SIMRS Baru'}
                        </DialogTitle>
                        <DialogDescription>
                            Isi spesifikasi modul, deskripsi operasional, metrik efisiensi, dan parameter integrasi.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSave} className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Kode Modul (Unique)
                                </label>
                                <Input
                                    required
                                    value={formData.module_code}
                                    onChange={(e) => setFormData({ ...formData, module_code: e.target.value })}
                                    placeholder="MODUL-01"
                                    className="font-mono text-xs"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Nama / Judul Modul
                                </label>
                                <Input
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Pendaftaran & Antrean Online Mobile JKN"
                                    className="text-xs"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Kategori
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => {
                                        const cat = e.target.value;
                                        setFormData({
                                            ...formData,
                                            category: cat,
                                            category_label: categoryLabels[cat] || cat,
                                        });
                                    }}
                                    className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-[#1F2937] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2F8BFF]"
                                >
                                    <option value="front-office">Front Office</option>
                                    <option value="clinical">Pelayanan Medis (EMR)</option>
                                    <option value="ancillary">Penunjang Medis (LIS/RIS)</option>
                                    <option value="pharmacy">Farmasi & Logistik</option>
                                    <option value="finance">Keuangan & Klaim</option>
                                    <option value="integration">Integrasi & Eksekutif</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Label Kategori
                                </label>
                                <Input
                                    value={formData.category_label}
                                    onChange={(e) => setFormData({ ...formData, category_label: e.target.value })}
                                    className="text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Ikon (Material / Symbol)
                                </label>
                                <Input
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    placeholder="touch_app"
                                    className="font-mono text-xs"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                Deskripsi Singkat (Tampil di Card)
                            </label>
                            <Textarea
                                rows={2}
                                required
                                value={formData.short_description}
                                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                                placeholder="Jelaskan fungsi utama modul secara padat..."
                                className="text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                Deskripsi Lengkap / Detail Operasional
                            </label>
                            <Textarea
                                rows={3}
                                value={formData.full_description}
                                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                                placeholder="Jelaskan alur kerja, integrasi, dan arsitektur klinis modul..."
                                className="text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                Highlight Metric / Efisiensi
                            </label>
                            <Input
                                value={formData.highlight_metric}
                                onChange={(e) => setFormData({ ...formData, highlight_metric: e.target.value })}
                                placeholder="Contoh: Memangkas antrean loket s/d 80%"
                                className="text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                Daftar Fitur Utama (Satu baris per fitur)
                            </label>
                            <Textarea
                                rows={3}
                                value={formData.features_text}
                                onChange={(e) => setFormData({ ...formData, features_text: e.target.value })}
                                placeholder="Anjungan Pendaftaran Mandiri (APM)&#10;Integrasi Antrean Mobile JKN&#10;SEP VClaim Otomatis"
                                className="font-mono text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                Tags Kepatuhan / Regulasi (Pisahkan dengan koma)
                            </label>
                            <Input
                                value={formData.compliance_tags_text}
                                onChange={(e) => setFormData({ ...formData, compliance_tags_text: e.target.value })}
                                placeholder="Bridging Antrean BPJS 2.0, Kemenkes SATUSEHAT, APM"
                                className="text-xs"
                            />
                        </div>

                        <div className="flex items-center gap-6 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1F2937] font-medium">
                                <input
                                    type="checkbox"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="rounded text-[#2F8BFF] focus:ring-[#2F8BFF]"
                                />
                                <span>Tampilkan di Katalog Publik</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1F2937] font-medium">
                                <input
                                    type="checkbox"
                                    checked={formData.is_featured}
                                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                    className="rounded text-[#2F8BFF] focus:ring-[#2F8BFF]"
                                />
                                <span>Modul Unggulan Beranda</span>
                            </label>
                        </div>

                        <DialogFooter className="pt-4 border-t border-slate-100">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setModalOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button type="submit" disabled={saving}>
                                {saving ? 'Menyimpan...' : 'Simpan Modul'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
