<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CoverLetter\CoverLetterRequest;
use App\Http\Requests\Subject\SubjectRequest;
use App\Http\Resources\CoverLetter\CoverLetterResource;
use App\Http\Resources\Subject\SubjectResource;
use App\Models\CoverLetter;
use App\Models\Subject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class CoverLetterController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for(CoverLetter::class)
            ->defaultSort('id')
            ->allowedSorts(CoverLetter::getAllowedSorts())
            ->allowedFilters(CoverLetter::getAllowedFilters())
            ->paginate($itemsPerPage);

        return CoverLetterResource::collection($builder);
    }

    public function store(CoverLetterRequest $request): JsonResponse
    {
        $coverLetter = CoverLetter::create($request->validated());

        return (new CoverLetterResource($coverLetter))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(CoverLetter $coverLetter): CoverLetterResource
    {
        return new CoverLetterResource($coverLetter);
    }

    public function update(CoverLetterRequest $request, CoverLetter $coverLetter): JsonResponse
    {
        $coverLetter->update($request->validated());

        return (new CoverLetterResource($coverLetter))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(CoverLetter $coverLetter): JsonResponse
    {
        $coverLetter->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
