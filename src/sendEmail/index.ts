import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

const SendEmail = async (destinatario: string, asunto: string, contenido?: string, contenidoHtml?: string) => {
    const credentials = {
        host: process.env.HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.SECRET,
        },
    }
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(credentials);

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `ERPSolution <${process.env.EMAIL}>`, // sender address
        to: destinatario, // list of receivers
        subject: asunto, // Subject line
        text: contenido || "", // plain text body
        html: contenidoHtml || "", // html body
    });

    console.log("Message sent: %s", info.messageId);
}

export default SendEmail;