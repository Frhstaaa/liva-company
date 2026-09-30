import React, { useState } from 'react';
import { getSectionCustomStyles } from '../../lib/sectionStyler';
import { 
    Monitor, 
    Tablet, 
    Smartphone, 
    Sparkles, 
    ArrowRight, 
    CheckCircle2, 
    ImageIcon, 
    ExternalLink,
    Layers,
    Sliders,
    Maximize2
} from 'lucide-react';

export default function SectionLivePreview({
    pageId,
    secId,
    sectionName = '',
    settingsMap = {},
    showDeviceToolbar = true,
    initialDevice = 'desktop',
    className = '',
}) {
    const [device, setDevice] = useState(initialDevice);

    const styles = getSectionCustomStyles(settingsMap, pageId, secId, {
        title: settingsMap[`${secId}_headline`] || settingsMap[`${secId}_title`] || 'Judul Konten Seksi Liva SIMRS',
        badge: settingsMap[`${secId}_badge_text`] || 'STANDAR MEDIS & REGULASI',
        description: settingsMap[`${secId}_description`] || settingsMap[`${secId}_subheadline`] || 'Deskripsi konten yang menjelaskan nilai klinis dan operasional untuk rumah sakit secara komprehensif.',
        ctaPrimaryText: 'Pelajari Selengkapnya',
        ctaSecondaryText: 'Hubungi Tim Medis',
    });

    // Device container width
    const deviceWidthClass = {
        desktop: 'w-full',
        tablet: 'w-full max-w-[768px] mx-auto',
        mobile: 'w-full max-w-[390px] mx-auto',
    }[device] || 'w-full';

    // Highlight text parser
    const renderTitleWithHighlight = () => {
        if (!styles.highlight) {
            return styles.title || 'Judul Seksi';
        }
        const fullTitle = styles.title || '';
        const idx = fullTitle.toLowerCase().indexOf(styles.highlight.toLowerCase());
        if (idx === -1) {
            return (
                <>
                    {fullTitle}{' '}
                    <span style={{ color: styles.accentColor }} className="underline decoration-wavy decoration-2">
                        {styles.highlight}
                    </span>
                </>
            );
        }
        const before = fullTitle.substring(0, idx);
        const highlighted = fullTitle.substring(idx, idx + styles.highlight.length);
        const after = fullTitle.substring(idx + styles.highlight.length);

        return (
            <>
                {before}
                <span style={{ color: styles.accentColor }} className="font-extrabold">
                    {highlighted}
                </span>
                {after}
            </>
        );
    };

    // Render media element
    const renderMedia = () => {
        if (!styles.showImage) return null;

        // If gallery multi-photo
        if (styles.galleryImages && styles.galleryImages.length > 0) {
            const colsClass = {
                '2': 'grid grid-cols-1 sm:grid-cols-2 gap-3',
                '3': 'grid grid-cols-1 sm:grid-cols-3 gap-3',
                '4': 'grid grid-cols-2 sm:grid-cols-4 gap-2',
                'carousel': 'flex gap-3 overflow-x-auto pb-2 snap-x',
            }[styles.galleryColumns] || 'grid grid-cols-1 sm:grid-cols-3 gap-3';

            return (
                <div className="space-y-2 w-full">
                    <div className={colsClass}>
                        {styles.galleryImages.map((img, i) => (
                            <div
                                key={img.id || i}
                                className={`group relative ${styles.radiusClass} overflow-hidden border border-slate-200/80 bg-slate-100 shadow-xs transition-all ${
                                    styles.galleryColumns === 'carousel' ? 'shrink-0 w-48 sm:w-56 snap-start' : ''
                                }`}
                            >
                                <div className={`w-full overflow-hidden ${styles.imageAspectClass}`}>
                                    <img
                                        src={img.url}
                                        alt={img.title || `Foto ${i + 1}`}
                                        className={`w-full h-full object-${styles.imageFit || 'cover'}`}
                                    />
                                </div>
                                {(img.title || img.caption) && (
                                    <div className="p-2 bg-white border-t border-slate-100 text-left">
                                        {img.title && (
                                            <p className="text-[11px] font-bold text-slate-800 truncate">{img.title}</p>
                                        )}
                                        {img.caption && (
                                            <p className="text-[10px] text-slate-500 truncate">{img.caption}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Single main photo
        if (styles.imageUrl) {
            return (
                <div className="w-full">
                    <div className={`${styles.imageStyleClass} overflow-hidden`}>
                        <img
                            src={styles.imageUrl}
                            alt="Visual Seksi"
                            className={`w-full h-full object-${styles.imageFit || 'cover'} ${styles.imageAspectClass}`}
                        />
                    </div>
                </div>
            );
        }

        // Fallback placeholder card if no photo uploaded
        return (
            <div className={`p-8 border-2 border-dashed border-slate-300 ${styles.radiusClass} bg-slate-50/70 text-center flex flex-col items-center justify-center gap-2`}>
                <ImageIcon className="h-8 w-8 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600">Foto belum diunggah</span>
                <span className="text-[10px] text-slate-400">Gunakan Tab 4 "Upload Foto" untuk menambah foto WebP</span>
            </div>
        );
    };

    // Calculate grid spans based on imageWidth
    const getGridSpans = () => {
        switch (styles.imageWidth) {
            case 'compact':
                return { textSpan: 'sm:col-span-8', mediaSpan: 'sm:col-span-4' };
            case 'prominent':
                return { textSpan: 'sm:col-span-5', mediaSpan: 'sm:col-span-7' };
            case 'full':
                return { textSpan: 'sm:col-span-12', mediaSpan: 'sm:col-span-12' };
            case 'balanced':
            default:
                return { textSpan: 'sm:col-span-6', mediaSpan: 'sm:col-span-6' };
        }
    };

    // Text & CTA content block
    const renderNarrative = () => (
        <div className={`space-y-4 ${styles.layout === 'centered' ? 'text-center max-w-2xl mx-auto' : 'text-left'}`}>
            {/* Badge */}
            {styles.showBadge && (
                <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold shadow-2xs"
                    style={{
                        backgroundColor: `${styles.accentColor}18`,
                        color: styles.accentColor,
                        borderColor: `${styles.accentColor}40`,
                        borderWidth: 1,
                    }}
                >
                    <Sparkles className="h-3 w-3" />
                    <span>{styles.badge}</span>
                </div>
            )}

            {/* Headline */}
            <h3 className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-display leading-tight ${styles.titleTextClass}`}>
                {renderTitleWithHighlight()}
            </h3>

            {/* Subtitle / Description */}
            <p className={`text-xs sm:text-sm leading-relaxed ${styles.bodyTextClass}`}>
                {styles.description}
            </p>

            {/* CTA Buttons */}
            {(styles.showCta || styles.showSecondaryCta) && (
                <div className={`flex flex-wrap items-center gap-3 pt-2 ${styles.layout === 'centered' ? 'justify-center' : 'justify-start'}`}>
                    {styles.showCta && (
                        <button
                            type="button"
                            className={styles.ctaClass}
                            style={styles.ctaClass.includes('btn-amber-warm') ? {} : { backgroundColor: styles.accentColor }}
                        >
                            <span>{styles.ctaPrimaryText || 'Aksi Utama'}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    )}
                    {styles.showSecondaryCta && (
                        <button
                            type="button"
                            className="px-5 py-2.5 rounded-full border border-slate-300 bg-white/90 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-2xs"
                        >
                            <span>{styles.ctaSecondaryText || 'Aksi Sekunder'}</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );

    const renderLayoutBody = () => {
        const { textSpan, mediaSpan } = getGridSpans();
        const hasMedia = (styles.imageUrl || (styles.galleryImages && styles.galleryImages.length > 0)) && styles.showImage;

        // Position: Top
        if (hasMedia && styles.imagePosition === 'top') {
            return (
                <div className="space-y-6">
                    {renderMedia()}
                    {renderNarrative()}
                </div>
            );
        }

        // Position: Bottom
        if (hasMedia && styles.imagePosition === 'bottom') {
            return (
                <div className="space-y-6">
                    {renderNarrative()}
                    {renderMedia()}
                </div>
            );
        }

        // Position: Side Left
        if (hasMedia && (styles.imagePosition === 'side-left' || styles.layout === 'split-right')) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div className={`${mediaSpan} order-2 sm:order-1`}>{renderMedia()}</div>
                    <div className={`${textSpan} order-1 sm:order-2`}>{renderNarrative()}</div>
                </div>
            );
        }

        // Position: Side Right
        if (hasMedia && (styles.imagePosition === 'side-right' || styles.layout === 'split-left')) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div className={textSpan}>{renderNarrative()}</div>
                    <div className={mediaSpan}>{renderMedia()}</div>
                </div>
            );
        }

        // Position: Card Float or Boxed
        if (styles.imagePosition === 'card-float' || styles.layout === 'card-boxed') {
            return (
                <div
                    className={`p-6 sm:p-8 ${
                        styles.isDark
                            ? 'bg-slate-900/95 border border-slate-700 text-slate-100'
                            : 'bg-white border border-slate-200/90 text-slate-900'
                    } ${styles.radiusClass} shadow-xl relative overflow-hidden`}
                >
                    {hasMedia && styles.imagePosition === 'card-float' && (
                        <div className="mb-6">{renderMedia()}</div>
                    )}
                    {renderNarrative()}
                </div>
            );
        }

        // Default or Centered without split
        return (
            <div className="space-y-6">
                {renderNarrative()}
                {hasMedia && renderMedia()}
            </div>
        );
    };

    return (
        <div className={`space-y-3 ${className}`}>
            {/* Device Toolbar */}
            {showDeviceToolbar && (
                <div className="flex items-center justify-between px-3 py-2 bg-slate-900 text-white rounded-xl text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="font-bold font-mono text-[11px] text-slate-200">
                            LIVE PREVIEW: {sectionName || secId}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                        <button
                            type="button"
                            onClick={() => setDevice('desktop')}
                            className={`p-1.5 rounded-md transition-all cursor-pointer ${
                                device === 'desktop' ? 'bg-[#1B84FF] text-white' : 'text-slate-400 hover:text-white'
                            }`}
                            title="Tampilan Desktop (Lebar Penuh)"
                        >
                            <Monitor className="h-3.5 w-3.5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setDevice('tablet')}
                            className={`p-1.5 rounded-md transition-all cursor-pointer ${
                                device === 'tablet' ? 'bg-[#1B84FF] text-white' : 'text-slate-400 hover:text-white'
                            }`}
                            title="Tampilan Tablet (768px)"
                        >
                            <Tablet className="h-3.5 w-3.5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setDevice('mobile')}
                            className={`p-1.5 rounded-md transition-all cursor-pointer ${
                                device === 'mobile' ? 'bg-[#1B84FF] text-white' : 'text-slate-400 hover:text-white'
                            }`}
                            title="Tampilan Smartphone (390px)"
                        >
                            <Smartphone className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Live Render Canvas Frame */}
            <div className="p-3 sm:p-5 bg-slate-950/90 rounded-2xl border border-slate-800 shadow-inner overflow-hidden transition-all duration-300">
                <div className={`${deviceWidthClass} transition-all duration-300 shadow-2xl overflow-hidden rounded-xl`}>
                    <section
                        className={`relative overflow-hidden transition-all duration-300 ${styles.bgClass} ${styles.paddingClass} ${styles.borderClass} ${styles.radiusClass}`}
                        style={styles.bgStyle}
                    >
                        {/* Background Overlay */}
                        {styles.showImage && styles.imageUrl && styles.imagePosition === 'background' && (
                            <div
                                className="absolute inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-15 mix-blend-multiply"
                                style={{
                                    backgroundImage: `url('${styles.imageUrl}')`,
                                }}
                            />
                        )}

                        {/* Ambient Glow - Clean CSS Radial without blur bleed */}
                        {styles.hasAmbientGlow && (
                            <div
                                className="absolute inset-0 pointer-events-none opacity-30"
                                style={{
                                    background: `radial-gradient(ellipse 60% 50% at 80% 0%, ${styles.accentColor || '#1B84FF'}22 0%, transparent 70%)`
                                }}
                            />
                        )}

                        {/* Content Container */}
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
                            {renderLayoutBody()}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
