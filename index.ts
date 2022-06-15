import express from 'express'
import winston from 'winston';
import expressWinston from 'express-winston';

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

app.get('/api', (req, res) => {
    res.send('Registration API for ERPSolution')
})

app.post('/api/empleados', (req, res) => {
    const email = req.body.email;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const dni = req.body.dni;

    res.send('Hello World!')
})

app.put('/api/empleados', (req, res) => {
    res.send('Hello World!')
})

app.listen(7070, () => {
    console.log("Servidor iniciado")
    console.log("Escuchando en el puerto 7070")
})