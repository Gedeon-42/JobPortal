@extends('layouts.app')
@section('content')

<section class="main-content">
    @include('partials._search')
<x-card>
@foreach($listings as $listing)
   <x-gig-card :listing="$listing" />
@endforeach
</x-card>
</section>
@endsection