import express from 'express';
import conn from './db/index.js';
import routes from './routes/index.js'
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

conn.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
     
      console.log('connected as id ' + conn.threadId);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(routes);

app.get('/', (req, res) => {
    res.send('Connnected');
})

app.listen(PORT, ()=> {
    console.log(`running in http://localhost:${PORT}/`)
})