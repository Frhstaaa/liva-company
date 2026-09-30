import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SiteProvider, useSite } from './context/SiteContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import AssessmentModal from './components/AssessmentModal';
import ModuleDetailModal from './components/ModuleDetailModal';
import Toast from './components/Toast';
import WhatsAppWidget from './components/WhatsAppWidget';

// Public Pages
import BerandaPage from './pages/public/BerandaPage';
import KatalogModulPage from './pages/public/KatalogModulPage';
import KeunggulanPage from './pages/public/KeunggulanPage';
import StudiKasusPage from './pages/public/StudiKasusPage';
import JadwalkanDemoPage from './pages/public/JadwalkanDemoPage';
import TentangKamiPage from './pages/public/TentangKamiPage';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSettingsCMS from './pages/admin/AdminSettingsCMS';
import AdminPageLayoutBuilder from './pages/admin/AdminPageLayoutBuilder';
import AdminModules from './pages/admin/AdminModules';
import AdminPillars from './pages/admin/AdminPillars';
import AdminComparisons from './pages/admin/AdminComparisons';
import AdminCaseStudies from './pages/admin/AdminCaseStudies';
import AdminLeads from './pages/admin/AdminLeads';
import AdminSecurity from './pages/admin/AdminSecurity';
import AdminAuditLogs from './pages/admin/AdminAuditLogs';
import AdminProfile from './pages/admin/AdminProfile';

function MainApp() {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const { loading: siteLoading } = useSite();

    // Map initial browser URL to route
    const getInitialPath = () => {
        const path = window.location.pathname.replace(/^\/+/g, '');
        if (path === '' || path === 'beranda') return 'beranda';
        if (path === 'modul-simrs') return 'modul-simrs';
        if (path === 'keunggulan' || path === 'solusi-khusus') return 'keunggulan';
        if (path === 'studi-kasus') return 'studi-kasus';
        if (path === 'jadwalkan-demo') return 'jadwalkan-demo';
        if (path === 'tentang-kami') return 'tentang-kami';
        if (path.startsWith('admin')) return 'admin-dashboard';
        return 'beranda';
    };

    const [currentPath, setCurrentPath] = useState(getInitialPath);
    const [adminActiveTab, setAdminActiveTab] = useState('dashboard');
    const [adminSelectedPage, setAdminSelectedPage] = useState('beranda');

    const handleOpenPageEditor = (pageId = 'beranda') => {
        setAdminSelectedPage(pageId);
        setAdminActiveTab('layout-builder');
        window.history.pushState(null, '', '/admin#layout-builder');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle browser back/forward
    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(getInitialPath());
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigateTo = (path, tab = 'dashboard') => {
        setCurrentPath(path);
        if (path.startsWith('admin')) {
            setAdminActiveTab(tab);
            window.history.pushState(null, '', '/admin');
        } else {
            const url = path === 'beranda' ? '/' : `/${path}`;
            window.history.pushState(null, '', url);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (authLoading || siteLoading) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-headline-sm text-sm font-bold text-primary tracking-tight">
                        Liva SIMRS • Hospital Intelligence Platform
                    </span>
                </div>
            </div>
        );
    }

    // Render Admin Views
    if (currentPath === 'admin-login') {
        if (isAuthenticated) {
            return (
                <AdminLayout
                    activeTab={adminActiveTab}
                    onSelectTab={(tab) => setAdminActiveTab(tab)}
                    onNavigatePublic={navigateTo}
                    onOpenPageEditor={handleOpenPageEditor}
                >
                    <AdminDashboard
                        onSelectTab={setAdminActiveTab}
                        onNavigatePublic={navigateTo}
                        onOpenPageEditor={handleOpenPageEditor}
                    />
                </AdminLayout>
            );
        }
        return <AdminLoginPage onNavigatePublic={navigateTo} />;
    }

    if (currentPath.startsWith('admin')) {
        if (!isAuthenticated) {
            return <AdminLoginPage onNavigatePublic={navigateTo} />;
        }

        return (
            <AdminLayout
                activeTab={adminActiveTab}
                onSelectTab={(tab) => setAdminActiveTab(tab)}
                onNavigatePublic={navigateTo}
                onOpenPageEditor={handleOpenPageEditor}
            >
                {adminActiveTab === 'dashboard' && (
                    <AdminDashboard
                        onSelectTab={setAdminActiveTab}
                        onNavigatePublic={navigateTo}
                        onOpenPageEditor={handleOpenPageEditor}
                    />
                )}
                {adminActiveTab === 'layout-builder' && (
                    <AdminPageLayoutBuilder
                        initialPageId={adminSelectedPage}
                        onNavigatePublic={navigateTo}
                    />
                )}
                {adminActiveTab === 'settings-cms' && <AdminSettingsCMS />}
                {adminActiveTab === 'modules' && <AdminModules />}
                {adminActiveTab === 'pillars' && <AdminPillars />}
                {adminActiveTab === 'comparisons' && <AdminComparisons />}
                {adminActiveTab === 'case-studies' && <AdminCaseStudies />}
                {adminActiveTab === 'leads' && <AdminLeads />}
                {adminActiveTab === 'security' && <AdminSecurity />}
                {adminActiveTab === 'audit-logs' && <AdminAuditLogs />}
                {adminActiveTab === 'profile' && <AdminProfile />}
            </AdminLayout>
        );
    }

    // Render Public Views
    return (
        <div className="flex flex-col min-h-screen bg-surface">
            <Navbar currentPath={currentPath} onNavigate={navigateTo} />

            <main className="flex-1 pt-24">
                {currentPath === 'beranda' && <BerandaPage onNavigate={navigateTo} />}
                {currentPath === 'modul-simrs' && <KatalogModulPage onNavigate={navigateTo} />}
                {currentPath === 'keunggulan' && <KeunggulanPage onNavigate={navigateTo} />}
                {currentPath === 'studi-kasus' && <StudiKasusPage onNavigate={navigateTo} />}
                {currentPath === 'tentang-kami' && <TentangKamiPage onNavigate={navigateTo} />}
                {currentPath === 'jadwalkan-demo' && <JadwalkanDemoPage onNavigate={navigateTo} />}
            </main>

            <Footer onNavigate={navigateTo} />

            {/* Global Interactive Modals & Toast */}
            <DemoModal />
            <AssessmentModal />
            <ModuleDetailModal />
            <Toast />
            <WhatsAppWidget />
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <SiteProvider>
                <MainApp />
            </SiteProvider>
        </AuthProvider>
    );
}

// Mount React Root
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}

