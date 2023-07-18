<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
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
        $this->authorize('viewAny', [self::class, $user, auth()->user()]);

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
        $this->authorize('create', [self::class, $user, auth()->user()]);

        $answerData = [];

        foreach ($request->input('ids', []) as $answer) {
            $answerId = $answer['id'];
            $answerFields = $answer['fields'];

            $answerData[$answerId] = $answerFields;
        }

        $user->answers()->sync($answerData);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(User $user, Answer $answer, Request $request): JsonResponse
    {
        $this->authorize('update', [self::class, $user, auth()->user()]);

        //todo test_id or answer_id?
        $requestData = $request->validate([
            'test_id' => 'integer',
        ]);

        $pivotData = [];
        foreach ($requestData as $field => $value) {
            $pivotData[$field] = $value;
        }

        $user->answers()->syncWithoutDetaching([$answer->id => $pivotData]);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(User $user, Answer $answer): JsonResponse
    {
        $this->authorize('delete', [self::class, $user, auth()->user()]);

        $user->answers()->detach($answer->getKey());

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
