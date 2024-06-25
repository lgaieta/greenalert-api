import express from "express";
import registerUser from "../usecases/registerUser.js";
import loginUser from "../usecases/loginUser.js";
import MySQLUserRepository from "../services/MySQLUserRepository.js";
import { generateFromEmail } from "unique-username-generator";
import PasswordEncrypter from "../services/PasswordEncrypter.js";

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
    } catch (error) {
        console.error(error);
        response.status(400).send("Error");
    }

});

UserRouter.post('/login',async (request,response) =>{
    const {email, password} = request.body;
    try{
    await loginUser({
        userCredentials: {email, password},
        userRepository: MySQLUserRepository,
        passwordEncrypter: PasswordEncrypter,
    })
    }catch(error){
        console.error(error);
        response.status(400).send("Error");
    }

})

export { UserRouter };

