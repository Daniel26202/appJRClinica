import { StyleSheet, Text, ImageBackground, Image } from "react-native";
import { useState } from "react";

import { Navigation } from "./navigation/navigation";
import { ThemeCont } from "./hooks/useTheme"; 

export default function App() {

    return (
        <ThemeCont>
            <Navigation />
        </ThemeCont>
    );
}
