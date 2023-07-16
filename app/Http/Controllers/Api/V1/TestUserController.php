<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Test\TestUserResource;
use App\Http\Resources\User\UserResource;
use App\Models\Test;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class TestUserController extends Controller
{
    public function index(Request $request, User $user): AnonymousResourceCollection
    {
        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for($user->tests())
            ->defaultSort('id')
            ->allowedSorts(Test::getAllowedSorts())
            ->allowedFilters(Test::getAllowedFilters())
            ->paginate($itemsPerPage);

        return TestUserResource::collection($builder);
    }

    public function store(User $user, Request $request): JsonResponse
    {
        $testData = [];

        foreach ($request->input('ids', []) as $test) {
            $testId = $test['id'];
            $testFields = $test['fields'];

            $testData[$testId] = $testFields;
        }

        $user->tests()->sync($testData);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(User $user, Test $test): JsonResponse
    {
        $user->tests()->syncWithoutDetaching($test->getKey());


        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(User $user, Test $test): JsonResponse
    {
        $user->tests()->detach($test->getKey());

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
