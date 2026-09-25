import { expect, test } from 'bun:test';

import { ARCHITECTURE_POLICY } from './policy.js';

test('publishes canonical source architecture vocabulary', () => {
  expect(ARCHITECTURE_POLICY.source.catchAllDirectories).toEqual(['common', 'helpers', 'shared']);
  expect(ARCHITECTURE_POLICY.source.inwardFeatureRoles).toEqual([
    'application',
    'contracts',
    'domain',
    'planning',
    'ports',
  ]);
  expect(ARCHITECTURE_POLICY.source.roles.domain.segments).toEqual(['domain', 'core']);
  expect(ARCHITECTURE_POLICY.source.thinDeliveryAdapter.pathSegments).toEqual(['cli', 'commands']);
});

test('publishes canonical feature role combinations', () => {
  expect(ARCHITECTURE_POLICY.source.featureCombinations.adapters.requiresAnyOf).toEqual([
    'application',
    'contracts',
    'domain',
    'planning',
    'ports',
  ]);
  expect(ARCHITECTURE_POLICY.source.featureCombinations.composition.requiresAnyOf).toEqual([
    'adapters',
    'application',
    'planning',
    'ports',
  ]);
});

test('publishes the generic public-package contract', () => {
  expect(ARCHITECTURE_POLICY.publicPackage.requiredRepoPaths.map(({ path }) => path)).toEqual([
    'README.md',
    'CHANGELOG.md',
    'LICENSE',
    '.changeset',
    '.github/workflows',
  ]);
  expect(ARCHITECTURE_POLICY.publicPackage.requiredScripts.map(({ name }) => name)).toEqual([
    'build',
    'typecheck',
    'lint',
    'lint:fix',
    'format',
    'format:check',
    'test',
    'test:standalone',
    'knip:check',
    'docs',
    'changeset',
    'changeset:status',
    'version-packages',
  ]);
  expect(ARCHITECTURE_POLICY.publicPackage.packageType.value).toBe('module');
  expect(ARCHITECTURE_POLICY.publicPackage.publishAccess.value).toBe('public');
});

test('publishes compatibility and standalone dependency constraints', () => {
  expect(ARCHITECTURE_POLICY.dependencies.compatibilityPackagePrefix).toBe('@ankh/');
  expect(ARCHITECTURE_POLICY.dependencies.legacySourceMarker).toBe('ankhorage4');
  expect(ARCHITECTURE_POLICY.dependencies.localProtocolPrefixes).toEqual([
    'file:',
    'link:',
    'workspace:',
    'github:',
    'git:',
    'git+',
  ]);
});

test('publishes unique architecture/profile rule ids with error severity', () => {
  const values = Object.values(ARCHITECTURE_POLICY.rules);
  const ids = values.map((entry) => entry.id);

  expect(new Set(ids).size).toBe(ids.length);
  expect(ARCHITECTURE_POLICY.rules.catchAllDirectory).toMatchObject({
    id: 'package.architecture.catch-all-directory.disallowed',
    severity: 'error',
  });
  expect(ARCHITECTURE_POLICY.rules.scriptBuild).toMatchObject({
    id: 'package.scripts.build.required',
    severity: 'error',
  });
});

test('architecture policy is serializable pure data', () => {
  const serialized = JSON.stringify(ARCHITECTURE_POLICY);
  expect(serialized.length).toBeGreaterThan(0);
  expect(JSON.parse(serialized)).toEqual(ARCHITECTURE_POLICY);
});
