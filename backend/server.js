const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get("/", (req, res)=>{
    const sql = "SELECT * FROM student";
    db.query(sql, (err,data)=> {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post("/create", (req, res)=>{
    console.log("in post methd")
    const sql = "INSERT INTO student (`Name`,`Email`) values (?)";
    const values = [
        req.body.name, 
        req.body.email
    ] 
    console.log(req.body.name);
    console.log(req.body.email);

    db.query(sql, [values], (err, data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put("/update/:id", (req, res)=>{
    console.log("in put method")
    const sql = "update student set `Name` = ?, `Email` = ? where ID = ?";
    const values = [
        req.body.name, 
        req.body.email
    ] 
    const id = req.params.id;
   

    db.query(sql, [...values, id], (err, data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete("/student/:id", (req, res)=>{
    console.log("in delete methd")
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;
      

    db.query(sql, [id], (err, data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})




app.listen(8081, ()=>{
    console.log("listening");
})