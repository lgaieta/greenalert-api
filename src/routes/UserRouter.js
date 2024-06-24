import express from "express";
import registerUser from "../usecases/registerUser.js";
import MySQLUserRepository from "../services/MySQLUserRepository.js";
import { generateFromEmail } from "unique-username-generator";

const UserRouter = express.Router();

UserRouter.post("/register", async (request, response) => {
    const { email, password } = request.body;

    try {
        await registerUser({
            userCredentials: { email, password },
            userRepository: MySQLUserRepository,
            generateUsername: () => generateFromEmail(email, 4),
        });
    } catch (error) {
        console.error(error);
        response.status(400).send("Error");
    }

    response.send("User created");
});

export { UserRouter };
