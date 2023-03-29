import express from "express";
import dotenv from "dotenv";

import db from "./config/db.js";
import programRoute from "./routes/program_routes.js";
import UserRoute from "./routes/user.route.js";


dotenv.config();

db();

const port = process.env.PORT || 6000;

const app = new express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use("/programs", programRoute)

app.use("/user", UserRoute)


app.listen(port,
    () =>(
        console.log(`API IS RUNING ON PORT: ${port}`)
    )
);