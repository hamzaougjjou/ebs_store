<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Dashboard</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/main.css') }}" rel="stylesheet">
    <script src="{{ asset('js/chartjs_2_8_0_min.js') }}"></script>

    @vite('layouts.admin.resources/css/app.css')

</head>

<body>
    <div class="mainContainer">
        <nav class="sideMenu">

            @if (Route::has('login'))
                <div class="sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10">
                    @auth
                        <a href="{{ url('/dashboard') }}"
                            class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Dashboard</a>
                    @else
                        <a href="{{ route('login') }}"
                            class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Log
                            in</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}"
                                class="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Register</a>
                        @endif
                    @endauth
                </div>
            @endif

            <header>
                <img class="icon" src="./../img/entypo_wallet.svg" alt="logo" />
                <h2>E B S</h2>
            </header>
            <nav>
                <a href="{{ route('home') }}" class="active">
                    <img src="./../img/teenyicons_home-solid.svg" class="icon" alt="home icon" />
                    <p>Dashboard</p>
                </a>
                <a href="./">
                    <img src="./../img/uis_chart.svg" class="icon" alt="statistic icon" />
                    <p>statistic</p>
                </a>
                <a href="./">
                    <img src="./../img/majesticons_mail.svg" class="icon" alt="mail icon" />
                    <p>Mail</p>
                </a>

                <a href="{{ route('books.index') }}">
                    <img src="./../img/eva_message-circle-fill.svg" class="icon" alt="mail icon" />
                    <p>Books</p>
                </a>
                <a href="{{ route('categories.index') }}">
                    <img src="./../img/iconamoon_profile-fill.svg" class="icon" alt="mail icon" />
                    <p>Categories</p>
                </a>
                <a href="{{ route('admin.files') }}">
                    <img src="./../img/iconamoon_profile-fill.svg" class="icon" alt="mail icon" />
                    <p>Media library</p>
                </a>
            </nav>
        </nav>
        <div></div>
        @yield('content')

    </div>
</body>

</html>
