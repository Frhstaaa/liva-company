<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimrsComparison extends Model
{
    use HasFactory;

    protected $fillable = [
        'parameter_name',
        'category',
        'liva_feature',
        'liva_status',
        'conventional_feature',
        'conventional_status',
        'order_index',
    ];

    protected $casts = [
        'liva_status' => 'boolean',
        'conventional_status' => 'boolean',
        'order_index' => 'integer',
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('order_index', 'asc');
    }
}
