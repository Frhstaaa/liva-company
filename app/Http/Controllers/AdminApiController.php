<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use App\Models\SimrsModule;
use App\Models\SimrsPillar;
use App\Models\SimrsComparison;
use App\Models\SimrsCaseStudy;
use App\Models\SimrsDemoRequest;
use App\Models\SimrsAssessment;
use App\Models\SimrsAuditLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminApiController extends Controller
{
    /**
     * Get Admin Dashboard Telemetry & System Status.
     */
    public function getDashboardStats()
    {
        $totalModules = SimrsModule::count();
        $activeModules = SimrsModule::where('is_active', true)->count();
        $totalPillars = SimrsPillar::count();
        $totalCaseStudies = SimrsCaseStudy::count();
        
        $totalDemoRequests = SimrsDemoRequest::count();
        $newDemoRequests = SimrsDemoRequest::where('status', 'baru')->count();
        $scheduledDemoRequests = SimrsDemoRequest::where('status', 'dijadwalkan')->count();
        $completedDemoRequests = SimrsDemoRequest::where('status', 'selesai')->count();

        $recentRequests = SimrsDemoRequest::latest()->take(5)->get();
        $recentAuditLogs = SimrsAuditLog::latest('created_at')->take(6)->get();

        // System Health & Encryption Status
        $encryptionStatus = [
            'cipher' => config('app.cipher', 'AES-256-CBC'),
            'status' => 'Active & Hardened',
            'encrypted_settings_count' => SiteSetting::where('is_encrypted', true)->count(),
            'php_version' => PHP_VERSION,
            'framework' => 'Laravel ' . app()->version(),
            'database' => config('database.default'),
        ];

        return response()->json([
            'status' => 'success',
            'data' => [
                'counts' => [
                    'total_modules' => $totalModules,
                    'active_modules' => $activeModules,
                    'total_pillars' => $totalPillars,
                    'total_case_studies' => $totalCaseStudies,
                    'total_leads' => $totalDemoRequests,
                    'new_leads' => $newDemoRequests,
                    'scheduled_leads' => $scheduledDemoRequests,
                    'completed_leads' => $completedDemoRequests,
                ],
                'recent_leads' => $recentRequests,
                'recent_audits' => $recentAuditLogs,
                'system_status' => $encryptionStatus,
            ],
        ]);
    }

    /**
     * -------------------------------------------------------------
     * SITE SETTINGS (CMS)
     * -------------------------------------------------------------
     */
    public function getSettings(Request $request)
    {
        $group = $request->query('group');
        $query = SiteSetting::query();

        if ($group) {
            $query->where('group', $group);
        }

        $settings = $query->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'group' => $item->group,
                'key' => $item->key,
                'value' => $item->is_encrypted ? '•••••••• (Terenkripsi AES-256)' : $item->processed_value,
                'raw_value' => $item->is_encrypted ? '' : $item->value,
                'is_encrypted' => $item->is_encrypted,
                'type' => $item->type,
                'description' => $item->description,
                'updated_at' => $item->updated_at->format('d M Y H:i'),
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => $settings,
        ]);
    }

    public function updateBatchSettings(Request $request)
    {
        $settings = $request->input('settings', []); // associative array of key => value

        foreach ($settings as $key => $val) {
            $existing = SiteSetting::where('key', $key)->first();
            if ($existing) {
                // If it's encrypted and user didn't change placeholder, skip
                if ($existing->is_encrypted && (empty($val) || str_contains($val, '••••••••'))) {
                    continue;
                }

                $storedVal = $val;
                if ($existing->is_encrypted && !empty($storedVal)) {
                    $storedVal = Crypt::encryptString((string) $storedVal);
                } elseif ($existing->type === 'json' && is_array($storedVal)) {
                    $storedVal = json_encode($storedVal);
                }

                $existing->update(['value' => $storedVal]);
            } else {
                SiteSetting::create([
                    'key' => $key,
                    'value' => $val,
                    'group' => 'general',
                    'type' => 'text',
                ]);
            }
        }

        SimrsAuditLog::log(
            action: 'update_settings',
            entityType: 'site_settings',
            details: "Memperbarui konfigurasi CMS publik (" . count($settings) . " parameter)."
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Semua pengaturan CMS berhasil disimpan dan langsung aktif di halaman publik.',
        ]);
    }

    /**
     * Upload an image and automatically convert it to lightweight WebP format.
     */
    public function uploadImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg,webp,bmp|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Format file tidak didukung atau ukuran melebihi 10MB.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $file = $request->file('image');
        $extension = strtolower($file->getClientOriginalExtension());
        $originalBase = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $slugBase = \Illuminate\Support\Str::slug($originalBase);
        if (empty($slugBase)) {
            $slugBase = 'asset';
        }

        $uploadDir = public_path('uploads');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $timestamp = date('Ymd_His') . '_' . substr(uniqid(), -4);
        $originalSize = $file->getSize();

        // Handle SVG without rasterizing
        if ($extension === 'svg') {
            $svgFilename = $slugBase . '_' . $timestamp . '.svg';
            $file->move($uploadDir, $svgFilename);
            $url = '/uploads/' . $svgFilename;

            SimrsAuditLog::log('upload_image', 'media', null, "Upload file SVG: {$svgFilename}");

            return response()->json([
                'status' => 'success',
                'message' => 'File vektor SVG berhasil diunggah.',
                'data' => [
                    'url' => $url,
                    'filename' => $svgFilename,
                    'format' => 'svg',
                    'original_size_kb' => round($originalSize / 1024, 1),
                    'webp_size_kb' => round($originalSize / 1024, 1),
                    'savings_percent' => 0,
                ],
            ]);
        }

        // Convert raster image to WebP using GD
        $filePath = $file->getRealPath();
        $imageResource = null;

        switch ($extension) {
            case 'jpeg':
            case 'jpg':
                $imageResource = @imagecreatefromjpeg($filePath);
                break;
            case 'png':
                $imageResource = @imagecreatefrompng($filePath);
                if ($imageResource) {
                    imagepalettetotruecolor($imageResource);
                    imagealphablending($imageResource, true);
                    imagesavealpha($imageResource, true);
                }
                break;
            case 'gif':
                $imageResource = @imagecreatefromgif($filePath);
                break;
            case 'webp':
                $imageResource = @imagecreatefromwebp($filePath);
                break;
            case 'bmp':
                $imageResource = @imagecreatefrombmp($filePath);
                break;
            default:
                $data = file_get_contents($filePath);
                $imageResource = @imagecreatefromstring($data);
                break;
        }

        // If GD conversion fails, save original
        if (!$imageResource) {
            $fallbackFilename = $slugBase . '_' . $timestamp . '.' . $extension;
            $file->move($uploadDir, $fallbackFilename);
            $url = '/uploads/' . $fallbackFilename;

            return response()->json([
                'status' => 'success',
                'message' => 'Gambar berhasil diunggah dalam format asli.',
                'data' => [
                    'url' => $url,
                    'filename' => $fallbackFilename,
                    'format' => $extension,
                    'original_size_kb' => round($originalSize / 1024, 1),
                    'webp_size_kb' => round($originalSize / 1024, 1),
                    'savings_percent' => 0,
                ],
            ]);
        }

        // Save as WebP
        $outputFilename = $slugBase . '_' . $timestamp . '.webp';
        $outputPath = $uploadDir . DIRECTORY_SEPARATOR . $outputFilename;
        imagewebp($imageResource, $outputPath, 82);
        imagedestroy($imageResource);

        $newSize = file_exists($outputPath) ? filesize($outputPath) : $originalSize;
        $savingsPercent = $originalSize > 0 ? round((($originalSize - $newSize) / $originalSize) * 100, 1) : 0;

        SimrsAuditLog::log(
            action: 'upload_image',
            entityType: 'media',
            details: "Upload & auto-convert gambar {$file->getClientOriginalName()} ke WebP ({$outputFilename}, kompresi {$savingsPercent}%)."
        );

        return response()->json([
            'status' => 'success',
            'message' => "Gambar berhasil diunggah & otomatis terkonversi ke WebP! Ukuran hemat {$savingsPercent}%.",
            'data' => [
                'url' => '/uploads/' . $outputFilename,
                'filename' => $outputFilename,
                'format' => 'webp',
                'original_size_kb' => round($originalSize / 1024, 1),
                'webp_size_kb' => round($newSize / 1024, 1),
                'savings_percent' => max(0, $savingsPercent),
            ],
        ]);
    }

    /**
     * Get decrypted security credentials (requires active auth token).
     */
    public function getSecurityCredentials(Request $request)
    {
        $securitySettings = SiteSetting::where('group', 'security')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'key' => $item->key,
                'decrypted_value' => $item->processed_value,
                'description' => $item->description,
                'type' => $item->type,
                'is_encrypted' => $item->is_encrypted,
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => $securitySettings,
        ]);
    }

    public function updateSecurityCredentials(Request $request)
    {
        $credentials = $request->input('credentials', []);

        foreach ($credentials as $key => $val) {
            if (empty($val) || str_contains($val, '••••••••')) {
                continue;
            }

            SiteSetting::set(
                key: $key,
                value: $val,
                group: 'security',
                encrypt: true,
                type: 'text'
            );
        }

        SimrsAuditLog::log(
            action: 'update_security_credentials',
            entityType: 'security',
            details: "Memperbarui kunci API terenkripsi SATUSEHAT & BPJS VClaim."
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Kredensial keamanan berhasil dienkripsi dan disimpan dengan standar AES-256.',
        ]);
    }

    /**
     * -------------------------------------------------------------
     * MODULES MANAGEMENT (CRUD)
     * -------------------------------------------------------------
     */
    public function getModulesAdmin()
    {
        $modules = SimrsModule::orderBy('order_index', 'asc')->get();
        return response()->json(['status' => 'success', 'data' => $modules]);
    }

    public function storeModule(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'module_code' => 'required|string|unique:simrs_modules,module_code|max:30',
            'title' => 'required|string|max:200',
            'category' => 'required|string',
            'category_label' => 'required|string',
            'short_description' => 'required|string',
            'icon' => 'required|string',
            'features' => 'nullable|array',
            'compliance_tags' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $module = SimrsModule::create($request->all());

        SimrsAuditLog::log('create_module', 'simrs_modules', (string) $module->id, "Menambahkan modul: {$module->title} ({$module->module_code})");

        return response()->json(['status' => 'success', 'message' => 'Modul berhasil ditambahkan', 'data' => $module], 201);
    }

    public function updateModule(Request $request, $id)
    {
        $module = SimrsModule::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'module_code' => "required|string|unique:simrs_modules,module_code,{$id}|max:30",
            'title' => 'required|string|max:200',
            'category' => 'required|string',
            'short_description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $module->update($request->all());

        SimrsAuditLog::log('update_module', 'simrs_modules', (string) $module->id, "Memperbarui modul: {$module->title}");

        return response()->json(['status' => 'success', 'message' => 'Modul berhasil diperbarui', 'data' => $module]);
    }

    public function deleteModule($id)
    {
        $module = SimrsModule::findOrFail($id);
        $title = $module->title;
        $module->delete();

        SimrsAuditLog::log('delete_module', 'simrs_modules', (string) $id, "Menghapus modul: {$title}");

        return response()->json(['status' => 'success', 'message' => "Modul {$title} berhasil dihapus"]);
    }

    public function toggleModuleStatus($id)
    {
        $module = SimrsModule::findOrFail($id);
        $module->is_active = !$module->is_active;
        $module->save();

        $state = $module->is_active ? 'Diaktifkan' : 'Dinonaktifkan';
        SimrsAuditLog::log('toggle_module_status', 'simrs_modules', (string) $id, "Status modul {$module->title} diubah menjadi {$state}");

        return response()->json(['status' => 'success', 'message' => "Modul {$module->title} berhasil {$state}", 'data' => $module]);
    }

    /**
     * -------------------------------------------------------------
     * 6 PILLARS / VALUE PROPOSITIONS (CRUD)
     * -------------------------------------------------------------
     */
    public function getPillarsAdmin()
    {
        $pillars = SimrsPillar::orderBy('order_index', 'asc')->get();
        return response()->json(['status' => 'success', 'data' => $pillars]);
    }

    public function storePillar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pillar_number' => 'required|string',
            'title' => 'required|string|max:200',
            'description' => 'required|string',
            'icon' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $pillar = SimrsPillar::create($request->all());
        SimrsAuditLog::log('create_pillar', 'simrs_pillars', (string) $pillar->id, "Menambahkan pilar keunggulan: {$pillar->title}");

        return response()->json(['status' => 'success', 'message' => 'Pilar keunggulan berhasil dibuat', 'data' => $pillar], 201);
    }

    public function updatePillar(Request $request, $id)
    {
        $pillar = SimrsPillar::findOrFail($id);
        $pillar->update($request->all());
        SimrsAuditLog::log('update_pillar', 'simrs_pillars', (string) $id, "Memperbarui pilar keunggulan: {$pillar->title}");

        return response()->json(['status' => 'success', 'message' => 'Pilar keunggulan berhasil diperbarui', 'data' => $pillar]);
    }

    public function deletePillar($id)
    {
        $pillar = SimrsPillar::findOrFail($id);
        $title = $pillar->title;
        $pillar->delete();

        SimrsAuditLog::log('delete_pillar', 'simrs_pillars', (string) $id, "Menghapus pilar keunggulan: {$title}");
        return response()->json(['status' => 'success', 'message' => "Pilar {$title} berhasil dihapus"]);
    }

    /**
     * -------------------------------------------------------------
     * COMPARISON TABLE (CRUD)
     * -------------------------------------------------------------
     */
    public function getComparisonsAdmin()
    {
        $comparisons = SimrsComparison::orderBy('order_index', 'asc')->get();
        return response()->json(['status' => 'success', 'data' => $comparisons]);
    }

    public function storeComparison(Request $request)
    {
        $comparison = SimrsComparison::create($request->all());
        SimrsAuditLog::log('create_comparison', 'simrs_comparisons', (string) $comparison->id, "Menambahkan parameter komparasi: {$comparison->parameter_name}");
        return response()->json(['status' => 'success', 'message' => 'Komparasi berhasil ditambahkan', 'data' => $comparison], 201);
    }

    public function updateComparison(Request $request, $id)
    {
        $comparison = SimrsComparison::findOrFail($id);
        $comparison->update($request->all());
        SimrsAuditLog::log('update_comparison', 'simrs_comparisons', (string) $id, "Memperbarui parameter komparasi: {$comparison->parameter_name}");
        return response()->json(['status' => 'success', 'message' => 'Komparasi berhasil diperbarui', 'data' => $comparison]);
    }

    public function deleteComparison($id)
    {
        $comparison = SimrsComparison::findOrFail($id);
        $comparison->delete();
        SimrsAuditLog::log('delete_comparison', 'simrs_comparisons', (string) $id, "Menghapus parameter komparasi");
        return response()->json(['status' => 'success', 'message' => 'Komparasi berhasil dihapus']);
    }

    /**
     * -------------------------------------------------------------
     * CASE STUDIES (CRUD)
     * -------------------------------------------------------------
     */
    public function getCaseStudiesAdmin()
    {
        $caseStudies = SimrsCaseStudy::orderBy('order_index', 'asc')->get();
        return response()->json(['status' => 'success', 'data' => $caseStudies]);
    }

    public function storeCaseStudy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'hospital_name' => 'required|string|max:200',
            'hospital_type' => 'required|string',
            'headline' => 'required|string',
            'summary' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $caseStudy = SimrsCaseStudy::create($request->all());
        SimrsAuditLog::log('create_case_study', 'simrs_case_studies', (string) $caseStudy->id, "Menambahkan studi kasus: {$caseStudy->hospital_name}");

        return response()->json(['status' => 'success', 'message' => 'Studi kasus berhasil ditambahkan', 'data' => $caseStudy], 201);
    }

    public function updateCaseStudy(Request $request, $id)
    {
        $caseStudy = SimrsCaseStudy::findOrFail($id);
        $caseStudy->update($request->all());
        SimrsAuditLog::log('update_case_study', 'simrs_case_studies', (string) $id, "Memperbarui studi kasus: {$caseStudy->hospital_name}");

        return response()->json(['status' => 'success', 'message' => 'Studi kasus berhasil diperbarui', 'data' => $caseStudy]);
    }

    public function deleteCaseStudy($id)
    {
        $caseStudy = SimrsCaseStudy::findOrFail($id);
        $name = $caseStudy->hospital_name;
        $caseStudy->delete();

        SimrsAuditLog::log('delete_case_study', 'simrs_case_studies', (string) $id, "Menghapus studi kasus: {$name}");
        return response()->json(['status' => 'success', 'message' => "Studi kasus {$name} berhasil dihapus"]);
    }

    /**
     * -------------------------------------------------------------
     * DEMO REQUESTS / LEADS MANAGEMENT
     * -------------------------------------------------------------
     */
    public function getDemoRequestsAdmin(Request $request)
    {
        $query = SimrsDemoRequest::latest();

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('hospital_name', 'like', "%{$s}%")
                  ->orWhere('pic_name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%")
                  ->orWhere('phone_whatsapp', 'like', "%{$s}%");
            });
        }

        $requests = $query->paginate(20);
        return response()->json(['status' => 'success', 'data' => $requests]);
    }

    public function updateDemoRequestStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:baru,dihubungi,dijadwalkan,selesai,batal',
            'admin_notes' => 'nullable|string',
        ]);

        $lead = SimrsDemoRequest::findOrFail($id);
        $lead->status = $request->status;
        if ($request->has('admin_notes')) {
            $lead->admin_notes = $request->admin_notes;
        }
        $lead->save();

        SimrsAuditLog::log('update_lead_status', 'simrs_demo_requests', (string) $id, "Status permohonan demo {$lead->hospital_name} diubah menjadi '{$lead->status}'");

        return response()->json([
            'status' => 'success',
            'message' => "Status prospek {$lead->hospital_name} berhasil diperbarui menjadi '{$lead->status}'",
            'data' => $lead,
        ]);
    }

    public function deleteDemoRequest($id)
    {
        $lead = SimrsDemoRequest::findOrFail($id);
        $hospital = $lead->hospital_name;
        $lead->delete();

        SimrsAuditLog::log('delete_lead', 'simrs_demo_requests', (string) $id, "Menghapus pengajuan demo RS: {$hospital}");
        return response()->json(['status' => 'success', 'message' => "Data pengajuan demo {$hospital} berhasil dihapus"]);
    }

    /**
     * -------------------------------------------------------------
     * AUDIT LOGS
     * -------------------------------------------------------------
     */
    public function getAuditLogs(Request $request)
    {
        $query = SimrsAuditLog::latest('created_at');

        if ($request->filled('action')) {
            $query->where('action', 'like', "%{$request->action}%");
        }

        $logs = $query->paginate(30);
        return response()->json(['status' => 'success', 'data' => $logs]);
    }

    /**
     * -------------------------------------------------------------
     * ADMIN USERS MANAGEMENT (Superadmin Only)
     * -------------------------------------------------------------
     */
    public function getUsersAdmin()
    {
        $users = User::select(['id', 'name', 'email', 'role', 'avatar_url', 'is_active', 'last_login_at', 'last_login_ip', 'created_at'])->get();
        return response()->json(['status' => 'success', 'data' => $users]);
    }

    public function storeUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:150',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:superadmin,admin,editor',
            'security_pin' => 'nullable|string|min:4|max:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'security_pin' => $request->filled('security_pin') ? Hash::make($request->security_pin) : null,
            'avatar_url' => $request->avatar_url,
            'is_active' => $request->input('is_active', true),
        ]);

        SimrsAuditLog::log('create_admin_user', 'users', (string) $user->id, "Membuat pengguna admin baru: {$user->email} ({$user->role})");

        return response()->json(['status' => 'success', 'message' => 'Pengguna admin berhasil dibuat', 'data' => $user], 201);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:150',
            'email' => "required|email|unique:users,email,{$id}",
            'role' => 'required|in:superadmin,admin,editor',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->is_active = $request->input('is_active', $user->is_active);

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        if ($request->filled('security_pin')) {
            $user->security_pin = Hash::make($request->security_pin);
        }

        if ($request->has('avatar_url')) {
            $user->avatar_url = $request->avatar_url;
        }

        $user->save();

        SimrsAuditLog::log('update_admin_user', 'users', (string) $user->id, "Memperbarui akun admin: {$user->email}");

        return response()->json(['status' => 'success', 'message' => 'Akun admin berhasil diperbarui', 'data' => $user]);
    }

    public function deleteUser($id)
    {
        $currentUser = auth()->user();
        if ($currentUser->id == $id) {
            return response()->json(['status' => 'error', 'message' => 'Anda tidak dapat menghapus akun Anda sendiri'], 400);
        }

        $user = User::findOrFail($id);
        $email = $user->email;
        $user->delete();

        SimrsAuditLog::log('delete_admin_user', 'users', (string) $id, "Menghapus akun admin: {$email}");

        return response()->json(['status' => 'success', 'message' => "Akun admin {$email} berhasil dihapus"]);
    }
}
