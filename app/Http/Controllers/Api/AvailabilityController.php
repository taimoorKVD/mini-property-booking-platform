<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Access\AuthorizationException;

class AvailabilityController extends Controller
{
    /**
     * @throws AuthorizationException
     */
    public function store(Request $req, $propertyId)
    {
        $this->authorize('adminOnly');

        return Availability::create([
            "property_id" => $propertyId,
            "start_date" => $req->start_date,
            "end_date" => $req->end_date
        ]);
    }
}

