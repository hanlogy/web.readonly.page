import { assertAesGcmIv, buildAesGcmParams } from './helpers';
import type { DataAlgo, TagBits } from './types';

/**
 * Unwrap DEK raw bytes with KEK using AES-GCM (envelope encryption primitive)
 */
export async function unwrapDekRaw({
  kek,
  wrappedDek,
  wrapIv,
  aad,
  algo = 'AES-GCM',
  tagBits = 128,
}: {
  kek: CryptoKey;
  wrappedDek: Uint8Array<ArrayBuffer>;
  wrapIv: Uint8Array<ArrayBuffer>;
  aad?: Uint8Array<ArrayBuffer>;
  algo?: DataAlgo;
  tagBits?: TagBits;
}): Promise<Uint8Array<ArrayBuffer>> {
  assertAesGcmIv(wrapIv, 'wrapIv');

  if (algo !== 'AES-GCM') {
    throw new Error(`algo must be AES-GCM (got ${String(algo)}).`);
  }

  if (tagBits !== 128) {
    throw new Error(`tagBits must be 128 (got ${String(tagBits)}).`);
  }

  if (wrappedDek.byteLength === 0) {
    throw new Error('wrappedDek must not be empty.');
  }

  const dekBuffer = await crypto.subtle.decrypt(
    buildAesGcmParams({ algo, iv: wrapIv, tagBits, aad }),
    kek,
    wrappedDek
  );

  return new Uint8Array(dekBuffer);
}
