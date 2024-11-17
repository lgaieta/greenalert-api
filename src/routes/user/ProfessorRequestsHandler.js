import SessionManager from "../../services/SessionManager.js";
import registerProfessor from "../../usecases/registerProfessor.js";
import MySQLUserRepository from "../../services/MySQLUserRepository.js";

class ProfessorRequestsHandler {
    static async authenticateAndAuthorize(
        request,
        response,
        requiredUserType,
        callback,
    ) {
        try {
            const token = request.cookies.access_token;
            if (!token) return response.status(403).send("Unauthorized access");

            const payload = await SessionManager.verifyToken(token);
            if (payload.usertype !== requiredUserType)
                return response.status(403).send("Unauthorized access");

            return await callback(payload);
        } catch (error) {
            console.error(error);
            return response.status(400).send("Error");
        }
    }

    static async listProfessors(request, response) {
        return ProfessorRequestsHandler.authenticateAndAuthorize(
            request,
            response,
            "director",
            async () => {
                const professorList =
                    await MySQLUserRepository.listProfessors();
                return response.json(professorList);
            },
        );
    }

    static async listProfessorsBySchoolCue(request, response) {
        return ProfessorRequestsHandler.authenticateAndAuthorize(
            request,
            response,
            "director",
            async () => {
                const { cue } = request.params;
                if (!cue) return response.status(400).send("Error");

                const professorList =
                    await MySQLUserRepository.listProfessorsBySchoolCue(cue);
                return response.json(professorList);
            },
        );
    }

    static async registerProfessor(request, response) {
        return ProfessorRequestsHandler.authenticateAndAuthorize(
            request,
            response,
            "director",
            async () => {
                const { email, schoolCue } = request.body;

                if (!email || !schoolCue)
                    return response.status(400).send("Missing fields");

                await registerProfessor({
                    email,
                    schoolCue,
                    userRepository: MySQLUserRepository,
                });

                return response.status(200).send("Registered successfully");
            },
        );
    }
}

export default ProfessorRequestsHandler;
