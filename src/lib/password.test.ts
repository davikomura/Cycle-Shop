import { describe, expect, it } from 'vitest';
import { inspectPassword } from './password';

describe('signup password requirements', () => {
  it('requires length, a number and a non-whitespace special character', () => {
    for (const value of ['', 'abc1!', 'abcdefgh!', 'abcdefg1', 'abcdef1 ', 'abcdefgh1é']) {
      expect(inspectPassword(value).valid, value).toBe(false);
    }
    expect(inspectPassword('abcdef1!').valid).toBe(true);
    expect(inspectPassword('abcdef1!').strength).toBe(2);
    expect(inspectPassword('LongPassword1!').strength).toBe(3);
    expect(inspectPassword('')).toMatchObject({ valid: false, strength: 0 });
  });
});
