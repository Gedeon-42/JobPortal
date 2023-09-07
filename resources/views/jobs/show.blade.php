@extends('layouts.app')
@section('content')
<section class="main-content">
@include('partials._search')
<div class="gig-content">
    <!-- <img src="{{$listing->logo}}" class="gig-photo" alt="" /> -->
    <div class="gig-desc">
      <h3><a href="/listings/{{ $listing['id'] }}">{{ $listing->title }}</a></h3>
      <h1>{{ $listing->company }}</h1>
      <div class="gig-tags">
       <x-gig-tag :tagcsv="$listing->tags"/>
      </div>
      <div class="location">
        <a href="">{{ $listing->location }}</a>
      </div>
    </div>
  </div>
<div class="description">
    <h1 class="text-center">about job</h1>
    <div class="job-desc">
      <p>

      {!!html_entity_decode($listing->description)!!}
      </p>
      

    </div>
    <div class="contact-desc">
      <a href="/" class="mail-link">back</a>
      <a href="/application" class="website-link">apply</a>
    </div>
  </div>
</section>

@endsection