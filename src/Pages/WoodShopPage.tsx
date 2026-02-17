import ContentPage from "./ContentPage";
import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";

type ShopInfo = {
  name: string;
  location: string;
  supplies: string;
  mapQuery: string;
};

const woodShops: ShopInfo[] = [
  {
    name: "Leeds Wood Recycling CIC",
    location: "Leeds, UK",
    supplies: "Recycled Wood, reclaimed timber",
    mapQuery: "24 Croydon St, Holbeck, Leeds LS11 9RT, UK",
  },
  {
    name: "Howarth Timber & Building Supplies",
    location: "wakeefield, UK",
    supplies: "kiln-dried stock",
    mapQuery: "29 Doncaster Road, Wakefield WF1 5DW, UK",
  },
  {
    name: "North Bench Supply",
    location: "York, UK",
    supplies: "Wood, finishes, hand tools",
    mapQuery: "York, UK",
  },
  {
    name: "ABJ Woods",
    location: "Pontefract, UK",
    supplies: "Wood, finishes, hand tools",
    mapQuery: "6 Bondgate, Pontefract WF8 2JJ, UK",
  },
];

function WoodShopPage() {
  const [selectedShopIndex, setSelectedShopIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedShop = woodShops[selectedShopIndex];

  const filteredShops = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return woodShops;

    return woodShops.filter((shop) =>
      `${shop.name} ${shop.location} ${shop.supplies}`
        .toLowerCase()
        .includes(query),
    );
  }, [searchTerm]);

  const mapSrc = `https://maps.google.com/maps?hl=en&q=${encodeURIComponent(
    selectedShop.mapQuery,
  )}&t=&z=16&ie=UTF8&iwloc=B&output=embed`;

  return (
    <ContentPage path="/WoodShopPage">
      <Box sx={{ px: 4, pb: 6 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Shop Information
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {filteredShops.map((shop) => {
                const shopIndex = woodShops.findIndex((s) => s.name === shop.name);
                return (
                <Card
                  key={shop.name}
                  sx={{
                    borderRadius: 3,
                    border:
                      selectedShopIndex === shopIndex
                        ? "2px solid var(--secondary-2)"
                        : "1px solid var(--primary-3)",
                    boxShadow: "none",
                    background: "var(--surface-1)",
                  }}
                >
                  <CardActionArea onClick={() => setSelectedShopIndex(shopIndex)}>
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                        {shop.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "var(--text-secondary)", mb: 0.75 }}
                      >
                        {shop.location}
                      </Typography>
                      <Typography variant="body2">{shop.supplies}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                );
              })}
            </Box>
          </Box>

          <Box sx={{ width: { xs: "100%", md: 400 } }}>
            <Card
              sx={{
                width: "100%",
                minHeight: 10,
                borderRadius: 3,
                border: "1px solid var(--primary-3)",
                boxShadow: "none",
                background: "var(--surface-1)",
                mb: 2,
              }}
            >
              <CardContent>
                <TextField
                  label="Search Shops"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </CardContent>
            </Card>
            <Card
              sx={{
                width: "100%",
                minHeight: 320,
                borderRadius: 3,
                border: "2px dashed var(--primary-3)",
                boxShadow: "none",
                background: "var(--surface-1)",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Map
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid var(--primary-3)",
                    height: 240,
                    background: "var(--surface-2)",
                  }}
                >
                  <iframe
                    title="Wood Shop Locations Map"
                    src={mapSrc}
                    style={{ width: "100%", height: "100%", border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "var(--text-secondary)" }}
                >
                  {selectedShop.name} ({selectedShop.location})
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </ContentPage>
  );
}

export default WoodShopPage;
