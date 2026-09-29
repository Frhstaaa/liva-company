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
    Building2,
    Plus,
    Pencil,
    Trash2,
    CheckCircle2,
    MapPin,
    Bed,
    Quote,
    TrendingUp,
    Sparkles,
} from 'lucide-react';

export default function AdminCaseStudies() {
    const { refetchSiteData, showToast } = useSite();
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingStudy, setEditingStudy] = useState(null);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        hospital_name: '',
        hospital_type: 'RSUD Kelas B Pendidikan',
        hospital_category: 'rsud',
        location: 'Kota Bekasi, Jawa Barat',
        bed_count: 500,
        headline: '',
        summary: '',
        challenge: '',
        solution: '',
        results_text: '',
        quote: '',
        quote_author_name: '',
        quote_author_title: '',
        quote_author_avatar: '',
        hospital_logo: '',
        hospital_image: '',
        is_published: true,
    });

    const fetchCaseStudies = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/case-studies');
            if (res.data.status === 'success') {
                setCaseStudies(res.data.data);
            }
        } catch (err) {
            showToast('Gagal memuat data studi kasus', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCaseStudies();
    }, []);

    const openCreate = () => {
        setEditingStudy(null);
        setFormData({
            hospital_name: '',
            hospital_type: 'RSUD Kelas B',
            hospital_category: 'rsud',
            location: '',
            bed_count: 300,
            headline: '',
            summary: '',
            challenge: '',
            solution: '',
            results_text: 'Waktu Tunggu Obat | 14 Menit | Turun 74%\nLolos Klaim Pertama | 99.6% | Dispute < 0.4%',
            quote: '',
            quote_author_name: '',
            quote_author_title: '',
            quote_author_avatar: '',
            hospital_logo: '',
            hospital_image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
            is_published: true,
        });
        setModalOpen(true);
    };

    const openEdit = (cs) => {
        setEditingStudy(cs);
        const resultsFormatted = Array.isArray(cs.results)
            ? cs.results.map((r) => `${r.label} | ${r.value} | ${r.improvement}`).join('\n')
            : '';

        setFormData({
            hospital_name: cs.hospital_name || '',
            hospital_type: cs.hospital_type || '',
            hospital_category: cs.hospital_category || 'rsud',
            location: cs.location || '',
            bed_count: cs.bed_count || 0,
            headline: cs.headline || '',
            summary: cs.summary || '',
            challenge: cs.challenge || '',
            solution: cs.solution || '',
            results_text: resultsFormatted,
            quote: cs.quote || '',
            quote_author_name: cs.quote_author_name || '',
            quote_author_title: cs.quote_author_title || '',
            quote_author_avatar: cs.quote_author_avatar || '',
            hospital_logo: cs.hospital_logo || '',
            hospital_image: cs.hospital_image || '',
            is_published: cs.is_published,
        });
        setModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        const parsedResults = formData.results_text
            .split('\n')
            .map((line) => {
                const parts = line.split('|').map((p) => p.trim());
                if (parts.length >= 2) {
                    return {
                        label: parts[0],
                        value: parts[1],
                        improvement: parts[2] || '',
                    };
                }
                return null;
            })
            .filter(Boolean);

        const payload = {
            ...formData,
            results: parsedResults,
        };

        try {
            if (editingStudy) {
                await axios.put(`/api/admin/case-studies/${editingStudy.id}`, payload);
                showToast(`Studi kasus ${formData.hospital_name} diperbarui`, 'success');
            } else {
                await axios.post('/api/admin/case-studies', payload);
                showToast(`Studi kasus ${formData.hospital_name} ditambahkan`, 'success');
            }

            setModalOpen(false);
            fetchCaseStudies();
            refetchSiteData();
        } catch (err) {
            showToast('Gagal menyimpan studi kasus', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Hapus studi kasus RS "${name}"?`)) return;

        try {
            await axios.delete(`/api/admin/case-studies/${id}`);
            showToast('Studi kasus dihapus', 'success');
            fetchCaseStudies();
            refetchSiteData();
        } catch (err) {
            showToast('Gagal menghapus studi kasus', 'error');
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
                            <Building2 className="h-3 w-3 mr-1 text-[#2F8BFF]" />
                            {caseStudies.length} Kisah Transformasi RS
                        </Badge>
                        <span className="text-xs text-slate-300">•</span>
                        <Badge
                            variant="outline"
                            className="text-emerald-700 bg-emerald-50/80 border-emerald-200/80 font-mono text-[10.5px] px-2.5 py-0.5"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 inline-block"></span>
                            {caseStudies.filter((c) => c.is_published).length} Terbit Publik
                        </Badge>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2937] font-display">
                        Studi Kasus & Kisah Sukses Mitra RS
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                        Dokumentasikan efisiensi nyata, metrik ROI, kepuasan pasien, dan testimoni pimpinan rumah sakit.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                    <Button
                        onClick={openCreate}
                        className="bg-[#2F8BFF] hover:bg-[#256ecc] text-white shadow-xs gap-1.5 h-9 px-4 rounded-lg font-medium text-xs cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Tambah Studi Kasus</span>
                    </Button>
                </div>
            </div>

            {/* List Cards */}
            {loading ? (
                <div className="p-16 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-[#2F8BFF] border-t-transparent rounded-full animate-spin"></span>
                    <span className="font-mono text-slate-400">Memuat data studi kasus...</span>
                </div>
            ) : caseStudies.length === 0 ? (
                <div className="p-16 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col items-center justify-center gap-1.5">
                    <Building2 className="h-8 w-8 text-slate-300" />
                    <span className="font-medium text-slate-600">Belum ada studi kasus yang didaftarkan</span>
                    <span className="text-slate-400 text-[11px]">Klik "Tambah Studi Kasus" untuk mempublikasikan kisah transformasi rumah sakit mitra.</span>
                </div>
            ) : (
                <div className="space-y-4">
                    {caseStudies.map((cs) => (
                        <Card key={cs.id} className="border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden">
                            <div className="flex flex-col lg:flex-row">
                                {cs.hospital_image && (
                                    <div className="lg:w-64 h-48 lg:h-auto shrink-0 bg-slate-100 overflow-hidden relative">
                                        <img
                                            src={cs.hospital_image}
                                            alt={cs.hospital_name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <Badge variant="secondary" className="bg-white/90 backdrop-blur-xs text-[#1F2937] text-[10px] shadow-xs">
                                                {cs.hospital_type}
                                            </Badge>
                                        </div>
                                    </div>
                                )}

                                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                                <span className="flex items-center gap-1 font-medium">
                                                    <MapPin className="h-3.5 w-3.5 text-[#2F8BFF]" />
                                                    {cs.location}
                                                </span>
                                                <span className="flex items-center gap-1 font-medium">
                                                    <Bed className="h-3.5 w-3.5 text-[#FF8A2B]" />
                                                    {cs.bed_count} Tempat Tidur
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 gap-1 text-slate-600 hover:text-[#2F8BFF]"
                                                    onClick={() => openEdit(cs)}
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                    <span className="text-xs">Edit</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 gap-1 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => handleDelete(cs.id, cs.hospital_name)}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    <span className="text-xs">Hapus</span>
                                                </Button>
                                            </div>
                                        </div>

                                        <h3 className="text-base font-bold text-[#1F2937] font-display">
                                            {cs.hospital_name}
                                        </h3>

                                        <p className="text-xs font-semibold text-[#2F8BFF]">
                                            "{cs.headline}"
                                        </p>

                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                            {cs.summary}
                                        </p>
                                    </div>

                                    {/* Results Highlights */}
                                    {Array.isArray(cs.results) && cs.results.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                                            {cs.results.map((r, i) => (
                                                <div key={i} className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200/80 text-[11px] flex items-center gap-1.5">
                                                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                                                    <span className="text-slate-600">{r.label}:</span>
                                                    <span className="font-bold text-[#1F2937]">{r.value}</span>
                                                    {r.improvement && (
                                                        <span className="text-emerald-700 font-semibold">({r.improvement})</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {cs.quote && (
                                        <div className="text-[11px] italic text-slate-500 flex items-start gap-1.5 pt-1">
                                            <Quote className="h-3.5 w-3.5 text-[#2F8BFF] shrink-0 mt-0.5" />
                                            <span>
                                                "{cs.quote}" — <strong className="not-italic text-[#1F2937]">{cs.quote_author_name}</strong> ({cs.quote_author_title})
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Dialog Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingStudy ? `Edit Studi Kasus: ${editingStudy.hospital_name}` : 'Tambah Studi Kasus Rumah Sakit'}
                        </DialogTitle>
                        <DialogDescription>
                            Isi detail implementasi rumah sakit, metrik efisiensi terukur, dan testimoni pimpinan RS.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSave} className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Nama Rumah Sakit
                                </label>
                                <Input
                                    required
                                    value={formData.hospital_name}
                                    onChange={(e) => setFormData({ ...formData, hospital_name: e.target.value })}
                                    placeholder="RSUD dr. Chasbullah Abdulmadjid"
                                    className="text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Tipe / Klasifikasi RS
                                </label>
                                <Input
                                    required
                                    value={formData.hospital_type}
                                    onChange={(e) => setFormData({ ...formData, hospital_type: e.target.value })}
                                    placeholder="RSUD Kelas B Pendidikan"
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
                                    value={formData.hospital_category}
                                    onChange={(e) => setFormData({ ...formData, hospital_category: e.target.value })}
                                    className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-[#1F2937] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2F8BFF]"
                                >
                                    <option value="rsud">RSUD Pemerintah</option>
                                    <option value="swasta">Rumah Sakit Swasta</option>
                                    <option value="rsia">RSIA Ibu & Anak</option>
                                    <option value="korporasi">RS Jaringan Korporasi</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Lokasi Kota / Provinsi
                                </label>
                                <Input
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Kota Bekasi, Jawa Barat"
                                    className="text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Jumlah Tempat Tidur (TT)
                                </label>
                                <Input
                                    type="number"
                                    value={formData.bed_count}
                                    onChange={(e) => setFormData({ ...formData, bed_count: parseInt(e.target.value) || 0 })}
                                    className="text-xs"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                Headline Utama Dampak Transformasi
                            </label>
                            <Input
                                required
                                value={formData.headline}
                                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                                placeholder="Memangkas Waktu Tunggu Farmasi dari 55 Menit Menjadi 14 Menit..."
                                className="text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                Ringkasan Narasi Kisah Sukses
                            </label>
                            <Textarea
                                rows={2}
                                required
                                value={formData.summary}
                                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                placeholder="Ringkasan dampak implementasi SIMRS pada layanan rumah sakit..."
                                className="text-xs"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-rose-600 mb-1">
                                    Tantangan Awal Rumah Sakit
                                </label>
                                <Textarea
                                    rows={2}
                                    value={formData.challenge}
                                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                                    placeholder="Sistem lama sering downtime, antrean farmasi mengular..."
                                    className="text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#2F8BFF] mb-1">
                                    Solusi & Implementasi Liva
                                </label>
                                <Textarea
                                    rows={2}
                                    value={formData.solution}
                                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                    placeholder="Deployment cloud berkecepatan tinggi, e-Prescription instan..."
                                    className="text-xs"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                Hasil Metrik (Satu baris: Label | Nilai | Peningkatan)
                            </label>
                            <Textarea
                                rows={3}
                                value={formData.results_text}
                                onChange={(e) => setFormData({ ...formData, results_text: e.target.value })}
                                placeholder="Waktu Tunggu Obat | 14 Menit | Turun 74%&#10;Lolos Klaim Pertama | 99.6% | Dispute < 0.4%"
                                className="font-mono text-xs"
                            />
                        </div>

                        <Separator />

                        <div className="space-y-3">
                            <span className="text-xs font-bold text-[#1F2937] block">Testimoni & Kutipan Direktur</span>
                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">Kutipan Pernyataan</label>
                                <Textarea
                                    rows={2}
                                    value={formData.quote}
                                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                    placeholder="Setelah beralih ke Liva SIMRS, antrean poliklinik terurai rapi..."
                                    className="text-xs"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">Nama Tokoh / Dokter</label>
                                    <Input
                                        value={formData.quote_author_name}
                                        onChange={(e) => setFormData({ ...formData, quote_author_name: e.target.value })}
                                        placeholder="dr. Kusnanto Saidi, MARS"
                                        className="text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">Jabatan Tokoh</label>
                                    <Input
                                        value={formData.quote_author_title}
                                        onChange={(e) => setFormData({ ...formData, quote_author_title: e.target.value })}
                                        placeholder="Direktur Utama RSUD"
                                        className="text-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#1F2937] mb-1">URL Foto Rumah Sakit</label>
                            <Input
                                value={formData.hospital_image}
                                onChange={(e) => setFormData({ ...formData, hospital_image: e.target.value })}
                                className="font-mono text-xs"
                                placeholder="https://images.unsplash.com/photo-..."
                            />
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
                                {saving ? 'Menyimpan...' : 'Simpan Studi Kasus'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
