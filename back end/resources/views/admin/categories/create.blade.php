<link rel="stylesheet" href="{{ asset('css/categories.css') }}">
<link rel="stylesheet" href="{{ asset('css/mediaLibrary.css') }}">

@extends('./../admin/layouts/app')

@section('content')
    <div class="categories-container">
        <div class="create-category-header">
            <a class="" href="{{ route('categories.index') }}">
                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24">
                    <path fill="red"
                        d="M24 13.3a.2.2 0 0 1-.2.2H5.74l8.239 8.239a.2.2 0 0 1 0 .282L12.14 23.86a.2.2 0 0 1-.282 0L.14 12.14a.2.2 0 0 1 0-.282L11.86.14a.2.2 0 0 1 .282 0L13.98 1.98a.2.2 0 0 1 0 .282L5.74 10.5H23.8c.11 0 .2.09.2.2v2.6Z">
                    </path>
                </svg>
                <span>Back</span>
            </a>

            {{-- @if (isset($message))
                <p class="message"> {{ $message }}</p>
            @else
                <p class="message">WWWWWWWWWWWWWW</p>
            @endif --}}

        </div>

        <div id="create-category-container" class="flex-center">
            <form method="POST" action="{{ route('categories.store') }}" class="create-category-content">
                @csrf

                <div id="select-asset-container">
                    <div class="app-container">

                        <div class="select-asset-container-header">
                            <h1>HEADER</h1>
                        </div>

                        <section class="files-container">
                            <h3>Folders <span id="folders-count"></span> </h3>
                            <div class="folders-container justify-between" id="folders-container">
                                <div class="folder-item line"></div>
                                <div class="folder-item line"></div>
                                <div class="folder-item line"></div>
                                <div class="folder-item line"></div>
                                <div class="folder-item line"></div>
                            </div>

                            <div style="margin: 20px 0">
                                <h3> Assets <span id="main-assets-count"></span></h3>
                            </div>

                            <div class="folders-container justify-between" id="main-assets-container">

                            </div>
                            <br />
                            <br />
                        </section>

                        <div class="btns-container">
                            <button type="button" class="btn btn-update" onclick="hideSelectAssetContainer()">
                                Confirm
                            </button>
                            {{-- <button type="button" onclick="hideSelectAssetContainer()"
                                class="btn btn-cancel">cancle</button> --}}
                        </div>

                    </div>

                </div>


                @if (count($errors->all()) > 0)
                    <p class="txt-error"> {{ $errors->all()[0] }} </p>
                @endif


                <div class="name">
                    <label for="caegory">
                        Category name :
                    </label>
                    <input type="text" value="{{ old('category_name') }}"
                     name="category_name" placeholder="Category name ..." required />
                </div>
                <div class="image">
                    <div>
                        <label for="caegory">
                            select image :
                        </label>
                        <input type="text" name="category_image" hidden id="category-image" />
                        <button onclick="showSelectAssetContainer()" type="button" class="btn btn-select">Select</button>
                    </div>
                    <img id="create-category-image" />
                </div>
                <div class="btns-container">
                    <button type="submit" class="btn btn-update">Create</button>
                </div>
            </form>
        </div>
    </div>
    <script>
        const selectAssetContainer = document.getElementById("select-asset-container");
        let categoryImage = document.getElementById("category-image");
        const assetsContainer = document.getElementById("main-assets-container");
        const createCategoryImage = document.getElementById("create-category-image");
        const mainAssetsContainer = document.getElementById("main-assets-container");
        const foldersContainer = document.getElementById("folders-container");
        let foldersCountNumber = 0;
        let assetssCountNumber = 0;
        let selectedAsset = null;

        let hideSelectAssetContainer = () => {
            selectAssetContainer.style.display = 'none';
        }
        let showSelectAssetContainer = () => {
            selectAssetContainer.style.display = 'flex';
        }
        //folders/create
        const getAssets = async (folderId = null) => {

            let myUrl = `http://127.0.0.1:8000/api/admin/folders/${folderId}/files`;
            if (folderId === null) {
                myUrl = `http://127.0.0.1:8000/api/admin/files`;
            }

            await fetch(myUrl, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.success) {
                        let template = "";
                        assetssCountNumber = data.files.length;
                        for (let i = 0; i < data.files.length; i++) {
                            let file = data.files[i];
                            let id = file.id;
                            template += ` <div class="asset-item main-asset-item bg-white pointer">
                                    <section class="one d-center">
                                        
                                    </section>

                                    <section class="two d-center">
                                        <img src="./../../storage/${file.path}" alt="" srcset="">
                                    </section>
                                    <section class="tree">
                                        <div>
                                            <p>${file.origin_name!=null ? file.origin_name : ""}</p>
                                            <p>
                                                <label> PNG </label>
                                                <span> - </span>
                                                <span> ${file.size} Byte </span>
                                            </p>
                                        </div>
                                        <div>
                                            <p class="d-center">image</p>
                                        </div>
                                    </section>
                            </div>
                                `
                        }
                        mainAssetsContainer.innerHTML = template;
                        document.getElementById("main-assets-count").innerText =
                            data.files.length < 10 ? "( 0" + data.files.length + " )" : "( " + data
                            .files
                            .length + " )";

                        const assetsItems = document.getElementsByClassName("main-asset-item");

                        for (let i = 0; i < assetsItems.length; i++) {
                            const item = assetsItems[i];
                            item.addEventListener("click", () => {

                                for (let j = 0; j < assetsItems.length; j++) {
                                    const item2 = assetsItems[j];
                                    item2.classList.remove("selected-asset");
                                }
                                item.classList.add("selected-asset");
                                categoryImage.setAttribute("value", data.files[i].id);
                                createCategoryImage.setAttribute("src",
                                    `./../../storage/${data.files[ i ].path}`);
                                console.log('====================================');
                                console.log(categoryImage);
                                console.log('====================================');
                            });
                        }
                    }

                }).catch(errors => {
                    console.log(errors);
                })

        }

        const getAllFolders = async () => {
            await fetch(`http://127.0.0.1:8000/api/admin/folders`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.success) {
                        // foldersCountNumber = data.folders.length;
                        // foldersCount.textContent = "(" + data.folders.length + ")";
                        let template = "";
                        for (let i = 0; i < data.folders.length; i++) {
                            let folder = data.folders[i];
                            let id = folder.id;
                            let name = folder.name;
                            template += `
                                    <div class="folder-item main-folder-item bg-white">
                                        <section class="one">
                                        
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
                                            <h2> ${name} </h2>
                                            <div>
                                                <p>
                                                    <span>
                                                    ${folder.foldersCount}
                                                    </span>
                                                    folders
                                                </p>
                                                <span> , </span>
                                                <p>
                                                    <span>
                                                    ${folder.filesCount}
                                                    </span>
                                                    assets
                                                </p>
                                            </div>
                                        </section>
                                    </div> 
                                    `
                        }
                        foldersContainer.innerHTML = template;

                        const foldersItems = document.getElementsByClassName(
                            "main-folder-item");
                        let activeFolder = null;

                        for (let i = 0; i < foldersItems.length; i++) {
                            const item = foldersItems[i];
                            item.addEventListener("click", () => {


                                for (let j = 0; j < foldersItems.length; j++) {
                                    const item2 = foldersItems[j];
                                    item2.classList.remove("selected-asset");
                                }

                                if (activeFolder === data.folders[i].id) {
                                    item.classList.remove("selected-asset");
                                    activeFolder = null;
                                } else {
                                    item.classList.add("selected-asset");
                                    activeFolder = data.folders[i].id;
                                }
                                getFolderAssets(activeFolder);

                            });
                        }

                    }
                }).catch(errors => {
                    console.log(errors);
                })
        }

        getAllFolders();

        const getFolderAssets = (folderId = null) => {
            mainAssetsContainer.innerHTML = `
                                                <div class="asset-item line"></div>
                                                <div class="asset-item line"></div>
                                                <div class="asset-item line"></div>
                                                <div class="asset-item line"></div>
                                                <div class="asset-item line"></div>
                                            `
            getAssets(folderId);

        }

        getFolderAssets();
    </script>
@endsection
