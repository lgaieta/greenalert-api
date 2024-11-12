import express from "express";
import registerUser from "../usecases/registerUser.js";
import registerDirector from "../usecases/registerDirector.js";
import registerProfessor from "../usecases/registerProfessor.js";
import loginUser from "../usecases/loginUser.js";
import MySQLUserRepository from "../services/MySQLUserRepository.js";
import { generateUsername } from "unique-username-generator";
import PasswordEncrypter from "../services/PasswordEncrypter.js";
import SessionManager from "../services/SessionManager.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../config.js";

const UserRouter = express.Router();

// Authentication Routes
UserRouter.post("/login", loginHandler);
UserRouter.get("/validate", validateHandler);

// User Routes
UserRouter.post("/register", registerHandler);

// Director Routes
UserRouter.get("/director", getDirectorsHandler);
UserRouter.post("/director/register", registerDirectorHandler);

// Professor Routes
UserRouter.get("/professor", getProfessorsHandler);
UserRouter.post("/professor/register", registerProfessorHandler);

async function loginHandler(request, response) {
    try {
        const { email, password } = request.body;
        if (!email || !password) return response.status(400).send("Error");

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const token = await SessionManager.generateToken({
                email,
                usertype: "admin",
            });

            return response
                .cookie("access_token", token, {
                    secure: process.env.NODE_ENV === "production",
                })
                .send("Logged in successfully");
        }

        const user = await loginUser({
            userCredentials: { email, password },
            userRepository: MySQLUserRepository,
            passwordEncrypter: PasswordEncrypter,
        });

        const token = await SessionManager.generateToken({
            email,
            usertype: user.usertype,
        });

        return response
            .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .send("Logged in successfully");
    } catch (error) {
        console.error(error);
        return response.status(400).send("Log in failed");
    }
}

async function validateHandler(request, response) {
    try {
        const token = request.cookies.access_token;
        if (!token) return response.status(403).send("Unauthorized access");

        const payload = await SessionManager.verifyToken(token);
        return response.json({
            email: payload.email,
            usertype: payload.usertype,
        });
    } catch (error) {
        console.error(error);
        return response.status(400).send("Error");
    }
}

async function registerHandler(request, response) {
    try {
        const { email, password } = request.body;
        if (!email || !password) return response.status(400).send("Error");

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
}

async function getDirectorsHandler(request, response) {
    try {
        const token = request.cookies.access_token;
        if (!token) return response.status(403).send("Unauthorized access");

        const payload = await SessionManager.verifyToken(token);

        if (payload.usertype !== "admin")
            return response.status(403).send("Unauthorized access");
        const directorList = await MySQLUserRepository.listDirectors();

        return response.json(directorList);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
}

async function registerDirectorHandler(request, response) {
    try {
        const token = request.cookies.access_token;
        if (!token) return response.status(403).send("Unauthorized access");

        const payload = await SessionManager.verifyToken(token);
        if (payload.usertype !== "admin")
            return response.status(403).send("Unauthorized access");

        const { email } = request.body;
        if (!email) return response.status(400).send("Error");

        await registerDirector({
            email,
            userRepository: MySQLUserRepository,
        });

        return response.status(200).send("Registered successfully");
    } catch (error) {
        console.error(error);
        return response.status(400).send("Register failed");
    }
}

async function getProfessorsHandler(request, response) {
    try {
        const token = request.cookies.access_token;
        if (!token) return response.status(403).send("Unauthorized access");

        const payload = await SessionManager.verifyToken(token);
        if (payload.usertype !== "director")
            return response.status(403).send("Unauthorized access");
        const professorList = await MySQLUserRepository.listProfessors();

        return response.json(professorList);
    } catch (error) {
        console.log(error);
        return response.status(400).send("Error");
    }
}

async function registerProfessorHandler(request, response) {
    try {
        const token = request.cookies.access_token;
        if (!token) return response.status(403).send("Unauthorized access");

        const payload = await SessionManager.verifyToken(token);
        if (payload.usertype !== "director")
            return response.status(403).send("Unauthorized access");

        const { email } = request.body;

        if (!email) return response.status(400).send("Error");
        await registerProfessor({
            email,
            userRepository: MySQLUserRepository,
        });

        return response.status(200).send("Registered successfully");
    } catch (error) {
        console.error(error);
        return response.status(400).send("Register failed");
    }
}

export { UserRouter };
