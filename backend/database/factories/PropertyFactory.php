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
        // Helper function to generate dynamic placeholder URLs
        $generatePlaceholderUrl = function($width, $height, $text, $bgColor = 'cccccc', $textColor = '000000') {
            return "https://placehold.co/{$width}x{$height}/{$bgColor}/{$textColor}?text=" . urlencode($text);
        };

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
                $generatePlaceholderUrl(640, 480, 'house', '00ffaa', 'ffffff'), // house image
                $generatePlaceholderUrl(640, 480, 'interior', '004411', 'ffffff'), // interior image
            ]
        ];
    }
}

