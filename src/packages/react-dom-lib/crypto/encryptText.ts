import { encryptBytes } from './encryptBytes';
import { textToBytes } from './helpers';
import type { DataAlgo, EncryptedPayload, TagBits } from './types';

export async function encryptText({
  dek,
  text,
  aad,
  tagBits = 128,
  algo = 'AES-GCM',
}: {
  dek: CryptoKey;
  text: string;
  aad?: Uint8Array<ArrayBuffer>;
  tagBits?: TagBits;
  algo?: DataAlgo;
}): Promise<EncryptedPayload> {
  const { ciphertext, dataIv } = await encryptBytes({
    dek,
    data: textToBytes(text),
    aad,
    algo,
    tagBits,
  });

  return {
    algo,
    tagBits,
    iv: dataIv,
    ciphertext,
  };
}
