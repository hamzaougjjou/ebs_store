<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $files = File::where("folder_id", null)->get();
        if ($files) {
            # code...
            return response()->json([
                'success' => true,
                "files" => $files,
                "message" => "files retrieved successfully"
            ]);
        }
        return response()->json([
            'success' => false,
            "error" => "something went wrong"
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $folderPath = 'public'; // The root of the public disk
        // Use the Storage facade to list all folders
        $folders = Storage::disk('public')->allDirectories();
        return view('admin.mediaLibrary')->with(compact("folders"));
        // return view('admin.files')->with(compact("folders"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $images = [];
        $folder = $request->folder;
        $folder_name = "";
        $origin_name =  null;
        if ($folder) {
            $folder_name = Folder::find($folder)->name;
        }
        if ($files = $request->file('images')) {
            foreach ($files as $file) {
                $origin_name = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $size = $file->getSize();
                // $images[] = $name;

                $image_path = $file->store('images/' . $folder_name, 'public');
                array_push($images, $image_path);

                File::insert([
                    "type" => "image/".$extension,
                    "size" => $size,
                    "path" => $image_path,
                    "folder_id" => $folder,
                    "origin_name" => $origin_name,
                ]);
            }
        }

        return redirect()->route('admin.files')
            ->with(compact("images"));
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(File $file)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        //
    }


    public function folderFiles($folder)
    {
        $files = File::where("folder_id", $folder)->get();
        if ($files) {
            # code...
            return response()->json([
                'success' => true,
                "files" => $files,
                "message" => "files retrieved successfully"
            ]);
        }
        return response()->json([
            'success' => false,
            "error" => "something went wrong"
        ]);
    }
}
