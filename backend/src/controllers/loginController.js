import getAdmin from "../services/loginService.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

export default async function loginController (req, res) {
    try {
        const { email, password } = req.body;
        const user = await getAdmin(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role},
             process.env.JWT_SECRET,
              { expiresIn: '1d' }
        );

        res.status(200).json({
            message: "Login Successful",
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Access Denied! Incorrect Username or Password." });
    }
}