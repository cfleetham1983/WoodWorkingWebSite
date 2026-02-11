import type { SiteContentRepository } from "../../domain/repositories/SiteContentRepository";
import type { PageContent } from "../../domain/entities/PageContent";

export function getPageContent(
  repository: SiteContentRepository,
  path: string,
): PageContent {
  const page = repository.getPageContentByPath(path);

  if (page) {
    return page;
  }

  return {
    path,
    title: "Page Not Found",
    description: "This page is not available yet.",
  };
}
