import type { NavigationLink } from "../../domain/entities/NavigationLink";
import type { PageContent } from "../../domain/entities/PageContent";
import type { SiteContentRepository } from "../../domain/repositories/SiteContentRepository";

const navigationLinks: NavigationLink[] = [
  { label: "Home", path: "/", iconKey: "home" },
  { label: "The Shops", path: "/shoppage", iconKey: "shops" },
  { label: "Projects", path: "/projectpage", iconKey: "projects" },
];

const pages: PageContent[] = [
  {
    path: "/",
    title: "Home Page",
    description:
      "This is the home page and will hold woodworking updates, highlights, and recent additions.",
  },
  {
    path: "/shoppage",
    title: "The Shops Page",
    description:
      "On this page you will find a list of shops where wood supplies can be found.",
  },
  {
    path: "/projectpage",
    title: "The Projects Page",
    description:
      "On this page you will find woodworking project ideas and plans.this ppage is under construction and will be updated with content soon.",
  },
];

export class InMemorySiteContentRepository implements SiteContentRepository {
  getNavigationLinks(): NavigationLink[] {
    return navigationLinks;
  }

  getPageContentByPath(path: string): PageContent | null {
    return pages.find((page) => page.path === path) ?? null;
  }
}

export const siteContentRepository = new InMemorySiteContentRepository();
