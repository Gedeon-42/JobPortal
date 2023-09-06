<?php

use  App\Models\Job;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobController;
use App\Http\Controllers\LoginController;

use App\Http\Controllers\EmployerController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\Admin\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [JobController::class,'index']);
Route::get('/admin',[AdminController::class,'index']);
Route::get('/admin/listings/create',[JobController::class,'create'])->name('listings.create');


Route::get('/Register',[RegisterController::class,'index'])->name('auth.Register');
Route::post('/Register',[RegisterController::class,'store'])->name('auth.Register');

Route::get('/Login',[LoginController::class,'index'])->name('auth.Login');
Route::post('/Login',[LoginController::class,'store'])->name('auth.Login');

Route::post('/Logout',[RegisterController::class,'logout'])->name('auth.logout');

 Route::get('/application',[ApplicantController::class,'index'])->name('/application');
 Route::post('/application',[ApplicantController::class,'store'])->name('/application');

Route::get('/employer/application',[EmployerController::class,'index'])->name('/employer/application');
Route::post('/employer/application',[EmployerController::class,'store'])->name('/employer/application');

Route::post('/listings',[JobController::class,'store'])->name('/listings');
Route::get('/listings/manage',[JobController::class,'manage']);
Route::get('/listings/{listing}/edit',[JobController::class,'edit'])->name('listings.edit');
Route::get('/jobs/create',[JobController::class,'create'])->name('listings.create');
Route::put('/listings/{listing}',[JobController::class,'update']);
Route::delete('/listings/{listing}',[JobController::class,'destroy']);
Route::get('/listings/{listing}',[JobController::class,'show']);



 