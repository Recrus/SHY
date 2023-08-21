<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Question\QuestionTestResource;
use App\Http\Resources\Test\TestResource;
use App\Models\Answer;
use App\Models\Question;
use App\Models\Test;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class QuestionTestController extends Controller
{
    public function index(Request $request, Test $test): AnonymousResourceCollection
    {
        $this->authorize('viewAny', [self::class]);

        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for($test->questions()->with('tests.questions'))
            ->defaultSort('id')
            ->allowedSorts(Test::getAllowedSorts())
            ->allowedFilters(Test::getAllowedFilters())
            ->paginate($itemsPerPage);

        return QuestionTestResource::collection($builder);
    }

    public function store(Test $test, Request $request): JsonResponse
    {
        $this->authorize('create', [self::class]);

        $test->questions()->sync($request->ids);

        return (new TestResource($test))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(Test $test, Question $question): JsonResponse
    {
        $this->authorize('update', [self::class]);

        $test->questions()->syncWithoutDetaching($question->getKey());

        return (new TestResource($test))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Test $test, Question $question): JsonResponse
    {
        $this->authorize('delete', [self::class]);

        $test->questions()->detach($question->getKey());

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
