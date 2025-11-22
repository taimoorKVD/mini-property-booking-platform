<?php

namespace App\QueryFilters;

class PropertyFilter
{
    public function __construct(public array $filters)
    {
    }

    public function apply($query)
    {
        foreach ($this->filters as $key => $value) {
            $method = 'filter' . ucfirst($key);

            if (method_exists($this, $method) && !empty($value)) {
                $this->{$method}($query, $value);
            }
        }

        return $query;
    }

    public function filterLocation($query, $location): void
    {
        $query->where('location', 'LIKE', "%{$location}%");
    }

    public function filterMin($query, $min): void
    {
        $query->where('price_per_night', '>=', $min);
    }

    public function filterMax($query, $max)
    {
        $query->where('price_per_night', '<=', $max);
    }

    public function filterStart_date($query, $startDate): void
    {
        $endDate = $this->filters['end_date'] ?? null;

        if (empty($endDate)) {
            return;
        }

        $query->whereHas('availabilities', function ($q) use ($startDate, $endDate) {
            $q->where('start_date', '<=', $startDate)
                ->where('end_date', '>=', $endDate);
        });

        $query->whereDoesntHave('bookings', function ($q) use ($startDate, $endDate) {
            $q->where(function ($q) use ($startDate, $endDate) {
                $q->where('start_date', '<', $endDate)
                    ->where('end_date', '>', $startDate);
            });
        });
    }
}
