export function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error('IndexedDB request failed'));
  });
}

export function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    let settled = false;
    // Ensures we settle the Promise only once.
    // A transaction failure may trigger multiple events (e.g. both onerror and
    // onabort). Without this guard, we'd try to resolve/reject the same Promise
    // multiple times.
    const done = (fn: () => void) => {
      if (settled) {
        // already resolved/rejected
        return;
      }
      settled = true;
      fn();
    };

    transaction.oncomplete = () => done(resolve);
    transaction.onabort = () =>
      done(() =>
        reject(transaction.error ?? new Error('IndexedDB transaction aborted'))
      );
    transaction.onerror = () =>
      done(() =>
        reject(transaction.error ?? new Error('IndexedDB transaction failed'))
      );
  });
}
