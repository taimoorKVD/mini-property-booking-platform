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
}
