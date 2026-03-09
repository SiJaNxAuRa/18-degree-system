const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

const db = new sqlite3.Database("sales.db");

db.run(`
CREATE TABLE IF NOT EXISTS sales (
id INTEGER PRIMARY KEY AUTOINCREMENT,
customer TEXT,
tableNumber TEXT,
items TEXT,
amount REAL,
date TEXT
)
`);

app.post("/add-sale", (req,res)=>{

const {customer,tableNumber,items,amount} = req.body;
const date = new Date().toLocaleString();

db.run(
`INSERT INTO sales (customer,tableNumber,items,amount,date)
VALUES (?,?,?,?,?)`,
[customer,tableNumber,items,amount,date],
(err)=>{

if(err){
res.status(500).send(err);
}else{
res.json({message:"Order saved"});
}

});

});

app.get("/sales",(req,res)=>{

db.all("SELECT * FROM sales ORDER BY id DESC",(err,rows)=>{

if(err){
res.status(500).send(err);
}else{
res.json(rows);
}

});

});

app.listen(PORT,()=>{
console.log("Server running on port "+PORT);
});