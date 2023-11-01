
// ======================


const folderPath = document.getElementById("folder-path");
const uploadAssetsContainer = document.getElementById("upload-assets-container");
let imagesInput = document.getElementById("images-input");
let uploadedImagesContainer = document.getElementById("uploaded-images-container");
let empty = document.getElementById("empty");

let url_string = window.location.href;
let url = new URL(url_string);
let folder = url.searchParams.get("folder");
if (folder) {
    folderPath.value = folder;
}

let hideAssetsContainer = () => {
    uploadAssetsContainer.style.display = "none";
    imagesInput.value = '';
    uploadedImagesContainer.innerHTML = '';
    empty.style.display = 'flex';
}
let showAssetsContainer = () => {
    uploadAssetsContainer.style.display = "flex"
}

imagesInput.addEventListener("change", (e) => {
    console.log(e.target.files);
    let imagesTemplate = '';
    empty.style.display = 'none';
    for (let i = 0; i < e.target.files.length; i++) {
        const image = e.target.files[i];
        const name = e.target.files[i].name;
        let src = URL.createObjectURL(image);
        imagesTemplate += `<li class="c">
                                <img class="mx-auto w-32"
                                    src="${src}"
                                    alt="no data" />
                                <span class="txt-center text-small text-gray-500">${name}</span>
                        </li>`
    }
    // e.target.files[.forEach(image => {
    //     let src = 
    //     imagesTemplate += `<img src=${URL.createObjectURL( image[0] ) } />`;
    // });

    uploadedImagesContainer.innerHTML = imagesTemplate;
});