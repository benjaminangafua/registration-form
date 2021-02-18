const http = require('http');
const fs = require("fs");
// let file = new StaticRange.server("./public")

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
    } else if (req.url === '/profile' && req.method === "GET") {
        fs.readFile(',/profile.html', 'utf8', (err, data) => {
            res.end(data);
        })
    } else if (req.url === '/registration' && req.method === "POST") {
        let body = '';
        req.on("data", (data) => {
            body += data;
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

server.listen(3100, () => {
    console.log('Listening on port 3100')
})