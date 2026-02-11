-- Navigation database objects for menu/page links.
-- This script is SQLite/Postgres-friendly SQL with standard types.

CREATE TABLE IF NOT EXISTS side_menu_links (
  id INTEGER PRIMARY KEY,
  label TEXT NOT NULL,
  path TEXT NOT NULL UNIQUE,
  icon_key TEXT,
  is_disabled INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Primary read model for the UI.
CREATE VIEW IF NOT EXISTS vw_side_menu_links AS
SELECT
  id,
  label,
  path,
  icon_key,
  is_disabled,
  sort_order,
  description
FROM side_menu_links
ORDER BY sort_order ASC, label ASC;

-- Seed rows that match the current app navigation.
INSERT INTO side_menu_links (label, path, icon_key, is_disabled, sort_order, description)
SELECT 'Home', '/', 'HomeIcon', 1, 10, 'Main landing page'
WHERE NOT EXISTS (SELECT 1 FROM side_menu_links WHERE path = '/');

INSERT INTO side_menu_links (label, path, icon_key, is_disabled, sort_order, description)
SELECT 'The Shops', '/projects', 'ForestIcon', 0, 20, 'Shops directory page'
WHERE NOT EXISTS (SELECT 1 FROM side_menu_links WHERE path = '/projects');

INSERT INTO side_menu_links (label, path, icon_key, is_disabled, sort_order, description)
SELECT 'Projects', '/contact', 'HandymanIcon', 0, 30, 'Projects listing page'
WHERE NOT EXISTS (SELECT 1 FROM side_menu_links WHERE path = '/contact');

-- Example: add a new column later.
-- ALTER TABLE side_menu_links ADD COLUMN badge_text TEXT;
