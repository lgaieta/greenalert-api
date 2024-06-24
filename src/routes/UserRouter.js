import express from "express";
import registerUser from "../usecases/registerUser.js";
import MySQLUserRepository from "../services/MySQLUserRepository.js";

const UserRouter = express.Router();

UserRouter.post("/register", async (request, response) => {
    const { email, password } = request.body;

    try {
        await registerUser({
            user: { email, password },
            userRepository: MySQLUserRepository,
        });
    } catch (error) {
        console.error(error);
        response.status(400).send("Error");
    }

    response.send("User created");
});

export { UserRouter };
