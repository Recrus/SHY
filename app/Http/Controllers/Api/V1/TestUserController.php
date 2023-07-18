<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Test\TestUserResource;
use App\Http\Resources\User\UserResource;
use App\Models\Answer;
use App\Models\AnswerUser;
use App\Models\Test;
use App\Models\TestUser;
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
        $this->authorize('viewAny', [TestUser::class, $user, auth()->user()]);

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
        $this->authorize('create', [TestUser::class, $user, auth()->user()]);

        $user->tests()->sync($request->ids);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(User $user, Test $test): JsonResponse
    {
        $this->authorize('update', [TestUser::class, $user, auth()->user()]);

        $user->tests()->syncWithoutDetaching($test->getKey());


        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(User $user, Test $test): JsonResponse
    {
        $this->authorize('delete', [TestUser::class, $user, auth()->user()]);

        $user->tests()->detach($test->getKey());

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    public function checkAnswers(Request $request, $test_id): JsonResponse
    {
        $this->authorize('checkAnswers', TestUser::class);

        $user_id = auth()->user()->id;

        $userAnswers = AnswerUser::where('user_id', $user_id)
            ->where('test_id', $test_id)
            ->get();

        $test = Test::find($test_id);
        $testQuestions = $test->questions;

        $correctAnswersCount = 0;
        foreach ($userAnswers as $userAnswer) {
            $answer = Answer::find($userAnswer->answer_id);
            if ($answer->answer) {
                $correctAnswersCount++;
            }
        }

        $percentage = ($correctAnswersCount / count($testQuestions)) * 100;

        $is_passed = $percentage >= 70;

        $mark = $this->calculateMark($percentage);

        TestUser::where('student_id', $user_id)
            ->where('test_id', $test_id)
            ->update(['is_passed' => $is_passed, 'mark' => $mark]);

        return response()->json([
            'correctAnswersCount' => $correctAnswersCount,
            'totalQuestions' => count($testQuestions),
            'percentage' => $percentage,
            'mark' => $mark,
            'is_passed' => $is_passed,
        ]);
    }

    private function calculateMark($percentage): int
    {
        if ($percentage >= 90) {
            return 5;
        } elseif ($percentage >= 70) {
            return 4;
        } elseif ($percentage >= 50) {
            return 3;
        } else {
            return 2;
        }
    }

}
