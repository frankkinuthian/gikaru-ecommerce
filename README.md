# Gikaru E-commerce

A modern e-commerce platform built with Next.js 15 and Sanity CMS, featuring a clean storefront and integrated content management system.

## Tech Stack

- **Frontend**: Next.js 15 with App Router and React 19
- **CMS**: Sanity Studio for content management
- **Styling**: Tailwind CSS with custom components
- **Authentication**: Clerk for user management
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **TypeScript**: Full type safety throughout the application

## Project Structure

```
├── app/
│   ├── (store)/          # Main storefront pages
│   │   ├── page.tsx      # Homepage
│   │   ├── search/       # Search functionality
│   │   └── layout.tsx    # Store layout
│   └── studio/           # Sanity Studio CMS
├── components/           # Reusable UI components
├── sanity/
│   ├── schemaTypes/      # Content schemas
│   │   ├── productType.ts
│   │   ├── categoryType.ts
│   │   └── blockContentType.ts
│   └── lib/              # Sanity client configuration
└── lib/                  # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Sanity project credentials

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront.

Access the Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

### Content Management

The project includes pre-configured Sanity schemas for:

- **Products**: Name, description, price, images, categories, and stock
- **Categories**: Organized product groupings
- **Block Content**: Rich text editor for product descriptions

Generate TypeScript types from Sanity schemas:

```bash
npm run typegen
```

## Current Development Status

This project is in early development with the following implemented:

- Basic Next.js 15 setup with App Router
- Sanity CMS integration and studio configuration
- Content schemas for products and categories
- UI component foundation with Tailwind CSS
- Authentication setup with Clerk
- Search page structure

## Upcoming Features

- Product catalog and detail pages
- Shopping cart functionality
- User authentication and profiles
- Order management
- Payment integration
- Responsive design improvements

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typegen` - Generate TypeScript types from Sanity schemas
