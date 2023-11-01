<link rel="stylesheet" href="{{ asset('css/categories.css') }}">
@extends('admin/layouts/app')

@section('content')
    <div class="categories-container">
        <div class="header">

            {{-- @if (isset($message))
                <p class="message"> {{ $message }} jkjkkj</p>
            @else
                <p class="message">WWWWWWWWWWWWWW</p>
            @endif --}}
            <a href="{{ route('categories.create') }}">
                <button class="btn btn-create-category">Create new category</button>
            </a>

        </div>
        <section id="categories">

            <h2>All categories</h2>

            <div class="category-list">


                @foreach ($categories as $i => $category)
                    <div class="category box">
                        {{-- <p>
                            {{ $category->image }}
                        </p> --}}
                        <img src="./../storage/{{ $category->image }}" alt="{{ $category->name }} book image">
                        <h3> {{ $category->name }} </h3>

                        <div class="btns-container">
                            <button onclick="showDeleteCategoryModel('{{ $i }}')"
                                class="btn btn-delete">Delete</button>
                            <a href="{{ route('categories.edit', $category->id) }}" class="btn btn-update">
                                update
                            </a>
                        </div>

                        <div id="delete-confirmation-modal-container" class="delete-confirmation-modal-container">
                            <!-- Modal HTML -->
                            <form id="myModal" class="modal" method="POST"
                                action="{{ route('categories.delete', $category->id) }}">
                                @csrf
                                @method('DELETE')
                                <div class="modal-header">
                                    <div class="icon-box">
                                    </div>
                                    <h4 class="modal-title txt-center">Are you sure? {{ $i }}</h4>
                                </div>
                                <div class="modal-body txt-center">
                                    <p>
                                        Are you sure you want to delete this?
                                    </p>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-delete">
                                        Delete
                                    </button>
                                    <button type="button" onclick="hideDeleteCategoryModel('{{ $i }}')"
                                        class="btn btn-cancel" data-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>


                    </div>
                @endforeach


            </div>
        </section>
    </div>

    <script src="./../js/categories.js"></script>
@endsection
