import ContentPage from "./ContentPage";
import CardDeck, { type CardItem } from "../Components/CardDeck";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WebIcon from "@mui/icons-material/Web";

const shopCards: CardItem[] = [
  {
    label: "Wood Suppliers",
    to: "/WoodShopPage",
    icon: <StorefrontIcon />,
  },
  { label: "Tool Shops", to: "/ToolShopPage", icon: <CarpenterIcon /> },
  {
    label: "The Wood Base",
    to: "https://www.wood-database.com/wood-filter/",
    icon: <WebIcon />,
    external: true,
  },
  {
    label: "Woodworkers workshop",
    to: "https://woodworkersworkshop.co.uk/",
    icon: <WebIcon />,
    external: true,
  },
];

function ShopPage() {
  return (
    <ContentPage path="/shoppage">
      <CardDeck cardItems={shopCards} />
    </ContentPage>
  );
}

export default ShopPage;
