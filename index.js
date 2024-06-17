import express from "express";
import cors from "cors";
import { UserRegisterRouter } from "./src/routes/UserRegisterRouter.js";
import { PORT } from "./src/config.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(UserRegisterRouter);

app.get("/", (request, response) => {
    response.send("Hello world!");
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
