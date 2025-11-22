<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Availability;
use Illuminate\Http\Request;

class AvailabilityController extends Controller
{
    public function store(Request $req, $propertyId)
    {
        return Availability::create([
            "property_id" => $propertyId,
            "start_date" => $req->start_date,
            "end_date" => $req->end_date
        ]);
    }
}

