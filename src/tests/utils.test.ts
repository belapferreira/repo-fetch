import { generateArray } from '@/utils/generate-array';
import { describe, expect, it } from 'vitest';

describe('Utils testing', () => {
  it('should generate an array of length 5', () => {
    expect(generateArray(5)).toHaveLength(5);
  });
});
