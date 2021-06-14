import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import * as firebase from "firebase";
import AppLoading from "expo-app-loading";
import {
    useFonts as useOswald,
    Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { Navigation } from "./src/infrastructure/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
const firebaseConfig = {
    apiKey: "AIzaSyARxKybGqpOgaCm9tEV7h2YLNPkx1BqF1Q",
    authDomain: "mealstogo-3eebf.firebaseapp.com",
    projectId: "mealstogo-3eebf",
    storageBucket: "mealstogo-3eebf.appspot.com",
    messagingSenderId: "683488266337",
    appId: "1:683488266337:web:3579d29dd8154435bf4220",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default function App() {
    const [oswaldLoaded] = useOswald({
        Oswald_400Regular,
    });
    const [latoLoaded] = useLato({
        Lato_400Regular,
    });
    if (!oswaldLoaded || !latoLoaded) {
        return <AppLoading />;
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <AuthenticationContextProvider>
                    <Navigation />
                </AuthenticationContextProvider>
            </ThemeProvider>
        </>
    );
}
