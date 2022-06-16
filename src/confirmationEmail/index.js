"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = __importDefault(require("../sendEmail"));
const SendConfirmation = (destinatario, confirmationUrl) => {
    const Contenido = `
    ¡Bienvenido! Para completar su registro, acceda al enlace de abajo y cree su contraseña. ${confirmationUrl}. Recuerde: este enlace caducará en 24H`;
    const ContenidoHtml = `
        <h1>¡Bienvenido!</h1>
        <p>Para completar su registro, acceda al enlace de abajo y cree su contraseña</p>
        <a href=${confirmationUrl}>Confirmar cuenta</a>
        <p>Recuerde: este enlace caducará en 24H</p>
    `;
    (0, sendEmail_1.default)(destinatario, "Correo de confirmación ERPSolution", Contenido, ContenidoHtml);
};
const ReceiveConfirmation = (destinatario, confirmationUrl) => {
    const Contenido = `
    ¡Bienvenido! Para completar su registro, acceda al enlace de abajo y cree su contraseña. ${confirmationUrl}`;
    const ContenidoHtml = `
        <h1>¡Bienvenido!</h1>
        <p>Para completar su registro, acceda al enlace de abajo y cree su contraseña</p>
        <a href=${confirmationUrl}>Confirmar cuenta</a>
    `;
    (0, sendEmail_1.default)(destinatario, "Correo de confirmación ERPSolution", Contenido, ContenidoHtml);
};
exports.default = SendConfirmation;
