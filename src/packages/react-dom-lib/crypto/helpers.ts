const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export function textToBytes(text: string): Uint8Array<ArrayBuffer> {
  return textEncoder.encode(text);
}

export function bytesToText(bytes: Uint8Array): string {
  return textDecoder.decode(bytes);
}

export function createRandomBytes(size: number): Uint8Array<ArrayBuffer> {
  return crypto.getRandomValues(new Uint8Array(size));
}

// AES-GCM requires a unique nonce/IV per key; we enforce the recommended
// 12-byte IV.
export const AES_GCM_IV_BYTES = 12;

// Runtime guardrail for AES-GCM IV length (prevents non-standard IVs).
export function assertAesGcmIv(iv: Uint8Array, label = 'iv'): void {
  if (iv.byteLength !== AES_GCM_IV_BYTES) {
    throw new Error(
      `${label} must be ${AES_GCM_IV_BYTES} bytes for AES-GCM (got ${iv.byteLength}).`
    );
  }
}

// Convenience helper so callers don't have to manage AES-GCM IV generation.
export function createRandomIv12(): Uint8Array<ArrayBuffer> {
  return createRandomBytes(AES_GCM_IV_BYTES);
}

export function createRandomSalt(size: number = 16): Uint8Array<ArrayBuffer> {
  return createRandomBytes(size);
}

export function createRandomDek(
  size: number = 256 / 8
): Uint8Array<ArrayBuffer> {
  return createRandomBytes(size);
}

export function buildAesGcmParams({
  algo,
  iv,
  tagBits,
  aad,
}: {
  algo: 'AES-GCM';
  iv: Uint8Array<ArrayBuffer>;
  tagBits: 128;
  aad?: Uint8Array<ArrayBuffer>;
}): AesGcmParams {
  const params: AesGcmParams = { name: algo, iv, tagLength: tagBits };
  if (aad && aad.byteLength > 0) {
    params.additionalData = aad;
  }
  return params;
}
