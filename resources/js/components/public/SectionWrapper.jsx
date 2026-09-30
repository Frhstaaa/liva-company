import React from 'react';
import { useSite } from '../../context/SiteContext';
import { getSectionCustomStyles } from '../../lib/sectionStyler';

export default function SectionWrapper({
    pageId,
    secId,
    className = '',
    children,
    defaults = {},
    showContainer = true,
    stylesOverride = null,
}) {
    const { getSetting } = useSite();
    const styles = stylesOverride || getSectionCustomStyles(getSetting, pageId, secId, defaults);

    const content = typeof children === 'function' ? children({ styles }) : children;

    // Helper to render media element (main photo or gallery)
    const renderMedia = (customClass = '') => {
        if (!styles.showImage) return null;

        // If gallery images exist (multi-photo)
        if (styles.galleryImages && styles.galleryImages.length > 0) {
            const colsClass = {
                '2': 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6',
                '3': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
                '4': 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4',
                'carousel': 'flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-thin',
            }[styles.galleryColumns] || 'grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6';

            return (
                <div className={`space-y-4 ${customClass}`}>
                    <div className={colsClass}>
                        {styles.galleryImages.map((img, i) => (
                            <div
                                key={img.id || i}
                                className={`group relative ${styles.radiusClass} overflow-hidden border border-slate-200/80 bg-slate-100 shadow-sm transition-all duration-300 hover:shadow-md ${
                                    styles.galleryColumns === 'carousel' ? 'shrink-0 w-72 sm:w-80 snap-start' : ''
                                }`}
                            >
                                <div className={`w-full overflow-hidden ${styles.imageAspectClass}`}>
                                    <img
                                        src={img.url}
                                        alt={img.title || img.caption || `Galeri ${i + 1}`}
                                        className={`w-full h-full object-${styles.imageFit || 'cover'} group-hover:scale-103 transition-transform duration-500`}
                                        loading="lazy"
                                    />
                                </div>
                                {(img.title || img.caption) && (
                                    <div className="p-3 bg-white border-t border-slate-100">
                                        {img.title && (
                                            <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{img.title}</h4>
                                        )}
                                        {img.caption && (
                                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{img.caption}</p>
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
        if (!styles.imageUrl) return null;

        return (
            <div className={`relative ${customClass}`}>
                <div className={`${styles.imageStyleClass} group`}>
                    <img
                        src={styles.imageUrl}
                        alt="Visual Seksi"
                        className={`w-full h-full object-${styles.imageFit || 'cover'} ${styles.imageAspectClass} group-hover:scale-102 transition-transform duration-500`}
                        loading="lazy"
                    />
                </div>
            </div>
        );
    };

    // Calculate grid spans based on imageWidth
    const getGridSpans = () => {
        switch (styles.imageWidth) {
            case 'compact': // 33% media, 67% text
                return { textSpan: 'lg:col-span-8', mediaSpan: 'lg:col-span-4' };
            case 'prominent': // 60% media, 40% text
                return { textSpan: 'lg:col-span-5', mediaSpan: 'lg:col-span-7' };
            case 'full': // 100% full
                return { textSpan: 'lg:col-span-12', mediaSpan: 'lg:col-span-12' };
            case 'balanced': // 50:50
            default:
                return { textSpan: 'lg:col-span-6', mediaSpan: 'lg:col-span-6' };
        }
    };

    const renderInnerContent = () => {
        const { textSpan, mediaSpan } = getGridSpans();
        const hasMedia = (styles.imageUrl || (styles.galleryImages && styles.galleryImages.length > 0)) && styles.showImage;

        // Position: Top (Media on top of content)
        if (hasMedia && styles.imagePosition === 'top') {
            return (
                <div className="space-y-8 sm:space-y-12">
                    {renderMedia('max-w-5xl mx-auto')}
                    <div>{content}</div>
                </div>
            );
        }

        // Position: Bottom (Media below content)
        if (hasMedia && styles.imagePosition === 'bottom') {
            return (
                <div className="space-y-8 sm:space-y-12">
                    <div>{content}</div>
                    {renderMedia('max-w-6xl mx-auto')}
                </div>
            );
        }

        // Position: Side Left (Media on Left, Content on Right)
        if (hasMedia && (styles.imagePosition === 'side-left' || styles.layout === 'split-right')) {
            return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className={`${mediaSpan} order-2 lg:order-1`}>
                        {renderMedia()}
                    </div>
                    <div className={`${textSpan} order-1 lg:order-2`}>
                        {content}
                    </div>
                </div>
            );
        }

        // Position: Side Right (Content on Left, Media on Right)
        if (hasMedia && (styles.imagePosition === 'side-right' || styles.layout === 'split-left')) {
            return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className={textSpan}>{content}</div>
                    <div className={mediaSpan}>{renderMedia()}</div>
                </div>
            );
        }

        // Position: Card Float (Floating card with content and photo)
        if (styles.imagePosition === 'card-float' || styles.layout === 'card-boxed') {
            return (
                <div
                    className={`p-6 sm:p-10 ${
                        styles.isDark
                            ? 'bg-slate-900/90 border border-slate-700 text-slate-100'
                            : 'bg-white border border-slate-200/90 text-slate-900'
                    } ${styles.radiusClass} shadow-xl relative overflow-hidden`}
                >
                    {hasMedia && styles.imagePosition === 'card-float' && (
                        <div className="mb-6 sm:mb-8">{renderMedia()}</div>
                    )}
                    {content}
                </div>
            );
        }

        // Layout: Centered
        if (styles.layout === 'centered') {
            return <div className="text-center mx-auto">{content}</div>;
        }

        // Default layout
        return content;
    };

    return (
        <section
            id={`sec-${pageId}-${secId}`}
            className={`relative overflow-hidden transition-all duration-300 ${styles.bgClass} ${styles.paddingClass} ${styles.borderClass} ${className}`}
            style={styles.bgStyle}
        >
            {/* Background Image Cover Overlay (If Position === 'background') */}
            {styles.showImage && styles.imageUrl && styles.imagePosition === 'background' && (
                <div
                    className="absolute inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-15 mix-blend-multiply"
                    style={{
                        backgroundImage: `url('${styles.imageUrl}')`,
                    }}
                />
            )}

            {/* Ambient Radial Glow Effect - Clean CSS Radial without blur bleed */}
            {styles.hasAmbientGlow && (
                <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                        background: `radial-gradient(ellipse 60% 50% at 75% 0%, ${styles.accentColor || '#1B84FF'}22 0%, transparent 70%)`,
                    }}
                />
            )}

            {/* Medical Grid Lines */}
            {styles.hasGridLines && (
                <div className="absolute inset-0 bg-clinical-grid opacity-40 pointer-events-none" />
            )}

            {/* Container */}
            {showContainer ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {renderInnerContent()}
                </div>
            ) : (
                <div className="relative z-10">{renderInnerContent()}</div>
            )}
        </section>
    );
}
