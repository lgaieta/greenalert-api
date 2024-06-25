import express from "express";
import jwt from "jsonwebtoken";
import registerUser from "../usecases/registerUser.js";
import loginUser from "../usecases/loginUser.js";
import MySQLUserRepository from "../services/MySQLUserRepository.js";
import { generateUsername } from "unique-username-generator";
import PasswordEncrypter from "../services/PasswordEncrypter.js";
import { SECRET_JWT_KEY } from "../config.js";

const UserRouter = express.Router();

UserRouter.post("/register", async (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) return response.status(400).send("Error");

    try {
        await registerUser({
            userCredentials: { email, password },
            userRepository: MySQLUserRepository,
            generateUsername: () => generateUsername("-", 2, 15),
            passwordEncrypter: PasswordEncrypter,
        });

        return response.send("User registered successfully");
    } catch (error) {
        console.error(error);
        return response.status(400).send("Error");
    }
});

UserRouter.post("/login", async (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) return response.status(400).send("Error");

    try {
        await loginUser({
            userCredentials: { email, password },
            userRepository: MySQLUserRepository,
            passwordEncrypter: PasswordEncrypter,
        });

        const token = jwt.sign({ email }, SECRET_JWT_KEY, {
            expiresIn: "1h",
        });

        return response
            .cookie("access_token", token, {
                secure: process.env.NODE_ENV === "production",
            })
            .send("Logged in successfully");
    } catch (error) {
        console.error(error);
        return response.status(400).send("Log in failed");
    }
});

export { UserRouter };
