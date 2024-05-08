<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);
Route::post('/checkout', [CartController::class, 'checkout']);
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);


Route::get('/csrf-cookie', function (Request $request) {
    return response()->json(['csrf_token' => csrf_token()]);
});



Route::apiResource('products', ProductController::class);
Route::post('/add-to-cart', [CartController::class, 'addToCart']);
Route::get('/cart-items', [CartController::class, 'index']);
Route::post('/products/{id}', [ProductController::class, 'update']);
Route::delete('/remove-from-cart', [CartController::class, 'removeFromCart']);


Route::get('/storage/{path}', function ($path) {
    $filePath = storage_path('app/public/' . $path);
    if (!File::exists($filePath)) {
        abort(404);
    }
    return response()->file($filePath);
})->where('path', '.*');