<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $folders = Folder::where("path", "public/images")->get();

        //folders that have a 'save root + folderName'
        foreach ($folders as $folder) {
            # code...
            $folder->foldersCount = Folder::where("path", "public/images/" . $folder->name)->count();
            $folder->filesCount = File::where("folder_id", $folder->id )->count();
        }
        return response()->json([
            "success" => true,
            "message" => "folders retrieved successfully",
            "folders" => $folders
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

        $folderName = $request->name;
        $root = 'public/images';
        $path = $root;
        Storage::makeDirectory($path);

        $folder = Folder::create(
            [
                "name" => $folderName,
                "path" => $path,
            ]
        );
        if ($folder) {
            # code...
            return response()->json([
                "success" => true,
                "message" => "folder created successfully",
                "data" => $folder
            ]);
        }
        return response()->json([
            'success' => false,
            "error" => 'unknow error'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Folder $folder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Folder $folder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Folder $folder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Folder $folder)
    {
        //
    }
    /**
     * dlelete a list of folder passed by user
     */
    public function deleteFolders(Request $request)
    {

        $foldersList = [];
        $filesList = [];

        $reqFolders =  $request->folders;

        for ($i=0; $i < count( $reqFolders ) ; $i++) { 
            $item = $reqFolders[$i];
            if( $item['type'] === "folder"){
                array_push( $foldersList , $item['value'] );
            }
            if( $item['type'] === "file"){
                array_push( $filesList , $item['value']  );
            }
        }

        $folders = Folder::destroy($foldersList);
        $files = File::destroy($filesList);

        // if ($folders) {
        if ( true ) {
            # code...
            return response()->json([
                'success' => true,
                'folders' => $folders,
                'files' => $files,
                "message" => 'folders deleted successfully'
            ]);
        }
        return response()->json([
            'success' => false,
            "error" => 'something went wrong'
        ]);
    }
}
