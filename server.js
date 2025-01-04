const http = require('http');
const chalk = require('chalk');

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  if (req.method === 'POST' && req.url === '/login') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      const parseData = JSON.parse(data);
      const { email, password } = parseData;
      console.log(email, password);

      if (email === 'itsmeriteshpatidar@gmail.com' && password === 'ritesh') {
        res.end('login successfull');
      } else {
        res.end('User doestnot exist please register');
      }
    });
  } else {
    res.end('url and method are not valid');
  }
});

server.listen(8000, () => {
  console.log(chalk.bgBlue('Server is running on localhost:8000'));
});
