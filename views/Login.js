import { StyleSheet, Text, View, Button, TextInput, ImageBackground, Image } from "react-native";
import { useState } from "react";

import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { SubmitButton } from "../components/SubmitButton";
import { useTheme } from "../hooks/useTheme";

// Pantalla Login
export const Login = ({ navigation }) => {
    const { DarkMode, theme } = useTheme();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    
    // Imágenes
    const logo = require("../assets/logo.png");
    let wallpaper = DarkMode ? require("../assets/Wallpaper-oscuro.png") : require("../assets/Wallpaper.png");
    
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
            <Card color={DarkMode ? "#2e2e2eff" : "#fff"}>
                <Text style={theme.titleIS}>Iniciar Sesión</Text>
                <Input value={user} onChangeText={setUser} placeholder="Usuario" />
                <Input value={password} onChangeText={setPassword} placeholder="Contraseña" secureTextEntry={true} />
                <SubmitButton title="Iniciar Sesión" onPress={handleSubmit} />
                <Text
                    style={[styles.textOlvidoC, { color: DarkMode ? "#fff" : "#000" }]}
                    onPress={() => navigation.navigate("RecuperarPassword")}
                >
                    ¿Olvidaste tu contraseña?
                </Text>
            </Card>
        </ImageBackground>
    );
};

// Estilos
const styles = StyleSheet.create({
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
