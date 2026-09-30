import React, { useState } from 'react';
import WebpUploadButton from '../WebpUploadButton';
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
    SunMedium
} from 'lucide-react';

export default function SectionComprehensiveEditor({
    pageId,
    secId,
    sectionName = '',
    settingsMap = {},
    onChange,
    customFields = null,
}) {
    // Active sub-tab inside section editor: 'content', 'colors', 'layout', 'media', 'visibility'
    const [subTab, setSubTab] = useState('content');

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
    const imageUrl = getVal('image_url', '');
    const imageAspect = getVal('image_aspect', '16/9');
    const imageStyle = getVal('image_style', 'rounded');
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

    return (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            {/* Sub-Tab Navigation Header */}
            <div className="bg-[#F8FAFC] border-b border-slate-200/80 p-2 sm:p-2.5 flex flex-wrap items-center gap-1.5">
                {[
                    { id: 'content', label: '1. Konten Teks', icon: Type, color: 'text-blue-600' },
                    { id: 'colors', label: '2. Warna & Latar', icon: Palette, color: 'text-purple-600' },
                    { id: 'layout', label: '3. Bentuk & Layout', icon: Layout, color: 'text-emerald-600' },
                    { id: 'media', label: '4. Upload Foto (WebP)', icon: ImageIcon, color: 'text-amber-600' },
                    { id: 'visibility', label: '5. Tombol & Elemen', icon: Sliders, color: 'text-slate-600' },
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
                                    ? 'bg-white text-[#181C32] shadow-2xs border border-slate-200'
                                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                            }`}
                        >
                            <Icon className={`h-3.5 w-3.5 ${tab.color}`} />
                            <span>{tab.label}</span>
                            {tab.id === 'media' && imageUrl && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            )}
                        </button>
                    );
                })}
            </div>

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
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Teks Pill Badge Atas
                                </label>
                                <Input
                                    value={badgeText}
                                    onChange={(e) => {
                                        setVal('badge_text', e.target.value);
                                        // Also sync with legacy key if exists
                                        if (settingsMap[`${secId}_badge_text`] !== undefined) {
                                            onChange(`${secId}_badge_text`, e.target.value);
                                        }
                                    }}
                                    placeholder="Contoh: STANDAR AKREDITASI KARS • PERMENKES 24/2022"
                                    className="text-xs bg-slate-50/50"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Kata Highlight Aksen (Berwarna)
                                </label>
                                <Input
                                    value={titleHighlight}
                                    onChange={(e) => {
                                        setVal('title_highlight', e.target.value);
                                        if (settingsMap[`${secId}_highlight`] !== undefined) {
                                            onChange(`${secId}_highlight`, e.target.value);
                                        }
                                    }}
                                    placeholder="Contoh: Lebih Cepat, Terintegrasi"
                                    className="text-xs bg-slate-50/50 font-bold"
                                    style={{ color: accentColor }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Judul Utama / Headline Seksi
                            </label>
                            <Input
                                value={titleMain}
                                onChange={(e) => {
                                    setVal('title_main', e.target.value);
                                    if (settingsMap[`${secId}_headline`] !== undefined) {
                                        onChange(`${secId}_headline`, e.target.value);
                                    } else if (settingsMap[`${secId}_title`] !== undefined) {
                                        onChange(`${secId}_title`, e.target.value);
                                    }
                                }}
                                placeholder="Tuliskan judul utama seksi ini..."
                                className="text-xs font-bold text-[#181C32] bg-slate-50/50"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Paragraf Deskripsi / Penjelasan Seksi
                            </label>
                            <Textarea
                                rows={3}
                                value={description}
                                onChange={(e) => {
                                    setVal('description', e.target.value);
                                    if (settingsMap[`${secId}_description`] !== undefined) {
                                        onChange(`${secId}_description`, e.target.value);
                                    } else if (settingsMap[`${secId}_subheadline`] !== undefined) {
                                        onChange(`${secId}_subheadline`, e.target.value);
                                    }
                                }}
                                placeholder="Jelaskan value proposition atau alur layanan di seksi ini..."
                                className="text-xs bg-slate-50/50 leading-relaxed"
                            />
                        </div>

                        {/* CTA Buttons Input */}
                        <div className="pt-2 border-t border-slate-100">
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3 font-mono">
                                Tombol Aksi Seksi (Call to Action)
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="space-y-2 p-3 bg-slate-50/70 rounded-xl border border-slate-200/70">
                                    <span className="text-[11px] font-bold text-blue-700 block">Tombol Aksi Utama (Button 1)</span>
                                    <Input
                                        value={ctaPrimaryText}
                                        onChange={(e) => {
                                            setVal('cta_primary_text', e.target.value);
                                            if (settingsMap[`${secId}_cta_primary_text`] !== undefined) {
                                                onChange(`${secId}_cta_primary_text`, e.target.value);
                                            } else if (settingsMap[`${secId}_cta_text`] !== undefined) {
                                                onChange(`${secId}_cta_text`, e.target.value);
                                            }
                                        }}
                                        placeholder="Teks: Jadwalkan Demo RS"
                                        className="text-xs bg-white"
                                    />
                                    <Input
                                        value={ctaPrimaryUrl}
                                        onChange={(e) => setVal('cta_primary_url', e.target.value)}
                                        placeholder="Link / Action: /jadwalkan-demo atau #modal-demo"
                                        className="text-xs bg-white font-mono"
                                    />
                                </div>

                                <div className="space-y-2 p-3 bg-slate-50/70 rounded-xl border border-slate-200/70">
                                    <span className="text-[11px] font-bold text-slate-700 block">Tombol Aksi Sekunder (Button 2 - Opsional)</span>
                                    <Input
                                        value={ctaSecondaryText}
                                        onChange={(e) => {
                                            setVal('cta_secondary_text', e.target.value);
                                            if (settingsMap[`${secId}_cta_secondary_text`] !== undefined) {
                                                onChange(`${secId}_cta_secondary_text`, e.target.value);
                                            }
                                        }}
                                        placeholder="Teks: Lihat Katalog Modul"
                                        className="text-xs bg-white"
                                    />
                                    <Input
                                        value={ctaSecondaryUrl}
                                        onChange={(e) => setVal('cta_secondary_url', e.target.value)}
                                        placeholder="Link: /modul-simrs"
                                        className="text-xs bg-white font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ========================================================================= */}
                {/* 2. WARNA & LATAR BELAKANG                                                 */}
                {/* ========================================================================= */}
                {subTab === 'colors' && (
                    <div className="space-y-6">
                        {/* Background Presets */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                                    Warna Latar Belakang Seksi (Background Color)
                                </label>
                                <span className="text-[11px] text-slate-500">
                                    Mode aktif: <strong>{bgMode}</strong>
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                                {BG_PRESETS.map((p) => {
                                    const isSelected = bgMode === p.id;
                                    return (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => setVal('bg', p.id)}
                                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                                                isSelected
                                                    ? 'border-[#1B84FF] bg-blue-50/60 ring-2 ring-[#1B84FF]/20 shadow-xs'
                                                    : 'border-slate-200 bg-white hover:bg-slate-50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span
                                                    className="w-5 h-5 rounded-full border border-slate-300 shadow-2xs shrink-0"
                                                    style={{ backgroundColor: p.hex === 'inherit' ? '#e2e8f0' : p.hex }}
                                                />
                                                {isSelected && <CheckCircle2 className="h-4 w-4 text-[#1B84FF]" />}
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-[#181C32] block leading-tight">
                                                    {p.name}
                                                </span>
                                                <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                                                    {p.desc}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Custom Hex Picker if mode is 'custom' */}
                            {bgMode === 'custom' && (
                                <div className="mt-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={customBg || '#FFFFFF'}
                                        onChange={(e) => setVal('bg_custom', e.target.value)}
                                        className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300"
                                    />
                                    <div className="flex-1">
                                        <label className="block text-[11px] font-semibold text-slate-700">Kode Warna Hex Custom</label>
                                        <Input
                                            value={customBg || '#FFFFFF'}
                                            onChange={(e) => setVal('bg_custom', e.target.value)}
                                            placeholder="#FFFFFF"
                                            className="text-xs font-mono bg-white mt-1"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Accent Color Palette */}
                        <div className="pt-4 border-t border-slate-100">
                            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                Warna Aksen / Highlight Seksi (Accent Color)
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                                {ACCENT_PRESETS.map((acc) => {
                                    const isSelected = accentColor === acc.hex;
                                    return (
                                        <button
                                            key={acc.id}
                                            type="button"
                                            onClick={() => setVal('accent', acc.hex)}
                                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-2 ${
                                                isSelected
                                                    ? 'border-[#1B84FF] bg-blue-50/50 shadow-2xs'
                                                    : 'border-slate-200 bg-white hover:bg-slate-50'
                                            }`}
                                        >
                                            <span
                                                className="w-4 h-4 rounded-full shrink-0 shadow-2xs"
                                                style={{ backgroundColor: acc.hex }}
                                            />
                                            <span className="text-xs font-semibold text-[#181C32] truncate">
                                                {acc.name.split(' ')[0]}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Text Contrast & Lighting Decorators */}
                        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                    Kontras Teks (Text Contrast)
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: 'auto', label: 'Otomatis' },
                                        { id: 'dark', label: 'Teks Gelap' },
                                        { id: 'light', label: 'Teks Putih' },
                                    ].map((c) => (
                                        <button
                                            key={c.id}
                                            type="button"
                                            onClick={() => setVal('contrast', c.id)}
                                            className={`p-2 rounded-lg border text-xs font-medium text-center cursor-pointer ${
                                                contrastMode === c.id
                                                    ? 'border-[#1B84FF] bg-[#1B84FF] text-white'
                                                    : 'border-slate-200 bg-white text-slate-700'
                                            }`}
                                        >
                                            {c.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                    Pendar Cahaya Medis (Ambient Light)
                                </label>
                                <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-xl border border-slate-200">
                                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                                        <input
                                            type="checkbox"
                                            checked={ambientGlow}
                                            onChange={(e) => setVal('ambient_glow', e.target.checked ? '1' : '0')}
                                            className="rounded text-[#1B84FF]"
                                        />
                                        <span>Aktifkan Ambient Radial Glow</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                                        <input
                                            type="checkbox"
                                            checked={gridLines}
                                            onChange={(e) => setVal('grid_lines', e.target.checked ? '1' : '0')}
                                            className="rounded text-[#1B84FF]"
                                        />
                                        <span>Tekstur Grid Klinis</span>
                                    </label>
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
                {/* 4. UPLOAD FOTO & PENGATURAN MEDIA                                         */}
                {/* ========================================================================= */}
                {subTab === 'media' && (
                    <div className="space-y-5">
                        <div className="bg-[#F1FAFF] p-4 rounded-xl border border-blue-200 space-y-1">
                            <span className="text-xs font-bold text-[#1E60D5] flex items-center gap-1.5">
                                <Sparkles className="h-4 w-4" />
                                Auto-Convert ke Format Ringan WebP
                            </span>
                            <p className="text-[11px] text-slate-600">
                                Gambar yang diunggah otomatis dioptimalkan dan dikonversi menjadi format <strong>.webp</strong> berkualitas 85% untuk kecepatan loading website super cepat dan hemat kuota data faskes.
                            </p>
                        </div>

                        {/* Direct Upload & URL Input */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                            <label className="block text-xs font-bold text-[#181C32]">
                                File Gambar / Foto Seksi
                            </label>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                                <Input
                                    value={imageUrl}
                                    onChange={(e) => setVal('image_url', e.target.value)}
                                    placeholder="Tempel URL gambar atau klik tombol upload di kanan..."
                                    className="text-xs font-mono bg-white flex-1"
                                />
                                <WebpUploadButton
                                    value={imageUrl}
                                    onUploadSuccess={(url) => setVal('image_url', url)}
                                    label="Upload &amp; Jadikan WebP"
                                />
                            </div>

                            {/* Thumbnail Preview if exists */}
                            {imageUrl && (
                                <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={imageUrl}
                                            alt="Preview"
                                            className="w-16 h-12 object-cover rounded-lg border border-slate-200 shadow-2xs"
                                        />
                                        <div>
                                            <span className="text-xs font-bold text-slate-800 block truncate max-w-xs">
                                                {imageUrl.split('/').pop()}
                                            </span>
                                            <span className="text-[10px] text-emerald-600 font-mono flex items-center gap-1">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Terkoneksi ke Seksi ({imageAspect})
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setVal('image_url', '')}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 cursor-pointer"
                                        title="Hapus Gambar"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Image Aspect Ratio & Frame Style */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Aspect Ratio */}
                            <div>
                                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 font-mono">
                                    Rasio Aspek Gambar (Aspect Ratio)
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { id: '16/9', label: '16:9 Widescreen' },
                                        { id: '4/3', label: '4:3 Standar Medis' },
                                        { id: '1/1', label: '1:1 Persegi' },
                                        { id: 'auto', label: 'Auto (Proporsional)' },
                                    ].map((asp) => (
                                        <button
                                            key={asp.id}
                                            type="button"
                                            onClick={() => setVal('image_aspect', asp.id)}
                                            className={`p-2.5 rounded-xl border text-xs font-semibold text-center cursor-pointer ${
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

                            {/* Frame & Effect */}
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
                                            className={`p-2.5 rounded-xl border text-xs font-semibold text-center cursor-pointer ${
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
            </div>
        </div>
    );
}
