import conn from '../db/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class UserController {
    static async login(req, res) {
        try {
            const { username, password } = req.body;
    
            if (!username || !password) {
                return res.status(400).json({ message: 'Please provide username and password' })
            }
            conn.query('SELECT * FROM user_acc WHERE username = ?', [username], async (error, results) => {
                console.log(results);
                if (!results || !(await bcrypt.compare(password, results[0].password))) {
                    return res.status(500).json({ message: 'email or password not found' });
                }
                else {
                    const id = results[0].id;
                    const username = results[0].username;
                    const email = results[0].email;

                    const accessToken = jwt.sign({id: id, username: username, email: email}, process.env.ACCESS_TOKEN_KEY, {
                        expiresIn: '20s'
                    });
                    const refreshToken = jwt.sign({id: id, username: username, email: email}, process.env.REFRESH_TOKEN_KEY, {
                        expiresIn: '1d'
                    });
                    res.cookie('refreshToken', refreshToken,{
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000
                    });

                    return res.status(200).json({ accessToken });
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }
}