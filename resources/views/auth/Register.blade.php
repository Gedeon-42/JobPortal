@extends('layouts.app')
@section('content')
<div class="container">

    <div class="Signupform-container">
        <h3 class="text-centerr"> Register for free</h3>
        <form class="form" action="{{ route('auth.Register') }}" method="POST">
                @csrf
            <input class="form-controll @error('name') error_border @enderror" placeholder="Name" name="name" id="name" value="{{ old('name') }}"><br>
            @error('name')
            <p class="errors">{{ $message }}</p>
            @enderror
            <input class="form-controll @error('username') error_border @enderror" placeholder="userName" name="username" id="username" value="{{ old('username') }}"><br>
            @error('username')
            <p class="errors">{{ $message}}</p>
            @enderror
            <input class="form-controll @error('email') error_border @enderror " placeholder="email" name="email" id="email" value="{{ old('email') }}"><br>
            @error('email')
            <p class="errors">{{ $message}}</p>
            @enderror
            <input class="form-controll @error('password') error_border @enderror" type="password" placeholder="password" name="password" id="password"><br>
            @error('password')
            <p class="errors">{{ $message }}</p>
            @enderror
            <input class="form-controll" type="password" placeholder="confirm password" name="password_confirmation" id="password_confirmation"><br>
            <button class="btn-primary">register</button>
            <div class="message">
                <p>Alreaady registered?<a href="{{ route('auth.Login') }}" >Login</a></p>
            </div>
        </form>
    </div>
</div>
@endsection