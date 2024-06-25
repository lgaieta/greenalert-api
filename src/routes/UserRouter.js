import express from "express";
import jwt from "jsonwebtoken";
import registerUser from "../usecases/registerUser.js";
import loginUser from "../usecases/loginUser.js";
import MySQLUserRepository from "../services/MySQLUserRepository.js";
import { generateFromEmail } from "unique-username-generator";
import PasswordEncrypter from "../services/PasswordEncrypter.js";
import { SECRET_JWT_KEY } from "../config.js";

const UserRouter = express.Router();

UserRouter.post("/register", async (request, response) => {
    const { email, password } = request.body;

    try {
        await registerUser({
            userCredentials: { email, password },
            userRepository: MySQLUserRepository,
            generateUsername: () => generateFromEmail(email, 4),
            passwordEncrypter: PasswordEncrypter,
        });
        const token = jwt.registerUser({ email, password }, SECRET_JWT_KEY, {
            expiresIn: "1h",
        });
        response.send({ token });
    } catch (error) {
        console.error(error);
        response.status(400).send("Error");
    }
});

UserRouter.post("/login", async (request, response) => {
    const { email, password } = request.body;
    try {
        await loginUser({
            userCredentials: { email, password },
            userRepository: MySQLUserRepository,
            passwordEncrypter: PasswordEncrypter,
        });
    } catch (error) {
        console.error(error);
        response.status(400).send("Error");
    }
});

export { UserRouter };
