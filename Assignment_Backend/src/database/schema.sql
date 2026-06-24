
CREATE TABLE IF NOT EXISTS products (
  id          BIGSERIAL     PRIMARY KEY,
  name        TEXT          NOT NULL,
  category    TEXT          NOT NULL,
  price       NUMERIC(10,2) NOT NULL,
  created_at  TIMESTAMPTZ   DEFAULT NOW(),
  updated_at  TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX idx_products_browse
  ON products (category, created_at DESC, id DESC);

CREATE INDEX idx_products_browse_all
  ON products (created_at DESC, id DESC);