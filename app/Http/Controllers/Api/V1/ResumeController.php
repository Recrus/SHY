<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Resume\ResumeRequest;
use App\Http\Resources\Resume\ResumeResource;
use App\Models\Resume;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class ResumeController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->authorize('viewAny', Resume::class);

        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for(Resume::class)
            ->defaultSort('id')
            ->allowedSorts(Resume::getAllowedSorts())
            ->allowedFilters(Resume::getAllowedFilters())
            ->paginate($itemsPerPage);

        return ResumeResource::collection($builder);
    }

    public function store(ResumeRequest $request): JsonResponse
    {
        $juniorId = $request->junior_id;

        $this->authorize('create', [Resume::class, $juniorId]);

        $resume = Resume::create($request->validated());

        return (new ResumeResource($resume))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Resume $resume): ResumeResource
    {
        $juniorId = $resume->junior_id;

        $this->authorize('view', [Resume::class, $juniorId]);

        return new ResumeResource($resume);
    }

    public function update(ResumeRequest $request, Resume $resume): JsonResponse
    {
        //todo patch

        $juniorId = $request->junior_id;

        $this->authorize('update', [Resume::class, $juniorId]);

        $resume->update($request->validated());

        return (new ResumeResource($resume))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Resume $resume): JsonResponse
    {
        $juniorId = $resume->junior_id;

        $this->authorize('delete', [Resume::class, $juniorId]);

        $resume->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
