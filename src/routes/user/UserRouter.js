import express from "express";
import ProfessorRequestsHandler from "./ProfessorRequestsHandler.js";
import DirectorRequestsHandler from "./DirectorRequestsHandler.js";
import AuthenticationRequestsHandler from "./AuthenticationRequestsHandler.js";

const UserRouter = express.Router();

UserRouter.post("/login", AuthenticationRequestsHandler.login);
UserRouter.get("/validate", AuthenticationRequestsHandler.validate);
UserRouter.post("/register", AuthenticationRequestsHandler.register);

UserRouter.get("/director", DirectorRequestsHandler.listDirectors);
UserRouter.post("/director/register", DirectorRequestsHandler.registerDirector);
UserRouter.get(
    "/director/school/:cue",
    DirectorRequestsHandler.getDirectorByCue,
);
UserRouter.post("/director/school", DirectorRequestsHandler.setSchoolDirector);

// Professor Routes
UserRouter.get("/professor", ProfessorRequestsHandler.listProfessors);
UserRouter.get(
    "/professor/cue/:cue",
    ProfessorRequestsHandler.listProfessorsBySchoolCue,
);
UserRouter.post(
    "/professor/register",
    ProfessorRequestsHandler.registerProfessor,
);

export { UserRouter };
