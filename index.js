const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");

const port = 8081;
const user = "danielprofissional93@outlook.com";
const pass = process.env.USER_PASS_EMAIL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors());
app.get("/", (req, res) => res.send("Hello World"));

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

app.post("/send-email", (req, res) => {
  const {
    nome,
    email,
    mensagem,
    assunto,
    celular,
    empresa,
    funcionarios,
  } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: { user, pass },
  });
console.log(req.body)
  transporter
    .sendMail({
      from: user,
      to: user,
      replyTo: email,
      subject: assunto,
      text: `
        Nova mansagem de: ${nome}/${email}
        Telefone/Celular: ${celular}
        Empresa: ${empresa}
        Número de funcionários: ${funcionarios}
        Mensagem: ${mensagem}
      `,
    })
    .then((info) => res.send(info))
    .catch((erro) => res.send(erro));
});

app.listen(3000);
