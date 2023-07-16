<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Answer\AnswerRequest;
use App\Http\Resources\Answer\AnswerResource;
use App\Models\Answer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class AnswerController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for(Answer::class)
            ->defaultSort('id')
            ->allowedSorts(Answer::getAllowedSorts())
            ->allowedFilters(Answer::getAllowedFilters())
            ->paginate($itemsPerPage);

        return AnswerResource::collection($builder);
    }

    public function store(AnswerRequest $request): JsonResponse
    {
        $answer = Answer::create($request->validated());

        return (new AnswerResource($answer))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Answer $answer): AnswerResource
    {
        return new AnswerResource($answer);
    }

    public function update(AnswerRequest $request, Answer $answer): JsonResponse
    {
        $answer->update($request->validated());

        return (new AnswerResource($answer))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Answer $answer): JsonResponse
    {
        $answer->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
