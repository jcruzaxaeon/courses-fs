/////////////////////////////////////////////////////////////////////////////////////////////////
//  client\src\utils\cryptoUtils.js
/////////////////////////////////////////////////////////////////////////////////////////////////

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
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
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

