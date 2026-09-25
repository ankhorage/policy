import { describe, expect, test } from 'bun:test';

import { resolvePolicyStatus } from './resolvePolicyStatus.js';

describe('policy status', () => {
  test('is canonical without findings', () => {
    expect(resolvePolicyStatus([])).toEqual({ status: 'canonical', color: 'green' });
  });

  test('is warning when only warnings exist', () => {
    expect(
      resolvePolicyStatus([
        {
          ruleId: 'documentation.public-function.description',
          severity: 'warning',
        },
      ]),
    ).toEqual({ status: 'warnings', color: 'yellow' });
  });

  test('is invalid when any error exists', () => {
    expect(
      resolvePolicyStatus([
        {
          ruleId: 'documentation.public-function.description',
          severity: 'warning',
        },
        {
          ruleId: 'documentation.usage.location',
          severity: 'error',
        },
      ]),
    ).toEqual({ status: 'invalid', color: 'red' });
  });
});
