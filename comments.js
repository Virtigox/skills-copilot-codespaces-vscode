// Create web server
// 1. Load modules
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// 2. Create server
http.createServer((req, res) => {
  // Get the URL of the request
  const urlObj = url.parse(req.url);
  // Get the path name of the URL
  let urlPath = urlObj.pathname;
  // Get the query string
  let query = urlObj.query;

  // If the URL path is /comments, then read the comments.json file and return its content
  if (urlPath === '/comments') {
    // Read comments.json file
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
      if (err) {
        // Send 500 status code if error
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      // Send the content of comments.json file
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  } else {
    // Send 404 status code for any other URL path
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(3000);

// 3. Output message
console.log('Server running at http://localhost:3000');