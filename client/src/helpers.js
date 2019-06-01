export function getPropSafe(fn, fallbackValue) {
  try {
    const result = fn();
    // also check if value itself is truthy
    if (result) {
      return result;
    }

    return fallbackValue;
  } catch (e) {
    // if we catch undefined somewhere in object properties chain, just return fallbackValue, instead of error
    return fallbackValue;
  }
}
