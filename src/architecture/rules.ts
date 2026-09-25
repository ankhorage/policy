import type { PolicyRule } from '../types/policy.js';

export const ARCHITECTURE_RULES = {
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

/*** Creates one error-level rule descriptor. */
function rule<const Id extends string, const Domain extends string>(
  id: Id,
  domain: Domain,
  description: string,
) {
  return { id, domain, severity: 'error' as const, description } satisfies PolicyRule;
}

/*** Creates one required package-script rule descriptor. */
function scriptRule<const Id extends string>(name: string, id: Id) {
  return rule(id, 'public-package', `Public packages require the ${name} script.`);
}
