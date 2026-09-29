import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const SiteContext = createContext();

export function SiteProvider({ children }) {
    const [siteData, setSiteData] = useState({
        settings: {},
        modules: [],
        pillars: [],
        comparisons: [],
        case_studies: [],
        assessments: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modals state
    const [demoModalOpen, setDemoModalOpen] = useState(false);
    const [demoPreselectedModule, setDemoPreselectedModule] = useState(null);
    const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
    const [activeModuleModal, setActiveModuleModal] = useState(null);

    // Toast state
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'success', duration = 4000) => {
        setToast({ message, type, id: Date.now() });
        setTimeout(() => {
            setToast((prev) => (prev?.id === toast?.id ? null : prev));
        }, duration);
    }, [toast]);

    const fetchSiteData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/public/site-data');
            if (res.data.status === 'success') {
                setSiteData(res.data.data);
            }
        } catch (err) {
            console.error('Failed to load site data:', err);
            setError('Gagal memuat data konfigurasi website');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSiteData();
    }, [fetchSiteData]);

    const openDemoModal = (moduleCodeOrTitle = null) => {
        setDemoPreselectedModule(moduleCodeOrTitle);
        setDemoModalOpen(true);
    };

    const closeDemoModal = () => {
        setDemoModalOpen(false);
        setDemoPreselectedModule(null);
    };

    const openAssessmentModal = () => {
        setAssessmentModalOpen(true);
    };

    const closeAssessmentModal = () => {
        setAssessmentModalOpen(false);
    };

    const openModuleModal = (module) => {
        setActiveModuleModal(module);
    };

    const closeModuleModal = () => {
        setActiveModuleModal(null);
    };

    // Helper to get dynamic setting value
    const getSetting = (key, fallback = '') => {
        return siteData.settings && siteData.settings[key] !== undefined
            ? siteData.settings[key]
            : fallback;
    };

    return (
        <SiteContext.Provider value={{
            siteData,
            loading,
            error,
            getSetting,
            refetchSiteData: fetchSiteData,
            // Modals
            demoModalOpen,
            demoPreselectedModule,
            openDemoModal,
            closeDemoModal,
            assessmentModalOpen,
            openAssessmentModal,
            closeAssessmentModal,
            activeModuleModal,
            openModuleModal,
            closeModuleModal,
            // Toast
            toast,
            showToast,
            closeToast: () => setToast(null),
        }}>
            {children}
        </SiteContext.Provider>
    );
}

export function useSite() {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error('useSite must be used within a SiteProvider');
    }
    return context;
}
