const http = require('http');
const fs = require("fs");
// let file = new StaticRange.server("./public")
let userdata;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    if (req.url === '/' && req.method === "GET") {
        fs.readFile('./registration.html', 'utf8', (err, data) => {
            res.end(data);
        })
    } else if (req.url === '/login.html' && req.method === "GET") {
        fs.readFile('./login.html', 'utf8', (err, data) => {
            res.end(data)
        })
    } else if (req.url === '/login' && req.method === "POST") {
        let login_file = ''
        req.on("data", data => {
            login_file += data;
            console.log(login_file)
        })
        req.on("end", () => {
            fs.readFile("./registration.json", 'utf8', (err, data) => {
                let jsonData = JSON.parse(data);
                let login_data = JSON.parse(login_file);

                let login_username = login_data.username;
                let login_password = login_data.password;
                userdata = jsonData[login_username];
                if (userdata) {
                    if (userdata.password === login_password) {
                        res.end(JSON.stringify({ status: 0 }))
                        console.log("Info correct")
                    }
                }

            })
        })
    } else if (req.url === '/profileData' && req.method === "GET") {
        console.log(userdata)
        res.end(JSON.stringify({ status: 1, data: userdata }))


    } else if (req.url === '/profile' && req.method === "GET") {
<<<<<<< HEAD

        fs.readFile('./profile.html', 'utf8', (err, data) => {
=======
        fs.readFile(',/profile.html', 'utf8', (err, data) => {
>>>>>>> c5e3280e5af6fa79d462d15a0f5bc70aefa381c0
            res.end(data);
        })
    } else if (req.url === '/registration' && req.method === "POST") {
        let body = '';
        req.on("data", (data) => {
            body += data;
            console.log("What is this body?", body)
        });
        req.on("end", () => {
            fs.readFile('./registration.json', 'utf8', (err, data) => {
                var jsonBody = JSON.parse(data)
                let front_end_data = JSON.parse(body)
                jsonBody[front_end_data.username] = front_end_data

                let jsonBody_string = JSON.stringify(jsonBody)
                console.log(jsonBody_string)
                fs.writeFile('./registration.json', jsonBody_string, err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    //file written successfully
                })
            })

        })

    }
    var str1 = fs.readFileSync('./profile.html', 'utf-8');
    var str2 = fs.readFileSync('./registration.json', 'utf-8');

    str1 === str2
        // returns true if same content
})

server.listen(3500, () => {
    console.log('Listening on port 3500')
})