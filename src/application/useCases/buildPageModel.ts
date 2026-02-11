import type { SiteContentRepository } from "../../domain/repositories/SiteContentRepository";
import { getNavigationLinks } from "./getNavigationLinks";
import { getPageContent } from "./getPageContent";

export type PageModel = {
  navigationLinks: ReturnType<typeof getNavigationLinks>;
  pageContent: ReturnType<typeof getPageContent>;
};

export function buildPageModel(
  repository: SiteContentRepository,
  activePath: string,
): PageModel {
  return {
    navigationLinks: getNavigationLinks(repository, activePath),
    pageContent: getPageContent(repository, activePath),
  };
}
