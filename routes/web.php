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
    Route::get('/', "index")->name("quota");
    Route::post('/', "saveQuota")->name('quota.save');

    Route::get("/reserve-quota", 'reserveQuota')->name("quota.reserve");
    Route::post("/reserve-quota", 'saveReserveQuota')->name("quota.reserve.save");
});
