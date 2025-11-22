<?php

namespace Database\Factories;

use Exception;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    /**
     * @throws Exception
     */
    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-1 months', '+2 months');
        $end = (clone $start)->modify('+' . random_int(1, 5) . ' days');

        return [
            "start_date" => $start->format('Y-m-d'),
            "end_date" => $end->format('Y-m-d'),
            "status" => $this->faker->randomElement(['pending', 'confirmed', 'rejected'])
        ];
    }
}
