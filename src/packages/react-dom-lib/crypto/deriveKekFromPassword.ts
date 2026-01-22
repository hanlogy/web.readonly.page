import { textToBytes } from './helpers';
import type { DataAlgo, KeyBits } from './types';

const MIN_PBKDF2_ITERATIONS = 100_000;
const MAX_PBKDF2_ITERATIONS = 2_000_000;

/**
 * Derive a Key-Encryption Key (KEK) from a password using PBKDF2.
 *
 * Design note (important):
 * - In this module, we "wrap" the Data-Encryption Key (DEK) by encrypting the
 *   DEK's raw bytes with the KEK using AES-GCM (and "unwrap" by decrypting).
 * - Therefore the derived KEK must have usages: ["encrypt", "decrypt"].
 * - We intentionally do NOT use subtle.wrapKey()/unwrapKey() here, because
 *   those APIs require exporting the key being wrapped (DEK), which conflicts
 *   with keeping keys non-extractable by default.
 *
 * The returned KEK is meant only for protecting (wrapping) the DEK; it is NOT
 * used to encrypt application data directly.
 */
export async function deriveKekFromPassword({
  password,
  salt,
  iterations = 600_000,
  hash = 'SHA-256',
  kekAlgo = 'AES-GCM',
  keySizeBits = 256,
  extractable = false,
}: {
  password: string;
  salt: Uint8Array<ArrayBuffer>;
  iterations?: number;
  hash?: AlgorithmIdentifier;
  kekAlgo?: DataAlgo;
  keySizeBits?: KeyBits;
  extractable?: boolean;
}): Promise<CryptoKey> {
  const { subtle } = crypto;

  // Basic runtime validation for persisted/derived parameters
  if (!Number.isInteger(iterations) || iterations <= 0) {
    throw new Error(
      `iterations must be a positive integer (got ${iterations}).`
    );
  }
  if (
    iterations < MIN_PBKDF2_ITERATIONS ||
    iterations > MAX_PBKDF2_ITERATIONS
  ) {
    throw new Error(
      `iterations must be between ${MIN_PBKDF2_ITERATIONS} and 
      ${MAX_PBKDF2_ITERATIONS} (got ${iterations}).`
    );
  }
  if (salt.byteLength < 16) {
    throw new Error(`salt must be at least 16 bytes (got ${salt.byteLength}).`);
  }

  const hashName = typeof hash === 'string' ? hash : hash?.name;

  if (hashName !== 'SHA-256') {
    throw new Error(`hash must be SHA-256 (got ${String(hashName)}).`);
  }
  if (kekAlgo !== 'AES-GCM') {
    throw new Error(`kekAlgo must be AES-GCM (got ${String(kekAlgo)}).`);
  }
  if (keySizeBits !== 256) {
    throw new Error(`keySizeBits must be 256 (got ${String(keySizeBits)}).`);
  }

  // To avoid visually-identical passwords producing different keys
  const normalizedPassword = password.normalize('NFKC');

  const keyMaterial = await subtle.importKey(
    'raw',
    textToBytes(normalizedPassword),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash },
    keyMaterial,
    { name: kekAlgo, length: keySizeBits },
    extractable,
    ['encrypt', 'decrypt']
  );
}
