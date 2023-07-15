<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Question\QuestionRequest;
use App\Http\Resources\Question\QuestionResource;
use App\Models\Question;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class QuestionController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for(Question::class)
            ->defaultSort('id')
            ->allowedSorts(Question::getAllowedSorts())
            ->allowedFilters(Question::getAllowedFilters())
            ->paginate($itemsPerPage);

        return QuestionResource::collection($builder);
    }

    public function store(QuestionRequest $request): JsonResponse
    {
        $question = Question::create($request->validated());

        return (new QuestionResource($question))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Question $question): QuestionResource
    {
        return new QuestionResource($question);
    }

    public function update(QuestionRequest $request, Question $question): JsonResponse
    {
        $question->update($request->validated());

        return (new QuestionResource($question))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Question $question): JsonResponse
    {
        $question->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
