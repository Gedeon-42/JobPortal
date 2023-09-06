<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    //
    public function index(){
        return view('auth.Login');
    }
    public function store(Request $request){
        $formdata = $request->validate([
            'email'=>'required|email|exists:users,email',
            'password'=>'required'
        ]);
        if(auth()->attempt($formdata)){
            $request->session()->regenerate();
            return redirect('/')->with('message','login succesfully');
        }
        return back()->withErrors([
            'email'=>'invalid email or password'
        ])->onlyInput('email');

    }
}