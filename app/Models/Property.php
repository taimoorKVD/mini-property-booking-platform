<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'price_per_night', 'location', 'amenities', 'images'
    ];

    protected $casts = [
        'amenities' => 'array',
        'images' => 'array'
    ];

    public function availabilities(): HasMany
    {
        return $this->hasMany(Availability::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
