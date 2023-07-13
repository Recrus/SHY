<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\User\UserVacancyResource;
use App\Models\Exam;
use App\Models\User;
use App\Models\Vacancy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class UserVacancyController extends Controller
{
    public function index(Request $request, User $user): AnonymousResourceCollection
    {
        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for($user->responses())
            ->defaultSort('id')
            ->allowedSorts(Vacancy::getAllowedSorts())
            ->allowedFilters(Vacancy::getAllowedFilters())
            ->paginate($itemsPerPage);

        return UserVacancyResource::collection($builder);
    }

    public function store(User $user, Request $request): JsonResponse
    {
        $vacancyData = [];

        foreach ($request->input('ids', []) as $vacancy) {
            $vacancyId = $vacancy['id'];
            $vacancyFields = $vacancy['fields'];

            $vacancyData[$vacancyId] = $vacancyFields;
        }

        $user->responses()->sync($vacancyData);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(User $user, Vacancy $vacancy, Request $request): JsonResponse
    {
        $requestData = $request->validate([
            'date_of_response' => 'date',
        ]);

        $pivotData = [];
        foreach ($requestData as $field => $value) {
            $pivotData[$field] = $value;
        }

        $user->responses()->syncWithoutDetaching([$vacancy->id => $pivotData]);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(User $user, Vacancy $vacancy): JsonResponse
    {
        $user->responses()->detach($vacancy->getKey());

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
