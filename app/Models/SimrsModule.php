<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimrsModule extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_code',
        'category',
        'category_label',
        'title',
        'badge_text',
        'short_description',
        'full_description',
        'icon',
        'features',
        'compliance_tags',
        'highlight_metric',
        'order_index',
        'is_active',
        'is_featured',
    ];

    protected $casts = [
        'features' => 'array',
        'compliance_tags' => 'array',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'order_index' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('order_index', 'asc');
    }
}
