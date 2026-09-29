<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimrsPillar extends Model
{
    use HasFactory;

    protected $fillable = [
        'pillar_number',
        'badge',
        'title',
        'description',
        'icon',
        'metric_label',
        'metric_value',
        'features_summary',
        'order_index',
        'is_active',
    ];

    protected $casts = [
        'features_summary' => 'array',
        'is_active' => 'boolean',
        'order_index' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('order_index', 'asc');
    }
}
