import SendEmail from "../sendEmail";

const SendConfirmation = (destinatario: string, confirmationUrl: string) => {
    const Contenido = `
    ¡Bienvenido! Para completar su registro, acceda al enlace de abajo y cree su contraseña. ${confirmationUrl}. Recuerde: este enlace caducará en 24H`

    const ContenidoHtml = `
        <h1>¡Bienvenido!</h1>
        <p>Para completar su registro, acceda al enlace de abajo y cree su contraseña</p>
        <a href=${confirmationUrl}>Confirmar cuenta</a>
        <p>Recuerde: este enlace caducará en 24H</p>
    `

    return SendEmail(destinatario, "Correo de confirmación ERPSolution", Contenido, ContenidoHtml);
}

const ReceiveConfirmation = (destinatario: string, confirmationUrl: string) => {
    const Contenido = `
    ¡Bienvenido! Para completar su registro, acceda al enlace de abajo y cree su contraseña. ${confirmationUrl}`

    const ContenidoHtml = `
        <h1>¡Bienvenido!</h1>
        <p>Para completar su registro, acceda al enlace de abajo y cree su contraseña</p>
        <a href=${confirmationUrl}>Confirmar cuenta</a>
    `

    return SendEmail(destinatario, "Correo de confirmación ERPSolution", Contenido, ContenidoHtml);
}

export default SendConfirmation;