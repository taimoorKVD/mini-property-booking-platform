<?php

namespace Database\Seeders;

use App\Models\Availability;
use App\Models\Booking;
use App\Models\Property;
use App\Models\User;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     * @throws Exception
     */
    public function run(): void
    {
        User::factory()->create([
            "name" => "Administrator",
            "email" => "admin@mpbp.com",
            "password" => bcrypt("12345678"),
            "role" => "admin"
        ]);

        $users = User::factory(1000)->create();
        $properties = Property::factory(1000)->create();
        $properties->each(function ($property) {
            Availability::factory(random_int(1, 3))->create([
                "property_id" => $property->id
            ]);
        });

        Booking::factory(1000)->make()->each(function ($booking) use ($users, $properties) {
            $booking->user_id = $users->random()->id;
            $booking->property_id = $properties->random()->id;
            $booking->save();
        });
    }
}
