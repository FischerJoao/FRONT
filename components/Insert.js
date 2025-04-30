import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { useState } from "react";

const DadosInsert = ({ refetch }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");

  const Add = () => {
    if (!nome || !email || !idade) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    let url = "http://localhost:3000/add/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: nome,
        email: email,
        idade: Number(idade),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) =>
        response
          .json()
          .then((data) => ({ status: response.status, body: data }))
      )
      .then(({ status, body }) => {
        if (status === 400 && body.erro === "Email já cadastrado") {
          alert("Esse e-mail já está em uso!");
        } else {
          console.log(body);
          refetch(); // Atualiza os dados
          setNome("");
          setEmail("");
          setIdade("");
        }
      })
      .catch((err) => {
        console.log("Erro:", err);
      });
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Cadastrar Usuário" />
      <Card.Content>
        <TextInput
          label="Nome"
          mode="outlined"
          value={nome}
          onChangeText={(text) => setNome(text)}
          style={styles.input}
        />
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          label="Idade"
          mode="outlined"
          value={idade}
          keyboardType="numeric"
          onChangeText={(text) => setIdade(text)}
          style={styles.input}
        />
        <Button mode="contained" onPress={() => Add()} style={styles.button}>
          Cadastrar
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 10,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#f0b300", 
  },
});

export default DadosInsert;
