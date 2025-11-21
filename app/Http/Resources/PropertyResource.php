<?php

namespace App\Http\Resources;

class PropertyResource
{
    public function toArray($request): array
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "description" => $this->description,
            "price_per_night" => $this->price_per_night,
            "location" => $this->location,
            "amenities" => $this->amenities,
            "images" => $this->images,
            "availabilities" => $this->availabilities,
        ];
    }
}
