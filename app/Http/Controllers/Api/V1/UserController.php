<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\QueryBuilder\QueryBuilder;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for(User::class)
            ->defaultSort('id')
            ->allowedSorts(User::getAllowedSorts())
            ->allowedFilters(User::getAllowedFilters())
            ->paginate($itemsPerPage);

        return UserResource::collection($builder);
    }

    public function show(User $user): UserResource
    {
        return new UserResource($user);
    }
}
