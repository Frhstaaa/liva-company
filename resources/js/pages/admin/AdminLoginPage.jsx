import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';
import { User, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage({ onNavigatePublic }) {
    const { login } = useAuth();
    const { getSetting, showToast } = useSite();
    const siteName = getSetting('site_name', 'Liva SIMRS');
    const siteLogo = getSetting('site_logo', 'https://lh3.googleusercontent.com/aida/AEtjO1XAHIn1996QD1vNDMJOI8vdcD23fhuJ9R1JA7IQBDBpCleoEmx9kMbyYdRUDT0uLi7_REF8zQVaH0To8_w471zcowmSdXjp2znm9RnHL5dtzXY8dA103emK9CmIDNTLY41jkXa8FVs-gZ80YgXohNYtPSkgXFfEBGxyU4w0aGxkITySYI_yEPJOhgmzNIOLyTBXTg1IMhQsGD2dUtkAOrYDyjtEFtFHLVJZjFyOSJIPWo5i2pitZyCQXaIH');

    const [email, setEmail] = useState('admin@livasimrs.id');
    const [password, setPassword] = useState('AdminLiva2026!');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            await login(email, password);
            showToast('Login berhasil. Selamat datang di Panel Administrator Liva SIMRS.', 'success');
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Login gagal';
            setErrorMessage(msg);
            showToast(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans bg-clinical-grid">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6 relative overflow-hidden animate-scale-spring">
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2F8BFF] via-[#5BC0FF] to-[#FF8A2B]"></div>

                {/* Brand Header */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <img src={siteLogo} alt={siteName} className="h-9 w-auto object-contain" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#1F2937] font-display">
                            Selamat Datang
                        </h2>
                        <p className="text-xs text-slate-500 font-medium font-mono">
                            Sistem Informasi Manajemen Rumah Sakit
                        </p>
                    </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-slide-up">
                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Username / Email Administrator
                        </label>
                        <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Username"
                                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F8BFF] focus:border-[#2F8BFF] transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Pre-filled default credentials hint */}
                    <div className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                        <span className="font-semibold text-[#2F8BFF] block">💡 Akun Demo Administrator:</span>
                        <div>Email: <code className="font-mono bg-white px-1.5 py-0.5 rounded text-[#1F2937] font-bold border border-slate-200">admin@livasimrs.id</code></div>
                        <div>Password: <code className="font-mono bg-white px-1.5 py-0.5 rounded text-[#1F2937] font-bold border border-slate-200">AdminLiva2026!</code></div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-[#2F8BFF] hover:bg-[#1E75E6] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 btn-spring"
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                <span>Mengotentikasi...</span>
                            </>
                        ) : (
                            <span>Masuk</span>
                        )}
                    </button>
                </form>

                {/* Back to Public Site */}
                <div className="text-center pt-2 border-t border-slate-100">
                    <button
                        onClick={() => onNavigatePublic('beranda')}
                        className="text-xs text-[#2F8BFF] font-semibold hover:underline inline-flex items-center gap-1.5 cursor-pointer btn-spring"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Kembali ke Beranda</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
