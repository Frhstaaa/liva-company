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
import {
    Scale,
    Plus,
    Pencil,
    Trash2,
    Check,
    X,
    Sparkles,
    Shield,
    Layers,
    Search,
} from 'lucide-react';

export default function AdminComparisons() {
    const { refetchSiteData, showToast } = useSite();
    const [comparisons, setComparisons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [saving, setSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [formData, setFormData] = useState({
        parameter_name: '',
        category: 'Regulasi & Integrasi',
        liva_feature: '',
        liva_status: true,
        conventional_feature: '',
        conventional_status: false,
        order_index: 0,
    });

    const fetchComparisons = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/comparisons');
            if (res.data.status === 'success') {
                setComparisons(res.data.data);
            }
        } catch (err) {
            showToast('Gagal memuat data komparasi', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComparisons();
    }, []);

    const openCreate = () => {
        setEditingItem(null);
        setFormData({
            parameter_name: '',
            category: 'Regulasi & Integrasi',
            liva_feature: '',
            liva_status: true,
            conventional_feature: '',
            conventional_status: false,
            order_index: comparisons.length + 1,
        });
        setModalOpen(true);
    };

    const openEdit = (c) => {
        setEditingItem(c);
        setFormData({
            parameter_name: c.parameter_name,
            category: c.category,
            liva_feature: c.liva_feature,
            liva_status: c.liva_status,
            conventional_feature: c.conventional_feature,
            conventional_status: c.conventional_status,
            order_index: c.order_index,
        });
        setModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (editingItem) {
                await axios.put(`/api/admin/comparisons/${editingItem.id}`, formData);
                showToast('Parameter komparasi diperbarui', 'success');
            } else {
                await axios.post('/api/admin/comparisons', formData);
                showToast('Parameter komparasi ditambahkan', 'success');
            }

            setModalOpen(false);
            fetchComparisons();
            refetchSiteData();
        } catch (err) {
            showToast('Gagal menyimpan komparasi', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Hapus parameter komparasi ini?')) return;

        try {
            await axios.delete(`/api/admin/comparisons/${id}`);
            showToast('Parameter komparasi dihapus', 'success');
            fetchComparisons();
            refetchSiteData();
        } catch (err) {
            showToast('Gagal menghapus komparasi', 'error');
        }
    };

    const filteredComparisons = comparisons.filter((c) => {
        const query = searchQuery.toLowerCase();
        return (
            c.parameter_name?.toLowerCase().includes(query) ||
            c.category?.toLowerCase().includes(query) ||
            c.liva_feature?.toLowerCase().includes(query) ||
            c.conventional_feature?.toLowerCase().includes(query)
        );
    });

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
                            <Scale className="h-3 w-3 mr-1 text-[#2F8BFF]" />
                            {comparisons.length} Matriks Komparasi
                        </Badge>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-xs font-mono text-slate-500">
                            Evaluasi Direksi & IT RS
                        </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2937] font-display">
                        Kelola Matriks Komparasi
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                        Tabel pembanding arsitektur modern Liva SIMRS vs sistem legacy untuk evaluasi pengadaan dan akreditasi RS.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                    <Button
                        onClick={openCreate}
                        className="bg-[#2F8BFF] hover:bg-[#256ecc] text-white shadow-xs gap-1.5 h-9 px-4 rounded-lg font-medium text-xs cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Tambah Komparasi</span>
                    </Button>
                </div>
            </div>

            {/* Main Table Card */}
            <Card className="border-slate-200/80 shadow-xs overflow-hidden bg-white">
                {/* Search / Filter Toolbar */}
                <div className="p-4 sm:px-6 sm:py-3.5 border-b border-slate-100 bg-slate-50/40 flex items-center justify-between gap-3">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <Input
                            placeholder="Cari parameter, kategori, atau fitur..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 h-8 text-xs bg-white border-slate-200"
                        />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                        Menampilkan {filteredComparisons.length} dari {comparisons.length} item
                    </span>
                </div>

                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 border-b border-slate-200/80">
                                <TableHead className="w-[26%] text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4 sm:px-6">
                                    Parameter & Kategori
                                </TableHead>
                                <TableHead className="w-[36%] text-[11px] font-bold text-[#2F8BFF] uppercase tracking-wider py-3.5 px-4">
                                    Solusi Liva SIMRS
                                </TableHead>
                                <TableHead className="w-[32%] text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4">
                                    SIMRS Konvensional Lainnya
                                </TableHead>
                                <TableHead className="w-[6%] text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4 sm:px-6">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-40 text-center text-xs text-slate-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <span className="w-5 h-5 border-2 border-[#2F8BFF] border-t-transparent rounded-full animate-spin"></span>
                                            <span className="font-mono text-slate-400">Memuat tabel perbandingan...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredComparisons.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-40 text-center text-xs text-slate-500">
                                        <div className="flex flex-col items-center justify-center gap-1.5">
                                            <Scale className="h-8 w-8 text-slate-300" />
                                            <span className="font-medium text-slate-600">Tidak ada matriks komparasi yang cocok</span>
                                            <span className="text-slate-400 text-[11px]">Coba sesuaikan kata kunci pencarian Anda.</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredComparisons.map((c) => (
                                    <TableRow
                                        key={c.id}
                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                                    >
                                        {/* Parameter & Category */}
                                        <TableCell className="align-top py-4 px-4 sm:px-6">
                                            <div className="space-y-1.5">
                                                <span className="inline-block px-2 py-0.5 rounded text-[9.5px] font-mono font-medium tracking-wide bg-slate-100 text-slate-600 border border-slate-200/60">
                                                    {c.category}
                                                </span>
                                                <div className="font-bold text-xs text-[#1F2937] leading-snug">
                                                    {c.parameter_name}
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Liva SIMRS Solution */}
                                        <TableCell className="align-top py-4 px-4">
                                            <div className="p-3 rounded-lg bg-blue-50/40 border border-blue-150/60 flex items-start gap-2.5">
                                                <div className="w-5 h-5 rounded-full bg-[#2F8BFF] text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                                                    <Check className="h-3 w-3 stroke-[2.5]" />
                                                </div>
                                                <span className="text-xs font-medium text-slate-800 leading-relaxed">
                                                    {c.liva_feature}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Conventional SIMRS Solution */}
                                        <TableCell className="align-top py-4 px-4">
                                            <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/60 flex items-start gap-2.5">
                                                <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                                                    <X className="h-3 w-3 stroke-[2.5]" />
                                                </div>
                                                <span className="text-xs text-slate-600 leading-relaxed">
                                                    {c.conventional_feature}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right align-top py-4 px-4 sm:px-6">
                                            <div className="inline-flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-lg text-slate-500 hover:text-[#2F8BFF] hover:bg-blue-50 transition-colors"
                                                    onClick={() => openEdit(c)}
                                                    title="Edit Komparasi"
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                                    onClick={() => handleDelete(c.id)}
                                                    title="Hapus Komparasi"
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

            {/* Dialog Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="max-w-xl p-6 sm:p-7">
                    <DialogHeader className="space-y-1.5 pb-2">
                        <DialogTitle className="text-base sm:text-lg font-bold font-display text-[#1F2937]">
                            {editingItem ? 'Edit Parameter Komparasi' : 'Tambah Parameter Komparasi'}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-slate-500">
                            Definisikan perbedaan fundamental antara arsitektur Liva SIMRS dan produk legacy konvensional.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSave} className="space-y-4 pt-2">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2 space-y-1">
                                <label className="block text-xs font-semibold text-[#1F2937]">
                                    Nama Parameter
                                </label>
                                <Input
                                    required
                                    value={formData.parameter_name}
                                    onChange={(e) => setFormData({ ...formData, parameter_name: e.target.value })}
                                    placeholder="Konektivitas SATUSEHAT Kemenkes RI"
                                    className="text-xs h-9"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-semibold text-[#1F2937]">
                                    Kategori
                                </label>
                                <Input
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="Regulasi & Integrasi"
                                    className="text-xs h-9"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-semibold text-[#2F8BFF]">
                                Fitur / Solusi Liva SIMRS (Keunggulan)
                            </label>
                            <Textarea
                                rows={3}
                                required
                                value={formData.liva_feature}
                                onChange={(e) => setFormData({ ...formData, liva_feature: e.target.value })}
                                className="text-xs leading-relaxed border-[#2F8BFF]/30 focus:border-[#2F8BFF]"
                                placeholder="Jelaskan fitur arsitektur cerdas Liva..."
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-semibold text-slate-600">
                                Keterbatasan SIMRS Konvensional Lainnya
                            </label>
                            <Textarea
                                rows={3}
                                required
                                value={formData.conventional_feature}
                                onChange={(e) => setFormData({ ...formData, conventional_feature: e.target.value })}
                                className="text-xs leading-relaxed"
                                placeholder="Jelaskan kendala atau bottleneck sistem konvensional..."
                            />
                        </div>

                        <DialogFooter className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setModalOpen(false)}
                                className="h-9 text-xs"
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={saving}
                                className="h-9 text-xs bg-[#2F8BFF] hover:bg-[#256ecc] text-white"
                            >
                                {saving ? 'Menyimpan...' : 'Simpan Komparasi'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

