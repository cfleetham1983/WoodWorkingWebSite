export type ShopSupplier = {
  id: number;
  shop_name: string;
  supply_type: "wood" | "tools" | "both";
  city: string | null;
  state: string | null;
  website_url: string | null;
  phone: string | null;
  notes: string | null;
};

type ShopSupplierResponse = {
  data: ShopSupplier[];
};

export async function fetchShopSuppliers(type: "wood" | "tools") {
  const response = await fetch(`/api/shop-suppliers?type=${type}`);
  if (!response.ok) {
    let apiMessage = "";

    try {
      const errorBody = (await response.json()) as { error?: string };
      apiMessage = errorBody.error ? `: ${errorBody.error}` : "";
    } catch {
      apiMessage = "";
    }

    throw new Error(
      `Unable to load ${type} suppliers (HTTP ${response.status})${apiMessage}`,
    );
  }

  const body = (await response.json()) as ShopSupplierResponse;
  return body.data;
}
