<?php

namespace Database\Factories;

use Exception;
use Illuminate\Database\Eloquent\Factories\Factory;

class PropertyFactory extends Factory
{
    /**
     * @throws Exception
     */
    public function definition(): array
    {
        return [
            "title" => $this->faker->sentence(3),
            "description" => $this->faker->paragraph(),
            "price_per_night" => $this->faker->randomFloat(2, 30, 500),
            "location" => $this->faker->city(),
            "amenities" => $this->faker->randomElements(
                ["wifi", "parking", "pool", "kitchen", "security", "tv", "air conditioning"],
                random_int(2, 5)
            ),
            "images" => [
                $this->faker->imageUrl(640, 480, "house", true),
                $this->faker->imageUrl(640, 480, "interior", true)
            ]
        ];
    }
}
