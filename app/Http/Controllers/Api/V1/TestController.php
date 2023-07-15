<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Question\QuestionRequest;
use App\Http\Requests\Test\TestRequest;
use App\Http\Resources\Question\QuestionResource;
use App\Http\Resources\Test\TestResource;
use App\Models\Question;
use App\Models\Test;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class TestController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for(Test::class)
            ->defaultSort('id')
            ->allowedSorts(Test::getAllowedSorts())
            ->allowedFilters(Test::getAllowedFilters())
            ->paginate($itemsPerPage);

        return TestResource::collection($builder);
    }

    public function store(TestRequest $request): JsonResponse
    {
        $test = Test::create($request->validated());

        return (new TestResource($test))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Test $test): TestResource
    {
        return new TestResource($test);
    }

    public function update(TestRequest $request, Test $test): JsonResponse
    {
        $test->update($request->validated());

        return (new TestResource($test))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Test $test): JsonResponse
    {
        $test->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
