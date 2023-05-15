// // console.log("my name is kunal gaurav");
// // console.log("i am learning backend through youtube videos");
// // console.log("nodemon is installed ");
// // console.log("hello world");

// // building a server

// // const http = require("http");

// import http from "http"

// // import {gfname, gfname2, gfname3} from "./features.js"

// // console.log(gfname);
// // console.log(gfname2);
// // console.log(gfname3);

// import { generatelovepercent } from "./features.js";
// console.log("Your Love percent is " + generatelovepercent())

// import fs from "fs";

// import path from 'path';

// console.log(path.server);

// const home = fs.readFileSync("./index.html");

// const server = http.createServer((req, res)=>{


//     console.log(req.method);

//     // res.end("<h1>kunal</h1>");

//     if(req.url==="/"){
//         //synchrous calling 
//     //     fs.readFile("./index.html", (err,home)=>{
//     //         res.end(home); 
//     //    });

//     //asynchrous calling
//     res.end(home);
//     }
//    else if(req.url==="/about"){
//    res.end(`<h1>your love percent is ${generatelovepercent()} % </h1>`);
//     }
//    else if(req.url ==="/contact"){
//         res.end("this is contact page");
//     }
//    else if(req.url ==="/home"){
//         res.end("this is home page");
//     }
//     else{
//         res.end("page not found");
//     }
// });


// server.listen(5000, ()=>{
//     console.log("server is running on port 5000");
// });



//LEARNING EXPRESS



// import express from "express";
// import path from "path";



// const server = express();

// server.get("/", (req,res)=>{ 
//     // res.send("<h1>hello</h1>");          used to send any message to body
//     // res.sendStatus(500);             used to send status code
//     // res.status(404).send("my status code");     used to set the status code of your marzi
//     // res.json({
//     //     success:true,
//     //     products:[]
//     // })                   used to send json files 

//     // console.log(path.resolve());

//     const pathlocation = path.resolve();
//     // console.log(path.join(pathlocation, "./index.html"));
//     res.sendFile(path.join(pathlocation, "./index.html"));

//     // res.sendFile("./index.html");
// }); 

// server.listen(5000, ()=>{
//     console.log("Express server is working ");
// });



//LEARNING EJS

import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";


const server = express();




//CONNECTION ESTABLISHED TO MONGODB

mongoose.connect("mongodb://localhost:27017",{
    dbName :"backend",
}).then(()=>console.log("Database connected"))
  .catch((e)=>console.log(e));


  const messageSchema = new mongoose.Schema({
    username: String,
    email:String,
  })

  const messge = mongoose.model("Message", messageSchema );






// const users = [];

//USE OF MIDDLEWARE

server.use(express.static(path.join(path.resolve(), "public"))); //this is a middleware so we can not use it directly so we'll use server.use
server.use(express.urlencoded({extended:true}));
// server.use(cookieParser());

//console.log(path.join(path.resolve(), "public")); 





//CREATING DIFFERENT API'S

server.set("view engine", "ejs");

server.get("/", (req, res)=>{
    //res.send("hii"); //   normally to print something in body
    // res.render("index" , {name : "kunal"});
    // res.sendFile("index");

    res.render("login");
});



server.get("/success", (req,res)=>{
    res.render("success");
})



server.post("/contact" , async(req,res)=>{
    
    //    console.log(req.body.name);

    const {username, email} = req.body;
    const usersData = {username:username ,email:email};

    await messge.create(usersData);

    //    res.render("success");

    res.redirect("/success");
});




server.get("/users", (req,res)=>{
    res.json({
        users,
    }); 
});



server.get("/add", async(req,res)=>{

  await  messge.create({name: "pranav", email: "pranav123@gmail.com"});
  res.send("data stored in mongodb");

    // messge.create({name: "kunal", email: "kunal123@gmail.com"}).then(()=>{
    //     res.send("nice");
    // });
});




server.post("/login", async(req,res)=>{

    res.cookie("token","iamin");
    res.redirect("/");
});


 
// server.get("/", (req,res)=>{

//     console.log(req.cookies.token);

//     res.render("login");

// });


server.get("/about", (req,res)=>{
    res.send("this is about page");
});




server.listen(5000, ()=>{
    console.log("Ejs server is running");
});