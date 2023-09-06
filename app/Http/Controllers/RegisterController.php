<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\support\Facades\Hash;
use App\Models\User;

class RegisterController extends Controller
{
    //
    
    public function index(){
        return view('auth.Register');
    }
     public function store(Request $request){

$formdata= $request->validate([
  'name'=>'required|string|min:3',
  'username'=>'required|string|min:3',
  'email'=>'required|email|unique:users,email',
  'password'=>'required|confirmed'
]);
//hash password
$formdata['password'] = bcrypt($formdata['password']);


// store user
$user = User::create($formdata);
// login user
auth()->login($user);
   
 return redirect('/')->with('message','account created successfully');
     }
      public function logout( Request $request){
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/')->with('message','logout successfully');
      }
}