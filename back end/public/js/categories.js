
const updateCategoryContainer = document.getElementById("update-category-container");
const createCategoryContainer = document.getElementById("create-category-container");

let showDeleteCategoryModel = (index) => {
    const deleteConfirmationModalContainers = document.getElementsByClassName("delete-confirmation-modal-container");
    deleteConfirmationModalContainers[index].style.display = "flex";
}

let hideDeleteCategoryModel = (index) => {
    const deleteConfirmationModalContainers = document.getElementsByClassName("delete-confirmation-modal-container");
    deleteConfirmationModalContainers[index].style.display = "none";
}


let showUpdateCategoryContainer = () => {
    updateCategoryContainer.style.display = "flex";
}
let hideUpdateCategoryContainer = () => {
    updateCategoryContainer.style.display = "none";
}

let showCreateCategoryContainer = () => {
    createCategoryContainer.style.display = "flex";
}
let hideCreateCategoryContainer = () => {
    createCategoryContainer.style.display = "none";
}
