<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Exam\ExamLinkRequest;
use App\Http\Resources\Exam\ExamLinkResource;
use App\Models\ExamLink;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Spatie\QueryBuilder\QueryBuilder;

class ExamLinkController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->authorize('viewAny', ExamLink::class);

        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for(ExamLink::class)
            ->defaultSort('id')
            ->allowedSorts(ExamLink::getAllowedSorts())
            ->allowedFilters(ExamLink::getAllowedFilters())
            ->paginate($itemsPerPage);

        return ExamLinkResource::collection($builder);
    }

    public function store(ExamLinkRequest $request): JsonResponse
    {
        $user = auth()->user();
        $this->authorize('create', [ExamLink::class, $user]);

        $existingLink = ExamLink::where('employee_id', $user->id)
            ->where('exam_id', $request->input('exam_id'))
            ->first();

        if ($existingLink) {
            return response()->json(['error' => 'Link to this exam already exists for this user.'], Response::HTTP_CONFLICT);
        }

        $mockLink = 'https://example.com/exam/' . Str::random(10);

        $data = $request->validated();
        $data['link'] = $mockLink;

        if ($user->role_id === 3) {
            unset($data['reviewer_id']);
        }

        $examLink = ExamLink::create($data);

        return (new ExamLinkResource($examLink))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show($examId): AnonymousResourceCollection
    {
        $userRoleId = auth()->user()->role_id;
        $userId = auth()->id();
        $this->authorize('view', ExamLink::class);

        $query = ExamLink::where('exam_id', $examId);

        if ($userRoleId !== 1) {
            $query->where(function ($query) use ($userId) {
                $query->where('employee_id', $userId)
                    ->orWhere('reviewer_id', $userId);
            });
        }

        $examLink = $query->get();

        return ExamLinkResource::collection($examLink);
    }

    public function update(ExamLinkRequest $request, ExamLink $examLink): JsonResponse
    {
        $this->authorize('update', ExamLink::class);

        $examLink->update($request->validated());

        return (new ExamLinkResource($examLink))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(ExamLink $examLink): JsonResponse
    {
        $this->authorize('delete', ExamLink::class);

        $examLink->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    protected function getUserIdForRole($userRoleId, $examLink)
    {
        return match ($userRoleId) {
            3 => $examLink->employee_id,
            4 => $examLink->reviewer_id,
            1 => 1,
            default => null,
        };
    }
}
