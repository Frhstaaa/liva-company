/**
 * Liva SIMRS - Section Visual Styler Utility
 * Dynamically computes visual appearance, color palette, layout mode,
 * border radius, padding, photo aspect, and button styles for any section.
 */

export const BG_PRESETS = [
    { id: 'default', name: 'Bawaan Tema Halaman', desc: 'Menyesuaikan tema keseluruhan halaman', hex: 'inherit' },
    { id: 'white', name: 'Putih Bersih', desc: 'Latar putih minimalis formal', hex: '#FFFFFF' },
    { id: 'light-blue', name: 'Biru Muda Klinis', desc: 'Nuansa medis terpercaya & sejuk', hex: '#F0F6FE' },
    { id: 'light-slate', name: 'Slate Lembut', desc: 'Abu-abu terang arsitektural', hex: '#F8FAFC' },
    { id: 'emerald-light', name: 'Hijau Zamrud Sehat', desc: 'Aksen kesehatan ramah Kemenkes', hex: '#F0FDF4' },
    { id: 'indigo-light', name: 'Indigo Royal AI', desc: 'Nuansa teknologi cerdas & modern', hex: '#EEF2FF' },
    { id: 'amber-light', name: 'Oranye Hangat', desc: 'Nuansa enerjik & responsif', hex: '#FFFBEB' },
    { id: 'dark-navy', name: 'Midnight Slate (Gelap)', desc: 'Latar gelap elegan kontras tinggi', hex: '#0B1120' },
    { id: 'custom', name: 'Warna Kustom (Hex)', desc: 'Pilih warna heksadesimal bebas', hex: '' },
];

export const ACCENT_PRESETS = [
    { id: '#1B84FF', name: 'Biru Medis (Default)', hex: '#1B84FF' },
    { id: '#F97316', name: 'Oranye Hangat', hex: '#F97316' },
    { id: '#10B981', name: 'Hijau Zamrud', hex: '#10B981' },
    { id: '#8B5CF6', name: 'Ungu AI Smart', hex: '#8B5CF6' },
    { id: '#0EA5E9', name: 'Cyan Futuristik', hex: '#0EA5E9' },
    { id: '#E11D48', name: 'Mawar Crimson', hex: '#E11D48' },
];

export const LAYOUT_PRESETS = [
    { id: 'default', name: 'Standar Alur (Default)', desc: 'Sesuai tata letak baku komponen' },
    { id: 'centered', name: 'Rata Tengah (Centered)', desc: 'Judul, narasi, dan aksi berfokus di tengah' },
    { id: 'split-left', name: 'Split Kiri (Teks Kiri, Visual Kanan)', desc: 'Komposisi dua kolom seimbang' },
    { id: 'split-right', name: 'Split Kanan (Visual Kiri, Teks Kanan)', desc: 'Komposisi visual mendahului teks' },
    { id: 'card-boxed', name: 'Kartu Mengambang (Card Boxed)', desc: 'Konten dibungkus kartu kontras berbayang' },
];

export const RADIUS_PRESETS = [
    { id: 'rounded-none', name: 'Persegi Tegas (0px)', class: 'rounded-none' },
    { id: 'rounded-xl', name: 'Sudut Ringan (12px)', class: 'rounded-xl' },
    { id: 'rounded-2xl', name: 'Standar Modern (16px)', class: 'rounded-2xl' },
    { id: 'rounded-3xl', name: 'Melengkung Lembut (24px)', class: 'rounded-3xl' },
    { id: 'rounded-full', name: 'Kapsul / Pill', class: 'rounded-full' },
];

export const PADDING_PRESETS = [
    { id: 'compact', name: 'Ringkas (Padat)', class: 'py-8 sm:py-12' },
    { id: 'normal', name: 'Standar Seimbang', class: 'py-16 sm:py-24' },
    { id: 'spacious', name: 'Lega Editorial', class: 'py-24 sm:py-32' },
];

export const BORDER_PRESETS = [
    { id: 'none', name: 'Tanpa Border', class: 'border-0' },
    { id: 'subtle', name: 'Garis Halus', class: 'border border-slate-200/70' },
    { id: 'glow', name: 'Pendar Aksen (Glow)', class: 'border-2 border-blue-400/40 shadow-lg shadow-blue-500/10' },
    { id: 'glass', name: 'Glassmorphism Mewah', class: 'border border-white/40 backdrop-blur-md bg-white/70 shadow-xl' },
];

export const IMAGE_POSITION_PRESETS = [
    { id: 'side-right', name: 'Di Kanan Teks (Split Kanan)', desc: 'Teks di sebelah kiri, media foto di kanan' },
    { id: 'side-left', name: 'Di Kiri Teks (Split Kiri)', desc: 'Media foto di sebelah kiri, teks di kanan' },
    { id: 'top', name: 'Di Atas Teks (Banner Top)', desc: 'Foto menjadi tajuk visual utama di atas konten' },
    { id: 'bottom', name: 'Di Bawah Teks (Showcase)', desc: 'Teks narasi di atas, galeri foto di bawah' },
    { id: 'background', name: 'Latar Belakang (Cover Overlay)', desc: 'Foto menjadi wallpaper latar seksi dengan gradient mask' },
    { id: 'card-float', name: 'Kartu Melayang (Floating Card)', desc: 'Foto tampil sebagai kartu melayang dengan bayangan halus' },
];

export const IMAGE_WIDTH_PRESETS = [
    { id: 'compact', name: 'Ringkas (33% / 1/3)', desc: 'Kolom kecil proporsional' },
    { id: 'balanced', name: 'Seimbang (50% / 1/2)', desc: 'Dua kolom seimbang 50:50' },
    { id: 'prominent', name: 'Menonjol (65% / 2/3)', desc: 'Fokus visual mendominasi' },
    { id: 'full', name: 'Penuh (100% Lebar)', desc: 'Lebar maksimal container' },
];

export const GALLERY_COLUMNS_PRESETS = [
    { id: '2', name: 'Grid 2 Kolom' },
    { id: '3', name: 'Grid 3 Kolom' },
    { id: '4', name: 'Grid 4 Kolom' },
    { id: 'carousel', name: 'Carousel Strip Geser' },
];

/**
 * Safely parse gallery images JSON
 */
export function parseGalleryImages(rawVal) {
    if (!rawVal) return [];
    if (Array.isArray(rawVal)) return rawVal;
    try {
        const parsed = JSON.parse(rawVal);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

/**
 * Computes all dynamic visual styles for a given section
 */
export function getSectionCustomStyles(settingProvider, pageId, secId, defaults = {}) {
    // Helper to read setting whether settingProvider is a function getSetting(k, d) or an object map
    const getSetting = typeof settingProvider === 'function' 
        ? settingProvider 
        : (k, d = '') => (settingProvider && settingProvider[k] !== undefined ? settingProvider[k] : d);
    const prefix = `sec_${pageId}_${secId}_`;

    // 1. Background
    const bgMode = getSetting(prefix + 'bg', defaults.bg || 'default');
    const customBg = getSetting(prefix + 'bg_custom', '');
    const isDark = bgMode === 'dark-navy';

    let bgClass = '';
    let bgStyle = {};

    switch (bgMode) {
        case 'white':
            bgClass = 'bg-white';
            break;
        case 'light-blue':
            bgClass = 'bg-[#F0F6FE]';
            break;
        case 'light-slate':
            bgClass = 'bg-[#F8FAFC]';
            break;
        case 'emerald-light':
            bgClass = 'bg-[#F0FDF4]';
            break;
        case 'indigo-light':
            bgClass = 'bg-[#EEF2FF]';
            break;
        case 'amber-light':
            bgClass = 'bg-[#FFFBEB]';
            break;
        case 'dark-navy':
            bgClass = 'bg-[#0B1120] text-slate-100';
            break;
        case 'custom':
            if (customBg) {
                bgStyle = { backgroundColor: customBg };
            }
            break;
        default:
            bgClass = defaults.defaultBgClass || '';
            break;
    }

    // 2. Accent Color
    const accentColor = getSetting(prefix + 'accent', defaults.accent || '#1B84FF');

    // 3. Contrast Mode (text colors)
    const contrastMode = getSetting(prefix + 'contrast', isDark ? 'light' : 'dark');
    const isLightText = contrastMode === 'light' || isDark;

    const titleTextClass = isLightText ? 'text-white' : 'text-[#0F172A]';
    const bodyTextClass = isLightText ? 'text-slate-300' : 'text-slate-600';
    const subtextClass = isLightText ? 'text-slate-400' : 'text-slate-500';

    // 4. Layout Variant
    const layout = getSetting(prefix + 'layout', defaults.layout || 'default');

    // 5. Padding (Tight, seamless spacing without giant gaps)
    const padding = getSetting(prefix + 'padding', defaults.padding || 'normal');
    const paddingClass = {
        none: 'py-0',
        compact: 'py-6 sm:py-8',
        normal: 'py-10 sm:py-14',
        spacious: 'py-14 sm:py-18',
    }[padding] || (defaults.defaultPaddingClass || 'py-10 sm:py-14');

    // 6. Corner Radius
    const radius = getSetting(prefix + 'radius', defaults.radius || 'rounded-2xl');
    const radiusClass = {
        'rounded-none': 'rounded-none',
        'rounded-xl': 'rounded-xl',
        'rounded-2xl': 'rounded-2xl',
        'rounded-3xl': 'rounded-3xl',
        'rounded-full': 'rounded-full',
    }[radius] || 'rounded-2xl';

    // 7. Border & Shadow
    const border = getSetting(prefix + 'border', defaults.border || 'none');
    const borderClass = {
        none: 'border-0',
        subtle: isLightText ? 'border border-slate-700/80' : 'border border-slate-200/80',
        glow: 'border-2 border-[#1B84FF]/40 shadow-xl shadow-blue-500/10',
        glass: isLightText
            ? 'border border-slate-700/60 backdrop-blur-md bg-slate-900/60 shadow-2xl'
            : 'border border-white/60 backdrop-blur-md bg-white/80 shadow-xl',
    }[border] || '';

    // 8. Photo & Media
    const imageUrl = getSetting(prefix + 'image_url', defaults.imageUrl || '');
    const imageAspect = getSetting(prefix + 'image_aspect', defaults.imageAspect || '16/9');
    const imageStyle = getSetting(prefix + 'image_style', defaults.imageStyle || 'rounded');
    const imagePosition = getSetting(prefix + 'image_position', defaults.imagePosition || (layout === 'split-right' ? 'side-left' : layout === 'split-left' ? 'side-right' : 'side-right'));
    const imageWidth = getSetting(prefix + 'image_width', defaults.imageWidth || 'balanced');
    const imageFit = getSetting(prefix + 'image_fit', defaults.imageFit || 'cover');
    const galleryImages = parseGalleryImages(getSetting(prefix + 'gallery_images', '[]'));
    const galleryColumns = getSetting(prefix + 'gallery_columns', defaults.galleryColumns || '3');

    const imageAspectClass = {
        '16/9': 'aspect-[16/9]',
        '4/3': 'aspect-[4/3]',
        '1/1': 'aspect-square',
        auto: 'aspect-auto',
    }[imageAspect] || 'aspect-[16/9]';

    const imageStyleClass = {
        rounded: `${radiusClass} shadow-md border border-slate-200/70 overflow-hidden`,
        mockup: `${radiusClass} shadow-2xl border-4 border-slate-800/90 bg-slate-900 p-1.5 overflow-hidden`,
        glow: `${radiusClass} shadow-2xl border-2 border-[#1B84FF]/40 ring-4 ring-[#1B84FF]/10 overflow-hidden`,
        circle: 'rounded-full aspect-square shadow-xl border-4 border-white overflow-hidden',
    }[imageStyle] || `${radiusClass} shadow-md overflow-hidden`;

    // 9. Element Visibility Toggles
    const showBadge = getSetting(prefix + 'show_badge', '1') !== '0';
    const showImage = getSetting(prefix + 'show_image', '1') !== '0';
    const showCta = getSetting(prefix + 'show_cta', '1') !== '0';
    const showSecondaryCta = getSetting(prefix + 'show_secondary_cta', '1') !== '0';

    // 10. CTA Button Styling
    const ctaStyle = getSetting(prefix + 'cta_style', defaults.ctaStyle || 'solid');
    let ctaClass = 'btn-spring px-6 py-3 rounded-full text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer';

    switch (ctaStyle) {
        case 'solid':
            ctaClass += ' bg-[#1B84FF] hover:bg-[#1670DB] text-white';
            break;
        case 'amber-warm':
            ctaClass += ' btn-amber-warm text-white';
            break;
        case 'outline':
            ctaClass = 'btn-spring px-6 py-3 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border-2 border-[#1B84FF] text-[#1B84FF] hover:bg-blue-50 cursor-pointer';
            break;
        case 'whatsapp':
            ctaClass += ' bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-emerald-500/20';
            break;
        default:
            ctaClass += ' bg-[#1B84FF] hover:bg-[#1670DB] text-white';
            break;
    }

    // 11. Visual Decorators
    const hasAmbientGlow = getSetting(prefix + 'ambient_glow', '1') === '1';
    const hasGridLines = getSetting(prefix + 'grid_lines', '0') === '1';

    // 12. Text Content Fields (with fallback to defaults and legacy keys)
    const title = getSetting(prefix + 'title_main', getSetting(`${secId}_headline`, getSetting(`${secId}_title`, defaults.title || '')));
    const badge = getSetting(prefix + 'badge_text', getSetting(`${secId}_badge_text`, defaults.badge || ''));
    const highlight = getSetting(prefix + 'title_highlight', getSetting(`${secId}_highlight`, defaults.highlight || ''));
    const description = getSetting(prefix + 'description', getSetting(`${secId}_description`, getSetting(`${secId}_subheadline`, defaults.description || '')));
    const ctaPrimaryText = getSetting(prefix + 'cta_primary_text', getSetting(`${secId}_cta_primary_text`, getSetting(`${secId}_cta_text`, defaults.ctaPrimaryText || '')));
    const ctaPrimaryUrl = getSetting(prefix + 'cta_primary_url', defaults.ctaPrimaryUrl || '');
    const ctaSecondaryText = getSetting(prefix + 'cta_secondary_text', getSetting(`${secId}_cta_secondary_text`, defaults.ctaSecondaryText || ''));
    const ctaSecondaryUrl = getSetting(prefix + 'cta_secondary_url', defaults.ctaSecondaryUrl || '');

    return {
        bgClass,
        bgStyle,
        accentColor,
        isDark,
        isLightText,
        titleTextClass,
        bodyTextClass,
        subtextClass,
        layout,
        paddingClass,
        radiusClass,
        borderClass,
        imageUrl,
        imageAspectClass,
        imageStyleClass,
        imagePosition,
        imageWidth,
        imageFit,
        galleryImages,
        galleryColumns,
        showBadge,
        showImage,
        showCta,
        showSecondaryCta,
        ctaClass,
        hasAmbientGlow,
        hasGridLines,
        title,
        badge,
        highlight,
        description,
        ctaPrimaryText,
        ctaPrimaryUrl,
        ctaSecondaryText,
        ctaSecondaryUrl,
    };
}

