import registerUser from "../../usecases/registerUser.js";
import loginUser from "../../usecases/loginUser.js";
import MySQLUserRepository from "../../services/MySQLUserRepository.js";
import { generateUsername } from "unique-username-generator";
import PasswordEncrypter from "../../services/PasswordEncrypter.js";
import SessionManager from "../../services/SessionManager.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../config.js";
import MySQLSchoolRepository from "../../services/MySQLSchoolRepository.js";

class AuthenticationRequestsHandler {
    static async login(request, response) {
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

            let token = "";

            if (user.usertype === "director") {
                const school =
                    await MySQLSchoolRepository.getByDirectorEmail(email);
                token = await SessionManager.generateToken({
                    email,
                    usertype: user.usertype,
                    schoolCue: school.cue,
                });
                console.log(school);
            } else if (user.usertype === "professor") {
                const school =
                    await MySQLSchoolRepository.getByProfessorEmail(email);
                token = await SessionManager.generateToken({
                    email,
                    usertype: user.usertype,
                    schoolCue: school.cue,
                });
            } else
                token = await SessionManager.generateToken({
                    email,
                    usertype: user.usertype,
                    schoolCue: null,
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

    static async validate(request, response) {
        try {
            const token = request.cookies.access_token;
            if (!token) return response.status(403).send("Unauthorized access");

            const payload = await SessionManager.verifyToken(token);
            return response.json({
                email: payload.email,
                usertype: payload.usertype,
                schoolCue: payload.schoolCue,
            });
        } catch (error) {
            console.error(error);
            return response.status(400).send("Error");
        }
    }

    static async register(request, response) {
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
}

export default AuthenticationRequestsHandler;
