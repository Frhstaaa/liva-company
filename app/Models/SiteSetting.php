<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'group',
        'key',
        'value',
        'is_encrypted',
        'type',
        'description',
    ];

    protected $casts = [
        'is_encrypted' => 'boolean',
    ];

    /**
     * Get setting value with automatic decryption if marked as encrypted.
     */
    public function getProcessedValueAttribute()
    {
        if (empty($this->value)) {
            return $this->value;
        }

        if ($this->is_encrypted) {
            try {
                return Crypt::decryptString($this->value);
            } catch (\Exception $e) {
                Log::warning("Failed to decrypt setting key: {$this->key}");
                return null;
            }
        }

        if ($this->type === 'json') {
            return json_decode($this->value, true);
        }

        if ($this->type === 'boolean') {
            return filter_var($this->value, FILTER_VALIDATE_BOOLEAN);
        }

        if ($this->type === 'number') {
            return is_numeric($this->value) ? $this->value + 0 : $this->value;
        }

        return $this->value;
    }

    /**
     * Helper to get setting by key.
     */
    public static function get(string $key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        return $setting ? $setting->processed_value : $default;
    }

    /**
     * Helper to get all settings grouped.
     */
    public static function getGroup(string $group): array
    {
        return static::where('group', $group)
            ->get()
            ->mapWithKeys(fn ($item) => [$item->key => $item->processed_value])
            ->toArray();
    }

    /**
     * Helper to get all public settings.
     */
    public static function getAllPublic(): array
    {
        $settings = static::where('group', '!=', 'security')->get();
        $result = [];

        foreach ($settings as $setting) {
            // For security, don't expose encrypted fields to public endpoint
            if ($setting->is_encrypted) {
                continue;
            }
            $result[$setting->key] = $setting->processed_value;
        }

        return $result;
    }

    /**
     * Helper to set setting value with optional encryption.
     */
    public static function set(string $key, $value, string $group = 'general', bool $encrypt = false, string $type = 'text', ?string $description = null)
    {
        $storedValue = $value;

        if ($type === 'json' && is_array($value)) {
            $storedValue = json_encode($value);
        } elseif ($type === 'boolean') {
            $storedValue = $value ? '1' : '0';
        }

        if ($encrypt && !empty($storedValue)) {
            $storedValue = Crypt::encryptString((string) $storedValue);
        }

        return static::updateOrCreate(
            ['key' => $key],
            [
                'group' => $group,
                'value' => $storedValue,
                'is_encrypted' => $encrypt,
                'type' => $type,
                'description' => $description,
            ]
        );
    }
}
