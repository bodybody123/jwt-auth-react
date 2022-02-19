import express from 'express';
import UserCtrl from '../controllers/user.controller.js';

const app = express();

app.get('/test', (req, res) => {
    res.json({ message: 'hello' });
});
app.post('/test/login', UserCtrl.login);

export default app;