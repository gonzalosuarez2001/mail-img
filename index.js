const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alejo.2001.suarez@gmail.com",
    pass: "ttyy ujka xdyf zdcf",
  },
});

app.post("/send-email", async (req, res) => {
  try {
    const mailOptions = {
      from: "tu-correo@gmail.com",
      to: "alejo.2001.suarez@gmail.com",
      subject: "Hola Alejo 🚀",
      html: `
                <p>Este es un correo de prueba con seguimiento.</p>
                <img src="https://49bf-2800-810-458-1621-861b-48ee-c5bd-2923.ngrok-free.app/track-email?email=alejo.2001.suarez@gmail.com&uid=12345" width="1" height="1" style="display:none;" />
                `,
    };

    // <img src="https://i.imgur.com/B8ta5Aa.jpeg" width="1" height="1" style="display:none;" />

    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);
    res.status(200).json({ message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
});

app.get("/track-email", (req, res) => {
  const email = req.query.email;
  console.log(`Correo abierto por: ${email}`);

  res.setHeader("Content-Type", "image/png");
  res.send(
    Buffer.from(
      "89504E470D0A1A0A0000000D4948445200000001000000010806000000FF",
      "hex"
    )
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
