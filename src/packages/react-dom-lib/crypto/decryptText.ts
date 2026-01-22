import { decryptBytes } from './decryptBytes';
import { bytesToText } from './helpers';
import type { EncryptedPayload } from './types';

export async function decryptText({
  dek,
  payload,
  aad,
}: {
  dek: CryptoKey;
  payload: EncryptedPayload;
  aad?: Uint8Array<ArrayBuffer>;
}): Promise<string> {
  const plaintext = await decryptBytes({
    dek,
    data: payload.ciphertext,
    iv: payload.iv,
    aad,
    algo: payload.algo,
    tagBits: payload.tagBits,
  });

  return bytesToText(plaintext);
}
