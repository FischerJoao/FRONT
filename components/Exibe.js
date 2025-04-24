import React from "react";
import { FlatList, View, Text, Button } from "react-native";
import DadosDeletado from "./Delete";


const DadosExibido = (props) => {


    return (
        <View>
            <FlatList
                data={props.campos}
                renderItem={({ item }) => {
                    return (
                        <View style={{ margin: 20, backgroundColor: '#00FFFF', border: '1px solid #ddd', padding: 5 }}>
                            <Text>ID : {item._id}</Text>
                            <Text>NOME : {item.name}</Text>
                            <Text>EMAI : {item.email}</Text>
                            <Text>IDADE : {item.idade}</Text>
                            <DadosDeletado id={item._id} />
                       
                        </View>

                    )
                }}
            />

        </View>


    );
}

export default DadosExibido;