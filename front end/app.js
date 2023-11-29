const express = require("express");
// importing required 
const path=require('path')
const app = express();
app.use(express.static("public"))
//hosting static html file
app.get('/',(req,res)=>{res.sendFile(path.join(__dirname,'public/index.html'))})
app.listen(8585,()=>{
    console.log("Port listening in 8585....");
})
