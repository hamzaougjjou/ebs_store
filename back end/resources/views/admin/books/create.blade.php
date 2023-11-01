<link rel="stylesheet" href="{{ asset('css/books.css') }}">
<link rel="stylesheet" href="{{ asset('css/mediaLibrary.css') }}">

@extends('./../../admin/layouts/app')

@section('content')
    <div class="create-book-container">
        <div class="row">
            <div class="header">
                <h2 class="txt-center">Create new Book item</h2>
            </div>

            <div class="container">
                @if (isset($message))
                    <br>
                    <h3 class="txt-center color-success">{{ $message }}</h3>
                    <br>
                @else
                    @if (count($errors->all()) > 0)
                        <br>
                        <h3 class="txt-center color-error txt-error">{{ $errors->all()[0] }}</h3>
                        <br>
                    @endif
                @endif

                <form action="{{ route('books.store') }}" method="POST">
                    @csrf
                    <div class="row">
                        <div class="col-50">
                            <label for="title">
                                Title
                            </label>
                            <input :value="old('title')" id="title" name="title" type="text" placeholder="book title ...">
                            <label for="author">
                                author
                            </label>
                            <input type="text" value="{{ old('author') }}" name="author" placeholder="John M. Doe ...">
                            <div class="row">
                                <div class="col-50">
                                    <label for="price">Price</label>
                                    <input type="number" id="price" name="price" placeholder="000">
                                </div>
                                <div class="col-50">
                                    <label for="old_price">Old price</label>
                                    <input type="text" id="old_price" name="old_price" placeholder="000">
                                </div>
                            </div>
                        </div>

                        <div class="col-50">
                            <label for="cname">Category</label>
                            <select name="category">
                                <option selected value="">select book category</option>
                                @foreach ($categories as $category)
                                    <option value="{{ $category->id }}"> {{ $category->name }}</option>
                                @endforeach
                            </select>
                            <label for="expmonth">has offer</label>
                            <label class="has-offer-container">
                                <input name="has_offer" type="checkbox" />
                                <span class="checkmark"></span>
                            </label>

                            <div class="row">
                                <div class="col-50">
                                    <label for="year">Year</label>
                                    <input type="text" id="year" name="year" placeholder="0000">
                                </div>
                                <div class="col-50">
                                    <label for="pages">Pages</label>
                                    <input type="text" id="pages" name="pages" placeholder="000">
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="description-container">
                        <label for="description">description :</label>
                        <textarea style="width: 100%" name="description" rows="10" placeholder="description ..."></textarea>
                    </div>

                    <div class="d-center" style="gap: 20px;justify-content: flex-start;">
                        <label for="caegory">
                            select book image :
                        </label>
                        <button onclick="showSelectAssetContainer()" type="button" class="btn btn-select">
                            Select
                        </button>
                        <img id="book-image" />
                        <input type="text" name="image" id="book-image-input" hidden/>
                    </div>
                    <br>
                    <br>
                    <br>
                    <br>
                    <div style="display:flex;gap: 20px;justify-content: flex-start;">
                        <label for="image">
                            select sub images :
                        </label>
                        <button onclick="showSelectAssetContainer('multiple')" type="button" class="btn btn-select"
                            style="max-height: 50px">
                            Select
                        </button>
                        <div id="sub-images-selected" class="sub-images-selected">
                            <input type="text" value="" name="sub_images" id="book-sub-images-input" hidden />
                            {{-- <span>
                                <p class="btn-close">
                                    <label>&times;</label>
                                </p>
                                <img src="./../../storage/images//s26AG8w88UFUYyLLY7yS0K4Fno91ChsZnRCJPN9Y.jpg"
                                    class="selected" />
                            </span> --}}
                        </div>
                    </div>

                    <input type="submit" value="add a book" class="btn btn-save">
                </form>
            </div>

        </div>

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


    </div>

    <script>
        const selectAssetContainer = document.getElementById("select-asset-container");
        let bookImage = document.getElementById("book-image");
        let bookImageInput = document.getElementById("book-image-input");
        const assetsContainer = document.getElementById("main-assets-container");
        const createCategoryImage = document.getElementById("create-category-image");
        const mainAssetsContainer = document.getElementById("main-assets-container");
        const foldersContainer = document.getElementById("folders-container");
        const subImagesSelected = document.getElementById("sub-images-selected");

        const bookSubImagesInput = document.getElementById("book-sub-images-input");

        let foldersCountNumber = 0;
        let assetssCountNumber = 0;

        let selectedAsset = null;
        let subImages = new Set();
        let subImagesPath = new Set();

        let hideSelectAssetContainer = () => {
            // bookSubImagesInput.setAttribute("value", "(subImages)" );
            selectAssetContainer.style.display = 'none';
        }
        let showSelectAssetContainer = (slectionType) => {
            selectAssetContainer.style.display = 'flex';


            if (slectionType === 'multiple') {
                getAssets(null, slectionType);
                getAllFolders(slectionType);
                return false;
            }
            getAssets(null, null);
            getAllFolders(null);
        }
        //folders/create
        const getAssets = async (folderId = null, slectionType) => {

            let myUrl = `http://127.0.0.1:8000/api/admin/folders/${folderId}/files`;
            if (folderId === null) {
                myUrl = `http://127.0.0.1:8000/api/admin/files`;
            }
            mainAssetsContainer.innerHTML = `
                                                <div class="asset-item line"></div>
                                                <div class="asset-item line"></div>
                                                <div class="asset-item line"></div>
                                                <div class="asset-item line"></div>
                                                <div class="asset-item line"></div>
                                            `

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

                        for (let k = 0; k < assetsItems.length; k++) {
                            const item = assetsItems[k];

                            if (slectionType === "multiple")
                                if (subImages.has(data.files[k].id)) {
                                    item.classList.add("selected-asset");
                                }

                            item.addEventListener("click", () => {

                                if (slectionType === "multiple") {

                                    if (subImages.has(data.files[k].id)) {
                                        subImages.delete(data.files[k].id);
                                        subImagesPath.delete(data.files[k].path);
                                        item.classList.remove("selected-asset");
                                    } else {
                                        subImages.add(data.files[k].id);
                                        subImagesPath.add(data.files[k].path);
                                        item.classList.add("selected-asset");
                                    }

                                    bookSubImagesInput.setAttribute("value", "subImages");

                                    bookImage.classList.add("selected");

                                    let subImageItemBtsClose = [];
                                    // let generateSubImagestemp = () => {
                                    let subImagesTemp = '';
                                    for (let i = 0; i < [...subImagesPath].length; i++) {
                                        const subImgItem = [...subImagesPath][i];
                                        subImagesTemp += `
                                                    <span>
                                                        <p class="btn-close sub-image-item-btn-close">
                                                            <label>&times;</label>
                                                        </p>
                                                        <img src="./../../storage/${subImgItem}"
                                                            class="selected" />
                                                    </span>
                                                    `;
                                    }
                                    subImagesSelected.innerHTML = subImagesTemp;
                                    subImageItemBtsClose = document.getElementsByClassName(
                                        "sub-image-item-btn-close");
                                    // }

                                    // generateSubImagestemp();

                                    for (let v = 0; v < subImageItemBtsClose.length; v++) {
                                        subImageItemBtsClose[v].addEventListener("click", () => {
                                            subImages.delete([...subImages][v]);
                                            subImagesPath.delete([...subImagesPath][v]);
                                            let subImagesTemp2 = '';
                                            for (let i = 0; i < [...subImagesPath]
                                                .length; i++) {
                                                const subImgItem = [...subImagesPath][i];
                                                subImagesTemp2 += `
                                                            <span>
                                                                <p class="btn-close sub-image-item-btn-close">
                                                                    <label>&times;</label>
                                                                </p>
                                                                <img src="./../../storage/${subImgItem}"
                                                                    class="selected" />
                                                            </span>
                                                            `;
                                            }
                                            subImagesSelected.innerHTML = subImagesTemp2;
                                            // subImageItemBtsClose.splice(v, 1);
                                            // generateSubImagestemp();
                                            console.log(subImages);
                                            console.log(subImagesPath);
                                        })
                                    }


                                    return false
                                }

                                for (let j = 0; j < assetsItems.length; j++) {
                                    const item2 = assetsItems[j];
                                    item2.classList.remove("selected-asset");
                                }
                                item.classList.add("selected-asset");
                                bookImageInput.setAttribute("value",
                                    data.files[k].id);
                                bookImage.setAttribute("src",
                                    `./../../storage/${data.files[ k ].path}`);
                                bookImage.classList.add(
                                    "selected");
                            });
                        }
                    }

                }).catch(errors => {
                    console.log(errors);
                })
        }

        const getAllFolders = async (slectionType) => {
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
                                getFolderAssets(activeFolder, slectionType);

                            });
                        }

                    }
                }).catch(errors => {
                    console.log(errors);
                })
        }

        const getFolderAssets = (folderId = null, slectionType) => {
            mainAssetsContainer.innerHTML = `
                                                <div class="asset-item line"></div>
                                                <div class="asset-item line"></div>
                                                <div class="asset-item line"></div>
                                                <div class="asset-item line"></div>
                                                <div class="asset-item line"></div>
                                            `;
            getAssets(folderId, slectionType);

        }
    </script>
@endsection
