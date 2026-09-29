import React from 'react';
import { useSite } from '../context/SiteContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
    const { toast, closeToast } = useSite();

    if (!toast) return null;

    const isSuccess = toast.type === 'success';
    const isError = toast.type === 'error';

    return (
        <div className="fixed bottom-6 right-6 z-[9999] max-w-md animate-slide-up">
            <div className={`p-4 rounded-2xl shadow-2xl flex items-start gap-3.5 border backdrop-blur-md transition-all ${
                isSuccess
                    ? 'bg-white/95 text-[#1F2937] border-emerald-300 shadow-emerald-500/10'
                    : isError
                    ? 'bg-white/95 text-[#1F2937] border-rose-300 shadow-rose-500/10'
                    : 'bg-[#1F2937]/95 text-white border-slate-700 shadow-black/20'
            }`}>
                <div className="shrink-0 mt-0.5">
                    {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {isError && <AlertCircle className="w-5 h-5 text-rose-500" />}
                    {!isSuccess && !isError && <Info className="w-5 h-5 text-[#5BC0FF]" />}
                </div>

                <div className="flex-1 pr-2">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#1F2937]">
                        {isSuccess ? 'Berhasil' : isError ? 'Terjadi Kesalahan' : 'Pemberitahuan'}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-sans">
                        {toast.message}
                    </p>
                </div>

                <button
                    onClick={closeToast}
                    className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer active:scale-90"
                    aria-label="Tutup Notifikasi"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
