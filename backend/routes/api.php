<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItineraireController;
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

Route::post('register',[AuthController::class,'register']);
Route::post('login', [AuthController::class,'login']);
Route::middleware('auth:api')->post('logout', [AuthController::class,'logout']);

Route::middleware('auth:api')->post('itineraire', [ItineraireController::class, 'store']);
Route::middleware('auth:api')->get('itinerairee', [ItineraireController::class, 'index']);

Route::middleware('auth:api')->get('itineraires/edit/{id}', [ItineraireController::class, 'edit']);
Route::middleware('auth:api')->put('itineraires/update/{id}', [ItineraireController::class, 'update']);
Route::middleware('auth:api')->delete('itineraires/{id}', [ItineraireController::class, 'destroy']);

Route::middleware('auth:api')->post('liste-a-visualiser/{itineraireId}', [ItineraireController::class, 'StoreListeAvisiter']);
Route::middleware('auth:api')->get('liste-a-visualiser', [ItineraireController::class, 'DisplayListeAvisiter']);


Route::get('itineraires', [ItineraireController::class, 'indexAll']);
Route::get('categories', [ItineraireController::class, 'categories']);
Route::get('itineraires/search', [ItineraireController::class, 'searchByTitre']);
Route::get('itineraires/filter', [ItineraireController::class, 'filter']);




