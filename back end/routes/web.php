<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::controller(BookController::class)->group(function () {
    Route::get('dashboard/books', 'index')->name('books.index');
    Route::get('dashboard/books/create', 'create')->name('books.create');
    Route::post('dashboard/books/store', 'store')->name('books.store');
    Route::delete('dashboard/books/{id}/delete', 'destroy')->name('books.delete');
    Route::get('dashboard/books/{id}/edit', 'edit')->name('books.edit');
    Route::put('dashboard/books/{id}/update', 'update')->name('books.update');
});

Route::controller(CategoryController::class)->group(function () {
    Route::get('dashboard/categories', 'index')->name('categories.index');
    Route::get('dashboard/categories/create', 'create')->name('categories.create');
    Route::post('dashboard/categories/store', 'store')->name('categories.store');
    Route::delete('dashboard/categories/{id}/delete', 'destroy')->name('categories.delete');
    Route::get('dashboard/categories/{id}/edit', 'edit')->name('categories.edit');
    Route::put('dashboard/categories/{id}/update', 'update')->name('categories.update');
});

Route::controller(FileController::class)->group(function () {
    Route::get('dashboard/files', 'create')->name('admin.files');
    Route::post('dashboard/files/upload', 'store')->name("admin.upload");
});


Route::controller(HomeController::class)->group(function () {
    Route::get('dashboard', 'index')->name('home');
});

Route::get('/', function () {
    return view('welcome');
});


// Route::get('/cc', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
