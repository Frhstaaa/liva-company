<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\SimrsAuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Admin Login with Brute-Force Rate Limiting (CSO security standard).
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ], [
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Format email tidak valid',
            'password.required' => 'Password wajib diisi',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Input login tidak valid',
                'errors' => $validator->errors(),
            ], 422);
        }

        $throttleKey = 'admin-login:' . $request->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            SimrsAuditLog::log(
                action: 'login_throttled',
                entityType: 'auth',
                details: "Terlalu banyak percobaan login gagal dari IP {$request->ip()}. Terkunci {$seconds} detik."
            );
            return response()->json([
                'status' => 'error',
                'message' => "Terlalu banyak percobaan gagal. Silakan coba lagi dalam {$seconds} detik.",
            ], 429);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            RateLimiter::hit($throttleKey, 60);
            SimrsAuditLog::log(
                action: 'login_failed',
                entityType: 'auth',
                details: "Percobaan login gagal untuk email: {$request->email}"
            );
            return response()->json([
                'status' => 'error',
                'message' => 'Email atau kata sandi tidak cocok dengan data terdaftar',
            ], 401);
        }

        if (!$user->is_active) {
            return response()->json([
                'status' => 'error',
                'message' => 'Akun administrator Anda dinonaktifkan. Hubungi Superadmin.',
            ], 403);
        }

        RateLimiter::clear($throttleKey);

        // Update login stats
        $user->update([
            'last_login_at' => now(),
            'last_login_ip' => $request->ip(),
        ]);

        // Revoke old tokens & create fresh Sanctum token
        $user->tokens()->delete();
        $token = $user->createToken('admin_session', ['*'], now()->addDays(7))->plainTextToken;

        SimrsAuditLog::create([
            'user_id' => $user->id,
            'user_name' => $user->name,
            'action' => 'login_success',
            'entity_type' => 'auth',
            'entity_id' => (string) $user->id,
            'details' => "Administrator {$user->name} ({$user->role}) berhasil login.",
            'ip_address' => $request->ip(),
            'user_agent' => substr($request->userAgent() ?? '', 0, 500),
            'created_at' => now(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil. Selamat datang di Panel Administrator Liva SIMRS.',
            'data' => [
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'avatar_url' => $user->avatar_url,
                    'has_pin' => !empty($user->security_pin),
                ],
            ],
        ]);
    }

    /**
     * Get Current Authenticated User.
     */
    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'status' => 'success',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'avatar_url' => $user->avatar_url,
                'has_pin' => !empty($user->security_pin),
                'last_login_at' => $user->last_login_at?->format('d M Y H:i'),
                'last_login_ip' => $user->last_login_ip,
            ],
        ]);
    }

    /**
     * Verify Security PIN for encrypted actions.
     */
    public function verifyPin(Request $request)
    {
        $request->validate([
            'pin' => 'required|string',
        ]);

        $user = $request->user();

        if (empty($user->security_pin) || !Hash::check($request->pin, $user->security_pin)) {
            SimrsAuditLog::log(
                action: 'pin_verify_failed',
                entityType: 'security',
                details: "Verifikasi PIN keamanan gagal untuk {$user->email}"
            );
            return response()->json([
                'status' => 'error',
                'message' => 'PIN Keamanan tidak sesuai',
            ], 403);
        }

        SimrsAuditLog::log(
            action: 'pin_verify_success',
            entityType: 'security',
            details: "Verifikasi PIN keamanan berhasil untuk {$user->email}"
        );

        return response()->json([
            'status' => 'success',
            'message' => 'PIN Keamanan terverifikasi',
        ]);
    }

    /**
     * Update Admin Profile / Password / PIN.
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:150',
            'email' => "required|email|unique:users,email,{$user->id}",
            'avatar_url' => 'nullable|string|max:500',
            'current_password' => 'nullable|required_with:new_password|string',
            'new_password' => 'nullable|string|min:8',
            'security_pin' => 'nullable|string|min:4|max:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi profil gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        if ($request->filled('new_password')) {
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Kata sandi saat ini tidak cocok',
                ], 422);
            }
            $user->password = Hash::make($request->new_password);
        }

        if ($request->filled('security_pin')) {
            $user->security_pin = Hash::make($request->security_pin);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->has('avatar_url')) {
            $user->avatar_url = $request->avatar_url;
        }
        $user->save();

        SimrsAuditLog::log(
            action: 'profile_updated',
            entityType: 'user',
            entityId: (string) $user->id,
            details: "Profil pengguna {$user->email} diperbarui."
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Profil dan kredensial keamanan berhasil diperbarui',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'avatar_url' => $user->avatar_url,
                'has_pin' => !empty($user->security_pin),
            ],
        ]);
    }

    /**
     * Admin Logout.
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user) {
            $user->currentAccessToken()->delete();
            SimrsAuditLog::log(
                action: 'logout',
                entityType: 'auth',
                details: "Administrator {$user->name} logout."
            );
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Logout berhasil.',
        ]);
    }
}
