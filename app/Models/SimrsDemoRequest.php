<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimrsDemoRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'hospital_name',
        'hospital_type',
        'bed_count',
        'pic_name',
        'pic_role',
        'email',
        'phone_whatsapp',
        'preferred_date',
        'preferred_time',
        'modules_interested',
        'current_simrs_status',
        'notes',
        'status',
        'admin_notes',
        'ip_address',
    ];

    protected $casts = [
        'modules_interested' => 'array',
        'preferred_date' => 'date',
    ];
}
