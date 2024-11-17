import registerDirector from "../../usecases/registerDirector.js";
import SessionManager from "../../services/SessionManager.js";
import MySQLUserRepository from "../../services/MySQLUserRepository.js";

class DirectorRequestsHandler {
    static async listDirectors(request, response) {
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

    static async getDirectorByCue(request, response) {
        try {
            const { cue } = request.params;
            const director = await MySQLUserRepository.getDirectorByCue(cue);
            return response.json(director);
        } catch (error) {
            console.log(error);
            return response.status(400).send("Error");
        }
    }

    static async registerDirector(request, response) {
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

    static async setSchoolDirector(request, response) {
        try {
            const token = request.cookies.access_token;
            if (!token) return response.status(403).send("Unauthorized access");

            const payload = await SessionManager.verifyToken(token);
            if (payload.usertype !== "admin")
                return response.status(403).send("Unauthorized access");

            const { cue, email } = request.body;
            console.log(cue, email);
            if (!cue || !email) return response.status(400).send("Error");

            await MySQLUserRepository.setSchoolDirector(cue, email);

            return response.status(200).send("Registered successfully");
        } catch (error) {
            console.error(error);
            return response.status(400).send("Register failed");
        }
    }
}

export default DirectorRequestsHandler;
