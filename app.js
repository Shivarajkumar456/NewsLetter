const express = require("express");
// const axios = require('axios');
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",(req,res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    // console.log(firstName, lastName, email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/c9d8ec38cc";
    
    const Options = {
        method: "POST",
        auth: "shivaraj:a0889f3a8a25c17490e0d876035d8cb9-us9"
    }

    const request = https.request(url, Options, (response) => {

        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(3000,() => {
    console.log("Server is running on port 3000");
});




// a0889f3a8a25c17490e0d876035d8cb9-us9
// c9d8ec38cc