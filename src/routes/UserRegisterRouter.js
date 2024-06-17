import express from "express";
import registerUser from "../usecases/registerUser.js";
import MySQLUserRepository from "../services/MySQLUserRepository.js";

const UserRegisterRouter = express.Router();

UserRegisterRouter.post("/register", (request, response) => {
    const { email, password } = request.body;

    registerUser({
        user: { email, password },
        userRepository: MySQLUserRepository,
    });

    response.send("User created");
});

export { UserRegisterRouter };
