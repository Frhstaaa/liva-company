<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use App\Models\SimrsModule;
use App\Models\SimrsPillar;
use App\Models\SimrsComparison;
use App\Models\SimrsCaseStudy;
use App\Models\SimrsAssessment;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LivaSimrsSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Default Super Admin
        User::updateOrCreate(
            ['email' => 'admin@livasimrs.id'],
            [
                'name' => 'dr. Hendra Wibowo',
                'password' => Hash::make('AdminLiva2026!'),
                'role' => 'superadmin',
                'avatar_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1qFBFfpt3Fu5veYNX_JqFcXpmq4FwVfgAzNNF1r_FPQp1F0AK5_D2wm_e2M-ipM0i2hCvPiusMBfpwHvVFoQWR3yVNK29Cgln82JTnL8Z4-kz5vqGMiQ7Mrteh2C8EApMRR5aDmR5M9B2IZO0q-IO8oEu14gxPsa8jhEzBh2Ppy7-YRPvvAv5_JLRxLrD0DclM2ZUV4l_rC07yI6QJkkm9Rkqu2w8t403Zqm_eVFy0gJR_p2fBmfd2A',
                'security_pin' => Hash::make('889900'),
                'is_active' => true,
            ]
        );

        // 2. Default Site Settings
        $settings = [
            // General
            ['group' => 'general', 'key' => 'site_name', 'value' => 'Liva SIMRS', 'type' => 'text', 'description' => 'Nama Brand / Platform SIMRS'],
            ['group' => 'general', 'key' => 'site_tagline', 'value' => 'Hospital Intelligence Platform', 'type' => 'text', 'description' => 'Tagline / Slogan'],
            ['group' => 'general', 'key' => 'site_logo', 'value' => 'https://lh3.googleusercontent.com/aida/AEtjO1XAHIn1996QD1vNDMJOI8vdcD23fhuJ9R1JA7IQBDBpCleoEmx9kMbyYdRUDT0uLi7_REF8zQVaH0To8_w471zcowmSdXjp2znm9RnHL5dtzXY8dA103emK9CmIDNTLY41jkXa8FVs-gZ80YgXohNYtPSkgXFfEBGxyU4w0aGxkITySYI_yEPJOhgmzNIOLyTBXTg1IMhQsGD2dUtkAOrYDyjtEFtFHLVJZjFyOSJIPWo5i2pitZyCQXaIH', 'type' => 'image', 'description' => 'URL Logo Liva SIMRS'],
            ['group' => 'general', 'key' => 'top_announcement_text', 'value' => 'Kepatuhan Rekam Medis Elektronik Nasional: Terintegrasi Penuh dengan SATUSEHAT Kemenkes & BPJS Kesehatan Bridging VClaim 2.0', 'type' => 'text', 'description' => 'Teks Pengumuman Kepatuhan Header'],
            ['group' => 'general', 'key' => 'top_announcement_link_text', 'value' => 'Pelajari Regulasi', 'type' => 'text', 'description' => 'Teks Tombol Regulasi'],
            ['group' => 'general', 'key' => 'top_announcement_link_url', 'value' => '#regulasi', 'type' => 'text', 'description' => 'Link Regulasi'],

            // Hero Section
            ['group' => 'hero', 'key' => 'hero_badge_text', 'value' => 'Solusi SIMRS Generasi Baru • Terhubung SATUSEHAT & BPJS', 'type' => 'text', 'description' => 'Pill Badge Hero'],
            ['group' => 'hero', 'key' => 'hero_title_prefix', 'value' => 'Transformasi Digital Rumah Sakit yang', 'type' => 'text', 'description' => 'Awalan Judul Hero'],
            ['group' => 'hero', 'key' => 'hero_title_highlight_1', 'value' => 'Lebih Cepat', 'type' => 'text', 'description' => 'Highlight Biru Judul'],
            ['group' => 'hero', 'key' => 'hero_title_middle', 'value' => ', Terintegrasi, &', 'type' => 'text', 'description' => 'Tengah Judul'],
            ['group' => 'hero', 'key' => 'hero_title_highlight_2', 'value' => 'Berstandar Nasional', 'type' => 'text', 'description' => 'Highlight Oranye Judul'],
            ['group' => 'hero', 'key' => 'hero_description', 'value' => 'Liva SIMRS menghubungkan seluruh alur pelayanan mulai dari IGD, Rawat Jalan, Rawat Inap, Farmasi, Laboratorium hingga Rekam Medis Elektronik (RME) dalam satu ekosistem cloud yang aman & patuh regulasi.', 'type' => 'textarea', 'description' => 'Deskripsi Hero Beranda'],
            ['group' => 'hero', 'key' => 'hero_cta_primary_text', 'value' => 'Jadwalkan Demo Gratis', 'type' => 'text', 'description' => 'Teks CTA Utama Hero'],
            ['group' => 'hero', 'key' => 'hero_cta_secondary_text', 'value' => 'Lihat Simulasi Modul', 'type' => 'text', 'description' => 'Teks CTA Kedua Hero'],
            ['group' => 'hero', 'key' => 'hero_badge_1', 'value' => 'Sesuai Permenkes No. 24/2022', 'type' => 'text', 'description' => 'Badge Regulasi Permenkes'],
            ['group' => 'hero', 'key' => 'hero_badge_2', 'value' => 'Server Cloud Domestik Tier 3/4', 'type' => 'text', 'description' => 'Badge Server Domestik'],

            // Mockup Dashboard Stats (Simulated Live telemetry on Beranda)
            ['group' => 'telemetry', 'key' => 'mockup_hospital_name', 'value' => 'SIMRS Real-time Central Node • RSUD Sehat Terpadu', 'type' => 'text', 'description' => 'Nama RS Mockup'],
            ['group' => 'telemetry', 'key' => 'mockup_bor_percentage', 'value' => '78.4%', 'type' => 'text', 'description' => 'BOR Percentage'],
            ['group' => 'telemetry', 'key' => 'mockup_bor_status', 'value' => 'Status: Optimal', 'type' => 'text', 'description' => 'BOR Status Text'],
            ['group' => 'telemetry', 'key' => 'mockup_queue_count', 'value' => '412', 'type' => 'text', 'description' => 'Antrean Pasien Hari Ini'],
            ['group' => 'telemetry', 'key' => 'mockup_queue_served', 'value' => '386 Terlayani (93%)', 'type' => 'text', 'description' => 'Antrean Terlayani'],
            ['group' => 'telemetry', 'key' => 'mockup_satusehat_sync', 'value' => '100%', 'type' => 'text', 'description' => 'Persentase Sync SATUSEHAT'],
            ['group' => 'telemetry', 'key' => 'mockup_patient_name', 'value' => 'Ny. Ratna Kusuma (42 Thn)', 'type' => 'text', 'description' => 'Nama Pasien Mockup'],
            ['group' => 'telemetry', 'key' => 'mockup_patient_class', 'value' => 'BPJS Kelas 1', 'type' => 'text', 'description' => 'Kelas Pasien'],
            ['group' => 'telemetry', 'key' => 'mockup_patient_dpjp', 'value' => 'dr. Faisal Sp.JP • Poli Jantung', 'type' => 'text', 'description' => 'DPJP Pasien'],
            ['group' => 'telemetry', 'key' => 'mockup_patient_vitals', 'value' => '124/82 mmHg', 'type' => 'text', 'description' => 'Tanda Vital'],
            ['group' => 'telemetry', 'key' => 'mockup_patient_icd10', 'value' => 'I25.1', 'type' => 'text', 'description' => 'ICD 10'],
            ['group' => 'telemetry', 'key' => 'mockup_patient_pharmacy', 'value' => '3 Obat (Siap)', 'type' => 'text', 'description' => 'Status E-Resep'],
            ['group' => 'telemetry', 'key' => 'mockup_patient_eklaim', 'value' => 'Valid (Siap Kirim)', 'type' => 'text', 'description' => 'Status Eklaim'],
            ['group' => 'telemetry', 'key' => 'mockup_avg_wait_time', 'value' => '7.2 Menit', 'type' => 'text', 'description' => 'Rata-rata Waktu Tunggu Farmasi & Kasir'],

            // Keunggulan Key Metrics Strip
            ['group' => 'keunggulan', 'key' => 'kpi_rme_time', 'value' => '2.4 mnt', 'type' => 'text', 'description' => 'Rata-rata input RME per pasien'],
            ['group' => 'keunggulan', 'key' => 'kpi_rme_time_note', 'value' => 'Turun 78% dari SIMRS lama', 'type' => 'text', 'description' => 'Catatan RME'],
            ['group' => 'keunggulan', 'key' => 'kpi_fhir_sync', 'value' => '100%', 'type' => 'text', 'description' => 'Kepatuhan HL7 FHIR & SATUSEHAT'],
            ['group' => 'keunggulan', 'key' => 'kpi_fhir_note', 'value' => 'Zero Double Data-Entry', 'type' => 'text', 'description' => 'Catatan FHIR'],
            ['group' => 'keunggulan', 'key' => 'kpi_golive_speed', 'value' => '6-8 Mgg', 'type' => 'text', 'description' => 'SLA Go-Live Tercepat'],
            ['group' => 'keunggulan', 'key' => 'kpi_golive_note', 'value' => 'Pendampingan dokter on-site', 'type' => 'text', 'description' => 'Catatan Go-Live'],
            ['group' => 'keunggulan', 'key' => 'kpi_bpjs_dispute', 'value' => '< 0.3%', 'type' => 'text', 'description' => 'Klaim BPJS Dispute'],
            ['group' => 'keunggulan', 'key' => 'kpi_bpjs_note', 'value' => 'Pre-Validation INA-CBGs', 'type' => 'text', 'description' => 'Catatan BPJS Dispute'],

            // Contact & Company Details
            ['group' => 'contact', 'key' => 'contact_email', 'value' => 'halo@livasimrs.id', 'type' => 'text', 'description' => 'Email Resmi'],
            ['group' => 'contact', 'key' => 'contact_sales_email', 'value' => 'partnership@livasimrs.id', 'type' => 'text', 'description' => 'Email Tim Sales / Partnership'],
            ['group' => 'contact', 'key' => 'contact_phone', 'value' => '+62 21 8062 5599', 'type' => 'text', 'description' => 'Telepon Kantor'],
            ['group' => 'contact', 'key' => 'contact_whatsapp', 'value' => '+62 812 8899 0012', 'type' => 'text', 'description' => 'Hotline WhatsApp 24/7'],
            ['group' => 'contact', 'key' => 'contact_address', 'value' => 'Liva Health Intelligence Tower, Lt. 18, Jl. TB Simatupang No. 88, Cilandak, Jakarta Selatan 12430', 'type' => 'textarea', 'description' => 'Alamat Kantor'],

            // CSO Security & Encrypted Settings (stored with encryption flag)
            ['group' => 'security', 'key' => 'satusehat_client_id', 'value' => 'LIVA_PROD_SS_89201934', 'type' => 'text', 'encrypt' => true, 'description' => 'Client ID SATUSEHAT Kemenkes (Terenkripsi AES-256)'],
            ['group' => 'security', 'key' => 'satusehat_client_secret', 'value' => 'sec_9934fa_live_production_token_secret_encrypted', 'type' => 'text', 'encrypt' => true, 'description' => 'Client Secret SATUSEHAT (Terenkripsi AES-256)'],
            ['group' => 'security', 'key' => 'bpjs_vclaim_cons_id', 'value' => '39201', 'type' => 'text', 'encrypt' => true, 'description' => 'BPJS Consumer ID VClaim (Terenkripsi AES-256)'],
            ['group' => 'security', 'key' => 'bpjs_vclaim_user_key', 'value' => 'vk_live_2026_master_key_enc', 'type' => 'text', 'encrypt' => true, 'description' => 'BPJS User Key (Terenkripsi AES-256)'],
            ['group' => 'security', 'key' => 'admin_security_pin_required', 'value' => '1', 'type' => 'boolean', 'description' => 'Wajibkan PIN Keamanan untuk perubahan sensitif'],
        ];

        foreach ($settings as $s) {
            SiteSetting::set(
                key: $s['key'],
                value: $s['value'],
                group: $s['group'],
                encrypt: $s['encrypt'] ?? false,
                type: $s['type'] ?? 'text',
                description: $s['description'] ?? null
            );
        }

        // 3. Populate 8 Full SIMRS Modules
        $modules = [
            [
                'module_code' => 'MODUL-01',
                'category' => 'front-office',
                'category_label' => 'Front Office',
                'title' => 'Pendaftaran & Antrean Online',
                'badge_text' => 'Front Office',
                'short_description' => 'Mengeliminasi antrean fisik loket hingga 80% dengan integrasi multisaluran mulai dari mesin anjungan mandiri, aplikasi pasien, hingga sistem bridging otomatis.',
                'full_description' => 'Modul Pendaftaran & Antrean Online Liva SIMRS menghadirkan alur kedatangan pasien yang mulus dan modern. Dilengkapi Anjungan Mandiri (Kiosk), integrasi Mobile JKN BPJS, fingerprint biometrik, auto-issuing SEP VClaim, serta display pemanggil poli bersuara multi-bahasa.',
                'icon' => 'touch_app',
                'highlight_metric' => 'Memangkas antrean loket s/d 80%',
                'order_index' => 1,
                'is_featured' => true,
                'compliance_tags' => ['Bridging Antrean BPJS 2.0', 'Kemenkes SATUSEHAT', 'Anjungan Mandiri (APM)'],
                'features' => [
                    'Anjungan Pendaftaran Mandiri (APM) dengan Barcode & E-KTP reader',
                    'Integrasi penuh bridging sistem antrean online Mobile JKN BPJS Kesehatan',
                    'Otomasi penerbitan Surat Eligibilitas Peserta (SEP) VClaim tanpa antre loket',
                    'Sistem penomoran kuota dokter spesialis terpadu dan real-time display LCD poli',
                    'Notifikasi estimasi panggilan via WhatsApp Gateaway resmi',
                ],
            ],
            [
                'module_code' => 'MODUL-02',
                'category' => 'clinical',
                'category_label' => 'Pelayanan Medis',
                'title' => 'Rawat Jalan & Poli Spesialis',
                'badge_text' => 'Clinical Core',
                'short_description' => 'Dirancang untuk kecepatan konsultasi dokter spesialis dengan form asesmen klinis adaptif, template SOAP cepat, dan rekam medis elektronik otomatis.',
                'full_description' => 'Menyederhanakan alur kerja dokter dan perawat rawat jalan. Dilengkapi asesmen awal keperawatan triase, SOAP dokter dengan voice-to-text, integrasi riwayat alergi, CPPT terpadu, e-prescription satu-klik, serta rujukan internal antar spesialis secara instan.',
                'icon' => 'stethoscope',
                'highlight_metric' => 'Waktu asesmen hanya 2.4 menit',
                'order_index' => 2,
                'is_featured' => true,
                'compliance_tags' => ['Permenkes No. 24/2022', 'HL7 FHIR Resource Encounter', 'ICD-10 & ICD-9 CM'],
                'features' => [
                    'Template Asesmen Medis Spesifik (Bedah, Kandungan/Obsgyn, Jantung, Anak, Penyakit Dalam)',
                    'SOAP Elektronik interaktif dengan integrasi grafik kurva pertumbuhan WHO',
                    'E-Resep langsung terhubung ke sistem antrean peracikan apotek instalasi farmasi',
                    'Order CITO laboratorium dan radiologi langsung dari layar konsultasi dokter',
                    'Rujukan internal antar poli dan pembuatan surat kontrol PRB / BPJS terpadu',
                ],
            ],
            [
                'module_code' => 'MODUL-03',
                'category' => 'clinical',
                'category_label' => 'Pelayanan Medis',
                'title' => 'Rawat Inap & Bed Management',
                'badge_text' => 'Inpatient & Ward',
                'short_description' => 'Visibilitas ketersediaan bed secara real-time, monitoring CPPT antar PPA, pencatatan EWS otomatis, serta integrasi pemulangan pasien (discharge planning).',
                'full_description' => 'Pusat manajemen bangsal rawat inap modern. Mengatur transfer antar ruangan, perhitungan Early Warning System (EWS/PEWS/MEOWS) real-time, monitoring infus & obat per jam, catatan terintegrasi dokter-perawat-gizi-farmasi klinis, hingga persiapan billing kepulangan pasien.',
                'icon' => 'hotel',
                'highlight_metric' => 'Zero Bed Conflict • Realtime BOR',
                'order_index' => 3,
                'is_featured' => true,
                'compliance_tags' => ['Bridging Siranap Kemenkes', 'Appliedricard STARKES', 'EWS / PEWS Auto Alert'],
                'features' => [
                    'Interactive Floor Map Real-time Bed Management & Status Sanitasi Kamar',
                    'Catatan Perkembangan Pasien Terintegrasi (CPPT) kolaborasi multidisiplin PPA',
                    'Kalkulator EWS (Early Warning System) dengan deteksi dini kegawatan klinis',
                    'Instruksi Medis Farmakoterapi (e-MAR) dengan verifikasi barcode perawat',
                    'Otomasi sinkronisasi data ketersediaan bed ke Kemenkes SIRANAP & BPJS Aplicare',
                ],
            ],
            [
                'module_code' => 'MODUL-04',
                'category' => 'clinical',
                'category_label' => 'Pelayanan Medis',
                'title' => 'Rekam Medis Elektronik (RME) Terpadu',
                'badge_text' => 'RME Paripurna',
                'short_description' => 'Arsitektur RME berstandar Permenkes 24/2022 dengan enkripsi data medis tingkat tinggi, tanda tangan digital tersertifikasi BSrE, dan interoperabilitas HL7 FHIR.',
                'full_description' => 'Jantung digitalisasi rekam medis rumah sakit. Menyimpan seluruh rekam jejak pasien seumur hidup (Single Patient Identity), resume medis elektronik, lembar operasi, informed consent digital bertanda tangan pasien/wali di tablet, serta ekspor FHIR JSON resmi.',
                'icon' => 'assignment',
                'highlight_metric' => '100% Lolos Uji SATUSEHAT MRMIK',
                'order_index' => 4,
                'is_featured' => true,
                'compliance_tags' => ['TTE Digital BSrE/Kominfo', 'HL7 FHIR Resource Condition', 'Audit Trail ISO 27001'],
                'features' => [
                    'Tanda Tangan Elektronik (TTE) Tersertifikasi BSrE BSSN & QR Code Verifikasi',
                    'Pencarian riwayat rekam medis instan lintas kunjungan dalam < 0.5 detik',
                    'Informed consent digital via tablet dengan verifikasi biometrik / foto pasien',
                    'Audit trail keamanan setiap aksi view, edit, print, dan download rekam medis',
                    'Auto-mapping kode diagnosa SNOMED-CT, ICD-10, dan tindakan ICD-9 CM Kemenkes',
                ],
            ],
            [
                'module_code' => 'MODUL-05',
                'category' => 'pharmacy',
                'category_label' => 'Farmasi & Logistik',
                'title' => 'Farmasi, Depo & E-Prescription',
                'badge_text' => 'Pharmacy Smart Hub',
                'short_description' => 'Manajemen siklus hidup obat dari pengadaan e-katalog, stok opname real-time FEFO/FIFO, penyiapan resep racikan otomatis, hingga Clinical Decision Support alert.',
                'full_description' => 'Mengeliminasi kesalahan peresepan obat (medication error) hingga 99%. Menyediakan telaah resep otomatis (interaksi obat & dosis ganda), pemanggilan nomor antrean apotek otomatis, bridging KFA (Kamus Farmasi dan Alat Kesehatan Kemenkes), dan tracking stok antar depo obat.',
                'icon' => 'medication',
                'highlight_metric' => 'Zero Stock-out • 99% Prescribing Accuracy',
                'order_index' => 5,
                'is_featured' => true,
                'compliance_tags' => ['Integrasi KFA Kemenkes', 'FEFO / FIFO Automation', 'High Alert Warning System'],
                'features' => [
                    'Clinical Decision Support: Peringatan otomatis alergi obat & interaksi bahaya',
                    'Display layar antrean peracikan farmasi & integrasi WhatsApp obat siap ambil',
                    'Kontrol batch number obat, tanggal kadaluarsa (FEFO), dan logistik narkotika/psikotropika',
                    'Bridging bridging e-Prescription & sinkronisasi klaim obat kronis BPJS PRB',
                    'Multi-depo inventory (Depo IGD, Depo OK/Bedah, Depo Rawat Inap, Apotek Sentral)',
                ],
            ],
            [
                'module_code' => 'MODUL-06',
                'category' => 'ancillary',
                'category_label' => 'Penunjang Medis',
                'title' => 'Laboratorium & Radiologi (LIS / RIS)',
                'badge_text' => 'LIS & PACS Ready',
                'short_description' => 'Integrasi dua arah mesin analis laboratorium (LIS Auto-analyzer) dan PACS/DICOM Radiologi langsung menempel di rekam medis dokter.',
                'full_description' => 'Menghubungkan puluhan alat medis analizer laboratorium (Hematologi, Kimia Klinik, Imunologi) secara direct interface RS-232/TCP-IP. Hasil lab langsung tervalidasi oleh Dokter Spesialis Patologi Klinik (Sp.PK) dan foto rontgen/CT-Scan/MRI langsung bisa diakses dokter DPJP di layar RME.',
                'icon' => 'biotech',
                'highlight_metric' => 'Hasil Lab Direct Analyzer < 5 mnt',
                'order_index' => 6,
                'is_featured' => false,
                'compliance_tags' => ['DICOM / PACS Standard', 'ASTM / HL7 Analyzer Interface', 'LOINC Coding Ready'],
                'features' => [
                    'Bridging dua arah (Bi-directional) mesin analyzer LIS tanpa entri manual',
                    'Nilai Kritis (Critical Value Alert) langsung mengirim notifikasi instan ke dokter DPJP',
                    'Viewer DICOM radiologi berbasis web dengan alat ukur diagnosa dan windowing',
                    'Validasi digital hasil pemeriksaan oleh Dokter Spesialis Patologi & Radiologi',
                    'Pasien dapat mengunduh sertifikat hasil laboratorium secara online via QR code',
                ],
            ],
            [
                'module_code' => 'MODUL-07',
                'category' => 'finance',
                'category_label' => 'Keuangan & Back Office',
                'title' => 'Kasir, Billing & Eklaim Terintegrasi',
                'badge_text' => 'Financial Engine',
                'short_description' => 'Pusat kasir satu pintu terhubung akuntansi rumah sakit, verifikasi bridging INA-CBGs BPJS, asuransi swasta AdMedika/Izin, dan payment gateway QRIS.',
                'full_description' => 'Memastikan transparansi pendapatan dan efisiensi keuangan rumah sakit. Perhitungan tarif tindakan medis otomatis, jasa medis (remunerasi dokter), invoice klaim asuransi korporasi, integrasi auto-grouper INA-CBGs BPJS untuk mencegah dispute klaim, serta pembukuan jurnal akuntansi otomatis.',
                'icon' => 'receipt_long',
                'highlight_metric' => 'Dispute klaim turun hingga < 0.3%',
                'order_index' => 7,
                'is_featured' => true,
                'compliance_tags' => ['Bridging E-Klaim INA-CBGs', 'Payment Gateway QRIS/VA', 'Pajak & Jasa Medis'],
                'features' => [
                    'Kalkulator Auto-Grouper INA-CBGs dengan simulasi biaya real-time saat perawatan',
                    'Pembayaran non-tunai multi-channel: QRIS Dinamis, Kartu Debit/Kredit, Virtual Account Bank',
                    'Otomasi perhitungan Remunerasi & Jasa Medis Dokter per tindakan secara transparan',
                    'Export berkas klaim digital (SEP, Resume, Billing, Bukti Penunjang) dalam 1 bundel PDF',
                    'Jurnal akuntansi otomatis (Buku Besar, Neraca, Laba Rugi) sesuai PSAK Rumah Sakit',
                ],
            ],
            [
                'module_code' => 'MODUL-08',
                'category' => 'integration',
                'category_label' => 'Integrasi & Eksekutif',
                'title' => 'Executive Dashboard BI & Bridging Kemenkes',
                'badge_text' => 'Executive Cockpit',
                'short_description' => 'Pantau BOR, LOS, TOI, BTO, pendapatan harian, performa dokter, dan status bridging nasional dalam layar analitik interaktif Direksi Rumah Sakit.',
                'full_description' => 'Platform kecerdasan bisnis (Business Intelligence) untuk jajaran Direktur RS, Komite Medis, dan Pemilik Rumah Sakit. Memberikan telemetry visual operasional secara live, proyeksi finansial, heat-map penyakit terbanyak, serta audit kepatuhan regulasi secara menyeluruh.',
                'icon' => 'query_stats',
                'highlight_metric' => 'Real-time Hospital Telemetry 24/7',
                'order_index' => 8,
                'is_featured' => false,
                'compliance_tags' => ['Kemenkes RS Online / SIRS', 'BPJS Trust Mark', 'Indikator Mutu Kemenkes (INM)'],
                'features' => [
                    'Visualisasi Indikator Efisiensi Rawat Inap (Barber Johnson: BOR, ALOS, TOI, BTO, NDR, GDR)',
                    'Monitoring Real-time Antrean IGD, Kamar Operasi (OK), dan Waktu Tunggu Farmasi',
                    'Dashboard Finansial: Realisasi Target Pendapatan, Piutang BPJS, dan Cashflow RS',
                    'Otomasi Pelaporan Indikator Nasional Mutu (INM) & Insiden Keselamatan Pasien (IKP)',
                    'Sinkronisasi otomatis Satu Data Kesehatan Kemenkes (SIRS Online Revisi Terbaru)',
                ],
            ],
        ];

        foreach ($modules as $mod) {
            SimrsModule::updateOrCreate(
                ['module_code' => $mod['module_code']],
                $mod
            );
        }

        // 4. Populate 6 Pillars of Excellence
        $pillars = [
            [
                'pillar_number' => '01',
                'badge' => '01 / Integrasi Nasional',
                'title' => 'Otomasi Bridging 100% SATUSEHAT & BPJS',
                'description' => 'Tanpa entri data ganda yang melelahkan staf administrasi. Seluruh metadata diagnosa ICD-10, tindakan ICD-9 CM, resume medis, dan antrean online terhubung otomatis via arsitektur HL7 FHIR resmi Kemenkes RI & VClaim BPJS 2.0.',
                'icon' => 'sync_alt',
                'metric_label' => 'Kesesuaian Standar',
                'metric_value' => '100% SATUSEHAT Ready',
                'order_index' => 1,
            ],
            [
                'pillar_number' => '02',
                'badge' => '02 / Ergonomi Medis',
                'title' => 'Didesain oleh Dokter Spesialis untuk Dokter',
                'description' => 'Antarmuka klinis yang dirancang mengikuti alur pikir dokter, bukan formulir akuntansi yang kaku. Template SOAP cerdas, voice typing, dan riwayat alergi yang muncul otomatis memangkas waktu input data hingga kurang dari 3 menit.',
                'icon' => 'medical_information',
                'metric_label' => 'Rata-rata Waktu Input',
                'metric_value' => '2.4 Menit / Pasien',
                'order_index' => 2,
            ],
            [
                'pillar_number' => '03',
                'badge' => '03 / Keamanan & Enkripsi',
                'title' => 'Keamanan Data Medis Standar Perbankan',
                'description' => 'Arsitektur terenkripsi AES-256 saat data tersimpan (at-rest) dan TLS 1.3 saat transmisi (in-transit). Dilengkapi proteksi Tanda Tangan Elektronik tersertifikasi BSrE dan audit trail ketat berstandar ISO 27001.',
                'icon' => 'lock_clock',
                'metric_label' => 'Sertifikasi Keamanan',
                'metric_value' => 'AES-256 & ISO 27001',
                'order_index' => 3,
            ],
            [
                'pillar_number' => '04',
                'badge' => '04 / Zero Dispute Klaim',
                'title' => 'Simulasi & Pre-Validasi INA-CBGs Real-Time',
                'description' => 'Mencegah kerugian finansial akibat dispute klaim BPJS Kesehatan. Sistem memberikan peringatan dini bila ada ketidaksesuaian koding diagnosa, berkas penunjang yang kurang, atau potensi klaim tertolak sebelum pasien pulang.',
                'icon' => 'fact_check',
                'metric_label' => 'Dispute Klaim BPJS',
                'metric_value' => '< 0.3% Retur',
                'order_index' => 4,
            ],
            [
                'pillar_number' => '05',
                'badge' => '05 / Kecepatan Implementasi',
                'title' => 'Go-Live Tercepat dengan Tim Pendamping On-site',
                'description' => 'Metodologi migrasi data master yang telah teruji di puluhan rumah sakit. Pendampingan dokter klinis dan tim teknis langsung di lokasi saat fase transisi memastikan operasional rumah sakit tetap berjalan 100% tanpa henti.',
                'icon' => 'rocket_launch',
                'metric_label' => 'Durasi Go-Live',
                'metric_value' => '6 - 8 Minggu',
                'order_index' => 5,
            ],
            [
                'pillar_number' => '06',
                'badge' => '06 / Ekosistem Cloud Terpadu',
                'title' => 'Server Cloud Domestik Tier 3/4 dengan SLA 99.9%',
                'description' => 'Ditempatkan di pusat data resmi dalam negeri Indonesia sesuai regulasi perlindungan data pribadi (UU PDP). Bebas biaya pembelian server fisik yang mahal, anti down, serta backup data otomatis setiap jam.',
                'icon' => 'cloud_done',
                'metric_label' => 'Jaminan Uptime',
                'metric_value' => '99.98% SLA',
                'order_index' => 6,
            ],
        ];

        foreach ($pillars as $pil) {
            SimrsPillar::updateOrCreate(
                ['pillar_number' => $pil['pillar_number']],
                $pil
            );
        }

        // 5. Populate Comparison Table (Liva vs Conventional)
        $comparisons = [
            [
                'parameter_name' => 'Konektivitas SATUSEHAT Kemenkes RI',
                'category' => 'Regulasi & Integrasi',
                'liva_feature' => 'Native HL7 FHIR Interoperability resmi Kemenkes, sinkronisasi otomatis tanpa plugin tambahan.',
                'liva_status' => true,
                'conventional_feature' => 'Perlu biaya bridging terpisah & maintenance modul tambahan yang sering error saat update API.',
                'conventional_status' => false,
                'order_index' => 1,
            ],
            [
                'parameter_name' => 'Waktu Entri SOAP Rekam Medis (RME)',
                'category' => 'Efisiensi Medis',
                'liva_feature' => 'Rata-rata 2.4 menit dengan template dinamis per spesialisasi & voice dictation.',
                'liva_status' => true,
                'conventional_feature' => '7 - 12 menit per pasien karena form kaku yang tidak sesuai alur kerja dokter spesialis.',
                'conventional_status' => false,
                'order_index' => 2,
            ],
            [
                'parameter_name' => 'Bridging BPJS VClaim & Antrean 2.0',
                'category' => 'Regulasi & Integrasi',
                'liva_feature' => 'Otomasi terbit SEP, jadwal poli, dan rujukan terpadu dalam 1 klik tanpa login portal eksternal.',
                'liva_status' => true,
                'conventional_feature' => 'Staf harus input data dua kali (double entry) di aplikasi SIMRS dan portal BPJS terpisah.',
                'conventional_status' => false,
                'order_index' => 3,
            ],
            [
                'parameter_name' => 'Keamanan & Tanda Tangan Digital BSrE',
                'category' => 'Keamanan & Legalitas',
                'liva_feature' => 'Enkripsi data medis AES-256 terstandar ISO 27001 dan TTE BSrE BSSN bersertifikat hukum sah.',
                'liva_status' => true,
                'conventional_feature' => 'Hanya tanda tangan scan gambar JPEG biasa tanpa kekuatan hukum dan audit trail lemah.',
                'conventional_status' => false,
                'order_index' => 4,
            ],
            [
                'parameter_name' => 'Pre-Validasi Dispute Klaim INA-CBGs',
                'category' => 'Finansial & Klaim',
                'liva_feature' => 'Deteksi dini kesalahan koding ICD dan kelengkapan resume sebelum pasien discharge (<0.3% dispute).',
                'liva_status' => true,
                'conventional_feature' => 'Klaim baru dicek setelah verifikasi BPJS sehingga sering dispute atau tertunda cair berbulan-bulan.',
                'conventional_status' => false,
                'order_index' => 5,
            ],
            [
                'parameter_name' => 'Biaya Infrastruktur & Maintenance Server',
                'category' => 'Investasi & Cloud',
                'liva_feature' => 'Model Cloud SaaS Terkelola (Zero CAPEX Server), backup otomatis multi-zone, SLA 99.9%.',
                'liva_status' => true,
                'conventional_feature' => 'Investasi ratusan juta rupiah untuk beli server fisik di RS + biaya tim IT maintenance bulanan.',
                'conventional_status' => false,
                'order_index' => 6,
            ],
        ];

        foreach ($comparisons as $comp) {
            SimrsComparison::updateOrCreate(
                ['parameter_name' => $comp['parameter_name']],
                $comp
            );
        }

        // 6. Populate Case Studies
        $caseStudies = [
            [
                'hospital_name' => 'RSUD dr. Chasbullah Abdulmadjid',
                'hospital_type' => 'RSUD Kelas B Pendidikan',
                'hospital_category' => 'rsud',
                'location' => 'Kota Bekasi, Jawa Barat',
                'bed_count' => 520,
                'headline' => 'Memangkas Waktu Tunggu Farmasi dari 55 Menit Menjadi 14 Menit & Lolos Akreditasi Paripurna Kemenkes',
                'summary' => 'Dengan volume kunjungan rawat jalan mencapai lebih dari 1.200 pasien per hari, RSUD dr. Chasbullah sukses melakukan migrasi total ke Liva SIMRS dalam 7 minggu tanpa gangguan operasional sedikit pun.',
                'challenge' => 'Antrean loket obat menumpuk parah, koding klaim BPJS sering dispute hingga 12% karena resume tulisan tangan sulit terbaca, serta kesulitan integrasi data SATUSEHAT untuk rekam medis elektronik.',
                'solution' => 'Penerapan modul Anjungan Mandiri (APM), integrasi resep elektronik (e-Prescription) langsung ke sistem peracikan apotek, pre-validasi koding INA-CBGs otomatis, dan bridging SATUSEHAT HL7 FHIR.',
                'results' => [
                    ['label' => 'Waktu Tunggu Obat Racikan', 'value' => '14 Menit', 'improvement' => 'Turun 74%'],
                    ['label' => 'Lolos Klaim BPJS Pertama', 'value' => '99.6%', 'improvement' => 'Dispute < 0.4%'],
                    ['label' => 'Kepatuhan SATUSEHAT', 'value' => '100%', 'improvement' => 'Predikat Paripurna'],
                    ['label' => 'Waktu Input RME Dokter', 'value' => '2.1 Menit', 'improvement' => 'Efisiensi 65%'],
                ],
                'quote' => 'Liva SIMRS bukan hanya sekadar software, melainkan rekan strategis transformasi digital rumah sakit kami. Dokter kami sangat menyukai tampilannya yang bersih dan cepat, sementara tim manajemen mendapatkan transparansi data 24/7.',
                'quote_author_name' => 'dr. Kusnanto Saidi, MARS',
                'quote_author_title' => 'Direktur Utama RSUD dr. Chasbullah Abdulmadjid',
                'quote_author_avatar' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1qFBFfpt3Fu5veYNX_JqFcXpmq4FwVfgAzNNF1r_FPQp1F0AK5_D2wm_e2M-ipM0i2hCvPiusMBfpwHvVFoQWR3yVNK29Cgln82JTnL8Z4-kz5vqGMiQ7Mrteh2C8EApMRR5aDmR5M9B2IZO0q-IO8oEu14gxPsa8jhEzBh2Ppy7-YRPvvAv5_JLRxLrD0DclM2ZUV4l_rC07yI6QJkkm9Rkqu2w8t403Zqm_eVFy0gJR_p2fBmfd2A',
                'hospital_logo' => 'https://lh3.googleusercontent.com/aida/AEtjO1XAHIn1996QD1vNDMJOI8vdcD23fhuJ9R1JA7IQBDBpCleoEmx9kMbyYdRUDT0uLi7_REF8zQVaH0To8_w471zcowmSdXjp2znm9RnHL5dtzXY8dA103emK9CmIDNTLY41jkXa8FVs-gZ80YgXohNYtPSkgXFfEBGxyU4w0aGxkITySYI_yEPJOhgmzNIOLyTBXTg1IMhQsGD2dUtkAOrYDyjtEFtFHLVJZjFyOSJIPWo5i2pitZyCQXaIH',
                'hospital_image' => 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
                'order_index' => 1,
                'is_published' => true,
            ],
            [
                'hospital_name' => 'RS Medika Permata Nusantara',
                'hospital_type' => 'RS Swasta Tipe C',
                'hospital_category' => 'swasta',
                'location' => 'Surabaya, Jawa Timur',
                'bed_count' => 180,
                'headline' => 'Meningkatkan Utilisasi Bed (BOR) Menjadi 84% dengan Smart Bed Management & Auto-Billing',
                'summary' => 'Rumah sakit swasta berkembang yang berhasil mengoptimalkan kapasitas kamar inap dan integrasi penunjang medis LIS/RIS secara mulus dalam hitungan minggu.',
                'challenge' => 'Sering terjadi miskomunikasi ketersediaan kamar antara IGD dan bangsal, kebocoran billing tindakan perawat, dan kesulitan pencatatan rekam medis terpadu.',
                'solution' => 'Implementasi Interactive Floor Map Bed Management, integrasi kasir multi-payment QRIS, e-MAR untuk perawat bangsal, serta PACS web viewer radiologi.',
                'results' => [
                    ['label' => 'Bed Occupancy Rate (BOR)', 'value' => '84.2%', 'improvement' => 'Naik 28%'],
                    ['label' => 'Kebocoran Billing Tindakan', 'value' => '0%', 'improvement' => 'Tercatat Sempurna'],
                    ['label' => 'Waktu Billing Pasien Pulang', 'value' => '8 Menit', 'improvement' => 'Sebelumnya 40 Menit'],
                ],
                'quote' => 'Dashboard eksekutif Liva SIMRS memberi saya visibilitas penuh terhadap kondisi finansial dan operasional rumah sakit langsung dari smartphone saya kapan saja.',
                'quote_author_name' => 'dr. Anita Rahmayanti, Sp.A, M.Kes',
                'quote_author_title' => 'Direktur Operasional & Pelayanan Medis',
                'quote_author_avatar' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
                'hospital_logo' => 'https://lh3.googleusercontent.com/aida/AEtjO1XAHIn1996QD1vNDMJOI8vdcD23fhuJ9R1JA7IQBDBpCleoEmx9kMbyYdRUDT0uLi7_REF8zQVaH0To8_w471zcowmSdXjp2znm9RnHL5dtzXY8dA103emK9CmIDNTLY41jkXa8FVs-gZ80YgXohNYtPSkgXFfEBGxyU4w0aGxkITySYI_yEPJOhgmzNIOLyTBXTg1IMhQsGD2dUtkAOrYDyjtEFtFHLVJZjFyOSJIPWo5i2pitZyCQXaIH',
                'hospital_image' => 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
                'order_index' => 2,
                'is_published' => true,
            ],
            [
                'hospital_name' => 'RSIA Bunda Harapan Kasih',
                'hospital_type' => 'RS Khusus Ibu & Anak Tipe C',
                'hospital_category' => 'rsia',
                'location' => 'Bandung, Jawa Barat',
                'bed_count' => 120,
                'headline' => 'Digitalisasi Lengkap Rekam Medis Kebidanan & Imunisasi Anak dengan Integrasi Kartu Pasien Mobile',
                'summary' => 'RSIA terdepan yang menerapkan template khusus partograf elektronik, kurva pertumbuhan anak WHO otomatis, serta buku KIA digital untuk para ibu.',
                'challenge' => 'Pencatatan rekam medis partograf manual di kertas rawan hilang dan tidak terbaca dokter konsulen saat kondisi darurat operasi SC cito.',
                'solution' => 'Template Asesmen Medis Spesifik Kebidanan & Neonatus, partograf digital real-time alert, dan notifikasi jadwal imunisasi otomatis via WhatsApp gateway.',
                'results' => [
                    ['label' => 'Respon Waktu Penanganan Cito', 'value' => '< 5 Menit', 'improvement' => 'Lebih Cepat 60%'],
                    ['label' => 'Kepuasan Pasien Ibu & Anak', 'value' => '98.7%', 'improvement' => 'Rating Tertinggi'],
                    ['label' => 'Paperless Record Kemenkes', 'value' => '100%', 'improvement' => 'Zero Kertas Medis'],
                ],
                'quote' => 'Bagi RSIA, keakuratan data partograf dan imunisasi adalah nyawa. Liva SIMRS memberi kami kemudahan luar biasa yang membuat dokter spesialis kami sangat nyaman.',
                'quote_author_name' => 'dr. Budi Setiawan, Sp.OG(K)',
                'quote_author_title' => 'Ketua Komite Medis & Dokter Spesialis Obgyn',
                'quote_author_avatar' => 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
                'hospital_logo' => 'https://lh3.googleusercontent.com/aida/AEtjO1XAHIn1996QD1vNDMJOI8vdcD23fhuJ9R1JA7IQBDBpCleoEmx9kMbyYdRUDT0uLi7_REF8zQVaH0To8_w471zcowmSdXjp2znm9RnHL5dtzXY8dA103emK9CmIDNTLY41jkXa8FVs-gZ80YgXohNYtPSkgXFfEBGxyU4w0aGxkITySYI_yEPJOhgmzNIOLyTBXTg1IMhQsGD2dUtkAOrYDyjtEFtFHLVJZjFyOSJIPWo5i2pitZyCQXaIH',
                'hospital_image' => 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
                'order_index' => 3,
                'is_published' => true,
            ],
        ];

        foreach ($caseStudies as $cs) {
            SimrsCaseStudy::updateOrCreate(
                ['hospital_name' => $cs['hospital_name']],
                $cs
            );
        }

        // 7. Populate Assessment Questions
        $assessments = [
            [
                'question' => 'Bagaimana status integrasi Rekam Medis Elektronik (RME) di rumah sakit Anda saat ini?',
                'category' => 'RME & SATUSEHAT',
                'weight' => 2,
                'order_index' => 1,
                'options' => [
                    ['label' => 'Masih 100% menggunakan berkas kertas manual / spreadsheet Excel', 'score' => 10, 'recommendation' => 'Risiko Tinggi terhadap batas waktu Permenkes 24/2022. Memerlukan implementasi RME tahap 1 segera.'],
                    ['label' => 'Sudah ada software RME lokal tapi belum terhubung ke SATUSEHAT Kemenkes RI', 'score' => 45, 'recommendation' => 'Perlu migrasi arsitektur HL7 FHIR resmi untuk mencegah sanksi administratif akreditasi.'],
                    ['label' => 'Sebagian sudah bridging SATUSEHAT namun dokter sering mengeluh aplikasi lambat', 'score' => 70, 'recommendation' => 'Perlu modernisasi antarmuka klinis Liva SIMRS agar waktu input dokter < 2.5 menit.'],
                    ['label' => 'Sudah terintegrasi penuh SATUSEHAT & BPJS VClaim tanpa hambatan', 'score' => 95, 'recommendation' => 'Kesiapan sangat prima, siap untuk modul lanjutan Executive BI & Smart Decision Support.'],
                ],
            ],
            [
                'question' => 'Berapa rata-rata waktu tunggu pasien mulai dari pendaftaran loket hingga mendapatkan obat farmasi?',
                'category' => 'Efisiensi Operasional',
                'weight' => 2,
                'order_index' => 2,
                'options' => [
                    ['label' => 'Lebih dari 60 menit (antrean fisik menumpuk dan pasien sering komplain)', 'score' => 15, 'recommendation' => 'Memerlukan modul Anjungan Mandiri (APM) & E-Prescription untuk memangkas antrean 75%.'],
                    ['label' => 'Sekitar 30 - 60 menit pada jam-jam sibuk', 'score' => 50, 'recommendation' => 'Dapat dioptimalkan dengan alur bridging antrean Mobile JKN BPJS dan display pemanggil digital.'],
                    ['label' => 'Kurang dari 20 menit secara konsisten', 'score' => 90, 'recommendation' => 'Operasional sangat efisien, pertahankan standar dengan monitoring telemetry harian.'],
                ],
            ],
            [
                'question' => 'Bagaimana kondisi infrastruktur server SIMRS rumah sakit Anda saat ini?',
                'category' => 'Infrastruktur & Keamanan',
                'weight' => 1,
                'order_index' => 3,
                'options' => [
                    ['label' => 'Server fisik on-premise di ruang server RS, sering panas/down dan backup manual', 'score' => 20, 'recommendation' => 'Disarankan migrasi ke Cloud Domestik Tier 3 Liva SIMRS untuk zero CAPEX dan SLA 99.9%.'],
                    ['label' => 'Sudah menggunakan VPS cloud namun maintenance dan keamanan masih dikelola sendiri', 'score' => 60, 'recommendation' => 'Perlu audit keamanan ISO 27001 dan Tanda Tangan Elektronik resmi BSrE.'],
                    ['label' => 'Cloud tersertifikasi dengan tim support 24/7 dedicated', 'score' => 95, 'recommendation' => 'Infrastruktur andal, siap untuk scale-up multi-cabang atau integrasi lab otomatis.'],
                ],
            ],
        ];

        foreach ($assessments as $ass) {
            SimrsAssessment::updateOrCreate(
                ['question' => $ass['question']],
                $ass
            );
        }
    }
}
