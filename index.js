import express from "express";
import cors from "cors";
import { UserRouter } from "./src/routes/UserRouter.js";
import { PORT } from "./src/config.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use("/user", UserRouter);

app.get("/", (request, response) => {
    response.send("Hello world!");
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
