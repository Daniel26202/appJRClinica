// hooks/useNavigation.js
import { useNavigation } from "@react-navigation/native";

export function useAppNavigation() {
    const navigation = useNavigation();

    return {
        // Navegación del Drawer
        openDrawer: () => navigation.toggleDrawer(),
        closeDrawer: () => navigation.closeDrawer(),

        // Navegación entre screens
        navigateTo: (screen, params) => navigation.navigate(screen, params),
        goBack: () => navigation.goBack(),

        // Navegación específica del Drawer
        goToProfile: () => navigation.navigate("Perfil"),
        goToSettings: () => navigation.navigate("Configuración"),
        goToHome: () => navigation.navigate("Inicio"),

        // Navegación del Stack principal
        goToLogin: () => navigation.navigate("Login"),
        goToRecoverPassword: () => navigation.navigate("RecuperarPassword"),
    };
}
