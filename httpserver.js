<<<<<<< HEAD
const http = require('http'); //Require the http module to be able to access its library
const fs = require("fs"); // Require file system module to access the file library in nodejs

// create the server for running your application
const server = http.createServer((req, res) => {

    res.statusCode = 200; // The ok status of the document if no error
    res.setHeader('Content-Type', 'text/html'); //The type of content file
    // The home route 
    if (req.url === '/' && req.method === "GET") {
        fs.readFile('./registration.html', 'utf8', (err, data) => { // Reading the registration file path
                res.end(data); // to be display the file the last parameter of the call back function
            })
            // The login route

    } else if (req.url === '/login' && req.method === "GET") {
        let login_body = '';
        req.on("data", (data) => {
            login_body += data;
        })
        fs.readFile('./login.html', 'utf8', (err, data) => {
            res.end(data)
        })

        // Profile route
    } else if (req.url === '/profile' && req.method === "GET") {
        fs.readFile('./profile.html', 'utf8', (err, data) => {
                res.end(data);
            })
            // registration route
=======
const http = require('http'); //importing http module
const fs = require("fs"); //importing file system module
let userdata; //global variable for hosting username with all the other data for registration.json file

const server = http.createServer((req, res) => { //creating server
    res.statusCode = 200; //successful loading of page
    res.setHeader('Content-Type', 'text/html'); //file type
    if (req.url === '/' && req.method === "GET") { //home route
        fs.readFile('./registration.html', 'utf8', (err, data) => { //reading or getting registration file data
            res.end(data);
        })
    } else if (req.url === '/login' && req.method === "GET") { //login route
        fs.readFile('./login.html', 'utf8', (err, data) => { //reading or getting login file data
            res.end(data)
        })
    } else if (req.url === '/login' && req.method === "POST") { //login route for posting input from front-end
        let login_file = '' // variable for hosting login  data from front-end to be use for querying to the json file
        req.on("data", data => { //login data from front-end
            login_file += data;
            console.log(login_file)
        })
        req.on("end", () => { //sendin g login data to json for querying
            fs.readFile("./registration.json", 'utf8', (err, data) => { //reding json file 
                let jsonData = JSON.parse(data); // passsing json data to regular javascript object
                let login_data = JSON.parse(login_file); // passsing login data to regular javascript object

                let login_username = login_data.username; //matching login username to json username
                let login_password = login_data.password; //matching login password to json password
                userdata = jsonData[login_username]; // storing username from json(passed to login) to the global variable declared
                if (userdata) {
                    if (userdata.password === login_password) { // informing client for successful login
                        res.end(JSON.stringify({ status: 0 }))
                        console.log("Info correct")
                    }
                }

            })
        })
    } else if (req.url === '/profileData' && req.method === "GET") { //profile route
        console.log(userdata)
        res.end(JSON.stringify({ status: 1, data: userdata })) // 


    } else if (req.url === '/profile' && req.method === "GET") {

        fs.readFile('./profile.html', 'utf8', (err, data) => {
                res.end(data);
            })
            //Registation data from front-end
>>>>>>> 7061b53a9dfe3c2234a532733f8f81de506958b2
    } else if (req.url === '/registration' && req.method === "POST") {
        // Raw data from the form
        let body = '';
        req.on("data", (data) => {
            body += data;
            console.log("What is this body?", body)
        });
<<<<<<< HEAD
        // Sending the html form value to the json
        req.on("end", () => {
            fs.readFile('./registration.json', 'utf8', (err, data) => {
                var jsonBody = JSON.parse(data) // Form coming in vertical (json) form
                let front_end_data = JSON.parse(body)
                jsonBody[front_end_data.username] = front_end_data //Specifying the user as the owner of the form submitted

                let jsonBody_string = JSON.stringify(jsonBody) // Passing json data to string
=======
        // passing front-end data to json file
        req.on("end", () => {
            fs.readFile('./registration.json', 'utf8', (err, data) => {
                var jsonBody = JSON.parse(data); //passing json data to real javascript object
                //
                let front_end_data = JSON.parse(body); //passing front-end data to real javascript object
                //
                jsonBody[front_end_data.username] = front_end_data; //specifying key for getting a registered user as "user"

                let jsonBody_string = JSON.stringify(jsonBody) //The json value hosting the user info passing to string
>>>>>>> 7061b53a9dfe3c2234a532733f8f81de506958b2
                console.log(jsonBody_string)
                fs.writeFile('./registration.json', jsonBody_string, err => { //storing data in json file 
                    if (err) {
                        console.error(err)
                        return
                    }
                    //file written successfully
                })
                fs.writeFile('./profile.html', front_end_data, err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            })

        })

    }
})
server.listen(3500, () => {
    console.log('Listening on port 3500')
})