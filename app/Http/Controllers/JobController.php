<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    //
    //
    public function index(){
        //dd($request);
        $listings = Job::latest()->filter(request(['tag','search']))->get();
        return view('jobs.index',[
            'listings'=>$listings
        ]);
    }
    public function show(Job $listing){

        return view('jobs.show',[
      'listing'=>$listing
        ]);
    }
    public function manage(){
        $listings=Job::latest()->get();
        return view('listings.manage',[
            'listings'=>$listings
        ]);
    }
    public function create(){
        return view('jobs.create');
    }
    public function store(Request $request){
   $formdata = $request->validate([
    'title'=>'required',
    'company'=>'required',
    'email'=>'required|email',
    'location'=>'required',
    'website'=>'required',
    'tags'=>'required',
    'description'=>'required',
   ]);
   if($request->hasFile('logo')){
    $formdata['logo'] = $request->file('logo')->store('logos','public');
   }
   Job::create($formdata);
   return redirect('/');
    }
    public function edit(Job $listing ){

        return view('listings.edit',[
            'listing'=>$listing
        ]);
    }
    public function update(Request $request,Job $listing){
        $formdata = $request->validate([
            'title'=>'required',
            'company'=>'required',
            'email'=>'required',
            'location'=>'required',
            'website'=>'required',
            'tags'=>'required',
            'description'=>'required',
           ]);
      
    if($request->hasFile('logo')){
        $formdata['logo'] = $request->file('logo')->store('logos','public');
       }
        $listing->update($formdata);
        return back()->with('message','jobs updated succesfully');
    }
    public function destroy(Job $listing){
        $listing->delete();
        return redirect('/')->with('message','job deleted successfully');

    }
}