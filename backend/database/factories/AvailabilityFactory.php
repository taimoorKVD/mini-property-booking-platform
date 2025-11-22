<?php

namespace Database\Factories;

use Exception;
use Illuminate\Database\Eloquent\Factories\Factory;

class AvailabilityFactory extends Factory
{
    /**
     * @throws Exception
     */
    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-1 months', '+3 months');
        $end = (clone $start)->modify('+' . random_int(3, 10) . ' days');

        return [
            "start_date" => $start->format('Y-m-d'),
            "end_date" => $end->format('Y-m-d'),
        ];
    }
}
