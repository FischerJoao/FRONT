import React, { useState } from "react";
import { FlatList, View, StyleSheet, Modal } from "react-native";
import { Card, Text, Button, TextInput } from "react-native-paper";

const Delete = (id, refetch) => {
  let url = `http://localhost:3000/delete/${id}`;
  console.log(url);
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      refetch();
    })
    .catch((error) => console.error("Erro ao deletar:", error));
};

const Update = (id, updatedData, refetch, closeModal) => {
  let url = `http://localhost:3000/update/${id}`;
  fetch(url, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      refetch();
      closeModal();
    })
    .catch((error) => console.error("Erro ao atualizar:", error));
};

const DadosExibido = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");

  const openModal = (item) => {
    setSelectedItem(item);
    setName(item.name);
    setEmail(item.email);
    setIdade(String(item.idade));
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
    setName("");
    setEmail("");
    setIdade("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.campos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
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
                onPress={() => Delete(item._id, props.refetch)}
                style={[styles.button, styles.deleteButton]}
              >
                Excluir
              </Button>
              <Button
                mode="contained"
                onPress={() => openModal(item)}
                style={[styles.button, styles.updateButton]}
              >
                Atualizar
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Modal de Atualização */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Atualizar Usuário</Text>
            <TextInput
              label="Nome"
              placeholder="Nome"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              label="Email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              label="Idade"
              placeholder="Idade"
              value={idade}
              keyboardType="numeric"
              onChangeText={setIdade}
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={() =>
                Update(
                  selectedItem._id,
                  { name, email, idade: Number(idade) },
                  props.refetch,
                  closeModal
                )
              }
              style={styles.modalButton}
            >
              Salvar
            </Button>
            <Button mode="text" onPress={closeModal} style={styles.modalButton}>
              Cancelar
            </Button>
          </View>
        </View>
      </Modal>
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
    elevation: 3,
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
    width: "60%",
    marginVertical: 5,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButton: {
    marginTop: 10,
  },
});

export default DadosExibido;
