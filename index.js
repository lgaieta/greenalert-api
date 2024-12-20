import express from "express";
import cors from "cors";
import { UserRouter } from "./src/routes/user/UserRouter.js";
import { ReportRouter } from "./src/routes/ReportRouter.js";
import { SchoolRouter } from "./src/routes/SchoolRouter.js";
import { PORT } from "./src/config.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { CourseRouter } from "./src/routes/CourseRouter.js";
import { LocalityRouter } from "./src/routes/LocalityRouter.js";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use("/user", UserRouter);
app.use("/report", ReportRouter);
app.use("/school", SchoolRouter);
app.use("/course", CourseRouter);
app.use("/locality", LocalityRouter);

app.get("/", (request, response) => {
    response.send("Prueba n1");
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
