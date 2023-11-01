{{-- <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}"> --}}
<link rel="stylesheet" href="../css/mediaLibrary.css">

@extends('admin.layouts.app')

@section('content')
    <div>
        <div id="upload-assets-container" class="d-center">
            <form id="upload-assets-content" method="POST" action={{ route('admin.upload') }} enctype="multipart/form-data">
                @csrf
                <main class="mx-auto max-w-screen-lg h-full">
                    <!-- file upload modal -->
                    <article aria-label="File Upload Modal"
                        class="relative h-full flex flex-col bg-white shadow-xl rounded-md">

                        <!-- scroll area -->
                        <section class="h-full overflow-auto p-8 w-full h-full flex flex-col">

                            <div class="d-center input-upload-assets-container">
                                <input required type="file" class="lk" id="images-input" name="images[]"
                                    placeholder="images ..." accept="image/*" multiple>

                                <input id="folder-path" type="hidden" value="" name="folder" />
                            </div>

                            <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                                To Upload
                            </h1>

                            <div id="uploaded-images-container" class="flex flex-wrap">
                            </div>

                            <!-- image gallery  -->
                            <ul id="gallery" class="flex flex-1 flex-wrap -m-1">
                                <li id="empty"
                                    class="h-full w-full text-center flex flex-col items-center
                                 justify-center items-center">
                                    <img class="mx-auto w-32"
                                        src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                                        alt="no data" />
                                    <span class="text-small text-gray-500">No files selected</span>
                                </li>
                            </ul>
                        </section>

                        <!-- sticky footer -->
                        <footer class="flex justify-end px-8 pb-8 pt-4">
                            <button id="submit"
                                class="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none">
                                Upload now
                            </button>
                            <p onclick="hideAssetsContainer()" id="cancel"
                                class="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 pointer focus:shadow-outline focus:outline-none">
                                Cancel
                            </p>
                        </footer>
                    </article>
                </main>
            </form>
        </div>

        <div id="add-folder-container">
            <div class="add-folder-content box" id="add-folder-content">
                <div class="header">
                    <h3>Add new folder</h3>
                    <p id="btn-close-create-folder" onclick="hideFolderContainer(this)">

                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none"
                            viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path fill="#121212"
                                d="M24 2.417 21.583 0 12 9.583 2.417 0 0 2.417 9.583 12 0 21.583 2.417 24 12 14.417 21.583 24 24 21.583 14.417 12 24 2.417Z">
                            </path>
                        </svg>

                    </p>
                </div>
                <div class="body">
                    <section>
                        <div>
                            <label for="folderName">Name</label>
                            <input type="text" name="folderName" id="folder-name-input" />
                        </div>
                        <div>
                            <label for="location">Location</label>
                            <select name="location" id="location">
                                <option value="0">Media Library</option>
                            </select>
                        </div>
                    </section>
                </div>
                <div class="footer">
                    <button class="btn btn-cancel" onclick="hideFolderContainer(this)">Cancel</button>
                    <button class="btn btn-create" onclick="createFolder()"> Create</button>
                </div>
            </div>
        </div>

        <div id="delete-confirmation-modal-container">
            <!-- Modal HTML -->
            <div id="myModal" class="modal">

                <div class="modal-header">
                    <div class="icon-box">
                    </div>
                    <h4 class="modal-title txt-center">Are you sure?</h4>
                </div>

                <div class="modal-body txt-center">
                    <p>
                        Are you sure you want to delete this?
                    </p>
                </div>

                <div class="modal-footer">
                    <button type="button" onclick="hideDeleteSelectedFolders()" class="btn btn-cancel"
                        data-dismiss="modal">Cancel</button>
                    <button type="button" onclick="confirmDeleteSelectedFolders()" class="btn btn-delete">Delete</button>
                </div>

                {{-- </div> --}}
            </div>
        </div>

        <div class="app">
            <div class="app-container">

                <div id="folder-container">
                    <div class="back-btn-container">
                        <button class="btn-back" onclick="goBack()">

                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    d="M24 13.3a.2.2 0 0 1-.2.2H5.74l8.239 8.239a.2.2 0 0 1 0 .282L12.14 23.86a.2.2 0 0 1-.282 0L.14 12.14a.2.2 0 0 1 0-.282L11.86.14a.2.2 0 0 1 .282 0L13.98 1.98a.2.2 0 0 1 0 .282L5.74 10.5H23.8c.11 0 .2.09.2.2v2.6Z">
                                </path>
                            </svg>
                            <span>Back</span>
                        </button>
                    </div>
                    <section class="header">
                        <div>
                            <h1>Media Library</h1>
                            <span id="path-container"></span>
                        </div>
                        <div class="header-btns-container">
                            <button onclick="showAssetsContainer()" id="btn-upload-assets">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none"
                                    viewBox="0 0 24 24">
                                    <path fill="rgb(73, 69, 255)"
                                        d="M24 13.604a.3.3 0 0 1-.3.3h-9.795V23.7a.3.3 0 0 1-.3.3h-3.21a.3.3 0 0 1-.3-.3v-9.795H.3a.3.3 0 0 1-.3-.3v-3.21a.3.3 0 0 1 .3-.3h9.795V.3a.3.3 0 0 1 .3-.3h3.21a.3.3 0 0 1 .3.3v9.795H23.7a.3.3 0 0 1 .3.3v3.21Z">
                                    </path>
                                </svg>
                                <span>Add new assets</span>
                            </button>
                        </div>
                    </section>
                    <section class="actions">

                        <section>
                            <div class="check-box-container">

                                <input type="checkbox" aria-label="Select all assets" class="sc-gKclnd ccSdox"
                                    id="sdfmk" />
                            </div>
                            <div class="filters-container">

                                <span>Most recent uploads</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none"
                                    viewBox="0 0 14 8">
                                    <path fill="#32324D" fill-rule="evenodd"
                                        d="M14 .889a.86.86 0 0 1-.26.625L7.615 7.736A.834.834 0 0 1 7 8a.834.834 0 0 1-.615-.264L.26 1.514A.861.861 0 0 1 0 .889c0-.24.087-.45.26-.625A.834.834 0 0 1 .875 0h12.25c.237 0 .442.088.615.264a.86.86 0 0 1 .26.625Z"
                                        clip-rule="evenodd"></path>
                                </svg>

                            </div>
                        </section>

                        <section class="right-icons-container">

                            <div class="right-icon-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none"
                                    viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                                    <path fill="#8E8EA9"
                                        d="m2.4.1.1-.1h9.4l.1.1v2.2l-.1.1H2.5l-.1-.1V.1ZM0 4.9l.1-.1h9.4l.1.1v2.2l-.1.1H.1L0 7.1V4.9Zm2.5 4.7-.1.1v2.2l.1.1h9.4l.1-.1V9.7l-.1-.1H2.5Z">
                                    </path>
                                </svg>
                            </div>

                            <div class="right-icon-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none"
                                    viewBox="0 0 24 24" aria-hidden="true" focusable="false"
                                    class="sc-bdvvtL sc-khQegj kGHhzp ddOLgE">
                                    <path fill="#32324D" fill-rule="evenodd"
                                        d="m23.813 20.163-5.3-5.367a9.792 9.792 0 0 0 1.312-4.867C19.825 4.455 15.375 0 9.913 0 4.45 0 0 4.455 0 9.929c0 5.473 4.45 9.928 9.912 9.928a9.757 9.757 0 0 0 5.007-1.4l5.275 5.35a.634.634 0 0 0 .913 0l2.706-2.737a.641.641 0 0 0 0-.907ZM9.91 3.867c3.338 0 6.05 2.718 6.05 6.061s-2.712 6.061-6.05 6.061c-3.337 0-6.05-2.718-6.05-6.06 0-3.344 2.713-6.062 6.05-6.062Z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </section>


                    </section>

                    <h3>Assets <span id="assets-count"></span> </h3>
                    <div class="folders-container" id="folder-assets-container">

                        {{-- <div class="asset-item">

                        <section class="one d-center">
                            <input type="checkbox" aria-label="Select all assets" class="sc-gKclnd ccSdox">
                        </section>

                        <section class="two d-center">
                            <img src="./../imgs/yahya.png" alt="" srcset="">
                        </section>
                        <section class="tree">
                            <div>
                                <p>yahya.png</p>
                                <p>
                                    <label> PNG </label>
                                    <span> - </span>
                                    <span> 250x120 </span>
                                </p>
                            </div>
                            <div>
                                <p class="d-center">image</p>
                            </div>
                        </section>
                    </div> --}}

                    </div>

                </div>

                <section class="header">
                    <h1>Media Library</h1>
                    <div class="header-btns-container">
                        <button id="btn-create-folder">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none"
                                viewBox="0 0 24 24">
                                <path fill="rgb(73, 69, 255)"
                                    d="M24 13.604a.3.3 0 0 1-.3.3h-9.795V23.7a.3.3 0 0 1-.3.3h-3.21a.3.3 0 0 1-.3-.3v-9.795H.3a.3.3 0 0 1-.3-.3v-3.21a.3.3 0 0 1 .3-.3h9.795V.3a.3.3 0 0 1 .3-.3h3.21a.3.3 0 0 1 .3.3v9.795H23.7a.3.3 0 0 1 .3.3v3.21Z">
                                </path>
                            </svg>
                            <span>Add new folder</span>
                        </button>
                        <button id="btn-upload-assets" onclick="showAssetsContainer()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none"
                                viewBox="0 0 24 24">
                                <path fill="rgb(73, 69, 255)"
                                    d="M24 13.604a.3.3 0 0 1-.3.3h-9.795V23.7a.3.3 0 0 1-.3.3h-3.21a.3.3 0 0 1-.3-.3v-9.795H.3a.3.3 0 0 1-.3-.3v-3.21a.3.3 0 0 1 .3-.3h9.795V.3a.3.3 0 0 1 .3-.3h3.21a.3.3 0 0 1 .3.3v9.795H23.7a.3.3 0 0 1 .3.3v3.21Z">
                                </path>
                            </svg>
                            <span>Add new assets</span>
                        </button>
                    </div>
                </section>

                <section class="actions">

                    <section>
                        <div class="check-box-container">

                            <input onchange="selectAllFolders(this)" type="checkbox" aria-label="Select all assets"
                                class="sc-gKclnd ccSdox" id="check-all-folder-input" />
                        </div>
                        <div class="filters-container">

                            <span>Most recent uploads</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none"
                                viewBox="0 0 14 8">
                                <path fill="#32324D" fill-rule="evenodd"
                                    d="M14 .889a.86.86 0 0 1-.26.625L7.615 7.736A.834.834 0 0 1 7 8a.834.834 0 0 1-.615-.264L.26 1.514A.861.861 0 0 1 0 .889c0-.24.087-.45.26-.625A.834.834 0 0 1 .875 0h12.25c.237 0 .442.088.615.264a.86.86 0 0 1 .26.625Z"
                                    clip-rule="evenodd"></path>
                            </svg>

                        </div>
                    </section>

                    <section class="right-icons-container">

                        <div class="right-icon-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none"
                                viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                                <path fill="#8E8EA9"
                                    d="m2.4.1.1-.1h9.4l.1.1v2.2l-.1.1H2.5l-.1-.1V.1ZM0 4.9l.1-.1h9.4l.1.1v2.2l-.1.1H.1L0 7.1V4.9Zm2.5 4.7-.1.1v2.2l.1.1h9.4l.1-.1V9.7l-.1-.1H2.5Z">
                                </path>
                            </svg>
                        </div>

                        <div class="right-icon-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none"
                                viewBox="0 0 24 24" aria-hidden="true" focusable="false"
                                class="sc-bdvvtL sc-khQegj kGHhzp ddOLgE">
                                <path fill="#32324D" fill-rule="evenodd"
                                    d="m23.813 20.163-5.3-5.367a9.792 9.792 0 0 0 1.312-4.867C19.825 4.455 15.375 0 9.913 0 4.45 0 0 4.455 0 9.929c0 5.473 4.45 9.928 9.912 9.928a9.757 9.757 0 0 0 5.007-1.4l5.275 5.35a.634.634 0 0 0 .913 0l2.706-2.737a.641.641 0 0 0 0-.907ZM9.91 3.867c3.338 0 6.05 2.718 6.05 6.061s-2.712 6.061-6.05 6.061c-3.337 0-6.05-2.718-6.05-6.06 0-3.344 2.713-6.062 6.05-6.062Z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </section>


                </section>

                <section id="btn-delete-move-container">
                    <p>
                        <label id="delete-folders-count"> 0 </label>
                        <span> folders</span>
                    </p>
                    <span> , </span>
                    <p>
                        <label id="delete-assets-count"> 0 </label>
                        <span> assets</span>
                    </p>
                    <div class="btn-delete-move">
                        <button onclick="deleteSelectedFolders()" class="btn btn-delete">Delete</button>
                        {{-- <button class="btn btn-move">Move</button> --}}
                    </div>
                </section>

                <section class="files-container">
                    <h3>Folders <span id="folders-count"></span> </h3>
                    <div class="folders-container justify-between" id="folders-container">

                        {{-- <div class="folder-item">
                        <section class="one">
                            <input type="checkbox" aria-label="Select all assets" class="sc-gKclnd ccSdox">
                        </section>
                        <section class="two">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="none"
                                viewBox="0 0 24 24" class="sc-hkgtus aCyII">
                                <path
                                    d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2Z">
                                </path>
                            </svg>
                        </section>
                        <section class="tree">
                            <h2>folder name</h2>
                            <div>
                                <p>
                                    <span>0</span>
                                    folder
                                </p>
                                <span> , </span>
                                <p>
                                    <span>0</span>
                                    assets
                                </p>
                            </div>
                        </section>
                    </div> --}}

                        <div class="folder-item line"></div>
                        <div class="folder-item line"></div>
                        <div class="folder-item line"></div>
                        <div class="folder-item line"></div>
                        <div class="folder-item line"></div>
                    </div>

                    <br />
                    <br />
                    <h3> Assets <span id="main-assets-count"></span></h3>

                    <div class="folders-container justify-between" id="main-assets-container">

                        {{-- <div class="asset-item">
                        <section class="one d-center">
                            <input type="checkbox" aria-label="Select all assets" class="sc-gKclnd ccSdox">
                        </section>

                        <section class="two d-center">
                            <img src="./../imgs/yahya.png" alt="" srcset="">
                        </section>
                        <section class="tree">
                            <div>
                                <p>yahya.png</p>
                                <p>
                                    <label> PNG </label>
                                    <span> - </span>
                                    <span> 250x120 </span>
                                </p>
                            </div>
                            <div>
                                <p class="d-center">image</p>
                            </div>
                        </section>
                    </div> --}}

                        <div class="asset-item line"></div>
                        <div class="asset-item line"></div>
                        <div class="asset-item line"></div>
                        <div class="asset-item line"></div>
                        <div class="asset-item line"></div>
                    </div>
                    <br />
                    <br />
                </section>
            </div>
        </div>
    </div>
    <script src="./../js/mediaLibrary.js"></script>
    <script src="./../js/folder.js"></script>
    <script src="./../js/uploadAssets.js"></script>
@endsection
