import { StyleSheet, Text, View, Button, TextInput, ImageBackground, Image } from "react-native";
import { useState } from "react";

import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { SubmitButton } from "../components/SubmitButton";

// Imágenes
const wallpaper = require("../assets/Wallpaper.png");
const logo = require("../assets/logo.png");

// Pantalla Login
export const Login = ({ navigation }) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        if (user === "" && password === "") {
            navigation.navigate("Main");
        } else {
            alert("Fallo");
        }
    };

    return (
        <ImageBackground source={wallpaper} style={styles.background} resizeMode="cover">
            <Image source={logo} style={styles.logo} />
            <Card color={"#fff"}>
                <Text style={styles.title}>Iniciar Sesión</Text>
                <Input value={user} onChangeText={setUser} placeholder="Usuario" />
                <Input value={password} onChangeText={setPassword} placeholder="Contraseña" secureTextEntry={true} />
                <SubmitButton title="Iniciar Sesión" onPress={handleSubmit} />
                <Text style={styles.textOlvidoC} onPress={() => navigation.navigate("RecuperarPassword")}>
                    ¿Olvidaste tu contraseña?
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
