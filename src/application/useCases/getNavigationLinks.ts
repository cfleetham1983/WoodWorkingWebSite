import type { SiteContentRepository } from "../../domain/repositories/SiteContentRepository";

export type NavigationLinkForPage = {
  label: string;
  path: string;
  iconKey: "home" | "shops" | "projects";
  disabled: boolean;
};

export function getNavigationLinks(
  repository: SiteContentRepository,
  activePath: string,
): NavigationLinkForPage[] {
  return repository.getNavigationLinks().map((link) => ({
    ...link,
    disabled: link.path === activePath,
  }));
}
