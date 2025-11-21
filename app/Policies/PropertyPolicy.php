<?php

namespace App\Policies;

use App\Models\Property;
use App\Models\User;

class PropertyPolicy
{
    public function before(User $user, $ability): bool
    {
        return $user->role === 'admin';
    }

    public function create(User $user): bool
    {
        return false;
    }

    public function update(User $user, Property $property): bool
    {
        return false;
    }

    public function delete(User $user, Property $property): bool
    {
        return false;
    }
}
