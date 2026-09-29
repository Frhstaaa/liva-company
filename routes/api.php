<?php

use App\Http\Controllers\AdminApiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PublicApiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/
Route::prefix('public')->group(function () {
    Route::get('/site-data', [PublicApiController::class, 'getSiteData']);
    Route::get('/modules', [PublicApiController::class, 'getModules']);
    Route::get('/modules/{identifier}', [PublicApiController::class, 'getModuleDetail']);
    Route::get('/case-studies', [PublicApiController::class, 'getCaseStudies']);
    Route::post('/demo-request', [PublicApiController::class, 'submitDemoRequest']);
    Route::post('/assessment', [PublicApiController::class, 'submitAssessment']);
});

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/verify-pin', [AuthController::class, 'verifyPin']);
        Route::post('/profile', [AuthController::class, 'updateProfile']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

/*
|--------------------------------------------------------------------------
| Protected Admin API Routes (Encrypted CMS Management)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->middleware(['auth:sanctum'])->group(function () {
    // Dashboard Stats & Telemetry
    Route::get('/dashboard-stats', [AdminApiController::class, 'getDashboardStats']);

    // Site Settings (Public CMS)
    Route::get('/settings', [AdminApiController::class, 'getSettings']);
    Route::post('/settings/batch', [AdminApiController::class, 'updateBatchSettings']);

    // Encrypted Security & API Credentials (SATUSEHAT, BPJS, etc.)
    Route::get('/security-credentials', [AdminApiController::class, 'getSecurityCredentials']);
    Route::post('/security-credentials', [AdminApiController::class, 'updateSecurityCredentials']);

    // Modules CRUD
    Route::get('/modules', [AdminApiController::class, 'getModulesAdmin']);
    Route::post('/modules', [AdminApiController::class, 'storeModule']);
    Route::put('/modules/{id}', [AdminApiController::class, 'updateModule']);
    Route::delete('/modules/{id}', [AdminApiController::class, 'deleteModule']);
    Route::patch('/modules/{id}/toggle', [AdminApiController::class, 'toggleModuleStatus']);

    // Pillars CRUD
    Route::get('/pillars', [AdminApiController::class, 'getPillarsAdmin']);
    Route::post('/pillars', [AdminApiController::class, 'storePillar']);
    Route::put('/pillars/{id}', [AdminApiController::class, 'updatePillar']);
    Route::delete('/pillars/{id}', [AdminApiController::class, 'deletePillar']);

    // Comparisons CRUD
    Route::get('/comparisons', [AdminApiController::class, 'getComparisonsAdmin']);
    Route::post('/comparisons', [AdminApiController::class, 'storeComparison']);
    Route::put('/comparisons/{id}', [AdminApiController::class, 'updateComparison']);
    Route::delete('/comparisons/{id}', [AdminApiController::class, 'deleteComparison']);

    // Case Studies CRUD
    Route::get('/case-studies', [AdminApiController::class, 'getCaseStudiesAdmin']);
    Route::post('/case-studies', [AdminApiController::class, 'storeCaseStudy']);
    Route::put('/case-studies/{id}', [AdminApiController::class, 'updateCaseStudy']);
    Route::delete('/case-studies/{id}', [AdminApiController::class, 'deleteCaseStudy']);

    // Demo Requests / Leads Management
    Route::get('/demo-requests', [AdminApiController::class, 'getDemoRequestsAdmin']);
    Route::patch('/demo-requests/{id}/status', [AdminApiController::class, 'updateDemoRequestStatus']);
    Route::delete('/demo-requests/{id}', [AdminApiController::class, 'deleteDemoRequest']);

    // Audit Trail
    Route::get('/audit-logs', [AdminApiController::class, 'getAuditLogs']);

    // Admin Users Management (Superadmin)
    Route::get('/users', [AdminApiController::class, 'getUsersAdmin']);
    Route::post('/users', [AdminApiController::class, 'storeUser']);
    Route::put('/users/{id}', [AdminApiController::class, 'updateUser']);
    Route::delete('/users/{id}', [AdminApiController::class, 'deleteUser']);
});
