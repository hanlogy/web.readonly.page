export const checkClassNamesAllowed = (
  classNames: string,
  allowedNames: string[]
) => {
  const list = (
    Array.isArray(classNames) ? classNames : classNames.trim().split(/\s+/)
  ).filter((e) => !!e);

  if (!list.length) {
    return true;
  }

  return list.every((className) =>
    allowedNames.some((allowed) => {
      className = className.trim();
      if (allowed.endsWith('*')) {
        return className.startsWith(allowed.slice(0, -1));
      }
      return className === allowed;
    })
  );
};
