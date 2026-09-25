import type { PolicyRule } from '../types/policy.js';

const rules = {
  packageManager: {
    id: 'package.json.package-manager.policy',
    domain: 'repository-runtime',
    severity: 'error',
    description: 'The package manager declaration must match the canonical Bun runtime policy.',
  },
  bunTypes: {
    id: 'package.dependencies.types-bun.policy',
    domain: 'repository-runtime',
    severity: 'error',
    description: 'The @types/bun dependency must match the canonical Bun runtime policy.',
  },
  ciBun: {
    id: 'repo.workflows.ci.bun-policy',
    domain: 'repository-runtime',
    severity: 'error',
    description: 'The managed CI workflow must use the canonical Bun runtime version.',
  },
  releaseBun: {
    id: 'repo.workflows.release.bun-policy',
    domain: 'repository-runtime',
    severity: 'error',
    description: 'The managed release workflow must use the canonical Bun runtime version.',
  },
} as const satisfies Readonly<Record<string, PolicyRule>>;

/***
 * Canonical repository runtime and tooling policy consumed by Doctor and Devtools.
 */
export const REPOSITORY_POLICY = {
  runtime: {
    bun: {
      packageManager: 'bun@1.4.2',
      typesRange: '^1.4.1',
      version: '1.4.2',
      workflowTargets: [
        {
          path: '.github/workflows/ci.yml',
          ruleId: rules.ciBun.id,
        },
        {
          path: '.github/workflows/release.yml',
          ruleId: rules.releaseBun.id,
        },
      ],
    },
    node: {
      engineRange: '24.x',
      major: 24,
      setupVersion: '24',
    },
  },
  changesets: {
    packageName: '@changesets/cli',
    binaryName: 'ankhorage-changeset',
    packageScripts: {
      changeset: 'ankhorage-changeset',
      'changeset:status': 'ankhorage-changeset status --since=origin/main',
      'version-packages': 'ankhorage-changeset version',
    },
    ownerPackageScripts: {
      changeset: 'bun src/cli/bin/changeset.ts',
      'changeset:status': 'bun src/cli/bin/changeset.ts status --since=origin/main',
      'version-packages': 'bun src/cli/bin/changeset.ts version',
    },
    workflowCommands: {
      status: 'bun run changeset:status',
      version: 'bun run version-packages',
      publish: 'bun run changeset -- publish',
    },
  },
  pkgvizAudit: {
    toolVersion: '0.8.1',
    artifactName: 'pkgviz-audit',
    artifactPath: 'pkgviz-audit.json',
    rule: 'cyclic-dependencies=block',
    command: 'bunx pkgviz@0.8.1 --out pkgviz-audit.json --rule cyclic-dependencies=block',
  },
  rules,
} as const;
