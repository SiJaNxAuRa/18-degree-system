function addSale(){

const customer = document.getElementById("customer").value;
const tableNumber = document.getElementById("tableNumber").value;
const items = document.getElementById("items").value;
const amount = document.getElementById("amount").value;

fetch("/add-sale",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
customer:customer,
tableNumber:tableNumber,
items:items,
amount:amount
})
})
.then(res=>res.json())
.then(data=>{
alert("Order saved successfully");
window.location.href="index.html";
});

}


/* LOAD HISTORY TABLE */

function loadSales(){

fetch("/sales")
.then(res=>res.json())
.then(data=>{

const table = document.getElementById("salesTable");
table.innerHTML="";

data.forEach(function(sale){

const row = document.createElement("tr");

row.innerHTML = `
<td>${sale.id}</td>
<td>${sale.customer}</td>
<td>${sale.tableNumber}</td>
<td>${sale.items}</td>
<td>${sale.amount}</td>
<td>${sale.date}</td>
`;

table.appendChild(row);

});

});

}


/* DASHBOARD STATS */

function loadDashboard(){

fetch("/sales")
.then(res=>res.json())
.then(data=>{

let totalOrders = data.length;
let revenue = 0;

data.forEach(order=>{
revenue += Number(order.amount);
});

const orderElement = document.getElementById("totalOrders");
const revenueElement = document.getElementById("totalRevenue");

if(orderElement){
orderElement.innerText = totalOrders;
}

if(revenueElement){
revenueElement.innerText = "₹ " + revenue;
}

});

}