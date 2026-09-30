import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Calculator,
    TrendingUp,
    Clock,
    FileText,
    ShieldAlert,
    Server,
    CheckCircle2,
    Sparkles,
    ArrowRight,
    Building2,
    Hospital,
    Layers
} from 'lucide-react';

export default function HospitalRoiCalculator({ onScheduleDemo }) {
    const [facilityType, setFacilityType] = useState('rs_cd');
    const [bedCount, setBedCount] = useState(120);
    const [outpatientDaily, setOutpatientDaily] = useState(250);

    const calculations = useMemo(() => {
        // Daily patient visits * 300 operational days
        const annualOutpatient = outpatientDaily * 300;
        const annualInpatient = bedCount * 365 * 0.75; // 75% BOR average

        // Paperless savings (Rekam medis fisik + map + kertas formulir + cetak resep)
        const paperSavingsAnnual = (annualOutpatient * 6500) + (annualInpatient * 35000);

        // Doctor & nurse time efficiency (saving ~ 7 minutes per encounter)
        const hoursSavedAnnual = Math.round((annualOutpatient * 7) / 60);

        // BPJS dispute prevention (<0.3% vs conventional 6%)
        const totalClaimValue = annualOutpatient * 380000;
        const disputePrevented = totalClaimValue * 0.045; // 4.5% dispute risk eliminated

        // Server CAPEX & Maintenance saved (On-prem server + cooling + UPS + sysadmin vs Cloud SaaS)
        const serverCapexSaved = bedCount > 150 ? 450000000 : bedCount > 50 ? 250000000 : 95000000;

        const totalFinancialImpact = paperSavingsAnnual + disputePrevented + (serverCapexSaved * 0.4);

        // Percentage shares for visual distribution bar
        const totalRaw = paperSavingsAnnual + disputePrevented + (serverCapexSaved * 0.4);
        const paperPct = Math.round((paperSavingsAnnual / totalRaw) * 100) || 30;
        const disputePct = Math.round((disputePrevented / totalRaw) * 100) || 50;
        const serverPct = 100 - paperPct - disputePct;

        return {
            paperSavingsAnnual: Math.round(paperSavingsAnnual),
            hoursSavedAnnual,
            disputePrevented: Math.round(disputePrevented),
            serverCapexSaved,
            totalFinancialImpact: Math.round(totalFinancialImpact),
            paperPct,
            disputePct,
            serverPct
        };
    }, [facilityType, bedCount, outpatientDaily]);

    const formatRupiah = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="card-clinical overflow-hidden font-sans border border-slate-200/90 shadow-md">
            {/* Calculator Header */}
            <div className="p-5 sm:p-7 bg-[#0F172A] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-[#60A5FA] text-[11px] font-mono border border-blue-500/30 font-bold">
                        <Calculator className="h-3 w-3" />
                        <span>INTERACTIVE TCO &amp; ROI COST CALCULATOR</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                        Kalkulator Efisiensi Anggaran &amp; ROI Faskes
                    </h3>
                    <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                        Hitung proyeksi penghematan biaya kertas, waktu entri medis, eliminasi risiko dispute klaim BPJS, dan zero-CAPEX server untuk faskes Anda.
                    </p>
                </div>

                {/* Facility Selector Quick Pills */}
                <div className="flex flex-wrap gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/80 shrink-0">
                    <button
                        type="button"
                        onClick={() => { setFacilityType('rs_cd'); setBedCount(100); setOutpatientDaily(200); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer btn-spring focus-ring ${
                            facilityType === 'rs_cd' ? 'bg-[#1E60D5] text-white shadow-xs' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        RS Kelas C / D
                    </button>
                    <button
                        type="button"
                        onClick={() => { setFacilityType('rs_ab'); setBedCount(300); setOutpatientDaily(600); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer btn-spring focus-ring ${
                            facilityType === 'rs_ab' ? 'bg-[#1E60D5] text-white shadow-xs' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        RS Kelas A / B
                    </button>
                    <button
                        type="button"
                        onClick={() => { setFacilityType('klinik'); setBedCount(15); setOutpatientDaily(80); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer btn-spring focus-ring ${
                            facilityType === 'klinik' ? 'bg-[#1E60D5] text-white shadow-xs' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        Klinik Pratama
                    </button>
                    <button
                        type="button"
                        onClick={() => { setFacilityType('klinik_k3'); setBedCount(10); setOutpatientDaily(120); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer btn-spring focus-ring ${
                            facilityType === 'klinik_k3' ? 'bg-[#F97316] text-white shadow-xs' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        Klinik K3 Industri
                    </button>
                </div>
            </div>

            {/* Interactive Sliders & Results Grid */}
            <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-7">
                {/* Left Controls */}
                <div className="lg:col-span-5 space-y-6 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-[#0F172A]">Kapasitas Tempat Tidur (TT / Beds):</label>
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1E60D5] font-mono font-bold text-xs border border-blue-200 animate-scale-in">
                                {bedCount} Tempat Tidur
                            </span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="500"
                            step="5"
                            value={bedCount}
                            onChange={(e) => setBedCount(Number(e.target.value))}
                            className="w-full cursor-pointer focus-ring"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                            <span>10 Beds</span>
                            <span>250 Beds</span>
                            <span>500 Beds</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-[#0F172A]">Kunjungan Pasien Rawat Jalan / Hari:</label>
                            <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-[#EA580C] font-mono font-bold text-xs border border-orange-200 animate-scale-in">
                                {outpatientDaily} Pasien/Hari
                            </span>
                        </div>
                        <input
                            type="range"
                            min="20"
                            max="1200"
                            step="10"
                            value={outpatientDaily}
                            onChange={(e) => setOutpatientDaily(Number(e.target.value))}
                            className="w-full cursor-pointer focus-ring"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                            <span>20 Pasien</span>
                            <span>600 Pasien</span>
                            <span>1.200 Pasien</span>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 space-y-2 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            <span>Kepatuhan SATUSEHAT Kemenkes Otomatis</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            <span>Zero CAPEX Server Fisik (Managed Cloud)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            <span>Bridging BPJS VClaim &amp; Antrean Online v2.0</span>
                        </div>
                    </div>
                </div>

                {/* Right Calculated Output Cards */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    {/* Top Impact Highlight Banner */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 border border-blue-200/90 space-y-3 relative overflow-hidden">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono">
                                Proyeksi Nilai Efisiensi Faskes per Tahun:
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1E60D5] font-mono text-[10px] font-bold">
                                EST. ROI ANUAL
                            </span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-[#1E60D5] font-display tabular-nums">
                            {formatRupiah(calculations.totalFinancialImpact)}
                            <span className="text-xs text-slate-500 font-normal font-sans ml-1">/ tahun</span>
                        </div>
                        
                        {/* Dynamic Proportional Breakdown Bar */}
                        <div className="space-y-1 pt-1">
                            <div className="flex justify-between text-[10.5px] font-mono text-slate-500">
                                <span>Distribusi Nilai Efisiensi:</span>
                                <span>Kertas ({calculations.paperPct}%) • Klaim ({calculations.disputePct}%) • IT ({calculations.serverPct}%)</span>
                            </div>
                            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
                                <div style={{ width: `${calculations.paperPct}%` }} className="bg-[#1E60D5] transition-all duration-300"></div>
                                <div style={{ width: `${calculations.disputePct}%` }} className="bg-[#F97316] transition-all duration-300"></div>
                                <div style={{ width: `${calculations.serverPct}%` }} className="bg-emerald-500 transition-all duration-300"></div>
                            </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed pt-1">
                            Total nilai manfaat langsung dari penghematan operasional kertas, pencegahan dispute klaim, dan pemangkasan jam kerja administratif tenaga medis.
                        </p>
                    </div>

                    {/* Breakdown 3 Metric Boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-1 shadow-2xs">
                            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                                <FileText className="h-3.5 w-3.5 text-[#1E60D5]" />
                                <span>Hemat Kertas &amp; Map RME</span>
                            </div>
                            <div className="text-base font-bold text-[#0F172A] font-display tabular-nums">
                                {formatRupiah(calculations.paperSavingsAnnual)}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono block">100% Paperless</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-1 shadow-2xs">
                            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                                <ShieldAlert className="h-3.5 w-3.5 text-[#F97316]" />
                                <span>Cegah Dispute BPJS</span>
                            </div>
                            <div className="text-base font-bold text-[#EA580C] font-display tabular-nums">
                                {formatRupiah(calculations.disputePrevented)}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono block">Pre-validasi INA-CBGs</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-1 shadow-2xs">
                            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                                <span>Waktu Staf Tersimpan</span>
                            </div>
                            <div className="text-base font-bold text-emerald-700 font-display tabular-nums">
                                {calculations.hoursSavedAnnual.toLocaleString('id-ID')} Jam
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono block">Efisiensi Pelayanan</span>
                        </div>
                    </div>

                    {/* Action CTA */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-xs text-slate-500">
                            Ingin analisa TCO mendalam untuk rumah sakit / klinik Anda?
                        </span>
                        <Button
                            size="sm"
                            onClick={onScheduleDemo}
                            className="h-10 px-5 gap-2 bg-[#1E60D5] hover:bg-[#164DB0] text-white font-semibold text-xs shrink-0 btn-spring shadow-md shadow-blue-600/20 cursor-pointer focus-ring rounded-xl"
                        >
                            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                            <span>Konsultasikan Anggaran &amp; Demo</span>
                            <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
