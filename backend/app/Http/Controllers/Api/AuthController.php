<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function __construct(protected AuthService $auth)
    {
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $this->auth->register($request->validated());

        return response()->json([
            "status" => "success",
            "message" => "Registration successful",
            "user" => new UserResource($data["user"]),
            "token" => $data["token"],
            "expiry" => $data["expiry"]
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $data = $this->auth->login($request->validated());

        if (!$data) {
            return response()->json([
                "status" => "error",
                "message" => "Invalid credentials"
            ], 401);
        }

        return response()->json([
            "status" => "success",
            "message" => "Login successful",
            "user" => new UserResource($data["user"]),
            "token" => $data["token"],
            "expiry" => $data["expiry"]
        ]);
    }

    public function logout(): JsonResponse
    {
        $this->auth->logout();

        return response()->json([
            "status" => "success",
            "message" => "Logout successful"
        ]);
    }
}
