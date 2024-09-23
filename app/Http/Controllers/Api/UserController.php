<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
 use App\Http\Resources\userResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return  \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     * @return \Illuminate\Http\Response
     * 
     */
    public function index()
    {
        //
        return userResource::collection(User::query()->orderBy('id','desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        //
        $data = $request->validated();
     $data['password']=bcrypt($data['password']);
        $user=User::create($data);
        return response(new userResource($user),201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
        return new userResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
        $data = $request->validated();
           if(isset($data['password'])){
            $data['password']=bcrypt($data['password']);
           }
        $user->update($data);
        return new userResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
        $user->delete();
        return response('',204);
    }
}