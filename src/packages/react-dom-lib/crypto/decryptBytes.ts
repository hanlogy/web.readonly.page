import { assertAesGcmIv, buildAesGcmParams } from './helpers';
import type { DataAlgo, TagBits } from './types';

export async function decryptBytes({
  dek,
  data: ciphertext,
  iv,
  aad,
  algo = 'AES-GCM',
  tagBits = 128,
}: {
  dek: CryptoKey;
  data: Uint8Array<ArrayBuffer>;
  iv: Uint8Array<ArrayBuffer>;
  aad?: Uint8Array<ArrayBuffer>;
  algo?: DataAlgo;
  tagBits?: TagBits;
}): Promise<Uint8Array> {
  const { subtle } = crypto;

  assertAesGcmIv(iv, 'iv');

  if (algo !== 'AES-GCM') {
    throw new Error(`algo must be AES-GCM (got ${String(algo)}).`);
  }

  if (tagBits !== 128) {
    throw new Error(`tagBits must be 128 (got ${String(tagBits)}).`);
  }

  const plaintextBuffer = await subtle.decrypt(
    buildAesGcmParams({ algo, iv, tagBits, aad }),
    dek,
    ciphertext
  );

  return new Uint8Array(plaintextBuffer);
}
