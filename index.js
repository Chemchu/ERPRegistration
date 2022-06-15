"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
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
app.get('/api', (req, res) => {
    res.send('Registration API for ERPSolution');
});
app.post('/api/empleados', (req, res) => {
    const email = req.body.email;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const dni = req.body.dni;
    res.send('Hello World!');
});
app.put('/api/empleados', (req, res) => {
    res.send('Hello World!');
});
app.listen(7070, () => {
    console.log("Servidor iniciado");
    console.log("Escuchando en el puerto 7070");
});
