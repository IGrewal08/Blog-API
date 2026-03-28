import express from "express";
import loginRouter from "./loginRoutes.js"
import postRouter from "./postRoutes.js";
import commentRouter from "./commentRoutes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/login", loginRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.use((req, res) => {
    res.status(404).send("Error 404! Page Not Found.");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke on the server!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "localhost", (error) => {
    if (error) throw error;
    console.log(`Express app listening on port ${PORT}`);
});