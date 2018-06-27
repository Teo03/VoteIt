const express = require('express');
const app = express();
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const bodyParser = require('body-parser');
  const expressSession = require('express-session');
  const cors = require('cors');
  const mongoose = require('mongoose');
  const passport = require('passport');
  require('dotenv').config();
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(expressSession({
    path    : '/',
    secret : process.env.secret,
    resave : true,
    saveUninitialized : false,
    httpOnly: false,
    maxAge: null
  }));

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  app.use(cors());    

  // PASSPORT SETUP //
app.use(passport.initialize());
app.use(passport.session());

// ROUTING //
const routes = require('./routes/routes.js');
app.use('/', routes);

mongoose.connect(process.env.DB)
.then(connection => {
    console.log('Connected to MongoDB')
})
.catch(error => {
  console.log(error.message)
})
  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
