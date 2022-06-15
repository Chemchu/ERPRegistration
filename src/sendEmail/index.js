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
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SendEmail = (destinatario, asunto, contenido, contenidoHtml) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = {
        host: process.env.HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.SECRET,
        },
    };
    let transporter = nodemailer_1.default.createTransport(credentials);
    let info = yield transporter.sendMail({
        from: `ERPSolution <${process.env.EMAIL}>`,
        to: destinatario,
        subject: asunto,
        text: contenido || "",
        html: contenidoHtml || "",
    });
    console.log("Message sent: %s", info.messageId);
});
exports.default = SendEmail;
