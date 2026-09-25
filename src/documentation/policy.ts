import type { DocumentationPolicy } from '../types/documentation.js';

const rules = [
  {
    id: 'documentation.comment.tag.unsupported',
    domain: 'documentation',
    severity: 'error',
    description: 'Tag-shaped lines in Paradox comments must use a supported documentation tag.',
  },
  {
    id: 'documentation.comment.code-block',
    domain: 'documentation',
    severity: 'error',
    description: 'Paradox comments must not contain fenced or indented code blocks.',
  },
  {
    id: 'documentation.usage.location',
    domain: 'documentation',
    severity: 'error',
    description: '@usage is allowed only below examples/** or src/cli/**.',
  },
  {
    id: 'documentation.usage.readme.unique',
    domain: 'documentation',
    severity: 'error',
    description: 'Exactly one example below examples/** must combine @usage and @readme.',
  },
  {
    id: 'documentation.usage.readme.cli',
    domain: 'documentation',
    severity: 'error',
    description: '@usage and @readme must not be combined below src/cli/**.',
  },
  {
    id: 'documentation.usage.readme.metadata',
    domain: 'documentation',
    severity: 'error',
    description: 'README-promoted usage requires @title and non-empty prose.',
  },
  {
    id: 'documentation.config.file',
    domain: 'documentation',
    severity: 'error',
    description: 'The canonical configuration schema must exist at src/types/config.ts.',
  },
  {
    id: 'documentation.config.location',
    domain: 'documentation',
    severity: 'error',
    description: '@config is allowed only in src/types/config.ts.',
  },
  {
    id: 'documentation.config.readme.unique',
    domain: 'documentation',
    severity: 'error',
    description:
      'Exactly one type or interface in src/types/config.ts must combine @config and @readme.',
  },
  {
    id: 'documentation.config.readme.metadata',
    domain: 'documentation',
    severity: 'error',
    description: 'The README configuration root requires @title and non-empty prose.',
  },
  {
    id: 'documentation.see.value',
    domain: 'documentation',
    severity: 'error',
    description: '@see requires a non-empty public HTTPS URL.',
  },
  {
    id: 'documentation.see.reachable',
    domain: 'documentation',
    severity: 'error',
    description: '@see URLs must resolve safely to a reachable public HTTPS resource.',
  },
  {
    id: 'documentation.security.reference',
    domain: 'security',
    severity: 'error',
    description:
      '@security must reference exactly one executable test in a test file colocated with the documented source.',
  },
  {
    id: 'documentation.public-function.description',
    domain: 'documentation',
    severity: 'warning',
    description: 'Every exported function should have a non-empty Paradox description.',
  },
] as const;

const tags = [
  {
    name: 'readme',
    repeatable: false,
    valueKind: 'none',
    appliesTo: ['block', 'symbol', 'interface', 'type'],
  },
  {
    name: 'usage',
    repeatable: false,
    valueKind: 'none',
    appliesTo: ['block', 'symbol'],
  },
  {
    name: 'config',
    repeatable: false,
    valueKind: 'none',
    appliesTo: ['interface', 'type'],
  },
  {
    name: 'title',
    repeatable: false,
    valueKind: 'non-empty-text',
    appliesTo: ['block', 'symbol', 'interface', 'type'],
  },
  {
    name: 'see',
    repeatable: true,
    valueKind: 'public-https-url',
    appliesTo: ['block', 'symbol', 'interface', 'type'],
  },
  {
    name: 'security',
    repeatable: true,
    valueKind: 'colocated-test-reference',
    appliesTo: ['symbol'],
  },
] as const;

/***
 * Canonical documentation policy consumed by Paradox, Doctor, and Devtools.
 */
export const DOCUMENTATION_POLICY: DocumentationPolicy = {
  paths: {
    examplesRoot: 'examples',
    cliRoot: 'src/cli',
    usageRoots: ['examples', 'src/cli'],
    configSchema: 'src/types/config.ts',
  },
  comments: {
    allowCodeBlocks: false,
    allowInlineCode: true,
    rejectUnsupportedTagLines: true,
  },
  tags,
  readmeUsage: {
    root: 'examples',
    requiredTags: ['usage', 'readme', 'title'],
    requireDescription: true,
    exactCount: 1,
    cliReadmeCombinationAllowed: false,
  },
  config: {
    path: 'src/types/config.ts',
    declarationKinds: ['interface', 'type'],
    requiredTags: ['config', 'readme', 'title'],
    requireDescription: true,
    exactCount: 1,
  },
  security: {
    sameDirectoryTestReference: true,
    exactTestNameRequired: true,
  },
  see: {
    protocol: 'https:',
    requireReachable: true,
    requirePublicNetworkTarget: true,
  },
  rules,
};
