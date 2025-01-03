// crypto-utils.ts
// interface EncryptionResult {
//   iv: string;
//   encryptedPassword: string;
// }

// export class CryptoUtils {
//   private static readonly ALGORITHM = "AES-CBC";
//   private static readonly KEY_LENGTH = 256;

//   private static async getSecretKey(
//     secretKeyValue: string
//   ): Promise<CryptoKey> {
//     // Ensure the key is exactly 32 bytes (256 bits) by using SHA-256
//     const encoder = new TextEncoder();
//     const keyData = encoder.encode(secretKeyValue);
//     const hashBuffer = await crypto.subtle.digest("SHA-256", keyData);

//     // Import the hash as an AES-CBC key
//     return await crypto.subtle.importKey("raw", hashBuffer, "AES-CBC", false, [
//       "encrypt",
//       "decrypt",
//     ]);
//   }

//   static async encrypt(
//     userPass: string,
//     secretKeyValue: string
//   ): Promise<EncryptionResult> {
//     try {
//       const key = await this.getSecretKey(secretKeyValue);
//       const iv = crypto.getRandomValues(new Uint8Array(16));
//       const ivString = Array.from(iv)
//         .map((b) => b.toString(16).padStart(2, "0"))
//         .join("")
//         .slice(0, 16);

//       const data = new TextEncoder().encode(userPass);
//       const encryptedData = await crypto.subtle.encrypt(
//         {
//           name: "AES-CBC",
//           iv,
//         },
//         key,
//         data
//       );

//       // Convert ArrayBuffer to base64 string
//       const encryptedArray = Array.from(new Uint8Array(encryptedData));
//       const encryptedPassword = btoa(
//         String.fromCharCode.apply(null, encryptedArray)
//       );

//       return {
//         iv: ivString,
//         encryptedPassword,
//       };
//     } catch (error) {
//       throw new Error(
//         `Encryption failed: ${error instanceof Error ? error.message : "Unknown error"}`
//       );
//     }
//   }

//   static async decrypt(
//     encrypted: string,
//     ivString: string,
//     secretKeyValue: string
//   ): Promise<string> {
//     try {
//       const key = await this.getSecretKey(secretKeyValue);
//       const iv = new Uint8Array(
//         ivString.match(/.{2}/g)?.map((byte) => parseInt(byte, 16)) || []
//       );

//       // Convert base64 string back to ArrayBuffer
//       const binaryString = atob(encrypted);
//       const encryptedData = new Uint8Array(binaryString.length);
//       for (let i = 0; i < binaryString.length; i++) {
//         encryptedData[i] = binaryString.charCodeAt(i);
//       }

//       const decryptedData = await crypto.subtle.decrypt(
//         {
//           name: "AES-CBC",
//           iv,
//         },
//         key,
//         encryptedData
//       );

//       return new TextDecoder().decode(decryptedData);
//     } catch (error) {
//       throw new Error(
//         `Decryption failed: ${error instanceof Error ? error.message : "Unknown error"}`
//       );
//     }
//   }
// }

"use node";
import * as crypto from 'crypto';

interface EncryptionResult {
    iv: string;
    encryptedPassword: string;
}

/**
 * Encrypts a user password using AES-256-CBC encryption
 * @param userPass - The password to encrypt
 * @returns An object containing the IV and encrypted password
 */
export const encrypt = (userPass: string): EncryptionResult => {
    // Creating an IV (Initialization Vector for decryption)
    const iv: Buffer = Buffer.from(crypto.randomBytes(16));
    const ivstring: string = iv.toString('hex').slice(0, 16);

    // Ensure CRYPTO_SECRET_KEY exists in environment variables
    const secretKey = process.env.CRYPTO_SECRET_KEY;
    if (!secretKey) {
        throw new Error('CRYPTO_SECRET_KEY is not defined in environment variables');
    }

    // Creating a cipher for encryption
    const cipher = crypto.createCipheriv(
        'aes-256-cbc', 
        Buffer.from(secretKey), 
        ivstring
    );

    // Encrypt the password
    cipher.update(userPass, 'utf8', 'base64');
    const bufferEncryptedPassword: string = cipher.final('base64');

    return {
        iv: ivstring,
        encryptedPassword: bufferEncryptedPassword
    };
};