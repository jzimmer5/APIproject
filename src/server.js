const http = require('http');
const url = require('url');
const query = require('querystring');
const responses = require('./responses.js');
const htmlResponses = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// urlStruct of all the urls in the api
const urlStruct = {
  GET: {
    '/': htmlResponses.getIndex,
    '/style.css': htmlResponses.getCSS,
    '/getQuiz': htmlResponses.getQuiz,
    '/getQuizData': responses.getQuizData,
    '/getMake': htmlResponses.getMake,
    notfound: responses.notFound,
  },
  HEAD: {
    '/getUsers': responses.getUsersMeta,
    '/notReal': responses.getNotReal,
    notfound: responses.notFoundMeta,
  },
};

// handles when the server takes in a post request
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addQuiz') {
    const res = response;

    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      responses.addQuiz(request, res, bodyParams);
    });
  }
};

// checks to see what request the user wants
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = parsedUrl.query;

  if (request.method === 'POST' && parsedUrl.pathname === '/addQuiz') {
    handlePost(request, response, parsedUrl);
  } else if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.GET.notfound(request, response);
  }
};

http.createServer(onRequest).listen(port);
