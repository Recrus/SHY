<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserRequest;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\QueryBuilder\QueryBuilder;
use Symfony\Component\HttpFoundation\Response;

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

    //todo delete?
    public function store(UserRequest $request): JsonResponse
    {
        $user = User::create($request->validated());

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(UserRequest $request, User $user): JsonResponse
    {
        $user->update($request->validated());

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
