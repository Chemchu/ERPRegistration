"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const axios_1 = __importDefault(require("axios"));
const querys_1 = require("./graphqlQuerys/querys");
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
app.post('/api/confirmacion/:token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.params.token;
        const jwtSecret = process.env.JWT_SECRET;
        const gatewayUrl = process.env.ERPGATEWAY_URL;
        if (!jwtSecret) {
            throw "JWT_SECRET no encontrado en .env";
        }
        if (!gatewayUrl) {
            throw "ERPGATEWAY_URL no encontrado en .env";
        }
        let payload = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (!payload) {
            throw "Token no válido";
        }
        const password = req.body.password;
        payload.password = password;
        const gatewayRes = yield axios_1.default.post(gatewayUrl, {
            "query": querys_1.ADD_EMPLEADO,
            "variables": {
                "empleadoInput": {
                    "nombre": payload.nombre,
                    "apellidos": payload.apellidos,
                    "dni": payload.dni,
                    "rol": payload.rol,
                    "email": payload.email,
                    "password": payload.password
                }
            }
        });
        const data = JSON.parse(gatewayRes.data.data);
        const successful = data.addEmpleado.successful;
        if (successful) {
            const confirmationHtmlPath = path_1.default.join(__dirname, "/public/confirmationSuccess.html");
            res.sendFile(confirmationHtmlPath);
        }
        else {
            const confirmationHtmlPath = path_1.default.join(__dirname, "/public/confirmationFailed.html");
            res.sendFile(confirmationHtmlPath);
        }
    }
    catch (err) {
        console.log("Error: " + err.response.data);
        const confirmationHtmlPath = path_1.default.join(__dirname, "/public/confirmationFailed.html");
        res.sendFile(confirmationHtmlPath);
    }
}));
app.post('/api/empleados', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const url = `${process.env.URL}api/registro/confirmacion/${jwtToken}`;
        const emailSent = yield (0, confirmationEmail_1.default)(email, url);
        res.status(emailSent ? 200 : 300).json({ data: { message: `El correo de confirmación ${emailSent ? "ha sido" : "no ha podido ser"} enviado.`, successful: emailSent } });
    }
    catch (err) {
        res.status(500).json({ data: { message: `Error en el servidor. ${err}`, successful: false } });
    }
}));
app.put('/api/empleados', (req, res) => {
    res.send('Cambiar contraseña a medio hacer');
});
const port = process.env.SERVER_PORT;
app.listen(port, () => {
    console.log("Servidor iniciado");
    console.log("Escuchando en el puerto: " + port);
});
