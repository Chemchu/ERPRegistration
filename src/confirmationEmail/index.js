"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = __importDefault(require("../sendEmail"));
const SendConfirmation = (destinatario) => {
    const url = "https://www.google.es/";
    const ContenidoHtml = `
        <h1>¡Bienvenido!</h1>
        <p>Para completar su registro, acceda al enlace de abajo y cree su contraseña</p>
        <a href=${url}>Confirmar cuenta</a>
    `;
    (0, sendEmail_1.default)(destinatario, "Correo de confirmación ERPSolution", undefined, ContenidoHtml);
};
exports.default = SendConfirmation;
