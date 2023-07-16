<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Answer\AnswerResource;
use App\Http\Resources\Answer\AnswerUserResource;
use App\Http\Resources\User\UserResource;
use App\Models\Answer;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class AnswerUserController extends Controller
{
    public function index(Request $request, User $user): AnonymousResourceCollection
    {
        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for($user->answers())
            ->defaultSort('id')
            ->allowedSorts(User::getAllowedSorts())
            ->allowedFilters(User::getAllowedFilters())
            ->paginate($itemsPerPage);

        return AnswerUserResource::collection($builder);
    }

    public function store(User $user, Request $request): JsonResponse
    {
        $user->answers()->sync($request->ids);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(User $user, Answer $answer): JsonResponse
    {
        $user->answers()->syncWithoutDetaching($answer->getKey());

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(User $user, Answer $answer): JsonResponse
    {
        $user->answers()->detach($answer->getKey());

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
