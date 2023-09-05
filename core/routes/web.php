<?php

use App\Sms;
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
    Route::get('/get-quota', "get_quota")->name('quota.get');

    Route::get("/reserve-quota", 'reserveQuota')->name("quota.reserve");
    Route::post("/reserve-quota", 'saveReserveQuota')->name("quota.reserve.save");
    Route::get("/reserved-quota", 'showReserveQuota')->name("quota.reserve.view");
});
