const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

// mongodb Connection
mongoose.connect('mongodb://localhost/goWeekBack', { useNewUrlParser: true });
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3000, () => {
    console.log('Server started on port 3000');
});