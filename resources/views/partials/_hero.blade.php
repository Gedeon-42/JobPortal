<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>lara gigs</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/fontawesome.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css" />
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body>
    <nav>
        <div class="logo">
          <h3> Erekenajobs</h3>
        </div>
        <div class="navItem">
          <ul>
            <li><a href="/"> home</a></li>
            <li><a href="">about</a></li>
            <li><a href="">jobs</a></li>
             @auth
             <li class="username-li">{{ auth()->user()->name }}</li>
             <li><a href="/listings/manage">manage jobs</a></li>
             <li>
              <form action="/Logout" method="post">
                @csrf
                <button class="logout-btn" type="submit">Logout</button>
              </form>
            </li>
            @else
            <li><a href="{{ route('auth.Login') }}">Login</a></li>
            <li><a href="{{route('auth.Register')}}">register</a></li>
           @endauth
          </ul>
        </div>
        <i class="fa fa-bars menu" id="menu"></i>
      </nav>
    @yield('content')
    
  </body>
</html>