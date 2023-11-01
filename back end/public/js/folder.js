
const folderCssetsContainer = document.getElementById("folder-assets-container");
let folderId;
window.onload = () => {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let folder = url.searchParams.get("folder");
    let folderName = url.searchParams.get("folderName");
    folderId = folder;
    if (!folder) {
        folderContainer.style.display = "none";
        return false;
    }
    pathContainer.textContent = "Media Library / " + folderName
    folderContainer.style.display = "block";

    getAllFiles()
}



//folders/create
const getAllFiles = async () => {
    await fetch(`http://127.0.0.1:8000/api/admin/folders/${folderId}/files`,
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
                for (let i = 0; i < data.files.length; i++) {
                    let file = data.files[i];
                    template += ` <div class="asset-item bg-white">
                    <section class="one d-center">
                        <input type="checkbox"
                        onChange="addToDeleteList(this,'${file.id}','file')"
                        value="${file.id}"
                         aria-label="Select all assets" 
                         class="assets-check-box-items">
                    </section>

                    <section class="two d-center">
                        <img src="./../storage/${file.path}" alt="" srcset="">
                    </section>
                    <section class="tree">
                        <div>
                            <p>${file.origin_name != null ? file.origin_name : ""}</p>
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
                folderCssetsContainer.innerHTML = template;
                document.getElementById("assets-count").innerText =
                    data.files.length < 10 ? "( 0" + data.files.length + " )" : "( " + data.files.length + " )";
            }

        }).catch(errors => {
            console.log(errors);
        })
}
