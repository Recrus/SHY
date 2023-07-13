<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Exam\ExamResource;
use App\Http\Resources\User\UserExamsResource;
use App\Http\Resources\User\UserResource;
use App\Models\Exam;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class UserExamsController extends Controller
{
    public function index(Request $request, User $user): AnonymousResourceCollection
    {
        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for($user->exams())
            ->defaultSort('id')
            ->allowedSorts(Exam::getAllowedSorts())
            ->allowedFilters(Exam::getAllowedFilters())
            ->paginate($itemsPerPage);

        return UserExamsResource::collection($builder);
    }

    public function store(User $user, Request $request): JsonResponse
    {
        $examData = [];

        foreach ($request->input('ids', []) as $exam) {
            $examId = $exam['id'];
            $examFields = $exam['fields'];

            $examData[$examId] = $examFields;
        }

        $user->exams()->sync($examData);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(User $user, Exam $exam): JsonResponse
    {
        $user->exams()->syncWithoutDetaching($exam->getKey());


        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(User $user, Exam $exam): JsonResponse
    {
        $user->exams()->detach($exam->getKey());

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
