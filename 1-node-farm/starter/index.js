const fs = require('fs');
const http = require('http'); //
const url = require('url');

// Blocking, synctonious way
// const text = fs.readFileSync('./txt/input.txt','utf-8');
// const textOut = `This is what we know about avocado ${text}. \n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut) ;

// // async way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//       console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile('./txt/final.txt', `${data2} \n ${data3}`, 'utf-8', err => {
//         console.log("Your file has been written 🤣")
//       })
//     })
//   })
// })
// console.log("Will read file");

/// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req,res) => {
  const pathName = req.url;

  if(pathName === '/' || pathName === '/overview') {
    res.end("This is the overview!");
  } else if (pathName === '/product') {
    res.end("This is the product!");
  } else if( pathName === '/api') {
    res.end(data);
  }
  else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-header': 'Hello world!'
    });
    res.end("Page Not Found");
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
})