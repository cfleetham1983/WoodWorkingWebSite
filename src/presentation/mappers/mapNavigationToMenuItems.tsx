import HomeIcon from "@mui/icons-material/Home";
import HandymanIcon from "@mui/icons-material/Handyman";
import ForestIcon from "@mui/icons-material/Forest";
import type { ReactNode } from "react";
import type { MenuItem } from "../../Components/SideMenu";
import type { NavigationLinkForPage } from "../../application/useCases/getNavigationLinks";

const iconMap: Record<NavigationLinkForPage["iconKey"], ReactNode> = {
  home: <HomeIcon />,
  shops: <ForestIcon />,
  projects: <HandymanIcon />,
};

export function mapNavigationToMenuItems(
  links: NavigationLinkForPage[],
): MenuItem[] {
  return links.map((link) => ({
    label: link.label,
    to: link.path,
    icon: iconMap[link.iconKey],
    disabled: link.disabled,
  }));
}
