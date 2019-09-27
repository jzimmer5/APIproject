const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  const responseJson = {
    users,
  };

  respondJSON(request, response, 200, responseJson);
};

const getUsersMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const getNotReal = (request, response) => {
  const responseJson = {
    message: 'not real',
    id: '404',
  };

  respondJSON(request, response, 404, responseJson);
};

const getNotRealMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

const notFound = (request, response) => {
  const responseJson = {
    message: 'the page is not real',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJson);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

const addUser = (request, response, body) => {
  const responseJson = {
    message: 'Name and age are both required',
  };

  if (!body.name || !body.age) {
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
  getUsers,
  getUsersMeta,
  getNotReal,
  getNotRealMeta,
  notFound,
  notFoundMeta,
  addUser,
};
