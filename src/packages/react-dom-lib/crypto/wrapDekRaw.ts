import { buildAesGcmParams, createRandomIv12 } from './helpers';
import type { DataAlgo, TagBits } from './types';

/**
 * Wrap DEK raw bytes with KEK using AES-GCM (envelope encryption primitive)
 */
export async function wrapDekRaw({
  kek,
  dekRaw,
  aad,
  algo = 'AES-GCM',
  tagBits = 128,
}: {
  kek: CryptoKey;
  dekRaw: Uint8Array<ArrayBuffer>;
  aad?: Uint8Array<ArrayBuffer>;
  algo?: DataAlgo;
  tagBits?: TagBits;
}): Promise<{ wrappedDek: Uint8Array; wrapIv: Uint8Array<ArrayBuffer> }> {
  if (algo !== 'AES-GCM') {
    throw new Error(`algo must be AES-GCM (got ${String(algo)}).`);
  }

  if (tagBits !== 128) {
    throw new Error(`tagBits must be 128 (got ${String(tagBits)}).`);
  }

  const iv = createRandomIv12();
  const wrappedBuf = await crypto.subtle.encrypt(
    buildAesGcmParams({ algo, iv, tagBits, aad }),
    kek,
    dekRaw
  );

  return { wrappedDek: new Uint8Array(wrappedBuf), wrapIv: iv };
}
