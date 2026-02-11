import ContentPage from "./ContentPage";
import CardDeck, { type CardItem } from "../Components/CardDeck";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const shopCards: CardItem[] = [
  {
    label: "Wood Suppliers",
    to: "/shoppage/suppliers",
    icon: <StorefrontIcon />,
  },
  { label: "Tool Shops", to: "/shoppage/tools", icon: <CarpenterIcon /> },
  {
    label: "The Wood Base",
    to: "https://www.wood-database.com/wood-filter/",
    icon: <MenuBookIcon />,
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
