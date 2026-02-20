import ContentPage from "./ContentPage";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import StyledButton from "../Components/StyledButton";
import ModalForm, {
  type FormValues,
  type Question,
} from "../Components/ModalForm";
import {
  fetchShopSuppliers,
  type ShopSupplier,
} from "../infrastructure/api/shopSuppliersApi";

type ShopInfo = {
  id: number;
  name: string;
  location: string;
  supplies: string;
  mapQuery: string;
  websiteUrl: string | null;
  phone: string | null;
};

const supplierQuestions: Question[] = [
  {
    id: "shop_name",
    label: "Shop Name",
    type: "text",
    required: true,
    placeholder: "Acme Lumber",
  },
  {
    id: "supply_type",
    label: "Supply Type",
    type: "select",
    required: true,
    options: [
      { label: "Wood", value: "wood" },
      { label: "Tools", value: "tools" },
      { label: "Both", value: "both" },
    ],
  },
  {
    id: "city",
    label: "City",
    type: "text",
    required: true,
    placeholder: "Leeds",
  },
  {
    id: "County",
    label: "County",
    type: "text",
    required: true,
    placeholder: "Yorkshire",
  },
  {
    id: "website_url",
    label: "Website URL",
    type: "text",
    placeholder: "https://example.com",
  },
  {
    id: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "0113 123 4567",
  },
  {
    id: "notes",
    label: "Notes",
    type: "textarea",
    helperText: "Optional details about wood products or specialties.",
  },
];

function mapSupplierToShopInfo(supplier: ShopSupplier): ShopInfo {
  const locationParts = [supplier.city, supplier.state].filter(Boolean);
  const location = locationParts.length
    ? locationParts.join(", ")
    : "Location unavailable";
  const supplies = supplier.notes?.trim()
    ? supplier.notes
    : "Wood materials and supplies";

  return {
    id: supplier.id,
    name: supplier.shop_name,
    location,
    supplies,
    mapQuery: [supplier.shop_name, ...locationParts].join(", "),
    websiteUrl: supplier.website_url,
    phone: supplier.phone,
  };
}

function WoodShopPage() {
  const [shops, setShops] = useState<ShopInfo[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAddSupplierSubmit = (values: FormValues) => {
    console.log("Add supplier submitted:", values);
    setIsModalOpen(false);
  };

  useEffect(() => {
    let cancelled = false;

    const loadShops = async () => {
      setLoading(true);
      setError(null);

      try {
        const suppliers = await fetchShopSuppliers("wood");
        if (cancelled) return;
        const mappedShops = suppliers.map(mapSupplierToShopInfo);
        setShops(mappedShops);
        setSelectedShopId(mappedShops[0]?.id ?? null);
      } catch (loadError) {
        if (cancelled) return;
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load wood suppliers",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadShops();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredShops = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return shops;

    return shops.filter((shop) =>
      `${shop.name} ${shop.location} ${shop.supplies}`
        .toLowerCase()
        .includes(query),
    );
  }, [searchTerm, shops]);

  useEffect(() => {
    if (!shops.length) {
      setSelectedShopId(null);
      return;
    }

    const selectedStillExists = shops.some(
      (shop) => shop.id === selectedShopId,
    );
    if (!selectedStillExists) {
      setSelectedShopId(shops[0].id);
    }
  }, [selectedShopId, shops]);

  const selectedShop =
    shops.find((shop) => shop.id === selectedShopId) ??
    filteredShops[0] ??
    null;

  const mapSrc = selectedShop
    ? `https://maps.google.com/maps?hl=en&q=${encodeURIComponent(
        selectedShop.mapQuery,
      )}&t=&z=16&ie=UTF8&iwloc=B&output=embed`
    : "";

  return (
    <ContentPage path="/WoodShopPage">
      <Box sx={{ px: 2, pb: 6, pt: 2 }}>
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
                  sm: "repeat(4, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {!loading && !error && filteredShops.length === 0 && (
                <Typography
                  variant="body2"
                  sx={{ color: "var(--text-secondary)" }}
                >
                  No wood suppliers match your search.
                </Typography>
              )}
              {filteredShops.map((shop) => {
                return (
                  <Card
                    key={shop.id}
                    sx={{
                      width: "100%",
                      borderRadius: 3,
                      border:
                        selectedShopId === shop.id
                          ? "2px solid var(--secondary-2)"
                          : "1px solid var(--primary-3)",
                      boxShadow: "none",
                      background: "var(--surface-1)",
                      "&:hover": {
                        borderColor: "var(--secondary-2)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <CardActionArea onClick={() => setSelectedShopId(shop.id)}>
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
                  disabled={loading || Boolean(error)}
                  helperText="Search by name, location, or supplies"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {loading && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Loading suppliers...
                  </Typography>
                )}
                {error && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
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
                  {selectedShop ? (
                    <iframe
                      title="Wood Shop Locations Map"
                      src={mapSrc}
                      style={{ width: "100%", height: "100%", border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "center",
                        height: "100%",
                        px: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--text-secondary)",
                          textAlign: "center",
                        }}
                      >
                        Select a supplier to view map details.
                      </Typography>
                    </Box>
                  )}
                </Box>
                {selectedShop && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: "var(--text-secondary)" }}
                  >
                    {selectedShop.name} ({selectedShop.location})
                  </Typography>
                )}
                {selectedShop?.websiteUrl && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 0.5, color: "var(--text-secondary)" }}
                  >
                    Website: {selectedShop.websiteUrl}
                  </Typography>
                )}
                {selectedShop?.phone && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 0.5, color: "var(--text-secondary)" }}
                  >
                    Phone: {selectedShop.phone}
                  </Typography>
                )}
              </CardContent>
            </Card>
            <Card
              sx={{
                width: "100%",
                minHeight: 10,
                borderRadius: 3,
                border: "1px solid var(--primary-3)",
                boxShadow: "none",
                background: "var(--surface-1)",
                mb: 2,
                mt: 2,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Add Supplier Details
                </Typography>
                <StyledButton
                  name="Add Supplier"
                  variant="outline"
                  size="default"
                  onPressed={() => {
                    setIsModalOpen(true);
                  }}
                />
              </CardContent>
            </Card>
            <ModalForm
              open={isModalOpen}
              title="Add Supplier"
              questions={supplierQuestions}
              submitLabel="Save"
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleAddSupplierSubmit}
            />
          </Box>
        </Box>
      </Box>
    </ContentPage>
  );
}

export default WoodShopPage;
