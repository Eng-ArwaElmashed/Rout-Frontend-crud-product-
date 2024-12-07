var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescriptionInput = document.getElementById('productDescription');
var productImageInput = document.getElementById('productImage');
var secrchInput=document.getElementById('searchItem');
var addBtn=document.getElementById('AddBtn');
var updateBtn=document.getElementById('updateBtn');
var productContanier = [];
if(localStorage.getItem('products')!=null){
    productContanier=JSON.parse(localStorage.getItem('products'));
    displayProduct(productContanier);
}
function addProduct() {
    var product = {
        code: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
        Image: `../images/product/${productImageInput.files[0]?.name}`,
    }
    productContanier.push(product);
    localStorage.setItem('products',JSON.stringify(productContanier));
    clearForm();
    displayProduct(productContanier);
    console.log(productContanier);
}
function clearForm() {
    productNameInput.value = null;
    productPriceInput.value = null;
    productCategoryInput.value = null;
    productDescriptionInput.value = null;
    productImageInput.files[0].name=null;
    // Image=null;
}
function displayProduct(arr) {
    var container = ``;
    for (var i = 0; i < arr.length; i++) {
        container+=` <div class="col-md-3">
                    <div class="product">
                        <img src="${arr[i].Image}" alt="">
                        <h2>${arr[i].code}</h2>
                        <p>${arr[i].description}</p>
                        <h3 class="fs-5 "><span class="fw-bolder"> price :</span> ${arr[i].price}</h3>
                        <h3 class="fs-5 "><span class="fw-bolder"> category :</span>${arr[i].category}</h3>
                        <button onclick="deleteProduct(${i});" class="btn btn-outline-danger btn-sm w-100 my-2">Delete</button>
                        <button onclick="setFormForUpdate(${i});" class="btn btn-outline-warning btn-sm w-100 my-2">Update</button>
                        
                    </div>

                </div>`
                document.getElementById('rowData').innerHTML=container;

    }
}
function deleteProduct(deleteIndex){
        productContanier.splice(deleteIndex,1);
        displayProduct(productContanier);
        localStorage.setItem('products',JSON.stringify(productContanier));

}
function search(){
    var term = secrchInput.value;
    var termproduct=[];
    for(var i=0;i<productContanier.length;i++){
        if(productContanier[i].code.toLowerCase().includes(term.toLowerCase()) ==true){
            termproduct.push(productContanier[i]);
        }
    }
    displayProduct(termproduct)
    
}
var updateIndex;
function setFormForUpdate(i){
    updateIndex=i;
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    productNameInput.value=productContanier[i].code;
    productPriceInput.value=productContanier[i].price;
    productCategoryInput.value=productContanier[i].category;
    productDescriptionInput.value=productContanier[i].description;
    productImageInput.files=productContanier[i].Image;
}
function updateProducts(){
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    productContanier[updateIndex].code=productNameInput.value;
    productContanier[updateIndex].category=productCategoryInput.value;
    productContanier[updateIndex].description=productDescriptionInput.value;
    productContanier[updateIndex].price=productPriceInput.value;
    productContanier[updateIndex].Image=productImageInput.files;
    displayProduct(productContanier);
    localStorage.setItem('products',JSON.stringify(productContanier));
    clearForm();


}
function validateProduct(element){
    var regex={
        productName:/^[A-z][a-z]{2,8}$/,
        productPrice:/^([1-9][0-9][0-9][0-9]|1000)$/,
        productDescription:/.{10}/,
        productCategory:/{tv|mobile|screens|Electronics|Laptoops}/i,
    }
    if(regex[element.id].test(element.value)==true){
        element.nextElementSibling.classList.add("d-none")
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
    }else{
        element.nextElementSibling.classList.remove("d-none")
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
    }
}