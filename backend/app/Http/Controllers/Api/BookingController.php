<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Services\BookingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class BookingController extends Controller
{
    public function index(Request $request): LengthAwarePaginator
    {
        $user = auth()->user();

        $query = Booking::with(['property', 'user'])
            ->latest();

        if ($user->role === 'guest') {
            $query->where('user_id', $user->id);
        }

        return $query->paginate($request->integer('per_page') ?: 15);
    }

    public function store(Request $req)
    {
        $req->validate([
            "property_id" => "required",
            "start_date" => "required|date",
            "end_date" => "required|date",
        ]);

        $property_id = $req->get('property_id');
        $start_date = $req->get('start_date');
        $end_date = $req->get('end_date');

        $service = new BookingService();
        $ok = $service->checkAvailability($property_id, $start_date, $end_date);

        if (!$ok) {
            return response()->json(["message" => "Not available"], 422);
        }

        return Booking::create([
            "user_id" => auth()->id(),
            "property_id" => $property_id,
            "start_date" => $start_date,
            "end_date" => $end_date,
        ]);
    }

    public function updateStatus(Request $req, Booking $booking): Booking
    {
        $booking->update(["status" => $req->get('status')]);
        return $booking;
    }
}
