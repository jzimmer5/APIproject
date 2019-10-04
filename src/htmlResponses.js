const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const make = fs.readFileSync(`${__dirname}/../client/quizCreation.html`);
const quiz = fs.readFileSync(`${__dirname}/../client/kingTut/storedQuiz.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getMake = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(make);
  response.end();
};

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
