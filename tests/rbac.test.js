import { describe, expect, it } from 'vitest';
import { canAccess, hasPermission } from '../server/utils/rbac.js';

describe('RBAC access control', () => {
  it('allows students to read their own academic records', () => {
    expect(hasPermission('student', 'student:read:self')).toBe(true);
  });

  it('denies students from modifying fee records', () => {
    expect(canAccess('student', 'fees:write')).toBe(false);
  });

  it('allows college admins to manage student data', () => {
    expect(hasPermission('college_admin', 'student:write')).toBe(true);
  });

  it('allows faculty to record marks', () => {
    expect(hasPermission('faculty', 'marks:write')).toBe(true);
  });
});
