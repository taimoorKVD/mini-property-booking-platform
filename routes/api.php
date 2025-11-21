<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PropertyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::middleware("auth:sanctum")->group(function () {
    Route::post("logout", [AuthController::class, "logout"]);

    Route::get('/user', static fn(Request $request) => $request->user());

    Route::apiResource('properties', PropertyController::class);

    // Route::post("{property}/availability", [AvailabilityController::class, "store"]);

    Route::prefix('bookings')
        ->controller(BookingController::class)
        ->group(function () {
            Route::post("/", "store");
            Route::get("/", "index");
            Route::put("/{booking}/status", "updateStatus");
        });
});
