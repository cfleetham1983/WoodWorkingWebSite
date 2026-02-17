-- Database schema and starter data for woodworking suppliers.
-- Supports shops that supply wood, tools, or both.

DROP TABLE IF EXISTS shop_suppliers;

CREATE TABLE shop_suppliers (
  id INTEGER PRIMARY KEY,
  shop_name TEXT NOT NULL,
  supply_type TEXT NOT NULL CHECK (supply_type IN ('wood', 'tools', 'both')),
  city TEXT,
  state TEXT,
  website_url TEXT,
  phone TEXT,
  notes TEXT
);

INSERT INTO shop_suppliers (
  shop_name,
  supply_type,
  city,
  state,
  website_url,
  phone,
  notes
) VALUES
  ('Timberline Lumber Co', 'wood', 'Grand Rapids', 'MI', 'https://example.com/timberline', '616-555-0101', 'Domestic hardwoods and plywood sheets.'),
  ('Edge & Iron Tool Supply', 'tools', 'Columbus', 'OH', 'https://example.com/edge-iron', '614-555-0112', 'Hand tools, router bits, and sharpening supplies.'),
  ('North Bench Woodworks Supply', 'both', 'Madison', 'WI', 'https://example.com/north-bench', '608-555-0134', 'Carries lumber, finishes, and power tools.'),
  ('Oak & Ash Market', 'wood', 'Nashville', 'TN', 'https://example.com/oak-ash', '615-555-0178', 'Kiln-dried stock and live-edge slabs.'),
  ('Precision Craft Depot', 'both', 'Boise', 'ID', 'https://example.com/precision-craft', '208-555-0199', 'Specialty jigs, clamps, and hardwood offcuts.');
