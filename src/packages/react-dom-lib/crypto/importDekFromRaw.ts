import type { DataAlgo, KeyBits } from './types';

export async function importDekFromRaw({
  dekRaw,
  keySizeBits = 256,
  extractable = false,
  algo = 'AES-GCM',
}: {
  // length must match keySizeBits/8 (default 32 bytes)
  dekRaw: Uint8Array<ArrayBuffer>;
  keySizeBits?: KeyBits;
  extractable?: boolean;
  algo?: DataAlgo;
}): Promise<CryptoKey> {
  const expected = keySizeBits / 8;

  if (dekRaw.byteLength !== expected) {
    throw new Error(
      `DEK must be ${expected} bytes (got ${dekRaw.byteLength}).`
    );
  }

  return crypto.subtle.importKey(
    'raw',
    dekRaw,
    { name: algo, length: keySizeBits },
    extractable,
    ['encrypt', 'decrypt']
  );
}
