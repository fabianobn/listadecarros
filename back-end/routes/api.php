<?php

use App\Http\Controllers\CarroController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [UserController::class, 'store'])->name('users.store');
Route::post('login', [UserController::class, 'login'])->name('users.login');

Route::group(['middleware' => 'jwt.verify'], function () {
    Route::post('logout', [UserController::class, 'logout'])->name('users.logout');
    Route::controller(CarroController::class)->group(function () {
        Route::get('carro', 'index')->name('carro.index');
        Route::get('/carro/{id}', 'show')->name('carro.show');
        Route::put('/carro/{id}', 'update')->name('carro.update');
        Route::post('carro/add', 'store')->name('carro.store');
        Route::delete('carro/{id}', 'destroy')->name('carro.destroy');
    });
    // Route::apiResource('carro', CarroController::class);
});
