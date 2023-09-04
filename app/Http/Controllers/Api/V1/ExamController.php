<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Exam\ExamRequest;
use App\Http\Resources\Exam\ExamResource;
use App\Models\Exam;
use App\Models\UserExam;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\QueryBuilder;

class ExamController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->authorize('viewAny', Exam::class);

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
        $this->authorize('create', Exam::class);

        $exam = Exam::create($request->validated());

        return (new ExamResource($exam))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Exam $exam): ExamResource
    {
        $this->authorize('view', Exam::class);

        return new ExamResource($exam);
    }

    public function update(ExamRequest $request, Exam $exam): JsonResponse
    {
        $this->authorize('update', Exam::class);

        $exam->update($request->validated());

        return (new ExamResource($exam))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Exam $exam): JsonResponse
    {
        $this->authorize('delete', Exam::class);

        $exam->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    public function userExamsAnalytics(): JsonResponse
    {
        $this->authorize('userExamsAnalytics', Exam::class);

        $exams = Exam::all();

        $data = [];

        foreach ($exams as $exam) {
            $averageMark = (float) UserExam::where('exam_id', $exam->id)
                ->whereNotNull('mark')
                ->avg('mark');

            $examTotalAttempts = UserExam::where('exam_id', $exam->id)->count();

            $data[] = [
                'exam_id' => $exam->id,
                'average_mark' => $averageMark,
                'exam_total_attempts' => $examTotalAttempts,
            ];
        }

        $totalAttempts = UserExam::count();
        $totalSuccessRate = UserExam::where('is_accepted', true)->count();

        return response()->json([
            'exams' => $data,
            'total_attempts' => $totalAttempts,
            'total_success_rate' => $totalSuccessRate,
        ]);
    }
}
