import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import { RSA } from "react-native-rsa-native";
import CryptoJS from "crypto-js";

const privateKeyAsset = require("../private/encrypt_private.key");

let PRIVATE_KEY_PEM = null;

export async function cargarLlavePrivada() {
    if (PRIVATE_KEY_PEM) return PRIVATE_KEY_PEM; // ya está en memoria, no releer

    const asset = Asset.fromModule(privateKeyAsset);
    await asset.downloadAsync();

    PRIVATE_KEY_PEM = await FileSystem.readAsStringAsync(asset.localUri);
    return PRIVATE_KEY_PEM;
}

export async function descifrarRespuesta(payload) {
    const clavePrivada = await cargarLlavePrivada();

    const claveAESBase64 = await RSA.decrypt(payload.key, clavePrivada);

    const claveAES = CryptoJS.enc.Base64.parse(claveAESBase64);
    const iv = CryptoJS.enc.Base64.parse(payload.iv);
    const datosCifrados = CryptoJS.enc.Base64.parse(payload.data);

    const bytes = CryptoJS.AES.decrypt({ ciphertext: datosCifrados }, claveAES, { iv: iv, mode: CryptoJS.mode.CBC });

    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
