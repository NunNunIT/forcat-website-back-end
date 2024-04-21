import nacl from "tweetnacl";

const publicKey = Buffer.from(
  process.env.TWEETNACL_PUBLIC_KEY_BASE64,
  "base64"
);
const secretKey = Buffer.from(
  process.env.TWEETNACL_SECRET_KEY_BASE64,
  "base64"
);

const encryptData = (data) => {
  const nonce = new Uint8Array(nacl.box.nonceLength);

  // Encode data as UTF-8 before encryption
  const encodedData = Buffer.from(data, "utf-8");

  // Encrypt the data
  const encryptedData = nacl.box(encodedData, nonce, publicKey, secretKey);

  // Convert the encrypted data to base64 for string representation
  const base64Encoded = Buffer.from(encryptedData).toString("base64");

  // Change special letter
  const encryptedString = encodeURIComponent(base64Encoded)
    .replaceAll("%21", "!")
    .replaceAll("%27", "'")
    .replaceAll("%28", "(")
    .replaceAll("%29", ")")
    .replaceAll("%2A", "*");

  return encryptedString;
};

const decryptData = (encryptedData) => {
  const nonce = new Uint8Array(nacl.box.nonceLength);

  // Decode the base64 encoded string back to a Uint8Array
  const decodedData = Buffer.from(encryptedData, "base64");

  // Perform decryption using nacl.box.open
  const decryptedData = nacl.box.open(decodedData, nonce, publicKey, secretKey);

  // Convert the decrypted data back to a string (assuming UTF-8 encoding)
  const decryptedString = Buffer.from(decryptedData).toString("utf-8");

  return decryptedString;
};

export { encryptData, decryptData };
