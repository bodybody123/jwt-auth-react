import express from 'express';
import conn from './db/index.js';

const app = express();

conn.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
     
      console.log('connected as id ' + conn.threadId);
});

app.get('/', (req, res) => {
    res.send('Connnected');
})

app.listen(3005)