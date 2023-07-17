<?php

use App\Http\Controllers\Api\V1\AnswerController;
use App\Http\Controllers\Api\V1\AnswerUserController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CoverLetterController;
use App\Http\Controllers\Api\V1\ExamController;
use App\Http\Controllers\Api\V1\QuestionController;
use App\Http\Controllers\Api\V1\QuestionTestController;
use App\Http\Controllers\Api\V1\ResumeController;
use App\Http\Controllers\Api\V1\RoleController;
use App\Http\Controllers\Api\V1\SubjectController;
use App\Http\Controllers\Api\V1\TestController;
use App\Http\Controllers\Api\V1\TestUserController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\UserExamController;
use App\Http\Controllers\Api\V1\UserVacancyController;
use App\Http\Controllers\Api\V1\VacancyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});

Route::apiResource('users', UserController::class);
Route::apiResource('roles', RoleController::class)->only('index', 'show');
Route::apiResource('resumes', ResumeController::class);
Route::apiResource('exams', ExamController::class);
Route::apiResource('user.exams', UserExamController::class)->only('index', 'store', 'update', 'destroy');
Route::apiResource('user.vacancies', UserVacancyController::class)->only('index', 'store', 'update', 'destroy');
Route::apiResource('user.answers', AnswerUserController::class)->only('index', 'store', 'update', 'destroy');
Route::apiResource('test.questions', QuestionTestController::class)->only('index', 'store', 'update', 'destroy');
Route::apiResource('user.tests', TestUserController::class)->only('index', 'store', 'update', 'destroy');
Route::apiResource('subjects', SubjectController::class);
Route::apiResource('vacancies', VacancyController::class);
Route::apiResource('cover_letters', CoverLetterController::class);
Route::apiResource('questions', QuestionController::class);
Route::apiResource('tests', TestController::class);
Route::apiResource('answers', AnswerController::class);

Route::get('questions/{question}/answers', [QuestionController::class, 'answers']);
Route::get('cover_letters_of_user', [CoverLetterController::class, 'indexForUser']);


