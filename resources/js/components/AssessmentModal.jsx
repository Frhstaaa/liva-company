import React, { useState } from 'react';
import axios from 'axios';
import { useSite } from '../context/SiteContext';
import {
    X,
    ClipboardCheck,
    CheckCircle2,
    RotateCcw,
    Calendar,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Lightbulb
} from 'lucide-react';

export default function AssessmentModal() {
    const { assessmentModalOpen, closeAssessmentModal, siteData, openDemoModal, showToast } = useSite();
    const assessments = siteData.assessments || [];

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [calculating, setCalculating] = useState(false);

    if (!assessmentModalOpen) return null;

    const handleSelectOption = (questionId, optionIndex) => {
        setAnswers({
            ...answers,
            [questionId]: optionIndex,
        });
    };

    const handleNext = () => {
        if (currentStep < assessments.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleCalculateScore();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleCalculateScore = async () => {
        setCalculating(true);
        try {
            const res = await axios.post('/api/public/assessment', { answers });
            if (res.data.status === 'success') {
                setResult(res.data.data);
            }
        } catch (err) {
            showToast('Gagal menghitung skor kesiapan. Silakan coba lagi.', 'error');
        } finally {
            setCalculating(false);
        }
    };

    const handleReset = () => {
        setAnswers({});
        setResult(null);
        setCurrentStep(0);
        closeAssessmentModal();
    };

    const currentQuestion = assessments[currentStep];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
            <div className="relative w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4 max-h-[92vh] flex flex-col font-sans animate-scale-in">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/40 border-b border-slate-200 p-4 sm:p-5 text-[#1F2937] relative shrink-0">
                    <button
                        onClick={handleReset}
                        className="absolute top-3.5 right-3.5 w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 btn-spring"
                        aria-label="Tutup"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700 mb-1.5 shadow-2xs">
                        <ClipboardCheck className="h-3 w-3 text-emerald-600" />
                        <span>EVALUASI PERMENKES NO. 24 / 2022</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#1F2937] font-display">
                        Uji Kelayakan &amp; Kesiapan SIMRS
                    </h3>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                        Ketahui skor kesiapan transformasi digital dan rekomendasi teknis faskes Anda.
                    </p>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5 md:p-6 overflow-y-auto flex-1 bg-white text-[#1F2937]">
                    {result ? (
                        <div className="space-y-4 animate-scale-in">
                            {/* Score Card */}
                            <div className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-center space-y-2">
                                <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider font-bold">
                                    Hasil Analisis Kesiapan Digitalisasi Faskes
                                </span>
                                <div className="flex items-center justify-center gap-1">
                                    <span className="text-4xl sm:text-5xl font-black text-[#2F8BFF] font-display">
                                        {result.score}%
                                    </span>
                                </div>
                                <div className="inline-block px-2.5 py-0.5 rounded-full bg-white border border-slate-200 shadow-2xs">
                                    <span className={`text-xs font-bold font-mono ${result.level_color}`}>
                                        STATUS: {result.level}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                                    {result.summary}
                                </p>
                            </div>

                            {/* Recommendations List */}
                            {result.recommendations && result.recommendations.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-[#1F2937] uppercase font-mono tracking-wider">
                                        Rekomendasi Roadmap Teknis:
                                    </h4>
                                    <div className="space-y-1.5">
                                        {result.recommendations.map((rec, i) => (
                                            <div key={i} className="p-3 rounded-lg border border-slate-200 bg-white text-xs space-y-0.5">
                                                <div className="flex items-center justify-between font-bold text-[#1F2937]">
                                                    <span className="text-[#2F8BFF]">{rec.category}</span>
                                                    <span className="font-mono text-slate-500 text-[11px]">Skor: {rec.score}/100</span>
                                                </div>
                                                <p className="text-slate-500 text-[11px]">
                                                    <strong>Kondisi:</strong> {rec.selected}
                                                </p>
                                                <p className="text-slate-800 font-medium text-[11px] flex items-start gap-1">
                                                    <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                                                    <span><strong>Langkah:</strong> {rec.recommendation}</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
                                <button
                                    onClick={() => {
                                        setResult(null);
                                        setCurrentStep(0);
                                        setAnswers({});
                                    }}
                                    className="text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer font-mono flex items-center gap-1 btn-spring"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    <span>Ulangi Kuis</span>
                                </button>

                                <button
                                    onClick={() => {
                                        closeAssessmentModal();
                                        openDemoModal();
                                    }}
                                    className="w-full sm:w-auto px-5 py-2 bg-[#2F8BFF] hover:bg-[#1E75E6] text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer btn-spring"
                                >
                                    <Calendar className="h-4 w-4" />
                                    <span>Konsultasikan Roadmap Medis</span>
                                </button>
                            </div>
                        </div>
                    ) : assessments.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 text-xs">
                            Tidak ada pertanyaan evaluasi yang tersedia saat ini.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Progress bar */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono font-bold">
                                    <span>PERTANYAAN {currentStep + 1} DARI {assessments.length}</span>
                                    <span>{Math.round(((currentStep + 1) / assessments.length) * 100)}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className="bg-[#2F8BFF] h-full transition-all duration-300 ease-out"
                                        style={{ width: `${((currentStep + 1) / assessments.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Question */}
                            <div className="space-y-2">
                                <div className="inline-block px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[#2F8BFF] text-[10.5px] font-mono font-bold">
                                    Kategori: {currentQuestion.category}
                                </div>
                                <h4 className="text-sm sm:text-base font-bold text-[#1F2937] leading-snug font-display">
                                    {currentQuestion.question}
                                </h4>

                                {/* Options */}
                                <div className="space-y-1.5 pt-1">
                                    {currentQuestion.options && currentQuestion.options.map((opt, optIndex) => {
                                        const isSelected = answers[currentQuestion.id] === optIndex;
                                        return (
                                            <button
                                                key={optIndex}
                                                type="button"
                                                onClick={() => handleSelectOption(currentQuestion.id, optIndex)}
                                                className={`w-full text-left p-3 rounded-lg border text-xs sm:text-[13px] transition-all flex items-start gap-2.5 cursor-pointer btn-spring ${
                                                    isSelected
                                                        ? 'bg-blue-50/80 border-[#2F8BFF] ring-1 ring-[#2F8BFF]/40 text-[#1F2937] font-semibold shadow-xs'
                                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                                                    isSelected ? 'border-[#2F8BFF] bg-[#2F8BFF] text-white' : 'border-slate-300'
                                                }`}>
                                                    {isSelected && <span className="w-1 h-1 rounded-full bg-white"></span>}
                                                </div>
                                                <span className="leading-relaxed">{opt.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Navigation buttons */}
                            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentStep === 0}
                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors btn-spring cursor-pointer"
                                >
                                    Kembali
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={answers[currentQuestion.id] === undefined || calculating}
                                    className="px-4 py-1.5 bg-[#2F8BFF] hover:bg-[#1E75E6] text-white rounded-lg text-xs font-bold shadow-xs transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 cursor-pointer btn-spring"
                                >
                                    {calculating ? (
                                        <span>Menghitung...</span>
                                    ) : currentStep === assessments.length - 1 ? (
                                        <>
                                            <span>Lihat Skor</span>
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </>
                                    ) : (
                                        <>
                                            <span>Selanjutnya</span>
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

