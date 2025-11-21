<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;

class BookingController extends Controller
{
    /**
     * @throws AuthorizationException
     */
    public function index()
    {
        $this->authorize('adminOnly');
        return Booking::with(['property', 'user'])->get();
    }

    public function store(Request $req): JsonResponse
    {
        $req->validate([
            "property_id" => "required",
            "start_date" => "required|date",
            "end_date" => "required|date",
        ]);

        $service = new BookingService();
        $ok = $service->checkAvailability(
            $req->property_id, $req->start_date, $req->end_date
        );

        if (!$ok) {
            return response()->json(["message" => "Not available"], 422);
        }

        return Booking::create([
            "user_id" => auth()->id(),
            "property_id" => $req->property_id,
            "start_date" => $req->start_date,
            "end_date" => $req->end_date,
        ]);
    }

    /**
     * @throws AuthorizationException
     */
    public function updateStatus(Request $req, $id)
    {
        $this->authorize('adminOnly');

        $booking = Booking::findOrFail($id);
        $booking->update(["status" => $req->status]);
        return $booking;
    }
}
