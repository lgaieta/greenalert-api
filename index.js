import express from "express";
import cors from "cors";
import { UserRegisterRouter } from "./src/routes/UserRegisterRouter.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(UserRegisterRouter);

app.get("/", (request, response) => {
    response.send("Hello world!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
