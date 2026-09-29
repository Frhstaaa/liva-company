<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use App\Models\SimrsModule;
use App\Models\SimrsPillar;
use App\Models\SimrsComparison;
use App\Models\SimrsCaseStudy;
use App\Models\SimrsDemoRequest;
use App\Models\SimrsAssessment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PublicApiController extends Controller
{
    /**
     * Get complete public site data in one fast payload for instant UI rendering.
     */
    public function getSiteData()
    {
        $settings = SiteSetting::getAllPublic();
        $modules = SimrsModule::active()->get();
        $pillars = SimrsPillar::active()->get();
        $comparisons = SimrsComparison::ordered()->get();
        $caseStudies = SimrsCaseStudy::published()->get();
        $assessments = SimrsAssessment::active()->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'settings' => $settings,
                'modules' => $modules,
                'pillars' => $pillars,
                'comparisons' => $comparisons,
                'case_studies' => $caseStudies,
                'assessments' => $assessments,
            ],
        ]);
    }

    /**
     * Get Modules with optional category filter.
     */
    public function getModules(Request $request)
    {
        $query = SimrsModule::active();

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('short_description', 'like', "%{$search}%")
                  ->orWhere('full_description', 'like', "%{$search}%");
            });
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->get(),
        ]);
    }

    /**
     * Get single module by code or id.
     */
    public function getModuleDetail($identifier)
    {
        $module = SimrsModule::where('id', $identifier)
            ->orWhere('module_code', $identifier)
            ->first();

        if (!$module) {
            return response()->json([
                'status' => 'error',
                'message' => 'Modul SIMRS tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $module,
        ]);
    }

    /**
     * Get Case Studies.
     */
    public function getCaseStudies(Request $request)
    {
        $query = SimrsCaseStudy::published();

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('hospital_category', $request->category);
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->get(),
        ]);
    }

    /**
     * Submit Demo Schedule Request (Lead Capture).
     */
    public function submitDemoRequest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'hospital_name' => 'required|string|max:200',
            'hospital_type' => 'required|string|max:100',
            'pic_name' => 'required|string|max:150',
            'pic_role' => 'required|string|max:150',
            'email' => 'required|email|max:150',
            'phone_whatsapp' => 'required|string|max:50',
            'bed_count' => 'nullable|string|max:50',
            'preferred_date' => 'nullable|date',
            'preferred_time' => 'nullable|string|max:50',
            'modules_interested' => 'nullable|array',
            'notes' => 'nullable|string|max:2000',
        ], [
            'hospital_name.required' => 'Nama Rumah Sakit wajib diisi',
            'hospital_type.required' => 'Tipe / Kelas Rumah Sakit wajib dipilih',
            'pic_name.required' => 'Nama PIC / Pemohon wajib diisi',
            'pic_role.required' => 'Jabatan PIC wajib diisi',
            'email.required' => 'Alamat email wajib diisi',
            'email.email' => 'Format email tidak valid',
            'phone_whatsapp.required' => 'Nomor WhatsApp wajib diisi',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi formulir gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        $demoRequest = SimrsDemoRequest::create([
            'hospital_name' => $request->hospital_name,
            'hospital_type' => $request->hospital_type,
            'bed_count' => $request->bed_count,
            'pic_name' => $request->pic_name,
            'pic_role' => $request->pic_role,
            'email' => $request->email,
            'phone_whatsapp' => $request->phone_whatsapp,
            'preferred_date' => $request->preferred_date,
            'preferred_time' => $request->preferred_time,
            'modules_interested' => $request->modules_interested,
            'current_simrs_status' => $request->current_simrs_status,
            'notes' => $request->notes,
            'status' => 'baru',
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Permintaan demo SIMRS berhasil dikirim. Tim spesialis implementasi kami akan menghubungi Anda dalam waktu 1x24 jam kerja.',
            'data' => [
                'id' => $demoRequest->id,
                'hospital_name' => $demoRequest->hospital_name,
                'pic_name' => $demoRequest->pic_name,
                'status' => 'Dijadwalkan',
            ],
        ], 201);
    }

    /**
     * Submit Hospital Readiness Assessment.
     */
    public function submitAssessment(Request $request)
    {
        $answers = $request->input('answers', []); // array of { question_id, option_index }
        $questions = SimrsAssessment::active()->get();

        $totalWeight = 0;
        $earnedScore = 0;
        $recommendations = [];

        foreach ($questions as $q) {
            $weight = $q->weight ?: 1;
            $totalWeight += (100 * $weight);

            $selectedOptionIndex = $answers[$q->id] ?? null;
            $options = $q->options;

            if ($selectedOptionIndex !== null && isset($options[$selectedOptionIndex])) {
                $option = $options[$selectedOptionIndex];
                $score = (int) ($option['score'] ?? 0);
                $earnedScore += ($score * $weight);

                if (!empty($option['recommendation'])) {
                    $recommendations[] = [
                        'category' => $q->category,
                        'question' => $q->question,
                        'selected' => $option['label'],
                        'score' => $score,
                        'recommendation' => $option['recommendation'],
                    ];
                }
            }
        }

        $finalPercentage = $totalWeight > 0 ? round(($earnedScore / $totalWeight) * 100) : 50;

        // Determine Level
        if ($finalPercentage >= 80) {
            $level = 'Tinggi (Digital Ready)';
            $levelColor = 'text-primary';
            $summary = 'Rumah sakit Anda memiliki fondasi digital yang kuat dan siap untuk adopsi arsitektur terintegrasi penuh Liva SIMRS.';
        } elseif ($finalPercentage >= 50) {
            $level = 'Menengah (Transisi)';
            $levelColor = 'text-secondary-container';
            $summary = 'Rumah sakit Anda sedang dalam fase transisi. Implementasi modul Core RME & Bridging SATUSEHAT disarankan menjadi prioritas dalam 60 hari ke depan.';
        } else {
            $level = 'Mendesak (Immediate Action)';
            $levelColor = 'text-error';
            $summary = 'Sistem operasional saat ini berisiko tinggi terhadap kepatuhan regulasi Permenkes 24/2022. Disarankan melakukan pendampingan migrasi darurat bersama tim Liva SIMRS.';
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'score' => $finalPercentage,
                'level' => $level,
                'level_color' => $levelColor,
                'summary' => $summary,
                'recommendations' => $recommendations,
            ],
        ]);
    }
}
