import { assertAesGcmIv } from './helpers';
import type {
  DataAlgo,
  HashAlgo,
  KeyBits,
  TagBits,
  VaultHeader,
} from './types';

const MIN_PBKDF2_ITERATIONS = 100_000;
const MAX_PBKDF2_ITERATIONS = 2_000_000;

export function buildVaultHeader({
  version = 1,
  vaultId,
  salt,
  iterations,
  wrapIv,
  wrappedDek,
  hash = 'SHA-256',
  dataAlgo = 'AES-GCM',
  keySizeBits = 256,
  tagBits = 128,
}: {
  version?: number;
  vaultId?: Uint8Array<ArrayBuffer>;
  salt: Uint8Array<ArrayBuffer>;
  iterations: number;
  wrapIv: Uint8Array<ArrayBuffer>;
  wrappedDek: Uint8Array<ArrayBuffer>;
  hash?: HashAlgo;
  dataAlgo?: DataAlgo;
  keySizeBits?: KeyBits;
  tagBits?: TagBits;
}): VaultHeader {
  if (!Number.isInteger(version)) {
    throw new Error(`version must be an integer (got ${String(version)}).`);
  }

  if (hash !== 'SHA-256') {
    throw new Error(`hash must be SHA-256 (got ${String(hash)}).`);
  }

  if (dataAlgo !== 'AES-GCM') {
    throw new Error(`dataAlgo must be AES-GCM (got ${String(dataAlgo)}).`);
  }

  if (keySizeBits !== 256) {
    throw new Error(`keySizeBits must be 256 (got ${String(keySizeBits)}).`);
  }

  if (tagBits !== 128) {
    throw new Error(`tagBits must be 128 (got ${String(tagBits)}).`);
  }

  if (!Number.isInteger(iterations)) {
    throw new Error(
      `iterations must be an integer (got ${String(iterations)}).`
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
  assertAesGcmIv(wrapIv, 'wrapIv');

  if (wrappedDek.byteLength === 0) {
    throw new Error('wrappedDek must not be empty.');
  }

  return {
    version,
    vaultId,
    kdf: {
      name: 'PBKDF2',
      hash,
      iterations,
      salt,
    },
    wrappedDek: {
      algo: dataAlgo,
      keySizeBits,
      tagBits,
      iv: wrapIv,
      wrappedKey: wrappedDek,
    },
  };
}
