import { StyleSheet, Text, TextInput, ImageBackground, Image } from "react-native";
import { useState } from "react";

import { Card } from "../components/Card";
import { SubmitButton } from "../components/SubmitButton";
import { Input } from "../components/Input";
import { useTheme } from "../hooks/useTheme";
// Imágenes
const logo = require("../assets/logo.png");
const wallpaperOscuro = require("../assets/Wallpaper-oscuro.png");
const wallpaperClaro = require("../assets/Wallpaper.png");


// Pantalla
export function RecuperarPassword({ navigation }) {
    const { DarkMode, theme } = useTheme();
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    
    let wallpaper = DarkMode ? wallpaperOscuro : wallpaperClaro;
    
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
            <Card color={DarkMode ? "#2e2e2eff" : "#fff"}>
                <Text style={theme.titleIS}>Olvidé mi contraseña</Text>
                <Input value={usuario} onChangeText={setUsuario} placeholder="Usuario" />
                <Input value={correo} onChangeText={setCorreo} placeholder="Correo electrónico" />

                <SubmitButton title="Verificar ahora" onPress={handleSubmit} />
                <Text style={[styles.textOlvidoC, { color: DarkMode ? "#fff" : "#000" }]} onPress={() => navigation.navigate("Login")}>
                    ¿Ir a inicio?
                </Text>
            </Card>
        </ImageBackground>
    );
}

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
