### Frontend Integration & URLs

## Frontend Environment Variables

### Required Variables

Frontend variables are prefixed with `NEXT_PUBLIC_` to make them accessible in the browser.

#### `NEXT_PUBLIC_API_URL`

- **Type:** string (full URL)
- **Required:** Yes
- **Purpose:** Base URL for Django REST API calls from the browser
- **Default:** None — must be explicitly set
- **Format:** Must include `/api/v1` path
- **Examples:**
  ```bash
  # Local development
  NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
  
  # Production
  NEXT_PUBLIC_API_URL=https://api.example.com/api/v1
  
  # Vercel with backend on Render
  NEXT_PUBLIC_API_URL=https://my-api.onrender.com/api/v1
  ```

#### `NEXT_PUBLIC_APP_NAME`

- **Type:** string
- **Default:** `The Inventory (Local)`
- **Purpose:** Application display name in browser title and UI
- **Examples:**
  ```bash
  NEXT_PUBLIC_APP_NAME="The Inventory (Local)"
  NEXT_PUBLIC_APP_NAME="My Company Inventory"
  NEXT_PUBLIC_APP_NAME="Inventory - Production"
  ```

### Setup

**File location:** `frontend/.env.local` (development) or `frontend/.env.production.local` (production)

**Example `frontend/.env.local`:**

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_NAME="The Inventory (Local)"
```

**For production deployment:**
- Set these variables in your hosting platform (Vercel, Netlify, etc.)
- Or create `frontend/.env.production.local` with production values
- The `.local` files are in `.gitignore` — never committed

---

#### `FRONTEND_URL`

- **Type:** string (full URL)
- **Default:** `http://localhost:3000`
- **Purpose:** Frontend base URL for redirects in password reset emails, OAuth callbacks, etc.
- **Examples:**
  ```bash
  # Local development
  FRONTEND_URL=http://localhost:3000
  
  # Production
  FRONTEND_URL=https://app.example.com
  
  # Staging
  FRONTEND_URL=https://staging.example.com
  ```

#### `PUBLIC_BASE_URL` (Optional)

- **Type:** string (full URL)
- **Default:** Derived from `ALLOWED_HOSTS` or `http://127.0.0.1:8000`
- **Purpose:** Public API endpoint used in emails and API documentation
- **Example:**
  ```bash
  PUBLIC_BASE_URL=https://api.example.com
  ```

#### `WAGTAILADMIN_BASE_URL` (Optional)

- **Type:** string (URL base without `/admin/`)
- **Default:** `PUBLIC_BASE_URL` or `http://127.0.0.1:8000`
- **Purpose:** Wagtail admin URL displayed in emails (e.g., "Edit this at: `https://api.example.com/admin/`")
- **Example:**
  ```bash
  WAGTAILADMIN_BASE_URL=https://api.example.com
  ```

#### `WAGTAIL_SITE_NAME` (Optional)

- **Type:** string
- **Default:** `the_inventory`
- **Purpose:** Display name in Wagtail admin UI and emails
- **Example:**
  ```bash
  WAGTAIL_SITE_NAME="My Company Inventory"
  ```
