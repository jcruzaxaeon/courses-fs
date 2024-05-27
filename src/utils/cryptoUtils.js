

//  client\src\utils\cryptoUtils.js

import Cookies from 'js-cookie';

/**
 * ## `arrayBufferToBase64`
 * Convert `BufferSource` (e.g. ArrayBuffer, Uint8Array) raw binary data to a Base-64 encoded string
 * - See `### Reference`-section at end-of-file
 * 
 * ### Motivation
 * - Web Crypto API requires `{BufferSource}`-types for most operations 
 * - Cookie-storage requires Base-64 encoding
 * 
 * ### Conversions
 * 1. `{BufferSource}`
 * 2. `{Uint8Array}`
 * 3. `{string}`: Standard JavaScript
 *    - Technically: UTF-16, (0x0 - 65535/0xFFFF) Unicode
 *    - Practically limited to (0x0 - 255/0xFF)
 *    - 0-255 considered (ASCII Extended | ISO/IEC-8859-1 / Latin-1) subset of Unicode
 * 4. `{string_base64}`
 * 
 * ### Type Descriptions
 * - `{Uint8Array}`: an array of integers (0-255) representing 1-byte
 *    - Each (element / integer) represents: 1-byte, 2-hex, 8-bits
 *    - Can be encoded into JavaScript-characters using `String.fromCharCode()` (Unicode)
 * 
 * ### `bytes`: {Uint8Array}
 * - Created only for the purpose of loop-building `binary` {string} that `.btoa()` can process 
 * 
 * ### `String.fromCharCode()`
 * - Input Parameter: {integer} (0-65535/0xFFFF, 2-byte, 4-hex, 16-bits)
 *    - Integer range corresponds to Basic Multilingual Plane (BMP) of Unicode
 *    - Comma-delimited series of Unicode code-points
 *    - Interpreted as a (2-btye, 4-hex, 16-bit) UTF-16 code unit
 *    - However, since `bytes` is a `{Uint8Array}`, each element is practically (8-bits, 1-hex)
 *    - And the upper `byte[i]` does not exist
 *    - So input-upper-byte argument === 0x00
 *    - Practical input range is 0-255 = Latin-1
 *       - Depending on JavaScript ENVIRONMENT
 * - Returns: JavaScript string-character (practically Latin-1 encoded)
 *    - Each character *technically* represents 2-bytes
 *    - However, since each character's input is in 0-255 range
 *    - Each character *practically* represents 1-byte of original raw binary data
 * 
 * ### `binary`
 * - a {string} of JavaScript string-characters (Latin-1 encoded)
 * - Each character represents 1-byte of the original data
 * - Since the range of values is 0-255 due to the natural input range of {Uint8Array}-elements
 * - Upper byte was 0x0000 when {Uint8Array} integer was input to `.fromCharCode()`
 * 
 * ### `window.btoa()`
 * - Input: JavaScript {string} characters (Latin-1)
 *    - Default JavaScript string encoding (Latin-1 for Browser, Node.js) depends on ENVIRONMENT
 *    - "string"-argument is 1-byte/character raw binary data per (Unicode / Latin-1)
 * - Output: Base-64 ASCII encoded string representing original {`BufferSource`} input-binary
 * 
 * ### Reference
 * - `BufferSource`: `{ArrayBuffer}` or Typed-array (e.g. `{Uint8Array}`)
 * - Typed-array: ArrayBuffer-view (e.g. {Uint8Array} 8-bit unsigned-integer Typed-array)
 * - view: an {object} needed to (view, manipulate) an ArrayBuffer; does not store data on its own
 * - Base-64 Encoding: raw binary data in 6-bit groups encoded using 64 ASCII characters
 *    - (A-Z, a-z, 0-9, +, /, =)
 *    - Only 64 characters plus a padding character
 *    - Used to encode binary data as text "safe" for internet transfer, storage
 * - Unicode: assigns a unique (codepoint / number {int/hex}) to "every" character 
 * - UTF-16: Unicode Transformation Format encoding scheme using 16-bit code units
 *    - code unit: unit of binary data used to represent a character's code point
 * - The first 256 (0-255) Unicode code-points / characters considered "Latin-1"
 * - Note: Latin-1 is direct text encoding, Base-64 is binary data encoded as "safe"-text
 * 
 * @param {BufferSource} buffer - Raw binary data (e.g. {`ArrayBuffer` | `Uint8Array`})
 * @returns {string_base64} Base64-encoded string representing raw binary data
 */
export function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer); // raw binary buffer > bytes[] (0-255)
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary); // input interpereted as Latin-1
}

/**
 * ## `base64ToArrayBuffer`
 * Convert a a Base-64 encoded string to an `ArrayBuffer` raw binary data.
 * 
 * ### Conversions
 * 1. `{string_base64}` - Base-64 ASCII encoding
 * 2. `{string}`: Standard JavaScript (UTF-16)
 *    - Assuming original data was {Uint8Array}
 *    - Implies that this string is practically Latin-1 UTF-8
 * 3. `{Uint8Array}
 * 4. Return {ArrayBuffer}, `{Uint8Array}`.buffer
 * 
 * @param {string_base64} base64 
 * @returns {BufferSource}
 */
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

/**
 * ## getPassword()
 * Retrieves and decrypts the password stored in cookie
 * 
 * @async
 * @function getPassword
 * @returns {string | null} decryptedPass
 */
export async function getPassword() {
    const authDataString = Cookies.get('authData');
    const authData = authDataString ? JSON.parse(authDataString) : null;

    if (authData) {
        const secretKeyHex = process.env.REACT_APP_SECRET_KEY_HEX;
        const secretKeyUint8 = new Uint8Array(
            secretKeyHex.match(/.{2}/g)
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
        const cipher = base64ToArrayBuffer(authData.cipherBase64);

        const decrypted = await window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            cipher
        );
        const decoder = new TextDecoder();
        const decryptedPass = decoder.decode(decrypted);
        return decryptedPass;
    }
    return null;
}

/*
## Reference

### Typed-arrays
- Uint8Array: Represents an array of 8-bit unsigned integers.
- Int8Array: Represents an array of 8-bit signed integers.
- Uint16Array: Represents an array of 16-bit unsigned integers.
- Int16Array: Represents an array of 16-bit signed integers.
- Uint32Array: Represents an array of 32-bit unsigned integers.
- Int32Array: Represents an array of 32-bit signed integers.
- Float32Array: Represents an array of 32-bit floating-point numbers.
- Float64Array: Represents an array of 64-bit floating-point numbers.
```
(Typed-array / ArrayBuffer-view) List: Uint8Array, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, Float32Array, Float64Array
```
*/