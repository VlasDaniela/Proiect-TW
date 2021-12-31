const http = require('http');
const fs = require('fs');
const _=require('lodash');

const server = http.createServer((req, res) => {
  //lodash
    const num=_.random(0.20);

  // set header content type
  res.setHeader('Content-Type', 'text/html');

  // routing
  let path = './views/';
  switch(req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/account':
      path += 'account.html';
      res.statusCode = 200;
      break;
    case '/customers':
      path += 'customers.html';
      res.statusCode = 200;
      res.end();
      break;
    case '/produse':
      path += 'produse.html';
      res.statusCode = 200;
      res.end();
      break;
    case '/Stock':
        path += 'Stock.html';
        res.statusCode = 200;
        res.end();
        break;
    default:
      path += '404.html';
      res.statusCode = 404;
  }

  // send html
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    //res.write(data);
    res.end(data);
  });


});

// localhost is the default value for 2nd argument
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});