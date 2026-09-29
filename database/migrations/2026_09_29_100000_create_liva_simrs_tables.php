<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Extend users table if columns don't exist
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('admin')->after('email');
            }
            if (!Schema::hasColumn('users', 'avatar_url')) {
                $table->string('avatar_url')->nullable()->after('role');
            }
            if (!Schema::hasColumn('users', 'security_pin')) {
                $table->string('security_pin')->nullable()->after('password');
            }
            if (!Schema::hasColumn('users', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('security_pin');
            }
            if (!Schema::hasColumn('users', 'last_login_at')) {
                $table->timestamp('last_login_at')->nullable()->after('is_active');
            }
            if (!Schema::hasColumn('users', 'last_login_ip')) {
                $table->string('last_login_ip')->nullable()->after('last_login_at');
            }
        });

        // 1. Site Settings (Encrypted & Plain Key-Value CMS Store)
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('group', 50)->index();
            $table->string('key', 100)->unique();
            $table->longText('value')->nullable();
            $table->boolean('is_encrypted')->default(false);
            $table->string('type', 30)->default('text'); // text, textarea, json, boolean, image, number
            $table->string('description', 255)->nullable();
            $table->timestamps();
        });

        // 2. SIMRS Modules
        Schema::create('simrs_modules', function (Blueprint $table) {
            $table->id();
            $table->string('module_code', 30)->unique();
            $table->string('category', 50)->index(); // front-office, clinical, ancillary, pharmacy, finance, integration
            $table->string('category_label', 100);
            $table->string('title', 200);
            $table->string('badge_text', 100)->nullable();
            $table->text('short_description');
            $table->longText('full_description')->nullable();
            $table->string('icon', 60)->default('grid_view');
            $table->json('features')->nullable();
            $table->json('compliance_tags')->nullable();
            $table->string('highlight_metric', 150)->nullable();
            $table->integer('order_index')->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });

        // 3. 6 Pillars / Value Propositions
        Schema::create('simrs_pillars', function (Blueprint $table) {
            $table->id();
            $table->string('pillar_number', 10);
            $table->string('badge', 100);
            $table->string('title', 200);
            $table->text('description');
            $table->string('icon', 60)->default('verified');
            $table->string('metric_label', 100)->nullable();
            $table->string('metric_value', 100)->nullable();
            $table->json('features_summary')->nullable();
            $table->integer('order_index')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 4. Comparisons (Liva vs Conventional)
        Schema::create('simrs_comparisons', function (Blueprint $table) {
            $table->id();
            $table->string('parameter_name', 200);
            $table->string('category', 100)->default('Fitur Utama');
            $table->text('liva_feature');
            $table->boolean('liva_status')->default(true);
            $table->text('conventional_feature');
            $table->boolean('conventional_status')->default(false);
            $table->integer('order_index')->default(0);
            $table->timestamps();
        });

        // 5. Case Studies
        Schema::create('simrs_case_studies', function (Blueprint $table) {
            $table->id();
            $table->string('hospital_name', 200);
            $table->string('hospital_type', 100);
            $table->string('hospital_category', 50)->default('rsud'); // rsud, swasta, rsia, korporasi
            $table->string('location', 150);
            $table->integer('bed_count')->default(200);
            $table->string('headline', 255);
            $table->text('summary');
            $table->text('challenge')->nullable();
            $table->text('solution')->nullable();
            $table->json('results')->nullable();
            $table->text('quote')->nullable();
            $table->string('quote_author_name', 150)->nullable();
            $table->string('quote_author_title', 200)->nullable();
            $table->string('quote_author_avatar', 500)->nullable();
            $table->string('hospital_logo', 500)->nullable();
            $table->string('hospital_image', 500)->nullable();
            $table->integer('order_index')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // 6. Demo Requests / Lead Inquiries
        Schema::create('simrs_demo_requests', function (Blueprint $table) {
            $table->id();
            $table->string('hospital_name', 200);
            $table->string('hospital_type', 100);
            $table->string('bed_count', 50)->nullable();
            $table->string('pic_name', 150);
            $table->string('pic_role', 150);
            $table->string('email', 150);
            $table->string('phone_whatsapp', 50);
            $table->date('preferred_date')->nullable();
            $table->string('preferred_time', 50)->nullable();
            $table->json('modules_interested')->nullable();
            $table->string('current_simrs_status', 150)->nullable();
            $table->text('notes')->nullable();
            $table->string('status', 50)->default('baru'); // baru, dihubungi, dijadwalkan, selesai, batal
            $table->text('admin_notes')->nullable();
            $table->string('ip_address', 50)->nullable();
            $table->timestamps();
        });

        // 7. Assessment Engine
        Schema::create('simrs_assessments', function (Blueprint $table) {
            $table->id();
            $table->text('question');
            $table->string('category', 100)->default('Umum');
            $table->integer('weight')->default(1);
            $table->json('options');
            $table->integer('order_index')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 8. Audit Logs (CSO Security Tracking)
        Schema::create('simrs_audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('user_name', 150)->nullable();
            $table->string('action', 100);
            $table->string('entity_type', 100)->nullable();
            $table->string('entity_id', 50)->nullable();
            $table->text('details')->nullable();
            $table->string('ip_address', 50)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simrs_audit_logs');
        Schema::dropIfExists('simrs_assessments');
        Schema::dropIfExists('simrs_demo_requests');
        Schema::dropIfExists('simrs_case_studies');
        Schema::dropIfExists('simrs_comparisons');
        Schema::dropIfExists('simrs_pillars');
        Schema::dropIfExists('simrs_modules');
        Schema::dropIfExists('site_settings');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'avatar_url', 'security_pin', 'is_active', 'last_login_at', 'last_login_ip']);
        });
    }
};
