import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use(cors()) this is also perfectly fine
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); //limiting json in our server, when taking data from form
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// taking data from url
app.use(express.static("public"));
app.use(cookieParser());

// importing router
import userRouter from "./routes/user.routes.js";

// routes declaration
//app.use("/users", userRouter);
app.use("/api/v1/users", userRouter);

//http://localhost:8000/api/v1/users/register

export { app };
