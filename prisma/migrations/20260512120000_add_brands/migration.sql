DO $$ BEGIN
    CREATE TYPE "BrandGroup" AS ENUM ('MAIN', 'DIFFERENT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "canDeleteBrands" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS "canManageBrands" BOOLEAN NOT NULL DEFAULT true;

CREATE TABLE IF NOT EXISTS "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "group" "BrandGroup" NOT NULL DEFAULT 'DIFFERENT',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Brand_name_key" ON "Brand"("name");
CREATE UNIQUE INDEX IF NOT EXISTS "Brand_slug_key" ON "Brand"("slug");
CREATE INDEX IF NOT EXISTS "Brand_group_idx" ON "Brand"("group");
CREATE INDEX IF NOT EXISTS "Brand_isActive_idx" ON "Brand"("isActive");
CREATE INDEX IF NOT EXISTS "Brand_isFeatured_idx" ON "Brand"("isFeatured");

INSERT INTO "Brand" ("id", "name", "slug", "group", "isActive", "isFeatured", "updatedAt") VALUES
('brand-ruby-beauty', 'Ruby Beauty', 'ruby-beauty', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-diamond-beauty', 'Diamond Beauty', 'diamond-beauty', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-sevencool', 'Sevencool', 'sevencool', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-lady-model', 'Lady Model', 'lady-model', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-romantic-beauty', 'Romantic Beauty', 'romantic-beauty', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-sheglam', 'Sheglam', 'sheglam', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-romantic-rain', 'Romantic Rain', 'romantic-rain', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-yara', 'Yara', 'yara', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-gulflower', 'Gulflower', 'gulflower', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-billion-beauty', 'Billion Beauty', 'billion-beauty', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-romantic-bright', 'Romantic Bright', 'romantic-bright', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-georgina', 'Georgina', 'georgina', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-huxia-beauty', 'Huxia Beauty', 'huxia-beauty', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-lskinr', 'Lskinr', 'lskinr', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-kirsche', 'Kirsche', 'kirsche', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-beauty-for-ever', 'Beauty for ever', 'beauty-for-ever', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-crazy-girl', 'Crazy Girl', 'crazy-girl', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-magic', 'Magic', 'magic', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-vasline', 'Vasline', 'vasline', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-ibrahim-al-qurashi', 'ابراهيم القرشي', 'ibrahim-al-qurashi', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-asad', 'اسد', 'asad', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-meilis', 'Meilis', 'meilis', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-romantic-sweet', 'Romantic Sweet', 'romantic-sweet', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-kenta', 'Kenta', 'kenta', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-veyes', 'Veyes', 'veyes', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-max-lady', 'Max Lady', 'max-lady', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-enchanteur', 'Enchanteur', 'enchanteur', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-tlg-for-ever', 'Tl&G for ever', 'tlg-for-ever', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-fruit-of-the-wokali', 'Fruit of the Wokali', 'fruit-of-the-wokali', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-la-roch-posay', 'La Roch-Posay', 'la-roch-posay', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-the-ordinary', 'The Ordinary', 'the-ordinary', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-cerave', 'CeraVe', 'cerave', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-perfection', 'Perfection', 'perfection', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-snowwhite', 'SnowWhite', 'snowwhite', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-anyklaen', 'AnyKlaen', 'anyklaen', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-dove', 'Dove', 'dove', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-lady-in-blue', 'Lady in Blue', 'lady-in-blue', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-rexona', 'Rexona', 'rexona', 'MAIN', true, true, CURRENT_TIMESTAMP),
('brand-yeah-kiss', 'Yeah Kiss', 'yeah-kiss', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-carla-secre', 'Carla Secre', 'carla-secre', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-nature', 'Nature', 'nature', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-my-note', 'My Note', 'my-note', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-souvenir', 'Souvenir', 'souvenir', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-golden-sabuohaa-4', 'Golden Sabuohaa 4', 'golden-sabuohaa-4', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-kenza-2', 'Kenza 2', 'kenza-2', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-mslove-3', 'Mslove 3', 'mslove-3', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-mocoallure', 'Mocoallure', 'mocoallure', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-fix-me-up-mlundo', 'Fix me up M’lundo', 'fix-me-up-mlundo', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-touch-pen', 'Touch Pen', 'touch-pen', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-huda-abc', 'Huda ABC', 'huda-abc', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-chanleevi', 'Chanleevi', 'chanleevi', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-nolm', 'Nolm', 'nolm', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-aplicador-espiral', 'Aplicador Espiral', 'aplicador-espiral', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-flormar', 'Flormar', 'flormar', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-pink-rose', 'Pink Rose', 'pink-rose', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-amy-beauty', 'Amy Beauty', 'amy-beauty', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-naughty', 'Naughty', 'naughty', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-nude', 'Nude', 'nude', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-daisy-rose', 'Daisy Rose', 'daisy-rose', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-elaiya', 'Elaiya', 'elaiya', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-meeinda-rose', 'Meeinda Rose', 'meeinda-rose', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-vivdo-touch', 'Vivdo Touch', 'vivdo-touch', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-mimi-tango', 'Mimi Tango', 'mimi-tango', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-chanlanya-2', 'Chanlanya 2', 'chanlanya-2', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-love-rain', 'Love Rain', 'love-rain', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-3q-beauty', '3Q Beauty', '3q-beauty', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-dazzle-lip', 'Dazzle Lip', 'dazzle-lip', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-apckflee', 'Apckflee', 'apckflee', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-pink-diamond', 'Pink Diamond', 'pink-diamond', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-kakaziyan', 'Kakaziyan', 'kakaziyan', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-good-cool', 'Good Cool', 'good-cool', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-lucnco', 'Lucnco', 'lucnco', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-rose-touch', 'Rose touch', 'rose-touch', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-good-rose', 'Good Rose', 'good-rose', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-keratine-wueen', 'Keratine Wueen', 'keratine-wueen', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-miracle-rescue', 'Miracle Rescue', 'miracle-rescue', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-paris-collection', 'Paris Collection', 'paris-collection', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-daqan', 'Daqan', 'daqan', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-queen-love', 'Queen Love', 'queen-love', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-kaji-son', 'Kaji Son', 'kaji-son', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-meidian', 'Meidian', 'meidian', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-colourpop', 'Colourpop', 'colourpop', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-acm', 'ACM', 'acm', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-erha21', 'Erha21', 'erha21', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-magic-dream', 'Magic Dream', 'magic-dream', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-cosrx', 'Cosrx', 'cosrx', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-glysolid', 'Glysolid', 'glysolid', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-melanofree', 'Melanofree', 'melanofree', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-skinoren', 'Skinoren', 'skinoren', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-hiqueen', 'HiQueen', 'hiqueen', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-slazenger', 'Slazenger', 'slazenger', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-tome', 'Tome', 'tome', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-fulah', 'Fulah', 'fulah', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-magnolia', 'Magnolia', 'magnolia', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-memwa', 'Memwa', 'memwa', 'DIFFERENT', true, false, CURRENT_TIMESTAMP),
('brand-smeikou', 'Smeikou', 'smeikou', 'DIFFERENT', true, false, CURRENT_TIMESTAMP)
ON CONFLICT ("name") DO UPDATE SET
    "group" = EXCLUDED."group",
    "isActive" = true,
    "isFeatured" = EXCLUDED."isFeatured",
    "updatedAt" = CURRENT_TIMESTAMP;

ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "brandId" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "brandId" TEXT;

UPDATE "Category" SET "brandId" = 'brand-ruby-beauty' WHERE "brandId" IS NULL;
UPDATE "Product" SET "brandId" = 'brand-ruby-beauty' WHERE "brandId" IS NULL;

ALTER TABLE "Category" ALTER COLUMN "brandId" SET NOT NULL;
ALTER TABLE "Product" ALTER COLUMN "brandId" SET NOT NULL;

DROP INDEX IF EXISTS "Category_name_key";
CREATE UNIQUE INDEX IF NOT EXISTS "Category_brandId_name_key" ON "Category"("brandId", "name");
CREATE INDEX IF NOT EXISTS "Category_brandId_idx" ON "Category"("brandId");
CREATE INDEX IF NOT EXISTS "Product_brandId_idx" ON "Product"("brandId");

DO $$ BEGIN
    ALTER TABLE "Category" ADD CONSTRAINT "Category_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
