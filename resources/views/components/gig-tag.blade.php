@props(['tagcsv'])
@php
    $tags = explode(',',$tagcsv)
@endphp
<div class="gig-tags">
  <ul>
    @foreach($tags as $tag)
    <li><a href="/?tag={{ $tag }}">{{ $tag }}</a></li>
    @endforeach
  </ul>
</div>