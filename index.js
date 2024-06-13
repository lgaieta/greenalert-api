import express from "express";
import { UserRegisterRouter } from "./src/routes/UserRegisterRouter.js";
const app = express();
const port = 3500;

app.use("/register", UserRegisterRouter);

app.get("/", (request, response) => {
    response.send("Hello Home!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
