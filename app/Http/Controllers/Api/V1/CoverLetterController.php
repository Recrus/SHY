<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CoverLetter\CoverLetterRequest;
use App\Http\Resources\CoverLetter\CoverLetterResource;
use App\Models\CoverLetter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\QueryBuilder;

class CoverLetterController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->authorize('viewAny', CoverLetter::class);

        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for(CoverLetter::class)
            ->defaultSort('id')
            ->allowedSorts(CoverLetter::getAllowedSorts())
            ->allowedFilters(CoverLetter::getAllowedFilters())
            ->paginate($itemsPerPage);

        return CoverLetterResource::collection($builder);
    }

    public function indexForUser(Request $request): AnonymousResourceCollection
    {
        $this->authorize('indexForUser', CoverLetter::class);

        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $userId = Auth::id();

        $builder = QueryBuilder::for(CoverLetter::class)
            ->defaultSort('id')
            ->allowedSorts(CoverLetter::getAllowedSorts())
            ->allowedFilters(CoverLetter::getAllowedFilters());

        if ($userId) {
            $builder->where('junior_id', $userId);
        }

        $coverLetters = $builder->paginate($itemsPerPage);

        return CoverLetterResource::collection($coverLetters);
    }

    public function store(CoverLetterRequest $request): JsonResponse
    {
        $juniorId = $request->input('junior_id');

        $this->authorize('create', [CoverLetter::class, $juniorId]);

        $coverLetter = CoverLetter::create($request->validated());

        return (new CoverLetterResource($coverLetter))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(CoverLetter $coverLetter): CoverLetterResource
    {
        $this->authorize('view', $coverLetter);

        return new CoverLetterResource($coverLetter);
    }

    public function update(CoverLetterRequest $request, CoverLetter $coverLetter): JsonResponse
    {
        $juniorId = $request->input('junior_id');

        $this->authorize('create', [CoverLetter::class, $juniorId]);

        $coverLetter->update($request->validated());

        return (new CoverLetterResource($coverLetter))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(CoverLetter $coverLetter): JsonResponse
    {
        $juniorId = $coverLetter->junior_id;

        $this->authorize('create', [CoverLetter::class, $juniorId]);

        $coverLetter->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
