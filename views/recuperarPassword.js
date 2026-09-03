import { StyleSheet, Text, ImageBackground, Image, Alert } from "react-native";
import { Card } from "../components/Card";
import { SubmitButton } from "../components/SubmitButton";
import { Input } from "../components/Input";
import { useTheme } from "../hooks/useTheme";
import { useRecuperarPassword } from "../hooks/useRecuperarPassword";

const logo = require("../assets/logo.png");
const wallpaperOscuro = require("../assets/Wallpaper-oscuro.png");
const wallpaperClaro = require("../assets/Wallpaper.png");

export function RecuperarPassword({ navigation }) {
    const { DarkMode, theme } = useTheme();
    const {
        paso,
        cargando,
        usuario,
        setUsuario,
        correo,
        setCorreo,
        codigo,
        setCodigo,
        passwordNew,
        setPasswordNew,
        passwordConf,
        setPasswordConf,
        segundosRestantes,
        formatearTiempo,
        solicitarCodigo,
        reenviarCodigo,
        verificarCodigo,
        cambiarPassword,
    } = useRecuperarPassword(navigation);

    const wallpaper = DarkMode ? wallpaperOscuro : wallpaperClaro;

    const manejarSolicitar = async () => {
        const res = await solicitarCodigo();
        if (res.ok) Alert.alert("Código enviado", "Revisa tu correo, el código expira en 5 minutos.");
        else Alert.alert("Error", res.error);
    };

    const manejarReenviar = async () => {
        const res = await reenviarCodigo();
        if (res.ok) Alert.alert("Código reenviado", "Revisa tu correo nuevamente.");
        else Alert.alert("Error", res.error);
    };

    const manejarVerificar = async () => {
        const res = await verificarCodigo();
        if (!res.ok) Alert.alert("Error", res.error);
    };

    const manejarCambiar = async () => {
        const res = await cambiarPassword();
        if (res.ok) Alert.alert("Listo", "Tu contraseña fue actualizada. Inicia sesión de nuevo.");
        else Alert.alert("Error", res.error);
    };

    return (
        <ImageBackground source={wallpaper} style={styles.background} resizeMode="cover">
            <Image source={logo} style={styles.logo} />
            <Card color={DarkMode ? "#2e2e2eff" : "#fff"}>
                {paso === "datos" && (
                    <>
                        <Text style={theme.titleIS}>Olvidé mi contraseña</Text>
                        <Input value={usuario} onChangeText={setUsuario} placeholder="Usuario" />
                        <Input value={correo} onChangeText={setCorreo} placeholder="Correo electrónico" />
                        <SubmitButton
                            title={cargando ? "Enviando..." : "Verificar ahora"}
                            onPress={manejarSolicitar}
                            disabled={cargando}
                        />
                    </>
                )}

                {paso === "codigo" && (
                    <>
                        <Text style={theme.titleIS}>Ingresa el código</Text>
                        <Text
                            style={{
                                textAlign: "center",
                                marginBottom: 10,
                                color: segundosRestantes === 0 ? "#e74c3c" : DarkMode ? "#fff" : "#000",
                            }}
                        >
                            {segundosRestantes > 0 ? `Expira en: ${formatearTiempo(segundosRestantes)}` : "El código ha expirado"}
                        </Text>
                        <Input value={codigo} onChangeText={setCodigo} placeholder="Código de 6 dígitos" />
                        <SubmitButton
                            title={cargando ? "Verificando..." : "Confirmar código"}
                            onPress={manejarVerificar}
                            disabled={cargando || segundosRestantes === 0}
                        />
                        {segundosRestantes === 0 && (
                            <SubmitButton
                                title={cargando ? "Reenviando..." : "Reenviar código"}
                                onPress={manejarReenviar}
                                disabled={cargando}
                            />
                        )}
                    </>
                )}

                {paso === "password" && (
                    <>
                        <Text style={theme.titleIS}>Nueva contraseña</Text>
                        <Input value={passwordNew} onChangeText={setPasswordNew} placeholder="Nueva contraseña" secureTextEntry />
                        <Input
                            value={passwordConf}
                            onChangeText={setPasswordConf}
                            placeholder="Confirmar contraseña"
                            secureTextEntry
                        />
                        <SubmitButton
                            title={cargando ? "Guardando..." : "Cambiar contraseña"}
                            onPress={manejarCambiar}
                            disabled={cargando}
                        />
                    </>
                )}

                <Text
                    style={[styles.textOlvidoC, { color: DarkMode ? "#fff" : "#000" }]}
                    onPress={() => navigation.navigate("Login")}
                >
                    ¿Ir a inicio?
                </Text>
            </Card>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, width: "100%", height: "100%", paddingTop: 43 },
    logo: { resizeMode: "contain", width: 100, height: 100, alignSelf: "center" },
    textOlvidoC: { display: "flex", width: "100%", justifyContent: "end", marginTop: 11, fontWeight: 600 },
});
