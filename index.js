"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const winston_1 = __importDefault(require("winston"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_winston_1 = __importDefault(require("express-winston"));
const confirmationEmail_1 = __importDefault(require("./src/confirmationEmail"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const logger = express_winston_1.default.logger({
    transports: [
        new winston_1.default.transports.Console()
    ],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json()),
    meta: false,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; }
});
app.use(logger);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.static(`${__dirname}/public`));
app.get('/api', (req, res) => {
    res.send('Registration API for ERPSolution');
});
app.get('/api/confirmacion/:token', (req, res) => {
    try {
        const token = req.params.token;
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw "JWT_SECRET no encontrado en .env";
        }
        const payload = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (!payload) {
            throw "Token no válido";
        }
        const confirmationHtmlPath = path_1.default.join(__dirname, "/public/confirmation.html");
        res.sendFile(confirmationHtmlPath);
    }
    catch (err) {
        res.status(500).json({ message: `Error en el servidor. ${err}` });
    }
});
app.post('/api/confirmacion/:token', (req, res) => {
    try {
        const token = req.params.token;
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw "JWT_SECRET no encontrado en .env";
        }
        let payload = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (!payload) {
            throw "Token no válido";
        }
        const password = req.body.password;
        payload.password = password;
        const confirmationHtmlPath = path_1.default.join(__dirname, "/public/confirmationSuccess.html");
        res.sendFile(confirmationHtmlPath);
    }
    catch (err) {
        const confirmationHtmlPath = path_1.default.join(__dirname, "/public/confirmationFailed.html");
        res.sendFile(confirmationHtmlPath);
    }
});
app.post('/api/empleados', (req, res) => {
    try {
        const email = req.body.email;
        const nombre = req.body.nombre;
        const apellidos = req.body.apellidos;
        const dni = req.body.dni;
        const rol = req.body.rol;
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw "JWT_SECRET no encontrado en .env";
        }
        const jwtToken = jsonwebtoken_1.default.sign({
            email: email,
            nombre: nombre,
            apellidos: apellidos,
            dni: dni,
            rol: rol
        }, jwtSecret, { expiresIn: "24h" });
        const url = process.env.URL + `:${process.env.SERVER_PORT}/api/confirmacion/${jwtToken}`;
        (0, confirmationEmail_1.default)(email, url);
        res.status(200).json({ message: `Correo de confirmación enviado.` });
    }
    catch (err) {
        res.status(500).json({ message: `Error en el servidor. ${err}` });
    }
});
app.put('/api/empleados', (req, res) => {
    res.send('Hello World!');
});
const port = process.env.SERVER_PORT;
app.listen(port, () => {
    console.log("Servidor iniciado");
    console.log("Escuchando en el puerto: " + port);
});
