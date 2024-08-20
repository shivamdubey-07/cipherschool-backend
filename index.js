const express=require("express")
const mongoose= require("mongoose")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors=require("cors")
const authRoute=require("./routes/authRoute")
const testRoute=require("./routes/testRoute")
const subRoute=require("./routes/submissionRoute")
const cronJob = require('./cronJob');
const app=express()

app.use(cookieParser());




const corsOptions = {
    origin:"http://localhost:5173",
    credentials: true,
  };
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./db/db")

app.use("/api",authRoute)
app.use("/api",testRoute)
app.use("/api",subRoute)





app.get("/",(req,res)=>{
  res.send("hello sir welcome")
})


  

app.listen(5000,()=>{
  console.log("running")
})