const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const app = express();
//const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('listening on port 3000');
});

// axios('http://localhost:3002', {
//   method: 'GET',
//   mode: 'no-cors',
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//    // 'Content-Type': 'application/json',
//   },
app.get('/games', (req, res) => {
  axios.get('http://localhost:3002/games').then( data => {
    res.send(data.data)
  }).catch( err => console.log('error message', err) );
});

app.get('/splashpage/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  axios.get(`http://localhost:3001/splashpage/${gameId}`).then( data => {
    res.send(data.data[0])
  }).catch( err => console.log('error in proxy get gameId:', err) );
});