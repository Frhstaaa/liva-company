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
} from 'lucide-react';

export default function AdminLayout({ activeTab, onSelectTab, onNavigatePublic, children }) {
    const { user, logout } = useAuth();
    const { getSetting } = useSite();
    const siteName = getSetting('site_name', 'Liva SIMRS');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navGroups = [
        {
            group: 'DASHBOARD & OVERVIEW',
            items: [
                { id: 'dashboard', label: 'Executive Cockpit', icon: LayoutDashboard, badge: null },
            ],
        },
        {
            group: 'KONTEN PROFIL RS',
            items: [
                { id: 'settings-cms', label: 'Pengaturan CMS Beranda', icon: Sliders, badge: 'Publik' },
                { id: 'modules', label: 'Katalog 32 Modul', icon: Layers, badge: null },
                { id: 'pillars', label: '6 Pilar Keunggulan', icon: ShieldCheck, badge: null },
                { id: 'comparisons', label: 'Tabel Komparasi KLAS', icon: GitCompare, badge: null },
                { id: 'case-studies', label: 'Studi Kasus RS Mitra', icon: BookOpen, badge: null },
            ],
        },
        {
            group: 'LEADS & CRM',
            items: [
                { id: 'leads', label: 'Permohonan Demo RS', icon: Inbox, badge: 'Live', badgeVariant: 'accent' },
            ],
        },
        {
            group: 'SECURITY & AKUN',
            items: [
                { id: 'security', label: 'Master PIN & Enkripsi', icon: Lock, badge: 'AES-256' },
                { id: 'audit-logs', label: 'Log Audit Keamanan', icon: History, badge: null },
                { id: 'profile', label: 'Profil Administrator', icon: UserCheck, badge: null },
            ],
        },
    ];

    const currentTabLabel = navGroups
        .flatMap((g) => g.items)
        .find((i) => i.id === activeTab)?.label || 'Console';

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#1F2937] flex flex-col font-sans antialiased">
            {/* Unified Clean Header */}
            <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
                {/* Left side: Hamburger & Brand / Breadcrumbs */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:text-[#1F2937] hover:bg-slate-100 transition-colors"
                        aria-label="Toggle Sidebar"
                    >
                        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#2F8BFF] flex items-center justify-center font-bold text-white shadow-xs">
                                <Shield className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5 font-display font-bold text-sm text-[#1F2937]">
                                    <span>{siteName}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A2B]"></span>
                                </div>
                                <span className="text-[9.5px] font-mono text-slate-400 leading-none">
                                    Enterprise Console
                                </span>
                            </div>
                        </div>

                        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 pl-3 border-l border-slate-200">
                            <span>Admin</span>
                            <ChevronRight className="h-3 w-3 text-slate-300" />
                            <span className="font-semibold text-[#1F2937]">{currentTabLabel}</span>
                        </div>
                    </div>
                </div>

                {/* Right side: Public Site Link, Status & Profile */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>AES-256 Vault Active</span>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigatePublic('beranda')}
                        className="text-slate-600 hover:text-[#1F2937] text-xs gap-1.5 h-8 px-3 rounded-lg border-slate-200"
                    >
                        <Eye className="h-3.5 w-3.5 text-[#2F8BFF]" />
                        <span className="hidden sm:inline">Lihat Web Publik</span>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 cursor-pointer transition-colors focus:outline-none"
                            >
                                <Avatar className="h-8 w-8 border border-slate-200 shadow-2xs">
                                    <AvatarImage src={user?.avatar_url} alt={user?.name} />
                                    <AvatarFallback className="bg-blue-50 text-[#2F8BFF] font-bold text-xs">
                                        {user?.name?.slice(0, 2).toUpperCase() || 'AD'}
                                    </AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-xs font-bold text-[#1F2937] leading-none">{user?.name}</p>
                                    <p className="text-[11px] font-mono leading-none text-slate-500">{user?.email}</p>
                                    <Badge variant="outline" className="w-fit text-[9px] mt-1 text-[#2F8BFF] bg-blue-50 border-[#2F8BFF]/20">
                                        {user?.role || 'Superadministrator'}
                                    </Badge>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onSelectTab('profile')} className="cursor-pointer text-xs">
                                <UserCheck className="mr-2 h-3.5 w-3.5 text-[#2F8BFF]" />
                                <span>Pengaturan Profil</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSelectTab('security')} className="cursor-pointer text-xs">
                                <Lock className="mr-2 h-3.5 w-3.5 text-[#FF8A2B]" />
                                <span>Master PIN & Kunci Vault</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onNavigatePublic('beranda')} className="cursor-pointer text-xs">
                                <ExternalLink className="mr-2 h-3.5 w-3.5 text-slate-500" />
                                <span>Kunjungi Website Publik</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout} className="text-rose-600 focus:text-rose-700 cursor-pointer text-xs">
                                <LogOut className="mr-2 h-3.5 w-3.5" />
                                <span>Keluar (Logout)</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Main Workspace Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* Backdrop for Mobile Sidebar */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden backdrop-blur-xs"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar Navigation - Linear / Supabase Style */}
                <aside
                    className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-200 transform ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
                >
                    <div className="p-3.5 space-y-6 overflow-y-auto flex-1">
                        {navGroups.map((group, gIdx) => (
                            <div key={gIdx} className="space-y-1">
                                <div className="px-3 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
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
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                                                active
                                                    ? 'bg-[#2F8BFF]/10 text-[#2F8BFF] font-bold shadow-2xs'
                                                    : 'text-slate-600 hover:text-[#1F2937] hover:bg-slate-50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <IconComponent
                                                    className={`h-4 w-4 shrink-0 ${
                                                        active ? 'text-[#2F8BFF]' : 'text-slate-400'
                                                    }`}
                                                />
                                                <span className="truncate">{item.label}</span>
                                            </div>
                                            {item.badge && (
                                                <Badge
                                                    variant={item.badgeVariant === 'accent' ? 'accent' : 'secondary'}
                                                    className="text-[9px] px-1.5 py-0 font-mono shrink-0"
                                                >
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Bottom Sidebar Status Card */}
                    <div className="p-3.5 border-t border-slate-100 bg-slate-50/50 space-y-2">
                        <div className="flex items-center justify-between text-[10.5px] font-mono text-slate-500 px-1">
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                <span>DB Kemenkes Ready</span>
                            </span>
                            <span className="text-slate-400">v4.2</span>
                        </div>
                    </div>
                </aside>

                {/* Main Content Viewport */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F8FAFC]">
                    <div className="max-w-6xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
