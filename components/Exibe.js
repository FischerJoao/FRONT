import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import Delete from "./Delete";

const DadosExibido = (props) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={props.campos}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    return (
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text style={styles.text}>ID: {item._id}</Text>
                                <Text style={styles.text}>Nome: {item.name}</Text>
                                <Text style={styles.text}>Email: {item.email}</Text>
                                <Text style={styles.text}>Idade: {item.idade}</Text>
                            </Card.Content>
                            <Card.Actions style={styles.actions}>
                                <Button
                                    mode="contained"
                                    onPress={() => Delete(item._id)}
                                    style={[styles.button, styles.deleteButton]}
                                >
                                    Excluir
                                </Button>
                                <Button
                                    mode="contained"
                                    onPress={() => { /* Função de atualizar será implementada aqui */ }}
                                    style={[styles.button, styles.updateButton]}
                                >
                                    Atualizar
                                </Button>
                            </Card.Actions>
                        </Card>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    card: {
        marginVertical: 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        elevation: 3, // Sombra para o card
    },
    text: {
        marginBottom: 5,
        fontSize: 16,
        color: "#333",
    },
    actions: {
        flexDirection: "column", 
        alignItems: "center",
        marginTop: 10,
    },
    button: {
        borderRadius: 5,
        width: "60%", // Define largura uniforme para os botões
        marginVertical: 5,
    },
    deleteButton: {
        backgroundColor: "#ff4d4d", // Vermelho para o botão de exclusão
    },
    updateButton: {
        backgroundColor: "#4CAF50", // Verde para o botão de atualização
    },
});

export default DadosExibido;