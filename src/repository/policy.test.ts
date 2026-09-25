import { expect, test } from 'bun:test';

import { REPOSITORY_POLICY } from './policy.js';

test('repository policy publishes the canonical Bun and Node runtime baseline', () => {
  expect(REPOSITORY_POLICY.runtime).toEqual({
    bun: {
      packageManager: 'bun@1.4.2',
      typesRange: '^1.4.1',
      version: '1.4.2',
      workflowTargets: [
        {
          path: '.github/workflows/ci.yml',
          ruleId: 'repo.workflows.ci.bun-policy',
        },
        {
          path: '.github/workflows/release.yml',
          ruleId: 'repo.workflows.release.bun-policy',
        },
      ],
    },
    node: {
      engineRange: '24.x',
      major: 24,
      setupVersion: '24',
    },
  });
});

test('repository policy derives Bun package metadata from the canonical runtime literal', () => {
  expect(REPOSITORY_POLICY.runtime.bun.packageManager).toBe(
    `bun@${REPOSITORY_POLICY.runtime.bun.version}`,
  );
  expect(REPOSITORY_POLICY.runtime.bun.typesRange).toMatch(/^\^\d+\.\d+\.\d+$/u);
});

test('repository policy publishes Changesets and PKGViz tooling policy', () => {
  expect(REPOSITORY_POLICY.changesets.packageScripts).toEqual({
    changeset: 'ankhorage-changeset',
    'changeset:status': 'ankhorage-changeset status --since=origin/main',
    'version-packages': 'ankhorage-changeset version',
  });
  expect(REPOSITORY_POLICY.pkgvizAudit).toEqual({
    toolVersion: '0.8.1',
    artifactName: 'pkgviz-audit',
    artifactPath: 'pkgviz-audit.json',
    rule: 'cyclic-dependencies=block',
    command: 'bunx pkgviz@0.8.1 --out pkgviz-audit.json --rule cyclic-dependencies=block',
  });
});

test('repository policy publishes unique stable runtime rule ids and severities', () => {
  const values = Object.values(REPOSITORY_POLICY.rules);
  const ids = values.map((rule) => rule.id);

  expect(new Set(ids).size).toBe(ids.length);
  expect(ids).toEqual([
    'package.json.package-manager.policy',
    'package.dependencies.types-bun.policy',
    'repo.workflows.ci.bun-policy',
    'repo.workflows.release.bun-policy',
  ]);
  expect(values.map((rule) => rule.severity)).toEqual(['error', 'error', 'error', 'error']);
});

test('repository policy remains serializable data without executable values', () => {
  const serialized = JSON.stringify(REPOSITORY_POLICY);
  expect(serialized.length).toBeGreaterThan(0);
  expect(JSON.parse(serialized)).toEqual(REPOSITORY_POLICY);
});
