const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
require('dotenv/config')

const port = 8081;
const user = "danielprofissional93@outlook.com";
const pass = process.env.USER_PASS_EMAIL;

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors());
app.get("/", (req, res) => res.send("Hello World"));

app.get("/send/:email/:nome/:mensagem", (req, res) => {
  console.log("AAAA", process.env.USER_PASS_EMAIL);

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: { user, pass },
  });

  transporter
    .sendMail({
      from: req.params.email,
      to: user,
      replyTo: req.params.email,
      subject: `Novo orçamento de ${req.params.nome}.`,
      text: req.params.mensagem,
    })
    .then((info) => res.send(info))
    .catch((erro) => res.send(erro));
});

app.listen(process.env.PORT || 3000);
