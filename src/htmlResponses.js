const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const make = fs.readFileSync(`${__dirname}/../client/quizCreation.html`);
const quiz = fs.readFileSync(`${__dirname}/../client/storedQuiz.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// returns the client html page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// returns the css page
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// returns the quiz creation html page
const getMake = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(make);
  response.end();
};

// returns a random quiz html page
const getQuiz = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(quiz);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getMake,
  getQuiz,
};
