<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimrsCaseStudy extends Model
{
    use HasFactory;

    protected $fillable = [
        'hospital_name',
        'hospital_type',
        'hospital_category',
        'location',
        'bed_count',
        'headline',
        'summary',
        'challenge',
        'solution',
        'results',
        'quote',
        'quote_author_name',
        'quote_author_title',
        'quote_author_avatar',
        'hospital_logo',
        'hospital_image',
        'order_index',
        'is_published',
    ];

    protected $casts = [
        'results' => 'array',
        'is_published' => 'boolean',
        'bed_count' => 'integer',
        'order_index' => 'integer',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true)->orderBy('order_index', 'asc');
    }
}
