<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;

class AuthController extends Controller
{
    //
    public function Signup(SignupRequest $request ){
    }

    public function Login(LoginRequest $request){

    }
    public function Logout(){

    }
}
