const express = require("express");
const dotenv = require("dotenv").config();
const CORS = require("cors");
const connectDb = require("./db/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const PROT = process.env.PROT || 8080;
const app = express();

// middleware
connectDb();
app.use(CORS());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/user", require("./routes/userRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use(errorHandler);

app.listen(PROT, () => {
  console.log("successfully connected:" + PROT);
});

// const express = require('express');

// const router = express.Router();

// const { genCode, genUserName, genPassword, genAPIKey, genAPISecret ,fetchConstant ,base64_encode } = require('../../utils');

// const { prefixes } = require('../../constants');

// const { create, read, readMany, update, remove } = require('../../services/crud_service');

// const { status } = require('../../constants');

// const { dealer , client , authorized_person , trade_mail , draft_group , draft_mail} = require('../../models');

// const bcrypt = require('bcrypt');

// const fs = require('fs');

// const ejs = require("ejs");

// const sendMail = require('../../services/nodemailer.service');

// const path = require('path');

// const { sign } = require('jsonwebtoken');

// let secret = fetchConstant('secret');

// const multer = require('multer');

// const { find, updateMany } = require('../../models/qms');

// // const upload = multer({

// //     dest: '/root/central_server/logo'

// //   });

// const upload = multer({ storage: multer.memoryStorage() });

// module.exports = () => {

//     router.post('/signup', upload.single('logo') , async (req, res, next) => {

//         try {

//             let {name, email ,provider ,org_address , total_clients , org_website , billing_plan , billing_address , contact_person , contact_number, contact_email} = req.body ;

//             if(!name || !email  || !provider || !org_address || !total_clients || !org_website || !billing_plan || !billing_address || !contact_person || !contact_number || !contact_email){

//                 throw { status: 400, message: 'Missing Fields for signup' }

//             }

//             if (!req.file) {

//                 throw { status: 400, message: 'No file uploaded' };

//             }

//             let organization = await dealer.findOne({email , role:"ADMIN" }) ;

//             if(organization){

//                 throw { status: 409, message: 'Organization Already Exist' }

//             }

//             let code = genCode(prefixes.ORGANIZATION) ;

//             let password = genPassword();

//             let saltRounds = 10;

//             // console.log(req.file.buffer.toString('base64'))

//             // res.send({res: req.file.buffer.toString('base64')})

//             bcrypt.hash(password, saltRounds, async(err, hash)=>{

//                 let org_data = await create( dealer , { ...req.body , code ,  password:hash , role:"ADMIN" ,image : req.file.buffer.toString('base64')})

//                 let oauth_url = "gmail_oauth";

//                 // if (client.personal_details.email.includes('rediff') || client.personal_details.email.includes('yahoo')) {

//                 //     throw { status: 400, message: "Not supported for rediff and yahoo" }

//                 // }

//                 if (provider == 'Google' || email.includes('@gmail.com')) {

//                     oauth_url = 'gmail_oauth';

//                 } else if(provider == 'Microsoft' || email.includes('@hotmail.com') || email.includes('@outlook.com')) {

//                     oauth_url = 'office365_oauth';

//                 }

//                 let token = sign({ data: {  securesend : true , role: org_data.role , id : org_data._id , email : org_data.email , retry_url:`https://midasfintechsolutions.com/integrate_account/${oauth_url}/${org_data._id}` } }, secret);

//                 let integrate_account = `https://midasfintechsolutions.com/integrate_account/${oauth_url}/${org_data._id}?securesendtoken=${token}`

//                 let email_token = sign({ data: { email : org_data.email , name: org_data.name , link:integrate_account } }, secret);

//                 let url = `https://mfsquantanalytics.com/secure_send_app/integration?token=${email_token}`

//                 let template = await ejs.renderFile(path.join(__dirname, '..', '..' , "/views/organizationIntegration.ejs"),

//                 {

//                     name,

//                     email,

//                     password,

//                     integrate_account : url,

//                     provider,

//                     image: base64_encode(path.join(__dirname,'..','..', 'google.png'))

//                 });

//                 await sendMail({

//                     to: [email],

//                     subject: 'Welcome to Midas Securesend!', /// midas securesend

//                     html : template,

//                     attachments: provider == 'Google' ? [{

//                         filename: 'google.png',

//                         path: path.join(__dirname,'..','..', 'google.png'),

//                         cid: "google_signin" //same cid value as in the html img src

//                     }] : []

//                 });

//                 res.send({message:'successfully created new user' , org_data});

//             });

//         } catch (err) {

//             console.log(err)

//             next(err);

//         }

//     });

// // image : req.file.buffer.toString('base64')
