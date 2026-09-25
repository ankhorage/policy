import type { PolicyFinding, PolicyStatusDescriptor } from '../types/policy.js';

/***
 * Resolves the shared Ankhorage traffic-light status from policy findings.
 */
export function resolvePolicyStatus(
  findings: readonly PolicyFinding[],
): PolicyStatusDescriptor {
  if (findings.some((finding) => finding.severity === 'error')) {
    return { status: 'invalid', color: 'red' };
  }

  if (findings.some((finding) => finding.severity === 'warning')) {
    return { status: 'warnings', color: 'yellow' };
  }

  return { status: 'canonical', color: 'green' };
}
