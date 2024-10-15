import express from "express";
import jwt from "jsonwebtoken";
import registerUser from "../usecases/registerUser.js";
import registerDirector from "../usecases/registerDirector.js";
import loginUser from "../usecases/loginUser.js";
import MySQLUserRepository from "../services/MySQLUserRepository.js";
import { generateUsername } from "unique-username-generator";
import PasswordEncrypter from "../services/PasswordEncrypter.js";
import { SECRET_JWT_KEY, ADMIN_EMAIL, ADMIN_PASSWORD } from "../config.js";

const UserRouter = express.Router();

UserRouter.get("/", async (request, response) => {
    const token = request.cookies.access_token;

    if (!token) return response.status(403).send("Unauthorized access");

    console.log(token);

    response.send("Protected users!");
});

UserRouter.get("/director", async (request, response) => {
    try {
        const directorList = await MySQLUserRepository.listDirectors();
        return response.json(directorList);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
});

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

UserRouter.get("/validate", async (request, response) => {
    const token = request.cookies.access_token;

    if (!token) return response.status(403).send("Unauthorized access");

    try {
        const payload = jwt.verify(token, SECRET_JWT_KEY);
        return response.json({
            email: payload.email,
            usertype: payload.usertype,
        });
    } catch (error) {
        console.error(error);
        return response.status(400).send("Error");
    }
});

UserRouter.post("/login", async (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) return response.status(400).send("Error");

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ email, usertype: "admin" }, SECRET_JWT_KEY, {
            expiresIn: "1h",
        });

        return response
            .cookie("access_token", token, {
                secure: process.env.NODE_ENV === "production",
            })

            .send("Logged in successfully");
    }

    try {
        const user = await loginUser({
            userCredentials: { email, password },
            userRepository: MySQLUserRepository,
            passwordEncrypter: PasswordEncrypter,
        });

        const token = jwt.sign(
            { email, usertype: user.usertype },
            SECRET_JWT_KEY,
            {
                expiresIn: "7d",
            },
        );

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

UserRouter.post("/director/register", async (request, response) => {
    const { email } = request.body;

    if (!email) return response.status(400).send("Error");

    try {
        await registerDirector({
            email,
            userRepository: MySQLUserRepository,
        });

        return response.send("Logged in successfully");
    } catch (error) {
        console.error(error);
        return response.status(400).send("Log in failed");
    }
});

export { UserRouter };
