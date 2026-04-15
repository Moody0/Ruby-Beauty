ALTER TABLE "Category" ADD COLUMN "slug" TEXT;

WITH base_slugs AS (
    SELECT
        "id",
        COALESCE(
            NULLIF(
                TRIM(BOTH '-' FROM regexp_replace(lower(trim("name")), '[^a-z0-9]+', '-', 'g')),
                ''
            ),
            'category'
        ) AS base_slug
    FROM "Category"
),
ranked_slugs AS (
    SELECT
        "id",
        CASE
            WHEN ROW_NUMBER() OVER (PARTITION BY base_slug ORDER BY "id") = 1 THEN base_slug
            ELSE base_slug || '-' || ROW_NUMBER() OVER (PARTITION BY base_slug ORDER BY "id")
        END AS slug
    FROM base_slugs
)
UPDATE "Category" AS category
SET "slug" = ranked_slugs.slug
FROM ranked_slugs
WHERE category."id" = ranked_slugs."id";

ALTER TABLE "Category" ALTER COLUMN "slug" SET NOT NULL;

CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
