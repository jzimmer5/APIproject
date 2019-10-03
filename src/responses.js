const quizes = [
   'kingTut' = {
    question: "whos buried in King Tut's tomb",
    choices:["King Tut","George Washington","Barack Obama","Mona Lisa"],
    answer:"King Tut",
  },
];

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getQuiz = (request, response) => {
  let quiz = [];
  if(quizes.length > 1){
    const picker = Math.random(0, quizes.length);
    quiz = quizes[picker];
  } else{
    quiz = quizes['kingTut']
  }
  const responseJson = {
    quiz,
  };

  respondJSON(request, response, 200, responseJson);
};

const getUsersMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const notFound = (request, response) => {
  const responseJson = {
    message: 'the page is not real',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJson);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

const addQuiz = (request, response, body) => {
  const responseJson = {
    message: 'Question, answers, and choices are all required',
  };

  if (!body.qfield || !body.choicesArray || !body.afield) {
    responseJson.id = 'missingParams';
    return respondJSON(request, response, 400, responseJson);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJson.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJson);
  }

  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  getQuiz,
  getUsersMeta,
  notFound,
  notFoundMeta,
  addQuiz,
};
