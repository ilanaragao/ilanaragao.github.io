const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./src/router/userRoute');
const loginRoute = require('./src/router/loginRoute');
const categoriesRoute = require('./src/router/categoriesRoute');
const postRoute = require('./src/router/postRoute');

const error = require('./src/middlewares/error');

const app = express();
app.use(bodyParser.json());
app.use(error);
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/categories', categoriesRoute);
app.use('/post', postRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
