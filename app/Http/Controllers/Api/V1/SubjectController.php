<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Subject\SubjectRequest;
use App\Http\Resources\Subject\SubjectResource;
use App\Models\Subject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class SubjectController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->authorize('viewAny', Subject::class);
        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for(Subject::class)
            ->defaultSort('id')
            ->allowedSorts(Subject::getAllowedSorts())
            ->allowedFilters(Subject::getAllowedFilters())
            ->paginate($itemsPerPage);

        return SubjectResource::collection($builder);
    }

    public function store(SubjectRequest $request): JsonResponse
    {
        $this->authorize('create', Subject::class);
        $subject = Subject::create($request->validated());

        return (new SubjectResource($subject))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Subject $subject): SubjectResource
    {
        $this->authorize('view', Subject::class);
        return new SubjectResource($subject);
    }

    public function update(SubjectRequest $request, Subject $subject): JsonResponse
    {
        $this->authorize('update', Subject::class);
        $subject->update($request->validated());

        return (new SubjectResource($subject))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Subject $subject): JsonResponse
    {
        $this->authorize('delete', Subject::class);
        $subject->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
