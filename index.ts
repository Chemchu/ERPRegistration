import express from 'express'
import winston from 'winston';
import jwt from 'jsonwebtoken';
import expressWinston from 'express-winston';
import SendConfirmation from './src/confirmationEmail';
import path from 'path';
import bodyParser from 'body-parser';

const app = express()
const logger = expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: false,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; }
});

app.use(logger)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(`${__dirname}/public`));

app.get('/api', (req, res) => {
    res.send('Registration API for ERPSolution')
})

app.get('/api/confirmacion/:token', (req, res) => {
    try {
        const token = req.params.token;
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) { throw "JWT_SECRET no encontrado en .env" }

        const payload = jwt.verify(token, jwtSecret);
        if (!payload) { throw "Token no válido" }

        const confirmationHtmlPath = path.join(__dirname, "/public/confirmation.html");
        res.sendFile(confirmationHtmlPath)
    }
    catch (err) {
        res.status(500).json({ message: `Error en el servidor. ${err}` })
    }
})

app.post('/api/confirmacion/:token', (req, res) => {
    try {
        const token = req.params.token;
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) { throw "JWT_SECRET no encontrado en .env" }

        let payload: any = jwt.verify(token, jwtSecret);
        if (!payload) { throw "Token no válido" }

        const password = req.body.password;
        payload.password = password;

        const confirmationHtmlPath = path.join(__dirname, "/public/confirmationSuccess.html");
        res.sendFile(confirmationHtmlPath)
    }
    catch (err) {
        const confirmationHtmlPath = path.join(__dirname, "/public/confirmationFailed.html");
        res.sendFile(confirmationHtmlPath)
    }
})

app.post('/api/empleados', (req, res) => {
    try {
        const email = req.body.email;
        const nombre = req.body.nombre;
        const apellidos = req.body.apellidos;
        const dni = req.body.dni;
        const rol = req.body.rol;

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) { throw "JWT_SECRET no encontrado en .env" }

        const jwtToken = jwt.sign({
            email: email,
            nombre: nombre,
            apellidos: apellidos,
            dni: dni,
            rol: rol
        },
            jwtSecret, { expiresIn: "24h" });

        const url = process.env.URL + `:${process.env.SERVER_PORT}/api/confirmacion/${jwtToken}`
        SendConfirmation(email, url)

        res.status(200).json({ message: `Correo de confirmación enviado.` })
    }
    catch (err) {
        res.status(500).json({ message: `Error en el servidor. ${err}` })
    }
})

app.put('/api/empleados', (req, res) => {
    res.send('Hello World!')
})

const port = process.env.SERVER_PORT;
app.listen(port, () => {
    console.log("Servidor iniciado")
    console.log("Escuchando en el puerto: " + port)
})