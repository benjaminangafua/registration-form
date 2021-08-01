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
    } else if (req.url === '/registration' && req.method === "POST") {
        // Raw data from the form
        let body = '';
        req.on("data", (data) => {
            body += data;
        });
        // Sending the html form value to the json
        req.on("end", () => {
            fs.readFile('./registration.json', 'utf8', (err, data) => {
                var jsonBody = JSON.parse(data) // Form coming in vertical (json) form
                let front_end_data = JSON.parse(body)
                jsonBody[front_end_data.username] = front_end_data //Specifying the user as the owner of the form submitted

                let jsonBody_string = JSON.stringify(jsonBody) // Passing json data to string
                console.log(jsonBody_string)
                fs.writeFile('./registration.json', jsonBody_string, err => {
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
    var str1 = fs.readFileSync('./profile.html', 'utf-8');
    var str2 = fs.readFileSync('./registration.json', 'utf-8');

    str1 === str2
        // returns true if same content
})

server.listen(3100, () => {
    console.log('Listening on port 3100')
})