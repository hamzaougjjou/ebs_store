<link rel="stylesheet" href="{{ asset('css/books.css') }}">

@extends('./../admin/layouts/app')

@section('content')
    <div class="books-container">
        <div class="header">
            <a href="{{ route('books.create') }}">
                <button class="btn btn-create-book">Add New Book</button>
            </a>
        </div>
        <section id="books">
            <h2>All Books</h2>
            <div class="books-list">
                @foreach ($books as $i => $book)
                    <div class="book box">
                        <div class="image">
                            <img src="./../../storage/{{ $book->image }}" />
                        </div>
                        <div class="info">
                            <h3>
                                {{ $book->title }}
                            </h3>
                            <p>
                                price :
                                <span>
                                    {{ $book->price }}
                                </span>
                            </p>
                        </div>
                        <div class="actions">
                            <a href="" class="btn">show</a>
                            <a href="" class="btn">delete</a>
                            <a href="{{ route('books.edit' , $book->id) }}" class="btn">update</a>
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="pagination-container">
                {{ $books->links('../../../vendor/pagination/custom') }}
            </div>

        </section>
    </div>
@endsection
