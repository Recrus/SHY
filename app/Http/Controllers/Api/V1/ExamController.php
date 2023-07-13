<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Exam\ExamRequest;
use App\Http\Resources\Exam\ExamResource;
use App\Models\Exam;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class ExamController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for(Exam::class)
            ->defaultSort('id')
            ->allowedSorts(Exam::getAllowedSorts())
            ->allowedFilters(Exam::getAllowedFilters())
            ->paginate($itemsPerPage);

        return ExamResource::collection($builder);
    }

    public function store(ExamRequest $request): JsonResponse
    {
        $exam = Exam::create($request->validated());

        return (new ExamResource($exam))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Exam $exam): ExamResource
    {
        return new ExamResource($exam);
    }

    public function update(ExamRequest $request, Exam $exam): JsonResponse
    {
        $exam->update($request->validated());

        return (new ExamResource($exam))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Exam $exam): JsonResponse
    {
        $exam->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
