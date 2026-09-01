let  title = document.getElementById("title");
let  price = document.getElementById("price");
let  taxes = document.getElementById("taxes");
let  ads = document.getElementById("ads");
let  discount = document.getElementById("discount");
let  total = document.getElementById("total");
let  count = document.getElementById("count");
let  category = document.getElementById("category1");
let  submit = document.getElementById("submit");
console.log(title, price, taxes, ads, discount, total, count, category, submit);  


let mood = "create";
let tmp ;

//get total
function gettotal(){
        if(price.value != ""){
            let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
            total.innerHTML = result;
            total.style.background = "#040";
        }else{
            total.innerHTML = "";
            total.style.background = "#a00d02";
        }
}

//create product
let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product);
}else{
   datapro = [];
}

submit.onclick = function(){
        let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != '' && price.value != ''
        && category.value != '' && newpro.count < 100 ){
    if(mood === "create"){ 
    if(newpro.count > 1){
    for(let i = 0; i<count.value; i++){
    datapro.push(newpro);
    } }else
        {
        datapro.push(newpro);
    }
}else{
    datapro[tmp] = newpro ;
    submit.innerHTML = "Create";
    count.style.display = "block";

}
cleardata()
}
    //save localstorage
    localStorage.setItem("product", JSON.stringify(datapro));
   // console.log(datapro);

showdata()
}

//clear inputs
function cleardata(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    total.innerHTML = "";
    category.value = "";
}

//read input data in the table
function showdata(){
    gettotal(); // as after create or update return to red color
     let table = '';
   for(let i = 0; i< datapro.length; i++){ 
     if (datapro[i] == null) continue;
        table += ` 
         
        <tr>
                <td>${i+1}</td>
				<td>${datapro[i].title}</td>
				<td>${datapro[i].price}</td>
				<td>${datapro[i].taxes}</td>
				<td>${datapro[i].ads}</td>
				<td>${datapro[i].discount}</td>
				<td>${datapro[i].total}</td>
			<!-- <td>${datapro[i].count}</td> -->
				<td>${datapro[i].category}</td>
				<td><button onclick="update(${i})" class="update">Update</button></td>
				<td><button onclick="deletedata(${i})" class="delete">Delete</button></td>
			</tr>
    `       

} document.getElementById('tableBody').innerHTML = table;
let btndeleteAll = document.getElementById("deleteAll");
if(datapro.length > 0){
    btndeleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${datapro.length})</button>`
} else {
    btndeleteAll.innerHTML = "";}
}

//delete a product
function deletedata(i){
    datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);
showdata()

}
//delete all products
function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showdata();
}

console.log(datapro);

//update data
function update(i){
   title.value = datapro[i].title ;
   price.value = datapro[i].price ;
   taxes.value = datapro[i].taxes ;
   ads.value = datapro[i].ads ;
   discount.value = datapro[i].discount ;
   category.value = datapro[i].category ;
   count.style.display = "none";
   gettotal();
   submit.innerHTML = "Update";
   mood = "update";
   tmp = i ;
   scroll({
    top : 0 ,
    behavior : "smooth"
   })
}  

//search
let searchmood = "title";
function clicksearch(id){
    let search = document.getElementById('search');
      if(id == 'searchTitle'){
        searchmood = 'title'; 
}
else{
    searchmood = 'category';
}
    search.placeholder = "Search By " + searchmood;

search.focus();
search.value = '';
showdata()
}

function searchdata(value){
    let table = '';
    for(let i = 0; i<datapro.length;i++){
    if(searchmood == "title"){

    if(datapro[i].title.includes(value.toLowerCase())){ 
       table += ` 
         
        <tr>
                <td>${i}</td>
				<td>${datapro[i].title}</td>
				<td>${datapro[i].price}</td>
				<td>${datapro[i].taxes}</td>
				<td>${datapro[i].ads}</td>
				<td>${datapro[i].discount}</td>
				<td>${datapro[i].total}</td>
			 <!-- <td>${datapro[i].count}</td> --> 
				<td>${datapro[i].category}</td>
				<td><button onclick="update(${i})" class="update">Update</button></td>
				<td><button onclick="deletedata(${i})" class="delete">Delete</button></td>
			</tr>
    `       
}

}  else{
     
    if(datapro[i].category.includes(value.toLowerCase())){ 
       table += ` 
         
        <tr>
                <td>${i}</td>
				<td>${datapro[i].title}</td>
				<td>${datapro[i].price}</td>
				<td>${datapro[i].taxes}</td>
				<td>${datapro[i].ads}</td>
				<td>${datapro[i].discount}</td>
				<td>${datapro[i].total}</td>
			<!-- <td>${datapro[i].count}</td> --> 
				<td>${datapro[i].category}</td>
				<td><button onclick="update(${i})" class="update">Update</button></td>
				<td><button onclick="deletedata(${i})" class="delete">Delete</button></td>
			</tr>
    `       
}

}
}
document.getElementById('tableBody').innerHTML = table;

}


showdata();

