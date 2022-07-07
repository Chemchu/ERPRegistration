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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
dotenv_1.default.config();
const SendEmail = (destinatario, asunto, contenido, contenidoHtml) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyId = process.env.USER;
        const secretKey = process.env.SECRET;
        if (!keyId || !secretKey) {
            throw "Las credenciales de AWS SES no pueden ser indefinidas";
        }
        const conf = {
            region: process.env.REGION,
            credentials: {
                accessKeyId: keyId,
                secretAccessKey: secretKey
            }
        };
        aws_sdk_1.default.config.update(conf);
        const transporter = nodemailer_1.default.createTransport({
            SES: new aws_sdk_1.default.SES(),
        });
        const info = yield transporter.sendMail({
            from: `ERPSolution <${process.env.EMAIL}>`,
            to: destinatario,
            subject: asunto,
            text: contenido || "",
            html: contenidoHtml || "",
        });
        console.log(info);
        console.log("Message sent: %s", info.messageId);
        return info.accepted;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.default = SendEmail;
