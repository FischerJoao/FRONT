import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const DadosDeletado = (props) => {
    const Delete = (id) => {
        let url = `http://localhost:3000/delete/${id}`;
        console.log(url);
        fetch(url, {
            method: 'DELETE',
        }).then((response) => response.json())
            .then((json) => console.log(json));
    };
}

export default DadosDeletado;