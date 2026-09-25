import { describe, expect, test } from 'bun:test';

import { DOCUMENTATION_POLICY } from './policy.js';

describe('documentation policy', () => {
  test('uses the canonical fixed documentation paths', () => {
    expect(DOCUMENTATION_POLICY.paths).toEqual({
      examplesRoot: 'examples',
      cliRoot: 'src/cli',
      usageRoots: ['examples', 'src/cli'],
      configSchema: 'src/types/config.ts',
    });
  });

  test('publishes only the supported Paradox tags', () => {
    expect(DOCUMENTATION_POLICY.tags.map((tag) => tag.name)).toEqual([
      'readme',
      'usage',
      'config',
      'title',
      'see',
      'security',
    ]);
  });

  test('publishes unique stable rule ids', () => {
    const ids = DOCUMENTATION_POLICY.rules.map((rule) => rule.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('requires exactly one README usage example and configuration root', () => {
    expect(DOCUMENTATION_POLICY.readmeUsage.exactCount).toBe(1);
    expect(DOCUMENTATION_POLICY.readmeUsage.requiredTags).toEqual([
      'usage',
      'readme',
      'title',
    ]);
    expect(DOCUMENTATION_POLICY.config.exactCount).toBe(1);
    expect(DOCUMENTATION_POLICY.config.requiredTags).toEqual([
      'config',
      'readme',
      'title',
    ]);
  });

  test('requires colocated exact security test references', () => {
    expect(DOCUMENTATION_POLICY.security).toEqual({
      sameDirectoryTestReference: true,
      exactTestNameRequired: true,
    });
  });
});
