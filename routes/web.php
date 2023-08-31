<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuotaController;

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


Route::controller(QuotaController::class)->group(function(){
    Route::get('/', [QuotaController::class, "index"])->name("quota");
    Route::post('/', [QuotaController::class, "reserveQuota"])->name('quota.reserve');
});
