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
}) {
    const { getSetting } = useSite();
    const styles = getSectionCustomStyles(getSetting, pageId, secId, defaults);

    const content = typeof children === 'function' ? children({ styles }) : children;

    const renderInnerContent = () => {
        // 1. Layout: Card Boxed
        if (styles.layout === 'card-boxed') {
            return (
                <div
                    className={`p-6 sm:p-10 ${
                        styles.isDark
                            ? 'bg-slate-900/90 border border-slate-700 text-slate-100'
                            : 'bg-white border border-slate-200/90 text-slate-900'
                    } ${styles.radiusClass} shadow-xl relative overflow-hidden`}
                >
                    {content}
                </div>
            );
        }

        // 2. Layout: Split Left (Content on Left, Uploaded Image on Right)
        if (styles.layout === 'split-left' && styles.imageUrl && styles.showImage) {
            return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-7">{content}</div>
                    <div className="lg:col-span-5">
                        <img
                            src={styles.imageUrl}
                            alt="Section Visual"
                            className={`w-full object-cover ${styles.imageAspectClass} ${styles.imageStyleClass}`}
                        />
                    </div>
                </div>
            );
        }

        // 3. Layout: Split Right (Uploaded Image on Left, Content on Right)
        if (styles.layout === 'split-right' && styles.imageUrl && styles.showImage) {
            return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-5 order-2 lg:order-1">
                        <img
                            src={styles.imageUrl}
                            alt="Section Visual"
                            className={`w-full object-cover ${styles.imageAspectClass} ${styles.imageStyleClass}`}
                        />
                    </div>
                    <div className="lg:col-span-7 order-1 lg:order-2">{content}</div>
                </div>
            );
        }

        // 4. Layout: Centered
        if (styles.layout === 'centered') {
            return <div className="text-center mx-auto">{content}</div>;
        }

        // 5. Default
        return content;
    };

    return (
        <section
            id={`sec-${pageId}-${secId}`}
            className={`relative overflow-hidden transition-all duration-300 ${styles.bgClass} ${styles.paddingClass} ${styles.borderClass} ${className}`}
            style={styles.bgStyle}
        >
            {/* Ambient Radial Glow Effect */}
            {styles.hasAmbientGlow && (
                <div
                    className="absolute -top-24 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
                    style={{ backgroundColor: styles.accentColor }}
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
