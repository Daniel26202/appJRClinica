import { StyleSheet, Text, TextInput, ImageBackground, Image } from "react-native";
import { useState } from "react";

import { Card } from "../components/Card";
import { SubmitButton } from "../components/SubmitButton";
import { Input } from "../components/Input";

// Imágenes
const wallpaper = require("../assets/Wallpaper.png");
const logo = require("../assets/logo.png");

// Pantalla
export default RecuperarPassword = ({ navigation }) => {
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");

    const handleSubmit = () => {
        if (usuario === "" && correo === "") {
            alert("Recuperado");
        } else {
            alert("Fallo");
        }
    };

    return (
        <ImageBackground source={wallpaper} style={styles.background} resizeMode="cover">
            <Image source={logo} style={styles.logo} />
            <Card color={"#fff"}>
                <Text style={styles.title}>Olvidé mi contraseña</Text>
                <Input value={usuario} onChangeText={setUsuario} placeholder="Usuario" />
                <Input value={correo} onChangeText={setCorreo} placeholder="Correo electrónico" />

                <SubmitButton title="Verificar ahora" onPress={handleSubmit} />
                <Text style={styles.textOlvidoC} onPress={() => navigation.navigate("Login")}>
                    ¿Ir a inicio?
                </Text>
            </Card>
        </ImageBackground>
    );
};

// Estilos
const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 8,
        color: "#0057b5",
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        paddingTop: 43,
    },
    logo: {
        resizeMode: "contain",
        width: 100,
        height: 100,
        alignSelf: "center",
    },
    textOlvidoC: {
        display: "flex",
        width: "100%",
        justifyContent: "end",
        marginTop: 11,
        fontWeight: 600,
    },
});
