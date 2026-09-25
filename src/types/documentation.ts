import type { PolicyRule } from './policy.js';

export type DocumentationTagName = 'readme' | 'usage' | 'config' | 'title' | 'see' | 'security';

export type DocumentationTagValueKind =
  'none' | 'non-empty-text' | 'public-https-url' | 'colocated-test-reference';

export type DocumentationTagTarget = 'block' | 'symbol' | 'interface' | 'type';

export interface DocumentationTagPolicy {
  readonly name: DocumentationTagName;
  readonly repeatable: boolean;
  readonly valueKind: DocumentationTagValueKind;
  readonly appliesTo: readonly DocumentationTagTarget[];
}

export interface DocumentationPolicy {
  readonly paths: {
    readonly examplesRoot: 'examples';
    readonly cliRoot: 'src/cli';
    readonly usageRoots: readonly ['examples', 'src/cli'];
    readonly configSchema: 'src/types/config.ts';
  };
  readonly comments: {
    readonly allowCodeBlocks: false;
    readonly allowInlineCode: true;
    readonly rejectUnsupportedTagLines: true;
  };
  readonly tags: readonly DocumentationTagPolicy[];
  readonly readmeUsage: {
    readonly required: boolean;
    readonly root: 'examples';
    readonly requiredTags: readonly ['usage', 'readme', 'title'];
    readonly requireDescription: true;
    readonly exactCount: 1;
    readonly cliReadmeCombinationAllowed: false;
  };
  readonly config: {
    readonly required: boolean;
    readonly path: 'src/types/config.ts';
    readonly declarationKinds: readonly ['interface', 'type'];
    readonly requiredTags: readonly ['config', 'readme', 'title'];
    readonly requireDescription: true;
    readonly exactCount: 1;
  };
  readonly security: {
    readonly sameDirectoryTestReference: true;
    readonly exactTestNameRequired: true;
  };
  readonly see: {
    readonly protocol: 'https:';
    readonly requireReachable: true;
    readonly requirePublicNetworkTarget: true;
  };
  readonly rules: readonly PolicyRule[];
}
