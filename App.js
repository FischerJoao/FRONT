import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button } from "react-native-paper"; // Importando o botão do React Native Paper
import DadosExibido from "./components/Exibe";
import DadosInsert from "./components/Insert";

export default function App() {
  const [campos, setDados] = useState([]);

  useEffect(() => {
    //fetchData();
  }, []); // <- Esse array vazio faz o useEffect rodar apenas 1x

  const fetchData = async () => {
    let url = "http://localhost:3000/";

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setDados(json);
      });
  };

  const Exibir = () => {
    let url = "http://localhost:3000/";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setDados(json);
      });
  };

  const DeleteAll = () => {
    let url = `http://localhost:3000/delete/delete-all`;
    console.log(url);
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        fetchData();
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Card de Cadastro no topo */}
        <DadosInsert refetch={fetchData} />

        {/* Botões abaixo do Card */}
        <Button mode="contained" onPress={() => Exibir()} style={styles.button}>
          Exibir
        </Button>

        <Button
          mode="contained"
          onPress={() => DeleteAll()}
          style={styles.button}
          buttonColor="#ff4d4d" // Cor de fundo vermelha para o botão de deletar
        >
          Deletar Todos
        </Button>

        {/* Lista de Dados */}
        <DadosExibido campos={campos} refetch={fetchData} />

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    marginVertical: 10,
    borderRadius: 5,
  },
});
