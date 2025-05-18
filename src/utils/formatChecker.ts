export function formatChecker(data: string, format: RegExp) {
  if (format.test(data)) {
    return true;
  } else false;
}
