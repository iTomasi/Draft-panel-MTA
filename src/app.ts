import express from "express";
import path from "path";
import routePages from "./routes/pages";

const app = express();
const port = process.env.PORT || 4000;

app.set("port", port);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", routePages);

export default app;