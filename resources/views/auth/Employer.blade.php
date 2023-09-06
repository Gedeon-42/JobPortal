@extends('layouts.app')
@section('content')
    <div class="container">
        <h2>Hey recruiters tells type of employers</h2>
        <div class="create-form">
            <form action="/employer/application" method="post" enctype="multipart/form-data">
             @csrf
             <label for="title">company name:</label><br>
            <input type="text" class="@error('names') error_border @enderror" name="company" value="{{ old('company') }}" placeholder="company name" ><br>
            @error('company')
                <p class="errors">
                    {{ $message }}
                </p>
            @enderror
            <label for="title">job title:</label><br>
            <input type="text" class="@error('names') error_border @enderror" name="names" value="{{ old('names') }}" placeholder=" job title" ><br>
            @error('names')
                <p class="errors">
                    {{ $message }}
                </p>
            @enderror
            <label for="company">telephone:</label><br>
            <input type="number" class="@error('telephone') error_border @enderror" name="telephone" value="{{ old('telephone') }}" placeholder="telepone"><br>
            @error('telephone')
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
        <label for="website"> number of post</label><br>
            <input type="number" class="@error('post') error_border @enderror" name="post" value="{{ old('post') }}" placeholder="number of post"><br>
            @error('post')
            <p class="errors">
                {{ $message }}
            </p>
        @enderror
            <label for="website"> company website</label><br>
            <input type="text" class="@error('website') error_border @enderror" name="website" value="{{ old('website') }}" placeholder="website for application"><br>
            @error('website')
            <p class="errors">
                {{ $message }}
            </p>
        @enderror
           
            <label for="logo"> upload diploma</label><br>
            <input type="file" name="diploma" placeholder="logo"><br>
            <label for="description">job description</label><br>
            
            <button type="submit" class="btn-create"> add job </button>
            </form>
        </div>
    </div>
@endsection