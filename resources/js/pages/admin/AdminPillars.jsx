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
    ShieldCheck,
    Plus,
    Pencil,
    Trash2,
    CheckCircle2,
    Sparkles,
    BarChart3,
    ArrowUpRight,
} from 'lucide-react';

export default function AdminPillars() {
    const { refetchSiteData, showToast } = useSite();
    const [pillars, setPillars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPillar, setEditingPillar] = useState(null);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        pillar_number: '01',
        badge: '01 / Integrasi Nasional',
        title: '',
        description: '',
        icon: 'verified',
        metric_label: '',
        metric_value: '',
        order_index: 0,
        is_active: true,
    });

    const fetchPillars = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/pillars');
            if (res.data.status === 'success') {
                setPillars(res.data.data);
            }
        } catch (err) {
            showToast('Gagal memuat data pilar', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPillars();
    }, []);

    const openCreate = () => {
        setEditingPillar(null);
        const num = String(pillars.length + 1).padStart(2, '0');
        setFormData({
            pillar_number: num,
            badge: `${num} / Pilar Keunggulan`,
            title: '',
            description: '',
            icon: 'verified',
            metric_label: 'Tolak Ukur',
            metric_value: '100%',
            order_index: pillars.length + 1,
            is_active: true,
        });
        setModalOpen(true);
    };

    const openEdit = (p) => {
        setEditingPillar(p);
        setFormData({
            pillar_number: p.pillar_number || '',
            badge: p.badge || '',
            title: p.title || '',
            description: p.description || '',
            icon: p.icon || 'verified',
            metric_label: p.metric_label || '',
            metric_value: p.metric_value || '',
            order_index: p.order_index || 0,
            is_active: p.is_active,
        });
        setModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (editingPillar) {
                await axios.put(`/api/admin/pillars/${editingPillar.id}`, formData);
                showToast(`Pilar ${formData.title} berhasil diperbarui`, 'success');
            } else {
                await axios.post('/api/admin/pillars', formData);
                showToast(`Pilar ${formData.title} berhasil dibuat`, 'success');
            }

            setModalOpen(false);
            fetchPillars();
            refetchSiteData();
        } catch (err) {
            showToast('Gagal menyimpan pilar', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Hapus pilar "${title}"?`)) return;

        try {
            await axios.delete(`/api/admin/pillars/${id}`);
            showToast('Pilar berhasil dihapus', 'success');
            fetchPillars();
            refetchSiteData();
        } catch (err) {
            showToast('Gagal menghapus pilar', 'error');
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
                            className="text-[#2F8BFF] bg-blue-50/70 border-blue-200/80 font-mono text-[10.5px] px-2.5 py-0.5"
                        >
                            <ShieldCheck className="h-3 w-3 mr-1 text-[#2F8BFF]" />
                            {pillars.length} Fondasi Terdaftar
                        </Badge>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-xs font-mono text-slate-500">
                            Bento-Grid 6 Pilar Strategis
                        </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2937] font-display">
                        6 Pilar Keunggulan Fondasi
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                        Mengatur pilar nilai strategis, indikator kinerja utama (KPI/SLA), dan diferensiasi klinis Liva SIMRS.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                    <Button
                        onClick={openCreate}
                        className="bg-[#2F8BFF] hover:bg-[#256ecc] text-white shadow-xs gap-1.5 h-9 px-4 rounded-lg font-medium text-xs cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Tambah Pilar Baru</span>
                    </Button>
                </div>
            </div>

            {/* Grid Bento Cards */}
            {loading ? (
                <div className="p-16 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-[#2F8BFF] border-t-transparent rounded-full animate-spin"></span>
                    <span className="font-mono text-slate-400">Memuat data pilar keunggulan...</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {pillars.map((p) => (
                        <Card
                            key={p.id}
                            className="border-slate-200/80 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-[#2F8BFF]/40 rounded-xl"
                        >
                            <CardHeader className="p-5 pb-3 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-lg bg-[#2F8BFF]/10 text-[#2F8BFF] border border-[#2F8BFF]/20 flex items-center justify-center shadow-2xs">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <Badge variant="outline" className="font-mono text-[10px] text-[#2F8BFF] bg-blue-50/70 border-blue-200/80 px-2 py-0.5">
                                        {p.badge || p.pillar_number}
                                    </Badge>
                                </div>
                                <CardTitle className="text-sm font-bold text-[#1F2937] font-display leading-snug">
                                    {p.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="p-5 pt-0 flex-1">
                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                                    {p.description}
                                </p>
                            </CardContent>

                            <CardFooter className="p-4 sm:px-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-mono text-slate-400 font-medium block">
                                        {p.metric_label || 'Tolak Ukur'}
                                    </span>
                                    <span className="text-xs font-bold text-[#2F8BFF] font-mono">
                                        {p.metric_value || '-'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-lg text-slate-500 hover:text-[#2F8BFF] hover:bg-blue-50 transition-colors"
                                        onClick={() => openEdit(p)}
                                        title="Edit Pilar"
                                    >
                                        <Pencil className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                        onClick={() => handleDelete(p.id, p.title)}
                                        title="Hapus Pilar"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {/* Dialog Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>
                            {editingPillar ? `Edit Pilar ${editingPillar.pillar_number}` : 'Tambah Pilar Keunggulan'}
                        </DialogTitle>
                        <DialogDescription>
                            Tentukan poin fondasi diferensiasi arsitektur dan tolok ukur metrik klinis.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSave} className="space-y-4 pt-2">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Nomor Urutan
                                </label>
                                <Input
                                    required
                                    value={formData.pillar_number}
                                    onChange={(e) => setFormData({ ...formData, pillar_number: e.target.value })}
                                    className="font-mono text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Badge Tag
                                </label>
                                <Input
                                    required
                                    value={formData.badge}
                                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                    className="text-xs"
                                    placeholder="01 / Integrasi Nasional"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Judul Pilar Keunggulan
                                </label>
                                <Input
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="text-xs"
                                    placeholder="Interoperabilitas Mutlak SATUSEHAT"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Ikon Material
                                </label>
                                <Input
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    placeholder="verified"
                                    className="font-mono text-xs"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                Deskripsi Pilar
                            </label>
                            <Textarea
                                rows={3}
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Jelaskan signifikansi pilar fondasi ini..."
                                className="text-xs leading-relaxed"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Label Tolok Ukur
                                </label>
                                <Input
                                    value={formData.metric_label}
                                    onChange={(e) => setFormData({ ...formData, metric_label: e.target.value })}
                                    placeholder="SLA Uptime / Waktu Tunggu"
                                    className="text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Nilai Metrik
                                </label>
                                <Input
                                    value={formData.metric_value}
                                    onChange={(e) => setFormData({ ...formData, metric_value: e.target.value })}
                                    placeholder="99.98% / < 2 Detik"
                                    className="text-xs font-mono font-bold text-[#2F8BFF]"
                                />
                            </div>
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
                                {saving ? 'Menyimpan...' : 'Simpan Pilar'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
