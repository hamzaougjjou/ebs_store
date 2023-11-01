<?php

namespace App\Http\Controllers\API;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
// use App\Models\File;
use App\Traits\FileTrait;

class CategoryController extends Controller
{

    use FileTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories =  Category::all();

        foreach ($categories as $category) {

            $path = $this->getFilePath($category->image_id);
            $category->image = $path;
        }

        return response()->json([
            'success' => true,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($category)
    {
        //
        $category =  Category::find($category);
        $category->image = $this->getFilePath($category->image_id);
        return response()->json([
            'success' => true,
            'category' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
