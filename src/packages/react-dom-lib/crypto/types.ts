// Currently single-choice for cross-browser WebCrypto compatibility.
// If we add more (e.g. different KDFs/ciphers), we'll do it via header
// versioning and keep old values supported for migration.
export type DataAlgo = 'AES-GCM';
export type HashAlgo = 'SHA-256';
export type KdfName = 'PBKDF2';
export type TagBits = 128;
export type KeyBits = 256;

export interface EncryptedPayload {
  algo: DataAlgo;
  tagBits: 128;
  iv: Uint8Array<ArrayBuffer>;
  ciphertext: Uint8Array<ArrayBuffer>;
}

interface VaultHeaderV1 {
  version: number;
  vaultId?: Uint8Array<ArrayBuffer>;

  kdf: {
    name: KdfName;
    hash: HashAlgo;
    iterations: number;
    salt: Uint8Array<ArrayBuffer>;
  };

  wrappedDek: {
    algo: DataAlgo;
    keySizeBits: KeyBits;
    tagBits: TagBits;
    iv: Uint8Array<ArrayBuffer>;
    wrappedKey: Uint8Array<ArrayBuffer>;
  };
}

export type VaultHeader = VaultHeaderV1;
