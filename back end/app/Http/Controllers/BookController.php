<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Traits\FileTrait;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    use FileTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books =  Book::paginate(6);
        foreach ($books as $book) {
            $path = $this->getFilePath($book->image_id);
            $book->image = $path;
        }

        return view("admin.books.index")
            ->with(compact("books"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $categories =  Category::all();
        return view("admin.books.create")
            ->with(compact("categories"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                "title" => "required|string|min:2",
                "author" => "required|string|min:2",
                "price" => "required|integer|min:1",

                "year" => "required|integer|min:3",
                "pages" => "required|integer|min:2",
                "old_price" => "required|integer|min:2",
                "description" => "required|string|min:2",
                "image" => "required"
            ]
        );

        if ($validator->fails()) {
            return redirect()->route("books.create")
                ->with("errors", $validator->errors());
        }
        $categories =  Category::all();
        $has_offer = false;
        if ($request->has_offer) {
            if ($request->has_offer === "on") {
                $has_offer = true;
            }
        }

        $book = Book::create(
            [
                "title" => $request->title,
                "description" => $request->description,
                "author" => $request->author,
                "price" => $request->price,
                "year" => $request->year,
                "pages" => $request->pages,
                "old_price" => $request->old_price,
                "has_offer" => $has_offer,
                "image_id" => $request->image,
                "sub_images" => $request->sub_images,
                "category_id" => $request->category
            ]
        );
        if (!$book) {
            return view("admin.books.create")
                ->with("message", "Ooops something went wrong")
                ->with(compact("categories"));
        }

        return view("admin.books.create")
            ->with("message", "book created successfully")
            ->with(compact("categories"));
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $categories =  Category::all();
        $book = Book::find($id);
        $book->image = $this->getFilePath($book->image_id);

        $sub_images = [];

        if ($book->sub_images != null) {
            foreach (explode(',', str_replace("]", "", str_replace("[", "", $book->sub_images))) as $image) {
                $path = $this->getFilePath($image);
                array_push($sub_images, $path);
            }
        }
        $book->sub_images = $sub_images;

        return view("admin.books.edit")
            ->with(compact("book"))
            ->with(compact("categories"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        // return "<ha>" . $request->image . "<h1>";
        $book = Book::findOrfail($id);

        $validator = Validator::make(
            $request->all(),
            [
                "title" => "required|string|min:2",
                "author" => "required|string|min:2",
                "price" => "required|integer|min:1",

                "year" => "required|integer|min:3",
                "pages" => "required|integer|min:2",
                "old_price" => "required|integer|min:2",
                "description" => "required|string|min:2",
                "image_id" => "required"
            ]
        );

        if ($validator->fails()) {
            return redirect()->route("books.edit",$id)
                ->with("errors", $validator->errors());
        }
        $categories =  Category::all();
        $has_offer = false;
        if ($request->has_offer) {
            if ($request->has_offer === "on") {
                $has_offer = true;
            }
        }

        $book->title = $request->title;
        $book->description = $request->description;
        $book->author = $request->author;
        $book->price = $request->price;
        $book->year = $request->year;
        $book->pages = $request->pages;
        $book->old_price = $request->old_price;
        $book->has_offer = $has_offer;
        $book->image_id = $request->image_id;
        $book->sub_images = $request->sub_images;
        $book->category_id = $request->categor;
        $book->save();

        // if (!$book) {
        //     return view("admin.books.edit")
        //         ->with("message", "Ooops something went wrong")
        //         ->with("book", $book)
        //         ->with(compact("categories"));
        // }

        return redirect()->route("books.edit",$id)
            ->with("book", $book)
            ->with(compact("categories"))
            ->with("message", "Book updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        //
    }
}
