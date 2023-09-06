@extends('layouts.app')
@section('content')
    <div class="container">
        <div class="create-form">
            <form action="application" method="post" enctype="multipart/form-data">
             @csrf
            <label for="title">job title:</label><br>
            <input type="text" class="@error('names') error_border @enderror" name="names" value="{{ old('names') }}" placeholder="title" ><br>
            @error('names')
                <p class="errors">
                    {{ $message }}
                </p>
            @enderror
            <label for="company">telephone:</label><br>
            <input type="number" class="@error('telephone') error_border @enderror" name="telephone" value="{{ old('telephone') }}" placeholder="company"><br>
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
            <label for="website"> application website</label><br>
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