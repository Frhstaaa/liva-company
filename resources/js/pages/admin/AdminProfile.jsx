import React, { useState } from 'react';
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
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, KeyRound, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminProfile() {
    const { user, updateProfile } = useAuth();
    const { showToast } = useSite();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [securityPin, setSecurityPin] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                name,
                email,
                avatar_url: avatarUrl,
            };

            if (newPassword) {
                payload.current_password = currentPassword;
                payload.new_password = newPassword;
            }

            if (securityPin) {
                payload.security_pin = securityPin;
            }

            await updateProfile(payload);
            showToast('Profil dan kredensial keamanan berhasil diperbarui', 'success');
            setCurrentPassword('');
            setNewPassword('');
            setSecurityPin('');
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal memperbarui profil';
            showToast(msg, 'error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Top Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="text-[#2F8BFF] bg-blue-50/70 border-blue-200/80 font-mono text-[10.5px] px-2.5 py-0.5"
                        >
                            <User className="h-3 w-3 mr-1 text-[#2F8BFF]" />
                            Superadministrator Session
                        </Badge>
                        <span className="text-xs text-slate-300">•</span>
                        <Badge
                            variant="outline"
                            className="text-emerald-700 bg-emerald-50/80 border-emerald-200/80 font-mono text-[10.5px] px-2.5 py-0.5"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 inline-block"></span>
                            2FA & PIN Protected
                        </Badge>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2937] font-display">
                        Profil Administrator
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
                        Kelola identitas akun, email akses login, kata sandi, dan master PIN otorisasi dekripsi data sensitif.
                    </p>
                </div>

                <Avatar className="h-14 w-14 border-2 border-[#2F8BFF]/30 shadow-xs shrink-0">
                    <AvatarImage src={avatarUrl} alt={name} />
                    <AvatarFallback className="bg-[#2F8BFF]/10 text-[#2F8BFF] font-bold text-sm">
                        {name ? name.slice(0, 2).toUpperCase() : 'AD'}
                    </AvatarFallback>
                </Avatar>
            </div>

            {/* Profile Form */}
            <Card className="border-slate-200 shadow-xs">
                <form onSubmit={handleSubmit}>
                    <CardContent className="p-6 sm:p-8 space-y-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-[#2F8BFF]" />
                                <h3 className="text-sm font-bold text-[#1F2937] font-display">
                                    Informasi Dasar Pengguna
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Nama Lengkap
                                    </label>
                                    <Input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="text-xs"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Email Login
                                    </label>
                                    <Input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="text-xs"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    URL Foto Profil (Avatar)
                                </label>
                                <Input
                                    type="text"
                                    value={avatarUrl}
                                    onChange={(e) => setAvatarUrl(e.target.value)}
                                    placeholder="https://images.unsplash.com/photo-..."
                                    className="font-mono text-xs"
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Security PIN */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <KeyRound className="h-4 w-4 text-[#2F8BFF]" />
                                    <h3 className="text-sm font-bold text-[#1F2937] font-display">
                                        PIN Keamanan Otorisasi Enkripsi
                                    </h3>
                                </div>
                                <Badge variant="outline" className="text-[10px] font-mono text-[#2F8BFF]">
                                    4 - 8 Digit
                                </Badge>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                PIN ini digunakan untuk membuka kunci brankas dekripsi kredensial API SATUSEHAT dan BPJS di menu Keamanan.
                            </p>

                            <div>
                                <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                    Ubah / Set PIN Baru (Opsional)
                                </label>
                                <Input
                                    type="password"
                                    maxLength={8}
                                    value={securityPin}
                                    onChange={(e) => setSecurityPin(e.target.value)}
                                    placeholder="Kosongkan jika tidak ingin mengubah PIN"
                                    className="sm:w-64 font-mono text-xs tracking-widest"
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Password Change */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-[#2F8BFF]" />
                                <h3 className="text-sm font-bold text-[#1F2937] font-display">
                                    Ganti Kata Sandi Administrator
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Kata Sandi Saat Ini
                                    </label>
                                    <Input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Kata sandi lama"
                                        className="text-xs"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                                        Kata Sandi Baru
                                    </label>
                                    <Input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Minimal 8 karakter"
                                        className="text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0 flex justify-end">
                        <Button type="submit" disabled={saving} className="gap-1.5 shadow-xs">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>{saving ? 'Menyimpan...' : 'Perbarui Profil & Keamanan'}</span>
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
