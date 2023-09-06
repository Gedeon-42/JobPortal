@props(['listing'])
<div class="gig-content">
    <img src="{{$listing->logo}}" class="gig-photo" alt="" />
    <div class="gig-desc">
      <h3><a href="/listings/{{ $listing['id'] }}">{{ $listing->title }}</a></h3>
      <h1>{{ $listing->company }}</h1>
      <div class="gig-tags">
        <x-gig-tag :tagcsv="$listing->tags" />
      </div>
      <div class="location">
        <a href="">{{ $listing->location }}</a>
      </div>
    </div>
  </div>