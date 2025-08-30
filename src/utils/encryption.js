
import CryptoJS from "crypto-js";

const SECRET = import.meta.env.VITE_SECRET_KEY || "default-secret-key";

const deriveKey = (secret) => CryptoJS.SHA256(secret);

export const setEncryptedData = (key, value) => {
  try {
    const plaintext = JSON.stringify(value);

    const keyHash = deriveKey(SECRET);
    const iv = CryptoJS.lib.WordArray.random(16);
    
    const ciphertext = CryptoJS.AES.encrypt(plaintext, keyHash, { iv }).toString();
    const ivHex = iv.toString(CryptoJS.enc.Hex);

    const tag = CryptoJS.HmacSHA256(ivHex + ciphertext, SECRET).toString(CryptoJS.enc.Hex);

    const payload = JSON.stringify({ v: ciphertext, iv: ivHex, tag });
    localStorage.setItem(key, payload);
  } catch (err) {
    console.error("setEncryptedData error:", err);
  }
};


export const getDecryptedData = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const { v: ciphertext, iv: ivHex, tag } = JSON.parse(raw);

    // verify HMAC
    const expected = CryptoJS.HmacSHA256(ivHex + ciphertext, SECRET).toString(CryptoJS.enc.Hex);
    if (expected !== tag) {
      console.warn("Encrypted payload integrity check failed.");
      return null;
    }

    const keyHash = deriveKey(SECRET);
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const bytes = CryptoJS.AES.decrypt(ciphertext, keyHash, { iv });
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    if (!plaintext) return null;

    return JSON.parse(plaintext);
  } catch (err) {
    console.error("getDecryptedData error:", err);
    return null;
  }
};

export const removeData = (key) => localStorage.removeItem(key);
export const clearStorage = () => localStorage.clear();
