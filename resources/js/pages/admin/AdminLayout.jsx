import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    LayoutDashboard,
    Sliders,
    Layers,
    ShieldCheck,
    GitCompare,
    BookOpen,
    Inbox,
    Lock,
    History,
    UserCheck,
    Eye,
    LogOut,
    Menu,
    X,
    ExternalLink,
    ChevronRight,
    Shield,
    Sparkles,
    Search,
    Bell,
    Globe,
    CheckCircle2,
    HardDrive,
    Activity,
    Palette
} from 'lucide-react';

export default function AdminLayout({ activeTab, onSelectTab, onNavigatePublic, children }) {
    const { user, logout } = useAuth();
    const { getSetting } = useSite();
    const siteName = getSetting('site_name', 'Liva SIMRS');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navGroups = [
        {
            group: 'HALAMAN & KONTEN WEBSITE',
            items: [
                { id: 'dashboard', label: 'Ringkasan & Pilih Halaman', icon: LayoutDashboard, badge: 'Utama', badgeVariant: 'primary' },
                { id: 'layout-builder', label: 'Editor Visual Semua Halaman', icon: Palette, badge: 'Visual Studio', badgeVariant: 'accent' },
            ],
        },
        {
            group: 'DATABASE & MODUL KLINIS',
            items: [
                { id: 'modules', label: 'Katalog 36 Modul SIMRS', icon: Layers, badge: null },
                { id: 'case-studies', label: 'Studi Kasus & Testimoni RS', icon: BookOpen, badge: null },
                { id: 'pillars', label: '6 Pilar Keunggulan', icon: ShieldCheck, badge: null },
                { id: 'comparisons', label: 'Komparasi Vendor KLAS', icon: GitCompare, badge: null },
            ],
        },
        {
            group: 'LEADS & CALON FASKES MITRA',
            items: [
                { id: 'leads', label: 'Permohonan Demo Masuk', icon: Inbox, badge: 'Prospek', badgeVariant: 'danger' },
            ],
        },
        {
            group: 'PENGATURAN & KEAMANAN',
            items: [
                { id: 'settings-cms', label: 'Pengaturan Kontak & Umum', icon: Sliders, badge: null },
                { id: 'security', label: 'Master PIN & Enkripsi', icon: Lock, badge: 'AES-256', badgeVariant: 'success' },
                { id: 'audit-logs', label: 'Log Audit Keamanan', icon: History, badge: null },
                { id: 'profile', label: 'Profil Administrator', icon: UserCheck, badge: null },
            ],
        },
    ];

    const currentTabItem = navGroups
        .flatMap((g) => g.items)
        .find((i) => i.id === activeTab) || { label: 'Console', group: 'Console' };

    return (
        <div className="min-h-screen bg-[#F5F8FA] text-[#181C32] flex flex-col font-sans antialiased selection:bg-[#1B84FF] selection:text-white">
            {/* ========================================================================= */}
            {/* METRONIC HEADER BAR                                                      */}
            {/* ========================================================================= */}
            <header className="bg-white border-b border-[#EFF2F5] px-4 sm:px-8 h-[70px] flex items-center justify-between sticky top-0 z-30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] backdrop-blur-md bg-white/95">
                {/* Left side: Mobile Toggle & Metronic Breadcrumbs */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 rounded-xl text-[#78829D] hover:text-[#181C32] hover:bg-[#F5F8FA] transition-colors border border-[#EFF2F5]"
                        aria-label="Toggle Sidebar"
                    >
                        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>

                    {/* Metronic Breadcrumbs & Page Heading */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-[11px] font-medium text-[#78829D]">
                            <span className="hover:text-[#1B84FF] transition-colors cursor-pointer" onClick={() => onSelectTab('dashboard')}>
                                Metronic Admin
                            </span>
                            <span className="text-[#B5B5C3]">/</span>
                            <span className="text-[#4B5675]">Console</span>
                            <span className="text-[#B5B5C3]">/</span>
                            <span className="text-[#1B84FF] font-semibold">{currentTabItem.label}</span>
                        </div>
                        <h1 className="text-base sm:text-lg font-bold text-[#181C32] tracking-tight font-display flex items-center gap-2">
                            <span>{currentTabItem.label}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1B84FF]"></span>
                        </h1>
                    </div>
                </div>

                {/* Right side: Global Actions & Metronic User Profile */}
                <div className="flex items-center gap-3">
                    {/* Direct Visual Page Builder Button */}
                    <button
                        type="button"
                        onClick={() => onSelectTab('layout-builder')}
                        className={`inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer focus-ring ${
                            activeTab === 'layout-builder'
                                ? 'bg-[#1B84FF] text-white shadow-blue-500/20'
                                : 'bg-[#1B84FF]/10 hover:bg-[#1B84FF]/15 text-[#1B84FF] border border-[#1B84FF]/20'
                        }`}
                    >
                        <Palette className="h-4 w-4" />
                        <span className="hidden sm:inline">Editor Visual Semua Halaman</span>
                    </button>

                    {/* Quick Visit Public Website Dropdown / Button */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B5675] hover:text-[#1B84FF] bg-[#F9F9F9] hover:bg-[#F1F1F4] border border-[#E1E3EA] px-3 py-2 rounded-xl transition-all shadow-2xs cursor-pointer focus-ring"
                            >
                                <Globe className="h-3.5 w-3.5 text-[#1B84FF]" />
                                <span className="hidden md:inline">Buka Website Publik</span>
                                <ChevronRight className="h-3 w-3 rotate-90 text-slate-400" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-1.5">
                            <DropdownMenuLabel className="text-[11px] font-mono text-[#78829D] px-2 py-1">
                                KUNJUNGI HALAMAN PUBLIK
                            </DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onNavigatePublic('beranda')} className="text-xs cursor-pointer py-2">
                                🏠 Halaman Beranda (Home)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onNavigatePublic('modul-simrs')} className="text-xs cursor-pointer py-2">
                                📦 Katalog 36 Modul SIMRS
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onNavigatePublic('keunggulan')} className="text-xs cursor-pointer py-2">
                                🌟 Keunggulan & Standar KLAS
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onNavigatePublic('studi-kasus')} className="text-xs cursor-pointer py-2">
                                📊 Studi Kasus RS Mitra & ROI
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onNavigatePublic('tentang-kami')} className="text-xs cursor-pointer py-2">
                                👥 Tentang Kami & Profil RS
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onNavigatePublic('jadwalkan-demo')} className="text-xs cursor-pointer py-2">
                                📅 Formulir Jadwalkan Demo RS
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Metronic Profile Avatar Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="flex items-center gap-3 p-1 rounded-2xl hover:bg-[#F5F8FA] cursor-pointer transition-colors focus:outline-none border border-transparent hover:border-[#EFF2F5]"
                            >
                                <div className="relative">
                                    <Avatar className="h-10 w-10 rounded-xl border border-[#EFF2F5] shadow-xs">
                                        <AvatarImage src={user?.avatar_url} alt={user?.name} />
                                        <AvatarFallback className="bg-[#1B84FF]/10 text-[#1B84FF] font-bold text-xs rounded-xl">
                                            {user?.name?.slice(0, 2).toUpperCase() || 'AD'}
                                        </AvatarFallback>
                                    </Avatar>
                                    {/* Online indicator dot */}
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#50CD89] ring-2 ring-white absolute -bottom-0.5 -right-0.5"></span>
                                </div>
                                <div className="hidden xl:flex flex-col text-left">
                                    <span className="text-xs font-bold text-[#181C32] leading-tight">{user?.name || 'Administrator'}</span>
                                    <span className="text-[10.5px] font-mono text-[#78829D] leading-tight">Superadmin</span>
                                </div>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 p-2 rounded-2xl border-[#EFF2F5] shadow-[0_10px_30px_rgba(0,0,0,0.08)]" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal p-3 bg-[#F9F9F9] rounded-xl mb-1 border border-[#EFF2F5]">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 rounded-xl">
                                        <AvatarFallback className="bg-[#1B84FF] text-white font-bold text-sm rounded-xl">
                                            {user?.name?.slice(0, 2).toUpperCase() || 'AD'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col space-y-0.5 overflow-hidden">
                                        <p className="text-xs font-bold text-[#181C32] truncate">{user?.name}</p>
                                        <p className="text-[10.5px] font-mono text-[#78829D] truncate">{user?.email}</p>
                                        <span className="inline-flex items-center text-[9px] font-mono font-bold text-[#1B84FF] bg-[#1B84FF]/10 px-2 py-0.5 rounded-md w-fit mt-0.5">
                                            {user?.role || 'Superadministrator'}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            
                            <DropdownMenuItem onClick={() => onSelectTab('profile')} className="cursor-pointer text-xs py-2 rounded-lg text-[#4B5675] hover:text-[#1B84FF] hover:bg-[#F5F8FA]">
                                <UserCheck className="mr-2.5 h-4 w-4 text-[#1B84FF]" />
                                <span>Profil Pengguna &amp; Avatar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSelectTab('security')} className="cursor-pointer text-xs py-2 rounded-lg text-[#4B5675] hover:text-[#1B84FF] hover:bg-[#F5F8FA]">
                                <Lock className="mr-2.5 h-4 w-4 text-[#F97316]" />
                                <span>Master PIN &amp; Enkripsi AES-256</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onNavigatePublic('beranda')} className="cursor-pointer text-xs py-2 rounded-lg text-[#4B5675] hover:text-[#1B84FF] hover:bg-[#F5F8FA]">
                                <ExternalLink className="mr-2.5 h-4 w-4 text-[#78829D]" />
                                <span>Kunjungi Halaman Publik</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 border-[#EFF2F5]" />
                            <DropdownMenuItem onClick={logout} className="text-[#F1416C] focus:text-[#D9214E] cursor-pointer text-xs py-2 rounded-lg hover:bg-[#FFF5F8]">
                                <LogOut className="mr-2.5 h-4 w-4" />
                                <span className="font-semibold">Keluar (Sign Out)</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* ========================================================================= */}
            {/* WORKSPACE: METRONIC DARK SIDEBAR + CANVAS                                */}
            {/* ========================================================================= */}
            <div className="flex-1 flex overflow-hidden">
                {/* Backdrop for Mobile Sidebar */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-[#181C32]/60 z-30 lg:hidden backdrop-blur-xs transition-opacity"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar Navigation - Authentic Metronic Dark Theme (#1E1E2D) */}
                <aside
                    className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#1E1E2D] border-r border-[#26273B] flex flex-col justify-between transition-transform duration-200 transform ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
                >
                    {/* Brand Header inside Sidebar */}
                    <div className="h-[70px] px-6 flex items-center justify-between border-b border-[#26273B] bg-[#1B1B28]">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#1B84FF] flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(27,132,255,0.4)]">
                                <Shield className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5 font-display font-bold text-sm text-white tracking-tight">
                                    <span>{siteName}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
                                </div>
                                <span className="text-[10px] font-mono text-[#78829D] uppercase tracking-wider">
                                    METRONIC CONSOLE
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-[#78829D] hover:text-white p-1 rounded-lg"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Nav Items List */}
                    <div className="p-4 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
                        {navGroups.map((group, gIdx) => (
                            <div key={gIdx} className="space-y-1">
                                <div className="px-3 text-[10px] font-mono font-bold text-[#565674] uppercase tracking-wider mb-2">
                                    {group.group}
                                </div>

                                {group.items.map((item) => {
                                    const IconComponent = item.icon;
                                    const active = activeTab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => {
                                                onSelectTab(item.id);
                                                setSidebarOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer group ${
                                                active
                                                    ? 'bg-[#1B84FF] text-white shadow-[0_4px_16px_rgba(27,132,255,0.35)]'
                                                    : 'text-[#9D9DA6] hover:text-white hover:bg-[#2B2B40]/50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <IconComponent
                                                    className={`h-4 w-4 shrink-0 transition-colors ${
                                                        active ? 'text-white' : 'text-[#78829D] group-hover:text-white'
                                                    }`}
                                                />
                                                <span className="truncate">{item.label}</span>
                                            </div>

                                            {item.badge && (
                                                <span
                                                    className={`text-[9.5px] px-2 py-0.5 rounded-md font-mono font-bold shrink-0 transition-colors ${
                                                        active
                                                            ? 'bg-white/20 text-white'
                                                            : item.badgeVariant === 'danger'
                                                            ? 'bg-[#F1416C]/20 text-[#F1416C] animate-pulse'
                                                            : item.badgeVariant === 'accent'
                                                            ? 'bg-[#1B84FF]/20 text-[#1B84FF] group-hover:bg-[#1B84FF] group-hover:text-white'
                                                            : item.badgeVariant === 'success'
                                                            ? 'bg-[#50CD89]/20 text-[#50CD89]'
                                                            : 'bg-[#2B2B40] text-[#9D9DA6] group-hover:text-white'
                                                    }`}
                                                >
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Bottom Metronic System Info Card */}
                    <div className="p-4 border-t border-[#26273B] bg-[#161622]/90">
                        <div className="p-3 rounded-xl bg-[#1B1B28] border border-[#2B2B40] space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-semibold text-white">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#50CD89] animate-pulse"></span>
                                    <span>Cloud SIMRS Node</span>
                                </span>
                                <span className="text-[10px] font-mono text-[#78829D]">v4.2.0</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-[#78829D] font-mono">
                                <span>SATUSEHAT FHIR R4</span>
                                <span className="text-[#50CD89] font-bold">Terhubung</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Metronic Canvas (#F5F8FA) */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F5F8FA]">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

