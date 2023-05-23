const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
let multer = require("multer");
let upload = multer();
let fs = require("fs");
require("dotenv/config");

const user = "daniel.s.boarding@gmail.com";
const pass = process.env.USER_PASS_EMAIL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.get("/", (req, res) => res.send("Hello World"));
app.use(
  express.urlencoded({
    extended: false,
    limit: 10000,
    parameterLimit: 10,
  })
);

app.get("/send/:email/:nome/:mensagem", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: { user, pass },
  });

  transporter
    .sendMail({
      from: user,
      to: user,
      replyTo: req.params.email,
      subject: `Nova mensagem de ${req.params.nome}.`,
      text: req.params.mensagem,
    })
    .then((info) => res.send(info))
    .catch((erro) => res.send(erro));
});

app.post("/send-email", upload.single("file"), (req, res) => {
  const {
    nome,
    email,
    mensagem,
    assunto,
    celular,
    empresa,
    funcionarios,
    curriculo,
  } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    secure: true, 
    auth: { user, pass },
  });

  console.log(req.body)

  transporter
    .sendMail({
      from: user,
      to: user,
      replyTo: email,
      subject: assunto,
      attachments: curriculo && req.file !== undefined ? [
        {
          filename: "Curriculo.pdf",
          content: Buffer.from(req.file.buffer),
          contentType: "application/pdf",
        },
      ] : null,
      text: !curriculo
        ? `
        Nova mansagem de: ${nome}/${email}
        Telefone/Celular: ${celular}
        Empresa: ${empresa}
        Número de funcionários: ${funcionarios}
        Mensagem: ${mensagem}
      `
        : `
      Nova mansagem de: ${nome}/${email}
      Mensagem: ${mensagem} `,
    })
    .then((info) => res.send(info))
    .catch((erro) => res.send(erro));
});

app.listen(3030);
