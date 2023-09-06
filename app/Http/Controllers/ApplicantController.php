<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Applicant;
class ApplicantController extends Controller
{
    //
    public function index(){
        return view('auth.Application');
    }
    public function store(Request $request){
      $formdata = $request->validate([
        'names'=>'required|string|min:3',
        'website'=>'required|string|min:3',
        'email'=>'required|email|unique:users,email',
        'location'=>'required|',
        'telephone'=>'required|',
      ]);
      if($request->hasFile('logo')){
       $formdata['logo'] = $request->file('logo')->store('logos','public');
      }
      Applicant::create($formdata);
      return redirect('/');}
     
    

}
