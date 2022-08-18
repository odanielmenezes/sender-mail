const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

const port = 8081;
const user = "atendimento@powermanservicos.com";
const pass = "@Powerman1";

// var corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };

app.use(cors());
app.get("/", (req, res) => res.send("Hello World"));

app.get("/send/:email/:nome/:mensagem", (req, res) => {
  console.log("AAAA", req.params);

  const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 587,
    auth: { user, pass },
  });

  transporter
    .sendMail({
      from: user,
      to: req.params.email,
      replyTo: req.params.email,
      subject: `Novo orçamento de ${req.params.nome}.`,
      text: req.params.mensagem,
    })
    .then((info) => res.send(info))
    .catch((erro) => res.send(erro));
});

app.listen(port, () => console.log(`Running on port ${port}!`));
