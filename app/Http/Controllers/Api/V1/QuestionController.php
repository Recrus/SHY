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
        $this->authorize('viewAny', Question::class);

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
        $this->authorize('create', Question::class);

        $question = Question::create($request->validated());

        return (new QuestionResource($question))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Question $question): QuestionResource
    {
        $this->authorize('view', Question::class);

        return new QuestionResource($question);
    }

    public function update(QuestionRequest $request, Question $question): JsonResponse
    {
        $this->authorize('update', Question::class);

        $question->update($request->validated());

        return (new QuestionResource($question))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Question $question): JsonResponse
    {
        $this->authorize('delete', Question::class);

        $question->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    //todo check for best practice
    public function answers(Question $question)
    {
        $this->authorize('viewAnswers', Question::class);

        $answers = $question->answers->map(function ($answer) {
            return [
                'id' => $answer->id,
                'text' => $answer->text,
                'question_id' => $answer->question_id,
            ];
        });

        return $answers;
    }
}
