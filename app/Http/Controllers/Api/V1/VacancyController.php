<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Vacancy\VacancyRequest;
use App\Http\Resources\Vacancy\VacancyResource;
use App\Models\Vacancy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class VacancyController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for(Vacancy::class)
            ->defaultSort('id')
            ->allowedSorts(Vacancy::getAllowedSorts())
            ->allowedFilters(Vacancy::getAllowedFilters())
            ->paginate($itemsPerPage);

        return VacancyResource::collection($builder);
    }

    public function store(VacancyRequest $request): JsonResponse
    {
        $vacancy = Vacancy::create($request->validated());

        return (new VacancyResource($vacancy))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Vacancy $vacancy): VacancyResource
    {
        return new VacancyResource($vacancy);
    }

    public function update(VacancyRequest $request, Vacancy $vacancy): JsonResponse
    {
        $vacancy->update($request->validated());

        return (new VacancyResource($vacancy))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Vacancy $vacancy): JsonResponse
    {
        $vacancy->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
