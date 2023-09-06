@extends('layouts.app')
@section('content')
<div class="container">

    <div class="loginform-container">
        <h3> Login</h3>
        <form class="form" action="{{ route('auth.Login') }}" method="POST">
            @csrf
            <input class="form-controll @error('email') border-errors @enderror"  placeholder="email" name="email" id="email"><br>
            @error('email')
            <p class="errors">{{ $message }}</p>
            @enderror
            <input class="form-controll @error('password') border-errors @enderror" type="password" placeholder="password" name="password" id="password"><br>
            @error('password')
            <p class="errors">{{ $message }}</p>
            @enderror
            <button class="btn-primary">register</button>
            <div class="message">
                <p>Already registered ? <a href="{{ route('auth.Register') }}" >Register</a></p>
            </div>
        </form>
    </div>
</div>
@endsection