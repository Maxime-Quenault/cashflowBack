import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import ProfileModel from "../models/profile.model.js";

import myRoutes from "./routes.js";

const app = express()

app.use(express.json());

app.use("/api", myRoutes);

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.HOSTMONGODBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));

    const result = await ProfileModel.find()
    console.log(result)

export default app;