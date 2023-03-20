import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import myRoutes from "./routes.js";

const app = express();

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


export default app;