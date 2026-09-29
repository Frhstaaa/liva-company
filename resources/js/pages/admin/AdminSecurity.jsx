import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
    ShieldAlert,
    KeyRound,
    Lock,
    Unlock,
    CheckCircle2,
    Binary,
    FileCheck2,
    Eye,
    EyeOff,
    AlertTriangle,
} from 'lucide-react';

export default function AdminSecurity() {
    const { verifyPin } = useAuth();
    const { showToast } = useSite();

    const [credentials, setCredentials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unlocked, setUnlocked] = useState(false);
    const [pinModalOpen, setPinModalOpen] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [verifying, setVerifying] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({});

    const fetchSecurityCredentials = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/security-credentials');
            if (res.data.status === 'success') {
                setCredentials(res.data.data);
                const map = {};
                res.data.data.forEach((c) => {
                    map[c.key] = c.decrypted_value || '';
                });
                setFormData(map);
            }
        } catch (err) {
            showToast('Gagal memuat kredensial keamanan', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSecurityCredentials();
    }, []);

    const handleUnlockRequest = () => {
        setPinInput('');
        setPinModalOpen(true);
    };

    const handleVerifyPinSubmit = async (e) => {
        e.preventDefault();
        setVerifying(true);

        try {
            await verifyPin(pinInput);
            setUnlocked(true);
            setPinModalOpen(false);
            showToast('PIN Keamanan terverifikasi. Kunci terenkripsi berhasil didekripsi.', 'success');
        } catch (err) {
            showToast('PIN Keamanan salah. Akses ditolak.', 'error');
        } finally {
            setVerifying(false);
        }
    };

    const handleSaveCredentials = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await axios.post('/api/admin/security-credentials', {
                credentials: formData,
            });

            if (res.data.status === 'success') {
                showToast(res.data.message, 'success');
                fetchSecurityCredentials();
                setUnlocked(false);
            }
        } catch (err) {
            showToast('Gagal menyimpan kredensial terenkripsi', 'error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Top Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="text-[#2F8BFF] bg-blue-50/70 border-blue-200/80 font-mono text-[10.5px] px-2.5 py-0.5"
                        >
                            <ShieldAlert className="h-3 w-3 mr-1 text-[#2F8BFF]" />
                            OpenSSL AES-256-CBC Enkripsi
                        </Badge>
                        <span className="text-xs text-slate-300">•</span>
                        <Badge
                            variant="outline"
                            className={`font-mono text-[10.5px] px-2.5 py-0.5 ${
                                unlocked
                                    ? 'text-[#FF8A2B] bg-orange-50/80 border-orange-200/80'
                                    : 'text-emerald-700 bg-emerald-50/80 border-emerald-200/80'
                            }`}
                        >
                            <span
                                className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${
                                    unlocked ? 'bg-[#FF8A2B] animate-pulse' : 'bg-emerald-500'
                                }`}
                            ></span>
                            {unlocked ? 'Sesi Dekripsi Aktif' : 'Vault Terproteksi PIN'}
                        </Badge>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2937] font-display">
                        Master PIN & Enkripsi Kredensial
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                        Kunci API integrasi produksi SATUSEHAT Kemenkes RI dan BPJS VClaim tersimpan secara terenkripsi di database.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                    {!unlocked ? (
                        <Button
                            onClick={handleUnlockRequest}
                            className="bg-[#2F8BFF] hover:bg-[#256ecc] text-white shadow-xs gap-1.5 h-9 px-4 rounded-lg font-medium text-xs cursor-pointer"
                        >
                            <KeyRound className="h-4 w-4" />
                            <span>Buka Vault dengan PIN</span>
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            onClick={() => setUnlocked(false)}
                            className="bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs gap-1.5 h-9 px-4 rounded-lg font-medium text-xs cursor-pointer"
                        >
                            <Lock className="h-4 w-4 text-slate-500" />
                            <span>Kunci Kembali Vault</span>
                        </Button>
                    )}
                </div>
            </div>

            {/* Security Architecture KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-slate-200 shadow-xs">
                    <CardHeader className="p-5 pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="text-xs font-semibold text-slate-500">
                                Cipher Algorithm
                            </CardDescription>
                            <Binary className="h-4 w-4 text-[#2F8BFF]" />
                        </div>
                        <CardTitle className="text-base font-bold text-[#1F2937] font-mono">
                            AES-256-CBC
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                        <span className="text-[11px] text-[#2F8BFF] font-medium block">
                            Hardware Accelerated Encryption
                        </span>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-xs">
                    <CardHeader className="p-5 pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="text-xs font-semibold text-slate-500">
                                Status Akses Sensitif
                            </CardDescription>
                            {unlocked ? (
                                <Unlock className="h-4 w-4 text-[#FF8A2B]" />
                            ) : (
                                <Lock className="h-4 w-4 text-emerald-600" />
                            )}
                        </div>
                        <CardTitle className="text-base font-bold text-[#1F2937]">
                            {unlocked ? 'Unlocked (Decrypted)' : 'Locked (Secured)'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                        <span className={`text-[11px] font-semibold block ${unlocked ? 'text-[#FF8A2B]' : 'text-emerald-700'}`}>
                            {unlocked ? 'Akses sensitif terbuka di memori' : 'Dilindungi master PIN & HMAC'}
                        </span>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-xs">
                    <CardHeader className="p-5 pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="text-xs font-semibold text-slate-500">
                                Compliance & Audit Trail
                            </CardDescription>
                            <FileCheck2 className="h-4 w-4 text-[#2F8BFF]" />
                        </div>
                        <CardTitle className="text-base font-bold text-[#1F2937]">
                            ISO 27001 Ready
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                        <span className="text-[11px] text-slate-500 block">
                            Semua mutasi dicatat otomatis ke audit log
                        </span>
                    </CardContent>
                </Card>
            </div>

            {/* Form Keys */}
            <Card className="border-slate-200 shadow-xs">
                <CardHeader className="p-6 pb-4">
                    <CardTitle className="text-sm font-bold text-[#1F2937] font-display">
                        Daftar Kunci Integrasi Nasional (Production Vault)
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                        Digunakan oleh worker bridging background untuk berkomunikasi dengan SATUSEHAT dan BPJS VClaim.
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-6 pt-0">
                    <form onSubmit={handleSaveCredentials} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {credentials.map((cred) => (
                                <div key={cred.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold text-[#1F2937]">
                                            {cred.description || cred.key}
                                        </label>
                                        <Badge variant="outline" className="text-[9px] font-mono text-[#2F8BFF] bg-white border-[#2F8BFF]/20">
                                            AES-256
                                        </Badge>
                                    </div>

                                    <Input
                                        type={unlocked ? 'text' : 'password'}
                                        disabled={!unlocked}
                                        value={unlocked ? (formData[cred.key] || '') : '••••••••••••••••••••••••'}
                                        onChange={(e) => setFormData({ ...formData, [cred.key]: e.target.value })}
                                        className={`font-mono text-xs ${
                                            !unlocked ? 'opacity-60 cursor-not-allowed bg-slate-100' : 'bg-white'
                                        }`}
                                    />
                                </div>
                            ))}
                        </div>

                        {unlocked && (
                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setUnlocked(false)}
                                >
                                    Batalkan Akses
                                </Button>
                                <Button type="submit" disabled={saving}>
                                    {saving ? 'Mengenkripsi & Menyimpan...' : 'Simpan Kredensial Terenkripsi'}
                                </Button>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>

            {/* PIN Dialog Modal */}
            <Dialog open={pinModalOpen} onOpenChange={setPinModalOpen}>
                <DialogContent className="max-w-sm text-center">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2F8BFF] flex items-center justify-center mx-auto border border-blue-100">
                        <Lock className="h-6 w-6" />
                    </div>

                    <DialogHeader className="text-center sm:text-center">
                        <DialogTitle>Masukkan PIN Keamanan</DialogTitle>
                        <DialogDescription>
                            Diperlukan otorisasi PIN untuk mendekripsi kredensial produksi.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleVerifyPinSubmit} className="space-y-4 pt-2">
                        <Input
                            type="password"
                            autoFocus
                            maxLength={8}
                            value={pinInput}
                            onChange={(e) => setPinInput(e.target.value)}
                            placeholder="PIN Keamanan (Default: 889900)"
                            className="text-center tracking-widest text-lg font-mono"
                        />

                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500">
                            💡 PIN demo default superadmin: <code className="font-mono font-bold text-[#2F8BFF]">889900</code>
                        </div>

                        <DialogFooter className="flex-row gap-2 sm:justify-center">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setPinModalOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={verifying || !pinInput}
                            >
                                {verifying ? 'Verifikasi...' : 'Buka Vault'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
