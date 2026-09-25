export type PolicySeverity = 'warning' | 'error';

export type PolicyStatus = 'canonical' | 'warnings' | 'invalid';

export type PolicyStatusColor = 'green' | 'yellow' | 'red';

export interface PolicyRule {
  readonly id: string;
  readonly domain: string;
  readonly severity: PolicySeverity;
  readonly description: string;
}

export interface PolicyFinding {
  readonly ruleId: string;
  readonly severity: PolicySeverity;
}

export interface PolicyStatusDescriptor {
  readonly status: PolicyStatus;
  readonly color: PolicyStatusColor;
}
