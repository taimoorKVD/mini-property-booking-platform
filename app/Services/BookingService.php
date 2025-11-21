<?php

namespace App\Services;

class BookingService
{
    public function checkAvailability($propertyId, $start, $end): bool
    {
        $inRange = Availability::where('property_id', $propertyId)
            ->where('start_date', '<=', $start)
            ->where('end_date', '>=', $end)
            ->exists();

        if (!$inRange) {
            return false;
        }

        $overlap = Booking::where('property_id', $propertyId)
            ->where('status', 'confirmed')
            ->where(function ($q) use ($start, $end) {
                $q->whereBetween('start_date', [$start, $end])
                    ->orWhereBetween('end_date', [$start, $end])
                    ->orWhere(function ($q2) use ($start, $end) {
                        $q2->where('start_date', '<=', $start)
                            ->where('end_date', '>=', $end);
                    });
            })
            ->exists();

        return !$overlap;
    }
}
