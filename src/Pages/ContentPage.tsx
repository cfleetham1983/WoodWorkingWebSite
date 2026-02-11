import SideMenu from "../Components/SideMenu";
import { buildPageModel } from "../application/useCases/buildPageModel";
import { siteContentRepository } from "../infrastructure/repositories/InMemorySiteContentRepository";
import { mapNavigationToMenuItems } from "../presentation/mappers/mapNavigationToMenuItems";
import PageContentPanel from "../presentation/components/PageContentPanel";
import type { ReactNode } from "react";

type ContentPageProps = {
  path: string;
  children?: ReactNode;
};

function ContentPage({ path, children }: ContentPageProps) {
  const model = buildPageModel(siteContentRepository, path);
  const menuItems = mapNavigationToMenuItems(model.navigationLinks);

  return (
    <SideMenu links={menuItems}>
      <PageContentPanel
        title={model.pageContent.title}
        description={model.pageContent.description}
      />
      {children}
    </SideMenu>
  );
}

export default ContentPage;
