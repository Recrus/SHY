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
        $this->authorize('viewAny', Answer::class);

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
        $this->authorize('view', Answer::class);

        $answer = Answer::create($request->validated());

        return (new AnswerResource($answer))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Answer $answer): AnswerResource
    {
        $this->authorize('create', Answer::class);

        return new AnswerResource($answer);
    }

    public function update(AnswerRequest $request, Answer $answer): JsonResponse
    {
        $this->authorize('update', Answer::class);

        $answer->update($request->validated());

        return (new AnswerResource($answer))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Answer $answer): JsonResponse
    {
        $this->authorize('delete', Answer::class);

        $answer->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
