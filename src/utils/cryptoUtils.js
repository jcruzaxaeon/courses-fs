/////////////////////////////////////////////////////////////////////////////////////////////////
//  client\src\utils\cryptoUtils.js
/////////////////////////////////////////////////////////////////////////////////////////////////

import Cookies from 'js-cookie';

export function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export function base64ToArrayBuffer(base64) {
    if (base64) {
        let binary_string = window.atob(base64);
        let len = binary_string.length;
        let bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
}

export async function getPassword() {
    const authDataString = Cookies.get('authData');
    const authData = authDataString ? JSON.parse(authDataString) : null;

    if (authData) {
        const keyHex = process.env.REACT_APP_KEY_HEX;
        const secretKeyUint8 = new Uint8Array(
            keyHex.match(/.{2}/g)
                .map(byte => parseInt(byte, 16))
        );
        let key = await window.crypto.subtle.importKey(
            'raw',
            secretKeyUint8,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
        const iv = base64ToArrayBuffer(authData.ivBase64);
        // console.log("authDataX: ", authData);
        // console.log("cipherTextBase64: ", authData.cipherTextBase64);
        const cipher = base64ToArrayBuffer(authData.cipherTextBase64);
        // console.log("iv reconverted: ", iv);

        const decrypted = await window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            cipher
        );
        const decoder = new TextDecoder();
        const decryptedPass = decoder.decode(decrypted);
        return decryptedPass;
    }
    //return password;
}

// const secretKeyUint8Array = window.crypto.getRandomValues(new Uint8Array(32));

// // Convert the random bytes to a hexadecimal string
// let secretKeyHexStr = '';
// for (let i = 0; i < secretKeyUint8Array.length; i++) {
//     secretKeyHexStr += secretKeyUint8Array[i].toString(16).padStart(2, '0');
// }

// console.log('Secret Key:');
// console.log('Uint8 - ', secretKeyUint8Array);
// console.log('Hex - ', secretKeyHexStr);

