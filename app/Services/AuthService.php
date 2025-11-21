<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    protected $repo;

    public function __construct(UserRepository $repo)
    {
        $this->repo = $repo;
    }

    public function register(array $data): array
    {
        $user = $this->repo->create($data);
        $expiry = now()->addHours(2);
        $tokenResult = $user->createToken("api_token");
        $token = $tokenResult->plainTextToken;
        $tokenResult->accessToken->update([
            'expires_at' => $expiry
        ]);

        return compact("user", "token", "expiry");
    }

    public function login(array $data): ?array
    {
        $user = $this->repo->findByEmail($data["email"]);

        if (!$user || !Hash::check($data["password"], $user->password)) {
            return null;
        }

        $expiry = now()->addHours(2);
        $tokenResult = $user->createToken("api_token");
        $token = $tokenResult->plainTextToken;
        $tokenResult->accessToken->update([
            'expires_at' => $expiry
        ]);

        return compact("user", "token", "expiry");
    }

    public function logout(): bool
    {
        auth()->user()->currentAccessToken()->delete();
        return true;
    }
}
