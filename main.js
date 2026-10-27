import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const app = express();

// Obtener la ruta del directorio actual en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.json());

//sirve el frontend
app.use(express.static(path.join(__dirname, "public")));

//configuracion de la sesión
app.use(
    session({
        secret: "poyuistreas1234%",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 }, // 1 hora
    }),
);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/grettings", (req, res) => {
    res.json({
        message: "Hola, desde Node JS",
    });
});

app.get("/api/servers", (req, res) => {
    res.json([
        { id: 1, name: "SEO", price: 150 },
        { id: 2, name: "Web Hosting", price: 100 },
        { id: 3, name: "VPS", price: 200 },
        { id: 4, name: "Dedicate Server", price: 300 },
    ]);
});

app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;

    console.log("nuevo mensaje", name, email, message);

    res.json({
        status: "ok",
    });
});

app.post("/api/comentar", (req, res) => {
    const { nombre, correo, comentario } = req.body;
    if (req.body) {
        if (!req.session.comentarios) {
            req.session.comentarios = [];
        }
        req.session.comentarios.push({
            nombre,
            correo,
            comentario,
        });
        console.log("Lista de comentarios", req.session.comentarios);
    }
    res.json({
        status: "ok",
    });
});

app.get("/api/comentarios", (req, res) => {
    res.json(req.session.comentarios || []);
});

app.listen(port, () => {
    console.log("Servidor escuchando....");
});
