import type { UserRole } from "../user";

export const permissions = {
  createArticle: ["admin", "journalist"],
  viewOwnArticles: ["admin", "journalist"],
  viewAllArticles: ["admin"],
  editOwnDrafts: ["admin", "journalist"],
  editPublishedArticles: ["admin"],
  deleteOwnDrafts: ["admin", "journalist"],
  deletePublishedArticles: ["admin"],
  publishArticles: ["admin"],
  manageJournalists: ["admin"],
} as const;

export type Permission = keyof typeof permissions;

export function can(
  role: UserRole,
  permission: Permission
): boolean {
  return (
    permissions[permission] as readonly UserRole[]
  ).includes(role);
}