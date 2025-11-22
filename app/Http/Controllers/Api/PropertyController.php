<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Property\StoreRequest;
use App\Http\Requests\Property\UpdateRequest;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use App\Services\PropertyService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class PropertyController extends Controller
{
    protected PropertyService $service;

    public function __construct(PropertyService $service)
    {
        $this->service = $service;

        $this->authorizeResource(Property::class, 'property', [
            'except' => ['index'],
        ]);
    }

    public function index(Request $request)
    {
        try {
            return $this->service->getFiltered($request->all());
        } catch (Throwable $e) {
            return ApiResponse::error('Failed to fetch properties', 500);
        }
    }

    public function store(StoreRequest $request): JsonResponse
    {
        try {
            $property = $this->service->create($request->validated());

            return ApiResponse::success(
                new PropertyResource($property),
                'Property created successfully',
                201
            );

        } catch (Throwable $e) {
            return ApiResponse::error('Failed to create property', 500);
        }
    }

    public function show(Property $property): JsonResponse
    {
        try {
            $property->load('availabilities');
            return ApiResponse::success(new PropertyResource($property));
        } catch (Throwable $e) {
            return ApiResponse::error('Failed to fetch this property', 500);
        }
    }

    public function update(UpdateRequest $request, Property $property): JsonResponse
    {
        try {
            $property = $this->service->update($property, $request->validated());
            return ApiResponse::success(
                new PropertyResource($property),
                'Property updated successfully'
            );
        } catch (Throwable $e) {
            return ApiResponse::error('Failed to update property', 500);
        }
    }

    public function destroy(Property $property): JsonResponse
    {
        try {
            $this->service->delete($property);
            return ApiResponse::success(null, 'Property deleted successfully');
        } catch (Throwable $e) {
            return ApiResponse::error('Failed to delete property', 500);
        }
    }
}
