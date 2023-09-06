<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employer;

class EmployerController extends Controller
{
    //

    public function index(){
        return view('auth.Employer');
    }
    public function store(Request $request){
      $formdata = $request->validate([
        'title'=>'required|string|min:3',
        'website'=>'required|string|min:3',
        'email'=>'required|email|unique:users,email',
        'location'=>'required|',
        'telephone'=>'required|',
        'post'=>'required',
        'company'=>'required'
      ]);
      if($request->hasFile('logo')){
       $formdata['logo'] = $request->file('logo')->store('logos','public');
      }
      Employer::create($formdata);
      return redirect('/');}
     




}
