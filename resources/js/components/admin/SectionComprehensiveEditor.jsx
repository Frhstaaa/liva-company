import React, { useState } from 'react';
import WebpUploadButton from '../WebpUploadButton';
import SectionLivePreview from './SectionLivePreview';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    BG_PRESETS,
    ACCENT_PRESETS,
    LAYOUT_PRESETS,
    RADIUS_PRESETS,
    PADDING_PRESETS,
    BORDER_PRESETS,
    IMAGE_POSITION_PRESETS,
    IMAGE_WIDTH_PRESETS,
    GALLERY_COLUMNS_PRESETS,
    parseGalleryImages,
} from '../../lib/sectionStyler';
import {
    Type,
    Palette,
    Layout,
    ImageIcon,
    Sliders,
    Eye,
    EyeOff,
    CheckCircle2,
    Sparkles,
    Trash2,
    Maximize2,
    Link,
    MousePointerClick,
    SunMedium,
    Plus,
    Columns,
    MoveHorizontal,
    Monitor
} from 'lucide-react';

export default function SectionComprehensiveEditor({
    pageId,
    secId,
    sectionName = '',
    settingsMap = {},
    onChange,
    customFields = null,
}) {
    // Active sub-tab inside section editor: 'content', 'colors', 'layout', 'media', 'visibility', 'preview'
    const [subTab, setSubTab] = useState('content');
    const [showInlinePreview, setShowInlinePreview] = useState(false);

    const prefix = `sec_${pageId}_${secId}_`;

    // Helpers to get/set section specific values
    const getVal = (field, fallback = '') => {
        const fullKey = prefix + field;
        return settingsMap[fullKey] !== undefined ? settingsMap[fullKey] : fallback;
    };

    const setVal = (field, val) => {
        onChange(prefix + field, val);
    };

    // Current Values
    const bgMode = getVal('bg', 'default');
    const customBg = getVal('bg_custom', '#FFFFFF');
    const accentColor = getVal('accent', '#1B84FF');
    const contrastMode = getVal('contrast', 'auto');
    const layout = getVal('layout', 'default');
    const padding = getVal('padding', 'normal');
    const radius = getVal('radius', 'rounded-2xl');
    const border = getVal('border', 'none');
    
    // Photo & Media Values
    const imageUrl = getVal('image_url', '');
    const imageAspect = getVal('image_aspect', '16/9');
    const imageStyle = getVal('image_style', 'rounded');
    const imagePosition = getVal('image_position', layout === 'split-right' ? 'side-left' : layout === 'split-left' ? 'side-right' : 'side-right');
    const imageWidth = getVal('image_width', 'balanced');
    const imageFit = getVal('image_fit', 'cover');
    const galleryColumns = getVal('gallery_columns', '3');
    const galleryImages = parseGalleryImages(getVal('gallery_images', '[]'));

    // Visibility
    const showBadge = getVal('show_badge', '1') !== '0';
    const showImage = getVal('show_image', '1') !== '0';
    const showCta = getVal('show_cta', '1') !== '0';
    const showSecondaryCta = getVal('show_secondary_cta', '1') !== '0';
    const ctaStyle = getVal('cta_style', 'solid');
    const ambientGlow = getVal('ambient_glow', '1') === '1';
    const gridLines = getVal('grid_lines', '0') === '1';

    // Text & Content fields
    const badgeText = getVal('badge_text', settingsMap[`${secId}_badge_text`] || '');
    const titleMain = getVal('title_main', settingsMap[`${secId}_headline`] || settingsMap[`${secId}_title`] || '');
    const titleHighlight = getVal('title_highlight', settingsMap[`${secId}_highlight`] || '');
    const description = getVal('description', settingsMap[`${secId}_description`] || settingsMap[`${secId}_subheadline`] || '');
    const ctaPrimaryText = getVal('cta_primary_text', settingsMap[`${secId}_cta_primary_text`] || settingsMap[`${secId}_cta_text`] || '');
    const ctaPrimaryUrl = getVal('cta_primary_url', settingsMap[`${secId}_cta_primary_url`] || '');
    const ctaSecondaryText = getVal('cta_secondary_text', settingsMap[`${secId}_cta_secondary_text`] || '');
    const ctaSecondaryUrl = getVal('cta_secondary_url', settingsMap[`${secId}_cta_secondary_url`] || '');

    // Multi-photo management helpers
    const handleAddGalleryImage = () => {
        const newPhoto = {
            id: 'img_' + Date.now(),
            url: '',
            title: '',
            caption: '',
        };
        const updated = [...galleryImages, newPhoto];
        setVal('gallery_images', JSON.stringify(updated));
    };

    const handleUpdateGalleryImage = (index, field, value) => {
        const updated = [...galleryImages];
        updated[index] = { ...updated[index], [field]: value };
        setVal('gallery_images', JSON.stringify(updated));
    };

    const handleRemoveGalleryImage = (index) => {
        const updated = galleryImages.filter((_, i) => i !== index);
        setVal('gallery_images', JSON.stringify(updated));
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            {/* Sub-Tab Navigation Header */}
            <div className="bg-[#F8FAFC] border-b border-slate-200/80 p-2 sm:p-2.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                    {[
                        { id: 'content', label: '1. Konten Teks', icon: Type, color: 'text-blue-600' },
                        { id: 'colors', label: '2. Warna & Latar', icon: Palette, color: 'text-purple-600' },
                        { id: 'layout', label: '3. Bentuk & Layout', icon: Layout, color: 'text-emerald-600' },
                        { id: 'media', label: '4. Upload & Tata Letak Foto', icon: ImageIcon, color: 'text-amber-600' },
                        { id: 'visibility', label: '5. Tombol & Elemen', icon: Sliders, color: 'text-slate-600' },
                        { id: 'preview', label: '6. Live Preview', icon: Eye, color: 'text-pink-600' },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = subTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setSubTab(tab.id)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                    isActive
                                        ? 'bg-white text-[#181C32] shadow-2xs border border-slate-200 ring-1 ring-slate-200'
                                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                                }`}
                            >
                                <Icon className={`h-3.5 w-3.5 ${tab.color}`} />
                                <span>{tab.label}</span>
                                {tab.id === 'media' && (imageUrl || galleryImages.length > 0) && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Instant Inline Live Preview Toggle Button */}
                <button
                    type="button"
                    onClick={() => setShowInlinePreview(!showInlinePreview)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                        showInlinePreview
                            ? 'bg-pink-50 text-pink-700 border-pink-200 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    <Eye className="h-3.5 w-3.5 text-pink-600" />
                    <span>{showInlinePreview ? 'Sembunyikan Live Preview' : '👁️ Buka Live Preview Seketika'}</span>
                </button>
            </div>

            {/* OPTIONAL INLINE REAL-TIME LIVE PREVIEW PANEL */}
            {showInlinePreview && subTab !== 'preview' && (
                <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 animate-slide-down">
                    <SectionLivePreview
                        pageId={pageId}
                        secId={secId}
                        sectionName={sectionName}
                        settingsMap={settingsMap}
                        showDeviceToolbar={true}
                    />
                </div>
            )}

            {/* TAB CONTENT PANELS */}
            <div className="p-5 sm:p-6">
                {/* ========================================================================= */}
                {/* 1. KONTEN TEKS & NARASI                                                  */}
                {/* ========================================================================= */}
                {subTab === 'content' && (
                    <div className="space-y-4">
                        {/* Section-specific custom fields if passed */}
                        {customFields && (
                            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-[#1B84FF]" />
                                    <span className="text-xs font-bold text-[#181C32] uppercase tracking-wider font-mono">
                                        Parameter Khusus Seksi Ini ({sectionName})
                                    </span>
                                </div>
                                {customFields}
                            </div>
                        )}

                        {/* Standard Universal Text Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-bold text-[#181C32] mb-1">
                                    Badge / Label Kategori Atas
                                </label>
                                <Input
                                    value={badgeText}
                                    onChange={(e) => {
                                        setVal('badge_text', e.target.value);
                                        onChange(`${secId}_badge_text`, e.target.value);
                                    }}
                                    placeholder="Contoh: STANDAR MEDIS KARS & STARKES"
                                    className="text-xs bg-white font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#181C32] mb-1">
                                    Kata Sorotan / Highlight Judul
                                </label>
                                <Input
                                    value={titleHighlight}
                                    onChange={(e) => {
                                        setVal('title_highlight', e.target.value);
                                        onChange(`${secId}_highlight`, e.target.value);
                                    }}
                                    placeholder="Kata yang diberi aksen warna cerah..."
                                    className="text-xs bg-white font-semibold text-[#1B84FF]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#181C32] mb-1">
                                Judul Utama Seksi
                            </label>
                            <Input
                                value={titleMain}
                                onChange={(e) => {
                                    setVal('title_main', e.target.value);
                                    onChange(`${secId}_headline`, e.target.value);
                                    onChange(`${secId}_title`, e.target.value);
                                }}
                                placeholder="Tuliskan judul headline seksi ini..."
                                className="text-xs bg-white font-bold text-[#181C32]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#181C32] mb-1">
                                Narasi / Sub-Judul / Deskripsi Lengkap
                            </label>
                            <Textarea
                                rows={3}
                                value={description}
                                onChange={(e) => {
                                    setVal('description', e.target.value);
                                    onChange(`${secId}_description`, e.target.value);
                                    onChange(`${secId}_subheadline`, e.target.value);
                                }}
                                placeholder="Jelaskan nilai manfaat untuk rumah sakit, dokter, dan pasien..."
                                className="text-xs bg-white leading-relaxed"
                            />
                        </div>

                        {/* CTA Buttons Text & URL */}
                        <div className="pt-4 border-t border-slate-100">
                            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3 font-mono">
                                Pengaturan Tombol Aksi (Call To Action)
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="space-y-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                                    <label className="block text-xs font-bold text-[#181C32]">
                                        Tombol Utama (CTA 1)
                                    </label>
                                    <Input
                                        value={ctaPrimaryText}
                                        onChange={(e) => {
                                            setVal('cta_primary_text', e.target.value);
                                            onChange(`${secId}_cta_primary_text`, e.target.value);
                                            onChange(`${secId}_cta_text`, e.target.value);
                                        }}
                                        placeholder="Teks Tombol Utama..."
                                        className="text-xs bg-white"
                                    />
                                    <Input
                                        value={ctaPrimaryUrl}
                                        onChange={(e) => {
                                            setVal('cta_primary_url', e.target.value);
                                            onChange(`${secId}_cta_primary_url`, e.target.value);
                                        }}
                                        placeholder="URL tujuan (misal: /jadwalkan-demo atau #demo)..."
                                        className="text-xs bg-white font-mono"
                                    />
                                </div>

                                <div className="space-y-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                                    <label className="block text-xs font-bold text-[#181C32]">
                                        Tombol Sekunder (CTA 2)
                                    </label>
                                    <Input
                                        value={ctaSecondaryText}
                                        onChange={(e) => {
                                            setVal('cta_secondary_text', e.target.value);
                                            onChange(`${secId}_cta_secondary_text`, e.target.value);
                                        }}
                                        placeholder="Teks Tombol Sekunder..."
                                        className="text-xs bg-white"
                                    />
                                    <Input
                                        value={ctaSecondaryUrl}
                                        onChange={(e) => {
                                            setVal('cta_secondary_url', e.target.value);
                                            onChange(`${secId}_cta_secondary_url`, e.target.value);
                                        }}
                                        placeholder="URL tujuan (misal: /modul-simrs)..."
                                        className="text-xs bg-white font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ========================================================================= */}
                {/* 2. WARNA, LATAR BELAKANG & KONTRAST                                       */}
                {/* ========================================================================= */}
                {subTab === 'colors' && (
                    <div className="space-y-6">
                        {/* Background Selection */}
                        <div>
                            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                Latar Belakang Seksi (Background Preset)
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                {BG_PRESETS.map((preset) => {
                                    const isSelected = bgMode === preset.id;
                                    return (
                                        <button
                                            key={preset.id}
                                            type="button"
                                            onClick={() => setVal('bg', preset.id)}
                                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                                                isSelected
                                                    ? 'border-[#1B84FF] bg-blue-50/50 ring-2 ring-[#1B84FF]/20 shadow-xs'
                                                    : 'border-slate-200 bg-white hover:bg-slate-50'
                                            }`}
                                        >
                                            <span
                                                className="w-4 h-4 rounded-full border border-slate-300 shrink-0 mt-0.5 shadow-2xs"
                                                style={{ backgroundColor: preset.hex === 'inherit' ? '#E2E8F0' : preset.hex }}
                                            />
                                            <div>
                                                <span className="text-xs font-bold text-[#181C32] block">
                                                    {preset.name}
                                                </span>
                                                <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                                                    {preset.desc}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Custom Hex Color Picker if 'custom' is selected */}
                            {bgMode === 'custom' && (
                                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={customBg || '#FFFFFF'}
                                        onChange={(e) => setVal('bg_custom', e.target.value)}
                                        className="w-9 h-9 rounded-lg border cursor-pointer"
                                    />
                                    <div className="flex-1">
                                        <label className="block text-[11px] font-bold text-slate-700">Kode Warna Hex Bebas</label>
                                        <Input
                                            value={customBg}
                                            onChange={(e) => setVal('bg_custom', e.target.value)}
                                            placeholder="#FFFFFF"
                                            className="text-xs font-mono bg-white mt-1 h-8"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Accent Color Selection */}
                        <div className="pt-4 border-t border-slate-100">
                            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                Warna Aksen Tombol, Badge &amp; Garis (Accent Color)
                            </label>
                            <div className="flex flex-wrap items-center gap-2">
                                {ACCENT_PRESETS.map((ac) => {
                                    const isSelected = accentColor.toLowerCase() === ac.hex.toLowerCase();
                                    return (
                                        <button
                                            key={ac.hex}
                                            type="button"
                                            onClick={() => setVal('accent', ac.hex)}
                                            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                                                isSelected
                                                    ? 'border-[#1B84FF] bg-blue-50 ring-2 ring-[#1B84FF]/20 shadow-xs'
                                                    : 'border-slate-200 bg-white hover:bg-slate-50'
                                            }`}
                                        >
                                            <span className="w-3.5 h-3.5 rounded-full shadow-2xs" style={{ backgroundColor: ac.hex }} />
                                            <span>{ac.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Text Contrast & Lighting Ambiance */}
                        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                    Kontras Warna Teks (Text Lighting)
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: 'auto', label: 'Otomatis' },
                                        { id: 'dark', label: 'Teks Gelap' },
                                        { id: 'light', label: 'Teks Terang' },
                                    ].map((c) => (
                                        <button
                                            key={c.id}
                                            type="button"
                                            onClick={() => setVal('contrast', c.id)}
                                            className={`p-2 rounded-xl border text-xs font-semibold text-center cursor-pointer ${
                                                contrastMode === c.id
                                                    ? 'border-[#1B84FF] bg-[#1B84FF] text-white shadow-2xs'
                                                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                            }`}
                                        >
                                            {c.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Lighting Decorators */}
                            <div>
                                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                    Efek Pencahayaan &amp; Garis
                                </label>
                                <div className="space-y-2">
                                    <div
                                        onClick={() => setVal('ambient_glow', ambientGlow ? '0' : '1')}
                                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                                            ambientGlow
                                                ? 'border-blue-300 bg-blue-50/50 text-[#1E60D5]'
                                                : 'border-slate-200 bg-white text-slate-600'
                                        }`}
                                    >
                                        <span className="text-xs font-bold">Pencahayaan Ambient Radial Glow</span>
                                        <SunMedium className="h-4 w-4" />
                                    </div>

                                    <div
                                        onClick={() => setVal('grid_lines', gridLines ? '0' : '1')}
                                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                                            gridLines
                                                ? 'border-blue-300 bg-blue-50/50 text-[#1E60D5]'
                                                : 'border-slate-200 bg-white text-slate-600'
                                        }`}
                                    >
                                        <span className="text-xs font-bold">Tekstur Garis Kisi Medis (Grid)</span>
                                        <Sparkles className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ========================================================================= */}
                {/* 3. BENTUK TAMPILAN & TATA LETAK                                           */}
                {/* ========================================================================= */}
                {subTab === 'layout' && (
                    <div className="space-y-6">
                        {/* Layout Variation */}
                        <div>
                            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                Gaya Tata Letak Seksi (Layout Variant)
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                {LAYOUT_PRESETS.map((lay) => {
                                    const isSelected = layout === lay.id;
                                    return (
                                        <button
                                            key={lay.id}
                                            type="button"
                                            onClick={() => setVal('layout', lay.id)}
                                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                                                isSelected
                                                    ? 'border-[#1B84FF] bg-blue-50/60 ring-2 ring-[#1B84FF]/20 shadow-xs'
                                                    : 'border-slate-200 bg-white hover:bg-slate-50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-[#181C32]">{lay.name}</span>
                                                {isSelected && <CheckCircle2 className="h-4 w-4 text-[#1B84FF]" />}
                                            </div>
                                            <span className="text-[10px] text-slate-500 mt-1 block">
                                                {lay.desc}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Spacing & Radius */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                            {/* Vertical Spacing / Padding */}
                            <div>
                                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                    Kerapatan Jarak Vertikal (Padding)
                                </label>
                                <div className="space-y-2">
                                    {PADDING_PRESETS.map((pad) => {
                                        const isSelected = padding === pad.id;
                                        return (
                                            <button
                                                key={pad.id}
                                                type="button"
                                                onClick={() => setVal('padding', pad.id)}
                                                className={`w-full p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                                                    isSelected
                                                        ? 'border-[#1B84FF] bg-blue-50/50'
                                                        : 'border-slate-200 bg-white hover:bg-slate-50'
                                                }`}
                                            >
                                                <span className="text-xs font-semibold text-[#181C32]">{pad.name}</span>
                                                <Badge variant="outline" className="text-[10px] font-mono">
                                                    {pad.class}
                                                </Badge>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Corner Radius */}
                            <div>
                                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                    Kelengkungan Sudut (Border Radius)
                                </label>
                                <div className="space-y-2">
                                    {RADIUS_PRESETS.map((rad) => {
                                        const isSelected = radius === rad.id;
                                        return (
                                            <button
                                                key={rad.id}
                                                type="button"
                                                onClick={() => setVal('radius', rad.id)}
                                                className={`w-full p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                                                    isSelected
                                                        ? 'border-[#1B84FF] bg-blue-50/50'
                                                        : 'border-slate-200 bg-white hover:bg-slate-50'
                                                }`}
                                            >
                                                <span className="text-xs font-semibold text-[#181C32]">{rad.name}</span>
                                                <div className={`w-6 h-6 border-2 border-slate-400 bg-slate-100 ${rad.class}`} />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Border & Shadow Effect */}
                        <div className="pt-4 border-t border-slate-100">
                            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                Garis Tepi &amp; Efek Bayangan (Border &amp; Shadow)
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                {BORDER_PRESETS.map((bor) => {
                                    const isSelected = border === bor.id;
                                    return (
                                        <button
                                            key={bor.id}
                                            type="button"
                                            onClick={() => setVal('border', bor.id)}
                                            className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                                                isSelected
                                                    ? 'border-[#1B84FF] bg-blue-50/50 ring-2 ring-[#1B84FF]/20 shadow-xs'
                                                    : 'border-slate-200 bg-white hover:bg-slate-50'
                                            }`}
                                        >
                                            <span className="text-xs font-bold text-[#181C32] block">{bor.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* ========================================================================= */}
                {/* 4. UPLOAD FOTO, TATA LETAK FOTO & MULTI-FOTO / GALERI                      */}
                {/* ========================================================================= */}
                {subTab === 'media' && (
                    <div className="space-y-6">
                        {/* Information Banner */}
                        <div className="bg-[#F1FAFF] p-4 rounded-xl border border-blue-200 space-y-1">
                            <span className="text-xs font-bold text-[#1E60D5] flex items-center gap-1.5">
                                <Sparkles className="h-4 w-4" />
                                Studio Manajemen Foto &amp; Tata Letak Visual (Auto-WebP)
                            </span>
                            <p className="text-[11px] text-slate-600">
                                Anda dapat mengatur posisi tata letak foto (Kiri, Kanan, Atas, Bawah, Cover Latar), ukuran lebar, gaya bingkai, serta <strong>menambahkan foto baru (multi-foto / galeri)</strong> dengan konversi otomatis ke format WebP ringan.
                            </p>
                        </div>

                        {/* 1. TATA LETAK & POSISI FOTO */}
                        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
                            <div className="flex items-center gap-2">
                                <Columns className="h-4 w-4 text-[#1B84FF]" />
                                <label className="text-xs font-bold text-[#181C32] uppercase tracking-wider font-mono">
                                    A. Tata Letak &amp; Posisi Penempatan Foto
                                </label>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                {IMAGE_POSITION_PRESETS.map((pos) => {
                                    const isSelected = imagePosition === pos.id;
                                    return (
                                        <button
                                            key={pos.id}
                                            type="button"
                                            onClick={() => setVal('image_position', pos.id)}
                                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                                                isSelected
                                                    ? 'border-[#1B84FF] bg-blue-50/70 ring-2 ring-[#1B84FF]/20 shadow-xs'
                                                    : 'border-slate-200 bg-white hover:bg-slate-50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-[#181C32]">{pos.name}</span>
                                                {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-[#1B84FF]" />}
                                            </div>
                                            <span className="text-[10px] text-slate-500 mt-1 block">
                                                {pos.desc}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Width & Fit Controls */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200/80">
                                <div>
                                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                        Proporsi Lebar Kolom Foto (Image Width)
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {IMAGE_WIDTH_PRESETS.map((w) => (
                                            <button
                                                key={w.id}
                                                type="button"
                                                onClick={() => setVal('image_width', w.id)}
                                                className={`p-2.5 rounded-xl border text-left text-xs font-semibold cursor-pointer ${
                                                    imageWidth === w.id
                                                        ? 'border-[#1B84FF] bg-[#1B84FF] text-white shadow-2xs'
                                                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                <span className="block font-bold">{w.name}</span>
                                                <span className={`text-[9px] block ${imageWidth === w.id ? 'text-blue-100' : 'text-slate-400'}`}>
                                                    {w.desc}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                        Pengepasan Objek Gambar (Object Fit)
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { id: 'cover', label: 'Cover (Penuhi Frame)', desc: 'Crop rapi memenuhi bingkai' },
                                            { id: 'contain', label: 'Contain (Proporsional)', desc: 'Gambar utuh tanpa terpotong' },
                                        ].map((fit) => (
                                            <button
                                                key={fit.id}
                                                type="button"
                                                onClick={() => setVal('image_fit', fit.id)}
                                                className={`p-2.5 rounded-xl border text-left text-xs font-semibold cursor-pointer ${
                                                    imageFit === fit.id
                                                        ? 'border-[#1B84FF] bg-[#1B84FF] text-white shadow-2xs'
                                                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                <span className="block font-bold">{fit.label}</span>
                                                <span className={`text-[9px] block ${imageFit === fit.id ? 'text-blue-100' : 'text-slate-400'}`}>
                                                    {fit.desc}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Aspect Ratio & Frame Style */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200/80">
                                <div>
                                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                        Rasio Aspek Foto (Aspect Ratio)
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { id: '16/9', label: '16:9 Lanskap' },
                                            { id: '4/3', label: '4:3 Standar Medis' },
                                            { id: '1/1', label: '1:1 Persegi' },
                                            { id: 'auto', label: 'Auto (Proporsional)' },
                                        ].map((asp) => (
                                            <button
                                                key={asp.id}
                                                type="button"
                                                onClick={() => setVal('image_aspect', asp.id)}
                                                className={`p-2 rounded-xl border text-xs font-semibold text-center cursor-pointer ${
                                                    imageAspect === asp.id
                                                        ? 'border-[#1B84FF] bg-[#1B84FF] text-white shadow-2xs'
                                                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                {asp.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                        Gaya Bingkai Foto (Frame Style)
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { id: 'rounded', label: 'Lengkung Elegan' },
                                            { id: 'mockup', label: 'Mockup Monitor' },
                                            { id: 'glow', label: 'Pendar Aksen' },
                                            { id: 'circle', label: 'Melingkar Bulat' },
                                        ].map((sty) => (
                                            <button
                                                key={sty.id}
                                                type="button"
                                                onClick={() => setVal('image_style', sty.id)}
                                                className={`p-2 rounded-xl border text-xs font-semibold text-center cursor-pointer ${
                                                    imageStyle === sty.id
                                                        ? 'border-[#1B84FF] bg-[#1B84FF] text-white shadow-2xs'
                                                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                {sty.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. FOTO UTAMA SEKSI */}
                        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-bold text-[#181C32] uppercase tracking-wider font-mono">
                                    B. Foto Utama Seksi (Main Visual)
                                </label>
                                {imageUrl && (
                                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                                        Aktif Terpasang
                                    </Badge>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                                <Input
                                    value={imageUrl}
                                    onChange={(e) => setVal('image_url', e.target.value)}
                                    placeholder="Tempel URL foto atau klik tombol upload di samping..."
                                    className="text-xs font-mono bg-white flex-1"
                                />
                                <WebpUploadButton
                                    value={imageUrl}
                                    onUploadSuccess={(url) => setVal('image_url', url)}
                                    label="Upload Foto Utama (WebP)"
                                />
                            </div>

                            {/* Thumbnail Preview if exists */}
                            {imageUrl && (
                                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={imageUrl}
                                            alt="Preview Foto Utama"
                                            className="w-16 h-12 object-cover rounded-lg border border-slate-200 shadow-2xs"
                                        />
                                        <div>
                                            <span className="text-xs font-bold text-slate-800 block truncate max-w-xs">
                                                {imageUrl.split('/').pop()}
                                            </span>
                                            <span className="text-[10px] text-emerald-600 font-mono flex items-center gap-1">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Format WebP Ringan ({imageAspect})
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setVal('image_url', '')}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 cursor-pointer"
                                        title="Hapus Foto Utama"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 3. MULTI-FOTO / GALERI KOLEKSI FOTO */}
                        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <label className="block text-xs font-bold text-[#181C32] uppercase tracking-wider font-mono">
                                            C. Tambah Foto Tambahan / Galeri Koleksi ({galleryImages.length} Foto)
                                        </label>
                                    </div>
                                    <p className="text-[11px] text-slate-500 mt-0.5">
                                        Tambahkan beberapa foto sekaligus untuk menampilkan galeri fasilitas RS, modul, atau sertifikasi.
                                    </p>
                                </div>

                                <Button
                                    type="button"
                                    onClick={handleAddGalleryImage}
                                    className="px-3.5 py-1.5 bg-[#1B84FF] hover:bg-[#1670DB] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    <span>Tambah Foto Baru</span>
                                </Button>
                            </div>

                            {/* Gallery Column Selector if images > 0 */}
                            {galleryImages.length > 0 && (
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                    <span className="text-xs font-bold text-slate-700">Tampilan Grid Galeri:</span>
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        {GALLERY_COLUMNS_PRESETS.map((col) => (
                                            <button
                                                key={col.id}
                                                type="button"
                                                onClick={() => setVal('gallery_columns', col.id)}
                                                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer border ${
                                                    galleryColumns === col.id
                                                        ? 'bg-[#1B84FF] text-white border-[#1B84FF] shadow-2xs'
                                                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                                                }`}
                                            >
                                                {col.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* List of Added Photos */}
                            {galleryImages.length === 0 ? (
                                <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center space-y-2">
                                    <ImageIcon className="h-8 w-8 text-slate-300 mx-auto" />
                                    <p className="text-xs text-slate-500">
                                        Belum ada foto tambahan di galeri seksi ini.
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAddGalleryImage}
                                        className="text-xs text-[#1B84FF] border-blue-200 hover:bg-blue-50 cursor-pointer"
                                    >
                                        <Plus className="h-3.5 w-3.5 mr-1" />
                                        Tambah Foto Pertama
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {galleryImages.map((img, idx) => (
                                        <div
                                            key={img.id || idx}
                                            className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-slate-700 font-mono">
                                                    Foto #{idx + 1}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveGalleryImage(idx)}
                                                    className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer p-1 rounded hover:bg-red-50"
                                                    title="Hapus foto ini"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    <span>Hapus</span>
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                                                {/* Thumbnail preview */}
                                                <div className="sm:col-span-3">
                                                    {img.url ? (
                                                        <img
                                                            src={img.url}
                                                            alt={img.title || `Foto ${idx + 1}`}
                                                            className="w-full h-20 object-cover rounded-lg border border-slate-200 shadow-2xs"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-20 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs font-mono">
                                                            Pilih Foto
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Upload & Fields */}
                                                <div className="sm:col-span-9 space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            value={img.url}
                                                            onChange={(e) => handleUpdateGalleryImage(idx, 'url', e.target.value)}
                                                            placeholder="URL foto WebP..."
                                                            className="text-xs font-mono bg-white flex-1 h-8"
                                                        />
                                                        <WebpUploadButton
                                                            value={img.url}
                                                            onUploadSuccess={(url) => handleUpdateGalleryImage(idx, 'url', url)}
                                                            label="Upload (WebP)"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        <Input
                                                            value={img.title || ''}
                                                            onChange={(e) => handleUpdateGalleryImage(idx, 'title', e.target.value)}
                                                            placeholder="Judul foto (opsional)..."
                                                            className="text-xs bg-white h-8"
                                                        />
                                                        <Input
                                                            value={img.caption || ''}
                                                            onChange={(e) => handleUpdateGalleryImage(idx, 'caption', e.target.value)}
                                                            placeholder="Keterangan / Caption..."
                                                            className="text-xs bg-white h-8"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ========================================================================= */}
                {/* 5. TOMBOL, VISIBILITAS & ELEMEN PENDUKUNG                                 */}
                {/* ========================================================================= */}
                {subTab === 'visibility' && (
                    <div className="space-y-5">
                        {/* Visibility Toggles */}
                        <div>
                            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                Tampilkan / Sembunyikan Elemen di Seksi Ini
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { key: 'show_badge', label: 'Tampilkan Pill Badge', current: showBadge },
                                    { key: 'show_image', label: 'Tampilkan Foto/Media', current: showImage },
                                    { key: 'show_cta', label: 'Tampilkan Tombol CTA', current: showCta },
                                ].map((tog) => (
                                    <div
                                        key={tog.key}
                                        onClick={() => setVal(tog.key, tog.current ? '0' : '1')}
                                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                                            tog.current
                                                ? 'border-emerald-300 bg-emerald-50/50 text-emerald-800'
                                                : 'border-slate-200 bg-slate-50 text-slate-500'
                                        }`}
                                    >
                                        <span className="text-xs font-bold">{tog.label}</span>
                                        {tog.current ? (
                                            <Eye className="h-4 w-4 text-emerald-600" />
                                        ) : (
                                            <EyeOff className="h-4 w-4 text-slate-400" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Style Customization */}
                        <div className="pt-4 border-t border-slate-100">
                            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                Gaya Visual Tombol Aksi Utama (CTA Button Style)
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                {[
                                    { id: 'solid', label: 'Biru Medis Solid', class: 'bg-[#1B84FF] text-white' },
                                    { id: 'amber-warm', label: 'Oranye Berpijar', class: 'bg-[#F97316] text-white' },
                                    { id: 'outline', label: 'Garis Tepi Outline', class: 'border-2 border-[#1B84FF] text-[#1B84FF]' },
                                    { id: 'whatsapp', label: 'WhatsApp Hijau', class: 'bg-[#25D366] text-white' },
                                ].map((btn) => {
                                    const isSelected = ctaStyle === btn.id;
                                    return (
                                        <button
                                            key={btn.id}
                                            type="button"
                                            onClick={() => setVal('cta_style', btn.id)}
                                            className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                                                isSelected
                                                    ? 'border-[#1B84FF] bg-blue-50/60 ring-2 ring-[#1B84FF]/20 shadow-xs'
                                                    : 'border-slate-200 bg-white hover:bg-slate-50'
                                            }`}
                                        >
                                            <span className="text-xs font-bold text-[#181C32] block mb-1.5">{btn.label}</span>
                                            <div className={`py-1 px-2 text-[10px] font-bold rounded-full ${btn.class}`}>
                                                Contoh Tombol
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* ========================================================================= */}
                {/* 6. DEDICATED LIVE PREVIEW TAB                                             */}
                {/* ========================================================================= */}
                {subTab === 'preview' && (
                    <div className="space-y-4">
                        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                            <div>
                                <span className="text-xs font-bold text-slate-800 block">
                                    Pratinjau Interaktif Seksi: {sectionName || secId}
                                </span>
                                <span className="text-[11px] text-slate-500">
                                    Setiap ketikan dan perubahan warna/foto di tab lain langsung ter-update di sini secara seketika.
                                </span>
                            </div>
                        </div>

                        <SectionLivePreview
                            pageId={pageId}
                            secId={secId}
                            sectionName={sectionName}
                            settingsMap={settingsMap}
                            showDeviceToolbar={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
