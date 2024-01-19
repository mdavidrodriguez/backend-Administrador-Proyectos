import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;
  // Todo: Mover a variables de entorno
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //   Información del email
  const info = await transport.sendMail({
    from: "Administrador de Proyectos <cuentas@correo.com>",
    to: email,
    subject: "Admi Proyectos - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en AdmiProyectos",
    html: `<p>Hola: ${nombre} Comprueba tu cuenta en el administrador</p>
    <p>Tu cuenta esta casi lista, solo debes comprobarla en el siguiente enlace:
        <a href=${process.env.FRONTEND_URL}/confirmar/${token}>Comprobar Cuenta</a>
    </p>
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //   Información del email
  const info = await transport.sendMail({
    from: "Administrador de Proyectos <cuentas@correo.com>",
    to: email,
    subject: "Admi Proyectos - Olvide Password",
    text: "Restablece tu password",
    html: `<p>Hola: ${nombre} Restablece tu password</p>
    <p>Para restablecer tu password visita el siguiente enlace:
        <a href=${process.env.FRONTEND_URL}/olvide-password/${token}>Restablecer Password</a>
    </p>
    <p>Si tu no solicitaste esta acción, puedes ignorar el mensaje</p>
    `,
  });
};
