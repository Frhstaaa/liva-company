<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimrsAssessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'question',
        'category',
        'weight',
        'options',
        'order_index',
        'is_active',
    ];

    protected $casts = [
        'options' => 'array',
        'is_active' => 'boolean',
        'weight' => 'integer',
        'order_index' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('order_index', 'asc');
    }
}
