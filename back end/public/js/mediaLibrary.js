
const btnCreateFolder = document.getElementById("btn-create-folder");
const addFolderContainer = document.getElementById("add-folder-container");
const addFolderContent = document.getElementById("add-folder-content");
const folderNameInput = document.getElementById("folder-name-input");
const foldersCount = document.getElementById("folders-count");
const foldersContainer = document.getElementById("folders-container");
const btnDeleteMoveContainer = document.getElementById("btn-delete-move-container");
const deleteFoldersCount = document.getElementById("delete-folders-count");
const deleteAssetsCount = document.getElementById("delete-assets-count");
const checkAllFolderInput = document.getElementById("check-all-folder-input");
const deleteConfirmationModalContainer = document.getElementById("delete-confirmation-modal-container");
const folderContainer = document.getElementById("folder-container");
const pathContainer = document.getElementById("path-container");
let assetsItem;

let selectFolderItem;
let deleteItems = [];
let foldersCountNumber = 0;
let assetssCountNumber = 0;


folderContainer.style.height = document.body.scrollHeight;

btnCreateFolder.addEventListener("click", () => {
    addFolderContainer.style.display = addFolderContainer.style.display == "flex" ? "none" : "flex";
})

const goBack = () => {
    let url = window.location.origin + window.location.pathname;
    window.location.href = url;
}
const hideFolderContainer = (e) => {
    // if ( addFolderContent.children.contains( e.target  ) )
    addFolderContainer.style.display = "none";
}

let addToDeleteItems = (item) => {
    let itemExsist = false;
    for (let i = 0; i < deleteItems.length; i++) {
        const xyz = deleteItems[i];
        if ((item.type === xyz.type) && (item.value === xyz.value)) {
            itemExsist = true;
        }
    }
    if (!itemExsist)
        deleteItems.push(item);
}
let removeFromDeleteItems = (item) => {
    let itemExsist = false;
    let index = null;
    for (let i = 0; i < deleteItems.length; i++) {
        const xyz = deleteItems[i];
        if ((item.type === xyz.type) && (item.value === xyz.value)) {
            itemExsist = true;
            index = i;
        }
    }
    if (itemExsist)
        deleteItems.splice(index, 1);

}

//folders/create
const getAllFolders = async () => {
    await fetch(`http://127.0.0.1:8000/api/admin/folders`,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
    )
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if (data.success) {
                foldersCountNumber = data.folders.length;
                foldersCount.textContent = "(" + data.folders.length + ")";
                let template = "";
                for (let i = 0; i < data.folders.length; i++) {
                    let folder = data.folders[i];
                    let id = folder.id;
                    let name = folder.name;
                    template += `
                    <div class="folder-item bg-white">
                        <section class="one">
                            <input type="checkbox" aria-label="Select all assets" 
                            class="select-folder-item"
                            onChange="addToDeleteList(this,'${id}','folder')"
                            value="${id}"
                            >
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
                            <h2 
                            onClick="openFolder('${id}','${name}')"
                            > ${name} </h2>
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
                selectFolderItem = document.getElementsByClassName('select-folder-item');
                folderContainer.style.height = document.body.scrollHeight + "px";
            }
        }).catch(errors => {
            console.log(errors);
        })
    deleteItems = [];
    checkSelectFolders();
}


let openFolder = (id, name) => {
    let url = new URLSearchParams(window.location.search);
    url.set("folder", id);
    url.set("folderName", name);
    window.location.search = url;
}

let checkSelectFolders = () => {
    let deleteItemsSize = deleteItems.length;
    (parseInt(foldersCountNumber) + parseInt(assetssCountNumber) === deleteItemsSize) ?
        checkAllFolderInput.checked = true
        :
        checkAllFolderInput.checked = false;



    let foldersCount = 0;
    let assetsCount = 0;

    for (let i = 0; i < deleteItems.length; i++) {
        const folder = deleteItems[i];
        if (folder.type === "folder")
            foldersCount++;
        else
            assetsCount++;
        deleteFoldersCount.textContent =
            foldersCount < 10 ? "0" + foldersCount : foldersCount;
        deleteAssetsCount.textContent =
            assetsCount < 10 ? "0" + assetsCount : assetsCount;
    }

    (deleteItemsSize > 0) ?
        btnDeleteMoveContainer.style.display = "flex"
        :
        btnDeleteMoveContainer.style.display = "none";
}

let selectAllFolders = (e) => {
    let checked = e.checked;

    for (let i = 0; i < selectFolderItem.length; i++) {
        const element = selectFolderItem[i];
        element.checked = checked;

        if (checked)
            addToDeleteItems({ "type": "folder", "value": element.value });
        else
            removeFromDeleteItems({ "type": "folder", "value": element.value });
    }

    for (let i = 0; i < assetsCheckBoxItems.length; i++) {
        const element = assetsCheckBoxItems[i];
        element.checked = checked;
        if (checked)
            addToDeleteItems({ "type": "file", "value": element.value });
        else
            removeFromDeleteItems({ "type": "file", "value": element.value });
    }
    checkSelectFolders()
}


let deleteSelectedFolders = () => {
    deleteConfirmationModalContainer.style.display = "flex";
}
let hideDeleteSelectedFolders = () => {
    deleteConfirmationModalContainer.style.display = "none";
}
let confirmDeleteSelectedFolders = async () => {
    console.log([...deleteItems]);

    await fetch(`http://127.0.0.1:8000/api/admin/folders/delete`,
        {
            method: 'DELETE',
            body: JSON.stringify({
                "folders": [...deleteItems]
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
    )
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                getAllFolders();
                getAllAssets();
                deleteConfirmationModalContainer.style.display = "none";
            }
        }).catch(errors => {
            console.log(errors);
        })

}

let addToDeleteList = (e, id, type) => {
    if (e.checked) {
        addToDeleteItems({ "type": type, "value": id });
    } else {
        removeFromDeleteItems({ "type": type, "value": id });
    }
    checkSelectFolders();
}
getAllFolders();

const createFolder = async (e) => {
    let error = false;
    const folderName = folderNameInput.value.trim();

    if (folderName.length < 1) {
        error = true;
        return false;
    }

    await fetch(`http://127.0.0.1:8000/api/admin/folders/create`,
        {
            method: 'POST',
            body: JSON.stringify({
                "name": folderName
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
    )
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if (data.success) {
                getAllFolders();
            }
        }).catch(errors => {
            console.log(errors);
        })

    if (!error) {
        hideFolderContainer();
        folderNameInput.value = "";
    }
}




//folders/create
const getAllAssets = async () => {
    await fetch(`http://127.0.0.1:8000/api/admin/files`,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
    )
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                // foldersCount.textContent = "(" + data.folders.length + ")";
                let template = "";
                assetssCountNumber = data.files.length;
                for (let i = 0; i < data.files.length; i++) {
                    let file = data.files[i];
                    let id = file.id;
                    template += ` <div class="asset-item bg-white">
                                    <section class="one d-center">
                                        <input type="checkbox"
                                        onChange="addToDeleteList(this,'${id}','file')"
                                        value="${id}"
                                         aria-label="Select all assets" 
                                         class="assets-check-box-items">
                                    </section>

                                    <section class="two d-center">
                                        <img src="./../storage/${file.path}" alt="" srcset="">
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
                document.getElementById("main-assets-container").innerHTML = template;
                document.getElementById("main-assets-count").innerText =
                    data.files.length < 10 ? "( 0" + data.files.length + " )" : "( " + data.files.length + " )";

                assetsCheckBoxItems = document.getElementsByClassName("assets-check-box-items");
                folderContainer.style.height = document.body.scrollHeight + "px";
            }

        }).catch(errors => {
            console.log(errors);
        })

    deleteItems = [];
    checkSelectFolders();
}

getAllAssets();

