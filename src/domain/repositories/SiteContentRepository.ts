import type { NavigationLink } from "../entities/NavigationLink";
import type { PageContent } from "../entities/PageContent";

export interface SiteContentRepository {
  getNavigationLinks(): NavigationLink[];
  getPageContentByPath(path: string): PageContent | null;
}
