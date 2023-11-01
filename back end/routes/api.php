<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\NewsLetterController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FolderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout');
    Route::post('/refresh', 'refresh');
});

Route::controller(CategoryController::class)->group(function () {
    Route::get('categories', 'index');
    Route::get('categories/{category}', 'show');
});

Route::controller(NewsLetterController::class)->group(function () {
    Route::post('newsletter', 'store');
});

// ========== admin ============================
Route::controller(FolderController::class)->group(function () {
    Route::post('admin/folders/create', 'store');
    Route::get('admin/folders', 'index');
    Route::delete('admin/folders/delete', 'deleteFolders');
});
Route::controller(FileController::class)->group(function () {
    Route::get('admin/folders/{folder}/files', 'folderFiles');
    Route::get('admin/files', 'index');
});

// ========== admin ============================

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
