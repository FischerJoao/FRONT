import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, ScrollView } from 'react-native';
import DadosExibido from './components/Exibe';
import DadosInsert from './components/Insert';




export default function App() {
  const [campos, setDados] = useState([])

  useEffect(() => {

    let url = 'http://localhost:3000/';

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        setDados(json);
        //console.log(campos);
      }
      );

  }, []); // <- Esse array vazio faz o useEffect rodar apenas 1x

  // get
  //'http://172.16.4.101:3000/';
  const Exibir = () => {
    let url = 'http://localhost:3000/';
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setDados(json);

      }
      );
  }

  //post

  // const Add = () => {
  //   let url = 'http://localhost:3000/add/';
  //   fetch(url, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       name: 'Marllon',
  //       email: '@marllon'
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));
  // }

  // PATCH
  const Atualizar = (id) => {
    let url = `http://localhost:3000/update/${id}`;
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        name: 'Lobo',
        email: '@lobo'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  //PUT
  const Atualizar0 = (id) => {
    let url = `http://localhost:3000/put_update/${id}`;
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        name: 'Lobo',
        email: '@lobo'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }


  const Delete = (id) => {
    let url = `http://localhost:3000/delete/${id}`;
    console.log(url);
    fetch(url, {
      method: 'DELETE',
    }).then((response) => response.json())
      .then((json) => console.log(json));
  }

  /*
  tipo de erro NOBRIDGE) ERROR  VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality 
  - use another VirtualizedList-backed container instead. [Component Stack]
     <View>
      <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }} >
      <View>
      <ScrollView horizontal={true} style={{ width: "100%" }}>
          <FlatList />
      </ScrollView>
      </View>
      </ScrollView>
  </View>
  
  */
  return (
    <View style={styles.container}>
      <ScrollView  >
        <Button
          title='Exibir'
          onPress={() => Exibir()}
        />

        <Button
          title='Inserir'
          onPress={() => Add()}
        />

        <Button
          title='Delete'
          onPress={() => Delete("67f65973fe21fbccb25640b0")}
        />

        <Button
          title='Put'
          onPress={() => Atualizar0("67f660c91c35c66376062545")}
        />



        <Button
          title='PATCH'
          onPress={() => Atualizar("67f660f71c35c66376062549")}
        />



        <DadosInsert />

        <DadosExibido campos={campos} />

        <StatusBar style="auto" />
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



{/* <FlatList
data={campos}
renderItem={({ item }) => {
  return (
    <View style={{ margin:20,backgroundColor:'#1E90FF', border:'1px solid #000', padding:5}}>
      <Text>ID : {item._id}</Text>
      <Text>NOME : {item.name}</Text>
    </View>

  )
}}

/> */}