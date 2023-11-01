<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Traits\FileTrait;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{

    use FileTrait;

    public function index()
    {

        $categories = Category::all();
        foreach ($categories as $category) {

            $path = $this->getFilePath($category->image_id);
            $category->image = $path;
        }

        return view("admin.categories")
            ->with(compact("categories"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view("admin.categories.create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $validator = Validator::make(
            $request->all(),
            [
                "category_name" => "required|string|min:2",
                "category_image" => "required",
            ]
        );

        if ($validator->fails()) {
            return redirect()->route("categories.create")
                ->with("errors", $validator->errors());
        }

        Category::create([
            "name" => $request->category_name,
            'image_id' => $request->category_image
        ]);

        $categories = Category::all();
        foreach ($categories as $category) {

            $path = $this->getFilePath($category->image_id);
            $category->image = $path;
        }

        return redirect()->route("categories.index");
        // ->with("message", "category created successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $category = Category::findOrFail($id);
        $category->image = $this->getFilePath($category->image_id);;
        return view("admin.categories.edit")
        ->with(compact("category"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $category = Category::findOrFail($id);
        $category->name = $request->category_name;
        $category->image_id =$request->category_image;
        $category->save();
        return redirect()->route("categories.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $req, $id)
    {
        $category = Category::findOrFail($id)->first();
        $category->delete();


        return redirect()->route("categories.index");
    }
}
