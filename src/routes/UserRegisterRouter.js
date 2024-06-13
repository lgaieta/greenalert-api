import express from "express";
import registerUser from "../usecases/registerUser.js";
import MySQLUserStorage from "../services/MySQLUserStorage.js";

const UserRegisterRouter = express.Router();

UserRegisterRouter.post("/", (request, response) => {
    const { email, password } = request.body;
    console.log("Peticion recibida en el servidor (routes)");

    registerUser({ user: { email, password }, userStorage: MySQLUserStorage });

    response.send("Asheee");
});

export { UserRegisterRouter };
