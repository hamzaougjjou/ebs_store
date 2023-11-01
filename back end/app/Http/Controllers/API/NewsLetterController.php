<?php

namespace App\Http\Controllers\API;

use App\Models\NewsLetter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class NewsLetterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'success' => false,
                'error' => "invalid email sent"
            ]);
        }

        $emailExists = NewsLetter::where("email", "=", $request->email)->first();

        if ($emailExists != null) {
            return response()->json([
                'success' => true,
                'message' => "email already exist",
                'code' => 0
            ]);
        }
        $newsLetter = NewsLetter::create([
            'email' => $request->email,
        ]);

        if ( !$newsLetter ) {
            return response()->json([
                'success' => false,
                'error' => "something went wrong"
            ]);
        }

        return response()->json([
            'success' => true,
            'error' => "user joined news letter successfylly",
            'code' => 1
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(NewsLetter $newsLetter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, NewsLetter $newsLetter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NewsLetter $newsLetter)
    {
        //
    }
}
