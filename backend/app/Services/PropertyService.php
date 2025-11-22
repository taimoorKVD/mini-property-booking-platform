<?php

namespace App\Services;

use App\Http\Resources\PropertyResource;
use App\Models\Property;
use App\QueryFilters\PropertyFilter;

class PropertyService
{
    public function getFiltered(array $filters)
    {
        return Property::filter(new PropertyFilter($filters))
            ->with('availabilities')
            ->latest()
            ->paginate($filters['per_page'] ?? 15)
            ->through(fn ($item) => new PropertyResource($item));
    }

    public function create(array $data): Property
    {
        return Property::create($data);
    }

    public function update(Property $property, array $data): Property
    {
        $property->update($data);
        return $property->refresh();
    }

    public function delete(Property $property): bool
    {
        return $property->delete();
    }
}
