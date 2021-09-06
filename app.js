import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
var path = require('path');
import hbs from 'nodemailer-express-handlebars';
import expresshbs from "express-handlebars";
const app = express();
dotenv.config()


app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", expresshbs({ defaultLayout: false }));
app.set("view engine", "handlebars");



const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is runing on port : ${port}`);
})

app.get('/',(req,res)=>{
 
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vuongvanchung30092001@gmail.com',
      pass: '01678843240'
    }
  });
  transporter.use(
    "compile",
    hbs({
        viewEngine: "nodemailer-express-handlebars",
        viewPath: "views/",
    })
);

  var mailOptions = {
    from: 'haideryaqoobengr@gmail.com',
    to: 'chungvvph12364@fpt.edu.vn  ',
    subject: 'Sending Email using Node.js',
    template:'email',
    context: {
      name: 'Name'
  }
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})