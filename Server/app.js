const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const { types } = require("@babel/core");

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());

//https://expressjs.com/en/resources/middleware/body-parser.html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(true));

//https://expressjs.com/en/resources/middleware/method-override.htmlnpm
app.use(methodOverride("X-HTTP-Method"));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("X-Method-Override"));
app.use(methodOverride("_method"));

// conexao
let url = process.env.DB_URL;

mongoose
  .connect(url)
  .then(() => {
    console.log("Conectado ao MongoDb");
  })
  .catch((e) => {
    console.log(e);
  });
//shema
let Usuario = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  idade: {
    type: Number,
    required: true,
  },
});
// criar o model
const RefDoc = new mongoose.model("Usuarios", Usuario);

// rota

// exibir
app.get("/", async (req, res) => {
  const users = await RefDoc.find({});
  res.json(users);
});

// deletar tudo
app.delete("/delete/delete-all", async (req, res) => {
  try {
    await RefDoc.deleteMany({}); // Deleta todos os documentos da coleção
    res.send({ status: "todos os documentos foram deletados" });
  } catch (error) {
    res.status(500).send({ erro: "erro ao deletar todos os documentos" });
  }
});

// deletar por id
app.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let i = await RefDoc.findByIdAndDelete(id);
    if (i) {
      res.send({ status: "deletado" });
    } else {
      res.status(404).send({ erro: "documento não encontrado" });
    }
  } catch (error) {
    res.status(500).send({ erro: "erro ao deletar o documento" });
  }
});

app.post("/add", async (req, res) => {
  console.log(req.body);
  let nome = req.body.name;
  let email = req.body.email;
  let idade = Number(req.body.idade);
  try {
    const I = new RefDoc({ name: nome, email: email, idade: idade });
    await I.save();
    res.send({ status: "adicionado", data: req.body });
  } catch (error) {
    res.status(500).send({ erro: "erro ao adicionar documento" });
  }
});

// atualizar campos espeficios
app.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  //             // filtro, altera
  // .updateOne({ _id: id }, updateData);
  const updatedUser = await RefDoc.updateOne({ _id: id }, update);
  if (updatedUser) {
    res.send({ status: "alterado" });
  } else {
    res.send({ erro: "erro" });
  }
});

app.listen(port, () => {
  console.log(`Example  app listening port ${port}`);
});
