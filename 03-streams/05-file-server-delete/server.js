const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  

  switch (req.method) {
    case 'DELETE':
      deleteFile(pathname, res);
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});


function deleteFile(pathname, res) {
  
  if (pathname.indexOf('/') > -1){
    res.writeHead(400);
    res.end('Denied');
    return;
  }
  
  const filepath = path.join(__dirname, 'files', pathname);
  if (fs.existsSync(filepath)){
    fs.rmSync(filepath);
    res.writeHead(200);
    res.end();
  } else {
    res.writeHead(404);
    res.end();
  }
}

module.exports = server;
