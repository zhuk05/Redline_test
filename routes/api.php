<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AddressesController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/save-address', [AddressesController::class, 'save']);
    Route::get('/saved-addresses', [AddressesController::class, 'get']);
});
