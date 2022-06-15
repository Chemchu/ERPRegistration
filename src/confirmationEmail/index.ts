import SendEmail from "../sendEmail";

const SendConfirmation = (destinatario: string) => {
    const url = "https://www.google.es/"
    const ContenidoHtml = `
        <h1>¡Bienvenido!</h1>
        <p>Para completar su registro, acceda al enlace de abajo y cree su contraseña</p>
        <a href=${url}>Confirmar cuenta</a>
    `

    SendEmail(destinatario, "Correo de confirmación ERPSolution", undefined, ContenidoHtml);
}

export default SendConfirmation;