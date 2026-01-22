import { buildAesGcmParams, createRandomIv12 } from './helpers';
import type { DataAlgo, TagBits } from './types';

/**
 * Data encrypt
 */
export async function encryptBytes({
  dek,
  data,
  aad,
  tagBits = 128,
  algo = 'AES-GCM',
}: {
  dek: CryptoKey;
  data: Uint8Array<ArrayBuffer>;
  aad?: Uint8Array<ArrayBuffer>;
  tagBits?: TagBits;
  algo?: DataAlgo;
}): Promise<{
  ciphertext: Uint8Array<ArrayBuffer>;
  dataIv: Uint8Array<ArrayBuffer>;
}> {
  const iv = createRandomIv12();

  const ciphertextBuffer = await crypto.subtle.encrypt(
    buildAesGcmParams({ algo, iv, tagBits, aad }),
    dek,
    data
  );

  return { ciphertext: new Uint8Array(ciphertextBuffer), dataIv: iv };
}
