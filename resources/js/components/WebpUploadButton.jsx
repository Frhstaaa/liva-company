import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useSite } from '../context/SiteContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Upload, 
    CheckCircle2, 
    Sparkles, 
    Image as ImageIcon, 
    RefreshCw, 
    Eye,
    X,
    ExternalLink
} from 'lucide-react';

export default function WebpUploadButton({ 
    value = '', 
    onUploadSuccess, 
    label = 'Upload Gambar (Auto-WebP)',
    placeholder = 'https://...',
    className = ''
}) {
    const { showToast } = useSite();
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [uploadStats, setUploadStats] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Size check (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showToast('Ukuran gambar maksimal 10MB', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            setUploading(true);
            setUploadStats(null);
            
            const res = await axios.post('/api/admin/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.status === 'success') {
                const data = res.data.data;
                setUploadStats(data);
                showToast(res.data.message || 'Gambar berhasil diunggah dan terkonversi ke WebP!', 'success');
                if (onUploadSuccess) {
                    onUploadSuccess(data.url, data);
                }
            }
        } catch (err) {
            console.error('Image upload failed:', err);
            const errMsg = err.response?.data?.message || 'Gagal mengunggah dan mengonversi gambar';
            showToast(errMsg, 'error');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml,image/bmp"
                onChange={handleFileChange}
                className="hidden"
            />

            <div className="flex flex-wrap items-center gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 px-3 rounded-lg text-xs font-medium border-dashed border-slate-300 hover:border-[#1E60D5] hover:bg-blue-50/50 text-slate-700 hover:text-[#1E60D5] gap-1.5 cursor-pointer shadow-2xs"
                >
                    {uploading ? (
                        <>
                            <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#1E60D5]" />
                            <span>Mengonversi ke WebP...</span>
                        </>
                    ) : (
                        <>
                            <Upload className="h-3.5 w-3.5 text-[#1E60D5]" />
                            <span>{label}</span>
                        </>
                    )}
                </Button>

                {uploadStats && (
                    <Badge variant="outline" className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border-emerald-200">
                        <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-600 inline" />
                        WebP Ready: {uploadStats.webp_size_kb} KB (-{uploadStats.savings_percent}%)
                    </Badge>
                )}

                {value && (
                    <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-[#1E60D5] font-mono underline"
                    >
                        <Eye className="h-3 w-3" />
                        <span>Pratinjau Gambar</span>
                    </a>
                )}
            </div>

            {/* Thumbnail Preview if value exists */}
            {value && (
                <div className="relative inline-block mt-1">
                    <div className="w-20 h-14 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shadow-2xs relative group">
                        <img 
                            src={value} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
