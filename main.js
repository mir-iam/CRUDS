let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

function getTotal(){
	if(price.value !=''){
		let result = (+price.value + +ads.value + +taxes.value)- +discount.value;
		total.textContent = result;
		if(total.value != ''){
			total.style.backgroundColor = '#040';
		}
		else{
			total.textContent = '';
			total.style.backgroundColor = 'rgb(121, 38, 8)';
		}
		
	}
}
let dataPro;
if(localStorage.product != null){
	dataPro = JSON.parse(localStorage.product);
}
else{
	dataPro = [];
}


submit.onclick = function(){
	let newPro = {
		title : title.value.toLowerCase(),
		price : price.value,
		taxes : taxes.value,
		ads : ads.value,
		discount: discount.value,
		total : total.textContent,
		count : count.value,
		category : category.value.toLowerCase(),
	}

	if(title.value != '' 
	&& price.value != ''
	 && category.value != '' 
	 && count.value < 100){
		if(mood === 'create'){
		if(newPro.count > 1){
		for(let i = 0; i<newPro.count; i++){
			dataPro.push(newPro);
		}
		}else{
			dataPro.push(newPro);
		}
	}else{
		dataPro[tmp] = newPro;
		mood = 'create';
		submit.textContent = 'create';
		count.style.display = 'block';
	}
	clearData();
	}
	
	
	localStorage.setItem('product' ,JSON.stringify(dataPro));
	showData();
}

function clearData(){
	title.value = '';
	price.value = ''; 
	taxes.value = ''; 
	ads.value = ''; 
	discount.value = '';
	total.textContent = '';
	count.value = '';
	clearData.value = '';
	category.value = '';
}

function showData(){
	getTotal();
	let table = '';
	for(let i=0;i<dataPro.length; i++){
		table += `
		<tr>
			<td>${i+1}</td>
			<td>${dataPro[i].title}</td>
			<td>${dataPro[i].price}</td>
			<td>${dataPro[i].taxes}</td>
			<td>${dataPro[i].ads}</td>
			<td>${dataPro[i].discount}</td>
			<td>${dataPro[i].total}</td>
			<td>${dataPro[i].category}</td>
			<td><button onclick = "updateData(${i})" id="update">update</button></td>
			<td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
		</tr>`
	}
	document.getElementById('tbody').innerHTML = table;
	let btnDeleteAll = document.getElementById('deleteAll');
		if(dataPro.length >0){
			btnDeleteAll.innerHTML = `
			<button onclick = "deleteAll()">Delete All</button>`
		}
		else{
			btnDeleteAll.innerHTML = '';
		}
}
	
	showData();

function deleteData(i){
	dataPro.splice(i, 1);
	localStorage.product = JSON.stringify(dataPro);
	showData();
}

function deleteAll(){
	localStorage.clear();
	dataPro.splice(0);
	showData();
}
function updateData(i){
	title.value = dataPro[i].title;
	price.value = dataPro[i].price;
	taxes.value = dataPro[i].taxes;
	ads.value = dataPro[i].ads;
	discount.value = dataPro[i].discount;
	category.value = dataPro[i].category;
	getTotal();
	count.style.display = 'none';
	submit.textContent = 'Update';
	mood = 'update';
	tmp = i;
	window.scroll({
		top: 0,
		behavior:"smooth"
	})
}

let searchMood = 'title';

function getSearchMood(id){
	let search = document.getElementById('search');
	if(id == 'searchTitle'){
		searchMood = 'title';
	}
	else{
		searchMood = 'category';
	}
	search.placeholder = `Search By ${searchMood}`;
	search.focus();
	search.value = '';
	showData();
}

function searchData(value){
	let table = '';
	
	for(let i=0; i<dataPro.length; i++){
		if(searchMood == 'title'){
			if(dataPro[i].title.includes(value.toLowerCase())){
				table += `
				<tr>
					<td>${i}</td>
					<td>${dataPro[i].title}</td>
					<td>${dataPro[i].price}</td>
					<td>${dataPro[i].taxes}</td>
					<td>${dataPro[i].ads}</td>
					<td>${dataPro[i].discount}</td>
					<td>${dataPro[i].total}</td>
					<td>${dataPro[i].count}</td>
					<td>${dataPro[i].category}</td>
					<td><button onclick = "updateData(${i})" id="update">update</button></td>
					<td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
				</tr>`
			}

		}else{
			if(dataPro[i].category.includes(value.toLowerCase())){
				table += `
				<tr>
					<td>${i}</td>
					<td>${dataPro[i].title}</td>
					<td>${dataPro[i].price}</td>
					<td>${dataPro[i].taxes}</td>
					<td>${dataPro[i].ads}</td>
					<td>${dataPro[i].discount}</td>
					<td>${dataPro[i].total}</td>
					<td>${dataPro[i].count}</td>
					<td>${dataPro[i].category}</td>
					<td><button onclick = "updateData(${i})" id="update">update</button></td>
					<td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
				</tr>`
		}
		}
	}
	document.getElementById('tbody').innerHTML = table;
}

