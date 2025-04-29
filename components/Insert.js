import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { useState } from "react";

const DadosInsert = ({refetch}) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [idade, setIdade] = useState("");

    const Add = () => {
        let url = 'http://localhost:3000/add/';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: nome,
                email: email,
                idade: Number(idade),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {console.log(json)
                refetch(); // Chama a função de refetch para atualizar os dados
                setNome(""); // Limpa o campo de nome
                setEmail(""); // Limpa o campo de email
                setIdade(""); // Limpa o campo de idade
            }
            );
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
                <Button
                    mode="contained"
                    onPress={() => Add()}
                    style={styles.button}
                >
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
    },
});

export default DadosInsert;