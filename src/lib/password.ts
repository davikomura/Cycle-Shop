export function inspectPassword(password: string) {
  const requirements = {
    length: Array.from(password).length >= 8,
    number: /[0-9]/.test(password),
    special: /[^\p{L}\p{N}\s]/u.test(password),
  };
  const valid = Object.values(requirements).every(Boolean);
  // A visual estimate, not a guarantee: longer passwords with mixed case rank higher.
  const strength = !password ? 0 : !valid ? 1 :
    Array.from(password).length >= 12 && /\p{Ll}/u.test(password) && /\p{Lu}/u.test(password) ? 3 : 2;
  return { requirements, valid, strength };
}
