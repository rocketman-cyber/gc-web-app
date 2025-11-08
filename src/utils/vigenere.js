// utils/vigenere.js
export function vigenereDecrypt(ciphertext, key) {
    const result = [];
    key = key.toUpperCase().replace(/[^A-Z]/g, ""); // clean key
    if (!key) return ciphertext; // no key, return as is

    let keyIndex = 0;

    for (let char of ciphertext) {
        const code = char.charCodeAt(0);

        if (char.match(/[A-Z]/i)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 65 : 97;
            const charCode = code - base;

            // Key character
            const keyChar = key[keyIndex % key.length];
            const keyShift = keyChar.charCodeAt(0) - 65;

            // Decrypt
            const decryptedChar = String.fromCharCode(
                ((charCode - keyShift + 26) % 26) + base
            );

            result.push(decryptedChar);
            keyIndex++;
        } else {
            // Keep non-alphabetic chars unchanged
            result.push(char);
        }
    }

    return result.join("");
  }
  