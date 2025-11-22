<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
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
            "availabilities" => $this->whenLoaded('availabilities'),
        ];
    }
}
