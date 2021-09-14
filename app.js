// PLUGINS
const express = require('express');
const db = require('./models/');

// ROUTES
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

const app = express();

// Replace bodyParser : It's include in express now
//  parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//  parse requests of content-type - application/json
app.use(express.json());

// The path module provides utilities for working with file and directory paths. It can be accessed using:
const path = require('path');

async function db_test() {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  };
}
db_test();

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use('/images', express.static(path.join(__dirname, '/images')));
// Cela indique à Express qu'il faut gérer la ressource images 
// de manière statique (un sous-répertoire de notre répertoire de base, __dirname )
// à chaque fois qu'elle reçoit une requête vers la route /images

app.use((req, res, next) => {
  next();
}); //server msg BEGIN

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); //response define header for all routes and methods(GET POST PUT DELETE..)

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/comments', commentsRoutes);

app.use((req, res, next) => {
  res.status(200);
  next();
});//response status for undefined routes && methods

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
}); //response content for undefined routes && methods

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
}); // server msg END

module.exports = app;