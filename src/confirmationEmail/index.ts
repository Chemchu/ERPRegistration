import SendEmail from "../sendEmail";

const SendConfirmation = (destinatario: string, confirmationUrl: string) => {
    const Contenido = `
    ¡Bienvenido! Para completar su registro, acceda al enlace de abajo y cree su contraseña. ${confirmationUrl}`

    const ContenidoHtml = `
        <h1>¡Bienvenido!</h1>
        <p>Para completar su registro, acceda al enlace de abajo y cree su contraseña</p>
        <a href=${confirmationUrl}>Confirmar cuenta</a>
    `

    SendEmail(destinatario, "Correo de confirmación ERPSolution", Contenido, ContenidoHtml);
}

const ReceiveConfirmation = (destinatario: string, confirmationUrl: string) => {
    const Contenido = `
    ¡Bienvenido! Para completar su registro, acceda al enlace de abajo y cree su contraseña. ${confirmationUrl}`

    const ContenidoHtml = `
        <h1>¡Bienvenido!</h1>
        <p>Para completar su registro, acceda al enlace de abajo y cree su contraseña</p>
        <a href=${confirmationUrl}>Confirmar cuenta</a>
    `

    SendEmail(destinatario, "Correo de confirmación ERPSolution", Contenido, ContenidoHtml);
}

export default SendConfirmation;