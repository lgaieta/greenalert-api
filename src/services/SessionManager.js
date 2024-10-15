import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config.js";

class SessionManager {
    static async generateToken(payload) {
        return jwt.sign(
            { email: payload.email, usertype: payload.usertype },
            SECRET_JWT_KEY,
            {
                expiresIn: "7d",
            },
        );
    }

    static async verifyToken(token) {
        return jwt.verify(token, SECRET_JWT_KEY);
    }
}

export default SessionManager;
