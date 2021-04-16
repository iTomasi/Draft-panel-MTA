import express from "express";
import path from "path";
import routePages from "./routes/pages";
import routeAdmin from "./routes/admin";
import routeApi from "./routes/api";

const app = express();
const port = process.env.PORT || 4000;

app.set("port", port);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", routePages);
app.use("/admin", routeAdmin);
app.use("/api", routeApi);

export default app;