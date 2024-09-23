@extends('layouts.app')
@section('content')
    <div class="container">
        <div class="create-form">
            <form action="/listings" method="post" enctype="multipart/form-data">
             @csrf
            <label for="title">job title:</label><br>
            <input type="text" class="@error('title') error_border @enderror" name="title" value="{{ old('title') }}" placeholder="title" ><br>
            @error('title')
                <p class="errors">
                    {{ $message }}
                </p>
            @enderror
            
            <label for="company">company name:</label><br>
            <input type="text" class="@error('company') error_border @enderror" name="company" value="{{ old('company') }}" placeholder="company"><br>
            @error('company')
            <p class="errors">
                {{ $message }}
            </p>
        @enderror
            <label for="email"> contact email</label><br>
            <input type="email" class="@error('email') error_border @enderror" name="email" value="{{ old('email') }}" placeholder=" contact email"><br>
            @error('email')
            <p class="errors">
                {{ $message }}
            </p>
        @enderror
            <label for="location"> job location</label><br>
            <input type="text" class="@error('location') error_border @enderror" name="location" value="{{ old('location') }}" placeholder="job location"><br>
            @error('location')
            <p class="errors">
                {{ $message }}
            </p>
        @enderror
            <label for="website"> application website</label><br>
            <input type="text" class="@error('website') error_border @enderror" name="website" value="{{ old('website') }}" placeholder="website for application"><br>
            @error('website')
            <p class="errors">
                {{ $message }}
            </p>
        @enderror
            <label for="tags"> tags</label><br>
            <input type="text" class="@error('tags') error_border @enderror" name="tags" value="{{ old('tags') }}" placeholder="add tags"><br>
            @error('tags')
            <p class="errors">
                {{ $message }}
            </p>
        @enderror
            <label for="logo"> upload logo</label><br>
            <input type="file" name="logo" placeholder="logo"><br>
            <label for="description">job description</label><br>
            <textarea  name="description" id="" cols="40" rows="10px"></textarea><br>
            @error('description')
            
            <p class="errors">
                {{ $message }}
            </p>
        @enderror
            <button type="submit" class="btn-create"> add job </button>
            </form>
        </div>
    </div>
@endsection