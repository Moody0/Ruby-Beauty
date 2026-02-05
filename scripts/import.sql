-- Reset data
DELETE FROM "CartItem";
DELETE FROM "Cart";
DELETE FROM "OrderItem";
DELETE FROM "Order";
DELETE FROM "Product";
DELETE FROM "Category";

-- Insert Categories and Products
-- Category 1: مزيل مكياج
INSERT INTO "Category" (id, name, description, "createdAt", "updatedAt") 
VALUES ('cat1', 'مزيل مكياج', 'Premium مزيل مكياج collection', NOW(), NOW());

INSERT INTO "Product" (id, name, slug, description, price, stock, images, "isTrending", "categoryId", "createdAt", "updatedAt")
VALUES 
  ('prod1', 'Makeup Remover Puff', 'makeup-remover-puff', 'Premium beauty product', 2.9, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-JUK5W.jpg', true, 'cat1', NOW(), NOW()),
  ('prod2', 'Micellar Toner Water', 'micellar-toner-water', 'Premium beauty product', 4, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-TEVKL.jpg', false, 'cat1', NOW(), NOW());

-- Category 2: كريمات
INSERT INTO "Category" (id, name, description, "createdAt", "updatedAt") 
VALUES ('cat2', 'كريمات', 'Premium كريمات collection', NOW(), NOW());

INSERT INTO "Product" (id, name, slug, description, price, stock, images, "isTrending", "categoryId", "createdAt", "updatedAt")
VALUES 
  ('prod3', 'Night Face Cream', 'night-face-cream', 'Premium beauty product', 7.75, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-43991.jpg', false, 'cat2', NOW(), NOW()),
  ('prod4', 'Retinol Collagen Cream 187', 'retinol-collagen-cream-187', 'Premium beauty product', 20.90, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-95QJO.jpg', true, 'cat2', NOW(), NOW()),
  ('prod5', 'Retinol Collagen Cream 840', 'retinol-collagen-cream-840', 'Premium beauty product', 53.66, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-95QJO.jpg', false, 'cat2', NOW(), NOW()),
  ('prod6', 'Retinol Collagen Cream 396', 'retinol-collagen-cream-396', 'Premium beauty product', 66.82, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-95QJO.jpg', false, 'cat2', NOW(), NOW()),
  ('prod7', 'Retinol Collagen Cream 909', 'retinol-collagen-cream-909', 'Premium beauty product', 37.89, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-95QJO.jpg', false, 'cat2', NOW(), NOW()),
  ('prod8', 'CC Color Correction Full Coverage Cream', 'cc-color-correction-full-coverage-cream', 'Premium beauty product', 5.7, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-AG1VC.jpg', false, 'cat2', NOW(), NOW());

-- Category 3: ماسك للشعر
INSERT INTO "Category" (id, name, description, "createdAt", "updatedAt") 
VALUES ('cat3', 'ماسك للشعر', 'Premium ماسك للشعر collection', NOW(), NOW());

INSERT INTO "Product" (id, name, slug, description, price, stock, images, "isTrending", "categoryId", "createdAt", "updatedAt")
VALUES 
  ('prod9', 'Coconut Hair Mask', 'coconut-hair-mask', 'Premium beauty product', 4, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-SGTCP.jpg', false, 'cat3', NOW(), NOW()),
  ('prod10', 'Aloe Vera hair mask', 'aloe-vera-hair-mask', 'Premium beauty product', 4, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-VZRW9.jpg', false, 'cat3', NOW(), NOW());

-- Category 4: سيروم
INSERT INTO "Category" (id, name, description, "createdAt", "updatedAt") 
VALUES ('cat4', 'سيروم', 'Premium سيروم collection', NOW(), NOW());

INSERT INTO "Product" (id, name, slug, description, price, stock, images, "isTrending", "categoryId", "createdAt", "updatedAt")
VALUES 
  ('prod11', 'Collagen Serum 185', 'collagen-serum-185', 'Premium beauty product', 8, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-EQEUJ.jpg', false, 'cat4', NOW(), NOW()),
  ('prod12', 'Rice Collagen Face serum 189', 'rice-collagen-face-serum-189', 'Premium beauty product', 8, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-ZHB3O.jpg', false, 'cat4', NOW(), NOW()),
  ('prod13', 'Retinol B3 face serum 181', 'retinol-b3-face-serum-181', 'Premium beauty product', 5.5, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-F68XG.jpg', false, 'cat4', NOW(), NOW()),
  ('prod14', 'Remove Wrinkles Face Serum (Vitamin E & Aloe Vera)', 'remove-wrinkles-face-serum', 'Premium beauty product', 4.66, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-2EB1G.jpg', false, 'cat4', NOW(), NOW()),
  ('prod15', '24K Gold Face Serum (vitamin C E hyaluronic Acid)', '24k-gold-face-serum', 'Premium beauty product', 5.5, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-U0POC.jpg', false, 'cat4', NOW(), NOW()),
  ('prod16', '22% Vitamin C Face Serum', '22-vitamin-c-face-serum', 'Premium beauty product', 5.5, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-6N5LO.jpg', false, 'cat4', NOW(), NOW()),
  ('prod17', 'Collagen Cream 186', 'collagen-cream-186', 'Premium beauty product', 8, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-23YY7.jpg', false, 'cat4', NOW(), NOW()),
  ('prod18', '15% Vitamin C Hyaluronic Acid', '15-vitamin-c-hyaluronic-acid', 'Premium beauty product', 5.5, 100, 'https://fatoradrive.blob.core.windows.net/itm/jsz0011242025-XJN8W.jpg', false, 'cat4', NOW(), NOW());
