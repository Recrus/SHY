<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Exam\ExamResource;
use App\Http\Resources\User\UserExamResource;
use App\Http\Resources\User\UserResource;
use App\Models\Exam;
use App\Models\User;
use App\Models\UserExam;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class UserExamController extends Controller
{
    public function index(Request $request, User $user): AnonymousResourceCollection
    {
        $this->authorize('viewAny', [UserExam::class, $user, auth()->user()]);

        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for($user->exams())
            ->defaultSort('id')
            ->allowedSorts(Exam::getAllowedSorts())
            ->allowedFilters(Exam::getAllowedFilters())
            ->paginate($itemsPerPage);

        return UserExamResource::collection($builder);
    }

    public function store(User $user, Request $request): JsonResponse
    {
        $this->authorize('create', UserExam::class);

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

    public function update(User $user, Exam $exam, Request $request): JsonResponse
    {
        $this->authorize('update', UserExam::class);

        $pivotData = [];

        $additionalFields = $request->only(['review_text', 'reviewed_at', 'mark', 'is_accepted']);

        $pivotData[$exam->getKey()] = $additionalFields;

        $user->exams()->syncWithoutDetaching($pivotData);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(User $user, Exam $exam): JsonResponse
    {
        $this->authorize('delete', UserExam::class);

        $user->exams()->detach($exam->getKey());

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
