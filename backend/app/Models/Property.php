<?php

namespace App\Models;

use App\QueryFilters\PropertyFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

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

    public function scopeFilter(Builder $query, PropertyFilter $filter): Builder
    {
        return $filter->apply($query);
    }

    public function availabilities(): HasMany
    {
        return $this->hasMany(Availability::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
