# The Inventory UI

A comprehensive, multi-locale inventory management frontend application built with modern web technologies. Part of the Wagtail ecosystem, this UI provides enterprise-grade features for managing inventory, procurement, sales, audit operations, and more.

## Overview

The Inventory UI is a sophisticated Next.js 16-based application designed to serve as a complete inventory management system. It features:

- **Multi-language Support**: Built-in internationalization (i18n) supporting 6 languages: English, Spanish, French, Arabic, Kinyarwanda, and Swahili
- **Authentication & Authorization**: Secure auth flows with role-based access control
- **Real-time Data Management**: TanStack Query for efficient server state management
- **Rich UI Components**: Shadcn UI component library with customizable theming
- **Advanced Features**: Bulk operations, cycle counts, reservations, procurement, sales, audit trails, and comprehensive reporting

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with TypeScript
- **UI Library**: [React 19](https://react.dev)
- **State Management**: [Zustand](https://zustand-demo.vercel.app/) and [TanStack Query](https://tanstack.com/query)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) with [Shadcn UI](https://ui.shadcn.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with Zod schema validation
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Testing**: [Vitest](https://vitest.dev/) with React Testing Library
- **Linting**: [ESLint 9](https://eslint.org/)
- **Package Manager**: [Yarn](https://yarnpkg.com/) 1.22.22

## Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── [locale]/                # Locale-specific routes
├── components/                  # Reusable UI components
│   ├── ui/                      # Shadcn UI components
│   ├── layout/                  # Layout components
│   ├── data-table/              # Data table components
│   └── *.tsx                    # Feature components
├── features/                    # Feature modules
│   ├── auth/                    # Authentication flows
│   ├── dashboard/               # Dashboard pages
│   ├── inventory/               # Inventory management
│   ├── procurement/             # Procurement workflows
│   ├── sales/                   # Sales management
│   ├── audit/                   # Audit trails
│   ├── cycle-counts/            # Cycle counting features
│   ├── reservations/            # Reservation system
│   ├── reports/                 # Reporting features
│   ├── settings/                # Settings pages
│   ├── bulk-operations/         # Bulk operation features
│   └── [other features]/
├── hooks/                       # Custom React hooks
├── i18n/                        # Internationalization setup
├── lib/                         # Utilities and helpers
│   ├── api-client.ts           # API communication
│   ├── auth-store.ts           # Auth state management
│   └── [utilities]/
└── types/                       # TypeScript type definitions

__tests__/                       # Test files (mirrors src structure)
public/locales/                  # Locale JSON files (ar, en, es, fr, rw, sw)
scripts/                         # Build and utility scripts
```

## Features

- **Authentication**: Secure login, registration, and session management
- **Dashboard**: Overview and analytics
- **Inventory Management**: Track stock, locations, and movements
- **Procurement**: Manage purchase orders and suppliers
- **Sales**: Handle sales orders and fulfillment
- **Cycle Counts**: Perform physical inventory counts
- **Reservations**: Reserve items for orders
- **Audit Trails**: Complete activity logging
- **Reports**: Comprehensive reporting and analytics
- **Settings**: System configuration and preferences
- **Bulk Operations**: Perform batch operations efficiently
- **Multi-language**: Full i18n support with 6 languages

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- Yarn 1.22.22+
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd the-inventory-ui

# Install dependencies using Yarn
yarn install
```

### Development

```bash
# Start the development server
yarn dev

# The application will be available at http://localhost:3000
```

The development server supports hot module reloading, so changes will automatically refresh in your browser.

### Build

```bash
# Build the application for production
yarn build

# Start the production server
yarn start
```

## Scripts

- **`yarn dev`** - Start development server with locale merging
- **`yarn build`** - Build for production
- **`yarn start`** - Start production server
- **`yarn lint`** - Run ESLint
- **`yarn test`** - Run tests once
- **`yarn test:watch`** - Run tests in watch mode
- **`yarn locale:merge`** - Merge all locale files
- **`yarn locale:rebuild-en`** - Rebuild English locale
- **`yarn locale:parity`** - Check locale JSON parity

## Internationalization (i18n)

The application supports 6 languages out of the box:

- **en** - English
- **es** - Spanish
- **fr** - French
- **ar** - Arabic
- **rw** - Kinyarwanda
- **sw** - Swahili

Locale files are stored in `public/locales/` and used via the `next-intl` library. Routes are automatically prefixed with the locale, e.g., `/en/dashboard`, `/es/dashboard`.

### Locale Maintenance

```bash
# Merge all locale features into main locale files
yarn locale:merge

# Rebuild English locale from scratch
yarn locale:rebuild-en

# Check parity between locale JSON files
yarn locale:parity
```

## Testing

This project uses Vitest with React Testing Library for unit and component testing.

```bash
# Run tests once
yarn test

# Run tests in watch mode
yarn test:watch

# Run specific test file
yarn test __tests__/features/auth/login-page.test.tsx
```

Tests are located in `__tests__/` directory, mirroring the `src/` structure.

## Code Quality

- **Linting**: ESLint 9 configuration for code style consistency
- **TypeScript**: Full type safety across the codebase
- **Formatting**: Tailwind CSS for consistent styling

```bash
# Run linter
yarn lint
```

## Building Blocks

### UI Components

Components are built using Shadcn UI with Tailwind CSS, providing a consistent and accessible design system.

### Data Fetching

TanStack Query (React Query) manages server state, caching, and synchronization with the backend API.

### State Management

Zustand provides lightweight, scalable client-side state management for complex features.

### Forms

React Hook Form combined with Zod provides type-safe, performant form handling.

## Environment Configuration

Create a `.env.local` file in the project root for local environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=30000
```

## Contributing

Contributions are welcome! Please ensure:

1. Code follows the existing style and TypeScript conventions
2. New features include tests
3. Commit messages are clear and descriptive
4. All tests pass (`yarn test`)
5. Linting passes (`yarn lint`)

## License

This project is part of the Wagtail ecosystem. See LICENSE file for details.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Shadcn UI](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

## Support

For issues, questions, or contributions, please open a GitHub issue or submit a pull request.
