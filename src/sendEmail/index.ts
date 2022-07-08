import nodemailer from "nodemailer";
import dotenv from "dotenv";
import AWS, { ConfigurationOptions } from 'aws-sdk';

dotenv.config()

const SendEmail = async (destinatario: string, asunto: string, contenido?: string, contenidoHtml?: string) => {
    try {
        const keyId = process.env.USER
        const secretKey = process.env.SECRET

        if (!keyId || !secretKey) { throw "Las credenciales de AWS SES no pueden ser indefinidas" }

        // configure AWS SDK
        const conf: ConfigurationOptions = {
            region: process.env.REGION,
            credentials: {
                accessKeyId: keyId,
                secretAccessKey: secretKey
            }
        }
        AWS.config.update(conf);

        const transporter = nodemailer.createTransport({
            SES: new AWS.SES(),
        });

        // send mail with defined transport object
        await transporter.sendMail({
            from: `ERPSolution <${process.env.EMAIL}>`, // sender address
            to: destinatario, // list of receivers
            subject: asunto, // Subject line
            text: contenido || "", // plain text body
            html: contenidoHtml || "", // html body
        });

        return true
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export default SendEmail;