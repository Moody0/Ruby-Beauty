# Ruby Beauty - Premium Botanical Skincare Store

Ruby Beauty is a high-performance e-commerce platform for premium botanical skincare and beauty products. Built with Next.js 15, Prisma, and Tailwind CSS.

## 🚀 Key Features

- **Modern UI/UX**: Premium, responsive design with dark mode support.
- **Multilingual**: Full English and Arabic support with RTL layout.
- **Dynamic Catalog**: Categorized products with advanced search.
- **Smart Discounts**: Support for both percentage-based and fixed monetary discounts.
- **Admin Dashboard**: Comprehensive management of products, categories, orders, banners, and promo codes.
- **Secure Authentication**: Robust admin access control using NextAuth.js.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Prisma with CockroachDB
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **State Management**: React Context API
- **Form Handling**: React Hook Form

## 📦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file based on `.env.example` (if available) with your database and authentication secrets.

3. **Database Migration**:
   ```bash
   npx prisma db push
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

## 📄 License

© 2026 Ruby Beauty. All rights reserved.
