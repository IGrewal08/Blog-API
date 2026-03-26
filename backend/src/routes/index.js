import express from "express";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

import { fileURLToPath } from "node:url";

const app = express();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/login", loginRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", commentRoutes);

app.use((err, req, res, next) => {
    res.status(404).send("Error 404! Page Not Found.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "localhost", (error) => {
    if (error) throw error;
    console.log(`Express app listening on port ${PORT}`);
});