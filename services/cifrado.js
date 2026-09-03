import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import { RSA } from "react-native-rsa-native";
import CryptoJS from "crypto-js";

const publicKeyAsset = require("../keys/public.key");
// variable a nivel de módulo, sirve como caché en memoria,
let LOGIN_PUBLIC_KEY_PEM = null;

const privateKeyAsset = require("../keys/encrypt_private.key");
let PRIVATE_KEY_PEM = null;

// descifrar llave
async function cargarLlavePrivada() {
    if (PRIVATE_KEY_PEM) return PRIVATE_KEY_PEM; // ya está en memoria, no releer

    const asset = Asset.fromModule(privateKeyAsset); // esto es la froma en colo lo llama react-native 
    await asset.downloadAsync();// verifica q existe 

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
    // convierte esos bytes descifrados de vuelta a texto legible
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// cifrar llave
async function cargarLlavePublicaLogin() {
    if (LOGIN_PUBLIC_KEY_PEM) return LOGIN_PUBLIC_KEY_PEM; // no releer contenido de la llave
    const asset = Asset.fromModule(publicKeyAsset);
    await asset.downloadAsync(); // asegura que el archivo esté disponible en el filesystem del dispositivo
    // lee el contenido como texto
    LOGIN_PUBLIC_KEY_PEM = await FileSystem.readAsStringAsync(asset.localUri);
    return LOGIN_PUBLIC_KEY_PEM;
}

export async function cifrarPeticion(data) {
    const clavePublica = await cargarLlavePublicaLogin();

    //Generar clave AES + IV aleatorios
    const claveAES = CryptoJS.lib.WordArray.random(32); //clave nueva, aleatoria de 32 bytes (256 bits)
    const iv = CryptoJS.lib.WordArray.random(16); //vector de inicialización, también aleatorio d 128 bits

    // Cifrar el JSON real con AES
    const jsonData = JSON.stringify(data);
    const datosCifrados = CryptoJS.AES.encrypt(jsonData, claveAES, { iv: iv, mode: CryptoJS.mode.CBC }).ciphertext;

    // Cifrar la clave AES (en base64) con la llave pública RSA
    const claveAESBase64 = CryptoJS.enc.Base64.stringify(claveAES);
    const claveAESCifrada = await RSA.encrypt(claveAESBase64, clavePublica);

    return {
        data: CryptoJS.enc.Base64.stringify(datosCifrados),
        key: claveAESCifrada, // RSA.encrypt ya devuelve base64
        iv: CryptoJS.enc.Base64.stringify(iv),
    };
}
