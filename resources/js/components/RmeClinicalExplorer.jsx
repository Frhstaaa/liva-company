import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Activity,
    Stethoscope,
    Sparkles,
    CheckCircle2,
    Smile,
    UserCheck,
    FileText,
    Mic,
    Shield,
    Layers,
    Clock,
    AlertCircle,
    ChevronRight,
    RefreshCw
} from 'lucide-react';

export default function RmeClinicalExplorer() {
    const [activeTab, setActiveTab] = useState('odontogram'); // 'odontogram' | 'bodychart' | 'soap' | 'k3_mcu'
    
    // Odontogram state
    const [selectedTooth, setSelectedTooth] = useState(16);
    const [teethState, setTeethState] = useState({
        18: { status: 'sound', label: 'Sehat / Normal' },
        17: { status: 'filling', label: 'Tambalan Komposit' },
        16: { status: 'caries', label: 'Karies Oklusal (Dentin)' },
        15: { status: 'sound', label: 'Sehat / Normal' },
        14: { status: 'missing', label: 'Gigi Hilang (Edentulous)' },
        11: { status: 'sound', label: 'Sehat / Normal' },
        21: { status: 'sound', label: 'Sehat / Normal' },
        26: { status: 'crown', label: 'Crown / Mahkota Tiruan' },
        36: { status: 'caries', label: 'Karies Pulpa' },
        46: { status: 'filling', label: 'Tambalan GIC' },
    });

    // Body chart state
    const [selectedRegion, setSelectedRegion] = useState('chest');
    const regions = {
        head: { name: 'Kepala & Leher', icd: 'R51 - Headache / Cephalea', note: 'Nyeri tumpul temporal bilateral sejak 2 hari, skala nyeri 4/10. Tidak ada tanda trauma.' },
        chest: { name: 'Thorax / Dada & Paru', icd: 'R07.4 - Chest Pain, Unspecified', note: 'Suara nafas vesikuler, tidak ada wheezing/ronkhi. EKG: Sinus Rhythm 78 bpm regular.' },
        abdomen: { name: 'Abdomen / Perut', icd: 'K30 - Dyspepsia', note: 'Nyeri tekan regio epigastrium (+), defans muskular (-), bising usus 8x/menit normal.' },
        extremity_r: { name: 'Ekstremitas Kanan Atas', icd: 'S61.0 - Open Wound of Thumb', note: 'Vulnus laceratum 2cm pada digiti I manus dextra, pendarahan terkontrol, TIK utuh.' },
        extremity_l: { name: 'Ekstremitas Bawah & Kaki', icd: 'M79.6 - Pain in Limb', note: 'Edema pretibial (-), ROM sendi lutut bebas tanpa krepitasi, pulsasi a. dorsalis pedis kuat.' }
    };

    const handleToothClick = (toothNum) => {
        setSelectedTooth(toothNum);
    };

    const setToothStatus = (status, label) => {
        setTeethState(prev => ({
            ...prev,
            [selectedTooth]: { status, label }
        }));
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            {/* Top Minimalist Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-[#2F8BFF]/20 text-[#5BC0FF] border border-[#2F8BFF]/30">
                            LIVE CLINICAL WORKSPACE
                        </span>
                        <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                            <Shield className="h-3 w-3 text-emerald-400" />
                            Permenkes 24/2022 Verified
                        </span>
                    </div>
                    <h3 className="text-xl font-bold font-display text-white">
                        Suite Rekam Medis Elektronik (RME) Spesialis
                    </h3>
                    <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
                        Pengisian rekam medis digital presisi dengan formulir dinamis per disiplin ilmu: Odontogram Poli Gigi, Anatomi Body Chart, SOAP Terstandar, hingga MCU Kesehatan Kerja K3.
                    </p>
                </div>

                {/* Tab Switcher Pills */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/80 shrink-0">
                    <button
                        type="button"
                        onClick={() => setActiveTab('odontogram')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeTab === 'odontogram'
                                ? 'bg-[#2F8BFF] text-white shadow-sm'
                                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                        }`}
                    >
                        <Smile className="h-3.5 w-3.5" />
                        <span>Odontogram Gigi</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('bodychart')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeTab === 'bodychart'
                                ? 'bg-[#2F8BFF] text-white shadow-sm'
                                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                        }`}
                    >
                        <Activity className="h-3.5 w-3.5" />
                        <span>Body Chart Anatomi</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('soap')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeTab === 'soap'
                                ? 'bg-[#2F8BFF] text-white shadow-sm'
                                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                        }`}
                    >
                        <FileText className="h-3.5 w-3.5" />
                        <span>SOAP &amp; Dictation</span>
                    </button>
                </div>
            </div>

            {/* Interactive Workspace Area */}
            <div className="p-5 sm:p-7 bg-[#F8FAFC]">
                {/* TAB 1: ODONTOGRAM DIGITAL GIGI */}
                {activeTab === 'odontogram' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
                            <div>
                                <h4 className="text-sm font-bold text-[#1F2937] flex items-center gap-2 font-display">
                                    <Smile className="h-4 w-4 text-[#2F8BFF]" />
                                    <span>Peta Odontogram Gigi Dewasa (Standar FDI World Dental Federation)</span>
                                </h4>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Klik nomor elemen gigi untuk menetapkan kondisi klinis (Karies, Tambalan, Mahkota, Ekstraksi).
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                                    Gigi Terpilih: <strong className="text-[#2F8BFF]">#{selectedTooth}</strong>
                                </span>
                            </div>
                        </div>

                        {/* Visual Tooth Rows */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-6">
                            {/* Rahang Atas (Maxilla) */}
                            <div>
                                <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
                                    — RAHANG ATAS (KUADRAN 1 &amp; 2) —
                                </div>
                                <div className="flex justify-center flex-wrap gap-2 sm:gap-2.5">
                                    {[18, 17, 16, 15, 14, 13, 12, 11].map(num => {
                                        const current = teethState[num] || { status: 'sound' };
                                        const isSelected = selectedTooth === num;
                                        return (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => handleToothClick(num)}
                                                className={`w-9 h-12 sm:w-11 sm:h-14 rounded-lg flex flex-col items-center justify-between p-1.5 text-xs font-mono font-bold transition-all cursor-pointer border ${
                                                    isSelected
                                                        ? 'ring-2 ring-[#2F8BFF] ring-offset-2 border-[#2F8BFF]'
                                                        : 'hover:border-slate-400'
                                                } ${
                                                    current.status === 'caries'
                                                        ? 'bg-rose-50 border-rose-300 text-rose-700'
                                                        : current.status === 'filling'
                                                        ? 'bg-blue-50 border-blue-300 text-[#2F8BFF]'
                                                        : current.status === 'missing'
                                                        ? 'bg-slate-100 border-slate-300 text-slate-400 line-through'
                                                        : current.status === 'crown'
                                                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                                                        : 'bg-white border-slate-200 text-slate-700'
                                                }`}
                                            >
                                                <span className="text-[10px] text-slate-400 font-normal">{num}</span>
                                                <div className={`w-3.5 h-3.5 rounded-full border ${
                                                    current.status === 'caries' ? 'bg-rose-500 border-rose-600' :
                                                    current.status === 'filling' ? 'bg-blue-500 border-blue-600' :
                                                    current.status === 'crown' ? 'bg-amber-500 border-amber-600' :
                                                    current.status === 'missing' ? 'bg-slate-300 border-slate-400' :
                                                    'bg-emerald-100 border-emerald-300'
                                                }`} />
                                            </button>
                                        );
                                    })}
                                    <div className="w-4 flex items-center justify-center text-slate-300">|</div>
                                    {[21, 22, 23, 24, 25, 26, 27, 28].map(num => {
                                        const current = teethState[num] || { status: 'sound' };
                                        const isSelected = selectedTooth === num;
                                        return (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => handleToothClick(num)}
                                                className={`w-9 h-12 sm:w-11 sm:h-14 rounded-lg flex flex-col items-center justify-between p-1.5 text-xs font-mono font-bold transition-all cursor-pointer border ${
                                                    isSelected
                                                        ? 'ring-2 ring-[#2F8BFF] ring-offset-2 border-[#2F8BFF]'
                                                        : 'hover:border-slate-400'
                                                } ${
                                                    current.status === 'caries'
                                                        ? 'bg-rose-50 border-rose-300 text-rose-700'
                                                        : current.status === 'filling'
                                                        ? 'bg-blue-50 border-blue-300 text-[#2F8BFF]'
                                                        : current.status === 'missing'
                                                        ? 'bg-slate-100 border-slate-300 text-slate-400 line-through'
                                                        : current.status === 'crown'
                                                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                                                        : 'bg-white border-slate-200 text-slate-700'
                                                }`}
                                            >
                                                <span className="text-[10px] text-slate-400 font-normal">{num}</span>
                                                <div className={`w-3.5 h-3.5 rounded-full border ${
                                                    current.status === 'caries' ? 'bg-rose-500 border-rose-600' :
                                                    current.status === 'filling' ? 'bg-blue-500 border-blue-600' :
                                                    current.status === 'crown' ? 'bg-amber-500 border-amber-600' :
                                                    current.status === 'missing' ? 'bg-slate-300 border-slate-400' :
                                                    'bg-emerald-100 border-emerald-300'
                                                }`} />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Rahang Bawah (Mandibula) */}
                            <div>
                                <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
                                    — RAHANG BAWAH (KUADRAN 4 &amp; 3) —
                                </div>
                                <div className="flex justify-center flex-wrap gap-2 sm:gap-2.5">
                                    {[48, 47, 46, 45, 44, 43, 42, 41].map(num => {
                                        const current = teethState[num] || { status: 'sound' };
                                        const isSelected = selectedTooth === num;
                                        return (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => handleToothClick(num)}
                                                className={`w-9 h-12 sm:w-11 sm:h-14 rounded-lg flex flex-col items-center justify-between p-1.5 text-xs font-mono font-bold transition-all cursor-pointer border ${
                                                    isSelected
                                                        ? 'ring-2 ring-[#2F8BFF] ring-offset-2 border-[#2F8BFF]'
                                                        : 'hover:border-slate-400'
                                                } ${
                                                    current.status === 'caries'
                                                        ? 'bg-rose-50 border-rose-300 text-rose-700'
                                                        : current.status === 'filling'
                                                        ? 'bg-blue-50 border-blue-300 text-[#2F8BFF]'
                                                        : current.status === 'missing'
                                                        ? 'bg-slate-100 border-slate-300 text-slate-400 line-through'
                                                        : current.status === 'crown'
                                                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                                                        : 'bg-white border-slate-200 text-slate-700'
                                                }`}
                                            >
                                                <div className={`w-3.5 h-3.5 rounded-full border ${
                                                    current.status === 'caries' ? 'bg-rose-500 border-rose-600' :
                                                    current.status === 'filling' ? 'bg-blue-500 border-blue-600' :
                                                    current.status === 'crown' ? 'bg-amber-500 border-amber-600' :
                                                    current.status === 'missing' ? 'bg-slate-300 border-slate-400' :
                                                    'bg-emerald-100 border-emerald-300'
                                                }`} />
                                                <span className="text-[10px] text-slate-400 font-normal">{num}</span>
                                            </button>
                                        );
                                    })}
                                    <div className="w-4 flex items-center justify-center text-slate-300">|</div>
                                    {[31, 32, 33, 34, 35, 36, 37, 38].map(num => {
                                        const current = teethState[num] || { status: 'sound' };
                                        const isSelected = selectedTooth === num;
                                        return (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => handleToothClick(num)}
                                                className={`w-9 h-12 sm:w-11 sm:h-14 rounded-lg flex flex-col items-center justify-between p-1.5 text-xs font-mono font-bold transition-all cursor-pointer border ${
                                                    isSelected
                                                        ? 'ring-2 ring-[#2F8BFF] ring-offset-2 border-[#2F8BFF]'
                                                        : 'hover:border-slate-400'
                                                } ${
                                                    current.status === 'caries'
                                                        ? 'bg-rose-50 border-rose-300 text-rose-700'
                                                        : current.status === 'filling'
                                                        ? 'bg-blue-50 border-blue-300 text-[#2F8BFF]'
                                                        : current.status === 'missing'
                                                        ? 'bg-slate-100 border-slate-300 text-slate-400 line-through'
                                                        : current.status === 'crown'
                                                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                                                        : 'bg-white border-slate-200 text-slate-700'
                                                }`}
                                            >
                                                <div className={`w-3.5 h-3.5 rounded-full border ${
                                                    current.status === 'caries' ? 'bg-rose-500 border-rose-600' :
                                                    current.status === 'filling' ? 'bg-blue-500 border-blue-600' :
                                                    current.status === 'crown' ? 'bg-amber-500 border-amber-600' :
                                                    current.status === 'missing' ? 'bg-slate-300 border-slate-400' :
                                                    'bg-emerald-100 border-emerald-300'
                                                }`} />
                                                <span className="text-[10px] text-slate-400 font-normal">{num}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Interactive Assign Bar for Selected Tooth */}
                        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2F8BFF] font-mono font-bold flex items-center justify-center text-sm border border-blue-100">
                                    #{selectedTooth}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-[#1F2937]">
                                        Status Elemen: <span className="text-[#2F8BFF] font-medium">{teethState[selectedTooth]?.label || 'Sehat / Normal'}</span>
                                    </div>
                                    <span className="text-[11px] text-slate-500">Pilih tindakan klinis untuk gigi #{selectedTooth}:</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setToothStatus('caries', 'Karies Oklusal (Dentin)')}
                                    className="h-8 text-xs bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                                >
                                    🔴 Karies (Caries)
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setToothStatus('filling', 'Tambalan Komposit')}
                                    className="h-8 text-xs bg-blue-50 text-[#2F8BFF] border-blue-200 hover:bg-blue-100"
                                >
                                    🔵 Tambalan (Filling)
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setToothStatus('crown', 'Crown / Mahkota')}
                                    className="h-8 text-xs bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                                >
                                    🟡 Crown / Mahkota
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setToothStatus('missing', 'Gigi Hilang (Edentulous)')}
                                    className="h-8 text-xs bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                                >
                                    ⚪ Hilang (Missing)
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setToothStatus('sound', 'Sehat / Normal')}
                                    className="h-8 text-xs bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                >
                                    🟢 Sehat (Sound)
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: VISUAL BODY CHART ANATOMI */}
                {activeTab === 'bodychart' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
                        {/* Interactive Region Selector */}
                        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                            <h4 className="text-sm font-bold text-[#1F2937] flex items-center gap-2 font-display">
                                <Activity className="h-4 w-4 text-[#2F8BFF]" />
                                <span>Pilih Regio Anatomi Tubuh</span>
                            </h4>
                            <p className="text-xs text-slate-500">
                                Dokter umum &amp; bedah dapat menandai keluhan fisik secara presisi untuk audit trail medis.
                            </p>

                            <div className="space-y-2">
                                {Object.entries(regions).map(([key, reg]) => {
                                    const isSelected = selectedRegion === key;
                                    return (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => setSelectedRegion(key)}
                                            className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                                                isSelected
                                                    ? 'bg-blue-50/80 border-[#2F8BFF] text-[#1F2937] shadow-2xs font-semibold'
                                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#2F8BFF]' : 'bg-slate-300'}`}></span>
                                                <span className="text-xs">{reg.name}</span>
                                            </div>
                                            <ChevronRight className={`h-3.5 w-3.5 ${isSelected ? 'text-[#2F8BFF]' : 'text-slate-400'}`} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Region Diagnostic Card */}
                        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2F8BFF] font-mono text-[11px] font-bold border border-blue-100">
                                            REGIO AKTIF
                                        </span>
                                        <h4 className="text-sm font-bold text-[#1F2937]">
                                            {regions[selectedRegion]?.name}
                                        </h4>
                                    </div>
                                    <Badge variant="emeraldLight" className="font-mono text-[10px]">
                                        ICD-10 Terhubung
                                    </Badge>
                                </div>

                                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80 space-y-1.5 font-mono text-xs">
                                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                                        Suggested ICD-10 Code (Kemenkes SATUSEHAT):
                                    </span>
                                    <div className="font-bold text-[#2F8BFF]">
                                        {regions[selectedRegion]?.icd}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700">Catatan Temuan Fisik Dokter:</label>
                                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed font-sans">
                                        {regions[selectedRegion]?.note}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                                <span>Status: TTE BSrE Ready</span>
                                <span className="text-emerald-600 font-bold flex items-center gap-1">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    Tersinkronisasi ke RME Utama
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: SOAP REKAM MEDIS & VOICE DICTATION */}
                {activeTab === 'soap' && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                <div>
                                    <h4 className="text-sm font-bold text-[#1F2937] font-display">
                                        Formulir Entri SOAP Berbasis ICD-10 &amp; Voice Dictation
                                    </h4>
                                    <p className="text-xs text-slate-500">
                                        Rata-rata waktu entri 2.4 menit per pasien dengan template spesialisasi dinamis.
                                    </p>
                                </div>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-mono border border-emerald-200">
                                    <Mic className="h-3 w-3 text-rose-500 animate-pulse" />
                                    Voice AI Ready
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-slate-200 space-y-1">
                                    <span className="text-[11px] font-bold text-[#2F8BFF] font-mono block">S - SUBJECTIVE (Anamnesis):</span>
                                    <p className="text-xs text-slate-700">Pasien mengeluh pusing berputar dan tengkuk berat sejak 2 hari yang lalu setelah lembur kerja.</p>
                                </div>
                                <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-slate-200 space-y-1">
                                    <span className="text-[11px] font-bold text-emerald-600 font-mono block">O - OBJECTIVE (Tanda Vital):</span>
                                    <p className="text-xs text-slate-700 font-mono">TD: 145/90 mmHg | HR: 82x/m | RR: 18x/m | SpO2: 98% | Temp: 36.7°C</p>
                                </div>
                                <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-slate-200 space-y-1">
                                    <span className="text-[11px] font-bold text-[#FF8A2B] font-mono block">A - ASSESSMENT (Diagnosis):</span>
                                    <p className="text-xs text-slate-700 font-mono">I10 - Essential (Primary) Hypertension [ICD-10 Kemenkes Validated]</p>
                                </div>
                                <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-slate-200 space-y-1">
                                    <span className="text-[11px] font-bold text-indigo-600 font-mono block">P - PLAN (Terapi &amp; Resep):</span>
                                    <p className="text-xs text-slate-700 font-mono">Amlodipine 5mg tab No. XXX (1x1 pagi) • Edukasi diet rendah garam</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
