import type { PolicyRule } from '../types/policy.js';

const rules = {
  catchAllDirectory: rule(
    'package.architecture.catch-all-directory.disallowed',
    'source-architecture',
    'Generic catch-all source directories are not allowed.',
  ),
  roleCombination: rule(
    'package.architecture.role-combination.invalid',
    'source-architecture',
    'Architecture role directories must form a meaningful inward/outward combination.',
  ),
  domainOutwardImport: rule(
    'package.architecture.domain-outward-import.disallowed',
    'source-architecture',
    'Domain and core policy must not import outward implementation roles.',
  ),
  applicationOutwardImport: rule(
    'package.architecture.application-outward-import.disallowed',
    'source-architecture',
    'Application code must not import outward implementation roles.',
  ),
  portOutwardImport: rule(
    'package.architecture.port-outward-import.disallowed',
    'source-architecture',
    'Port contracts must not import outward implementation roles.',
  ),
  deliveryConcreteAdapterImport: rule(
    'package.architecture.delivery-concrete-adapter-import.disallowed',
    'source-architecture',
    'Thin delivery adapters must not wire concrete adapter implementations directly.',
  ),
  importOutsideRoot: rule(
    'package.imports.outside-root.disallowed',
    'source-architecture',
    'Relative imports must stay inside the standalone repository root.',
  ),
  cliRootFile: rule(
    'package.cli.root-file.disallowed',
    'package-layout',
    'CLI implementation must live below src/cli rather than src/cli.ts.',
  ),
  cliExport: rule(
    'package.cli.export.required',
    'package-layout',
    'CLI-capable packages must publish the canonical ./cli export.',
  ),
  compatibilityDependency: rule(
    'package.dependencies.ankh-workspace-alias.disallowed',
    'package-dependencies',
    'Legacy @ankh/* compatibility package dependencies are not allowed.',
  ),
  compatibilityImport: rule(
    'package.imports.ankh-workspace-alias.disallowed',
    'package-dependencies',
    'Legacy @ankh/* compatibility imports are not allowed.',
  ),
  legacySourceDependency: rule(
    'package.dependencies.ankhorage4-source.disallowed',
    'package-dependencies',
    'Active package dependencies must not reference ankhorage4 source.',
  ),
  legacySourceImport: rule(
    'package.imports.ankhorage4-source.disallowed',
    'package-dependencies',
    'Active imports must not reference ankhorage4 source.',
  ),
  localProtocolDependency: rule(
    'package.dependencies.local-protocol.disallowed',
    'package-dependencies',
    'Published packages must use registry-resolvable dependency versions.',
  ),
  repoReadme: rule('repo.readme.required', 'public-package', 'Public packages require README.md.'),
  repoChangelog: rule(
    'repo.changelog.required',
    'public-package',
    'Public packages require CHANGELOG.md.',
  ),
  repoLicense: rule('repo.license.required', 'public-package', 'Public packages require LICENSE.'),
  repoChangeset: rule(
    'repo.changeset.required',
    'public-package',
    'Public packages require a .changeset directory.',
  ),
  repoWorkflows: rule(
    'repo.workflows.required',
    'public-package',
    'Public packages require .github/workflows.',
  ),
  packageName: rule(
    'package.json.name.required',
    'public-package',
    'Public packages require package.json name.',
  ),
  packageVersion: rule(
    'package.json.version.required',
    'public-package',
    'Public packages require package.json version.',
  ),
  packageType: rule(
    'package.json.type.required',
    'public-package',
    'Public packages require package.json type.',
  ),
  packageTypeModule: rule(
    'package.json.type.module',
    'public-package',
    'Public packages use ESM package.json type=module.',
  ),
  packageDescription: rule(
    'package.json.description.required',
    'public-package',
    'Public packages require a description.',
  ),
  packageRepository: rule(
    'package.json.repository.required',
    'public-package',
    'Public packages require repository metadata.',
  ),
  packageHomepage: rule(
    'package.json.homepage.required',
    'public-package',
    'Public packages require a homepage.',
  ),
  packageBugs: rule(
    'package.json.bugs.required',
    'public-package',
    'Public packages require bugs metadata.',
  ),
  packageLicense: rule(
    'package.json.license.required',
    'public-package',
    'Public packages require a license field.',
  ),
  packageKeywords: rule(
    'package.json.keywords.required',
    'public-package',
    'Public packages require keywords.',
  ),
  packageFiles: rule(
    'package.json.files.required',
    'public-package',
    'Public packages require an explicit files list.',
  ),
  packageExports: rule(
    'package.json.exports.required',
    'public-package',
    'Public packages require explicit exports.',
  ),
  packagePublishConfig: rule(
    'package.json.publish-config.required',
    'public-package',
    'Public packages require publishConfig.',
  ),
  packagePublishPublic: rule(
    'package.json.publish-config.public',
    'public-package',
    'Public packages require publishConfig.access=public.',
  ),
  packagePrivate: rule(
    'package.json.private.public-package-disallowed',
    'public-package',
    'Public packages must not set private=true.',
  ),
  packageManagerRequired: rule(
    'package.json.package-manager.required',
    'public-package',
    'Public packages require a Bun packageManager declaration.',
  ),
  packageManagerBun: rule(
    'package.json.package-manager.bun',
    'public-package',
    'Public package packageManager declarations must use Bun.',
  ),
  dependencyTypescript: rule(
    'package.dependencies.typescript.required',
    'public-package',
    'Public packages require TypeScript.',
  ),
  dependencyBunTypes: rule(
    'package.dependencies.types-bun.required',
    'public-package',
    'Public packages require @types/bun in devDependencies.',
  ),
  dependencyNodeTypes: rule(
    'package.dependencies.types-node.required',
    'public-package',
    'Public packages require @types/node in devDependencies.',
  ),
  dependencyDevtools: rule(
    'package.dependencies.devtools.required',
    'public-package',
    'Packages using shared Ankhorage tooling require @ankhorage/devtools.',
  ),
  dependencyParadox: rule(
    'package.dependencies.paradox.required',
    'public-package',
    'Packages owning generated Paradox documentation require @ankhorage/paradox.',
  ),
  dependencyChangesets: rule(
    'package.dependencies.changesets.required',
    'public-package',
    'Changesets execution is owned by @ankhorage/devtools for consumer packages.',
  ),
  scriptBuild: scriptRule('build', 'package.scripts.build.required'),
  scriptTypecheck: scriptRule('typecheck', 'package.scripts.typecheck.required'),
  scriptLint: scriptRule('lint', 'package.scripts.lint.required'),
  scriptLintFix: scriptRule('lint:fix', 'package.scripts.lint-fix.required'),
  scriptFormat: scriptRule('format', 'package.scripts.format.required'),
  scriptFormatCheck: scriptRule('format:check', 'package.scripts.format-check.required'),
  scriptTest: scriptRule('test', 'package.scripts.test.required'),
  scriptStandalone: scriptRule('test:standalone', 'package.scripts.standalone.required'),
  scriptKnip: scriptRule('knip:check', 'package.scripts.knip.required'),
  scriptDocs: scriptRule('docs', 'package.scripts.docs.required'),
  scriptChangeset: scriptRule('changeset', 'package.scripts.changeset.required'),
  scriptChangesetStatus: scriptRule(
    'changeset:status',
    'package.scripts.changeset-status.required',
  ),
  scriptVersionPackages: scriptRule(
    'version-packages',
    'package.scripts.version-packages.required',
  ),
} as const satisfies Readonly<Record<string, PolicyRule>>;

/***
 * Canonical source architecture and generic public-package profile policy.
 */
export const ARCHITECTURE_POLICY = {
  source: {
    catchAllDirectories: ['common', 'helpers', 'shared'],
    inwardFeatureRoles: ['application', 'contracts', 'domain', 'planning', 'ports'],
    roles: {
      domain: {
        segments: ['domain', 'core'],
        forbiddenOutwardSegments: [
          'adapters',
          'app',
          'application',
          'cli',
          'composition',
          'host',
          'infrastructure',
          'platform',
        ],
        ruleId: rules.domainOutwardImport.id,
        label: 'Domain/core policy',
      },
      application: {
        segments: ['application'],
        forbiddenOutwardSegments: [
          'adapters',
          'app',
          'cli',
          'composition',
          'host',
          'infrastructure',
          'platform',
        ],
        ruleId: rules.applicationOutwardImport.id,
        label: 'Application/use-case code',
      },
      ports: {
        segments: ['ports'],
        forbiddenOutwardSegments: [
          'adapters',
          'app',
          'cli',
          'composition',
          'host',
          'infrastructure',
          'platform',
        ],
        ruleId: rules.portOutwardImport.id,
        label: 'Port contracts',
      },
    },
    featureCombinations: {
      adapters: {
        requiresAnyOf: ['application', 'contracts', 'domain', 'planning', 'ports'],
        ruleId: rules.roleCombination.id,
      },
      composition: {
        requiresAnyOf: ['adapters', 'application', 'planning', 'ports'],
        ruleId: rules.roleCombination.id,
      },
    },
    thinDeliveryAdapter: {
      pathSegments: ['cli', 'commands'],
      concreteAdapterSegment: 'adapters',
      ruleId: rules.deliveryConcreteAdapterImport.id,
    },
    repositoryBoundaryRuleId: rules.importOutsideRoot.id,
  },
  cli: {
    sourceRoot: 'src/cli',
    commandsRoot: 'src/cli/commands',
    legacyRootFile: 'src/cli.ts',
    packageExport: './cli',
    legacyRootRuleId: rules.cliRootFile.id,
    exportRuleId: rules.cliExport.id,
  },
  dependencies: {
    compatibilityPackagePrefix: '@ankh/',
    legacySourceMarker: 'ankhorage4',
    localProtocolPrefixes: ['file:', 'link:', 'workspace:', 'github:', 'git:', 'git+'],
    rules: {
      compatibilityDependency: rules.compatibilityDependency.id,
      compatibilityImport: rules.compatibilityImport.id,
      legacySourceDependency: rules.legacySourceDependency.id,
      legacySourceImport: rules.legacySourceImport.id,
      localProtocolDependency: rules.localProtocolDependency.id,
    },
  },
  publicPackage: {
    requiredRepoPaths: [
      { path: 'README.md', kind: 'file', ruleId: rules.repoReadme.id },
      { path: 'CHANGELOG.md', kind: 'file', ruleId: rules.repoChangelog.id },
      { path: 'LICENSE', kind: 'file', ruleId: rules.repoLicense.id },
      { path: '.changeset', kind: 'directory', ruleId: rules.repoChangeset.id },
      { path: '.github/workflows', kind: 'directory', ruleId: rules.repoWorkflows.id },
    ],
    requiredScripts: [
      { name: 'build', ruleId: rules.scriptBuild.id },
      { name: 'typecheck', ruleId: rules.scriptTypecheck.id },
      { name: 'lint', ruleId: rules.scriptLint.id },
      { name: 'lint:fix', ruleId: rules.scriptLintFix.id },
      { name: 'format', ruleId: rules.scriptFormat.id },
      { name: 'format:check', ruleId: rules.scriptFormatCheck.id },
      { name: 'test', ruleId: rules.scriptTest.id },
      { name: 'test:standalone', ruleId: rules.scriptStandalone.id },
      { name: 'knip:check', ruleId: rules.scriptKnip.id },
      { name: 'docs', ruleId: rules.scriptDocs.id },
      { name: 'changeset', ruleId: rules.scriptChangeset.id },
      { name: 'changeset:status', ruleId: rules.scriptChangesetStatus.id },
      { name: 'version-packages', ruleId: rules.scriptVersionPackages.id },
    ],
    requiredFields: [
      { name: 'name', kind: 'non-empty-string', ruleId: rules.packageName.id },
      { name: 'version', kind: 'non-empty-string', ruleId: rules.packageVersion.id },
      { name: 'type', kind: 'non-empty-string', ruleId: rules.packageType.id },
      { name: 'description', kind: 'non-empty-string', ruleId: rules.packageDescription.id },
      { name: 'repository', kind: 'record', ruleId: rules.packageRepository.id },
      { name: 'homepage', kind: 'non-empty-string', ruleId: rules.packageHomepage.id },
      { name: 'bugs', kind: 'record', ruleId: rules.packageBugs.id },
      { name: 'license', kind: 'non-empty-string', ruleId: rules.packageLicense.id },
      { name: 'keywords', kind: 'string-array', ruleId: rules.packageKeywords.id },
      { name: 'files', kind: 'string-array', ruleId: rules.packageFiles.id },
      { name: 'exports', kind: 'record', ruleId: rules.packageExports.id },
      { name: 'publishConfig', kind: 'record', ruleId: rules.packagePublishConfig.id },
    ],
    packageType: {
      value: 'module',
      ruleId: rules.packageTypeModule.id,
    },
    publishAccess: {
      value: 'public',
      ruleId: rules.packagePublishPublic.id,
    },
    privateDisallowedRuleId: rules.packagePrivate.id,
    packageManager: {
      requiredRuleId: rules.packageManagerRequired.id,
      bunRuleId: rules.packageManagerBun.id,
    },
    dependencyRules: {
      typescript: rules.dependencyTypescript.id,
      bunTypes: rules.dependencyBunTypes.id,
      nodeTypes: rules.dependencyNodeTypes.id,
      devtools: rules.dependencyDevtools.id,
      paradox: rules.dependencyParadox.id,
      changesets: rules.dependencyChangesets.id,
    },
  },
  rules,
} as const;

/*** Creates one error-level rule descriptor. */
function rule(id: string, domain: string, description: string): PolicyRule {
  return { id, domain, severity: 'error', description };
}

/*** Creates one required package-script rule descriptor. */
function scriptRule(name: string, id: string): PolicyRule {
  return rule(id, 'public-package', `Public packages require the ${name} script.`);
}
