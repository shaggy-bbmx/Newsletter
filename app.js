const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");
const mailchimp=require("@mailchimp/mailchimp_marketing");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));    

app.listen(process.env.PORT || 3000,function(){
    console.log("server 3000 is ON");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+ "/signup.html");
});


mailchimp.setConfig({
    apiKey:"7d70cb4c2e29c07640d6ab0aa39f3e53-us21/account/",
    server: "us21"
});

app.post("/",function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    console.log(fname);
    
    const listId="3171bc364e";

    const subscribingUser={
        fname:fname,
        lname:lname,
        email:email
    };
    
    const run=async ()=>{
        const response = await mailchimp.lists.addListMember(listId, {
         email_address: subscribingUser.email,
         status: "subscribed",
         merge_fields: {
         FNAME: subscribingUser.fname,
         LNAME: subscribingUser.lname
        }
        });
        console.log(response);
        
        
        res.sendFile(__dirname + "/success.html");

    };
    
    run();
    run().catch(e => res.sendFile(__dirname + "/failure.html"));
    
});





// API KEY	
// 7d70cb4c2e29c07640d6ab0aa39f3e53-us21
 
// Audience ID
// 3171bc364e